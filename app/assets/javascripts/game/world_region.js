function WorldRegion(gameRoot, worldName) {
  this.gameRoot = gameRoot;
  this.worldName = worldName;
  this.worldRegionData = [];
  this.localChunksIndex = [];
  this.chunkData = [];
  this.chunkCount = 0;
  // TODO: potentially turn the thread code object into multiple steps and add error handling (such as setting assigning a file url instead)
  this.threadCodeBlobUrlForServerFile = window.URL.createObjectURL(new Blob([ "self.addEventListener('message', (function(e) {\
    var regionData, xhr;\
    xhr = new XMLHttpRequest;\
    xhr.open('GET', e.data.name, false);\
    xhr.responseType = 'arraybuffer';\
    xhr.send();\
    if (xhr.status === 200) {\
      regionData = new Uint8Array(xhr.response);\
    } else {\
      self.postMessage({\
        loaded: 0,\
        x: e.data.x,\
        y: e.data.y,\
        error: xhr.statusText\
      });\
      self.close();\
      return;\
    }\
    self.postMessage({\
      loaded: 1,\
      x: e.data.x,\
      y: e.data.y,\
      data: regionData.buffer\
    }, [regionData.buffer]);\
    self.close();\
  }), false);"], { type: 'application/javascript' } ));
  // NOTE: if a deconstructor is made for the WorldRegion object, move the blob object to a global context or deallocate with the following
  // window.URL.revokeObjectURL(loadFileLoadingThreadCodeUrl);
}

WorldRegion.prototype.updateChunks = function() {
  var b = (new Date).getTime(),
    f = 0,
    c;
  for (c in this.chunkData) void 0 !== this.chunkData[c] && -1 !== this.chunkData[c] && -2 !== this.chunkData[c] && !0 === this.chunkData[c].needsUpdate && (this.chunkData[c].update(), f++);
  c = (new Date).getTime();
  console.log("update chunk " + (c - b) + " " + f)
};
WorldRegion.prototype.deleteBuffers = function() {
  var b = (new Date).getTime(),
    f = 0,
    c;
  for (c in this.chunkData) void 0 !== this.chunkData[c] && -1 !== this.chunkData[c] && -2 !== this.chunkData[c] && !0 !== this.chunkData[c].changed && (1 === this.chunkData[c].isInit || 1 === this.chunkData[c].isInit1) && this.chunkData[c].timestamp + 1e4 < b && (this.chunkData[c].deleteBuffers(), this.chunkData[c] = void 0, f++);
  c = (new Date).getTime();
  console.log("delete buffers ");// + (c - b) + " " + f)
};
WorldRegion.prototype.render = function() {
  var c;
  var v;
  var c;
  var d;
  var v;
  var f;
  var A, B, C, a, b, c, d, e, f, l, m, p, q, t, v, x;
  if (window.initTexture) {
    b = window.gluu.standardShader;
    gluu.gl.useProgram(b);
    gluu.gl.viewport(0, 0, gluu.gl.viewportWidth, gluu.gl.viewportHeight);
    gluu.gl.clearColor(settings.skyColor[0], settings.skyColor[1], settings.skyColor[2], 1);
    gluu.gl.clear(gluu.gl.COLOR_BUFFER_BIT | gluu.gl.DEPTH_BUFFER_BIT);
    mat4.perspective(window.gluu.pMatrix, camera.fovy, gluu.gl.viewportWidth / gluu.gl.viewportHeight, 0.1, 6e3);
    f = camera.getMatrix();
    mat4.multiply(window.gluu.pMatrix, window.gluu.pMatrix, f);
    mat4.identity(window.gluu.mvMatrix);
    gluu.gl.uniformMatrix4fv(b.pMatrixUniform, !1, window.gluu.pMatrix);
    gluu.gl.uniformMatrix4fv(b.mvMatrixUniform, !1, window.gluu.mvMatrix);
    gluu.gl.uniform1f(b.lod, settings.distanceLevel[1]);
    gluu.gl.uniform1f(b.sun, settings.sun);
    gluu.gl.uniform1f(b.brightness, settings.brightness);
    gluu.gl.uniform4fv(b.skyColor, settings.skyColor);
    c = void 0;
    d = void 0;
    f = void 0;
    e = void 0;
    m = void 0;
    l = void 0;
    p = void 0;
    q = void 0;
    x = void 0;
    A = void 0;
    B = void 0;
    c = 0;
    d = 0;
    f = 0;
    e = [settings.distanceLevel[0], settings.distanceLevel[1], settings.distanceLevel[2], settings.distanceLevel[2]];
    m = [];
    l = 0;
    p = 0;
    q = 0;
    x = camera.getPos();
    A = 0;
    while (4 > A) {
      t = Math.floor(x[0] / 16);
      a = Math.floor(x[2] / 16);
      m[0] = 0;
      m[1] = 0;
      B = -1;
      while (B < e[A] * e[A] * 4) {
        -1 !== B && (m = window.spiralLoop(B));
        l = t + m[0];
        p = a + m[1];
        q = 1e4 * l + p;
        if (-1 === this.chunkData[q] || -2 === this.chunkData[q]) {
          this.chunkData[q].timestamp = window.chronometer.lastTime;
        } else {
          if (c = x[0] - (16 * l + 8)) {
            d = x[2] - (16 * p + 8);
            f = Math.sqrt(c * c + d * d);
            !(f > 16 * e[A]);
            if (64 < f) {
              v = camera.getTarget();
              v = [x[0] - v[0], x[2] - v[2]];
              d = [-c, -d];
              c = v[0] * d[0] + v[1] * d[1];
              C = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
              v = Math.sqrt(d[0] * d[0] + d[1] * d[1]);
              c = c / (C * v);
              if (0 < c) {
                B++;
                continue;
              }
              c = Math.cos(camera.fovx / 1.5) + c;
              v = Math.sqrt(2 * v * v * (1 - c));
              if (0 < c && 16 < v) {
                B++;
                continue;
              }
            }
            if (void 0 === this.chunkData[q]) {
              1 < chronometer.iLag && (chronometer.iLag -= 1);
              this.requestChunk(l, p);
            } else {
              this.chunkData[q].timestamp = chronometer.lastTime;
              (62 <= x[1] || 160 > f) && this.chunkData[q].render(A, b, 0);
              if (62 > x[1] && 96 > f) {
                this.chunkData[q].render(A, b, 1);
              } else {
                64 > f && this.chunkData[q].render(A, b, 1);
              }
            }
          }
        }
        B++;
      }
      A++;
    }
  }
};
WorldRegion.prototype.renderSelection = function() {
  var f;
  var b, c, d, e, f, l, m, p, q, x;
  if (window.initTexture) {
    b = window.gluu.selectionShader;
    gluu.gl.useProgram(b);
    gluu.gl.viewport(0, 0, gluu.gl.viewportWidth, gluu.gl.viewportHeight);
    gluu.gl.clearColor(0, 0, 0, 0);
    gluu.gl.clear(gluu.gl.COLOR_BUFFER_BIT | gluu.gl.DEPTH_BUFFER_BIT);
    mat4.perspective(window.gluu.pMatrix, camera.fovy, gluu.gl.viewportWidth / gluu.gl.viewportHeight, 0.1, 6e3);
    f = camera.getMatrix();
    mat4.multiply(window.gluu.pMatrix, window.gluu.pMatrix, f);
    mat4.identity(window.gluu.mvMatrix);
    gluu.gl.uniformMatrix4fv(b.pMatrixUniform, !1, window.gluu.pMatrix);
    gluu.gl.uniformMatrix4fv(b.mvMatrixUniform, !1, window.gluu.mvMatrix);
    c = void 0;
    d = void 0;
    e = void 0;
    m = void 0;
    f = void 0;
    l = void 0;
    x = void 0;
    c = [];
    d = 0;
    e = 0;
    m = 0;
    f = camera.getPos();
    l = 0;
    while (4 > l) {
      p = Math.floor(f[0] / 16);
      q = Math.floor(f[2] / 16);
      c[0] = 0;
      c[1] = 0;
      x = -1;
      while (24 > x) {
        -1 !== x && (c = window.spiralLoop(x));
        d = p + c[0];
        e = q + c[1];
        m = 1e4 * d + e;
        if (-1 === this.chunkData[m] || -2 === this.chunkData[m]) {
          this.chunkData[m].timestamp = chronometer.lastTime;
        } else {
          if (void 0 === this.chunkData[m]) {
            1 < chronometer.iLag && (chronometer.iLag -= 1);
            this.requestChunk(d, e);
          } else {
            this.chunkData[m].timestamp = chronometer.lastTime;
            this.chunkData[m].render(l, b, 0);
            this.chunkData[m].render(l, b, 1);
          }
        }
        x++;
      }
      l++;
    }
    q = new Uint8Array(4);
    gluu.gl.readPixels(Math.floor(gluu.gl.viewportWidth / 2), Math.floor(gluu.gl.viewportHeight / 2), 1, 1, gluu.gl.RGBA, gluu.gl.UNSIGNED_BYTE, q);
    b = {};
    b.y = q[0];
    b.z = Math.floor(q[1] / 16);
    b.x = q[1] - (16 * b.z);
    p = Math.floor(q[2] / 10);
    b.side = q[2] - (10 * p);
    c = Math.floor(p / 5);
    d = p - (5 * c);
    p = Math.floor(f[0] / 16);
    q = Math.floor(f[2] / 16);
    f = p % 5;
    0 > f && (f += 5);
    e = q % 5;
    0 > e && (e += 5);
    c -= f;
    d -= e;
    2 < c && (c -= 5); - 2 > c && (c += 5);
    2 < d && (d -= 5); - 2 > d && (d += 5);
    b.chx = p + c;
    b.chz = q + d;
    b.rchx = c;
    b.rchz = d;
    return b;
  }
};
WorldRegion.prototype.saveChunkToStorage = function(b, f) {
  var c = 1e4 * b + f;
  if (void 0 !== this.chunkData[c] && -1 !== this.chunkData[c] && -2 !== this.chunkData[c]) {
    var d = this.chunkData[c].getNBT(),
      d = (new Zlib.Deflate(d)).compress(),
      e = new Uint8Array(d.length + 5),
      c = d.length + 1;
    e[0] = c >> 24 & 255;
    e[1] = c >> 16 & 255;
    e[2] = c >> 8 & 255;
    e[3] = c & 255;
    e[4] = 2;
    for (c = 0; c < d.length; c++) e[c + 5] = d[c];
    d = ab2str(e);
    window.localStorage.setItem(this.gameRoot + " " + this.worldName + " " + b + " " + f, d)
  }
};
WorldRegion.prototype.getChunkFromStorage = function(chunk_x, chunk_y) {
  var raw_data = window.localStorage.getItem(this.gameRoot + " " + this.worldName + " " + chunk_x + " " + chunk_y);
  if (void 0 === raw_data || null === raw_data || "" === raw_data) return -1;
  data = new Uint8Array(str2ab(raw_data));
  return WorldRegion.loadChunk(0, data, !0)
};
WorldRegion.prototype.loadChunkFromStorage = function(chunk_x, chunk_y, return_flag) {
  var chunk_from_storage = mcWorld.getChunkFromStorage(chunk_x, chunk_y);
  if (-1 === chunk_from_storage) return -1;
  if (return_flag) return chunk_from_storage;
  this.chunkData[1e4 * chunk_x + chunk_y] = chunk_from_storage;
  var e = d = c = !1,
    m = !1,
    l = mcWorld.requestChunk(chunk_x + 1, chunk_y);
  void 0 === l && (m = !0); - 1 === l && (m = !0); - 2 === l && (m = !0);
  var p = mcWorld.requestChunk(chunk_x - 1, chunk_y);
  void 0 === p && (e = !0); - 1 === p && (e = !0); - 2 === p && (e = !0);
  var q = mcWorld.requestChunk(chunk_x, chunk_y + 1);
  void 0 === q && (c = !0); - 1 === q && (c = !0); - 2 === q && (c = !0);
  requestedChunk = mcWorld.requestChunk(chunk_x, chunk_y - 1);
  void 0 === requestedChunk && (d = !0); - 1 === requestedChunk && (d = !0); - 2 === requestedChunk && (d = !0);
  m || l.init2();
  e || p.init2();
  c || q.init2();
  d || requestedChunk.init2()
};
// WorldRegion.prototype.loadRegionFile = function(b, f) { # NOTE: apparently not used
//   try {
//     var c = Readfile.readRAW(f)
//   } catch (d) {
//     console.log("nie ma pliku");
//     return
//   }
//   b.regionData = c;
//   b.loaded = 0;
//   b.chunkPos = [];
//   b.chunkLen = [];
//   var e, m;
//   for (e = 0, m = 0; 4096 > e; e += 4, m++) b.chunkPos[m] = 65536 * c[e] + 256 * c[e + 1] + c[e + 2], b.chunkLen[m] = c[e + 3]
// };
