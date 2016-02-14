var threadsCode = [];
threadsCode.loadRegionThread = "self.addEventListener('message', (function(e) {\
  var regionData, x, xhr, y;\
  x = e.data.x;\
  y = e.data.y;\
  if (!e.data.local) {\
    xhr = new XMLHttpRequest;\
    xhr.open('GET', e.data.name, false);\
    xhr.responseType = 'arraybuffer';\
    try {\
      xhr.send();\
    } catch (_error) {\
      e = _error;\
      self.postMessage({\
        loaded: 0,\
        x: x,\
        y: y\
      });\
      self.close();\
      return;\
    }\
    regionData = new Uint8Array(xhr.response);\
  } else {\
    regionData = new Uint8Array(e.data.region);\
  }\
  self.postMessage({\
    loaded: 1,\
    x: x,\
    y: y,\
    data: regionData.buffer\
  }, [regionData.buffer]);\
  self.close();\
}), false);";

String.prototype.equalsIgnoreCase = function(b) {
  return this.toUpperCase() === b.toUpperCase()
};

function ab2str(b) {
  var f = "",
    c = b.length,
    d = Math.pow(2, 10),
    e, m;
  for (e = 0; e < c; e += d) m = Math.min(d, c - e), m = b.subarray(e, e + m), f += String.fromCharCode.apply(null, m);
  return f
}

function str2ab(b) {
  var f, c, d, e;
  for (f = new ArrayBuffer(b.length), c = new Uint8Array(f), d = 0, e = b.length; d < e; d++) c[d] = b.charCodeAt(d);
  return f
}

function jenkins_hash(b) {
  var f, c;
  for (f = 0, c = 0; c < b.length; ++c) f += b[c], f += f << 10, f ^= f >> 6;
  f += f << 3;
  f ^= f >> 11;
  return f + (f << 15) >>> 0
}

function spiralLoop(b) {
  var f = Math.floor((Math.sqrt(b + 1) - 1) / 2) + 1,
    c = 2 * f;
  b = (1 + b - 8 * f * (f - 1) / 2) % (8 * f);
  var d = [0, 0, f];
  switch (Math.floor(b / (2 * f))) {
    case 0:
      d[0] = b - f;
      d[1] = -f;
      break;
    case 1:
      d[0] = f;
      d[1] = b % c - f;
      break;
    case 2:
      d[0] = f - b % c;
      d[1] = f;
      break;
    case 3:
      d[0] = -f, d[1] = f - b % c
      break;
  }
  return d
}

Readfile = {
  readKuju: function(b, f, c) {
    var d = !1;
    void 0 === c && (d = !0);
    var e = new XMLHttpRequest;
    e.open("GET", b.toLowerCase(), d);
    e.responseType = "arraybuffer";
    d && (e.onload = function(b) {
      b = new Uint8Array(e.response);
      b = 70 === b[7] ? (new Zlib.Inflate(b, {
        index: 16
      })).decompress() : b.subarray(16, b.length - 16);
      f.load(b)
    });
    try {
      e.send()
    } catch (m) {
      return -1
    }
    if (!d) return b = new Uint8Array(e.response), 70 === b[7] ? (new Zlib.Inflate(b, {
      index: 16
    })).decompress() : new Uint8Array(b.buffer.slice(16))
  },
  readRAW: function(b, f, c) {
    f = new XMLHttpRequest;
    f.open("GET", b, !1);
    f.responseType = "arraybuffer";
    try {
      f.send()
    } catch (d) {
      return -1
    }
    return new Uint8Array(f.response)
  },
  readTxt: function(b, f, c) {
    f = new XMLHttpRequest;
    f.open("GET", b, !1);
    f.responseType = "application/json";
    f.send();
    return f.response
  }
};
NBT = {
  nextTag: function(b) {
    var f = {};
    var c;
    f.type = b.data[b.offset++];
    if (void 0 === f.type) return -1;
    switch (f.type) {
      case 0:
        f.name = "";
        break;
      case 1:
        f.name = NBT.getTagName(b, 0);
        f.value = b.data[b.offset++];
        break;
      case 2:
        f.name = NBT.getTagName(b, 0);
        f.value = b.data[b.offset++] << 8 | b.data[b.offset++];
        break;
      case 3:
        f.name = NBT.getTagName(b, 0);
        f.value = b.data[b.offset++] << 24 | b.data[b.offset++] << 16 | b.data[b.offset++] << 8 | b.data[b.offset++];
        break;
      case 4:
        f.name = NBT.getTagName(b, 0);
        f.value = b.data[b.offset++] << 56 | b.data[b.offset++] <<
          48 | b.data[b.offset++] << 40 | b.data[b.offset++] << 32 | b.data[b.offset++] << 24 | b.data[b.offset++] << 16 | b.data[b.offset++] << 8 | b.data[b.offset++];
        break;
      case 5:
        f.name = NBT.getTagName(b, 0);
        f.value = -999;
        b.offset += 4;
        break;
      case 6:
        f.name = NBT.getTagName(b, 0);
        f.value = -999;
        b.offset += 8;
        break;
      case 7:
        f.name = NBT.getTagName(b, 0);
        f.length = 16777216 * b.data[b.offset++] + 65536 * b.data[b.offset++] + 256 * b.data[b.offset++] + b.data[b.offset++];
        f.data = new Uint8Array(f.length);
        for (c = 0; c < f.length; c++) f.data[c] = b.data[b.offset++];
        break;
      case 8:
        f.name = NBT.getTagName(b, 0);
        f.value = NBT.getTagName(b, 0);
        break;
      case 9:
        f.name = NBT.getTagName(b, 0);
        f.tagId = b.data[b.offset++];
        f.length = 16777216 * b.data[b.offset++] + 65536 * b.data[b.offset++] + 256 * b.data[b.offset++] + b.data[b.offset++];
        break;
      case 10:
        f.name = NBT.getTagName(b, 0);
        break;
      case 11:
        for (f.name = NBT.getTagName(b, 0), f.length = 16777216 * b.data[b.offset++] + 65536 * b.data[b.offset++] + 256 * b.data[b.offset++] + b.data[b.offset++], f.data = new Uint32Array(f.length), c = 0; c < f.length; c++) f.data[c] = 16777216 * b.data[b.offset++] +
          65536 * b.data[b.offset++] + 256 * b.data[b.offset++] + b.data[b.offset++]
        break;
    }
    return f
  },
  getTagName: function(b) {
    var f, c, d;
    for (f = "", c = 256 * b.data[b.offset++] + b.data[b.offset++], d = 0; d < c; d++) f += String.fromCharCode(b.data[b.offset++]);
    return f
  },
  read9: function(b, f, c) {
    var d;
    var e;
    if (10 !== b.tagId) {
      f = [0, 1, 2, 4, 8, 4, 8, 0, 0, 0, 0, 0];
      for (e = 0; e < b.length * f[b.tagId]; e++) c.offset++
    } else
      for (e = 0; e < b.length && -1 !== (d = NBT.nextTag(c));) 0 === d.type && e++, 9 === d.type && NBT.read9(d, f, c)
  },
  write0Tag: function(b) {
    b.data[b.offset++] = 0
  },
  write1Tag: function(b,
    f, c) {
    b.data[b.offset++] = 1;
    NBT.writeTagName(b, f);
    b.data[b.offset++] = c & 255
  },
  write3Tag: function(b, f, c) {
    b.data[b.offset++] = 3;
    NBT.writeTagName(b, f);
    b.data[b.offset++] = c >> 24 & 255;
    b.data[b.offset++] = c >> 16 & 255;
    b.data[b.offset++] = c >> 8 & 255;
    b.data[b.offset++] = c & 255
  },
  write7Tag: function(b, f, c) {
    b.data[b.offset++] = 7;
    NBT.writeTagName(b, f);
    b.data[b.offset++] = c.length >> 24 & 255;
    b.data[b.offset++] = c.length >> 16 & 255;
    b.data[b.offset++] = c.length >> 8 & 255;
    b.data[b.offset++] = c.length & 255;
    for (f = 0; f < c.length; f++) b.data[b.offset++] =
      c[f]
  },
  write9Tag: function(b, f, c, d) {
    b.data[b.offset++] = 9;
    NBT.writeTagName(b, f);
    b.data[b.offset++] = c;
    b.data[b.offset++] = d >> 24 & 255;
    b.data[b.offset++] = d >> 16 & 255;
    b.data[b.offset++] = d >> 8 & 255;
    b.data[b.offset++] = d & 255
  },
  write10Tag: function(b, f) {
    b.data[b.offset++] = 10;
    NBT.writeTagName(b, f)
  },
  writeTagName: function(b, f) {
    var c = f.length;
    b.data[b.offset++] = Math.floor(c / 256);
    b.data[b.offset++] = c - Math.floor(c / 256);
    var d;
    for (d = 0; d < c; d++) b.data[b.offset++] = f.charCodeAt(d);
    return f
  }
};

function Pointer() {}
Pointer.prototype.render = function() {
  var b = window.gluu.lineShader;
  gluu.gl.useProgram(b);
  mat4.identity(window.gluu.mvMatrix);
  mat4.identity(window.gluu.pMatrix);
  gluu.gl.uniformMatrix4fv(b.pMatrixUniform, !1, window.gluu.pMatrix);
  gluu.gl.uniformMatrix4fv(b.mvMatrixUniform, !1, window.gluu.mvMatrix);
  void 0 === this.vbol ? (this.vbol = gluu.gl.createBuffer(), b = new Float32Array([-0.03, 0, 0, 0, 0, 0.03, 0, 0, 0, 0, 0, -0.05, 0, 0, 0, 0, 0.05, 0, 0, 0]), this.vbol = gluu.gl.createBuffer(), gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, this.vbol), gluu.gl.bufferData(gluu.gl.ARRAY_BUFFER, b, gluu.gl.STATIC_DRAW)) : (gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER,
    this.vbol), gluu.gl.vertexAttribPointer(b.vertexPositionAttribute, 3, gluu.gl.FLOAT, !1, 20, 0), gluu.gl.vertexAttribPointer(b.lightAttribute, 4, gluu.gl.FLOAT, !1, 20, 0), gluu.gl.vertexAttribPointer(b.textureCoordAttribute, 2, gluu.gl.FLOAT, !1, 20, 12), gluu.gl.drawArrays(gluu.gl.LINES, 0, 4))
};

function SelectionBox() {}
SelectionBox.prototype.render = function(b) {
  var f = window.gluu.lineShader;
  gluu.gl.useProgram(f);
  mat4.perspective(window.gluu.pMatrix, camera.fovy, gluu.gl.viewportWidth / gluu.gl.viewportHeight, 0.1, 6e3);
  var c = camera.getMatrix();
  mat4.multiply(window.gluu.pMatrix, window.gluu.pMatrix, c);
  mat4.identity(window.gluu.mvMatrix);
  mat4.translate(window.gluu.mvMatrix, window.gluu.mvMatrix, [16 * b.chx + b.x, b.y, 16 * b.chz + b.z]);
  gluu.gl.uniformMatrix4fv(f.pMatrixUniform, !1, window.gluu.pMatrix);
  gluu.gl.uniformMatrix4fv(f.mvMatrixUniform, !1, window.gluu.mvMatrix);
  void 0 === this.vboBox ? (b = new Float32Array([0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0
  ]), this.vboBox = gluu.gl.createBuffer(), gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, this.vboBox), gluu.gl.bufferData(gluu.gl.ARRAY_BUFFER, b, gluu.gl.STATIC_DRAW)) : (gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, this.vboBox), gluu.gl.vertexAttribPointer(f.vertexPositionAttribute, 3, gluu.gl.FLOAT, !1, 20, 0), gluu.gl.vertexAttribPointer(f.lightAttribute,
    4, gluu.gl.FLOAT, !1, 20, 0), gluu.gl.vertexAttribPointer(f.textureCoordAttribute, 2, gluu.gl.FLOAT, !1, 20, 12), gluu.gl.drawArrays(gluu.gl.LINES, 0, 24))
};

var h_u_d = {};
h_u_d.gameStateHtml = null;

var chronometer = {};
chronometer.sec = 0;
chronometer.newSec = !1;
chronometer.iLag = 0;
chronometer.lastTime = 0;
chronometer.firstTime = 0;
chronometer.fps = 0;

var codeEditor = null,
  biomes, mcWorld, block, blockTexture, blockSelection, camera, initTexture = !1,
  gpuMem = 0,
  click = 0,
  useBlock = {},
  punkty1 = [],
  localFiles = {},
  pointer = new Pointer,
  selectBox = new SelectionBox;

console.log(window.settings);

function useNextBlock(b) {
  b.id === block.length - 1 && (b.id = 0);
  for (; 0 === block[++b.id].type;) b.id === block.length - 1 && (b.id = 0);
  b.data = -1;
  useNextBlockData(b)
}

function usePrevBlock(b) {
  1 === b.id && (b.id = block.length);
  for (; 0 === block[--b.id].type;) 0 === b.id && (b.id = block.length);
  b.data = -1;
  useNextBlockData(b)
}

function useNextBlockData(b) {
  var f;
  for (f = 0; 16 > f; f++) {
    if (void 0 !== block[b.id][++b.data] && void 0 !== block[b.id][b.data].shapeType && !block[b.id][b.data].hidden) return;
    16 === b.data && (b.data = -1)
  }
  b.data = 0
}

function windowResize() {
  var b = document.getElementById("webgl");
  b.width = window.innerWidth;
  b.height = window.innerHeight;
  gluu.gl.viewportWidth = b.width;
  gluu.gl.viewportHeight = b.height
}

function canvasOn() {
  document.getElementById("tools").style.display = "none";
  document.getElementById("settings").style.display = "none";
  var b = document.getElementById("webgl");
  b.onclick = function() {};
  b.requestPointerLock = b.requestPointerLock || b.mozRequestPointerLock || b.webkitRequestPointerLock;
  b.requestPointerLock()
}

function executeJS() {
  eval(codeEditor.getValue())
};
