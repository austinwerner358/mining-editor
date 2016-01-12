window.initBlocks = ->
  window.texLib = JSON.parse(Readfile.readTxt('config/textures.json'))
  console.log window.texLib
  window.block = JSON.parse(Readfile.readTxt('config/blocks.json'))
  window.block.length = 300
  window.biomes = JSON.parse(Readfile.readTxt('config/biomes.json'))
  window.shapeLib = JSON.parse(Readfile.readTxt('config/shapes.json'))
  console.log window.shapeLib
  window.texLib.texF = 1 / window.texLib.row
  b = 0
  f = 0
  c = window.texLib.texF
  d = 0
  window.block.lightSource = new Uint8Array(window.block.length)
  window.block.lightTransmission = new Float32Array(window.block.length)
  e = undefined
  m = undefined
  l = undefined
  e = 0
  while e < window.block.length
    if undefined == window.block[e]
      window.block[e] = {}
      window.block[e].type = 0
    if undefined == window.block[e][0]
      window.block[e][0] = {}
      window.block[e][0].type = 0
    window.block.lightSource[e] = window.block[e].lightSource or 0
    window.block.lightTransmission[e] = if 1 == window.block[e].type then window.block[e].lightTransmission or 0 else window.block[e].lightTransmission or 1
    for m,v of window.block[e]
      if 'mask' == m
        window.block[e][m] = parseInt(window.block[e][m], 16)
      if undefined != window.block[e][m].shapeName
        window.block[e][m].shape = {}
        for l,x of window.shapeLib[window.block[e][m].shapeName]
          window.block[e][m].shape[l] = []
          if undefined != window.block[e][m][l]
            d = window.texLib.texture[window.block[e][m][l]]
            b = d % window.texLib.row
            f = (d - b) / window.texLib.row
          else
            if undefined != window.block[e][m].defaultTexture
              d = window.texLib.texture[window.block[e][m].defaultTexture]
              b = d % window.texLib.row
              f = (d - b) / window.texLib.row
          window.block[e][m].shape[l] = new Float32Array(window.shapeLib[window.block[e][m].shapeName][l].length)
          d = 0
          while d < window.shapeLib[window.block[e][m].shapeName][l].length
            window.block[e][m].shape[l][d] = window.shapeLib[window.block[e][m].shapeName][l][d]
            window.block[e][m].shape[l][d + 1] = window.shapeLib[window.block[e][m].shapeName][l][d + 1]
            window.block[e][m].shape[l][d + 2] = window.shapeLib[window.block[e][m].shapeName][l][d + 2]
            window.block[e][m].shape[l][d + 3] = c * (window.shapeLib[window.block[e][m].shapeName][l][d + 3] + b)
            window.block[e][m].shape[l][d + 4] = c * (window.shapeLib[window.block[e][m].shapeName][l][d + 4] + f)
            d += 5
    e++
  window.useBlock.id = 1
  window.useBlock.data = 0
  console.log window.block
  return


