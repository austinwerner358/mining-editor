function Chunk() {
  this.section = [];
  this.isInit1 = this.isInit = 0;
  this.visible = !0;
  this.changed = !1;
  this.ivbo = [];
  this.vbo = [];
  this.needsUpdate = !1;
  this.timestamp = (new Date).getTime()
}
Chunk.stairsData = [];
Chunk.stairsData["20xx2"] = "0001";
Chunk.stairsData["21x2x"] = "0010";
Chunk.stairsData["11x2x"] = "0010";
Chunk.stairsData["1x13x"] = "1000";
Chunk.stairsData["3x0x3"] = "0100";
Chunk.stairsData["3x13x"] = "1000";
Chunk.stairsData["00xx2"] = "0001";
Chunk.stairsData["0x0x3"] = "0100";
Chunk.stairsData["31xx3"] = "1110";
Chunk.stairsData["30x3x"] = "1101";
Chunk.stairsData["00x3x"] = "1101";
Chunk.stairsData["0x02x"] = "0111";
Chunk.stairsData["2x1x2"] = "1011";
Chunk.stairsData["2x02x"] = "0111";
Chunk.stairsData["11xx3"] = "1110";
Chunk.stairsData["1x1x2"] = "1011";
Chunk.stairsData["64xx6"] = "0001";
Chunk.stairsData["65x6x"] = "0010";
Chunk.stairsData["55x6x"] = "0010";
Chunk.stairsData["5x57x"] = "1000";
Chunk.stairsData["7x4x7"] = "0100";
Chunk.stairsData["7x57x"] = "1000";
Chunk.stairsData["44xx6"] = "0001";
Chunk.stairsData["4x4x7"] = "0100";
Chunk.stairsData["75xx7"] = "1110";
Chunk.stairsData["74x7x"] = "1101";
Chunk.stairsData["44x7x"] = "1101";
Chunk.stairsData["4x46x"] = "0111";
Chunk.stairsData["6x5x6"] = "1011";
Chunk.stairsData["6x46x"] = "0111";
Chunk.stairsData["55xx7"] = "1110";
Chunk.stairsData["5x5x6"] = "1011";
Chunk.cacheSlight = new Float32Array(83592);
Chunk.cacheBlight = new Float32Array(83592);
Chunk.cacheData = new Float32Array(83592);
Chunk.cacheId = new Float32Array(83592);
Chunk.cacheBlock = new Float32Array(5832);
Chunk.cacheHeightMap9 = new Uint8Array(2304);
Chunk.cacheHeightMap9hMax = new Uint8Array(2304);
Chunk.cacheSlight9 = new Uint8Array(594432);
Chunk.cacheBlight9 = new Uint8Array(594432);
Chunk.cacheId9 = new Int32Array(594432);

Chunk.prototype.initHeightMap = function() {
  var b = 0;
  this.heightMap = new Uint32Array(256);
  var f, c, d, e;
  for (f = 0; 16 > f; f++)
    for (c = 0; 16 > c; c++)
      for (d = 255, e = 15; 0 < d; d--, e--) {
        if (0 === (d - 15) % 16) {
          var m = this.section[(d - 15) / 16],
            e = 15;
          if (void 0 === m) {
            d -= 15;
            e = 16;
            continue
          }
        }
        b = 256 * e + 16 * f + c;
        if (1 !== blockConfig.lightTransmission[m.blocks[b]]) {
          this.heightMap[16 * f + c] = d + 1;
          break
        }
      }
};
Chunk.prototype.refreshLight = function(b, f) {
  var c = 0,
    d = 0,
    e = 0,
    m = 0,
    l = 0,
    p = 0,
    q = m = c = 0,
    x = (new Date).getTime();
  f = f || !1;
  this.initHeightMap();
  if (!this.getCacheL9()) return !1;
  var d, A, t, a, B, v, C, u, w, F, C, r;
  for (d = blockConfig.lightSource, A = blockConfig.lightTransmission, t = Chunk.cacheSlight9, a = Chunk.cacheBlight9, B = Chunk.cacheId9, v = 256, C = c = 0, u = 0, w = 0; 48 > w; w++)
    for (F = 0; 48 > F; F++) {
      u = Chunk.cacheHeightMap9[48 * w + F];
      u > c && (c = u);
      u < v && (v = u);
      for (C = 0, r = -1; 1 >= r; r++)
        for (q = -1; 1 >= q; q++) 0 > w + r || 0 > F + q || 47 < w + r || 47 < F + q || (u = Chunk.cacheHeightMap9[48 * (w + r) + (F + q)], u > C && (C =
          u));
      Chunk.cacheHeightMap9hMax[48 * w + F] = C + 1
    }
  for (w = 2; 46 > w; w++)
    for (F = 2; 46 > F; F++) {
      for (u = Chunk.cacheHeightMap9hMax[48 * w + F]; u >= Chunk.cacheHeightMap9[48 * w + F]; u--) q = 2304 * u + 48 * w + F, t[q] = 15;
      for (C = 15; 0 <= u; u--) q = 2304 * u + 48 * w + F, C *= A[B[q]], t[q] = C, 0 < C && u < v && (v = u)
    }
  for (w = 0; 48 > w; w++)
    for (u = 0; 255 > u; u++)
      if (q = 2304 * u + 48 * w + 1, 0 < t[q] && u < v) {
        v = u;
        break
      }
  for (w = 0; 48 > w; w++)
    for (u = 0; 255 > u; u++)
      if (q = 2304 * u + 48 * w + 46, 0 < t[q] && u < v) {
        v = u;
        break
      }
  for (F = 0; 48 > F; F++)
    for (u = 0; 255 > u; u++)
      if (q = 2304 * u + 48 + F, 0 < t[q] && u < v) {
        v = u;
        break
      }
  for (F = 0; 48 > F; F++)
    for (u = 0; 255 >
      u; u++)
      if (q = 2304 * u + 2208 + F, 0 < t[q] && u < v) {
        v = u;
        break
      }
  v--;
  1 > v && (v = 1); - 1 === b ? (r = 0, q = 256) : (r = b - 16, 0 > r && (r = 0), q = b + 16, 256 < q && (q = 256));
  C = 255;
  e = 0;
  for (w = 2; 46 > w; w++)
    for (F = 2; 46 > F; F++)
      for (u = r + 1; u < q - 1; u++) c = 2304 * u + 48 * w + F, a[c] = d[B[c]], 0 < a[c] && u < C && (C = u), 0 < a[c] && u > e && (e = u);
  u = !1;
  if (-1 === b) r = C - 16, 0 > r && (r = 0), q = e + 16, 256 < q && (q = 256), u = !0;
  else
    for (c = 2304 * r; c < 2304 * q; c++)
      if (0 < a[c]) {
        u = !0;
        break
      }
  w = (new Date).getTime();
  console.log("czas L0 " + (w - x));
  x = (new Date).getTime();
  var s;
  if (u)
    for (s = 0; 14 > s; s++)
      for (w = 1; 47 > w; w++)
        for (F = 1; 47 > F; F++)
          for (u =
            r; u < q; u++) c = 2304 * u + 48 * w + F, C = a[c] - 1, 1 > C || (d = c + 48, e = c - 48, m = c - 1, l = c + 1, p = c + 2304, c -= 2304, C * A[B[c]] > a[c] && (a[c] = C * A[B[c]]), C * A[B[p]] > a[p] && (a[p] = C * A[B[p]]), C * A[B[d]] > a[d] && (a[d] = C * A[B[d]]), C * A[B[e]] > a[e] && (a[e] = C * A[B[e]]), C * A[B[m]] > a[m] && (a[m] = C * A[B[m]]), C * A[B[l]] > a[l] && (a[l] = C * A[B[l]]));
  w = (new Date).getTime();
  console.log("czas L1 " + (w - x));
  x = (new Date).getTime();
  for (s = 0; 14 > s; s++)
    for (w = 1; 47 > w; w++)
      for (F = 1; 47 > F; F++)
        for (u = v; u < Chunk.cacheHeightMap9hMax[48 * w + F]; u++) c = 2304 * u + 48 * w + F, C = t[c] - 1, 1 > C || (d = c + 48, e = c - 48,
          m = c - 1, l = c + 1, p = c + 2304, c -= 2304, C * A[B[c]] > t[c] && (t[c] = C * A[B[c]]), C * A[B[p]] > t[p] && (t[p] = C * A[B[p]]), C * A[B[d]] > t[d] && (t[d] = C * A[B[d]]), C * A[B[e]] > t[e] && (t[e] = C * A[B[e]]), C * A[B[m]] > t[m] && (t[m] = C * A[B[m]]), C * A[B[l]] > t[l] && (t[l] = C * A[B[l]]));
  w = (new Date).getTime();
  console.log("czas L2 " + (w - x));
  x = (new Date).getTime();
  A = [];
  for (r = -1; 1 >= r; r++)
    for (q = -1; 1 >= q; q++)
      if (A[3 * (r + 1) + q + 1] = mcWorld.requestChunk(this.xPos + r, this.zPos + q), -2 === A[3 * (r + 1) + q + 1]) return !1;
  B = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  C = [0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  f && (B = [0, 1, 0, 1, 1, 1, 0, 1, 0]);
  for (d = 0; 2 >= d; d++)
    for (e = 0; 2 >= e; e++)
      if (!f || 1 === d || 1 === e)
        if (v = A[3 * d + e], void 0 !== v && -1 !== v) {
          for (u = r = 0; 256 > r; r++, u++) {
            if (0 === r % 16) {
              var n = v.section[r / 16],
                u = 0;
              if (void 0 === n) {
                r += 15;
                u = -1;
                continue
              }
              f || (c[r / 16] = jenkins_hash(n.skyLight), C[r / 16] = jenkins_hash(n.blockLight))
            }
            for (w = 0; 16 > w; w++)
              for (F = 0; 16 > F; F += 2) m = (256 * u + 16 * w + F) / 2, q = 2304 * r + 48 * (16 * e + w) + (16 * d + F), n.skyLight[m] = t[q] + (t[q + 1] << 4), n.blockLight[m] = a[q] + (a[q + 1] << 4)
          }
          u = 0;
          if (!f)
            for (r = 0; 16 > r; r++)
              if (void 0 !==
                v.section[r]) {
                u = jenkins_hash(v.section[r].skyLight);
                if (c[r] !== u) {
                  B[3 * d + e] = 1;
                  break
                }
                u = jenkins_hash(v.section[r].blockLight);
                if (C[r] !== u) {
                  B[3 * d + e] = 1;
                  break
                }
              }
        }
  w = (new Date).getTime();
  console.log("czas L3 " + (w - x));
  return B
};
Chunk.prototype.getBiomeColor1 = function(b, f, c) {
  var d, e, m, l;
  l = this.cacheBiomes[18 * (f + 0) + b + 0];
  d = biomes[l].colorR[c];
  e = biomes[l].colorG[c];
  m = biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 0) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 0];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  return d = 65536 * Math.floor(d / 4) + 256 * Math.floor(e /
    4) + Math.floor(m / 4)
};
Chunk.prototype.getBiomeColor2 = function(b, f, c) {
  var d, e, m, l;
  l = this.cacheBiomes[18 * (f + 0) + b + 2];
  d = biomes[l].colorR[c];
  e = biomes[l].colorG[c];
  m = biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 0) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 2];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  return d = 65536 * Math.floor(d / 4) + 256 * Math.floor(e /
    4) + Math.floor(m / 4)
};
Chunk.prototype.getBiomeColor3 = function(b, f, c) {
  var d, e, m, l;
  l = this.cacheBiomes[18 * (f + 2) + b + 2];
  d = biomes[l].colorR[c];
  e = biomes[l].colorG[c];
  m = biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 2) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 2];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  return d = 65536 * Math.floor(d / 4) + 256 * Math.floor(e /
    4) + Math.floor(m / 4)
};
Chunk.prototype.getBiomeColor4 = function(b, f, c) {
  var d, e, m, l;
  l = this.cacheBiomes[18 * (f + 2) + b + 0];
  d = biomes[l].colorR[c];
  e = biomes[l].colorG[c];
  m = biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 2) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 0];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  return d = 65536 * Math.floor(d / 4) + 256 * Math.floor(e /
    4) + Math.floor(m / 4)
};
Chunk.prototype.getBiomeColor = function(b, f, c) {
  var d, e, m, l;
  l = this.cacheBiomes[18 * (f + 2) + b + 2];
  d = biomes[l].colorR[c];
  e = biomes[l].colorG[c];
  m = biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 0) + b + 0];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 2) + b + 0];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 0) + b + 2];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 2];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 1) + b + 0];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 2) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  l = this.cacheBiomes[18 * (f + 0) + b + 1];
  d += biomes[l].colorR[c];
  e += biomes[l].colorG[c];
  m += biomes[l].colorB[c];
  return d = 65536 * Math.floor(d / 8) + 256 * Math.floor(e / 8) + Math.floor(m / 8)
};
Chunk.prototype.getBlock = function(b, f, c) {
  if (-1 === this.isInit) return {
    id: 0,
    data: 0
  };
  var d = Math.floor(f / 16);
  b = 256 * (f - 16 * d) + 16 * c + b;
  if (void 0 === this.section[d]) return {
    id: 0,
    data: 0
  };
  f = this.section[d].blocks[b];
  c = 0;
  c = 0 === b % 2 ? this.section[d].data[b / 2] & 15 : (this.section[d].data[b / 2 - 0.5] & 240) >> 4;
  return {
    id: f,
    data: c
  }
};
Chunk.prototype.getNBT = function(b) {
  b = {
    offset: 0
  };
  b.data = new Uint8Array(5E5);
  NBT.write10Tag(b, "");
  NBT.write10Tag(b, "Level");
  NBT.write3Tag(b, "xPos", this.xPos);
  NBT.write3Tag(b, "zPos", this.zPos);
  NBT.write7Tag(b, "Biomes", this.biomes);
  NBT.write9Tag(b, "Sections", 10, this.section.length);
  var f;
  for (f = 0; f < this.section.length; f++) NBT.write1Tag(b, "Y", this.section[f].y), NBT.write7Tag(b, "Data", this.section[f].data), NBT.write7Tag(b, "SkyLight", this.section[f].skyLight), NBT.write7Tag(b, "BlockLight", this.section[f].blockLight),
    NBT.write7Tag(b, "Blocks", this.section[f].blocks), NBT.write0Tag(b);
  NBT.write0Tag(b);
  NBT.write0Tag(b);
  return new Uint8Array(b.data.buffer, 0, b.offset)
};
Chunk.prototype.newSection = function(b) {
  this.section[b] = {};
  this.section[b].y = b;
  this.section[b].blocks = new Uint32Array(4096);
  this.section[b].skyLight = new Uint32Array(2048);
  var f;
  for (f = 0; 2048 > f; f++) this.section[b].skyLight[f] = 255;
  this.section[b].blockLight = new Uint32Array(2048);
  this.section[b].data = new Uint32Array(2048);
  this.section[b].add = new Uint32Array(2048)
};
Chunk.prototype.changeAdd = function(b, f, c) {
  if (-1 !== this.isInit) {
    var d = Math.floor(f / 16);
    b = 256 * (f - 16 * d) + 16 * c + b;
    f = 0;
    c = b % 2;
    void 0 === this.section[d] && this.newSection(d);
    f = 0 === c ? this.section[d].add[b / 2] & 15 : this.section[d].add[b / 2 - 0.5] >> 4 & 15;
    f++;
    10 === f && (f = 0);
    0 === c ? this.section[d].add[b / 2] = (this.section[d].add[b / 2] & 240) + f : this.section[d].add[b / 2 - 0.5] = (this.section[d].add[b / 2 - 0.5] & 15) + (f << 4);
    this.init2(0);
    this.init2(1)
  }
};
Chunk.prototype.updateBlock = function(b, f, c, d, e) {
  if (-1 !== this.isInit) {
    var m = (new Date).getTime();
    this.changed = !0;
    var m = Math.floor(f / 16),
      l = 256 * (f - 16 * m) + 16 * c + b;
    void 0 === this.section[m] && this.newSection(m);
    this.section[m].blocks[l] = d;
    var p = l % 2;
    0 === p ? (this.section[m].data[l / 2] = (this.section[m].data[l / 2] & 240) + e, this.section[m].add[l / 2] &= 240) : (this.section[m].data[l / 2 - 0.5] = (this.section[m].data[l / 2 - 0.5] & 15) + (e << 4), this.section[m].add[l / 2 - 0.5] &= 15);
    var q = 0;
    if (0 === blockConfig[d].type || 2 === blockConfig[d].type || 3 === blockConfig[d].type ||
      4 === blockConfig[d].type) {
      var q = this.getSunLightValue(b, f + 1, c),
        x = 0;
      for (d = -1; 1 >= d; d++)
        for (e = -1; 1 >= e; e++) 0 !== d && 0 !== e || 0 > b + d || 15 < b + d || 0 > c + e || 15 < c + e || (x = this.getSunLightValue(b + d, f, c + e), x - 1 > q && (q = x - 1))
    }
    0 === p ? this.section[m].skyLight[l / 2] = (this.section[m].skyLight[l / 2] & 240) + q : this.section[m].skyLight[l / 2 - 0.5] = (this.section[m].skyLight[l / 2 - 0.5] & 15) + (q << 4);
    f = this.refreshLight(f);
    f[4] = 1;
    0 === c && (f[3] = 1);
    15 === c && (f[5] = 1);
    0 === b && (f[1] = 1);
    15 === b && (f[7] = 1);
    m = (new Date).getTime();
    for (d = -1; 1 >= d; d++)
      for (e = -1; 1 >= e; e++) 0 !==
        f[3 * (d + 1) + e + 1] && (b = mcWorld.requestChunk(this.xPos + d, this.zPos + e), void 0 !== b && -1 !== b && -2 !== b && (b.changed = !0, b.init2(0), b.init2(1)));
    b = (new Date).getTime();
    console.log("czas chunk " + (b - m))
  }
};
Chunk.prototype.update = function() {
  if (-1 !== this.isInit) {
    var b = this.refreshLight(-1);
    b[4] = 1;
    var f, c, d, e;
    for (f = (new Date).getTime(), d = -1; 1 >= d; d++)
      for (e = -1; 1 >= e; e++) 0 !== b[3 * (d + 1) + e + 1] && (c = mcWorld.requestChunk(this.xPos + d, this.zPos + e), void 0 !== c && -1 !== c && -2 !== c && (c.changed = !0, c.init2(0), c.init2(1)));
    this.needsUpdate = !1;
    b = (new Date).getTime();
    console.log("czas chunk " + (b - f))
  }
};
Chunk.prototype.getSunLightValue = function(b, f, c) {
  var d = Math.floor(f / 16);
  f -= 16 * d;
  void 0 === this.section[d] && this.newSection(d);
  b = 256 * f + 16 * c + b;
  return 16 > d ? 0 === b % 2 ? this.section[d].skyLight[b / 2] & 15 : this.section[d].skyLight[b / 2 - 0.5] >> 4 & 15 : 16
};
Chunk.prototype.render = function(b, f, c) {
  if (this.visible && (0 !== c || -1 !== this.isInit) && (1 !== c || -1 !== this.isInit1)) {
    if (0 === c && 0 === this.isInit)
      if (1 < chronometer.iLag) {
        if (chronometer.iLag -= 1, !this.init2(0, !0)) return
      } else return;
    if (1 === c && 0 === this.isInit1)
      if (1 < chronometer.iLag) {
        if (chronometer.iLag -= 1, !this.init2(1, !0)) return
      } else return;
    gluu.gl.bindTexture(gluu.gl.TEXTURE_2D, blockTexture);
    void 0 !== this.vbo[c] && void 0 !== this.vbo[c][b] && (gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, this.vbo[c][b]), gluu.gl.vertexAttribPointer(f.vertexPositionAttribute, 3, gluu.gl.FLOAT, !1, 36, 0), gluu.gl.vertexAttribPointer(f.textureCoordAttribute,
      2, gluu.gl.FLOAT, !1, 36, 12), gluu.gl.vertexAttribPointer(f.lightAttribute, 4, gluu.gl.FLOAT, !1, 36, 20), gluu.gl.drawArrays(gluu.gl.TRIANGLES, 0, this.ivbo[c][b] / 9))
  }
};
Chunk.prototype.deleteBuffers = function() {
  this.isInit1 = this.isInit = 0;
  void 0 !== this.vbo && (void 0 !== this.vbo[0] && (this.vbo[0].forEach(function(b) {
    gluu.gl.deleteBuffer(b)
  }), this.ivbo[0].forEach(function(b) {
    gpuMem -= b
  })), void 0 !== this.vbo[1] && (this.vbo[1].forEach(function(b) {
    gluu.gl.deleteBuffer(b)
  }), this.ivbo[1].forEach(function(b) {
    gpuMem -= b
  })))
};
Chunk.prototype.getCache = function(b, f) {
  var c = 0,
    d = 0,
    e = 0;
  this.cacheBiomes = new Float32Array(324);
  this.cacheHeightMap = new Int32Array(324);
  var m = Chunk.cacheSlight,
    l = Chunk.cacheBlight,
    p = Chunk.cacheData,
    q = Chunk.cacheId,
    x = d = !1,
    A = !1,
    t = !1,
    a = mcWorld.requestChunk(this.xPos + 1, this.zPos);
  void 0 === a && (t = !0); - 1 === a && (t = !0);
  if (-2 === a) return !1;
  var B = mcWorld.requestChunk(this.xPos - 1, this.zPos);
  void 0 === B && (A = !0); - 1 === B && (A = !0);
  if (-2 === B) return !1;
  var v = mcWorld.requestChunk(this.xPos, this.zPos + 1);
  void 0 === v && (d = !0); - 1 ===
    v && (d = !0);
  if (-2 === v) return !1;
  var C = mcWorld.requestChunk(this.xPos, this.zPos - 1);
  void 0 === C && (x = !0); - 1 === C && (x = !0);
  if (-2 === C) return !1;
  var u, w;
  for (u = 0; 16 > u; u++)
    for (w = 0; 16 > w; w++) e = 0 + 18 * (u + 1) + (w + 1), q[e] = 1, m[e] = 0, l[e] = 0, e = 83268 + 18 * (u + 1) + (w + 1), q[e] = 0, m[e] = 15, l[e] = 0;
  var F = b - 1;
  0 > F && (F = 0);
  var r = f + 1;
  256 < r && (r = 256);
  var s, n;
  for (s = F, n = 0; s < r; s++, n++) {
    for (w = 0; 18 > w; w++) e = 324 * (s + 1) + 0 + w, q[e] = 1, e = 324 * (s + 1) + 306 + w, q[e] = 1;
    for (u = 0; 18 > u; u++) e = 324 * (s + 1) + 18 * u + 0, q[e] = 1, e = 324 * (s + 1) + 18 * u + 17, q[e] = 1
  }
  for (n = 0; 16 > n; n++)
    for (u = 0; 16 > u; u++) this.cacheBiomes[18 *
      (n + 1) + u + 1] = this.biomes[16 * n + u], this.cacheHeightMap[18 * (n + 1) + u + 1] = this.heightMap[16 * n + u];
  for (n = 0; 16 > n; n++) this.cacheBiomes[18 * (n + 1) + 0] = this.cacheBiomes[18 * (n + 1) + 1], this.cacheHeightMap[18 * (n + 1) + 0] = this.cacheHeightMap[18 * (n + 1) + 1], this.cacheBiomes[18 * (n + 1) + 17] = this.cacheBiomes[18 * (n + 1) + 16], this.cacheHeightMap[18 * (n + 1) + 17] = this.cacheHeightMap[18 * (n + 1) + 16], this.cacheBiomes[306 + (n + 1)] = this.cacheBiomes[288 + (n + 1)], this.cacheHeightMap[306 + (n + 1)] = this.cacheHeightMap[288 + (n + 1)], this.cacheBiomes[0 + (n + 1)] = this.cacheBiomes[18 +
    (n + 1)], this.cacheHeightMap[0 + (n + 1)] = this.cacheHeightMap[18 + (n + 1)];
  if (!d) {
    s = F;
    for (n = 0; s < r; s++, n++) {
      if (0 === s % 16) {
        var L = v.section[s / 16],
          n = 0;
        if (void 0 === L) {
          for (n = s; n < s + 15; n++)
            for (w = 0; 16 > w; w++) e = 324 * (n + 1) + 306 + (w + 1), q[e] = 0, m[e] = 15, l[e] = 0;
          s += 15;
          n = -1;
          continue
        }
      }
      for (w = 0; 16 > w; w++) d = 256 * n + 0 + w, e = 324 * (s + 1) + 306 + (w + 1), q[e] = L.blocks[d], c = d % 2, m[e] = L.skyLight[d / 2 - c / 2] >> 4 * c & 15, l[e] = L.blockLight[d / 2 - c / 2] >> 4 * c & 15, p[e] = L.data[d / 2 - c / 2] >> 4 * c & 15 & blockConfig[L.blocks[d]].mask
    }
    for (n = 0; 16 > n; n++) this.cacheBiomes[306 + (n + 1)] = v.biomes[0 +
      n], this.cacheHeightMap[306 + (n + 1)] = v.heightMap[0 + n]
  }
  if (!x) {
    s = F;
    for (n = 0; s < r; s++, n++) {
      if (0 === s % 16 && (L = C.section[s / 16], n = 0, void 0 === L)) {
        for (n = s; n < s + 15; n++)
          for (w = 0; 16 > w; w++) e = 324 * (n + 1) + 0 + (w + 1), q[e] = 0, m[e] = 15, l[e] = 0;
        s += 15;
        n = -1;
        continue
      }
      for (w = 0; 16 > w; w++) d = 256 * n + 240 + w, e = 324 * (s + 1) + 0 + (w + 1), q[e] = L.blocks[d], c = d % 2, m[e] = L.skyLight[d / 2 - c / 2] >> 4 * c & 15, l[e] = L.blockLight[d / 2 - c / 2] >> 4 * c & 15, p[e] = L.data[d / 2 - c / 2] >> 4 * c & 15 & blockConfig[L.blocks[d]].mask
    }
    for (n = 0; 16 > n; n++) this.cacheBiomes[0 + (n + 1)] = C.biomes[240 + n], this.cacheHeightMap[0 +
      (n + 1)] = C.heightMap[240 + n]
  }
  if (!A) {
    s = F;
    for (n = 0; s < r; s++, n++) {
      if (0 === s % 16 && (L = B.section[s / 16], n = 0, void 0 === L)) {
        for (n = s; n < s + 15; n++)
          for (u = 0; 16 > u; u++) e = 324 * (n + 1) + 18 * (u + 1) + 0, q[e] = 0, m[e] = 15, l[e] = 0;
        s += 15;
        n = -1;
        continue
      }
      for (u = 0; 16 > u; u++) d = 256 * n + 16 * u + 15, e = 324 * (s + 1) + 18 * (u + 1) + 0, q[e] = L.blocks[d], c = d % 2, m[e] = L.skyLight[d / 2 - c / 2] >> 4 * c & 15, l[e] = L.blockLight[d / 2 - c / 2] >> 4 * c & 15, p[e] = L.data[d / 2 - c / 2] >> 4 * c & 15 & blockConfig[L.blocks[d]].mask
    }
    for (n = 0; 16 > n; n++) this.cacheBiomes[18 * (n + 1) + 0] = B.biomes[16 * n + 15], this.cacheHeightMap[18 * (n + 1) +
      0] = B.heightMap[16 * n + 15]
  }
  if (!t) {
    s = F;
    for (n = 0; s < r; s++, n++) {
      if (0 === s % 16 && (L = a.section[s / 16], n = 0, void 0 === L)) {
        for (n = s; n < s + 15; n++)
          for (u = 0; 16 > u; u++) e = 324 * (n + 1) + 18 * (u + 1) + 17, q[e] = 0, m[e] = 15, l[e] = 0;
        s += 15;
        n = -1;
        continue
      }
      for (u = 0; 16 > u; u++) d = 256 * n + 16 * u + 0, e = 324 * (s + 1) + 18 * (u + 1) + 17, q[e] = L.blocks[d], c = d % 2, m[e] = L.skyLight[d / 2 - c / 2] >> 4 * c & 15, l[e] = L.blockLight[d / 2 - c / 2] >> 4 * c & 15, p[e] = L.data[d / 2 - c / 2] >> 4 * c & 15 & blockConfig[L.blocks[d]].mask
    }
    for (n = 0; 16 > n; n++) this.cacheBiomes[18 * (n + 1) + 17] = a.biomes[16 * n + 0], this.cacheHeightMap[18 * (n + 1) + 17] =
      a.heightMap[16 * n + 0]
  }
  s = F;
  for (n = 0; s < r; s++, n++) {
    if (0 === s % 16 && (L = this.section[s / 16], n = 0, void 0 === L)) {
      for (u = 0; 16 > u; u++)
        for (w = 0; 16 > w; w++) e = 324 * (s + 1) + 18 * (u + 1) + (w + 1), q[e] = 0, m[e] = 15, l[e] = 0, e = 324 * (s + 16) + 18 * (u + 1) + (w + 1), q[e] = 0, m[e] = 15, l[e] = 0;
      q[324 * (s + 2) + 19] = -1;
      s += 15;
      n = -1;
      continue
    }
    for (u = 0; 16 > u; u++)
      for (w = 0; 16 > w; w += 2) d = 256 * n + 16 * u + w, e = 324 * (s + 1) + 18 * (u + 1) + (w + 1), q[e] = L.blocks[d], q[e + 1] = L.blocks[d + 1], x = L.data[d / 2], p[e] = x & 15 & blockConfig[L.blocks[d]].mask, p[e + 1] = x >> 4 & 15 & blockConfig[L.blocks[d + 1]].mask, x = L.skyLight[d / 2], m[e] = x & 15,
        m[e + 1] = x >> 4 & 15, x = L.blockLight[d / 2], l[e] = x & 15, l[e + 1] = x >> 4 & 15
  }
  for (s = F; s < r; s++) m[324 * (s + 1) + 0] = Math.floor((m[324 * (s + 1) + 18] + m[324 * (s + 1) + 1]) / 2), m[324 * (s + 1) + 306] = Math.floor((m[324 * (s + 1) + 288] + m[324 * (s + 1) + 307]) / 2), m[324 * (s + 1) + 17] = Math.floor((m[324 * (s + 1) + 35] + m[324 * (s + 1) + 16]) / 2), m[324 * (s + 1) + 323] = Math.floor((m[324 * (s + 1) + 305] + m[324 * (s + 1) + 322]) / 2), l[324 * (s + 1) + 0] = Math.floor((l[324 * (s + 1) + 18] + l[324 * (s + 1) + 1]) / 2), l[324 * (s + 1) + 306] = Math.floor((l[324 * (s + 1) + 288] + l[324 * (s + 1) + 307]) / 2), l[324 * (s + 1) + 17] = Math.floor((l[324 * (s +
    1) + 35] + l[324 * (s + 1) + 16]) / 2), l[324 * (s + 1) + 323] = Math.floor((l[324 * (s + 1) + 305] + l[324 * (s + 1) + 322]) / 2);
  return !0
};
Chunk.prototype.getCacheL9 = function() {
  var b, f, c, d, e, m, l;
  for (b = 0, f = 0, c = Chunk.cacheSlight9, d = Chunk.cacheBlight9, e = Chunk.cacheId9, m = [], l = -1; 1 >= l; l++)
    for (b = -1; 1 >= b; b++)
      if (m[3 * (l + 1) + b + 1] = mcWorld.requestChunk(this.xPos + l, this.zPos + b), -2 === m[3 * (l + 1) + b + 1]) return !1;
  var p, q;
  for (p = 0; 48 > p; p++)
    for (q = 0; 48 > q; q++) f = 48 * p + q, e[f] = 1, c[f] = 0, d[f] = 0, f = 592128 + 48 * p + q, e[f] = 0, c[f] = 15, d[f] = 0, f = 589824 + 48 * p + q, e[f] = 0, c[f] = 15, d[f] = 0;
  var x, A, t, a, v, p;
  for (A = 0; 2 >= A; A++)
    for (t = 0; 2 >= t; t++)
      if (x = m[3 * A + t], void 0 !== x && -1 !== x) {
        for (p = 0; 16 > p; p++)
          for (q = 0; 16 > q; q++) Chunk.cacheHeightMap9[48 *
            (16 * t + p) + 16 * A + q] = x.heightMap[16 * p + q];
        for (a = l = 0; 256 > l; l++, a++) {
          if (0 === l % 16) {
            var B = x.section[l / 16],
              a = 0;
            if (void 0 === B) {
              for (p = 0; 16 > p; p++)
                for (q = 0; 16 > q; q++) f = 2304 * l + 48 * (16 * t + p) + (16 * A + q), e[f] = 0, c[f] = 0, d[f] = 0, f = 2304 * (l + 15) + 48 * (16 * t + p) + (16 * A + q), e[f] = 0, c[f] = 0, d[f] = 0;
              l += 15;
              a = -1;
              continue
            }
          }
          for (v = 0, p = 0; 16 > p; p++)
            for (q = 0; 16 > q; q += 2) b = 256 * a + 16 * p + q, f = 2304 * l + 48 * (16 * t + p) + (16 * A + q), e[f] = B.blocks[b], e[f + 1] = B.blocks[b + 1], v = B.skyLight[b / 2], c[f] = v & 15, c[f + 1] = v >> 4 & 15, v = B.blockLight[b / 2], d[f] = v & 15, d[f + 1] = v >> 4 & 15
        }
      }
  return !0
};
Chunk.prototype.init2 = function(b) {
  if (0 === b) var f = 49,
    c = 256;
  else f = 0, c = 49;
  if (0 === this.lightPopulated && settings.lightInit) {
    if (!this.refreshLight(-1, !0)) return !1;
    this.lightPopulated = 1
  }
  if (!this.getCache(f, c)) return !1;
  0 === b ? this.isInit = -1 : this.isInit1 = -1;
  var d = Chunk.cacheSlight,
    e = Chunk.cacheBlight,
    m = Chunk.cacheData,
    l = Chunk.cacheId,
    p = 0,
    q = 0,
    x = 0,
    A = 0,
    t = 0,
    a, B = punkty1;
  B[0].o = 0;
  B[1].o = 0;
  B[2].o = 0;
  var v, C, u, w, F, r, s, n, L, K, Y, T, y, R, U, M, N, P, S, Q, V, J, Z, I, H, X, z, $, aa, W, k, lb, mb, ub, D;
  for (v = B[3].o = 0, C = 0, u = 0, w = C = 0, F = 0, r = 0, s = 0, L = 0, K = 0, Y = 0, T = 0, y = 0, R = 0, U = 0, M = 0, N = 0, P = 0, S = 0, Q = 0, V = !1, J = !1, Z = !1, I = !1,
    H = !1, X = !1, z = 0, $ = 0, aa = 0, W = 0, k = 0, ub = 0, D = 0; 256 > D; D++) this.heightMap[D] > ub && (ub = this.heightMap[D]);
  ub + 1 < c && (c = ub + 1);
  var G, E;
  var kb;
  var jb, pb;
  for (G = f; G < c; G++)
    if (0 === G % 16 && -1 === l[324 * (G + 2) + 19]) G += 15;
    else
      for (D = 0; 16 > D; D++)
        for (E = 0; 16 > E; E++)
          if (X = H = I = Z = J = V = !1, v = 324 * (G + 1) + 18 * (D + 1) + (E + 1), q = blockConfig[l[v]].type, 0 !== q) {
            var C = v + 18,
              u = v - 18,
              w = v - 1,
              F = v + 1,
              r = v + 324,
              s = v - 324,
              nb = blockConfig[l[r]].type,
              ob = blockConfig[l[s]].type,
              ha = blockConfig[l[w]].type,
              ia = blockConfig[l[F]].type,
              ja = blockConfig[l[u]].type,
              ka = blockConfig[l[C]].type;
            lb = this.xPos % 5;
            0 > lb && (lb += 5);
            mb = this.zPos % 5;
            0 > mb && (mb += 5);
            n = 65536 * (0 + G) + 256 * (16 * D + E) + 10 * (5 * lb + mb);
            if (1 === q || 2 === q || 4 === q || 6 === q) 1 !== nb && (Y = d[r], N = e[r], J = !0), 1 !== ob && (T = d[s], P = e[s], V = !0), 1 !== ja && (K = d[u], M = e[u], X = !0), 1 !== ka && (L = d[C], U = e[C], H = !0), 1 !== ha && (y = d[w], S = e[w], Z = !0), 1 !== ia && (R = d[F], Q = e[F], I = !0);
            else if (300 < q) nb !== q && (Y = d[r], N = e[r], J = !0), 1 !== ob && ob !== q && (T = d[s], P = e[s], V = !0), ja !== q && (K = d[u], M = e[u], X = !0), ka !== q && (L = d[C], U = e[C], H = !0), ha !== q && (y = d[w], S = e[w], Z = !0), ia !== q && (R = d[F], Q = e[F], I = !0);
            else if (300 === q) {
              if (nb !== q || m[r] !== m[v]) Y = d[r],
                N = e[r], J = !0;
              if (1 !== ob && ob !== q || m[s] !== m[v]) T = d[s], P = e[s], V = !0;
              if (ja !== q || m[u] !== m[v]) K = d[u], M = e[u], X = !0;
              if (ka !== q || m[C] !== m[v]) L = d[C], U = e[C], H = !0;
              if (ha !== q || m[w] !== m[v]) y = d[w], S = e[w], Z = !0;
              if (ia !== q || m[F] !== m[v]) R = d[F], Q = e[F], I = !0
            } else continue;
            if (Z || I || X || H || V || J)
              if (A = l[v], x = m[v], t = void 0 === blockConfig[A][x] ? blockConfig[A][0] : blockConfig[A][x], void 0 !== t.shapeType && 0 !== t.shapeType)
                if (1 === t.shapeType) {
                  p = t.drawLevel;
                  a = B[p];
                  var h = t.shape,
                    O = h,
                    z = 0;
                  0 < t.useBiomeColor && (z = this.getBiomeColor(E, D, t.useBiomeColor - 1));
                  if (Z) {
                    a =
                      8 < y && 0 === p ? B[p + 1] : B[p];
                    if (0 === blockConfig.lightSource[A]) var oa = Math.floor((y + d[w - 18] + d[w - 324 - 18] + d[w - 324]) / 4),
                      Na = Math.floor((y + d[w - 324] + d[w - 324 + 18] + d[w + 18]) / 4),
                      pa = Math.floor((y + d[w + 18] + d[w + 324 + 18] + d[w + 324]) / 4),
                      Oa = Math.floor((y + d[w + 324] + d[w + 324 - 18] + d[w - 18]) / 4),
                      la = Math.floor((S + e[w - 18] + e[w - 324 - 18] + e[w - 324]) / 4),
                      Ka = Math.floor((S + e[w - 324] + e[w - 324 + 18] + e[w + 18]) / 4),
                      ma = Math.floor((S + e[w + 18] + e[w + 324 + 18] + e[w + 324]) / 4),
                      La = Math.floor((S + e[w + 324] + e[w + 324 - 18] + e[w - 18]) / 4);
                    else oa = Na = pa = Oa = la = Ka = ma = La = 15;
                    var g = 0;
                    a.d[a.o++] =
                      16 * this.xPos + E + O.front[g];
                    a.d[a.o++] = 0 + G + O.front[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.front[g + 2];
                    a.d[a.o++] = h.front[g + 3];
                    a.d[a.o++] = h.front[g + 4];
                    a.d[a.o++] = 100 * oa + la;
                    a.d[a.o++] = n + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 5;
                    a.d[a.o++] = 16 * this.xPos + E + O.front[g];
                    a.d[a.o++] = 0 + G + O.front[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.front[g + 2];
                    a.d[a.o++] = h.front[g + 3];
                    a.d[a.o++] = h.front[g + 4];
                    a.d[a.o++] = 100 * Na + Ka;
                    a.d[a.o++] = n + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 10;
                    a.d[a.o++] = 16 * this.xPos + E + O.front[g];
                    a.d[a.o++] = 0 + G + O.front[g + 1];
                    a.d[a.o++] =
                      16 * this.zPos + D + O.front[g + 2];
                    a.d[a.o++] = h.front[g + 3];
                    a.d[a.o++] = h.front[g + 4];
                    a.d[a.o++] = 100 * pa + ma;
                    a.d[a.o++] = n + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 15;
                    a.d[a.o++] = 16 * this.xPos + E + O.front[g];
                    a.d[a.o++] = 0 + G + O.front[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.front[g + 2];
                    a.d[a.o++] = h.front[g + 3];
                    a.d[a.o++] = h.front[g + 4];
                    a.d[a.o++] = 100 * oa + la;
                    a.d[a.o++] = n + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 20;
                    a.d[a.o++] = 16 * this.xPos + E + O.front[g];
                    a.d[a.o++] = 0 + G + O.front[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.front[g + 2];
                    a.d[a.o++] = h.front[g + 3];
                    a.d[a.o++] =
                      h.front[g + 4];
                    a.d[a.o++] = 100 * pa + ma;
                    a.d[a.o++] = n + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 25;
                    a.d[a.o++] = 16 * this.xPos + E + O.front[g];
                    a.d[a.o++] = 0 + G + O.front[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.front[g + 2];
                    a.d[a.o++] = h.front[g + 3];
                    a.d[a.o++] = h.front[g + 4];
                    a.d[a.o++] = 100 * Oa + La;
                    a.d[a.o++] = n + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z
                  }
                  if (I) {
                    a = 8 < R && 0 === p ? B[p + 1] : B[p];
                    if (0 === blockConfig.lightSource[A]) var na = Math.floor((R + d[F - 18] + d[F - 324 - 18] + d[F - 324]) / 4),
                      Ma = Math.floor((R + d[F - 324] + d[F - 324 + 18] + d[F + 18]) / 4),
                      qa = Math.floor((R + d[F + 18] + d[F + 324 + 18] + d[F +
                        324]) / 4),
                      Pa = Math.floor((R + d[F + 324] + d[F + 324 - 18] + d[F - 18]) / 4),
                      ra = Math.floor((Q + e[F - 18] + e[F - 324 - 18] + e[F - 324]) / 4),
                      Qa = Math.floor((Q + e[F - 324] + e[F - 324 + 18] + e[F + 18]) / 4),
                      sa = Math.floor((Q + e[F + 18] + e[F + 324 + 18] + e[F + 324]) / 4),
                      Ra = Math.floor((Q + e[F + 324] + e[F + 324 - 18] + e[F - 18]) / 4);
                    else na = Ma = qa = Pa = ra = Qa = sa = Ra = 15;
                    g = 0;
                    a.d[a.o++] = 16 * this.xPos + E + O.back[g];
                    a.d[a.o++] = 0 + G + O.back[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.back[g + 2];
                    a.d[a.o++] = h.back[g + 3];
                    a.d[a.o++] = h.back[g + 4];
                    a.d[a.o++] = 100 * qa + sa;
                    a.d[a.o++] = n + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] =
                      z;
                    g = 5;
                    a.d[a.o++] = 16 * this.xPos + E + O.back[g];
                    a.d[a.o++] = 0 + G + O.back[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.back[g + 2];
                    a.d[a.o++] = h.back[g + 3];
                    a.d[a.o++] = h.back[g + 4];
                    a.d[a.o++] = 100 * na + ra;
                    a.d[a.o++] = n + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 10;
                    a.d[a.o++] = 16 * this.xPos + E + O.back[g];
                    a.d[a.o++] = 0 + G + O.back[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.back[g + 2];
                    a.d[a.o++] = h.back[g + 3];
                    a.d[a.o++] = h.back[g + 4];
                    a.d[a.o++] = 100 * Pa + Ra;
                    a.d[a.o++] = n + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 15;
                    a.d[a.o++] = 16 * this.xPos + E + O.back[g];
                    a.d[a.o++] = 0 + G + O.back[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.back[g + 2];
                    a.d[a.o++] = h.back[g + 3];
                    a.d[a.o++] = h.back[g + 4];
                    a.d[a.o++] = 100 * na + ra;
                    a.d[a.o++] = n + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 20;
                    a.d[a.o++] = 16 * this.xPos + E + O.back[g];
                    a.d[a.o++] = 0 + G + O.back[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.back[g + 2];
                    a.d[a.o++] = h.back[g + 3];
                    a.d[a.o++] = h.back[g + 4];
                    a.d[a.o++] = 100 * qa + sa;
                    a.d[a.o++] = n + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z;
                    g = 25;
                    a.d[a.o++] = 16 * this.xPos + E + O.back[g];
                    a.d[a.o++] = 0 + G + O.back[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.back[g + 2];
                    a.d[a.o++] = h.back[g + 3];
                    a.d[a.o++] =
                      h.back[g + 4];
                    a.d[a.o++] = 100 * Ma + Qa;
                    a.d[a.o++] = n + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = z
                  }
                  if (X) {
                    a = 8 < K && 0 === p ? B[p + 1] : B[p];
                    if (0 === blockConfig.lightSource[A]) var ta = Math.floor((K + d[u - 1] + d[u - 324 - 1] + d[u - 324]) / 4),
                      Sa = Math.floor((K + d[u - 324] + d[u - 324 + 1] + d[u + 1]) / 4),
                      ua = Math.floor((K + d[u + 1] + d[u + 324 + 1] + d[u + 324]) / 4),
                      Ta = Math.floor((K + d[u + 324] + d[u + 324 - 1] + d[u - 1]) / 4),
                      va = Math.floor((M + e[u - 1] + e[u - 324 - 1] + e[u - 324]) / 4),
                      Ua = Math.floor((M + e[u - 324] + e[u - 324 + 1] + e[u + 1]) / 4),
                      wa = Math.floor((M + e[u + 1] + e[u + 324 + 1] + e[u + 324]) / 4),
                      Va = Math.floor((M + e[u + 324] +
                        e[u + 324 - 1] + e[u - 1]) / 4);
                    else ta = Sa = ua = Ta = va = Ua = wa = Va = 15;
                    g = 0;
                    a.d[a.o++] = 16 * this.xPos + E + O.right[g];
                    a.d[a.o++] = 0 + G + O.right[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.right[g + 2];
                    a.d[a.o++] = h.right[g + 3];
                    a.d[a.o++] = h.right[g + 4];
                    a.d[a.o++] = 100 * ua + wa;
                    a.d[a.o++] = n + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 5;
                    a.d[a.o++] = 16 * this.xPos + E + O.right[g];
                    a.d[a.o++] = 0 + G + O.right[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.right[g + 2];
                    a.d[a.o++] = h.right[g + 3];
                    a.d[a.o++] = h.right[g + 4];
                    a.d[a.o++] = 100 * ta + va;
                    a.d[a.o++] = n + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 10;
                    a.d[a.o++] = 16 * this.xPos + E + O.right[g];
                    a.d[a.o++] = 0 + G + O.right[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.right[g + 2];
                    a.d[a.o++] = h.right[g + 3];
                    a.d[a.o++] = h.right[g + 4];
                    a.d[a.o++] = 100 * Ta + Va;
                    a.d[a.o++] = n + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 15;
                    a.d[a.o++] = 16 * this.xPos + E + O.right[g];
                    a.d[a.o++] = 0 + G + O.right[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.right[g + 2];
                    a.d[a.o++] = h.right[g + 3];
                    a.d[a.o++] = h.right[g + 4];
                    a.d[a.o++] = 100 * ua + wa;
                    a.d[a.o++] = n + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 20;
                    a.d[a.o++] = 16 * this.xPos + E + O.right[g];
                    a.d[a.o++] = 0 + G + O.right[g +
                      1];
                    a.d[a.o++] = 16 * this.zPos + D + O.right[g + 2];
                    a.d[a.o++] = h.right[g + 3];
                    a.d[a.o++] = h.right[g + 4];
                    a.d[a.o++] = 100 * Sa + Ua;
                    a.d[a.o++] = n + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 25;
                    a.d[a.o++] = 16 * this.xPos + E + O.right[g];
                    a.d[a.o++] = 0 + G + O.right[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.right[g + 2];
                    a.d[a.o++] = h.right[g + 3];
                    a.d[a.o++] = h.right[g + 4];
                    a.d[a.o++] = 100 * ta + va;
                    a.d[a.o++] = n + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z
                  }
                  if (H) {
                    a = 8 < L && 0 === p ? B[p + 1] : B[p];
                    if (0 === blockConfig.lightSource[A]) var Wa = Math.floor((L + d[C - 1] + d[C - 324 - 1] + d[C - 324]) / 4),
                      xa = Math.floor((L +
                        d[C - 324] + d[C - 324 + 1] + d[C + 1]) / 4),
                      Xa = Math.floor((L + d[C + 1] + d[C + 324 + 1] + d[C + 324]) / 4),
                      ya = Math.floor((L + d[C + 324] + d[C + 324 - 1] + d[C - 1]) / 4),
                      Ya = Math.floor((U + e[C - 1] + e[C - 324 - 1] + e[C - 324]) / 4),
                      za = Math.floor((U + e[C - 324] + e[C - 324 + 1] + e[C + 1]) / 4),
                      Za = Math.floor((U + e[C + 1] + e[C + 324 + 1] + e[C + 324]) / 4),
                      Aa = Math.floor((U + e[C + 324] + e[C + 324 - 1] + e[C - 1]) / 4);
                    else Wa = xa = Xa = ya = Ya = za = Za = Aa = 15;
                    g = 0;
                    a.d[a.o++] = 16 * this.xPos + E + O.left[g];
                    a.d[a.o++] = 0 + G + O.left[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.left[g + 2];
                    a.d[a.o++] = h.left[g + 3];
                    a.d[a.o++] = h.left[g + 4];
                    a.d[a.o++] = 100 * ya + Aa;
                    a.d[a.o++] = n + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 5;
                    a.d[a.o++] = 16 * this.xPos + E + O.left[g];
                    a.d[a.o++] = 0 + G + O.left[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.left[g + 2];
                    a.d[a.o++] = h.left[g + 3];
                    a.d[a.o++] = h.left[g + 4];
                    a.d[a.o++] = 100 * Wa + Ya;
                    a.d[a.o++] = n + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 10;
                    a.d[a.o++] = 16 * this.xPos + E + O.left[g];
                    a.d[a.o++] = 0 + G + O.left[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.left[g + 2];
                    a.d[a.o++] = h.left[g + 3];
                    a.d[a.o++] = h.left[g + 4];
                    a.d[a.o++] = 100 * xa + za;
                    a.d[a.o++] = n + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 15;
                    a.d[a.o++] = 16 * this.xPos + E + O.left[g];
                    a.d[a.o++] = 0 + G + O.left[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.left[g + 2];
                    a.d[a.o++] = h.left[g + 3];
                    a.d[a.o++] = h.left[g + 4];
                    a.d[a.o++] = 100 * Xa + Za;
                    a.d[a.o++] = n + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 20;
                    a.d[a.o++] = 16 * this.xPos + E + O.left[g];
                    a.d[a.o++] = 0 + G + O.left[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + O.left[g + 2];
                    a.d[a.o++] = h.left[g + 3];
                    a.d[a.o++] = h.left[g + 4];
                    a.d[a.o++] = 100 * ya + Aa;
                    a.d[a.o++] = n + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z;
                    g = 25;
                    a.d[a.o++] = 16 * this.xPos + E + O.left[g];
                    a.d[a.o++] = 0 + G + O.left[g + 1];
                    a.d[a.o++] =
                      16 * this.zPos + D + O.left[g + 2];
                    a.d[a.o++] = h.left[g + 3];
                    a.d[a.o++] = h.left[g + 4];
                    a.d[a.o++] = 100 * xa + za;
                    a.d[a.o++] = n + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = z
                  }
                  if (V) {
                    a = B[p];
                    if (0 === blockConfig.lightSource[A]) var Ba = Math.floor((T + d[s - 1] + d[s - 18 - 1] + d[s - 18]) / 4),
                      $a = Math.floor((T + d[s - 18] + d[s - 18 + 1] + d[s + 1]) / 4),
                      Ca = Math.floor((T + d[s + 1] + d[s + 18 + 1] + d[s + 18]) / 4),
                      ab = Math.floor((T + d[s + 18] + d[s + 18 - 1] + d[s - 1]) / 4),
                      Da = Math.floor((P + e[s - 1] + e[s - 18 - 1] + e[s - 18]) / 4),
                      bb = Math.floor((P + e[s - 18] + e[s - 18 + 1] + e[s + 1]) / 4),
                      Ea = Math.floor((P + e[s + 1] + e[s + 18 + 1] + e[s + 18]) /
                        4),
                      cb = Math.floor((P + e[s + 18] + e[s + 18 - 1] + e[s - 1]) / 4);
                    else Ba = $a = Ca = ab = Da = bb = Ea = cb = 15;
                    g = 0;
                    a.d[a.o++] = 16 * this.xPos + E + h.bottom[g];
                    a.d[a.o++] = 0 + G + h.bottom[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                    a.d[a.o++] = h.bottom[g + 3];
                    a.d[a.o++] = h.bottom[g + 4];
                    a.d[a.o++] = 100 * Ca + Ea;
                    a.d[a.o++] = n + 5;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 5;
                    a.d[a.o++] = 16 * this.xPos + E + h.bottom[g];
                    a.d[a.o++] = 0 + G + h.bottom[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                    a.d[a.o++] = h.bottom[g + 3];
                    a.d[a.o++] = h.bottom[g + 4];
                    a.d[a.o++] = 100 * Ba + Da;
                    a.d[a.o++] = n + 5;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 10;
                    a.d[a.o++] = 16 * this.xPos + E + h.bottom[g];
                    a.d[a.o++] = 0 + G + h.bottom[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                    a.d[a.o++] = h.bottom[g + 3];
                    a.d[a.o++] = h.bottom[g + 4];
                    a.d[a.o++] = 100 * $a + bb;
                    a.d[a.o++] = n + 5;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 15;
                    a.d[a.o++] = 16 * this.xPos + E + h.bottom[g];
                    a.d[a.o++] = 0 + G + h.bottom[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                    a.d[a.o++] = h.bottom[g + 3];
                    a.d[a.o++] = h.bottom[g + 4];
                    a.d[a.o++] = 100 * Ca + Ea;
                    a.d[a.o++] = n + 5;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 20;
                    a.d[a.o++] = 16 * this.xPos +
                      E + h.bottom[g];
                    a.d[a.o++] = 0 + G + h.bottom[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                    a.d[a.o++] = h.bottom[g + 3];
                    a.d[a.o++] = h.bottom[g + 4];
                    a.d[a.o++] = 100 * ab + cb;
                    a.d[a.o++] = n + 5;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 25;
                    a.d[a.o++] = 16 * this.xPos + E + h.bottom[g];
                    a.d[a.o++] = 0 + G + h.bottom[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                    a.d[a.o++] = h.bottom[g + 3];
                    a.d[a.o++] = h.bottom[g + 4];
                    a.d[a.o++] = 100 * Ba + Da;
                    a.d[a.o++] = n + 5;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z
                  }
                  if (J) {
                    a = 8 < Y && 0 === p ? B[p + 1] : B[p];
                    if (0 === blockConfig.lightSource[A]) var Fa = Math.floor((Y + d[r -
                        1] + d[r - 18 - 1] + d[r - 18]) / 4),
                      db = Math.floor((Y + d[r - 18] + d[r - 18 + 1] + d[r + 1]) / 4),
                      Ga = Math.floor((Y + d[r + 1] + d[r + 18 + 1] + d[r + 18]) / 4),
                      eb = Math.floor((Y + d[r + 18] + d[r + 18 - 1] + d[r - 1]) / 4),
                      Ha = Math.floor((N + e[r - 1] + e[r - 18 - 1] + e[r - 18]) / 4),
                      fb = Math.floor((N + e[r - 18] + e[r - 18 + 1] + e[r + 1]) / 4),
                      Ia = Math.floor((N + e[r + 1] + e[r + 18 + 1] + e[r + 18]) / 4),
                      gb = Math.floor((N + e[r + 18] + e[r + 18 - 1] + e[r - 1]) / 4);
                    else Fa = db = Ga = eb = Ha = fb = Ia = gb = 15;
                    g = 0;
                    a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                    a.d[a.o++] = 0 + G + h.top[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2];
                    a.d[a.o++] = h.top[g + 3];
                    a.d[a.o++] = h.top[g + 4];
                    a.d[a.o++] = 100 * Ga + Ia;
                    a.d[a.o++] = n + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 5;
                    a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                    a.d[a.o++] = 0 + G + h.top[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2];
                    a.d[a.o++] = h.top[g + 3];
                    a.d[a.o++] = h.top[g + 4];
                    a.d[a.o++] = 100 * db + fb;
                    a.d[a.o++] = n + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 10;
                    a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                    a.d[a.o++] = 0 + G + h.top[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2];
                    a.d[a.o++] = h.top[g + 3];
                    a.d[a.o++] = h.top[g + 4];
                    a.d[a.o++] = 100 * Fa + Ha;
                    a.d[a.o++] = n + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 15;
                    a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                    a.d[a.o++] = 0 + G + h.top[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2];
                    a.d[a.o++] = h.top[g + 3];
                    a.d[a.o++] = h.top[g + 4];
                    a.d[a.o++] = 100 * Ga + Ia;
                    a.d[a.o++] = n + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 20;
                    a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                    a.d[a.o++] = 0 + G + h.top[g + 1];
                    a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2];
                    a.d[a.o++] = h.top[g + 3];
                    a.d[a.o++] = h.top[g + 4];
                    a.d[a.o++] = 100 * Fa + Ha;
                    a.d[a.o++] = n + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z;
                    g = 25;
                    a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                    a.d[a.o++] = 0 + G + h.top[g + 1];
                    a.d[a.o++] = 16 * this.zPos +
                      D + h.top[g + 2];
                    a.d[a.o++] = h.top[g + 3];
                    a.d[a.o++] = h.top[g + 4];
                    a.d[a.o++] = 100 * eb + gb;
                    a.d[a.o++] = n + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = z
                  }
                } else if (2 === t.shapeType) {
              p = t.drawLevel;
              a = B[p];
              h = t.shape;
              if (Z)
                for (g = 0; g < h.front.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * y + S, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = 0;
              if (I)
                for (g = 0; g < h.back.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] =
                  0 + G + h.back[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * R + Q, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = 0;
              if (X)
                for (g = 0; g < h.right.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * K + M, a.d[a.o++] = n + 3, a.d[a.o++] = 0.8, a.d[a.o++] = 0;
              if (H)
                for (g = 0; g < h.left.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g +
                  1], a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * L + U, a.d[a.o++] = n + 4, a.d[a.o++] = 0.8, a.d[a.o++] = 0
            } else if (3 === t.shapeType) {
              if (p = t.drawLevel, a = B[p], h = t.shape, y = Math.floor((y + R + K + L + Y) / 5), S = Math.floor((S + Q + M + U + N) / 5), z = 0, 0 < t.useBiomeColor && (z = this.getBiomeColor(E, D, t.useBiomeColor - 1)), Z || I || X || H)
                for (kb in h)
                  for (g = 0; g < h[kb].length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h[kb][g], a.d[a.o++] = 0 + G + h[kb][g + 1], a.d[a.o++] = 16 * this.zPos + D + h[kb][g + 2], a.d[a.o++] = h[kb][g +
                    3
                  ], a.d[a.o++] = h[kb][g + 4], a.d[a.o++] = 100 * y + S, a.d[a.o++] = n + 0, a.d[a.o++] = 1, a.d[a.o++] = z
            } else if (4 === t.shapeType) {
              p = t.drawLevel;
              a = B[p];
              78 === l[r] && (t = blockConfig[A][1]);
              h = t.shape;
              0 < t.useBiomeColor ? (z = this.getBiomeColor(E, D, t.useBiomeColor - 1), $ = this.getBiomeColor1(E, D, t.useBiomeColor - 1), aa = this.getBiomeColor2(E, D, t.useBiomeColor - 1), W = this.getBiomeColor3(E, D, t.useBiomeColor - 1), k = this.getBiomeColor4(E, D, t.useBiomeColor - 1)) : k = W = aa = $ = z = 0;
              if (Z) {
                a = 8 < y && 0 === p ? B[p + 1] : B[p];
                if (4 === t.shapeType)
                  for (g = 0; g < h.front2.length; g +=
                    5) a.d[a.o++] = 16 * this.xPos + E + h.front2[g], a.d[a.o++] = 0 + G + h.front2[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.front2[g + 2], a.d[a.o++] = h.front2[g + 3], a.d[a.o++] = h.front2[g + 4], a.d[a.o++] = 100 * y + S, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z;
                oa = Math.floor((y + d[w - 18] + d[w - 324 - 18] + d[w - 324]) / 4);
                Na = Math.floor((y + d[w - 324] + d[w - 324 + 18] + d[w + 18]) / 4);
                pa = Math.floor((y + d[w + 18] + d[w + 324 + 18] + d[w + 324]) / 4);
                Oa = Math.floor((y + d[w + 324] + d[w + 324 - 18] + d[w - 18]) / 4);
                la = Math.floor((S + e[w - 18] + e[w - 324 - 18] + e[w - 324]) / 4);
                Ka = Math.floor((S + e[w - 324] + e[w -
                  324 + 18] + e[w + 18]) / 4);
                ma = Math.floor((S + e[w + 18] + e[w + 324 + 18] + e[w + 324]) / 4);
                La = Math.floor((S + e[w + 324] + e[w + 324 - 18] + e[w - 18]) / 4);
                g = 0;
                a.d[a.o++] = 16 * this.xPos + E + h.front[g];
                a.d[a.o++] = 0 + G + h.front[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                a.d[a.o++] = h.front[g + 3];
                a.d[a.o++] = h.front[g + 4];
                a.d[a.o++] = 100 * oa + la;
                a.d[a.o++] = n + 1;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 5;
                a.d[a.o++] = 16 * this.xPos + E + h.front[g];
                a.d[a.o++] = 0 + G + h.front[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                a.d[a.o++] = h.front[g + 3];
                a.d[a.o++] = h.front[g + 4];
                a.d[a.o++] =
                  100 * Na + Ka;
                a.d[a.o++] = n + 1;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 10;
                a.d[a.o++] = 16 * this.xPos + E + h.front[g];
                a.d[a.o++] = 0 + G + h.front[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                a.d[a.o++] = h.front[g + 3];
                a.d[a.o++] = h.front[g + 4];
                a.d[a.o++] = 100 * pa + ma;
                a.d[a.o++] = n + 1;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 15;
                a.d[a.o++] = 16 * this.xPos + E + h.front[g];
                a.d[a.o++] = 0 + G + h.front[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                a.d[a.o++] = h.front[g + 3];
                a.d[a.o++] = h.front[g + 4];
                a.d[a.o++] = 100 * oa + la;
                a.d[a.o++] = n + 1;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 20;
                a.d[a.o++] =
                  16 * this.xPos + E + h.front[g];
                a.d[a.o++] = 0 + G + h.front[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                a.d[a.o++] = h.front[g + 3];
                a.d[a.o++] = h.front[g + 4];
                a.d[a.o++] = 100 * pa + ma;
                a.d[a.o++] = n + 1;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 25;
                a.d[a.o++] = 16 * this.xPos + E + h.front[g];
                a.d[a.o++] = 0 + G + h.front[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                a.d[a.o++] = h.front[g + 3];
                a.d[a.o++] = h.front[g + 4];
                a.d[a.o++] = 100 * Oa + La;
                a.d[a.o++] = n + 1;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0
              }
              if (I) {
                a = 8 < y && 0 === p ? B[p + 1] : B[p];
                if (4 === t.shapeType)
                  for (g = 0; g < h.back2.length; g +=
                    5) a.d[a.o++] = 16 * this.xPos + E + h.back2[g], a.d[a.o++] = 0 + G + h.back2[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.back2[g + 2], a.d[a.o++] = h.back2[g + 3], a.d[a.o++] = h.back2[g + 4], a.d[a.o++] = 100 * R + Q, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z;
                na = Math.floor((R + d[F - 18] + d[F - 324 - 18] + d[F - 324]) / 4);
                Ma = Math.floor((R + d[F - 324] + d[F - 324 + 18] + d[F + 18]) / 4);
                qa = Math.floor((R + d[F + 18] + d[F + 324 + 18] + d[F + 324]) / 4);
                Pa = Math.floor((R + d[F + 324] + d[F + 324 - 18] + d[F - 18]) / 4);
                ra = Math.floor((Q + e[F - 18] + e[F - 324 - 18] + e[F - 324]) / 4);
                Qa = Math.floor((Q + e[F - 324] + e[F - 324 + 18] +
                  e[F + 18]) / 4);
                sa = Math.floor((Q + e[F + 18] + e[F + 324 + 18] + e[F + 324]) / 4);
                Ra = Math.floor((Q + e[F + 324] + e[F + 324 - 18] + e[F - 18]) / 4);
                g = 0;
                a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                a.d[a.o++] = 0 + G + h.back[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                a.d[a.o++] = h.back[g + 3];
                a.d[a.o++] = h.back[g + 4];
                a.d[a.o++] = 100 * qa + sa;
                a.d[a.o++] = n + 2;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 5;
                a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                a.d[a.o++] = 0 + G + h.back[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                a.d[a.o++] = h.back[g + 3];
                a.d[a.o++] = h.back[g + 4];
                a.d[a.o++] = 100 * na + ra;
                a.d[a.o++] =
                  n + 2;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 10;
                a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                a.d[a.o++] = 0 + G + h.back[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                a.d[a.o++] = h.back[g + 3];
                a.d[a.o++] = h.back[g + 4];
                a.d[a.o++] = 100 * Pa + Ra;
                a.d[a.o++] = n + 2;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 15;
                a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                a.d[a.o++] = 0 + G + h.back[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                a.d[a.o++] = h.back[g + 3];
                a.d[a.o++] = h.back[g + 4];
                a.d[a.o++] = 100 * na + ra;
                a.d[a.o++] = n + 2;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 20;
                a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                a.d[a.o++] = 0 + G + h.back[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                a.d[a.o++] = h.back[g + 3];
                a.d[a.o++] = h.back[g + 4];
                a.d[a.o++] = 100 * qa + sa;
                a.d[a.o++] = n + 2;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0;
                g = 25;
                a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                a.d[a.o++] = 0 + G + h.back[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                a.d[a.o++] = h.back[g + 3];
                a.d[a.o++] = h.back[g + 4];
                a.d[a.o++] = 100 * Ma + Qa;
                a.d[a.o++] = n + 2;
                a.d[a.o++] = 0.8;
                a.d[a.o++] = 0
              }
              if (X) {
                a = 8 < y && 0 === p ? B[p + 1] : B[p];
                if (4 === t.shapeType)
                  for (g = 0; g < h.right2.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.right2[g],
                    a.d[a.o++] = 0 + G + h.right2[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.right2[g + 2], a.d[a.o++] = h.right2[g + 3], a.d[a.o++] = h.right2[g + 4], a.d[a.o++] = 100 * K + M, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z;
                ta = Math.floor((K + d[u - 1] + d[u - 324 - 1] + d[u - 324]) / 4);
                Sa = Math.floor((K + d[u - 324] + d[u - 324 + 1] + d[u + 1]) / 4);
                ua = Math.floor((K + d[u + 1] + d[u + 324 + 1] + d[u + 324]) / 4);
                Ta = Math.floor((K + d[u + 324] + d[u + 324 - 1] + d[u - 1]) / 4);
                va = Math.floor((M + e[u - 1] + e[u - 324 - 1] + e[u - 324]) / 4);
                Ua = Math.floor((M + e[u - 324] + e[u - 324 + 1] + e[u + 1]) / 4);
                wa = Math.floor((M + e[u + 1] + e[u + 324 +
                  1] + e[u + 324]) / 4);
                Va = Math.floor((M + e[u + 324] + e[u + 324 - 1] + e[u - 1]) / 4);
                g = 0;
                a.d[a.o++] = 16 * this.xPos + E + h.right[g];
                a.d[a.o++] = 0 + G + h.right[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                a.d[a.o++] = h.right[g + 3];
                a.d[a.o++] = h.right[g + 4];
                a.d[a.o++] = 100 * ua + wa;
                a.d[a.o++] = n + 3;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 5;
                a.d[a.o++] = 16 * this.xPos + E + h.right[g];
                a.d[a.o++] = 0 + G + h.right[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                a.d[a.o++] = h.right[g + 3];
                a.d[a.o++] = h.right[g + 4];
                a.d[a.o++] = 100 * ta + va;
                a.d[a.o++] = n + 3;
                a.d[a.o++] = 0.55;
                a.d[a.o++] =
                  0;
                g = 10;
                a.d[a.o++] = 16 * this.xPos + E + h.right[g];
                a.d[a.o++] = 0 + G + h.right[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                a.d[a.o++] = h.right[g + 3];
                a.d[a.o++] = h.right[g + 4];
                a.d[a.o++] = 100 * Ta + Va;
                a.d[a.o++] = n + 3;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 15;
                a.d[a.o++] = 16 * this.xPos + E + h.right[g];
                a.d[a.o++] = 0 + G + h.right[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                a.d[a.o++] = h.right[g + 3];
                a.d[a.o++] = h.right[g + 4];
                a.d[a.o++] = 100 * ua + wa;
                a.d[a.o++] = n + 3;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 20;
                a.d[a.o++] = 16 * this.xPos + E + h.right[g];
                a.d[a.o++] = 0 +
                  G + h.right[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                a.d[a.o++] = h.right[g + 3];
                a.d[a.o++] = h.right[g + 4];
                a.d[a.o++] = 100 * Sa + Ua;
                a.d[a.o++] = n + 3;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 25;
                a.d[a.o++] = 16 * this.xPos + E + h.right[g];
                a.d[a.o++] = 0 + G + h.right[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                a.d[a.o++] = h.right[g + 3];
                a.d[a.o++] = h.right[g + 4];
                a.d[a.o++] = 100 * ta + va;
                a.d[a.o++] = n + 3;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0
              }
              if (H) {
                a = 8 < y && 0 === p ? B[p + 1] : B[p];
                if (4 === t.shapeType)
                  for (g = 0; g < h.left2.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.left2[g],
                    a.d[a.o++] = 0 + G + h.left2[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.left2[g + 2], a.d[a.o++] = h.left2[g + 3], a.d[a.o++] = h.left2[g + 4], a.d[a.o++] = 100 * L + U, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z;
                Wa = Math.floor((L + d[C - 1] + d[C - 324 - 1] + d[C - 324]) / 4);
                xa = Math.floor((L + d[C - 324] + d[C - 324 + 1] + d[C + 1]) / 4);
                Xa = Math.floor((L + d[C + 1] + d[C + 324 + 1] + d[C + 324]) / 4);
                ya = Math.floor((L + d[C + 324] + d[C + 324 - 1] + d[C - 1]) / 4);
                Ya = Math.floor((U + e[C - 1] + e[C - 324 - 1] + e[C - 324]) / 4);
                za = Math.floor((U + e[C - 324] + e[C - 324 + 1] + e[C + 1]) / 4);
                Za = Math.floor((U + e[C + 1] + e[C + 324 + 1] +
                  e[C + 324]) / 4);
                Aa = Math.floor((U + e[C + 324] + e[C + 324 - 1] + e[C - 1]) / 4);
                g = 0;
                a.d[a.o++] = 16 * this.xPos + E + h.left[g];
                a.d[a.o++] = 0 + G + h.left[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2];
                a.d[a.o++] = h.left[g + 3];
                a.d[a.o++] = h.left[g + 4];
                a.d[a.o++] = 100 * ya + Aa;
                a.d[a.o++] = n + 4;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 5;
                a.d[a.o++] = 16 * this.xPos + E + h.left[g];
                a.d[a.o++] = 0 + G + h.left[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2];
                a.d[a.o++] = h.left[g + 3];
                a.d[a.o++] = h.left[g + 4];
                a.d[a.o++] = 100 * Wa + Ya;
                a.d[a.o++] = n + 4;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 10;
                a.d[a.o++] =
                  16 * this.xPos + E + h.left[g];
                a.d[a.o++] = 0 + G + h.left[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2];
                a.d[a.o++] = h.left[g + 3];
                a.d[a.o++] = h.left[g + 4];
                a.d[a.o++] = 100 * xa + za;
                a.d[a.o++] = n + 4;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 15;
                a.d[a.o++] = 16 * this.xPos + E + h.left[g];
                a.d[a.o++] = 0 + G + h.left[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2];
                a.d[a.o++] = h.left[g + 3];
                a.d[a.o++] = h.left[g + 4];
                a.d[a.o++] = 100 * Xa + Za;
                a.d[a.o++] = n + 4;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 20;
                a.d[a.o++] = 16 * this.xPos + E + h.left[g];
                a.d[a.o++] = 0 + G + h.left[g + 1];
                a.d[a.o++] = 16 * this.zPos +
                  D + h.left[g + 2];
                a.d[a.o++] = h.left[g + 3];
                a.d[a.o++] = h.left[g + 4];
                a.d[a.o++] = 100 * ya + Aa;
                a.d[a.o++] = n + 4;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0;
                g = 25;
                a.d[a.o++] = 16 * this.xPos + E + h.left[g];
                a.d[a.o++] = 0 + G + h.left[g + 1];
                a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2];
                a.d[a.o++] = h.left[g + 3];
                a.d[a.o++] = h.left[g + 4];
                a.d[a.o++] = 100 * xa + za;
                a.d[a.o++] = n + 4;
                a.d[a.o++] = 0.55;
                a.d[a.o++] = 0
              }
              V && (a = B[p], Ba = Math.floor((T + d[s - 1] + d[s - 18 - 1] + d[s - 18]) / 4), $a = Math.floor((T + d[s - 18] + d[s - 18 + 1] + d[s + 1]) / 4), Ca = Math.floor((T + d[s + 1] + d[s + 18 + 1] + d[s + 18]) / 4), ab = Math.floor((T +
                  d[s + 18] + d[s + 18 - 1] + d[s - 1]) / 4), Da = Math.floor((P + e[s - 1] + e[s - 18 - 1] + e[s - 18]) / 4), bb = Math.floor((P + e[s - 18] + e[s - 18 + 1] + e[s + 1]) / 4), Ea = Math.floor((P + e[s + 1] + e[s + 18 + 1] + e[s + 18]) / 4), cb = Math.floor((P + e[s + 18] + e[s + 18 - 1] + e[s - 1]) / 4), g = 0, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * Ca + Ea, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = 0, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g +
                  1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * Ba + Da, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = 0, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * $a + bb, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = 0, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] =
                h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * Ca + Ea, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = 0, g = 20, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * ab + cb, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = 0, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 *
                Ba + Da, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = 0);
              J && (a = 8 < Y && 0 === p ? B[p + 1] : B[p], Fa = Math.floor((Y + d[r - 1] + d[r - 18 - 1] + d[r - 18]) / 4), db = Math.floor((Y + d[r - 18] + d[r - 18 + 1] + d[r + 1]) / 4), Ga = Math.floor((Y + d[r + 1] + d[r + 18 + 1] + d[r + 18]) / 4), eb = Math.floor((Y + d[r + 18] + d[r + 18 - 1] + d[r - 1]) / 4), Ha = Math.floor((N + e[r - 1] + e[r - 18 - 1] + e[r - 18]) / 4), fb = Math.floor((N + e[r - 18] + e[r - 18 + 1] + e[r + 1]) / 4), Ia = Math.floor((N + e[r + 1] + e[r + 18 + 1] + e[r + 18]) / 4), gb = Math.floor((N + e[r + 18] + e[r + 18 - 1] + e[r - 1]) / 4), g = 0, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g +
                  1], a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Ga + Ia, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = W, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * db + fb, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = aa, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4],
                a.d[a.o++] = 100 * Fa + Ha, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = $, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Ga + Ia, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = W, g = 20, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Fa + Ha, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = $, g = 25, a.d[a.o++] = 16 * this.xPos +
                E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * eb + gb, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = k)
            } else if (8 === t.shapeType) {
              p = t.drawLevel;
              a = B[p];
              h = t.shape;
              z = 0;
              0 < t.useBiomeColor && (z = this.getBiomeColor(E, D, t.useBiomeColor - 1));
              var ea = "",
                ea = ea + m[v],
                ea = q === ka ? ea + m[C] : ea + "x",
                ea = q === ja ? ea + m[u] : ea + "x",
                ea = q === ha ? ea + m[w] : ea + "x",
                ea = q === ia ? ea + m[F] : ea + "x",
                zb = 0,
                Ab = Chunk.stairsData[ea];
              void 0 !== Ab && (h = 3 < m[v] ? blockConfig[A][9].shape : blockConfig[A][8].shape,
                zb = 1);
              if (Z)
                for (a = 8 < y && 0 === p ? B[p + 1] : B[p], g = 0; g < h.front.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * y + S, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z;
              if (I)
                for (a = 8 < R && 0 === p ? B[p + 1] : B[p], g = 0; g < h.back.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 *
                  R + Q, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z;
              if (X)
                for (a = 8 < K && 0 === p ? B[p + 1] : B[p], g = 0; g < h.right.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * K + M, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z;
              if (H)
                for (a = 8 < L && 0 === p ? B[p + 1] : B[p], g = 0; g < h.left.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g +
                  3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * L + U, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z;
              if (V)
                for (a = B[p], g = 0; g < h.bottom.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * T + P, a.d[a.o++] = n + 5, a.d[a.o++] = 0.3, a.d[a.o++] = z;
              if (J)
                for (a = 8 < Y && 0 === p ? B[p + 1] : B[p], g = 0; g < h.top.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.top[g +
                  2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Y + N, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = z;
              if (1 === zb) {
                var h = blockConfig[A][10].shape,
                  hb = 0,
                  ib = 0;
                3 < m[v] && (ib = -0.5);
                for (jb = 0, pb = 0; 4 > pb; pb++)
                  if (0 !== Ab.charCodeAt(pb) - 48) {
                    hb = pb % 2 / 2;
                    jb = 1 < pb ? 0.5 : 0;
                    if (Z)
                      for (a = 8 < y && 0 === p ? B[p + 1] : B[p], g = 0; g < h.front.length; g += 5) a.d[a.o++] = hb + 16 * this.xPos + E + h.front[g], a.d[a.o++] = ib + 0 + G + h.front[g + 1], a.d[a.o++] = jb + 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * y + S, a.d[a.o++] =
                        n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z;
                    if (I)
                      for (a = 8 < R && 0 === p ? B[p + 1] : B[p], g = 0; g < h.back.length; g += 5) a.d[a.o++] = hb + 16 * this.xPos + E + h.back[g], a.d[a.o++] = ib + 0 + G + h.back[g + 1], a.d[a.o++] = jb + 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * R + Q, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z;
                    if (X)
                      for (a = 8 < K && 0 === p ? B[p + 1] : B[p], g = 0; g < h.right.length; g += 5) a.d[a.o++] = hb + 16 * this.xPos + E + h.right[g], a.d[a.o++] = ib + 0 + G + h.right[g + 1], a.d[a.o++] = jb + 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g +
                        3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * K + M, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z;
                    if (H)
                      for (a = 8 < L && 0 === p ? B[p + 1] : B[p], g = 0; g < h.left.length; g += 5) a.d[a.o++] = hb + 16 * this.xPos + E + h.left[g], a.d[a.o++] = ib + 0 + G + h.left[g + 1], a.d[a.o++] = jb + 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * L + U, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z;
                    if (V)
                      for (a = B[p], g = 0; g < h.bottom.length; g += 5) a.d[a.o++] = hb + 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = ib + 0 + G + h.bottom[g + 1], a.d[a.o++] = jb + 16 *
                        this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * T + P, a.d[a.o++] = n + 5, a.d[a.o++] = 0.3, a.d[a.o++] = z;
                    if (J)
                      for (a = 8 < Y && 0 === p ? B[p + 1] : B[p], g = 0; g < h.top.length; g += 5) a.d[a.o++] = hb + 16 * this.xPos + E + h.top[g], a.d[a.o++] = ib + 0 + G + h.top[g + 1], a.d[a.o++] = jb + 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Y + N, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = z
                  }
              }
            } else if (5 === t.shapeType) {
              if (Z || I || X || H || J || V) {
                p = t.drawLevel;
                a = B[p];
                h = t.shape;
                z = 0;
                0 < t.useBiomeColor &&
                  (z = this.getBiomeColor(E, D, t.useBiomeColor - 1));
                a = 8 < y && 0 === p ? B[p + 1] : B[p];
                for (g = 0; g < h.front.length; g += 5) {
                  if (0 === g % 30) {
                    if ((60 === g || 120 === g) && q !== ka && 1 !== ka) {
                      g += 25;
                      continue
                    }
                    if ((30 === g || 90 === g) && q !== ja && 1 !== ja) {
                      g += 25;
                      continue
                    }
                  }
                  a.d[a.o++] = 16 * this.xPos + E + h.front[g];
                  a.d[a.o++] = 0 + G + h.front[g + 1];
                  a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2];
                  a.d[a.o++] = h.front[g + 3];
                  a.d[a.o++] = h.front[g + 4];
                  a.d[a.o++] = 100 * y + S;
                  a.d[a.o++] = n + 1;
                  a.d[a.o++] = 0.8;
                  a.d[a.o++] = z
                }
                a = 8 < R && 0 === p ? B[p + 1] : B[p];
                for (g = 0; g < h.back.length; g += 5) {
                  if (0 === g % 30) {
                    if ((60 ===
                        g || 120 === g) && q !== ka && 1 !== ka) {
                      g += 25;
                      continue
                    }
                    if ((30 === g || 90 === g) && q !== ja && 1 !== ja) {
                      g += 25;
                      continue
                    }
                  }
                  a.d[a.o++] = 16 * this.xPos + E + h.back[g];
                  a.d[a.o++] = 0 + G + h.back[g + 1];
                  a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2];
                  a.d[a.o++] = h.back[g + 3];
                  a.d[a.o++] = h.back[g + 4];
                  a.d[a.o++] = 100 * R + Q;
                  a.d[a.o++] = n + 2;
                  a.d[a.o++] = 0.8;
                  a.d[a.o++] = z
                }
                a = 8 < K && 0 === p ? B[p + 1] : B[p];
                for (g = 0; g < h.right.length; g += 5) {
                  if (0 === g % 30) {
                    if ((30 === g || 90 === g) && q !== ha && 1 !== ha) {
                      g += 25;
                      continue
                    }
                    if ((60 === g || 120 === g) && q !== ia && 1 !== ia) {
                      g += 25;
                      continue
                    }
                  }
                  a.d[a.o++] = 16 * this.xPos +
                    E + h.right[g];
                  a.d[a.o++] = 0 + G + h.right[g + 1];
                  a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2];
                  a.d[a.o++] = h.right[g + 3];
                  a.d[a.o++] = h.right[g + 4];
                  a.d[a.o++] = 100 * K + M;
                  a.d[a.o++] = n + 3;
                  a.d[a.o++] = 0.55;
                  a.d[a.o++] = z
                }
                a = 8 < L && 0 === p ? B[p + 1] : B[p];
                for (g = 0; g < h.left.length; g += 5) {
                  if (0 === g % 30) {
                    if ((30 === g || 90 === g) && q !== ha && 1 !== ha) {
                      g += 25;
                      continue
                    }
                    if ((60 === g || 120 === g) && q !== ia && 1 !== ia) {
                      g += 25;
                      continue
                    }
                  }
                  a.d[a.o++] = 16 * this.xPos + E + h.left[g];
                  a.d[a.o++] = 0 + G + h.left[g + 1];
                  a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2];
                  a.d[a.o++] = h.left[g + 3];
                  a.d[a.o++] = h.left[g +
                    4];
                  a.d[a.o++] = 100 * L + U;
                  a.d[a.o++] = n + 4;
                  a.d[a.o++] = 0.55;
                  a.d[a.o++] = z
                }
                a = B[p];
                for (g = 0; g < h.bottom.length; g += 5) {
                  if (0 === g % 30) {
                    if ((30 === g || 150 === g) && q !== ja && 1 !== ja) {
                      g += 25;
                      continue
                    }
                    if ((60 === g || 180 === g) && q !== ka && 1 !== ka) {
                      g += 25;
                      continue
                    }
                    if ((90 === g || 210 === g) && q !== ha && 1 !== ha) {
                      g += 25;
                      continue
                    }
                    if ((120 === g || 240 === g) && q !== ia && 1 !== ia) {
                      g += 25;
                      continue
                    }
                  }
                  a.d[a.o++] = 16 * this.xPos + E + h.bottom[g];
                  a.d[a.o++] = 0 + G + h.bottom[g + 1];
                  a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2];
                  a.d[a.o++] = h.bottom[g + 3];
                  a.d[a.o++] = h.bottom[g + 4];
                  a.d[a.o++] = 100 *
                    T + P;
                  a.d[a.o++] = n + 5;
                  a.d[a.o++] = 0.3;
                  a.d[a.o++] = z
                }
                a = 8 < Y && 0 === p ? B[p + 1] : B[p];
                for (g = 0; g < h.top.length; g += 5) {
                  if (0 === g % 30) {
                    if ((30 === g || 150 === g) && q !== ja && 1 !== ja) {
                      g += 25;
                      continue
                    }
                    if ((60 === g || 180 === g) && q !== ka && 1 !== ka) {
                      g += 25;
                      continue
                    }
                    if ((90 === g || 210 === g) && q !== ha && 1 !== ha) {
                      g += 25;
                      continue
                    }
                    if ((120 === g || 240 === g) && q !== ia && 1 !== ia) {
                      g += 25;
                      continue
                    }
                  }
                  a.d[a.o++] = 16 * this.xPos + E + h.top[g];
                  a.d[a.o++] = 0 + G + h.top[g + 1];
                  a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2];
                  a.d[a.o++] = h.top[g + 3];
                  a.d[a.o++] = h.top[g + 4];
                  a.d[a.o++] = 100 * Y + N;
                  a.d[a.o++] = n +
                    6;
                  a.d[a.o++] = 1;
                  a.d[a.o++] = z
                }
              }
            } else if (6 === t.shapeType) {
              if (p = t.drawLevel, a = B[p], h = t.shape, z = 0, 0 < t.useBiomeColor && (z = this.getBiomeColor(E, D, t.useBiomeColor - 1)), Z || I || X || H || V || J) {
                if (5 === x)
                  for (a = 8 < y && 0 === p ? B[p + 1] : B[p], g = 0; g < h.front.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * y + S, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z;
                if (4 === x)
                  for (a = 8 < R && 0 === p ? B[p + 1] : B[p], g = 0; g < h.back.length; g +=
                    5) a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * R + Q, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z;
                if (3 === x)
                  for (a = 8 < K && 0 === p ? B[p + 1] : B[p], g = 0; g < h.right.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * K + M, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z;
                if (2 === x)
                  for (a =
                    8 < L && 0 === p ? B[p + 1] : B[p], g = 0; g < h.left.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * L + U, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z
              }
            } else if (9 === t.shapeType) {
              p = t.drawLevel;
              a = B[p];
              h = t.shape;
              z = 0;
              0 < t.useBiomeColor ? (z = this.getBiomeColor(E, D, t.useBiomeColor - 1), $ = this.getBiomeColor1(E, D, t.useBiomeColor - 1), aa = this.getBiomeColor2(E, D, t.useBiomeColor - 1), W = this.getBiomeColor3(E, D, t.useBiomeColor -
                1), k = this.getBiomeColor4(E, D, t.useBiomeColor - 1)) : k = W = aa = $ = z = 0;
              var ca = 1,
                fa = 1,
                da = 1,
                ga = 1;
              if (8 !== (m[v] & 8) && nb !== q) {
                if (0 !== (m[v] & 7)) {
                  var qb = m[v + 18] % 8;
                  ka !== q && (qb = 7);
                  var rb = m[v - 18] % 8;
                  ja !== q && (rb = 7);
                  var sb = m[v - 1] % 8;
                  ha !== q && (sb = 7);
                  var tb = m[v + 1] % 8;
                  ia !== q && (tb = 7);
                  var vb = m[v + 18 - 1] % 8;
                  blockConfig[l[v + 18 - 1]].type !== q && (vb = 7);
                  var wb = m[v - 18 - 1] % 8;
                  blockConfig[l[v - 18 - 1]].type !== q && (wb = 7);
                  var xb = m[v + 18 + 1] % 8;
                  blockConfig[l[v + 18 + 1]].type !== q && (xb = 7);
                  var yb = m[v - 18 + 1] % 8;
                  blockConfig[l[v - 18 + 1]].type !== q && (yb = 7);
                  ca = 0 === sb || 0 === wb || 0 === rb ? 0.875 : ca -
                    (m[v] + sb + wb + rb) / 4 / 7;
                  fa = 0 === rb || 0 === yb || 0 === tb ? 0.875 : fa - (m[v] + rb + yb + tb) / 4 / 7;
                  da = 0 === tb || 0 === xb || 0 === qb ? 0.875 : da - (m[v] + tb + xb + qb) / 4 / 7;
                  ga = 0 === qb || 0 === vb || 0 === sb ? 0.875 : ga - (m[v] + qb + vb + sb) / 4 / 7;
                  if (2.625 === ca + fa + da || 2.625 === fa + da + ga || 2.625 === da + ga + ca || 2.625 === ga + ca + fa) ga = da = fa = ca = 0.875
                } else ga = da = fa = ca = 0.875;
                if (blockConfig[l[r - 1]].type === q || blockConfig[l[r - 18 - 1]].type === q || blockConfig[l[r - 18]].type === q) ca = 1;
                if (blockConfig[l[r - 18]].type === q || blockConfig[l[r - 18 + 1]].type === q || blockConfig[l[r + 1]].type === q) fa = 1;
                if (blockConfig[l[r + 1]].type === q || blockConfig[l[r +
                    18 + 1]].type === q || blockConfig[l[r + 18]].type === q) da = 1;
                if (blockConfig[l[r + 18]].type === q || blockConfig[l[r + 18 - 1]].type === q || blockConfig[l[r - 1]].type === q) ga = 1
              }
              Z && (0 === blockConfig.lightSource[A] ? (oa = Math.floor((y + d[w - 18] + d[w - 324 - 18] + d[w - 324]) / 4), Na = Math.floor((y + d[w - 324] + d[w - 324 + 18] + d[w + 18]) / 4), pa = Math.floor((y + d[w + 18] + d[w + 324 + 18] + d[w + 324]) / 4), Oa = Math.floor((y + d[w + 324] + d[w + 324 - 18] + d[w - 18]) / 4), la = Math.floor((S + e[w - 18] + e[w - 324 - 18] + e[w - 324]) / 4), Ka = Math.floor((S + e[w - 324] + e[w - 324 + 18] + e[w + 18]) / 4), ma = Math.floor((S + e[w + 18] + e[w + 324 + 18] + e[w + 324]) /
                  4), La = Math.floor((S + e[w + 324] + e[w + 324 - 18] + e[w - 18]) / 4)) : oa = Na = pa = Oa = la = Ka = ma = La = 15, g = 0, a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * oa + la, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1] * ga, a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * Na + Ka, a.d[a.o++] = n + 1, a.d[a.o++] =
                0.8, a.d[a.o++] = z, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1] * ga, a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * pa + ma, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * oa + la, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 20, a.d[a.o++] = 16 * this.xPos + E + h.front[g],
                a.d[a.o++] = 0 + G + h.front[g + 1] * ga, a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * pa + ma, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 * Oa + La, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z);
              I && (0 === blockConfig.lightSource[A] ? (na = Math.floor((R + d[F - 18] + d[F - 324 - 18] + d[F - 324]) / 4), Ma = Math.floor((R +
                  d[F - 324] + d[F - 324 + 18] + d[F + 18]) / 4), qa = Math.floor((R + d[F + 18] + d[F + 324 + 18] + d[F + 324]) / 4), Pa = Math.floor((R + d[F + 324] + d[F + 324 - 18] + d[F - 18]) / 4), ra = Math.floor((Q + e[F - 18] + e[F - 324 - 18] + e[F - 324]) / 4), Qa = Math.floor((Q + e[F - 324] + e[F - 324 + 18] + e[F + 18]) / 4), sa = Math.floor((Q + e[F + 18] + e[F + 324 + 18] + e[F + 324]) / 4), Ra = Math.floor((Q + e[F + 324] + e[F + 324 - 18] + e[F - 18]) / 4)) : na = Ma = qa = Pa = ra = Qa = sa = Ra = 15, g = 0, a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] =
                h.back[g + 4], a.d[a.o++] = 100 * qa + sa, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * na + ra, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * Pa + Ra, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] =
                z, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * na + ra, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 20, a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * qa + sa, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g +
                  1] * da, a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * Ma + Qa, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z);
              X && (0 === blockConfig.lightSource[A] ? (ta = Math.floor((K + d[u - 1] + d[u - 324 - 1] + d[u - 324]) / 4), Sa = Math.floor((K + d[u - 324] + d[u - 324 + 1] + d[u + 1]) / 4), ua = Math.floor((K + d[u + 1] + d[u + 324 + 1] + d[u + 324]) / 4), Ta = Math.floor((K + d[u + 324] + d[u + 324 - 1] + d[u - 1]) / 4), va = Math.floor((M + e[u - 1] + e[u - 324 - 1] + e[u - 324]) / 4), Ua = Math.floor((M + e[u - 324] + e[u - 324 + 1] + e[u + 1]) / 4), wa = Math.floor((M + e[u + 1] + e[u +
                  324 + 1] + e[u + 324]) / 4), Va = Math.floor((M + e[u + 324] + e[u + 324 - 1] + e[u - 1]) / 4)) : ta = Sa = ua = Ta = va = Ua = wa = Va = 15, g = 0, a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * ua + wa, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * ta + va, a.d[a.o++] =
                n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * Ta + Va, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * ua + wa, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 20, a.d[a.o++] = 16 *
                this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * Sa + Ua, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2], a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * ta + va, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z);
              H && (0 === blockConfig.lightSource[A] ? (Wa = Math.floor((L + d[C - 1] + d[C - 324 - 1] + d[C -
                  324]) / 4), xa = Math.floor((L + d[C - 324] + d[C - 324 + 1] + d[C + 1]) / 4), Xa = Math.floor((L + d[C + 1] + d[C + 324 + 1] + d[C + 324]) / 4), ya = Math.floor((L + d[C + 324] + d[C + 324 - 1] + d[C - 1]) / 4), Ya = Math.floor((U + e[C - 1] + e[C - 324 - 1] + e[C - 324]) / 4), za = Math.floor((U + e[C - 324] + e[C - 324 + 1] + e[C + 1]) / 4), Za = Math.floor((U + e[C + 1] + e[C + 324 + 1] + e[C + 324]) / 4), Aa = Math.floor((U + e[C + 324] + e[C + 324 - 1] + e[C - 1]) / 4)) : Wa = xa = Xa = ya = Ya = za = Za = Aa = 15, g = 0, a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1] * ga, a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g +
                  3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * ya + Aa, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1] * ga, a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * Wa + Ya, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * xa + za, a.d[a.o++] = n + 4,
                a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * Xa + Za, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 20, a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1] * ga, a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * ya + Aa, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.left[g],
                a.d[a.o++] = 0 + G + h.left[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * xa + za, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z);
              V && (0 === blockConfig.lightSource[A] ? (Ba = Math.floor((T + d[s - 1] + d[s - 18 - 1] + d[s - 18]) / 4), $a = Math.floor((T + d[s - 18] + d[s - 18 + 1] + d[s + 1]) / 4), Ca = Math.floor((T + d[s + 1] + d[s + 18 + 1] + d[s + 18]) / 4), ab = Math.floor((T + d[s + 18] + d[s + 18 - 1] + d[s - 1]) / 4), Da = Math.floor((P + e[s - 1] + e[s - 18 - 1] + e[s - 18]) / 4), bb = Math.floor((P + e[s - 18] + e[s - 18 + 1] + e[s + 1]) / 4), Ea = Math.floor((P +
                  e[s + 1] + e[s + 18 + 1] + e[s + 18]) / 4), cb = Math.floor((P + e[s + 18] + e[s + 18 - 1] + e[s - 1]) / 4)) : Ba = $a = Ca = ab = Da = bb = Ea = cb = 15, g = 0, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * Ca + Ea, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = z, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 *
                Ba + Da, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = z, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * $a + bb, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = z, g = 15, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * Ca + Ea, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = z, g = 20, a.d[a.o++] =
                16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * ab + cb, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = z, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G + h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * Ba + Da, a.d[a.o++] = n + 5, a.d[a.o++] = 1, a.d[a.o++] = z);
              J && (0 === blockConfig.lightSource[A] ? (Fa = Math.floor((Y + d[r - 1] + d[r - 18 - 1] + d[r -
                  18]) / 4), db = Math.floor((Y + d[r - 18] + d[r - 18 + 1] + d[r + 1]) / 4), Ga = Math.floor((Y + d[r + 1] + d[r + 18 + 1] + d[r + 18]) / 4), eb = Math.floor((Y + d[r + 18] + d[r + 18 - 1] + d[r - 1]) / 4), Ha = Math.floor((N + e[r - 1] + e[r - 18 - 1] + e[r - 18]) / 4), fb = Math.floor((N + e[r - 18] + e[r - 18 + 1] + e[r + 1]) / 4), Ia = Math.floor((N + e[r + 1] + e[r + 18 + 1] + e[r + 18]) / 4), gb = Math.floor((N + e[r + 18] + e[r + 18 - 1] + e[r - 1]) / 4)) : Fa = db = Ga = eb = Ha = fb = Ia = gb = 15, g = 0, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g +
                  4], a.d[a.o++] = 100 * Ga + Ia, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = W, g = 5, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1] * fa, a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * db + fb, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = aa, g = 10, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Fa + Ha, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = $, g = 15, a.d[a.o++] =
                16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1] * da, a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Ga + Ia, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = W, g = 20, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1] * ca, a.d[a.o++] = 16 * this.zPos + D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * Fa + Ha, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = $, g = 25, a.d[a.o++] = 16 * this.xPos + E + h.top[g], a.d[a.o++] = 0 + G + h.top[g + 1] * ga, a.d[a.o++] = 16 * this.zPos +
                D + h.top[g + 2], a.d[a.o++] = h.top[g + 3], a.d[a.o++] = h.top[g + 4], a.d[a.o++] = 100 * eb + gb, a.d[a.o++] = n + 6, a.d[a.o++] = 1, a.d[a.o++] = k)
            } else if (10 === t.shapeType && (p = t.drawLevel, a = B[p], h = t.shape, z = 0, 0 < t.useBiomeColor && (z = this.getBiomeColor(E, D, t.useBiomeColor - 1)), Z || I || X || H || V || J)) {
              if (8 === (m[v] & 8))
                for (a = 8 < y && 0 === p ? B[p + 1] : B[p], g = 0; g < h.front.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.front[g], a.d[a.o++] = 0 + G + h.front[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.front[g + 2], a.d[a.o++] = h.front[g + 3], a.d[a.o++] = h.front[g + 4], a.d[a.o++] = 100 *
                  y + S, a.d[a.o++] = n + 1, a.d[a.o++] = 0.8, a.d[a.o++] = z;
              if (2 === (m[v] & 2))
                for (a = 8 < R && 0 === p ? B[p + 1] : B[p], g = 0; g < h.back.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.back[g], a.d[a.o++] = 0 + G + h.back[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.back[g + 2], a.d[a.o++] = h.back[g + 3], a.d[a.o++] = h.back[g + 4], a.d[a.o++] = 100 * R + Q, a.d[a.o++] = n + 2, a.d[a.o++] = 0.8, a.d[a.o++] = z;
              if (1 === (m[v] & 1))
                for (a = 8 < K && 0 === p ? B[p + 1] : B[p], g = 0; g < h.right.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.right[g], a.d[a.o++] = 0 + G + h.right[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.right[g + 2],
                  a.d[a.o++] = h.right[g + 3], a.d[a.o++] = h.right[g + 4], a.d[a.o++] = 100 * K + M, a.d[a.o++] = n + 3, a.d[a.o++] = 0.55, a.d[a.o++] = z;
              if (4 === (m[v] & 4))
                for (a = 8 < L && 0 === p ? B[p + 1] : B[p], g = 0; g < h.left.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.left[g], a.d[a.o++] = 0 + G + h.left[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.left[g + 2], a.d[a.o++] = h.left[g + 3], a.d[a.o++] = h.left[g + 4], a.d[a.o++] = 100 * L + U, a.d[a.o++] = n + 4, a.d[a.o++] = 0.55, a.d[a.o++] = z;
              if (1 === nb || 0 === m[v])
                for (a = B[p], g = 0; g < h.bottom.length; g += 5) a.d[a.o++] = 16 * this.xPos + E + h.bottom[g], a.d[a.o++] = 0 + G +
                  h.bottom[g + 1], a.d[a.o++] = 16 * this.zPos + D + h.bottom[g + 2], a.d[a.o++] = h.bottom[g + 3], a.d[a.o++] = h.bottom[g + 4], a.d[a.o++] = 100 * T + P, a.d[a.o++] = n + 5, a.d[a.o++] = 0.3, a.d[a.o++] = z
            }
          }
  void 0 !== this.vbo && (0 === b && void 0 !== this.vbo[0] && (this.vbo[0].forEach(function(a) {
    gluu.gl.deleteBuffer(a)
  }), this.ivbo[0].forEach(function(a) {
    gpuMem -= a
  })), 1 === b && void 0 !== this.vbo[1] && (this.vbo[1].forEach(function(a) {
    gluu.gl.deleteBuffer(a)
  }), this.ivbo[1].forEach(function(a) {
    gpuMem -= a
  })));
  if (0 === b) {
    this.ivbo[0] = [];
    this.vbo[0] = [];
    var ba;
    for (ba = 0; 4 > ba; ba++)
      if (0 < B[ba].o) {
        var Ja = new Float32Array(B[ba].d.buffer, 0, B[ba].o);
        this.ivbo[0][ba] = Ja.length;
        this.vbo[0][ba] = gluu.gl.createBuffer();
        gpuMem += Ja.length;
        gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, this.vbo[0][ba]);
        gluu.gl.bufferData(gluu.gl.ARRAY_BUFFER, Ja, gluu.gl.STATIC_DRAW);
        Ja = null
      }
    this.isInit = 1
  }
  if (1 === b) {
    this.ivbo[1] = [];
    this.vbo[1] = [];
    for (ba = 0; 4 > ba; ba++) 0 < B[ba].o && (Ja = new Float32Array(B[ba].d.buffer, 0, B[ba].o), this.ivbo[1][ba] = Ja.length, this.vbo[1][ba] = gluu.gl.createBuffer(), gpuMem += Ja.length, gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, this.vbo[1][ba]),
      gluu.gl.bufferData(gluu.gl.ARRAY_BUFFER, Ja, gluu.gl.STATIC_DRAW), Ja = null);
    this.isInit1 = 1
  }
  return !0
};
Chunk.prototype.getBuffer = function(b) {
  var f = 0,
    c = 0,
    d = 0,
    e = 0,
    m = !1,
    l = !1,
    p = !1,
    q = !1,
    x = c = punkty1[0].o = 0,
    A = 0,
    t = 0,
    a, B = mcWorld.requestChunk(this.xPos + 1, this.zPos);
  void 0 === B && (q = !0); - 1 === B && (q = !0);
  if (-2 === B) return !1;
  var v = mcWorld.requestChunk(this.xPos - 1, this.zPos);
  void 0 === v && (p = !0); - 1 === v && (p = !0);
  if (-2 === v) return !1;
  var C = mcWorld.requestChunk(this.xPos, this.zPos + 1);
  void 0 === C && (m = !0); - 1 === C && (m = !0);
  if (-2 === C) return !1;
  var u = mcWorld.requestChunk(this.xPos, this.zPos - 1);
  void 0 === u && (l = !0); - 1 === u && (l = !0);
  if (-2 ===
    u) return !1;
  this.cacheBiomes = new Float32Array(324);
  var w = f = Math.floor(b[1] / 16);
  2 > b[1] - 16 * f && w--;
  0 > w && (w = 0);
  var F = f;
  13 < b[1] - 16 * f && F++;
  for (16 < F && (F = 16); w <= F; w++)
    if (void 0 !== this.section[w]) {
      var r = this.section[w],
        s = this.section[w - 1],
        n = !1;
      void 0 === s && (n = !0);
      var L = this.section[w + 1],
        K = !1;
      void 0 === L && (K = !0);
      var Y = !0,
        T = !0,
        y = !0;
      a = !0;
      if (!p) {
        var R = v.section[w];
        void 0 !== R && (Y = !1)
      }
      if (!q) {
        var U = B.section[w];
        void 0 !== U && (T = !1)
      }
      if (!l) {
        var M = u.section[w];
        void 0 !== M && (y = !1)
      }
      if (!m) {
        var N = C.section[w];
        void 0 !== N && (a = !1)
      }
      var P = b[0] - 3;
      0 > P && (P = 0);
      var S = b[0] + 4;
      16 < S && (S = 16);
      var Q = b[2] - 3;
      0 > Q && (Q = 0);
      var V = b[2] + 4;
      16 < V && (V = 16);
      var J = b[1] - 16 * w - 3;
      0 > J && (J = 0);
      var Z = b[1] - 16 * w + 3;
      16 < Z && (Z = 16);
      var I, H;
      for (I = J; I < Z; I++)
        for (f = Q; f < V; f++) {
          for (H = P; H < S; H++) d = 256 * I + 16 * f + H, e = 324 * (I + 1) + 18 * (f + 1) + (H + 1), Chunk.cacheBlock[e] = blockConfig[r.blocks[d]].type, c = d % 2, Chunk.cacheData[e] = 0 === c ? r.data[d / 2] & 15 & blockConfig[r.blocks[d]].mask : r.data[d / 2 - 0.5] >> 4 & 15 & blockConfig[r.blocks[d]].mask;
          this.cacheBiomes[18 * (I + 1) + f + 1] = this.biomes[16 * I + f]
        }
      if (n)
        for (f = 0; 16 > f; f++)
          for (H =
            0; 16 > H; H++) e = 0 + 18 * (f + 1) + (H + 1), Chunk.cacheBlock[e] = 0 === w ? 1 : 0;
      else
        for (f = 0; 16 > f; f++)
          for (H = 0; 16 > H; H++) d = 3840 + 16 * f + H, e = 0 + 18 * (f + 1) + (H + 1), Chunk.cacheBlock[e] = blockConfig[s.blocks[d]].type;
      if (K)
        for (f = 0; 16 > f; f++)
          for (H = 0; 16 > H; H++) e = 5508 + 18 * (f + 1) + (H + 1), Chunk.cacheBlock[e] = 15 === w ? 1 : 0;
      else
        for (f = 0; 16 > f; f++)
          for (H = 0; 16 > H; H++) d = 0 + 16 * f + H, e = 5508 + 18 * (f + 1) + (H + 1), Chunk.cacheBlock[e] = blockConfig[L.blocks[d]].type;
      if (a)
        for (I = 0; 16 > I; I++)
          for (H = 0; 16 > H; H++) e = 324 * (I + 1) + 306 + (H + 1), Chunk.cacheBlock[e] = m ? 1 : 0;
      else
        for (I = 0; 16 > I; I++)
          for (H = 0; 16 >
            H; H++) d = 256 * I + 0 + H, e = 324 * (I + 1) + 306 + (H + 1), Chunk.cacheBlock[e] = blockConfig[N.blocks[d]].type;
      if (y)
        for (I = 0; 16 > I; I++)
          for (H = 0; 16 > H; H++) e = 324 * (I + 1) + 0 + (H + 1), Chunk.cacheBlock[e] = l ? 1 : 0;
      else
        for (I = 0; 16 > I; I++)
          for (H = 0; 16 > H; H++) d = 256 * I + 240 + H, e = 324 * (I + 1) + 0 + (H + 1), Chunk.cacheBlock[e] = blockConfig[M.blocks[d]].type;
      if (Y)
        for (I = 0; 16 > I; I++)
          for (f = 0; 16 > f; f++) e = 324 * (I + 1) + 18 * (f + 1) + 0, Chunk.cacheBlock[e] = p ? 1 : 0;
      else
        for (I = 0; 16 > I; I++)
          for (f = 0; 16 > f; f++) d = 256 * I + 16 * f + 15, e = 324 * (I + 1) + 18 * (f + 1) + 0, Chunk.cacheBlock[e] = blockConfig[R.blocks[d]].type;
      if (T)
        for (I =
          0; 16 > I; I++)
          for (f = 0; 16 > f; f++) e = 324 * (I + 1) + 18 * (f + 1) + 17, Chunk.cacheBlock[e] = q ? 1 : 0;
      else
        for (I = 0; 16 > I; I++)
          for (f = 0; 16 > f; f++) d = 256 * I + 16 * f + 0, e = 324 * (I + 1) + 18 * (f + 1) + 17, Chunk.cacheBlock[e] = blockConfig[U.blocks[d]].type;
      var X = y = 0,
        z = 0,
        $ = 0,
        aa = 0,
        W = 0;
      a = 0;
      var e, T, k, I;
      for (e = 16 * w, T = Y = K = L = n = s = !1, k = d = 0, I = J; I < Z; I++)
        for (f = Q; f < V; f++)
          for (H = P; H < S; H++)
            if (T = Y = K = L = n = s = !1, y = 324 * (I + 1) + 18 * (f + 1) + (H + 1), c = Chunk.cacheBlock[y], 0 !== c) {
              X = y + 18;
              z = y - 18;
              $ = y - 1;
              aa = y + 1;
              W = y + 324;
              a = y - 324;
              d = 256 * I + 16 * f + H;
              J = this.xPos % 5;
              0 > J && (J += 5);
              A = this.zPos % 5;
              0 > A && (A += 5);
              J = 65536 *
                (e + I) + 256 * (16 * f + H) + 10 * (5 * J + A);
              if (1 === c || 2 === c || 4 === c || 6 === c) 1 !== Chunk.cacheBlock[W] && (n = !0), 1 !== Chunk.cacheBlock[a] && (s = !0), 1 !== Chunk.cacheBlock[z] && (T = !0), 1 !== Chunk.cacheBlock[X] && (Y = !0), 1 !== Chunk.cacheBlock[$] && (L = !0), 1 !== Chunk.cacheBlock[aa] && (K = !0);
              else if (3 < c) 1 !== Chunk.cacheBlock[W] && Chunk.cacheBlock[W] !== c && (n = !0), 1 !== Chunk.cacheBlock[a] && Chunk.cacheBlock[a] !== c && (s = !0), 1 !== Chunk.cacheBlock[z] && Chunk.cacheBlock[z] !== c && (T = !0), 1 !== Chunk.cacheBlock[X] && Chunk.cacheBlock[X] !== c && (Y = !0), 1 !== Chunk.cacheBlock[$] &&
                Chunk.cacheBlock[$] !== c && (L = !0), 1 !== Chunk.cacheBlock[aa] && Chunk.cacheBlock[aa] !== c && (K = !0);
              else continue;
              if (L || K || T || Y || s || n)
                if (a = punkty1[0], A = r.blocks[d], c = d % 2, 0 === c ? (x = r.data[d / 2] & 15 & blockConfig[r.blocks[d]].mask, k = r.add[d / 2] & 15) : (x = r.data[d / 2 - 0.5] >> 4 & 15 & blockConfig[r.blocks[d]].mask, k = r.add[d / 2 - 0.5] >> 4 & 15), t = void 0 === blockConfig[A][x] ? blockConfig[A][0] : blockConfig[A][x], void 0 !== t.shapeType)
                  if (1 === t.shapeType) {
                    y = c = t.shape;
                    d = 0;
                    1 === t.useBiomeColor && (d = this.getBiomeColor(H, f, 0));
                    0 < k && (y = blockConfig[200][k - 1].shape);
                    if (L)
                      for (k = 0; k < y.front.length; k +=
                        5) a.d[a.o++] = 16 * this.xPos + H + y.front[k], a.d[a.o++] = e + I + y.front[k + 1], a.d[a.o++] = 16 * this.zPos + f + y.front[k + 2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                    if (K)
                      for (k = 0; k < y.back.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + y.back[k], a.d[a.o++] = e + I + y.back[k + 1], a.d[a.o++] = 16 * this.zPos + f + y.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                    if (T)
                      for (k = 0; k < y.right.length; k += 5) a.d[a.o++] = 16 * this.xPos +
                        H + y.right[k], a.d[a.o++] = e + I + y.right[k + 1], a.d[a.o++] = 16 * this.zPos + f + y.right[k + 2], a.d[a.o++] = c.right[k + 3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                    if (Y)
                      for (k = 0; k < y.left.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + y.left[k], a.d[a.o++] = e + I + y.left[k + 1], a.d[a.o++] = 16 * this.zPos + f + y.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                    if (s)
                      for (k = 0; k < y.bottom.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + y.bottom[k], a.d[a.o++] =
                        e + I + y.bottom[k + 1], a.d[a.o++] = 16 * this.zPos + f + y.bottom[k + 2], a.d[a.o++] = c.bottom[k + 3], a.d[a.o++] = c.bottom[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 5, a.d[a.o++] = 0.3, a.d[a.o++] = d;
                    if (n)
                      for (k = 0; k < y.top.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + y.top[k], a.d[a.o++] = e + I + y.top[k + 1], a.d[a.o++] = 16 * this.zPos + f + y.top[k + 2], a.d[a.o++] = c.top[k + 3], a.d[a.o++] = c.top[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 6, a.d[a.o++] = 1, a.d[a.o++] = d
                  } else if (2 !== t.shapeType && 3 !== t.shapeType)
                if (4 === t.shapeType) {
                  c = t.shape;
                  d = this.getBiomeColor(H, f, 0);
                  if (L) {
                    for (k =
                      0; k < c.front2.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.front2[k], a.d[a.o++] = e + I + c.front2[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.front2[k + 2], a.d[a.o++] = c.front2[k + 3], a.d[a.o++] = c.front2[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                    for (k = 0; k < c.front.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.front[k], a.d[a.o++] = e + I + c.front[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.front[k + 2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = 0
                  }
                  if (K) {
                    for (k = 0; k < c.back2.length; k +=
                      5) a.d[a.o++] = 16 * this.xPos + H + c.back2[k], a.d[a.o++] = e + I + c.back2[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.back2[k + 2], a.d[a.o++] = c.back2[k + 3], a.d[a.o++] = c.back2[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                    for (k = 0; k < c.back.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.back[k], a.d[a.o++] = e + I + c.back[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = 0
                  }
                  if (T) {
                    for (k = 0; k < c.right2.length; k += 5) a.d[a.o++] = 16 * this.xPos +
                      H + c.right2[k], a.d[a.o++] = e + I + c.right2[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.right2[k + 2], a.d[a.o++] = c.right2[k + 3], a.d[a.o++] = c.right2[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                    for (k = 0; k < c.right.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.right[k], a.d[a.o++] = e + I + c.right[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.right[k + 2], a.d[a.o++] = c.right[k + 3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = 0
                  }
                  if (Y) {
                    for (k = 0; k < c.left2.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.left2[k],
                      a.d[a.o++] = e + I + c.left2[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.left2[k + 2], a.d[a.o++] = c.left2[k + 3], a.d[a.o++] = c.left2[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                    for (k = 0; k < c.left.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.left[k], a.d[a.o++] = e + I + c.left[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = 0
                  }
                  if (s)
                    for (k = 0; k < c.bottom.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.bottom[k], a.d[a.o++] = e + I + c.bottom[k +
                      1], a.d[a.o++] = 16 * this.zPos + f + c.bottom[k + 2], a.d[a.o++] = c.bottom[k + 3], a.d[a.o++] = c.bottom[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 5, a.d[a.o++] = 0.3, a.d[a.o++] = 0;
                  if (n)
                    for (k = 0; k < c.top.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.top[k], a.d[a.o++] = e + I + c.top[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.top[k + 2], a.d[a.o++] = c.top[k + 3], a.d[a.o++] = c.top[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 6, a.d[a.o++] = 1, a.d[a.o++] = d
                } else if (8 === t.shapeType) {
                c = t.shape;
                d = 0;
                1 === t.useBiomeColor && (d = this.getBiomeColor(H, f, 0));
                W = "";
                W += Chunk.cacheData[y];
                W = Chunk.cacheBlock[y] ===
                  Chunk.cacheBlock[X] ? W + Chunk.cacheData[X] : W + "x";
                W = Chunk.cacheBlock[y] === Chunk.cacheBlock[z] ? W + Chunk.cacheData[z] : W + "x";
                W = Chunk.cacheBlock[y] === Chunk.cacheBlock[$] ? W + Chunk.cacheData[$] : W + "x";
                W = Chunk.cacheBlock[y] === Chunk.cacheBlock[aa] ? W + Chunk.cacheData[aa] : W + "x";
                z = 0;
                X = Chunk.stairsData[W];
                void 0 !== X && (c = 3 < Chunk.cacheData[y] ? blockConfig[A][9].shape : blockConfig[A][8].shape, z = 1);
                if (L)
                  for (k = 0; k < c.front.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.front[k], a.d[a.o++] = e + I + c.front[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.front[k +
                    2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                if (K)
                  for (k = 0; k < c.back.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.back[k], a.d[a.o++] = e + I + c.back[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                if (T)
                  for (k = 0; k < c.right.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.right[k], a.d[a.o++] = e + I + c.right[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.right[k + 2], a.d[a.o++] = c.right[k +
                    3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                if (Y)
                  for (k = 0; k < c.left.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.left[k], a.d[a.o++] = e + I + c.left[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                if (s)
                  for (k = 0; k < c.bottom.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.bottom[k], a.d[a.o++] = e + I + c.bottom[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.bottom[k + 2], a.d[a.o++] = c.bottom[k + 3], a.d[a.o++] =
                    c.bottom[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 5, a.d[a.o++] = 0.3, a.d[a.o++] = d;
                if (n)
                  for (k = 0; k < c.top.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.top[k], a.d[a.o++] = e + I + c.top[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.top[k + 2], a.d[a.o++] = c.top[k + 3], a.d[a.o++] = c.top[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 6, a.d[a.o++] = 1, a.d[a.o++] = d;
                if (1 === z)
                  for (c = blockConfig[A][10].shape, $ = z = 0, 3 < Chunk.cacheData[y] && ($ = -0.5), aa = y = 0; 4 > aa; aa++)
                    if (0 !== X.charCodeAt(aa) - 48) {
                      z = aa % 2 / 2;
                      y = 1 < aa ? 0.5 : 0;
                      if (L)
                        for (k = 0; k < c.front.length; k += 5) a.d[a.o++] = z + 16 * this.xPos + H + c.front[k],
                          a.d[a.o++] = $ + e + I + c.front[k + 1], a.d[a.o++] = y + 16 * this.zPos + f + c.front[k + 2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                      if (K)
                        for (k = 0; k < c.back.length; k += 5) a.d[a.o++] = z + 16 * this.xPos + H + c.back[k], a.d[a.o++] = $ + e + I + c.back[k + 1], a.d[a.o++] = y + 16 * this.zPos + f + c.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                      if (T)
                        for (k = 0; k < c.right.length; k += 5) a.d[a.o++] = z + 16 * this.xPos + H + c.right[k], a.d[a.o++] =
                          $ + e + I + c.right[k + 1], a.d[a.o++] = y + 16 * this.zPos + f + c.right[k + 2], a.d[a.o++] = c.right[k + 3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                      if (Y)
                        for (k = 0; k < c.left.length; k += 5) a.d[a.o++] = z + 16 * this.xPos + H + c.left[k], a.d[a.o++] = $ + e + I + c.left[k + 1], a.d[a.o++] = y + 16 * this.zPos + f + c.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                      if (s)
                        for (k = 0; k < c.bottom.length; k += 5) a.d[a.o++] = z + 16 * this.xPos + H + c.bottom[k], a.d[a.o++] = $ + e + I +
                          c.bottom[k + 1], a.d[a.o++] = y + 16 * this.zPos + f + c.bottom[k + 2], a.d[a.o++] = c.bottom[k + 3], a.d[a.o++] = c.bottom[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 5, a.d[a.o++] = 0.3, a.d[a.o++] = d;
                      if (n)
                        for (k = 0; k < c.top.length; k += 5) a.d[a.o++] = z + 16 * this.xPos + H + c.top[k], a.d[a.o++] = $ + e + I + c.top[k + 1], a.d[a.o++] = y + 16 * this.zPos + f + c.top[k + 2], a.d[a.o++] = c.top[k + 3], a.d[a.o++] = c.top[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 6, a.d[a.o++] = 1, a.d[a.o++] = d
                    }
              } else if (5 === t.shapeType) {
                if (L || K || T || Y || n || s) {
                  c = t.shape;
                  d = 0;
                  1 === t.useBiomeColor && (d = this.getBiomeColor(H,
                    f, 0));
                  for (k = 0; k < c.front.length; k += 5) {
                    if (0 === k % 30) {
                      if ((60 === k || 120 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[X] && 1 !== Chunk.cacheBlock[X]) {
                        k += 25;
                        continue
                      }
                      if ((30 === k || 90 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[z] && 1 !== Chunk.cacheBlock[z]) {
                        k += 25;
                        continue
                      }
                    }
                    a.d[a.o++] = 16 * this.xPos + H + c.front[k];
                    a.d[a.o++] = e + I + c.front[k + 1];
                    a.d[a.o++] = 16 * this.zPos + f + c.front[k + 2];
                    a.d[a.o++] = c.front[k + 3];
                    a.d[a.o++] = c.front[k + 4];
                    a.d[a.o++] = 0;
                    a.d[a.o++] = J + 1;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = d
                  }
                  for (k = 0; k < c.back.length; k += 5) {
                    if (0 ===
                      k % 30) {
                      if ((60 === k || 120 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[X] && 1 !== Chunk.cacheBlock[X]) {
                        k += 25;
                        continue
                      }
                      if ((30 === k || 90 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[z] && 1 !== Chunk.cacheBlock[z]) {
                        k += 25;
                        continue
                      }
                    }
                    a.d[a.o++] = 16 * this.xPos + H + c.back[k];
                    a.d[a.o++] = e + I + c.back[k + 1];
                    a.d[a.o++] = 16 * this.zPos + f + c.back[k + 2];
                    a.d[a.o++] = c.back[k + 3];
                    a.d[a.o++] = c.back[k + 4];
                    a.d[a.o++] = 0;
                    a.d[a.o++] = J + 2;
                    a.d[a.o++] = 0.8;
                    a.d[a.o++] = d
                  }
                  for (k = 0; k < c.right.length; k += 5) {
                    if (0 === k % 30) {
                      if ((30 === k || 90 === k) && Chunk.cacheBlock[y] !==
                        Chunk.cacheBlock[$] && 1 !== Chunk.cacheBlock[$]) {
                        k += 25;
                        continue
                      }
                      if ((60 === k || 120 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[aa] && 1 !== Chunk.cacheBlock[aa]) {
                        k += 25;
                        continue
                      }
                    }
                    a.d[a.o++] = 16 * this.xPos + H + c.right[k];
                    a.d[a.o++] = e + I + c.right[k + 1];
                    a.d[a.o++] = 16 * this.zPos + f + c.right[k + 2];
                    a.d[a.o++] = c.right[k + 3];
                    a.d[a.o++] = c.right[k + 4];
                    a.d[a.o++] = 0;
                    a.d[a.o++] = J + 3;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = d
                  }
                  for (k = 0; k < c.left.length; k += 5) {
                    if (0 === k % 30) {
                      if ((30 === k || 90 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[$] && 1 !== Chunk.cacheBlock[$]) {
                        k +=
                          25;
                        continue
                      }
                      if ((60 === k || 120 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[aa] && 1 !== Chunk.cacheBlock[aa]) {
                        k += 25;
                        continue
                      }
                    }
                    a.d[a.o++] = 16 * this.xPos + H + c.left[k];
                    a.d[a.o++] = e + I + c.left[k + 1];
                    a.d[a.o++] = 16 * this.zPos + f + c.left[k + 2];
                    a.d[a.o++] = c.left[k + 3];
                    a.d[a.o++] = c.left[k + 4];
                    a.d[a.o++] = 0;
                    a.d[a.o++] = J + 4;
                    a.d[a.o++] = 0.55;
                    a.d[a.o++] = d
                  }
                  for (k = 0; k < c.bottom.length; k += 5) {
                    if (0 === k % 30) {
                      if ((30 === k || 150 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[z] && 1 !== Chunk.cacheBlock[z]) {
                        k += 25;
                        continue
                      }
                      if ((60 === k || 180 === k) && Chunk.cacheBlock[y] !==
                        Chunk.cacheBlock[X] && 1 !== Chunk.cacheBlock[X]) {
                        k += 25;
                        continue
                      }
                      if ((90 === k || 210 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[$] && 1 !== Chunk.cacheBlock[$]) {
                        k += 25;
                        continue
                      }
                      if ((120 === k || 240 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[aa] && 1 !== Chunk.cacheBlock[aa]) {
                        k += 25;
                        continue
                      }
                    }
                    a.d[a.o++] = 16 * this.xPos + H + c.bottom[k];
                    a.d[a.o++] = e + I + c.bottom[k + 1];
                    a.d[a.o++] = 16 * this.zPos + f + c.bottom[k + 2];
                    a.d[a.o++] = c.bottom[k + 3];
                    a.d[a.o++] = c.bottom[k + 4];
                    a.d[a.o++] = 0;
                    a.d[a.o++] = J + 5;
                    a.d[a.o++] = 0.3;
                    a.d[a.o++] = d
                  }
                  for (k = 0; k < c.top.length; k +=
                    5) {
                    if (0 === k % 30) {
                      if ((30 === k || 150 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[z] && 1 !== Chunk.cacheBlock[z]) {
                        k += 25;
                        continue
                      }
                      if ((60 === k || 180 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[X] && 1 !== Chunk.cacheBlock[X]) {
                        k += 25;
                        continue
                      }
                      if ((90 === k || 210 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[$] && 1 !== Chunk.cacheBlock[$]) {
                        k += 25;
                        continue
                      }
                      if ((120 === k || 240 === k) && Chunk.cacheBlock[y] !== Chunk.cacheBlock[aa] && 1 !== Chunk.cacheBlock[aa]) {
                        k += 25;
                        continue
                      }
                    }
                    a.d[a.o++] = 16 * this.xPos + H + c.top[k];
                    a.d[a.o++] = e + I + c.top[k + 1];
                    a.d[a.o++] = 16 * this.zPos + f + c.top[k + 2];
                    a.d[a.o++] = c.top[k + 3];
                    a.d[a.o++] = c.top[k + 4];
                    a.d[a.o++] = 0;
                    a.d[a.o++] = J + 6;
                    a.d[a.o++] = 1;
                    a.d[a.o++] = d
                  }
                }
              } else if (6 === t.shapeType) {
                if (c = t.shape, d = 0, 1 === t.useBiomeColor && (d = this.getBiomeColor(H, f, 0)), L || K || T || Y || s || n) {
                  if (5 === x)
                    for (k = 0; k < c.front.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.front[k], a.d[a.o++] = e + I + c.front[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.front[k + 2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                  if (4 ===
                    x)
                    for (k = 0; k < c.back.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.back[k], a.d[a.o++] = e + I + c.back[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                  if (3 === x)
                    for (k = 0; k < c.right.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.right[k], a.d[a.o++] = e + I + c.right[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.right[k + 2], a.d[a.o++] = c.right[k + 3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                  if (2 === x)
                    for (k = 0; k <
                      c.left.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.left[k], a.d[a.o++] = e + I + c.left[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d
                }
              } else if (9 === t.shapeType) {
                c = t.shape;
                d = 0;
                1 === t.useBiomeColor && (d = this.getBiomeColor(H, f, 2));
                if (L)
                  for (k = 0; k < c.front.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.front[k], a.d[a.o++] = e + I + c.front[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.front[k + 2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4],
                    a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                if (K)
                  for (k = 0; k < c.back.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.back[k], a.d[a.o++] = e + I + c.back[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                if (T)
                  for (k = 0; k < c.right.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.right[k], a.d[a.o++] = e + I + c.right[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.right[k + 2], a.d[a.o++] = c.right[k + 3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] =
                    J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                if (Y)
                  for (k = 0; k < c.left.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.left[k], a.d[a.o++] = e + I + c.left[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                if (s)
                  for (k = 0; k < c.bottom.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.bottom[k], a.d[a.o++] = e + I + c.bottom[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.bottom[k + 2], a.d[a.o++] = c.bottom[k + 3], a.d[a.o++] = c.bottom[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 5, a.d[a.o++] =
                    0.3, a.d[a.o++] = d;
                if (n)
                  for (k = 0; k < c.top.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.top[k], a.d[a.o++] = e + I + c.top[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.top[k + 2], a.d[a.o++] = c.top[k + 3], a.d[a.o++] = c.top[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 6, a.d[a.o++] = 1, a.d[a.o++] = d
              } else if (10 === t.shapeType && (c = t.shape, d = 0, 1 === t.useBiomeColor && (d = this.getBiomeColor(H, f, 0)), L || K || T || Y || s || n)) {
                if (8 === (Chunk.cacheData[y] & 8))
                  for (k = 0; k < c.front.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.front[k], a.d[a.o++] = e + I + c.front[k + 1], a.d[a.o++] = 16 * this.zPos +
                    f + c.front[k + 2], a.d[a.o++] = c.front[k + 3], a.d[a.o++] = c.front[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 1, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                if (2 === (Chunk.cacheData[y] & 2))
                  for (k = 0; k < c.back.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.back[k], a.d[a.o++] = e + I + c.back[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.back[k + 2], a.d[a.o++] = c.back[k + 3], a.d[a.o++] = c.back[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 2, a.d[a.o++] = 0.8, a.d[a.o++] = d;
                if (1 === (Chunk.cacheData[y] & 1))
                  for (k = 0; k < c.right.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.right[k], a.d[a.o++] = e + I + c.right[k +
                    1], a.d[a.o++] = 16 * this.zPos + f + c.right[k + 2], a.d[a.o++] = c.right[k + 3], a.d[a.o++] = c.right[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 3, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                if (4 === (Chunk.cacheData[y] & 4))
                  for (k = 0; k < c.left.length; k += 5) a.d[a.o++] = 16 * this.xPos + H + c.left[k], a.d[a.o++] = e + I + c.left[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.left[k + 2], a.d[a.o++] = c.left[k + 3], a.d[a.o++] = c.left[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 4, a.d[a.o++] = 0.55, a.d[a.o++] = d;
                if (1 === Chunk.cacheBlock[W] || 0 === Chunk.cacheData[y])
                  for (k = 0; k < c.bottom.length; k += 5) a.d[a.o++] =
                    16 * this.xPos + H + c.bottom[k], a.d[a.o++] = e + I + c.bottom[k + 1], a.d[a.o++] = 16 * this.zPos + f + c.bottom[k + 2], a.d[a.o++] = c.bottom[k + 3], a.d[a.o++] = c.bottom[k + 4], a.d[a.o++] = 0, a.d[a.o++] = J + 5, a.d[a.o++] = 0.3, a.d[a.o++] = d
              }
            }
    }
  return 0 < punkty1[0].o ? new Float32Array(punkty1[0].d.buffer, 0, punkty1[0].o) : !1
};
