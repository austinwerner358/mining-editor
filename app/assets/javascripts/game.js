var threadsCode = [];
threadsCode.loadRegionThread = "self.addEventListener('message', function(e) {        var x = e.data.x;        var y = e.data.y;        var xhr = new XMLHttpRequest();        xhr.open('GET', e.data.name, false);        xhr.responseType = 'arraybuffer';        try{            xhr.send();        } catch(e) {            self.postMessage({loaded: 0, x: x, y: y});            self.close();            return;        }        var regionData =  new Uint8Array(xhr.response);        self.postMessage({loaded: 1, x: x, y: y, data: regionData.buffer}, [regionData.buffer]);        self.close();    }, false);";
String.prototype.equalsIgnoreCase = function(b) {
  return this.toUpperCase() === b.toUpperCase()
};

function ab2str(b) {
  var f = "",
    c = b.length,
    d = Math.pow(2, 10),
    e, m;
  for (e = 0; e < c; e += d) m = Math.min(d, c - e), m = b.subarray(e, e + m), f += String.fromCharCode.apply(null, m);
  return f
}

function str2ab(b) {
  var f, c, d, e;
  for (f = new ArrayBuffer(b.length), c = new Uint8Array(f), d = 0, e = b.length; d < e; d++) c[d] = b.charCodeAt(d);
  return f
}

function jenkins_hash(b) {
  var f, c;
  for (f = 0, c = 0; c < b.length; ++c) f += b[c], f += f << 10, f ^= f >> 6;
  f += f << 3;
  f ^= f >> 11;
  return f + (f << 15) >>> 0
}

function spiralLoop(b) {
  var f = Math.floor((Math.sqrt(b + 1) - 1) / 2) + 1,
    c = 2 * f;
  b = (1 + b - 8 * f * (f - 1) / 2) % (8 * f);
  var d = [0, 0, f];
  switch (Math.floor(b / (2 * f))) {
    case 0:
      d[0] = b - f;
      d[1] = -f;
      break;
    case 1:
      d[0] = f;
      d[1] = b % c - f;
      break;
    case 2:
      d[0] = f - b % c;
      d[1] = f;
      break;
    case 3:
      d[0] = -f, d[1] = f - b % c
      break;
  }
  return d
}

WebGLUtils = function() {
  var b = function(b, c) {
    var d, e, m;
    for (d = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], e = null, m = 0; m < d.length; ++m) {
      try {
        e = b.getContext(d[m], c)
      } catch (l) {}
      if (e) break
    }
    return e
  };
  return {
    create3DContext: b,
    setupWebGL: function(f, c, d) {
      function e(b) {
        var c = f.parentNode;
        if (c) {
          var d = window.WebGLRenderingContext ? 'It doesn\'t appear your computer can support WebGL.<br/><a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>' : 'This page requires a browser that supports WebGL.<br/><a href="http://get.webgl.org">Click here to upgrade your browser.</a>';
          b && (d += "<br/><br/>Status: " + b);
          c.innerHTML = '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr><td align="center"><div style="display: table-cell; vertical-align: middle;"><div style="">' + d + "</div></div></td></tr></table>"
        }
      }
      d = d || e;
      f.addEventListener && f.addEventListener("webglcontextcreationerror", function(b) {
        d(b.statusMessage)
      }, !1);
      (c = b(f, c)) || window.WebGLRenderingContext || d("");
      return c
    }
  }
}();
window.requestAnimFrame = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(b, f) {
    window.setTimeout(b, 1E3 / 60)
  }
}();
(function(b) {
  var f;
  "undefined" === typeof exports ? "function" == typeof define && "object" == typeof define.amd && define.amd ? (f = {}, define(function() {
    return f
  })) : f = "undefined" !== typeof window ? window : b : f = exports;
  (function(b) {
    if (!d) var d = 1E-6;
    if (!e) var e = "undefined" !== typeof Float32Array ? Float32Array : Array;
    if (!f) var f = Math.random;
    var l = {
      setMatrixArrayType: function(a) {
        e = a
      }
    };
    "undefined" !== typeof b && (b.glMatrix = l);
    var p = {
      create: function() {
        var a = new e(2);
        a[0] = 0;
        a[1] = 0;
        return a
      },
      clone: function(a) {
        var v = new e(2);
        v[0] =
          a[0];
        v[1] = a[1];
        return v
      },
      fromValues: function(a, v) {
        var b = new e(2);
        b[0] = a;
        b[1] = v;
        return b
      },
      copy: function(a, v) {
        a[0] = v[0];
        a[1] = v[1];
        return a
      },
      set: function(a, v, b) {
        a[0] = v;
        a[1] = b;
        return a
      },
      add: function(a, v, b) {
        a[0] = v[0] + b[0];
        a[1] = v[1] + b[1];
        return a
      },
      subtract: function(a, v, b) {
        a[0] = v[0] - b[0];
        a[1] = v[1] - b[1];
        return a
      }
    };
    p.sub = p.subtract;
    p.multiply = function(a, v, b) {
      a[0] = v[0] * b[0];
      a[1] = v[1] * b[1];
      return a
    };
    p.mul = p.multiply;
    p.divide = function(a, v, b) {
      a[0] = v[0] / b[0];
      a[1] = v[1] / b[1];
      return a
    };
    p.div = p.divide;
    p.min = function(a,
      v, b) {
      a[0] = Math.min(v[0], b[0]);
      a[1] = Math.min(v[1], b[1]);
      return a
    };
    p.max = function(a, v, b) {
      a[0] = Math.max(v[0], b[0]);
      a[1] = Math.max(v[1], b[1]);
      return a
    };
    p.scale = function(a, v, b) {
      a[0] = v[0] * b;
      a[1] = v[1] * b;
      return a
    };
    p.scaleAndAdd = function(a, v, b, c) {
      a[0] = v[0] + b[0] * c;
      a[1] = v[1] + b[1] * c;
      return a
    };
    p.distance = function(a, v) {
      var b = v[0] - a[0],
        c = v[1] - a[1];
      return Math.sqrt(b * b + c * c)
    };
    p.dist = p.distance;
    p.squaredDistance = function(a, v) {
      var b = v[0] - a[0],
        c = v[1] - a[1];
      return b * b + c * c
    };
    p.sqrDist = p.squaredDistance;
    p.length = function(a) {
      var v =
        a[0];
      a = a[1];
      return Math.sqrt(v * v + a * a)
    };
    p.len = p.length;
    p.squaredLength = function(a) {
      var v = a[0];
      a = a[1];
      return v * v + a * a
    };
    p.sqrLen = p.squaredLength;
    p.negate = function(a, v) {
      a[0] = -v[0];
      a[1] = -v[1];
      return a
    };
    p.normalize = function(a, v) {
      var b = v[0],
        c = v[1],
        b = b * b + c * c;
      0 < b && (b = 1 / Math.sqrt(b), a[0] = v[0] * b, a[1] = v[1] * b);
      return a
    };
    p.dot = function(a, v) {
      return a[0] * v[0] + a[1] * v[1]
    };
    p.cross = function(a, v, b) {
      v = v[0] * b[1] - v[1] * b[0];
      a[0] = a[1] = 0;
      a[2] = v;
      return a
    };
    p.lerp = function(a, v, b, c) {
      var d = v[0];
      v = v[1];
      a[0] = d + c * (b[0] - d);
      a[1] = v + c *
        (b[1] - v);
      return a
    };
    p.random = function(a, v) {
      v = v || 1;
      var b = 2 * f() * Math.PI;
      a[0] = Math.cos(b) * v;
      a[1] = Math.sin(b) * v;
      return a
    };
    p.transformMat2 = function(a, v, b) {
      var c = v[0];
      v = v[1];
      a[0] = b[0] * c + b[2] * v;
      a[1] = b[1] * c + b[3] * v;
      return a
    };
    p.transformMat2d = function(a, v, b) {
      var c = v[0];
      v = v[1];
      a[0] = b[0] * c + b[2] * v + b[4];
      a[1] = b[1] * c + b[3] * v + b[5];
      return a
    };
    p.transformMat3 = function(a, v, b) {
      var c = v[0];
      v = v[1];
      a[0] = b[0] * c + b[3] * v + b[6];
      a[1] = b[1] * c + b[4] * v + b[7];
      return a
    };
    p.transformMat4 = function(a, v, b) {
      var c = v[0];
      v = v[1];
      a[0] = b[0] * c + b[4] * v +
        b[12];
      a[1] = b[1] * c + b[5] * v + b[13];
      return a
    };
    p.forEach = function() {
      var a = p.create();
      return function(b, c, d, e, f, r) {
        c || (c = 2);
        d || (d = 0);
        for (e = e ? Math.min(e * c + d, b.length) : b.length; d < e; d += c) a[0] = b[d], a[1] = b[d + 1], f(a, a, r), b[d] = a[0], b[d + 1] = a[1];
        return b
      }
    }();
    p.str = function(a) {
      return "vec2(" + a[0] + ", " + a[1] + ")"
    };
    "undefined" !== typeof b && (b.vec2 = p);
    var q = {
      create: function() {
        var a = new e(3);
        a[0] = 0;
        a[1] = 0;
        a[2] = 0;
        return a
      },
      clone: function(a) {
        var b = new e(3);
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        return b
      },
      fromValues: function(a, b, c) {
        var d =
          new e(3);
        d[0] = a;
        d[1] = b;
        d[2] = c;
        return d
      },
      copy: function(a, b) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        return a
      },
      set: function(a, b, c, d) {
        a[0] = b;
        a[1] = c;
        a[2] = d;
        return a
      },
      add: function(a, b, c) {
        a[0] = b[0] + c[0];
        a[1] = b[1] + c[1];
        a[2] = b[2] + c[2];
        return a
      },
      subtract: function(a, b, c) {
        a[0] = b[0] - c[0];
        a[1] = b[1] - c[1];
        a[2] = b[2] - c[2];
        return a
      }
    };
    q.sub = q.subtract;
    q.multiply = function(a, b, c) {
      a[0] = b[0] * c[0];
      a[1] = b[1] * c[1];
      a[2] = b[2] * c[2];
      return a
    };
    q.mul = q.multiply;
    q.divide = function(a, b, c) {
      a[0] = b[0] / c[0];
      a[1] = b[1] / c[1];
      a[2] = b[2] / c[2];
      return a
    };
    q.div = q.divide;
    q.min = function(a, b, c) {
      a[0] = Math.min(b[0], c[0]);
      a[1] = Math.min(b[1], c[1]);
      a[2] = Math.min(b[2], c[2]);
      return a
    };
    q.max = function(a, b, c) {
      a[0] = Math.max(b[0], c[0]);
      a[1] = Math.max(b[1], c[1]);
      a[2] = Math.max(b[2], c[2]);
      return a
    };
    q.scale = function(a, b, c) {
      a[0] = b[0] * c;
      a[1] = b[1] * c;
      a[2] = b[2] * c;
      return a
    };
    q.scaleAndAdd = function(a, b, c, d) {
      a[0] = b[0] + c[0] * d;
      a[1] = b[1] + c[1] * d;
      a[2] = b[2] + c[2] * d;
      return a
    };
    q.distance = function(a, b) {
      var c = b[0] - a[0],
        d = b[1] - a[1],
        e = b[2] - a[2];
      return Math.sqrt(c * c + d * d + e * e)
    };
    q.dist = q.distance;
    q.squaredDistance = function(a, b) {
      var c = b[0] - a[0],
        d = b[1] - a[1],
        e = b[2] - a[2];
      return c * c + d * d + e * e
    };
    q.sqrDist = q.squaredDistance;
    q.length = function(a) {
      var b = a[0],
        c = a[1];
      a = a[2];
      return Math.sqrt(b * b + c * c + a * a)
    };
    q.len = q.length;
    q.squaredLength = function(a) {
      var b = a[0],
        c = a[1];
      a = a[2];
      return b * b + c * c + a * a
    };
    q.sqrLen = q.squaredLength;
    q.negate = function(a, b) {
      a[0] = -b[0];
      a[1] = -b[1];
      a[2] = -b[2];
      return a
    };
    q.normalize = function(a, b) {
      var c = b[0],
        d = b[1],
        e = b[2],
        c = c * c + d * d + e * e;
      0 < c && (c = 1 / Math.sqrt(c), a[0] = b[0] * c, a[1] = b[1] * c, a[2] = b[2] * c);
      return a
    };
    q.dot = function(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
    };
    q.cross = function(a, b, c) {
      var d = b[0],
        e = b[1];
      b = b[2];
      var f = c[0],
        r = c[1];
      c = c[2];
      a[0] = e * c - b * r;
      a[1] = b * f - d * c;
      a[2] = d * r - e * f;
      return a
    };
    q.lerp = function(a, b, c, d) {
      var e = b[0],
        f = b[1];
      b = b[2];
      a[0] = e + d * (c[0] - e);
      a[1] = f + d * (c[1] - f);
      a[2] = b + d * (c[2] - b);
      return a
    };
    q.random = function(a, b) {
      b = b || 1;
      var c = 2 * f() * Math.PI,
        d = 2 * f() - 1,
        e = Math.sqrt(1 - d * d) * b;
      a[0] = Math.cos(c) * e;
      a[1] = Math.sin(c) * e;
      a[2] = d * b;
      return a
    };
    q.transformMat4 = function(a, b, c) {
      var d = b[0],
        e = b[1];
      b = b[2];
      a[0] =
        c[0] * d + c[4] * e + c[8] * b + c[12];
      a[1] = c[1] * d + c[5] * e + c[9] * b + c[13];
      a[2] = c[2] * d + c[6] * e + c[10] * b + c[14];
      return a
    };
    q.transformMat3 = function(a, b, c) {
      var d = b[0],
        e = b[1];
      b = b[2];
      a[0] = d * c[0] + e * c[3] + b * c[6];
      a[1] = d * c[1] + e * c[4] + b * c[7];
      a[2] = d * c[2] + e * c[5] + b * c[8];
      return a
    };
    q.transformQuat = function(a, b, c) {
      var d = b[0],
        e = b[1],
        f = b[2];
      b = c[0];
      var r = c[1],
        s = c[2];
      c = c[3];
      var n = c * d + r * f - s * e,
        l = c * e + s * d - b * f,
        m = c * f + b * e - r * d,
        d = -b * d - r * e - s * f;
      a[0] = n * c + d * -b + l * -s - m * -r;
      a[1] = l * c + d * -r + m * -b - n * -s;
      a[2] = m * c + d * -s + n * -r - l * -b;
      return a
    };
    q.forEach = function() {
      var a =
        q.create();
      return function(b, c, d, e, f, r) {
        c || (c = 3);
        d || (d = 0);
        for (e = e ? Math.min(e * c + d, b.length) : b.length; d < e; d += c) a[0] = b[d], a[1] = b[d + 1], a[2] = b[d + 2], f(a, a, r), b[d] = a[0], b[d + 1] = a[1], b[d + 2] = a[2];
        return b
      }
    }();
    q.str = function(a) {
      return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")"
    };
    "undefined" !== typeof b && (b.vec3 = q);
    var x = {
      create: function() {
        var a = new e(4);
        a[0] = 0;
        a[1] = 0;
        a[2] = 0;
        a[3] = 0;
        return a
      },
      clone: function(a) {
        var b = new e(4);
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3];
        return b
      },
      fromValues: function(a, b, c, d) {
        var f = new e(4);
        f[0] = a;
        f[1] = b;
        f[2] = c;
        f[3] = d;
        return f
      },
      copy: function(a, b) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        return a
      },
      set: function(a, b, c, d, e) {
        a[0] = b;
        a[1] = c;
        a[2] = d;
        a[3] = e;
        return a
      },
      add: function(a, b, c) {
        a[0] = b[0] + c[0];
        a[1] = b[1] + c[1];
        a[2] = b[2] + c[2];
        a[3] = b[3] + c[3];
        return a
      },
      subtract: function(a, b, c) {
        a[0] = b[0] - c[0];
        a[1] = b[1] - c[1];
        a[2] = b[2] - c[2];
        a[3] = b[3] - c[3];
        return a
      }
    };
    x.sub = x.subtract;
    x.multiply = function(a, b, c) {
      a[0] = b[0] * c[0];
      a[1] = b[1] * c[1];
      a[2] = b[2] * c[2];
      a[3] = b[3] * c[3];
      return a
    };
    x.mul = x.multiply;
    x.divide = function(a,
      b, c) {
      a[0] = b[0] / c[0];
      a[1] = b[1] / c[1];
      a[2] = b[2] / c[2];
      a[3] = b[3] / c[3];
      return a
    };
    x.div = x.divide;
    x.min = function(a, b, c) {
      a[0] = Math.min(b[0], c[0]);
      a[1] = Math.min(b[1], c[1]);
      a[2] = Math.min(b[2], c[2]);
      a[3] = Math.min(b[3], c[3]);
      return a
    };
    x.max = function(a, b, c) {
      a[0] = Math.max(b[0], c[0]);
      a[1] = Math.max(b[1], c[1]);
      a[2] = Math.max(b[2], c[2]);
      a[3] = Math.max(b[3], c[3]);
      return a
    };
    x.scale = function(a, b, c) {
      a[0] = b[0] * c;
      a[1] = b[1] * c;
      a[2] = b[2] * c;
      a[3] = b[3] * c;
      return a
    };
    x.scaleAndAdd = function(a, b, c, d) {
      a[0] = b[0] + c[0] * d;
      a[1] = b[1] + c[1] * d;
      a[2] = b[2] + c[2] * d;
      a[3] = b[3] + c[3] * d;
      return a
    };
    x.distance = function(a, b) {
      var c = b[0] - a[0],
        d = b[1] - a[1],
        e = b[2] - a[2],
        f = b[3] - a[3];
      return Math.sqrt(c * c + d * d + e * e + f * f)
    };
    x.dist = x.distance;
    x.squaredDistance = function(a, b) {
      var c = b[0] - a[0],
        d = b[1] - a[1],
        e = b[2] - a[2],
        f = b[3] - a[3];
      return c * c + d * d + e * e + f * f
    };
    x.sqrDist = x.squaredDistance;
    x.length = function(a) {
      var b = a[0],
        c = a[1],
        d = a[2];
      a = a[3];
      return Math.sqrt(b * b + c * c + d * d + a * a)
    };
    x.len = x.length;
    x.squaredLength = function(a) {
      var b = a[0],
        c = a[1],
        d = a[2];
      a = a[3];
      return b * b + c * c + d * d + a * a
    };
    x.sqrLen =
      x.squaredLength;
    x.negate = function(a, b) {
      a[0] = -b[0];
      a[1] = -b[1];
      a[2] = -b[2];
      a[3] = -b[3];
      return a
    };
    x.normalize = function(a, b) {
      var c = b[0],
        d = b[1],
        e = b[2],
        f = b[3],
        c = c * c + d * d + e * e + f * f;
      0 < c && (c = 1 / Math.sqrt(c), a[0] = b[0] * c, a[1] = b[1] * c, a[2] = b[2] * c, a[3] = b[3] * c);
      return a
    };
    x.dot = function(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
    };
    x.lerp = function(a, b, c, d) {
      var e = b[0],
        f = b[1],
        r = b[2];
      b = b[3];
      a[0] = e + d * (c[0] - e);
      a[1] = f + d * (c[1] - f);
      a[2] = r + d * (c[2] - r);
      a[3] = b + d * (c[3] - b);
      return a
    };
    x.random = function(a, b) {
      b = b || 1;
      a[0] = f();
      a[1] =
        f();
      a[2] = f();
      a[3] = f();
      x.normalize(a, a);
      x.scale(a, a, b);
      return a
    };
    x.transformMat4 = function(a, b, c) {
      var d = b[0],
        e = b[1],
        f = b[2];
      b = b[3];
      a[0] = c[0] * d + c[4] * e + c[8] * f + c[12] * b;
      a[1] = c[1] * d + c[5] * e + c[9] * f + c[13] * b;
      a[2] = c[2] * d + c[6] * e + c[10] * f + c[14] * b;
      a[3] = c[3] * d + c[7] * e + c[11] * f + c[15] * b;
      return a
    };
    x.transformQuat = function(a, b, c) {
      var d = b[0],
        e = b[1],
        f = b[2];
      b = c[0];
      var r = c[1],
        s = c[2];
      c = c[3];
      var n = c * d + r * f - s * e,
        l = c * e + s * d - b * f,
        m = c * f + b * e - r * d,
        d = -b * d - r * e - s * f;
      a[0] = n * c + d * -b + l * -s - m * -r;
      a[1] = l * c + d * -r + m * -b - n * -s;
      a[2] = m * c + d * -s + n * -r - l * -b;
      return a
    };
    x.forEach = function() {
      var a = x.create();
      return function(b, c, d, e, f, r) {
        c || (c = 4);
        d || (d = 0);
        for (e = e ? Math.min(e * c + d, b.length) : b.length; d < e; d += c) a[0] = b[d], a[1] = b[d + 1], a[2] = b[d + 2], a[3] = b[d + 3], f(a, a, r), b[d] = a[0], b[d + 1] = a[1], b[d + 2] = a[2], b[d + 3] = a[3];
        return b
      }
    }();
    x.str = function(a) {
      return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
    };
    "undefined" !== typeof b && (b.vec4 = x);
    l = {
      create: function() {
        var a = new e(4);
        a[0] = 1;
        a[1] = 0;
        a[2] = 0;
        a[3] = 1;
        return a
      },
      clone: function(a) {
        var b = new e(4);
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3];
        return b
      },
      copy: function(a, b) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        return a
      },
      identity: function(a) {
        a[0] = 1;
        a[1] = 0;
        a[2] = 0;
        a[3] = 1;
        return a
      },
      transpose: function(a, b) {
        if (a === b) {
          var c = b[1];
          a[1] = b[2];
          a[2] = c
        } else a[0] = b[0], a[1] = b[2], a[2] = b[1], a[3] = b[3];
        return a
      },
      invert: function(a, b) {
        var c = b[0],
          d = b[1],
          e = b[2],
          f = b[3],
          r = c * f - e * d;
        if (!r) return null;
        r = 1 / r;
        a[0] = f * r;
        a[1] = -d * r;
        a[2] = -e * r;
        a[3] = c * r;
        return a
      },
      adjoint: function(a, b) {
        var c = b[0];
        a[0] = b[3];
        a[1] = -b[1];
        a[2] = -b[2];
        a[3] = c;
        return a
      },
      determinant: function(a) {
        return a[0] *
          a[3] - a[2] * a[1]
      },
      multiply: function(a, b, c) {
        var d = b[0],
          e = b[1],
          f = b[2];
        b = b[3];
        var r = c[0],
          s = c[1],
          n = c[2];
        c = c[3];
        a[0] = d * r + e * n;
        a[1] = d * s + e * c;
        a[2] = f * r + b * n;
        a[3] = f * s + b * c;
        return a
      }
    };
    l.mul = l.multiply;
    l.rotate = function(a, b, c) {
      var d = b[0],
        e = b[1],
        f = b[2];
      b = b[3];
      var r = Math.sin(c);
      c = Math.cos(c);
      a[0] = d * c + e * r;
      a[1] = d * -r + e * c;
      a[2] = f * c + b * r;
      a[3] = f * -r + b * c;
      return a
    };
    l.scale = function(a, b, c) {
      var d = b[1],
        e = b[2],
        f = b[3],
        r = c[0];
      c = c[1];
      a[0] = b[0] * r;
      a[1] = d * c;
      a[2] = e * r;
      a[3] = f * c;
      return a
    };
    l.str = function(a) {
      return "mat2(" + a[0] + ", " + a[1] + ", " +
        a[2] + ", " + a[3] + ")"
    };
    "undefined" !== typeof b && (b.mat2 = l);
    l = {
      create: function() {
        var a = new e(6);
        a[0] = 1;
        a[1] = 0;
        a[2] = 0;
        a[3] = 1;
        a[4] = 0;
        a[5] = 0;
        return a
      },
      clone: function(a) {
        var b = new e(6);
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3];
        b[4] = a[4];
        b[5] = a[5];
        return b
      },
      copy: function(a, b) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        a[4] = b[4];
        a[5] = b[5];
        return a
      },
      identity: function(a) {
        a[0] = 1;
        a[1] = 0;
        a[2] = 0;
        a[3] = 1;
        a[4] = 0;
        a[5] = 0;
        return a
      },
      invert: function(a, b) {
        var c = b[0],
          d = b[1],
          e = b[2],
          f = b[3],
          r = b[4],
          s = b[5],
          n = c * f - d * e;
        if (!n) return null;
        n = 1 / n;
        a[0] = f * n;
        a[1] = -d * n;
        a[2] = -e * n;
        a[3] = c * n;
        a[4] = (e * s - f * r) * n;
        a[5] = (d * r - c * s) * n;
        return a
      },
      determinant: function(a) {
        return a[0] * a[3] - a[1] * a[2]
      },
      multiply: function(a, b, c) {
        var d = b[0],
          e = b[1],
          f = b[2],
          r = b[3],
          s = b[4];
        b = b[5];
        var n = c[0],
          l = c[1],
          m = c[2],
          p = c[3],
          q = c[4];
        c = c[5];
        a[0] = d * n + e * m;
        a[1] = d * l + e * p;
        a[2] = f * n + r * m;
        a[3] = f * l + r * p;
        a[4] = n * s + m * b + q;
        a[5] = l * s + p * b + c;
        return a
      }
    };
    l.mul = l.multiply;
    l.rotate = function(a, b, c) {
      var d = b[0],
        e = b[1],
        f = b[2],
        r = b[3],
        s = b[4];
      b = b[5];
      var n = Math.sin(c);
      c = Math.cos(c);
      a[0] = d * c + e * n;
      a[1] = -d * n + e * c;
      a[2] =
        f * c + r * n;
      a[3] = -f * n + c * r;
      a[4] = c * s + n * b;
      a[5] = c * b - n * s;
      return a
    };
    l.scale = function(a, b, c) {
      var d = c[0];
      c = c[1];
      a[0] = b[0] * d;
      a[1] = b[1] * c;
      a[2] = b[2] * d;
      a[3] = b[3] * c;
      a[4] = b[4] * d;
      a[5] = b[5] * c;
      return a
    };
    l.translate = function(a, b, c) {
      a[0] = b[0];
      a[1] = b[1];
      a[2] = b[2];
      a[3] = b[3];
      a[4] = b[4] + c[0];
      a[5] = b[5] + c[1];
      return a
    };
    l.str = function(a) {
      return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")"
    };
    "undefined" !== typeof b && (b.mat2d = l);
    var A = {
      create: function() {
        var a = new e(9);
        a[0] = 1;
        a[1] = 0;
        a[2] = 0;
        a[3] = 0;
        a[4] = 1;
        a[5] = 0;
        a[6] = 0;
        a[7] = 0;
        a[8] = 1;
        return a
      },
      fromMat4: function(a, b) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[4];
        a[4] = b[5];
        a[5] = b[6];
        a[6] = b[8];
        a[7] = b[9];
        a[8] = b[10];
        return a
      },
      clone: function(a) {
        var b = new e(9);
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3];
        b[4] = a[4];
        b[5] = a[5];
        b[6] = a[6];
        b[7] = a[7];
        b[8] = a[8];
        return b
      },
      copy: function(a, b) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        a[4] = b[4];
        a[5] = b[5];
        a[6] = b[6];
        a[7] = b[7];
        a[8] = b[8];
        return a
      },
      identity: function(a) {
        a[0] = 1;
        a[1] = 0;
        a[2] = 0;
        a[3] = 0;
        a[4] = 1;
        a[5] = 0;
        a[6] = 0;
        a[7] = 0;
        a[8] = 1;
        return a
      },
      transpose: function(a, b) {
        if (a === b) {
          var c = b[1],
            d = b[2],
            e = b[5];
          a[1] = b[3];
          a[2] = b[6];
          a[3] = c;
          a[5] = b[7];
          a[6] = d;
          a[7] = e
        } else a[0] = b[0], a[1] = b[3], a[2] = b[6], a[3] = b[1], a[4] = b[4], a[5] = b[7], a[6] = b[2], a[7] = b[5], a[8] = b[8];
        return a
      },
      invert: function(a, b) {
        var c = b[0],
          d = b[1],
          e = b[2],
          f = b[3],
          r = b[4],
          s = b[5],
          n = b[6],
          l = b[7],
          m = b[8],
          p = m * r - s * l,
          q = -m * f + s * n,
          y = l * f - r * n,
          t = c * p + d * q + e * y;
        if (!t) return null;
        t = 1 / t;
        a[0] = p * t;
        a[1] = (-m * d + e * l) * t;
        a[2] = (s * d - e * r) * t;
        a[3] = q * t;
        a[4] = (m * c - e * n) * t;
        a[5] = (-s * c + e * f) * t;
        a[6] = y * t;
        a[7] = (-l * c + d * n) * t;
        a[8] = (r * c - d * f) *
          t;
        return a
      },
      adjoint: function(a, b) {
        var c = b[0],
          d = b[1],
          e = b[2],
          f = b[3],
          r = b[4],
          s = b[5],
          n = b[6],
          l = b[7],
          m = b[8];
        a[0] = r * m - s * l;
        a[1] = e * l - d * m;
        a[2] = d * s - e * r;
        a[3] = s * n - f * m;
        a[4] = c * m - e * n;
        a[5] = e * f - c * s;
        a[6] = f * l - r * n;
        a[7] = d * n - c * l;
        a[8] = c * r - d * f;
        return a
      },
      determinant: function(a) {
        var b = a[3],
          c = a[4],
          d = a[5],
          e = a[6],
          f = a[7],
          r = a[8];
        return a[0] * (r * c - d * f) + a[1] * (-r * b + d * e) + a[2] * (f * b - c * e)
      },
      multiply: function(a, b, c) {
        var d = b[0],
          e = b[1],
          f = b[2],
          r = b[3],
          s = b[4],
          n = b[5],
          l = b[6],
          m = b[7];
        b = b[8];
        var p = c[0],
          q = c[1],
          y = c[2],
          t = c[3],
          x = c[4],
          A = c[5],
          N = c[6],
          P = c[7];
        c = c[8];
        a[0] = p * d + q * r + y * l;
        a[1] = p * e + q * s + y * m;
        a[2] = p * f + q * n + y * b;
        a[3] = t * d + x * r + A * l;
        a[4] = t * e + x * s + A * m;
        a[5] = t * f + x * n + A * b;
        a[6] = N * d + P * r + c * l;
        a[7] = N * e + P * s + c * m;
        a[8] = N * f + P * n + c * b;
        return a
      }
    };
    A.mul = A.multiply;
    A.translate = function(a, b, c) {
      var d = b[0],
        e = b[1],
        f = b[2],
        r = b[3],
        s = b[4],
        n = b[5],
        l = b[6],
        m = b[7];
      b = b[8];
      var p = c[0];
      c = c[1];
      a[0] = d;
      a[1] = e;
      a[2] = f;
      a[3] = r;
      a[4] = s;
      a[5] = n;
      a[6] = p * d + c * r + l;
      a[7] = p * e + c * s + m;
      a[8] = p * f + c * n + b;
      return a
    };
    A.rotate = function(a, b, c) {
      var d = b[0],
        e = b[1],
        f = b[2],
        r = b[3],
        s = b[4],
        n = b[5],
        l = b[6],
        m = b[7];
      b = b[8];
      var p = Math.sin(c);
      c = Math.cos(c);
      a[0] = c * d + p * r;
      a[1] = c * e + p * s;
      a[2] = c * f + p * n;
      a[3] = c * r - p * d;
      a[4] = c * s - p * e;
      a[5] = c * n - p * f;
      a[6] = l;
      a[7] = m;
      a[8] = b;
      return a
    };
    A.scale = function(a, b, c) {
      var d = c[0];
      c = c[1];
      a[0] = d * b[0];
      a[1] = d * b[1];
      a[2] = d * b[2];
      a[3] = c * b[3];
      a[4] = c * b[4];
      a[5] = c * b[5];
      a[6] = b[6];
      a[7] = b[7];
      a[8] = b[8];
      return a
    };
    A.fromMat2d = function(a, b) {
      a[0] = b[0];
      a[1] = b[1];
      a[2] = 0;
      a[3] = b[2];
      a[4] = b[3];
      a[5] = 0;
      a[6] = b[4];
      a[7] = b[5];
      a[8] = 1;
      return a
    };
    A.fromQuat = function(a, b) {
      var c = b[0],
        d = b[1],
        e = b[2],
        f = b[3],
        r = c + c,
        s = d + d,
        n = e + e,
        l = c * r,
        m = c * s,
        c = c * n,
        p = d * s,
        d = d * n,
        e =
        e * n,
        r = f * r,
        s = f * s,
        f = f * n;
      a[0] = 1 - (p + e);
      a[3] = m + f;
      a[6] = c - s;
      a[1] = m - f;
      a[4] = 1 - (l + e);
      a[7] = d + r;
      a[2] = c + s;
      a[5] = d - r;
      a[8] = 1 - (l + p);
      return a
    };
    A.normalFromMat4 = function(a, b) {
      var c = b[0],
        d = b[1],
        e = b[2],
        f = b[3],
        r = b[4],
        s = b[5],
        n = b[6],
        l = b[7],
        m = b[8],
        p = b[9],
        q = b[10],
        y = b[11],
        t = b[12],
        x = b[13],
        A = b[14],
        N = b[15],
        P = c * s - d * r,
        S = c * n - e * r,
        Q = c * l - f * r,
        V = d * n - e * s,
        J = d * l - f * s,
        Z = e * l - f * n,
        I = m * x - p * t,
        H = m * A - q * t,
        m = m * N - y * t,
        X = p * A - q * x,
        p = p * N - y * x,
        q = q * N - y * A,
        y = P * q - S * p + Q * X + V * m - J * H + Z * I;
      if (!y) return null;
      y = 1 / y;
      a[0] = (s * q - n * p + l * X) * y;
      a[1] = (n * m - r * q - l * H) * y;
      a[2] = (r * p - s *
        m + l * I) * y;
      a[3] = (e * p - d * q - f * X) * y;
      a[4] = (c * q - e * m + f * H) * y;
      a[5] = (d * m - c * p - f * I) * y;
      a[6] = (x * Z - A * J + N * V) * y;
      a[7] = (A * Q - t * Z - N * S) * y;
      a[8] = (t * J - x * Q + N * P) * y;
      return a
    };
    A.str = function(a) {
      return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")"
    };
    "undefined" !== typeof b && (b.mat3 = A);
    var t = {
      create: function() {
        var a = new e(16);
        a[0] = 1;
        a[1] = 0;
        a[2] = 0;
        a[3] = 0;
        a[4] = 0;
        a[5] = 1;
        a[6] = 0;
        a[7] = 0;
        a[8] = 0;
        a[9] = 0;
        a[10] = 1;
        a[11] = 0;
        a[12] = 0;
        a[13] = 0;
        a[14] = 0;
        a[15] = 1;
        return a
      },
      clone: function(a) {
        var b = new e(16);
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3];
        b[4] = a[4];
        b[5] = a[5];
        b[6] = a[6];
        b[7] = a[7];
        b[8] = a[8];
        b[9] = a[9];
        b[10] = a[10];
        b[11] = a[11];
        b[12] = a[12];
        b[13] = a[13];
        b[14] = a[14];
        b[15] = a[15];
        return b
      },
      copy: function(a, b) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        a[4] = b[4];
        a[5] = b[5];
        a[6] = b[6];
        a[7] = b[7];
        a[8] = b[8];
        a[9] = b[9];
        a[10] = b[10];
        a[11] = b[11];
        a[12] = b[12];
        a[13] = b[13];
        a[14] = b[14];
        a[15] = b[15];
        return a
      },
      identity: function(a) {
        a[0] = 1;
        a[1] = 0;
        a[2] = 0;
        a[3] = 0;
        a[4] = 0;
        a[5] = 1;
        a[6] = 0;
        a[7] = 0;
        a[8] = 0;
        a[9] = 0;
        a[10] = 1;
        a[11] = 0;
        a[12] = 0;
        a[13] =
          0;
        a[14] = 0;
        a[15] = 1;
        return a
      },
      transpose: function(a, b) {
        if (a === b) {
          var c = b[1],
            d = b[2],
            e = b[3],
            f = b[6],
            r = b[7],
            l = b[11];
          a[1] = b[4];
          a[2] = b[8];
          a[3] = b[12];
          a[4] = c;
          a[6] = b[9];
          a[7] = b[13];
          a[8] = d;
          a[9] = f;
          a[11] = b[14];
          a[12] = e;
          a[13] = r;
          a[14] = l
        } else a[0] = b[0], a[1] = b[4], a[2] = b[8], a[3] = b[12], a[4] = b[1], a[5] = b[5], a[6] = b[9], a[7] = b[13], a[8] = b[2], a[9] = b[6], a[10] = b[10], a[11] = b[14], a[12] = b[3], a[13] = b[7], a[14] = b[11], a[15] = b[15];
        return a
      },
      invert: function(a, b) {
        var c = b[0],
          d = b[1],
          e = b[2],
          f = b[3],
          r = b[4],
          l = b[5],
          n = b[6],
          m = b[7],
          p = b[8],
          q = b[9],
          t =
          b[10],
          y = b[11],
          x = b[12],
          A = b[13],
          M = b[14],
          N = b[15],
          P = c * l - d * r,
          S = c * n - e * r,
          Q = c * m - f * r,
          V = d * n - e * l,
          J = d * m - f * l,
          Z = e * m - f * n,
          I = p * A - q * x,
          H = p * M - t * x,
          X = p * N - y * x,
          z = q * M - t * A,
          $ = q * N - y * A,
          aa = t * N - y * M,
          W = P * aa - S * $ + Q * z + V * X - J * H + Z * I;
        if (!W) return null;
        W = 1 / W;
        a[0] = (l * aa - n * $ + m * z) * W;
        a[1] = (e * $ - d * aa - f * z) * W;
        a[2] = (A * Z - M * J + N * V) * W;
        a[3] = (t * J - q * Z - y * V) * W;
        a[4] = (n * X - r * aa - m * H) * W;
        a[5] = (c * aa - e * X + f * H) * W;
        a[6] = (M * Q - x * Z - N * S) * W;
        a[7] = (p * Z - t * Q + y * S) * W;
        a[8] = (r * $ - l * X + m * I) * W;
        a[9] = (d * X - c * $ - f * I) * W;
        a[10] = (x * J - A * Q + N * P) * W;
        a[11] = (q * Q - p * J - y * P) * W;
        a[12] = (l * H - r * z - n * I) * W;
        a[13] =
          (c * z - d * H + e * I) * W;
        a[14] = (A * S - x * V - M * P) * W;
        a[15] = (p * V - q * S + t * P) * W;
        return a
      },
      adjoint: function(a, b) {
        var c = b[0],
          d = b[1],
          e = b[2],
          f = b[3],
          r = b[4],
          l = b[5],
          n = b[6],
          m = b[7],
          p = b[8],
          q = b[9],
          t = b[10],
          y = b[11],
          x = b[12],
          A = b[13],
          M = b[14],
          N = b[15];
        a[0] = l * (t * N - y * M) - q * (n * N - m * M) + A * (n * y - m * t);
        a[1] = -(d * (t * N - y * M) - q * (e * N - f * M) + A * (e * y - f * t));
        a[2] = d * (n * N - m * M) - l * (e * N - f * M) + A * (e * m - f * n);
        a[3] = -(d * (n * y - m * t) - l * (e * y - f * t) + q * (e * m - f * n));
        a[4] = -(r * (t * N - y * M) - p * (n * N - m * M) + x * (n * y - m * t));
        a[5] = c * (t * N - y * M) - p * (e * N - f * M) + x * (e * y - f * t);
        a[6] = -(c * (n * N - m * M) - r * (e * N - f * M) + x *
          (e * m - f * n));
        a[7] = c * (n * y - m * t) - r * (e * y - f * t) + p * (e * m - f * n);
        a[8] = r * (q * N - y * A) - p * (l * N - m * A) + x * (l * y - m * q);
        a[9] = -(c * (q * N - y * A) - p * (d * N - f * A) + x * (d * y - f * q));
        a[10] = c * (l * N - m * A) - r * (d * N - f * A) + x * (d * m - f * l);
        a[11] = -(c * (l * y - m * q) - r * (d * y - f * q) + p * (d * m - f * l));
        a[12] = -(r * (q * M - t * A) - p * (l * M - n * A) + x * (l * t - n * q));
        a[13] = c * (q * M - t * A) - p * (d * M - e * A) + x * (d * t - e * q);
        a[14] = -(c * (l * M - n * A) - r * (d * M - e * A) + x * (d * n - e * l));
        a[15] = c * (l * t - n * q) - r * (d * t - e * q) + p * (d * n - e * l);
        return a
      },
      determinant: function(a) {
        var b = a[0],
          c = a[1],
          d = a[2],
          e = a[3],
          f = a[4],
          l = a[5],
          m = a[6],
          n = a[7],
          p = a[8],
          q =
          a[9],
          t = a[10],
          x = a[11],
          y = a[12],
          A = a[13],
          U = a[14];
        a = a[15];
        return (b * l - c * f) * (t * a - x * U) - (b * m - d * f) * (q * a - x * A) + (b * n - e * f) * (q * U - t * A) + (c * m - d * l) * (p * a - x * y) - (c * n - e * l) * (p * U - t * y) + (d * n - e * m) * (p * A - q * y)
      },
      multiply: function(a, b, c) {
        var d = b[0],
          e = b[1],
          f = b[2],
          l = b[3],
          m = b[4],
          n = b[5],
          p = b[6],
          q = b[7],
          t = b[8],
          x = b[9],
          y = b[10],
          A = b[11],
          U = b[12],
          M = b[13],
          N = b[14];
        b = b[15];
        var P = c[0],
          S = c[1],
          Q = c[2],
          V = c[3];
        a[0] = P * d + S * m + Q * t + V * U;
        a[1] = P * e + S * n + Q * x + V * M;
        a[2] = P * f + S * p + Q * y + V * N;
        a[3] = P * l + S * q + Q * A + V * b;
        P = c[4];
        S = c[5];
        Q = c[6];
        V = c[7];
        a[4] = P * d + S * m + Q * t + V * U;
        a[5] = P * e +
          S * n + Q * x + V * M;
        a[6] = P * f + S * p + Q * y + V * N;
        a[7] = P * l + S * q + Q * A + V * b;
        P = c[8];
        S = c[9];
        Q = c[10];
        V = c[11];
        a[8] = P * d + S * m + Q * t + V * U;
        a[9] = P * e + S * n + Q * x + V * M;
        a[10] = P * f + S * p + Q * y + V * N;
        a[11] = P * l + S * q + Q * A + V * b;
        P = c[12];
        S = c[13];
        Q = c[14];
        V = c[15];
        a[12] = P * d + S * m + Q * t + V * U;
        a[13] = P * e + S * n + Q * x + V * M;
        a[14] = P * f + S * p + Q * y + V * N;
        a[15] = P * l + S * q + Q * A + V * b;
        return a
      }
    };
    t.mul = t.multiply;
    t.translate = function(a, b, c) {
      var d = c[0],
        e = c[1];
      c = c[2];
      var f, l, m, n, p, q, t, x, y, A, U, M;
      b === a ? (a[12] = b[0] * d + b[4] * e + b[8] * c + b[12], a[13] = b[1] * d + b[5] * e + b[9] * c + b[13], a[14] = b[2] * d + b[6] * e + b[10] * c + b[14],
        a[15] = b[3] * d + b[7] * e + b[11] * c + b[15]) : (f = b[0], l = b[1], m = b[2], n = b[3], p = b[4], q = b[5], t = b[6], x = b[7], y = b[8], A = b[9], U = b[10], M = b[11], a[0] = f, a[1] = l, a[2] = m, a[3] = n, a[4] = p, a[5] = q, a[6] = t, a[7] = x, a[8] = y, a[9] = A, a[10] = U, a[11] = M, a[12] = f * d + p * e + y * c + b[12], a[13] = l * d + q * e + A * c + b[13], a[14] = m * d + t * e + U * c + b[14], a[15] = n * d + x * e + M * c + b[15]);
      return a
    };
    t.scale = function(a, b, c) {
      var d = c[0],
        e = c[1];
      c = c[2];
      a[0] = b[0] * d;
      a[1] = b[1] * d;
      a[2] = b[2] * d;
      a[3] = b[3] * d;
      a[4] = b[4] * e;
      a[5] = b[5] * e;
      a[6] = b[6] * e;
      a[7] = b[7] * e;
      a[8] = b[8] * c;
      a[9] = b[9] * c;
      a[10] = b[10] * c;
      a[11] =
        b[11] * c;
      a[12] = b[12];
      a[13] = b[13];
      a[14] = b[14];
      a[15] = b[15];
      return a
    };
    t.rotate = function(a, b, c, e) {
      var f = e[0],
        l = e[1];
      e = e[2];
      var m = Math.sqrt(f * f + l * l + e * e),
        p, n, q, t, x, A, y, R, U, M, N, P, S, Q, V, J, Z, I, H, X;
      if (Math.abs(m) < d) return null;
      m = 1 / m;
      f *= m;
      l *= m;
      e *= m;
      p = Math.sin(c);
      n = Math.cos(c);
      q = 1 - n;
      c = b[0];
      m = b[1];
      t = b[2];
      x = b[3];
      A = b[4];
      y = b[5];
      R = b[6];
      U = b[7];
      M = b[8];
      N = b[9];
      P = b[10];
      S = b[11];
      Q = f * f * q + n;
      V = l * f * q + e * p;
      J = e * f * q - l * p;
      Z = f * l * q - e * p;
      I = l * l * q + n;
      H = e * l * q + f * p;
      X = f * e * q + l * p;
      f = l * e * q - f * p;
      l = e * e * q + n;
      a[0] = c * Q + A * V + M * J;
      a[1] = m * Q + y * V + N * J;
      a[2] = t * Q +
        R * V + P * J;
      a[3] = x * Q + U * V + S * J;
      a[4] = c * Z + A * I + M * H;
      a[5] = m * Z + y * I + N * H;
      a[6] = t * Z + R * I + P * H;
      a[7] = x * Z + U * I + S * H;
      a[8] = c * X + A * f + M * l;
      a[9] = m * X + y * f + N * l;
      a[10] = t * X + R * f + P * l;
      a[11] = x * X + U * f + S * l;
      b !== a && (a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
      return a
    };
    t.rotateX = function(a, b, c) {
      var d = Math.sin(c);
      c = Math.cos(c);
      var e = b[4],
        f = b[5],
        l = b[6],
        m = b[7],
        n = b[8],
        p = b[9],
        q = b[10],
        t = b[11];
      b !== a && (a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
      a[4] = e * c + n * d;
      a[5] = f * c + p * d;
      a[6] = l * c + q * d;
      a[7] = m * c + t * d;
      a[8] =
        n * c - e * d;
      a[9] = p * c - f * d;
      a[10] = q * c - l * d;
      a[11] = t * c - m * d;
      return a
    };
    t.rotateY = function(a, b, c) {
      var d = Math.sin(c);
      c = Math.cos(c);
      var e = b[0],
        f = b[1],
        l = b[2],
        m = b[3],
        n = b[8],
        p = b[9],
        q = b[10],
        t = b[11];
      b !== a && (a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
      a[0] = e * c - n * d;
      a[1] = f * c - p * d;
      a[2] = l * c - q * d;
      a[3] = m * c - t * d;
      a[8] = e * d + n * c;
      a[9] = f * d + p * c;
      a[10] = l * d + q * c;
      a[11] = m * d + t * c;
      return a
    };
    t.rotateZ = function(a, b, c) {
      var d = Math.sin(c);
      c = Math.cos(c);
      var e = b[0],
        f = b[1],
        l = b[2],
        m = b[3],
        n = b[4],
        p = b[5],
        q = b[6],
        t = b[7];
      b !== a && (a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
      a[0] = e * c + n * d;
      a[1] = f * c + p * d;
      a[2] = l * c + q * d;
      a[3] = m * c + t * d;
      a[4] = n * c - e * d;
      a[5] = p * c - f * d;
      a[6] = q * c - l * d;
      a[7] = t * c - m * d;
      return a
    };
    t.fromRotationTranslation = function(a, b, c) {
      var d = b[0],
        e = b[1],
        f = b[2],
        l = b[3],
        m = d + d,
        n = e + e,
        p = f + f;
      b = d * m;
      var q = d * n,
        d = d * p,
        t = e * n,
        e = e * p,
        f = f * p,
        m = l * m,
        n = l * n,
        l = l * p;
      a[0] = 1 - (t + f);
      a[1] = q + l;
      a[2] = d - n;
      a[3] = 0;
      a[4] = q - l;
      a[5] = 1 - (b + f);
      a[6] = e + m;
      a[7] = 0;
      a[8] = d + n;
      a[9] = e - m;
      a[10] = 1 - (b + t);
      a[11] = 0;
      a[12] = c[0];
      a[13] =
        c[1];
      a[14] = c[2];
      a[15] = 1;
      return a
    };
    t.fromQuat = function(a, b) {
      var c = b[0],
        d = b[1],
        e = b[2],
        f = b[3],
        l = c + c,
        m = d + d,
        n = e + e,
        p = c * l,
        q = c * m,
        c = c * n,
        t = d * m,
        d = d * n,
        e = e * n,
        l = f * l,
        m = f * m,
        f = f * n;
      a[0] = 1 - (t + e);
      a[1] = q + f;
      a[2] = c - m;
      a[3] = 0;
      a[4] = q - f;
      a[5] = 1 - (p + e);
      a[6] = d + l;
      a[7] = 0;
      a[8] = c + m;
      a[9] = d - l;
      a[10] = 1 - (p + t);
      a[11] = 0;
      a[12] = 0;
      a[13] = 0;
      a[14] = 0;
      a[15] = 1;
      return a
    };
    t.frustum = function(a, b, c, d, e, f, l) {
      var m = 1 / (c - b),
        n = 1 / (e - d),
        p = 1 / (f - l);
      a[0] = 2 * f * m;
      a[1] = 0;
      a[2] = 0;
      a[3] = 0;
      a[4] = 0;
      a[5] = 2 * f * n;
      a[6] = 0;
      a[7] = 0;
      a[8] = (c + b) * m;
      a[9] = (e + d) * n;
      a[10] = (l + f) * p;
      a[11] = -1;
      a[12] = 0;
      a[13] = 0;
      a[14] = l * f * 2 * p;
      a[15] = 0;
      return a
    };
    t.perspective = function(a, b, c, d, e) {
      b = 1 / Math.tan(b / 2);
      var f = 1 / (d - e);
      a[0] = b / c;
      a[1] = 0;
      a[2] = 0;
      a[3] = 0;
      a[4] = 0;
      a[5] = b;
      a[6] = 0;
      a[7] = 0;
      a[8] = 0;
      a[9] = 0;
      a[10] = (e + d) * f;
      a[11] = -1;
      a[12] = 0;
      a[13] = 0;
      a[14] = 2 * e * d * f;
      a[15] = 0;
      return a
    };
    t.ortho = function(a, b, c, d, e, f, l) {
      var m = 1 / (b - c),
        n = 1 / (d - e),
        p = 1 / (f - l);
      a[0] = -2 * m;
      a[1] = 0;
      a[2] = 0;
      a[3] = 0;
      a[4] = 0;
      a[5] = -2 * n;
      a[6] = 0;
      a[7] = 0;
      a[8] = 0;
      a[9] = 0;
      a[10] = 2 * p;
      a[11] = 0;
      a[12] = (b + c) * m;
      a[13] = (e + d) * n;
      a[14] = (l + f) * p;
      a[15] = 1;
      return a
    };
    t.lookAt = function(a, b, c,
      e) {
      var f, l, m, p, n, q, x, A, T = b[0],
        y = b[1];
      b = b[2];
      m = e[0];
      p = e[1];
      l = e[2];
      x = c[0];
      e = c[1];
      f = c[2];
      if (Math.abs(T - x) < d && Math.abs(y - e) < d && Math.abs(b - f) < d) return t.identity(a);
      c = T - x;
      e = y - e;
      x = b - f;
      A = 1 / Math.sqrt(c * c + e * e + x * x);
      c *= A;
      e *= A;
      x *= A;
      f = p * x - l * e;
      l = l * c - m * x;
      m = m * e - p * c;
      (A = Math.sqrt(f * f + l * l + m * m)) ? (A = 1 / A, f *= A, l *= A, m *= A) : m = l = f = 0;
      p = e * m - x * l;
      n = x * f - c * m;
      q = c * l - e * f;
      (A = Math.sqrt(p * p + n * n + q * q)) ? (A = 1 / A, p *= A, n *= A, q *= A) : q = n = p = 0;
      a[0] = f;
      a[1] = p;
      a[2] = c;
      a[3] = 0;
      a[4] = l;
      a[5] = n;
      a[6] = e;
      a[7] = 0;
      a[8] = m;
      a[9] = q;
      a[10] = x;
      a[11] = 0;
      a[12] = -(f * T + l * y + m * b);
      a[13] = -(p * T + n * y + q * b);
      a[14] = -(c * T + e * y + x * b);
      a[15] = 1;
      return a
    };
    t.str = function(a) {
      return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")"
    };
    "undefined" !== typeof b && (b.mat4 = t);
    var a = {
      create: function() {
        var a = new e(4);
        a[0] = 0;
        a[1] = 0;
        a[2] = 0;
        a[3] = 1;
        return a
      }
    };
    a.rotationTo = function() {
      var b = q.create(),
        c = q.fromValues(1, 0, 0),
        d = q.fromValues(0, 1, 0);
      return function(e, f, l) {
        var m = q.dot(f, l);
        if (-0.999999 >
          m) return q.cross(b, c, f), 1E-6 > q.length(b) && q.cross(b, d, f), q.normalize(b, b), a.setAxisAngle(e, b, Math.PI), e;
        if (0.999999 < m) return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e;
        q.cross(b, f, l);
        e[0] = b[0];
        e[1] = b[1];
        e[2] = b[2];
        e[3] = 1 + m;
        return a.normalize(e, e)
      }
    }();
    a.setAxes = function() {
      var b = A.create();
      return function(c, d, e, f) {
        b[0] = e[0];
        b[3] = e[1];
        b[6] = e[2];
        b[1] = f[0];
        b[4] = f[1];
        b[7] = f[2];
        b[2] = d[0];
        b[5] = d[1];
        b[8] = d[2];
        return a.normalize(c, a.fromMat3(c, b))
      }
    }();
    a.clone = x.clone;
    a.fromValues = x.fromValues;
    a.copy = x.copy;
    a.set = x.set;
    a.identity =
      function(a) {
        a[0] = 0;
        a[1] = 0;
        a[2] = 0;
        a[3] = 1;
        return a
      };
    a.setAxisAngle = function(a, b, c) {
      c *= 0.5;
      var d = Math.sin(c);
      a[0] = d * b[0];
      a[1] = d * b[1];
      a[2] = d * b[2];
      a[3] = Math.cos(c);
      return a
    };
    a.add = x.add;
    a.multiply = function(a, b, c) {
      var d = b[0],
        e = b[1],
        f = b[2];
      b = b[3];
      var l = c[0],
        m = c[1],
        n = c[2];
      c = c[3];
      a[0] = d * c + b * l + e * n - f * m;
      a[1] = e * c + b * m + f * l - d * n;
      a[2] = f * c + b * n + d * m - e * l;
      a[3] = b * c - d * l - e * m - f * n;
      return a
    };
    a.mul = a.multiply;
    a.scale = x.scale;
    a.rotateX = function(a, b, c) {
      c *= 0.5;
      var d = b[0],
        e = b[1],
        f = b[2];
      b = b[3];
      var l = Math.sin(c);
      c = Math.cos(c);
      a[0] =
        d * c + b * l;
      a[1] = e * c + f * l;
      a[2] = f * c - e * l;
      a[3] = b * c - d * l;
      return a
    };
    a.rotateY = function(a, b, c) {
      c *= 0.5;
      var d = b[0],
        e = b[1],
        f = b[2];
      b = b[3];
      var l = Math.sin(c);
      c = Math.cos(c);
      a[0] = d * c - f * l;
      a[1] = e * c + b * l;
      a[2] = f * c + d * l;
      a[3] = b * c - e * l;
      return a
    };
    a.rotateZ = function(a, b, c) {
      c *= 0.5;
      var d = b[0],
        e = b[1],
        f = b[2];
      b = b[3];
      var l = Math.sin(c);
      c = Math.cos(c);
      a[0] = d * c + e * l;
      a[1] = e * c - d * l;
      a[2] = f * c + b * l;
      a[3] = b * c - f * l;
      return a
    };
    a.calculateW = function(a, b) {
      var c = b[0],
        d = b[1],
        e = b[2];
      a[0] = c;
      a[1] = d;
      a[2] = e;
      a[3] = -Math.sqrt(Math.abs(1 - c * c - d * d - e * e));
      return a
    };
    a.dot =
      x.dot;
    a.lerp = x.lerp;
    a.slerp = function(a, b, c, d) {
      var e = b[0],
        f = b[1],
        l = b[2];
      b = b[3];
      var m = c[0],
        n = c[1],
        p = c[2];
      c = c[3];
      var q, t, x;
      t = e * m + f * n + l * p + b * c;
      0 > t && (t = -t, m = -m, n = -n, p = -p, c = -c);
      1E-6 < 1 - t ? (q = Math.acos(t), x = Math.sin(q), t = Math.sin((1 - d) * q) / x, d = Math.sin(d * q) / x) : t = 1 - d;
      a[0] = t * e + d * m;
      a[1] = t * f + d * n;
      a[2] = t * l + d * p;
      a[3] = t * b + d * c;
      return a
    };
    a.invert = function(a, b) {
      var c = b[0],
        d = b[1],
        e = b[2],
        f = b[3],
        l = c * c + d * d + e * e + f * f,
        l = l ? 1 / l : 0;
      a[0] = -c * l;
      a[1] = -d * l;
      a[2] = -e * l;
      a[3] = f * l;
      return a
    };
    a.conjugate = function(a, b) {
      a[0] = -b[0];
      a[1] = -b[1];
      a[2] = -b[2];
      a[3] = b[3];
      return a
    };
    a.length = x.length;
    a.len = a.length;
    a.squaredLength = x.squaredLength;
    a.sqrLen = a.squaredLength;
    a.normalize = x.normalize;
    a.fromMat3 = function() {
      var a = "undefined" !== typeof Int8Array ? new Int8Array([1, 2, 0]) : [1, 2, 0];
      return function(b, c) {
        var d = c[0] + c[4] + c[8];
        if (0 < d) d = Math.sqrt(d + 1), b[3] = 0.5 * d, d = 0.5 / d, b[0] = (c[7] - c[5]) * d, b[1] = (c[2] - c[6]) * d, b[2] = (c[3] - c[1]) * d;
        else {
          var e = 0;
          c[4] > c[0] && (e = 1);
          c[8] > c[3 * e + e] && (e = 2);
          var f = a[e],
            l = a[f],
            d = Math.sqrt(c[3 * e + e] - c[3 * f + f] - c[3 * l + l] + 1);
          b[e] = 0.5 * d;
          d = 0.5 / d;
          b[3] = (c[3 * l + f] - c[3 * f + l]) * d;
          b[f] = (c[3 * f + e] + c[3 * e + f]) * d;
          b[l] = (c[3 * l + e] + c[3 * e + l]) * d
        }
        return b
      }
    }();
    a.str = function(a) {
      return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
    };
    "undefined" !== typeof b && (b.quat = a)
  })(f)
})(this);

(function() {
  function b(a) {
    throw a;
  }

  function f(a, b) {
    var c = a.split("."),
      d = L;
    c[0] in d || !d.execScript || d.execScript("var " + c[0]);
    var e;
    for (e; c.length && (e = c.shift());) c.length || b === s ? d = d[e] ? d[e] : d[e] = {} : d[e] = b
  }

  function c(a, c) {
    this.index = "number" === typeof c ? c : 0;
    this.i = 0;
    this.buffer = a instanceof(K ? Uint8Array : Array) ? a : new(K ? Uint8Array : Array)(32768);
    2 * this.buffer.length <= this.index && b(Error("invalid index"));
    this.buffer.length <= this.index && this.f()
  }

  function d(a) {
    this.buffer = new(K ? Uint16Array : Array)(2 * a);
    this.length =
      0
  }

  function e(a) {
    var b = a.length,
      c = 0,
      d = Number.POSITIVE_INFINITY,
      e, f, k, l, m, n, p, q, h;
    for (q = 0; q < b; ++q) a[q] > c && (c = a[q]), a[q] < d && (d = a[q]);
    e = 1 << c;
    f = new(K ? Uint32Array : Array)(e);
    k = 1;
    l = 0;
    for (m = 2; k <= c;) {
      for (q = 0; q < b; ++q)
        if (a[q] === k) {
          n = 0;
          p = l;
          for (h = 0; h < k; ++h) n = n << 1 | p & 1, p >>= 1;
          for (h = n; h < e; h += m) f[h] = k << 16 | q;
          ++l
        }++k;
      l <<= 1;
      m <<= 1
    }
    return [f, c, d]
  }

  function m(a, b) {
    this.h = N;
    this.w = 0;
    this.input = K && a instanceof Array ? new Uint8Array(a) : a;
    this.b = 0;
    b && (b.lazy && (this.w = b.lazy), "number" === typeof b.compressionType && (this.h = b.compressionType),
      b.outputBuffer && (this.a = K && b.outputBuffer instanceof Array ? new Uint8Array(b.outputBuffer) : b.outputBuffer), "number" === typeof b.outputIndex && (this.b = b.outputIndex));
    this.a || (this.a = new(K ? Uint8Array : Array)(32768))
  }

  function l(a, b) {
    this.length = a;
    this.G = b
  }

  function p(a, c) {
    function d(a, c) {
      var e = a.G,
        f = [],
        g = 0,
        k;
      k = S[a.length];
      f[g++] = k & 65535;
      f[g++] = k >> 16 & 255;
      f[g++] = k >> 24;
      var l;
      switch (n) {
        case 1 === e:
          l = [0, e - 1, 0];
          break;
        case 2 === e:
          l = [1, e - 2, 0];
          break;
        case 3 === e:
          l = [2, e - 3, 0];
          break;
        case 4 === e:
          l = [3, e - 4, 0];
          break;
        case 6 >=
        e:
          l = [4, e - 5, 1];
          break;
        case 8 >= e:
          l = [5, e - 7, 1];
          break;
        case 12 >= e:
          l = [6, e - 9, 2];
          break;
        case 16 >= e:
          l = [7, e - 13, 2];
          break;
        case 24 >= e:
          l = [8, e - 17, 3];
          break;
        case 32 >= e:
          l = [9, e - 25, 3];
          break;
        case 48 >= e:
          l = [10, e - 33, 4];
          break;
        case 64 >= e:
          l = [11, e - 49, 4];
          break;
        case 96 >= e:
          l = [12, e - 65, 5];
          break;
        case 128 >= e:
          l = [13, e - 97, 5];
          break;
        case 192 >= e:
          l = [14, e - 129, 6];
          break;
        case 256 >= e:
          l = [15, e - 193, 6];
          break;
        case 384 >= e:
          l = [16, e - 257, 7];
          break;
        case 512 >= e:
          l = [17, e - 385, 7];
          break;
        case 768 >= e:
          l = [18, e - 513, 8];
          break;
        case 1024 >= e:
          l = [19, e - 769, 8];
          break;
        case 1536 >=
        e:
          l = [20, e - 1025, 9];
          break;
        case 2048 >= e:
          l = [21, e - 1537, 9];
          break;
        case 3072 >= e:
          l = [22, e - 2049, 10];
          break;
        case 4096 >= e:
          l = [23, e - 3073, 10];
          break;
        case 6144 >= e:
          l = [24, e - 4097, 11];
          break;
        case 8192 >= e:
          l = [25, e - 6145, 11];
          break;
        case 12288 >= e:
          l = [26, e - 8193, 12];
          break;
        case 16384 >= e:
          l = [27, e - 12289, 12];
          break;
        case 24576 >= e:
          l = [28, e - 16385, 13];
          break;
        case 32768 >= e:
          l = [29, e - 24577, 13];
          break;
        default:
          b("invalid distance")
      }
      k = l;
      f[g++] = k[0];
      f[g++] = k[1];
      f[g++] = k[2];
      e = 0;
      for (g = f.length; e < g; ++e) u[h++] = f[e];
      x[f[0]]++;
      w[f[3]]++;
      v = a.length + c - 1;
      t = null
    }
    var e, f, k, l, m, p = {},
      r, t, u = K ? new Uint16Array(2 * c.length) : [],
      h = 0,
      v = 0,
      x = new(K ? Uint32Array : Array)(286),
      w = new(K ? Uint32Array : Array)(30),
      y = a.w,
      A;
    if (!K) {
      for (k = 0; 285 >= k;) x[k++] = 0;
      for (k = 0; 29 >= k;) w[k++] = 0
    }
    x[256] = 1;
    e = 0;
    for (f = c.length; e < f; ++e) {
      k = m = 0;
      for (l = 3; k < l && e + k !== f; ++k) m = m << 8 | c[e + k];
      p[m] === s && (p[m] = []);
      k = p[m];
      if (!(0 < v--)) {
        for (; 0 < k.length && 32768 < e - k[0];) k.shift();
        if (e + 3 >= f) {
          t && d(t, -1);
          k = 0;
          for (l = f - e; k < l; ++k) A = c[e + k], u[h++] = A, ++x[A];
          break
        }
        0 < k.length ? (r = q(c, e, k), t ? t.length < r.length ? (A = c[e - 1], u[h++] = A, ++x[A],
          d(r, 0)) : d(t, -1) : r.length < y ? t = r : d(r, 0)) : t ? d(t, -1) : (A = c[e], u[h++] = A, ++x[A])
      }
      k.push(e)
    }
    u[h++] = 256;
    x[256]++;
    a.L = x;
    a.K = w;
    return K ? u.subarray(0, h) : u
  }

  function q(a, b, c) {
    var d, e, f = 0,
      k, m, n, p = a.length;
    var cont = false;
    m = 0;
    n = c.length;
    for (; m < n; m++) {
      d = c[n - m - 1];
      k = 3;
      if (3 < f) {
        for (k = f; 3 < k; k--)
          if (a[d + k - 1] !== a[b + k - 1]) {
            cont = true;
            break;
          }
        if (cont) {
          cont = false;
          continue;
        }
        k = f
      }
      for (; 258 > k && b + k < p && a[d + k] === a[b + k];) ++k;
      k > f && (e = d, f = k);
      if (258 === k) break
    }
    return new l(f, b - e)
  }

  function x(a, b) {
    var c = a.length,
      e = new d(572),
      f = new(K ? Uint8Array : Array)(c),
      k, l, m;
    if (!K)
      for (l = 0; l < c; l++) f[l] = 0;
    for (l =
      0; l < c; ++l) 0 < a[l] && e.push(l, a[l]);
    c = Array(e.length / 2);
    k = new(K ? Uint32Array : Array)(e.length / 2);
    if (1 === c.length) return f[e.pop().index] = 1, f;
    l = 0;
    for (m = e.length / 2; l < m; ++l) c[l] = e.pop(), k[l] = c[l].value;
    e = A(k, k.length, b);
    l = 0;
    for (m = c.length; l < m; ++l) f[c[l].index] = e[l];
    return f
  }

  function A(a, b, c) {
    function e(a) {
      var c = m[a][n[a]];
      c === b ? (e(a + 1), e(a + 1)) : --k[c];
      ++n[a]
    }
    var d = new(K ? Uint16Array : Array)(c),
      f = new(K ? Uint8Array : Array)(c),
      k = new(K ? Uint8Array : Array)(b),
      l = Array(c),
      m = Array(c),
      n = Array(c),
      p = (1 << c) - b,
      q = 1 << c - 1,
      h, r;
    d[c - 1] = b;
    for (h = 0; h < c; ++h) p < q ? f[h] = 0 : (f[h] = 1, p -= q), p <<= 1, d[c - 2 - h] = (d[c - 1 - h] / 2 | 0) + b;
    d[0] = f[0];
    l[0] = Array(d[0]);
    m[0] = Array(d[0]);
    for (h = 1; h < c; ++h) d[h] > 2 * d[h - 1] + f[h] && (d[h] = 2 * d[h - 1] + f[h]), l[h] = Array(d[h]), m[h] = Array(d[h]);
    for (p = 0; p < b; ++p) k[p] = c;
    for (q = 0; q < d[c - 1]; ++q) l[c - 1][q] = a[q], m[c - 1][q] = q;
    for (p = 0; p < c; ++p) n[p] = 0;
    1 === f[c - 1] && (--k[0], ++n[c - 1]);
    for (h = c - 2; 0 <= h; --h) {
      c = p = 0;
      r = n[h + 1];
      for (q = 0; q < d[h]; q++) c = l[h + 1][r] + l[h + 1][r + 1], c > a[p] ? (l[h][q] = c, m[h][q] = b, r += 2) : (l[h][q] = a[p], m[h][q] = p, ++p);
      n[h] = 0;
      1 === f[h] &&
        e(h)
    }
    return k
  }

  function t(a) {
    var b = new(K ? Uint16Array : Array)(a.length),
      c = [],
      d = [],
      e = 0,
      f, k, l;
    f = 0;
    for (k = a.length; f < k; f++) c[a[f]] = (c[a[f]] | 0) + 1;
    f = 1;
    for (k = 16; f <= k; f++) d[f] = e, e += c[f] | 0, e <<= 1;
    f = 0;
    for (k = a.length; f < k; f++)
      for (e = d[a[f]], d[a[f]] += 1, c = b[f] = 0, l = a[f]; c < l; c++) b[f] = b[f] << 1 | e & 1, e >>>= 1;
    return b
  }

  function a(a, c) {
    this.l = [];
    this.m = 32768;
    this.e = this.g = this.c = this.q = 0;
    this.input = K ? new Uint8Array(a) : a;
    this.s = !1;
    this.n = V;
    this.B = !1;
    if (c || !(c = {})) c.index && (this.c = c.index), c.bufferSize && (this.m = c.bufferSize), c.bufferType &&
      (this.n = c.bufferType), c.resize && (this.B = c.resize);
    switch (this.n) {
      case Q:
        this.b = 32768;
        this.a = new(K ? Uint8Array : Array)(32768 + this.m + 258);
        break;
      case V:
        this.b = 0;
        this.a = new(K ? Uint8Array : Array)(this.m);
        this.f = this.J;
        this.t = this.H;
        this.o = this.I;
        break;
      default:
        b(Error("invalid inflate mode"))
    }
  }

  function B(a, c) {
    var d, e, f, k, l;
    for (d = a.g, e = a.e, f = a.input, k = a.c; e < c;) l = f[k++], l === s && b(Error("input buffer is broken")), d |= l << e, e += 8;
    a.g = d >>> c;
    a.e = e - c;
    a.c = k;
    return d & (1 << c) - 1
  }

  function v(a, b) {
    var c, d, e, f, k, l, m;
    for (c = a.g, d = a.e, e = a.input, f = a.c,
      k = b[0], l = b[1]; d < l;) {
      m = e[f++];
      if (m === s) break;
      c |= m << d;
      d += 8
    }
    e = k[c & (1 << l) - 1];
    k = e >>> 16;
    a.g = c >> k;
    a.e = d - k;
    a.c = f;
    return e & 65535
  }

  function C(a) {
    function b(a, c, d) {
      var e, f, h, k;
      for (k = 0; k < a;) switch (e = v(this, c), e) {
        case 16:
          for (h = 3 + B(this, 2); h--;) d[k++] = f;
          break;
        case 17:
          for (h = 3 + B(this, 3); h--;) d[k++] = 0;
          f = 0;
          break;
        case 18:
          for (h = 11 + B(this, 7); h--;) d[k++] = 0;
          f = 0;
          break;
        default:
          f = d[k++] = e
      }
      return d
    }
    var c = B(a, 5) + 257,
      d = B(a, 5) + 1,
      f = B(a, 4) + 4,
      k = new(K ? Uint8Array : Array)(J.length),
      l;
    for (l = 0; l < f; ++l) k[J[l]] = B(a, 3);
    f = e(k);
    k = new(K ?
      Uint8Array : Array)(c);
    l = new(K ? Uint8Array : Array)(d);
    a.o(e(b.call(a, c, f, k)), e(b.call(a, d, f, l)))
  }

  function u(a) {
    if ("string" === typeof a) {
      a = a.split("");
      var b, c;
      b = 0;
      for (c = a.length; b < c; b++) a[b] = (a[b].charCodeAt(0) & 255) >>> 0
    }
    b = 1;
    c = 0;
    var d, e, f;
    for (d = a.length, f = 0; 0 < d;) {
      e = 1024 < d ? 1024 : d;
      d -= e;
      do {
        b += a[f++], c += b;
      } while (--e);
      b %= 65521;
      c %= 65521
    }
    return (c << 16 | b) >>> 0
  }

  function w(c, d) {
    var e, f;
    this.input = c;
    this.c = 0;
    if (d || !(d = {})) d.index && (this.c = d.index), d.verify && (this.M = d.verify);
    e = c[this.c++];
    f = c[this.c++];
    switch (e & 15) {
      case W:
        this.method =
          W;
        break;
      default:
        b(Error("unsupported compression method"))
    }
    0 !== ((e << 8) + f) % 31 && b(Error("invalid fcheck flag:" + ((e << 8) + f) % 31));
    f & 32 && b(Error("fdict flag is not supported"));
    this.A = new a(c, {
      index: this.c,
      bufferSize: d.bufferSize,
      bufferType: d.bufferType,
      resize: d.resize
    })
  }

  function F(a, b) {
    this.input = a;
    this.a = new(K ? Uint8Array : Array)(32768);
    this.h = k.k;
    var c = {},
      d;
    !b && (b = {}) || "number" !== typeof b.compressionType || (this.h = b.compressionType);
    for (d in b) c[d] = b[d];
    c.outputBuffer = this.a;
    this.z = new m(this.input, c)
  }

  function r(a, b) {
    var c, d, e, k;
    if (Object.keys) c = Object.keys(b);
    else
      for (d in c = [], e = 0, b) c[e++] = d;
    e = 0;
    for (k = c.length; e < k; ++e) d = c[e], f(a + "." + d, b[d])
  }
  var s = void 0,
    n = !0,
    L = this,
    K = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Uint32Array;
  c.prototype.f = function() {
    var a = this.buffer,
      b, c = a.length,
      d = new(K ? Uint8Array : Array)(c << 1);
    if (K) d.set(a);
    else
      for (b = 0; b < c; ++b) d[b] = a[b];
    return this.buffer = d
  };
  c.prototype.d = function(a, b, c) {
    var d = this.buffer,
      e = this.index,
      f = this.i,
      k = d[e];
    c && 1 < b && (a = 8 < b ? (M[a & 255] << 24 | M[a >>> 8 & 255] << 16 | M[a >>> 16 & 255] << 8 | M[a >>> 24 & 255]) >> 32 - b : M[a] >> 8 - b);
    if (8 > b + f) k = k << b | a, f += b;
    else
      for (c = 0; c < b; ++c) k = k << 1 | a >> b - c - 1 & 1, 8 === ++f && (f = 0, d[e++] = M[k], k = 0, e === d.length && (d = this.f()));
    d[e] = k;
    this.buffer = d;
    this.i = f;
    this.index = e
  };
  c.prototype.finish = function() {
    var a = this.buffer,
      b = this.index,
      c;
    0 < this.i && (a[b] <<= 8 - this.i, a[b] = M[a[b]], b++);
    K ? c = a.subarray(0, b) : (a.length = b, c = a);
    return c
  };
  var Y = new(K ? Uint8Array : Array)(256),
    T;
  var y, R, U;
  for (T = 0; 256 > T; ++T) {
    for (y = T, R = y, U = 7, y = y >>> 1; y; y >>>=
      1) R <<= 1, R |= y & 1, --U;
    Y[T] = (R << U & 255) >>> 0
  }
  var M = Y;
  d.prototype.getParent = function(a) {
    return 2 * ((a - 2) / 4 | 0)
  };
  d.prototype.push = function(a, b) {
    var c, d, e = this.buffer,
      f;
    c = this.length;
    e[this.length++] = b;
    for (e[this.length++] = a; 0 < c;)
      if (d = this.getParent(c), e[c] > e[d]) f = e[c], e[c] = e[d], e[d] = f, f = e[c + 1], e[c + 1] = e[d + 1], e[d + 1] = f, c = d;
      else break;
    return this.length
  };
  d.prototype.pop = function() {
    var a, b, c = this.buffer,
      d, e, f;
    b = c[0];
    a = c[1];
    this.length -= 2;
    c[0] = c[this.length];
    c[1] = c[this.length + 1];
    for (f = 0;;) {
      e = 2 * f + 2;
      if (e >= this.length) break;
      e + 2 < this.length && c[e + 2] > c[e] && (e += 2);
      if (c[e] > c[f]) d = c[f], c[f] = c[e], c[e] = d, d = c[f + 1], c[f + 1] = c[e + 1], c[e + 1] = d;
      else break;
      f = e
    }
    return {
      index: a,
      value: b,
      length: this.length
    }
  };
  var N = 2,
    Y = {
      NONE: 0,
      r: 1,
      k: N,
      N: 3
    },
    P = [];
  for (T = 0; 288 > T; T++) switch (n) {
    case 143 >= T:
      P.push([T + 48, 8]);
      break;
    case 255 >= T:
      P.push([T - 144 + 400, 9]);
      break;
    case 279 >= T:
      P.push([T - 256 + 0, 7]);
      break;
    case 287 >= T:
      P.push([T - 280 + 192, 8]);
      break;
    default:
      b("invalid literal: " + T)
  }
  m.prototype.j = function() {
    var a, d, e, f, k = this.input;
    switch (this.h) {
      case 0:
        e = 0;
        for (f = k.length; e <
          f;) {
          d = K ? k.subarray(e, e + 65535) : k.slice(e, e + 65535);
          e += d.length;
          var l = e === f,
            m = s,
            q = m = s,
            q = m = s,
            r = this.a,
            u = this.b;
          if (K) {
            for (r = new Uint8Array(this.a.buffer); r.length <= u + d.length + 5;) r = new Uint8Array(r.length << 1);
            r.set(this.a)
          }
          m = l ? 1 : 0;
          r[u++] = m | 0;
          m = d.length;
          q = ~m + 65536 & 65535;
          r[u++] = m & 255;
          r[u++] = m >>> 8 & 255;
          r[u++] = q & 255;
          r[u++] = q >>> 8 & 255;
          if (K) r.set(d, u), u += d.length, r = r.subarray(0, u);
          else {
            m = 0;
            for (q = d.length; m < q; ++m) r[u++] = d[m];
            r.length = u
          }
          this.b = u;
          this.a = r
        }
        break;
      case 1:
        e = new c(K ? new Uint8Array(this.a.buffer) : this.a,
          this.b);
        e.d(1, 1, n);
        e.d(1, 2, n);
        k = p(this, k);
        d = 0;
        for (l = k.length; d < l; d++)
          if (f = k[d], c.prototype.d.apply(e, P[f]), 256 < f) e.d(k[++d], k[++d], n), e.d(k[++d], 5), e.d(k[++d], k[++d], n);
          else if (256 === f) break;
        this.a = e.finish();
        this.b = this.a.length;
        break;
      case N:
        f = new c(K ? new Uint8Array(this.a.buffer) : this.a, this.b);
        var v, w, h, y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
          A, B, m = Array(19),
          z, r = N;
        f.d(1, 1, n);
        f.d(r, 2, n);
        k = p(this, k);
        q = x(this.L, 15);
        A = t(q);
        r = x(this.K, 7);
        u = t(r);
        for (v = 286; 257 < v && 0 === q[v - 1]; v--);
        for (w = 30; 1 <
          w && 0 === r[w - 1]; w--);
        var C = v,
          F = w;
        a = new(K ? Uint32Array : Array)(C + F);
        var H = new(K ? Uint32Array : Array)(316),
          I, J;
        B = new(K ? Uint8Array : Array)(19);
        for (z = h = 0; z < C; z++) a[h++] = q[z];
        for (z = 0; z < F; z++) a[h++] = r[z];
        if (!K)
          for (z = 0, F = B.length; z < F; ++z) B[z] = 0;
        z = I = 0;
        for (F = a.length; z < F; z += h) {
          for (h = 1; z + h < F && a[z + h] === a[z]; ++h);
          C = h;
          if (0 === a[z])
            if (3 > C)
              for (; 0 < C--;) H[I++] = 0, B[0]++;
            else
              for (; 0 < C;) J = 138 > C ? C : 138, J > C - 3 && J < C && (J = C - 3), 10 >= J ? (H[I++] = 17, H[I++] = J - 3, B[17]++) : (H[I++] = 18, H[I++] = J - 11, B[18]++), C -= J;
          else if (H[I++] = a[z], B[a[z]]++,
            C--, 3 > C)
            for (; 0 < C--;) H[I++] = a[z], B[a[z]]++;
          else
            for (; 0 < C;) J = 6 > C ? C : 6, J > C - 3 && J < C && (J = C - 3), H[I++] = 16, H[I++] = J - 3, B[16]++, C -= J
        }
        a = K ? H.subarray(0, I) : H.slice(0, I);
        B = x(B, 7);
        for (z = 0; 19 > z; z++) m[z] = B[y[z]];
        for (h = 19; 4 < h && 0 === m[h - 1]; h--);
        y = t(B);
        f.d(v - 257, 5, n);
        f.d(w - 1, 5, n);
        f.d(h - 4, 4, n);
        for (z = 0; z < h; z++) f.d(m[z], 3, n);
        z = 0;
        for (m = a.length; z < m; z++)
          if (d = a[z], f.d(y[d], B[d], n), 16 <= d) {
            z++;
            switch (d) {
              case 16:
                l = 2;
                break;
              case 17:
                l = 3;
                break;
              case 18:
                l = 7;
                break;
              default:
                b("invalid code: " + d)
            }
            f.d(a[z], l, n)
          }
        l = [A, q];
        u = [u, r];
        d = l[0];
        l = l[1];
        r = u[0];
        A = u[1];
        u = 0;
        for (m = k.length; u < m; ++u)
          if (e = k[u], f.d(d[e], l[e], n), 256 < e) f.d(k[++u], k[++u], n), q = k[++u], f.d(r[q], A[q], n), f.d(k[++u], k[++u], n);
          else if (256 === e) break;
        this.a = f.finish();
        this.b = this.a.length;
        break;
      default:
        b("invalid compression type")
    }
    return this.a
  };
  T = function() {
    function a(c) {
      switch (n) {
        case 3 === c:
          return [257, c - 3, 0];
        case 4 === c:
          return [258, c - 4, 0];
        case 5 === c:
          return [259, c - 5, 0];
        case 6 === c:
          return [260, c - 6, 0];
        case 7 === c:
          return [261, c - 7, 0];
        case 8 === c:
          return [262, c - 8, 0];
        case 9 === c:
          return [263, c - 9, 0];
        case 10 === c:
          return [264, c - 10, 0];
        case 12 >= c:
          return [265, c - 11, 1];
        case 14 >= c:
          return [266, c - 13, 1];
        case 16 >= c:
          return [267, c - 15, 1];
        case 18 >= c:
          return [268, c - 17, 1];
        case 22 >= c:
          return [269, c - 19, 2];
        case 26 >= c:
          return [270, c - 23, 2];
        case 30 >= c:
          return [271, c - 27, 2];
        case 34 >= c:
          return [272, c - 31, 2];
        case 42 >= c:
          return [273, c - 35, 3];
        case 50 >= c:
          return [274, c - 43, 3];
        case 58 >= c:
          return [275, c - 51, 3];
        case 66 >= c:
          return [276, c - 59, 3];
        case 82 >= c:
          return [277, c - 67, 4];
        case 98 >= c:
          return [278, c - 83, 4];
        case 114 >= c:
          return [279, c - 99, 4];
        case 130 >= c:
          return [280,
            c - 115, 4
          ];
        case 162 >= c:
          return [281, c - 131, 5];
        case 194 >= c:
          return [282, c - 163, 5];
        case 226 >= c:
          return [283, c - 195, 5];
        case 257 >= c:
          return [284, c - 227, 5];
        case 258 === c:
          return [285, c - 258, 0];
        default:
          b("invalid length: " + c)
      }
    }
    var c = [],
      d, e;
    for (d = 3; 258 >= d; d++) e = a(d), c[d] = e[2] << 24 | e[1] << 16 | e[0];
    return c
  }();
  var S = K ? new Uint32Array(T) : T,
    Q = 0,
    V = 1;
  T = Q;
  y = V;
  a.prototype.p = function() {
    for (; !this.s;) {
      var a = B(this, 3);
      a & 1 && (this.s = n);
      a >>>= 1;
      switch (a) {
        case 0:
          var a = this.input,
            c = this.c,
            d = this.a,
            e = this.b,
            f = s,
            k = s,
            l = s,
            m = d.length,
            f = s;
          this.e =
            this.g = 0;
          f = a[c++];
          f === s && b(Error("invalid uncompressed block header: LEN (first byte)"));
          k = f;
          f = a[c++];
          f === s && b(Error("invalid uncompressed block header: LEN (second byte)"));
          k |= f << 8;
          f = a[c++];
          f === s && b(Error("invalid uncompressed block header: NLEN (first byte)"));
          l = f;
          f = a[c++];
          f === s && b(Error("invalid uncompressed block header: NLEN (second byte)"));
          l |= f << 8;
          k === ~l && b(Error("invalid uncompressed block header: length verify"));
          c + k > a.length && b(Error("input buffer is broken"));
          switch (this.n) {
            case Q:
              for (; e +
                k > d.length;) {
                f = m - e;
                k -= f;
                if (K) d.set(a.subarray(c, c + f), e), e += f, c += f;
                else
                  for (; f--;) d[e++] = a[c++];
                this.b = e;
                d = this.f();
                e = this.b
              }
              break;
            case V:
              for (; e + k > d.length;) d = this.f({
                v: 2
              });
              break;
            default:
              b(Error("invalid inflate mode"))
          }
          if (K) d.set(a.subarray(c, c + k), e), e += k, c += k;
          else
            for (; k--;) d[e++] = a[c++];
          this.c = c;
          this.b = e;
          this.a = d;
          break;
        case 1:
          this.o($, aa);
          break;
        case 2:
          C(this);
          break;
        default:
          b(Error("unknown BTYPE: " + a))
      }
    }
    return this.t()
  };
  var R = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
    J = K ? new Uint16Array(R) :
    R,
    R = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258],
    Z = K ? new Uint16Array(R) : R,
    R = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0],
    I = K ? new Uint8Array(R) : R,
    R = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577],
    H = K ? new Uint16Array(R) : R,
    R = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
    X = K ? new Uint8Array(R) : R,
    R = new(K ? Uint8Array : Array)(288),
    z, U = 0;
  for (z = R.length; U <
    z; ++U) R[U] = 143 >= U ? 8 : 255 >= U ? 9 : 279 >= U ? 7 : 8;
  var $ = e(R),
    R = new(K ? Uint8Array : Array)(30),
    U = 0;
  for (z = R.length; U < z; ++U) R[U] = 5;
  var aa = e(R);
  a.prototype.o = function(a, b) {
    var c = this.a,
      d = this.b;
    this.u = a;
    var e, f, k, l;
    for (e = c.length - 258; 256 !== (f = v(this, a));)
      if (256 > f) d >= e && (this.b = d, c = this.f(), d = this.b), c[d++] = f;
      else
        for (f -= 257, l = Z[f], 0 < I[f] && (l += B(this, I[f])), f = v(this, b), k = H[f], 0 < X[f] && (k += B(this, X[f])), d >= e && (this.b = d, c = this.f(), d = this.b); l--;) c[d] = c[d++ - k];
    for (; 8 <= this.e;) this.e -= 8, this.c--;
    this.b = d
  };
  a.prototype.I =
    function(a, b) {
      var c = this.a,
        d = this.b;
      this.u = a;
      var e, f, k, l;
      for (e = c.length; 256 !== (f = v(this, a));)
        if (256 > f) d >= e && (c = this.f(), e = c.length), c[d++] = f;
        else
          for (f -= 257, l = Z[f], 0 < I[f] && (l += B(this, I[f])), f = v(this, b), k = H[f], 0 < X[f] && (k += B(this, X[f])), d + l > e && (c = this.f(), e = c.length); l--;) c[d] = c[d++ - k];
      for (; 8 <= this.e;) this.e -= 8, this.c--;
      this.b = d
    };
  a.prototype.f = function() {
    var a = new(K ? Uint8Array : Array)(this.b - 32768),
      b = this.b - 32768,
      c, d, e = this.a;
    if (K) a.set(e.subarray(32768, a.length));
    else
      for (c = 0, d = a.length; c < d; ++c) a[c] =
        e[c + 32768];
    this.l.push(a);
    this.q += a.length;
    if (K) e.set(e.subarray(b, b + 32768));
    else
      for (c = 0; 32768 > c; ++c) e[c] = e[b + c];
    this.b = 32768;
    return e
  };
  a.prototype.J = function(a) {
    var b, c = this.input.length / this.c + 1 | 0,
      d, e, f, k = this.input,
      l = this.a;
    a && ("number" === typeof a.v && (c = a.v), "number" === typeof a.F && (c += a.F));
    2 > c ? (d = (k.length - this.c) / this.u[2], f = d / 2 * 258 | 0, e = f < l.length ? l.length + f : l.length << 1) : e = l.length * c;
    K ? (b = new Uint8Array(e), b.set(l)) : b = l;
    return this.a = b
  };
  a.prototype.t = function() {
    var a = 0,
      b = this.a,
      c = this.l,
      d, e =
      new(K ? Uint8Array : Array)(this.q + (this.b - 32768)),
      f, k, l, m;
    if (0 === c.length) return K ? this.a.subarray(32768, this.b) : this.a.slice(32768, this.b);
    f = 0;
    for (k = c.length; f < k; ++f)
      for (d = c[f], l = 0, m = d.length; l < m; ++l) e[a++] = d[l];
    f = 32768;
    for (k = this.b; f < k; ++f) e[a++] = b[f];
    this.l = [];
    return this.buffer = e
  };
  a.prototype.H = function() {
    var a, b = this.b;
    K ? this.B ? (a = new Uint8Array(b), a.set(this.a.subarray(0, b))) : a = this.a.subarray(0, b) : (this.a.length > b && (this.a.length = b), a = this.a);
    return this.buffer = a
  };
  w.prototype.p = function() {
    var a =
      this.input,
      c, d;
    c = this.A.p();
    this.c = this.A.c;
    this.M && (d = (a[this.c++] << 24 | a[this.c++] << 16 | a[this.c++] << 8 | a[this.c++]) >>> 0, d !== u(c) && b(Error("invalid adler-32 checksum")));
    return c
  };
  var W = 8,
    k = Y;
  F.prototype.j = function() {
    var a, c, d, e, f = 0;
    e = this.a;
    a = W;
    switch (a) {
      case W:
        c = Math.LOG2E * Math.log(32768) - 8;
        break;
      default:
        b(Error("invalid compression method"))
    }
    c = c << 4 | a;
    e[f++] = c;
    switch (a) {
      case W:
        switch (this.h) {
          case k.NONE:
            d = 0;
            break;
          case k.r:
            d = 1;
            break;
          case k.k:
            d = 2;
            break;
          default:
            b(Error("unsupported compression type"))
        }
        break;
      default:
        b(Error("invalid compression method"))
    }
    a = d << 6 | 0;
    e[f++] = a | 31 - (256 * c + a) % 31;
    a = u(this.input);
    this.z.b = f;
    e = this.z.j();
    f = e.length;
    K && (e = new Uint8Array(e.buffer), e.length <= f + 4 && (this.a = new Uint8Array(e.length + 4), this.a.set(e), e = this.a), e = e.subarray(0, f + 4));
    e[f++] = a >> 24 & 255;
    e[f++] = a >> 16 & 255;
    e[f++] = a >> 8 & 255;
    e[f++] = a & 255;
    return e
  };
  f("Zlib.Inflate", w);
  f("Zlib.Inflate.prototype.decompress", w.prototype.p);
  r("Zlib.Inflate.BufferType", {
    ADAPTIVE: y,
    BLOCK: T
  });
  f("Zlib.Deflate", F);
  f("Zlib.Deflate.compress", function(a,
    b) {
    return (new F(a, b)).j()
  });
  f("Zlib.Deflate.prototype.compress", F.prototype.j);
  r("Zlib.Deflate.CompressionType", {
    NONE: k.NONE,
    FIXED: k.r,
    DYNAMIC: k.k
  })
}).call(this);
Readfile = {
  readKuju: function(b, f, c) {
    var d = !1;
    void 0 === c && (d = !0);
    var e = new XMLHttpRequest;
    e.open("GET", b.toLowerCase(), d);
    e.responseType = "arraybuffer";
    d && (e.onload = function(b) {
      b = new Uint8Array(e.response);
      b = 70 === b[7] ? (new Zlib.Inflate(b, {
        index: 16
      })).decompress() : b.subarray(16, b.length - 16);
      f.load(b)
    });
    try {
      e.send()
    } catch (m) {
      return -1
    }
    if (!d) return b = new Uint8Array(e.response), 70 === b[7] ? (new Zlib.Inflate(b, {
      index: 16
    })).decompress() : new Uint8Array(b.buffer.slice(16))
  },
  readRAW: function(b, f, c) {
    f = new XMLHttpRequest;
    f.open("GET", b, !1);
    f.responseType = "arraybuffer";
    try {
      f.send()
    } catch (d) {
      return -1
    }
    return new Uint8Array(f.response)
  },
  readTxt: function(b, f, c) {
    f = new XMLHttpRequest;
    f.open("GET", b, !1);
    f.responseType = "application/json";
    f.send();
    return f.response
  }
};
NBT = {
  nextTag: function(b) {
    var f = {};
    var c;
    f.type = b.data[b.offset++];
    if (void 0 === f.type) return -1;
    switch (f.type) {
      case 0:
        f.name = "";
        break;
      case 1:
        f.name = NBT.getTagName(b, 0);
        f.value = b.data[b.offset++];
        break;
      case 2:
        f.name = NBT.getTagName(b, 0);
        f.value = b.data[b.offset++] << 8 | b.data[b.offset++];
        break;
      case 3:
        f.name = NBT.getTagName(b, 0);
        f.value = b.data[b.offset++] << 24 | b.data[b.offset++] << 16 | b.data[b.offset++] << 8 | b.data[b.offset++];
        break;
      case 4:
        f.name = NBT.getTagName(b, 0);
        f.value = b.data[b.offset++] << 56 | b.data[b.offset++] <<
          48 | b.data[b.offset++] << 40 | b.data[b.offset++] << 32 | b.data[b.offset++] << 24 | b.data[b.offset++] << 16 | b.data[b.offset++] << 8 | b.data[b.offset++];
        break;
      case 5:
        f.name = NBT.getTagName(b, 0);
        f.value = -999;
        b.offset += 4;
        break;
      case 6:
        f.name = NBT.getTagName(b, 0);
        f.value = -999;
        b.offset += 8;
        break;
      case 7:
        f.name = NBT.getTagName(b, 0);
        f.length = 16777216 * b.data[b.offset++] + 65536 * b.data[b.offset++] + 256 * b.data[b.offset++] + b.data[b.offset++];
        f.data = new Uint8Array(f.length);
        for (c = 0; c < f.length; c++) f.data[c] = b.data[b.offset++];
        break;
      case 8:
        f.name = NBT.getTagName(b, 0);
        f.value = NBT.getTagName(b, 0);
        break;
      case 9:
        f.name = NBT.getTagName(b, 0);
        f.tagId = b.data[b.offset++];
        f.length = 16777216 * b.data[b.offset++] + 65536 * b.data[b.offset++] + 256 * b.data[b.offset++] + b.data[b.offset++];
        break;
      case 10:
        f.name = NBT.getTagName(b, 0);
        break;
      case 11:
        for (f.name = NBT.getTagName(b, 0), f.length = 16777216 * b.data[b.offset++] + 65536 * b.data[b.offset++] + 256 * b.data[b.offset++] + b.data[b.offset++], f.data = new Uint32Array(f.length), c = 0; c < f.length; c++) f.data[c] = 16777216 * b.data[b.offset++] +
          65536 * b.data[b.offset++] + 256 * b.data[b.offset++] + b.data[b.offset++]
        break;
    }
    return f
  },
  getTagName: function(b) {
    var f, c, d;
    for (f = "", c = 256 * b.data[b.offset++] + b.data[b.offset++], d = 0; d < c; d++) f += String.fromCharCode(b.data[b.offset++]);
    return f
  },
  read9: function(b, f, c) {
    var d;
    var e;
    if (10 !== b.tagId) {
      f = [0, 1, 2, 4, 8, 4, 8, 0, 0, 0, 0, 0];
      for (e = 0; e < b.length * f[b.tagId]; e++) c.offset++
    } else
      for (e = 0; e < b.length && -1 !== (d = NBT.nextTag(c));) 0 === d.type && e++, 9 === d.type && NBT.read9(d, f, c)
  },
  write0Tag: function(b) {
    b.data[b.offset++] = 0
  },
  write1Tag: function(b,
    f, c) {
    b.data[b.offset++] = 1;
    NBT.writeTagName(b, f);
    b.data[b.offset++] = c & 255
  },
  write3Tag: function(b, f, c) {
    b.data[b.offset++] = 3;
    NBT.writeTagName(b, f);
    b.data[b.offset++] = c >> 24 & 255;
    b.data[b.offset++] = c >> 16 & 255;
    b.data[b.offset++] = c >> 8 & 255;
    b.data[b.offset++] = c & 255
  },
  write7Tag: function(b, f, c) {
    b.data[b.offset++] = 7;
    NBT.writeTagName(b, f);
    b.data[b.offset++] = c.length >> 24 & 255;
    b.data[b.offset++] = c.length >> 16 & 255;
    b.data[b.offset++] = c.length >> 8 & 255;
    b.data[b.offset++] = c.length & 255;
    for (f = 0; f < c.length; f++) b.data[b.offset++] =
      c[f]
  },
  write9Tag: function(b, f, c, d) {
    b.data[b.offset++] = 9;
    NBT.writeTagName(b, f);
    b.data[b.offset++] = c;
    b.data[b.offset++] = d >> 24 & 255;
    b.data[b.offset++] = d >> 16 & 255;
    b.data[b.offset++] = d >> 8 & 255;
    b.data[b.offset++] = d & 255
  },
  write10Tag: function(b, f) {
    b.data[b.offset++] = 10;
    NBT.writeTagName(b, f)
  },
  writeTagName: function(b, f) {
    var c = f.length;
    b.data[b.offset++] = Math.floor(c / 256);
    b.data[b.offset++] = c - Math.floor(c / 256);
    var d;
    for (d = 0; d < c; d++) b.data[b.offset++] = f.charCodeAt(d);
    return f
  }
};

function Chunk() {
  this.section = [];
  this.isInit1 = this.isInit = 0;
  this.visible = !0;
  this.changed = !1;
  this.ivbo = [];
  this.vbo = [];
  this.needsUpdate = !1;
  this.timestamp = (new Date).getTime()
}
Chunk.stairsData = [];
Chunk.stairsData["20xx2"] = "0001";
Chunk.stairsData["21x2x"] = "0010";
Chunk.stairsData["11x2x"] = "0010";
Chunk.stairsData["1x13x"] = "1000";
Chunk.stairsData["3x0x3"] = "0100";
Chunk.stairsData["3x13x"] = "1000";
Chunk.stairsData["00xx2"] = "0001";
Chunk.stairsData["0x0x3"] = "0100";
Chunk.stairsData["31xx3"] = "1110";
Chunk.stairsData["30x3x"] = "1101";
Chunk.stairsData["00x3x"] = "1101";
Chunk.stairsData["0x02x"] = "0111";
Chunk.stairsData["2x1x2"] = "1011";
Chunk.stairsData["2x02x"] = "0111";
Chunk.stairsData["11xx3"] = "1110";
Chunk.stairsData["1x1x2"] = "1011";
Chunk.stairsData["64xx6"] = "0001";
Chunk.stairsData["65x6x"] = "0010";
Chunk.stairsData["55x6x"] = "0010";
Chunk.stairsData["5x57x"] = "1000";
Chunk.stairsData["7x4x7"] = "0100";
Chunk.stairsData["7x57x"] = "1000";
Chunk.stairsData["44xx6"] = "0001";
Chunk.stairsData["4x4x7"] = "0100";
Chunk.stairsData["75xx7"] = "1110";
Chunk.stairsData["74x7x"] = "1101";
Chunk.stairsData["44x7x"] = "1101";
Chunk.stairsData["4x46x"] = "0111";
Chunk.stairsData["6x5x6"] = "1011";
Chunk.stairsData["6x46x"] = "0111";
Chunk.stairsData["55xx7"] = "1110";
Chunk.stairsData["5x5x6"] = "1011";
Chunk.cacheSlight = new Float32Array(83592);
Chunk.cacheBlight = new Float32Array(83592);
Chunk.cacheData = new Float32Array(83592);
Chunk.cacheId = new Float32Array(83592);
Chunk.cacheBlock = new Float32Array(5832);
Chunk.cacheHeightMap9 = new Uint8Array(2304);
Chunk.cacheHeightMap9hMax = new Uint8Array(2304);
Chunk.cacheSlight9 = new Uint8Array(594432);
Chunk.cacheBlight9 = new Uint8Array(594432);
Chunk.cacheId9 = new Int32Array(594432);
Chunk.prototype.initHeightMap = function() {
  var b = 0;
  this.heightMap = new Uint32Array(256);
  var f, c, d, e;
  for (f = 0; 16 > f; f++)
    for (c = 0; 16 > c; c++)
      for (d = 255, e = 15; 0 < d; d--, e--) {
        if (0 === (d - 15) % 16) {
          var m = this.section[(d - 15) / 16],
            e = 15;
          if (void 0 === m) {
            d -= 15;
            e = 16;
            continue
          }
        }
        b = 256 * e + 16 * f + c;
        if (1 !== block.lightTransmission[m.blocks[b]]) {
          this.heightMap[16 * f + c] = d + 1;
          break
        }
      }
};
Chunk.prototype.refreshLight = function(b, f) {
  var c = 0,
    d = 0,
    e = 0,
    m = 0,
    l = 0,
    p = 0,
    q = m = c = 0,
    x = (new Date).getTime();
  f = f || !1;
  this.initHeightMap();
  if (!this.getCacheL9()) return !1;
  var d, A, t, a, B, v, C, u, w, F, C, r;
  for (d = block.lightSource, A = block.lightTransmission, t = Chunk.cacheSlight9, a = Chunk.cacheBlight9, B = Chunk.cacheId9, v = 256, C = c = 0, u = 0, w = 0; 48 > w; w++)
    for (F = 0; 48 > F; F++) {
      u = Chunk.cacheHeightMap9[48 * w + F];
      u > c && (c = u);
      u < v && (v = u);
      for (C = 0, r = -1; 1 >= r; r++)
        for (q = -1; 1 >= q; q++) 0 > w + r || 0 > F + q || 47 < w + r || 47 < F + q || (u = Chunk.cacheHeightMap9[48 * (w + r) + (F + q)], u > C && (C =
          u));
      Chunk.cacheHeightMap9hMax[48 * w + F] = C + 1
    }
  for (w = 2; 46 > w; w++)
    for (F = 2; 46 > F; F++) {
      for (u = Chunk.cacheHeightMap9hMax[48 * w + F]; u >= Chunk.cacheHeightMap9[48 * w + F]; u--) q = 2304 * u + 48 * w + F, t[q] = 15;
      for (C = 15; 0 <= u; u--) q = 2304 * u + 48 * w + F, C *= A[B[q]], t[q] = C, 0 < C && u < v && (v = u)
    }
  for (w = 0; 48 > w; w++)
    for (u = 0; 255 > u; u++)
      if (q = 2304 * u + 48 * w + 1, 0 < t[q] && u < v) {
        v = u;
        break
      }
  for (w = 0; 48 > w; w++)
    for (u = 0; 255 > u; u++)
      if (q = 2304 * u + 48 * w + 46, 0 < t[q] && u < v) {
        v = u;
        break
      }
  for (F = 0; 48 > F; F++)
    for (u = 0; 255 > u; u++)
      if (q = 2304 * u + 48 + F, 0 < t[q] && u < v) {
        v = u;
        break
      }
  for (F = 0; 48 > F; F++)
    for (u = 0; 255 >
      u; u++)
      if (q = 2304 * u + 2208 + F, 0 < t[q] && u < v) {
        v = u;
        break
      }
  v--;
  1 > v && (v = 1); - 1 === b ? (r = 0, q = 256) : (r = b - 16, 0 > r && (r = 0), q = b + 16, 256 < q && (q = 256));
  C = 255;
  e = 0;
  for (w = 2; 46 > w; w++)
    for (F = 2; 46 > F; F++)
      for (u = r + 1; u < q - 1; u++) c = 2304 * u + 48 * w + F, a[c] = d[B[c]], 0 < a[c] && u < C && (C = u), 0 < a[c] && u > e && (e = u);
  u = !1;
  if (-1 === b) r = C - 16, 0 > r && (r = 0), q = e + 16, 256 < q && (q = 256), u = !0;
  else
    for (c = 2304 * r; c < 2304 * q; c++)
      if (0 < a[c]) {
        u = !0;
        break
      }
  w = (new Date).getTime();
  console.log("czas L0 " + (w - x));
  x = (new Date).getTime();
  var s;
  if (u)
    for (s = 0; 14 > s; s++)
      for (w = 1; 47 > w; w++)
        for (F = 1; 47 > F; F++)
          for (u =
            r; u < q; u++) c = 2304 * u + 48 * w + F, C = a[c] - 1, 1 > C || (d = c + 48, e = c - 48, m = c - 1, l = c + 1, p = c + 2304, c -= 2304, C * A[B[c]] > a[c] && (a[c] = C * A[B[c]]), C * A[B[p]] > a[p] && (a[p] = C * A[B[p]]), C * A[B[d]] > a[d] && (a[d] = C * A[B[d]]), C * A[B[e]] > a[e] && (a[e] = C * A[B[e]]), C * A[B[m]] > a[m] && (a[m] = C * A[B[m]]), C * A[B[l]] > a[l] && (a[l] = C * A[B[l]]));
  w = (new Date).getTime();
  console.log("czas L1 " + (w - x));
  x = (new Date).getTime();
  for (s = 0; 14 > s; s++)
    for (w = 1; 47 > w; w++)
      for (F = 1; 47 > F; F++)
        for (u = v; u < Chunk.cacheHeightMap9hMax[48 * w + F]; u++) c = 2304 * u + 48 * w + F, C = t[c] - 1, 1 > C || (d = c + 48, e = c - 48,
          m = c - 1, l = c + 1, p = c + 2304, c -= 2304, C * A[B[c]] > t[c] && (t[c] = C * A[B[c]]), C * A[B[p]] > t[p] && (t[p] = C * A[B[p]]), C * A[B[d]] > t[d] && (t[d] = C * A[B[d]]), C * A[B[e]] > t[e] && (t[e] = C * A[B[e]]), C * A[B[m]] > t[m] && (t[m] = C * A[B[m]]), C * A[B[l]] > t[l] && (t[l] = C * A[B[l]]));
  w = (new Date).getTime();
  console.log("czas L2 " + (w - x));
  x = (new Date).getTime();
  A = [];
  for (r = -1; 1 >= r; r++)
    for (q = -1; 1 >= q; q++)
      if (A[3 * (r + 1) + q + 1] = mcWorld.requestChunk(this.xPos + r, this.zPos + q), -2 === A[3 * (r + 1) + q + 1]) return !1;
  B = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  C = [0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  f && (B = [0, 1, 0, 1, 1, 1, 0, 1, 0]);
  for (d = 0; 2 >= d; d++)
    for (e = 0; 2 >= e; e++)
      if (!f || 1 === d || 1 === e)
        if (v = A[3 * d + e], void 0 !== v && -1 !== v) {
          for (u = r = 0; 256 > r; r++, u++) {
            if (0 === r % 16) {
              var n = v.section[r / 16],
                u = 0;
              if (void 0 === n) {
                r += 15;
                u = -1;
                continue
              }
              f || (c[r / 16] = jenkins_hash(n.skyLight), C[r / 16] = jenkins_hash(n.blockLight))
            }
            for (w = 0; 16 > w; w++)
              for (F = 0; 16 > F; F += 2) m = (256 * u + 16 * w + F) / 2, q = 2304 * r + 48 * (16 * e + w) + (16 * d + F), n.skyLight[m] = t[q] + (t[q + 1] << 4), n.blockLight[m] = a[q] + (a[q + 1] << 4)
          }
          u = 0;
          if (!f)
            for (r = 0; 16 > r; r++)
              if (void 0 !==
                v.section[r]) {
                u = jenkins_hash(v.section[r].skyLight);
                if (c[r] !== u) {
                  B[3 * d + e] = 1;
                  break
                }
                u = jenkins_hash(v.section[r].blockLight);
                if (C[r] !== u) {
                  B[3 * d + e] = 1;
                  break
                }
              }
        }
  w = (new Date).getTime();
  console.log("czas L3 " + (w - x));
  return B
};
Chunk.prototype.getBiomeColor1 = function(b, f, c) {
  var d, e, m, l;
  l = this.cacheBiomes[18 * (f + 0) + b + 0];
  d = biomes[l].colorR[c];
  e = biomes[l].colorG[c];
  m = biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 0) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 0];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  return d = 65536 * Math.floor(d / 4) + 256 * Math.floor(e /
    4) + Math.floor(m / 4)
};
Chunk.prototype.getBiomeColor2 = function(b, f, c) {
  var d, e, m, l;
  l = this.cacheBiomes[18 * (f + 0) + b + 2];
  d = biomes[l].colorR[c];
  e = biomes[l].colorG[c];
  m = biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 0) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 2];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  return d = 65536 * Math.floor(d / 4) + 256 * Math.floor(e /
    4) + Math.floor(m / 4)
};
Chunk.prototype.getBiomeColor3 = function(b, f, c) {
  var d, e, m, l;
  l = this.cacheBiomes[18 * (f + 2) + b + 2];
  d = biomes[l].colorR[c];
  e = biomes[l].colorG[c];
  m = biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 2) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 2];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  return d = 65536 * Math.floor(d / 4) + 256 * Math.floor(e /
    4) + Math.floor(m / 4)
};
Chunk.prototype.getBiomeColor4 = function(b, f, c) {
  var d, e, m, l;
  l = this.cacheBiomes[18 * (f + 2) + b + 0];
  d = biomes[l].colorR[c];
  e = biomes[l].colorG[c];
  m = biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 2) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 0];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  return d = 65536 * Math.floor(d / 4) + 256 * Math.floor(e /
    4) + Math.floor(m / 4)
};
Chunk.prototype.getBiomeColor = function(b, f, c) {
  var d, e, m, l;
  l = this.cacheBiomes[18 * (f + 2) + b + 2];
  d = biomes[l].colorR[c];
  e = biomes[l].colorG[c];
  m = biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 0) + b + 0];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 2) + b + 0];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 0) + b + 2];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 2];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 0];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 2) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 0) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  return d = 65536 * Math.floor(d / 8) + 256 * Math.floor(e / 8) + Math.floor(m / 8)
};
Chunk.prototype.getBlock = function(b, f, c) {
  if (-1 === this.isInit) return {
    id: 0,
    data: 0
  };
  var d = Math.floor(f / 16);
  b = 256 * (f - 16 * d) + 16 * c + b;
  if (void 0 === this.section[d]) return {
    id: 0,
    data: 0
  };
  f = this.section[d].blocks[b];
  c = 0;
  c = 0 === b % 2 ? this.section[d].data[b / 2] & 15 : (this.section[d].data[b / 2 - 0.5] & 240) >> 4;
  return {
    id: f,
    data: c
  }
};
Chunk.prototype.getNBT = function(b) {
  b = {
    offset: 0
  };
  b.data = new Uint8Array(5E5);
  NBT.write10Tag(b, "");
  NBT.write10Tag(b, "Level");
  NBT.write3Tag(b, "xPos", this.xPos);
  NBT.write3Tag(b, "zPos", this.zPos);
  NBT.write7Tag(b, "Biomes", this.biomes);
  NBT.write9Tag(b, "Sections", 10, this.section.length);
  var f;
  for (f = 0; f < this.section.length; f++) NBT.write1Tag(b, "Y", this.section[f].y), NBT.write7Tag(b, "Data", this.section[f].data), NBT.write7Tag(b, "SkyLight", this.section[f].skyLight), NBT.write7Tag(b, "BlockLight", this.section[f].blockLight),
    NBT.write7Tag(b, "Blocks", this.section[f].blocks), NBT.write0Tag(b);
  NBT.write0Tag(b);
  NBT.write0Tag(b);
  return new Uint8Array(b.data.buffer, 0, b.offset)
};
Chunk.prototype.newSection = function(b) {
  this.section[b] = {};
  this.section[b].y = b;
  this.section[b].blocks = new Uint32Array(4096);
  this.section[b].skyLight = new Uint32Array(2048);
  var f;
  for (f = 0; 2048 > f; f++) this.section[b].skyLight[f] = 255;
  this.section[b].blockLight = new Uint32Array(2048);
  this.section[b].data = new Uint32Array(2048);
  this.section[b].add = new Uint32Array(2048)
};
Chunk.prototype.changeAdd = function(b, f, c) {
  if (-1 !== this.isInit) {
    var d = Math.floor(f / 16);
    b = 256 * (f - 16 * d) + 16 * c + b;
    f = 0;
    c = b % 2;
    void 0 === this.section[d] && this.newSection(d);
    f = 0 === c ? this.section[d].add[b / 2] & 15 : this.section[d].add[b / 2 - 0.5] >> 4 & 15;
    f++;
    10 === f && (f = 0);
    0 === c ? this.section[d].add[b / 2] = (this.section[d].add[b / 2] & 240) + f : this.section[d].add[b / 2 - 0.5] = (this.section[d].add[b / 2 - 0.5] & 15) + (f << 4);
    this.init2(0);
    this.init2(1)
  }
};
Chunk.prototype.updateBlock = function(b, f, c, d, e) {
  if (-1 !== this.isInit) {
    var m = (new Date).getTime();
    this.changed = !0;
    var m = Math.floor(f / 16),
      l = 256 * (f - 16 * m) + 16 * c + b;
    void 0 === this.section[m] && this.newSection(m);
    this.section[m].blocks[l] = d;
    var p = l % 2;
    0 === p ? (this.section[m].data[l / 2] = (this.section[m].data[l / 2] & 240) + e, this.section[m].add[l / 2] &= 240) : (this.section[m].data[l / 2 - 0.5] = (this.section[m].data[l / 2 - 0.5] & 15) + (e << 4), this.section[m].add[l / 2 - 0.5] &= 15);
    var q = 0;
    if (0 === block[d].type || 2 === block[d].type || 3 === block[d].type ||
      4 === block[d].type) {
      var q = this.getSunLightValue(b, f + 1, c),
        x = 0;
      for (d = -1; 1 >= d; d++)
        for (e = -1; 1 >= e; e++) 0 !== d && 0 !== e || 0 > b + d || 15 < b + d || 0 > c + e || 15 < c + e || (x = this.getSunLightValue(b + d, f, c + e), x - 1 > q && (q = x - 1))
    }
    0 === p ? this.section[m].skyLight[l / 2] = (this.section[m].skyLight[l / 2] & 240) + q : this.section[m].skyLight[l / 2 - 0.5] = (this.section[m].skyLight[l / 2 - 0.5] & 15) + (q << 4);
    f = this.refreshLight(f);
    f[4] = 1;
    0 === c && (f[3] = 1);
    15 === c && (f[5] = 1);
    0 === b && (f[1] = 1);
    15 === b && (f[7] = 1);
    m = (new Date).getTime();
    for (d = -1; 1 >= d; d++)
      for (e = -1; 1 >= e; e++) 0 !==
        f[3 * (d + 1) + e + 1] && (b = mcWorld.requestChunk(this.xPos + d, this.zPos + e), void 0 !== b && -1 !== b && -2 !== b && (b.changed = !0, b.init2(0), b.init2(1)));
    b = (new Date).getTime();
    console.log("czas chunk " + (b - m))
  }
};
Chunk.prototype.update = function() {
  if (-1 !== this.isInit) {
    var b = this.refreshLight(-1);
    b[4] = 1;
    var f, c, d, e;
    for (f = (new Date).getTime(), d = -1; 1 >= d; d++)
      for (e = -1; 1 >= e; e++) 0 !== b[3 * (d + 1) + e + 1] && (c = mcWorld.requestChunk(this.xPos + d, this.zPos + e), void 0 !== c && -1 !== c && -2 !== c && (c.changed = !0, c.init2(0), c.init2(1)));
    this.needsUpdate = !1;
    b = (new Date).getTime();
    console.log("czas chunk " + (b - f))
  }
};
Chunk.prototype.setBlock = function(b, f, c, d, e) {
  if (-1 !== this.isInit) {
    this.changed = !0;
    var m = Math.floor(f / 16),
      l = 256 * (f - 16 * m) + 16 * c + b;
    void 0 === this.section[m] && this.newSection(m);
    this.section[m].blocks[l] = d;
    var p = l % 2;
    0 === p ? (this.section[m].data[l / 2] = (this.section[m].data[l / 2] & 240) + e, this.section[m].add[l / 2] &= 240) : (this.section[m].data[l / 2 - 0.5] = (this.section[m].data[l / 2 - 0.5] & 15) + (e << 4), this.section[m].add[l / 2 - 0.5] &= 15);
    e = 0;
    if (0 === block[d].type || 2 === block[d].type || 3 === block[d].type || 4 === block[d].type) {
      e = this.getSunLightValue(b,
        f + 1, c);
      d = 0;
      var q, x;
      for (q = -1; 1 >= q; q++)
        for (x = -1; 1 >= x; x++) 0 !== q && 0 !== x || 0 > b + q || 15 < b + q || 0 > c + x || 15 < c + x || (d = this.getSunLightValue(b + q, f, c + x), d - 1 > e && (e = d - 1))
    }
    0 === p ? this.section[m].skyLight[l / 2] = (this.section[m].skyLight[l / 2] & 240) + e : this.section[m].skyLight[l / 2 - 0.5] = (this.section[m].skyLight[l / 2 - 0.5] & 15) + (e << 4);
    this.needsUpdate = !0
  }
};
Chunk.prototype.getSunLightValue = function(b, f, c) {
  var d = Math.floor(f / 16);
  f -= 16 * d;
  void 0 === this.section[d] && this.newSection(d);
  b = 256 * f + 16 * c + b;
  return 16 > d ? 0 === b % 2 ? this.section[d].skyLight[b / 2] & 15 : this.section[d].skyLight[b / 2 - 0.5] >> 4 & 15 : 16
};
Chunk.prototype.render = function(b, f, c) {
  if (this.visible && (0 !== c || -1 !== this.isInit) && (1 !== c || -1 !== this.isInit1)) {
    if (0 === c && 0 === this.isInit)
      if (1 < chronometer.iLag) {
        if (chronometer.iLag -= 1, !this.init2(0, !0)) return
      } else return;
    if (1 === c && 0 === this.isInit1)
      if (1 < chronometer.iLag) {
        if (chronometer.iLag -= 1, !this.init2(1, !0)) return
      } else return;
    gluu.gl.bindTexture(gluu.gl.TEXTURE_2D, blockTexture);
    void 0 !== this.vbo[c] && void 0 !== this.vbo[c][b] && (gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, this.vbo[c][b]), gluu.gl.vertexAttribPointer(f.vertexPositionAttribute, 3, gluu.gl.FLOAT, !1, 36, 0), gluu.gl.vertexAttribPointer(f.textureCoordAttribute,
      2, gluu.gl.FLOAT, !1, 36, 12), gluu.gl.vertexAttribPointer(f.lightAttribute, 4, gluu.gl.FLOAT, !1, 36, 20), gluu.gl.drawArrays(gluu.gl.TRIANGLES, 0, this.ivbo[c][b] / 9))
  }
};
Chunk.prototype.deleteBuffers = function() {
  this.isInit1 = this.isInit = 0;
  void 0 !== this.vbo && (void 0 !== this.vbo[0] && (this.vbo[0].forEach(function(b) {
    gluu.gl.deleteBuffer(b)
  }), this.ivbo[0].forEach(function(b) {
    gpuMem -= b
  })), void 0 !== this.vbo[1] && (this.vbo[1].forEach(function(b) {
    gluu.gl.deleteBuffer(b)
  }), this.ivbo[1].forEach(function(b) {
    gpuMem -= b
  })))
};
Chunk.prototype.getCache = function(b, f) {
  var c = 0,
    d = 0,
    e = 0;
  this.cacheBiomes = new Float32Array(324);
  this.cacheHeightMap = new Int32Array(324);
  var m = Chunk.cacheSlight,
    l = Chunk.cacheBlight,
    p = Chunk.cacheData,
    q = Chunk.cacheId,
    x = d = !1,
    A = !1,
    t = !1,
    a = mcWorld.requestChunk(this.xPos + 1, this.zPos);
  void 0 === a && (t = !0); - 1 === a && (t = !0);
  if (-2 === a) return !1;
  var B = mcWorld.requestChunk(this.xPos - 1, this.zPos);
  void 0 === B && (A = !0); - 1 === B && (A = !0);
  if (-2 === B) return !1;
  var v = mcWorld.requestChunk(this.xPos, this.zPos + 1);
  void 0 === v && (d = !0); - 1 ===
    v && (d = !0);
  if (-2 === v) return !1;
  var C = mcWorld.requestChunk(this.xPos, this.zPos - 1);
  void 0 === C && (x = !0); - 1 === C && (x = !0);
  if (-2 === C) return !1;
  var u, w;
  for (u = 0; 16 > u; u++)
    for (w = 0; 16 > w; w++) e = 0 + 18 * (u + 1) + (w + 1), q[e] = 1, m[e] = 0, l[e] = 0, e = 83268 + 18 * (u + 1) + (w + 1), q[e] = 0, m[e] = 15, l[e] = 0;
  var F = b - 1;
  0 > F && (F = 0);
  var r = f + 1;
  256 < r && (r = 256);
  var s, n;
  for (s = F, n = 0; s < r; s++, n++) {
    for (w = 0; 18 > w; w++) e = 324 * (s + 1) + 0 + w, q[e] = 1, e = 324 * (s + 1) + 306 + w, q[e] = 1;
    for (u = 0; 18 > u; u++) e = 324 * (s + 1) + 18 * u + 0, q[e] = 1, e = 324 * (s + 1) + 18 * u + 17, q[e] = 1
  }
  for (n = 0; 16 > n; n++)
    for (u = 0; 16 > u; u++) this.cacheBiomes[18 *
      (n + 1) + u + 1] = this.biomes[16 * n + u], this.cacheHeightMap[18 * (n + 1) + u + 1] = this.heightMap[16 * n + u];
  for (n = 0; 16 > n; n++) this.cacheBiomes[18 * (n + 1) + 0] = this.cacheBiomes[18 * (n + 1) + 1], this.cacheHeightMap[18 * (n + 1) + 0] = this.cacheHeightMap[18 * (n + 1) + 1], this.cacheBiomes[18 * (n + 1) + 17] = this.cacheBiomes[18 * (n + 1) + 16], this.cacheHeightMap[18 * (n + 1) + 17] = this.cacheHeightMap[18 * (n + 1) + 16], this.cacheBiomes[306 + (n + 1)] = this.cacheBiomes[288 + (n + 1)], this.cacheHeightMap[306 + (n + 1)] = this.cacheHeightMap[288 + (n + 1)], this.cacheBiomes[0 + (n + 1)] = this.cacheBiomes[18 +
    (n + 1)], this.cacheHeightMap[0 + (n + 1)] = this.cacheHeightMap[18 + (n + 1)];
  if (!d) {
    s = F;
    for (n = 0; s < r; s++, n++) {
      if (0 === s % 16) {
        var L = v.section[s / 16],
          n = 0;
        if (void 0 === L) {
          for (n = s; n < s + 15; n++)
            for (w = 0; 16 > w; w++) e = 324 * (n + 1) + 306 + (w + 1), q[e] = 0, m[e] = 15, l[e] = 0;
          s += 15;
          n = -1;
          continue
        }
      }
      for (w = 0; 16 > w; w++) d = 256 * n + 0 + w, e = 324 * (s + 1) + 306 + (w + 1), q[e] = L.blocks[d], c = d % 2, m[e] = L.skyLight[d / 2 - c / 2] >> 4 * c & 15, l[e] = L.blockLight[d / 2 - c / 2] >> 4 * c & 15, p[e] = L.data[d / 2 - c / 2] >> 4 * c & 15 & block[L.blocks[d]].mask
    }
    for (n = 0; 16 > n; n++) this.cacheBiomes[306 + (n + 1)] = v.biomes[0 +
      n], this.cacheHeightMap[306 + (n + 1)] = v.heightMap[0 + n]
  }
  if (!x) {
    s = F;
    for (n = 0; s < r; s++, n++) {
      if (0 === s % 16 && (L = C.section[s / 16], n = 0, void 0 === L)) {
        for (n = s; n < s + 15; n++)
          for (w = 0; 16 > w; w++) e = 324 * (n + 1) + 0 + (w + 1), q[e] = 0, m[e] = 15, l[e] = 0;
        s += 15;
        n = -1;
        continue
      }
      for (w = 0; 16 > w; w++) d = 256 * n + 240 + w, e = 324 * (s + 1) + 0 + (w + 1), q[e] = L.blocks[d], c = d % 2, m[e] = L.skyLight[d / 2 - c / 2] >> 4 * c & 15, l[e] = L.blockLight[d / 2 - c / 2] >> 4 * c & 15, p[e] = L.data[d / 2 - c / 2] >> 4 * c & 15 & block[L.blocks[d]].mask
    }
    for (n = 0; 16 > n; n++) this.cacheBiomes[0 + (n + 1)] = C.biomes[240 + n], this.cacheHeightMap[0 +
      (n + 1)] = C.heightMap[240 + n]
  }
  if (!A) {
    s = F;
    for (n = 0; s < r; s++, n++) {
      if (0 === s % 16 && (L = B.section[s / 16], n = 0, void 0 === L)) {
        for (n = s; n < s + 15; n++)
          for (u = 0; 16 > u; u++) e = 324 * (n + 1) + 18 * (u + 1) + 0, q[e] = 0, m[e] = 15, l[e] = 0;
        s += 15;
        n = -1;
        continue
      }
      for (u = 0; 16 > u; u++) d = 256 * n + 16 * u + 15, e = 324 * (s + 1) + 18 * (u + 1) + 0, q[e] = L.blocks[d], c = d % 2, m[e] = L.skyLight[d / 2 - c / 2] >> 4 * c & 15, l[e] = L.blockLight[d / 2 - c / 2] >> 4 * c & 15, p[e] = L.data[d / 2 - c / 2] >> 4 * c & 15 & block[L.blocks[d]].mask
    }
    for (n = 0; 16 > n; n++) this.cacheBiomes[18 * (n + 1) + 0] = B.biomes[16 * n + 15], this.cacheHeightMap[18 * (n + 1) +
      0] = B.heightMap[16 * n + 15]
  }
  if (!t) {
    s = F;
    for (n = 0; s < r; s++, n++) {
      if (0 === s % 16 && (L = a.section[s / 16], n = 0, void 0 === L)) {
        for (n = s; n < s + 15; n++)
          for (u = 0; 16 > u; u++) e = 324 * (n + 1) + 18 * (u + 1) + 17, q[e] = 0, m[e] = 15, l[e] = 0;
        s += 15;
        n = -1;
        continue
      }
      for (u = 0; 16 > u; u++) d = 256 * n + 16 * u + 0, e = 324 * (s + 1) + 18 * (u + 1) + 17, q[e] = L.blocks[d], c = d % 2, m[e] = L.skyLight[d / 2 - c / 2] >> 4 * c & 15, l[e] = L.blockLight[d / 2 - c / 2] >> 4 * c & 15, p[e] = L.data[d / 2 - c / 2] >> 4 * c & 15 & block[L.blocks[d]].mask
    }
    for (n = 0; 16 > n; n++) this.cacheBiomes[18 * (n + 1) + 17] = a.biomes[16 * n + 0], this.cacheHeightMap[18 * (n + 1) + 17] =
      a.heightMap[16 * n + 0]
  }
  s = F;
  for (n = 0; s < r; s++, n++) {
    if (0 === s % 16 && (L = this.section[s / 16], n = 0, void 0 === L)) {
      for (u = 0; 16 > u; u++)
        for (w = 0; 16 > w; w++) e = 324 * (s + 1) + 18 * (u + 1) + (w + 1), q[e] = 0, m[e] = 15, l[e] = 0, e = 324 * (s + 16) + 18 * (u + 1) + (w + 1), q[e] = 0, m[e] = 15, l[e] = 0;
      q[324 * (s + 2) + 19] = -1;
      s += 15;
      n = -1;
      continue
    }
    for (u = 0; 16 > u; u++)
      for (w = 0; 16 > w; w += 2) d = 256 * n + 16 * u + w, e = 324 * (s + 1) + 18 * (u + 1) + (w + 1), q[e] = L.blocks[d], q[e + 1] = L.blocks[d + 1], x = L.data[d / 2], p[e] = x & 15 & block[L.blocks[d]].mask, p[e + 1] = x >> 4 & 15 & block[L.blocks[d + 1]].mask, x = L.skyLight[d / 2], m[e] = x & 15,
        m[e + 1] = x >> 4 & 15, x = L.blockLight[d / 2], l[e] = x & 15, l[e + 1] = x >> 4 & 15
  }
  for (s = F; s < r; s++) m[324 * (s + 1) + 0] = Math.floor((m[324 * (s + 1) + 18] + m[324 * (s + 1) + 1]) / 2), m[324 * (s + 1) + 306] = Math.floor((m[324 * (s + 1) + 288] + m[324 * (s + 1) + 307]) / 2), m[324 * (s + 1) + 17] = Math.floor((m[324 * (s + 1) + 35] + m[324 * (s + 1) + 16]) / 2), m[324 * (s + 1) + 323] = Math.floor((m[324 * (s + 1) + 305] + m[324 * (s + 1) + 322]) / 2), l[324 * (s + 1) + 0] = Math.floor((l[324 * (s + 1) + 18] + l[324 * (s + 1) + 1]) / 2), l[324 * (s + 1) + 306] = Math.floor((l[324 * (s + 1) + 288] + l[324 * (s + 1) + 307]) / 2), l[324 * (s + 1) + 17] = Math.floor((l[324 * (s +
    1) + 35] + l[324 * (s + 1) + 16]) / 2), l[324 * (s + 1) + 323] = Math.floor((l[324 * (s + 1) + 305] + l[324 * (s + 1) + 322]) / 2);
  return !0
};
Chunk.prototype.getCacheL9 = function() {
  var b, f, c, d, e, m, l;
  for (b = 0, f = 0, c = Chunk.cacheSlight9, d = Chunk.cacheBlight9, e = Chunk.cacheId9, m = [], l = -1; 1 >= l; l++)
    for (b = -1; 1 >= b; b++)
      if (m[3 * (l + 1) + b + 1] = mcWorld.requestChunk(this.xPos + l, this.zPos + b), -2 === m[3 * (l + 1) + b + 1]) return !1;
  var p, q;
  for (p = 0; 48 > p; p++)
    for (q = 0; 48 > q; q++) f = 48 * p + q, e[f] = 1, c[f] = 0, d[f] = 0, f = 592128 + 48 * p + q, e[f] = 0, c[f] = 15, d[f] = 0, f = 589824 + 48 * p + q, e[f] = 0, c[f] = 15, d[f] = 0;
  var x, A, t, a, v, p;
  for (A = 0; 2 >= A; A++)
    for (t = 0; 2 >= t; t++)
      if (x = m[3 * A + t], void 0 !== x && -1 !== x) {
        for (p = 0; 16 > p; p++)
          for (q = 0; 16 > q; q++) Chunk.cacheHeightMap9[48 *
            (16 * t + p) + 16 * A + q] = x.heightMap[16 * p + q];
        for (a = l = 0; 256 > l; l++, a++) {
          if (0 === l % 16) {
            var B = x.section[l / 16],
              a = 0;
            if (void 0 === B) {
              for (p = 0; 16 > p; p++)
                for (q = 0; 16 > q; q++) f = 2304 * l + 48 * (16 * t + p) + (16 * A + q), e[f] = 0, c[f] = 0, d[f] = 0, f = 2304 * (l + 15) + 48 * (16 * t + p) + (16 * A + q), e[f] = 0, c[f] = 0, d[f] = 0;
              l += 15;
              a = -1;
              continue
            }
          }
          for (v = 0, p = 0; 16 > p; p++)
            for (q = 0; 16 > q; q += 2) b = 256 * a + 16 * p + q, f = 2304 * l + 48 * (16 * t + p) + (16 * A + q), e[f] = B.blocks[b], e[f + 1] = B.blocks[b + 1], v = B.skyLight[b / 2], c[f] = v & 15, c[f + 1] = v >> 4 & 15, v = B.blockLight[b / 2], d[f] = v & 15, d[f + 1] = v >> 4 & 15
        }
      }
  return !0
};
Chunk.prototype.init2 = function(b) {
  if (0 === b) var f = 49,
    c = 256;
  else f = 0, c = 49;
  if (0 === this.lightPopulated && settings.lightInit) {
    if (!this.refreshLight(-1, !0)) return !1;
    this.lightPopulated = 1
  }
  if (!this.getCache(f, c)) return !1;
  0 === b ? this.isInit = -1 : this.isInit1 = -1;
  var d = Chunk.cacheSlight,
    e = Chunk.cacheBlight,
    m = Chunk.cacheData,
    l = Chunk.cacheId,
    p = 0,
    q = 0,
    x = 0,
    A = 0,
    t = 0,
    a, B = punkty1;
  B[0].o = 0;
  B[1].o = 0;
  B[2].o = 0;
  var v, C, u, w, F, r, s, n, L, K, Y, T, y, R, U, M, N, P, S, Q, V, J, Z, I, H, X, z, $, aa, W, k, lb, mb, ub, D;
  for (v = B[3].o = 0, C = 0, u = 0, w = C = 0, F = 0, r = 0, s = 0, L = 0, K = 0, Y = 0, T = 0, y = 0, R = 0, U = 0, M = 0, N = 0, P = 0, S = 0, Q = 0, V = !1, J = !1, Z = !1, I = !1,
    H = !1, X = !1, z = 0, $ = 0, aa = 0, W = 0, k = 0, ub = 0, D = 0; 256 > D; D++) this.heightMap[D] > ub && (ub = this.heightMap[D]);
  ub + 1 < c && (c = ub + 1);
  var G, E;
  var kb;
  var jb, pb;
  for (G = f; G < c; G++)
    if (0 === G % 16 && -1 === l[324 * (G + 2) + 19]) G += 15;
    else
      for (D = 0; 16 > D; D++)
        for (E = 0; 16 > E; E++)
          if (X = H = I = Z = J = V = !1, v = 324 * (G + 1) + 18 * (D + 1) + (E + 1), q = block[l[v]].type, 0 !== q) {
            var C = v + 18,
              u = v - 18,
              w = v - 1,
              F = v + 1,
              r = v + 324,
              s = v - 324,
              nb = block[l[r]].type,
              ob = block[l[s]].type,
              ha = block[l[w]].type,
              ia = block[l[F]].type,
              ja = block[l[u]].type,
              ka = block[l[C]].type;
            lb = this.xPos % 5;
            0 > lb && (lb += 5);
            mb = this.zPos % 5;
            0 > mb && (mb += 5);
            n = 65536 * (0 + G) + 256 * (16 * D + E) + 10 * (5 * lb + mb);
            if (1 === q || 2 === q || 4 === q || 6 === q) 1 !== nb && (Y = d[r], N = e[r], J = !0), 1 !== ob && (T = d[s], P = e[s], V = !0), 1 !== ja && (K = d[u], M = e[u], X = !0), 1 !== ka && (L = d[C], U = e[C], H = !0), 1 !== ha && (y = d[w], S = e[w], Z = !0), 1 !== ia && (R = d[F], Q = e[F], I = !0);
            else if (300 < q) nb !== q && (Y = d[r], N = e[r], J = !0), 1 !== ob && ob !== q && (T = d[s], P = e[s], V = !0), ja !== q && (K = d[u], M = e[u], X = !0), ka !== q && (L = d[C], U = e[C], H = !0), ha !== q && (y = d[w], S = e[w], Z = !0), ia !== q && (R = d[F], Q = e[F], I = !0);
            else if (300 === q) {
              if (nb !== q || m[r] !== m[v]) Y = d[r],
                N = e[r], J = !0;
              if (1 !== ob && ob !== q || m[s] !== m[v]) T = d[s], P = e[s], V = !0;
              if (ja !== q || m[u] !== m[v]) K = d[u], M = e[u], X = !0;
              if (ka !== q || m[C] !== m[v]) L = d[C], U = e[C], H = !0;
              if (ha !== q || m[w] !== m[v]) y = d[w], S = e[w], Z = !0;
              if (ia !== q || m[F] !== m[v]) R = d[F], Q = e[F], I = !0
            } else continue;
            if (Z || I || X || H || V || J)
              if (A = l[v], x = m[v], t = void 0 === block[A][x] ? block[A][0] : block[A][x], void 0 !== t.shapeType && 0 !== t.shapeType)
                if (1 === t.shapeType) {
                  p = t.drawLevel;
                  a = B[p];
                  var h = t.shape,
                    O = h,
                    z = 0;
                  0 < t.useBiomeColor && (z = this.getBiomeColor(E, D, t.useBiomeColor - 1));
                  if (Z) {
                    a =
                      8 < y && 0 === p ? B[p + 1] : B[p];
                    if (0 === block.lightSource[A]) var oa = Math.floor((y + d[w - 18] + d[w - 324 - 18] + d[w - 324]) / 4),
                      Na = Math.floor((y + d[w - 324] + d[w - 324 + 18] + d[w + 18]) / 4),
                      pa = Math.floor((y + d[w + 18] + d[w + 324 + 18] + d[w + 324]) / 4),
                      Oa = Math.floor((y + d[w + 324] + d[w + 324 - 18] + d[w - 18]) / 4),
                      la = Math.floor((S + e[w - 18] + e[w - 324 - 18] + e[w - 324]) / 4),
                      Ka = Math.floor((S + e[w - 324] + e[w - 324 + 18] + e[w + 18]) / 4),
                      ma = Math.floor((S + e[w + 18] + e[w + 324 + 18] + e[w + 324]) / 4),
                      La = Math.floor((S + e[w + 324] + e[w + 324 - 18] + e[w - 18]) / 4);
                    else oa = Na = pa = Oa = la = Ka = ma = La = 15;
                    var g = 0;
                    a.d[a.o++] =
                      16 * this.xPos + E + O.front[g];
                    a.d[a.o++] = 0 + G + O.front[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.front[g + 2];
                    a.d[a.o++] = h.front[g + 3];
                    a.d[a.o++] = h.front[g + 4];
                    a.d[a.o++] = 100 * oa + la;
                    a.d[a.o++] = n + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 5;
                    a.d[a.o++] = 16 * this.xPos + E + O.front[g];
                    a.d[a.o++] = 0 + G + O.front[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.front[g + 2];
                    a.d[a.o++] = h.front[g + 3];
                    a.d[a.o++] = h.front[g + 4];
                    a.d[a.o++] = 100 * Na + Ka;
                    a.d[a.o++] = n + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 10;
                    a.d[a.o++] = 16 * this.xPos + E + O.front[g];
                    a.d[a.o++] = 0 + G + O.front[g + 1];
                    a.d[a.o++] =
                      16 * this.zPos + D + O.front[g + 2];
                    a.d[a.o++] = h.front[g + 3];
                    a.d[a.o++] = h.front[g + 4];
                    a.d[a.o++] = 100 * pa + ma;
                    a.d[a.o++] = n + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 15;
                    a.d[a.o++] = 16 * this.xPos + E + O.front[g];
                    a.d[a.o++] = 0 + G + O.front[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.front[g + 2];
                    a.d[a.o++] = h.front[g + 3];
                    a.d[a.o++] = h.front[g + 4];
                    a.d[a.o++] = 100 * oa + la;
                    a.d[a.o++] = n + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 20;
                    a.d[a.o++] = 16 * this.xPos + E + O.front[g];
                    a.d[a.o++] = 0 + G + O.front[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.front[g + 2];
                    a.d[a.o++] = h.front[g + 3];
                    a.d[a.o++] =
                      h.front[g + 4];
                    a.d[a.o++] = 100 * pa + ma;
                    a.d[a.o++] = n + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 25;
                    a.d[a.o++] = 16 * this.xPos + E + O.front[g];
                    a.d[a.o++] = 0 + G + O.front[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.front[g + 2];
                    a.d[a.o++] = h.front[g + 3];
                    a.d[a.o++] = h.front[g + 4];
                    a.d[a.o++] = 100 * Oa + La;
                    a.d[a.o++] = n + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z
                  }
                  if (I) {
                    a = 8 < R && 0 === p ? B[p + 1] : B[p];
                    if (0 === block.lightSource[A]) var na = Math.floor((R + d[F - 18] + d[F - 324 - 18] + d[F - 324]) / 4),
                      Ma = Math.floor((R + d[F - 324] + d[F - 324 + 18] + d[F + 18]) / 4),
                      qa = Math.floor((R + d[F + 18] + d[F + 324 + 18] + d[F +
                        324]) / 4),
                      Pa = Math.floor((R + d[F + 324] + d[F + 324 - 18] + d[F - 18]) / 4),
                      ra = Math.floor((Q + e[F - 18] + e[F - 324 - 18] + e[F - 324]) / 4),
                      Qa = Math.floor((Q + e[F - 324] + e[F - 324 + 18] + e[F + 18]) / 4),
                      sa = Math.floor((Q + e[F + 18] + e[F + 324 + 18] + e[F + 324]) / 4),
                      Ra = Math.floor((Q + e[F + 324] + e[F + 324 - 18] + e[F - 18]) / 4);
                    else na = Ma = qa = Pa = ra = Qa = sa = Ra = 15;
                    g = 0;
                    a.d[a.o++] = 16 * this.xPos + E + O.back[g];
                    a.d[a.o++] = 0 + G + O.back[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.back[g + 2];
                    a.d[a.o++] = h.back[g + 3];
                    a.d[a.o++] = h.back[g + 4];
                    a.d[a.o++] = 100 * qa + sa;
                    a.d[a.o++] = n + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] =
                      z;
                    g = 5;
                    a.d[a.o++] = 16 * this.xPos + E + O.back[g];
                    a.d[a.o++] = 0 + G + O.back[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.back[g + 2];
                    a.d[a.o++] = h.back[g + 3];
                    a.d[a.o++] = h.back[g + 4];
                    a.d[a.o++] = 100 * na + ra;
                    a.d[a.o++] = n + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 10;
                    a.d[a.o++] = 16 * this.xPos + E + O.back[g];
                    a.d[a.o++] = 0 + G + O.back[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.back[g + 2];
                    a.d[a.o++] = h.back[g + 3];
                    a.d[a.o++] = h.back[g + 4];
                    a.d[a.o++] = 100 * Pa + Ra;
                    a.d[a.o++] = n + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 15;
                    a.d[a.o++] = 16 * this.xPos + E + O.back[g];
                    a.d[a.o++] = 0 + G + O.back[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.back[g + 2];
                    a.d[a.o++] = h.back[g + 3];
                    a.d[a.o++] = h.back[g + 4];
                    a.d[a.o++] = 100 * na + ra;
                    a.d[a.o++] = n + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 20;
                    a.d[a.o++] = 16 * this.xPos + E + O.back[g];
                    a.d[a.o++] = 0 + G + O.back[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.back[g + 2];
                    a.d[a.o++] = h.back[g + 3];
                    a.d[a.o++] = h.back[g + 4];
                    a.d[a.o++] = 100 * qa + sa;
                    a.d[a.o++] = n + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 25;
                    a.d[a.o++] = 16 * this.xPos + E + O.back[g];
                    a.d[a.o++] = 0 + G + O.back[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.back[g + 2];
                    a.d[a.o++] = h.back[g + 3];
                    a.d[a.o++] =
                      h.back[g + 4];
                    a.d[a.o++] = 100 * Ma + Qa;
                    a.d[a.o++] = n + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z
                  }
                  if (X) {
                    a = 8 < K && 0 === p ? B[p + 1] : B[p];
                    if (0 === block.lightSource[A]) var ta = Math.floor((K + d[u - 1] + d[u - 324 - 1] + d[u - 324]) / 4),
                      Sa = Math.floor((K + d[u - 324] + d[u - 324 + 1] + d[u + 1]) / 4),
                      ua = Math.floor((K + d[u + 1] + d[u + 324 + 1] + d[u + 324]) / 4),
                      Ta = Math.floor((K + d[u + 324] + d[u + 324 - 1] + d[u - 1]) / 4),
                      va = Math.floor((M + e[u - 1] + e[u - 324 - 1] + e[u - 324]) / 4),
                      Ua = Math.floor((M + e[u - 324] + e[u - 324 + 1] + e[u + 1]) / 4),
                      wa = Math.floor((M + e[u + 1] + e[u + 324 + 1] + e[u + 324]) / 4),
                      Va = Math.floor((M + e[u + 324] +
                        e[u + 324 - 1] + e[u - 1]) / 4);
                    else ta = Sa = ua = Ta = va = Ua = wa = Va = 15;
                    g = 0;
                    a.d[a.o++] = 16 * this.xPos + E + O.right[g];
                    a.d[a.o++] = 0 + G + O.right[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.right[g + 2];
                    a.d[a.o++] = h.right[g + 3];
                    a.d[a.o++] = h.right[g + 4];
                    a.d[a.o++] = 100 * ua + wa;
                    a.d[a.o++] = n + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 5;
                    a.d[a.o++] = 16 * this.xPos + E + O.right[g];
                    a.d[a.o++] = 0 + G + O.right[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.right[g + 2];
                    a.d[a.o++] = h.right[g + 3];
                    a.d[a.o++] = h.right[g + 4];
                    a.d[a.o++] = 100 * ta + va;
                    a.d[a.o++] = n + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 10;
                    a.d[a.o++] = 16 * this.xPos + E + O.right[g];
                    a.d[a.o++] = 0 + G + O.right[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.right[g + 2];
                    a.d[a.o++] = h.right[g + 3];
                    a.d[a.o++] = h.right[g + 4];
                    a.d[a.o++] = 100 * Ta + Va;
                    a.d[a.o++] = n + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 15;
                    a.d[a.o++] = 16 * this.xPos + E + O.right[g];
                    a.d[a.o++] = 0 + G + O.right[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.right[g + 2];
                    a.d[a.o++] = h.right[g + 3];
                    a.d[a.o++] = h.right[g + 4];
                    a.d[a.o++] = 100 * ua + wa;
                    a.d[a.o++] = n + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 20;
                    a.d[a.o++] = 16 * this.xPos + E + O.right[g];
                    a.d[a.o++] = 0 + G + O.right[g +
                      1];
                    a.d[a.o++] = 16 * this.zPos + D + O.right[g + 2];
                    a.d[a.o++] = h.right[g + 3];
                    a.d[a.o++] = h.right[g + 4];
                    a.d[a.o++] = 100 * Sa + Ua;
                    a.d[a.o++] = n + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 25;
                    a.d[a.o++] = 16 * this.xPos + E + O.right[g];
                    a.d[a.o++] = 0 + G + O.right[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.right[g + 2];
                    a.d[a.o++] = h.right[g + 3];
                    a.d[a.o++] = h.right[g + 4];
                    a.d[a.o++] = 100 * ta + va;
                    a.d[a.o++] = n + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z
                  }
                  if (H) {
                    a = 8 < L && 0 === p ? B[p + 1] : B[p];
                    if (0 === block.lightSource[A]) var Wa = Math.floor((L + d[C - 1] + d[C - 324 - 1] + d[C - 324]) / 4),
                      xa = Math.floor((L +
                        d[C - 324] + d[C - 324 + 1] + d[C + 1]) / 4),
                      Xa = Math.floor((L + d[C + 1] + d[C + 324 + 1] + d[C + 324]) / 4),
                      ya = Math.floor((L + d[C + 324] + d[C + 324 - 1] + d[C - 1]) / 4),
                      Ya = Math.floor((U + e[C - 1] + e[C - 324 - 1] + e[C - 324]) / 4),
                      za = Math.floor((U + e[C - 324] + e[C - 324 + 1] + e[C + 1]) / 4),
                      Za = Math.floor((U + e[C + 1] + e[C + 324 + 1] + e[C + 324]) / 4),
                      Aa = Math.floor((U + e[C + 324] + e[C + 324 - 1] + e[C - 1]) / 4);
                    else Wa = xa = Xa = ya = Ya = za = Za = Aa = 15;
                    g = 0;
                    a.d[a.o++] = 16 * this.xPos + E + O.left[g];
                    a.d[a.o++] = 0 + G + O.left[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.left[g + 2];
                    a.d[a.o++] = h.left[g + 3];
                    a.d[a.o++] = h.left[g + 4];
                    a.d[a.o++] = 100 * ya + Aa;
                    a.d[a.o++] = n + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 5;
                    a.d[a.o++] = 16 * this.xPos + E + O.left[g];
                    a.d[a.o++] = 0 + G + O.left[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.left[g + 2];
                    a.d[a.o++] = h.left[g + 3];
                    a.d[a.o++] = h.left[g + 4];
                    a.d[a.o++] = 100 * Wa + Ya;
                    a.d[a.o++] = n + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 10;
                    a.d[a.o++] = 16 * this.xPos + E + O.left[g];
                    a.d[a.o++] = 0 + G + O.left[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.left[g + 2];
                    a.d[a.o++] = h.left[g + 3];
                    a.d[a.o++] = h.left[g + 4];
                    a.d[a.o++] = 100 * xa + za;
                    a.d[a.o++] = n + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 15;
                    a.d[a.o++] = 16 * this.xPos + E + O.left[g];
                    a.d[a.o++] = 0 + G + O.left[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.left[g + 2];
                    a.d[a.o++] = h.left[g + 3];
                    a.d[a.o++] = h.left[g + 4];
                    a.d[a.o++] = 100 * Xa + Za;
                    a.d[a.o++] = n + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 20;
                    a.d[a.o++] = 16 * this.xPos + E + O.left[g];
                    a.d[a.o++] = 0 + G + O.left[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.left[g + 2];
                    a.d[a.o++] = h.left[g + 3];
                    a.d[a.o++] = h.left[g + 4];
                    a.d[a.o++] = 100 * ya + Aa;
                    a.d[a.o++] = n + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 25;
                    a.d[a.o++] = 16 * this.xPos + E + O.left[g];
                    a.d[a.o++] = 0 + G + O.left[g + 1];
                    a.d[a.o++] =
                      16 * this.zPos + D + O.left[g + 2];
                    a.d[a.o++] = h.left[g + 3];
                    a.d[a.o++] = h.left[g + 4];
                    a.d[a.o++] = 100 * xa + za;
                    a.d[a.o++] = n + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z
                  }
                  if (V) {
                    a = B[p];
                    if (0 === block.lightSource[A]) var Ba = Math.floor((T + d[s - 1] + d[s - 18 - 1] + d[s - 18]) / 4),
                      $a = Math.floor((T + d[s - 18] + d[s - 18 + 1] + d[s + 1]) / 4),
                      Ca = Math.floor((T + d[s + 1] + d[s + 18 + 1] + d[s + 18]) / 4),
                      ab = Math.floor((T + d[s + 18] + d[s + 18 - 1] + d[s - 1]) / 4),
                      Da = Math.floor((P + e[s - 1] + e[s - 18 - 1] + e[s - 18]) / 4),
                      bb = Math.floor((P + e[s - 18] + e[s - 18 + 1] + e[s + 1]) / 4),
                      Ea = Math.floor((P + e[s + 1] + e[s + 18 + 1] + e[s + 18]) /
                        4),
                      cb = Math.floor((P + e[s + 18] + e[s + 18 - 1] + e[s - 1]) / 4);
                    else Ba = $a = Ca = ab = Da = bb = Ea = cb = 15;
                    g = 0;
                    a.d[a.o++] = 16 * this.xPos + E + h.bottom[g];
                    a.d[a.o++] = 0 + G + h.bottom[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                    a.d[a.o++] = h.bottom[g + 3];
                    a.d[a.o++] = h.bottom[g + 4];
                    a.d[a.o++] = 100 * Ca + Ea;
                    a.d[a.o++] = n + 5;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 5;
                    a.d[a.o++] = 16 * this.xPos + E + h.bottom[g];
                    a.d[a.o++] = 0 + G + h.bottom[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                    a.d[a.o++] = h.bottom[g + 3];
                    a.d[a.o++] = h.bottom[g + 4];
                    a.d[a.o++] = 100 * Ba + Da;
                    a.d[a.o++] = n + 5;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 10;
                    a.d[a.o++] = 16 * this.xPos + E + h.bottom[g];
                    a.d[a.o++] = 0 + G + h.bottom[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                    a.d[a.o++] = h.bottom[g + 3];
                    a.d[a.o++] = h.bottom[g + 4];
                    a.d[a.o++] = 100 * $a + bb;
                    a.d[a.o++] = n + 5;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 15;
                    a.d[a.o++] = 16 * this.xPos + E + h.bottom[g];
                    a.d[a.o++] = 0 + G + h.bottom[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                    a.d[a.o++] = h.bottom[g + 3];
                    a.d[a.o++] = h.bottom[g + 4];
                    a.d[a.o++] = 100 * Ca + Ea;
                    a.d[a.o++] = n + 5;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 20;
                    a.d[a.o++] = 16 * this.xPos +
                      E + h.bottom[g];
                    a.d[a.o++] = 0 + G + h.bottom[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                    a.d[a.o++] = h.bottom[g + 3];
                    a.d[a.o++] = h.bottom[g + 4];
                    a.d[a.o++] = 100 * ab + cb;
                    a.d[a.o++] = n + 5;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 25;
                    a.d[a.o++] = 16 * this.xPos + E + h.bottom[g];
                    a.d[a.o++] = 0 + G + h.bottom[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                    a.d[a.o++] = h.bottom[g + 3];
                    a.d[a.o++] = h.bottom[g + 4];
                    a.d[a.o++] = 100 * Ba + Da;
                    a.d[a.o++] = n + 5;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z
                  }
                  if (J) {
                    a = 8 < Y && 0 === p ? B[p + 1] : B[p];
                    if (0 === block.lightSource[A]) var Fa = Math.floor((Y + d[r -
                        1] + d[r - 18 - 1] + d[r - 18]) / 4),
                      db = Math.floor((Y + d[r - 18] + d[r - 18 + 1] + d[r + 1]) / 4),
                      Ga = Math.floor((Y + d[r + 1] + d[r + 18 + 1] + d[r + 18]) / 4),
                      eb = Math.floor((Y + d[r + 18] + d[r + 18 - 1] + d[r - 1]) / 4),
                      Ha = Math.floor((N + e[r - 1] + e[r - 18 - 1] + e[r - 18]) / 4),
                      fb = Math.floor((N + e[r - 18] + e[r - 18 + 1] + e[r + 1]) / 4),
                      Ia = Math.floor((N + e[r + 1] + e[r + 18 + 1] + e[r + 18]) / 4),
                      gb = Math.floor((N + e[r + 18] + e[r + 18 - 1] + e[r - 1]) / 4);
                    else Fa = db = Ga = eb = Ha = fb = Ia = gb = 15;
                    g = 0;
                    a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                    a.d[a.o++] = 0 + G + h.top[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2];
                    a.d[a.o++] = h.top[g + 3];
                    a.d[a.o++] = h.top[g + 4];
                    a.d[a.o++] = 100 * Ga + Ia;
                    a.d[a.o++] = n + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 5;
                    a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                    a.d[a.o++] = 0 + G + h.top[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2];
                    a.d[a.o++] = h.top[g + 3];
                    a.d[a.o++] = h.top[g + 4];
                    a.d[a.o++] = 100 * db + fb;
                    a.d[a.o++] = n + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 10;
                    a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                    a.d[a.o++] = 0 + G + h.top[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2];
                    a.d[a.o++] = h.top[g + 3];
                    a.d[a.o++] = h.top[g + 4];
                    a.d[a.o++] = 100 * Fa + Ha;
                    a.d[a.o++] = n + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 15;
                    a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                    a.d[a.o++] = 0 + G + h.top[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2];
                    a.d[a.o++] = h.top[g + 3];
                    a.d[a.o++] = h.top[g + 4];
                    a.d[a.o++] = 100 * Ga + Ia;
                    a.d[a.o++] = n + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 20;
                    a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                    a.d[a.o++] = 0 + G + h.top[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2];
                    a.d[a.o++] = h.top[g + 3];
                    a.d[a.o++] = h.top[g + 4];
                    a.d[a.o++] = 100 * Fa + Ha;
                    a.d[a.o++] = n + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 25;
                    a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                    a.d[a.o++] = 0 + G + h.top[g + 1];
                    a.d[a.o++] = 16 * this.zPos +
                      D + h.top[g + 2];
                    a.d[a.o++] = h.top[g + 3];
                    a.d[a.o++] = h.top[g + 4];
                    a.d[a.o++] = 100 * eb + gb;
                    a.d[a.o++] = n + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z
                  }
                } else if (2 === t.shapeType) {
              p = t.drawLevel;
              a = B[p];
              h = t.shape;
              if (Z)
                for (g = 0; g < h.front.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * y + S, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = 0;
              if (I)
                for (g = 0; g < h.back.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] =
                  0 + G + h.back[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * R + Q, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = 0;
              if (X)
                for (g = 0; g < h.right.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * K + M, a.d[a.o++] = n + 3, a.d[a.o++] = 0.8, a.d[a.o++] = 0;
              if (H)
                for (g = 0; g < h.left.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g +
                  1], a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * L + U, a.d[a.o++] = n + 4, a.d[a.o++] = 0.8, a.d[a.o++] = 0
            } else if (3 === t.shapeType) {
              if (p = t.drawLevel, a = B[p], h = t.shape, y = Math.floor((y + R + K + L + Y) / 5), S = Math.floor((S + Q + M + U + N) / 5), z = 0, 0 < t.useBiomeColor && (z = this.getBiomeColor(E, D, t.useBiomeColor - 1)), Z || I || X || H)
                for (kb in h)
                  for (g = 0; g < h[kb].length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h[kb][g], a.d[a.o++] = 0 + G + h[kb][g + 1], a.d[a.o++] = 16 * this.zPos + D + h[kb][g + 2], a.d[a.o++] = h[kb][g +
                    3
                  ], a.d[a.o++] = h[kb][g + 4], a.d[a.o++] = 100 * y + S, a.d[a.o++] = n + 0, a.d[a.o++] = 1, a.d[a.o++] = z
            } else if (4 === t.shapeType) {
              p = t.drawLevel;
              a = B[p];
              78 === l[r] && (t = block[A][1]);
              h = t.shape;
              0 < t.useBiomeColor ? (z = this.getBiomeColor(E, D, t.useBiomeColor - 1), $ = this.getBiomeColor1(E, D, t.useBiomeColor - 1), aa = this.getBiomeColor2(E, D, t.useBiomeColor - 1), W = this.getBiomeColor3(E, D, t.useBiomeColor - 1), k = this.getBiomeColor4(E, D, t.useBiomeColor - 1)) : k = W = aa = $ = z = 0;
              if (Z) {
                a = 8 < y && 0 === p ? B[p + 1] : B[p];
                if (4 === t.shapeType)
                  for (g = 0; g < h.front2.length; g +=
                    5) a.d[a.o++] = 16 * this.xPos + E + h.front2[g], a.d[a.o++] = 0 + G + h.front2[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.front2[g + 2], a.d[a.o++] = h.front2[g + 3], a.d[a.o++] = h.front2[g + 4], a.d[a.o++] = 100 * y + S, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z;
                oa = Math.floor((y + d[w - 18] + d[w - 324 - 18] + d[w - 324]) / 4);
                Na = Math.floor((y + d[w - 324] + d[w - 324 + 18] + d[w + 18]) / 4);
                pa = Math.floor((y + d[w + 18] + d[w + 324 + 18] + d[w + 324]) / 4);
                Oa = Math.floor((y + d[w + 324] + d[w + 324 - 18] + d[w - 18]) / 4);
                la = Math.floor((S + e[w - 18] + e[w - 324 - 18] + e[w - 324]) / 4);
                Ka = Math.floor((S + e[w - 324] + e[w -
                  324 + 18] + e[w + 18]) / 4);
                ma = Math.floor((S + e[w + 18] + e[w + 324 + 18] + e[w + 324]) / 4);
                La = Math.floor((S + e[w + 324] + e[w + 324 - 18] + e[w - 18]) / 4);
                g = 0;
                a.d[a.o++] = 16 * this.xPos + E + h.front[g];
                a.d[a.o++] = 0 + G + h.front[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                a.d[a.o++] = h.front[g + 3];
                a.d[a.o++] = h.front[g + 4];
                a.d[a.o++] = 100 * oa + la;
                a.d[a.o++] = n + 1;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 5;
                a.d[a.o++] = 16 * this.xPos + E + h.front[g];
                a.d[a.o++] = 0 + G + h.front[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                a.d[a.o++] = h.front[g + 3];
                a.d[a.o++] = h.front[g + 4];
                a.d[a.o++] =
                  100 * Na + Ka;
                a.d[a.o++] = n + 1;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 10;
                a.d[a.o++] = 16 * this.xPos + E + h.front[g];
                a.d[a.o++] = 0 + G + h.front[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                a.d[a.o++] = h.front[g + 3];
                a.d[a.o++] = h.front[g + 4];
                a.d[a.o++] = 100 * pa + ma;
                a.d[a.o++] = n + 1;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 15;
                a.d[a.o++] = 16 * this.xPos + E + h.front[g];
                a.d[a.o++] = 0 + G + h.front[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                a.d[a.o++] = h.front[g + 3];
                a.d[a.o++] = h.front[g + 4];
                a.d[a.o++] = 100 * oa + la;
                a.d[a.o++] = n + 1;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 20;
                a.d[a.o++] =
                  16 * this.xPos + E + h.front[g];
                a.d[a.o++] = 0 + G + h.front[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                a.d[a.o++] = h.front[g + 3];
                a.d[a.o++] = h.front[g + 4];
                a.d[a.o++] = 100 * pa + ma;
                a.d[a.o++] = n + 1;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 25;
                a.d[a.o++] = 16 * this.xPos + E + h.front[g];
                a.d[a.o++] = 0 + G + h.front[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                a.d[a.o++] = h.front[g + 3];
                a.d[a.o++] = h.front[g + 4];
                a.d[a.o++] = 100 * Oa + La;
                a.d[a.o++] = n + 1;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0
              }
              if (I) {
                a = 8 < y && 0 === p ? B[p + 1] : B[p];
                if (4 === t.shapeType)
                  for (g = 0; g < h.back2.length; g +=
                    5) a.d[a.o++] = 16 * this.xPos + E + h.back2[g], a.d[a.o++] = 0 + G + h.back2[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.back2[g + 2], a.d[a.o++] = h.back2[g + 3], a.d[a.o++] = h.back2[g + 4], a.d[a.o++] = 100 * R + Q, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z;
                na = Math.floor((R + d[F - 18] + d[F - 324 - 18] + d[F - 324]) / 4);
                Ma = Math.floor((R + d[F - 324] + d[F - 324 + 18] + d[F + 18]) / 4);
                qa = Math.floor((R + d[F + 18] + d[F + 324 + 18] + d[F + 324]) / 4);
                Pa = Math.floor((R + d[F + 324] + d[F + 324 - 18] + d[F - 18]) / 4);
                ra = Math.floor((Q + e[F - 18] + e[F - 324 - 18] + e[F - 324]) / 4);
                Qa = Math.floor((Q + e[F - 324] + e[F - 324 + 18] +
                  e[F + 18]) / 4);
                sa = Math.floor((Q + e[F + 18] + e[F + 324 + 18] + e[F + 324]) / 4);
                Ra = Math.floor((Q + e[F + 324] + e[F + 324 - 18] + e[F - 18]) / 4);
                g = 0;
                a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                a.d[a.o++] = 0 + G + h.back[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                a.d[a.o++] = h.back[g + 3];
                a.d[a.o++] = h.back[g + 4];
                a.d[a.o++] = 100 * qa + sa;
                a.d[a.o++] = n + 2;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 5;
                a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                a.d[a.o++] = 0 + G + h.back[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                a.d[a.o++] = h.back[g + 3];
                a.d[a.o++] = h.back[g + 4];
                a.d[a.o++] = 100 * na + ra;
                a.d[a.o++] =
                  n + 2;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 10;
                a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                a.d[a.o++] = 0 + G + h.back[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                a.d[a.o++] = h.back[g + 3];
                a.d[a.o++] = h.back[g + 4];
                a.d[a.o++] = 100 * Pa + Ra;
                a.d[a.o++] = n + 2;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 15;
                a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                a.d[a.o++] = 0 + G + h.back[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                a.d[a.o++] = h.back[g + 3];
                a.d[a.o++] = h.back[g + 4];
                a.d[a.o++] = 100 * na + ra;
                a.d[a.o++] = n + 2;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 20;
                a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                a.d[a.o++] = 0 + G + h.back[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                a.d[a.o++] = h.back[g + 3];
                a.d[a.o++] = h.back[g + 4];
                a.d[a.o++] = 100 * qa + sa;
                a.d[a.o++] = n + 2;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 25;
                a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                a.d[a.o++] = 0 + G + h.back[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                a.d[a.o++] = h.back[g + 3];
                a.d[a.o++] = h.back[g + 4];
                a.d[a.o++] = 100 * Ma + Qa;
                a.d[a.o++] = n + 2;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0
              }
              if (X) {
                a = 8 < y && 0 === p ? B[p + 1] : B[p];
                if (4 === t.shapeType)
                  for (g = 0; g < h.right2.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.right2[g],
                    a.d[a.o++] = 0 + G + h.right2[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.right2[g + 2], a.d[a.o++] = h.right2[g + 3], a.d[a.o++] = h.right2[g + 4], a.d[a.o++] = 100 * K + M, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z;
                ta = Math.floor((K + d[u - 1] + d[u - 324 - 1] + d[u - 324]) / 4);
                Sa = Math.floor((K + d[u - 324] + d[u - 324 + 1] + d[u + 1]) / 4);
                ua = Math.floor((K + d[u + 1] + d[u + 324 + 1] + d[u + 324]) / 4);
                Ta = Math.floor((K + d[u + 324] + d[u + 324 - 1] + d[u - 1]) / 4);
                va = Math.floor((M + e[u - 1] + e[u - 324 - 1] + e[u - 324]) / 4);
                Ua = Math.floor((M + e[u - 324] + e[u - 324 + 1] + e[u + 1]) / 4);
                wa = Math.floor((M + e[u + 1] + e[u + 324 +
                  1] + e[u + 324]) / 4);
                Va = Math.floor((M + e[u + 324] + e[u + 324 - 1] + e[u - 1]) / 4);
                g = 0;
                a.d[a.o++] = 16 * this.xPos + E + h.right[g];
                a.d[a.o++] = 0 + G + h.right[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                a.d[a.o++] = h.right[g + 3];
                a.d[a.o++] = h.right[g + 4];
                a.d[a.o++] = 100 * ua + wa;
                a.d[a.o++] = n + 3;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 5;
                a.d[a.o++] = 16 * this.xPos + E + h.right[g];
                a.d[a.o++] = 0 + G + h.right[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                a.d[a.o++] = h.right[g + 3];
                a.d[a.o++] = h.right[g + 4];
                a.d[a.o++] = 100 * ta + va;
                a.d[a.o++] = n + 3;
                a.d[a.o++] = 0.55;
                a.d[a.o++] =
                  0;
                g = 10;
                a.d[a.o++] = 16 * this.xPos + E + h.right[g];
                a.d[a.o++] = 0 + G + h.right[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                a.d[a.o++] = h.right[g + 3];
                a.d[a.o++] = h.right[g + 4];
                a.d[a.o++] = 100 * Ta + Va;
                a.d[a.o++] = n + 3;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 15;
                a.d[a.o++] = 16 * this.xPos + E + h.right[g];
                a.d[a.o++] = 0 + G + h.right[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                a.d[a.o++] = h.right[g + 3];
                a.d[a.o++] = h.right[g + 4];
                a.d[a.o++] = 100 * ua + wa;
                a.d[a.o++] = n + 3;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 20;
                a.d[a.o++] = 16 * this.xPos + E + h.right[g];
                a.d[a.o++] = 0 +
                  G + h.right[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                a.d[a.o++] = h.right[g + 3];
                a.d[a.o++] = h.right[g + 4];
                a.d[a.o++] = 100 * Sa + Ua;
                a.d[a.o++] = n + 3;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 25;
                a.d[a.o++] = 16 * this.xPos + E + h.right[g];
                a.d[a.o++] = 0 + G + h.right[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                a.d[a.o++] = h.right[g + 3];
                a.d[a.o++] = h.right[g + 4];
                a.d[a.o++] = 100 * ta + va;
                a.d[a.o++] = n + 3;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0
              }
              if (H) {
                a = 8 < y && 0 === p ? B[p + 1] : B[p];
                if (4 === t.shapeType)
                  for (g = 0; g < h.left2.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.left2[g],
                    a.d[a.o++] = 0 + G + h.left2[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.left2[g + 2], a.d[a.o++] = h.left2[g + 3], a.d[a.o++] = h.left2[g + 4], a.d[a.o++] = 100 * L + U, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z;
                Wa = Math.floor((L + d[C - 1] + d[C - 324 - 1] + d[C - 324]) / 4);
                xa = Math.floor((L + d[C - 324] + d[C - 324 + 1] + d[C + 1]) / 4);
                Xa = Math.floor((L + d[C + 1] + d[C + 324 + 1] + d[C + 324]) / 4);
                ya = Math.floor((L + d[C + 324] + d[C + 324 - 1] + d[C - 1]) / 4);
                Ya = Math.floor((U + e[C - 1] + e[C - 324 - 1] + e[C - 324]) / 4);
                za = Math.floor((U + e[C - 324] + e[C - 324 + 1] + e[C + 1]) / 4);
                Za = Math.floor((U + e[C + 1] + e[C + 324 + 1] +
                  e[C + 324]) / 4);
                Aa = Math.floor((U + e[C + 324] + e[C + 324 - 1] + e[C - 1]) / 4);
                g = 0;
                a.d[a.o++] = 16 * this.xPos + E + h.left[g];
                a.d[a.o++] = 0 + G + h.left[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2];
                a.d[a.o++] = h.left[g + 3];
                a.d[a.o++] = h.left[g + 4];
                a.d[a.o++] = 100 * ya + Aa;
                a.d[a.o++] = n + 4;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 5;
                a.d[a.o++] = 16 * this.xPos + E + h.left[g];
                a.d[a.o++] = 0 + G + h.left[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2];
                a.d[a.o++] = h.left[g + 3];
                a.d[a.o++] = h.left[g + 4];
                a.d[a.o++] = 100 * Wa + Ya;
                a.d[a.o++] = n + 4;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 10;
                a.d[a.o++] =
                  16 * this.xPos + E + h.left[g];
                a.d[a.o++] = 0 + G + h.left[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2];
                a.d[a.o++] = h.left[g + 3];
                a.d[a.o++] = h.left[g + 4];
                a.d[a.o++] = 100 * xa + za;
                a.d[a.o++] = n + 4;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 15;
                a.d[a.o++] = 16 * this.xPos + E + h.left[g];
                a.d[a.o++] = 0 + G + h.left[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2];
                a.d[a.o++] = h.left[g + 3];
                a.d[a.o++] = h.left[g + 4];
                a.d[a.o++] = 100 * Xa + Za;
                a.d[a.o++] = n + 4;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 20;
                a.d[a.o++] = 16 * this.xPos + E + h.left[g];
                a.d[a.o++] = 0 + G + h.left[g + 1];
                a.d[a.o++] = 16 * this.zPos +
                  D + h.left[g + 2];
                a.d[a.o++] = h.left[g + 3];
                a.d[a.o++] = h.left[g + 4];
                a.d[a.o++] = 100 * ya + Aa;
                a.d[a.o++] = n + 4;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 25;
                a.d[a.o++] = 16 * this.xPos + E + h.left[g];
                a.d[a.o++] = 0 + G + h.left[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2];
                a.d[a.o++] = h.left[g + 3];
                a.d[a.o++] = h.left[g + 4];
                a.d[a.o++] = 100 * xa + za;
                a.d[a.o++] = n + 4;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0
              }
              V && (a = B[p], Ba = Math.floor((T + d[s - 1] + d[s - 18 - 1] + d[s - 18]) / 4), $a = Math.floor((T + d[s - 18] + d[s - 18 + 1] + d[s + 1]) / 4), Ca = Math.floor((T + d[s + 1] + d[s + 18 + 1] + d[s + 18]) / 4), ab = Math.floor((T +
                  d[s + 18] + d[s + 18 - 1] + d[s - 1]) / 4), Da = Math.floor((P + e[s - 1] + e[s - 18 - 1] + e[s - 18]) / 4), bb = Math.floor((P + e[s - 18] + e[s - 18 + 1] + e[s + 1]) / 4), Ea = Math.floor((P + e[s + 1] + e[s + 18 + 1] + e[s + 18]) / 4), cb = Math.floor((P + e[s + 18] + e[s + 18 - 1] + e[s - 1]) / 4), g = 0, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * Ca + Ea, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = 0, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g +
                  1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * Ba + Da, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = 0, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * $a + bb, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = 0, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] =
                h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * Ca + Ea, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = 0, g = 20, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * ab + cb, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = 0, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 *
                Ba + Da, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = 0);
              J && (a = 8 < Y && 0 === p ? B[p + 1] : B[p], Fa = Math.floor((Y + d[r - 1] + d[r - 18 - 1] + d[r - 18]) / 4), db = Math.floor((Y + d[r - 18] + d[r - 18 + 1] + d[r + 1]) / 4), Ga = Math.floor((Y + d[r + 1] + d[r + 18 + 1] + d[r + 18]) / 4), eb = Math.floor((Y + d[r + 18] + d[r + 18 - 1] + d[r - 1]) / 4), Ha = Math.floor((N + e[r - 1] + e[r - 18 - 1] + e[r - 18]) / 4), fb = Math.floor((N + e[r - 18] + e[r - 18 + 1] + e[r + 1]) / 4), Ia = Math.floor((N + e[r + 1] + e[r + 18 + 1] + e[r + 18]) / 4), gb = Math.floor((N + e[r + 18] + e[r + 18 - 1] + e[r - 1]) / 4), g = 0, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g +
                  1], a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Ga + Ia, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = W, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * db + fb, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = aa, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4],
                a.d[a.o++] = 100 * Fa + Ha, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = $, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Ga + Ia, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = W, g = 20, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Fa + Ha, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = $, g = 25, a.d[a.o++] = 16 * this.xPos +
                E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * eb + gb, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = k)
            } else if (8 === t.shapeType) {
              p = t.drawLevel;
              a = B[p];
              h = t.shape;
              z = 0;
              0 < t.useBiomeColor && (z = this.getBiomeColor(E, D, t.useBiomeColor - 1));
              var ea = "",
                ea = ea + m[v],
                ea = q === ka ? ea + m[C] : ea + "x",
                ea = q === ja ? ea + m[u] : ea + "x",
                ea = q === ha ? ea + m[w] : ea + "x",
                ea = q === ia ? ea + m[F] : ea + "x",
                zb = 0,
                Ab = Chunk.stairsData[ea];
              void 0 !== Ab && (h = 3 < m[v] ? block[A][9].shape : block[A][8].shape,
                zb = 1);
              if (Z)
                for (a = 8 < y && 0 === p ? B[p + 1] : B[p], g = 0; g < h.front.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * y + S, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z;
              if (I)
                for (a = 8 < R && 0 === p ? B[p + 1] : B[p], g = 0; g < h.back.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 *
                  R + Q, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z;
              if (X)
                for (a = 8 < K && 0 === p ? B[p + 1] : B[p], g = 0; g < h.right.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * K + M, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z;
              if (H)
                for (a = 8 < L && 0 === p ? B[p + 1] : B[p], g = 0; g < h.left.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g +
                  3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * L + U, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z;
              if (V)
                for (a = B[p], g = 0; g < h.bottom.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * T + P, a.d[a.o++] = n + 5, a.d[a.o++] = 0.3, a.d[a.o++] = z;
              if (J)
                for (a = 8 < Y && 0 === p ? B[p + 1] : B[p], g = 0; g < h.top.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.top[g +
                  2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Y + N, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = z;
              if (1 === zb) {
                var h = block[A][10].shape,
                  hb = 0,
                  ib = 0;
                3 < m[v] && (ib = -0.5);
                for (jb = 0, pb = 0; 4 > pb; pb++)
                  if (0 !== Ab.charCodeAt(pb) - 48) {
                    hb = pb % 2 / 2;
                    jb = 1 < pb ? 0.5 : 0;
                    if (Z)
                      for (a = 8 < y && 0 === p ? B[p + 1] : B[p], g = 0; g < h.front.length; g += 5) a.d[a.o++] = hb + 16 * this.xPos + E + h.front[g], a.d[a.o++] = ib + 0 + G + h.front[g + 1], a.d[a.o++] = jb + 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * y + S, a.d[a.o++] =
                        n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z;
                    if (I)
                      for (a = 8 < R && 0 === p ? B[p + 1] : B[p], g = 0; g < h.back.length; g += 5) a.d[a.o++] = hb + 16 * this.xPos + E + h.back[g], a.d[a.o++] = ib + 0 + G + h.back[g + 1], a.d[a.o++] = jb + 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * R + Q, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z;
                    if (X)
                      for (a = 8 < K && 0 === p ? B[p + 1] : B[p], g = 0; g < h.right.length; g += 5) a.d[a.o++] = hb + 16 * this.xPos + E + h.right[g], a.d[a.o++] = ib + 0 + G + h.right[g + 1], a.d[a.o++] = jb + 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g +
                        3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * K + M, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z;
                    if (H)
                      for (a = 8 < L && 0 === p ? B[p + 1] : B[p], g = 0; g < h.left.length; g += 5) a.d[a.o++] = hb + 16 * this.xPos + E + h.left[g], a.d[a.o++] = ib + 0 + G + h.left[g + 1], a.d[a.o++] = jb + 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * L + U, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z;
                    if (V)
                      for (a = B[p], g = 0; g < h.bottom.length; g += 5) a.d[a.o++] = hb + 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = ib + 0 + G + h.bottom[g + 1], a.d[a.o++] = jb + 16 *
                        this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * T + P, a.d[a.o++] = n + 5, a.d[a.o++] = 0.3, a.d[a.o++] = z;
                    if (J)
                      for (a = 8 < Y && 0 === p ? B[p + 1] : B[p], g = 0; g < h.top.length; g += 5) a.d[a.o++] = hb + 16 * this.xPos + E + h.top[g], a.d[a.o++] = ib + 0 + G + h.top[g + 1], a.d[a.o++] = jb + 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Y + N, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = z
                  }
              }
            } else if (5 === t.shapeType) {
              if (Z || I || X || H || J || V) {
                p = t.drawLevel;
                a = B[p];
                h = t.shape;
                z = 0;
                0 < t.useBiomeColor &&
                  (z = this.getBiomeColor(E, D, t.useBiomeColor - 1));
                a = 8 < y && 0 === p ? B[p + 1] : B[p];
                for (g = 0; g < h.front.length; g += 5) {
                  if (0 === g % 30) {
                    if ((60 === g || 120 === g) && q !== ka && 1 !== ka) {
                      g += 25;
                      continue
                    }
                    if ((30 === g || 90 === g) && q !== ja && 1 !== ja) {
                      g += 25;
                      continue
                    }
                  }
                  a.d[a.o++] = 16 * this.xPos + E + h.front[g];
                  a.d[a.o++] = 0 + G + h.front[g + 1];
                  a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                  a.d[a.o++] = h.front[g + 3];
                  a.d[a.o++] = h.front[g + 4];
                  a.d[a.o++] = 100 * y + S;
                  a.d[a.o++] = n + 1;
                  a.d[a.o++] = 0.8;
                  a.d[a.o++] = z
                }
                a = 8 < R && 0 === p ? B[p + 1] : B[p];
                for (g = 0; g < h.back.length; g += 5) {
                  if (0 === g % 30) {
                    if ((60 ===
                        g || 120 === g) && q !== ka && 1 !== ka) {
                      g += 25;
                      continue
                    }
                    if ((30 === g || 90 === g) && q !== ja && 1 !== ja) {
                      g += 25;
                      continue
                    }
                  }
                  a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                  a.d[a.o++] = 0 + G + h.back[g + 1];
                  a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                  a.d[a.o++] = h.back[g + 3];
                  a.d[a.o++] = h.back[g + 4];
                  a.d[a.o++] = 100 * R + Q;
                  a.d[a.o++] = n + 2;
                  a.d[a.o++] = 0.8;
                  a.d[a.o++] = z
                }
                a = 8 < K && 0 === p ? B[p + 1] : B[p];
                for (g = 0; g < h.right.length; g += 5) {
                  if (0 === g % 30) {
                    if ((30 === g || 90 === g) && q !== ha && 1 !== ha) {
                      g += 25;
                      continue
                    }
                    if ((60 === g || 120 === g) && q !== ia && 1 !== ia) {
                      g += 25;
                      continue
                    }
                  }
                  a.d[a.o++] = 16 * this.xPos +
                    E + h.right[g];
                  a.d[a.o++] = 0 + G + h.right[g + 1];
                  a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                  a.d[a.o++] = h.right[g + 3];
                  a.d[a.o++] = h.right[g + 4];
                  a.d[a.o++] = 100 * K + M;
                  a.d[a.o++] = n + 3;
                  a.d[a.o++] = 0.55;
                  a.d[a.o++] = z
                }
                a = 8 < L && 0 === p ? B[p + 1] : B[p];
                for (g = 0; g < h.left.length; g += 5) {
                  if (0 === g % 30) {
                    if ((30 === g || 90 === g) && q !== ha && 1 !== ha) {
                      g += 25;
                      continue
                    }
                    if ((60 === g || 120 === g) && q !== ia && 1 !== ia) {
                      g += 25;
                      continue
                    }
                  }
                  a.d[a.o++] = 16 * this.xPos + E + h.left[g];
                  a.d[a.o++] = 0 + G + h.left[g + 1];
                  a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2];
                  a.d[a.o++] = h.left[g + 3];
                  a.d[a.o++] = h.left[g +
                    4];
                  a.d[a.o++] = 100 * L + U;
                  a.d[a.o++] = n + 4;
                  a.d[a.o++] = 0.55;
                  a.d[a.o++] = z
                }
                a = B[p];
                for (g = 0; g < h.bottom.length; g += 5) {
                  if (0 === g % 30) {
                    if ((30 === g || 150 === g) && q !== ja && 1 !== ja) {
                      g += 25;
                      continue
                    }
                    if ((60 === g || 180 === g) && q !== ka && 1 !== ka) {
                      g += 25;
                      continue
                    }
                    if ((90 === g || 210 === g) && q !== ha && 1 !== ha) {
                      g += 25;
                      continue
                    }
                    if ((120 === g || 240 === g) && q !== ia && 1 !== ia) {
                      g += 25;
                      continue
                    }
                  }
                  a.d[a.o++] = 16 * this.xPos + E + h.bottom[g];
                  a.d[a.o++] = 0 + G + h.bottom[g + 1];
                  a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                  a.d[a.o++] = h.bottom[g + 3];
                  a.d[a.o++] = h.bottom[g + 4];
                  a.d[a.o++] = 100 *
                    T + P;
                  a.d[a.o++] = n + 5;
                  a.d[a.o++] = 0.3;
                  a.d[a.o++] = z
                }
                a = 8 < Y && 0 === p ? B[p + 1] : B[p];
                for (g = 0; g < h.top.length; g += 5) {
                  if (0 === g % 30) {
                    if ((30 === g || 150 === g) && q !== ja && 1 !== ja) {
                      g += 25;
                      continue
                    }
                    if ((60 === g || 180 === g) && q !== ka && 1 !== ka) {
                      g += 25;
                      continue
                    }
                    if ((90 === g || 210 === g) && q !== ha && 1 !== ha) {
                      g += 25;
                      continue
                    }
                    if ((120 === g || 240 === g) && q !== ia && 1 !== ia) {
                      g += 25;
                      continue
                    }
                  }
                  a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                  a.d[a.o++] = 0 + G + h.top[g + 1];
                  a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2];
                  a.d[a.o++] = h.top[g + 3];
                  a.d[a.o++] = h.top[g + 4];
                  a.d[a.o++] = 100 * Y + N;
                  a.d[a.o++] = n +
                    6;
                  a.d[a.o++] = 1;
                  a.d[a.o++] = z
                }
              }
            } else if (6 === t.shapeType) {
              if (p = t.drawLevel, a = B[p], h = t.shape, z = 0, 0 < t.useBiomeColor && (z = this.getBiomeColor(E, D, t.useBiomeColor - 1)), Z || I || X || H || V || J) {
                if (5 === x)
                  for (a = 8 < y && 0 === p ? B[p + 1] : B[p], g = 0; g < h.front.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * y + S, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z;
                if (4 === x)
                  for (a = 8 < R && 0 === p ? B[p + 1] : B[p], g = 0; g < h.back.length; g +=
                    5) a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * R + Q, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z;
                if (3 === x)
                  for (a = 8 < K && 0 === p ? B[p + 1] : B[p], g = 0; g < h.right.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * K + M, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z;
                if (2 === x)
                  for (a =
                    8 < L && 0 === p ? B[p + 1] : B[p], g = 0; g < h.left.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * L + U, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z
              }
            } else if (9 === t.shapeType) {
              p = t.drawLevel;
              a = B[p];
              h = t.shape;
              z = 0;
              0 < t.useBiomeColor ? (z = this.getBiomeColor(E, D, t.useBiomeColor - 1), $ = this.getBiomeColor1(E, D, t.useBiomeColor - 1), aa = this.getBiomeColor2(E, D, t.useBiomeColor - 1), W = this.getBiomeColor3(E, D, t.useBiomeColor -
                1), k = this.getBiomeColor4(E, D, t.useBiomeColor - 1)) : k = W = aa = $ = z = 0;
              var ca = 1,
                fa = 1,
                da = 1,
                ga = 1;
              if (8 !== (m[v] & 8) && nb !== q) {
                if (0 !== (m[v] & 7)) {
                  var qb = m[v + 18] % 8;
                  ka !== q && (qb = 7);
                  var rb = m[v - 18] % 8;
                  ja !== q && (rb = 7);
                  var sb = m[v - 1] % 8;
                  ha !== q && (sb = 7);
                  var tb = m[v + 1] % 8;
                  ia !== q && (tb = 7);
                  var vb = m[v + 18 - 1] % 8;
                  block[l[v + 18 - 1]].type !== q && (vb = 7);
                  var wb = m[v - 18 - 1] % 8;
                  block[l[v - 18 - 1]].type !== q && (wb = 7);
                  var xb = m[v + 18 + 1] % 8;
                  block[l[v + 18 + 1]].type !== q && (xb = 7);
                  var yb = m[v - 18 + 1] % 8;
                  block[l[v - 18 + 1]].type !== q && (yb = 7);
                  ca = 0 === sb || 0 === wb || 0 === rb ? 0.875 : ca -
                    (m[v] + sb + wb + rb) / 4 / 7;
                  fa = 0 === rb || 0 === yb || 0 === tb ? 0.875 : fa - (m[v] + rb + yb + tb) / 4 / 7;
                  da = 0 === tb || 0 === xb || 0 === qb ? 0.875 : da - (m[v] + tb + xb + qb) / 4 / 7;
                  ga = 0 === qb || 0 === vb || 0 === sb ? 0.875 : ga - (m[v] + qb + vb + sb) / 4 / 7;
                  if (2.625 === ca + fa + da || 2.625 === fa + da + ga || 2.625 === da + ga + ca || 2.625 === ga + ca + fa) ga = da = fa = ca = 0.875
                } else ga = da = fa = ca = 0.875;
                if (block[l[r - 1]].type === q || block[l[r - 18 - 1]].type === q || block[l[r - 18]].type === q) ca = 1;
                if (block[l[r - 18]].type === q || block[l[r - 18 + 1]].type === q || block[l[r + 1]].type === q) fa = 1;
                if (block[l[r + 1]].type === q || block[l[r +
                    18 + 1]].type === q || block[l[r + 18]].type === q) da = 1;
                if (block[l[r + 18]].type === q || block[l[r + 18 - 1]].type === q || block[l[r - 1]].type === q) ga = 1
              }
              Z && (0 === block.lightSource[A] ? (oa = Math.floor((y + d[w - 18] + d[w - 324 - 18] + d[w - 324]) / 4), Na = Math.floor((y + d[w - 324] + d[w - 324 + 18] + d[w + 18]) / 4), pa = Math.floor((y + d[w + 18] + d[w + 324 + 18] + d[w + 324]) / 4), Oa = Math.floor((y + d[w + 324] + d[w + 324 - 18] + d[w - 18]) / 4), la = Math.floor((S + e[w - 18] + e[w - 324 - 18] + e[w - 324]) / 4), Ka = Math.floor((S + e[w - 324] + e[w - 324 + 18] + e[w + 18]) / 4), ma = Math.floor((S + e[w + 18] + e[w + 324 + 18] + e[w + 324]) /
                  4), La = Math.floor((S + e[w + 324] + e[w + 324 - 18] + e[w - 18]) / 4)) : oa = Na = pa = Oa = la = Ka = ma = La = 15, g = 0, a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * oa + la, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1] * ga, a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * Na + Ka, a.d[a.o++] = n + 1, a.d[a.o++] =
                0.8, a.d[a.o++] = z, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1] * ga, a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * pa + ma, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * oa + la, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 20, a.d[a.o++] = 16 * this.xPos + E + h.front[g],
                a.d[a.o++] = 0 + G + h.front[g + 1] * ga, a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * pa + ma, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * Oa + La, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z);
              I && (0 === block.lightSource[A] ? (na = Math.floor((R + d[F - 18] + d[F - 324 - 18] + d[F - 324]) / 4), Ma = Math.floor((R +
                  d[F - 324] + d[F - 324 + 18] + d[F + 18]) / 4), qa = Math.floor((R + d[F + 18] + d[F + 324 + 18] + d[F + 324]) / 4), Pa = Math.floor((R + d[F + 324] + d[F + 324 - 18] + d[F - 18]) / 4), ra = Math.floor((Q + e[F - 18] + e[F - 324 - 18] + e[F - 324]) / 4), Qa = Math.floor((Q + e[F - 324] + e[F - 324 + 18] + e[F + 18]) / 4), sa = Math.floor((Q + e[F + 18] + e[F + 324 + 18] + e[F + 324]) / 4), Ra = Math.floor((Q + e[F + 324] + e[F + 324 - 18] + e[F - 18]) / 4)) : na = Ma = qa = Pa = ra = Qa = sa = Ra = 15, g = 0, a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] =
                h.back[g + 4], a.d[a.o++] = 100 * qa + sa, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * na + ra, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * Pa + Ra, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] =
                z, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * na + ra, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 20, a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * qa + sa, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g +
                  1] * da, a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * Ma + Qa, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z);
              X && (0 === block.lightSource[A] ? (ta = Math.floor((K + d[u - 1] + d[u - 324 - 1] + d[u - 324]) / 4), Sa = Math.floor((K + d[u - 324] + d[u - 324 + 1] + d[u + 1]) / 4), ua = Math.floor((K + d[u + 1] + d[u + 324 + 1] + d[u + 324]) / 4), Ta = Math.floor((K + d[u + 324] + d[u + 324 - 1] + d[u - 1]) / 4), va = Math.floor((M + e[u - 1] + e[u - 324 - 1] + e[u - 324]) / 4), Ua = Math.floor((M + e[u - 324] + e[u - 324 + 1] + e[u + 1]) / 4), wa = Math.floor((M + e[u + 1] + e[u +
                  324 + 1] + e[u + 324]) / 4), Va = Math.floor((M + e[u + 324] + e[u + 324 - 1] + e[u - 1]) / 4)) : ta = Sa = ua = Ta = va = Ua = wa = Va = 15, g = 0, a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * ua + wa, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * ta + va, a.d[a.o++] =
                n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * Ta + Va, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * ua + wa, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 20, a.d[a.o++] = 16 *
                this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * Sa + Ua, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * ta + va, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z);
              H && (0 === block.lightSource[A] ? (Wa = Math.floor((L + d[C - 1] + d[C - 324 - 1] + d[C -
                  324]) / 4), xa = Math.floor((L + d[C - 324] + d[C - 324 + 1] + d[C + 1]) / 4), Xa = Math.floor((L + d[C + 1] + d[C + 324 + 1] + d[C + 324]) / 4), ya = Math.floor((L + d[C + 324] + d[C + 324 - 1] + d[C - 1]) / 4), Ya = Math.floor((U + e[C - 1] + e[C - 324 - 1] + e[C - 324]) / 4), za = Math.floor((U + e[C - 324] + e[C - 324 + 1] + e[C + 1]) / 4), Za = Math.floor((U + e[C + 1] + e[C + 324 + 1] + e[C + 324]) / 4), Aa = Math.floor((U + e[C + 324] + e[C + 324 - 1] + e[C - 1]) / 4)) : Wa = xa = Xa = ya = Ya = za = Za = Aa = 15, g = 0, a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1] * ga, a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g +
                  3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * ya + Aa, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1] * ga, a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * Wa + Ya, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * xa + za, a.d[a.o++] = n + 4,
                a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * Xa + Za, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 20, a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1] * ga, a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * ya + Aa, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.left[g],
                a.d[a.o++] = 0 + G + h.left[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * xa + za, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z);
              V && (0 === block.lightSource[A] ? (Ba = Math.floor((T + d[s - 1] + d[s - 18 - 1] + d[s - 18]) / 4), $a = Math.floor((T + d[s - 18] + d[s - 18 + 1] + d[s + 1]) / 4), Ca = Math.floor((T + d[s + 1] + d[s + 18 + 1] + d[s + 18]) / 4), ab = Math.floor((T + d[s + 18] + d[s + 18 - 1] + d[s - 1]) / 4), Da = Math.floor((P + e[s - 1] + e[s - 18 - 1] + e[s - 18]) / 4), bb = Math.floor((P + e[s - 18] + e[s - 18 + 1] + e[s + 1]) / 4), Ea = Math.floor((P +
                  e[s + 1] + e[s + 18 + 1] + e[s + 18]) / 4), cb = Math.floor((P + e[s + 18] + e[s + 18 - 1] + e[s - 1]) / 4)) : Ba = $a = Ca = ab = Da = bb = Ea = cb = 15, g = 0, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * Ca + Ea, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = z, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 *
                Ba + Da, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = z, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * $a + bb, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = z, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * Ca + Ea, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = z, g = 20, a.d[a.o++] =
                16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * ab + cb, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = z, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * Ba + Da, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = z);
              J && (0 === block.lightSource[A] ? (Fa = Math.floor((Y + d[r - 1] + d[r - 18 - 1] + d[r -
                  18]) / 4), db = Math.floor((Y + d[r - 18] + d[r - 18 + 1] + d[r + 1]) / 4), Ga = Math.floor((Y + d[r + 1] + d[r + 18 + 1] + d[r + 18]) / 4), eb = Math.floor((Y + d[r + 18] + d[r + 18 - 1] + d[r - 1]) / 4), Ha = Math.floor((N + e[r - 1] + e[r - 18 - 1] + e[r - 18]) / 4), fb = Math.floor((N + e[r - 18] + e[r - 18 + 1] + e[r + 1]) / 4), Ia = Math.floor((N + e[r + 1] + e[r + 18 + 1] + e[r + 18]) / 4), gb = Math.floor((N + e[r + 18] + e[r + 18 - 1] + e[r - 1]) / 4)) : Fa = db = Ga = eb = Ha = fb = Ia = gb = 15, g = 0, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g +
                  4], a.d[a.o++] = 100 * Ga + Ia, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = W, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * db + fb, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = aa, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Fa + Ha, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = $, g = 15, a.d[a.o++] =
                16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Ga + Ia, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = W, g = 20, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Fa + Ha, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = $, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1] * ga, a.d[a.o++] = 16 * this.zPos +
                D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * eb + gb, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = k)
            } else if (10 === t.shapeType && (p = t.drawLevel, a = B[p], h = t.shape, z = 0, 0 < t.useBiomeColor && (z = this.getBiomeColor(E, D, t.useBiomeColor - 1)), Z || I || X || H || V || J)) {
              if (8 === (m[v] & 8))
                for (a = 8 < y && 0 === p ? B[p + 1] : B[p], g = 0; g < h.front.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 *
                  y + S, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z;
              if (2 === (m[v] & 2))
                for (a = 8 < R && 0 === p ? B[p + 1] : B[p], g = 0; g < h.back.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * R + Q, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z;
              if (1 === (m[v] & 1))
                for (a = 8 < K && 0 === p ? B[p + 1] : B[p], g = 0; g < h.right.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2],
                  a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * K + M, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z;
              if (4 === (m[v] & 4))
                for (a = 8 < L && 0 === p ? B[p + 1] : B[p], g = 0; g < h.left.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * L + U, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z;
              if (1 === nb || 0 === m[v])
                for (a = B[p], g = 0; g < h.bottom.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G +
                  h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * T + P, a.d[a.o++] = n + 5, a.d[a.o++] = 0.3, a.d[a.o++] = z
            }
          }
  void 0 !== this.vbo && (0 === b && void 0 !== this.vbo[0] && (this.vbo[0].forEach(function(a) {
    gluu.gl.deleteBuffer(a)
  }), this.ivbo[0].forEach(function(a) {
    gpuMem -= a
  })), 1 === b && void 0 !== this.vbo[1] && (this.vbo[1].forEach(function(a) {
    gluu.gl.deleteBuffer(a)
  }), this.ivbo[1].forEach(function(a) {
    gpuMem -= a
  })));
  if (0 === b) {
    this.ivbo[0] = [];
    this.vbo[0] = [];
    var ba;
    for (ba = 0; 4 > ba; ba++)
      if (0 < B[ba].o) {
        var Ja = new Float32Array(B[ba].d.buffer, 0, B[ba].o);
        this.ivbo[0][ba] = Ja.length;
        this.vbo[0][ba] = gluu.gl.createBuffer();
        gpuMem += Ja.length;
        gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, this.vbo[0][ba]);
        gluu.gl.bufferData(gluu.gl.ARRAY_BUFFER, Ja, gluu.gl.STATIC_DRAW);
        Ja = null
      }
    this.isInit = 1
  }
  if (1 === b) {
    this.ivbo[1] = [];
    this.vbo[1] = [];
    for (ba = 0; 4 > ba; ba++) 0 < B[ba].o && (Ja = new Float32Array(B[ba].d.buffer, 0, B[ba].o), this.ivbo[1][ba] = Ja.length, this.vbo[1][ba] = gluu.gl.createBuffer(), gpuMem += Ja.length, gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, this.vbo[1][ba]),
      gluu.gl.bufferData(gluu.gl.ARRAY_BUFFER, Ja, gluu.gl.STATIC_DRAW), Ja = null);
    this.isInit1 = 1
  }
  return !0
};
Chunk.prototype.getBuffer = function(b) {
  var f = 0,
    c = 0,
    d = 0,
    e = 0,
    m = !1,
    l = !1,
    p = !1,
    q = !1,
    x = c = punkty1[0].o = 0,
    A = 0,
    t = 0,
    a, B = mcWorld.requestChunk(this.xPos + 1, this.zPos);
  void 0 === B && (q = !0); - 1 === B && (q = !0);
  if (-2 === B) return !1;
  var v = mcWorld.requestChunk(this.xPos - 1, this.zPos);
  void 0 === v && (p = !0); - 1 === v && (p = !0);
  if (-2 === v) return !1;
  var C = mcWorld.requestChunk(this.xPos, this.zPos + 1);
  void 0 === C && (m = !0); - 1 === C && (m = !0);
  if (-2 === C) return !1;
  var u = mcWorld.requestChunk(this.xPos, this.zPos - 1);
  void 0 === u && (l = !0); - 1 === u && (l = !0);
  if (-2 ===
    u) return !1;
  this.cacheBiomes = new Float32Array(324);
  var w = f = Math.floor(b[1] / 16);
  2 > b[1] - 16 * f && w--;
  0 > w && (w = 0);
  var F = f;
  13 < b[1] - 16 * f && F++;
  for (16 < F && (F = 16); w <= F; w++)
    if (void 0 !== this.section[w]) {
      var r = this.section[w],
        s = this.section[w - 1],
        n = !1;
      void 0 === s && (n = !0);
      var L = this.section[w + 1],
        K = !1;
      void 0 === L && (K = !0);
      var Y = !0,
        T = !0,
        y = !0;
      a = !0;
      if (!p) {
        var R = v.section[w];
        void 0 !== R && (Y = !1)
      }
      if (!q) {
        var U = B.section[w];
        void 0 !== U && (T = !1)
      }
      if (!l) {
        var M = u.section[w];
        void 0 !== M && (y = !1)
      }
      if (!m) {
        var N = C.section[w];
        void 0 !== N && (a = !1)
      }
      var P = b[0] - 3;
      0 > P && (P = 0);
      var S = b[0] + 4;
      16 < S && (S = 16);
      var Q = b[2] - 3;
      0 > Q && (Q = 0);
      var V = b[2] + 4;
      16 < V && (V = 16);
      var J = b[1] - 16 * w - 3;
      0 > J && (J = 0);
      var Z = b[1] - 16 * w + 3;
      16 < Z && (Z = 16);
      var I, H;
      for (I = J; I < Z; I++)
        for (f = Q; f < V; f++) {
          for (H = P; H < S; H++) d = 256 * I + 16 * f + H, e = 324 * (I + 1) + 18 * (f + 1) + (H + 1), Chunk.cacheBlock[e] = block[r.blocks[d]].type, c = d % 2, Chunk.cacheData[e] = 0 === c ? r.data[d / 2] & 15 & block[r.blocks[d]].mask : r.data[d / 2 - 0.5] >> 4 & 15 & block[r.blocks[d]].mask;
          this.cacheBiomes[18 * (I + 1) + f + 1] = this.biomes[16 * I + f]
        }
      if (n)
        for (f = 0; 16 > f; f++)
          for (H =
            0; 16 > H; H++) e = 0 + 18 * (f + 1) + (H + 1), Chunk.cacheBlock[e] = 0 === w ? 1 : 0;
      else
        for (f = 0; 16 > f; f++)
          for (H = 0; 16 > H; H++) d = 3840 + 16 * f + H, e = 0 + 18 * (f + 1) + (H + 1), Chunk.cacheBlock[e] = block[s.blocks[d]].type;
      if (K)
        for (f = 0; 16 > f; f++)
          for (H = 0; 16 > H; H++) e = 5508 + 18 * (f + 1) + (H + 1), Chunk.cacheBlock[e] = 15 === w ? 1 : 0;
      else
        for (f = 0; 16 > f; f++)
          for (H = 0; 16 > H; H++) d = 0 + 16 * f + H, e = 5508 + 18 * (f + 1) + (H + 1), Chunk.cacheBlock[e] = block[L.blocks[d]].type;
      if (a)
        for (I = 0; 16 > I; I++)
          for (H = 0; 16 > H; H++) e = 324 * (I + 1) + 306 + (H + 1), Chunk.cacheBlock[e] = m ? 1 : 0;
      else
        for (I = 0; 16 > I; I++)
          for (H = 0; 16 >
            H; H++) d = 256 * I + 0 + H, e = 324 * (I + 1) + 306 + (H + 1), Chunk.cacheBlock[e] = block[N.blocks[d]].type;
      if (y)
        for (I = 0; 16 > I; I++)
          for (H = 0; 16 > H; H++) e = 324 * (I + 1) + 0 + (H + 1), Chunk.cacheBlock[e] = l ? 1 : 0;
      else
        for (I = 0; 16 > I; I++)
          for (H = 0; 16 > H; H++) d = 256 * I + 240 + H, e = 324 * (I + 1) + 0 + (H + 1), Chunk.cacheBlock[e] = block[M.blocks[d]].type;
      if (Y)
        for (I = 0; 16 > I; I++)
          for (f = 0; 16 > f; f++) e = 324 * (I + 1) + 18 * (f + 1) + 0, Chunk.cacheBlock[e] = p ? 1 : 0;
      else
        for (I = 0; 16 > I; I++)
          for (f = 0; 16 > f; f++) d = 256 * I + 16 * f + 15, e = 324 * (I + 1) + 18 * (f + 1) + 0, Chunk.cacheBlock[e] = block[R.blocks[d]].type;
      if (T)
        for (I =
          0; 16 > I; I++)
          for (f = 0; 16 > f; f++) e = 324 * (I + 1) + 18 * (f + 1) + 17, Chunk.cacheBlock[e] = q ? 1 : 0;
      else
        for (I = 0; 16 > I; I++)
          for (f = 0; 16 > f; f++) d = 256 * I + 16 * f + 0, e = 324 * (I + 1) + 18 * (f + 1) + 17, Chunk.cacheBlock[e] = block[U.blocks[d]].type;
      var X = y = 0,
        z = 0,
        $ = 0,
        aa = 0,
        W = 0;
      a = 0;
      var e, T, k, I;
      for (e = 16 * w, T = Y = K = L = n = s = !1, k = d = 0, I = J; I < Z; I++)
        for (f = Q; f < V; f++)
          for (H = P; H < S; H++)
            if (T = Y = K = L = n = s = !1, y = 324 * (I + 1) + 18 * (f + 1) + (H + 1), c = Chunk.cacheBlock[y], 0 !== c) {
              X = y + 18;
              z = y - 18;
              $ = y - 1;
              aa = y + 1;
              W = y + 324;
              a = y - 324;
              d = 256 * I + 16 * f + H;
              J = this.xPos % 5;
              0 > J && (J += 5);
              A = this.zPos % 5;
              0 > A && (A += 5);
              J = 65536 *
                (e + I) + 256 * (16 * f + H) + 10 * (5 * J + A);
              if (1 === c || 2 === c || 4 === c || 6 === c) 1 !== Chunk.cacheBlock[W] && (n = !0), 1 !== Chunk.cacheBlock[a] && (s = !0), 1 !== Chunk.cacheBlock[z] && (T = !0), 1 !== Chunk.cacheBlock[X] && (Y = !0), 1 !== Chunk.cacheBlock[$] && (L = !0), 1 !== Chunk.cacheBlock[aa] && (K = !0);
              else if (3 < c) 1 !== Chunk.cacheBlock[W] && Chunk.cacheBlock[W] !== c && (n = !0), 1 !== Chunk.cacheBlock[a] && Chunk.cacheBlock[a] !== c && (s = !0), 1 !== Chunk.cacheBlock[z] && Chunk.cacheBlock[z] !== c && (T = !0), 1 !== Chunk.cacheBlock[X] && Chunk.cacheBlock[X] !== c && (Y = !0), 1 !== Chunk.cacheBlock[$] &&
                Chunk.cacheBlock[$] !== c && (L = !0), 1 !== Chunk.cacheBlock[aa] && Chunk.cacheBlock[aa] !== c && (K = !0);
              else continue;
              if (L || K || T || Y || s || n)
                if (a = punkty1[0], A = r.blocks[d], c = d % 2, 0 === c ? (x = r.data[d / 2] & 15 & block[r.blocks[d]].mask, k = r.add[d / 2] & 15) : (x = r.data[d / 2 - 0.5] >> 4 & 15 & block[r.blocks[d]].mask, k = r.add[d / 2 - 0.5] >> 4 & 15), t = void 0 === block[A][x] ? block[A][0] : block[A][x], void 0 !== t.shapeType)
                  if (1 === t.shapeType) {
                    y = c = t.shape;
                    d = 0;
                    1 === t.useBiomeColor && (d = this.getBiomeColor(H, f, 0));
                    0 < k && (y = block[200][k - 1].shape);
                    if (L)
                      for (k = 0; k < y.front.length; k +=
                        5) a.d[a.o++] = 16 * this.xPos + H + y.front[k], a.d[a.o++] = e + I + y.front[k + 1], a.d[a.o++] = 16 * this.zPos + f + y.front[k + 2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                    if (K)
                      for (k = 0; k < y.back.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + y.back[k], a.d[a.o++] = e + I + y.back[k + 1], a.d[a.o++] = 16 * this.zPos + f + y.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                    if (T)
                      for (k = 0; k < y.right.length; k += 5) a.d[a.o++] = 16 * this.xPos +
                        H + y.right[k], a.d[a.o++] = e + I + y.right[k + 1], a.d[a.o++] = 16 * this.zPos + f + y.right[k + 2], a.d[a.o++] = c.right[k + 3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                    if (Y)
                      for (k = 0; k < y.left.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + y.left[k], a.d[a.o++] = e + I + y.left[k + 1], a.d[a.o++] = 16 * this.zPos + f + y.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                    if (s)
                      for (k = 0; k < y.bottom.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + y.bottom[k], a.d[a.o++] =
                        e + I + y.bottom[k + 1], a.d[a.o++] = 16 * this.zPos + f + y.bottom[k + 2], a.d[a.o++] = c.bottom[k + 3], a.d[a.o++] = c.bottom[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 5, a.d[a.o++] = 0.3, a.d[a.o++] = d;
                    if (n)
                      for (k = 0; k < y.top.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + y.top[k], a.d[a.o++] = e + I + y.top[k + 1], a.d[a.o++] = 16 * this.zPos + f + y.top[k + 2], a.d[a.o++] = c.top[k + 3], a.d[a.o++] = c.top[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 6, a.d[a.o++] = 1, a.d[a.o++] = d
                  } else if (2 !== t.shapeType && 3 !== t.shapeType)
                if (4 === t.shapeType) {
                  c = t.shape;
                  d = this.getBiomeColor(H, f, 0);
                  if (L) {
                    for (k =
                      0; k < c.front2.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.front2[k], a.d[a.o++] = e + I + c.front2[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.front2[k + 2], a.d[a.o++] = c.front2[k + 3], a.d[a.o++] = c.front2[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                    for (k = 0; k < c.front.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.front[k], a.d[a.o++] = e + I + c.front[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.front[k + 2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = 0
                  }
                  if (K) {
                    for (k = 0; k < c.back2.length; k +=
                      5) a.d[a.o++] = 16 * this.xPos + H + c.back2[k], a.d[a.o++] = e + I + c.back2[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.back2[k + 2], a.d[a.o++] = c.back2[k + 3], a.d[a.o++] = c.back2[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                    for (k = 0; k < c.back.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.back[k], a.d[a.o++] = e + I + c.back[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = 0
                  }
                  if (T) {
                    for (k = 0; k < c.right2.length; k += 5) a.d[a.o++] = 16 * this.xPos +
                      H + c.right2[k], a.d[a.o++] = e + I + c.right2[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.right2[k + 2], a.d[a.o++] = c.right2[k + 3], a.d[a.o++] = c.right2[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                    for (k = 0; k < c.right.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.right[k], a.d[a.o++] = e + I + c.right[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.right[k + 2], a.d[a.o++] = c.right[k + 3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = 0
                  }
                  if (Y) {
                    for (k = 0; k < c.left2.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.left2[k],
                      a.d[a.o++] = e + I + c.left2[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.left2[k + 2], a.d[a.o++] = c.left2[k + 3], a.d[a.o++] = c.left2[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                    for (k = 0; k < c.left.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.left[k], a.d[a.o++] = e + I + c.left[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = 0
                  }
                  if (s)
                    for (k = 0; k < c.bottom.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.bottom[k], a.d[a.o++] = e + I + c.bottom[k +
                      1], a.d[a.o++] = 16 * this.zPos + f + c.bottom[k + 2], a.d[a.o++] = c.bottom[k + 3], a.d[a.o++] = c.bottom[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 5, a.d[a.o++] = 0.3, a.d[a.o++] = 0;
                  if (n)
                    for (k = 0; k < c.top.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.top[k], a.d[a.o++] = e + I + c.top[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.top[k + 2], a.d[a.o++] = c.top[k + 3], a.d[a.o++] = c.top[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 6, a.d[a.o++] = 1, a.d[a.o++] = d
                } else if (8 === t.shapeType) {
                c = t.shape;
                d = 0;
                1 === t.useBiomeColor && (d = this.getBiomeColor(H, f, 0));
                W = "";
                W += Chunk.cacheData[y];
                W = Chunk.cacheBlock[y] ===
                  Chunk.cacheBlock[X] ? W + Chunk.cacheData[X] : W + "x";
                W = Chunk.cacheBlock[y] === Chunk.cacheBlock[z] ? W + Chunk.cacheData[z] : W + "x";
                W = Chunk.cacheBlock[y] === Chunk.cacheBlock[$] ? W + Chunk.cacheData[$] : W + "x";
                W = Chunk.cacheBlock[y] === Chunk.cacheBlock[aa] ? W + Chunk.cacheData[aa] : W + "x";
                z = 0;
                X = Chunk.stairsData[W];
                void 0 !== X && (c = 3 < Chunk.cacheData[y] ? block[A][9].shape : block[A][8].shape, z = 1);
                if (L)
                  for (k = 0; k < c.front.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.front[k], a.d[a.o++] = e + I + c.front[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.front[k +
                    2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                if (K)
                  for (k = 0; k < c.back.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.back[k], a.d[a.o++] = e + I + c.back[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                if (T)
                  for (k = 0; k < c.right.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.right[k], a.d[a.o++] = e + I + c.right[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.right[k + 2], a.d[a.o++] = c.right[k +
                    3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                if (Y)
                  for (k = 0; k < c.left.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.left[k], a.d[a.o++] = e + I + c.left[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                if (s)
                  for (k = 0; k < c.bottom.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.bottom[k], a.d[a.o++] = e + I + c.bottom[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.bottom[k + 2], a.d[a.o++] = c.bottom[k + 3], a.d[a.o++] =
                    c.bottom[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 5, a.d[a.o++] = 0.3, a.d[a.o++] = d;
                if (n)
                  for (k = 0; k < c.top.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.top[k], a.d[a.o++] = e + I + c.top[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.top[k + 2], a.d[a.o++] = c.top[k + 3], a.d[a.o++] = c.top[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 6, a.d[a.o++] = 1, a.d[a.o++] = d;
                if (1 === z)
                  for (c = block[A][10].shape, $ = z = 0, 3 < Chunk.cacheData[y] && ($ = -0.5), aa = y = 0; 4 > aa; aa++)
                    if (0 !== X.charCodeAt(aa) - 48) {
                      z = aa % 2 / 2;
                      y = 1 < aa ? 0.5 : 0;
                      if (L)
                        for (k = 0; k < c.front.length; k += 5) a.d[a.o++] = z + 16 * this.xPos + H + c.front[k],
                          a.d[a.o++] = $ + e + I + c.front[k + 1], a.d[a.o++] = y + 16 * this.zPos + f + c.front[k + 2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                      if (K)
                        for (k = 0; k < c.back.length; k += 5) a.d[a.o++] = z + 16 * this.xPos + H + c.back[k], a.d[a.o++] = $ + e + I + c.back[k + 1], a.d[a.o++] = y + 16 * this.zPos + f + c.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                      if (T)
                        for (k = 0; k < c.right.length; k += 5) a.d[a.o++] = z + 16 * this.xPos + H + c.right[k], a.d[a.o++] =
                          $ + e + I + c.right[k + 1], a.d[a.o++] = y + 16 * this.zPos + f + c.right[k + 2], a.d[a.o++] = c.right[k + 3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                      if (Y)
                        for (k = 0; k < c.left.length; k += 5) a.d[a.o++] = z + 16 * this.xPos + H + c.left[k], a.d[a.o++] = $ + e + I + c.left[k + 1], a.d[a.o++] = y + 16 * this.zPos + f + c.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                      if (s)
                        for (k = 0; k < c.bottom.length; k += 5) a.d[a.o++] = z + 16 * this.xPos + H + c.bottom[k], a.d[a.o++] = $ + e + I +
                          c.bottom[k + 1], a.d[a.o++] = y + 16 * this.zPos + f + c.bottom[k + 2], a.d[a.o++] = c.bottom[k + 3], a.d[a.o++] = c.bottom[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 5, a.d[a.o++] = 0.3, a.d[a.o++] = d;
                      if (n)
                        for (k = 0; k < c.top.length; k += 5) a.d[a.o++] = z + 16 * this.xPos + H + c.top[k], a.d[a.o++] = $ + e + I + c.top[k + 1], a.d[a.o++] = y + 16 * this.zPos + f + c.top[k + 2], a.d[a.o++] = c.top[k + 3], a.d[a.o++] = c.top[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 6, a.d[a.o++] = 1, a.d[a.o++] = d
                    }
              } else if (5 === t.shapeType) {
                if (L || K || T || Y || n || s) {
                  c = t.shape;
                  d = 0;
                  1 === t.useBiomeColor && (d = this.getBiomeColor(H,
                    f, 0));
                  for (k = 0; k < c.front.length; k += 5) {
                    if (0 === k % 30) {
                      if ((60 === k || 120 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[X] && 1 !== Chunk.cacheBlock[X]) {
                        k += 25;
                        continue
                      }
                      if ((30 === k || 90 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[z] && 1 !== Chunk.cacheBlock[z]) {
                        k += 25;
                        continue
                      }
                    }
                    a.d[a.o++] = 16 * this.xPos + H + c.front[k];
                    a.d[a.o++] = e + I + c.front[k + 1];
                    a.d[a.o++] = 16 * this.zPos + f + c.front[k + 2];
                    a.d[a.o++] = c.front[k + 3];
                    a.d[a.o++] = c.front[k + 4];
                    a.d[a.o++] = 0;
                    a.d[a.o++] = J + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = d
                  }
                  for (k = 0; k < c.back.length; k += 5) {
                    if (0 ===
                      k % 30) {
                      if ((60 === k || 120 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[X] && 1 !== Chunk.cacheBlock[X]) {
                        k += 25;
                        continue
                      }
                      if ((30 === k || 90 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[z] && 1 !== Chunk.cacheBlock[z]) {
                        k += 25;
                        continue
                      }
                    }
                    a.d[a.o++] = 16 * this.xPos + H + c.back[k];
                    a.d[a.o++] = e + I + c.back[k + 1];
                    a.d[a.o++] = 16 * this.zPos + f + c.back[k + 2];
                    a.d[a.o++] = c.back[k + 3];
                    a.d[a.o++] = c.back[k + 4];
                    a.d[a.o++] = 0;
                    a.d[a.o++] = J + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = d
                  }
                  for (k = 0; k < c.right.length; k += 5) {
                    if (0 === k % 30) {
                      if ((30 === k || 90 === k) && Chunk.cacheBlock[y] !==
                        Chunk.cacheBlock[$] && 1 !== Chunk.cacheBlock[$]) {
                        k += 25;
                        continue
                      }
                      if ((60 === k || 120 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[aa] && 1 !== Chunk.cacheBlock[aa]) {
                        k += 25;
                        continue
                      }
                    }
                    a.d[a.o++] = 16 * this.xPos + H + c.right[k];
                    a.d[a.o++] = e + I + c.right[k + 1];
                    a.d[a.o++] = 16 * this.zPos + f + c.right[k + 2];
                    a.d[a.o++] = c.right[k + 3];
                    a.d[a.o++] = c.right[k + 4];
                    a.d[a.o++] = 0;
                    a.d[a.o++] = J + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = d
                  }
                  for (k = 0; k < c.left.length; k += 5) {
                    if (0 === k % 30) {
                      if ((30 === k || 90 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[$] && 1 !== Chunk.cacheBlock[$]) {
                        k +=
                          25;
                        continue
                      }
                      if ((60 === k || 120 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[aa] && 1 !== Chunk.cacheBlock[aa]) {
                        k += 25;
                        continue
                      }
                    }
                    a.d[a.o++] = 16 * this.xPos + H + c.left[k];
                    a.d[a.o++] = e + I + c.left[k + 1];
                    a.d[a.o++] = 16 * this.zPos + f + c.left[k + 2];
                    a.d[a.o++] = c.left[k + 3];
                    a.d[a.o++] = c.left[k + 4];
                    a.d[a.o++] = 0;
                    a.d[a.o++] = J + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = d
                  }
                  for (k = 0; k < c.bottom.length; k += 5) {
                    if (0 === k % 30) {
                      if ((30 === k || 150 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[z] && 1 !== Chunk.cacheBlock[z]) {
                        k += 25;
                        continue
                      }
                      if ((60 === k || 180 === k) && Chunk.cacheBlock[y] !==
                        Chunk.cacheBlock[X] && 1 !== Chunk.cacheBlock[X]) {
                        k += 25;
                        continue
                      }
                      if ((90 === k || 210 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[$] && 1 !== Chunk.cacheBlock[$]) {
                        k += 25;
                        continue
                      }
                      if ((120 === k || 240 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[aa] && 1 !== Chunk.cacheBlock[aa]) {
                        k += 25;
                        continue
                      }
                    }
                    a.d[a.o++] = 16 * this.xPos + H + c.bottom[k];
                    a.d[a.o++] = e + I + c.bottom[k + 1];
                    a.d[a.o++] = 16 * this.zPos + f + c.bottom[k + 2];
                    a.d[a.o++] = c.bottom[k + 3];
                    a.d[a.o++] = c.bottom[k + 4];
                    a.d[a.o++] = 0;
                    a.d[a.o++] = J + 5;
                    a.d[a.o++] = 0.3;
                    a.d[a.o++] = d
                  }
                  for (k = 0; k < c.top.length; k +=
                    5) {
                    if (0 === k % 30) {
                      if ((30 === k || 150 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[z] && 1 !== Chunk.cacheBlock[z]) {
                        k += 25;
                        continue
                      }
                      if ((60 === k || 180 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[X] && 1 !== Chunk.cacheBlock[X]) {
                        k += 25;
                        continue
                      }
                      if ((90 === k || 210 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[$] && 1 !== Chunk.cacheBlock[$]) {
                        k += 25;
                        continue
                      }
                      if ((120 === k || 240 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[aa] && 1 !== Chunk.cacheBlock[aa]) {
                        k += 25;
                        continue
                      }
                    }
                    a.d[a.o++] = 16 * this.xPos + H + c.top[k];
                    a.d[a.o++] = e + I + c.top[k + 1];
                    a.d[a.o++] = 16 * this.zPos + f + c.top[k + 2];
                    a.d[a.o++] = c.top[k + 3];
                    a.d[a.o++] = c.top[k + 4];
                    a.d[a.o++] = 0;
                    a.d[a.o++] = J + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = d
                  }
                }
              } else if (6 === t.shapeType) {
                if (c = t.shape, d = 0, 1 === t.useBiomeColor && (d = this.getBiomeColor(H, f, 0)), L || K || T || Y || s || n) {
                  if (5 === x)
                    for (k = 0; k < c.front.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.front[k], a.d[a.o++] = e + I + c.front[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.front[k + 2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                  if (4 ===
                    x)
                    for (k = 0; k < c.back.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.back[k], a.d[a.o++] = e + I + c.back[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                  if (3 === x)
                    for (k = 0; k < c.right.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.right[k], a.d[a.o++] = e + I + c.right[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.right[k + 2], a.d[a.o++] = c.right[k + 3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                  if (2 === x)
                    for (k = 0; k <
                      c.left.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.left[k], a.d[a.o++] = e + I + c.left[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d
                }
              } else if (9 === t.shapeType) {
                c = t.shape;
                d = 0;
                1 === t.useBiomeColor && (d = this.getBiomeColor(H, f, 2));
                if (L)
                  for (k = 0; k < c.front.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.front[k], a.d[a.o++] = e + I + c.front[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.front[k + 2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4],
                    a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                if (K)
                  for (k = 0; k < c.back.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.back[k], a.d[a.o++] = e + I + c.back[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                if (T)
                  for (k = 0; k < c.right.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.right[k], a.d[a.o++] = e + I + c.right[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.right[k + 2], a.d[a.o++] = c.right[k + 3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] =
                    J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                if (Y)
                  for (k = 0; k < c.left.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.left[k], a.d[a.o++] = e + I + c.left[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                if (s)
                  for (k = 0; k < c.bottom.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.bottom[k], a.d[a.o++] = e + I + c.bottom[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.bottom[k + 2], a.d[a.o++] = c.bottom[k + 3], a.d[a.o++] = c.bottom[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 5, a.d[a.o++] =
                    0.3, a.d[a.o++] = d;
                if (n)
                  for (k = 0; k < c.top.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.top[k], a.d[a.o++] = e + I + c.top[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.top[k + 2], a.d[a.o++] = c.top[k + 3], a.d[a.o++] = c.top[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 6, a.d[a.o++] = 1, a.d[a.o++] = d
              } else if (10 === t.shapeType && (c = t.shape, d = 0, 1 === t.useBiomeColor && (d = this.getBiomeColor(H, f, 0)), L || K || T || Y || s || n)) {
                if (8 === (Chunk.cacheData[y] & 8))
                  for (k = 0; k < c.front.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.front[k], a.d[a.o++] = e + I + c.front[k + 1], a.d[a.o++] = 16 * this.zPos +
                    f + c.front[k + 2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                if (2 === (Chunk.cacheData[y] & 2))
                  for (k = 0; k < c.back.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.back[k], a.d[a.o++] = e + I + c.back[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                if (1 === (Chunk.cacheData[y] & 1))
                  for (k = 0; k < c.right.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.right[k], a.d[a.o++] = e + I + c.right[k +
                    1], a.d[a.o++] = 16 * this.zPos + f + c.right[k + 2], a.d[a.o++] = c.right[k + 3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                if (4 === (Chunk.cacheData[y] & 4))
                  for (k = 0; k < c.left.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.left[k], a.d[a.o++] = e + I + c.left[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                if (1 === Chunk.cacheBlock[W] || 0 === Chunk.cacheData[y])
                  for (k = 0; k < c.bottom.length; k += 5) a.d[a.o++] =
                    16 * this.xPos + H + c.bottom[k], a.d[a.o++] = e + I + c.bottom[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.bottom[k + 2], a.d[a.o++] = c.bottom[k + 3], a.d[a.o++] = c.bottom[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 5, a.d[a.o++] = 0.3, a.d[a.o++] = d
              }
            }
    }
  return 0 < punkty1[0].o ? new Float32Array(punkty1[0].d.buffer, 0, punkty1[0].o) : !1
};

function Pointer() {}
Pointer.prototype.render = function() {
  var b = window.gluu.lineShader;
  gluu.gl.useProgram(b);
  mat4.identity(window.gluu.mvMatrix);
  mat4.identity(window.gluu.pMatrix);
  gluu.gl.uniformMatrix4fv(b.pMatrixUniform, !1, window.gluu.pMatrix);
  gluu.gl.uniformMatrix4fv(b.mvMatrixUniform, !1, window.gluu.mvMatrix);
  void 0 === this.vbol ? (this.vbol = gluu.gl.createBuffer(), b = new Float32Array([-0.03, 0, 0, 0, 0, 0.03, 0, 0, 0, 0, 0, -0.05, 0, 0, 0, 0, 0.05, 0, 0, 0]), this.vbol = gluu.gl.createBuffer(), gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, this.vbol), gluu.gl.bufferData(gluu.gl.ARRAY_BUFFER, b, gluu.gl.STATIC_DRAW)) : (gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER,
    this.vbol), gluu.gl.vertexAttribPointer(b.vertexPositionAttribute, 3, gluu.gl.FLOAT, !1, 20, 0), gluu.gl.vertexAttribPointer(b.lightAttribute, 4, gluu.gl.FLOAT, !1, 20, 0), gluu.gl.vertexAttribPointer(b.textureCoordAttribute, 2, gluu.gl.FLOAT, !1, 20, 12), gluu.gl.drawArrays(gluu.gl.LINES, 0, 4))
};

function SelectionBox() {}
SelectionBox.prototype.render = function(b) {
  var f = window.gluu.lineShader;
  gluu.gl.useProgram(f);
  mat4.perspective(window.gluu.pMatrix, camera.fovy, gluu.gl.viewportWidth / gluu.gl.viewportHeight, 0.1, 6e3);
  var c = camera.getMatrix();
  mat4.multiply(window.gluu.pMatrix, window.gluu.pMatrix, c);
  mat4.identity(window.gluu.mvMatrix);
  mat4.translate(window.gluu.mvMatrix, window.gluu.mvMatrix, [16 * b.chx + b.x, b.y, 16 * b.chz + b.z]);
  gluu.gl.uniformMatrix4fv(f.pMatrixUniform, !1, window.gluu.pMatrix);
  gluu.gl.uniformMatrix4fv(f.mvMatrixUniform, !1, window.gluu.mvMatrix);
  void 0 === this.vboBox ? (b = new Float32Array([0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0
  ]), this.vboBox = gluu.gl.createBuffer(), gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, this.vboBox), gluu.gl.bufferData(gluu.gl.ARRAY_BUFFER, b, gluu.gl.STATIC_DRAW)) : (gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, this.vboBox), gluu.gl.vertexAttribPointer(f.vertexPositionAttribute, 3, gluu.gl.FLOAT, !1, 20, 0), gluu.gl.vertexAttribPointer(f.lightAttribute,
    4, gluu.gl.FLOAT, !1, 20, 0), gluu.gl.vertexAttribPointer(f.textureCoordAttribute, 2, gluu.gl.FLOAT, !1, 20, 12), gluu.gl.drawArrays(gluu.gl.LINES, 0, 24))
};

var h_u_d = {};
h_u_d.gameStateHtml = null;

var chronometer = {};
chronometer.sec = 0;
chronometer.newSec = !1;
chronometer.iLag = 0;
chronometer.lastTime = 0;
chronometer.firstTime = 0;
chronometer.fps = 0;

var codeEditor = null,
  biomes, mcWorld, block, blockTexture, blockSelection, camera, initTexture = !1,
  gpuMem = 0,
  click = 0,
  useBlock = {},
  punkty1 = [],
  pointer = new Pointer,
  selectBox = new SelectionBox;

console.log(window.settings);

function useNextBlock(b) {
  b.id === block.length - 1 && (b.id = 0);
  for (; 0 === block[++b.id].type;) b.id === block.length - 1 && (b.id = 0);
  b.data = -1;
  useNextBlockData(b)
}

function usePrevBlock(b) {
  1 === b.id && (b.id = block.length);
  for (; 0 === block[--b.id].type;) 0 === b.id && (b.id = block.length);
  b.data = -1;
  useNextBlockData(b)
}

function useNextBlockData(b) {
  var f;
  for (f = 0; 16 > f; f++) {
    if (void 0 !== block[b.id][++b.data] && void 0 !== block[b.id][b.data].shapeType && !block[b.id][b.data].hidden) return;
    16 === b.data && (b.data = -1)
  }
  b.data = 0
}

function windowResize() {
  var b = document.getElementById("webgl");
  b.width = window.innerWidth;
  b.height = window.innerHeight;
  gluu.gl.viewportWidth = b.width;
  gluu.gl.viewportHeight = b.height
}

function canvasOn() {
  document.getElementById("tools").style.display = "none";
  document.getElementById("settings").style.display = "none";
  var b = document.getElementById("webgl");
  b.onclick = function() {};
  b.requestPointerLock = b.requestPointerLock || b.mozRequestPointerLock || b.webkitRequestPointerLock;
  b.requestPointerLock()
}

function executeJS() {
  eval(codeEditor.getValue())
};
