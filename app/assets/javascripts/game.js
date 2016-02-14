var threadsCode = [];
threadsCode.loadRegionThread = "self.addEventListener('message', (function(e) {\
  var regionData, x, xhr, y;\
  x = e.data.x;\
  y = e.data.y;\
  if (!e.data.local) {\
    xhr = new XMLHttpRequest;\
    xhr.open('GET', e.data.name, false);\
    xhr.responseType = 'arraybuffer';\
    try {\
      xhr.send();\
    } catch (_error) {\
      e = _error;\
      self.postMessage({\
        loaded: 0,\
        x: x,\
        y: y\
      });\
      self.close();\
      return;\
    }\
    regionData = new Uint8Array(xhr.response);\
  } else {\
    regionData = new Uint8Array(e.data.region);\
  }\
  self.postMessage({\
    loaded: 1,\
    x: x,\
    y: y,\
    data: regionData.buffer\
  }, [regionData.buffer]);\
  self.close();\
}), false);";

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
  localFiles = {},
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
