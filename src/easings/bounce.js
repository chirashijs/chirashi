export var Bounce = {
	easeIn: function (t, b, c, d, s) {
		return c - easeOutBounce (d-t, 0, c, d) + b;
	},

	easeOut: function (t, b, c, d, s) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
		}
	},

	easeInOut: function (t, b, c, d, s) {
		if (t < d/2) return easeInBounce (t*2, 0, c, d) * 0.5 + b;
		else return easeOutBounce (t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
