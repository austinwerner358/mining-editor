Intersection3D = ->
  @d = new Float32Array(3)
  @e1 = new Float32Array(3)
  @e2 = new Float32Array(3)
  @h = new Float32Array(3)
  @s = new Float32Array(3)
  @q = new Float32Array(3)
  @v0 = new Float32Array(3)
  @v1 = new Float32Array(3)
  @v2 = new Float32Array(3)
  @p0 = new Float32Array(3)
  @p1 = new Float32Array(3)
  @p2 = new Float32Array(3)
  return

window.intersection3D = new Intersection3D

Intersection3D::vector = (b, f, c) ->
  b[0] = f[0] - (c[0])
  b[1] = f[1] - (c[1])
  b[2] = f[2] - (c[2])
  return

Intersection3D::dot = (b, f) ->
  b[0] * f[0] + b[1] * f[1] + b[2] * f[2]

Intersection3D::cross = (b, f, c) ->
  b[0] = f[1] * c[2] - (f[2] * c[1])
  b[1] = f[2] * c[0] - (f[0] * c[2])
  b[2] = f[0] * c[1] - (f[1] * c[0])
  return

Intersection3D::shapeIntersectsShape = (b, f, c, d, e) ->
  m = undefined
  l = undefined
  p = undefined
  q = undefined
  x = undefined
  A = undefined
  t = undefined
  a = undefined
  B = undefined
  m = @v0
  l = @v1
  p = @v2
  q = @p0
  x = @p1
  A = @p2
  t = 0
  a = 0
  while a < b.length
    B = 0
    while B < f.length
      m[0] = b[a]
      m[1] = b[a + 1]
      m[2] = b[a + 2]
      l[0] = b[a + c]
      l[1] = b[a + 1 + c]
      l[2] = b[a + 2 + c]
      p[0] = b[a + 2 * c]
      p[1] = b[a + 1 + 2 * c]
      p[2] = b[a + 2 + 2 * c]
      q[0] = f[B] + e[0]
      q[1] = f[B + 1] + e[1]
      q[2] = f[B + 2] + e[2]
      x[0] = f[B + d] + e[0]
      x[1] = f[B + 1 + d] + e[1]
      x[2] = f[B + 2 + d] + e[2]
      A[0] = f[B + 2 * d] + e[0]
      A[1] = f[B + 1 + 2 * d] + e[1]
      A[2] = f[B + 2 + 2 * d] + e[2]
      t += @segmentIntersectsTriangle(q, x, m, l, p)
      t += @segmentIntersectsTriangle(q, A, m, l, p)
      t += @segmentIntersectsTriangle(x, A, m, l, p)
      t += @segmentIntersectsTriangle(m, l, q, x, A)
      t += @segmentIntersectsTriangle(m, p, q, x, A)
      t += @segmentIntersectsTriangle(l, p, q, x, A)
      B += 3 * d
    a += 3 * c
  return t

Intersection3D::segmentIntersectsTriangle = (b, f, c, d, e) ->
  @d[0] = f[0] - (b[0])
  @d[1] = f[1] - (b[1])
  @d[2] = f[2] - (b[2])
  @vector @e1, d, c
  @vector @e2, e, c
  @cross @h, @d, @e2
  f = @e1[0] * @h[0] + @e1[1] * @h[1] + @e1[2] * @h[2]
  if -1e-5 < f and 1e-5 > f
    return 0
  f = 1 / f
  @vector @s, b, c
  b = f * (@s[0] * @h[0] + @s[1] * @h[1] + @s[2] * @h[2])
  if 0 > b or 1 < b
    return 0
  @cross @q, @s, @e1
  c = f * (@d[0] * @q[0] + @d[1] * @q[1] + @d[2] * @q[2])
  if 0 > c or 1 < b + c
    return 0
  b = f * (@e2[0] * @q[0] + @e2[1] * @q[1] + @e2[2] * @q[2])
  if 1e-5 < b and 1 >= b
    return 1
  else
    return 0


