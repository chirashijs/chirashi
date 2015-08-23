export var Back = {
	easeIn: function (t, b, c, d, s) {
		if (s === undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},

	easeOut: function (t, b, c, d, s) {
		if (s === undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},

	easeInOut: function (t, b, c, d, s) {
		if (s === undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	}
};
