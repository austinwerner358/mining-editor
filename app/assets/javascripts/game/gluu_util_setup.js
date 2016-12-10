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
