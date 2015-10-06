import { forEach, forElements } from '../core';
import { offset, size, style, transform } from '../styles';
import { on, off } from '../events';
import { defaultify } from '../utils/defaultify';

const defaults = {
    easing: 0.1
};

export class MouseFollower {
    constructor(options) {
        this.options = defaultify(options, defaults);

        this.followers = [];
        this.addFollowers(this.options.followers);

        this.mouse = {
            x: 0,
            y: 0
        };

        this.mousemoveCallback = this.mousemove.bind(this);
        on('body', 'mousemove', this.mousemoveCallback);

        this.update();
    }

    mousemove(event) {
        this.mouse = {
            x: event.pageX,
            y: event.pageY
        };
    }

    addFollowers(followers) {
        if (typeof followers == 'string') followers = [{elements: followers }];

        forEach(followers, (follower) => {
            forElements(follower.elements, (element) => {
                let initial = offset(element);
                this.followers.push({
                    element: element,
                    easing: follower.easing || this.options.easing,
                    position: {
                        x: initial.left,
                        y: initial.top
                    }
                });
            });
        });
    }

    removeFollowers(followers) {
        if (typeof followers == 'string') followers = [{elements: followers }];

        forEach(followers, (follower) => {
            forElements(follower.elements, (element) => {
                let i = this.followers.length, done = false;
                while(!done && i--) {
                  if (done = this.followers[i].element == element) {
                    let follower = this.followers[i];

                    style(follower.element, {
                        transform: ''
                    });

                    this.followers.splice(i, 1);
                  }
                }
            });
        });
    }

    update() {
        forEach(this.followers, (follower) => {
            let followerSize = size(follower.element);

            follower.position = {
                x: follower.position.x + (this.mouse.x - follower.position.x) * follower.easing,
                y: follower.position.y + (this.mouse.y - follower.position.y) * follower.easing
            };

            transform(follower.element, {
                x: follower.position.x - followerSize.width/2,
                y: follower.position.y - followerSize.height/2
            });
        });

        this.request = requestAnimationFrame(this.update.bind(this));
    }

    kill() {
        off('body', 'mousemove', this.mousemoveCallback);

        cancelAnimationFrame(this.request);

        forEach(this.followers, (follower) => {
            style(follower.element, {
                transform: ''
            });
        });
    }
}
