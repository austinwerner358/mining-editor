window.initBlocks = ->
  # TODO: stop loading static assets in production
  # NOTE: but keep the old way for when there is no server
  window.textureConfig = JSON.parse(window.settings.readTxt('game/config/textures.json'))
  console.log('Texture config:')
  console.log window.textureConfig
  if true # window.blockConfigLoaded
    window.blockConfig = JSON.parse(window.settings.readTxt('game/config/blocks.json'))
  else
    window.blockConfig = {
      "0": {
          "mask": "0x00",
          "type": 0,
          "0": {
              "shapeType": 0,
              "drawLevel": 0,
              "useBiomeColor": 0
          }
      },
      "1": {
          "mask": "0x00",
          "type": 1,
          "0": {
              "name": "Stone",
              "drawLevel": 0,
              "shapeType": 1,
              "useBiomeColor": 0,
              "shapeName": "simpleBlock",
              "defaultTexture": "stone.png"
          }
      },
      "2": {
          "mask": "0x00",
          "type": 1,
          "0": {
              "name": "Grass",
              "drawLevel": 0,
              "shapeType": 4,
              "useBiomeColor": 1,
              "shapeName": "dirtBlock",
              "defaultTexture": "grass_side.png",
              "top": "grass_top.png",
              "front2": "grass_side_overlay.png",
              "back2": "grass_side_overlay.png",
              "left2": "grass_side_overlay.png",
              "right2": "grass_side_overlay.png",
              "bottom": "dirt.png"
          },
          "1": {
              "hidden": true,
              "name": "Snow Grass",
              "drawLevel": 0,
              "shapeType": 1,
              "useBiomeColor": 0,
              "shapeName": "simpleBlock",
              "defaultTexture": "grass_side_snowed.png",
              "bottom": "dirt.png",
              "top": "snow.png"
          }
      }
    }
  window.blockConfigLoaded = true
  console.log('Block config:')
  console.log(window.blockConfig)
  # TODO: have block source be based on url param
  # TODO: have the most common blocks loaded straight into the html
  # Get base block types from the html.
  # TODO: load the rest of the block types from the server (Rails will decide whether to send dynamic or static JSON)
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
  window.blockConfig.length = 300 # TODO: figure out if this is necessary
  window.biomes = JSON.parse(window.settings.readTxt('game/config/biomes.json'))
  window.shapeConfig = JSON.parse(window.settings.readTxt('game/config/shapes.json'))
  console.log('Shape config:')
  console.log window.shapeConfig
  window.textureConfig.invRow = 1 / window.textureConfig.row
  window.blockConfig.lightSource = new Uint8Array(window.blockConfig.length)
  window.blockConfig.lightTransmission = new Float32Array(window.blockConfig.length)
  attr = undefined
  val = undefined
  sideName = undefined
  sideVal = undefined
  n = 0
  # Iterate over block types.
  # TODO: use flag to determine whether the config should be overwritten
  # TODO: continue to next iteration if blockConfig[n] is not present (after zeroing config)
  while n < window.blockConfig.length
    # Set empty block type if config is missing for index.
    if undefined == window.blockConfig[n]
      window.blockConfig[n] = {}
      window.blockConfig[n].type = 0
    # Set the "0" biome to empty if config is missing?
    if undefined == window.blockConfig[n][0]
      window.blockConfig[n][0] = {}
      window.blockConfig[n][0].type = 0
    # Set the light source value if present.
    window.blockConfig.lightSource[n] = window.blockConfig[n].lightSource or 0
    # Set the light transmission value (defaults to 0 or 1 depending on the type of block).
    window.blockConfig.lightTransmission[n] = if 1 == window.blockConfig[n].type then window.blockConfig[n].lightTransmission or 0 else window.blockConfig[n].lightTransmission or 1
    # Iterate over attributes and sub-types for block.
    for attr,val of window.blockConfig[n]
      if 'mask' == attr
        window.blockConfig[n][attr] = parseInt(window.blockConfig[n][attr], 16)
      # If the attribute has a shapeName, then the block type has one or more sub-types (a usual block must have at least one sub-type).
      if undefined != window.blockConfig[n][attr].shapeName
        window.blockConfig[n][attr].shape = {}
        # Iterate over (config defined) sides of sub-type of block.
        for sideName,sideVal of window.shapeConfig[window.blockConfig[n][attr].shapeName]
          # Set each side of the shape to empty array for now.
          window.blockConfig[n][attr].shape[sideName] = []
          # If a texture is defined for the side, prepare the offsets.
          if undefined != window.blockConfig[n][attr][sideName]
            textureIndex = window.textureConfig.texture[window.blockConfig[n][attr][sideName]]
            column = textureIndex % window.textureConfig.row
            row = (textureIndex - column) / window.textureConfig.row
          else
            # If a texture is not defined for a side, set the offsets for the default texture for the sub-type of block if it exists.
            if undefined != window.blockConfig[n][attr].defaultTexture
              textureIndex = window.textureConfig.texture[window.blockConfig[n][attr].defaultTexture]
              column = textureIndex % window.textureConfig.row
              row = (textureIndex - column) / window.textureConfig.row
          window.blockConfig[n][attr].shape[sideName] = new Float32Array(window.shapeConfig[window.blockConfig[n][attr].shapeName][sideName].length)
          sideShapeIndex = 0
          while sideShapeIndex < window.shapeConfig[window.blockConfig[n][attr].shapeName][sideName].length
            # TODO: figure out what the 5 indices are used for (espeically the last two)
            window.blockConfig[n][attr].shape[sideName][sideShapeIndex] = window.shapeConfig[window.blockConfig[n][attr].shapeName][sideName][sideShapeIndex]
            window.blockConfig[n][attr].shape[sideName][sideShapeIndex + 1] = window.shapeConfig[window.blockConfig[n][attr].shapeName][sideName][sideShapeIndex + 1]
            window.blockConfig[n][attr].shape[sideName][sideShapeIndex + 2] = window.shapeConfig[window.blockConfig[n][attr].shapeName][sideName][sideShapeIndex + 2]
            window.blockConfig[n][attr].shape[sideName][sideShapeIndex + 3] = window.textureConfig.invRow * (window.shapeConfig[window.blockConfig[n][attr].shapeName][sideName][sideShapeIndex + 3] + column)
            window.blockConfig[n][attr].shape[sideName][sideShapeIndex + 4] = window.textureConfig.invRow * (window.shapeConfig[window.blockConfig[n][attr].shapeName][sideName][sideShapeIndex + 4] + row)
            sideShapeIndex += 5
    n++
  window.useBlock.id = 1
  window.useBlock.data = 0
  console.log('Block config (updated):')
  console.log window.blockConfig
  return
