
function RegionLib(b, f) {
    this.gameRoot = b;
    this.worldName = f;
    this.region = [];
    this.localIChunk = [];
    this.rchunk = [];
    this.iChunk = 0
}
RegionLib.prototype.getChunkBlock = function(b, f, c, d, e) {
    b = 1E4 * b + f;
    return void 0 !== this.rchunk[b] ? this.rchunk[b].getBlock(c, d, e) : {
        id: 0,
        data: 0
    }
};
RegionLib.prototype.getBlock = function(b, f, c) {
    var d = Math.floor(b / 16),
        e = Math.floor(c / 16),
        m = 1E4 * d + e,
        m = 1E4 * d + e;
    return void 0 !== this.rchunk[m] ? (b -= 16 * d, 0 > b && (b += 16), c -= 16 * e, 0 > c && (c += 16), this.rchunk[m].getBlock(b, f, c)) : {
        id: 0,
        data: 0
    }
};
RegionLib.prototype.updateChunkBlock = function(b, f, c, d, e, m, l) {
    b = 1E4 * b + f;
    void 0 !== this.rchunk[b] && this.rchunk[b].updateBlock(c, d, e, m, l)
};
RegionLib.prototype.updateBlock = function(b, f, c, d, e) {
    var m = Math.floor(b / 16),
        l = Math.floor(c / 16),
        p = 1E4 * m + l;
    void 0 !== this.rchunk[p] && (b -= 16 * m, 0 > b && (b += 16), c -= 16 * l, 0 > c && (c += 16), this.rchunk[p].updateBlock(Math.floor(b), Math.floor(f), Math.floor(c), d, e))
};
RegionLib.prototype.setBlock = function(b, f, c, d, e) {
    var m = Math.floor(b / 16),
        l = Math.floor(c / 16),
        p = 1E4 * m + l;
    void 0 !== this.rchunk[p] && (b -= 16 * m, 0 > b && (b += 16), c -= 16 * l, 0 > c && (c += 16), this.rchunk[p].setBlock(Math.floor(b), Math.floor(f), Math.floor(c), d, e))
};
RegionLib.prototype.changeChunkBlockAdd = function(b, f, c, d, e) {
    b = 1E4 * b + f;
    void 0 !== this.rchunk[b] && this.rchunk[b].changeAdd(c, d, e)
};
RegionLib.prototype.updateChunks = function() {
    var b = (new Date).getTime(),
        f = 0,
        c;
    for (c in this.rchunk) void 0 !== this.rchunk[c] && -1 !== this.rchunk[c] && -2 !== this.rchunk[c] && !0 === this.rchunk[c].needsUpdate && (this.rchunk[c].update(), f++);
    c = (new Date).getTime();
    console.log("update chunk " + (c - b) + " " + f)
};
RegionLib.prototype.deleteBuffers = function() {
    var b = (new Date).getTime(),
        f = 0,
        c;
    for (c in this.rchunk) void 0 !== this.rchunk[c] && -1 !== this.rchunk[c] && -2 !== this.rchunk[c] && !0 !== this.rchunk[c].changed && (1 === this.rchunk[c].isInit || 1 === this.rchunk[c].isInit1) && this.rchunk[c].timestamp + 1E4 < b && (this.rchunk[c].deleteBuffers(), this.rchunk[c] = void 0, f++);
    c = (new Date).getTime();
    console.log("delete buffers " + (c - b) + " " + f)
};
RegionLib.prototype.render = function() {
    if (initTexture) {
        var b = window.gluu.standardShader;
        gluu.gl.useProgram(b);
        gluu.gl.viewport(0, 0, gluu.gl.viewportWidth, gluu.gl.viewportHeight);
        gluu.gl.clearColor(settings.skyColor[0], settings.skyColor[1], settings.skyColor[2], 1);
        gluu.gl.clear(gluu.gl.COLOR_BUFFER_BIT | gluu.gl.DEPTH_BUFFER_BIT);
        mat4.perspective(window.gluu.pMatrix, camera.fovy, gluu.gl.viewportWidth / gluu.gl.viewportHeight, 0.1, 6E3);
        var f = camera.getMatrix();
        mat4.multiply(window.gluu.pMatrix, window.gluu.pMatrix, f);
        mat4.identity(window.gluu.mvMatrix);
        gluu.gl.uniformMatrix4fv(b.pMatrixUniform, !1,
            window.gluu.pMatrix);
        gluu.gl.uniformMatrix4fv(b.mvMatrixUniform, !1, window.gluu.mvMatrix);
        gluu.gl.uniform1f(b.lod, settings.distanceLevel[1]);
        gluu.gl.uniform1f(b.sun, settings.sun);
        gluu.gl.uniform1f(b.brightness, settings.brightness);
        gluu.gl.uniform4fv(b.skyColor, settings.skyColor);
        var c, d, f, e, m, l, p, q, x, A, B;
        for (c = 0, d = 0, f = 0, e = [settings.distanceLevel[0], settings.distanceLevel[1], settings.distanceLevel[2], settings.distanceLevel[2]], m = [], l = 0, p = 0, q = 0, x = camera.getPos(), A = 0; 4 > A; A++) {
            var t = Math.floor(x[0] / 16),
                a = Math.floor(x[2] / 16);
            m[0] = 0;
            m[1] = 0;
            for (B = -1; B < e[A] * e[A] * 4; B++)
                if (-1 !== B && (m = spiralLoop(B)), l = t + m[0], p = a + m[1], q = 1E4 * l + p, -1 === this.rchunk[q] || -2 === this.rchunk[q]) this.rchunk[q].timestamp = chronometer.lastTime;
                else if (c = x[0] - (16 * l + 8), d = x[2] - (16 * p + 8), f = Math.sqrt(c * c + d * d), !(f > 16 * e[A])) {
                if (64 < f) {
                    var v = camera.getTarget(),
                        v = [x[0] - v[0], x[2] - v[2]],
                        d = [-c, -d],
                        c = v[0] * d[0] + v[1] * d[1],
                        C = Math.sqrt(v[0] * v[0] + v[1] * v[1]),
                        v = Math.sqrt(d[0] * d[0] + d[1] * d[1]),
                        c = c / (C * v);
                    if (0 < c) continue;
                    c = Math.cos(camera.fovx / 1.5) + c;
                    v = Math.sqrt(2 * v * v * (1 - c));
                    if (0 < c && 16 < v) continue
                }
                void 0 === this.rchunk[q] ? 1 < chronometer.iLag &&
                    (chronometer.iLag -= 1, this.requestChunk(l, p)) : (this.rchunk[q].timestamp = chronometer.lastTime, (62 <= x[1] || 160 > f) && this.rchunk[q].render(A, b, 0), 62 > x[1] && 96 > f ? this.rchunk[q].render(A, b, 1) : 64 > f && this.rchunk[q].render(A, b, 1))
            }
        }
    }
};
RegionLib.prototype.renderSelection = function() {
    if (initTexture) {
        var b = window.gluu.selectionShader;
        gluu.gl.useProgram(b);
        gluu.gl.viewport(0, 0, gluu.gl.viewportWidth, gluu.gl.viewportHeight);
        gluu.gl.clearColor(0, 0, 0, 0);
        gluu.gl.clear(gluu.gl.COLOR_BUFFER_BIT | gluu.gl.DEPTH_BUFFER_BIT);
        mat4.perspective(window.gluu.pMatrix, camera.fovy, gluu.gl.viewportWidth / gluu.gl.viewportHeight, 0.1, 6E3);
        var f = camera.getMatrix();
        mat4.multiply(window.gluu.pMatrix, window.gluu.pMatrix, f);
        mat4.identity(window.gluu.mvMatrix);
        gluu.gl.uniformMatrix4fv(b.pMatrixUniform, !1, window.gluu.pMatrix);
        gluu.gl.uniformMatrix4fv(b.mvMatrixUniform, !1, window.gluu.mvMatrix);
        var c, d, e, m, f, l, x;
        for (c = [], d = 0, e = 0, m = 0, f = camera.getPos(), l = 0; 4 > l; l++) {
            var p = Math.floor(f[0] / 16),
                q = Math.floor(f[2] / 16);
            c[0] = 0;
            c[1] = 0;
            for (x = -1; 24 > x; x++) - 1 !== x && (c = spiralLoop(x)), d = p + c[0], e = q + c[1], m = 1E4 * d + e, -1 === this.rchunk[m] || -2 === this.rchunk[m] ? this.rchunk[m].timestamp = chronometer.lastTime : void 0 === this.rchunk[m] ? 1 < chronometer.iLag && (chronometer.iLag -= 1, this.requestChunk(d, e)) : (this.rchunk[m].timestamp = chronometer.lastTime, this.rchunk[m].render(l, b, 0), this.rchunk[m].render(l, b, 1))
        }
        q = new Uint8Array(4);
        gluu.gl.readPixels(Math.floor(gluu.gl.viewportWidth /
            2), Math.floor(gluu.gl.viewportHeight / 2), 1, 1, gluu.gl.RGBA, gluu.gl.UNSIGNED_BYTE, q);
        b = {};
        b.y = q[0];
        b.z = Math.floor(q[1] / 16);
        b.x = q[1] - 16 * b.z;
        p = Math.floor(q[2] / 10);
        b.side = q[2] - 10 * p;
        c = Math.floor(p / 5);
        d = p - 5 * c;
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
        return b
    }
};
RegionLib.prototype.testCollisions = function() {
    var b = camera.getPos(),
        f = Math.floor(b[0] / 16),
        c = Math.floor(b[2] / 16),
        d = 0;
    (new Date).getTime();
    var e, m;
    for (e = f - 1; e < f + 2; e++)
        for (m = c - 1; m < c + 2; m++)
            if (16 * e - 2 < b[0] && 16 * e + 18 > b[0] && 16 * m - 2 < b[2] && 16 * m + 18 > b[2]) {
                var l = 1E4 * e + m;
                if (-1 !== this.rchunk[l] && -2 !== this.rchunk[l]) {
                    if (void 0 === this.rchunk[l]) return !0;
                    l = this.rchunk[l].getBuffer([Math.floor(b[0] - 16 * e), Math.floor(b[1]), Math.floor(b[2] - 16 * m)]);
                    if (!1 !== l) var p = 0,
                        p = p + intersection3D.shapeIntersectsShape(l, player.shape,
                            9, 5, b),
                        d = d + p
                }
            }(new Date).getTime();
    return 0 < d ? !0 : !1
};
RegionLib.prototype.save = function() {
    var b;
    for (b in this.rchunk) void 0 !== this.rchunk[b] && -1 !== this.rchunk[b] && -2 !== this.rchunk[b] && this.rchunk[b].changed && (mcWorld.saveChunkToStorage(this.rchunk[b].xPos, this.rchunk[b].zPos), this.rchunk[b].changed = !1)
};
RegionLib.prototype.saveChunkToStorage = function(b, f) {
    var c = 1E4 * b + f;
    if (void 0 !== this.rchunk[c] && -1 !== this.rchunk[c] && -2 !== this.rchunk[c]) {
        var d = this.rchunk[c].getNBT(),
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
RegionLib.prototype.getChunkFromStorage = function(b, f) {
    var c = window.localStorage.getItem(this.gameRoot + " " + this.worldName + " " + b + " " + f);
    if (void 0 === c || null === c || "" === c) return -1;
    c = new Uint8Array(str2ab(c));
    return RegionLib.loadChunk(0, c, !0)
};
RegionLib.prototype.loadChunkFromStorage = function(b, f, c) {
    var d = mcWorld.getChunkFromStorage(b, f);
    if (-1 === d) return -1;
    if (c) return d;
    this.rchunk[1E4 * b + f] = d;
    var e = d = c = !1,
        m = !1,
        l = mcWorld.requestChunk(b + 1, f);
    void 0 === l && (m = !0); - 1 === l && (m = !0); - 2 === l && (m = !0);
    var p = mcWorld.requestChunk(b - 1, f);
    void 0 === p && (e = !0); - 1 === p && (e = !0); - 2 === p && (e = !0);
    var q = mcWorld.requestChunk(b, f + 1);
    void 0 === q && (c = !0); - 1 === q && (c = !0); - 2 === q && (c = !0);
    b = mcWorld.requestChunk(b, f - 1);
    void 0 === b && (d = !0); - 1 === b && (d = !0); - 2 === b && (d = !0);
    m || l.init2();
    e || p.init2();
    c || q.init2();
    d || b.init2()
};
RegionLib.prototype.loadRegion = function(b, f) {
    this.region[1E3 * b + f] = {};
    this.region[1E3 * b + f].loaded = -2;
    if (void 0 !== window.threadsCode) var c = new Blob([threadsCode.loadRegionThread], {
            type: "application/javascript"
        }),
        c = new Worker(window.URL.createObjectURL(c));
    else c = new Worker("threads/loadRegionThread.js");
    c.regionLib = this;
    c.region = this.region[1E3 * b + f];
    c.onmessage = function(b) {
        this.regionLib.regionLoaded(b)
    };
    c.onerror = function(b) {
        this.region.loaded = -1
    };
    var d = this.gameRoot + "/" + this.worldName + "/region/r." +
        b + "." + f + ".mca",
        e = "";
    if (-1 === this.gameRoot.indexOf(":")) {
        var e = document.location.href.split(/\?|#/)[0],
            m = e.indexOf("index"); - 1 !== m && (e = e.substring(0, m))
    }
    console.log(e + d);
    c.postMessage({
        x: b,
        y: f,
        name: e + d
    })
};
RegionLib.prototype.regionLoaded = function(b) {
    var f = b.data.x,
        c = b.data.y;
    if (1 !== b.data.loaded) f = this.region[1E3 * f + c], f.loaded = -1;
    else if (b = new Uint8Array(b.data.data), 1E3 > b.length) f = this.region[1E3 * f + c], f.loaded = -1;
    else {
        f = this.region[1E3 * f + c];
        f.regionData = b;
        f.loaded = 0;
        f.chunkPos = [];
        f.chunkLen = [];
        var d;
        for (d = c = 0; 4096 > c; c += 4, d++) f.chunkPos[d] = 65536 * b[c] + 256 * b[c + 1] + b[c + 2], f.chunkLen[d] = b[c + 3]
    }
};
RegionLib.prototype.loadRegionFile = function(b, f) {
    try {
        var c = Readfile.readRAW(f)
    } catch (d) {
        console.log("nie ma pliku");
        return
    }
    b.regionData = c;
    b.loaded = 0;
    b.chunkPos = [];
    b.chunkLen = [];
    var e, m;
    for (e = 0, m = 0; 4096 > e; e += 4, m++) b.chunkPos[m] = 65536 * c[e] + 256 * c[e + 1] + c[e + 2], b.chunkLen[m] = c[e + 3]
};
RegionLib.prototype.requestChunk = function(b, f) {
    var c = 1E4 * b + f;
    if (void 0 !== this.rchunk[c]) return this.rchunk[c];
    if (1 !== this.localIChunk[c]) {
        var d = -1;
        this.localIChunk[c] = 1;
        if (-1 !== (d = this.loadChunkFromStorage(b, f, !0))) return this.rchunk[c] = d
    }
    var d = Math.floor(b / 32),
        e = Math.floor(f / 32);
    void 0 === this.region[1E3 * d + e] && this.loadRegion(d, e);
    if (-1 === this.region[1E3 * d + e].loaded) return this.rchunk[c] = -1;
    if (-2 === this.region[1E3 * d + e].loaded) return -2;
    if (0 === this.region[1E3 * d + e].loaded) {
        var m = b % 32;
        0 > m && (m += 32);
        var l =
            f % 32;
        0 > l && (l += 32);
        m += 32 * l;
        if (0 < this.region[1E3 * d + e].chunkPos[m]) return console.log("chunk " + c + " : " + this.region[1E3 * d + e].chunkPos[m] + " " + this.region[1E3 * d + e].chunkLen[m]), this.iChunk++, this.rchunk[c] = RegionLib.loadChunk(4096 * this.region[1E3 * d + e].chunkPos[m], this.region[1E3 * d + e].regionData, !0), this.rchunk[c];
        this.rchunk[c] = -1
    }
};
RegionLib.loadChunk = function(b, f, c) {
    var d = {},
        e = new Chunk;
    d.offset = 0;
    try {
        if (c) {
            var m = new Zlib.Inflate(f, {
                index: b + 5
            });
            d.data = m.decompress()
        } else d.data = f
    } catch (l) {
        return console.log("fail"), -1
    }
    for (f = 0; 2E3 > f && -1 !== (b = NBT.nextTag(d)); f++) {
        switch (b.name) {
            case "xPos":
                e.xPos = b.value;
                break;
            case "zPos":
                e.zPos = b.value;
                break;
            case "HeightMap":
                e.heightMap = b.data;
                break;
            case "Biomes":
                e.biomes = b.data;
                break;
            case "LightPopulated":
                e.lightPopulated = b.value;
                break;
            case "Sections":
                RegionLib.readSections(b, e, d);
                continue
                break;
        }
        9 ===
            b.type && NBT.read9(b, e, d)
    }
    void 0 === e.heightMap && e.initHeightMap();
    return e
};
RegionLib.readSections = function(b, f, c) {
    var d, e, m;
    for (d = {}, m = 0; m < b.length && -1 !== (e = NBT.nextTag(c));) switch (0 === e.type && (void 0 === d.add && (d.add = new Uint8Array(2048)), f.section[d.y] = d, d = {}, m++), e.name) {
        case "Y":
            d.y = e.value;
            break;
        case "Blocks":
            d.blocks = e.data;
            break;
        case "SkyLight":
            d.skyLight = e.data;
            break;
        case "BlockLight":
            d.blockLight = e.data;
            break;
        case "Add":
            d.add = e.data;
            break;
        case "Data":
            d.data = e.data
            break;
    }
};
