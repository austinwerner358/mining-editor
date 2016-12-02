window.initBlocks = ->
  window.textureConfig = JSON.parse(Readfile.readTxt('config/textures.json'))
  console.log window.textureConfig
  window.blockConfig = JSON.parse(Readfile.readTxt('config/blocks.json'))
  console.log(window.blockConfig)
  # blocksResponse = $.ajax(
  #   type: 'GET'
  #   url: '/blocks.json'
  #   # data: queryParams
  #   dataType: 'html'
  #   context: document.body
  #   global: false
  #   async: false
  #   success: (data) ->
  #     data
  # ).responseText
  # window.blockConfig = JSON.parse(blocksResponse)
  window.blockConfig.length = 300
  window.biomes = JSON.parse(Readfile.readTxt('config/biomes.json'))
  window.shapeLib = JSON.parse(Readfile.readTxt('config/shapes.json'))
  console.log window.shapeLib
  window.textureConfig.texF = 1 / window.textureConfig.row
  b = 0
  f = 0
  c = window.textureConfig.texF
  d = 0
  window.blockConfig.lightSource = new Uint8Array(window.blockConfig.length)
  window.blockConfig.lightTransmission = new Float32Array(window.blockConfig.length)
  e = undefined
  m = undefined
  l = undefined
  e = 0
  while e < window.blockConfig.length
    if undefined == window.blockConfig[e]
      window.blockConfig[e] = {}
      window.blockConfig[e].type = 0
    if undefined == window.blockConfig[e][0]
      window.blockConfig[e][0] = {}
      window.blockConfig[e][0].type = 0
    window.blockConfig.lightSource[e] = window.blockConfig[e].lightSource or 0
    window.blockConfig.lightTransmission[e] = if 1 == window.blockConfig[e].type then window.blockConfig[e].lightTransmission or 0 else window.blockConfig[e].lightTransmission or 1
    for m,v of window.blockConfig[e]
      if 'mask' == m
        window.blockConfig[e][m] = parseInt(window.blockConfig[e][m], 16)
      if undefined != window.blockConfig[e][m].shapeName
        window.blockConfig[e][m].shape = {}
        for l,x of window.shapeLib[window.blockConfig[e][m].shapeName]
          window.blockConfig[e][m].shape[l] = []
          if undefined != window.blockConfig[e][m][l]
            d = window.textureConfig.texture[window.blockConfig[e][m][l]]
            b = d % window.textureConfig.row
            f = (d - b) / window.textureConfig.row
          else
            if undefined != window.blockConfig[e][m].defaultTexture
              d = window.textureConfig.texture[window.blockConfig[e][m].defaultTexture]
              b = d % window.textureConfig.row
              f = (d - b) / window.textureConfig.row
          window.blockConfig[e][m].shape[l] = new Float32Array(window.shapeLib[window.blockConfig[e][m].shapeName][l].length)
          d = 0
          while d < window.shapeLib[window.blockConfig[e][m].shapeName][l].length
            window.blockConfig[e][m].shape[l][d] = window.shapeLib[window.blockConfig[e][m].shapeName][l][d]
            window.blockConfig[e][m].shape[l][d + 1] = window.shapeLib[window.blockConfig[e][m].shapeName][l][d + 1]
            window.blockConfig[e][m].shape[l][d + 2] = window.shapeLib[window.blockConfig[e][m].shapeName][l][d + 2]
            window.blockConfig[e][m].shape[l][d + 3] = c * (window.shapeLib[window.blockConfig[e][m].shapeName][l][d + 3] + b)
            window.blockConfig[e][m].shape[l][d + 4] = c * (window.shapeLib[window.blockConfig[e][m].shapeName][l][d + 4] + f)
            d += 5
    e++
  window.useBlock.id = 1
  window.useBlock.data = 0
  console.log window.blockConfig
  return
