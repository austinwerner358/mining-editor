chronometer.tick = ->
  window.requestAnimFrame chronometer.tick
  b = (new Date).getTime()
  chronometer.fps = 1e3 / (b - chronometer.lastTime)
  f = window.camera.getPos()
  c = window.camera.getRot()
  if 0 < Math.floor(b / 100) - Math.floor(chronometer.lastTime / 100)
    h_u_d.gameStateHtml.innerHTML = 'x: ' + f[0].toFixed(2) + '  y: ' + f[1].toFixed(2) + '  z: ' + f[2].toFixed(2)
    h_u_d.gameStateHtml.innerHTML += '<br/>FPS: ' + Math.floor(chronometer.fps)
    h_u_d.gameStateHtml.innerHTML += '<br/>Block: ' + window.useBlock.id + '-' + window.useBlock.data + '  : ' + (window.block[window.useBlock.id][window.useBlock.data].name or window.block[window.useBlock.id].name or window.block[window.useBlock.id][window.useBlock.data].defaultTexture or '')
    h_u_d.gameStateHtml.innerHTML += '<br/>Est. Gpu Mem: ' + Math.floor(8 * gpuMem / 1048576) + ' M'
    h_u_d.gameStateHtml.innerHTML += '<br/><a href="/controls" target="_blank">View Controls</a>'
  chronometer.newSec = !1
  chronometer.lastTime % 1e3 > b % 1e3 and chronometer.newSec = !0
  chronometer.sec++
  d = !1
  chronometer.lastTime % 100 > b % 100 and (d = !0)
  chronometer.lastTime = b
  window.camera.updatePosition chronometer.fps
  chronometer.iLag += window.settings.loadSpeed
  chronometer.iLag > window.settings.loadLag and (chronometer.iLag = window.settings.loadLag)
  if window.settings.edit and d and (window.blockSelection = window.mcWorld.renderSelection()) and controls.selectE
    b = window.blockSelection
    controls.selectE = !1
    console.log('y: ' + b.y + ' z: ' + b.z + ' x: ' + b.x + ' chx: ' + b.chx + ' chz: ' + b.chz + ' side: ' + b.side)
    switch controls.selectT
      when 0
        window.mcWorld.updateChunkBlock b.chx, b.chz, b.x, b.y, b.z, 0, 0
      when 1
        e = 0
        m = 0
        d = 0
        l = window.mcWorld.getChunkBlock(b.chx, b.chz, b.x, b.y, b.z)
        console.log l.id + ' ' + l.data
        p = !1
        undefined != window.block[l.id][l.data & window.block[l.id].mask] and (if undefined != window.block[l.id][l.data & window.block[l.id].mask].replace then (p = window.block[l.id][l.data & window.block[l.id].mask].replace) else undefined != window.block[l.id].replace and (p = window.block[l.id].replace))
        if !p
          switch b.side
            when 1
              e = -1
            when 2
              e = 1
            when 3
              m = -1
            when 4
              m = 1
            when 5
              d = -1
            when 6
              d = 1
        b.x += e
        15 < b.x and b.x = 0
        b.chx++
        0 > b.x and b.x = 15
        b.chx--
        b.z += m
        15 < b.z and b.z = 0
        b.chz++
        0 > b.z and b.z = 15
        b.chz--
        0 > b.y and (b.y = 0)
        256 < b.y and (b.y = 256)
        e = window.useBlock.id or 1
        m = window.useBlock.data or 0
        window.mcWorld.updateChunkBlock b.chx, b.chz, b.x, b.y + d, b.z, e, m
      when 2
        e = window.useBlock.id or 1
        m = window.useBlock.data or 0
        window.mcWorld.updateChunkBlock b.chx, b.chz, b.x, b.y, b.z, e, m
      when 3
        window.mcWorld.changeChunkBlockAdd b.chx, b.chz, b.x, b.y, b.z
  window.mcWorld.render()
  window.settings.edit and window.selectBox.render(window.blockSelection)
  window.pointer.render() if settings.pointerOn
  window.player.render() # doesn't currently work
  chronometer.newSec and window.settings.setHashURL(f, c, window.camera.name)
  10 == chronometer.sec and chronometer.sec = 0
  window.mcWorld.deleteBuffers()
