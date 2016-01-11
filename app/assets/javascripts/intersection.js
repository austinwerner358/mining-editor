

vector = function(b, f, c) {
    b[0] = f[0] - c[0];
    b[1] = f[1] - c[1];
    b[2] = f[2] - c[2]
};

dot = function(b, f) {
    return b[0] * f[0] + b[1] * f[1] + b[2] * f[2]
};

cross = function(b, f, c) {
    b[0] = f[1] * c[2] - f[2] * c[1];
    b[1] = f[2] * c[0] - f[0] * c[2];
    b[2] = f[0] * c[1] - f[1] * c[0]
};

window.shapeIntersectsShape = function(b, f, c, d, e) {
    var m, l, p, q, x, A, t, a, B;
    for (m = window.Intersection3D.v0, l = window.Intersection3D.v1, p = window.Intersection3D.v2, q = window.Intersection3D.p0, x = window.Intersection3D.p1, A = window.Intersection3D.p2, t = 0, a = 0; a < b.length; a += 3 * c)
        for (B = 0; B < f.length; B += 3 * d) m[0] = b[a], m[1] = b[a + 1], m[2] = b[a + 2], l[0] = b[a + c], l[1] = b[a + 1 + c], l[2] = b[a + 2 + c], p[0] = b[a + 2 * c], p[1] = b[a + 1 + 2 * c], p[2] = b[a + 2 + 2 * c], q[0] = f[B] + e[0], q[1] = f[B + 1] + e[1], q[2] = f[B + 2] + e[2], x[0] = f[B + d] + e[0], x[1] = f[B + 1 + d] + e[1], x[2] = f[B + 2 + d] + e[2], A[0] = f[B + 2 * d] + e[0], A[1] = f[B + 1 + 2 * d] + e[1],
            A[2] = f[B + 2 + 2 * d] + e[2], t += segmentIntersectsTriangle(q, x, m, l, p), t += segmentIntersectsTriangle(q, A, m, l, p), t += segmentIntersectsTriangle(x, A, m, l, p), t += segmentIntersectsTriangle(m, l, q, x, A), t += segmentIntersectsTriangle(m, p, q, x, A), t += segmentIntersectsTriangle(l, p, q, x, A);
    return t
};

segmentIntersectsTriangle = function(b, f, c, d, e) {
    window.Intersection3D.d[0] = f[0] - b[0];
    window.Intersection3D.d[1] = f[1] - b[1];
    window.Intersection3D.d[2] = f[2] - b[2];
    vector(window.Intersection3D.e1, d, c);
    vector(window.Intersection3D.e2, e, c);
    cross(window.Intersection3D.h, window.Intersection3D.d, window.Intersection3D.e2);
    f = window.Intersection3D.e1[0] * window.Intersection3D.h[0] + window.Intersection3D.e1[1] * window.Intersection3D.h[1] + window.Intersection3D.e1[2] * window.Intersection3D.h[2];
    if (-1E-5 < f && 1E-5 > f) return 0;
    f = 1 / f;
    vector(window.Intersection3D.s,
        b, c);
    b = f * (window.Intersection3D.s[0] * window.Intersection3D.h[0] + window.Intersection3D.s[1] * window.Intersection3D.h[1] + window.Intersection3D.s[2] * window.Intersection3D.h[2]);
    if (0 > b || 1 < b) return 0;
    cross(window.Intersection3D.q, window.Intersection3D.s, window.Intersection3D.e1);
    c = f * (window.Intersection3D.d[0] * window.Intersection3D.q[0] + window.Intersection3D.d[1] * window.Intersection3D.q[1] + window.Intersection3D.d[2] * window.Intersection3D.q[2]);
    if (0 > c || 1 < b + c) return 0;
    b = f * (window.Intersection3D.e2[0] * window.Intersection3D.q[0] + window.Intersection3D.e2[1] * window.Intersection3D.q[1] + window.Intersection3D.e2[2] * window.Intersection3D.q[2]);
    return 1E-5 < b && 1 >= b ? 1 : 0
};