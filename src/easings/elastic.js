export var Elastic = {
	easeIn: function (t, b, c, d) {
		var s;var p=0;var a=c;
		if (t===0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
		if (a < Math.abs(c)) { a=c; s=p/4; }
		else s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},

	easeOut: function (t, b, c, d) {
		var s;var p=0;var a=c;
		if (t===0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
		if (a < Math.abs(c)) { a=c; s=p/4; }
		else s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},

	easeInOut: function (t, b, c, d) {
		var s;var p=0;var a=c;
		if (t===0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(0.3*1.5);
		if (a < Math.abs(c)) { a=c; s=p/4; }
		else s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	}
};
