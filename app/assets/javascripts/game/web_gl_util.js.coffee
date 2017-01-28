WebGLUtils = do ->

  # TODO: check if WebGLUtils is being called and improve it

  b = (b, c) ->
    d = undefined
    e = undefined
    m = undefined
    d = [
      'webgl'
      'experimental-webgl'
      'webkit-3d'
      'moz-webgl'
    ]
    e = null
    m = 0
    while m < d.length
      try
        e = b.getContext(d[m], c)
      catch error
        console.error(error)
      if e
        break
      ++m
    e

  {
    create3DContext: b
    setupWebGL: (f, c, d) ->

      e = (b) ->
        `var d`
        `var c`
        c = f.parentNode
        if c
          d = if window.WebGLRenderingContext then 'It doesn\'t appear your computer can support WebGL.<br/><a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>' else 'This page requires a browser that supports WebGL.<br/><a href="http://get.webgl.org">Click here to upgrade your browser.</a>'
          b and (d += '<br/><br/>Status: ' + b)
          c.innerHTML = '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr><td align="center"><div style="display: table-cell; vertical-align: middle;"><div style="">' + d + '</div></div></td></tr></table>'
        return

      d = d or e
      f.addEventListener and f.addEventListener('webglcontextcreationerror', ((b) ->
        d b.statusMessage
        return
      ), !1)
      (c = b(f, c)) or window.WebGLRenderingContext or d('')
      c

  }
