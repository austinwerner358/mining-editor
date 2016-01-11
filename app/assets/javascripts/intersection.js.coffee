# intersection3D = ->
#   @d = new Float32Array(3)
#   @e1 = new Float32Array(3)
#   @e2 = new Float32Array(3)
#   @h = new Float32Array(3)
#   @s = new Float32Array(3)
#   @q = new Float32Array(3)
#   @v0 = new Float32Array(3)
#   @v1 = new Float32Array(3)
#   @v2 = new Float32Array(3)
#   @p0 = new Float32Array(3)
#   @p1 = new Float32Array(3)
#   @p2 = new Float32Array(3)
#   return

# window.Intersection3D = new intersection3D



# window.vector = (b, f, c) ->
#   b[0] = f[0] - (c[0])
#   b[1] = f[1] - (c[1])
#   b[2] = f[2] - (c[2])
#   return

# window.dot = (b, f) ->
#   b[0] * f[0] + b[1] * f[1] + b[2] * f[2]

# window.cross = (b, f, c) ->
#   b[0] = f[1] * c[2] - (f[2] * c[1])
#   b[1] = f[2] * c[0] - (f[0] * c[2])
#   b[2] = f[0] * c[1] - (f[1] * c[0])
#   return

# window.shapeIntersectsShape = (item, b, f, c, d, e) ->
#   m = undefined
#   l = undefined
#   p = undefined
#   q = undefined
#   x = undefined
#   A = undefined
#   t = undefined
#   a = undefined
#   B = undefined
#   m = item.v0
#   l = item.v1
#   p = item.v2
#   q = item.p0
#   x = item.p1
#   A = item.p2
#   t = 0
#   a = 0
#   while a < b.length
#     B = 0
#     while B < f.length
#       m[0] = b[a]
#       m[1] = b[a + 1]
#       m[2] = b[a + 2]
#       l[0] = b[a + c]
#       l[1] = b[a + 1 + c]
#       l[2] = b[a + 2 + c]
#       p[0] = b[a + 2 * c]
#       p[1] = b[a + 1 + 2 * c]
#       p[2] = b[a + 2 + 2 * c]
#       q[0] = f[B] + e[0]
#       q[1] = f[B + 1] + e[1]
#       q[2] = f[B + 2] + e[2]
#       x[0] = f[B + d] + e[0]
#       x[1] = f[B + 1 + d] + e[1]
#       x[2] = f[B + 2 + d] + e[2]
#       A[0] = f[B + 2 * d] + e[0]
#       A[1] = f[B + 1 + 2 * d] + e[1]
#       A[2] = f[B + 2 + 2 * d] + e[2]
#       t += segmentIntersectsTriangle(item, q, x, m, l, p)
#       t += segmentIntersectsTriangle(item, q, A, m, l, p)
#       t += segmentIntersectsTriangle(item, x, A, m, l, p)
#       t += segmentIntersectsTriangle(item, m, l, q, x, A)
#       t += segmentIntersectsTriangle(item, m, p, q, x, A)
#       t += segmentIntersectsTriangle(item, l, p, q, x, A)
#       B += 3 * d
#     a += 3 * c
#   return t

# window.segmentIntersectsTriangle = (item, b, f, c, d, e) ->
#   item.d[0] = f[0] - (b[0])
#   item.d[1] = f[1] - (b[1])
#   item.d[2] = f[2] - (b[2])
#   window.vector item.e1, d, c
#   window.vector item.e2, e, c
#   window.cross item.h, item.d, item.e2
#   f = item.e1[0] * item.h[0] + item.e1[1] * item.h[1] + item.e1[2] * item.h[2]
#   if -1e-5 < f and 1e-5 > f
#     return 0
#   f = 1 / f
#   window.vector item.s, b, c
#   b = f * (item.s[0] * item.h[0] + item.s[1] * item.h[1] + item.s[2] * item.h[2])
#   if 0 > b or 1 < b
#     return 0
#   window.cross item.q, item.s, item.e1
#   c = f * (item.d[0] * item.q[0] + item.d[1] * item.q[1] + item.d[2] * item.q[2])
#   if 0 > c or 1 < b + c
#     return 0
#   b = f * (item.e2[0] * item.q[0] + item.e2[1] * item.q[1] + item.e2[2] * item.q[2])
#   if 1e-5 < b and 1 >= b
#     return 1
#   else
#     return 0



