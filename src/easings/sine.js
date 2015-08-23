export var Sine = {
	easeIn: function (t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},

	easeOut: function (t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},

	easeInOut: function (t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	}
};
