"use client";
import "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/theming-runtime/node_modules/tslib/tslib.es6.mjs
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// node_modules/@material/material-color-utilities/utils/math_utils.js
function signum(num) {
  if (num < 0) {
    return -1;
  } else if (num === 0) {
    return 0;
  } else {
    return 1;
  }
}
function lerp(start, stop, amount) {
  return (1 - amount) * start + amount * stop;
}
function clampInt(min, max, input) {
  if (input < min) {
    return min;
  } else if (input > max) {
    return max;
  }
  return input;
}
function clampDouble(min, max, input) {
  if (input < min) {
    return min;
  } else if (input > max) {
    return max;
  }
  return input;
}
function sanitizeDegreesInt(degrees) {
  degrees = degrees % 360;
  if (degrees < 0) {
    degrees = degrees + 360;
  }
  return degrees;
}
function sanitizeDegreesDouble(degrees) {
  degrees = degrees % 360;
  if (degrees < 0) {
    degrees = degrees + 360;
  }
  return degrees;
}
function differenceDegrees(a, b) {
  return 180 - Math.abs(Math.abs(a - b) - 180);
}
function matrixMultiply(row, matrix) {
  const a = row[0] * matrix[0][0] + row[1] * matrix[0][1] + row[2] * matrix[0][2];
  const b = row[0] * matrix[1][0] + row[1] * matrix[1][1] + row[2] * matrix[1][2];
  const c = row[0] * matrix[2][0] + row[1] * matrix[2][1] + row[2] * matrix[2][2];
  return [a, b, c];
}

// node_modules/@material/material-color-utilities/utils/color_utils.js
var SRGB_TO_XYZ = [
  [0.41233895, 0.35762064, 0.18051042],
  [0.2126, 0.7152, 0.0722],
  [0.01932141, 0.11916382, 0.95034478]
];
var XYZ_TO_SRGB = [
  [
    3.2413774792388685,
    -1.5376652402851851,
    -0.49885366846268053
  ],
  [
    -0.9691452513005321,
    1.8758853451067872,
    0.04156585616912061
  ],
  [
    0.05562093689691305,
    -0.20395524564742123,
    1.0571799111220335
  ]
];
var WHITE_POINT_D65 = [95.047, 100, 108.883];
function argbFromRgb(red, green, blue) {
  return (255 << 24 | (red & 255) << 16 | (green & 255) << 8 | blue & 255) >>> 0;
}
function argbFromLinrgb(linrgb) {
  const r = delinearized(linrgb[0]);
  const g = delinearized(linrgb[1]);
  const b = delinearized(linrgb[2]);
  return argbFromRgb(r, g, b);
}
function redFromArgb(argb) {
  return argb >> 16 & 255;
}
function greenFromArgb(argb) {
  return argb >> 8 & 255;
}
function blueFromArgb(argb) {
  return argb & 255;
}
function argbFromXyz(x, y, z) {
  const matrix = XYZ_TO_SRGB;
  const linearR = matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z;
  const linearG = matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z;
  const linearB = matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z;
  const r = delinearized(linearR);
  const g = delinearized(linearG);
  const b = delinearized(linearB);
  return argbFromRgb(r, g, b);
}
function xyzFromArgb(argb) {
  const r = linearized(redFromArgb(argb));
  const g = linearized(greenFromArgb(argb));
  const b = linearized(blueFromArgb(argb));
  return matrixMultiply([r, g, b], SRGB_TO_XYZ);
}
function argbFromLstar(lstar) {
  const y = yFromLstar(lstar);
  const component = delinearized(y);
  return argbFromRgb(component, component, component);
}
function lstarFromArgb(argb) {
  const y = xyzFromArgb(argb)[1];
  return 116 * labF(y / 100) - 16;
}
function yFromLstar(lstar) {
  return 100 * labInvf((lstar + 16) / 116);
}
function lstarFromY(y) {
  return labF(y / 100) * 116 - 16;
}
function linearized(rgbComponent) {
  const normalized = rgbComponent / 255;
  if (normalized <= 0.040449936) {
    return normalized / 12.92 * 100;
  } else {
    return Math.pow((normalized + 0.055) / 1.055, 2.4) * 100;
  }
}
function delinearized(rgbComponent) {
  const normalized = rgbComponent / 100;
  let delinearized2 = 0;
  if (normalized <= 31308e-7) {
    delinearized2 = normalized * 12.92;
  } else {
    delinearized2 = 1.055 * Math.pow(normalized, 1 / 2.4) - 0.055;
  }
  return clampInt(0, 255, Math.round(delinearized2 * 255));
}
function whitePointD65() {
  return WHITE_POINT_D65;
}
function labF(t) {
  const e = 216 / 24389;
  const kappa = 24389 / 27;
  if (t > e) {
    return Math.pow(t, 1 / 3);
  } else {
    return (kappa * t + 16) / 116;
  }
}
function labInvf(ft) {
  const e = 216 / 24389;
  const kappa = 24389 / 27;
  const ft3 = ft * ft * ft;
  if (ft3 > e) {
    return ft3;
  } else {
    return (116 * ft - 16) / kappa;
  }
}

// node_modules/@material/material-color-utilities/hct/viewing_conditions.js
var ViewingConditions = class _ViewingConditions {
  /**
   * Create ViewingConditions from a simple, physically relevant, set of
   * parameters.
   *
   * @param whitePoint White point, measured in the XYZ color space.
   *     default = D65, or sunny day afternoon
   * @param adaptingLuminance The luminance of the adapting field. Informally,
   *     how bright it is in the room where the color is viewed. Can be
   *     calculated from lux by multiplying lux by 0.0586. default = 11.72,
   *     or 200 lux.
   * @param backgroundLstar The lightness of the area surrounding the color.
   *     measured by L* in L*a*b*. default = 50.0
   * @param surround A general description of the lighting surrounding the
   *     color. 0 is pitch dark, like watching a movie in a theater. 1.0 is a
   *     dimly light room, like watching TV at home at night. 2.0 means there
   *     is no difference between the lighting on the color and around it.
   *     default = 2.0
   * @param discountingIlluminant Whether the eye accounts for the tint of the
   *     ambient lighting, such as knowing an apple is still red in green light.
   *     default = false, the eye does not perform this process on
   *       self-luminous objects like displays.
   */
  static make(whitePoint = whitePointD65(), adaptingLuminance = 200 / Math.PI * yFromLstar(50) / 100, backgroundLstar = 50, surround = 2, discountingIlluminant = false) {
    const xyz = whitePoint;
    const rW = xyz[0] * 0.401288 + xyz[1] * 0.650173 + xyz[2] * -0.051461;
    const gW = xyz[0] * -0.250268 + xyz[1] * 1.204414 + xyz[2] * 0.045854;
    const bW = xyz[0] * -2079e-6 + xyz[1] * 0.048952 + xyz[2] * 0.953127;
    const f = 0.8 + surround / 10;
    const c = f >= 0.9 ? lerp(0.59, 0.69, (f - 0.9) * 10) : lerp(0.525, 0.59, (f - 0.8) * 10);
    let d = discountingIlluminant ? 1 : f * (1 - 1 / 3.6 * Math.exp((-adaptingLuminance - 42) / 92));
    d = d > 1 ? 1 : d < 0 ? 0 : d;
    const nc = f;
    const rgbD = [
      d * (100 / rW) + 1 - d,
      d * (100 / gW) + 1 - d,
      d * (100 / bW) + 1 - d
    ];
    const k = 1 / (5 * adaptingLuminance + 1);
    const k4 = k * k * k * k;
    const k4F = 1 - k4;
    const fl = k4 * adaptingLuminance + 0.1 * k4F * k4F * Math.cbrt(5 * adaptingLuminance);
    const n = yFromLstar(backgroundLstar) / whitePoint[1];
    const z = 1.48 + Math.sqrt(n);
    const nbb = 0.725 / Math.pow(n, 0.2);
    const ncb = nbb;
    const rgbAFactors = [
      Math.pow(fl * rgbD[0] * rW / 100, 0.42),
      Math.pow(fl * rgbD[1] * gW / 100, 0.42),
      Math.pow(fl * rgbD[2] * bW / 100, 0.42)
    ];
    const rgbA = [
      400 * rgbAFactors[0] / (rgbAFactors[0] + 27.13),
      400 * rgbAFactors[1] / (rgbAFactors[1] + 27.13),
      400 * rgbAFactors[2] / (rgbAFactors[2] + 27.13)
    ];
    const aw = (2 * rgbA[0] + rgbA[1] + 0.05 * rgbA[2]) * nbb;
    return new _ViewingConditions(n, aw, nbb, ncb, c, nc, rgbD, fl, Math.pow(fl, 0.25), z);
  }
  /**
   * Parameters are intermediate values of the CAM16 conversion process. Their
   * names are shorthand for technical color science terminology, this class
   * would not benefit from documenting them individually. A brief overview
   * is available in the CAM16 specification, and a complete overview requires
   * a color science textbook, such as Fairchild's Color Appearance Models.
   */
  constructor(n, aw, nbb, ncb, c, nc, rgbD, fl, fLRoot, z) {
    this.n = n;
    this.aw = aw;
    this.nbb = nbb;
    this.ncb = ncb;
    this.c = c;
    this.nc = nc;
    this.rgbD = rgbD;
    this.fl = fl;
    this.fLRoot = fLRoot;
    this.z = z;
  }
};
ViewingConditions.DEFAULT = ViewingConditions.make();

// node_modules/@material/material-color-utilities/hct/cam16.js
var Cam16 = class _Cam16 {
  /**
   * All of the CAM16 dimensions can be calculated from 3 of the dimensions, in
   * the following combinations:
   *      -  {j or q} and {c, m, or s} and hue
   *      - jstar, astar, bstar
   * Prefer using a static method that constructs from 3 of those dimensions.
   * This constructor is intended for those methods to use to return all
   * possible dimensions.
   *
   * @param hue
   * @param chroma informally, colorfulness / color intensity. like saturation
   *     in HSL, except perceptually accurate.
   * @param j lightness
   * @param q brightness; ratio of lightness to white point's lightness
   * @param m colorfulness
   * @param s saturation; ratio of chroma to white point's chroma
   * @param jstar CAM16-UCS J coordinate
   * @param astar CAM16-UCS a coordinate
   * @param bstar CAM16-UCS b coordinate
   */
  constructor(hue, chroma, j, q, m, s, jstar, astar, bstar) {
    this.hue = hue;
    this.chroma = chroma;
    this.j = j;
    this.q = q;
    this.m = m;
    this.s = s;
    this.jstar = jstar;
    this.astar = astar;
    this.bstar = bstar;
  }
  /**
   * CAM16 instances also have coordinates in the CAM16-UCS space, called J*,
   * a*, b*, or jstar, astar, bstar in code. CAM16-UCS is included in the CAM16
   * specification, and is used to measure distances between colors.
   */
  distance(other) {
    const dJ = this.jstar - other.jstar;
    const dA = this.astar - other.astar;
    const dB = this.bstar - other.bstar;
    const dEPrime = Math.sqrt(dJ * dJ + dA * dA + dB * dB);
    const dE = 1.41 * Math.pow(dEPrime, 0.63);
    return dE;
  }
  /**
   * @param argb ARGB representation of a color.
   * @return CAM16 color, assuming the color was viewed in default viewing
   *     conditions.
   */
  static fromInt(argb) {
    return _Cam16.fromIntInViewingConditions(argb, ViewingConditions.DEFAULT);
  }
  /**
   * @param argb ARGB representation of a color.
   * @param viewingConditions Information about the environment where the color
   *     was observed.
   * @return CAM16 color.
   */
  static fromIntInViewingConditions(argb, viewingConditions) {
    const red = (argb & 16711680) >> 16;
    const green = (argb & 65280) >> 8;
    const blue = argb & 255;
    const redL = linearized(red);
    const greenL = linearized(green);
    const blueL = linearized(blue);
    const x = 0.41233895 * redL + 0.35762064 * greenL + 0.18051042 * blueL;
    const y = 0.2126 * redL + 0.7152 * greenL + 0.0722 * blueL;
    const z = 0.01932141 * redL + 0.11916382 * greenL + 0.95034478 * blueL;
    const rC = 0.401288 * x + 0.650173 * y - 0.051461 * z;
    const gC = -0.250268 * x + 1.204414 * y + 0.045854 * z;
    const bC = -2079e-6 * x + 0.048952 * y + 0.953127 * z;
    const rD = viewingConditions.rgbD[0] * rC;
    const gD = viewingConditions.rgbD[1] * gC;
    const bD = viewingConditions.rgbD[2] * bC;
    const rAF = Math.pow(viewingConditions.fl * Math.abs(rD) / 100, 0.42);
    const gAF = Math.pow(viewingConditions.fl * Math.abs(gD) / 100, 0.42);
    const bAF = Math.pow(viewingConditions.fl * Math.abs(bD) / 100, 0.42);
    const rA = signum(rD) * 400 * rAF / (rAF + 27.13);
    const gA = signum(gD) * 400 * gAF / (gAF + 27.13);
    const bA = signum(bD) * 400 * bAF / (bAF + 27.13);
    const a = (11 * rA + -12 * gA + bA) / 11;
    const b = (rA + gA - 2 * bA) / 9;
    const u = (20 * rA + 20 * gA + 21 * bA) / 20;
    const p2 = (40 * rA + 20 * gA + bA) / 20;
    const atan2 = Math.atan2(b, a);
    const atanDegrees = atan2 * 180 / Math.PI;
    const hue = atanDegrees < 0 ? atanDegrees + 360 : atanDegrees >= 360 ? atanDegrees - 360 : atanDegrees;
    const hueRadians = hue * Math.PI / 180;
    const ac = p2 * viewingConditions.nbb;
    const j = 100 * Math.pow(ac / viewingConditions.aw, viewingConditions.c * viewingConditions.z);
    const q = 4 / viewingConditions.c * Math.sqrt(j / 100) * (viewingConditions.aw + 4) * viewingConditions.fLRoot;
    const huePrime = hue < 20.14 ? hue + 360 : hue;
    const eHue = 0.25 * (Math.cos(huePrime * Math.PI / 180 + 2) + 3.8);
    const p1 = 5e4 / 13 * eHue * viewingConditions.nc * viewingConditions.ncb;
    const t = p1 * Math.sqrt(a * a + b * b) / (u + 0.305);
    const alpha = Math.pow(t, 0.9) * Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73);
    const c = alpha * Math.sqrt(j / 100);
    const m = c * viewingConditions.fLRoot;
    const s = 50 * Math.sqrt(alpha * viewingConditions.c / (viewingConditions.aw + 4));
    const jstar = (1 + 100 * 7e-3) * j / (1 + 7e-3 * j);
    const mstar = 1 / 0.0228 * Math.log(1 + 0.0228 * m);
    const astar = mstar * Math.cos(hueRadians);
    const bstar = mstar * Math.sin(hueRadians);
    return new _Cam16(hue, c, j, q, m, s, jstar, astar, bstar);
  }
  /**
   * @param j CAM16 lightness
   * @param c CAM16 chroma
   * @param h CAM16 hue
   */
  static fromJch(j, c, h) {
    return _Cam16.fromJchInViewingConditions(j, c, h, ViewingConditions.DEFAULT);
  }
  /**
   * @param j CAM16 lightness
   * @param c CAM16 chroma
   * @param h CAM16 hue
   * @param viewingConditions Information about the environment where the color
   *     was observed.
   */
  static fromJchInViewingConditions(j, c, h, viewingConditions) {
    const q = 4 / viewingConditions.c * Math.sqrt(j / 100) * (viewingConditions.aw + 4) * viewingConditions.fLRoot;
    const m = c * viewingConditions.fLRoot;
    const alpha = c / Math.sqrt(j / 100);
    const s = 50 * Math.sqrt(alpha * viewingConditions.c / (viewingConditions.aw + 4));
    const hueRadians = h * Math.PI / 180;
    const jstar = (1 + 100 * 7e-3) * j / (1 + 7e-3 * j);
    const mstar = 1 / 0.0228 * Math.log(1 + 0.0228 * m);
    const astar = mstar * Math.cos(hueRadians);
    const bstar = mstar * Math.sin(hueRadians);
    return new _Cam16(h, c, j, q, m, s, jstar, astar, bstar);
  }
  /**
   * @param jstar CAM16-UCS lightness.
   * @param astar CAM16-UCS a dimension. Like a* in L*a*b*, it is a Cartesian
   *     coordinate on the Y axis.
   * @param bstar CAM16-UCS b dimension. Like a* in L*a*b*, it is a Cartesian
   *     coordinate on the X axis.
   */
  static fromUcs(jstar, astar, bstar) {
    return _Cam16.fromUcsInViewingConditions(jstar, astar, bstar, ViewingConditions.DEFAULT);
  }
  /**
   * @param jstar CAM16-UCS lightness.
   * @param astar CAM16-UCS a dimension. Like a* in L*a*b*, it is a Cartesian
   *     coordinate on the Y axis.
   * @param bstar CAM16-UCS b dimension. Like a* in L*a*b*, it is a Cartesian
   *     coordinate on the X axis.
   * @param viewingConditions Information about the environment where the color
   *     was observed.
   */
  static fromUcsInViewingConditions(jstar, astar, bstar, viewingConditions) {
    const a = astar;
    const b = bstar;
    const m = Math.sqrt(a * a + b * b);
    const M = (Math.exp(m * 0.0228) - 1) / 0.0228;
    const c = M / viewingConditions.fLRoot;
    let h = Math.atan2(b, a) * (180 / Math.PI);
    if (h < 0) {
      h += 360;
    }
    const j = jstar / (1 - (jstar - 100) * 7e-3);
    return _Cam16.fromJchInViewingConditions(j, c, h, viewingConditions);
  }
  /**
   *  @return ARGB representation of color, assuming the color was viewed in
   *     default viewing conditions, which are near-identical to the default
   *     viewing conditions for sRGB.
   */
  toInt() {
    return this.viewed(ViewingConditions.DEFAULT);
  }
  /**
   * @param viewingConditions Information about the environment where the color
   *     will be viewed.
   * @return ARGB representation of color
   */
  viewed(viewingConditions) {
    const alpha = this.chroma === 0 || this.j === 0 ? 0 : this.chroma / Math.sqrt(this.j / 100);
    const t = Math.pow(alpha / Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73), 1 / 0.9);
    const hRad = this.hue * Math.PI / 180;
    const eHue = 0.25 * (Math.cos(hRad + 2) + 3.8);
    const ac = viewingConditions.aw * Math.pow(this.j / 100, 1 / viewingConditions.c / viewingConditions.z);
    const p1 = eHue * (5e4 / 13) * viewingConditions.nc * viewingConditions.ncb;
    const p2 = ac / viewingConditions.nbb;
    const hSin = Math.sin(hRad);
    const hCos = Math.cos(hRad);
    const gamma = 23 * (p2 + 0.305) * t / (23 * p1 + 11 * t * hCos + 108 * t * hSin);
    const a = gamma * hCos;
    const b = gamma * hSin;
    const rA = (460 * p2 + 451 * a + 288 * b) / 1403;
    const gA = (460 * p2 - 891 * a - 261 * b) / 1403;
    const bA = (460 * p2 - 220 * a - 6300 * b) / 1403;
    const rCBase = Math.max(0, 27.13 * Math.abs(rA) / (400 - Math.abs(rA)));
    const rC = signum(rA) * (100 / viewingConditions.fl) * Math.pow(rCBase, 1 / 0.42);
    const gCBase = Math.max(0, 27.13 * Math.abs(gA) / (400 - Math.abs(gA)));
    const gC = signum(gA) * (100 / viewingConditions.fl) * Math.pow(gCBase, 1 / 0.42);
    const bCBase = Math.max(0, 27.13 * Math.abs(bA) / (400 - Math.abs(bA)));
    const bC = signum(bA) * (100 / viewingConditions.fl) * Math.pow(bCBase, 1 / 0.42);
    const rF = rC / viewingConditions.rgbD[0];
    const gF = gC / viewingConditions.rgbD[1];
    const bF = bC / viewingConditions.rgbD[2];
    const x = 1.86206786 * rF - 1.01125463 * gF + 0.14918677 * bF;
    const y = 0.38752654 * rF + 0.62144744 * gF - 897398e-8 * bF;
    const z = -0.0158415 * rF - 0.03412294 * gF + 1.04996444 * bF;
    const argb = argbFromXyz(x, y, z);
    return argb;
  }
  /// Given color expressed in XYZ and viewed in [viewingConditions], convert to
  /// CAM16.
  static fromXyzInViewingConditions(x, y, z, viewingConditions) {
    const rC = 0.401288 * x + 0.650173 * y - 0.051461 * z;
    const gC = -0.250268 * x + 1.204414 * y + 0.045854 * z;
    const bC = -2079e-6 * x + 0.048952 * y + 0.953127 * z;
    const rD = viewingConditions.rgbD[0] * rC;
    const gD = viewingConditions.rgbD[1] * gC;
    const bD = viewingConditions.rgbD[2] * bC;
    const rAF = Math.pow(viewingConditions.fl * Math.abs(rD) / 100, 0.42);
    const gAF = Math.pow(viewingConditions.fl * Math.abs(gD) / 100, 0.42);
    const bAF = Math.pow(viewingConditions.fl * Math.abs(bD) / 100, 0.42);
    const rA = signum(rD) * 400 * rAF / (rAF + 27.13);
    const gA = signum(gD) * 400 * gAF / (gAF + 27.13);
    const bA = signum(bD) * 400 * bAF / (bAF + 27.13);
    const a = (11 * rA + -12 * gA + bA) / 11;
    const b = (rA + gA - 2 * bA) / 9;
    const u = (20 * rA + 20 * gA + 21 * bA) / 20;
    const p2 = (40 * rA + 20 * gA + bA) / 20;
    const atan2 = Math.atan2(b, a);
    const atanDegrees = atan2 * 180 / Math.PI;
    const hue = atanDegrees < 0 ? atanDegrees + 360 : atanDegrees >= 360 ? atanDegrees - 360 : atanDegrees;
    const hueRadians = hue * Math.PI / 180;
    const ac = p2 * viewingConditions.nbb;
    const J = 100 * Math.pow(ac / viewingConditions.aw, viewingConditions.c * viewingConditions.z);
    const Q = 4 / viewingConditions.c * Math.sqrt(J / 100) * (viewingConditions.aw + 4) * viewingConditions.fLRoot;
    const huePrime = hue < 20.14 ? hue + 360 : hue;
    const eHue = 1 / 4 * (Math.cos(huePrime * Math.PI / 180 + 2) + 3.8);
    const p1 = 5e4 / 13 * eHue * viewingConditions.nc * viewingConditions.ncb;
    const t = p1 * Math.sqrt(a * a + b * b) / (u + 0.305);
    const alpha = Math.pow(t, 0.9) * Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73);
    const C = alpha * Math.sqrt(J / 100);
    const M = C * viewingConditions.fLRoot;
    const s = 50 * Math.sqrt(alpha * viewingConditions.c / (viewingConditions.aw + 4));
    const jstar = (1 + 100 * 7e-3) * J / (1 + 7e-3 * J);
    const mstar = Math.log(1 + 0.0228 * M) / 0.0228;
    const astar = mstar * Math.cos(hueRadians);
    const bstar = mstar * Math.sin(hueRadians);
    return new _Cam16(hue, C, J, Q, M, s, jstar, astar, bstar);
  }
  /// XYZ representation of CAM16 seen in [viewingConditions].
  xyzInViewingConditions(viewingConditions) {
    const alpha = this.chroma === 0 || this.j === 0 ? 0 : this.chroma / Math.sqrt(this.j / 100);
    const t = Math.pow(alpha / Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73), 1 / 0.9);
    const hRad = this.hue * Math.PI / 180;
    const eHue = 0.25 * (Math.cos(hRad + 2) + 3.8);
    const ac = viewingConditions.aw * Math.pow(this.j / 100, 1 / viewingConditions.c / viewingConditions.z);
    const p1 = eHue * (5e4 / 13) * viewingConditions.nc * viewingConditions.ncb;
    const p2 = ac / viewingConditions.nbb;
    const hSin = Math.sin(hRad);
    const hCos = Math.cos(hRad);
    const gamma = 23 * (p2 + 0.305) * t / (23 * p1 + 11 * t * hCos + 108 * t * hSin);
    const a = gamma * hCos;
    const b = gamma * hSin;
    const rA = (460 * p2 + 451 * a + 288 * b) / 1403;
    const gA = (460 * p2 - 891 * a - 261 * b) / 1403;
    const bA = (460 * p2 - 220 * a - 6300 * b) / 1403;
    const rCBase = Math.max(0, 27.13 * Math.abs(rA) / (400 - Math.abs(rA)));
    const rC = signum(rA) * (100 / viewingConditions.fl) * Math.pow(rCBase, 1 / 0.42);
    const gCBase = Math.max(0, 27.13 * Math.abs(gA) / (400 - Math.abs(gA)));
    const gC = signum(gA) * (100 / viewingConditions.fl) * Math.pow(gCBase, 1 / 0.42);
    const bCBase = Math.max(0, 27.13 * Math.abs(bA) / (400 - Math.abs(bA)));
    const bC = signum(bA) * (100 / viewingConditions.fl) * Math.pow(bCBase, 1 / 0.42);
    const rF = rC / viewingConditions.rgbD[0];
    const gF = gC / viewingConditions.rgbD[1];
    const bF = bC / viewingConditions.rgbD[2];
    const x = 1.86206786 * rF - 1.01125463 * gF + 0.14918677 * bF;
    const y = 0.38752654 * rF + 0.62144744 * gF - 897398e-8 * bF;
    const z = -0.0158415 * rF - 0.03412294 * gF + 1.04996444 * bF;
    return [x, y, z];
  }
};

// node_modules/@material/material-color-utilities/hct/hct_solver.js
var HctSolver = class _HctSolver {
  /**
   * Sanitizes a small enough angle in radians.
   *
   * @param angle An angle in radians; must not deviate too much
   * from 0.
   * @return A coterminal angle between 0 and 2pi.
   */
  static sanitizeRadians(angle) {
    return (angle + Math.PI * 8) % (Math.PI * 2);
  }
  /**
   * Delinearizes an RGB component, returning a floating-point
   * number.
   *
   * @param rgbComponent 0.0 <= rgb_component <= 100.0, represents
   * linear R/G/B channel
   * @return 0.0 <= output <= 255.0, color channel converted to
   * regular RGB space
   */
  static trueDelinearized(rgbComponent) {
    const normalized = rgbComponent / 100;
    let delinearized2 = 0;
    if (normalized <= 31308e-7) {
      delinearized2 = normalized * 12.92;
    } else {
      delinearized2 = 1.055 * Math.pow(normalized, 1 / 2.4) - 0.055;
    }
    return delinearized2 * 255;
  }
  static chromaticAdaptation(component) {
    const af = Math.pow(Math.abs(component), 0.42);
    return signum(component) * 400 * af / (af + 27.13);
  }
  /**
   * Returns the hue of a linear RGB color in CAM16.
   *
   * @param linrgb The linear RGB coordinates of a color.
   * @return The hue of the color in CAM16, in radians.
   */
  static hueOf(linrgb) {
    const scaledDiscount = matrixMultiply(linrgb, _HctSolver.SCALED_DISCOUNT_FROM_LINRGB);
    const rA = _HctSolver.chromaticAdaptation(scaledDiscount[0]);
    const gA = _HctSolver.chromaticAdaptation(scaledDiscount[1]);
    const bA = _HctSolver.chromaticAdaptation(scaledDiscount[2]);
    const a = (11 * rA + -12 * gA + bA) / 11;
    const b = (rA + gA - 2 * bA) / 9;
    return Math.atan2(b, a);
  }
  static areInCyclicOrder(a, b, c) {
    const deltaAB = _HctSolver.sanitizeRadians(b - a);
    const deltaAC = _HctSolver.sanitizeRadians(c - a);
    return deltaAB < deltaAC;
  }
  /**
   * Solves the lerp equation.
   *
   * @param source The starting number.
   * @param mid The number in the middle.
   * @param target The ending number.
   * @return A number t such that lerp(source, target, t) = mid.
   */
  static intercept(source, mid, target) {
    return (mid - source) / (target - source);
  }
  static lerpPoint(source, t, target) {
    return [
      source[0] + (target[0] - source[0]) * t,
      source[1] + (target[1] - source[1]) * t,
      source[2] + (target[2] - source[2]) * t
    ];
  }
  /**
   * Intersects a segment with a plane.
   *
   * @param source The coordinates of point A.
   * @param coordinate The R-, G-, or B-coordinate of the plane.
   * @param target The coordinates of point B.
   * @param axis The axis the plane is perpendicular with. (0: R, 1:
   * G, 2: B)
   * @return The intersection point of the segment AB with the plane
   * R=coordinate, G=coordinate, or B=coordinate
   */
  static setCoordinate(source, coordinate, target, axis) {
    const t = _HctSolver.intercept(source[axis], coordinate, target[axis]);
    return _HctSolver.lerpPoint(source, t, target);
  }
  static isBounded(x) {
    return 0 <= x && x <= 100;
  }
  /**
   * Returns the nth possible vertex of the polygonal intersection.
   *
   * @param y The Y value of the plane.
   * @param n The zero-based index of the point. 0 <= n <= 11.
   * @return The nth possible vertex of the polygonal intersection
   * of the y plane and the RGB cube, in linear RGB coordinates, if
   * it exists. If this possible vertex lies outside of the cube,
   * [-1.0, -1.0, -1.0] is returned.
   */
  static nthVertex(y, n) {
    const kR = _HctSolver.Y_FROM_LINRGB[0];
    const kG = _HctSolver.Y_FROM_LINRGB[1];
    const kB = _HctSolver.Y_FROM_LINRGB[2];
    const coordA = n % 4 <= 1 ? 0 : 100;
    const coordB = n % 2 === 0 ? 0 : 100;
    if (n < 4) {
      const g = coordA;
      const b = coordB;
      const r = (y - g * kG - b * kB) / kR;
      if (_HctSolver.isBounded(r)) {
        return [r, g, b];
      } else {
        return [-1, -1, -1];
      }
    } else if (n < 8) {
      const b = coordA;
      const r = coordB;
      const g = (y - r * kR - b * kB) / kG;
      if (_HctSolver.isBounded(g)) {
        return [r, g, b];
      } else {
        return [-1, -1, -1];
      }
    } else {
      const r = coordA;
      const g = coordB;
      const b = (y - r * kR - g * kG) / kB;
      if (_HctSolver.isBounded(b)) {
        return [r, g, b];
      } else {
        return [-1, -1, -1];
      }
    }
  }
  /**
   * Finds the segment containing the desired color.
   *
   * @param y The Y value of the color.
   * @param targetHue The hue of the color.
   * @return A list of two sets of linear RGB coordinates, each
   * corresponding to an endpoint of the segment containing the
   * desired color.
   */
  static bisectToSegment(y, targetHue) {
    let left = [-1, -1, -1];
    let right = left;
    let leftHue = 0;
    let rightHue = 0;
    let initialized = false;
    let uncut = true;
    for (let n = 0; n < 12; n++) {
      const mid = _HctSolver.nthVertex(y, n);
      if (mid[0] < 0) {
        continue;
      }
      const midHue = _HctSolver.hueOf(mid);
      if (!initialized) {
        left = mid;
        right = mid;
        leftHue = midHue;
        rightHue = midHue;
        initialized = true;
        continue;
      }
      if (uncut || _HctSolver.areInCyclicOrder(leftHue, midHue, rightHue)) {
        uncut = false;
        if (_HctSolver.areInCyclicOrder(leftHue, targetHue, midHue)) {
          right = mid;
          rightHue = midHue;
        } else {
          left = mid;
          leftHue = midHue;
        }
      }
    }
    return [left, right];
  }
  static midpoint(a, b) {
    return [
      (a[0] + b[0]) / 2,
      (a[1] + b[1]) / 2,
      (a[2] + b[2]) / 2
    ];
  }
  static criticalPlaneBelow(x) {
    return Math.floor(x - 0.5);
  }
  static criticalPlaneAbove(x) {
    return Math.ceil(x - 0.5);
  }
  /**
   * Finds a color with the given Y and hue on the boundary of the
   * cube.
   *
   * @param y The Y value of the color.
   * @param targetHue The hue of the color.
   * @return The desired color, in linear RGB coordinates.
   */
  static bisectToLimit(y, targetHue) {
    const segment = _HctSolver.bisectToSegment(y, targetHue);
    let left = segment[0];
    let leftHue = _HctSolver.hueOf(left);
    let right = segment[1];
    for (let axis = 0; axis < 3; axis++) {
      if (left[axis] !== right[axis]) {
        let lPlane = -1;
        let rPlane = 255;
        if (left[axis] < right[axis]) {
          lPlane = _HctSolver.criticalPlaneBelow(_HctSolver.trueDelinearized(left[axis]));
          rPlane = _HctSolver.criticalPlaneAbove(_HctSolver.trueDelinearized(right[axis]));
        } else {
          lPlane = _HctSolver.criticalPlaneAbove(_HctSolver.trueDelinearized(left[axis]));
          rPlane = _HctSolver.criticalPlaneBelow(_HctSolver.trueDelinearized(right[axis]));
        }
        for (let i = 0; i < 8; i++) {
          if (Math.abs(rPlane - lPlane) <= 1) {
            break;
          } else {
            const mPlane = Math.floor((lPlane + rPlane) / 2);
            const midPlaneCoordinate = _HctSolver.CRITICAL_PLANES[mPlane];
            const mid = _HctSolver.setCoordinate(left, midPlaneCoordinate, right, axis);
            const midHue = _HctSolver.hueOf(mid);
            if (_HctSolver.areInCyclicOrder(leftHue, targetHue, midHue)) {
              right = mid;
              rPlane = mPlane;
            } else {
              left = mid;
              leftHue = midHue;
              lPlane = mPlane;
            }
          }
        }
      }
    }
    return _HctSolver.midpoint(left, right);
  }
  static inverseChromaticAdaptation(adapted) {
    const adaptedAbs = Math.abs(adapted);
    const base = Math.max(0, 27.13 * adaptedAbs / (400 - adaptedAbs));
    return signum(adapted) * Math.pow(base, 1 / 0.42);
  }
  /**
   * Finds a color with the given hue, chroma, and Y.
   *
   * @param hueRadians The desired hue in radians.
   * @param chroma The desired chroma.
   * @param y The desired Y.
   * @return The desired color as a hexadecimal integer, if found; 0
   * otherwise.
   */
  static findResultByJ(hueRadians, chroma, y) {
    let j = Math.sqrt(y) * 11;
    const viewingConditions = ViewingConditions.DEFAULT;
    const tInnerCoeff = 1 / Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73);
    const eHue = 0.25 * (Math.cos(hueRadians + 2) + 3.8);
    const p1 = eHue * (5e4 / 13) * viewingConditions.nc * viewingConditions.ncb;
    const hSin = Math.sin(hueRadians);
    const hCos = Math.cos(hueRadians);
    for (let iterationRound = 0; iterationRound < 5; iterationRound++) {
      const jNormalized = j / 100;
      const alpha = chroma === 0 || j === 0 ? 0 : chroma / Math.sqrt(jNormalized);
      const t = Math.pow(alpha * tInnerCoeff, 1 / 0.9);
      const ac = viewingConditions.aw * Math.pow(jNormalized, 1 / viewingConditions.c / viewingConditions.z);
      const p2 = ac / viewingConditions.nbb;
      const gamma = 23 * (p2 + 0.305) * t / (23 * p1 + 11 * t * hCos + 108 * t * hSin);
      const a = gamma * hCos;
      const b = gamma * hSin;
      const rA = (460 * p2 + 451 * a + 288 * b) / 1403;
      const gA = (460 * p2 - 891 * a - 261 * b) / 1403;
      const bA = (460 * p2 - 220 * a - 6300 * b) / 1403;
      const rCScaled = _HctSolver.inverseChromaticAdaptation(rA);
      const gCScaled = _HctSolver.inverseChromaticAdaptation(gA);
      const bCScaled = _HctSolver.inverseChromaticAdaptation(bA);
      const linrgb = matrixMultiply([rCScaled, gCScaled, bCScaled], _HctSolver.LINRGB_FROM_SCALED_DISCOUNT);
      if (linrgb[0] < 0 || linrgb[1] < 0 || linrgb[2] < 0) {
        return 0;
      }
      const kR = _HctSolver.Y_FROM_LINRGB[0];
      const kG = _HctSolver.Y_FROM_LINRGB[1];
      const kB = _HctSolver.Y_FROM_LINRGB[2];
      const fnj = kR * linrgb[0] + kG * linrgb[1] + kB * linrgb[2];
      if (fnj <= 0) {
        return 0;
      }
      if (iterationRound === 4 || Math.abs(fnj - y) < 2e-3) {
        if (linrgb[0] > 100.01 || linrgb[1] > 100.01 || linrgb[2] > 100.01) {
          return 0;
        }
        return argbFromLinrgb(linrgb);
      }
      j = j - (fnj - y) * j / (2 * fnj);
    }
    return 0;
  }
  /**
   * Finds an sRGB color with the given hue, chroma, and L*, if
   * possible.
   *
   * @param hueDegrees The desired hue, in degrees.
   * @param chroma The desired chroma.
   * @param lstar The desired L*.
   * @return A hexadecimal representing the sRGB color. The color
   * has sufficiently close hue, chroma, and L* to the desired
   * values, if possible; otherwise, the hue and L* will be
   * sufficiently close, and chroma will be maximized.
   */
  static solveToInt(hueDegrees, chroma, lstar) {
    if (chroma < 1e-4 || lstar < 1e-4 || lstar > 99.9999) {
      return argbFromLstar(lstar);
    }
    hueDegrees = sanitizeDegreesDouble(hueDegrees);
    const hueRadians = hueDegrees / 180 * Math.PI;
    const y = yFromLstar(lstar);
    const exactAnswer = _HctSolver.findResultByJ(hueRadians, chroma, y);
    if (exactAnswer !== 0) {
      return exactAnswer;
    }
    const linrgb = _HctSolver.bisectToLimit(y, hueRadians);
    return argbFromLinrgb(linrgb);
  }
  /**
   * Finds an sRGB color with the given hue, chroma, and L*, if
   * possible.
   *
   * @param hueDegrees The desired hue, in degrees.
   * @param chroma The desired chroma.
   * @param lstar The desired L*.
   * @return An CAM16 object representing the sRGB color. The color
   * has sufficiently close hue, chroma, and L* to the desired
   * values, if possible; otherwise, the hue and L* will be
   * sufficiently close, and chroma will be maximized.
   */
  static solveToCam(hueDegrees, chroma, lstar) {
    return Cam16.fromInt(_HctSolver.solveToInt(hueDegrees, chroma, lstar));
  }
};
HctSolver.SCALED_DISCOUNT_FROM_LINRGB = [
  [
    0.001200833568784504,
    0.002389694492170889,
    2795742885861124e-19
  ],
  [
    5891086651375999e-19,
    0.0029785502573438758,
    3270666104008398e-19
  ],
  [
    10146692491640572e-20,
    5364214359186694e-19,
    0.0032979401770712076
  ]
];
HctSolver.LINRGB_FROM_SCALED_DISCOUNT = [
  [
    1373.2198709594231,
    -1100.4251190754821,
    -7.278681089101213
  ],
  [
    -271.815969077903,
    559.6580465940733,
    -32.46047482791194
  ],
  [
    1.9622899599665666,
    -57.173814538844006,
    308.7233197812385
  ]
];
HctSolver.Y_FROM_LINRGB = [0.2126, 0.7152, 0.0722];
HctSolver.CRITICAL_PLANES = [
  0.015176349177441876,
  0.045529047532325624,
  0.07588174588720938,
  0.10623444424209313,
  0.13658714259697685,
  0.16693984095186062,
  0.19729253930674434,
  0.2276452376616281,
  0.2579979360165119,
  0.28835063437139563,
  0.3188300904430532,
  0.350925934958123,
  0.3848314933096426,
  0.42057480301049466,
  0.458183274052838,
  0.4976837250274023,
  0.5391024159806381,
  0.5824650784040898,
  0.6277969426914107,
  0.6751227633498623,
  0.7244668422128921,
  0.775853049866786,
  0.829304845476233,
  0.8848452951698498,
  0.942497089126609,
  1.0022825574869039,
  1.0642236851973577,
  1.1283421258858297,
  1.1946592148522128,
  1.2631959812511864,
  1.3339731595349034,
  1.407011200216447,
  1.4823302800086415,
  1.5599503113873272,
  1.6398909516233677,
  1.7221716113234105,
  1.8068114625156377,
  1.8938294463134073,
  1.9832442801866852,
  2.075074464868551,
  2.1693382909216234,
  2.2660538449872063,
  2.36523901573795,
  2.4669114995532007,
  2.5710888059345764,
  2.6777882626779785,
  2.7870270208169257,
  2.898822059350997,
  3.0131901897720907,
  3.1301480604002863,
  3.2497121605402226,
  3.3718988244681087,
  3.4967242352587946,
  3.624204428461639,
  3.754355295633311,
  3.887192587735158,
  4.022731918402185,
  4.160988767090289,
  4.301978482107941,
  4.445716283538092,
  4.592217266055746,
  4.741496401646282,
  4.893568542229298,
  5.048448422192488,
  5.20615066083972,
  5.3666897647573375,
  5.5300801301023865,
  5.696336044816294,
  5.865471690767354,
  6.037501145825082,
  6.212438385869475,
  6.390297286737924,
  6.571091626112461,
  6.7548350853498045,
  6.941541251256611,
  7.131223617812143,
  7.323895587840543,
  7.5195704746346665,
  7.7182615035334345,
  7.919981813454504,
  8.124744458384042,
  8.332562408825165,
  8.543448553206703,
  8.757415699253682,
  8.974476575321063,
  9.194643831691977,
  9.417930041841839,
  9.644347703669503,
  9.873909240696694,
  10.106627003236781,
  10.342513269534024,
  10.58158024687427,
  10.8238400726681,
  11.069304815507364,
  11.317986476196008,
  11.569896988756009,
  11.825048221409341,
  12.083451977536606,
  12.345119996613247,
  12.610063955123938,
  12.878295467455942,
  13.149826086772048,
  13.42466730586372,
  13.702830557985108,
  13.984327217668513,
  14.269168601521828,
  14.55736596900856,
  14.848930523210871,
  15.143873411576273,
  15.44220572664832,
  15.743938506781891,
  16.04908273684337,
  16.35764934889634,
  16.66964922287304,
  16.985093187232053,
  17.30399201960269,
  17.62635644741625,
  17.95219714852476,
  18.281524751807332,
  18.614349837764564,
  18.95068293910138,
  19.290534541298456,
  19.633915083172692,
  19.98083495742689,
  20.331304511189067,
  20.685334046541502,
  21.042933821039977,
  21.404114048223256,
  21.76888489811322,
  22.137256497705877,
  22.50923893145328,
  22.884842241736916,
  23.264076429332462,
  23.6469514538663,
  24.033477234264016,
  24.42366364919083,
  24.817520537484558,
  25.21505769858089,
  25.61628489293138,
  26.021211842414342,
  26.429848230738664,
  26.842203703840827,
  27.258287870275353,
  27.678110301598522,
  28.10168053274597,
  28.529008062403893,
  28.96010235337422,
  29.39497283293396,
  29.83362889318845,
  30.276079891419332,
  30.722335150426627,
  31.172403958865512,
  31.62629557157785,
  32.08401920991837,
  32.54558406207592,
  33.010999283389665,
  33.4802739966603,
  33.953417292456834,
  34.430438229418264,
  34.911345834551085,
  35.39614910352207,
  35.88485700094671,
  36.37747846067349,
  36.87402238606382,
  37.37449765026789,
  37.87891309649659,
  38.38727753828926,
  38.89959975977785,
  39.41588851594697,
  39.93615253289054,
  40.460400508064545,
  40.98864111053629,
  41.520882981230194,
  42.05713473317016,
  42.597404951718396,
  43.141702194811224,
  43.6900349931913,
  44.24241185063697,
  44.798841244188324,
  45.35933162437017,
  45.92389141541209,
  46.49252901546552,
  47.065252796817916,
  47.64207110610409,
  48.22299226451468,
  48.808024568002054,
  49.3971762874833,
  49.9904556690408,
  50.587870934119984,
  51.189430279724725,
  51.79514187861014,
  52.40501387947288,
  53.0190544071392,
  53.637271562750364,
  54.259673423945976,
  54.88626804504493,
  55.517063457223934,
  56.15206766869424,
  56.79128866487574,
  57.43473440856916,
  58.08241284012621,
  58.734331877617365,
  59.39049941699807,
  60.05092333227251,
  60.715611475655585,
  61.38457167773311,
  62.057811747619894,
  62.7353394731159,
  63.417162620860914,
  64.10328893648692,
  64.79372614476921,
  65.48848194977529,
  66.18756403501224,
  66.89098006357258,
  67.59873767827808,
  68.31084450182222,
  69.02730813691093,
  69.74813616640164,
  70.47333615344107,
  71.20291564160104,
  71.93688215501312,
  72.67524319850172,
  73.41800625771542,
  74.16517879925733,
  74.9167682708136,
  75.67278210128072,
  76.43322770089146,
  77.1981124613393,
  77.96744375590167,
  78.74122893956174,
  79.51947534912904,
  80.30219030335869,
  81.08938110306934,
  81.88105503125999,
  82.67721935322541,
  83.4778813166706,
  84.28304815182372,
  85.09272707154808,
  85.90692527145302,
  86.72564993000343,
  87.54890820862819,
  88.3767072518277,
  89.2090541872801,
  90.04595612594655,
  90.88742016217518,
  91.73345337380438,
  92.58406282226491,
  93.43925555268066,
  94.29903859396902,
  95.16341895893969,
  96.03240364439274,
  96.9059996312159,
  97.78421388448044,
  98.6670533535366,
  99.55452497210776
];

// node_modules/@material/material-color-utilities/hct/hct.js
var Hct = class _Hct {
  static from(hue, chroma, tone) {
    return new _Hct(HctSolver.solveToInt(hue, chroma, tone));
  }
  /**
   * @param argb ARGB representation of a color.
   * @return HCT representation of a color in default viewing conditions
   */
  static fromInt(argb) {
    return new _Hct(argb);
  }
  toInt() {
    return this.argb;
  }
  /**
   * A number, in degrees, representing ex. red, orange, yellow, etc.
   * Ranges from 0 <= hue < 360.
   */
  get hue() {
    return this.internalHue;
  }
  /**
   * @param newHue 0 <= newHue < 360; invalid values are corrected.
   * Chroma may decrease because chroma has a different maximum for any given
   * hue and tone.
   */
  set hue(newHue) {
    this.setInternalState(HctSolver.solveToInt(newHue, this.internalChroma, this.internalTone));
  }
  get chroma() {
    return this.internalChroma;
  }
  /**
   * @param newChroma 0 <= newChroma < ?
   * Chroma may decrease because chroma has a different maximum for any given
   * hue and tone.
   */
  set chroma(newChroma) {
    this.setInternalState(HctSolver.solveToInt(this.internalHue, newChroma, this.internalTone));
  }
  /** Lightness. Ranges from 0 to 100. */
  get tone() {
    return this.internalTone;
  }
  /**
   * @param newTone 0 <= newTone <= 100; invalid valids are corrected.
   * Chroma may decrease because chroma has a different maximum for any given
   * hue and tone.
   */
  set tone(newTone) {
    this.setInternalState(HctSolver.solveToInt(this.internalHue, this.internalChroma, newTone));
  }
  constructor(argb) {
    this.argb = argb;
    const cam = Cam16.fromInt(argb);
    this.internalHue = cam.hue;
    this.internalChroma = cam.chroma;
    this.internalTone = lstarFromArgb(argb);
    this.argb = argb;
  }
  setInternalState(argb) {
    const cam = Cam16.fromInt(argb);
    this.internalHue = cam.hue;
    this.internalChroma = cam.chroma;
    this.internalTone = lstarFromArgb(argb);
    this.argb = argb;
  }
  /**
   * Translates a color into different [ViewingConditions].
   *
   * Colors change appearance. They look different with lights on versus off,
   * the same color, as in hex code, on white looks different when on black.
   * This is called color relativity, most famously explicated by Josef Albers
   * in Interaction of Color.
   *
   * In color science, color appearance models can account for this and
   * calculate the appearance of a color in different settings. HCT is based on
   * CAM16, a color appearance model, and uses it to make these calculations.
   *
   * See [ViewingConditions.make] for parameters affecting color appearance.
   */
  inViewingConditions(vc) {
    const cam = Cam16.fromInt(this.toInt());
    const viewedInVc = cam.xyzInViewingConditions(vc);
    const recastInVc = Cam16.fromXyzInViewingConditions(viewedInVc[0], viewedInVc[1], viewedInVc[2], ViewingConditions.make());
    const recastHct = _Hct.from(recastInVc.hue, recastInVc.chroma, lstarFromY(viewedInVc[1]));
    return recastHct;
  }
};

// node_modules/@material/material-color-utilities/contrast/contrast.js
var Contrast = class _Contrast {
  /**
   * Returns a contrast ratio, which ranges from 1 to 21.
   *
   * @param toneA Tone between 0 and 100. Values outside will be clamped.
   * @param toneB Tone between 0 and 100. Values outside will be clamped.
   */
  static ratioOfTones(toneA, toneB) {
    toneA = clampDouble(0, 100, toneA);
    toneB = clampDouble(0, 100, toneB);
    return _Contrast.ratioOfYs(yFromLstar(toneA), yFromLstar(toneB));
  }
  static ratioOfYs(y1, y2) {
    const lighter = y1 > y2 ? y1 : y2;
    const darker = lighter === y2 ? y1 : y2;
    return (lighter + 5) / (darker + 5);
  }
  /**
   * Returns a tone >= tone parameter that ensures ratio parameter.
   * Return value is between 0 and 100.
   * Returns -1 if ratio cannot be achieved with tone parameter.
   *
   * @param tone Tone return value must contrast with.
   * Range is 0 to 100. Invalid values will result in -1 being returned.
   * @param ratio Contrast ratio of return value and tone.
   * Range is 1 to 21, invalid values have undefined behavior.
   */
  static lighter(tone, ratio) {
    if (tone < 0 || tone > 100) {
      return -1;
    }
    const darkY = yFromLstar(tone);
    const lightY = ratio * (darkY + 5) - 5;
    const realContrast = _Contrast.ratioOfYs(lightY, darkY);
    const delta = Math.abs(realContrast - ratio);
    if (realContrast < ratio && delta > 0.04) {
      return -1;
    }
    const returnValue = lstarFromY(lightY) + 0.4;
    if (returnValue < 0 || returnValue > 100) {
      return -1;
    }
    return returnValue;
  }
  /**
   * Returns a tone <= tone parameter that ensures ratio parameter.
   * Return value is between 0 and 100.
   * Returns -1 if ratio cannot be achieved with tone parameter.
   *
   * @param tone Tone return value must contrast with.
   * Range is 0 to 100. Invalid values will result in -1 being returned.
   * @param ratio Contrast ratio of return value and tone.
   * Range is 1 to 21, invalid values have undefined behavior.
   */
  static darker(tone, ratio) {
    if (tone < 0 || tone > 100) {
      return -1;
    }
    const lightY = yFromLstar(tone);
    const darkY = (lightY + 5) / ratio - 5;
    const realContrast = _Contrast.ratioOfYs(lightY, darkY);
    const delta = Math.abs(realContrast - ratio);
    if (realContrast < ratio && delta > 0.04) {
      return -1;
    }
    const returnValue = lstarFromY(darkY) - 0.4;
    if (returnValue < 0 || returnValue > 100) {
      return -1;
    }
    return returnValue;
  }
  /**
   * Returns a tone >= tone parameter that ensures ratio parameter.
   * Return value is between 0 and 100.
   * Returns 100 if ratio cannot be achieved with tone parameter.
   *
   * This method is unsafe because the returned value is guaranteed to be in
   * bounds for tone, i.e. between 0 and 100. However, that value may not reach
   * the ratio with tone. For example, there is no color lighter than T100.
   *
   * @param tone Tone return value must contrast with.
   * Range is 0 to 100. Invalid values will result in 100 being returned.
   * @param ratio Desired contrast ratio of return value and tone parameter.
   * Range is 1 to 21, invalid values have undefined behavior.
   */
  static lighterUnsafe(tone, ratio) {
    const lighterSafe = _Contrast.lighter(tone, ratio);
    return lighterSafe < 0 ? 100 : lighterSafe;
  }
  /**
   * Returns a tone >= tone parameter that ensures ratio parameter.
   * Return value is between 0 and 100.
   * Returns 100 if ratio cannot be achieved with tone parameter.
   *
   * This method is unsafe because the returned value is guaranteed to be in
   * bounds for tone, i.e. between 0 and 100. However, that value may not reach
   * the [ratio with [tone]. For example, there is no color darker than T0.
   *
   * @param tone Tone return value must contrast with.
   * Range is 0 to 100. Invalid values will result in 0 being returned.
   * @param ratio Desired contrast ratio of return value and tone parameter.
   * Range is 1 to 21, invalid values have undefined behavior.
   */
  static darkerUnsafe(tone, ratio) {
    const darkerSafe = _Contrast.darker(tone, ratio);
    return darkerSafe < 0 ? 0 : darkerSafe;
  }
};

// node_modules/@material/material-color-utilities/dislike/dislike_analyzer.js
var DislikeAnalyzer = class _DislikeAnalyzer {
  /**
   * Returns true if a color is disliked.
   *
   * @param hct A color to be judged.
   * @return Whether the color is disliked.
   *
   * Disliked is defined as a dark yellow-green that is not neutral.
   */
  static isDisliked(hct) {
    const huePasses = Math.round(hct.hue) >= 90 && Math.round(hct.hue) <= 111;
    const chromaPasses = Math.round(hct.chroma) > 16;
    const tonePasses = Math.round(hct.tone) < 65;
    return huePasses && chromaPasses && tonePasses;
  }
  /**
   * If a color is disliked, lighten it to make it likable.
   *
   * @param hct A color to be judged.
   * @return A new color if the original color is disliked, or the original
   *   color if it is acceptable.
   */
  static fixIfDisliked(hct) {
    if (_DislikeAnalyzer.isDisliked(hct)) {
      return Hct.from(hct.hue, hct.chroma, 70);
    }
    return hct;
  }
};

// node_modules/@material/material-color-utilities/dynamiccolor/dynamic_color.js
var DynamicColor = class _DynamicColor {
  /**
   * Create a DynamicColor defined by a TonalPalette and HCT tone.
   *
   * @param args Functions with DynamicScheme as input. Must provide a palette
   * and tone. May provide a background DynamicColor and ToneDeltaConstraint.
   */
  static fromPalette(args) {
    return new _DynamicColor(args.name ?? "", args.palette, args.tone, args.isBackground ?? false, args.background, args.secondBackground, args.contrastCurve, args.toneDeltaPair);
  }
  /**
   * The base constructor for DynamicColor.
   *
   * _Strongly_ prefer using one of the convenience constructors. This class is
   * arguably too flexible to ensure it can support any scenario. Functional
   * arguments allow  overriding without risks that come with subclasses.
   *
   * For example, the default behavior of adjust tone at max contrast
   * to be at a 7.0 ratio with its background is principled and
   * matches accessibility guidance. That does not mean it's the desired
   * approach for _every_ design system, and every color pairing,
   * always, in every case.
   *
   * @param name The name of the dynamic color. Defaults to empty.
   * @param palette Function that provides a TonalPalette given
   * DynamicScheme. A TonalPalette is defined by a hue and chroma, so this
   * replaces the need to specify hue/chroma. By providing a tonal palette, when
   * contrast adjustments are made, intended chroma can be preserved.
   * @param tone Function that provides a tone, given a DynamicScheme.
   * @param isBackground Whether this dynamic color is a background, with
   * some other color as the foreground. Defaults to false.
   * @param background The background of the dynamic color (as a function of a
   *     `DynamicScheme`), if it exists.
   * @param secondBackground A second background of the dynamic color (as a
   *     function of a `DynamicScheme`), if it
   * exists.
   * @param contrastCurve A `ContrastCurve` object specifying how its contrast
   * against its background should behave in various contrast levels options.
   * @param toneDeltaPair A `ToneDeltaPair` object specifying a tone delta
   * constraint between two colors. One of them must be the color being
   * constructed.
   */
  constructor(name, palette, tone, isBackground, background, secondBackground, contrastCurve, toneDeltaPair) {
    this.name = name;
    this.palette = palette;
    this.tone = tone;
    this.isBackground = isBackground;
    this.background = background;
    this.secondBackground = secondBackground;
    this.contrastCurve = contrastCurve;
    this.toneDeltaPair = toneDeltaPair;
    this.hctCache = /* @__PURE__ */ new Map();
    if (!background && secondBackground) {
      throw new Error(`Color ${name} has secondBackgrounddefined, but background is not defined.`);
    }
    if (!background && contrastCurve) {
      throw new Error(`Color ${name} has contrastCurvedefined, but background is not defined.`);
    }
    if (background && !contrastCurve) {
      throw new Error(`Color ${name} has backgrounddefined, but contrastCurve is not defined.`);
    }
  }
  /**
   * Return a ARGB integer (i.e. a hex code).
   *
   * @param scheme Defines the conditions of the user interface, for example,
   * whether or not it is dark mode or light mode, and what the desired
   * contrast level is.
   */
  getArgb(scheme) {
    return this.getHct(scheme).toInt();
  }
  /**
   * Return a color, expressed in the HCT color space, that this
   * DynamicColor is under the conditions in scheme.
   *
   * @param scheme Defines the conditions of the user interface, for example,
   * whether or not it is dark mode or light mode, and what the desired
   * contrast level is.
   */
  getHct(scheme) {
    const cachedAnswer = this.hctCache.get(scheme);
    if (cachedAnswer != null) {
      return cachedAnswer;
    }
    const tone = this.getTone(scheme);
    const answer = this.palette(scheme).getHct(tone);
    if (this.hctCache.size > 4) {
      this.hctCache.clear();
    }
    this.hctCache.set(scheme, answer);
    return answer;
  }
  /**
   * Return a tone, T in the HCT color space, that this DynamicColor is under
   * the conditions in scheme.
   *
   * @param scheme Defines the conditions of the user interface, for example,
   * whether or not it is dark mode or light mode, and what the desired
   * contrast level is.
   */
  getTone(scheme) {
    const decreasingContrast = scheme.contrastLevel < 0;
    if (this.toneDeltaPair) {
      const toneDeltaPair = this.toneDeltaPair(scheme);
      const roleA = toneDeltaPair.roleA;
      const roleB = toneDeltaPair.roleB;
      const delta = toneDeltaPair.delta;
      const polarity = toneDeltaPair.polarity;
      const stayTogether = toneDeltaPair.stayTogether;
      const bg = this.background(scheme);
      const bgTone = bg.getTone(scheme);
      const aIsNearer = polarity === "nearer" || polarity === "lighter" && !scheme.isDark || polarity === "darker" && scheme.isDark;
      const nearer = aIsNearer ? roleA : roleB;
      const farther = aIsNearer ? roleB : roleA;
      const amNearer = this.name === nearer.name;
      const expansionDir = scheme.isDark ? 1 : -1;
      const nContrast = nearer.contrastCurve.get(scheme.contrastLevel);
      const fContrast = farther.contrastCurve.get(scheme.contrastLevel);
      const nInitialTone = nearer.tone(scheme);
      let nTone = Contrast.ratioOfTones(bgTone, nInitialTone) >= nContrast ? nInitialTone : _DynamicColor.foregroundTone(bgTone, nContrast);
      const fInitialTone = farther.tone(scheme);
      let fTone = Contrast.ratioOfTones(bgTone, fInitialTone) >= fContrast ? fInitialTone : _DynamicColor.foregroundTone(bgTone, fContrast);
      if (decreasingContrast) {
        nTone = _DynamicColor.foregroundTone(bgTone, nContrast);
        fTone = _DynamicColor.foregroundTone(bgTone, fContrast);
      }
      if ((fTone - nTone) * expansionDir >= delta) {
      } else {
        fTone = clampDouble(0, 100, nTone + delta * expansionDir);
        if ((fTone - nTone) * expansionDir >= delta) {
        } else {
          nTone = clampDouble(0, 100, fTone - delta * expansionDir);
        }
      }
      if (50 <= nTone && nTone < 60) {
        if (expansionDir > 0) {
          nTone = 60;
          fTone = Math.max(fTone, nTone + delta * expansionDir);
        } else {
          nTone = 49;
          fTone = Math.min(fTone, nTone + delta * expansionDir);
        }
      } else if (50 <= fTone && fTone < 60) {
        if (stayTogether) {
          if (expansionDir > 0) {
            nTone = 60;
            fTone = Math.max(fTone, nTone + delta * expansionDir);
          } else {
            nTone = 49;
            fTone = Math.min(fTone, nTone + delta * expansionDir);
          }
        } else {
          if (expansionDir > 0) {
            fTone = 60;
          } else {
            fTone = 49;
          }
        }
      }
      return amNearer ? nTone : fTone;
    } else {
      let answer = this.tone(scheme);
      if (this.background == null) {
        return answer;
      }
      const bgTone = this.background(scheme).getTone(scheme);
      const desiredRatio = this.contrastCurve.get(scheme.contrastLevel);
      if (Contrast.ratioOfTones(bgTone, answer) >= desiredRatio) {
      } else {
        answer = _DynamicColor.foregroundTone(bgTone, desiredRatio);
      }
      if (decreasingContrast) {
        answer = _DynamicColor.foregroundTone(bgTone, desiredRatio);
      }
      if (this.isBackground && 50 <= answer && answer < 60) {
        if (Contrast.ratioOfTones(49, bgTone) >= desiredRatio) {
          answer = 49;
        } else {
          answer = 60;
        }
      }
      if (this.secondBackground) {
        const [bg1, bg2] = [this.background, this.secondBackground];
        const [bgTone1, bgTone2] = [bg1(scheme).getTone(scheme), bg2(scheme).getTone(scheme)];
        const [upper, lower] = [Math.max(bgTone1, bgTone2), Math.min(bgTone1, bgTone2)];
        if (Contrast.ratioOfTones(upper, answer) >= desiredRatio && Contrast.ratioOfTones(lower, answer) >= desiredRatio) {
          return answer;
        }
        const lightOption = Contrast.lighter(upper, desiredRatio);
        const darkOption = Contrast.darker(lower, desiredRatio);
        const availables = [];
        if (lightOption !== -1)
          availables.push(lightOption);
        if (darkOption !== -1)
          availables.push(darkOption);
        const prefersLight = _DynamicColor.tonePrefersLightForeground(bgTone1) || _DynamicColor.tonePrefersLightForeground(bgTone2);
        if (prefersLight) {
          return lightOption < 0 ? 100 : lightOption;
        }
        if (availables.length === 1) {
          return availables[0];
        }
        return darkOption < 0 ? 0 : darkOption;
      }
      return answer;
    }
  }
  /**
   * Given a background tone, find a foreground tone, while ensuring they reach
   * a contrast ratio that is as close to [ratio] as possible.
   *
   * @param bgTone Tone in HCT. Range is 0 to 100, undefined behavior when it
   *     falls outside that range.
   * @param ratio The contrast ratio desired between bgTone and the return
   *     value.
   */
  static foregroundTone(bgTone, ratio) {
    const lighterTone = Contrast.lighterUnsafe(bgTone, ratio);
    const darkerTone = Contrast.darkerUnsafe(bgTone, ratio);
    const lighterRatio = Contrast.ratioOfTones(lighterTone, bgTone);
    const darkerRatio = Contrast.ratioOfTones(darkerTone, bgTone);
    const preferLighter = _DynamicColor.tonePrefersLightForeground(bgTone);
    if (preferLighter) {
      const negligibleDifference = Math.abs(lighterRatio - darkerRatio) < 0.1 && lighterRatio < ratio && darkerRatio < ratio;
      return lighterRatio >= ratio || lighterRatio >= darkerRatio || negligibleDifference ? lighterTone : darkerTone;
    } else {
      return darkerRatio >= ratio || darkerRatio >= lighterRatio ? darkerTone : lighterTone;
    }
  }
  /**
   * Returns whether [tone] prefers a light foreground.
   *
   * People prefer white foregrounds on ~T60-70. Observed over time, and also
   * by Andrew Somers during research for APCA.
   *
   * T60 used as to create the smallest discontinuity possible when skipping
   * down to T49 in order to ensure light foregrounds.
   * Since `tertiaryContainer` in dark monochrome scheme requires a tone of
   * 60, it should not be adjusted. Therefore, 60 is excluded here.
   */
  static tonePrefersLightForeground(tone) {
    return Math.round(tone) < 60;
  }
  /**
   * Returns whether [tone] can reach a contrast ratio of 4.5 with a lighter
   * color.
   */
  static toneAllowsLightForeground(tone) {
    return Math.round(tone) <= 49;
  }
  /**
   * Adjust a tone such that white has 4.5 contrast, if the tone is
   * reasonably close to supporting it.
   */
  static enableLightForeground(tone) {
    if (_DynamicColor.tonePrefersLightForeground(tone) && !_DynamicColor.toneAllowsLightForeground(tone)) {
      return 49;
    }
    return tone;
  }
};

// node_modules/@material/material-color-utilities/palettes/tonal_palette.js
var TonalPalette = class _TonalPalette {
  /**
   * @param argb ARGB representation of a color
   * @return Tones matching that color's hue and chroma.
   */
  static fromInt(argb) {
    const hct = Hct.fromInt(argb);
    return _TonalPalette.fromHct(hct);
  }
  /**
   * @param hct Hct
   * @return Tones matching that color's hue and chroma.
   */
  static fromHct(hct) {
    return new _TonalPalette(hct.hue, hct.chroma, hct);
  }
  /**
   * @param hue HCT hue
   * @param chroma HCT chroma
   * @return Tones matching hue and chroma.
   */
  static fromHueAndChroma(hue, chroma) {
    const keyColor = new KeyColor(hue, chroma).create();
    return new _TonalPalette(hue, chroma, keyColor);
  }
  constructor(hue, chroma, keyColor) {
    this.hue = hue;
    this.chroma = chroma;
    this.keyColor = keyColor;
    this.cache = /* @__PURE__ */ new Map();
  }
  /**
   * @param tone HCT tone, measured from 0 to 100.
   * @return ARGB representation of a color with that tone.
   */
  tone(tone) {
    let argb = this.cache.get(tone);
    if (argb === void 0) {
      argb = Hct.from(this.hue, this.chroma, tone).toInt();
      this.cache.set(tone, argb);
    }
    return argb;
  }
  /**
   * @param tone HCT tone.
   * @return HCT representation of a color with that tone.
   */
  getHct(tone) {
    return Hct.fromInt(this.tone(tone));
  }
};
var KeyColor = class {
  constructor(hue, requestedChroma) {
    this.hue = hue;
    this.requestedChroma = requestedChroma;
    this.chromaCache = /* @__PURE__ */ new Map();
    this.maxChromaValue = 200;
  }
  /**
   * Creates a key color from a [hue] and a [chroma].
   * The key color is the first tone, starting from T50, matching the given hue
   * and chroma.
   *
   * @return Key color [Hct]
   */
  create() {
    const pivotTone = 50;
    const toneStepSize = 1;
    const epsilon = 0.01;
    let lowerTone = 0;
    let upperTone = 100;
    while (lowerTone < upperTone) {
      const midTone = Math.floor((lowerTone + upperTone) / 2);
      const isAscending = this.maxChroma(midTone) < this.maxChroma(midTone + toneStepSize);
      const sufficientChroma = this.maxChroma(midTone) >= this.requestedChroma - epsilon;
      if (sufficientChroma) {
        if (Math.abs(lowerTone - pivotTone) < Math.abs(upperTone - pivotTone)) {
          upperTone = midTone;
        } else {
          if (lowerTone === midTone) {
            return Hct.from(this.hue, this.requestedChroma, lowerTone);
          }
          lowerTone = midTone;
        }
      } else {
        if (isAscending) {
          lowerTone = midTone + toneStepSize;
        } else {
          upperTone = midTone;
        }
      }
    }
    return Hct.from(this.hue, this.requestedChroma, lowerTone);
  }
  // Find the maximum chroma for a given tone
  maxChroma(tone) {
    if (this.chromaCache.has(tone)) {
      return this.chromaCache.get(tone);
    }
    const chroma = Hct.from(this.hue, this.maxChromaValue, tone).chroma;
    this.chromaCache.set(tone, chroma);
    return chroma;
  }
};

// node_modules/@material/material-color-utilities/dynamiccolor/contrast_curve.js
var ContrastCurve = class {
  /**
   * Creates a `ContrastCurve` object.
   *
   * @param low Value for contrast level -1.0
   * @param normal Value for contrast level 0.0
   * @param medium Value for contrast level 0.5
   * @param high Value for contrast level 1.0
   */
  constructor(low, normal, medium, high) {
    this.low = low;
    this.normal = normal;
    this.medium = medium;
    this.high = high;
  }
  /**
   * Returns the value at a given contrast level.
   *
   * @param contrastLevel The contrast level. 0.0 is the default (normal); -1.0
   *     is the lowest; 1.0 is the highest.
   * @return The value. For contrast ratios, a number between 1.0 and 21.0.
   */
  get(contrastLevel) {
    if (contrastLevel <= -1) {
      return this.low;
    } else if (contrastLevel < 0) {
      return lerp(this.low, this.normal, (contrastLevel - -1) / 1);
    } else if (contrastLevel < 0.5) {
      return lerp(this.normal, this.medium, (contrastLevel - 0) / 0.5);
    } else if (contrastLevel < 1) {
      return lerp(this.medium, this.high, (contrastLevel - 0.5) / 0.5);
    } else {
      return this.high;
    }
  }
};

// node_modules/@material/material-color-utilities/dynamiccolor/tone_delta_pair.js
var ToneDeltaPair = class {
  /**
   * Documents a constraint in tone distance between two DynamicColors.
   *
   * The polarity is an adjective that describes "A", compared to "B".
   *
   * For instance, ToneDeltaPair(A, B, 15, 'darker', stayTogether) states that
   * A's tone should be at least 15 darker than B's.
   *
   * 'nearer' and 'farther' describes closeness to the surface roles. For
   * instance, ToneDeltaPair(A, B, 10, 'nearer', stayTogether) states that A
   * should be 10 lighter than B in light mode, and 10 darker than B in dark
   * mode.
   *
   * @param roleA The first role in a pair.
   * @param roleB The second role in a pair.
   * @param delta Required difference between tones. Absolute value, negative
   * values have undefined behavior.
   * @param polarity The relative relation between tones of roleA and roleB,
   * as described above.
   * @param stayTogether Whether these two roles should stay on the same side of
   * the "awkward zone" (T50-59). This is necessary for certain cases where
   * one role has two backgrounds.
   */
  constructor(roleA, roleB, delta, polarity, stayTogether) {
    this.roleA = roleA;
    this.roleB = roleB;
    this.delta = delta;
    this.polarity = polarity;
    this.stayTogether = stayTogether;
  }
};

// node_modules/@material/material-color-utilities/dynamiccolor/variant.js
var Variant;
(function(Variant2) {
  Variant2[Variant2["MONOCHROME"] = 0] = "MONOCHROME";
  Variant2[Variant2["NEUTRAL"] = 1] = "NEUTRAL";
  Variant2[Variant2["TONAL_SPOT"] = 2] = "TONAL_SPOT";
  Variant2[Variant2["VIBRANT"] = 3] = "VIBRANT";
  Variant2[Variant2["EXPRESSIVE"] = 4] = "EXPRESSIVE";
  Variant2[Variant2["FIDELITY"] = 5] = "FIDELITY";
  Variant2[Variant2["CONTENT"] = 6] = "CONTENT";
  Variant2[Variant2["RAINBOW"] = 7] = "RAINBOW";
  Variant2[Variant2["FRUIT_SALAD"] = 8] = "FRUIT_SALAD";
})(Variant || (Variant = {}));

// node_modules/@material/material-color-utilities/dynamiccolor/material_dynamic_colors.js
function isFidelity(scheme) {
  return scheme.variant === Variant.FIDELITY || scheme.variant === Variant.CONTENT;
}
function isMonochrome(scheme) {
  return scheme.variant === Variant.MONOCHROME;
}
function findDesiredChromaByTone(hue, chroma, tone, byDecreasingTone) {
  let answer = tone;
  let closestToChroma = Hct.from(hue, chroma, tone);
  if (closestToChroma.chroma < chroma) {
    let chromaPeak = closestToChroma.chroma;
    while (closestToChroma.chroma < chroma) {
      answer += byDecreasingTone ? -1 : 1;
      const potentialSolution = Hct.from(hue, chroma, answer);
      if (chromaPeak > potentialSolution.chroma) {
        break;
      }
      if (Math.abs(potentialSolution.chroma - chroma) < 0.4) {
        break;
      }
      const potentialDelta = Math.abs(potentialSolution.chroma - chroma);
      const currentDelta = Math.abs(closestToChroma.chroma - chroma);
      if (potentialDelta < currentDelta) {
        closestToChroma = potentialSolution;
      }
      chromaPeak = Math.max(chromaPeak, potentialSolution.chroma);
    }
  }
  return answer;
}
var MaterialDynamicColors = class _MaterialDynamicColors {
  static highestSurface(s) {
    return s.isDark ? _MaterialDynamicColors.surfaceBright : _MaterialDynamicColors.surfaceDim;
  }
};
MaterialDynamicColors.contentAccentToneDelta = 15;
MaterialDynamicColors.primaryPaletteKeyColor = DynamicColor.fromPalette({
  name: "primary_palette_key_color",
  palette: (s) => s.primaryPalette,
  tone: (s) => s.primaryPalette.keyColor.tone
});
MaterialDynamicColors.secondaryPaletteKeyColor = DynamicColor.fromPalette({
  name: "secondary_palette_key_color",
  palette: (s) => s.secondaryPalette,
  tone: (s) => s.secondaryPalette.keyColor.tone
});
MaterialDynamicColors.tertiaryPaletteKeyColor = DynamicColor.fromPalette({
  name: "tertiary_palette_key_color",
  palette: (s) => s.tertiaryPalette,
  tone: (s) => s.tertiaryPalette.keyColor.tone
});
MaterialDynamicColors.neutralPaletteKeyColor = DynamicColor.fromPalette({
  name: "neutral_palette_key_color",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.neutralPalette.keyColor.tone
});
MaterialDynamicColors.neutralVariantPaletteKeyColor = DynamicColor.fromPalette({
  name: "neutral_variant_palette_key_color",
  palette: (s) => s.neutralVariantPalette,
  tone: (s) => s.neutralVariantPalette.keyColor.tone
});
MaterialDynamicColors.background = DynamicColor.fromPalette({
  name: "background",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? 6 : 98,
  isBackground: true
});
MaterialDynamicColors.onBackground = DynamicColor.fromPalette({
  name: "on_background",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? 90 : 10,
  background: (s) => MaterialDynamicColors.background,
  contrastCurve: new ContrastCurve(3, 3, 4.5, 7)
});
MaterialDynamicColors.surface = DynamicColor.fromPalette({
  name: "surface",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? 6 : 98,
  isBackground: true
});
MaterialDynamicColors.surfaceDim = DynamicColor.fromPalette({
  name: "surface_dim",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? 6 : new ContrastCurve(87, 87, 80, 75).get(s.contrastLevel),
  isBackground: true
});
MaterialDynamicColors.surfaceBright = DynamicColor.fromPalette({
  name: "surface_bright",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? new ContrastCurve(24, 24, 29, 34).get(s.contrastLevel) : 98,
  isBackground: true
});
MaterialDynamicColors.surfaceContainerLowest = DynamicColor.fromPalette({
  name: "surface_container_lowest",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? new ContrastCurve(4, 4, 2, 0).get(s.contrastLevel) : 100,
  isBackground: true
});
MaterialDynamicColors.surfaceContainerLow = DynamicColor.fromPalette({
  name: "surface_container_low",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? new ContrastCurve(10, 10, 11, 12).get(s.contrastLevel) : new ContrastCurve(96, 96, 96, 95).get(s.contrastLevel),
  isBackground: true
});
MaterialDynamicColors.surfaceContainer = DynamicColor.fromPalette({
  name: "surface_container",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? new ContrastCurve(12, 12, 16, 20).get(s.contrastLevel) : new ContrastCurve(94, 94, 92, 90).get(s.contrastLevel),
  isBackground: true
});
MaterialDynamicColors.surfaceContainerHigh = DynamicColor.fromPalette({
  name: "surface_container_high",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? new ContrastCurve(17, 17, 21, 25).get(s.contrastLevel) : new ContrastCurve(92, 92, 88, 85).get(s.contrastLevel),
  isBackground: true
});
MaterialDynamicColors.surfaceContainerHighest = DynamicColor.fromPalette({
  name: "surface_container_highest",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? new ContrastCurve(22, 22, 26, 30).get(s.contrastLevel) : new ContrastCurve(90, 90, 84, 80).get(s.contrastLevel),
  isBackground: true
});
MaterialDynamicColors.onSurface = DynamicColor.fromPalette({
  name: "on_surface",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? 90 : 10,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
});
MaterialDynamicColors.surfaceVariant = DynamicColor.fromPalette({
  name: "surface_variant",
  palette: (s) => s.neutralVariantPalette,
  tone: (s) => s.isDark ? 30 : 90,
  isBackground: true
});
MaterialDynamicColors.onSurfaceVariant = DynamicColor.fromPalette({
  name: "on_surface_variant",
  palette: (s) => s.neutralVariantPalette,
  tone: (s) => s.isDark ? 80 : 30,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
});
MaterialDynamicColors.inverseSurface = DynamicColor.fromPalette({
  name: "inverse_surface",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? 90 : 20
});
MaterialDynamicColors.inverseOnSurface = DynamicColor.fromPalette({
  name: "inverse_on_surface",
  palette: (s) => s.neutralPalette,
  tone: (s) => s.isDark ? 20 : 95,
  background: (s) => MaterialDynamicColors.inverseSurface,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
});
MaterialDynamicColors.outline = DynamicColor.fromPalette({
  name: "outline",
  palette: (s) => s.neutralVariantPalette,
  tone: (s) => s.isDark ? 60 : 50,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1.5, 3, 4.5, 7)
});
MaterialDynamicColors.outlineVariant = DynamicColor.fromPalette({
  name: "outline_variant",
  palette: (s) => s.neutralVariantPalette,
  tone: (s) => s.isDark ? 30 : 80,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 4.5)
});
MaterialDynamicColors.shadow = DynamicColor.fromPalette({
  name: "shadow",
  palette: (s) => s.neutralPalette,
  tone: (s) => 0
});
MaterialDynamicColors.scrim = DynamicColor.fromPalette({
  name: "scrim",
  palette: (s) => s.neutralPalette,
  tone: (s) => 0
});
MaterialDynamicColors.surfaceTint = DynamicColor.fromPalette({
  name: "surface_tint",
  palette: (s) => s.primaryPalette,
  tone: (s) => s.isDark ? 80 : 40,
  isBackground: true
});
MaterialDynamicColors.primary = DynamicColor.fromPalette({
  name: "primary",
  palette: (s) => s.primaryPalette,
  tone: (s) => {
    if (isMonochrome(s)) {
      return s.isDark ? 100 : 0;
    }
    return s.isDark ? 80 : 40;
  },
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(3, 4.5, 7, 7),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.primaryContainer, MaterialDynamicColors.primary, 10, "nearer", false)
});
MaterialDynamicColors.onPrimary = DynamicColor.fromPalette({
  name: "on_primary",
  palette: (s) => s.primaryPalette,
  tone: (s) => {
    if (isMonochrome(s)) {
      return s.isDark ? 10 : 90;
    }
    return s.isDark ? 20 : 100;
  },
  background: (s) => MaterialDynamicColors.primary,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
});
MaterialDynamicColors.primaryContainer = DynamicColor.fromPalette({
  name: "primary_container",
  palette: (s) => s.primaryPalette,
  tone: (s) => {
    if (isFidelity(s)) {
      return s.sourceColorHct.tone;
    }
    if (isMonochrome(s)) {
      return s.isDark ? 85 : 25;
    }
    return s.isDark ? 30 : 90;
  },
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.primaryContainer, MaterialDynamicColors.primary, 10, "nearer", false)
});
MaterialDynamicColors.onPrimaryContainer = DynamicColor.fromPalette({
  name: "on_primary_container",
  palette: (s) => s.primaryPalette,
  tone: (s) => {
    if (isFidelity(s)) {
      return DynamicColor.foregroundTone(MaterialDynamicColors.primaryContainer.tone(s), 4.5);
    }
    if (isMonochrome(s)) {
      return s.isDark ? 0 : 100;
    }
    return s.isDark ? 90 : 30;
  },
  background: (s) => MaterialDynamicColors.primaryContainer,
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
});
MaterialDynamicColors.inversePrimary = DynamicColor.fromPalette({
  name: "inverse_primary",
  palette: (s) => s.primaryPalette,
  tone: (s) => s.isDark ? 40 : 80,
  background: (s) => MaterialDynamicColors.inverseSurface,
  contrastCurve: new ContrastCurve(3, 4.5, 7, 7)
});
MaterialDynamicColors.secondary = DynamicColor.fromPalette({
  name: "secondary",
  palette: (s) => s.secondaryPalette,
  tone: (s) => s.isDark ? 80 : 40,
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(3, 4.5, 7, 7),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.secondaryContainer, MaterialDynamicColors.secondary, 10, "nearer", false)
});
MaterialDynamicColors.onSecondary = DynamicColor.fromPalette({
  name: "on_secondary",
  palette: (s) => s.secondaryPalette,
  tone: (s) => {
    if (isMonochrome(s)) {
      return s.isDark ? 10 : 100;
    } else {
      return s.isDark ? 20 : 100;
    }
  },
  background: (s) => MaterialDynamicColors.secondary,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
});
MaterialDynamicColors.secondaryContainer = DynamicColor.fromPalette({
  name: "secondary_container",
  palette: (s) => s.secondaryPalette,
  tone: (s) => {
    const initialTone = s.isDark ? 30 : 90;
    if (isMonochrome(s)) {
      return s.isDark ? 30 : 85;
    }
    if (!isFidelity(s)) {
      return initialTone;
    }
    return findDesiredChromaByTone(s.secondaryPalette.hue, s.secondaryPalette.chroma, initialTone, s.isDark ? false : true);
  },
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.secondaryContainer, MaterialDynamicColors.secondary, 10, "nearer", false)
});
MaterialDynamicColors.onSecondaryContainer = DynamicColor.fromPalette({
  name: "on_secondary_container",
  palette: (s) => s.secondaryPalette,
  tone: (s) => {
    if (isMonochrome(s)) {
      return s.isDark ? 90 : 10;
    }
    if (!isFidelity(s)) {
      return s.isDark ? 90 : 30;
    }
    return DynamicColor.foregroundTone(MaterialDynamicColors.secondaryContainer.tone(s), 4.5);
  },
  background: (s) => MaterialDynamicColors.secondaryContainer,
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
});
MaterialDynamicColors.tertiary = DynamicColor.fromPalette({
  name: "tertiary",
  palette: (s) => s.tertiaryPalette,
  tone: (s) => {
    if (isMonochrome(s)) {
      return s.isDark ? 90 : 25;
    }
    return s.isDark ? 80 : 40;
  },
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(3, 4.5, 7, 7),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.tertiaryContainer, MaterialDynamicColors.tertiary, 10, "nearer", false)
});
MaterialDynamicColors.onTertiary = DynamicColor.fromPalette({
  name: "on_tertiary",
  palette: (s) => s.tertiaryPalette,
  tone: (s) => {
    if (isMonochrome(s)) {
      return s.isDark ? 10 : 90;
    }
    return s.isDark ? 20 : 100;
  },
  background: (s) => MaterialDynamicColors.tertiary,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
});
MaterialDynamicColors.tertiaryContainer = DynamicColor.fromPalette({
  name: "tertiary_container",
  palette: (s) => s.tertiaryPalette,
  tone: (s) => {
    if (isMonochrome(s)) {
      return s.isDark ? 60 : 49;
    }
    if (!isFidelity(s)) {
      return s.isDark ? 30 : 90;
    }
    const proposedHct = s.tertiaryPalette.getHct(s.sourceColorHct.tone);
    return DislikeAnalyzer.fixIfDisliked(proposedHct).tone;
  },
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.tertiaryContainer, MaterialDynamicColors.tertiary, 10, "nearer", false)
});
MaterialDynamicColors.onTertiaryContainer = DynamicColor.fromPalette({
  name: "on_tertiary_container",
  palette: (s) => s.tertiaryPalette,
  tone: (s) => {
    if (isMonochrome(s)) {
      return s.isDark ? 0 : 100;
    }
    if (!isFidelity(s)) {
      return s.isDark ? 90 : 30;
    }
    return DynamicColor.foregroundTone(MaterialDynamicColors.tertiaryContainer.tone(s), 4.5);
  },
  background: (s) => MaterialDynamicColors.tertiaryContainer,
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
});
MaterialDynamicColors.error = DynamicColor.fromPalette({
  name: "error",
  palette: (s) => s.errorPalette,
  tone: (s) => s.isDark ? 80 : 40,
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(3, 4.5, 7, 7),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.errorContainer, MaterialDynamicColors.error, 10, "nearer", false)
});
MaterialDynamicColors.onError = DynamicColor.fromPalette({
  name: "on_error",
  palette: (s) => s.errorPalette,
  tone: (s) => s.isDark ? 20 : 100,
  background: (s) => MaterialDynamicColors.error,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
});
MaterialDynamicColors.errorContainer = DynamicColor.fromPalette({
  name: "error_container",
  palette: (s) => s.errorPalette,
  tone: (s) => s.isDark ? 30 : 90,
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.errorContainer, MaterialDynamicColors.error, 10, "nearer", false)
});
MaterialDynamicColors.onErrorContainer = DynamicColor.fromPalette({
  name: "on_error_container",
  palette: (s) => s.errorPalette,
  tone: (s) => {
    if (isMonochrome(s)) {
      return s.isDark ? 90 : 10;
    }
    return s.isDark ? 90 : 30;
  },
  background: (s) => MaterialDynamicColors.errorContainer,
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
});
MaterialDynamicColors.primaryFixed = DynamicColor.fromPalette({
  name: "primary_fixed",
  palette: (s) => s.primaryPalette,
  tone: (s) => isMonochrome(s) ? 40 : 90,
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.primaryFixed, MaterialDynamicColors.primaryFixedDim, 10, "lighter", true)
});
MaterialDynamicColors.primaryFixedDim = DynamicColor.fromPalette({
  name: "primary_fixed_dim",
  palette: (s) => s.primaryPalette,
  tone: (s) => isMonochrome(s) ? 30 : 80,
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.primaryFixed, MaterialDynamicColors.primaryFixedDim, 10, "lighter", true)
});
MaterialDynamicColors.onPrimaryFixed = DynamicColor.fromPalette({
  name: "on_primary_fixed",
  palette: (s) => s.primaryPalette,
  tone: (s) => isMonochrome(s) ? 100 : 10,
  background: (s) => MaterialDynamicColors.primaryFixedDim,
  secondBackground: (s) => MaterialDynamicColors.primaryFixed,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
});
MaterialDynamicColors.onPrimaryFixedVariant = DynamicColor.fromPalette({
  name: "on_primary_fixed_variant",
  palette: (s) => s.primaryPalette,
  tone: (s) => isMonochrome(s) ? 90 : 30,
  background: (s) => MaterialDynamicColors.primaryFixedDim,
  secondBackground: (s) => MaterialDynamicColors.primaryFixed,
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
});
MaterialDynamicColors.secondaryFixed = DynamicColor.fromPalette({
  name: "secondary_fixed",
  palette: (s) => s.secondaryPalette,
  tone: (s) => isMonochrome(s) ? 80 : 90,
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.secondaryFixed, MaterialDynamicColors.secondaryFixedDim, 10, "lighter", true)
});
MaterialDynamicColors.secondaryFixedDim = DynamicColor.fromPalette({
  name: "secondary_fixed_dim",
  palette: (s) => s.secondaryPalette,
  tone: (s) => isMonochrome(s) ? 70 : 80,
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.secondaryFixed, MaterialDynamicColors.secondaryFixedDim, 10, "lighter", true)
});
MaterialDynamicColors.onSecondaryFixed = DynamicColor.fromPalette({
  name: "on_secondary_fixed",
  palette: (s) => s.secondaryPalette,
  tone: (s) => 10,
  background: (s) => MaterialDynamicColors.secondaryFixedDim,
  secondBackground: (s) => MaterialDynamicColors.secondaryFixed,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
});
MaterialDynamicColors.onSecondaryFixedVariant = DynamicColor.fromPalette({
  name: "on_secondary_fixed_variant",
  palette: (s) => s.secondaryPalette,
  tone: (s) => isMonochrome(s) ? 25 : 30,
  background: (s) => MaterialDynamicColors.secondaryFixedDim,
  secondBackground: (s) => MaterialDynamicColors.secondaryFixed,
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
});
MaterialDynamicColors.tertiaryFixed = DynamicColor.fromPalette({
  name: "tertiary_fixed",
  palette: (s) => s.tertiaryPalette,
  tone: (s) => isMonochrome(s) ? 40 : 90,
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.tertiaryFixed, MaterialDynamicColors.tertiaryFixedDim, 10, "lighter", true)
});
MaterialDynamicColors.tertiaryFixedDim = DynamicColor.fromPalette({
  name: "tertiary_fixed_dim",
  palette: (s) => s.tertiaryPalette,
  tone: (s) => isMonochrome(s) ? 30 : 80,
  isBackground: true,
  background: (s) => MaterialDynamicColors.highestSurface(s),
  contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
  toneDeltaPair: (s) => new ToneDeltaPair(MaterialDynamicColors.tertiaryFixed, MaterialDynamicColors.tertiaryFixedDim, 10, "lighter", true)
});
MaterialDynamicColors.onTertiaryFixed = DynamicColor.fromPalette({
  name: "on_tertiary_fixed",
  palette: (s) => s.tertiaryPalette,
  tone: (s) => isMonochrome(s) ? 100 : 10,
  background: (s) => MaterialDynamicColors.tertiaryFixedDim,
  secondBackground: (s) => MaterialDynamicColors.tertiaryFixed,
  contrastCurve: new ContrastCurve(4.5, 7, 11, 21)
});
MaterialDynamicColors.onTertiaryFixedVariant = DynamicColor.fromPalette({
  name: "on_tertiary_fixed_variant",
  palette: (s) => s.tertiaryPalette,
  tone: (s) => isMonochrome(s) ? 90 : 30,
  background: (s) => MaterialDynamicColors.tertiaryFixedDim,
  secondBackground: (s) => MaterialDynamicColors.tertiaryFixed,
  contrastCurve: new ContrastCurve(3, 4.5, 7, 11)
});

// node_modules/@material/material-color-utilities/dynamiccolor/dynamic_scheme.js
var DynamicScheme = class {
  constructor(args) {
    this.sourceColorArgb = args.sourceColorArgb;
    this.variant = args.variant;
    this.contrastLevel = args.contrastLevel;
    this.isDark = args.isDark;
    this.sourceColorHct = Hct.fromInt(args.sourceColorArgb);
    this.primaryPalette = args.primaryPalette;
    this.secondaryPalette = args.secondaryPalette;
    this.tertiaryPalette = args.tertiaryPalette;
    this.neutralPalette = args.neutralPalette;
    this.neutralVariantPalette = args.neutralVariantPalette;
    this.errorPalette = TonalPalette.fromHueAndChroma(25, 84);
  }
  /**
   * Support design spec'ing Dynamic Color by schemes that specify hue
   * rotations that should be applied at certain breakpoints.
   * @param sourceColor the source color of the theme, in HCT.
   * @param hues The "breakpoints", i.e. the hues at which a rotation should
   * be apply.
   * @param rotations The rotation that should be applied when source color's
   * hue is >= the same index in hues array, and <= the hue at the next index
   * in hues array.
   */
  static getRotatedHue(sourceColor, hues, rotations) {
    const sourceHue = sourceColor.hue;
    if (hues.length !== rotations.length) {
      throw new Error(`mismatch between hue length ${hues.length} & rotations ${rotations.length}`);
    }
    if (rotations.length === 1) {
      return sanitizeDegreesDouble(sourceColor.hue + rotations[0]);
    }
    const size = hues.length;
    for (let i = 0; i <= size - 2; i++) {
      const thisHue = hues[i];
      const nextHue = hues[i + 1];
      if (thisHue < sourceHue && sourceHue < nextHue) {
        return sanitizeDegreesDouble(sourceHue + rotations[i]);
      }
    }
    return sourceHue;
  }
  getArgb(dynamicColor) {
    return dynamicColor.getArgb(this);
  }
  getHct(dynamicColor) {
    return dynamicColor.getHct(this);
  }
  get primaryPaletteKeyColor() {
    return this.getArgb(MaterialDynamicColors.primaryPaletteKeyColor);
  }
  get secondaryPaletteKeyColor() {
    return this.getArgb(MaterialDynamicColors.secondaryPaletteKeyColor);
  }
  get tertiaryPaletteKeyColor() {
    return this.getArgb(MaterialDynamicColors.tertiaryPaletteKeyColor);
  }
  get neutralPaletteKeyColor() {
    return this.getArgb(MaterialDynamicColors.neutralPaletteKeyColor);
  }
  get neutralVariantPaletteKeyColor() {
    return this.getArgb(MaterialDynamicColors.neutralVariantPaletteKeyColor);
  }
  get background() {
    return this.getArgb(MaterialDynamicColors.background);
  }
  get onBackground() {
    return this.getArgb(MaterialDynamicColors.onBackground);
  }
  get surface() {
    return this.getArgb(MaterialDynamicColors.surface);
  }
  get surfaceDim() {
    return this.getArgb(MaterialDynamicColors.surfaceDim);
  }
  get surfaceBright() {
    return this.getArgb(MaterialDynamicColors.surfaceBright);
  }
  get surfaceContainerLowest() {
    return this.getArgb(MaterialDynamicColors.surfaceContainerLowest);
  }
  get surfaceContainerLow() {
    return this.getArgb(MaterialDynamicColors.surfaceContainerLow);
  }
  get surfaceContainer() {
    return this.getArgb(MaterialDynamicColors.surfaceContainer);
  }
  get surfaceContainerHigh() {
    return this.getArgb(MaterialDynamicColors.surfaceContainerHigh);
  }
  get surfaceContainerHighest() {
    return this.getArgb(MaterialDynamicColors.surfaceContainerHighest);
  }
  get onSurface() {
    return this.getArgb(MaterialDynamicColors.onSurface);
  }
  get surfaceVariant() {
    return this.getArgb(MaterialDynamicColors.surfaceVariant);
  }
  get onSurfaceVariant() {
    return this.getArgb(MaterialDynamicColors.onSurfaceVariant);
  }
  get inverseSurface() {
    return this.getArgb(MaterialDynamicColors.inverseSurface);
  }
  get inverseOnSurface() {
    return this.getArgb(MaterialDynamicColors.inverseOnSurface);
  }
  get outline() {
    return this.getArgb(MaterialDynamicColors.outline);
  }
  get outlineVariant() {
    return this.getArgb(MaterialDynamicColors.outlineVariant);
  }
  get shadow() {
    return this.getArgb(MaterialDynamicColors.shadow);
  }
  get scrim() {
    return this.getArgb(MaterialDynamicColors.scrim);
  }
  get surfaceTint() {
    return this.getArgb(MaterialDynamicColors.surfaceTint);
  }
  get primary() {
    return this.getArgb(MaterialDynamicColors.primary);
  }
  get onPrimary() {
    return this.getArgb(MaterialDynamicColors.onPrimary);
  }
  get primaryContainer() {
    return this.getArgb(MaterialDynamicColors.primaryContainer);
  }
  get onPrimaryContainer() {
    return this.getArgb(MaterialDynamicColors.onPrimaryContainer);
  }
  get inversePrimary() {
    return this.getArgb(MaterialDynamicColors.inversePrimary);
  }
  get secondary() {
    return this.getArgb(MaterialDynamicColors.secondary);
  }
  get onSecondary() {
    return this.getArgb(MaterialDynamicColors.onSecondary);
  }
  get secondaryContainer() {
    return this.getArgb(MaterialDynamicColors.secondaryContainer);
  }
  get onSecondaryContainer() {
    return this.getArgb(MaterialDynamicColors.onSecondaryContainer);
  }
  get tertiary() {
    return this.getArgb(MaterialDynamicColors.tertiary);
  }
  get onTertiary() {
    return this.getArgb(MaterialDynamicColors.onTertiary);
  }
  get tertiaryContainer() {
    return this.getArgb(MaterialDynamicColors.tertiaryContainer);
  }
  get onTertiaryContainer() {
    return this.getArgb(MaterialDynamicColors.onTertiaryContainer);
  }
  get error() {
    return this.getArgb(MaterialDynamicColors.error);
  }
  get onError() {
    return this.getArgb(MaterialDynamicColors.onError);
  }
  get errorContainer() {
    return this.getArgb(MaterialDynamicColors.errorContainer);
  }
  get onErrorContainer() {
    return this.getArgb(MaterialDynamicColors.onErrorContainer);
  }
  get primaryFixed() {
    return this.getArgb(MaterialDynamicColors.primaryFixed);
  }
  get primaryFixedDim() {
    return this.getArgb(MaterialDynamicColors.primaryFixedDim);
  }
  get onPrimaryFixed() {
    return this.getArgb(MaterialDynamicColors.onPrimaryFixed);
  }
  get onPrimaryFixedVariant() {
    return this.getArgb(MaterialDynamicColors.onPrimaryFixedVariant);
  }
  get secondaryFixed() {
    return this.getArgb(MaterialDynamicColors.secondaryFixed);
  }
  get secondaryFixedDim() {
    return this.getArgb(MaterialDynamicColors.secondaryFixedDim);
  }
  get onSecondaryFixed() {
    return this.getArgb(MaterialDynamicColors.onSecondaryFixed);
  }
  get onSecondaryFixedVariant() {
    return this.getArgb(MaterialDynamicColors.onSecondaryFixedVariant);
  }
  get tertiaryFixed() {
    return this.getArgb(MaterialDynamicColors.tertiaryFixed);
  }
  get tertiaryFixedDim() {
    return this.getArgb(MaterialDynamicColors.tertiaryFixedDim);
  }
  get onTertiaryFixed() {
    return this.getArgb(MaterialDynamicColors.onTertiaryFixed);
  }
  get onTertiaryFixedVariant() {
    return this.getArgb(MaterialDynamicColors.onTertiaryFixedVariant);
  }
};

// node_modules/@material/material-color-utilities/scheme/scheme_expressive.js
var SchemeExpressive = class _SchemeExpressive extends DynamicScheme {
  constructor(sourceColorHct, isDark, contrastLevel) {
    super({
      sourceColorArgb: sourceColorHct.toInt(),
      variant: Variant.EXPRESSIVE,
      contrastLevel,
      isDark,
      primaryPalette: TonalPalette.fromHueAndChroma(sanitizeDegreesDouble(sourceColorHct.hue + 240), 40),
      secondaryPalette: TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, _SchemeExpressive.hues, _SchemeExpressive.secondaryRotations), 24),
      tertiaryPalette: TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, _SchemeExpressive.hues, _SchemeExpressive.tertiaryRotations), 32),
      neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue + 15, 8),
      neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue + 15, 12)
    });
  }
};
SchemeExpressive.hues = [
  0,
  21,
  51,
  121,
  151,
  191,
  271,
  321,
  360
];
SchemeExpressive.secondaryRotations = [
  45,
  95,
  45,
  20,
  45,
  90,
  45,
  45,
  45
];
SchemeExpressive.tertiaryRotations = [
  120,
  120,
  20,
  45,
  20,
  15,
  20,
  120,
  120
];

// node_modules/@material/material-color-utilities/scheme/scheme_vibrant.js
var SchemeVibrant = class _SchemeVibrant extends DynamicScheme {
  constructor(sourceColorHct, isDark, contrastLevel) {
    super({
      sourceColorArgb: sourceColorHct.toInt(),
      variant: Variant.VIBRANT,
      contrastLevel,
      isDark,
      primaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 200),
      secondaryPalette: TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, _SchemeVibrant.hues, _SchemeVibrant.secondaryRotations), 24),
      tertiaryPalette: TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, _SchemeVibrant.hues, _SchemeVibrant.tertiaryRotations), 32),
      neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 10),
      neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 12)
    });
  }
};
SchemeVibrant.hues = [
  0,
  41,
  61,
  101,
  131,
  181,
  251,
  301,
  360
];
SchemeVibrant.secondaryRotations = [
  18,
  15,
  10,
  12,
  15,
  18,
  15,
  12,
  12
];
SchemeVibrant.tertiaryRotations = [
  35,
  30,
  20,
  25,
  30,
  35,
  30,
  25,
  25
];

// node_modules/@material/material-color-utilities/score/score.js
var SCORE_OPTION_DEFAULTS = {
  desired: 4,
  fallbackColorARGB: 4282549748,
  filter: true
  // Avoid unsuitable colors.
};
function compare(a, b) {
  if (a.score > b.score) {
    return -1;
  } else if (a.score < b.score) {
    return 1;
  }
  return 0;
}
var Score = class _Score {
  constructor() {
  }
  /**
   * Given a map with keys of colors and values of how often the color appears,
   * rank the colors based on suitability for being used for a UI theme.
   *
   * @param colorsToPopulation map with keys of colors and values of how often
   *     the color appears, usually from a source image.
   * @param {ScoreOptions} options optional parameters.
   * @return Colors sorted by suitability for a UI theme. The most suitable
   *     color is the first item, the least suitable is the last. There will
   *     always be at least one color returned. If all the input colors
   *     were not suitable for a theme, a default fallback color will be
   *     provided, Google Blue.
   */
  static score(colorsToPopulation, options) {
    const { desired, fallbackColorARGB, filter } = { ...SCORE_OPTION_DEFAULTS, ...options };
    const colorsHct = [];
    const huePopulation = new Array(360).fill(0);
    let populationSum = 0;
    for (const [argb, population] of colorsToPopulation.entries()) {
      const hct = Hct.fromInt(argb);
      colorsHct.push(hct);
      const hue = Math.floor(hct.hue);
      huePopulation[hue] += population;
      populationSum += population;
    }
    const hueExcitedProportions = new Array(360).fill(0);
    for (let hue = 0; hue < 360; hue++) {
      const proportion = huePopulation[hue] / populationSum;
      for (let i = hue - 14; i < hue + 16; i++) {
        const neighborHue = sanitizeDegreesInt(i);
        hueExcitedProportions[neighborHue] += proportion;
      }
    }
    const scoredHct = new Array();
    for (const hct of colorsHct) {
      const hue = sanitizeDegreesInt(Math.round(hct.hue));
      const proportion = hueExcitedProportions[hue];
      if (filter && (hct.chroma < _Score.CUTOFF_CHROMA || proportion <= _Score.CUTOFF_EXCITED_PROPORTION)) {
        continue;
      }
      const proportionScore = proportion * 100 * _Score.WEIGHT_PROPORTION;
      const chromaWeight = hct.chroma < _Score.TARGET_CHROMA ? _Score.WEIGHT_CHROMA_BELOW : _Score.WEIGHT_CHROMA_ABOVE;
      const chromaScore = (hct.chroma - _Score.TARGET_CHROMA) * chromaWeight;
      const score = proportionScore + chromaScore;
      scoredHct.push({ hct, score });
    }
    scoredHct.sort(compare);
    const chosenColors = [];
    for (let differenceDegrees2 = 90; differenceDegrees2 >= 15; differenceDegrees2--) {
      chosenColors.length = 0;
      for (const { hct } of scoredHct) {
        const duplicateHue = chosenColors.find((chosenHct) => {
          return differenceDegrees(hct.hue, chosenHct.hue) < differenceDegrees2;
        });
        if (!duplicateHue) {
          chosenColors.push(hct);
        }
        if (chosenColors.length >= desired)
          break;
      }
      if (chosenColors.length >= desired)
        break;
    }
    const colors = [];
    if (chosenColors.length === 0) {
      colors.push(fallbackColorARGB);
    }
    for (const chosenHct of chosenColors) {
      colors.push(chosenHct.toInt());
    }
    return colors;
  }
};
Score.TARGET_CHROMA = 48;
Score.WEIGHT_PROPORTION = 0.7;
Score.WEIGHT_CHROMA_ABOVE = 0.3;
Score.WEIGHT_CHROMA_BELOW = 0.1;
Score.CUTOFF_CHROMA = 5;
Score.CUTOFF_EXCITED_PROPORTION = 0.01;

// node_modules/@material/material-color-utilities/utils/string_utils.js
function hexFromArgb(argb) {
  const r = redFromArgb(argb);
  const g = greenFromArgb(argb);
  const b = blueFromArgb(argb);
  const outParts = [r.toString(16), g.toString(16), b.toString(16)];
  for (const [i, part] of outParts.entries()) {
    if (part.length === 1) {
      outParts[i] = "0" + part;
    }
  }
  return "#" + outParts.join("");
}
function argbFromHex(hex) {
  hex = hex.replace("#", "");
  const isThree = hex.length === 3;
  const isSix = hex.length === 6;
  const isEight = hex.length === 8;
  if (!isThree && !isSix && !isEight) {
    throw new Error("unexpected hex " + hex);
  }
  let r = 0;
  let g = 0;
  let b = 0;
  if (isThree) {
    r = parseIntHex(hex.slice(0, 1).repeat(2));
    g = parseIntHex(hex.slice(1, 2).repeat(2));
    b = parseIntHex(hex.slice(2, 3).repeat(2));
  } else if (isSix) {
    r = parseIntHex(hex.slice(0, 2));
    g = parseIntHex(hex.slice(2, 4));
    b = parseIntHex(hex.slice(4, 6));
  } else if (isEight) {
    r = parseIntHex(hex.slice(2, 4));
    g = parseIntHex(hex.slice(4, 6));
    b = parseIntHex(hex.slice(6, 8));
  }
  return (255 << 24 | (r & 255) << 16 | (g & 255) << 8 | b & 255) >>> 0;
}
function parseIntHex(value) {
  return parseInt(value, 16);
}

// node_modules/@cloudscape-design/theming-runtime/shared/theme/color-generation/hct-utils.js
function isValidHex(hex) {
  return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}
function parseColorToArgb(color) {
  var trimmed = color.trim();
  if (trimmed.startsWith("#")) {
    if (!isValidHex(trimmed)) {
      throw new Error("Invalid hex color: ".concat(color));
    }
    return argbFromHex(trimmed);
  }
  var rgbMatch = trimmed.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    var r = parseInt(rgbMatch[1]);
    var g = parseInt(rgbMatch[2]);
    var b = parseInt(rgbMatch[3]);
    return argbFromRgb(r, g, b);
  }
  throw new Error("Unsupported color format: ".concat(color, ". Supported formats: #hex, rgb(), rgba()"));
}
function hctToHex(hctColor) {
  return hexFromArgb(hctColor.toInt());
}
function hexToHct(color) {
  var argb = parseColorToArgb(color);
  return Hct.fromInt(argb);
}
function createHct(hue, chroma, tone) {
  return Hct.from(hue, chroma, tone);
}

// node_modules/@cloudscape-design/theming-runtime/shared/theme/color-generation/palette-spec.js
var PaletteSpecification = (
  /** @class */
  function() {
    function PaletteSpecification2(positionRequirements, maxChroma) {
      this.colorSpecifications = positionRequirements;
      this.maxChroma = maxChroma !== null && maxChroma !== void 0 ? maxChroma : 200;
    }
    PaletteSpecification2.prototype.findColorSpecification = function(hctColor) {
      var tone = Math.round(hctColor.tone);
      for (var _i = 0, _a = this.colorSpecifications; _i < _a.length; _i++) {
        var position = _a[_i];
        if (tone <= position.maxTone && tone >= position.minTone) {
          return position;
        }
      }
      var nearestTone = this.findNearestValidTone(tone);
      for (var _b = 0, _c = this.colorSpecifications; _b < _c.length; _b++) {
        var position = _c[_b];
        if (nearestTone <= position.maxTone && nearestTone >= position.minTone) {
          return position;
        }
      }
      return void 0;
    };
    PaletteSpecification2.prototype.findNearestValidTone = function(inputTone) {
      var closestTone = inputTone;
      var minDistance = Infinity;
      var preferDarker = inputTone < 50;
      for (var _i = 0, _a = this.colorSpecifications; _i < _a.length; _i++) {
        var spec = _a[_i];
        var midTone = (spec.minTone + spec.maxTone) / 2;
        var distance = Math.abs(inputTone - midTone);
        if (distance < minDistance) {
          minDistance = distance;
          closestTone = midTone;
        } else if (distance === minDistance && preferDarker && midTone < closestTone) {
          closestTone = midTone;
        }
      }
      return Math.round(closestTone);
    };
    PaletteSpecification2.prototype.getColorToneProportion = function(position, hctColor) {
      var proportion = (hctColor.tone - position.minTone) / (position.maxTone - position.minTone);
      return Math.max(0, Math.min(1, proportion));
    };
    PaletteSpecification2.prototype.getColorToneForProportion = function(position, proportion) {
      var baseTone = position.minTone + (position.maxTone - position.minTone) * proportion;
      var BIAS_STRENGTH = 0.5;
      var positionNum = Number(position.position);
      if (positionNum <= 500) {
        return baseTone + (position.maxTone - baseTone) * BIAS_STRENGTH;
      } else {
        return baseTone - (baseTone - position.minTone) * BIAS_STRENGTH;
      }
    };
    PaletteSpecification2.prototype.adjustSeedColor = function(hct, mode) {
      return hct;
    };
    PaletteSpecification2.prototype.getExactSeedPosition = function(hct, mode) {
      return void 0;
    };
    PaletteSpecification2.prototype.validateAndAdjustSeed = function(hexColor, mode) {
      var hct = hexToHct(hexColor);
      hct = this.adjustSeedColor(hct, mode);
      return hctToHex(hct);
    };
    PaletteSpecification2.prototype.getPalette = function(hexBaseColor, autoAdjust, mode) {
      if (autoAdjust === void 0) {
        autoAdjust = true;
      }
      var adjustedSeed = this.prepareBaseSeed(hexBaseColor, autoAdjust, mode);
      var baseColorInfo = this.extractBaseColorInfo(adjustedSeed, mode);
      var colors = this.generatePaletteColors(baseColorInfo);
      return __assign({ seed: adjustedSeed.hex }, colors);
    };
    PaletteSpecification2.prototype.prepareBaseSeed = function(hexColor, autoAdjust, mode) {
      var seedWasAdjusted = false;
      if (autoAdjust) {
        var original = hexColor;
        hexColor = this.validateAndAdjustSeed(hexColor, mode);
        seedWasAdjusted = original !== hexColor;
      }
      return { hex: hexColor, wasAdjusted: seedWasAdjusted };
    };
    PaletteSpecification2.prototype.extractBaseColorInfo = function(seed, mode) {
      var hctBaseColor = hexToHct(seed.hex);
      var exactSeedPosition = this.getExactSeedPosition(hctBaseColor, mode);
      var baseColorPalettePosition = exactSeedPosition ? this.colorSpecifications.find(function(s) {
        return s.position === exactSeedPosition;
      }) : this.findColorSpecification(hctBaseColor);
      if (!baseColorPalettePosition) {
        throw new Error("Seed color ".concat(seed.hex, " does not match any palette position specification"));
      }
      var baseColorToneRangePosition = exactSeedPosition ? 0.5 : this.getColorToneProportion(baseColorPalettePosition, hctBaseColor);
      return {
        hue: hctBaseColor.hue,
        chroma: this.calculateBaseChroma(hctBaseColor.chroma, baseColorPalettePosition),
        basePosition: baseColorPalettePosition,
        toneRangePosition: baseColorToneRangePosition,
        seedHex: seed.hex,
        seedWasAdjusted: seed.wasAdjusted,
        exactSeedPosition
      };
    };
    PaletteSpecification2.prototype.calculateBaseChroma = function(seedChroma, position) {
      var useDirectChroma = this.maxChroma < 50;
      return useDirectChroma ? seedChroma : seedChroma / position.chromaFraction;
    };
    PaletteSpecification2.prototype.generatePaletteColors = function(baseInfo) {
      var colors = {};
      for (var _i = 0, _a = this.colorSpecifications; _i < _a.length; _i++) {
        var color = _a[_i];
        var tone = this.getColorToneForProportion(color, baseInfo.toneRangePosition);
        var isPaletteBase = baseInfo.basePosition.position === color.position;
        var isExactSeedPosition = baseInfo.exactSeedPosition === color.position;
        var adjustedChroma = color.chromaFraction * baseInfo.chroma;
        if (adjustedChroma > this.maxChroma) {
          adjustedChroma = this.maxChroma;
        }
        var paletteColor = isPaletteBase && !baseInfo.seedWasAdjusted || isExactSeedPosition ? baseInfo.seedHex : hctToHex(createHct(baseInfo.hue, adjustedChroma, tone));
        colors[color.position] = paletteColor;
      }
      return colors;
    };
    return PaletteSpecification2;
  }()
);

// node_modules/@cloudscape-design/theming-runtime/shared/theme/color-generation/neutral-spec.js
var MIN_TONE = 1;
var MAX_TONE = 99;
var MAX_CHROMA = 15;
var NeutralPaletteSpecification = (
  /** @class */
  function(_super) {
    __extends(NeutralPaletteSpecification2, _super);
    function NeutralPaletteSpecification2() {
      return _super.call(this, [
        // Near white - very light neutrals
        { position: 50, chromaFraction: 0.5, minTone: 98, maxTone: MAX_TONE },
        { position: 100, chromaFraction: 0.5, minTone: 97, maxTone: 98 },
        { position: 150, chromaFraction: 0.5, minTone: 96, maxTone: 97 },
        { position: 200, chromaFraction: 0.5, minTone: 96, maxTone: 96 },
        // Light neutrals
        { position: 250, chromaFraction: 0.5, minTone: 93, maxTone: 95 },
        { position: 300, chromaFraction: 0.5, minTone: 88, maxTone: 92 },
        { position: 350, chromaFraction: 0.5, minTone: 80, maxTone: 85 },
        // Medium neutrals
        { position: 400, chromaFraction: 0.75, minTone: 72, maxTone: 76 },
        { position: 450, chromaFraction: 0.75, minTone: 68, maxTone: 72 },
        { position: 500, chromaFraction: 0.75, minTone: 55, maxTone: 58 },
        { position: 550, chromaFraction: 0.75, minTone: 46, maxTone: 52 },
        { position: 600, chromaFraction: 0.75, minTone: 44, maxTone: 46 },
        // Dark neutrals
        { position: 650, chromaFraction: 0.75, minTone: 28, maxTone: 35 },
        { position: 700, chromaFraction: 0.75, minTone: 22, maxTone: 27 },
        { position: 750, chromaFraction: 0.75, minTone: 14, maxTone: 20 },
        { position: 800, chromaFraction: 0.75, minTone: 10, maxTone: 14 },
        // Very dark neutrals
        { position: 850, chromaFraction: 0.75, minTone: 5, maxTone: 7 },
        { position: 900, chromaFraction: 0.75, minTone: 3, maxTone: 5 },
        { position: 950, chromaFraction: 0.75, minTone: 2, maxTone: 3 },
        { position: 1e3, chromaFraction: 0.75, minTone: MIN_TONE, maxTone: 2 }
        // 2
      ], MAX_CHROMA) || this;
    }
    NeutralPaletteSpecification2.prototype.adjustSeedColor = function(hct) {
      if (hct.chroma > MAX_CHROMA) {
        return createHct(hct.hue, MAX_CHROMA, this.findNearestValidTone(hct.tone));
      }
      return hct;
    };
    return NeutralPaletteSpecification2;
  }(PaletteSpecification)
);

// node_modules/@cloudscape-design/theming-runtime/shared/theme/color-generation/primary-spec.js
var MIN_TONE2 = 3;
var MAX_TONE2 = 98;
var PrimaryPaletteSpecification = (
  /** @class */
  function(_super) {
    __extends(PrimaryPaletteSpecification2, _super);
    function PrimaryPaletteSpecification2() {
      return _super.call(this, [
        {
          position: 50,
          chromaFraction: 0.2,
          minTone: 97,
          maxTone: MAX_TONE2
        },
        {
          position: 100,
          chromaFraction: 0.3,
          minTone: 91,
          maxTone: 96
        },
        {
          position: 200,
          chromaFraction: 0.5,
          minTone: 84,
          maxTone: 91
        },
        {
          position: 300,
          chromaFraction: 0.7,
          minTone: 75,
          maxTone: 84
        },
        {
          position: 400,
          chromaFraction: 1,
          minTone: 65,
          maxTone: 75
        },
        {
          position: 500,
          chromaFraction: 1,
          minTone: 48,
          maxTone: 65
        },
        {
          position: 600,
          chromaFraction: 1,
          minTone: 44,
          maxTone: 47
        },
        {
          position: 700,
          chromaFraction: 1.1,
          minTone: 34,
          maxTone: 44
        },
        {
          position: 800,
          chromaFraction: 1.15,
          minTone: 25,
          maxTone: 34
        },
        {
          position: 900,
          chromaFraction: 1.2,
          minTone: 11,
          maxTone: 25
        },
        {
          position: 1e3,
          chromaFraction: 1.25,
          minTone: MIN_TONE2,
          maxTone: 5
        }
      ]) || this;
    }
    PrimaryPaletteSpecification2.prototype.adjustSeedColor = function(hct, mode) {
      var tone = hct.tone;
      var position600 = this.colorSpecifications.find(function(s) {
        return s.position === 600;
      });
      var position400 = this.colorSpecifications.find(function(s) {
        return s.position === 400;
      });
      if (mode === "light" && position600 && tone > position600.maxTone) {
        return Hct.from(hct.hue, hct.chroma, (position600.minTone + position600.maxTone) / 2);
      }
      if (mode === "dark" && position400 && tone < position400.minTone) {
        return Hct.from(hct.hue, hct.chroma, (position400.minTone + position400.maxTone) / 2);
      }
      return hct;
    };
    PrimaryPaletteSpecification2.prototype.getExactSeedPosition = function(hct, mode) {
      var tone = hct.tone;
      var position600 = this.colorSpecifications.find(function(s) {
        return s.position === 600;
      });
      var position400 = this.colorSpecifications.find(function(s) {
        return s.position === 400;
      });
      if (mode === "light" && position600 && tone <= position600.maxTone) {
        return 600;
      }
      if (mode === "dark" && position400 && tone >= position400.minTone) {
        return 400;
      }
      return void 0;
    };
    return PrimaryPaletteSpecification2;
  }(PaletteSpecification)
);

// node_modules/@cloudscape-design/theming-runtime/shared/theme/color-generation/warning-spec.js
var MIN_TONE3 = 5;
var MAX_TONE3 = 98;
var WarningPaletteSpecification = (
  /** @class */
  function(_super) {
    __extends(WarningPaletteSpecification2, _super);
    function WarningPaletteSpecification2() {
      return _super.call(this, [
        {
          position: 50,
          chromaFraction: 0.5,
          minTone: 97,
          maxTone: MAX_TONE3
        },
        {
          position: 100,
          chromaFraction: 0.5,
          minTone: 95,
          maxTone: 97
        },
        {
          position: 200,
          chromaFraction: 0.5,
          minTone: 90,
          maxTone: 95
        },
        {
          position: 300,
          chromaFraction: 0.75,
          minTone: 86,
          maxTone: 90
        },
        {
          position: 400,
          chromaFraction: 1.5,
          minTone: 82,
          maxTone: 86
        },
        {
          position: 500,
          chromaFraction: 1.5,
          minTone: 75,
          maxTone: 82
        },
        {
          position: 600,
          chromaFraction: 1,
          minTone: 65,
          maxTone: 75
        },
        {
          position: 700,
          chromaFraction: 1.1,
          minTone: 55,
          maxTone: 65
        },
        {
          position: 800,
          chromaFraction: 1.15,
          minTone: 47,
          maxTone: 55
        },
        {
          position: 900,
          chromaFraction: 1.2,
          minTone: 41,
          maxTone: 47
        },
        {
          position: 1e3,
          chromaFraction: 1.25,
          minTone: MIN_TONE3,
          maxTone: 15
        }
      ]) || this;
    }
    return WarningPaletteSpecification2;
  }(PaletteSpecification)
);

// node_modules/@cloudscape-design/theming-runtime/shared/theme/color-generation/palette-generator.js
var paletteCache = /* @__PURE__ */ new Map();
function getCacheKey(category, seed, autoAdjust, mode) {
  return "".concat(category, ":").concat(seed, ":").concat(autoAdjust, ":").concat(mode !== null && mode !== void 0 ? mode : "none");
}
function generatePaletteFromSeed(category, seed, autoAdjust, mode) {
  if (autoAdjust === void 0) {
    autoAdjust = true;
  }
  var cacheKey = getCacheKey(category, seed, autoAdjust, mode);
  var cached = paletteCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  var primaryPaletteSpec = new PrimaryPaletteSpecification();
  var neutralPaletteSpec = new NeutralPaletteSpecification();
  var warningPaletteSpec = new WarningPaletteSpecification();
  var paletteSpec;
  switch (category) {
    case "neutral":
      paletteSpec = neutralPaletteSpec;
      break;
    case "warning":
      paletteSpec = warningPaletteSpec;
      break;
    case "primary":
    case "error":
    case "success":
    case "info":
    default:
      paletteSpec = primaryPaletteSpec;
  }
  var generated = paletteSpec.getPalette(seed, autoAdjust, mode);
  paletteCache.set(cacheKey, generated);
  return generated;
}

// node_modules/@cloudscape-design/theming-runtime/shared/theme/utils.js
function isReferenceToken(category, theme, token) {
  var _a;
  var categoryTokens = (_a = theme.referenceTokens) === null || _a === void 0 ? void 0 : _a[category];
  if (!categoryTokens)
    return false;
  return Object.entries(categoryTokens).some(function(_a2) {
    var type = _a2[0], set = _a2[1];
    if (!set)
      return false;
    return Object.keys(set).some(function(step) {
      return generateReferenceTokenName(category, type, step) === token;
    });
  });
}
function flattenObject(obj, prefix) {
  if (prefix === void 0) {
    prefix = [];
  }
  var result = {};
  if (!obj || typeof obj !== "object") {
    return result;
  }
  for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
    var _b = _a[_i], key = _b[0], value = _b[1];
    var path = __spreadArray(__spreadArray([], prefix, true), [key], false);
    if (typeof value === "string") {
      result[generateCamelCaseName.apply(void 0, path)] = value;
    } else if (isModeValue(value)) {
      result[generateCamelCaseName.apply(void 0, path)] = value;
    } else if (value && typeof value === "object") {
      Object.assign(result, flattenObject(value, path));
    }
  }
  return result;
}
function generateCamelCaseName() {
  var segments = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    segments[_i] = arguments[_i];
  }
  return segments.reduce(function(acc, segment, index) {
    return acc + (index === 0 ? segment : segment.charAt(0).toUpperCase() + segment.slice(1));
  }, "");
}
function flattenReferenceTokens(theme) {
  var _a;
  return ((_a = theme.referenceTokens) === null || _a === void 0 ? void 0 : _a.color) ? flattenObject(theme.referenceTokens.color, ["color"]) : {};
}
function generateReferenceTokenName(category, type, step) {
  return generateCamelCaseName(category, type, step);
}
function isValue(val) {
  return typeof val === "string" && !isReference(val);
}
function isReference(val) {
  return typeof val === "string" && val.charAt(0) === "{" && val.charAt(val.length - 1) === "}";
}
function isModeValue(val) {
  return typeof val === "object" && val !== null && !Array.isArray(val) && // Exclude objects with numeric keys (palette steps like '500', '900')
  !Object.keys(val).some(function(key) {
    return !isNaN(Number(key));
  }) && !Object.keys(val).some(function(state) {
    return !(isValue(val[state]) || isReference(val[state]));
  });
}
function areAssignmentsEqual(valueA, valueB) {
  return valueA === valueB || typeof valueA === "object" && typeof valueB == "object" && Object.keys(valueA).length === Object.keys(valueB).length && Object.keys(valueA).every(function(key) {
    return valueA[key] === valueB[key];
  });
}
function isOptionalState(val) {
  return "selector" in val;
}
function getReference(reference) {
  return reference.slice(1, reference.length - 1);
}
function collectReferencedTokens(theme, tokens) {
  var referenced = /* @__PURE__ */ new Set();
  var visited = /* @__PURE__ */ new Set();
  var addReferences = function(value) {
    if (isReference(value)) {
      referenced.add(getReference(value));
    } else if (isModeValue(value)) {
      Object.values(value).forEach(addReferences);
    }
  };
  var processToken = function(token) {
    if (visited.has(token))
      return;
    visited.add(token);
    var value = theme.tokens[token];
    if (value)
      addReferences(value);
    Object.values(theme.contexts).forEach(function(context) {
      var contextValue = context.tokens[token];
      if (contextValue)
        addReferences(contextValue);
    });
  };
  tokens.forEach(processToken);
  var previousSize = 0;
  var iterations = 0;
  while (referenced.size > previousSize && iterations < 10) {
    previousSize = referenced.size;
    var newTokens = Array.from(referenced).filter(function(t) {
      return !visited.has(t);
    });
    newTokens.forEach(processToken);
    iterations++;
  }
  return Array.from(referenced);
}
function getMode(theme, token) {
  var _a;
  var modeId = theme.tokenModeMap[token];
  return (_a = theme.modes[modeId]) !== null && _a !== void 0 ? _a : null;
}
function getDefaultState(mode) {
  var states = Object.keys(mode.states);
  for (var index = 0; index < states.length; index++) {
    var state = states[index];
    var option = mode.states[state];
    if (option && "default" in option && option["default"]) {
      return state;
    }
  }
  throw new Error("Mode ".concat(JSON.stringify(mode), " does not have a default state"));
}
function isValidPaletteStep(step) {
  return step >= 50 && step <= 1e3 && step % 50 === 0;
}

// node_modules/@cloudscape-design/theming-runtime/shared/theme/process.js
function processReferenceTokens(colorTokens) {
  var generatedTokens = {};
  Object.entries(colorTokens).forEach(function(_a) {
    var colorName = _a[0], paletteInput = _a[1];
    var palette = processColorPaletteInput(colorName, paletteInput);
    Object.entries(palette).forEach(function(_a2) {
      var step = _a2[0], value = _a2[1];
      if (step !== "seed") {
        var tokenName = generateReferenceTokenName("color", colorName, step);
        generatedTokens[tokenName] = value;
      }
    });
  });
  return generatedTokens;
}
function processSeedInput(category, seed) {
  if (!seed)
    return {};
  if (typeof seed === "string") {
    return generatePaletteFromSeed(category, seed);
  }
  var palette = {};
  Object.entries(seed).forEach(function(_a) {
    var mode = _a[0], seedColor = _a[1];
    if (typeof seedColor !== "string")
      return;
    var modePalette = generatePaletteFromSeed(category, seedColor, true, mode);
    Object.entries(modePalette).forEach(function(_a2) {
      var _b, _c;
      var step = _a2[0], value = _a2[1];
      var paletteStep = Number(step);
      if (!isValidPaletteStep(paletteStep))
        return;
      var existing = palette[paletteStep];
      palette[paletteStep] = typeof existing === "object" ? __assign(__assign({}, existing), (_b = {}, _b[mode] = value, _b)) : (_c = {}, _c[mode] = value, _c);
    });
  });
  return palette;
}
function mergeExplicitSteps(generated, input) {
  var result = __assign({}, generated);
  Object.entries(input).forEach(function(_a) {
    var step = _a[0], value = _a[1];
    if (step === "seed") {
      result.seed = value;
      return;
    }
    var paletteStep = Number(step);
    if (!value || !isValidPaletteStep(paletteStep))
      return;
    var generatedValue = generated[paletteStep];
    result[paletteStep] = typeof generatedValue === "object" && typeof value === "object" ? __assign(__assign({}, generatedValue), value) : value;
  });
  return result;
}
function processColorPaletteInput(category, input) {
  if (typeof input === "string") {
    return generatePaletteFromSeed(category, input);
  }
  var generated = processSeedInput(category, input.seed);
  return mergeExplicitSteps(generated, input);
}

// node_modules/@cloudscape-design/theming-runtime/shared/theme/builder.js
var ThemeBuilder = (
  /** @class */
  function() {
    function ThemeBuilder2(id, selector, modes) {
      this.theme = {
        id,
        selector,
        modes: modes.reduce(function(acc, curr) {
          acc[curr.id] = curr;
          return acc;
        }, {}),
        tokens: {},
        contexts: {},
        tokenModeMap: {}
      };
    }
    ThemeBuilder2.prototype.addTokensToModeMap = function(tokens, mode) {
      var modeMap = Object.keys(tokens).reduce(function(acc, token) {
        acc[token] = mode.id;
        return acc;
      }, {});
      this.theme.tokenModeMap = __assign(__assign({}, this.theme.tokenModeMap), modeMap);
    };
    ThemeBuilder2.prototype.addTokens = function(tokens, mode) {
      this.theme.tokens = __assign(__assign({}, this.theme.tokens), tokens);
      if (mode) {
        this.addTokensToModeMap(tokens, mode);
      }
      return this;
    };
    ThemeBuilder2.prototype.addContext = function(context) {
      this.theme.contexts[context.id] = context;
      return this;
    };
    ThemeBuilder2.prototype.addReferenceTokens = function(referenceTokens, mode) {
      this.theme.referenceTokens = referenceTokens;
      if (referenceTokens.color) {
        var generatedTokens = processReferenceTokens(referenceTokens.color);
        this.theme.tokens = __assign(__assign({}, generatedTokens), this.theme.tokens);
        if (mode) {
          this.addTokensToModeMap(generatedTokens, mode);
        }
      }
      return this;
    };
    ThemeBuilder2.prototype.build = function() {
      return this.theme;
    };
    return ThemeBuilder2;
  }()
);

// node_modules/@cloudscape-design/theming-runtime/shared/utils.js
function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function entries(obj) {
  return Object.keys(obj).map(function(key) {
    return [key, obj[key]];
  });
}
function fromEntries(entries2) {
  return entries2.reduce(function(acc, _a) {
    var key = _a[0], value = _a[1];
    acc[key] = value;
    return acc;
  }, {});
}
function values(some) {
  return Object.keys(some).map(function(key) {
    return some[key];
  });
}
function includes(subject, search) {
  return subject.indexOf(search) > -1;
}

// node_modules/@cloudscape-design/theming-runtime/shared/theme/resolve.js
function resolveTheme(theme, baseTheme, propertiesMap) {
  return resolveThemeWithPaths(theme, baseTheme, propertiesMap).resolvedTheme;
}
function resolveThemeWithPaths(theme, baseTheme, propertiesMap) {
  var _a;
  var resolvedTheme = {};
  var resolutionPaths = {};
  Object.keys((_a = baseTheme === null || baseTheme === void 0 ? void 0 : baseTheme.tokens) !== null && _a !== void 0 ? _a : theme.tokens).forEach(function(token) {
    var mode = getMode(baseTheme !== null && baseTheme !== void 0 ? baseTheme : theme, token);
    if (mode) {
      var modeTokenResolutionPaths_1 = {};
      var resolvedToken = Object.keys(mode.states).reduce(function(acc, state) {
        modeTokenResolutionPaths_1[state] = [];
        acc[state] = resolveToken(theme, token, modeTokenResolutionPaths_1[state], state, baseTheme, propertiesMap);
        return acc;
      }, {});
      var tokenResolutionPathContainsOverriddenTokens = values(modeTokenResolutionPaths_1).some(function(tokenResolutionPath2) {
        return tokenResolutionPath2.some(function(pathToken) {
          return pathToken in theme.tokens;
        });
      });
      if (!baseTheme || tokenResolutionPathContainsOverriddenTokens) {
        resolutionPaths[token] = modeTokenResolutionPaths_1;
        resolvedTheme[token] = resolvedToken;
      }
    } else {
      var tokenResolutionPath = [];
      var resolvedToken = resolveToken(theme, token, tokenResolutionPath, void 0, baseTheme, propertiesMap);
      if (!baseTheme || tokenResolutionPath.some(function(pathToken) {
        return pathToken in theme.tokens;
      })) {
        resolutionPaths[token] = tokenResolutionPath;
        resolvedTheme[token] = resolvedToken;
      }
    }
  });
  return { resolvedTheme, resolutionPaths };
}
function resolveToken(theme, token, path, state, baseTheme, propertiesMap) {
  if (!theme.tokens[token] && !(baseTheme === null || baseTheme === void 0 ? void 0 : baseTheme.tokens[token])) {
    throw new Error("Token ".concat(token, " does not exist in the theme."));
  }
  if (path.includes(token)) {
    throw new Error("Token ".concat(token, " has a circular dependency."));
  }
  path.push(token);
  var assignment = getAssignment(theme, token, state, baseTheme);
  if (isReference(assignment)) {
    var ref = getReference(assignment);
    if ((propertiesMap === null || propertiesMap === void 0 ? void 0 : propertiesMap[ref]) && (theme.tokens[ref] || (baseTheme === null || baseTheme === void 0 ? void 0 : baseTheme.tokens[ref]))) {
      return "var(".concat(propertiesMap[ref], ")");
    }
    return resolveToken(theme, ref, path, state, baseTheme, propertiesMap);
  }
  return assignment;
}
function getAssignment(theme, token, state, baseTheme) {
  var assignment = theme.tokens[token] || (baseTheme === null || baseTheme === void 0 ? void 0 : baseTheme.tokens[token]);
  if (!assignment) {
    throw new Error("Empty assignment for token ".concat(token));
  }
  if (isModeValue(assignment)) {
    if (!state) {
      throw new Error("Mode resolution for token ".concat(token, " does not have any mode value. modes: ").concat(JSON.stringify(assignment)));
    }
    assignment = assignment[state];
  }
  return assignment;
}
function resolveContext(theme, context, baseTheme, themeResolution, propertiesMap) {
  var tmp = cloneDeep(theme);
  if (context.defaultMode && theme.modes) {
    resolveModeReferenceTokens(tmp, context, baseTheme);
  }
  if (!baseTheme || !themeResolution) {
    tmp.tokens = __assign(__assign({}, tmp.tokens), context.tokens);
    return resolveTheme(tmp, baseTheme, propertiesMap);
  }
  tmp.tokens = applyContextPrecedenceRules(theme, context, baseTheme, themeResolution, propertiesMap);
  return resolveTheme(tmp, baseTheme, propertiesMap);
}
function resolveModeReferenceTokens(theme, context, baseTheme) {
  if (!context.defaultMode || !theme.modes)
    return;
  var defaultMode = context.defaultMode;
  var mode = Object.values(theme.modes).find(function(m) {
    return m.states[defaultMode];
  });
  if (!mode)
    return;
  Object.keys(theme.tokens).forEach(function(token) {
    if (isReferenceToken("color", theme, token)) {
      var tokenValue = theme.tokens[token];
      if (isModeValue(tokenValue)) {
        theme.tokens[token] = tokenValue[defaultMode];
      }
    }
  });
  var mergedTheme = __assign(__assign({}, theme), { tokens: __assign(__assign({}, theme.tokens), context.tokens) });
  var resolutionPaths = resolveThemeWithPaths(mergedTheme, baseTheme).resolutionPaths;
  collectReferenceTokens(theme, resolutionPaths).forEach(function(token) {
    context.tokens[token] = theme.tokens[token];
  });
  var contextTokens = new Set(Object.keys(context.tokens));
  Object.keys(theme.tokens).forEach(function(token) {
    if (!contextTokens.has(token) && resolutionPaths[token]) {
      var pathTokens = flattenResolutionPaths(resolutionPaths[token]);
      if (pathTokens.some(function(pathToken) {
        return contextTokens.has(pathToken);
      })) {
        context.tokens[token] = theme.tokens[token];
      }
    }
  });
}
function applyContextPrecedenceRules(theme, context, baseTheme, themeResolution, propertiesMap) {
  var baseContext = baseTheme.contexts[context.id];
  var baseResolution = resolveTheme(baseTheme, void 0, propertiesMap);
  var overrideResolution = resolveTheme(theme, baseTheme, propertiesMap);
  var rebaselined = Object.keys(themeResolution).reduce(function(acc, key) {
    var _a, _b;
    var shouldSkipReset = !(key in baseContext.tokens) && !(key in theme.tokens) || areAssignmentsEqual(baseResolution[key], overrideResolution[key]);
    if (!shouldSkipReset) {
      acc[key] = (_b = (_a = baseContext.tokens[key]) !== null && _a !== void 0 ? _a : theme.tokens[key]) !== null && _b !== void 0 ? _b : baseTheme.tokens[key];
    }
    return acc;
  }, {});
  return __assign(__assign({}, rebaselined), context.tokens);
}
function reduce(resolution, theme, reducer, baseTheme) {
  return Object.keys(resolution).reduce(function(acc, token) {
    var reduced = reducer(resolution[token], token, theme, baseTheme);
    if (reduced) {
      acc[token] = reduced;
    }
    return acc;
  }, {});
}
var defaultsReducer = function() {
  return function(tokenResolution, token, theme, baseTheme) {
    var mode = getMode(baseTheme !== null && baseTheme !== void 0 ? baseTheme : theme, token);
    if (mode && isModeTokenResolution(tokenResolution)) {
      var defaultState = getDefaultState(mode);
      return tokenResolution[defaultState];
    } else if (isSpecificTokenResolution(tokenResolution)) {
      return tokenResolution;
    } else {
      throw new Error("Mismatch between resolution ".concat(JSON.stringify(tokenResolution), " and mode ").concat(mode));
    }
  };
};
var modeReducer = function(mode, state) {
  return function(tokenResolution, token, theme, baseTheme) {
    var tokenMode = getMode(baseTheme !== null && baseTheme !== void 0 ? baseTheme : theme, token);
    if (tokenMode && tokenMode.id === mode.id && isModeTokenResolution(tokenResolution)) {
      return tokenResolution[state];
    } else if (isSpecificTokenResolution(tokenResolution)) {
      return tokenResolution;
    }
  };
};
function isModeTokenResolution(val) {
  return typeof val === "object";
}
function isSpecificTokenResolution(val) {
  return typeof val === "string";
}
function flattenResolutionPaths(pathOrPaths) {
  var _a;
  return typeof pathOrPaths === "object" && !Array.isArray(pathOrPaths) ? (_a = []).concat.apply(_a, Object.values(pathOrPaths)) : pathOrPaths;
}
function collectReferenceTokens(theme, resolutionPaths) {
  var referenceTokens = /* @__PURE__ */ new Set();
  Object.values(resolutionPaths).forEach(function(pathOrPaths) {
    var allPaths = flattenResolutionPaths(pathOrPaths);
    allPaths.forEach(function(token) {
      if (isReferenceToken("color", theme, token)) {
        referenceTokens.add(token);
      }
    });
  });
  return referenceTokens;
}

// node_modules/@cloudscape-design/theming-runtime/shared/theme/validate.js
function validateOverride(override, themeable, availableContexts) {
  var _a;
  if (typeof override.tokens !== "object" || Array.isArray(override.tokens) || override.tokens === null) {
    throw new Error('Missing required "tokens" object field in '.concat(JSON.stringify(override)));
  }
  var unthemeableTokenWarningCache = {};
  function isThemeable(token) {
    var isThemeable2 = includes(themeable, token);
    if (!isThemeable2 && !(token in unthemeableTokenWarningCache)) {
      console.warn("".concat(token, " is not themeable and will be ignored during theming"));
      unthemeableTokenWarningCache[token] = true;
    }
    return isThemeable2;
  }
  function isValidContextId(contextId) {
    var isValid = includes(availableContexts, contextId);
    if (!isValid) {
      console.warn("".concat(contextId, " is not a valid ID of a visual context and will be ignored during theming."));
    }
    return isValid;
  }
  var tokensEntries = entries(override.tokens).filter(function(_a2) {
    var token = _a2[0];
    return isThemeable(token);
  });
  var contextEntries = (override.contexts ? entries(override.contexts).filter(function(_a2) {
    var context = _a2[1];
    return context !== void 0;
  }) : []).filter(function(_a2) {
    var contextId = _a2[0];
    return isValidContextId(contextId);
  }).map(function(_a2) {
    var contextId = _a2[0], context = _a2[1];
    var filteredTokens = entries(context.tokens).filter(function(_a3) {
      var token = _a3[0];
      return isThemeable(token);
    });
    var from = fromEntries(filteredTokens);
    var newContext = __assign(__assign({}, context), { tokens: from });
    return [contextId, newContext];
  });
  var completeTokens = {};
  if ((_a = override.referenceTokens) === null || _a === void 0 ? void 0 : _a.color) {
    var generatedTokens = processReferenceTokens(override.referenceTokens.color);
    completeTokens = __assign(__assign({}, fromEntries(tokensEntries)), generatedTokens);
  } else {
    completeTokens = fromEntries(tokensEntries);
  }
  return {
    contexts: fromEntries(contextEntries),
    tokens: completeTokens,
    referenceTokens: override.referenceTokens
  };
}
function getContexts(preset2) {
  var _a;
  var themes = __spreadArray([preset2.theme], (_a = preset2.secondary) !== null && _a !== void 0 ? _a : [], true);
  var contexts = [];
  for (var _i = 0, themes_1 = themes; _i < themes_1.length; _i++) {
    var theme = themes_1[_i];
    Object.keys(theme.contexts).forEach(function(contextName) {
      if (contexts.indexOf(contextName) === -1) {
        contexts.push(contextName);
      }
    });
  }
  return contexts;
}
function getThemeFromPreset(preset2, baseThemeId) {
  var _a;
  if (!baseThemeId) {
    return preset2.theme;
  }
  var themesMap = __spreadArray([preset2.theme], (_a = preset2.secondary) !== null && _a !== void 0 ? _a : [], true).reduce(function(accThemesMap, currentTheme) {
    accThemesMap[currentTheme.id] = currentTheme;
    return accThemesMap;
  }, {});
  if (!themesMap[baseThemeId]) {
    throw new Error("Specified baseThemeId '".concat(baseThemeId, "' is not available. Available values are ").concat(Object.keys(themesMap).map(function(value) {
      return "'".concat(value, "'");
    }).join(", "), "."));
  }
  return themesMap[baseThemeId];
}

// node_modules/@cloudscape-design/theming-runtime/shared/theme/merge.js
function mergeInPlace(theme, override) {
  function withTokenApplied(originalValue, token, update) {
    var isGlobal = isValue(update) || isReference(update);
    var mode = getMode(theme, token);
    if (mode && isGlobal) {
      return Object.keys(mode.states).reduce(function(acc, state) {
        acc[state] = update;
        return acc;
      }, {});
    } else if ((isModeValue(originalValue) || originalValue === void 0) && isModeValue(update)) {
      return __assign(__assign({}, originalValue), update);
    } else if (isGlobal) {
      return update;
    } else {
      console.warn("The value for this token cannot be merged into the theme:", token);
    }
  }
  entries(override.tokens).forEach(function(_a) {
    var token = _a[0], update = _a[1];
    var newValue = withTokenApplied(theme.tokens[token], token, update);
    if (newValue) {
      theme.tokens[token] = newValue;
    }
  });
  if (override.contexts) {
    entries(override.contexts).forEach(function(_a) {
      var contextId = _a[0], context = _a[1];
      var themeContext = theme.contexts[contextId];
      if (!context || !themeContext) {
        return;
      }
      entries(context.tokens).forEach(function(_a2) {
        var _b;
        var token = _a2[0], update = _a2[1];
        var originalValue = (_b = themeContext.tokens[token]) !== null && _b !== void 0 ? _b : theme.tokens[token];
        var newValue = withTokenApplied(originalValue, token, update);
        if (newValue) {
          theme.contexts[contextId].tokens[token] = newValue;
        }
      });
    });
  }
  return theme;
}

// node_modules/@cloudscape-design/theming-runtime/shared/declaration/stylesheet.js
var Stylesheet = (
  /** @class */
  function() {
    function Stylesheet2() {
      this.rulesMap = /* @__PURE__ */ new Map();
      this.paths = /* @__PURE__ */ new Map();
      this.counter = 0;
    }
    Stylesheet2.prototype.appendRule = function(rule) {
      this.rulesMap.set(rule.selector, [rule, this.counter++]);
    };
    Stylesheet2.prototype.appendRuleWithPath = function(rule, path) {
      if (this.rulesMap.has(rule.selector)) {
        return;
      }
      this.rulesMap.set(rule.selector, [rule, this.counter++]);
      this.paths.set(rule, path);
    };
    Stylesheet2.prototype.removeRule = function(rule) {
      this.rulesMap["delete"](rule.selector);
      this.paths["delete"](rule);
    };
    Stylesheet2.prototype.findRule = function(selector) {
      var ruleOrUndefined = this.rulesMap.get(selector);
      return ruleOrUndefined === null || ruleOrUndefined === void 0 ? void 0 : ruleOrUndefined[0];
    };
    Stylesheet2.prototype.getPath = function(rule) {
      var path = this.paths.get(rule);
      if (!path) {
        throw new Error("No path for rule with selector: ".concat(rule.selector));
      }
      return path;
    };
    Stylesheet2.prototype.getAllRules = function() {
      var rules = [];
      this.paths.forEach(function(_, key) {
        return rules.push(key);
      });
      return rules;
    };
    Stylesheet2.prototype.toString = function(layer) {
      var result = asValuesArray(this.rulesMap).map(function(rule) {
        return rule.toString();
      });
      return layer ? "@layer ".concat(layer, " {\n").concat(result.join("\n"), "\n}") : result.join("\n");
    };
    return Stylesheet2;
  }()
);
var stylesheet_default = Stylesheet;
var Rule = (
  /** @class */
  function() {
    function Rule2(selector, media) {
      this.declarationsMap = /* @__PURE__ */ new Map();
      this.counter = 0;
      this.selector = selector;
      this.media = media;
    }
    Rule2.prototype.appendDeclaration = function(declaration) {
      this.declarationsMap.set(declaration.property, [declaration, this.counter++]);
    };
    Rule2.prototype.clear = function() {
      this.declarationsMap = /* @__PURE__ */ new Map();
      this.counter = 0;
    };
    Rule2.prototype.getAllDeclarations = function() {
      return asValuesArray(this.declarationsMap);
    };
    Rule2.prototype.printAllDeclarations = function() {
      return this.getAllDeclarations().map(function(decl) {
        return decl.toString();
      }).join("\n	");
    };
    Rule2.prototype.size = function() {
      return this.declarationsMap.size;
    };
    Rule2.prototype.toString = function() {
      var rule = "".concat(this.selector, "{\n	").concat(this.printAllDeclarations(), "\n}");
      if (this.media) {
        return "@media ".concat(this.media, " {").concat(rule, "}");
      }
      return rule;
    };
    Rule2.prototype.isModeRule = function() {
      return !!this.media;
    };
    return Rule2;
  }()
);
var Declaration = (
  /** @class */
  function() {
    function Declaration2(property, value) {
      this.property = property;
      this.value = value;
    }
    Declaration2.prototype.toString = function() {
      return "".concat(this.property, ":").concat(this.value, ";");
    };
    return Declaration2;
  }()
);
function asValuesArray(map) {
  var tmp = [];
  map.forEach(function(_a) {
    var item = _a[0], position = _a[1];
    return tmp.push([item, position]);
  });
  tmp.sort(function(_a, _b) {
    var itemA = _a[0], posA = _a[1];
    var itemB = _b[0], posB = _b[1];
    return posA - posB;
  });
  return tmp.map(function(_a) {
    var item = _a[0];
    return item;
  });
}

// node_modules/@cloudscape-design/theming-runtime/shared/declaration/rule.js
var RuleCreator = (
  /** @class */
  function() {
    function RuleCreator2(selector, registry) {
      this.selector = selector;
      this.registry = registry;
    }
    RuleCreator2.prototype.create = function(config, resolution) {
      var _this = this;
      var rule = new Rule(this.selectorFor(config), config.media);
      entries(resolution).forEach(function(_a) {
        var token = _a[0], value = _a[1];
        var property = _this.registry.get(token);
        if (property) {
          rule.appendDeclaration(new Declaration(property, value));
        }
      });
      return rule;
    };
    RuleCreator2.prototype.selectorFor = function(config) {
      return this.selector["for"](config);
    };
    return RuleCreator2;
  }()
);

// node_modules/@cloudscape-design/theming-runtime/shared/declaration/abstract.js
var AbstractCreator = (
  /** @class */
  function() {
    function AbstractCreator2() {
    }
    AbstractCreator2.forEachOptionalModeState = function(theme, func) {
      Object.keys(theme.modes).forEach(function(key) {
        var mode = theme.modes[key];
        entries(mode.states).forEach(function(_a) {
          var stateKey = _a[0], state = _a[1];
          if (isOptionalState(state)) {
            func(mode, stateKey);
          }
        });
      });
    };
    AbstractCreator2.forEachContext = function(theme, func) {
      Object.keys(theme.contexts).forEach(function(key) {
        var context = theme.contexts[key];
        func(context);
      });
    };
    AbstractCreator2.forEachContextWithinOptionalModeState = function(theme, func) {
      AbstractCreator2.forEachOptionalModeState(theme, function(mode, stateKey) {
        AbstractCreator2.forEachContext(theme, function(context) {
          func(context, mode, stateKey);
        });
      });
    };
    AbstractCreator2.appendRuleToStylesheet = function(stylesheet, rule, path) {
      if (rule.size()) {
        stylesheet.appendRuleWithPath(rule, path);
      }
    };
    return AbstractCreator2;
  }()
);

// node_modules/@cloudscape-design/theming-runtime/shared/declaration/utils.js
function compact(arr) {
  var result = [];
  for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var item = arr_1[_i];
    if (item !== void 0) {
      result.push(item);
    }
  }
  return result;
}
function getReferencedVar(value) {
  var match = value.match(/var\((--[^)]+)\)/);
  return match ? match[1] : null;
}

// node_modules/@cloudscape-design/theming-runtime/shared/declaration/single.js
var SingleThemeCreator = (
  /** @class */
  function(_super) {
    __extends(SingleThemeCreator2, _super);
    function SingleThemeCreator2(theme, ruleCreator, baseTheme, propertiesMap) {
      var _this = _super.call(this) || this;
      _this.theme = theme;
      _this.baseTheme = baseTheme;
      _this.propertiesMap = propertiesMap;
      _this.resolution = resolveTheme(theme, _this.baseTheme, propertiesMap);
      _this.ruleCreator = ruleCreator;
      return _this;
    }
    SingleThemeCreator2.prototype.create = function() {
      var _this = this;
      var stylesheet = new stylesheet_default();
      var defaults = reduce(this.resolution, this.theme, defaultsReducer(), this.baseTheme);
      var rootRule = this.ruleCreator.create({ global: [this.theme.selector] }, defaults);
      SingleThemeCreator2.appendRuleToStylesheet(stylesheet, rootRule, []);
      SingleThemeCreator2.forEachOptionalModeState(this.theme, function(mode, state) {
        var modeResolution = reduce(_this.resolution, _this.theme, modeReducer(mode, state), _this.baseTheme);
        var stateDetails = mode.states[state];
        var modeRule = _this.ruleCreator.create({ global: [_this.theme.selector, stateDetails.selector], media: stateDetails.media }, modeResolution);
        SingleThemeCreator2.appendRuleToStylesheet(stylesheet, modeRule, [rootRule]);
      });
      SingleThemeCreator2.forEachContext(this.theme, function(context) {
        var contextResolution = reduce(resolveContext(_this.theme, context, _this.baseTheme, _this.resolution, _this.propertiesMap), _this.theme, defaultsReducer(), _this.baseTheme);
        var contextRule = _this.ruleCreator.create({ global: [_this.theme.selector], local: [context.selector] }, contextResolution);
        SingleThemeCreator2.appendRuleToStylesheet(stylesheet, contextRule, [rootRule]);
        var contextRule2 = _this.ruleCreator.create({ global: [_this.theme.selector, context.selector] }, contextResolution);
        SingleThemeCreator2.appendRuleToStylesheet(stylesheet, contextRule2, [rootRule]);
      });
      SingleThemeCreator2.forEachContextWithinOptionalModeState(this.theme, function(context, mode, state) {
        var contextResolution = reduce(resolveContext(_this.theme, context, _this.baseTheme, _this.resolution, _this.propertiesMap), _this.theme, modeReducer(mode, state), _this.baseTheme);
        var stateDetails = mode.states[state];
        var contextAndModeRule = _this.ruleCreator.create({ global: [_this.theme.selector, stateDetails.selector], local: [context.selector], media: stateDetails.media }, contextResolution);
        var contextRule = stylesheet.findRule(_this.ruleCreator.selectorFor({ global: [_this.theme.selector], local: [context.selector] }));
        var contextRuleGlobal = stylesheet.findRule(_this.ruleCreator.selectorFor({ global: [_this.theme.selector, context.selector] }));
        var modeRule = stylesheet.findRule(_this.ruleCreator.selectorFor({
          global: [_this.theme.selector, mode.states[state].selector]
        }));
        SingleThemeCreator2.appendRuleToStylesheet(stylesheet, contextAndModeRule, compact([contextRule, modeRule, rootRule]));
        var contextRuleAndModeRuleGlobal = _this.ruleCreator.create({ global: [_this.theme.selector, stateDetails.selector, context.selector], media: stateDetails.media }, contextResolution);
        SingleThemeCreator2.appendRuleToStylesheet(stylesheet, contextRuleAndModeRuleGlobal, compact([contextRuleGlobal, modeRule, rootRule]));
      });
      return stylesheet;
    };
    return SingleThemeCreator2;
  }(AbstractCreator)
);

// node_modules/@cloudscape-design/theming-runtime/shared/styles/selector.js
var specificitySuffix = ":not(#\\9)";
function increaseSpecificity(selector) {
  var _a = selector.split(":"), main = _a[0], pseudo = _a.slice(1);
  var pseudoSuffix = pseudo.length ? ":" + pseudo.join(":") : "";
  return "".concat(main).concat(specificitySuffix).concat(pseudoSuffix);
}
var globalSelectors = [":root", "body", "html"];
var isGlobalSelector = function(selector) {
  return globalSelectors.indexOf(selector) > -1;
};
function getFirstSelector(selector) {
  return selector.split(/[\s.:[\]]/)[0];
}
function increaseSpecificityGradually(selectors) {
  var split = selectors.split(",").map(repeatClassNameOrAddID);
  return split.join(",");
}
function repeatClassNameOrAddID(selector) {
  var result = /[:.][\w_-]+/.exec(selector);
  if ((result === null || result === void 0 ? void 0 : result.length) === 1) {
    var match = result[0];
    var index = result.index;
    return "".concat(selector.substring(0, index)).concat(match).concat(selector.substring(index));
  }
  return increaseSpecificity(selector);
}

// node_modules/@cloudscape-design/theming-runtime/shared/declaration/multi.js
var MultiThemeCreator = (
  /** @class */
  function(_super) {
    __extends(MultiThemeCreator2, _super);
    function MultiThemeCreator2(themes, ruleCreator, propertiesMap) {
      var _this = _super.call(this) || this;
      _this.themes = themes;
      _this.ruleCreator = ruleCreator;
      _this.propertiesMap = propertiesMap;
      return _this;
    }
    MultiThemeCreator2.prototype.create = function() {
      var _this = this;
      var globalThemes = this.themes.filter(function(theme) {
        return isGlobalSelector(theme.selector);
      });
      if (globalThemes.length > 1) {
        throw new Error("Themes ".concat(globalThemes.map(function(_a) {
          var id = _a.id;
          return id;
        }).join(", "), " have a global selector. It is not supported to have more than one global theme. It produces unpredictable styling results."));
      }
      if (!globalThemes.length) {
        var stylesheets = this.themes.map(function(theme) {
          return new SingleThemeCreator(theme, _this.ruleCreator, void 0, _this.propertiesMap).create();
        });
        var result_1 = new stylesheet_default();
        stylesheets.forEach(function(stylesheet2) {
          stylesheet2.getAllRules().map(function(rule) {
            var _a;
            return result_1.appendRuleWithPath(rule, (_a = stylesheet2.getPath(rule)) !== null && _a !== void 0 ? _a : []);
          });
        });
        return result_1;
      }
      var globalTheme = globalThemes[0];
      var stylesheet = new SingleThemeCreator(globalTheme, this.ruleCreator, void 0, this.propertiesMap).create();
      var secondaries = this.getThemesWithout(globalTheme);
      secondaries.forEach(function(secondary) {
        _this.appendRulesForSecondary(stylesheet, globalTheme, secondary);
      });
      return stylesheet;
    };
    MultiThemeCreator2.prototype.appendRulesForSecondary = function(stylesheet, primary, secondary) {
      var _this = this;
      var secondaryResolution = resolveTheme(secondary, void 0, this.propertiesMap);
      var defaults = reduce(secondaryResolution, secondary, defaultsReducer());
      var rootRule = this.ruleCreator.create({ global: [secondary.selector] }, defaults);
      var parentRule = this.findRule(stylesheet, { global: [primary.selector] });
      MultiThemeCreator2.appendRuleToStylesheet(stylesheet, rootRule, compact([parentRule]));
      MultiThemeCreator2.forEachOptionalModeState(secondary, function(mode, state) {
        var optionalState = mode.states[state];
        var modeResolution = reduce(secondaryResolution, secondary, modeReducer(mode, state));
        var modeRule = _this.ruleCreator.create({ global: [secondary.selector, optionalState.selector], media: optionalState.media }, modeResolution);
        var parentModeRule = stylesheet.findRule(_this.ruleCreator.selectorFor({
          global: [primary.selector, optionalState.selector]
        }));
        MultiThemeCreator2.appendRuleToStylesheet(stylesheet, modeRule, compact([rootRule, parentModeRule, parentRule]));
      });
      MultiThemeCreator2.forEachContext(secondary, function(context) {
        var contextResolution = reduce(resolveContext(secondary, context, void 0, void 0, _this.propertiesMap), secondary, defaultsReducer());
        var contextRule = _this.ruleCreator.create({ global: [secondary.selector], local: [context.selector] }, contextResolution);
        var parentContextRule = stylesheet.findRule(_this.ruleCreator.selectorFor({
          global: [primary.selector],
          local: [context.selector]
        }));
        MultiThemeCreator2.appendRuleToStylesheet(stylesheet, contextRule, compact([parentContextRule, rootRule, parentRule]));
        var contextRuleGlobal = _this.ruleCreator.create({ global: [secondary.selector, context.selector] }, contextResolution);
        MultiThemeCreator2.appendRuleToStylesheet(stylesheet, contextRuleGlobal, compact([rootRule, parentContextRule, parentRule]));
      });
      MultiThemeCreator2.forEachContextWithinOptionalModeState(secondary, function(context, mode, state) {
        var optionalState = mode.states[state];
        var contextResolution = reduce(resolveContext(secondary, context, void 0, void 0, _this.propertiesMap), secondary, modeReducer(mode, state));
        var contextRule = _this.findRule(stylesheet, { global: [secondary.selector], local: [context.selector] });
        var contextRuleGlobal = _this.findRule(stylesheet, { global: [secondary.selector, context.selector] });
        var modeRule = _this.findRule(stylesheet, {
          global: [secondary.selector, optionalState.selector]
        });
        var contextAndModeRule = _this.ruleCreator.create({
          global: [secondary.selector, optionalState.selector],
          local: [context.selector],
          media: optionalState.media
        }, contextResolution);
        var parentContextRule = stylesheet.findRule(_this.ruleCreator.selectorFor({ global: [primary.selector], local: [context.selector] }));
        var parentModeRule = stylesheet.findRule(_this.ruleCreator.selectorFor({
          global: [primary.selector, optionalState.selector]
        }));
        var parentContextAndModeRule = stylesheet.findRule(_this.ruleCreator.selectorFor({
          global: [primary.selector, optionalState.selector],
          local: [context.selector]
        }));
        MultiThemeCreator2.appendRuleToStylesheet(stylesheet, contextAndModeRule, compact([
          contextRule,
          parentContextAndModeRule,
          parentContextRule,
          modeRule,
          rootRule,
          parentModeRule,
          parentRule
        ]));
        var contextAndModeRuleGlobal = _this.ruleCreator.create({
          global: [secondary.selector, optionalState.selector, context.selector],
          media: optionalState.media
        }, contextResolution);
        MultiThemeCreator2.appendRuleToStylesheet(stylesheet, contextAndModeRuleGlobal, compact([
          contextRuleGlobal,
          parentContextAndModeRule,
          parentContextRule,
          modeRule,
          rootRule,
          parentModeRule,
          parentRule
        ]));
      });
      return stylesheet;
    };
    MultiThemeCreator2.prototype.findRule = function(stylesheet, config) {
      var rule = stylesheet.findRule(this.ruleCreator.selectorFor(config));
      if (!rule) {
        throw new Error("No rule for selector ".concat(JSON.stringify(config), " found"));
      }
      return rule;
    };
    MultiThemeCreator2.prototype.getThemesWithout = function(theme) {
      var idx = this.themes.indexOf(theme);
      return __spreadArray(__spreadArray([], this.themes.slice(0, idx), true), this.themes.slice(idx + 1), true);
    };
    return MultiThemeCreator2;
  }(AbstractCreator)
);

// node_modules/@cloudscape-design/theming-runtime/shared/declaration/selector.js
var Selector = (
  /** @class */
  function() {
    function Selector2(customizer) {
      this.customizer = customizer;
    }
    Selector2.prototype["for"] = function(_a) {
      var global = _a.global, local = _a.local;
      if (global.length === 1 && !(local === null || local === void 0 ? void 0 : local.length) && isGlobalSelector(global[0])) {
        return this.customizer(global[0]);
      }
      var nonGlobalSelectors = global.filter(function(f) {
        return !isGlobalSelector(f);
      });
      var selector = this.toSelector(nonGlobalSelectors);
      if (local === null || local === void 0 ? void 0 : local.length) {
        selector += " ".concat(this.toSelector(local));
      }
      return this.customizer(selector.trim());
    };
    Selector2.prototype.toSelector = function(individuals) {
      var isElement = function(selector) {
        return [".", ":", "#"].indexOf(selector.charAt(0)) === -1;
      };
      return individuals.slice().sort(function(a, b) {
        if (isElement(a) && !isElement(b))
          return -1;
        if (!isElement(a) && isElement(b))
          return 1;
        return a.localeCompare(b);
      }).join("");
    };
    return Selector2;
  }()
);

// node_modules/@cloudscape-design/theming-runtime/shared/declaration/registry.js
var AllPropertyRegistry = (
  /** @class */
  function() {
    function AllPropertyRegistry2(propertiesMap) {
      this.map = propertiesMap;
    }
    AllPropertyRegistry2.prototype.get = function(token) {
      var property = this.map[token];
      if (!property) {
        throw new Error("Token ".concat(token, " does not have a property"));
      }
      return property;
    };
    return AllPropertyRegistry2;
  }()
);
var UsedPropertyRegistry = (
  /** @class */
  function() {
    function UsedPropertyRegistry2(propertiesMap, used) {
      this.map = propertiesMap;
      this.used = used;
    }
    UsedPropertyRegistry2.prototype.get = function(token) {
      if (this.used.indexOf(token) > -1) {
        return this.map[token];
      }
      return void 0;
    };
    return UsedPropertyRegistry2;
  }()
);

// node_modules/@cloudscape-design/theming-runtime/shared/declaration/transformer.js
var MinimalTransformer = (
  /** @class */
  function() {
    function MinimalTransformer2() {
    }
    MinimalTransformer2.prototype.transform = function(stylesheet) {
      var rules = stylesheet.getAllRules();
      var rulesWithPath = rules.map(function(rule) {
        return {
          rule,
          path: stylesheet.getPath(rule)
        };
      });
      var sorted = rulesWithPath.sort(function(_a, _b) {
        var pathA = _a.path;
        var pathB = _b.path;
        return pathA.length - pathB.length;
      });
      sorted.forEach(function(_a) {
        var rule = _a.rule, path = _a.path;
        if (path.length === 0) {
          return;
        }
        var resolvedParent = {};
        for (var i = path.length - 1; i >= 0; i--) {
          var parent_1 = path[i];
          var declarations = parent_1.getAllDeclarations();
          declarations.forEach(function(decl) {
            resolvedParent[decl.property] = decl.value;
          });
        }
        var ruleValue = rule.getAllDeclarations().reduce(function(acc, decl) {
          acc[decl.property] = decl.value;
          return acc;
        }, {});
        var diff = difference2(resolvedParent, ruleValue);
        var firstSelector = getFirstSelector(rule.selector);
        var isModeRule = rule.isModeRule();
        if (isGlobalSelector(firstSelector)) {
          rule.clear();
          entries(diff).forEach(function(_a2) {
            var property = _a2[0], value = _a2[1];
            return rule.appendDeclaration(new Declaration(property, value));
          });
          if (rule.size() === 0) {
            stylesheet.removeRule(rule);
          }
          return;
        }
        var isOverridden = function(varName, visited) {
          if (visited === void 0) {
            visited = /* @__PURE__ */ new Set();
          }
          if (visited.has(varName))
            return false;
          visited.add(varName);
          var isDirectlyOverridden = varName in ruleValue && varName in resolvedParent && ruleValue[varName] !== resolvedParent[varName];
          if (isDirectlyOverridden)
            return true;
          var referencedVar = varName in ruleValue ? getReferencedVar(ruleValue[varName]) : null;
          return referencedVar ? isOverridden(referencedVar, visited) : false;
        };
        Object.keys(ruleValue).forEach(function(property) {
          var referencedVar = getReferencedVar(ruleValue[property]);
          if (!referencedVar || !isOverridden(referencedVar))
            return;
          var canInherit = isModeRule && ruleValue[property] === resolvedParent[property];
          if (canInherit)
            return;
          if (!(property in diff)) {
            diff[property] = ruleValue[property];
          }
        });
        rule.clear();
        entries(diff).forEach(function(_a2) {
          var property = _a2[0], value = _a2[1];
          return rule.appendDeclaration(new Declaration(property, value));
        });
        if (rule.size() === 0) {
          stylesheet.removeRule(rule);
        }
      });
      return mergeSelectors(stylesheet);
    };
    return MinimalTransformer2;
  }()
);
function mergeSelectors(stylesheet) {
  var rules = stylesheet.getAllRules();
  var i = 1;
  while (i < rules.length) {
    var prev = rules[i - 1];
    var curr = rules[i];
    if (prev.media === curr.media && prev.printAllDeclarations() === curr.printAllDeclarations()) {
      prev.selector = "".concat(prev.selector, ",").concat(curr.selector);
      stylesheet.removeRule(curr);
      rules.splice(i, 1);
    } else {
      i++;
    }
  }
  return stylesheet;
}
function difference2(mapA, mapB) {
  var diff = {};
  Object.keys(mapA).forEach(function(key) {
    if (mapA[key] !== mapB[key] && mapB[key] !== void 0) {
      diff[key] = mapB[key];
    }
  });
  Object.keys(mapB).forEach(function(key) {
    if (mapA[key] !== mapB[key] && mapB[key] !== void 0) {
      diff[key] = mapB[key];
    }
  });
  return diff;
}

// node_modules/@cloudscape-design/theming-runtime/shared/declaration/index.js
function createMinimalTheme(base, override) {
  var minimalTheme = cloneDeep(base);
  var contextTokens = /* @__PURE__ */ new Set();
  values(minimalTheme.contexts).forEach(function(context) {
    Object.keys(context.tokens).forEach(function(key) {
      var _a, _b, _c;
      var isInOverrideContext = key in ((_c = (_b = (_a = override === null || override === void 0 ? void 0 : override.contexts) === null || _a === void 0 ? void 0 : _a[context.id]) === null || _b === void 0 ? void 0 : _b.tokens) !== null && _c !== void 0 ? _c : {});
      if (!(key in override.tokens) && !isInOverrideContext) {
        delete context.tokens[key];
      } else {
        contextTokens.add(key);
      }
    });
  });
  Object.keys(minimalTheme.tokens).forEach(function(key) {
    if (!contextTokens.has(key) && !(key in override.tokens)) {
      delete minimalTheme.tokens[key];
    }
  });
  return mergeInPlace(minimalTheme, override);
}
function collectAllRequiredTokens(themes, initialTokens) {
  var referenceTokens = [];
  themes.forEach(function(theme) {
    return referenceTokens.push.apply(referenceTokens, Object.keys(flattenReferenceTokens(theme)));
  });
  var alreadyIncluded = new Set(__spreadArray(__spreadArray([], initialTokens, true), referenceTokens, true));
  var referencedTokens = [];
  themes.forEach(function(theme) {
    var referenced = collectReferencedTokens(theme, __spreadArray(__spreadArray([], initialTokens, true), referenceTokens, true));
    referenced.forEach(function(token) {
      if (!alreadyIncluded.has(token)) {
        referencedTokens.push(token);
        alreadyIncluded.add(token);
      }
    });
  });
  return { referenceTokens, referencedTokens };
}
function addMissingTokensToTheme(theme, tokens, sourceTheme) {
  tokens.forEach(function(token) {
    if (!(token in theme.tokens) && token in sourceTheme.tokens) {
      theme.tokens[token] = sourceTheme.tokens[token];
    }
  });
}
function createOverrideDeclarations(base, override, propertiesMap, selectorCustomizer) {
  var minimalTheme = createMinimalTheme(base, override);
  var initialTokens = Object.keys(minimalTheme.tokens);
  var referencedTokens = collectAllRequiredTokens([base], initialTokens).referencedTokens;
  addMissingTokensToTheme(minimalTheme, referencedTokens, base);
  var usedTokens = __spreadArray(__spreadArray([], initialTokens, true), referencedTokens, true);
  var ruleCreator = new RuleCreator(new Selector(selectorCustomizer), new UsedPropertyRegistry(propertiesMap, usedTokens));
  var stylesheet = new SingleThemeCreator(minimalTheme, ruleCreator, base, propertiesMap).create();
  return new MinimalTransformer().transform(stylesheet).toString();
}

// node_modules/@cloudscape-design/theming-runtime/browser/dom.js
function createStyleNode(content, nonce) {
  var node = document.createElement("style");
  if (nonce) {
    node.setAttribute("nonce", nonce);
  }
  node.appendChild(document.createTextNode(content));
  return node;
}
function appendStyleNode(node, targetDocument) {
  if (targetDocument === void 0) {
    targetDocument = document;
  }
  targetDocument.head.appendChild(node);
}
function getNonce(targetDocument) {
  var _a;
  if (targetDocument === void 0) {
    targetDocument = document;
  }
  var metaTag = targetDocument.querySelector('meta[name="nonce"]');
  return (_a = metaTag === null || metaTag === void 0 ? void 0 : metaTag.content) !== null && _a !== void 0 ? _a : void 0;
}

// node_modules/@cloudscape-design/theming-runtime/shared/declaration/customizer.js
function createMultiThemeCustomizer(root) {
  return function(selector) {
    return selector === root ? increaseSpecificityGradually(selector) : increaseSpecificity(increaseSpecificityGradually(selector));
  };
}

// node_modules/@cloudscape-design/theming-runtime/browser/index.js
function generateThemeStylesheet(params) {
  var override = params.override, preset2 = params.preset, baseThemeId = params.baseThemeId;
  var availableContexts = getContexts(preset2);
  var validated = validateOverride(override, preset2.themeable, availableContexts);
  var theme = getThemeFromPreset(preset2, baseThemeId);
  return createOverrideDeclarations(theme, validated, preset2.propertiesMap, createMultiThemeCustomizer(preset2.theme.selector));
}
function applyTheme(params) {
  var targetDocument = params.targetDocument;
  var content = generateThemeStylesheet(params);
  var nonce = getNonce(targetDocument);
  var styleNode = createStyleNode(content, nonce);
  appendStyleNode(styleNode, targetDocument);
  return {
    reset: function() {
      styleNode.remove();
    }
  };
}

// node_modules/@cloudscape-design/components/internal/generated/theming/index.js
var preset = {
  "theme": {
    "id": "visual-refresh",
    "selector": "body",
    "modes": {
      "color": {
        "id": "color",
        "states": {
          "light": {
            "default": true
          },
          "dark": {
            "selector": ".awsui-dark-mode",
            "media": "not print"
          }
        }
      },
      "density": {
        "id": "density",
        "states": {
          "comfortable": {
            "default": true
          },
          "compact": {
            "selector": ".awsui-compact-mode"
          }
        }
      },
      "motion": {
        "id": "motion",
        "states": {
          "default": {
            "default": true
          },
          "disabled": {
            "selector": ".awsui-motion-disabled"
          }
        }
      }
    },
    "tokens": {
      "colorPrimary50": {
        "light": "#f0fbff",
        "dark": "#f0fbff"
      },
      "colorPrimary100": {
        "light": "#d1f1ff",
        "dark": "#d1f1ff"
      },
      "colorPrimary200": {
        "light": "#b8e7ff",
        "dark": "#b8e7ff"
      },
      "colorPrimary300": {
        "light": "#75cfff",
        "dark": "#75cfff"
      },
      "colorPrimary400": {
        "light": "#42b4ff",
        "dark": "#42b4ff"
      },
      "colorPrimary500": {
        "light": "#0099ff",
        "dark": "#0099ff"
      },
      "colorPrimary600": {
        "light": "#006ce0",
        "dark": "#006ce0"
      },
      "colorPrimary700": {
        "light": "#004a9e",
        "dark": "#004a9e"
      },
      "colorPrimary800": {
        "light": "#003b8f",
        "dark": "#003b8f"
      },
      "colorPrimary900": {
        "light": "#002b66",
        "dark": "#002b66"
      },
      "colorPrimary1000": {
        "light": "#001129",
        "dark": "#001129"
      },
      "colorNeutral50": {
        "light": "#fcfcfd",
        "dark": "#fcfcfd"
      },
      "colorNeutral100": {
        "light": "#f9f9fa",
        "dark": "#f9f9fa"
      },
      "colorNeutral150": {
        "light": "#f6f6f9",
        "dark": "#f6f6f9"
      },
      "colorNeutral200": {
        "light": "#f3f3f7",
        "dark": "#f3f3f7"
      },
      "colorNeutral250": {
        "light": "#ebebf0",
        "dark": "#ebebf0"
      },
      "colorNeutral300": {
        "light": "#dedee3",
        "dark": "#dedee3"
      },
      "colorNeutral350": {
        "light": "#c6c6cd",
        "dark": "#c6c6cd"
      },
      "colorNeutral400": {
        "light": "#b4b4bb",
        "dark": "#b4b4bb"
      },
      "colorNeutral450": {
        "light": "#a4a4ad",
        "dark": "#a4a4ad"
      },
      "colorNeutral500": {
        "light": "#8c8c94",
        "dark": "#8c8c94"
      },
      "colorNeutral550": {
        "light": "#72747e",
        "dark": "#72747e"
      },
      "colorNeutral600": {
        "light": "#656871",
        "dark": "#656871"
      },
      "colorNeutral650": {
        "light": "#424650",
        "dark": "#424650"
      },
      "colorNeutral700": {
        "light": "#333843",
        "dark": "#333843"
      },
      "colorNeutral750": {
        "light": "#232b37",
        "dark": "#232b37"
      },
      "colorNeutral800": {
        "light": "#1b232d",
        "dark": "#1b232d"
      },
      "colorNeutral850": {
        "light": "#161d26",
        "dark": "#161d26"
      },
      "colorNeutral900": {
        "light": "#131920",
        "dark": "#131920"
      },
      "colorNeutral950": {
        "light": "#0f141a",
        "dark": "#0f141a"
      },
      "colorNeutral1000": {
        "light": "#06080a",
        "dark": "#06080a"
      },
      "colorError50": {
        "light": "#fff5f5",
        "dark": "#fff5f5"
      },
      "colorError400": {
        "light": "#ff7a7a",
        "dark": "#ff7a7a"
      },
      "colorError600": {
        "light": "#db0000",
        "dark": "#db0000"
      },
      "colorError900": {
        "light": "#700000",
        "dark": "#700000"
      },
      "colorError1000": {
        "light": "#1f0000",
        "dark": "#1f0000"
      },
      "colorSuccess50": {
        "light": "#effff1",
        "dark": "#effff1"
      },
      "colorSuccess500": {
        "light": "#2bb534",
        "dark": "#2bb534"
      },
      "colorSuccess600": {
        "light": "#00802f",
        "dark": "#00802f"
      },
      "colorSuccess1000": {
        "light": "#001401",
        "dark": "#001401"
      },
      "colorWarning50": {
        "light": "#fffef0",
        "dark": "#fffef0"
      },
      "colorWarning400": {
        "light": "#ffe347",
        "dark": "#ffe347"
      },
      "colorWarning500": {
        "light": "#fbd332",
        "dark": "#fbd332"
      },
      "colorWarning900": {
        "light": "#855900",
        "dark": "#855900"
      },
      "colorWarning1000": {
        "light": "#191100",
        "dark": "#191100"
      },
      "colorInfo50": {
        "light": "#f0fbff",
        "dark": "#f0fbff"
      },
      "colorInfo300": {
        "light": "#75cfff",
        "dark": "#75cfff"
      },
      "colorInfo400": {
        "light": "#42b4ff",
        "dark": "#42b4ff"
      },
      "colorInfo600": {
        "light": "#006ce0",
        "dark": "#006ce0"
      },
      "colorInfo1000": {
        "light": "#001129",
        "dark": "#001129"
      },
      "colorGrey50": {
        "light": "#fcfcfd",
        "dark": "#fcfcfd"
      },
      "colorGrey100": {
        "light": "#f9f9fa",
        "dark": "#f9f9fa"
      },
      "colorGrey150": {
        "light": "#f6f6f9",
        "dark": "#f6f6f9"
      },
      "colorGrey200": {
        "light": "#f3f3f7",
        "dark": "#f3f3f7"
      },
      "colorGrey250": {
        "light": "#ebebf0",
        "dark": "#ebebf0"
      },
      "colorGrey300": {
        "light": "#dedee3",
        "dark": "#dedee3"
      },
      "colorGrey350": {
        "light": "#c6c6cd",
        "dark": "#c6c6cd"
      },
      "colorGrey400": {
        "light": "#b4b4bb",
        "dark": "#b4b4bb"
      },
      "colorGrey450": {
        "light": "#a4a4ad",
        "dark": "#a4a4ad"
      },
      "colorGrey500": {
        "light": "#8c8c94",
        "dark": "#8c8c94"
      },
      "colorGrey600": {
        "light": "#656871",
        "dark": "#656871"
      },
      "colorGrey650": {
        "light": "#424650",
        "dark": "#424650"
      },
      "colorGrey700": {
        "light": "#333843",
        "dark": "#333843"
      },
      "colorGrey750": {
        "light": "#232b37",
        "dark": "#232b37"
      },
      "colorGrey800": {
        "light": "#1b232d",
        "dark": "#1b232d"
      },
      "colorGrey850": {
        "light": "#161d26",
        "dark": "#161d26"
      },
      "colorGrey900": {
        "light": "#131920",
        "dark": "#131920"
      },
      "colorGrey950": {
        "light": "#0f141a",
        "dark": "#0f141a"
      },
      "colorGrey1000": {
        "light": "#06080a",
        "dark": "#06080a"
      },
      "colorBlue50": {
        "light": "#f0fbff",
        "dark": "#f0fbff"
      },
      "colorBlue100": {
        "light": "#d1f1ff",
        "dark": "#d1f1ff"
      },
      "colorBlue200": {
        "light": "#b8e7ff",
        "dark": "#b8e7ff"
      },
      "colorBlue300": {
        "light": "#75cfff",
        "dark": "#75cfff"
      },
      "colorBlue400": {
        "light": "#42b4ff",
        "dark": "#42b4ff"
      },
      "colorBlue600": {
        "light": "#006ce0",
        "dark": "#006ce0"
      },
      "colorBlue700": {
        "light": "#004a9e",
        "dark": "#004a9e"
      },
      "colorBlue900": {
        "light": "#002b66",
        "dark": "#002b66"
      },
      "colorBlue1000": {
        "light": "#001129",
        "dark": "#001129"
      },
      "colorGreen50": {
        "light": "#effff1",
        "dark": "#effff1"
      },
      "colorGreen500": {
        "light": "#2bb534",
        "dark": "#2bb534"
      },
      "colorGreen600": {
        "light": "#00802f",
        "dark": "#00802f"
      },
      "colorGreen900": {
        "light": "#00471e",
        "dark": "#00471e"
      },
      "colorGreen1000": {
        "light": "#001401",
        "dark": "#001401"
      },
      "colorRed50": {
        "light": "#fff5f5",
        "dark": "#fff5f5"
      },
      "colorRed400": {
        "light": "#ff7a7a",
        "dark": "#ff7a7a"
      },
      "colorRed600": {
        "light": "#db0000",
        "dark": "#db0000"
      },
      "colorRed900": {
        "light": "#700000",
        "dark": "#700000"
      },
      "colorRed1000": {
        "light": "#1f0000",
        "dark": "#1f0000"
      },
      "colorYellow50": {
        "light": "#fffef0",
        "dark": "#fffef0"
      },
      "colorYellow400": {
        "light": "#ffe347",
        "dark": "#ffe347"
      },
      "colorYellow500": {
        "light": "#fbd332",
        "dark": "#fbd332"
      },
      "colorYellow900": {
        "light": "#855900",
        "dark": "#855900"
      },
      "colorYellow1000": {
        "light": "#191100",
        "dark": "#191100"
      },
      "colorPurple400": {
        "light": "#bf80ff",
        "dark": "#bf80ff"
      },
      "colorPurple700": {
        "light": "#7300e5",
        "dark": "#7300e5"
      },
      "colorAmber400": {
        "light": "#ff9900",
        "dark": "#ff9900"
      },
      "colorAmber500": {
        "light": "#fa6f00",
        "dark": "#fa6f00"
      },
      "colorAwsSquidInk": {
        "light": "#232f3e",
        "dark": "#232f3e"
      },
      "colorTransparent": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBlack": {
        "light": "#000000",
        "dark": "#000000"
      },
      "colorWhite": {
        "light": "#ffffff",
        "dark": "#ffffff"
      },
      "colorChartsRed300": {
        "light": "#ea7158",
        "dark": "#d63f38"
      },
      "colorChartsRed400": {
        "light": "#dc5032",
        "dark": "#ed5958"
      },
      "colorChartsRed500": {
        "light": "#d13313",
        "dark": "#fe6e73"
      },
      "colorChartsRed600": {
        "light": "#ba2e0f",
        "dark": "#ff8a8a"
      },
      "colorChartsRed700": {
        "light": "#a82a0c",
        "dark": "#ffa09e"
      },
      "colorChartsRed800": {
        "light": "#972709",
        "dark": "#ffb3b0"
      },
      "colorChartsRed900": {
        "light": "#892407",
        "dark": "#ffc4c0"
      },
      "colorChartsRed1000": {
        "light": "#7d2105",
        "dark": "#ffd2cf"
      },
      "colorChartsRed1100": {
        "light": "#721e03",
        "dark": "#ffe0dd"
      },
      "colorChartsRed1200": {
        "light": "#671c00",
        "dark": "#ffecea"
      },
      "colorChartsOrange300": {
        "light": "#e07941",
        "dark": "#c55305"
      },
      "colorChartsOrange400": {
        "light": "#cc5f21",
        "dark": "#de6923"
      },
      "colorChartsOrange500": {
        "light": "#bc4d01",
        "dark": "#f27c36"
      },
      "colorChartsOrange600": {
        "light": "#a84401",
        "dark": "#f89256"
      },
      "colorChartsOrange700": {
        "light": "#983c02",
        "dark": "#fca572"
      },
      "colorChartsOrange800": {
        "light": "#8a3603",
        "dark": "#ffb68b"
      },
      "colorChartsOrange900": {
        "light": "#7e3103",
        "dark": "#ffc6a4"
      },
      "colorChartsOrange1000": {
        "light": "#732c02",
        "dark": "#ffd4bb"
      },
      "colorChartsOrange1100": {
        "light": "#692801",
        "dark": "#ffe1cf"
      },
      "colorChartsOrange1200": {
        "light": "#602400",
        "dark": "#ffede2"
      },
      "colorChartsYellow300": {
        "light": "#b2911c",
        "dark": "#977001"
      },
      "colorChartsYellow400": {
        "light": "#9c7b0b",
        "dark": "#b08400"
      },
      "colorChartsYellow500": {
        "light": "#8a6b05",
        "dark": "#c59600"
      },
      "colorChartsYellow600": {
        "light": "#7b5f04",
        "dark": "#d3a61c"
      },
      "colorChartsYellow700": {
        "light": "#6f5504",
        "dark": "#dfb52c"
      },
      "colorChartsYellow800": {
        "light": "#654d03",
        "dark": "#eac33a"
      },
      "colorChartsYellow900": {
        "light": "#5d4503",
        "dark": "#f1cf65"
      },
      "colorChartsYellow1000": {
        "light": "#553f03",
        "dark": "#f7db8a"
      },
      "colorChartsYellow1100": {
        "light": "#4d3901",
        "dark": "#fce5a8"
      },
      "colorChartsYellow1200": {
        "light": "#483300",
        "dark": "#ffefc9"
      },
      "colorChartsGreen300": {
        "light": "#67a353",
        "dark": "#48851a"
      },
      "colorChartsGreen400": {
        "light": "#41902c",
        "dark": "#5a9b29"
      },
      "colorChartsGreen500": {
        "light": "#1f8104",
        "dark": "#69ae34"
      },
      "colorChartsGreen600": {
        "light": "#1a7302",
        "dark": "#7dbd4c"
      },
      "colorChartsGreen700": {
        "light": "#176702",
        "dark": "#8fca61"
      },
      "colorChartsGreen800": {
        "light": "#145d02",
        "dark": "#9fd673"
      },
      "colorChartsGreen900": {
        "light": "#125502",
        "dark": "#b2df8d"
      },
      "colorChartsGreen1000": {
        "light": "#104d01",
        "dark": "#c5e7a8"
      },
      "colorChartsGreen1100": {
        "light": "#0f4601",
        "dark": "#d5efbe"
      },
      "colorChartsGreen1200": {
        "light": "#0d4000",
        "dark": "#e4f7d5"
      },
      "colorChartsTeal300": {
        "light": "#2ea597",
        "dark": "#018977"
      },
      "colorChartsTeal400": {
        "light": "#1c8e81",
        "dark": "#009d89"
      },
      "colorChartsTeal500": {
        "light": "#0d7d70",
        "dark": "#00b09b"
      },
      "colorChartsTeal600": {
        "light": "#096f64",
        "dark": "#40bfa9"
      },
      "colorChartsTeal700": {
        "light": "#06645a",
        "dark": "#5fccb7"
      },
      "colorChartsTeal800": {
        "light": "#045b52",
        "dark": "#77d7c3"
      },
      "colorChartsTeal900": {
        "light": "#03524a",
        "dark": "#94e0d0"
      },
      "colorChartsTeal1000": {
        "light": "#014b44",
        "dark": "#ace9db"
      },
      "colorChartsTeal1100": {
        "light": "#01443e",
        "dark": "#c2f0e6"
      },
      "colorChartsTeal1200": {
        "light": "#003e38",
        "dark": "#d7f7f0"
      },
      "colorChartsBlue1300": {
        "light": "#529ccb",
        "dark": "#00819c"
      },
      "colorChartsBlue1400": {
        "light": "#3184c2",
        "dark": "#0497ba"
      },
      "colorChartsBlue1500": {
        "light": "#0273bb",
        "dark": "#08aad2"
      },
      "colorChartsBlue1600": {
        "light": "#0166ab",
        "dark": "#44b9dd"
      },
      "colorChartsBlue1700": {
        "light": "#015b9d",
        "dark": "#63c6e7"
      },
      "colorChartsBlue1800": {
        "light": "#015292",
        "dark": "#79d2f0"
      },
      "colorChartsBlue1900": {
        "light": "#014a87",
        "dark": "#98dcf5"
      },
      "colorChartsBlue11000": {
        "light": "#01437d",
        "dark": "#b3e4f8"
      },
      "colorChartsBlue11100": {
        "light": "#003c75",
        "dark": "#caedfc"
      },
      "colorChartsBlue11200": {
        "light": "#00366d",
        "dark": "#ddf4ff"
      },
      "colorChartsBlue2300": {
        "light": "#688ae8",
        "dark": "#486de8"
      },
      "colorChartsBlue2400": {
        "light": "#5978e3",
        "dark": "#6384f5"
      },
      "colorChartsBlue2500": {
        "light": "#4066df",
        "dark": "#7698fe"
      },
      "colorChartsBlue2600": {
        "light": "#3759ce",
        "dark": "#8ea9ff"
      },
      "colorChartsBlue2700": {
        "light": "#314fbf",
        "dark": "#a2b8ff"
      },
      "colorChartsBlue2800": {
        "light": "#2c46b1",
        "dark": "#b1c5ff"
      },
      "colorChartsBlue2900": {
        "light": "#273ea5",
        "dark": "#c3d1ff"
      },
      "colorChartsBlue21000": {
        "light": "#23379b",
        "dark": "#d2dcff"
      },
      "colorChartsBlue21100": {
        "light": "#1f3191",
        "dark": "#dfe6ff"
      },
      "colorChartsBlue21200": {
        "light": "#1b2b88",
        "dark": "#ecf0ff"
      },
      "colorChartsPurple300": {
        "light": "#a783e1",
        "dark": "#8d59de"
      },
      "colorChartsPurple400": {
        "light": "#9469d6",
        "dark": "#a173ea"
      },
      "colorChartsPurple500": {
        "light": "#8456ce",
        "dark": "#b088f5"
      },
      "colorChartsPurple600": {
        "light": "#7749bf",
        "dark": "#bf9bf9"
      },
      "colorChartsPurple700": {
        "light": "#6b40b2",
        "dark": "#cbabfc"
      },
      "colorChartsPurple800": {
        "light": "#6237a7",
        "dark": "#d6baff"
      },
      "colorChartsPurple900": {
        "light": "#59309d",
        "dark": "#dfc8ff"
      },
      "colorChartsPurple1000": {
        "light": "#512994",
        "dark": "#e8d5ff"
      },
      "colorChartsPurple1100": {
        "light": "#4a238b",
        "dark": "#efe2ff"
      },
      "colorChartsPurple1200": {
        "light": "#431d84",
        "dark": "#f5edff"
      },
      "colorChartsPink300": {
        "light": "#da7596",
        "dark": "#c64a70"
      },
      "colorChartsPink400": {
        "light": "#ce567c",
        "dark": "#d56889"
      },
      "colorChartsPink500": {
        "light": "#c33d69",
        "dark": "#e07f9d"
      },
      "colorChartsPink600": {
        "light": "#b1325c",
        "dark": "#eb92ad"
      },
      "colorChartsPink700": {
        "light": "#a32952",
        "dark": "#f5a2bb"
      },
      "colorChartsPink800": {
        "light": "#962249",
        "dark": "#ffb0c8"
      },
      "colorChartsPink900": {
        "light": "#8b1b42",
        "dark": "#ffc1d4"
      },
      "colorChartsPink1000": {
        "light": "#81143b",
        "dark": "#ffd1de"
      },
      "colorChartsPink1100": {
        "light": "#780d35",
        "dark": "#ffdfe8"
      },
      "colorChartsPink1200": {
        "light": "#6f062f",
        "dark": "#ffecf1"
      },
      "colorChartsStatusCritical": {
        "light": "{colorChartsRed1000}",
        "dark": "{colorChartsRed300}"
      },
      "colorChartsStatusHigh": {
        "light": "{colorChartsRed600}",
        "dark": "{colorChartsRed500}"
      },
      "colorChartsStatusMedium": {
        "light": "{colorChartsOrange400}",
        "dark": "{colorChartsOrange600}"
      },
      "colorChartsStatusLow": {
        "light": "{colorChartsYellow300}",
        "dark": "{colorChartsYellow700}"
      },
      "colorChartsStatusPositive": {
        "light": "{colorChartsGreen300}",
        "dark": "{colorChartsGreen500}"
      },
      "colorChartsStatusInfo": {
        "light": "{colorChartsBlue1400}",
        "dark": "{colorChartsBlue1500}"
      },
      "colorChartsStatusNeutral": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral500}"
      },
      "colorChartsThresholdNegative": {
        "light": "{colorError600}",
        "dark": "{colorError400}"
      },
      "colorChartsThresholdPositive": {
        "light": "{colorSuccess600}",
        "dark": "{colorSuccess500}"
      },
      "colorChartsThresholdInfo": {
        "light": "{colorInfo600}",
        "dark": "{colorInfo300}"
      },
      "colorChartsThresholdNeutral": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral450}"
      },
      "colorChartsLineGrid": {
        "light": "{colorNeutral300}",
        "dark": "{colorNeutral650}"
      },
      "colorChartsLineTick": {
        "light": "{colorNeutral300}",
        "dark": "{colorNeutral650}"
      },
      "colorChartsLineAxis": {
        "light": "{colorNeutral300}",
        "dark": "{colorNeutral650}"
      },
      "colorChartsPaletteCategorical1": {
        "light": "{colorChartsBlue2300}",
        "dark": "{colorChartsBlue2300}"
      },
      "colorChartsPaletteCategorical2": {
        "light": "{colorChartsPink500}",
        "dark": "{colorChartsPink500}"
      },
      "colorChartsPaletteCategorical3": {
        "light": "{colorChartsTeal300}",
        "dark": "{colorChartsTeal300}"
      },
      "colorChartsPaletteCategorical4": {
        "light": "{colorChartsPurple500}",
        "dark": "{colorChartsPurple500}"
      },
      "colorChartsPaletteCategorical5": {
        "light": "{colorChartsOrange300}",
        "dark": "{colorChartsOrange300}"
      },
      "colorChartsPaletteCategorical6": {
        "light": "{colorChartsBlue2600}",
        "dark": "{colorChartsBlue2600}"
      },
      "colorChartsPaletteCategorical7": {
        "light": "{colorChartsPink800}",
        "dark": "{colorChartsPink800}"
      },
      "colorChartsPaletteCategorical8": {
        "light": "{colorChartsTeal600}",
        "dark": "{colorChartsTeal600}"
      },
      "colorChartsPaletteCategorical9": {
        "light": "{colorChartsPurple800}",
        "dark": "{colorChartsPurple800}"
      },
      "colorChartsPaletteCategorical10": {
        "light": "{colorChartsOrange600}",
        "dark": "{colorChartsOrange600}"
      },
      "colorChartsPaletteCategorical11": {
        "light": "{colorChartsBlue2900}",
        "dark": "{colorChartsBlue2900}"
      },
      "colorChartsPaletteCategorical12": {
        "light": "{colorChartsPink1100}",
        "dark": "{colorChartsPink1100}"
      },
      "colorChartsPaletteCategorical13": {
        "light": "{colorChartsTeal900}",
        "dark": "{colorChartsTeal900}"
      },
      "colorChartsPaletteCategorical14": {
        "light": "{colorChartsPurple1100}",
        "dark": "{colorChartsPurple1100}"
      },
      "colorChartsPaletteCategorical15": {
        "light": "{colorChartsOrange900}",
        "dark": "{colorChartsOrange900}"
      },
      "colorChartsPaletteCategorical16": {
        "light": "{colorChartsBlue21200}",
        "dark": "{colorChartsBlue21200}"
      },
      "colorChartsPaletteCategorical17": {
        "light": "{colorChartsPink400}",
        "dark": "{colorChartsPink400}"
      },
      "colorChartsPaletteCategorical18": {
        "light": "{colorChartsTeal1200}",
        "dark": "{colorChartsTeal1200}"
      },
      "colorChartsPaletteCategorical19": {
        "light": "{colorChartsPurple400}",
        "dark": "{colorChartsPurple400}"
      },
      "colorChartsPaletteCategorical20": {
        "light": "{colorChartsOrange1200}",
        "dark": "{colorChartsOrange1200}"
      },
      "colorChartsPaletteCategorical21": {
        "light": "{colorChartsBlue2500}",
        "dark": "{colorChartsBlue2500}"
      },
      "colorChartsPaletteCategorical22": {
        "light": "{colorChartsPink700}",
        "dark": "{colorChartsPink700}"
      },
      "colorChartsPaletteCategorical23": {
        "light": "{colorChartsTeal500}",
        "dark": "{colorChartsTeal500}"
      },
      "colorChartsPaletteCategorical24": {
        "light": "{colorChartsPurple700}",
        "dark": "{colorChartsPurple700}"
      },
      "colorChartsPaletteCategorical25": {
        "light": "{colorChartsOrange500}",
        "dark": "{colorChartsOrange500}"
      },
      "colorChartsPaletteCategorical26": {
        "light": "{colorChartsBlue2800}",
        "dark": "{colorChartsBlue2800}"
      },
      "colorChartsPaletteCategorical27": {
        "light": "{colorChartsPink1000}",
        "dark": "{colorChartsPink1000}"
      },
      "colorChartsPaletteCategorical28": {
        "light": "{colorChartsTeal800}",
        "dark": "{colorChartsTeal800}"
      },
      "colorChartsPaletteCategorical29": {
        "light": "{colorChartsPurple1000}",
        "dark": "{colorChartsPurple1000}"
      },
      "colorChartsPaletteCategorical30": {
        "light": "{colorChartsOrange800}",
        "dark": "{colorChartsOrange800}"
      },
      "colorChartsPaletteCategorical31": {
        "light": "{colorChartsBlue21100}",
        "dark": "{colorChartsBlue21100}"
      },
      "colorChartsPaletteCategorical32": {
        "light": "{colorChartsPink300}",
        "dark": "{colorChartsPink300}"
      },
      "colorChartsPaletteCategorical33": {
        "light": "{colorChartsTeal1100}",
        "dark": "{colorChartsTeal1100}"
      },
      "colorChartsPaletteCategorical34": {
        "light": "{colorChartsPurple300}",
        "dark": "{colorChartsPurple300}"
      },
      "colorChartsPaletteCategorical35": {
        "light": "{colorChartsOrange1100}",
        "dark": "{colorChartsOrange1100}"
      },
      "colorChartsPaletteCategorical36": {
        "light": "{colorChartsBlue2400}",
        "dark": "{colorChartsBlue2400}"
      },
      "colorChartsPaletteCategorical37": {
        "light": "{colorChartsPink600}",
        "dark": "{colorChartsPink600}"
      },
      "colorChartsPaletteCategorical38": {
        "light": "{colorChartsTeal400}",
        "dark": "{colorChartsTeal400}"
      },
      "colorChartsPaletteCategorical39": {
        "light": "{colorChartsPurple600}",
        "dark": "{colorChartsPurple600}"
      },
      "colorChartsPaletteCategorical40": {
        "light": "{colorChartsOrange400}",
        "dark": "{colorChartsOrange400}"
      },
      "colorChartsPaletteCategorical41": {
        "light": "{colorChartsBlue2700}",
        "dark": "{colorChartsBlue2700}"
      },
      "colorChartsPaletteCategorical42": {
        "light": "{colorChartsPink900}",
        "dark": "{colorChartsPink900}"
      },
      "colorChartsPaletteCategorical43": {
        "light": "{colorChartsTeal700}",
        "dark": "{colorChartsTeal700}"
      },
      "colorChartsPaletteCategorical44": {
        "light": "{colorChartsPurple900}",
        "dark": "{colorChartsPurple900}"
      },
      "colorChartsPaletteCategorical45": {
        "light": "{colorChartsOrange700}",
        "dark": "{colorChartsOrange700}"
      },
      "colorChartsPaletteCategorical46": {
        "light": "{colorChartsBlue21000}",
        "dark": "{colorChartsBlue21000}"
      },
      "colorChartsPaletteCategorical47": {
        "light": "{colorChartsPink1200}",
        "dark": "{colorChartsPink1200}"
      },
      "colorChartsPaletteCategorical48": {
        "light": "{colorChartsTeal1000}",
        "dark": "{colorChartsTeal1000}"
      },
      "colorChartsPaletteCategorical49": {
        "light": "{colorChartsPurple1200}",
        "dark": "{colorChartsPurple1200}"
      },
      "colorChartsPaletteCategorical50": {
        "light": "{colorChartsOrange1000}",
        "dark": "{colorChartsOrange1000}"
      },
      "colorChartsErrorBarMarker": {
        "light": "{colorNeutral900}",
        "dark": "{colorWhite}"
      },
      "colorSeverityDarkRed": {
        "light": "#870303",
        "dark": "#d63f38"
      },
      "colorSeverityRed": {
        "light": "#ce3311",
        "dark": "#fe6e73"
      },
      "colorSeverityOrange": {
        "light": "#f89256",
        "dark": "#f89256"
      },
      "colorSeverityYellow": {
        "light": "#f2cd54",
        "dark": "#f2cd54"
      },
      "colorSeverityGrey": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral600}"
      },
      "colorBackgroundNotificationSeverityCritical": {
        "light": "{colorSeverityDarkRed}",
        "dark": "{colorSeverityDarkRed}"
      },
      "colorBackgroundNotificationSeverityHigh": {
        "light": "{colorSeverityRed}",
        "dark": "{colorSeverityRed}"
      },
      "colorBackgroundNotificationSeverityMedium": {
        "light": "{colorSeverityOrange}",
        "dark": "{colorSeverityOrange}"
      },
      "colorBackgroundNotificationSeverityLow": {
        "light": "{colorSeverityYellow}",
        "dark": "{colorSeverityYellow}"
      },
      "colorBackgroundNotificationSeverityNeutral": {
        "light": "{colorSeverityGrey}",
        "dark": "{colorSeverityGrey}"
      },
      "colorTextNotificationSeverityCritical": {
        "light": "{colorNeutral100}",
        "dark": "{colorBlack}"
      },
      "colorTextNotificationSeverityHigh": {
        "light": "{colorNeutral100}",
        "dark": "{colorNeutral950}"
      },
      "colorTextNotificationSeverityMedium": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral950}"
      },
      "colorTextNotificationSeverityLow": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral950}"
      },
      "colorTextNotificationSeverityNeutral": {
        "light": "{colorNeutral100}",
        "dark": "{colorNeutral100}"
      },
      "colorGreyOpaque10": {
        "light": "rgba(0, 0, 0, 0.1)",
        "dark": "rgba(0, 0, 0, 0.1)"
      },
      "colorGreyOpaque25": {
        "light": "rgba(255, 255, 255, 0.25)",
        "dark": "rgba(255, 255, 255, 0.25)"
      },
      "colorGreyOpaque40": {
        "light": "rgba(0, 0, 0, 0.4)",
        "dark": "rgba(0, 0, 0, 0.4)"
      },
      "colorGreyOpaque50": {
        "light": "rgba(0, 0, 0, 0.5)",
        "dark": "rgba(0, 0, 0, 0.5)"
      },
      "colorGreyOpaque70": {
        "light": "rgba(35, 43, 55, 0.7)",
        "dark": "rgba(15, 20, 26, 0.7)"
      },
      "colorGreyOpaque80": {
        "light": "rgba(22, 25, 31, 0.8)",
        "dark": "rgba(22, 25, 31, 0.8)"
      },
      "colorGreyOpaque90": {
        "light": "rgba(242, 243, 243, 0.9)",
        "dark": "rgba(242, 243, 243, 0.9)"
      },
      "colorGreyTransparent": {
        "light": "rgba(15, 20, 26, 0.12)",
        "dark": "rgba(15, 20, 26, 1)"
      },
      "colorGreyTransparentHeavy": {
        "light": "rgba(15, 20, 26, 0.12)",
        "dark": "rgba(15, 20, 26, 1)"
      },
      "colorGreyTransparentLight": {
        "light": "rgba(15, 20, 26, 0.12)",
        "dark": "rgba(15, 20, 26, 1)"
      },
      "colorBackgroundBadgeIcon": {
        "light": "{colorError600}",
        "dark": "{colorError400}"
      },
      "colorBackgroundButtonLinkActive": {
        "light": "{colorPrimary100}",
        "dark": "{colorNeutral700}"
      },
      "colorBackgroundButtonLinkDefault": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBackgroundButtonLinkDisabled": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBackgroundButtonLinkHover": {
        "light": "{colorPrimary50}",
        "dark": "{colorNeutral800}"
      },
      "colorBackgroundButtonNormalActive": {
        "light": "{colorPrimary100}",
        "dark": "{colorNeutral700}"
      },
      "colorBackgroundButtonNormalDefault": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorBackgroundButtonNormalDisabled": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorBackgroundButtonNormalHover": {
        "light": "{colorPrimary50}",
        "dark": "{colorNeutral800}"
      },
      "colorBackgroundToggleButtonNormalPressed": {
        "light": "{colorPrimary100}",
        "dark": "{colorNeutral700}"
      },
      "colorBackgroundToggleButtonNormalDefault": {
        "light": "{colorBackgroundButtonNormalDefault}",
        "dark": "{colorBackgroundButtonNormalDefault}"
      },
      "colorBackgroundButtonPrimaryActive": {
        "light": "{colorPrimary900}",
        "dark": "{colorPrimary400}"
      },
      "colorBackgroundButtonPrimaryDefault": {
        "light": "{colorBorderButtonNormalDefault}",
        "dark": "{colorBorderButtonNormalDefault}"
      },
      "colorBackgroundButtonPrimaryDisabled": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral750}"
      },
      "colorBackgroundButtonPrimaryHover": {
        "light": "{colorBorderButtonNormalHover}",
        "dark": "{colorBorderButtonNormalHover}"
      },
      "colorBackgroundDirectionButtonActive": {
        "light": "{colorNeutral750}",
        "dark": "{colorNeutral750}"
      },
      "colorBackgroundDirectionButtonDefault": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral650}"
      },
      "colorBackgroundDirectionButtonDisabled": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral750}"
      },
      "colorBackgroundDirectionButtonHover": {
        "light": "{colorNeutral700}",
        "dark": "{colorNeutral700}"
      },
      "colorTextDirectionButtonDefault": {
        "light": "{colorWhite}",
        "dark": "{colorWhite}"
      },
      "colorTextDirectionButtonDisabled": {
        "light": "{colorTextInteractiveDisabled}",
        "dark": "{colorTextInteractiveDisabled}"
      },
      "colorBackgroundCalendarCurrentDate": {
        "light": "{colorNeutral200}",
        "dark": "{colorNeutral700}"
      },
      "colorBackgroundCellShaded": {
        "light": "{colorNeutral150}",
        "dark": "{colorNeutral800}"
      },
      "colorBackgroundCodeEditorGutterActiveLineDefault": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral500}"
      },
      "colorBackgroundCodeEditorGutterActiveLineError": {
        "light": "{colorTextStatusError}",
        "dark": "{colorTextStatusError}"
      },
      "colorBackgroundCodeEditorGutterDefault": {
        "light": "{colorNeutral200}",
        "dark": "{colorNeutral800}"
      },
      "colorBackgroundCodeEditorLoading": {
        "light": "{colorNeutral100}",
        "dark": "{colorNeutral800}"
      },
      "colorBackgroundCodeEditorPaneItemHover": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral700}"
      },
      "colorBackgroundCodeEditorStatusBar": {
        "light": "{colorNeutral200}",
        "dark": "{colorNeutral800}"
      },
      "colorBackgroundCard": {
        "light": "{colorBackgroundContainerContent}",
        "dark": "{colorBackgroundContainerContent}"
      },
      "colorBackgroundItemCard": {
        "light": "{colorBackgroundCard}",
        "dark": "{colorBackgroundCard}"
      },
      "colorBackgroundContainerContent": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorBackgroundContainerHeader": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorBackgroundControlChecked": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorBackgroundControlDefault": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorBackgroundControlDisabled": {
        "light": "{colorNeutral300}",
        "dark": "{colorNeutral700}"
      },
      "colorBackgroundDropdownItemDefault": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral800}"
      },
      "colorBackgroundDropdownItemDimmed": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBackgroundDropdownItemFilterMatch": {
        "light": "{colorPrimary50}",
        "dark": "{colorNeutral700}"
      },
      "colorBackgroundDropdownItemHover": {
        "light": "{colorNeutral200}",
        "dark": "{colorNeutral900}"
      },
      "colorBackgroundDropdownItemSelected": {
        "light": "{colorBackgroundItemSelected}",
        "dark": "{colorBackgroundItemSelected}"
      },
      "colorBackgroundHomeHeader": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral950}"
      },
      "colorBackgroundInlineCode": {
        "light": "rgba(0, 0, 0, 0.1)",
        "dark": "rgba(255, 255, 255, 0.1)"
      },
      "colorBackgroundInputDefault": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorBackgroundInputDisabled": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral800}"
      },
      "colorBackgroundItemSelected": {
        "light": "{colorPrimary50}",
        "dark": "{colorPrimary1000}"
      },
      "colorBackgroundLayoutMain": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorBackgroundDrawer": {
        "light": "{colorBackgroundLayoutPanelContent}",
        "dark": "{colorBackgroundLayoutPanelContent}"
      },
      "colorBackgroundDrawerBackdrop": {
        "light": "{colorGreyOpaque70}",
        "dark": "{colorGreyOpaque70}"
      },
      "colorBackgroundLayoutMobilePanel": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral950}"
      },
      "colorBackgroundLayoutPanelContent": {
        "light": "{colorBackgroundContainerContent}",
        "dark": "{colorBackgroundContainerContent}"
      },
      "colorBackgroundLayoutPanelHover": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral700}"
      },
      "colorBackgroundLayoutToolbar": {
        "light": "{colorBackgroundLayoutPanelContent}",
        "dark": "{colorBackgroundLayoutPanelContent}"
      },
      "colorBackgroundLayoutToggleActive": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral650}"
      },
      "colorBackgroundLayoutToggleDefault": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral650}"
      },
      "colorBackgroundLayoutToggleHover": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral600}"
      },
      "colorBackgroundLayoutToggleSelectedActive": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorBackgroundLayoutToggleSelectedDefault": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorBackgroundLayoutToggleSelectedHover": {
        "light": "{colorPrimary700}",
        "dark": "{colorPrimary300}"
      },
      "colorBackgroundModalOverlay": {
        "light": "{colorGreyOpaque70}",
        "dark": "{colorGreyOpaque70}"
      },
      "colorBackgroundNotificationBlue": {
        "light": "{colorInfo600}",
        "dark": "{colorInfo600}"
      },
      "colorBackgroundNotificationGreen": {
        "light": "{colorSuccess600}",
        "dark": "{colorSuccess600}"
      },
      "colorBackgroundNotificationGrey": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral600}"
      },
      "colorBackgroundNotificationRed": {
        "light": "{colorError600}",
        "dark": "{colorError600}"
      },
      "colorBackgroundNotificationYellow": {
        "light": "{colorWarning400}",
        "dark": "{colorWarning400}"
      },
      "colorBackgroundNotificationStackBar": {
        "light": "{colorNeutral750}",
        "dark": "{colorNeutral750}"
      },
      "colorBackgroundNotificationStackBarActive": {
        "light": "{colorNeutral750}",
        "dark": "{colorNeutral750}"
      },
      "colorBackgroundNotificationStackBarHover": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral650}"
      },
      "colorBackgroundPopover": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral800}"
      },
      "colorBackgroundProgressBarValueDefault": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorBackgroundProgressBarDefault": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral700}"
      },
      "colorBackgroundSegmentActive": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorBackgroundSegmentDefault": {
        "light": "{colorBackgroundButtonNormalDefault}",
        "dark": "{colorBackgroundButtonNormalDefault}"
      },
      "colorBackgroundSegmentDisabled": {
        "light": "{colorBackgroundButtonNormalDisabled}",
        "dark": "{colorBackgroundButtonNormalDisabled}"
      },
      "colorBackgroundSegmentHover": {
        "light": "{colorBackgroundButtonNormalHover}",
        "dark": "{colorBackgroundButtonNormalHover}"
      },
      "colorBackgroundSegmentWrapper": {
        "light": "{colorBackgroundContainerContent}",
        "dark": "{colorBackgroundContainerContent}"
      },
      "colorBackgroundSliderRangeDefault": {
        "light": "{colorBackgroundSliderHandleDefault}",
        "dark": "{colorBackgroundSliderHandleDefault}"
      },
      "colorBackgroundSliderRangeActive": {
        "light": "{colorBackgroundSliderHandleActive}",
        "dark": "{colorBackgroundSliderHandleActive}"
      },
      "colorBackgroundSliderHandleDefault": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorBackgroundSliderHandleActive": {
        "light": "{colorPrimary700}",
        "dark": "{colorPrimary300}"
      },
      "colorBackgroundSliderTrackDefault": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral600}"
      },
      "colorBackgroundSliderHandleRing": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorBackgroundSliderHandleErrorDefault": {
        "light": "{colorTextStatusError}",
        "dark": "{colorTextStatusError}"
      },
      "colorBackgroundSliderHandleErrorActive": {
        "light": "{colorTextStatusError}",
        "dark": "{colorTextStatusError}"
      },
      "colorBackgroundSliderHandleWarningDefault": {
        "light": "{colorTextStatusWarning}",
        "dark": "{colorTextStatusWarning}"
      },
      "colorBackgroundSliderHandleWarningActive": {
        "light": "{colorTextStatusWarning}",
        "dark": "{colorTextStatusWarning}"
      },
      "colorBackgroundSliderRangeErrorDefault": {
        "light": "{colorTextStatusError}",
        "dark": "{colorTextStatusError}"
      },
      "colorBackgroundSliderRangeErrorActive": {
        "light": "{colorTextStatusError}",
        "dark": "{colorTextStatusError}"
      },
      "colorBackgroundSliderRangeWarningDefault": {
        "light": "{colorTextStatusWarning}",
        "dark": "{colorTextStatusWarning}"
      },
      "colorBackgroundSliderRangeWarningActive": {
        "light": "{colorTextStatusWarning}",
        "dark": "{colorTextStatusWarning}"
      },
      "colorBackgroundStatusError": {
        "light": "{colorError50}",
        "dark": "{colorError1000}"
      },
      "colorBackgroundStatusInfo": {
        "light": "{colorInfo50}",
        "dark": "{colorInfo1000}"
      },
      "colorBackgroundDialog": {
        "light": "{colorBackgroundStatusInfo}",
        "dark": "{colorBackgroundStatusInfo}"
      },
      "colorBackgroundStatusSuccess": {
        "light": "{colorSuccess50}",
        "dark": "{colorSuccess1000}"
      },
      "colorBackgroundStatusWarning": {
        "light": "{colorWarning50}",
        "dark": "{colorWarning1000}"
      },
      "colorBackgroundTableHeader": {
        "light": "{colorBackgroundContainerHeader}",
        "dark": "{colorBackgroundContainerHeader}"
      },
      "colorBackgroundTilesDisabled": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral800}"
      },
      "colorBackgroundToggleCheckedDisabled": {
        "light": "{colorPrimary200}",
        "dark": "{colorPrimary900}"
      },
      "colorBackgroundToggleDefault": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral500}"
      },
      "colorBackgroundAvatarGenAi": {
        "light": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)",
        "dark": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)"
      },
      "colorBackgroundAvatarDefault": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral650}"
      },
      "colorTextAvatar": {
        "light": "{colorWhite}",
        "dark": "{colorWhite}"
      },
      "colorBackgroundLoadingBarGenAi": {
        "light": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)",
        "dark": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)"
      },
      "colorBackgroundStatusIndicatorError": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBackgroundStatusIndicatorWarning": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBackgroundStatusIndicatorSuccess": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBackgroundStatusIndicatorInfo": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBackgroundStatusIndicatorNeutral": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBackgroundChatBubbleOutgoing": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBackgroundChatBubbleIncoming": {
        "light": "{colorNeutral150}",
        "dark": "{colorNeutral950}"
      },
      "colorTextChatBubbleOutgoing": {
        "light": "{colorTextBodyDefault}",
        "dark": "{colorTextBodyDefault}"
      },
      "colorTextChatBubbleIncoming": {
        "light": "{colorTextBodyDefault}",
        "dark": "{colorTextBodyDefault}"
      },
      "colorBorderButtonLinkDisabled": {
        "light": "{colorBackgroundButtonLinkDisabled}",
        "dark": "{colorBackgroundButtonLinkDisabled}"
      },
      "colorBorderButtonNormalActive": {
        "light": "{colorPrimary900}",
        "dark": "{colorPrimary300}"
      },
      "colorBorderButtonNormalDefault": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorBorderToggleButtonNormalPressed": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorBorderButtonNormalDisabled": {
        "light": "{colorNeutral400}",
        "dark": "{colorNeutral600}"
      },
      "colorTextButtonNormalDisabled": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral500}"
      },
      "colorBorderButtonNormalHover": {
        "light": "{colorPrimary900}",
        "dark": "{colorPrimary300}"
      },
      "colorTextButtonIconDisabled": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral500}"
      },
      "colorBorderButtonPrimaryActive": {
        "light": "{colorBackgroundButtonPrimaryActive}",
        "dark": "{colorBackgroundButtonPrimaryActive}"
      },
      "colorBorderButtonPrimaryDefault": {
        "light": "{colorBackgroundButtonPrimaryDefault}",
        "dark": "{colorBackgroundButtonPrimaryDefault}"
      },
      "colorBorderButtonPrimaryDisabled": {
        "light": "{colorBackgroundButtonPrimaryDisabled}",
        "dark": "{colorBackgroundButtonPrimaryDisabled}"
      },
      "colorBorderButtonPrimaryHover": {
        "light": "{colorBackgroundButtonPrimaryHover}",
        "dark": "{colorBackgroundButtonPrimaryHover}"
      },
      "colorTextButtonPrimaryDisabled": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral500}"
      },
      "colorItemSelected": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorBorderCalendarGrid": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBorderCalendarGridSelectedFocusRing": {
        "light": "{colorNeutral100}",
        "dark": "{colorNeutral850}"
      },
      "colorBorderCellShaded": {
        "light": "{colorNeutral300}",
        "dark": "{colorNeutral700}"
      },
      "colorBorderCodeEditorAceActiveLineLightTheme": {
        "light": "{colorNeutral300}",
        "dark": "{colorNeutral300}"
      },
      "colorBorderCodeEditorAceActiveLineDarkTheme": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral600}"
      },
      "colorBorderCodeEditorDefault": {
        "light": "{colorNeutral300}",
        "dark": "{colorNeutral600}"
      },
      "colorBorderCodeEditorPaneItemHover": {
        "light": "{colorBorderDropdownItemHover}",
        "dark": "{colorBorderDropdownItemHover}"
      },
      "colorBorderCard": {
        "light": "{colorBorderDividerDefault}",
        "dark": "{colorBorderDividerDefault}"
      },
      "colorBorderCardHighlighted": {
        "light": "{colorBorderItemSelected}",
        "dark": "{colorBorderItemSelected}"
      },
      "colorBorderItemCard": {
        "light": "{colorBorderCard}",
        "dark": "{colorBorderCard}"
      },
      "colorBorderItemCardHighlighted": {
        "light": "{colorBorderCardHighlighted}",
        "dark": "{colorBorderCardHighlighted}"
      },
      "colorBorderContainerDivider": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBorderContainerTop": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBorderControlChecked": {
        "light": "{colorBackgroundControlChecked}",
        "dark": "{colorBackgroundControlChecked}"
      },
      "colorBorderControlDefault": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral500}"
      },
      "colorBorderControlDisabled": {
        "light": "{colorBackgroundControlDisabled}",
        "dark": "{colorBackgroundControlDisabled}"
      },
      "colorBorderDividerActive": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral100}"
      },
      "colorBorderDividerDefault": {
        "light": "{colorNeutral350}",
        "dark": "{colorNeutral650}"
      },
      "colorBorderDividerPanelBottom": {
        "light": "{colorBorderDividerDefault}",
        "dark": "{colorBorderDividerDefault}"
      },
      "colorBorderDividerPanelSide": {
        "light": "{colorBorderDividerDefault}",
        "dark": "{colorBorderDividerDefault}"
      },
      "colorBorderDividerSecondary": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral750}"
      },
      "colorBorderDropdownContainer": {
        "light": "{colorNeutral400}",
        "dark": "{colorNeutral600}"
      },
      "colorBorderDropdownGroup": {
        "light": "{colorBorderDropdownItemDefault}",
        "dark": "{colorBorderDropdownItemDefault}"
      },
      "colorBorderDropdownItemDefault": {
        "light": "{colorBorderDividerDefault}",
        "dark": "{colorBorderDividerDefault}"
      },
      "colorBorderDropdownItemHover": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral600}"
      },
      "colorBorderDropdownItemDimmedHover": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral500}"
      },
      "colorBorderDropdownItemSelected": {
        "light": "{colorBorderItemSelected}",
        "dark": "{colorBorderItemSelected}"
      },
      "colorBorderDropdownItemTop": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorBorderEditableCellHover": {
        "light": "{colorBorderDropdownItemHover}",
        "dark": "{colorBorderDropdownItemHover}"
      },
      "colorBorderInputDefault": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral600}"
      },
      "colorBorderInputDisabled": {
        "light": "{colorBackgroundInputDisabled}",
        "dark": "{colorBackgroundInputDisabled}"
      },
      "colorBorderInputFocused": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorBorderItemFocused": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorBorderDropdownItemFocused": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral300}"
      },
      "colorBorderItemPlaceholder": {
        "light": "{colorBorderItemSelected}",
        "dark": "{colorBorderItemSelected}"
      },
      "colorBorderItemSelected": {
        "light": "{colorItemSelected}",
        "dark": "{colorItemSelected}"
      },
      "colorBorderLayout": {
        "light": "{colorNeutral350}",
        "dark": "{colorNeutral650}"
      },
      "colorBorderNotificationStackBar": {
        "light": "{colorNeutral750}",
        "dark": "{colorNeutral750}"
      },
      "colorBorderPanelHeader": {
        "light": "{colorBorderDividerDefault}",
        "dark": "{colorBorderDividerDefault}"
      },
      "colorBorderPopover": {
        "light": "{colorBorderDropdownContainer}",
        "dark": "{colorBorderDropdownContainer}"
      },
      "colorBorderSegmentActive": {
        "light": "{colorBorderSegmentDefault}",
        "dark": "{colorBorderSegmentDefault}"
      },
      "colorBorderSegmentDefault": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral300}"
      },
      "colorBorderSegmentDisabled": {
        "light": "{colorBorderSegmentDefault}",
        "dark": "{colorBorderSegmentDefault}"
      },
      "colorBorderSegmentHover": {
        "light": "{colorBorderSegmentDefault}",
        "dark": "{colorBorderSegmentDefault}"
      },
      "colorBorderStatusError": {
        "light": "{colorError600}",
        "dark": "{colorError400}"
      },
      "colorBorderStatusInfo": {
        "light": "{colorInfo600}",
        "dark": "{colorInfo400}"
      },
      "colorBorderStatusSuccess": {
        "light": "{colorSuccess600}",
        "dark": "{colorSuccess500}"
      },
      "colorBorderStatusWarning": {
        "light": "{colorWarning900}",
        "dark": "{colorWarning500}"
      },
      "colorBorderDialog": {
        "light": "{colorBorderStatusInfo}",
        "dark": "{colorBorderStatusInfo}"
      },
      "colorBorderDividerInteractiveDefault": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral300}"
      },
      "colorBorderTabsDivider": {
        "light": "{colorNeutral350}",
        "dark": "{colorNeutral650}"
      },
      "colorBorderTabsShadow": {
        "light": "{colorGreyTransparent}",
        "dark": "{colorGreyTransparent}"
      },
      "colorBorderTabsUnderline": {
        "light": "{colorTextAccent}",
        "dark": "{colorTextAccent}"
      },
      "colorBorderTilesDisabled": {
        "light": "{colorBackgroundTilesDisabled}",
        "dark": "{colorBackgroundTilesDisabled}"
      },
      "colorBorderTutorial": {
        "light": "{colorNeutral300}",
        "dark": "{colorNeutral650}"
      },
      "colorForegroundControlDefault": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral950}"
      },
      "colorForegroundControlDisabled": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorForegroundControlReadOnly": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral450}"
      },
      "colorShadowDefault": {
        "light": "{colorGreyTransparentHeavy}",
        "dark": "{colorGreyTransparentHeavy}"
      },
      "colorShadowMedium": {
        "light": "{colorGreyTransparent}",
        "dark": "{colorGreyTransparent}"
      },
      "colorShadowSide": {
        "light": "{colorGreyTransparentLight}",
        "dark": "{colorGreyTransparentLight}"
      },
      "colorStrokeChartLine": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral500}"
      },
      "colorStrokeCodeEditorGutterActiveLineDefault": {
        "light": "{colorNeutral300}",
        "dark": "{colorNeutral800}"
      },
      "colorStrokeCodeEditorGutterActiveLineHover": {
        "light": "{colorNeutral100}",
        "dark": "{colorNeutral950}"
      },
      "colorTextAccent": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorTextBodyDefault": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral350}"
      },
      "colorTextBodySecondary": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral350}"
      },
      "colorTextBreadcrumbCurrent": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral500}"
      },
      "colorTextBreadcrumbIcon": {
        "light": "{colorNeutral500}",
        "dark": "{colorTextInteractiveDisabled}"
      },
      "colorTextButtonInlineIconDefault": {
        "light": "{colorTextLinkDefault}",
        "dark": "{colorTextLinkDefault}"
      },
      "colorTextButtonInlineIconDisabled": {
        "light": "{colorTextInteractiveDisabled}",
        "dark": "{colorTextInteractiveDisabled}"
      },
      "colorTextButtonInlineIconHover": {
        "light": "{colorTextLinkHover}",
        "dark": "{colorTextLinkHover}"
      },
      "colorTextButtonNormalActive": {
        "light": "{colorPrimary900}",
        "dark": "{colorPrimary300}"
      },
      "colorTextToggleButtonNormalPressed": {
        "light": "{colorPrimary900}",
        "dark": "{colorPrimary300}"
      },
      "colorTextButtonNormalDefault": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorTextButtonNormalHover": {
        "light": "{colorPrimary900}",
        "dark": "{colorPrimary300}"
      },
      "colorTextLinkButtonNormalDefault": {
        "light": "{colorTextButtonNormalDefault}",
        "dark": "{colorTextButtonNormalDefault}"
      },
      "colorTextLinkButtonNormalHover": {
        "light": "{colorTextButtonNormalHover}",
        "dark": "{colorTextButtonNormalHover}"
      },
      "colorTextLinkButtonNormalActive": {
        "light": "{colorTextButtonNormalActive}",
        "dark": "{colorTextButtonNormalActive}"
      },
      "colorTextButtonLinkActive": {
        "light": "{colorTextButtonNormalActive}",
        "dark": "{colorTextButtonNormalActive}"
      },
      "colorTextButtonLinkDefault": {
        "light": "{colorTextButtonNormalDefault}",
        "dark": "{colorTextButtonNormalDefault}"
      },
      "colorTextButtonLinkDisabled": {
        "light": "{colorTextInteractiveDisabled}",
        "dark": "{colorTextInteractiveDisabled}"
      },
      "colorTextButtonLinkHover": {
        "light": "{colorTextButtonNormalHover}",
        "dark": "{colorTextButtonNormalHover}"
      },
      "colorTextButtonPrimaryActive": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral950}"
      },
      "colorTextButtonPrimaryDefault": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral950}"
      },
      "colorTextButtonPrimaryHover": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral950}"
      },
      "colorTextCalendarDateHover": {
        "light": "{colorTextDropdownItemDefault}",
        "dark": "{colorTextDropdownItemDefault}"
      },
      "colorTextCalendarDateSelected": {
        "light": "{colorBackgroundControlDefault}",
        "dark": "{colorBackgroundControlDefault}"
      },
      "colorTextCalendarMonth": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral450}"
      },
      "colorTextCodeEditorGutterActiveLine": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral950}"
      },
      "colorTextCodeEditorGutterDefault": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral300}"
      },
      "colorTextCodeEditorStatusBarDisabled": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral600}"
      },
      "colorTextCodeEditorTabButtonError": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral950}"
      },
      "colorTextColumnHeader": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral400}"
      },
      "colorTextColumnSortingIcon": {
        "light": "{colorTextColumnHeader}",
        "dark": "{colorTextColumnHeader}"
      },
      "colorTextControlDisabled": {
        "light": "{colorTextInteractiveDisabled}",
        "dark": "{colorTextInteractiveDisabled}"
      },
      "colorTextCounter": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral450}"
      },
      "colorTextDisabled": {
        "light": "{colorNeutral400}",
        "dark": "{colorNeutral600}"
      },
      "colorTextDisabledInlineEdit": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral400}"
      },
      "colorTextDropdownFooter": {
        "light": "{colorTextFormSecondary}",
        "dark": "{colorTextFormSecondary}"
      },
      "colorTextDropdownGroupLabel": {
        "light": "{colorTextGroupLabel}",
        "dark": "{colorTextGroupLabel}"
      },
      "colorTextDropdownItemDefault": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral300}"
      },
      "colorTextDropdownItemDimmed": {
        "light": "{colorTextInteractiveDisabled}",
        "dark": "{colorTextInteractiveDisabled}"
      },
      "colorTextDropdownItemDisabled": {
        "light": "{colorTextInteractiveDisabled}",
        "dark": "{colorTextInteractiveDisabled}"
      },
      "colorTextDropdownItemFilterMatch": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary300}"
      },
      "colorTextDropdownItemHighlighted": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral250}"
      },
      "colorTextDropdownItemSecondary": {
        "light": "{colorTextFormSecondary}",
        "dark": "{colorTextFormSecondary}"
      },
      "colorTextDropdownItemSecondaryHover": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral300}"
      },
      "colorTextEmpty": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral300}"
      },
      "colorTextExpandableSectionDefault": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral300}"
      },
      "colorTextExpandableSectionHover": {
        "light": "{colorTextAccent}",
        "dark": "{colorTextAccent}"
      },
      "colorTextExpandableSectionNavigationIconDefault": {
        "light": "{colorTextInteractiveDefault}",
        "dark": "{colorTextInteractiveDefault}"
      },
      "colorTextFormDefault": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral300}"
      },
      "colorTextFormLabel": {
        "light": "{colorTextFormDefault}",
        "dark": "{colorTextFormDefault}"
      },
      "colorTextFormSecondary": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral450}"
      },
      "colorTextGroupLabel": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral350}"
      },
      "colorTextLabelGenAi": {
        "light": "{colorPurple700}",
        "dark": "{colorPurple400}"
      },
      "colorTextHeadingDefault": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral250}"
      },
      "colorTextHeadingSecondary": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral450}"
      },
      "colorTextHomeHeaderDefault": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral250}"
      },
      "colorTextHomeHeaderSecondary": {
        "light": "{colorNeutral350}",
        "dark": "{colorNeutral350}"
      },
      "colorTextIconCaret": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral450}"
      },
      "colorTextIconSubtle": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral400}"
      },
      "colorTextInputDisabled": {
        "light": "{colorNeutral400}",
        "dark": "{colorNeutral600}"
      },
      "colorTextInputPlaceholder": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral450}"
      },
      "colorTextInputPlaceholderDisabled": {
        "light": "{colorTextInputDisabled}",
        "dark": "{colorTextInputDisabled}"
      },
      "colorTextInteractiveActive": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral100}"
      },
      "colorTextInteractiveDefault": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral300}"
      },
      "colorTextInteractiveDisabled": {
        "light": "{colorNeutral400}",
        "dark": "{colorNeutral600}"
      },
      "colorTextInteractiveHover": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral100}"
      },
      "colorTextToggleButtonIconPressed": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral100}"
      },
      "colorTextInteractiveInvertedDefault": {
        "light": "{colorNeutral300}",
        "dark": "{colorNeutral300}"
      },
      "colorTextInteractiveInvertedHover": {
        "light": "{colorNeutral100}",
        "dark": "{colorNeutral100}"
      },
      "colorTextInverted": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral950}"
      },
      "colorTextLabel": {
        "light": "{colorTextFormLabel}",
        "dark": "{colorTextFormLabel}"
      },
      "colorTextKeyValuePairsValue": {
        "light": "{colorTextBodyDefault}",
        "dark": "{colorTextBodyDefault}"
      },
      "colorTextLayoutToggle": {
        "light": "{colorWhite}",
        "dark": "{colorWhite}"
      },
      "colorTextLayoutToggleActive": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorTextLayoutToggleHover": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorTextLayoutToggleSelected": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral950}"
      },
      "colorTextLinkDefault": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorTextLinkHover": {
        "light": "{colorPrimary900}",
        "dark": "{colorPrimary300}"
      },
      "colorTextLinkDecorationDefault": {
        "light": "currentColor",
        "dark": "currentColor"
      },
      "colorTextLinkDecorationHover": {
        "light": "currentColor",
        "dark": "currentColor"
      },
      "colorTextLinkSecondaryDefault": {
        "light": "{colorTextLinkDefault}",
        "dark": "{colorTextLinkDefault}"
      },
      "colorTextLinkSecondaryHover": {
        "light": "{colorTextLinkHover}",
        "dark": "{colorTextLinkHover}"
      },
      "colorTextLinkInfoDefault": {
        "light": "{colorTextLinkDefault}",
        "dark": "{colorTextLinkDefault}"
      },
      "colorTextLinkInfoHover": {
        "light": "{colorTextLinkHover}",
        "dark": "{colorTextLinkHover}"
      },
      "colorTextLinkInvertedHover": {
        "light": "{colorWhite}",
        "dark": "{colorWhite}"
      },
      "colorTextLinkButtonUnderline": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorTextLinkButtonUnderlineHover": {
        "light": "transparent",
        "dark": "transparent"
      },
      "colorTextNotificationDefault": {
        "light": "{colorNeutral100}",
        "dark": "{colorNeutral100}"
      },
      "colorTextNotificationStackBar": {
        "light": "{colorWhite}",
        "dark": "{colorWhite}"
      },
      "colorTextNotificationYellow": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral950}"
      },
      "colorTextPaginationPageNumberActiveDisabled": {
        "light": "{colorTextInteractiveDisabled}",
        "dark": "{colorTextInteractiveDisabled}"
      },
      "colorTextPaginationPageNumberDefault": {
        "light": "{colorTextInteractiveDefault}",
        "dark": "{colorNeutral400}"
      },
      "colorTextSegmentActive": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral950}"
      },
      "colorTextSegmentDefault": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral300}"
      },
      "colorTextSegmentHover": {
        "light": "{colorTextButtonNormalHover}",
        "dark": "{colorTextButtonNormalHover}"
      },
      "colorTextSmall": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral450}"
      },
      "colorTextStatusError": {
        "light": "{colorError600}",
        "dark": "{colorError400}"
      },
      "colorTextStatusInactive": {
        "light": "{colorNeutral600}",
        "dark": "{colorNeutral450}"
      },
      "colorTextStatusInfo": {
        "light": "{colorInfo600}",
        "dark": "{colorInfo400}"
      },
      "colorTextStatusSuccess": {
        "light": "{colorSuccess600}",
        "dark": "{colorSuccess500}"
      },
      "colorTextStatusWarning": {
        "light": "{colorWarning900}",
        "dark": "{colorWarning500}"
      },
      "colorTextTopNavigationTitle": {
        "light": "{colorNeutral950}",
        "dark": "{colorNeutral100}"
      },
      "colorTextTutorialHotspotDefault": {
        "light": "{colorTextLinkDefault}",
        "dark": "{colorTextLinkDefault}"
      },
      "colorTextTutorialHotspotHover": {
        "light": "{colorTextLinkHover}",
        "dark": "{colorTextLinkHover}"
      },
      "colorBoardPlaceholderActive": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral600}"
      },
      "colorBoardPlaceholderHover": {
        "light": "{colorPrimary100}",
        "dark": "{colorPrimary600}"
      },
      "colorDragPlaceholderActive": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral600}"
      },
      "colorDragPlaceholderHover": {
        "light": "{colorPrimary100}",
        "dark": "{colorPrimary600}"
      },
      "colorDropzoneBackgroundDefault": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorDropzoneBackgroundHover": {
        "light": "{colorPrimary50}",
        "dark": "{colorPrimary1000}"
      },
      "colorDropzoneTextDefault": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral350}"
      },
      "colorDropzoneTextHover": {
        "light": "{colorNeutral650}",
        "dark": "{colorNeutral350}"
      },
      "colorDropzoneBorderDefault": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral600}"
      },
      "colorDropzoneBorderHover": {
        "light": "{colorPrimary900}",
        "dark": "{colorPrimary300}"
      },
      "colorGapGlobalDrawer": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral950}"
      },
      "colorTreeViewConnectorLine": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral300}"
      },
      "colorBackgroundActionCardDefault": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorBackgroundActionCardHover": {
        "light": "{colorPrimary50}",
        "dark": "{colorNeutral800}"
      },
      "colorBackgroundActionCardActive": {
        "light": "{colorPrimary100}",
        "dark": "{colorNeutral700}"
      },
      "colorBorderActionCardDefault": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorBorderActionCardHover": {
        "light": "{colorPrimary900}",
        "dark": "{colorPrimary300}"
      },
      "colorBorderActionCardActive": {
        "light": "{colorPrimary900}",
        "dark": "{colorPrimary300}"
      },
      "colorBorderActionCardDisabled": {
        "light": "{colorNeutral400}",
        "dark": "{colorNeutral600}"
      },
      "colorBackgroundActionCardDisabled": {
        "light": "{colorWhite}",
        "dark": "{colorNeutral850}"
      },
      "colorTextActionCardDisabled": {
        "light": "{colorNeutral500}",
        "dark": "{colorNeutral500}"
      },
      "colorIconActionCardDefault": {
        "light": "{colorPrimary600}",
        "dark": "{colorPrimary400}"
      },
      "colorIconActionCardHover": {
        "light": "{colorPrimary900}",
        "dark": "{colorPrimary300}"
      },
      "colorIconActionCardActive": {
        "light": "{colorPrimary900}",
        "dark": "{colorPrimary300}"
      },
      "colorIconActionCardDisabled": {
        "light": "{colorNeutral400}",
        "dark": "{colorNeutral600}"
      },
      "colorBackgroundSkeleton": {
        "light": "{colorNeutral250}",
        "dark": "{colorNeutral750}"
      },
      "colorBackgroundSkeletonWave": {
        "light": "{colorNeutral150}",
        "dark": "{colorNeutral700}"
      },
      "fontBoxValueLargeWeight": "700",
      "fontButtonLetterSpacing": "0.005em",
      "fontChartDetailSize": "{fontSizeBodyS}",
      "fontDecorationStyleLink": "solid",
      "fontDecorationThicknessLink": "1px",
      "fontDecorationThicknessLinkDisplayL": "2px",
      "fontDisplayLabelWeight": "700",
      "fontExpandableHeadingSize": "{fontSizeHeadingS}",
      "fontFamilyBase": "'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif",
      "fontFamilyDisplay": "{fontFamilyBase}",
      "fontFamilyHeading": "{fontFamilyBase}",
      "fontFamilyMonospace": "Monaco, Menlo, Consolas, 'Courier Prime', Courier, 'Courier New', monospace",
      "fontHeaderH2DescriptionLineHeight": "{lineHeightBodyM}",
      "fontHeaderH2DescriptionSize": "{fontSizeBodyM}",
      "fontLinkButtonLetterSpacing": "{fontButtonLetterSpacing}",
      "fontLinkButtonWeight": "{fontWeightButton}",
      "fontPanelHeaderLineHeight": "{lineHeightHeadingM}",
      "fontPanelHeaderSize": "{fontSizeHeadingM}",
      "fontSizeBodyM": "14px",
      "fontSizeBodyS": "12px",
      "fontSizeDisplayL": "42px",
      "fontSizeFormLabel": "{fontSizeBodyM}",
      "fontSizeHeadingL": "20px",
      "fontSizeHeadingM": "18px",
      "fontSizeHeadingS": "16px",
      "fontSizeHeadingXl": "24px",
      "fontSizeHeadingXs": "14px",
      "fontSizeKeyValuePairsLabel": "{fontSizeBodyM}",
      "fontSizeTabs": "{fontSizeHeadingS}",
      "fontSmoothingMozOsx": "grayscale",
      "fontSmoothingWebkit": "antialiased",
      "fontWayfindingLinkActiveWeight": "700",
      "fontWeightAlertHeader": "700",
      "fontWeightBold": "700",
      "fontWeightBreadcrumbCurrent": "{fontWeightBold}",
      "fontWeightButton": "700",
      "fontWeightDisplayL": "700",
      "fontWeightFlashbarHeader": "700",
      "fontWeightFormLabel": "{fontDisplayLabelWeight}",
      "fontWeightHeadingL": "700",
      "fontWeightHeadingM": "700",
      "fontWeightHeadingS": "700",
      "fontWeightHeadingXl": "700",
      "fontWeightHeadingXs": "700",
      "fontWeightHeavy": "700",
      "fontWeightKeyValuePairsLabel": "{fontDisplayLabelWeight}",
      "fontWeightLighter": "300",
      "fontWeightNormal": "400",
      "fontWeightTabs": "700",
      "fontWeightTabsDisabled": "{fontWayfindingLinkActiveWeight}",
      "letterSpacingBodyS": "0.005em",
      "letterSpacingDisplayL": "-0.03em",
      "letterSpacingHeadingL": "-0.015em",
      "letterSpacingHeadingM": "-0.010em",
      "letterSpacingHeadingS": "-0.005em",
      "letterSpacingHeadingXl": "-0.02em",
      "letterSpacingHeadingXs": "normal",
      "lineHeightBodyM": "20px",
      "lineHeightBodyS": "16px",
      "lineHeightDisplayL": "48px",
      "lineHeightFormLabel": "{lineHeightBodyM}",
      "lineHeightHeadingL": "24px",
      "lineHeightHeadingM": "22px",
      "lineHeightHeadingS": "20px",
      "lineHeightHeadingXl": "30px",
      "lineHeightHeadingXs": "18px",
      "lineHeightKeyValuePairsLabel": "{lineHeightBodyM}",
      "lineHeightTabs": "{lineHeightHeadingS}",
      "borderActiveWidth": "4px",
      "borderCodeEditorStatusDividerWidth": "{borderDividerSectionWidth}",
      "borderContainerStickyWidth": "0px",
      "borderContainerTopWidth": "0px",
      "borderControlFocusRingShadowSpread": "1px",
      "borderControlInvalidFocusRingShadowSpread": "2px",
      "borderDividerListWidth": "1px",
      "borderDividerSectionWidth": "1px",
      "borderDropdownVirtualOffsetWidth": "2px",
      "borderInvalidWidth": "8px",
      "borderItemWidth": "2px",
      "borderLineChartDashArray": "3 5",
      "borderLineChartLineJoin": "round",
      "borderLineChartWidth": "2px",
      "borderLinkFocusRingOutline": "0",
      "borderLinkFocusRingShadowSpread": "2px",
      "borderPanelHeaderWidth": "1px",
      "borderPanelTopWidth": "1px",
      "borderRadiusActionCardDefault": "{borderRadiusCardDefault}",
      "borderRadiusActionCardEmbedded": "{borderRadiusCardEmbedded}",
      "borderRadiusAlert": "{borderRadiusFlashbar}",
      "borderRadiusBadge": "4px",
      "borderRadiusButton": "20px",
      "borderRadiusCalendarDayFocusRing": "3px",
      "borderRadiusCardDefault": "{borderRadiusContainer}",
      "borderRadiusCardEmbedded": "{borderRadiusChatBubble}",
      "borderRadiusChatBubble": "8px",
      "borderRadiusCodeEditor": "{borderRadiusInput}",
      "borderRadiusContainer": "16px",
      "borderRadiusControlCircularFocusRing": "4px",
      "borderRadiusControlDefaultFocusRing": "4px",
      "borderRadiusDropdown": "{borderRadiusItem}",
      "borderRadiusDropzone": "12px",
      "borderRadiusFlashbar": "12px",
      "borderRadiusInput": "8px",
      "borderRadiusItem": "8px",
      "borderRadiusItemCardDefault": "{borderRadiusCardDefault}",
      "borderRadiusItemCardEmbedded": "{borderRadiusCardEmbedded}",
      "borderRadiusPopover": "{borderRadiusInput}",
      "borderRadiusSkeleton": "8px",
      "borderRadiusStatusIndicator": "{borderRadiusBadge}",
      "borderRadiusTabsFocusRing": "20px",
      "borderRadiusTiles": "{borderRadiusInput}",
      "borderRadiusToken": "{borderRadiusInput}",
      "borderRadiusTutorialPanelItem": "{borderRadiusInput}",
      "borderTableStickyWidth": "1px",
      "borderWidthActionCardActive": "{borderWidthCard}",
      "borderWidthActionCardDefault": "{borderWidthCard}",
      "borderWidthActionCardDisabled": "{borderWidthCard}",
      "borderWidthActionCardHover": "{borderWidthCard}",
      "borderWidthAlert": "2px",
      "borderWidthAlertBlockEnd": "{borderWidthAlert}",
      "borderWidthAlertBlockStart": "{borderWidthAlert}",
      "borderWidthAlertInlineEnd": "{borderWidthAlert}",
      "borderWidthAlertInlineStart": "{borderWidthAlert}",
      "borderWidthButton": "2px",
      "borderWidthCard": "{borderDividerSectionWidth}",
      "borderWidthCardSelected": "{borderItemWidth}",
      "borderWidthDropdown": "2px",
      "borderWidthField": "1px",
      "borderWidthIconBig": "3px",
      "borderWidthIconLarge": "4px",
      "borderWidthIconMedium": "2px",
      "borderWidthIconNormal": "2px",
      "borderWidthIconSmall": "2px",
      "borderWidthItemCard": "{borderWidthCard}",
      "borderWidthItemCardHighlighted": "{borderWidthCardSelected}",
      "borderWidthItemSelected": "2px",
      "borderWidthPopover": "2px",
      "borderWidthToken": "2px",
      "motionDurationExtraFast": {
        "default": "45ms",
        "disabled": "0ms"
      },
      "motionDurationExtraSlow": {
        "default": "270ms",
        "disabled": "0ms"
      },
      "motionDurationFast": {
        "default": "90ms",
        "disabled": "0ms"
      },
      "motionDurationModerate": {
        "default": "135ms",
        "disabled": "0ms"
      },
      "motionDurationRefreshOnlyAmbient": {
        "default": "2000ms",
        "disabled": "0ms"
      },
      "motionDurationRefreshOnlyFast": {
        "default": "115ms",
        "disabled": "0ms"
      },
      "motionDurationRefreshOnlyMedium": {
        "default": "165ms",
        "disabled": "0ms"
      },
      "motionDurationRefreshOnlySlow": {
        "default": "250ms",
        "disabled": "0ms"
      },
      "motionDurationAvatarGenAiGradient": {
        "default": "3600ms",
        "disabled": "0ms"
      },
      "motionDurationAvatarLoadingDots": {
        "default": "1200ms",
        "disabled": "0ms"
      },
      "motionDurationRotate180": {
        "default": "{motionDurationModerate}",
        "disabled": "{motionDurationModerate}"
      },
      "motionDurationRotate90": {
        "default": "{motionDurationModerate}",
        "disabled": "{motionDurationModerate}"
      },
      "motionDurationShowPaced": {
        "default": "{motionDurationSlow}",
        "disabled": "{motionDurationSlow}"
      },
      "motionDurationShowQuick": {
        "default": "{motionDurationModerate}",
        "disabled": "{motionDurationModerate}"
      },
      "motionDurationSlow": {
        "default": "180ms",
        "disabled": "0ms"
      },
      "motionDurationTransitionQuick": {
        "default": "{motionDurationFast}",
        "disabled": "{motionDurationFast}"
      },
      "motionDurationTransitionShowPaced": {
        "default": "{motionDurationSlow}",
        "disabled": "{motionDurationSlow}"
      },
      "motionDurationTransitionShowQuick": {
        "default": "{motionDurationFast}",
        "disabled": "{motionDurationFast}"
      },
      "motionEasingEaseOutQuart": {
        "default": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "disabled": "cubic-bezier(0.165, 0.84, 0.44, 1)"
      },
      "motionEasingRefreshOnlyA": {
        "default": "cubic-bezier(0, 0, 0, 1)",
        "disabled": "cubic-bezier(0, 0, 0, 1)"
      },
      "motionEasingRefreshOnlyB": {
        "default": "cubic-bezier(1, 0, 0.83, 1)",
        "disabled": "cubic-bezier(1, 0, 0.83, 1)"
      },
      "motionEasingRefreshOnlyC": {
        "default": "cubic-bezier(0.84, 0, 0.16, 1)",
        "disabled": "cubic-bezier(0.84, 0, 0.16, 1)"
      },
      "motionEasingRefreshOnlyD": {
        "default": "cubic-bezier(0.33, 0, 0.67, 1)",
        "disabled": "cubic-bezier(0.33, 0, 0.67, 1)"
      },
      "motionEasingAvatarGenAiGradient": {
        "default": "cubic-bezier(0.7, 0, 0.3, 1)",
        "disabled": "cubic-bezier(0.7, 0, 0.3, 1)"
      },
      "motionEasingRotate180": {
        "default": "{motionEasingEaseOutQuart}",
        "disabled": "{motionEasingEaseOutQuart}"
      },
      "motionEasingRotate90": {
        "default": "{motionEasingEaseOutQuart}",
        "disabled": "{motionEasingEaseOutQuart}"
      },
      "motionEasingShowPaced": {
        "default": "ease-out",
        "disabled": "ease-out"
      },
      "motionEasingShowQuick": {
        "default": "ease-out",
        "disabled": "ease-out"
      },
      "motionEasingTransitionQuick": {
        "default": "linear",
        "disabled": "linear"
      },
      "motionEasingTransitionShowPaced": {
        "default": "ease-out",
        "disabled": "ease-out"
      },
      "motionEasingTransitionShowQuick": {
        "default": "linear",
        "disabled": "linear"
      },
      "motionEasingResponsive": {
        "default": "{motionEasingRefreshOnlyA}",
        "disabled": "{motionEasingRefreshOnlyA}"
      },
      "motionEasingSticky": {
        "default": "{motionEasingRefreshOnlyB}",
        "disabled": "{motionEasingRefreshOnlyB}"
      },
      "motionEasingExpressive": {
        "default": "{motionEasingRefreshOnlyC}",
        "disabled": "{motionEasingRefreshOnlyC}"
      },
      "motionDurationResponsive": {
        "default": "{motionDurationRefreshOnlyFast}",
        "disabled": "{motionDurationRefreshOnlyFast}"
      },
      "motionDurationExpressive": {
        "default": "{motionDurationRefreshOnlyMedium}",
        "disabled": "{motionDurationRefreshOnlyMedium}"
      },
      "motionDurationComplex": {
        "default": "{motionDurationRefreshOnlySlow}",
        "disabled": "{motionDurationRefreshOnlySlow}"
      },
      "motionKeyframesFadeIn": {
        "default": "awsui-fade-in-35003c",
        "disabled": "awsui-fade-in-35003c"
      },
      "motionKeyframesFadeOut": {
        "default": "awsui-fade-out-35003c",
        "disabled": "awsui-fade-out-35003c"
      },
      "motionKeyframesStatusIconError": {
        "default": "awsui-status-icon-error-35003c",
        "disabled": "awsui-status-icon-error-35003c"
      },
      "motionKeyframesScalePopup": {
        "default": "awsui-scale-popup-35003c",
        "disabled": "awsui-scale-popup-35003c"
      },
      "sizeCalendarGridWidth": {
        "comfortable": "238px",
        "compact": "238px"
      },
      "sizeControl": {
        "comfortable": "16px",
        "compact": "16px"
      },
      "sizeIconBig": {
        "comfortable": "32px",
        "compact": "32px"
      },
      "sizeIconLarge": {
        "comfortable": "48px",
        "compact": "48px"
      },
      "sizeIconMedium": {
        "comfortable": "20px",
        "compact": "20px"
      },
      "sizeIconNormal": {
        "comfortable": "16px",
        "compact": "16px"
      },
      "sizeTableSelectionHorizontal": {
        "comfortable": "40px",
        "compact": "40px"
      },
      "sizeVerticalInput": {
        "comfortable": "32px",
        "compact": "28px"
      },
      "sizeVerticalPanelIconOffset": {
        "comfortable": "15px",
        "compact": "13px"
      },
      "spaceAlertActionLeft": {
        "comfortable": "{spaceS}",
        "compact": "{spaceS}"
      },
      "spaceAlertHorizontal": {
        "comfortable": "{spaceFlashbarHorizontal}",
        "compact": "{spaceFlashbarHorizontal}"
      },
      "spaceAlertMessageRight": {
        "comfortable": "{spaceXxs}",
        "compact": "{spaceXxs}"
      },
      "spaceAlertVertical": {
        "comfortable": "{spaceFlashbarVertical}",
        "compact": "{spaceFlashbarVertical}"
      },
      "spaceButtonFocusOutlineGutter": {
        "comfortable": "4px",
        "compact": "4px"
      },
      "spaceButtonHorizontal": {
        "comfortable": "{spaceScaledL}",
        "compact": "{spaceScaledL}"
      },
      "spaceButtonVertical": {
        "comfortable": "{spaceScaledXxs}",
        "compact": "{spaceScaledXxs}"
      },
      "spaceTokenVertical": {
        "comfortable": "{spaceScaledXxs}",
        "compact": "{spaceScaledXxs}"
      },
      "spaceFieldVertical": {
        "comfortable": "5px",
        "compact": "3px"
      },
      "spaceButtonIconFocusOutlineGutterVertical": {
        "comfortable": "0px",
        "compact": "0px"
      },
      "spaceButtonIconOnlyHorizontal": {
        "comfortable": "6px",
        "compact": "{spaceXxs}"
      },
      "spaceButtonInlineIconFocusOutlineGutter": {
        "comfortable": "0px",
        "compact": "0px"
      },
      "spaceButtonModalDismissVertical": {
        "comfortable": "{spaceScaledXxxs}",
        "compact": "{spaceScaledXxxs}"
      },
      "spaceCalendarGridFocusOutlineGutter": {
        "comfortable": "-5px",
        "compact": "-5px"
      },
      "spaceCalendarGridSelectedFocusOutlineGutter": {
        "comfortable": "{spaceCalendarGridFocusOutlineGutter}",
        "compact": "{spaceCalendarGridFocusOutlineGutter}"
      },
      "spaceCalendarGridGutter": {
        "comfortable": "6px",
        "compact": "6px"
      },
      "spaceCardHorizontalDefault": {
        "comfortable": "{spaceContainerHorizontal}",
        "compact": "{spaceContainerHorizontal}"
      },
      "spaceCardHorizontalEmbedded": {
        "comfortable": "{spaceS}",
        "compact": "10px"
      },
      "spaceCardVerticalDefault": {
        "comfortable": "{spaceScaledM}",
        "compact": "{spaceScaledM}"
      },
      "spaceCardVerticalEmbedded": {
        "comfortable": "10px",
        "compact": "{spaceXs}"
      },
      "spaceItemCardHorizontalDefault": {
        "comfortable": "{spaceCardHorizontalDefault}",
        "compact": "{spaceCardHorizontalDefault}"
      },
      "spaceItemCardHorizontalEmbedded": {
        "comfortable": "{spaceCardHorizontalEmbedded}",
        "compact": "{spaceCardHorizontalEmbedded}"
      },
      "spaceItemCardVerticalDefault": {
        "comfortable": "{spaceCardVerticalDefault}",
        "compact": "{spaceCardVerticalDefault}"
      },
      "spaceItemCardVerticalEmbedded": {
        "comfortable": "{spaceCardVerticalEmbedded}",
        "compact": "{spaceCardVerticalEmbedded}"
      },
      "spaceCodeEditorStatusFocusOutlineGutter": {
        "comfortable": "-7px",
        "compact": "-7px"
      },
      "spaceContainerContentTop": {
        "comfortable": "{spaceXxs}",
        "compact": "{spaceXxs}"
      },
      "spaceContainerHeaderTop": {
        "comfortable": "{spaceS}",
        "compact": "{spaceS}"
      },
      "spaceContainerHeaderBottom": {
        "comfortable": "{spaceScaledXs}",
        "compact": "{spaceScaledXs}"
      },
      "spaceContainerHorizontal": {
        "comfortable": "{spaceL}",
        "compact": "{spaceL}"
      },
      "spaceContentHeaderPaddingBottom": {
        "comfortable": "{spaceScaledM}",
        "compact": "{spaceScaledM}"
      },
      "spaceDarkHeaderOverlapDistance": {
        "comfortable": "36px",
        "compact": "32px"
      },
      "spaceExpandableSectionIconOffsetTop": {
        "comfortable": "{spaceScaled2xXxs}",
        "compact": "{spaceScaled2xXxs}"
      },
      "spaceFieldHorizontal": {
        "comfortable": "{spaceS}",
        "compact": "{spaceS}"
      },
      "spaceFieldIconOffset": {
        "comfortable": "36px",
        "compact": "36px"
      },
      "spaceFilteringTokenDismissButtonFocusOutlineGutter": {
        "comfortable": "-5px",
        "compact": "-5px"
      },
      "spaceFilteringTokenOperationSelectFocusOutlineGutter": {
        "comfortable": "-5px",
        "compact": "-5px"
      },
      "spaceFlashbarActionLeft": {
        "comfortable": "{spaceS}",
        "compact": "{spaceS}"
      },
      "spaceFlashbarDismissRight": {
        "comfortable": "0px",
        "compact": "0px"
      },
      "spaceFlashbarHorizontal": {
        "comfortable": "{spaceM}",
        "compact": "{spaceM}"
      },
      "spaceFlashbarVertical": {
        "comfortable": "{spaceScaledXs}",
        "compact": "{spaceScaledXs}"
      },
      "spaceGridGutter": {
        "comfortable": "{spaceL}",
        "compact": "{spaceM}"
      },
      "spaceKeyValueGap": {
        "comfortable": "0px",
        "compact": "0px"
      },
      "spaceLayoutContentBottom": {
        "comfortable": "{spaceScaled2xXxxl}",
        "compact": "{spaceScaled2xXxxl}"
      },
      "spaceLayoutContentHorizontal": {
        "comfortable": "{spaceScaled2xXl}",
        "compact": "{spaceScaled2xXl}"
      },
      "spaceLayoutToggleDiameter": {
        "comfortable": "36px",
        "compact": "36px"
      },
      "spaceLayoutTogglePadding": {
        "comfortable": "{spaceStaticS}",
        "compact": "{spaceStaticS}"
      },
      "spaceModalContentBottom": {
        "comfortable": "{spaceScaled2xM}",
        "compact": "{spaceScaled2xM}"
      },
      "spaceModalHorizontal": {
        "comfortable": "{spaceContainerHorizontal}",
        "compact": "{spaceContainerHorizontal}"
      },
      "spacePanelContentBottom": {
        "comfortable": "{spaceScaledXxxl}",
        "compact": "{spaceScaledXxxl}"
      },
      "spacePanelContentTop": {
        "comfortable": "{spaceScaledL}",
        "compact": "{spaceScaledL}"
      },
      "spacePanelDividerMarginHorizontal": {
        "comfortable": "{spaceXs}",
        "compact": "{spaceXs}"
      },
      "spacePanelHeaderVertical": {
        "comfortable": "{spaceScaledL}",
        "compact": "{spaceScaledL}"
      },
      "spacePanelNavLeft": {
        "comfortable": "28px",
        "compact": "28px"
      },
      "spacePanelSideLeft": {
        "comfortable": "28px",
        "compact": "28px"
      },
      "spacePanelSideRight": {
        "comfortable": "{spaceScaledXl}",
        "compact": "{spaceScaledXl}"
      },
      "spacePanelSplitTop": {
        "comfortable": "{spaceScaledL}",
        "compact": "{spaceScaledL}"
      },
      "spacePanelSplitBottom": {
        "comfortable": "{spaceScaledL}",
        "compact": "{spaceScaledL}"
      },
      "spaceSegmentedControlFocusOutlineGutter": {
        "comfortable": "6px",
        "compact": "6px"
      },
      "spaceTabsContentTop": {
        "comfortable": "{spaceScaledS}",
        "compact": "{spaceScaledS}"
      },
      "spaceTabsFocusOutlineGutter": {
        "comfortable": "-8px",
        "compact": "-8px"
      },
      "spaceTabsVertical": {
        "comfortable": "{spaceScaledXxs}",
        "compact": "{spaceScaledXxs}"
      },
      "spaceTableContentBottom": {
        "comfortable": "{spaceXxs}",
        "compact": "{spaceXxs}"
      },
      "spaceTableEmbeddedHeaderTop": {
        "comfortable": "0px",
        "compact": "0px"
      },
      "spaceTableFooterHorizontal": {
        "comfortable": "{spaceTableHeaderHorizontal}",
        "compact": "{spaceTableHeaderHorizontal}"
      },
      "spaceTableHeaderFocusOutlineGutter": {
        "comfortable": "0px",
        "compact": "-1px"
      },
      "spaceTableHeaderHorizontal": {
        "comfortable": "0px",
        "compact": "0px"
      },
      "spaceTableHeaderToolsBottom": {
        "comfortable": "0px",
        "compact": "0px"
      },
      "spaceTableHeaderToolsFullPageBottom": {
        "comfortable": "4px",
        "compact": "4px"
      },
      "spaceTableHorizontal": {
        "comfortable": "{spaceContainerHorizontal}",
        "compact": "{spaceContainerHorizontal}"
      },
      "spaceTreeViewIndentation": {
        "comfortable": "{spaceXl}",
        "compact": "{spaceXl}"
      },
      "spaceTileGutter": {
        "comfortable": "{spaceXl}",
        "compact": "{spaceM}"
      },
      "spaceActionCardHorizontalDefault": {
        "comfortable": "{spaceCardHorizontalDefault}",
        "compact": "{spaceCardHorizontalDefault}"
      },
      "spaceActionCardHorizontalEmbedded": {
        "comfortable": "{spaceCardHorizontalEmbedded}",
        "compact": "{spaceCardHorizontalEmbedded}"
      },
      "spaceActionCardVerticalDefault": {
        "comfortable": "{spaceCardVerticalDefault}",
        "compact": "{spaceCardVerticalDefault}"
      },
      "spaceActionCardVerticalEmbedded": {
        "comfortable": "{spaceCardVerticalEmbedded}",
        "compact": "{spaceCardVerticalEmbedded}"
      },
      "spaceActionCardDescriptionPaddingTop": {
        "comfortable": "{spaceScaledXxs}",
        "compact": "{spaceScaledXxs}"
      },
      "spaceActionCardContentPaddingTop": {
        "comfortable": "{spaceScaledXs}",
        "compact": "{spaceScaledXs}"
      },
      "spaceOptionPaddingVertical": {
        "comfortable": "{spaceXxs}",
        "compact": "{spaceXxs}"
      },
      "spaceOptionPaddingHorizontal": {
        "comfortable": "{spaceL}",
        "compact": "{spaceL}"
      },
      "spaceStatusIndicatorPaddingHorizontal": {
        "comfortable": "{spaceNone}",
        "compact": "{spaceNone}"
      },
      "spaceScaled2xNone": {
        "comfortable": "{spaceNone}",
        "compact": "{spaceNone}"
      },
      "spaceScaled2xXxxs": {
        "comfortable": "{spaceXxxs}",
        "compact": "{spaceNone}"
      },
      "spaceScaled2xXxs": {
        "comfortable": "{spaceXxs}",
        "compact": "{spaceNone}"
      },
      "spaceScaled2xXs": {
        "comfortable": "{spaceXs}",
        "compact": "{spaceNone}"
      },
      "spaceScaled2xS": {
        "comfortable": "{spaceS}",
        "compact": "{spaceXxs}"
      },
      "spaceScaled2xM": {
        "comfortable": "{spaceM}",
        "compact": "{spaceXs}"
      },
      "spaceScaled2xL": {
        "comfortable": "{spaceL}",
        "compact": "{spaceS}"
      },
      "spaceScaled2xXl": {
        "comfortable": "{spaceXl}",
        "compact": "{spaceM}"
      },
      "spaceScaled2xXxl": {
        "comfortable": "{spaceXxl}",
        "compact": "{spaceL}"
      },
      "spaceScaled2xXxxl": {
        "comfortable": "{spaceXxxl}",
        "compact": "{spaceXl}"
      },
      "spaceScaledNone": {
        "comfortable": "{spaceNone}",
        "compact": "{spaceNone}"
      },
      "spaceScaledXxxs": {
        "comfortable": "{spaceXxxs}",
        "compact": "{spaceNone}"
      },
      "spaceScaledXxs": {
        "comfortable": "{spaceXxs}",
        "compact": "{spaceXxxs}"
      },
      "spaceScaledXs": {
        "comfortable": "{spaceXs}",
        "compact": "{spaceXxs}"
      },
      "spaceScaledS": {
        "comfortable": "{spaceS}",
        "compact": "{spaceXs}"
      },
      "spaceScaledM": {
        "comfortable": "{spaceM}",
        "compact": "{spaceS}"
      },
      "spaceScaledL": {
        "comfortable": "{spaceL}",
        "compact": "{spaceM}"
      },
      "spaceScaledXl": {
        "comfortable": "{spaceXl}",
        "compact": "{spaceL}"
      },
      "spaceScaledXxl": {
        "comfortable": "{spaceXxl}",
        "compact": "{spaceXl}"
      },
      "spaceScaledXxxl": {
        "comfortable": "{spaceXxxl}",
        "compact": "{spaceXxl}"
      },
      "spaceStaticXxxs": {
        "comfortable": "{spaceXxxs}",
        "compact": "{spaceXxxs}"
      },
      "spaceStaticXxs": {
        "comfortable": "{spaceXxs}",
        "compact": "{spaceXxs}"
      },
      "spaceStaticXs": {
        "comfortable": "{spaceXs}",
        "compact": "{spaceXs}"
      },
      "spaceStaticS": {
        "comfortable": "{spaceS}",
        "compact": "{spaceS}"
      },
      "spaceStaticM": {
        "comfortable": "{spaceM}",
        "compact": "{spaceM}"
      },
      "spaceStaticL": {
        "comfortable": "{spaceL}",
        "compact": "{spaceL}"
      },
      "spaceStaticXl": {
        "comfortable": "{spaceXl}",
        "compact": "{spaceXl}"
      },
      "spaceStaticXxl": {
        "comfortable": "{spaceXxl}",
        "compact": "{spaceXxl}"
      },
      "spaceStaticXxxl": {
        "comfortable": "{spaceXxxl}",
        "compact": "{spaceXxxl}"
      },
      "spaceNone": {
        "comfortable": "0px",
        "compact": "0px"
      },
      "spaceXxxs": {
        "comfortable": "2px",
        "compact": "2px"
      },
      "spaceXxs": {
        "comfortable": "4px",
        "compact": "4px"
      },
      "spaceXs": {
        "comfortable": "8px",
        "compact": "8px"
      },
      "spaceS": {
        "comfortable": "12px",
        "compact": "12px"
      },
      "spaceM": {
        "comfortable": "16px",
        "compact": "16px"
      },
      "spaceL": {
        "comfortable": "20px",
        "compact": "20px"
      },
      "spaceXl": {
        "comfortable": "24px",
        "compact": "24px"
      },
      "spaceXxl": {
        "comfortable": "32px",
        "compact": "32px"
      },
      "spaceXxxl": {
        "comfortable": "40px",
        "compact": "40px"
      },
      "shadowCard": {
        "light": "none",
        "dark": "none"
      },
      "shadowItemCard": {
        "light": "{shadowCard}",
        "dark": "{shadowCard}"
      },
      "shadowContainer": {
        "light": "0px 0px 1px 1px #e9ebed, 0px 1px 8px 2px rgba(0, 7, 22, 0.12)",
        "dark": "0px 1px 8px 2px rgba(0, 7, 22, 0.6)"
      },
      "shadowContainerActive": {
        "light": "0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a",
        "dark": "0px 1px 1px 1px #192534, 0px 6px 36px #00040c"
      },
      "shadowDropdown": {
        "light": "0px 4px 20px 1px rgba(0, 7, 22, 0.10)",
        "dark": "0px 4px 20px 1px rgba(0, 4, 12, 1)"
      },
      "shadowDropup": {
        "light": "{shadowDropdown}",
        "dark": "{shadowDropdown}"
      },
      "shadowFlashCollapsed": {
        "light": "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "dark": "0px 4px 4px rgba(0, 0, 0, 0.25)"
      },
      "shadowFlashSticky": {
        "light": "0px 4px 8px rgba(0, 7, 22, 0.10)",
        "dark": "0px 4px 8px rgba(0, 7, 22, 0.5)"
      },
      "shadowModal": {
        "light": "{shadowDropdown}",
        "dark": "{shadowDropdown}"
      },
      "shadowPanel": {
        "light": "0px 0px 0px 1px #b6bec9",
        "dark": "0px 0px 0px 1px #414d5c"
      },
      "shadowPanelToggle": {
        "light": "0px 6px 12px 1px rgba(0, 7, 22, 0.12)",
        "dark": "0px 6px 12px 1px rgba(0, 7, 22, 1)"
      },
      "shadowPopover": {
        "light": "{shadowDropdown}",
        "dark": "{shadowDropdown}"
      },
      "shadowSplitBottom": {
        "light": "0px -36px 36px -36px rgba(0, 7, 22, 0.10)",
        "dark": "0px -36px 36px -36px rgba(0, 7, 22, 1)"
      },
      "shadowSplitSide": {
        "light": "-1px 0px 1px 0px #e9ebed, -36px 6px 36px -36px rgba(0, 7, 22, 0.10)",
        "dark": "-1px 0px 1px 0px #192534, -36px 6px 36px -36px rgba(0, 7, 22, 1)"
      },
      "shadowSticky": {
        "light": "0px 4px 8px 1px rgba(0, 7, 22, 0.10)",
        "dark": "0px 4px 8px 1px rgba(0, 7, 22, 0.5)"
      },
      "shadowStickyEmbedded": {
        "light": "0px 2px 0px 0px #e9ebed, 0px 16px 16px -12px rgba(0, 7, 22, 0.10)",
        "dark": "0px 2px 0px 0px #414d5c, 0px 16px 16px -12px rgba(0, 7, 22, 1)"
      },
      "shadowStickyColumnFirst": {
        "light": "4px 0px 8px 1px rgba(0, 7, 22, 0.1)",
        "dark": "0px 4px 8px 1px rgba(0, 7, 22, 0.5)"
      },
      "shadowStickyColumnLast": {
        "light": "-4px 0 8px 1px rgba(0, 28, 36, 0.1)",
        "dark": "0px 4px 8px 1px rgba(0, 7, 22, 0.5)"
      }
    },
    "contexts": {
      "compact-table": {
        "id": "compact-table",
        "selector": ".awsui-context-compact-table",
        "tokens": {
          "spaceAlertActionLeft": {
            "comfortable": "{spaceS}",
            "compact": "{spaceS}"
          },
          "spaceAlertHorizontal": {
            "comfortable": "{spaceFlashbarHorizontal}",
            "compact": "{spaceFlashbarHorizontal}"
          },
          "spaceAlertMessageRight": {
            "comfortable": "{spaceXxs}",
            "compact": "{spaceXxs}"
          },
          "spaceAlertVertical": {
            "comfortable": "{spaceFlashbarVertical}",
            "compact": "{spaceFlashbarVertical}"
          },
          "spaceButtonFocusOutlineGutter": {
            "comfortable": "4px",
            "compact": "4px"
          },
          "spaceButtonHorizontal": {
            "comfortable": "{spaceScaledL}",
            "compact": "{spaceScaledL}"
          },
          "spaceButtonVertical": {
            "comfortable": "{spaceScaledXxs}",
            "compact": "{spaceScaledXxs}"
          },
          "spaceTokenVertical": {
            "comfortable": "{spaceScaledXxs}",
            "compact": "{spaceScaledXxs}"
          },
          "spaceFieldVertical": {
            "comfortable": "5px",
            "compact": "3px"
          },
          "spaceButtonIconFocusOutlineGutterVertical": {
            "comfortable": "0px",
            "compact": "0px"
          },
          "spaceButtonIconOnlyHorizontal": {
            "comfortable": "6px",
            "compact": "{spaceXxs}"
          },
          "spaceButtonInlineIconFocusOutlineGutter": {
            "comfortable": "0px",
            "compact": "0px"
          },
          "spaceButtonModalDismissVertical": {
            "comfortable": "{spaceScaledXxxs}",
            "compact": "{spaceScaledXxxs}"
          },
          "spaceCalendarGridFocusOutlineGutter": {
            "comfortable": "-5px",
            "compact": "-5px"
          },
          "spaceCalendarGridSelectedFocusOutlineGutter": {
            "comfortable": "{spaceCalendarGridFocusOutlineGutter}",
            "compact": "{spaceCalendarGridFocusOutlineGutter}"
          },
          "spaceCalendarGridGutter": {
            "comfortable": "6px",
            "compact": "6px"
          },
          "spaceCardHorizontalDefault": {
            "comfortable": "{spaceContainerHorizontal}",
            "compact": "{spaceContainerHorizontal}"
          },
          "spaceCardHorizontalEmbedded": {
            "comfortable": "{spaceS}",
            "compact": "10px"
          },
          "spaceCardVerticalDefault": {
            "comfortable": "{spaceScaledM}",
            "compact": "{spaceScaledM}"
          },
          "spaceCardVerticalEmbedded": {
            "comfortable": "10px",
            "compact": "{spaceXs}"
          },
          "spaceItemCardHorizontalDefault": {
            "comfortable": "{spaceCardHorizontalDefault}",
            "compact": "{spaceCardHorizontalDefault}"
          },
          "spaceItemCardHorizontalEmbedded": {
            "comfortable": "{spaceCardHorizontalEmbedded}",
            "compact": "{spaceCardHorizontalEmbedded}"
          },
          "spaceItemCardVerticalDefault": {
            "comfortable": "{spaceCardVerticalDefault}",
            "compact": "{spaceCardVerticalDefault}"
          },
          "spaceItemCardVerticalEmbedded": {
            "comfortable": "{spaceCardVerticalEmbedded}",
            "compact": "{spaceCardVerticalEmbedded}"
          },
          "spaceCodeEditorStatusFocusOutlineGutter": {
            "comfortable": "-7px",
            "compact": "-7px"
          },
          "spaceContainerContentTop": {
            "comfortable": "{spaceXxs}",
            "compact": "{spaceXxs}"
          },
          "spaceContainerHeaderTop": {
            "comfortable": "{spaceS}",
            "compact": "{spaceS}"
          },
          "spaceContainerHeaderBottom": {
            "comfortable": "{spaceScaledXs}",
            "compact": "{spaceScaledXs}"
          },
          "spaceContainerHorizontal": {
            "comfortable": "{spaceL}",
            "compact": "{spaceL}"
          },
          "spaceContentHeaderPaddingBottom": {
            "comfortable": "{spaceScaledM}",
            "compact": "{spaceScaledM}"
          },
          "spaceDarkHeaderOverlapDistance": {
            "comfortable": "36px",
            "compact": "32px"
          },
          "spaceExpandableSectionIconOffsetTop": {
            "comfortable": "{spaceScaled2xXxs}",
            "compact": "{spaceScaled2xXxs}"
          },
          "spaceFieldHorizontal": {
            "comfortable": "{spaceS}",
            "compact": "{spaceS}"
          },
          "spaceFieldIconOffset": {
            "comfortable": "36px",
            "compact": "36px"
          },
          "spaceFilteringTokenDismissButtonFocusOutlineGutter": {
            "comfortable": "-5px",
            "compact": "-5px"
          },
          "spaceFilteringTokenOperationSelectFocusOutlineGutter": {
            "comfortable": "-5px",
            "compact": "-5px"
          },
          "spaceFlashbarActionLeft": {
            "comfortable": "{spaceS}",
            "compact": "{spaceS}"
          },
          "spaceFlashbarDismissRight": {
            "comfortable": "0px",
            "compact": "0px"
          },
          "spaceFlashbarHorizontal": {
            "comfortable": "{spaceM}",
            "compact": "{spaceM}"
          },
          "spaceFlashbarVertical": {
            "comfortable": "{spaceScaledXs}",
            "compact": "{spaceScaledXs}"
          },
          "spaceGridGutter": {
            "comfortable": "{spaceL}",
            "compact": "{spaceM}"
          },
          "spaceKeyValueGap": {
            "comfortable": "0px",
            "compact": "0px"
          },
          "spaceLayoutContentBottom": {
            "comfortable": "{spaceScaled2xXxxl}",
            "compact": "{spaceScaled2xXxxl}"
          },
          "spaceLayoutContentHorizontal": {
            "comfortable": "{spaceScaled2xXl}",
            "compact": "{spaceScaled2xXl}"
          },
          "spaceLayoutToggleDiameter": {
            "comfortable": "36px",
            "compact": "36px"
          },
          "spaceLayoutTogglePadding": {
            "comfortable": "{spaceStaticS}",
            "compact": "{spaceStaticS}"
          },
          "spaceModalContentBottom": {
            "comfortable": "{spaceScaled2xM}",
            "compact": "{spaceScaled2xM}"
          },
          "spaceModalHorizontal": {
            "comfortable": "{spaceContainerHorizontal}",
            "compact": "{spaceContainerHorizontal}"
          },
          "spacePanelContentBottom": {
            "comfortable": "{spaceScaledXxxl}",
            "compact": "{spaceScaledXxxl}"
          },
          "spacePanelContentTop": {
            "comfortable": "{spaceScaledL}",
            "compact": "{spaceScaledL}"
          },
          "spacePanelDividerMarginHorizontal": {
            "comfortable": "{spaceXs}",
            "compact": "{spaceXs}"
          },
          "spacePanelHeaderVertical": {
            "comfortable": "{spaceScaledL}",
            "compact": "{spaceScaledL}"
          },
          "spacePanelNavLeft": {
            "comfortable": "28px",
            "compact": "28px"
          },
          "spacePanelSideLeft": {
            "comfortable": "28px",
            "compact": "28px"
          },
          "spacePanelSideRight": {
            "comfortable": "{spaceScaledXl}",
            "compact": "{spaceScaledXl}"
          },
          "spacePanelSplitTop": {
            "comfortable": "{spaceScaledL}",
            "compact": "{spaceScaledL}"
          },
          "spacePanelSplitBottom": {
            "comfortable": "{spaceScaledL}",
            "compact": "{spaceScaledL}"
          },
          "spaceSegmentedControlFocusOutlineGutter": {
            "comfortable": "6px",
            "compact": "6px"
          },
          "spaceTabsContentTop": {
            "comfortable": "{spaceScaledS}",
            "compact": "{spaceScaledS}"
          },
          "spaceTabsFocusOutlineGutter": {
            "comfortable": "-8px",
            "compact": "-8px"
          },
          "spaceTabsVertical": {
            "comfortable": "{spaceScaledXxs}",
            "compact": "{spaceScaledXxs}"
          },
          "spaceTableContentBottom": {
            "comfortable": "{spaceXxs}",
            "compact": "{spaceXxs}"
          },
          "spaceTableEmbeddedHeaderTop": {
            "comfortable": "0px",
            "compact": "0px"
          },
          "spaceTableFooterHorizontal": {
            "comfortable": "{spaceTableHeaderHorizontal}",
            "compact": "{spaceTableHeaderHorizontal}"
          },
          "spaceTableHeaderFocusOutlineGutter": {
            "comfortable": "0px",
            "compact": "-1px"
          },
          "spaceTableHeaderHorizontal": {
            "comfortable": "0px",
            "compact": "0px"
          },
          "spaceTableHeaderToolsBottom": {
            "comfortable": "0px",
            "compact": "0px"
          },
          "spaceTableHeaderToolsFullPageBottom": {
            "comfortable": "4px",
            "compact": "4px"
          },
          "spaceTableHorizontal": {
            "comfortable": "{spaceContainerHorizontal}",
            "compact": "{spaceContainerHorizontal}"
          },
          "spaceTreeViewIndentation": {
            "comfortable": "{spaceXl}",
            "compact": "{spaceXl}"
          },
          "spaceTileGutter": {
            "comfortable": "{spaceXl}",
            "compact": "{spaceM}"
          },
          "spaceActionCardHorizontalDefault": {
            "comfortable": "{spaceCardHorizontalDefault}",
            "compact": "{spaceCardHorizontalDefault}"
          },
          "spaceActionCardHorizontalEmbedded": {
            "comfortable": "{spaceCardHorizontalEmbedded}",
            "compact": "{spaceCardHorizontalEmbedded}"
          },
          "spaceActionCardVerticalDefault": {
            "comfortable": "{spaceCardVerticalDefault}",
            "compact": "{spaceCardVerticalDefault}"
          },
          "spaceActionCardVerticalEmbedded": {
            "comfortable": "{spaceCardVerticalEmbedded}",
            "compact": "{spaceCardVerticalEmbedded}"
          },
          "spaceActionCardDescriptionPaddingTop": {
            "comfortable": "{spaceScaledXxs}",
            "compact": "{spaceScaledXxs}"
          },
          "spaceActionCardContentPaddingTop": {
            "comfortable": "{spaceScaledXs}",
            "compact": "{spaceScaledXs}"
          },
          "spaceOptionPaddingVertical": {
            "comfortable": "{spaceXxs}",
            "compact": "{spaceXxs}"
          },
          "spaceOptionPaddingHorizontal": {
            "comfortable": "{spaceL}",
            "compact": "{spaceL}"
          },
          "spaceStatusIndicatorPaddingHorizontal": {
            "comfortable": "{spaceNone}",
            "compact": "{spaceNone}"
          },
          "spaceScaled2xNone": {
            "comfortable": "{spaceNone}",
            "compact": "{spaceNone}"
          },
          "spaceScaled2xXxxs": {
            "comfortable": "{spaceXxxs}",
            "compact": "{spaceNone}"
          },
          "spaceScaled2xXxs": {
            "comfortable": "{spaceXxs}",
            "compact": "{spaceNone}"
          },
          "spaceScaled2xXs": {
            "comfortable": "{spaceXs}",
            "compact": "{spaceNone}"
          },
          "spaceScaled2xS": {
            "comfortable": "{spaceS}",
            "compact": "{spaceXxs}"
          },
          "spaceScaled2xM": {
            "comfortable": "{spaceM}",
            "compact": "{spaceXs}"
          },
          "spaceScaled2xL": {
            "comfortable": "{spaceL}",
            "compact": "{spaceS}"
          },
          "spaceScaled2xXl": {
            "comfortable": "{spaceXl}",
            "compact": "{spaceM}"
          },
          "spaceScaled2xXxl": {
            "comfortable": "{spaceXxl}",
            "compact": "{spaceL}"
          },
          "spaceScaled2xXxxl": {
            "comfortable": "{spaceXxxl}",
            "compact": "{spaceXl}"
          },
          "spaceScaledNone": {
            "comfortable": "{spaceNone}",
            "compact": "{spaceNone}"
          },
          "spaceScaledXxxs": {
            "comfortable": "{spaceNone}",
            "compact": "{spaceNone}"
          },
          "spaceScaledXxs": {
            "comfortable": "{spaceXxxs}",
            "compact": "{spaceXxxs}"
          },
          "spaceScaledXs": {
            "comfortable": "{spaceXxs}",
            "compact": "{spaceXxs}"
          },
          "spaceScaledS": {
            "comfortable": "{spaceXs}",
            "compact": "{spaceXs}"
          },
          "spaceScaledM": {
            "comfortable": "{spaceS}",
            "compact": "{spaceS}"
          },
          "spaceScaledL": {
            "comfortable": "{spaceM}",
            "compact": "{spaceM}"
          },
          "spaceScaledXl": {
            "comfortable": "{spaceL}",
            "compact": "{spaceL}"
          },
          "spaceScaledXxl": {
            "comfortable": "{spaceXl}",
            "compact": "{spaceXl}"
          },
          "spaceScaledXxxl": {
            "comfortable": "{spaceXxl}",
            "compact": "{spaceXxl}"
          },
          "spaceStaticXxxs": {
            "comfortable": "{spaceXxxs}",
            "compact": "{spaceXxxs}"
          },
          "spaceStaticXxs": {
            "comfortable": "{spaceXxs}",
            "compact": "{spaceXxs}"
          },
          "spaceStaticXs": {
            "comfortable": "{spaceXs}",
            "compact": "{spaceXs}"
          },
          "spaceStaticS": {
            "comfortable": "{spaceS}",
            "compact": "{spaceS}"
          },
          "spaceStaticM": {
            "comfortable": "{spaceM}",
            "compact": "{spaceM}"
          },
          "spaceStaticL": {
            "comfortable": "{spaceL}",
            "compact": "{spaceL}"
          },
          "spaceStaticXl": {
            "comfortable": "{spaceXl}",
            "compact": "{spaceXl}"
          },
          "spaceStaticXxl": {
            "comfortable": "{spaceXxl}",
            "compact": "{spaceXxl}"
          },
          "spaceStaticXxxl": {
            "comfortable": "{spaceXxxl}",
            "compact": "{spaceXxxl}"
          },
          "spaceNone": {
            "comfortable": "0px",
            "compact": "0px"
          },
          "spaceXxxs": {
            "comfortable": "2px",
            "compact": "2px"
          },
          "spaceXxs": {
            "comfortable": "4px",
            "compact": "4px"
          },
          "spaceXs": {
            "comfortable": "8px",
            "compact": "8px"
          },
          "spaceS": {
            "comfortable": "12px",
            "compact": "12px"
          },
          "spaceM": {
            "comfortable": "16px",
            "compact": "16px"
          },
          "spaceL": {
            "comfortable": "20px",
            "compact": "20px"
          },
          "spaceXl": {
            "comfortable": "24px",
            "compact": "24px"
          },
          "spaceXxl": {
            "comfortable": "32px",
            "compact": "32px"
          },
          "spaceXxxl": {
            "comfortable": "40px",
            "compact": "40px"
          },
          "sizeVerticalInput": {
            "comfortable": "28px",
            "compact": "28px"
          }
        }
      },
      "top-navigation": {
        "id": "top-navigation",
        "selector": ".awsui-context-top-navigation",
        "tokens": {
          "colorGreyOpaque10": {
            "light": "rgba(0, 0, 0, 0.1)",
            "dark": "rgba(0, 0, 0, 0.1)"
          },
          "colorGreyOpaque25": {
            "light": "rgba(255, 255, 255, 0.25)",
            "dark": "rgba(255, 255, 255, 0.25)"
          },
          "colorGreyOpaque40": {
            "light": "rgba(0, 0, 0, 0.4)",
            "dark": "rgba(0, 0, 0, 0.4)"
          },
          "colorGreyOpaque50": {
            "light": "rgba(0, 0, 0, 0.5)",
            "dark": "rgba(0, 0, 0, 0.5)"
          },
          "colorGreyOpaque70": {
            "light": "rgba(15, 20, 26, 0.7)",
            "dark": "rgba(15, 20, 26, 0.7)"
          },
          "colorGreyOpaque80": {
            "light": "rgba(22, 25, 31, 0.8)",
            "dark": "rgba(22, 25, 31, 0.8)"
          },
          "colorGreyOpaque90": {
            "light": "rgba(242, 243, 243, 0.9)",
            "dark": "rgba(242, 243, 243, 0.9)"
          },
          "colorGreyTransparent": {
            "light": "rgba(15, 20, 26, 1)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorGreyTransparentHeavy": {
            "light": "rgba(15, 20, 26, 1)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorGreyTransparentLight": {
            "light": "rgba(15, 20, 26, 1)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorBackgroundBadgeIcon": {
            "light": "{colorError400}",
            "dark": "{colorError400}"
          },
          "colorBackgroundButtonLinkActive": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundButtonLinkDefault": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonLinkDisabled": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonLinkHover": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundButtonNormalActive": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundButtonNormalDefault": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundButtonNormalDisabled": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundButtonNormalHover": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundToggleButtonNormalPressed": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundToggleButtonNormalDefault": {
            "light": "{colorBackgroundButtonNormalDefault}",
            "dark": "{colorBackgroundButtonNormalDefault}"
          },
          "colorBackgroundButtonPrimaryActive": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundButtonPrimaryDefault": {
            "light": "{colorBorderButtonNormalDefault}",
            "dark": "{colorBorderButtonNormalDefault}"
          },
          "colorBackgroundButtonPrimaryDisabled": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundButtonPrimaryHover": {
            "light": "{colorBorderButtonNormalHover}",
            "dark": "{colorBorderButtonNormalHover}"
          },
          "colorBackgroundDirectionButtonActive": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundDirectionButtonDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundDirectionButtonDisabled": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundDirectionButtonHover": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorTextDirectionButtonDefault": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextDirectionButtonDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorBackgroundCalendarCurrentDate": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundCellShaded": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorGutterActiveLineDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBackgroundCodeEditorGutterActiveLineError": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundCodeEditorGutterDefault": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorLoading": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorPaneItemHover": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundCodeEditorStatusBar": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCard": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundItemCard": {
            "light": "{colorBackgroundCard}",
            "dark": "{colorBackgroundCard}"
          },
          "colorBackgroundContainerContent": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundContainerHeader": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundControlChecked": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundControlDefault": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundControlDisabled": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundDropdownItemDefault": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundDropdownItemDimmed": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundDropdownItemFilterMatch": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundDropdownItemHover": {
            "light": "{colorNeutral900}",
            "dark": "{colorNeutral900}"
          },
          "colorBackgroundDropdownItemSelected": {
            "light": "{colorBackgroundItemSelected}",
            "dark": "{colorBackgroundItemSelected}"
          },
          "colorBackgroundHomeHeader": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundInlineCode": {
            "light": "rgba(255, 255, 255, 0.1)",
            "dark": "rgba(255, 255, 255, 0.1)"
          },
          "colorBackgroundInputDefault": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundInputDisabled": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundItemSelected": {
            "light": "{colorPrimary1000}",
            "dark": "{colorPrimary1000}"
          },
          "colorBackgroundLayoutMain": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundDrawer": {
            "light": "{colorBackgroundLayoutPanelContent}",
            "dark": "{colorBackgroundLayoutPanelContent}"
          },
          "colorBackgroundDrawerBackdrop": {
            "light": "{colorGreyOpaque70}",
            "dark": "{colorGreyOpaque70}"
          },
          "colorBackgroundLayoutMobilePanel": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundLayoutPanelContent": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundLayoutPanelHover": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundLayoutToolbar": {
            "light": "{colorBackgroundLayoutPanelContent}",
            "dark": "{colorBackgroundLayoutPanelContent}"
          },
          "colorBackgroundLayoutToggleActive": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundLayoutToggleDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundLayoutToggleHover": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundLayoutToggleSelectedActive": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundLayoutToggleSelectedDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundLayoutToggleSelectedHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBackgroundModalOverlay": {
            "light": "{colorGreyOpaque70}",
            "dark": "{colorGreyOpaque70}"
          },
          "colorBackgroundNotificationBlue": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo600}"
          },
          "colorBackgroundNotificationGreen": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess600}"
          },
          "colorBackgroundNotificationGrey": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundNotificationRed": {
            "light": "{colorError600}",
            "dark": "{colorError600}"
          },
          "colorBackgroundNotificationYellow": {
            "light": "{colorWarning400}",
            "dark": "{colorWarning400}"
          },
          "colorBackgroundNotificationStackBar": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundNotificationStackBarActive": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundNotificationStackBarHover": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundPopover": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundProgressBarValueDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundProgressBarDefault": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundSegmentActive": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundSegmentDefault": {
            "light": "{colorBackgroundButtonNormalDefault}",
            "dark": "{colorBackgroundButtonNormalDefault}"
          },
          "colorBackgroundSegmentDisabled": {
            "light": "{colorBackgroundButtonNormalDisabled}",
            "dark": "{colorBackgroundButtonNormalDisabled}"
          },
          "colorBackgroundSegmentHover": {
            "light": "{colorBackgroundButtonNormalHover}",
            "dark": "{colorBackgroundButtonNormalHover}"
          },
          "colorBackgroundSegmentWrapper": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundSliderRangeDefault": {
            "light": "{colorBackgroundSliderHandleDefault}",
            "dark": "{colorBackgroundSliderHandleDefault}"
          },
          "colorBackgroundSliderRangeActive": {
            "light": "{colorBackgroundSliderHandleActive}",
            "dark": "{colorBackgroundSliderHandleActive}"
          },
          "colorBackgroundSliderHandleDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundSliderHandleActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBackgroundSliderTrackDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundSliderHandleRing": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundSliderHandleErrorDefault": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderHandleErrorActive": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderHandleWarningDefault": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderHandleWarningActive": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderRangeErrorDefault": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderRangeErrorActive": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderRangeWarningDefault": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderRangeWarningActive": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundStatusError": {
            "light": "{colorError1000}",
            "dark": "{colorError1000}"
          },
          "colorBackgroundStatusInfo": {
            "light": "{colorInfo1000}",
            "dark": "{colorInfo1000}"
          },
          "colorBackgroundDialog": {
            "light": "{colorBackgroundStatusInfo}",
            "dark": "{colorBackgroundStatusInfo}"
          },
          "colorBackgroundStatusSuccess": {
            "light": "{colorSuccess1000}",
            "dark": "{colorSuccess1000}"
          },
          "colorBackgroundStatusWarning": {
            "light": "{colorWarning1000}",
            "dark": "{colorWarning1000}"
          },
          "colorBackgroundTableHeader": {
            "light": "{colorBackgroundContainerHeader}",
            "dark": "{colorBackgroundContainerHeader}"
          },
          "colorBackgroundTilesDisabled": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundToggleCheckedDisabled": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary900}"
          },
          "colorBackgroundToggleDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBackgroundAvatarGenAi": {
            "light": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)",
            "dark": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)"
          },
          "colorBackgroundAvatarDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorTextAvatar": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorBackgroundLoadingBarGenAi": {
            "light": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)",
            "dark": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)"
          },
          "colorBackgroundStatusIndicatorError": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorWarning": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorSuccess": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorInfo": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorNeutral": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundChatBubbleOutgoing": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundChatBubbleIncoming": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextChatBubbleOutgoing": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorTextChatBubbleIncoming": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorBorderButtonLinkDisabled": {
            "light": "{colorBackgroundButtonLinkDisabled}",
            "dark": "{colorBackgroundButtonLinkDisabled}"
          },
          "colorBorderButtonNormalActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderButtonNormalDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderToggleButtonNormalPressed": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderButtonNormalDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextButtonNormalDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderButtonNormalHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextButtonIconDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderButtonPrimaryActive": {
            "light": "{colorBackgroundButtonPrimaryActive}",
            "dark": "{colorBackgroundButtonPrimaryActive}"
          },
          "colorBorderButtonPrimaryDefault": {
            "light": "{colorBackgroundButtonPrimaryDefault}",
            "dark": "{colorBackgroundButtonPrimaryDefault}"
          },
          "colorBorderButtonPrimaryDisabled": {
            "light": "{colorBackgroundButtonPrimaryDisabled}",
            "dark": "{colorBackgroundButtonPrimaryDisabled}"
          },
          "colorBorderButtonPrimaryHover": {
            "light": "{colorBackgroundButtonPrimaryHover}",
            "dark": "{colorBackgroundButtonPrimaryHover}"
          },
          "colorTextButtonPrimaryDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorItemSelected": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderCalendarGrid": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderCalendarGridSelectedFocusRing": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBorderCellShaded": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBorderCodeEditorAceActiveLineLightTheme": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderCodeEditorAceActiveLineDarkTheme": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderCodeEditorDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderCodeEditorPaneItemHover": {
            "light": "{colorBorderDropdownItemHover}",
            "dark": "{colorBorderDropdownItemHover}"
          },
          "colorBorderCard": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderCardHighlighted": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderItemCard": {
            "light": "{colorBorderCard}",
            "dark": "{colorBorderCard}"
          },
          "colorBorderItemCardHighlighted": {
            "light": "{colorBorderCardHighlighted}",
            "dark": "{colorBorderCardHighlighted}"
          },
          "colorBorderContainerDivider": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderContainerTop": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderControlChecked": {
            "light": "{colorBackgroundControlChecked}",
            "dark": "{colorBackgroundControlChecked}"
          },
          "colorBorderControlDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderControlDisabled": {
            "light": "{colorBackgroundControlDisabled}",
            "dark": "{colorBackgroundControlDisabled}"
          },
          "colorBorderDividerActive": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorBorderDividerDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderDividerPanelBottom": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDividerPanelSide": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDividerSecondary": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBorderDropdownContainer": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderDropdownGroup": {
            "light": "{colorBorderDropdownItemDefault}",
            "dark": "{colorBorderDropdownItemDefault}"
          },
          "colorBorderDropdownItemDefault": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDropdownItemHover": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderDropdownItemDimmedHover": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderDropdownItemSelected": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderDropdownItemTop": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderEditableCellHover": {
            "light": "{colorBorderDropdownItemHover}",
            "dark": "{colorBorderDropdownItemHover}"
          },
          "colorBorderInputDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderInputDisabled": {
            "light": "{colorBackgroundInputDisabled}",
            "dark": "{colorBackgroundInputDisabled}"
          },
          "colorBorderInputFocused": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderItemFocused": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderDropdownItemFocused": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderItemPlaceholder": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderItemSelected": {
            "light": "{colorItemSelected}",
            "dark": "{colorItemSelected}"
          },
          "colorBorderLayout": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderNotificationStackBar": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBorderPanelHeader": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderPopover": {
            "light": "{colorBorderDropdownContainer}",
            "dark": "{colorBorderDropdownContainer}"
          },
          "colorBorderSegmentActive": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderSegmentDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderSegmentDisabled": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderSegmentHover": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderStatusError": {
            "light": "{colorError400}",
            "dark": "{colorError400}"
          },
          "colorBorderStatusInfo": {
            "light": "{colorInfo400}",
            "dark": "{colorInfo400}"
          },
          "colorBorderStatusSuccess": {
            "light": "{colorSuccess500}",
            "dark": "{colorSuccess500}"
          },
          "colorBorderStatusWarning": {
            "light": "{colorWarning500}",
            "dark": "{colorWarning500}"
          },
          "colorBorderDialog": {
            "light": "{colorBorderStatusInfo}",
            "dark": "{colorBorderStatusInfo}"
          },
          "colorBorderDividerInteractiveDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderTabsDivider": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderTabsShadow": {
            "light": "{colorGreyTransparent}",
            "dark": "{colorGreyTransparent}"
          },
          "colorBorderTabsUnderline": {
            "light": "{colorTextAccent}",
            "dark": "{colorTextAccent}"
          },
          "colorBorderTilesDisabled": {
            "light": "{colorBackgroundTilesDisabled}",
            "dark": "{colorBackgroundTilesDisabled}"
          },
          "colorBorderTutorial": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorForegroundControlDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorForegroundControlDisabled": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorForegroundControlReadOnly": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorShadowDefault": {
            "light": "{colorGreyTransparentHeavy}",
            "dark": "{colorGreyTransparentHeavy}"
          },
          "colorShadowMedium": {
            "light": "{colorGreyTransparent}",
            "dark": "{colorGreyTransparent}"
          },
          "colorShadowSide": {
            "light": "{colorGreyTransparentLight}",
            "dark": "{colorGreyTransparentLight}"
          },
          "colorStrokeChartLine": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorStrokeCodeEditorGutterActiveLineDefault": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorStrokeCodeEditorGutterActiveLineHover": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextAccent": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorTextBodyDefault": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextBodySecondary": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextBreadcrumbCurrent": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorTextBreadcrumbIcon": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonInlineIconDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextButtonInlineIconDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonInlineIconHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextButtonNormalActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextToggleButtonNormalPressed": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextButtonNormalDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorTextButtonNormalHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextLinkButtonNormalDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorTextLinkButtonNormalHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextLinkButtonNormalActive": {
            "light": "{colorTextButtonNormalActive}",
            "dark": "{colorTextButtonNormalActive}"
          },
          "colorTextButtonLinkActive": {
            "light": "{colorTextButtonNormalActive}",
            "dark": "{colorTextButtonNormalActive}"
          },
          "colorTextButtonLinkDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorTextButtonLinkDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonLinkHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextButtonPrimaryActive": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextButtonPrimaryDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextButtonPrimaryHover": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextCalendarDateHover": {
            "light": "{colorTextDropdownItemDefault}",
            "dark": "{colorTextDropdownItemDefault}"
          },
          "colorTextCalendarDateSelected": {
            "light": "{colorBackgroundControlDefault}",
            "dark": "{colorBackgroundControlDefault}"
          },
          "colorTextCalendarMonth": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextCodeEditorGutterActiveLine": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextCodeEditorGutterDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextCodeEditorStatusBarDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextCodeEditorTabButtonError": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextColumnHeader": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral400}"
          },
          "colorTextColumnSortingIcon": {
            "light": "{colorTextColumnHeader}",
            "dark": "{colorTextColumnHeader}"
          },
          "colorTextControlDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextCounter": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextDisabledInlineEdit": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral400}"
          },
          "colorTextDropdownFooter": {
            "light": "{colorTextFormSecondary}",
            "dark": "{colorTextFormSecondary}"
          },
          "colorTextDropdownGroupLabel": {
            "light": "{colorTextGroupLabel}",
            "dark": "{colorTextGroupLabel}"
          },
          "colorTextDropdownItemDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextDropdownItemDimmed": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextDropdownItemDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextDropdownItemFilterMatch": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextDropdownItemHighlighted": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral250}"
          },
          "colorTextDropdownItemSecondary": {
            "light": "{colorTextFormSecondary}",
            "dark": "{colorTextFormSecondary}"
          },
          "colorTextDropdownItemSecondaryHover": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextEmpty": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextExpandableSectionDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextExpandableSectionHover": {
            "light": "{colorTextAccent}",
            "dark": "{colorTextAccent}"
          },
          "colorTextExpandableSectionNavigationIconDefault": {
            "light": "{colorTextInteractiveDefault}",
            "dark": "{colorTextInteractiveDefault}"
          },
          "colorTextFormDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextFormLabel": {
            "light": "{colorTextFormDefault}",
            "dark": "{colorTextFormDefault}"
          },
          "colorTextFormSecondary": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextGroupLabel": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextLabelGenAi": {
            "light": "{colorPurple400}",
            "dark": "{colorPurple400}"
          },
          "colorTextHeadingDefault": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral250}"
          },
          "colorTextHeadingSecondary": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextHomeHeaderDefault": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral250}"
          },
          "colorTextHomeHeaderSecondary": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextIconCaret": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextIconSubtle": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral400}"
          },
          "colorTextInputDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextInputPlaceholder": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextInputPlaceholderDisabled": {
            "light": "{colorTextInputDisabled}",
            "dark": "{colorTextInputDisabled}"
          },
          "colorTextInteractiveActive": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInteractiveDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextInteractiveDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextInteractiveHover": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextToggleButtonIconPressed": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInteractiveInvertedDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextInteractiveInvertedHover": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInverted": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLabel": {
            "light": "{colorTextFormLabel}",
            "dark": "{colorTextFormLabel}"
          },
          "colorTextKeyValuePairsValue": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorTextLayoutToggle": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLayoutToggleActive": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorTextLayoutToggleHover": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorTextLayoutToggleSelected": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLinkDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorTextLinkHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextLinkDecorationDefault": {
            "light": "currentColor",
            "dark": "currentColor"
          },
          "colorTextLinkDecorationHover": {
            "light": "currentColor",
            "dark": "currentColor"
          },
          "colorTextLinkSecondaryDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkSecondaryHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkInfoDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkInfoHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkInvertedHover": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLinkButtonUnderline": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorTextLinkButtonUnderlineHover": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorTextNotificationDefault": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextNotificationStackBar": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextNotificationYellow": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextPaginationPageNumberActiveDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextPaginationPageNumberDefault": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral400}"
          },
          "colorTextSegmentActive": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextSegmentDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextSegmentHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextSmall": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextStatusError": {
            "light": "{colorError400}",
            "dark": "{colorError400}"
          },
          "colorTextStatusInactive": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextStatusInfo": {
            "light": "{colorInfo400}",
            "dark": "{colorInfo400}"
          },
          "colorTextStatusSuccess": {
            "light": "{colorSuccess500}",
            "dark": "{colorSuccess500}"
          },
          "colorTextStatusWarning": {
            "light": "{colorWarning500}",
            "dark": "{colorWarning500}"
          },
          "colorTextTopNavigationTitle": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextTutorialHotspotDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextTutorialHotspotHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorBoardPlaceholderActive": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBoardPlaceholderHover": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary600}"
          },
          "colorDragPlaceholderActive": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorDragPlaceholderHover": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary600}"
          },
          "colorDropzoneBackgroundDefault": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorDropzoneBackgroundHover": {
            "light": "{colorPrimary1000}",
            "dark": "{colorPrimary1000}"
          },
          "colorDropzoneTextDefault": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorDropzoneTextHover": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorDropzoneBorderDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorDropzoneBorderHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorGapGlobalDrawer": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTreeViewConnectorLine": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBackgroundActionCardDefault": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundActionCardHover": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundActionCardActive": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBorderActionCardDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderActionCardHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderActionCardActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderActionCardDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundActionCardDisabled": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorTextActionCardDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorIconActionCardDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorIconActionCardHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorIconActionCardActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorIconActionCardDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundSkeleton": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundSkeletonWave": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorPrimary50": "#f0fbff",
          "colorPrimary100": "#d1f1ff",
          "colorPrimary200": "#b8e7ff",
          "colorPrimary300": "#75cfff",
          "colorPrimary400": "#42b4ff",
          "colorPrimary500": "#0099ff",
          "colorPrimary600": "#006ce0",
          "colorPrimary700": "#004a9e",
          "colorPrimary800": "#003b8f",
          "colorPrimary900": "#002b66",
          "colorPrimary1000": "#001129",
          "colorNeutral50": "#fcfcfd",
          "colorNeutral100": "#f9f9fa",
          "colorNeutral150": "#f6f6f9",
          "colorNeutral200": "#f3f3f7",
          "colorNeutral250": "#ebebf0",
          "colorNeutral300": "#dedee3",
          "colorNeutral350": "#c6c6cd",
          "colorNeutral400": "#b4b4bb",
          "colorNeutral450": "#a4a4ad",
          "colorNeutral500": "#8c8c94",
          "colorNeutral550": "#72747e",
          "colorNeutral600": "#656871",
          "colorNeutral650": "#424650",
          "colorNeutral700": "#333843",
          "colorNeutral750": "#232b37",
          "colorNeutral800": "#1b232d",
          "colorNeutral850": "#161d26",
          "colorNeutral900": "#131920",
          "colorNeutral950": "#0f141a",
          "colorNeutral1000": "#06080a",
          "colorError50": "#fff5f5",
          "colorError400": "#ff7a7a",
          "colorError600": "#db0000",
          "colorError900": "#700000",
          "colorError1000": "#1f0000",
          "colorSuccess50": "#effff1",
          "colorSuccess500": "#2bb534",
          "colorSuccess600": "#00802f",
          "colorSuccess1000": "#001401",
          "colorWarning50": "#fffef0",
          "colorWarning400": "#ffe347",
          "colorWarning500": "#fbd332",
          "colorWarning900": "#855900",
          "colorWarning1000": "#191100",
          "colorInfo50": "#f0fbff",
          "colorInfo300": "#75cfff",
          "colorInfo400": "#42b4ff",
          "colorInfo600": "#006ce0",
          "colorInfo1000": "#001129",
          "colorChartsStatusNeutral": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorChartsThresholdNegative": {
            "light": "{colorError600}",
            "dark": "{colorError400}"
          },
          "colorChartsThresholdPositive": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess500}"
          },
          "colorChartsThresholdInfo": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo300}"
          },
          "colorChartsThresholdNeutral": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorChartsLineGrid": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral650}"
          },
          "colorChartsLineTick": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral650}"
          },
          "colorChartsLineAxis": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral650}"
          },
          "colorChartsErrorBarMarker": {
            "light": "{colorNeutral900}",
            "dark": "{colorWhite}"
          },
          "colorSeverityGrey": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundNotificationSeverityNeutral": {
            "light": "{colorSeverityGrey}",
            "dark": "{colorSeverityGrey}"
          },
          "colorTextNotificationSeverityCritical": {
            "light": "{colorNeutral100}",
            "dark": "{colorBlack}"
          },
          "colorTextNotificationSeverityHigh": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral950}"
          },
          "colorTextNotificationSeverityMedium": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextNotificationSeverityLow": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextNotificationSeverityNeutral": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          }
        },
        "defaultMode": "dark"
      },
      "header": {
        "id": "header",
        "selector": ".awsui-context-content-header",
        "tokens": {
          "shadowCard": {
            "light": "none",
            "dark": "none"
          },
          "shadowItemCard": {
            "light": "{shadowCard}",
            "dark": "{shadowCard}"
          },
          "shadowContainer": {
            "light": "0px 1px 8px 2px rgba(0, 7, 22, 0.6)",
            "dark": "0px 1px 8px 2px rgba(0, 7, 22, 0.6)"
          },
          "shadowContainerActive": {
            "light": "0px 1px 1px 1px #192534, 0px 6px 36px #00040c",
            "dark": "0px 1px 1px 1px #192534, 0px 6px 36px #00040c"
          },
          "shadowDropdown": {
            "light": "0px 4px 20px 1px rgba(0, 4, 12, 1)",
            "dark": "0px 4px 20px 1px rgba(0, 4, 12, 1)"
          },
          "shadowDropup": {
            "light": "{shadowDropdown}",
            "dark": "{shadowDropdown}"
          },
          "shadowFlashCollapsed": {
            "light": "0px 4px 4px rgba(0, 0, 0, 0.25)",
            "dark": "0px 4px 4px rgba(0, 0, 0, 0.25)"
          },
          "shadowFlashSticky": {
            "light": "0px 4px 8px rgba(0, 7, 22, 0.10)",
            "dark": "0px 4px 8px rgba(0, 7, 22, 0.5)"
          },
          "shadowModal": {
            "light": "{shadowDropdown}",
            "dark": "{shadowDropdown}"
          },
          "shadowPanel": {
            "light": "0px 0px 0px 1px #b6bec9",
            "dark": "0px 0px 0px 1px #414d5c"
          },
          "shadowPanelToggle": {
            "light": "0px 6px 12px 1px rgba(0, 7, 22, 0.12)",
            "dark": "0px 6px 12px 1px rgba(0, 7, 22, 1)"
          },
          "shadowPopover": {
            "light": "{shadowDropdown}",
            "dark": "{shadowDropdown}"
          },
          "shadowSplitBottom": {
            "light": "0px -36px 36px -36px rgba(0, 7, 22, 1)",
            "dark": "0px -36px 36px -36px rgba(0, 7, 22, 1)"
          },
          "shadowSplitSide": {
            "light": "-1px 0px 1px 0px #192534, -36px 6px 36px -36px rgba(0, 7, 22, 1)",
            "dark": "-1px 0px 1px 0px #192534, -36px 6px 36px -36px rgba(0, 7, 22, 1)"
          },
          "shadowSticky": {
            "light": "0px 4px 8px 1px rgba(0, 7, 22, 0.5)",
            "dark": "0px 4px 8px 1px rgba(0, 7, 22, 0.5)"
          },
          "shadowStickyEmbedded": {
            "light": "0px 2px 0px 0px #414d5c, 0px 16px 16px -12px rgba(0, 7, 22, 1)",
            "dark": "0px 2px 0px 0px #414d5c, 0px 16px 16px -12px rgba(0, 7, 22, 1)"
          },
          "shadowStickyColumnFirst": {
            "light": "0px 4px 8px 1px rgba(0, 7, 22, 0.5)",
            "dark": "0px 4px 8px 1px rgba(0, 7, 22, 0.5)"
          },
          "shadowStickyColumnLast": {
            "light": "0px 4px 8px 1px rgba(0, 7, 22, 0.5)",
            "dark": "0px 4px 8px 1px rgba(0, 7, 22, 0.5)"
          },
          "colorGreyOpaque10": {
            "light": "rgba(0, 0, 0, 0.1)",
            "dark": "rgba(0, 0, 0, 0.1)"
          },
          "colorGreyOpaque25": {
            "light": "rgba(255, 255, 255, 0.25)",
            "dark": "rgba(255, 255, 255, 0.25)"
          },
          "colorGreyOpaque40": {
            "light": "rgba(0, 0, 0, 0.4)",
            "dark": "rgba(0, 0, 0, 0.4)"
          },
          "colorGreyOpaque50": {
            "light": "rgba(0, 0, 0, 0.5)",
            "dark": "rgba(0, 0, 0, 0.5)"
          },
          "colorGreyOpaque70": {
            "light": "rgba(15, 20, 26, 0.7)",
            "dark": "rgba(15, 20, 26, 0.7)"
          },
          "colorGreyOpaque80": {
            "light": "rgba(22, 25, 31, 0.8)",
            "dark": "rgba(22, 25, 31, 0.8)"
          },
          "colorGreyOpaque90": {
            "light": "rgba(242, 243, 243, 0.9)",
            "dark": "rgba(242, 243, 243, 0.9)"
          },
          "colorGreyTransparent": {
            "light": "rgba(15, 20, 26, 1)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorGreyTransparentHeavy": {
            "light": "rgba(15, 20, 26, 1)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorGreyTransparentLight": {
            "light": "rgba(15, 20, 26, 1)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorBackgroundBadgeIcon": {
            "light": "{colorError400}",
            "dark": "{colorError400}"
          },
          "colorBackgroundButtonLinkActive": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundButtonLinkDefault": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonLinkDisabled": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonLinkHover": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundButtonNormalActive": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundButtonNormalDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundButtonNormalDisabled": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundButtonNormalHover": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundToggleButtonNormalPressed": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundToggleButtonNormalDefault": {
            "light": "{colorBackgroundButtonNormalDefault}",
            "dark": "{colorBackgroundButtonNormalDefault}"
          },
          "colorBackgroundButtonPrimaryActive": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundButtonPrimaryDefault": {
            "light": "{colorBorderButtonNormalDefault}",
            "dark": "{colorBorderButtonNormalDefault}"
          },
          "colorBackgroundButtonPrimaryDisabled": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundButtonPrimaryHover": {
            "light": "{colorBorderButtonNormalHover}",
            "dark": "{colorBorderButtonNormalHover}"
          },
          "colorBackgroundDirectionButtonActive": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundDirectionButtonDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundDirectionButtonDisabled": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundDirectionButtonHover": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorTextDirectionButtonDefault": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextDirectionButtonDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorBackgroundCalendarCurrentDate": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundCellShaded": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorGutterActiveLineDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBackgroundCodeEditorGutterActiveLineError": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundCodeEditorGutterDefault": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorLoading": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorPaneItemHover": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundCodeEditorStatusBar": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCard": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundItemCard": {
            "light": "{colorBackgroundCard}",
            "dark": "{colorBackgroundCard}"
          },
          "colorBackgroundContainerContent": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundContainerHeader": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundControlChecked": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundControlDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundControlDisabled": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundDropdownItemDefault": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundDropdownItemDimmed": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundDropdownItemFilterMatch": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundDropdownItemHover": {
            "light": "{colorNeutral900}",
            "dark": "{colorNeutral900}"
          },
          "colorBackgroundDropdownItemSelected": {
            "light": "{colorBackgroundItemSelected}",
            "dark": "{colorBackgroundItemSelected}"
          },
          "colorBackgroundHomeHeader": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundInlineCode": {
            "light": "rgba(255, 255, 255, 0.1)",
            "dark": "rgba(255, 255, 255, 0.1)"
          },
          "colorBackgroundInputDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundInputDisabled": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundItemSelected": {
            "light": "{colorPrimary1000}",
            "dark": "{colorPrimary1000}"
          },
          "colorBackgroundLayoutMain": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundDrawer": {
            "light": "{colorBackgroundLayoutPanelContent}",
            "dark": "{colorBackgroundLayoutPanelContent}"
          },
          "colorBackgroundDrawerBackdrop": {
            "light": "{colorGreyOpaque70}",
            "dark": "{colorGreyOpaque70}"
          },
          "colorBackgroundLayoutMobilePanel": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundLayoutPanelContent": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundLayoutPanelHover": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundLayoutToolbar": {
            "light": "{colorBackgroundLayoutPanelContent}",
            "dark": "{colorBackgroundLayoutPanelContent}"
          },
          "colorBackgroundLayoutToggleActive": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundLayoutToggleDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundLayoutToggleHover": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundLayoutToggleSelectedActive": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundLayoutToggleSelectedDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundLayoutToggleSelectedHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBackgroundModalOverlay": {
            "light": "{colorGreyOpaque70}",
            "dark": "{colorGreyOpaque70}"
          },
          "colorBackgroundNotificationBlue": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo600}"
          },
          "colorBackgroundNotificationGreen": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess600}"
          },
          "colorBackgroundNotificationGrey": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundNotificationRed": {
            "light": "{colorError600}",
            "dark": "{colorError600}"
          },
          "colorBackgroundNotificationYellow": {
            "light": "{colorWarning400}",
            "dark": "{colorWarning400}"
          },
          "colorBackgroundNotificationStackBar": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundNotificationStackBarActive": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundNotificationStackBarHover": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundPopover": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundProgressBarValueDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundProgressBarDefault": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundSegmentActive": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundSegmentDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundSegmentDisabled": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundSegmentHover": {
            "light": "{colorBackgroundButtonNormalHover}",
            "dark": "{colorBackgroundButtonNormalHover}"
          },
          "colorBackgroundSegmentWrapper": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundSliderRangeDefault": {
            "light": "{colorBackgroundSliderHandleDefault}",
            "dark": "{colorBackgroundSliderHandleDefault}"
          },
          "colorBackgroundSliderRangeActive": {
            "light": "{colorBackgroundSliderHandleActive}",
            "dark": "{colorBackgroundSliderHandleActive}"
          },
          "colorBackgroundSliderHandleDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundSliderHandleActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBackgroundSliderTrackDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundSliderHandleRing": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundSliderHandleErrorDefault": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderHandleErrorActive": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderHandleWarningDefault": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderHandleWarningActive": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderRangeErrorDefault": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderRangeErrorActive": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderRangeWarningDefault": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderRangeWarningActive": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundStatusError": {
            "light": "{colorError1000}",
            "dark": "{colorError1000}"
          },
          "colorBackgroundStatusInfo": {
            "light": "{colorInfo1000}",
            "dark": "{colorInfo1000}"
          },
          "colorBackgroundDialog": {
            "light": "{colorBackgroundStatusInfo}",
            "dark": "{colorBackgroundStatusInfo}"
          },
          "colorBackgroundStatusSuccess": {
            "light": "{colorSuccess1000}",
            "dark": "{colorSuccess1000}"
          },
          "colorBackgroundStatusWarning": {
            "light": "{colorWarning1000}",
            "dark": "{colorWarning1000}"
          },
          "colorBackgroundTableHeader": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundTilesDisabled": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundToggleCheckedDisabled": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary900}"
          },
          "colorBackgroundToggleDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBackgroundAvatarGenAi": {
            "light": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)",
            "dark": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)"
          },
          "colorBackgroundAvatarDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorTextAvatar": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorBackgroundLoadingBarGenAi": {
            "light": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)",
            "dark": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)"
          },
          "colorBackgroundStatusIndicatorError": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorWarning": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorSuccess": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorInfo": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorNeutral": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundChatBubbleOutgoing": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundChatBubbleIncoming": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextChatBubbleOutgoing": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorTextChatBubbleIncoming": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorBorderButtonLinkDisabled": {
            "light": "{colorBackgroundButtonLinkDisabled}",
            "dark": "{colorBackgroundButtonLinkDisabled}"
          },
          "colorBorderButtonNormalActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderButtonNormalDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderToggleButtonNormalPressed": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderButtonNormalDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextButtonNormalDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderButtonNormalHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextButtonIconDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderButtonPrimaryActive": {
            "light": "{colorBackgroundButtonPrimaryActive}",
            "dark": "{colorBackgroundButtonPrimaryActive}"
          },
          "colorBorderButtonPrimaryDefault": {
            "light": "{colorBackgroundButtonPrimaryDefault}",
            "dark": "{colorBackgroundButtonPrimaryDefault}"
          },
          "colorBorderButtonPrimaryDisabled": {
            "light": "{colorBackgroundButtonPrimaryDisabled}",
            "dark": "{colorBackgroundButtonPrimaryDisabled}"
          },
          "colorBorderButtonPrimaryHover": {
            "light": "{colorBackgroundButtonPrimaryHover}",
            "dark": "{colorBackgroundButtonPrimaryHover}"
          },
          "colorTextButtonPrimaryDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorItemSelected": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderCalendarGrid": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderCalendarGridSelectedFocusRing": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBorderCellShaded": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBorderCodeEditorAceActiveLineLightTheme": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderCodeEditorAceActiveLineDarkTheme": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderCodeEditorDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderCodeEditorPaneItemHover": {
            "light": "{colorBorderDropdownItemHover}",
            "dark": "{colorBorderDropdownItemHover}"
          },
          "colorBorderCard": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderCardHighlighted": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderItemCard": {
            "light": "{colorBorderCard}",
            "dark": "{colorBorderCard}"
          },
          "colorBorderItemCardHighlighted": {
            "light": "{colorBorderCardHighlighted}",
            "dark": "{colorBorderCardHighlighted}"
          },
          "colorBorderContainerDivider": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderContainerTop": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderControlChecked": {
            "light": "{colorBackgroundControlChecked}",
            "dark": "{colorBackgroundControlChecked}"
          },
          "colorBorderControlDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderControlDisabled": {
            "light": "{colorBackgroundControlDisabled}",
            "dark": "{colorBackgroundControlDisabled}"
          },
          "colorBorderDividerActive": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorBorderDividerDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderDividerPanelBottom": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDividerPanelSide": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDividerSecondary": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBorderDropdownContainer": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderDropdownGroup": {
            "light": "{colorBorderDropdownItemDefault}",
            "dark": "{colorBorderDropdownItemDefault}"
          },
          "colorBorderDropdownItemDefault": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDropdownItemHover": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderDropdownItemDimmedHover": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderDropdownItemSelected": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderDropdownItemTop": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderEditableCellHover": {
            "light": "{colorBorderDropdownItemHover}",
            "dark": "{colorBorderDropdownItemHover}"
          },
          "colorBorderInputDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderInputDisabled": {
            "light": "{colorBackgroundInputDisabled}",
            "dark": "{colorBackgroundInputDisabled}"
          },
          "colorBorderInputFocused": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderItemFocused": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderDropdownItemFocused": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderItemPlaceholder": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderItemSelected": {
            "light": "{colorItemSelected}",
            "dark": "{colorItemSelected}"
          },
          "colorBorderLayout": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderNotificationStackBar": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBorderPanelHeader": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderPopover": {
            "light": "{colorBorderDropdownContainer}",
            "dark": "{colorBorderDropdownContainer}"
          },
          "colorBorderSegmentActive": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderSegmentDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderSegmentDisabled": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderSegmentHover": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderStatusError": {
            "light": "{colorError400}",
            "dark": "{colorError400}"
          },
          "colorBorderStatusInfo": {
            "light": "{colorInfo400}",
            "dark": "{colorInfo400}"
          },
          "colorBorderStatusSuccess": {
            "light": "{colorSuccess500}",
            "dark": "{colorSuccess500}"
          },
          "colorBorderStatusWarning": {
            "light": "{colorWarning500}",
            "dark": "{colorWarning500}"
          },
          "colorBorderDialog": {
            "light": "{colorBorderStatusInfo}",
            "dark": "{colorBorderStatusInfo}"
          },
          "colorBorderDividerInteractiveDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderTabsDivider": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderTabsShadow": {
            "light": "{colorGreyTransparent}",
            "dark": "{colorGreyTransparent}"
          },
          "colorBorderTabsUnderline": {
            "light": "{colorTextAccent}",
            "dark": "{colorTextAccent}"
          },
          "colorBorderTilesDisabled": {
            "light": "{colorBackgroundTilesDisabled}",
            "dark": "{colorBackgroundTilesDisabled}"
          },
          "colorBorderTutorial": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorForegroundControlDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorForegroundControlDisabled": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorForegroundControlReadOnly": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorShadowDefault": {
            "light": "{colorGreyTransparentHeavy}",
            "dark": "{colorGreyTransparentHeavy}"
          },
          "colorShadowMedium": {
            "light": "{colorGreyTransparent}",
            "dark": "{colorGreyTransparent}"
          },
          "colorShadowSide": {
            "light": "{colorGreyTransparentLight}",
            "dark": "{colorGreyTransparentLight}"
          },
          "colorStrokeChartLine": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorStrokeCodeEditorGutterActiveLineDefault": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorStrokeCodeEditorGutterActiveLineHover": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextAccent": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorTextBodyDefault": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextBodySecondary": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextBreadcrumbCurrent": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorTextBreadcrumbIcon": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonInlineIconDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextButtonInlineIconDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonInlineIconHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextButtonNormalActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextToggleButtonNormalPressed": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextButtonNormalDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorTextButtonNormalHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextLinkButtonNormalDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorTextLinkButtonNormalHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextLinkButtonNormalActive": {
            "light": "{colorTextButtonNormalActive}",
            "dark": "{colorTextButtonNormalActive}"
          },
          "colorTextButtonLinkActive": {
            "light": "{colorTextButtonNormalActive}",
            "dark": "{colorTextButtonNormalActive}"
          },
          "colorTextButtonLinkDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorTextButtonLinkDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonLinkHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextButtonPrimaryActive": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextButtonPrimaryDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextButtonPrimaryHover": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextCalendarDateHover": {
            "light": "{colorTextDropdownItemDefault}",
            "dark": "{colorTextDropdownItemDefault}"
          },
          "colorTextCalendarDateSelected": {
            "light": "{colorBackgroundControlDefault}",
            "dark": "{colorBackgroundControlDefault}"
          },
          "colorTextCalendarMonth": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextCodeEditorGutterActiveLine": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextCodeEditorGutterDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextCodeEditorStatusBarDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextCodeEditorTabButtonError": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextColumnHeader": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral400}"
          },
          "colorTextColumnSortingIcon": {
            "light": "{colorTextColumnHeader}",
            "dark": "{colorTextColumnHeader}"
          },
          "colorTextControlDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextCounter": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextDisabledInlineEdit": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral400}"
          },
          "colorTextDropdownFooter": {
            "light": "{colorTextFormSecondary}",
            "dark": "{colorTextFormSecondary}"
          },
          "colorTextDropdownGroupLabel": {
            "light": "{colorTextGroupLabel}",
            "dark": "{colorTextGroupLabel}"
          },
          "colorTextDropdownItemDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextDropdownItemDimmed": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextDropdownItemDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextDropdownItemFilterMatch": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextDropdownItemHighlighted": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral250}"
          },
          "colorTextDropdownItemSecondary": {
            "light": "{colorTextFormSecondary}",
            "dark": "{colorTextFormSecondary}"
          },
          "colorTextDropdownItemSecondaryHover": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextEmpty": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextExpandableSectionDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextExpandableSectionHover": {
            "light": "{colorTextAccent}",
            "dark": "{colorTextAccent}"
          },
          "colorTextExpandableSectionNavigationIconDefault": {
            "light": "{colorTextInteractiveDefault}",
            "dark": "{colorTextInteractiveDefault}"
          },
          "colorTextFormDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextFormLabel": {
            "light": "{colorTextFormDefault}",
            "dark": "{colorTextFormDefault}"
          },
          "colorTextFormSecondary": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextGroupLabel": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextLabelGenAi": {
            "light": "{colorPurple400}",
            "dark": "{colorPurple400}"
          },
          "colorTextHeadingDefault": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral250}"
          },
          "colorTextHeadingSecondary": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextHomeHeaderDefault": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral250}"
          },
          "colorTextHomeHeaderSecondary": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextIconCaret": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextIconSubtle": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral400}"
          },
          "colorTextInputDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextInputPlaceholder": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextInputPlaceholderDisabled": {
            "light": "{colorTextInputDisabled}",
            "dark": "{colorTextInputDisabled}"
          },
          "colorTextInteractiveActive": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInteractiveDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextInteractiveDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextInteractiveHover": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextToggleButtonIconPressed": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInteractiveInvertedDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextInteractiveInvertedHover": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInverted": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLabel": {
            "light": "{colorTextFormLabel}",
            "dark": "{colorTextFormLabel}"
          },
          "colorTextKeyValuePairsValue": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorTextLayoutToggle": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLayoutToggleActive": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorTextLayoutToggleHover": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorTextLayoutToggleSelected": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLinkDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorTextLinkHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextLinkDecorationDefault": {
            "light": "currentColor",
            "dark": "currentColor"
          },
          "colorTextLinkDecorationHover": {
            "light": "currentColor",
            "dark": "currentColor"
          },
          "colorTextLinkSecondaryDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkSecondaryHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkInfoDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkInfoHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkInvertedHover": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLinkButtonUnderline": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorTextLinkButtonUnderlineHover": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorTextNotificationDefault": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextNotificationStackBar": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextNotificationYellow": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextPaginationPageNumberActiveDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextPaginationPageNumberDefault": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral400}"
          },
          "colorTextSegmentActive": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextSegmentDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextSegmentHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextSmall": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextStatusError": {
            "light": "{colorError400}",
            "dark": "{colorError400}"
          },
          "colorTextStatusInactive": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextStatusInfo": {
            "light": "{colorInfo400}",
            "dark": "{colorInfo400}"
          },
          "colorTextStatusSuccess": {
            "light": "{colorSuccess500}",
            "dark": "{colorSuccess500}"
          },
          "colorTextStatusWarning": {
            "light": "{colorWarning500}",
            "dark": "{colorWarning500}"
          },
          "colorTextTopNavigationTitle": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextTutorialHotspotDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextTutorialHotspotHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorBoardPlaceholderActive": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBoardPlaceholderHover": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary600}"
          },
          "colorDragPlaceholderActive": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorDragPlaceholderHover": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary600}"
          },
          "colorDropzoneBackgroundDefault": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorDropzoneBackgroundHover": {
            "light": "{colorPrimary1000}",
            "dark": "{colorPrimary1000}"
          },
          "colorDropzoneTextDefault": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorDropzoneTextHover": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorDropzoneBorderDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorDropzoneBorderHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorGapGlobalDrawer": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTreeViewConnectorLine": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBackgroundActionCardDefault": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundActionCardHover": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundActionCardActive": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBorderActionCardDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderActionCardHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderActionCardActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderActionCardDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundActionCardDisabled": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorTextActionCardDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorIconActionCardDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorIconActionCardHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorIconActionCardActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorIconActionCardDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundSkeleton": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundSkeletonWave": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorPrimary50": "#f0fbff",
          "colorPrimary100": "#d1f1ff",
          "colorPrimary200": "#b8e7ff",
          "colorPrimary300": "#75cfff",
          "colorPrimary400": "#42b4ff",
          "colorPrimary500": "#0099ff",
          "colorPrimary600": "#006ce0",
          "colorPrimary700": "#004a9e",
          "colorPrimary800": "#003b8f",
          "colorPrimary900": "#002b66",
          "colorPrimary1000": "#001129",
          "colorNeutral50": "#fcfcfd",
          "colorNeutral100": "#f9f9fa",
          "colorNeutral150": "#f6f6f9",
          "colorNeutral200": "#f3f3f7",
          "colorNeutral250": "#ebebf0",
          "colorNeutral300": "#dedee3",
          "colorNeutral350": "#c6c6cd",
          "colorNeutral400": "#b4b4bb",
          "colorNeutral450": "#a4a4ad",
          "colorNeutral500": "#8c8c94",
          "colorNeutral550": "#72747e",
          "colorNeutral600": "#656871",
          "colorNeutral650": "#424650",
          "colorNeutral700": "#333843",
          "colorNeutral750": "#232b37",
          "colorNeutral800": "#1b232d",
          "colorNeutral850": "#161d26",
          "colorNeutral900": "#131920",
          "colorNeutral950": "#0f141a",
          "colorNeutral1000": "#06080a",
          "colorError50": "#fff5f5",
          "colorError400": "#ff7a7a",
          "colorError600": "#db0000",
          "colorError900": "#700000",
          "colorError1000": "#1f0000",
          "colorSuccess50": "#effff1",
          "colorSuccess500": "#2bb534",
          "colorSuccess600": "#00802f",
          "colorSuccess1000": "#001401",
          "colorWarning50": "#fffef0",
          "colorWarning400": "#ffe347",
          "colorWarning500": "#fbd332",
          "colorWarning900": "#855900",
          "colorWarning1000": "#191100",
          "colorInfo50": "#f0fbff",
          "colorInfo300": "#75cfff",
          "colorInfo400": "#42b4ff",
          "colorInfo600": "#006ce0",
          "colorInfo1000": "#001129",
          "colorChartsStatusNeutral": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorChartsThresholdNegative": {
            "light": "{colorError600}",
            "dark": "{colorError400}"
          },
          "colorChartsThresholdPositive": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess500}"
          },
          "colorChartsThresholdInfo": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo300}"
          },
          "colorChartsThresholdNeutral": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorChartsLineGrid": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral650}"
          },
          "colorChartsLineTick": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral650}"
          },
          "colorChartsLineAxis": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral650}"
          },
          "colorChartsErrorBarMarker": {
            "light": "{colorNeutral900}",
            "dark": "{colorWhite}"
          },
          "colorSeverityGrey": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundNotificationSeverityNeutral": {
            "light": "{colorSeverityGrey}",
            "dark": "{colorSeverityGrey}"
          },
          "colorTextNotificationSeverityCritical": {
            "light": "{colorNeutral100}",
            "dark": "{colorBlack}"
          },
          "colorTextNotificationSeverityHigh": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral950}"
          },
          "colorTextNotificationSeverityMedium": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextNotificationSeverityLow": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextNotificationSeverityNeutral": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          }
        },
        "defaultMode": "dark"
      },
      "flashbar": {
        "id": "flashbar",
        "selector": ".awsui-context-flashbar",
        "tokens": {
          "colorGreyOpaque10": {
            "light": "rgba(0, 0, 0, 0.1)",
            "dark": "rgba(0, 0, 0, 0.1)"
          },
          "colorGreyOpaque25": {
            "light": "rgba(255, 255, 255, 0.25)",
            "dark": "rgba(255, 255, 255, 0.25)"
          },
          "colorGreyOpaque40": {
            "light": "rgba(0, 0, 0, 0.4)",
            "dark": "rgba(0, 0, 0, 0.4)"
          },
          "colorGreyOpaque50": {
            "light": "rgba(0, 0, 0, 0.5)",
            "dark": "rgba(0, 0, 0, 0.5)"
          },
          "colorGreyOpaque70": {
            "light": "rgba(35, 43, 55, 0.7)",
            "dark": "rgba(15, 20, 26, 0.7)"
          },
          "colorGreyOpaque80": {
            "light": "rgba(22, 25, 31, 0.8)",
            "dark": "rgba(22, 25, 31, 0.8)"
          },
          "colorGreyOpaque90": {
            "light": "rgba(242, 243, 243, 0.9)",
            "dark": "rgba(242, 243, 243, 0.9)"
          },
          "colorGreyTransparent": {
            "light": "rgba(15, 20, 26, 0.12)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorGreyTransparentHeavy": {
            "light": "rgba(15, 20, 26, 0.12)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorGreyTransparentLight": {
            "light": "rgba(15, 20, 26, 0.12)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorBackgroundBadgeIcon": {
            "light": "{colorError600}",
            "dark": "{colorError400}"
          },
          "colorBackgroundButtonLinkActive": {
            "light": "{colorPrimary100}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundButtonLinkDefault": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonLinkDisabled": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonLinkHover": {
            "light": "{colorPrimary50}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundButtonNormalActive": {
            "light": "rgba(0, 7, 22, 0.2)",
            "dark": "rgba(0, 7, 22, 0.2)"
          },
          "colorBackgroundButtonNormalDefault": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonNormalDisabled": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundButtonNormalHover": {
            "light": "rgba(0, 7, 22, 0.15)",
            "dark": "rgba(0, 7, 22, 0.15)"
          },
          "colorBackgroundToggleButtonNormalPressed": {
            "light": "{colorPrimary100}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundToggleButtonNormalDefault": {
            "light": "{colorBackgroundButtonNormalDefault}",
            "dark": "{colorBackgroundButtonNormalDefault}"
          },
          "colorBackgroundButtonPrimaryActive": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundButtonPrimaryDefault": {
            "light": "{colorBorderButtonNormalDefault}",
            "dark": "{colorBorderButtonNormalDefault}"
          },
          "colorBackgroundButtonPrimaryDisabled": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundButtonPrimaryHover": {
            "light": "{colorBorderButtonNormalHover}",
            "dark": "{colorBorderButtonNormalHover}"
          },
          "colorBackgroundDirectionButtonActive": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundDirectionButtonDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundDirectionButtonDisabled": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundDirectionButtonHover": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorTextDirectionButtonDefault": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextDirectionButtonDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorBackgroundCalendarCurrentDate": {
            "light": "{colorNeutral200}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundCellShaded": {
            "light": "{colorNeutral150}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorGutterActiveLineDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral500}"
          },
          "colorBackgroundCodeEditorGutterActiveLineError": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundCodeEditorGutterDefault": {
            "light": "{colorNeutral200}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorLoading": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorPaneItemHover": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundCodeEditorStatusBar": {
            "light": "{colorNeutral200}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCard": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundItemCard": {
            "light": "{colorBackgroundCard}",
            "dark": "{colorBackgroundCard}"
          },
          "colorBackgroundContainerContent": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundContainerHeader": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundControlChecked": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundControlDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundControlDisabled": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundDropdownItemDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundDropdownItemDimmed": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundDropdownItemFilterMatch": {
            "light": "{colorPrimary50}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundDropdownItemHover": {
            "light": "{colorNeutral200}",
            "dark": "{colorNeutral900}"
          },
          "colorBackgroundDropdownItemSelected": {
            "light": "{colorBackgroundItemSelected}",
            "dark": "{colorBackgroundItemSelected}"
          },
          "colorBackgroundHomeHeader": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundInlineCode": {
            "light": "rgba(0, 0, 0, 0.2)",
            "dark": "rgba(0, 0, 0, 0.2)"
          },
          "colorBackgroundInputDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundInputDisabled": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundItemSelected": {
            "light": "{colorPrimary50}",
            "dark": "{colorPrimary1000}"
          },
          "colorBackgroundLayoutMain": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundDrawer": {
            "light": "{colorBackgroundLayoutPanelContent}",
            "dark": "{colorBackgroundLayoutPanelContent}"
          },
          "colorBackgroundDrawerBackdrop": {
            "light": "{colorGreyOpaque70}",
            "dark": "{colorGreyOpaque70}"
          },
          "colorBackgroundLayoutMobilePanel": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundLayoutPanelContent": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundLayoutPanelHover": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundLayoutToolbar": {
            "light": "{colorBackgroundLayoutPanelContent}",
            "dark": "{colorBackgroundLayoutPanelContent}"
          },
          "colorBackgroundLayoutToggleActive": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundLayoutToggleDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundLayoutToggleHover": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundLayoutToggleSelectedActive": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundLayoutToggleSelectedDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundLayoutToggleSelectedHover": {
            "light": "{colorPrimary700}",
            "dark": "{colorPrimary300}"
          },
          "colorBackgroundModalOverlay": {
            "light": "{colorGreyOpaque70}",
            "dark": "{colorGreyOpaque70}"
          },
          "colorBackgroundNotificationBlue": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo600}"
          },
          "colorBackgroundNotificationGreen": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess600}"
          },
          "colorBackgroundNotificationGrey": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundNotificationRed": {
            "light": "{colorError600}",
            "dark": "{colorError600}"
          },
          "colorBackgroundNotificationYellow": {
            "light": "{colorWarning400}",
            "dark": "{colorWarning400}"
          },
          "colorBackgroundNotificationStackBar": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundNotificationStackBarActive": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundNotificationStackBarHover": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundPopover": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundProgressBarValueDefault": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorBackgroundProgressBarDefault": {
            "light": "{colorGreyOpaque25}",
            "dark": "{colorGreyOpaque25}"
          },
          "colorBackgroundSegmentActive": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundSegmentDefault": {
            "light": "{colorBackgroundButtonNormalDefault}",
            "dark": "{colorBackgroundButtonNormalDefault}"
          },
          "colorBackgroundSegmentDisabled": {
            "light": "{colorBackgroundButtonNormalDisabled}",
            "dark": "{colorBackgroundButtonNormalDisabled}"
          },
          "colorBackgroundSegmentHover": {
            "light": "{colorBackgroundButtonNormalHover}",
            "dark": "{colorBackgroundButtonNormalHover}"
          },
          "colorBackgroundSegmentWrapper": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundSliderRangeDefault": {
            "light": "{colorBackgroundSliderHandleDefault}",
            "dark": "{colorBackgroundSliderHandleDefault}"
          },
          "colorBackgroundSliderRangeActive": {
            "light": "{colorBackgroundSliderHandleActive}",
            "dark": "{colorBackgroundSliderHandleActive}"
          },
          "colorBackgroundSliderHandleDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundSliderHandleActive": {
            "light": "{colorPrimary700}",
            "dark": "{colorPrimary300}"
          },
          "colorBackgroundSliderTrackDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundSliderHandleRing": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundSliderHandleErrorDefault": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderHandleErrorActive": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderHandleWarningDefault": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderHandleWarningActive": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderRangeErrorDefault": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderRangeErrorActive": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderRangeWarningDefault": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderRangeWarningActive": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundStatusError": {
            "light": "{colorError50}",
            "dark": "{colorError1000}"
          },
          "colorBackgroundStatusInfo": {
            "light": "{colorInfo50}",
            "dark": "{colorInfo1000}"
          },
          "colorBackgroundDialog": {
            "light": "{colorBackgroundStatusInfo}",
            "dark": "{colorBackgroundStatusInfo}"
          },
          "colorBackgroundStatusSuccess": {
            "light": "{colorSuccess50}",
            "dark": "{colorSuccess1000}"
          },
          "colorBackgroundStatusWarning": {
            "light": "{colorWarning50}",
            "dark": "{colorWarning1000}"
          },
          "colorBackgroundTableHeader": {
            "light": "{colorBackgroundContainerHeader}",
            "dark": "{colorBackgroundContainerHeader}"
          },
          "colorBackgroundTilesDisabled": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundToggleCheckedDisabled": {
            "light": "{colorPrimary200}",
            "dark": "{colorPrimary900}"
          },
          "colorBackgroundToggleDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral500}"
          },
          "colorBackgroundAvatarGenAi": {
            "light": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)",
            "dark": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)"
          },
          "colorBackgroundAvatarDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorTextAvatar": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorBackgroundLoadingBarGenAi": {
            "light": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)",
            "dark": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)"
          },
          "colorBackgroundStatusIndicatorError": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorWarning": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorSuccess": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorInfo": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorNeutral": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundChatBubbleOutgoing": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundChatBubbleIncoming": {
            "light": "{colorNeutral150}",
            "dark": "{colorNeutral950}"
          },
          "colorTextChatBubbleOutgoing": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorTextChatBubbleIncoming": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorBorderButtonLinkDisabled": {
            "light": "{colorBackgroundButtonLinkDisabled}",
            "dark": "{colorBackgroundButtonLinkDisabled}"
          },
          "colorBorderButtonNormalActive": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorBorderButtonNormalDefault": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorBorderToggleButtonNormalPressed": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderButtonNormalDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorTextButtonNormalDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderButtonNormalHover": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextButtonIconDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderButtonPrimaryActive": {
            "light": "{colorBackgroundButtonPrimaryActive}",
            "dark": "{colorBackgroundButtonPrimaryActive}"
          },
          "colorBorderButtonPrimaryDefault": {
            "light": "{colorBackgroundButtonPrimaryDefault}",
            "dark": "{colorBackgroundButtonPrimaryDefault}"
          },
          "colorBorderButtonPrimaryDisabled": {
            "light": "{colorBackgroundButtonPrimaryDisabled}",
            "dark": "{colorBackgroundButtonPrimaryDisabled}"
          },
          "colorBorderButtonPrimaryHover": {
            "light": "{colorBackgroundButtonPrimaryHover}",
            "dark": "{colorBackgroundButtonPrimaryHover}"
          },
          "colorTextButtonPrimaryDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorItemSelected": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderCalendarGrid": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderCalendarGridSelectedFocusRing": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral850}"
          },
          "colorBorderCellShaded": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral700}"
          },
          "colorBorderCodeEditorAceActiveLineLightTheme": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderCodeEditorAceActiveLineDarkTheme": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderCodeEditorDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderCodeEditorPaneItemHover": {
            "light": "{colorBorderDropdownItemHover}",
            "dark": "{colorBorderDropdownItemHover}"
          },
          "colorBorderCard": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderCardHighlighted": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderItemCard": {
            "light": "{colorBorderCard}",
            "dark": "{colorBorderCard}"
          },
          "colorBorderItemCardHighlighted": {
            "light": "{colorBorderCardHighlighted}",
            "dark": "{colorBorderCardHighlighted}"
          },
          "colorBorderContainerDivider": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderContainerTop": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderControlChecked": {
            "light": "{colorBackgroundControlChecked}",
            "dark": "{colorBackgroundControlChecked}"
          },
          "colorBorderControlDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderControlDisabled": {
            "light": "{colorBackgroundControlDisabled}",
            "dark": "{colorBackgroundControlDisabled}"
          },
          "colorBorderDividerActive": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorBorderDividerDefault": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorBorderDividerPanelBottom": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDividerPanelSide": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDividerSecondary": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral750}"
          },
          "colorBorderDropdownContainer": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderDropdownGroup": {
            "light": "{colorBorderDropdownItemDefault}",
            "dark": "{colorBorderDropdownItemDefault}"
          },
          "colorBorderDropdownItemDefault": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDropdownItemHover": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderDropdownItemDimmedHover": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderDropdownItemSelected": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderDropdownItemTop": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderEditableCellHover": {
            "light": "{colorBorderDropdownItemHover}",
            "dark": "{colorBorderDropdownItemHover}"
          },
          "colorBorderInputDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderInputDisabled": {
            "light": "{colorBackgroundInputDisabled}",
            "dark": "{colorBackgroundInputDisabled}"
          },
          "colorBorderInputFocused": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderItemFocused": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorBorderDropdownItemFocused": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderItemPlaceholder": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderItemSelected": {
            "light": "{colorItemSelected}",
            "dark": "{colorItemSelected}"
          },
          "colorBorderLayout": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderNotificationStackBar": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBorderPanelHeader": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderPopover": {
            "light": "{colorBorderDropdownContainer}",
            "dark": "{colorBorderDropdownContainer}"
          },
          "colorBorderSegmentActive": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderSegmentDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderSegmentDisabled": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderSegmentHover": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderStatusError": {
            "light": "{colorError600}",
            "dark": "{colorError400}"
          },
          "colorBorderStatusInfo": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo400}"
          },
          "colorBorderStatusSuccess": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess500}"
          },
          "colorBorderStatusWarning": {
            "light": "{colorWarning900}",
            "dark": "{colorWarning500}"
          },
          "colorBorderDialog": {
            "light": "{colorBorderStatusInfo}",
            "dark": "{colorBorderStatusInfo}"
          },
          "colorBorderDividerInteractiveDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderTabsDivider": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderTabsShadow": {
            "light": "{colorGreyTransparent}",
            "dark": "{colorGreyTransparent}"
          },
          "colorBorderTabsUnderline": {
            "light": "{colorTextAccent}",
            "dark": "{colorTextAccent}"
          },
          "colorBorderTilesDisabled": {
            "light": "{colorBackgroundTilesDisabled}",
            "dark": "{colorBackgroundTilesDisabled}"
          },
          "colorBorderTutorial": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral650}"
          },
          "colorForegroundControlDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorForegroundControlDisabled": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorForegroundControlReadOnly": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorShadowDefault": {
            "light": "{colorGreyTransparentHeavy}",
            "dark": "{colorGreyTransparentHeavy}"
          },
          "colorShadowMedium": {
            "light": "{colorGreyTransparent}",
            "dark": "{colorGreyTransparent}"
          },
          "colorShadowSide": {
            "light": "{colorGreyTransparentLight}",
            "dark": "{colorGreyTransparentLight}"
          },
          "colorStrokeChartLine": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorStrokeCodeEditorGutterActiveLineDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral800}"
          },
          "colorStrokeCodeEditorGutterActiveLineHover": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral950}"
          },
          "colorTextAccent": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorTextBodyDefault": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextBodySecondary": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextBreadcrumbCurrent": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral500}"
          },
          "colorTextBreadcrumbIcon": {
            "light": "{colorNeutral500}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonInlineIconDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextButtonInlineIconDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonInlineIconHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextButtonNormalActive": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextToggleButtonNormalPressed": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorTextButtonNormalDefault": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextButtonNormalHover": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLinkButtonNormalDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorTextLinkButtonNormalHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextLinkButtonNormalActive": {
            "light": "{colorTextButtonNormalActive}",
            "dark": "{colorTextButtonNormalActive}"
          },
          "colorTextButtonLinkActive": {
            "light": "{colorTextButtonNormalActive}",
            "dark": "{colorTextButtonNormalActive}"
          },
          "colorTextButtonLinkDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorTextButtonLinkDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonLinkHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextButtonPrimaryActive": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextButtonPrimaryDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextButtonPrimaryHover": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextCalendarDateHover": {
            "light": "{colorTextDropdownItemDefault}",
            "dark": "{colorTextDropdownItemDefault}"
          },
          "colorTextCalendarDateSelected": {
            "light": "{colorBackgroundControlDefault}",
            "dark": "{colorBackgroundControlDefault}"
          },
          "colorTextCalendarMonth": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextCodeEditorGutterActiveLine": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextCodeEditorGutterDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral300}"
          },
          "colorTextCodeEditorStatusBarDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorTextCodeEditorTabButtonError": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextColumnHeader": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral400}"
          },
          "colorTextColumnSortingIcon": {
            "light": "{colorTextColumnHeader}",
            "dark": "{colorTextColumnHeader}"
          },
          "colorTextControlDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextCounter": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorTextDisabledInlineEdit": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral400}"
          },
          "colorTextDropdownFooter": {
            "light": "{colorTextFormSecondary}",
            "dark": "{colorTextFormSecondary}"
          },
          "colorTextDropdownGroupLabel": {
            "light": "{colorTextGroupLabel}",
            "dark": "{colorTextGroupLabel}"
          },
          "colorTextDropdownItemDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral300}"
          },
          "colorTextDropdownItemDimmed": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextDropdownItemDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextDropdownItemFilterMatch": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary300}"
          },
          "colorTextDropdownItemHighlighted": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral250}"
          },
          "colorTextDropdownItemSecondary": {
            "light": "{colorTextFormSecondary}",
            "dark": "{colorTextFormSecondary}"
          },
          "colorTextDropdownItemSecondaryHover": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral300}"
          },
          "colorTextEmpty": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral300}"
          },
          "colorTextExpandableSectionDefault": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextExpandableSectionHover": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextExpandableSectionNavigationIconDefault": {
            "light": "{colorTextInteractiveDefault}",
            "dark": "{colorTextInteractiveDefault}"
          },
          "colorTextFormDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral300}"
          },
          "colorTextFormLabel": {
            "light": "{colorTextFormDefault}",
            "dark": "{colorTextFormDefault}"
          },
          "colorTextFormSecondary": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextGroupLabel": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral350}"
          },
          "colorTextLabelGenAi": {
            "light": "{colorPurple700}",
            "dark": "{colorPurple400}"
          },
          "colorTextHeadingDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral250}"
          },
          "colorTextHeadingSecondary": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextHomeHeaderDefault": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral250}"
          },
          "colorTextHomeHeaderSecondary": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextIconCaret": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral450}"
          },
          "colorTextIconSubtle": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral400}"
          },
          "colorTextInputDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorTextInputPlaceholder": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextInputPlaceholderDisabled": {
            "light": "{colorTextInputDisabled}",
            "dark": "{colorTextInputDisabled}"
          },
          "colorTextInteractiveActive": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInteractiveDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorTextInteractiveDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorTextInteractiveHover": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorTextToggleButtonIconPressed": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInteractiveInvertedDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextInteractiveInvertedHover": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInverted": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLabel": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextKeyValuePairsValue": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorTextLayoutToggle": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLayoutToggleActive": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorTextLayoutToggleHover": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorTextLayoutToggleSelected": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLinkDefault": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextLinkHover": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLinkDecorationDefault": {
            "light": "currentColor",
            "dark": "currentColor"
          },
          "colorTextLinkDecorationHover": {
            "light": "currentColor",
            "dark": "currentColor"
          },
          "colorTextLinkSecondaryDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkSecondaryHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkInfoDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkInfoHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkInvertedHover": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLinkButtonUnderline": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorTextLinkButtonUnderlineHover": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorTextNotificationDefault": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextNotificationStackBar": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextNotificationYellow": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextPaginationPageNumberActiveDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextPaginationPageNumberDefault": {
            "light": "{colorTextInteractiveDefault}",
            "dark": "{colorNeutral400}"
          },
          "colorTextSegmentActive": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextSegmentDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorTextSegmentHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextSmall": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextStatusError": {
            "light": "{colorError600}",
            "dark": "{colorError400}"
          },
          "colorTextStatusInactive": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextStatusInfo": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo400}"
          },
          "colorTextStatusSuccess": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess500}"
          },
          "colorTextStatusWarning": {
            "light": "{colorWarning900}",
            "dark": "{colorWarning500}"
          },
          "colorTextTopNavigationTitle": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorTextTutorialHotspotDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextTutorialHotspotHover": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorBoardPlaceholderActive": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral600}"
          },
          "colorBoardPlaceholderHover": {
            "light": "{colorPrimary100}",
            "dark": "{colorPrimary600}"
          },
          "colorDragPlaceholderActive": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral600}"
          },
          "colorDragPlaceholderHover": {
            "light": "{colorPrimary100}",
            "dark": "{colorPrimary600}"
          },
          "colorDropzoneBackgroundDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorDropzoneBackgroundHover": {
            "light": "{colorPrimary50}",
            "dark": "{colorPrimary1000}"
          },
          "colorDropzoneTextDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral350}"
          },
          "colorDropzoneTextHover": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral350}"
          },
          "colorDropzoneBorderDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorDropzoneBorderHover": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorGapGlobalDrawer": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral950}"
          },
          "colorTreeViewConnectorLine": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral300}"
          },
          "colorBackgroundActionCardDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundActionCardHover": {
            "light": "{colorPrimary50}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundActionCardActive": {
            "light": "{colorPrimary100}",
            "dark": "{colorNeutral700}"
          },
          "colorBorderActionCardDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderActionCardHover": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderActionCardActive": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderActionCardDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundActionCardDisabled": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorTextActionCardDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorIconActionCardDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorIconActionCardHover": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorIconActionCardActive": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorIconActionCardDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundSkeleton": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundSkeletonWave": {
            "light": "{colorNeutral150}",
            "dark": "{colorNeutral700}"
          }
        }
      },
      "flashbar-warning": {
        "id": "flashbar-warning",
        "selector": ".awsui-context-flashbar-warning",
        "tokens": {
          "colorGreyOpaque10": {
            "light": "rgba(0, 0, 0, 0.1)",
            "dark": "rgba(0, 0, 0, 0.1)"
          },
          "colorGreyOpaque25": {
            "light": "rgba(255, 255, 255, 0.25)",
            "dark": "rgba(255, 255, 255, 0.25)"
          },
          "colorGreyOpaque40": {
            "light": "rgba(0, 0, 0, 0.4)",
            "dark": "rgba(0, 0, 0, 0.4)"
          },
          "colorGreyOpaque50": {
            "light": "rgba(0, 0, 0, 0.5)",
            "dark": "rgba(0, 0, 0, 0.5)"
          },
          "colorGreyOpaque70": {
            "light": "rgba(35, 43, 55, 0.7)",
            "dark": "rgba(15, 20, 26, 0.7)"
          },
          "colorGreyOpaque80": {
            "light": "rgba(22, 25, 31, 0.8)",
            "dark": "rgba(22, 25, 31, 0.8)"
          },
          "colorGreyOpaque90": {
            "light": "rgba(242, 243, 243, 0.9)",
            "dark": "rgba(242, 243, 243, 0.9)"
          },
          "colorGreyTransparent": {
            "light": "rgba(15, 20, 26, 0.12)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorGreyTransparentHeavy": {
            "light": "rgba(15, 20, 26, 0.12)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorGreyTransparentLight": {
            "light": "rgba(15, 20, 26, 0.12)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorBackgroundBadgeIcon": {
            "light": "{colorError600}",
            "dark": "{colorError400}"
          },
          "colorBackgroundButtonLinkActive": {
            "light": "{colorPrimary100}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundButtonLinkDefault": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonLinkDisabled": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonLinkHover": {
            "light": "{colorPrimary50}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundButtonNormalActive": {
            "light": "rgba(0, 7, 22, 0.1)",
            "dark": "rgba(0, 7, 22, 0.1)"
          },
          "colorBackgroundButtonNormalDefault": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonNormalDisabled": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundButtonNormalHover": {
            "light": "rgba(0, 7, 22, 0.05)",
            "dark": "rgba(0, 7, 22, 0.05)"
          },
          "colorBackgroundToggleButtonNormalPressed": {
            "light": "{colorPrimary100}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundToggleButtonNormalDefault": {
            "light": "{colorBackgroundButtonNormalDefault}",
            "dark": "{colorBackgroundButtonNormalDefault}"
          },
          "colorBackgroundButtonPrimaryActive": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundButtonPrimaryDefault": {
            "light": "{colorBorderButtonNormalDefault}",
            "dark": "{colorBorderButtonNormalDefault}"
          },
          "colorBackgroundButtonPrimaryDisabled": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundButtonPrimaryHover": {
            "light": "{colorBorderButtonNormalHover}",
            "dark": "{colorBorderButtonNormalHover}"
          },
          "colorBackgroundDirectionButtonActive": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundDirectionButtonDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundDirectionButtonDisabled": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundDirectionButtonHover": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorTextDirectionButtonDefault": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextDirectionButtonDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorBackgroundCalendarCurrentDate": {
            "light": "{colorNeutral200}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundCellShaded": {
            "light": "{colorNeutral150}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorGutterActiveLineDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral500}"
          },
          "colorBackgroundCodeEditorGutterActiveLineError": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundCodeEditorGutterDefault": {
            "light": "{colorNeutral200}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorLoading": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorPaneItemHover": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundCodeEditorStatusBar": {
            "light": "{colorNeutral200}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCard": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundItemCard": {
            "light": "{colorBackgroundCard}",
            "dark": "{colorBackgroundCard}"
          },
          "colorBackgroundContainerContent": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundContainerHeader": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundControlChecked": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundControlDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundControlDisabled": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundDropdownItemDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundDropdownItemDimmed": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundDropdownItemFilterMatch": {
            "light": "{colorPrimary50}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundDropdownItemHover": {
            "light": "{colorNeutral200}",
            "dark": "{colorNeutral900}"
          },
          "colorBackgroundDropdownItemSelected": {
            "light": "{colorBackgroundItemSelected}",
            "dark": "{colorBackgroundItemSelected}"
          },
          "colorBackgroundHomeHeader": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundInlineCode": {
            "light": "rgba(0, 0, 0, 0.1)",
            "dark": "rgba(0, 0, 0, 0.1)"
          },
          "colorBackgroundInputDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundInputDisabled": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundItemSelected": {
            "light": "{colorPrimary50}",
            "dark": "{colorPrimary1000}"
          },
          "colorBackgroundLayoutMain": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundDrawer": {
            "light": "{colorBackgroundLayoutPanelContent}",
            "dark": "{colorBackgroundLayoutPanelContent}"
          },
          "colorBackgroundDrawerBackdrop": {
            "light": "{colorGreyOpaque70}",
            "dark": "{colorGreyOpaque70}"
          },
          "colorBackgroundLayoutMobilePanel": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundLayoutPanelContent": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundLayoutPanelHover": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundLayoutToolbar": {
            "light": "{colorBackgroundLayoutPanelContent}",
            "dark": "{colorBackgroundLayoutPanelContent}"
          },
          "colorBackgroundLayoutToggleActive": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundLayoutToggleDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundLayoutToggleHover": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundLayoutToggleSelectedActive": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundLayoutToggleSelectedDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundLayoutToggleSelectedHover": {
            "light": "{colorPrimary700}",
            "dark": "{colorPrimary300}"
          },
          "colorBackgroundModalOverlay": {
            "light": "{colorGreyOpaque70}",
            "dark": "{colorGreyOpaque70}"
          },
          "colorBackgroundNotificationBlue": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo600}"
          },
          "colorBackgroundNotificationGreen": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess600}"
          },
          "colorBackgroundNotificationGrey": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundNotificationRed": {
            "light": "{colorError600}",
            "dark": "{colorError600}"
          },
          "colorBackgroundNotificationYellow": {
            "light": "{colorWarning400}",
            "dark": "{colorWarning400}"
          },
          "colorBackgroundNotificationStackBar": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundNotificationStackBarActive": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundNotificationStackBarHover": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundPopover": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundProgressBarValueDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundProgressBarDefault": {
            "light": "{colorGreyOpaque10}",
            "dark": "{colorGreyOpaque10}"
          },
          "colorBackgroundSegmentActive": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundSegmentDefault": {
            "light": "{colorBackgroundButtonNormalDefault}",
            "dark": "{colorBackgroundButtonNormalDefault}"
          },
          "colorBackgroundSegmentDisabled": {
            "light": "{colorBackgroundButtonNormalDisabled}",
            "dark": "{colorBackgroundButtonNormalDisabled}"
          },
          "colorBackgroundSegmentHover": {
            "light": "{colorBackgroundButtonNormalHover}",
            "dark": "{colorBackgroundButtonNormalHover}"
          },
          "colorBackgroundSegmentWrapper": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundSliderRangeDefault": {
            "light": "{colorBackgroundSliderHandleDefault}",
            "dark": "{colorBackgroundSliderHandleDefault}"
          },
          "colorBackgroundSliderRangeActive": {
            "light": "{colorBackgroundSliderHandleActive}",
            "dark": "{colorBackgroundSliderHandleActive}"
          },
          "colorBackgroundSliderHandleDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundSliderHandleActive": {
            "light": "{colorPrimary700}",
            "dark": "{colorPrimary300}"
          },
          "colorBackgroundSliderTrackDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundSliderHandleRing": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundSliderHandleErrorDefault": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderHandleErrorActive": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderHandleWarningDefault": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderHandleWarningActive": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderRangeErrorDefault": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderRangeErrorActive": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderRangeWarningDefault": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderRangeWarningActive": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundStatusError": {
            "light": "{colorError50}",
            "dark": "{colorError1000}"
          },
          "colorBackgroundStatusInfo": {
            "light": "{colorInfo50}",
            "dark": "{colorInfo1000}"
          },
          "colorBackgroundDialog": {
            "light": "{colorBackgroundStatusInfo}",
            "dark": "{colorBackgroundStatusInfo}"
          },
          "colorBackgroundStatusSuccess": {
            "light": "{colorSuccess50}",
            "dark": "{colorSuccess1000}"
          },
          "colorBackgroundStatusWarning": {
            "light": "{colorWarning50}",
            "dark": "{colorWarning1000}"
          },
          "colorBackgroundTableHeader": {
            "light": "{colorBackgroundContainerHeader}",
            "dark": "{colorBackgroundContainerHeader}"
          },
          "colorBackgroundTilesDisabled": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundToggleCheckedDisabled": {
            "light": "{colorPrimary200}",
            "dark": "{colorPrimary900}"
          },
          "colorBackgroundToggleDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral500}"
          },
          "colorBackgroundAvatarGenAi": {
            "light": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)",
            "dark": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)"
          },
          "colorBackgroundAvatarDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorTextAvatar": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorBackgroundLoadingBarGenAi": {
            "light": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)",
            "dark": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)"
          },
          "colorBackgroundStatusIndicatorError": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorWarning": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorSuccess": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorInfo": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorNeutral": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundChatBubbleOutgoing": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundChatBubbleIncoming": {
            "light": "{colorNeutral150}",
            "dark": "{colorNeutral950}"
          },
          "colorTextChatBubbleOutgoing": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorTextChatBubbleIncoming": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorBorderButtonLinkDisabled": {
            "light": "{colorBackgroundButtonLinkDisabled}",
            "dark": "{colorBackgroundButtonLinkDisabled}"
          },
          "colorBorderButtonNormalActive": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorBorderButtonNormalDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorBorderToggleButtonNormalPressed": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderButtonNormalDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorTextButtonNormalDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderButtonNormalHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextButtonIconDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderButtonPrimaryActive": {
            "light": "{colorBackgroundButtonPrimaryActive}",
            "dark": "{colorBackgroundButtonPrimaryActive}"
          },
          "colorBorderButtonPrimaryDefault": {
            "light": "{colorBackgroundButtonPrimaryDefault}",
            "dark": "{colorBackgroundButtonPrimaryDefault}"
          },
          "colorBorderButtonPrimaryDisabled": {
            "light": "{colorBackgroundButtonPrimaryDisabled}",
            "dark": "{colorBackgroundButtonPrimaryDisabled}"
          },
          "colorBorderButtonPrimaryHover": {
            "light": "{colorBackgroundButtonPrimaryHover}",
            "dark": "{colorBackgroundButtonPrimaryHover}"
          },
          "colorTextButtonPrimaryDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorItemSelected": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderCalendarGrid": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderCalendarGridSelectedFocusRing": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral850}"
          },
          "colorBorderCellShaded": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral700}"
          },
          "colorBorderCodeEditorAceActiveLineLightTheme": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderCodeEditorAceActiveLineDarkTheme": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderCodeEditorDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderCodeEditorPaneItemHover": {
            "light": "{colorBorderDropdownItemHover}",
            "dark": "{colorBorderDropdownItemHover}"
          },
          "colorBorderCard": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderCardHighlighted": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderItemCard": {
            "light": "{colorBorderCard}",
            "dark": "{colorBorderCard}"
          },
          "colorBorderItemCardHighlighted": {
            "light": "{colorBorderCardHighlighted}",
            "dark": "{colorBorderCardHighlighted}"
          },
          "colorBorderContainerDivider": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderContainerTop": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderControlChecked": {
            "light": "{colorBackgroundControlChecked}",
            "dark": "{colorBackgroundControlChecked}"
          },
          "colorBorderControlDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderControlDisabled": {
            "light": "{colorBackgroundControlDisabled}",
            "dark": "{colorBackgroundControlDisabled}"
          },
          "colorBorderDividerActive": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorBorderDividerDefault": {
            "light": "{colorTextNotificationYellow}",
            "dark": "{colorTextNotificationYellow}"
          },
          "colorBorderDividerPanelBottom": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDividerPanelSide": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDividerSecondary": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral750}"
          },
          "colorBorderDropdownContainer": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderDropdownGroup": {
            "light": "{colorBorderDropdownItemDefault}",
            "dark": "{colorBorderDropdownItemDefault}"
          },
          "colorBorderDropdownItemDefault": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDropdownItemHover": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderDropdownItemDimmedHover": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderDropdownItemSelected": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderDropdownItemTop": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderEditableCellHover": {
            "light": "{colorBorderDropdownItemHover}",
            "dark": "{colorBorderDropdownItemHover}"
          },
          "colorBorderInputDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderInputDisabled": {
            "light": "{colorBackgroundInputDisabled}",
            "dark": "{colorBackgroundInputDisabled}"
          },
          "colorBorderInputFocused": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderItemFocused": {
            "light": "{colorTextNotificationYellow}",
            "dark": "{colorTextNotificationYellow}"
          },
          "colorBorderDropdownItemFocused": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderItemPlaceholder": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderItemSelected": {
            "light": "{colorItemSelected}",
            "dark": "{colorItemSelected}"
          },
          "colorBorderLayout": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderNotificationStackBar": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBorderPanelHeader": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderPopover": {
            "light": "{colorBorderDropdownContainer}",
            "dark": "{colorBorderDropdownContainer}"
          },
          "colorBorderSegmentActive": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderSegmentDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderSegmentDisabled": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderSegmentHover": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderStatusError": {
            "light": "{colorError600}",
            "dark": "{colorError400}"
          },
          "colorBorderStatusInfo": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo400}"
          },
          "colorBorderStatusSuccess": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess500}"
          },
          "colorBorderStatusWarning": {
            "light": "{colorWarning900}",
            "dark": "{colorWarning500}"
          },
          "colorBorderDialog": {
            "light": "{colorBorderStatusInfo}",
            "dark": "{colorBorderStatusInfo}"
          },
          "colorBorderDividerInteractiveDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderTabsDivider": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderTabsShadow": {
            "light": "{colorGreyTransparent}",
            "dark": "{colorGreyTransparent}"
          },
          "colorBorderTabsUnderline": {
            "light": "{colorTextAccent}",
            "dark": "{colorTextAccent}"
          },
          "colorBorderTilesDisabled": {
            "light": "{colorBackgroundTilesDisabled}",
            "dark": "{colorBackgroundTilesDisabled}"
          },
          "colorBorderTutorial": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral650}"
          },
          "colorForegroundControlDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorForegroundControlDisabled": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorForegroundControlReadOnly": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorShadowDefault": {
            "light": "{colorGreyTransparentHeavy}",
            "dark": "{colorGreyTransparentHeavy}"
          },
          "colorShadowMedium": {
            "light": "{colorGreyTransparent}",
            "dark": "{colorGreyTransparent}"
          },
          "colorShadowSide": {
            "light": "{colorGreyTransparentLight}",
            "dark": "{colorGreyTransparentLight}"
          },
          "colorStrokeChartLine": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorStrokeCodeEditorGutterActiveLineDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral800}"
          },
          "colorStrokeCodeEditorGutterActiveLineHover": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral950}"
          },
          "colorTextAccent": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorTextBodyDefault": {
            "light": "{colorTextNotificationYellow}",
            "dark": "{colorTextNotificationYellow}"
          },
          "colorTextBodySecondary": {
            "light": "{colorTextNotificationYellow}",
            "dark": "{colorTextNotificationYellow}"
          },
          "colorTextBreadcrumbCurrent": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral500}"
          },
          "colorTextBreadcrumbIcon": {
            "light": "{colorNeutral500}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonInlineIconDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextButtonInlineIconDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonInlineIconHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextButtonNormalActive": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextToggleButtonNormalPressed": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorTextButtonNormalDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorTextButtonNormalHover": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLinkButtonNormalDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkButtonNormalHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkButtonNormalActive": {
            "light": "{colorTextButtonNormalActive}",
            "dark": "{colorTextButtonNormalActive}"
          },
          "colorTextButtonLinkActive": {
            "light": "{colorTextButtonNormalActive}",
            "dark": "{colorTextButtonNormalActive}"
          },
          "colorTextButtonLinkDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorTextButtonLinkDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonLinkHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextButtonPrimaryActive": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextButtonPrimaryDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextButtonPrimaryHover": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextCalendarDateHover": {
            "light": "{colorTextDropdownItemDefault}",
            "dark": "{colorTextDropdownItemDefault}"
          },
          "colorTextCalendarDateSelected": {
            "light": "{colorBackgroundControlDefault}",
            "dark": "{colorBackgroundControlDefault}"
          },
          "colorTextCalendarMonth": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextCodeEditorGutterActiveLine": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextCodeEditorGutterDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral300}"
          },
          "colorTextCodeEditorStatusBarDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorTextCodeEditorTabButtonError": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextColumnHeader": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral400}"
          },
          "colorTextColumnSortingIcon": {
            "light": "{colorTextColumnHeader}",
            "dark": "{colorTextColumnHeader}"
          },
          "colorTextControlDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextCounter": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorTextDisabledInlineEdit": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral400}"
          },
          "colorTextDropdownFooter": {
            "light": "{colorTextFormSecondary}",
            "dark": "{colorTextFormSecondary}"
          },
          "colorTextDropdownGroupLabel": {
            "light": "{colorTextGroupLabel}",
            "dark": "{colorTextGroupLabel}"
          },
          "colorTextDropdownItemDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral300}"
          },
          "colorTextDropdownItemDimmed": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextDropdownItemDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextDropdownItemFilterMatch": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary300}"
          },
          "colorTextDropdownItemHighlighted": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral250}"
          },
          "colorTextDropdownItemSecondary": {
            "light": "{colorTextFormSecondary}",
            "dark": "{colorTextFormSecondary}"
          },
          "colorTextDropdownItemSecondaryHover": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral300}"
          },
          "colorTextEmpty": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral300}"
          },
          "colorTextExpandableSectionDefault": {
            "light": "{colorTextNotificationYellow}",
            "dark": "{colorTextNotificationYellow}"
          },
          "colorTextExpandableSectionHover": {
            "light": "{colorTextNotificationYellow}",
            "dark": "{colorTextNotificationYellow}"
          },
          "colorTextExpandableSectionNavigationIconDefault": {
            "light": "{colorTextInteractiveDefault}",
            "dark": "{colorTextInteractiveDefault}"
          },
          "colorTextFormDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral300}"
          },
          "colorTextFormLabel": {
            "light": "{colorTextFormDefault}",
            "dark": "{colorTextFormDefault}"
          },
          "colorTextFormSecondary": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextGroupLabel": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral350}"
          },
          "colorTextLabelGenAi": {
            "light": "{colorPurple700}",
            "dark": "{colorPurple400}"
          },
          "colorTextHeadingDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral250}"
          },
          "colorTextHeadingSecondary": {
            "light": "{colorTextNotificationYellow}",
            "dark": "{colorTextNotificationYellow}"
          },
          "colorTextHomeHeaderDefault": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral250}"
          },
          "colorTextHomeHeaderSecondary": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextIconCaret": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral450}"
          },
          "colorTextIconSubtle": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral400}"
          },
          "colorTextInputDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorTextInputPlaceholder": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextInputPlaceholderDisabled": {
            "light": "{colorTextInputDisabled}",
            "dark": "{colorTextInputDisabled}"
          },
          "colorTextInteractiveActive": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInteractiveDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorTextInteractiveDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorTextInteractiveHover": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorTextToggleButtonIconPressed": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInteractiveInvertedDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorTextInteractiveInvertedHover": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextInverted": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLabel": {
            "light": "{colorTextNotificationYellow}",
            "dark": "{colorTextNotificationYellow}"
          },
          "colorTextKeyValuePairsValue": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorTextLayoutToggle": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLayoutToggleActive": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorTextLayoutToggleHover": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorTextLayoutToggleSelected": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLinkDefault": {
            "light": "{colorTextNotificationYellow}",
            "dark": "{colorTextNotificationYellow}"
          },
          "colorTextLinkHover": {
            "light": "{colorTextNotificationYellow}",
            "dark": "{colorTextNotificationYellow}"
          },
          "colorTextLinkDecorationDefault": {
            "light": "currentColor",
            "dark": "currentColor"
          },
          "colorTextLinkDecorationHover": {
            "light": "currentColor",
            "dark": "currentColor"
          },
          "colorTextLinkSecondaryDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkSecondaryHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkInfoDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkInfoHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkInvertedHover": {
            "light": "{colorTextNotificationYellow}",
            "dark": "{colorTextNotificationYellow}"
          },
          "colorTextLinkButtonUnderline": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorTextLinkButtonUnderlineHover": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorTextNotificationDefault": {
            "light": "{colorTextNotificationYellow}",
            "dark": "{colorTextNotificationYellow}"
          },
          "colorTextNotificationStackBar": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextNotificationYellow": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextPaginationPageNumberActiveDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextPaginationPageNumberDefault": {
            "light": "{colorTextInteractiveDefault}",
            "dark": "{colorNeutral400}"
          },
          "colorTextSegmentActive": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextSegmentDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorTextSegmentHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextSmall": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextStatusError": {
            "light": "{colorError600}",
            "dark": "{colorError400}"
          },
          "colorTextStatusInactive": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextStatusInfo": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo400}"
          },
          "colorTextStatusSuccess": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess500}"
          },
          "colorTextStatusWarning": {
            "light": "{colorWarning900}",
            "dark": "{colorWarning500}"
          },
          "colorTextTopNavigationTitle": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorTextTutorialHotspotDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextTutorialHotspotHover": {
            "light": "{colorNeutral900}",
            "dark": "{colorNeutral900}"
          },
          "colorBoardPlaceholderActive": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral600}"
          },
          "colorBoardPlaceholderHover": {
            "light": "{colorPrimary100}",
            "dark": "{colorPrimary600}"
          },
          "colorDragPlaceholderActive": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral600}"
          },
          "colorDragPlaceholderHover": {
            "light": "{colorPrimary100}",
            "dark": "{colorPrimary600}"
          },
          "colorDropzoneBackgroundDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorDropzoneBackgroundHover": {
            "light": "{colorPrimary50}",
            "dark": "{colorPrimary1000}"
          },
          "colorDropzoneTextDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral350}"
          },
          "colorDropzoneTextHover": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral350}"
          },
          "colorDropzoneBorderDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorDropzoneBorderHover": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorGapGlobalDrawer": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral950}"
          },
          "colorTreeViewConnectorLine": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral300}"
          },
          "colorBackgroundActionCardDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundActionCardHover": {
            "light": "{colorPrimary50}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundActionCardActive": {
            "light": "{colorPrimary100}",
            "dark": "{colorNeutral700}"
          },
          "colorBorderActionCardDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderActionCardHover": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderActionCardActive": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderActionCardDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundActionCardDisabled": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorTextActionCardDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorIconActionCardDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorIconActionCardHover": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorIconActionCardActive": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorIconActionCardDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundSkeleton": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundSkeletonWave": {
            "light": "{colorNeutral150}",
            "dark": "{colorNeutral700}"
          }
        }
      },
      "alert": {
        "id": "alert",
        "selector": ".awsui-context-alert",
        "tokens": {
          "colorGreyOpaque10": {
            "light": "rgba(0, 0, 0, 0.1)",
            "dark": "rgba(0, 0, 0, 0.1)"
          },
          "colorGreyOpaque25": {
            "light": "rgba(255, 255, 255, 0.25)",
            "dark": "rgba(255, 255, 255, 0.25)"
          },
          "colorGreyOpaque40": {
            "light": "rgba(0, 0, 0, 0.4)",
            "dark": "rgba(0, 0, 0, 0.4)"
          },
          "colorGreyOpaque50": {
            "light": "rgba(0, 0, 0, 0.5)",
            "dark": "rgba(0, 0, 0, 0.5)"
          },
          "colorGreyOpaque70": {
            "light": "rgba(35, 43, 55, 0.7)",
            "dark": "rgba(15, 20, 26, 0.7)"
          },
          "colorGreyOpaque80": {
            "light": "rgba(22, 25, 31, 0.8)",
            "dark": "rgba(22, 25, 31, 0.8)"
          },
          "colorGreyOpaque90": {
            "light": "rgba(242, 243, 243, 0.9)",
            "dark": "rgba(242, 243, 243, 0.9)"
          },
          "colorGreyTransparent": {
            "light": "rgba(15, 20, 26, 0.12)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorGreyTransparentHeavy": {
            "light": "rgba(15, 20, 26, 0.12)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorGreyTransparentLight": {
            "light": "rgba(15, 20, 26, 0.12)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorBackgroundBadgeIcon": {
            "light": "{colorError600}",
            "dark": "{colorError400}"
          },
          "colorBackgroundButtonLinkActive": {
            "light": "{colorPrimary100}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundButtonLinkDefault": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonLinkDisabled": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonLinkHover": {
            "light": "{colorPrimary50}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundButtonNormalActive": {
            "light": "rgba(0, 7, 22, 0.1)",
            "dark": "rgba(255, 255, 255, 0.15)"
          },
          "colorBackgroundButtonNormalDefault": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonNormalDisabled": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundButtonNormalHover": {
            "light": "rgba(0, 7, 22, 0.05)",
            "dark": "rgba(255, 255, 255, 0.1)"
          },
          "colorBackgroundToggleButtonNormalPressed": {
            "light": "{colorPrimary100}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundToggleButtonNormalDefault": {
            "light": "{colorBackgroundButtonNormalDefault}",
            "dark": "{colorBackgroundButtonNormalDefault}"
          },
          "colorBackgroundButtonPrimaryActive": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundButtonPrimaryDefault": {
            "light": "{colorBorderButtonNormalDefault}",
            "dark": "{colorBorderButtonNormalDefault}"
          },
          "colorBackgroundButtonPrimaryDisabled": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundButtonPrimaryHover": {
            "light": "{colorBorderButtonNormalHover}",
            "dark": "{colorBorderButtonNormalHover}"
          },
          "colorBackgroundDirectionButtonActive": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundDirectionButtonDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundDirectionButtonDisabled": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundDirectionButtonHover": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorTextDirectionButtonDefault": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextDirectionButtonDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorBackgroundCalendarCurrentDate": {
            "light": "{colorNeutral200}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundCellShaded": {
            "light": "{colorNeutral150}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorGutterActiveLineDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral500}"
          },
          "colorBackgroundCodeEditorGutterActiveLineError": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundCodeEditorGutterDefault": {
            "light": "{colorNeutral200}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorLoading": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorPaneItemHover": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundCodeEditorStatusBar": {
            "light": "{colorNeutral200}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCard": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundItemCard": {
            "light": "{colorBackgroundCard}",
            "dark": "{colorBackgroundCard}"
          },
          "colorBackgroundContainerContent": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundContainerHeader": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundControlChecked": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundControlDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundControlDisabled": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundDropdownItemDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundDropdownItemDimmed": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundDropdownItemFilterMatch": {
            "light": "{colorPrimary50}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundDropdownItemHover": {
            "light": "{colorNeutral200}",
            "dark": "{colorNeutral900}"
          },
          "colorBackgroundDropdownItemSelected": {
            "light": "{colorBackgroundItemSelected}",
            "dark": "{colorBackgroundItemSelected}"
          },
          "colorBackgroundHomeHeader": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundInlineCode": {
            "light": "rgba(0, 0, 0, 0.1)",
            "dark": "rgba(255, 255, 255, 0.1)"
          },
          "colorBackgroundInputDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundInputDisabled": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundItemSelected": {
            "light": "{colorPrimary50}",
            "dark": "{colorPrimary1000}"
          },
          "colorBackgroundLayoutMain": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundDrawer": {
            "light": "{colorBackgroundLayoutPanelContent}",
            "dark": "{colorBackgroundLayoutPanelContent}"
          },
          "colorBackgroundDrawerBackdrop": {
            "light": "{colorGreyOpaque70}",
            "dark": "{colorGreyOpaque70}"
          },
          "colorBackgroundLayoutMobilePanel": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundLayoutPanelContent": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundLayoutPanelHover": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundLayoutToolbar": {
            "light": "{colorBackgroundLayoutPanelContent}",
            "dark": "{colorBackgroundLayoutPanelContent}"
          },
          "colorBackgroundLayoutToggleActive": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundLayoutToggleDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundLayoutToggleHover": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundLayoutToggleSelectedActive": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundLayoutToggleSelectedDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundLayoutToggleSelectedHover": {
            "light": "{colorPrimary700}",
            "dark": "{colorPrimary300}"
          },
          "colorBackgroundModalOverlay": {
            "light": "{colorGreyOpaque70}",
            "dark": "{colorGreyOpaque70}"
          },
          "colorBackgroundNotificationBlue": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo600}"
          },
          "colorBackgroundNotificationGreen": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess600}"
          },
          "colorBackgroundNotificationGrey": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundNotificationRed": {
            "light": "{colorError600}",
            "dark": "{colorError600}"
          },
          "colorBackgroundNotificationYellow": {
            "light": "{colorWarning400}",
            "dark": "{colorWarning400}"
          },
          "colorBackgroundNotificationStackBar": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundNotificationStackBarActive": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundNotificationStackBarHover": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundPopover": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundProgressBarValueDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundProgressBarDefault": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundSegmentActive": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundSegmentDefault": {
            "light": "{colorBackgroundButtonNormalDefault}",
            "dark": "{colorBackgroundButtonNormalDefault}"
          },
          "colorBackgroundSegmentDisabled": {
            "light": "{colorBackgroundButtonNormalDisabled}",
            "dark": "{colorBackgroundButtonNormalDisabled}"
          },
          "colorBackgroundSegmentHover": {
            "light": "{colorBackgroundButtonNormalHover}",
            "dark": "{colorBackgroundButtonNormalHover}"
          },
          "colorBackgroundSegmentWrapper": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundSliderRangeDefault": {
            "light": "{colorBackgroundSliderHandleDefault}",
            "dark": "{colorBackgroundSliderHandleDefault}"
          },
          "colorBackgroundSliderRangeActive": {
            "light": "{colorBackgroundSliderHandleActive}",
            "dark": "{colorBackgroundSliderHandleActive}"
          },
          "colorBackgroundSliderHandleDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundSliderHandleActive": {
            "light": "{colorPrimary700}",
            "dark": "{colorPrimary300}"
          },
          "colorBackgroundSliderTrackDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundSliderHandleRing": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundSliderHandleErrorDefault": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderHandleErrorActive": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderHandleWarningDefault": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderHandleWarningActive": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderRangeErrorDefault": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderRangeErrorActive": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderRangeWarningDefault": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderRangeWarningActive": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundStatusError": {
            "light": "{colorError50}",
            "dark": "{colorError1000}"
          },
          "colorBackgroundStatusInfo": {
            "light": "{colorInfo50}",
            "dark": "{colorInfo1000}"
          },
          "colorBackgroundDialog": {
            "light": "{colorBackgroundStatusInfo}",
            "dark": "{colorBackgroundStatusInfo}"
          },
          "colorBackgroundStatusSuccess": {
            "light": "{colorSuccess50}",
            "dark": "{colorSuccess1000}"
          },
          "colorBackgroundStatusWarning": {
            "light": "{colorWarning50}",
            "dark": "{colorWarning1000}"
          },
          "colorBackgroundTableHeader": {
            "light": "{colorBackgroundContainerHeader}",
            "dark": "{colorBackgroundContainerHeader}"
          },
          "colorBackgroundTilesDisabled": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundToggleCheckedDisabled": {
            "light": "{colorPrimary200}",
            "dark": "{colorPrimary900}"
          },
          "colorBackgroundToggleDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral500}"
          },
          "colorBackgroundAvatarGenAi": {
            "light": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)",
            "dark": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)"
          },
          "colorBackgroundAvatarDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorTextAvatar": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorBackgroundLoadingBarGenAi": {
            "light": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)",
            "dark": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)"
          },
          "colorBackgroundStatusIndicatorError": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorWarning": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorSuccess": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorInfo": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorNeutral": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundChatBubbleOutgoing": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundChatBubbleIncoming": {
            "light": "{colorNeutral150}",
            "dark": "{colorNeutral950}"
          },
          "colorTextChatBubbleOutgoing": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorTextChatBubbleIncoming": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorBorderButtonLinkDisabled": {
            "light": "{colorBackgroundButtonLinkDisabled}",
            "dark": "{colorBackgroundButtonLinkDisabled}"
          },
          "colorBorderButtonNormalActive": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorBorderButtonNormalDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorBorderToggleButtonNormalPressed": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderButtonNormalDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorTextButtonNormalDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderButtonNormalHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextButtonIconDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderButtonPrimaryActive": {
            "light": "{colorBackgroundButtonPrimaryActive}",
            "dark": "{colorBackgroundButtonPrimaryActive}"
          },
          "colorBorderButtonPrimaryDefault": {
            "light": "{colorBackgroundButtonPrimaryDefault}",
            "dark": "{colorBackgroundButtonPrimaryDefault}"
          },
          "colorBorderButtonPrimaryDisabled": {
            "light": "{colorBackgroundButtonPrimaryDisabled}",
            "dark": "{colorBackgroundButtonPrimaryDisabled}"
          },
          "colorBorderButtonPrimaryHover": {
            "light": "{colorBackgroundButtonPrimaryHover}",
            "dark": "{colorBackgroundButtonPrimaryHover}"
          },
          "colorTextButtonPrimaryDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorItemSelected": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderCalendarGrid": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderCalendarGridSelectedFocusRing": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral850}"
          },
          "colorBorderCellShaded": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral700}"
          },
          "colorBorderCodeEditorAceActiveLineLightTheme": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderCodeEditorAceActiveLineDarkTheme": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderCodeEditorDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderCodeEditorPaneItemHover": {
            "light": "{colorBorderDropdownItemHover}",
            "dark": "{colorBorderDropdownItemHover}"
          },
          "colorBorderCard": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderCardHighlighted": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderItemCard": {
            "light": "{colorBorderCard}",
            "dark": "{colorBorderCard}"
          },
          "colorBorderItemCardHighlighted": {
            "light": "{colorBorderCardHighlighted}",
            "dark": "{colorBorderCardHighlighted}"
          },
          "colorBorderContainerDivider": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderContainerTop": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderControlChecked": {
            "light": "{colorBackgroundControlChecked}",
            "dark": "{colorBackgroundControlChecked}"
          },
          "colorBorderControlDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderControlDisabled": {
            "light": "{colorBackgroundControlDisabled}",
            "dark": "{colorBackgroundControlDisabled}"
          },
          "colorBorderDividerActive": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorBorderDividerDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorBorderDividerPanelBottom": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDividerPanelSide": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDividerSecondary": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral750}"
          },
          "colorBorderDropdownContainer": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderDropdownGroup": {
            "light": "{colorBorderDropdownItemDefault}",
            "dark": "{colorBorderDropdownItemDefault}"
          },
          "colorBorderDropdownItemDefault": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDropdownItemHover": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderDropdownItemDimmedHover": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderDropdownItemSelected": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderDropdownItemTop": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderEditableCellHover": {
            "light": "{colorBorderDropdownItemHover}",
            "dark": "{colorBorderDropdownItemHover}"
          },
          "colorBorderInputDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderInputDisabled": {
            "light": "{colorBackgroundInputDisabled}",
            "dark": "{colorBackgroundInputDisabled}"
          },
          "colorBorderInputFocused": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderItemFocused": {
            "light": "{colorPrimary600}",
            "dark": "{colorNeutral100}"
          },
          "colorBorderDropdownItemFocused": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderItemPlaceholder": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderItemSelected": {
            "light": "{colorItemSelected}",
            "dark": "{colorItemSelected}"
          },
          "colorBorderLayout": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderNotificationStackBar": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBorderPanelHeader": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderPopover": {
            "light": "{colorBorderDropdownContainer}",
            "dark": "{colorBorderDropdownContainer}"
          },
          "colorBorderSegmentActive": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderSegmentDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderSegmentDisabled": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderSegmentHover": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderStatusError": {
            "light": "{colorError600}",
            "dark": "{colorError400}"
          },
          "colorBorderStatusInfo": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo400}"
          },
          "colorBorderStatusSuccess": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess500}"
          },
          "colorBorderStatusWarning": {
            "light": "{colorWarning900}",
            "dark": "{colorWarning500}"
          },
          "colorBorderDialog": {
            "light": "{colorBorderStatusInfo}",
            "dark": "{colorBorderStatusInfo}"
          },
          "colorBorderDividerInteractiveDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderTabsDivider": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderTabsShadow": {
            "light": "{colorGreyTransparent}",
            "dark": "{colorGreyTransparent}"
          },
          "colorBorderTabsUnderline": {
            "light": "{colorTextAccent}",
            "dark": "{colorTextAccent}"
          },
          "colorBorderTilesDisabled": {
            "light": "{colorBackgroundTilesDisabled}",
            "dark": "{colorBackgroundTilesDisabled}"
          },
          "colorBorderTutorial": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral650}"
          },
          "colorForegroundControlDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorForegroundControlDisabled": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorForegroundControlReadOnly": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorShadowDefault": {
            "light": "{colorGreyTransparentHeavy}",
            "dark": "{colorGreyTransparentHeavy}"
          },
          "colorShadowMedium": {
            "light": "{colorGreyTransparent}",
            "dark": "{colorGreyTransparent}"
          },
          "colorShadowSide": {
            "light": "{colorGreyTransparentLight}",
            "dark": "{colorGreyTransparentLight}"
          },
          "colorStrokeChartLine": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorStrokeCodeEditorGutterActiveLineDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral800}"
          },
          "colorStrokeCodeEditorGutterActiveLineHover": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral950}"
          },
          "colorTextAccent": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorTextBodyDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral350}"
          },
          "colorTextBodySecondary": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral350}"
          },
          "colorTextBreadcrumbCurrent": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral500}"
          },
          "colorTextBreadcrumbIcon": {
            "light": "{colorNeutral500}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonInlineIconDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextButtonInlineIconDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonInlineIconHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextButtonNormalActive": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextToggleButtonNormalPressed": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorTextButtonNormalDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorTextButtonNormalHover": {
            "light": "{colorNeutral950}",
            "dark": "{colorWhite}"
          },
          "colorTextLinkButtonNormalDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkButtonNormalHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkButtonNormalActive": {
            "light": "{colorTextButtonNormalActive}",
            "dark": "{colorTextButtonNormalActive}"
          },
          "colorTextButtonLinkActive": {
            "light": "{colorTextButtonNormalActive}",
            "dark": "{colorTextButtonNormalActive}"
          },
          "colorTextButtonLinkDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorTextButtonLinkDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonLinkHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextButtonPrimaryActive": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextButtonPrimaryDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextButtonPrimaryHover": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextCalendarDateHover": {
            "light": "{colorTextDropdownItemDefault}",
            "dark": "{colorTextDropdownItemDefault}"
          },
          "colorTextCalendarDateSelected": {
            "light": "{colorBackgroundControlDefault}",
            "dark": "{colorBackgroundControlDefault}"
          },
          "colorTextCalendarMonth": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextCodeEditorGutterActiveLine": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextCodeEditorGutterDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral300}"
          },
          "colorTextCodeEditorStatusBarDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorTextCodeEditorTabButtonError": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextColumnHeader": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral400}"
          },
          "colorTextColumnSortingIcon": {
            "light": "{colorTextColumnHeader}",
            "dark": "{colorTextColumnHeader}"
          },
          "colorTextControlDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextCounter": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorTextDisabledInlineEdit": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral400}"
          },
          "colorTextDropdownFooter": {
            "light": "{colorTextFormSecondary}",
            "dark": "{colorTextFormSecondary}"
          },
          "colorTextDropdownGroupLabel": {
            "light": "{colorTextGroupLabel}",
            "dark": "{colorTextGroupLabel}"
          },
          "colorTextDropdownItemDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral300}"
          },
          "colorTextDropdownItemDimmed": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextDropdownItemDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextDropdownItemFilterMatch": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary300}"
          },
          "colorTextDropdownItemHighlighted": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral250}"
          },
          "colorTextDropdownItemSecondary": {
            "light": "{colorTextFormSecondary}",
            "dark": "{colorTextFormSecondary}"
          },
          "colorTextDropdownItemSecondaryHover": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral300}"
          },
          "colorTextEmpty": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral300}"
          },
          "colorTextExpandableSectionDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorTextExpandableSectionHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextExpandableSectionNavigationIconDefault": {
            "light": "{colorTextInteractiveDefault}",
            "dark": "{colorTextInteractiveDefault}"
          },
          "colorTextFormDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral300}"
          },
          "colorTextFormLabel": {
            "light": "{colorTextFormDefault}",
            "dark": "{colorTextFormDefault}"
          },
          "colorTextFormSecondary": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextGroupLabel": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral350}"
          },
          "colorTextLabelGenAi": {
            "light": "{colorPurple700}",
            "dark": "{colorPurple400}"
          },
          "colorTextHeadingDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral250}"
          },
          "colorTextHeadingSecondary": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral450}"
          },
          "colorTextHomeHeaderDefault": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral250}"
          },
          "colorTextHomeHeaderSecondary": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextIconCaret": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral450}"
          },
          "colorTextIconSubtle": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral400}"
          },
          "colorTextInputDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorTextInputPlaceholder": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextInputPlaceholderDisabled": {
            "light": "{colorTextInputDisabled}",
            "dark": "{colorTextInputDisabled}"
          },
          "colorTextInteractiveActive": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInteractiveDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorTextInteractiveDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorTextInteractiveHover": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorTextToggleButtonIconPressed": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInteractiveInvertedDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextInteractiveInvertedHover": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInverted": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLabel": {
            "light": "{colorTextFormLabel}",
            "dark": "{colorTextFormLabel}"
          },
          "colorTextKeyValuePairsValue": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorTextLayoutToggle": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLayoutToggleActive": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorTextLayoutToggleHover": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorTextLayoutToggleSelected": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLinkDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorTextLinkHover": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorTextLinkDecorationDefault": {
            "light": "currentColor",
            "dark": "currentColor"
          },
          "colorTextLinkDecorationHover": {
            "light": "currentColor",
            "dark": "currentColor"
          },
          "colorTextLinkSecondaryDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkSecondaryHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkInfoDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkInfoHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkInvertedHover": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLinkButtonUnderline": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorTextLinkButtonUnderlineHover": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorTextNotificationDefault": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextNotificationStackBar": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextNotificationYellow": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextPaginationPageNumberActiveDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextPaginationPageNumberDefault": {
            "light": "{colorTextInteractiveDefault}",
            "dark": "{colorNeutral400}"
          },
          "colorTextSegmentActive": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral950}"
          },
          "colorTextSegmentDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral300}"
          },
          "colorTextSegmentHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextSmall": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextStatusError": {
            "light": "{colorError600}",
            "dark": "{colorError400}"
          },
          "colorTextStatusInactive": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral450}"
          },
          "colorTextStatusInfo": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo400}"
          },
          "colorTextStatusSuccess": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess500}"
          },
          "colorTextStatusWarning": {
            "light": "{colorWarning900}",
            "dark": "{colorWarning500}"
          },
          "colorTextTopNavigationTitle": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral100}"
          },
          "colorTextTutorialHotspotDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextTutorialHotspotHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorBoardPlaceholderActive": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral600}"
          },
          "colorBoardPlaceholderHover": {
            "light": "{colorPrimary100}",
            "dark": "{colorPrimary600}"
          },
          "colorDragPlaceholderActive": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral600}"
          },
          "colorDragPlaceholderHover": {
            "light": "{colorPrimary100}",
            "dark": "{colorPrimary600}"
          },
          "colorDropzoneBackgroundDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorDropzoneBackgroundHover": {
            "light": "{colorPrimary50}",
            "dark": "{colorPrimary1000}"
          },
          "colorDropzoneTextDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral350}"
          },
          "colorDropzoneTextHover": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral350}"
          },
          "colorDropzoneBorderDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral600}"
          },
          "colorDropzoneBorderHover": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorGapGlobalDrawer": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral950}"
          },
          "colorTreeViewConnectorLine": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral300}"
          },
          "colorBackgroundActionCardDefault": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundActionCardHover": {
            "light": "{colorPrimary50}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundActionCardActive": {
            "light": "{colorPrimary100}",
            "dark": "{colorNeutral700}"
          },
          "colorBorderActionCardDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderActionCardHover": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderActionCardActive": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderActionCardDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundActionCardDisabled": {
            "light": "{colorWhite}",
            "dark": "{colorNeutral850}"
          },
          "colorTextActionCardDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorIconActionCardDefault": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary400}"
          },
          "colorIconActionCardHover": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorIconActionCardActive": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary300}"
          },
          "colorIconActionCardDisabled": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundSkeleton": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundSkeletonWave": {
            "light": "{colorNeutral150}",
            "dark": "{colorNeutral700}"
          },
          "fontExpandableHeadingSize": "14px",
          "borderDividerSectionWidth": "1px"
        }
      },
      "alert-header": {
        "id": "alert-header",
        "selector": ".awsui-context-content-header .awsui-context-alert",
        "tokens": {
          "colorGreyOpaque10": {
            "light": "rgba(0, 0, 0, 0.1)",
            "dark": "rgba(0, 0, 0, 0.1)"
          },
          "colorGreyOpaque25": {
            "light": "rgba(255, 255, 255, 0.25)",
            "dark": "rgba(255, 255, 255, 0.25)"
          },
          "colorGreyOpaque40": {
            "light": "rgba(0, 0, 0, 0.4)",
            "dark": "rgba(0, 0, 0, 0.4)"
          },
          "colorGreyOpaque50": {
            "light": "rgba(0, 0, 0, 0.5)",
            "dark": "rgba(0, 0, 0, 0.5)"
          },
          "colorGreyOpaque70": {
            "light": "rgba(15, 20, 26, 0.7)",
            "dark": "rgba(15, 20, 26, 0.7)"
          },
          "colorGreyOpaque80": {
            "light": "rgba(22, 25, 31, 0.8)",
            "dark": "rgba(22, 25, 31, 0.8)"
          },
          "colorGreyOpaque90": {
            "light": "rgba(242, 243, 243, 0.9)",
            "dark": "rgba(242, 243, 243, 0.9)"
          },
          "colorGreyTransparent": {
            "light": "rgba(15, 20, 26, 1)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorGreyTransparentHeavy": {
            "light": "rgba(15, 20, 26, 1)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorGreyTransparentLight": {
            "light": "rgba(15, 20, 26, 1)",
            "dark": "rgba(15, 20, 26, 1)"
          },
          "colorBackgroundBadgeIcon": {
            "light": "{colorError400}",
            "dark": "{colorError400}"
          },
          "colorBackgroundButtonLinkActive": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundButtonLinkDefault": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonLinkDisabled": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonLinkHover": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundButtonNormalActive": {
            "light": "rgba(255, 255, 255, 0.15)",
            "dark": "rgba(255, 255, 255, 0.15)"
          },
          "colorBackgroundButtonNormalDefault": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundButtonNormalDisabled": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundButtonNormalHover": {
            "light": "rgba(255, 255, 255, 0.1)",
            "dark": "rgba(255, 255, 255, 0.1)"
          },
          "colorBackgroundToggleButtonNormalPressed": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundToggleButtonNormalDefault": {
            "light": "{colorBackgroundButtonNormalDefault}",
            "dark": "{colorBackgroundButtonNormalDefault}"
          },
          "colorBackgroundButtonPrimaryActive": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundButtonPrimaryDefault": {
            "light": "{colorBorderButtonNormalDefault}",
            "dark": "{colorBorderButtonNormalDefault}"
          },
          "colorBackgroundButtonPrimaryDisabled": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundButtonPrimaryHover": {
            "light": "{colorBorderButtonNormalHover}",
            "dark": "{colorBorderButtonNormalHover}"
          },
          "colorBackgroundDirectionButtonActive": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundDirectionButtonDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundDirectionButtonDisabled": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundDirectionButtonHover": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorTextDirectionButtonDefault": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextDirectionButtonDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorBackgroundCalendarCurrentDate": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundCellShaded": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorGutterActiveLineDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBackgroundCodeEditorGutterActiveLineError": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundCodeEditorGutterDefault": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorLoading": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCodeEditorPaneItemHover": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundCodeEditorStatusBar": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundCard": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundItemCard": {
            "light": "{colorBackgroundCard}",
            "dark": "{colorBackgroundCard}"
          },
          "colorBackgroundContainerContent": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundContainerHeader": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundControlChecked": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundControlDefault": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundControlDisabled": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundDropdownItemDefault": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundDropdownItemDimmed": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundDropdownItemFilterMatch": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundDropdownItemHover": {
            "light": "{colorNeutral900}",
            "dark": "{colorNeutral900}"
          },
          "colorBackgroundDropdownItemSelected": {
            "light": "{colorBackgroundItemSelected}",
            "dark": "{colorBackgroundItemSelected}"
          },
          "colorBackgroundHomeHeader": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundInlineCode": {
            "light": "rgba(255, 255, 255, 0.1)",
            "dark": "rgba(255, 255, 255, 0.1)"
          },
          "colorBackgroundInputDefault": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundInputDisabled": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundItemSelected": {
            "light": "{colorPrimary1000}",
            "dark": "{colorPrimary1000}"
          },
          "colorBackgroundLayoutMain": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundDrawer": {
            "light": "{colorBackgroundLayoutPanelContent}",
            "dark": "{colorBackgroundLayoutPanelContent}"
          },
          "colorBackgroundDrawerBackdrop": {
            "light": "{colorGreyOpaque70}",
            "dark": "{colorGreyOpaque70}"
          },
          "colorBackgroundLayoutMobilePanel": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorBackgroundLayoutPanelContent": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundLayoutPanelHover": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundLayoutToolbar": {
            "light": "{colorBackgroundLayoutPanelContent}",
            "dark": "{colorBackgroundLayoutPanelContent}"
          },
          "colorBackgroundLayoutToggleActive": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundLayoutToggleDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundLayoutToggleHover": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundLayoutToggleSelectedActive": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundLayoutToggleSelectedDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundLayoutToggleSelectedHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBackgroundModalOverlay": {
            "light": "{colorGreyOpaque70}",
            "dark": "{colorGreyOpaque70}"
          },
          "colorBackgroundNotificationBlue": {
            "light": "{colorInfo600}",
            "dark": "{colorInfo600}"
          },
          "colorBackgroundNotificationGreen": {
            "light": "{colorSuccess600}",
            "dark": "{colorSuccess600}"
          },
          "colorBackgroundNotificationGrey": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundNotificationRed": {
            "light": "{colorError600}",
            "dark": "{colorError600}"
          },
          "colorBackgroundNotificationYellow": {
            "light": "{colorWarning400}",
            "dark": "{colorWarning400}"
          },
          "colorBackgroundNotificationStackBar": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundNotificationStackBarActive": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundNotificationStackBarHover": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBackgroundPopover": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundProgressBarValueDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundProgressBarDefault": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBackgroundSegmentActive": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundSegmentDefault": {
            "light": "{colorBackgroundButtonNormalDefault}",
            "dark": "{colorBackgroundButtonNormalDefault}"
          },
          "colorBackgroundSegmentDisabled": {
            "light": "{colorBackgroundButtonNormalDisabled}",
            "dark": "{colorBackgroundButtonNormalDisabled}"
          },
          "colorBackgroundSegmentHover": {
            "light": "{colorBackgroundButtonNormalHover}",
            "dark": "{colorBackgroundButtonNormalHover}"
          },
          "colorBackgroundSegmentWrapper": {
            "light": "{colorBackgroundContainerContent}",
            "dark": "{colorBackgroundContainerContent}"
          },
          "colorBackgroundSliderRangeDefault": {
            "light": "{colorBackgroundSliderHandleDefault}",
            "dark": "{colorBackgroundSliderHandleDefault}"
          },
          "colorBackgroundSliderRangeActive": {
            "light": "{colorBackgroundSliderHandleActive}",
            "dark": "{colorBackgroundSliderHandleActive}"
          },
          "colorBackgroundSliderHandleDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBackgroundSliderHandleActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBackgroundSliderTrackDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundSliderHandleRing": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundSliderHandleErrorDefault": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderHandleErrorActive": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderHandleWarningDefault": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderHandleWarningActive": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderRangeErrorDefault": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderRangeErrorActive": {
            "light": "{colorTextStatusError}",
            "dark": "{colorTextStatusError}"
          },
          "colorBackgroundSliderRangeWarningDefault": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundSliderRangeWarningActive": {
            "light": "{colorTextStatusWarning}",
            "dark": "{colorTextStatusWarning}"
          },
          "colorBackgroundStatusError": {
            "light": "{colorError1000}",
            "dark": "{colorError1000}"
          },
          "colorBackgroundStatusInfo": {
            "light": "{colorInfo1000}",
            "dark": "{colorInfo1000}"
          },
          "colorBackgroundDialog": {
            "light": "{colorBackgroundStatusInfo}",
            "dark": "{colorBackgroundStatusInfo}"
          },
          "colorBackgroundStatusSuccess": {
            "light": "{colorSuccess1000}",
            "dark": "{colorSuccess1000}"
          },
          "colorBackgroundStatusWarning": {
            "light": "{colorWarning1000}",
            "dark": "{colorWarning1000}"
          },
          "colorBackgroundTableHeader": {
            "light": "{colorBackgroundContainerHeader}",
            "dark": "{colorBackgroundContainerHeader}"
          },
          "colorBackgroundTilesDisabled": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundToggleCheckedDisabled": {
            "light": "{colorPrimary900}",
            "dark": "{colorPrimary900}"
          },
          "colorBackgroundToggleDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBackgroundAvatarGenAi": {
            "light": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)",
            "dark": "radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)"
          },
          "colorBackgroundAvatarDefault": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorTextAvatar": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorBackgroundLoadingBarGenAi": {
            "light": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)",
            "dark": "linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)"
          },
          "colorBackgroundStatusIndicatorError": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorWarning": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorSuccess": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorInfo": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundStatusIndicatorNeutral": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundChatBubbleOutgoing": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBackgroundChatBubbleIncoming": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextChatBubbleOutgoing": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorTextChatBubbleIncoming": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorBorderButtonLinkDisabled": {
            "light": "{colorBackgroundButtonLinkDisabled}",
            "dark": "{colorBackgroundButtonLinkDisabled}"
          },
          "colorBorderButtonNormalActive": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorBorderButtonNormalDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorBorderToggleButtonNormalPressed": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderButtonNormalDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextButtonNormalDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderButtonNormalHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextButtonIconDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderButtonPrimaryActive": {
            "light": "{colorBackgroundButtonPrimaryActive}",
            "dark": "{colorBackgroundButtonPrimaryActive}"
          },
          "colorBorderButtonPrimaryDefault": {
            "light": "{colorBackgroundButtonPrimaryDefault}",
            "dark": "{colorBackgroundButtonPrimaryDefault}"
          },
          "colorBorderButtonPrimaryDisabled": {
            "light": "{colorBackgroundButtonPrimaryDisabled}",
            "dark": "{colorBackgroundButtonPrimaryDisabled}"
          },
          "colorBorderButtonPrimaryHover": {
            "light": "{colorBackgroundButtonPrimaryHover}",
            "dark": "{colorBackgroundButtonPrimaryHover}"
          },
          "colorTextButtonPrimaryDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorItemSelected": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderCalendarGrid": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderCalendarGridSelectedFocusRing": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBorderCellShaded": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBorderCodeEditorAceActiveLineLightTheme": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderCodeEditorAceActiveLineDarkTheme": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderCodeEditorDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderCodeEditorPaneItemHover": {
            "light": "{colorBorderDropdownItemHover}",
            "dark": "{colorBorderDropdownItemHover}"
          },
          "colorBorderCard": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderCardHighlighted": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderItemCard": {
            "light": "{colorBorderCard}",
            "dark": "{colorBorderCard}"
          },
          "colorBorderItemCardHighlighted": {
            "light": "{colorBorderCardHighlighted}",
            "dark": "{colorBorderCardHighlighted}"
          },
          "colorBorderContainerDivider": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderContainerTop": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderControlChecked": {
            "light": "{colorBackgroundControlChecked}",
            "dark": "{colorBackgroundControlChecked}"
          },
          "colorBorderControlDefault": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderControlDisabled": {
            "light": "{colorBackgroundControlDisabled}",
            "dark": "{colorBackgroundControlDisabled}"
          },
          "colorBorderDividerActive": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorBorderDividerDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorBorderDividerPanelBottom": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDividerPanelSide": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDividerSecondary": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBorderDropdownContainer": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderDropdownGroup": {
            "light": "{colorBorderDropdownItemDefault}",
            "dark": "{colorBorderDropdownItemDefault}"
          },
          "colorBorderDropdownItemDefault": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderDropdownItemHover": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderDropdownItemDimmedHover": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorBorderDropdownItemSelected": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderDropdownItemTop": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorBorderEditableCellHover": {
            "light": "{colorBorderDropdownItemHover}",
            "dark": "{colorBorderDropdownItemHover}"
          },
          "colorBorderInputDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBorderInputDisabled": {
            "light": "{colorBackgroundInputDisabled}",
            "dark": "{colorBackgroundInputDisabled}"
          },
          "colorBorderInputFocused": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderItemFocused": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorBorderDropdownItemFocused": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderItemPlaceholder": {
            "light": "{colorBorderItemSelected}",
            "dark": "{colorBorderItemSelected}"
          },
          "colorBorderItemSelected": {
            "light": "{colorItemSelected}",
            "dark": "{colorItemSelected}"
          },
          "colorBorderLayout": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderNotificationStackBar": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBorderPanelHeader": {
            "light": "{colorBorderDividerDefault}",
            "dark": "{colorBorderDividerDefault}"
          },
          "colorBorderPopover": {
            "light": "{colorBorderDropdownContainer}",
            "dark": "{colorBorderDropdownContainer}"
          },
          "colorBorderSegmentActive": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderSegmentDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderSegmentDisabled": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderSegmentHover": {
            "light": "{colorBorderSegmentDefault}",
            "dark": "{colorBorderSegmentDefault}"
          },
          "colorBorderStatusError": {
            "light": "{colorError400}",
            "dark": "{colorError400}"
          },
          "colorBorderStatusInfo": {
            "light": "{colorInfo400}",
            "dark": "{colorInfo400}"
          },
          "colorBorderStatusSuccess": {
            "light": "{colorSuccess500}",
            "dark": "{colorSuccess500}"
          },
          "colorBorderStatusWarning": {
            "light": "{colorWarning500}",
            "dark": "{colorWarning500}"
          },
          "colorBorderDialog": {
            "light": "{colorBorderStatusInfo}",
            "dark": "{colorBorderStatusInfo}"
          },
          "colorBorderDividerInteractiveDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBorderTabsDivider": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorBorderTabsShadow": {
            "light": "{colorGreyTransparent}",
            "dark": "{colorGreyTransparent}"
          },
          "colorBorderTabsUnderline": {
            "light": "{colorTextAccent}",
            "dark": "{colorTextAccent}"
          },
          "colorBorderTilesDisabled": {
            "light": "{colorBackgroundTilesDisabled}",
            "dark": "{colorBackgroundTilesDisabled}"
          },
          "colorBorderTutorial": {
            "light": "{colorNeutral650}",
            "dark": "{colorNeutral650}"
          },
          "colorForegroundControlDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorForegroundControlDisabled": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorForegroundControlReadOnly": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorShadowDefault": {
            "light": "{colorGreyTransparentHeavy}",
            "dark": "{colorGreyTransparentHeavy}"
          },
          "colorShadowMedium": {
            "light": "{colorGreyTransparent}",
            "dark": "{colorGreyTransparent}"
          },
          "colorShadowSide": {
            "light": "{colorGreyTransparentLight}",
            "dark": "{colorGreyTransparentLight}"
          },
          "colorStrokeChartLine": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorStrokeCodeEditorGutterActiveLineDefault": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorStrokeCodeEditorGutterActiveLineHover": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextAccent": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorTextBodyDefault": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextBodySecondary": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextBreadcrumbCurrent": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorTextBreadcrumbIcon": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonInlineIconDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextButtonInlineIconDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonInlineIconHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextButtonNormalActive": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextToggleButtonNormalPressed": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextButtonNormalDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextButtonNormalHover": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLinkButtonNormalDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkButtonNormalHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkButtonNormalActive": {
            "light": "{colorTextButtonNormalActive}",
            "dark": "{colorTextButtonNormalActive}"
          },
          "colorTextButtonLinkActive": {
            "light": "{colorTextButtonNormalActive}",
            "dark": "{colorTextButtonNormalActive}"
          },
          "colorTextButtonLinkDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorTextButtonLinkDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextButtonLinkHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextButtonPrimaryActive": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextButtonPrimaryDefault": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextButtonPrimaryHover": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextCalendarDateHover": {
            "light": "{colorTextDropdownItemDefault}",
            "dark": "{colorTextDropdownItemDefault}"
          },
          "colorTextCalendarDateSelected": {
            "light": "{colorBackgroundControlDefault}",
            "dark": "{colorBackgroundControlDefault}"
          },
          "colorTextCalendarMonth": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextCodeEditorGutterActiveLine": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextCodeEditorGutterDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextCodeEditorStatusBarDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextCodeEditorTabButtonError": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextColumnHeader": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral400}"
          },
          "colorTextColumnSortingIcon": {
            "light": "{colorTextColumnHeader}",
            "dark": "{colorTextColumnHeader}"
          },
          "colorTextControlDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextCounter": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextDisabledInlineEdit": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral400}"
          },
          "colorTextDropdownFooter": {
            "light": "{colorTextFormSecondary}",
            "dark": "{colorTextFormSecondary}"
          },
          "colorTextDropdownGroupLabel": {
            "light": "{colorTextGroupLabel}",
            "dark": "{colorTextGroupLabel}"
          },
          "colorTextDropdownItemDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextDropdownItemDimmed": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextDropdownItemDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextDropdownItemFilterMatch": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextDropdownItemHighlighted": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral250}"
          },
          "colorTextDropdownItemSecondary": {
            "light": "{colorTextFormSecondary}",
            "dark": "{colorTextFormSecondary}"
          },
          "colorTextDropdownItemSecondaryHover": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextEmpty": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextExpandableSectionDefault": {
            "light": "{colorTextButtonNormalDefault}",
            "dark": "{colorTextButtonNormalDefault}"
          },
          "colorTextExpandableSectionHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextExpandableSectionNavigationIconDefault": {
            "light": "{colorTextInteractiveDefault}",
            "dark": "{colorTextInteractiveDefault}"
          },
          "colorTextFormDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextFormLabel": {
            "light": "{colorTextFormDefault}",
            "dark": "{colorTextFormDefault}"
          },
          "colorTextFormSecondary": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextGroupLabel": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextLabelGenAi": {
            "light": "{colorPurple400}",
            "dark": "{colorPurple400}"
          },
          "colorTextHeadingDefault": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral250}"
          },
          "colorTextHeadingSecondary": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextHomeHeaderDefault": {
            "light": "{colorNeutral250}",
            "dark": "{colorNeutral250}"
          },
          "colorTextHomeHeaderSecondary": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorTextIconCaret": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextIconSubtle": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral400}"
          },
          "colorTextInputDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextInputPlaceholder": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextInputPlaceholderDisabled": {
            "light": "{colorTextInputDisabled}",
            "dark": "{colorTextInputDisabled}"
          },
          "colorTextInteractiveActive": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInteractiveDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextInteractiveDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorTextInteractiveHover": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextToggleButtonIconPressed": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInteractiveInvertedDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextInteractiveInvertedHover": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextInverted": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLabel": {
            "light": "{colorTextFormLabel}",
            "dark": "{colorTextFormLabel}"
          },
          "colorTextKeyValuePairsValue": {
            "light": "{colorTextBodyDefault}",
            "dark": "{colorTextBodyDefault}"
          },
          "colorTextLayoutToggle": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLayoutToggleActive": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorTextLayoutToggleHover": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorTextLayoutToggleSelected": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextLinkDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorTextLinkHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorTextLinkDecorationDefault": {
            "light": "currentColor",
            "dark": "currentColor"
          },
          "colorTextLinkDecorationHover": {
            "light": "currentColor",
            "dark": "currentColor"
          },
          "colorTextLinkSecondaryDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkSecondaryHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkInfoDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextLinkInfoHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorTextLinkInvertedHover": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextLinkButtonUnderline": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorTextLinkButtonUnderlineHover": {
            "light": "transparent",
            "dark": "transparent"
          },
          "colorTextNotificationDefault": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextNotificationStackBar": {
            "light": "{colorWhite}",
            "dark": "{colorWhite}"
          },
          "colorTextNotificationYellow": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextPaginationPageNumberActiveDisabled": {
            "light": "{colorTextInteractiveDisabled}",
            "dark": "{colorTextInteractiveDisabled}"
          },
          "colorTextPaginationPageNumberDefault": {
            "light": "{colorNeutral400}",
            "dark": "{colorNeutral400}"
          },
          "colorTextSegmentActive": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTextSegmentDefault": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorTextSegmentHover": {
            "light": "{colorTextButtonNormalHover}",
            "dark": "{colorTextButtonNormalHover}"
          },
          "colorTextSmall": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextStatusError": {
            "light": "{colorError400}",
            "dark": "{colorError400}"
          },
          "colorTextStatusInactive": {
            "light": "{colorNeutral450}",
            "dark": "{colorNeutral450}"
          },
          "colorTextStatusInfo": {
            "light": "{colorInfo400}",
            "dark": "{colorInfo400}"
          },
          "colorTextStatusSuccess": {
            "light": "{colorSuccess500}",
            "dark": "{colorSuccess500}"
          },
          "colorTextStatusWarning": {
            "light": "{colorWarning500}",
            "dark": "{colorWarning500}"
          },
          "colorTextTopNavigationTitle": {
            "light": "{colorNeutral100}",
            "dark": "{colorNeutral100}"
          },
          "colorTextTutorialHotspotDefault": {
            "light": "{colorTextLinkDefault}",
            "dark": "{colorTextLinkDefault}"
          },
          "colorTextTutorialHotspotHover": {
            "light": "{colorTextLinkHover}",
            "dark": "{colorTextLinkHover}"
          },
          "colorBoardPlaceholderActive": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBoardPlaceholderHover": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary600}"
          },
          "colorDragPlaceholderActive": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorDragPlaceholderHover": {
            "light": "{colorPrimary600}",
            "dark": "{colorPrimary600}"
          },
          "colorDropzoneBackgroundDefault": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorDropzoneBackgroundHover": {
            "light": "{colorPrimary1000}",
            "dark": "{colorPrimary1000}"
          },
          "colorDropzoneTextDefault": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorDropzoneTextHover": {
            "light": "{colorNeutral350}",
            "dark": "{colorNeutral350}"
          },
          "colorDropzoneBorderDefault": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorDropzoneBorderHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorGapGlobalDrawer": {
            "light": "{colorNeutral950}",
            "dark": "{colorNeutral950}"
          },
          "colorTreeViewConnectorLine": {
            "light": "{colorNeutral300}",
            "dark": "{colorNeutral300}"
          },
          "colorBackgroundActionCardDefault": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorBackgroundActionCardHover": {
            "light": "{colorNeutral800}",
            "dark": "{colorNeutral800}"
          },
          "colorBackgroundActionCardActive": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          },
          "colorBorderActionCardDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorBorderActionCardHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderActionCardActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorBorderActionCardDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundActionCardDisabled": {
            "light": "{colorNeutral850}",
            "dark": "{colorNeutral850}"
          },
          "colorTextActionCardDisabled": {
            "light": "{colorNeutral500}",
            "dark": "{colorNeutral500}"
          },
          "colorIconActionCardDefault": {
            "light": "{colorPrimary400}",
            "dark": "{colorPrimary400}"
          },
          "colorIconActionCardHover": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorIconActionCardActive": {
            "light": "{colorPrimary300}",
            "dark": "{colorPrimary300}"
          },
          "colorIconActionCardDisabled": {
            "light": "{colorNeutral600}",
            "dark": "{colorNeutral600}"
          },
          "colorBackgroundSkeleton": {
            "light": "{colorNeutral750}",
            "dark": "{colorNeutral750}"
          },
          "colorBackgroundSkeletonWave": {
            "light": "{colorNeutral700}",
            "dark": "{colorNeutral700}"
          }
        }
      },
      "app-layout-toolbar": {
        "id": "app-layout-toolbar",
        "selector": ".awsui-context-app-layout-toolbar",
        "tokens": {
          "colorBackgroundLayoutMain": {
            "light": "{colorNeutral50}",
            "dark": "{colorNeutral900}"
          }
        }
      }
    },
    "tokenModeMap": {
      "colorPrimary50": "color",
      "colorPrimary100": "color",
      "colorPrimary200": "color",
      "colorPrimary300": "color",
      "colorPrimary400": "color",
      "colorPrimary500": "color",
      "colorPrimary600": "color",
      "colorPrimary700": "color",
      "colorPrimary800": "color",
      "colorPrimary900": "color",
      "colorPrimary1000": "color",
      "colorNeutral50": "color",
      "colorNeutral100": "color",
      "colorNeutral150": "color",
      "colorNeutral200": "color",
      "colorNeutral250": "color",
      "colorNeutral300": "color",
      "colorNeutral350": "color",
      "colorNeutral400": "color",
      "colorNeutral450": "color",
      "colorNeutral500": "color",
      "colorNeutral550": "color",
      "colorNeutral600": "color",
      "colorNeutral650": "color",
      "colorNeutral700": "color",
      "colorNeutral750": "color",
      "colorNeutral800": "color",
      "colorNeutral850": "color",
      "colorNeutral900": "color",
      "colorNeutral950": "color",
      "colorNeutral1000": "color",
      "colorError50": "color",
      "colorError400": "color",
      "colorError600": "color",
      "colorError900": "color",
      "colorError1000": "color",
      "colorSuccess50": "color",
      "colorSuccess500": "color",
      "colorSuccess600": "color",
      "colorSuccess1000": "color",
      "colorWarning50": "color",
      "colorWarning400": "color",
      "colorWarning500": "color",
      "colorWarning900": "color",
      "colorWarning1000": "color",
      "colorInfo50": "color",
      "colorInfo300": "color",
      "colorInfo400": "color",
      "colorInfo600": "color",
      "colorInfo1000": "color",
      "colorGrey50": "color",
      "colorGrey100": "color",
      "colorGrey150": "color",
      "colorGrey200": "color",
      "colorGrey250": "color",
      "colorGrey300": "color",
      "colorGrey350": "color",
      "colorGrey400": "color",
      "colorGrey450": "color",
      "colorGrey500": "color",
      "colorGrey600": "color",
      "colorGrey650": "color",
      "colorGrey700": "color",
      "colorGrey750": "color",
      "colorGrey800": "color",
      "colorGrey850": "color",
      "colorGrey900": "color",
      "colorGrey950": "color",
      "colorGrey1000": "color",
      "colorBlue50": "color",
      "colorBlue100": "color",
      "colorBlue200": "color",
      "colorBlue300": "color",
      "colorBlue400": "color",
      "colorBlue600": "color",
      "colorBlue700": "color",
      "colorBlue900": "color",
      "colorBlue1000": "color",
      "colorGreen50": "color",
      "colorGreen500": "color",
      "colorGreen600": "color",
      "colorGreen900": "color",
      "colorGreen1000": "color",
      "colorRed50": "color",
      "colorRed400": "color",
      "colorRed600": "color",
      "colorRed900": "color",
      "colorRed1000": "color",
      "colorYellow50": "color",
      "colorYellow400": "color",
      "colorYellow500": "color",
      "colorYellow900": "color",
      "colorYellow1000": "color",
      "colorPurple400": "color",
      "colorPurple700": "color",
      "colorAmber400": "color",
      "colorAmber500": "color",
      "colorAwsSquidInk": "color",
      "colorTransparent": "color",
      "colorBlack": "color",
      "colorWhite": "color",
      "colorChartsRed300": "color",
      "colorChartsRed400": "color",
      "colorChartsRed500": "color",
      "colorChartsRed600": "color",
      "colorChartsRed700": "color",
      "colorChartsRed800": "color",
      "colorChartsRed900": "color",
      "colorChartsRed1000": "color",
      "colorChartsRed1100": "color",
      "colorChartsRed1200": "color",
      "colorChartsOrange300": "color",
      "colorChartsOrange400": "color",
      "colorChartsOrange500": "color",
      "colorChartsOrange600": "color",
      "colorChartsOrange700": "color",
      "colorChartsOrange800": "color",
      "colorChartsOrange900": "color",
      "colorChartsOrange1000": "color",
      "colorChartsOrange1100": "color",
      "colorChartsOrange1200": "color",
      "colorChartsYellow300": "color",
      "colorChartsYellow400": "color",
      "colorChartsYellow500": "color",
      "colorChartsYellow600": "color",
      "colorChartsYellow700": "color",
      "colorChartsYellow800": "color",
      "colorChartsYellow900": "color",
      "colorChartsYellow1000": "color",
      "colorChartsYellow1100": "color",
      "colorChartsYellow1200": "color",
      "colorChartsGreen300": "color",
      "colorChartsGreen400": "color",
      "colorChartsGreen500": "color",
      "colorChartsGreen600": "color",
      "colorChartsGreen700": "color",
      "colorChartsGreen800": "color",
      "colorChartsGreen900": "color",
      "colorChartsGreen1000": "color",
      "colorChartsGreen1100": "color",
      "colorChartsGreen1200": "color",
      "colorChartsTeal300": "color",
      "colorChartsTeal400": "color",
      "colorChartsTeal500": "color",
      "colorChartsTeal600": "color",
      "colorChartsTeal700": "color",
      "colorChartsTeal800": "color",
      "colorChartsTeal900": "color",
      "colorChartsTeal1000": "color",
      "colorChartsTeal1100": "color",
      "colorChartsTeal1200": "color",
      "colorChartsBlue1300": "color",
      "colorChartsBlue1400": "color",
      "colorChartsBlue1500": "color",
      "colorChartsBlue1600": "color",
      "colorChartsBlue1700": "color",
      "colorChartsBlue1800": "color",
      "colorChartsBlue1900": "color",
      "colorChartsBlue11000": "color",
      "colorChartsBlue11100": "color",
      "colorChartsBlue11200": "color",
      "colorChartsBlue2300": "color",
      "colorChartsBlue2400": "color",
      "colorChartsBlue2500": "color",
      "colorChartsBlue2600": "color",
      "colorChartsBlue2700": "color",
      "colorChartsBlue2800": "color",
      "colorChartsBlue2900": "color",
      "colorChartsBlue21000": "color",
      "colorChartsBlue21100": "color",
      "colorChartsBlue21200": "color",
      "colorChartsPurple300": "color",
      "colorChartsPurple400": "color",
      "colorChartsPurple500": "color",
      "colorChartsPurple600": "color",
      "colorChartsPurple700": "color",
      "colorChartsPurple800": "color",
      "colorChartsPurple900": "color",
      "colorChartsPurple1000": "color",
      "colorChartsPurple1100": "color",
      "colorChartsPurple1200": "color",
      "colorChartsPink300": "color",
      "colorChartsPink400": "color",
      "colorChartsPink500": "color",
      "colorChartsPink600": "color",
      "colorChartsPink700": "color",
      "colorChartsPink800": "color",
      "colorChartsPink900": "color",
      "colorChartsPink1000": "color",
      "colorChartsPink1100": "color",
      "colorChartsPink1200": "color",
      "colorChartsStatusCritical": "color",
      "colorChartsStatusHigh": "color",
      "colorChartsStatusMedium": "color",
      "colorChartsStatusLow": "color",
      "colorChartsStatusPositive": "color",
      "colorChartsStatusInfo": "color",
      "colorChartsStatusNeutral": "color",
      "colorChartsThresholdNegative": "color",
      "colorChartsThresholdPositive": "color",
      "colorChartsThresholdInfo": "color",
      "colorChartsThresholdNeutral": "color",
      "colorChartsLineGrid": "color",
      "colorChartsLineTick": "color",
      "colorChartsLineAxis": "color",
      "colorChartsPaletteCategorical1": "color",
      "colorChartsPaletteCategorical2": "color",
      "colorChartsPaletteCategorical3": "color",
      "colorChartsPaletteCategorical4": "color",
      "colorChartsPaletteCategorical5": "color",
      "colorChartsPaletteCategorical6": "color",
      "colorChartsPaletteCategorical7": "color",
      "colorChartsPaletteCategorical8": "color",
      "colorChartsPaletteCategorical9": "color",
      "colorChartsPaletteCategorical10": "color",
      "colorChartsPaletteCategorical11": "color",
      "colorChartsPaletteCategorical12": "color",
      "colorChartsPaletteCategorical13": "color",
      "colorChartsPaletteCategorical14": "color",
      "colorChartsPaletteCategorical15": "color",
      "colorChartsPaletteCategorical16": "color",
      "colorChartsPaletteCategorical17": "color",
      "colorChartsPaletteCategorical18": "color",
      "colorChartsPaletteCategorical19": "color",
      "colorChartsPaletteCategorical20": "color",
      "colorChartsPaletteCategorical21": "color",
      "colorChartsPaletteCategorical22": "color",
      "colorChartsPaletteCategorical23": "color",
      "colorChartsPaletteCategorical24": "color",
      "colorChartsPaletteCategorical25": "color",
      "colorChartsPaletteCategorical26": "color",
      "colorChartsPaletteCategorical27": "color",
      "colorChartsPaletteCategorical28": "color",
      "colorChartsPaletteCategorical29": "color",
      "colorChartsPaletteCategorical30": "color",
      "colorChartsPaletteCategorical31": "color",
      "colorChartsPaletteCategorical32": "color",
      "colorChartsPaletteCategorical33": "color",
      "colorChartsPaletteCategorical34": "color",
      "colorChartsPaletteCategorical35": "color",
      "colorChartsPaletteCategorical36": "color",
      "colorChartsPaletteCategorical37": "color",
      "colorChartsPaletteCategorical38": "color",
      "colorChartsPaletteCategorical39": "color",
      "colorChartsPaletteCategorical40": "color",
      "colorChartsPaletteCategorical41": "color",
      "colorChartsPaletteCategorical42": "color",
      "colorChartsPaletteCategorical43": "color",
      "colorChartsPaletteCategorical44": "color",
      "colorChartsPaletteCategorical45": "color",
      "colorChartsPaletteCategorical46": "color",
      "colorChartsPaletteCategorical47": "color",
      "colorChartsPaletteCategorical48": "color",
      "colorChartsPaletteCategorical49": "color",
      "colorChartsPaletteCategorical50": "color",
      "colorChartsErrorBarMarker": "color",
      "colorSeverityDarkRed": "color",
      "colorSeverityRed": "color",
      "colorSeverityOrange": "color",
      "colorSeverityYellow": "color",
      "colorSeverityGrey": "color",
      "colorBackgroundNotificationSeverityCritical": "color",
      "colorBackgroundNotificationSeverityHigh": "color",
      "colorBackgroundNotificationSeverityMedium": "color",
      "colorBackgroundNotificationSeverityLow": "color",
      "colorBackgroundNotificationSeverityNeutral": "color",
      "colorTextNotificationSeverityCritical": "color",
      "colorTextNotificationSeverityHigh": "color",
      "colorTextNotificationSeverityMedium": "color",
      "colorTextNotificationSeverityLow": "color",
      "colorTextNotificationSeverityNeutral": "color",
      "colorGreyOpaque10": "color",
      "colorGreyOpaque25": "color",
      "colorGreyOpaque40": "color",
      "colorGreyOpaque50": "color",
      "colorGreyOpaque70": "color",
      "colorGreyOpaque80": "color",
      "colorGreyOpaque90": "color",
      "colorGreyTransparent": "color",
      "colorGreyTransparentHeavy": "color",
      "colorGreyTransparentLight": "color",
      "colorBackgroundBadgeIcon": "color",
      "colorBackgroundButtonLinkActive": "color",
      "colorBackgroundButtonLinkDefault": "color",
      "colorBackgroundButtonLinkDisabled": "color",
      "colorBackgroundButtonLinkHover": "color",
      "colorBackgroundButtonNormalActive": "color",
      "colorBackgroundButtonNormalDefault": "color",
      "colorBackgroundButtonNormalDisabled": "color",
      "colorBackgroundButtonNormalHover": "color",
      "colorBackgroundToggleButtonNormalPressed": "color",
      "colorBackgroundToggleButtonNormalDefault": "color",
      "colorBackgroundButtonPrimaryActive": "color",
      "colorBackgroundButtonPrimaryDefault": "color",
      "colorBackgroundButtonPrimaryDisabled": "color",
      "colorBackgroundButtonPrimaryHover": "color",
      "colorBackgroundDirectionButtonActive": "color",
      "colorBackgroundDirectionButtonDefault": "color",
      "colorBackgroundDirectionButtonDisabled": "color",
      "colorBackgroundDirectionButtonHover": "color",
      "colorTextDirectionButtonDefault": "color",
      "colorTextDirectionButtonDisabled": "color",
      "colorBackgroundCalendarCurrentDate": "color",
      "colorBackgroundCellShaded": "color",
      "colorBackgroundCodeEditorGutterActiveLineDefault": "color",
      "colorBackgroundCodeEditorGutterActiveLineError": "color",
      "colorBackgroundCodeEditorGutterDefault": "color",
      "colorBackgroundCodeEditorLoading": "color",
      "colorBackgroundCodeEditorPaneItemHover": "color",
      "colorBackgroundCodeEditorStatusBar": "color",
      "colorBackgroundCard": "color",
      "colorBackgroundItemCard": "color",
      "colorBackgroundContainerContent": "color",
      "colorBackgroundContainerHeader": "color",
      "colorBackgroundControlChecked": "color",
      "colorBackgroundControlDefault": "color",
      "colorBackgroundControlDisabled": "color",
      "colorBackgroundDropdownItemDefault": "color",
      "colorBackgroundDropdownItemDimmed": "color",
      "colorBackgroundDropdownItemFilterMatch": "color",
      "colorBackgroundDropdownItemHover": "color",
      "colorBackgroundDropdownItemSelected": "color",
      "colorBackgroundHomeHeader": "color",
      "colorBackgroundInlineCode": "color",
      "colorBackgroundInputDefault": "color",
      "colorBackgroundInputDisabled": "color",
      "colorBackgroundItemSelected": "color",
      "colorBackgroundLayoutMain": "color",
      "colorBackgroundDrawer": "color",
      "colorBackgroundDrawerBackdrop": "color",
      "colorBackgroundLayoutMobilePanel": "color",
      "colorBackgroundLayoutPanelContent": "color",
      "colorBackgroundLayoutPanelHover": "color",
      "colorBackgroundLayoutToolbar": "color",
      "colorBackgroundLayoutToggleActive": "color",
      "colorBackgroundLayoutToggleDefault": "color",
      "colorBackgroundLayoutToggleHover": "color",
      "colorBackgroundLayoutToggleSelectedActive": "color",
      "colorBackgroundLayoutToggleSelectedDefault": "color",
      "colorBackgroundLayoutToggleSelectedHover": "color",
      "colorBackgroundModalOverlay": "color",
      "colorBackgroundNotificationBlue": "color",
      "colorBackgroundNotificationGreen": "color",
      "colorBackgroundNotificationGrey": "color",
      "colorBackgroundNotificationRed": "color",
      "colorBackgroundNotificationYellow": "color",
      "colorBackgroundNotificationStackBar": "color",
      "colorBackgroundNotificationStackBarActive": "color",
      "colorBackgroundNotificationStackBarHover": "color",
      "colorBackgroundPopover": "color",
      "colorBackgroundProgressBarValueDefault": "color",
      "colorBackgroundProgressBarDefault": "color",
      "colorBackgroundSegmentActive": "color",
      "colorBackgroundSegmentDefault": "color",
      "colorBackgroundSegmentDisabled": "color",
      "colorBackgroundSegmentHover": "color",
      "colorBackgroundSegmentWrapper": "color",
      "colorBackgroundSliderRangeDefault": "color",
      "colorBackgroundSliderRangeActive": "color",
      "colorBackgroundSliderHandleDefault": "color",
      "colorBackgroundSliderHandleActive": "color",
      "colorBackgroundSliderTrackDefault": "color",
      "colorBackgroundSliderHandleRing": "color",
      "colorBackgroundSliderHandleErrorDefault": "color",
      "colorBackgroundSliderHandleErrorActive": "color",
      "colorBackgroundSliderHandleWarningDefault": "color",
      "colorBackgroundSliderHandleWarningActive": "color",
      "colorBackgroundSliderRangeErrorDefault": "color",
      "colorBackgroundSliderRangeErrorActive": "color",
      "colorBackgroundSliderRangeWarningDefault": "color",
      "colorBackgroundSliderRangeWarningActive": "color",
      "colorBackgroundStatusError": "color",
      "colorBackgroundStatusInfo": "color",
      "colorBackgroundDialog": "color",
      "colorBackgroundStatusSuccess": "color",
      "colorBackgroundStatusWarning": "color",
      "colorBackgroundTableHeader": "color",
      "colorBackgroundTilesDisabled": "color",
      "colorBackgroundToggleCheckedDisabled": "color",
      "colorBackgroundToggleDefault": "color",
      "colorBackgroundAvatarGenAi": "color",
      "colorBackgroundAvatarDefault": "color",
      "colorTextAvatar": "color",
      "colorBackgroundLoadingBarGenAi": "color",
      "colorBackgroundStatusIndicatorError": "color",
      "colorBackgroundStatusIndicatorWarning": "color",
      "colorBackgroundStatusIndicatorSuccess": "color",
      "colorBackgroundStatusIndicatorInfo": "color",
      "colorBackgroundStatusIndicatorNeutral": "color",
      "colorBackgroundChatBubbleOutgoing": "color",
      "colorBackgroundChatBubbleIncoming": "color",
      "colorTextChatBubbleOutgoing": "color",
      "colorTextChatBubbleIncoming": "color",
      "colorBorderButtonLinkDisabled": "color",
      "colorBorderButtonNormalActive": "color",
      "colorBorderButtonNormalDefault": "color",
      "colorBorderToggleButtonNormalPressed": "color",
      "colorBorderButtonNormalDisabled": "color",
      "colorTextButtonNormalDisabled": "color",
      "colorBorderButtonNormalHover": "color",
      "colorTextButtonIconDisabled": "color",
      "colorBorderButtonPrimaryActive": "color",
      "colorBorderButtonPrimaryDefault": "color",
      "colorBorderButtonPrimaryDisabled": "color",
      "colorBorderButtonPrimaryHover": "color",
      "colorTextButtonPrimaryDisabled": "color",
      "colorItemSelected": "color",
      "colorBorderCalendarGrid": "color",
      "colorBorderCalendarGridSelectedFocusRing": "color",
      "colorBorderCellShaded": "color",
      "colorBorderCodeEditorAceActiveLineLightTheme": "color",
      "colorBorderCodeEditorAceActiveLineDarkTheme": "color",
      "colorBorderCodeEditorDefault": "color",
      "colorBorderCodeEditorPaneItemHover": "color",
      "colorBorderCard": "color",
      "colorBorderCardHighlighted": "color",
      "colorBorderItemCard": "color",
      "colorBorderItemCardHighlighted": "color",
      "colorBorderContainerDivider": "color",
      "colorBorderContainerTop": "color",
      "colorBorderControlChecked": "color",
      "colorBorderControlDefault": "color",
      "colorBorderControlDisabled": "color",
      "colorBorderDividerActive": "color",
      "colorBorderDividerDefault": "color",
      "colorBorderDividerPanelBottom": "color",
      "colorBorderDividerPanelSide": "color",
      "colorBorderDividerSecondary": "color",
      "colorBorderDropdownContainer": "color",
      "colorBorderDropdownGroup": "color",
      "colorBorderDropdownItemDefault": "color",
      "colorBorderDropdownItemHover": "color",
      "colorBorderDropdownItemDimmedHover": "color",
      "colorBorderDropdownItemSelected": "color",
      "colorBorderDropdownItemTop": "color",
      "colorBorderEditableCellHover": "color",
      "colorBorderInputDefault": "color",
      "colorBorderInputDisabled": "color",
      "colorBorderInputFocused": "color",
      "colorBorderItemFocused": "color",
      "colorBorderDropdownItemFocused": "color",
      "colorBorderItemPlaceholder": "color",
      "colorBorderItemSelected": "color",
      "colorBorderLayout": "color",
      "colorBorderNotificationStackBar": "color",
      "colorBorderPanelHeader": "color",
      "colorBorderPopover": "color",
      "colorBorderSegmentActive": "color",
      "colorBorderSegmentDefault": "color",
      "colorBorderSegmentDisabled": "color",
      "colorBorderSegmentHover": "color",
      "colorBorderStatusError": "color",
      "colorBorderStatusInfo": "color",
      "colorBorderStatusSuccess": "color",
      "colorBorderStatusWarning": "color",
      "colorBorderDialog": "color",
      "colorBorderDividerInteractiveDefault": "color",
      "colorBorderTabsDivider": "color",
      "colorBorderTabsShadow": "color",
      "colorBorderTabsUnderline": "color",
      "colorBorderTilesDisabled": "color",
      "colorBorderTutorial": "color",
      "colorForegroundControlDefault": "color",
      "colorForegroundControlDisabled": "color",
      "colorForegroundControlReadOnly": "color",
      "colorShadowDefault": "color",
      "colorShadowMedium": "color",
      "colorShadowSide": "color",
      "colorStrokeChartLine": "color",
      "colorStrokeCodeEditorGutterActiveLineDefault": "color",
      "colorStrokeCodeEditorGutterActiveLineHover": "color",
      "colorTextAccent": "color",
      "colorTextBodyDefault": "color",
      "colorTextBodySecondary": "color",
      "colorTextBreadcrumbCurrent": "color",
      "colorTextBreadcrumbIcon": "color",
      "colorTextButtonInlineIconDefault": "color",
      "colorTextButtonInlineIconDisabled": "color",
      "colorTextButtonInlineIconHover": "color",
      "colorTextButtonNormalActive": "color",
      "colorTextToggleButtonNormalPressed": "color",
      "colorTextButtonNormalDefault": "color",
      "colorTextButtonNormalHover": "color",
      "colorTextLinkButtonNormalDefault": "color",
      "colorTextLinkButtonNormalHover": "color",
      "colorTextLinkButtonNormalActive": "color",
      "colorTextButtonLinkActive": "color",
      "colorTextButtonLinkDefault": "color",
      "colorTextButtonLinkDisabled": "color",
      "colorTextButtonLinkHover": "color",
      "colorTextButtonPrimaryActive": "color",
      "colorTextButtonPrimaryDefault": "color",
      "colorTextButtonPrimaryHover": "color",
      "colorTextCalendarDateHover": "color",
      "colorTextCalendarDateSelected": "color",
      "colorTextCalendarMonth": "color",
      "colorTextCodeEditorGutterActiveLine": "color",
      "colorTextCodeEditorGutterDefault": "color",
      "colorTextCodeEditorStatusBarDisabled": "color",
      "colorTextCodeEditorTabButtonError": "color",
      "colorTextColumnHeader": "color",
      "colorTextColumnSortingIcon": "color",
      "colorTextControlDisabled": "color",
      "colorTextCounter": "color",
      "colorTextDisabled": "color",
      "colorTextDisabledInlineEdit": "color",
      "colorTextDropdownFooter": "color",
      "colorTextDropdownGroupLabel": "color",
      "colorTextDropdownItemDefault": "color",
      "colorTextDropdownItemDimmed": "color",
      "colorTextDropdownItemDisabled": "color",
      "colorTextDropdownItemFilterMatch": "color",
      "colorTextDropdownItemHighlighted": "color",
      "colorTextDropdownItemSecondary": "color",
      "colorTextDropdownItemSecondaryHover": "color",
      "colorTextEmpty": "color",
      "colorTextExpandableSectionDefault": "color",
      "colorTextExpandableSectionHover": "color",
      "colorTextExpandableSectionNavigationIconDefault": "color",
      "colorTextFormDefault": "color",
      "colorTextFormLabel": "color",
      "colorTextFormSecondary": "color",
      "colorTextGroupLabel": "color",
      "colorTextLabelGenAi": "color",
      "colorTextHeadingDefault": "color",
      "colorTextHeadingSecondary": "color",
      "colorTextHomeHeaderDefault": "color",
      "colorTextHomeHeaderSecondary": "color",
      "colorTextIconCaret": "color",
      "colorTextIconSubtle": "color",
      "colorTextInputDisabled": "color",
      "colorTextInputPlaceholder": "color",
      "colorTextInputPlaceholderDisabled": "color",
      "colorTextInteractiveActive": "color",
      "colorTextInteractiveDefault": "color",
      "colorTextInteractiveDisabled": "color",
      "colorTextInteractiveHover": "color",
      "colorTextToggleButtonIconPressed": "color",
      "colorTextInteractiveInvertedDefault": "color",
      "colorTextInteractiveInvertedHover": "color",
      "colorTextInverted": "color",
      "colorTextLabel": "color",
      "colorTextKeyValuePairsValue": "color",
      "colorTextLayoutToggle": "color",
      "colorTextLayoutToggleActive": "color",
      "colorTextLayoutToggleHover": "color",
      "colorTextLayoutToggleSelected": "color",
      "colorTextLinkDefault": "color",
      "colorTextLinkHover": "color",
      "colorTextLinkDecorationDefault": "color",
      "colorTextLinkDecorationHover": "color",
      "colorTextLinkSecondaryDefault": "color",
      "colorTextLinkSecondaryHover": "color",
      "colorTextLinkInfoDefault": "color",
      "colorTextLinkInfoHover": "color",
      "colorTextLinkInvertedHover": "color",
      "colorTextLinkButtonUnderline": "color",
      "colorTextLinkButtonUnderlineHover": "color",
      "colorTextNotificationDefault": "color",
      "colorTextNotificationStackBar": "color",
      "colorTextNotificationYellow": "color",
      "colorTextPaginationPageNumberActiveDisabled": "color",
      "colorTextPaginationPageNumberDefault": "color",
      "colorTextSegmentActive": "color",
      "colorTextSegmentDefault": "color",
      "colorTextSegmentHover": "color",
      "colorTextSmall": "color",
      "colorTextStatusError": "color",
      "colorTextStatusInactive": "color",
      "colorTextStatusInfo": "color",
      "colorTextStatusSuccess": "color",
      "colorTextStatusWarning": "color",
      "colorTextTopNavigationTitle": "color",
      "colorTextTutorialHotspotDefault": "color",
      "colorTextTutorialHotspotHover": "color",
      "colorBoardPlaceholderActive": "color",
      "colorBoardPlaceholderHover": "color",
      "colorDragPlaceholderActive": "color",
      "colorDragPlaceholderHover": "color",
      "colorDropzoneBackgroundDefault": "color",
      "colorDropzoneBackgroundHover": "color",
      "colorDropzoneTextDefault": "color",
      "colorDropzoneTextHover": "color",
      "colorDropzoneBorderDefault": "color",
      "colorDropzoneBorderHover": "color",
      "colorGapGlobalDrawer": "color",
      "colorTreeViewConnectorLine": "color",
      "colorBackgroundActionCardDefault": "color",
      "colorBackgroundActionCardHover": "color",
      "colorBackgroundActionCardActive": "color",
      "colorBorderActionCardDefault": "color",
      "colorBorderActionCardHover": "color",
      "colorBorderActionCardActive": "color",
      "colorBorderActionCardDisabled": "color",
      "colorBackgroundActionCardDisabled": "color",
      "colorTextActionCardDisabled": "color",
      "colorIconActionCardDefault": "color",
      "colorIconActionCardHover": "color",
      "colorIconActionCardActive": "color",
      "colorIconActionCardDisabled": "color",
      "colorBackgroundSkeleton": "color",
      "colorBackgroundSkeletonWave": "color",
      "motionDurationExtraFast": "motion",
      "motionDurationExtraSlow": "motion",
      "motionDurationFast": "motion",
      "motionDurationModerate": "motion",
      "motionDurationRefreshOnlyAmbient": "motion",
      "motionDurationRefreshOnlyFast": "motion",
      "motionDurationRefreshOnlyMedium": "motion",
      "motionDurationRefreshOnlySlow": "motion",
      "motionDurationAvatarGenAiGradient": "motion",
      "motionDurationAvatarLoadingDots": "motion",
      "motionDurationRotate180": "motion",
      "motionDurationRotate90": "motion",
      "motionDurationShowPaced": "motion",
      "motionDurationShowQuick": "motion",
      "motionDurationSlow": "motion",
      "motionDurationTransitionQuick": "motion",
      "motionDurationTransitionShowPaced": "motion",
      "motionDurationTransitionShowQuick": "motion",
      "motionEasingEaseOutQuart": "motion",
      "motionEasingRefreshOnlyA": "motion",
      "motionEasingRefreshOnlyB": "motion",
      "motionEasingRefreshOnlyC": "motion",
      "motionEasingRefreshOnlyD": "motion",
      "motionEasingAvatarGenAiGradient": "motion",
      "motionEasingRotate180": "motion",
      "motionEasingRotate90": "motion",
      "motionEasingShowPaced": "motion",
      "motionEasingShowQuick": "motion",
      "motionEasingTransitionQuick": "motion",
      "motionEasingTransitionShowPaced": "motion",
      "motionEasingTransitionShowQuick": "motion",
      "motionEasingResponsive": "motion",
      "motionEasingSticky": "motion",
      "motionEasingExpressive": "motion",
      "motionDurationResponsive": "motion",
      "motionDurationExpressive": "motion",
      "motionDurationComplex": "motion",
      "motionKeyframesFadeIn": "motion",
      "motionKeyframesFadeOut": "motion",
      "motionKeyframesStatusIconError": "motion",
      "motionKeyframesScalePopup": "motion",
      "sizeCalendarGridWidth": "density",
      "sizeControl": "density",
      "sizeIconBig": "density",
      "sizeIconLarge": "density",
      "sizeIconMedium": "density",
      "sizeIconNormal": "density",
      "sizeTableSelectionHorizontal": "density",
      "sizeVerticalInput": "density",
      "sizeVerticalPanelIconOffset": "density",
      "spaceAlertActionLeft": "density",
      "spaceAlertHorizontal": "density",
      "spaceAlertMessageRight": "density",
      "spaceAlertVertical": "density",
      "spaceButtonFocusOutlineGutter": "density",
      "spaceButtonHorizontal": "density",
      "spaceButtonVertical": "density",
      "spaceTokenVertical": "density",
      "spaceFieldVertical": "density",
      "spaceButtonIconFocusOutlineGutterVertical": "density",
      "spaceButtonIconOnlyHorizontal": "density",
      "spaceButtonInlineIconFocusOutlineGutter": "density",
      "spaceButtonModalDismissVertical": "density",
      "spaceCalendarGridFocusOutlineGutter": "density",
      "spaceCalendarGridSelectedFocusOutlineGutter": "density",
      "spaceCalendarGridGutter": "density",
      "spaceCardHorizontalDefault": "density",
      "spaceCardHorizontalEmbedded": "density",
      "spaceCardVerticalDefault": "density",
      "spaceCardVerticalEmbedded": "density",
      "spaceItemCardHorizontalDefault": "density",
      "spaceItemCardHorizontalEmbedded": "density",
      "spaceItemCardVerticalDefault": "density",
      "spaceItemCardVerticalEmbedded": "density",
      "spaceCodeEditorStatusFocusOutlineGutter": "density",
      "spaceContainerContentTop": "density",
      "spaceContainerHeaderTop": "density",
      "spaceContainerHeaderBottom": "density",
      "spaceContainerHorizontal": "density",
      "spaceContentHeaderPaddingBottom": "density",
      "spaceDarkHeaderOverlapDistance": "density",
      "spaceExpandableSectionIconOffsetTop": "density",
      "spaceFieldHorizontal": "density",
      "spaceFieldIconOffset": "density",
      "spaceFilteringTokenDismissButtonFocusOutlineGutter": "density",
      "spaceFilteringTokenOperationSelectFocusOutlineGutter": "density",
      "spaceFlashbarActionLeft": "density",
      "spaceFlashbarDismissRight": "density",
      "spaceFlashbarHorizontal": "density",
      "spaceFlashbarVertical": "density",
      "spaceGridGutter": "density",
      "spaceKeyValueGap": "density",
      "spaceLayoutContentBottom": "density",
      "spaceLayoutContentHorizontal": "density",
      "spaceLayoutToggleDiameter": "density",
      "spaceLayoutTogglePadding": "density",
      "spaceModalContentBottom": "density",
      "spaceModalHorizontal": "density",
      "spacePanelContentBottom": "density",
      "spacePanelContentTop": "density",
      "spacePanelDividerMarginHorizontal": "density",
      "spacePanelHeaderVertical": "density",
      "spacePanelNavLeft": "density",
      "spacePanelSideLeft": "density",
      "spacePanelSideRight": "density",
      "spacePanelSplitTop": "density",
      "spacePanelSplitBottom": "density",
      "spaceSegmentedControlFocusOutlineGutter": "density",
      "spaceTabsContentTop": "density",
      "spaceTabsFocusOutlineGutter": "density",
      "spaceTabsVertical": "density",
      "spaceTableContentBottom": "density",
      "spaceTableEmbeddedHeaderTop": "density",
      "spaceTableFooterHorizontal": "density",
      "spaceTableHeaderFocusOutlineGutter": "density",
      "spaceTableHeaderHorizontal": "density",
      "spaceTableHeaderToolsBottom": "density",
      "spaceTableHeaderToolsFullPageBottom": "density",
      "spaceTableHorizontal": "density",
      "spaceTreeViewIndentation": "density",
      "spaceTileGutter": "density",
      "spaceActionCardHorizontalDefault": "density",
      "spaceActionCardHorizontalEmbedded": "density",
      "spaceActionCardVerticalDefault": "density",
      "spaceActionCardVerticalEmbedded": "density",
      "spaceActionCardDescriptionPaddingTop": "density",
      "spaceActionCardContentPaddingTop": "density",
      "spaceOptionPaddingVertical": "density",
      "spaceOptionPaddingHorizontal": "density",
      "spaceStatusIndicatorPaddingHorizontal": "density",
      "spaceScaled2xNone": "density",
      "spaceScaled2xXxxs": "density",
      "spaceScaled2xXxs": "density",
      "spaceScaled2xXs": "density",
      "spaceScaled2xS": "density",
      "spaceScaled2xM": "density",
      "spaceScaled2xL": "density",
      "spaceScaled2xXl": "density",
      "spaceScaled2xXxl": "density",
      "spaceScaled2xXxxl": "density",
      "spaceScaledNone": "density",
      "spaceScaledXxxs": "density",
      "spaceScaledXxs": "density",
      "spaceScaledXs": "density",
      "spaceScaledS": "density",
      "spaceScaledM": "density",
      "spaceScaledL": "density",
      "spaceScaledXl": "density",
      "spaceScaledXxl": "density",
      "spaceScaledXxxl": "density",
      "spaceStaticXxxs": "density",
      "spaceStaticXxs": "density",
      "spaceStaticXs": "density",
      "spaceStaticS": "density",
      "spaceStaticM": "density",
      "spaceStaticL": "density",
      "spaceStaticXl": "density",
      "spaceStaticXxl": "density",
      "spaceStaticXxxl": "density",
      "spaceNone": "density",
      "spaceXxxs": "density",
      "spaceXxs": "density",
      "spaceXs": "density",
      "spaceS": "density",
      "spaceM": "density",
      "spaceL": "density",
      "spaceXl": "density",
      "spaceXxl": "density",
      "spaceXxxl": "density",
      "shadowCard": "color",
      "shadowItemCard": "color",
      "shadowContainer": "color",
      "shadowContainerActive": "color",
      "shadowDropdown": "color",
      "shadowDropup": "color",
      "shadowFlashCollapsed": "color",
      "shadowFlashSticky": "color",
      "shadowModal": "color",
      "shadowPanel": "color",
      "shadowPanelToggle": "color",
      "shadowPopover": "color",
      "shadowSplitBottom": "color",
      "shadowSplitSide": "color",
      "shadowSticky": "color",
      "shadowStickyEmbedded": "color",
      "shadowStickyColumnFirst": "color",
      "shadowStickyColumnLast": "color"
    },
    "referenceTokens": {
      "color": {
        "primary": {
          "50": {
            "light": "#f0fbff",
            "dark": "#f0fbff"
          },
          "100": {
            "light": "#d1f1ff",
            "dark": "#d1f1ff"
          },
          "200": {
            "light": "#b8e7ff",
            "dark": "#b8e7ff"
          },
          "300": {
            "light": "#75cfff",
            "dark": "#75cfff"
          },
          "400": {
            "light": "#42b4ff",
            "dark": "#42b4ff"
          },
          "500": {
            "light": "#0099ff",
            "dark": "#0099ff"
          },
          "600": {
            "light": "#006ce0",
            "dark": "#006ce0"
          },
          "700": {
            "light": "#004a9e",
            "dark": "#004a9e"
          },
          "800": {
            "light": "#003b8f",
            "dark": "#003b8f"
          },
          "900": {
            "light": "#002b66",
            "dark": "#002b66"
          },
          "1000": {
            "light": "#001129",
            "dark": "#001129"
          }
        },
        "neutral": {
          "50": {
            "light": "#fcfcfd",
            "dark": "#fcfcfd"
          },
          "100": {
            "light": "#f9f9fa",
            "dark": "#f9f9fa"
          },
          "150": {
            "light": "#f6f6f9",
            "dark": "#f6f6f9"
          },
          "200": {
            "light": "#f3f3f7",
            "dark": "#f3f3f7"
          },
          "250": {
            "light": "#ebebf0",
            "dark": "#ebebf0"
          },
          "300": {
            "light": "#dedee3",
            "dark": "#dedee3"
          },
          "350": {
            "light": "#c6c6cd",
            "dark": "#c6c6cd"
          },
          "400": {
            "light": "#b4b4bb",
            "dark": "#b4b4bb"
          },
          "450": {
            "light": "#a4a4ad",
            "dark": "#a4a4ad"
          },
          "500": {
            "light": "#8c8c94",
            "dark": "#8c8c94"
          },
          "550": {
            "light": "#72747e",
            "dark": "#72747e"
          },
          "600": {
            "light": "#656871",
            "dark": "#656871"
          },
          "650": {
            "light": "#424650",
            "dark": "#424650"
          },
          "700": {
            "light": "#333843",
            "dark": "#333843"
          },
          "750": {
            "light": "#232b37",
            "dark": "#232b37"
          },
          "800": {
            "light": "#1b232d",
            "dark": "#1b232d"
          },
          "850": {
            "light": "#161d26",
            "dark": "#161d26"
          },
          "900": {
            "light": "#131920",
            "dark": "#131920"
          },
          "950": {
            "light": "#0f141a",
            "dark": "#0f141a"
          },
          "1000": {
            "light": "#06080a",
            "dark": "#06080a"
          }
        },
        "error": {
          "50": {
            "light": "#fff5f5",
            "dark": "#fff5f5"
          },
          "400": {
            "light": "#ff7a7a",
            "dark": "#ff7a7a"
          },
          "600": {
            "light": "#db0000",
            "dark": "#db0000"
          },
          "900": {
            "light": "#700000",
            "dark": "#700000"
          },
          "1000": {
            "light": "#1f0000",
            "dark": "#1f0000"
          }
        },
        "success": {
          "50": {
            "light": "#effff1",
            "dark": "#effff1"
          },
          "500": {
            "light": "#2bb534",
            "dark": "#2bb534"
          },
          "600": {
            "light": "#00802f",
            "dark": "#00802f"
          },
          "1000": {
            "light": "#001401",
            "dark": "#001401"
          }
        },
        "warning": {
          "50": {
            "light": "#fffef0",
            "dark": "#fffef0"
          },
          "400": {
            "light": "#ffe347",
            "dark": "#ffe347"
          },
          "500": {
            "light": "#fbd332",
            "dark": "#fbd332"
          },
          "900": {
            "light": "#855900",
            "dark": "#855900"
          },
          "1000": {
            "light": "#191100",
            "dark": "#191100"
          }
        },
        "info": {
          "50": {
            "light": "#f0fbff",
            "dark": "#f0fbff"
          },
          "300": {
            "light": "#75cfff",
            "dark": "#75cfff"
          },
          "400": {
            "light": "#42b4ff",
            "dark": "#42b4ff"
          },
          "600": {
            "light": "#006ce0",
            "dark": "#006ce0"
          },
          "1000": {
            "light": "#001129",
            "dark": "#001129"
          }
        }
      }
    }
  },
  "secondary": [],
  "themeable": [
    "colorChartsStatusCritical",
    "colorChartsStatusHigh",
    "colorChartsStatusMedium",
    "colorChartsStatusLow",
    "colorChartsStatusPositive",
    "colorChartsStatusInfo",
    "colorChartsStatusNeutral",
    "colorChartsThresholdNegative",
    "colorChartsThresholdPositive",
    "colorChartsThresholdInfo",
    "colorChartsThresholdNeutral",
    "colorChartsPaletteCategorical1",
    "colorChartsPaletteCategorical2",
    "colorChartsPaletteCategorical3",
    "colorChartsPaletteCategorical4",
    "colorChartsPaletteCategorical5",
    "colorChartsPaletteCategorical6",
    "colorChartsPaletteCategorical7",
    "colorChartsPaletteCategorical8",
    "colorChartsPaletteCategorical9",
    "colorChartsPaletteCategorical10",
    "colorChartsPaletteCategorical11",
    "colorChartsPaletteCategorical12",
    "colorChartsPaletteCategorical13",
    "colorChartsPaletteCategorical14",
    "colorChartsPaletteCategorical15",
    "colorChartsPaletteCategorical16",
    "colorChartsPaletteCategorical17",
    "colorChartsPaletteCategorical18",
    "colorChartsPaletteCategorical19",
    "colorChartsPaletteCategorical20",
    "colorChartsPaletteCategorical21",
    "colorChartsPaletteCategorical22",
    "colorChartsPaletteCategorical23",
    "colorChartsPaletteCategorical24",
    "colorChartsPaletteCategorical25",
    "colorChartsPaletteCategorical26",
    "colorChartsPaletteCategorical27",
    "colorChartsPaletteCategorical28",
    "colorChartsPaletteCategorical29",
    "colorChartsPaletteCategorical30",
    "colorChartsPaletteCategorical31",
    "colorChartsPaletteCategorical32",
    "colorChartsPaletteCategorical33",
    "colorChartsPaletteCategorical34",
    "colorChartsPaletteCategorical35",
    "colorChartsPaletteCategorical36",
    "colorChartsPaletteCategorical37",
    "colorChartsPaletteCategorical38",
    "colorChartsPaletteCategorical39",
    "colorChartsPaletteCategorical40",
    "colorChartsPaletteCategorical41",
    "colorChartsPaletteCategorical42",
    "colorChartsPaletteCategorical43",
    "colorChartsPaletteCategorical44",
    "colorChartsPaletteCategorical45",
    "colorChartsPaletteCategorical46",
    "colorChartsPaletteCategorical47",
    "colorChartsPaletteCategorical48",
    "colorChartsPaletteCategorical49",
    "colorChartsPaletteCategorical50",
    "colorChartsErrorBarMarker",
    "colorBackgroundNotificationSeverityCritical",
    "colorBackgroundNotificationSeverityHigh",
    "colorBackgroundNotificationSeverityMedium",
    "colorBackgroundNotificationSeverityLow",
    "colorBackgroundNotificationSeverityNeutral",
    "colorTextNotificationSeverityCritical",
    "colorTextNotificationSeverityHigh",
    "colorTextNotificationSeverityMedium",
    "colorTextNotificationSeverityLow",
    "colorTextNotificationSeverityNeutral",
    "colorBackgroundButtonLinkActive",
    "colorBackgroundButtonLinkDefault",
    "colorBackgroundButtonLinkDisabled",
    "colorBackgroundButtonLinkHover",
    "colorBackgroundButtonNormalActive",
    "colorBackgroundButtonNormalDefault",
    "colorBackgroundButtonNormalDisabled",
    "colorBackgroundButtonNormalHover",
    "colorBackgroundToggleButtonNormalPressed",
    "colorBackgroundToggleButtonNormalDefault",
    "colorBackgroundButtonPrimaryActive",
    "colorBackgroundButtonPrimaryDefault",
    "colorBackgroundButtonPrimaryDisabled",
    "colorBackgroundButtonPrimaryHover",
    "colorBackgroundCellShaded",
    "colorBackgroundCard",
    "colorBackgroundContainerContent",
    "colorBackgroundContainerHeader",
    "colorBackgroundControlChecked",
    "colorBackgroundControlDefault",
    "colorBackgroundControlDisabled",
    "colorBackgroundDropdownItemDefault",
    "colorBackgroundDropdownItemFilterMatch",
    "colorBackgroundDropdownItemHover",
    "colorBackgroundDropdownItemSelected",
    "colorBackgroundHomeHeader",
    "colorBackgroundInputDefault",
    "colorBackgroundInputDisabled",
    "colorBackgroundItemSelected",
    "colorBackgroundLayoutMain",
    "colorBackgroundLayoutToolbar",
    "colorBackgroundLayoutToggleActive",
    "colorBackgroundLayoutToggleDefault",
    "colorBackgroundLayoutToggleHover",
    "colorBackgroundLayoutToggleSelectedActive",
    "colorBackgroundLayoutToggleSelectedDefault",
    "colorBackgroundLayoutToggleSelectedHover",
    "colorBackgroundNotificationBlue",
    "colorBackgroundNotificationGreen",
    "colorBackgroundNotificationGrey",
    "colorBackgroundNotificationRed",
    "colorBackgroundNotificationYellow",
    "colorBackgroundPopover",
    "colorBackgroundProgressBarValueDefault",
    "colorBackgroundProgressBarDefault",
    "colorBackgroundSegmentActive",
    "colorBackgroundSegmentDefault",
    "colorBackgroundSegmentDisabled",
    "colorBackgroundSegmentHover",
    "colorBackgroundSegmentWrapper",
    "colorBackgroundSliderRangeDefault",
    "colorBackgroundSliderRangeActive",
    "colorBackgroundSliderHandleDefault",
    "colorBackgroundSliderHandleActive",
    "colorBackgroundSliderTrackDefault",
    "colorBackgroundStatusError",
    "colorBackgroundStatusInfo",
    "colorBackgroundDialog",
    "colorBackgroundStatusSuccess",
    "colorBackgroundStatusWarning",
    "colorBackgroundToggleCheckedDisabled",
    "colorBackgroundToggleDefault",
    "colorBackgroundStatusIndicatorError",
    "colorBackgroundStatusIndicatorWarning",
    "colorBackgroundStatusIndicatorSuccess",
    "colorBackgroundStatusIndicatorInfo",
    "colorBackgroundStatusIndicatorNeutral",
    "colorBackgroundChatBubbleOutgoing",
    "colorBackgroundChatBubbleIncoming",
    "colorTextChatBubbleOutgoing",
    "colorTextChatBubbleIncoming",
    "colorBorderButtonLinkDisabled",
    "colorBorderButtonNormalActive",
    "colorBorderButtonNormalDefault",
    "colorBorderToggleButtonNormalPressed",
    "colorBorderButtonNormalDisabled",
    "colorTextButtonNormalDisabled",
    "colorBorderButtonNormalHover",
    "colorTextButtonIconDisabled",
    "colorBorderButtonPrimaryActive",
    "colorBorderButtonPrimaryDefault",
    "colorBorderButtonPrimaryDisabled",
    "colorBorderButtonPrimaryHover",
    "colorTextButtonPrimaryDisabled",
    "colorItemSelected",
    "colorBorderCard",
    "colorBorderContainerTop",
    "colorBorderControlDefault",
    "colorBorderDividerDefault",
    "colorBorderDividerSecondary",
    "colorBorderDropdownContainer",
    "colorBorderDropdownItemHover",
    "colorBorderInputDefault",
    "colorBorderInputFocused",
    "colorBorderItemFocused",
    "colorBorderDropdownItemFocused",
    "colorBorderItemSelected",
    "colorBorderLayout",
    "colorBorderPopover",
    "colorBorderSegmentActive",
    "colorBorderSegmentDefault",
    "colorBorderSegmentDisabled",
    "colorBorderSegmentHover",
    "colorBorderStatusError",
    "colorBorderStatusInfo",
    "colorBorderStatusSuccess",
    "colorBorderStatusWarning",
    "colorBorderDialog",
    "colorForegroundControlDefault",
    "colorForegroundControlDisabled",
    "colorForegroundControlReadOnly",
    "colorTextAccent",
    "colorTextBodyDefault",
    "colorTextBodySecondary",
    "colorTextBreadcrumbCurrent",
    "colorTextBreadcrumbIcon",
    "colorTextButtonInlineIconDefault",
    "colorTextButtonInlineIconDisabled",
    "colorTextButtonInlineIconHover",
    "colorTextButtonNormalActive",
    "colorTextToggleButtonNormalPressed",
    "colorTextButtonNormalDefault",
    "colorTextButtonNormalHover",
    "colorTextLinkButtonNormalDefault",
    "colorTextLinkButtonNormalHover",
    "colorTextLinkButtonNormalActive",
    "colorTextButtonLinkActive",
    "colorTextButtonLinkDefault",
    "colorTextButtonLinkDisabled",
    "colorTextButtonLinkHover",
    "colorTextButtonPrimaryActive",
    "colorTextButtonPrimaryDefault",
    "colorTextButtonPrimaryHover",
    "colorTextCalendarDateSelected",
    "colorTextCounter",
    "colorTextDropdownItemDefault",
    "colorTextDropdownItemDisabled",
    "colorTextDropdownItemFilterMatch",
    "colorTextDropdownItemHighlighted",
    "colorTextDropdownItemSecondary",
    "colorTextEmpty",
    "colorTextFormDefault",
    "colorTextFormLabel",
    "colorTextFormSecondary",
    "colorTextGroupLabel",
    "colorTextHeadingDefault",
    "colorTextHeadingSecondary",
    "colorTextHomeHeaderDefault",
    "colorTextHomeHeaderSecondary",
    "colorTextIconSubtle",
    "colorTextInputDisabled",
    "colorTextInputPlaceholder",
    "colorTextInteractiveActive",
    "colorTextInteractiveDefault",
    "colorTextInteractiveDisabled",
    "colorTextInteractiveHover",
    "colorTextToggleButtonIconPressed",
    "colorTextInteractiveInvertedDefault",
    "colorTextInteractiveInvertedHover",
    "colorTextLabel",
    "colorTextKeyValuePairsValue",
    "colorTextLayoutToggle",
    "colorTextLayoutToggleActive",
    "colorTextLayoutToggleHover",
    "colorTextLayoutToggleSelected",
    "colorTextLinkDefault",
    "colorTextLinkHover",
    "colorTextLinkDecorationDefault",
    "colorTextLinkDecorationHover",
    "colorTextLinkSecondaryDefault",
    "colorTextLinkSecondaryHover",
    "colorTextLinkInfoDefault",
    "colorTextLinkInfoHover",
    "colorTextNotificationDefault",
    "colorTextSegmentActive",
    "colorTextSegmentDefault",
    "colorTextSegmentHover",
    "colorTextStatusError",
    "colorTextStatusInactive",
    "colorTextStatusInfo",
    "colorTextStatusSuccess",
    "colorTextStatusWarning",
    "colorTextTopNavigationTitle",
    "colorDropzoneBackgroundDefault",
    "colorDropzoneBackgroundHover",
    "colorDropzoneTextDefault",
    "colorDropzoneTextHover",
    "colorDropzoneBorderDefault",
    "colorDropzoneBorderHover",
    "colorTreeViewConnectorLine",
    "colorBackgroundActionCardDefault",
    "colorBackgroundActionCardHover",
    "colorBackgroundActionCardActive",
    "colorBorderActionCardDefault",
    "colorBorderActionCardHover",
    "colorBorderActionCardActive",
    "colorBorderActionCardDisabled",
    "colorBackgroundActionCardDisabled",
    "colorTextActionCardDisabled",
    "fontDecorationStyleLink",
    "fontDecorationThicknessLink",
    "fontDecorationThicknessLinkDisplayL",
    "fontFamilyBase",
    "fontFamilyDisplay",
    "fontFamilyHeading",
    "fontFamilyMonospace",
    "fontSizeBodyM",
    "fontSizeBodyS",
    "fontSizeDisplayL",
    "fontSizeFormLabel",
    "fontSizeHeadingL",
    "fontSizeHeadingM",
    "fontSizeHeadingS",
    "fontSizeHeadingXl",
    "fontSizeHeadingXs",
    "fontSizeKeyValuePairsLabel",
    "fontSizeTabs",
    "fontWeightAlertHeader",
    "fontWeightBold",
    "fontWeightBreadcrumbCurrent",
    "fontWeightButton",
    "fontWeightDisplayL",
    "fontWeightFlashbarHeader",
    "fontWeightFormLabel",
    "fontWeightHeadingL",
    "fontWeightHeadingM",
    "fontWeightHeadingS",
    "fontWeightHeadingXl",
    "fontWeightHeadingXs",
    "fontWeightHeavy",
    "fontWeightKeyValuePairsLabel",
    "fontWeightLighter",
    "fontWeightNormal",
    "fontWeightTabs",
    "fontWeightTabsDisabled",
    "letterSpacingDisplayL",
    "letterSpacingHeadingL",
    "letterSpacingHeadingM",
    "letterSpacingHeadingS",
    "letterSpacingHeadingXl",
    "letterSpacingHeadingXs",
    "lineHeightBodyM",
    "lineHeightBodyS",
    "lineHeightDisplayL",
    "lineHeightFormLabel",
    "lineHeightHeadingL",
    "lineHeightHeadingM",
    "lineHeightHeadingS",
    "lineHeightHeadingXl",
    "lineHeightHeadingXs",
    "lineHeightKeyValuePairsLabel",
    "lineHeightTabs",
    "borderRadiusActionCardDefault",
    "borderRadiusActionCardEmbedded",
    "borderRadiusAlert",
    "borderRadiusBadge",
    "borderRadiusButton",
    "borderRadiusCalendarDayFocusRing",
    "borderRadiusCardDefault",
    "borderRadiusCardEmbedded",
    "borderRadiusContainer",
    "borderRadiusControlCircularFocusRing",
    "borderRadiusControlDefaultFocusRing",
    "borderRadiusDropdown",
    "borderRadiusDropzone",
    "borderRadiusFlashbar",
    "borderRadiusInput",
    "borderRadiusItem",
    "borderRadiusPopover",
    "borderRadiusStatusIndicator",
    "borderRadiusTabsFocusRing",
    "borderRadiusTiles",
    "borderRadiusToken",
    "borderRadiusTutorialPanelItem",
    "borderWidthActionCardActive",
    "borderWidthActionCardDefault",
    "borderWidthActionCardDisabled",
    "borderWidthActionCardHover",
    "borderWidthAlert",
    "borderWidthAlertBlockEnd",
    "borderWidthAlertBlockStart",
    "borderWidthAlertInlineEnd",
    "borderWidthAlertInlineStart",
    "borderWidthButton",
    "borderWidthCard",
    "borderWidthCardSelected",
    "borderWidthDropdown",
    "borderWidthField",
    "borderWidthIconBig",
    "borderWidthIconLarge",
    "borderWidthIconMedium",
    "borderWidthIconNormal",
    "borderWidthIconSmall",
    "borderWidthItemSelected",
    "borderWidthPopover",
    "borderWidthToken",
    "sizeVerticalInput",
    "spaceAlertVertical",
    "spaceButtonHorizontal",
    "spaceButtonVertical",
    "spaceTokenVertical",
    "spaceFieldVertical",
    "spaceCardHorizontalDefault",
    "spaceCardHorizontalEmbedded",
    "spaceCardVerticalDefault",
    "spaceCardVerticalEmbedded",
    "spaceTabsVertical",
    "spaceActionCardHorizontalDefault",
    "spaceActionCardHorizontalEmbedded",
    "spaceActionCardVerticalDefault",
    "spaceActionCardVerticalEmbedded",
    "spaceStatusIndicatorPaddingHorizontal",
    "shadowCard"
  ],
  "exposed": [
    "colorChartsRed300",
    "colorChartsRed400",
    "colorChartsRed500",
    "colorChartsRed600",
    "colorChartsRed700",
    "colorChartsRed800",
    "colorChartsRed900",
    "colorChartsRed1000",
    "colorChartsRed1100",
    "colorChartsRed1200",
    "colorChartsOrange300",
    "colorChartsOrange400",
    "colorChartsOrange500",
    "colorChartsOrange600",
    "colorChartsOrange700",
    "colorChartsOrange800",
    "colorChartsOrange900",
    "colorChartsOrange1000",
    "colorChartsOrange1100",
    "colorChartsOrange1200",
    "colorChartsYellow300",
    "colorChartsYellow400",
    "colorChartsYellow500",
    "colorChartsYellow600",
    "colorChartsYellow700",
    "colorChartsYellow800",
    "colorChartsYellow900",
    "colorChartsYellow1000",
    "colorChartsYellow1100",
    "colorChartsYellow1200",
    "colorChartsGreen300",
    "colorChartsGreen400",
    "colorChartsGreen500",
    "colorChartsGreen600",
    "colorChartsGreen700",
    "colorChartsGreen800",
    "colorChartsGreen900",
    "colorChartsGreen1000",
    "colorChartsGreen1100",
    "colorChartsGreen1200",
    "colorChartsTeal300",
    "colorChartsTeal400",
    "colorChartsTeal500",
    "colorChartsTeal600",
    "colorChartsTeal700",
    "colorChartsTeal800",
    "colorChartsTeal900",
    "colorChartsTeal1000",
    "colorChartsTeal1100",
    "colorChartsTeal1200",
    "colorChartsBlue1300",
    "colorChartsBlue1400",
    "colorChartsBlue1500",
    "colorChartsBlue1600",
    "colorChartsBlue1700",
    "colorChartsBlue1800",
    "colorChartsBlue1900",
    "colorChartsBlue11000",
    "colorChartsBlue11100",
    "colorChartsBlue11200",
    "colorChartsBlue2300",
    "colorChartsBlue2400",
    "colorChartsBlue2500",
    "colorChartsBlue2600",
    "colorChartsBlue2700",
    "colorChartsBlue2800",
    "colorChartsBlue2900",
    "colorChartsBlue21000",
    "colorChartsBlue21100",
    "colorChartsBlue21200",
    "colorChartsPurple300",
    "colorChartsPurple400",
    "colorChartsPurple500",
    "colorChartsPurple600",
    "colorChartsPurple700",
    "colorChartsPurple800",
    "colorChartsPurple900",
    "colorChartsPurple1000",
    "colorChartsPurple1100",
    "colorChartsPurple1200",
    "colorChartsPink300",
    "colorChartsPink400",
    "colorChartsPink500",
    "colorChartsPink600",
    "colorChartsPink700",
    "colorChartsPink800",
    "colorChartsPink900",
    "colorChartsPink1000",
    "colorChartsPink1100",
    "colorChartsPink1200",
    "colorChartsStatusCritical",
    "colorChartsStatusHigh",
    "colorChartsStatusMedium",
    "colorChartsStatusLow",
    "colorChartsStatusPositive",
    "colorChartsStatusInfo",
    "colorChartsStatusNeutral",
    "colorChartsThresholdNegative",
    "colorChartsThresholdPositive",
    "colorChartsThresholdInfo",
    "colorChartsThresholdNeutral",
    "colorChartsLineGrid",
    "colorChartsLineTick",
    "colorChartsLineAxis",
    "colorChartsPaletteCategorical1",
    "colorChartsPaletteCategorical2",
    "colorChartsPaletteCategorical3",
    "colorChartsPaletteCategorical4",
    "colorChartsPaletteCategorical5",
    "colorChartsPaletteCategorical6",
    "colorChartsPaletteCategorical7",
    "colorChartsPaletteCategorical8",
    "colorChartsPaletteCategorical9",
    "colorChartsPaletteCategorical10",
    "colorChartsPaletteCategorical11",
    "colorChartsPaletteCategorical12",
    "colorChartsPaletteCategorical13",
    "colorChartsPaletteCategorical14",
    "colorChartsPaletteCategorical15",
    "colorChartsPaletteCategorical16",
    "colorChartsPaletteCategorical17",
    "colorChartsPaletteCategorical18",
    "colorChartsPaletteCategorical19",
    "colorChartsPaletteCategorical20",
    "colorChartsPaletteCategorical21",
    "colorChartsPaletteCategorical22",
    "colorChartsPaletteCategorical23",
    "colorChartsPaletteCategorical24",
    "colorChartsPaletteCategorical25",
    "colorChartsPaletteCategorical26",
    "colorChartsPaletteCategorical27",
    "colorChartsPaletteCategorical28",
    "colorChartsPaletteCategorical29",
    "colorChartsPaletteCategorical30",
    "colorChartsPaletteCategorical31",
    "colorChartsPaletteCategorical32",
    "colorChartsPaletteCategorical33",
    "colorChartsPaletteCategorical34",
    "colorChartsPaletteCategorical35",
    "colorChartsPaletteCategorical36",
    "colorChartsPaletteCategorical37",
    "colorChartsPaletteCategorical38",
    "colorChartsPaletteCategorical39",
    "colorChartsPaletteCategorical40",
    "colorChartsPaletteCategorical41",
    "colorChartsPaletteCategorical42",
    "colorChartsPaletteCategorical43",
    "colorChartsPaletteCategorical44",
    "colorChartsPaletteCategorical45",
    "colorChartsPaletteCategorical46",
    "colorChartsPaletteCategorical47",
    "colorChartsPaletteCategorical48",
    "colorChartsPaletteCategorical49",
    "colorChartsPaletteCategorical50",
    "colorChartsErrorBarMarker",
    "colorBackgroundNotificationSeverityCritical",
    "colorBackgroundNotificationSeverityHigh",
    "colorBackgroundNotificationSeverityMedium",
    "colorBackgroundNotificationSeverityLow",
    "colorBackgroundNotificationSeverityNeutral",
    "colorTextNotificationSeverityCritical",
    "colorTextNotificationSeverityHigh",
    "colorTextNotificationSeverityMedium",
    "colorTextNotificationSeverityLow",
    "colorTextNotificationSeverityNeutral",
    "colorBackgroundButtonLinkActive",
    "colorBackgroundButtonLinkDefault",
    "colorBackgroundButtonLinkDisabled",
    "colorBackgroundButtonLinkHover",
    "colorBackgroundButtonNormalActive",
    "colorBackgroundButtonNormalDefault",
    "colorBackgroundButtonNormalDisabled",
    "colorBackgroundButtonNormalHover",
    "colorBackgroundToggleButtonNormalPressed",
    "colorBackgroundToggleButtonNormalDefault",
    "colorBackgroundButtonPrimaryActive",
    "colorBackgroundButtonPrimaryDefault",
    "colorBackgroundButtonPrimaryDisabled",
    "colorBackgroundButtonPrimaryHover",
    "colorBackgroundCellShaded",
    "colorBackgroundCard",
    "colorBackgroundContainerContent",
    "colorBackgroundContainerHeader",
    "colorBackgroundControlChecked",
    "colorBackgroundControlDefault",
    "colorBackgroundControlDisabled",
    "colorBackgroundDropdownItemDefault",
    "colorBackgroundDropdownItemFilterMatch",
    "colorBackgroundDropdownItemHover",
    "colorBackgroundDropdownItemSelected",
    "colorBackgroundHomeHeader",
    "colorBackgroundInputDefault",
    "colorBackgroundInputDisabled",
    "colorBackgroundItemSelected",
    "colorBackgroundLayoutMain",
    "colorBackgroundLayoutToolbar",
    "colorBackgroundLayoutToggleActive",
    "colorBackgroundLayoutToggleDefault",
    "colorBackgroundLayoutToggleHover",
    "colorBackgroundLayoutToggleSelectedActive",
    "colorBackgroundLayoutToggleSelectedDefault",
    "colorBackgroundLayoutToggleSelectedHover",
    "colorBackgroundNotificationBlue",
    "colorBackgroundNotificationGreen",
    "colorBackgroundNotificationGrey",
    "colorBackgroundNotificationRed",
    "colorBackgroundNotificationYellow",
    "colorBackgroundPopover",
    "colorBackgroundProgressBarValueDefault",
    "colorBackgroundProgressBarDefault",
    "colorBackgroundSegmentActive",
    "colorBackgroundSegmentDefault",
    "colorBackgroundSegmentDisabled",
    "colorBackgroundSegmentHover",
    "colorBackgroundSegmentWrapper",
    "colorBackgroundSliderRangeDefault",
    "colorBackgroundSliderRangeActive",
    "colorBackgroundSliderHandleDefault",
    "colorBackgroundSliderHandleActive",
    "colorBackgroundSliderTrackDefault",
    "colorBackgroundStatusError",
    "colorBackgroundStatusInfo",
    "colorBackgroundDialog",
    "colorBackgroundStatusSuccess",
    "colorBackgroundStatusWarning",
    "colorBackgroundToggleCheckedDisabled",
    "colorBackgroundToggleDefault",
    "colorBackgroundAvatarGenAi",
    "colorBackgroundAvatarDefault",
    "colorTextAvatar",
    "colorBackgroundLoadingBarGenAi",
    "colorBackgroundChatBubbleOutgoing",
    "colorBackgroundChatBubbleIncoming",
    "colorTextChatBubbleOutgoing",
    "colorTextChatBubbleIncoming",
    "colorBorderButtonLinkDisabled",
    "colorBorderButtonNormalActive",
    "colorBorderButtonNormalDefault",
    "colorBorderToggleButtonNormalPressed",
    "colorBorderButtonNormalDisabled",
    "colorTextButtonNormalDisabled",
    "colorBorderButtonNormalHover",
    "colorTextButtonIconDisabled",
    "colorBorderButtonPrimaryActive",
    "colorBorderButtonPrimaryDefault",
    "colorBorderButtonPrimaryDisabled",
    "colorBorderButtonPrimaryHover",
    "colorTextButtonPrimaryDisabled",
    "colorItemSelected",
    "colorBorderCard",
    "colorBorderContainerTop",
    "colorBorderControlDefault",
    "colorBorderDividerDefault",
    "colorBorderDividerSecondary",
    "colorBorderDropdownContainer",
    "colorBorderDropdownItemHover",
    "colorBorderInputDefault",
    "colorBorderInputFocused",
    "colorBorderItemFocused",
    "colorBorderDropdownItemFocused",
    "colorBorderItemSelected",
    "colorBorderPopover",
    "colorBorderSegmentActive",
    "colorBorderSegmentDefault",
    "colorBorderSegmentDisabled",
    "colorBorderSegmentHover",
    "colorBorderStatusError",
    "colorBorderStatusInfo",
    "colorBorderStatusSuccess",
    "colorBorderStatusWarning",
    "colorBorderDialog",
    "colorForegroundControlDefault",
    "colorForegroundControlDisabled",
    "colorForegroundControlReadOnly",
    "colorTextAccent",
    "colorTextBodyDefault",
    "colorTextBodySecondary",
    "colorTextBreadcrumbCurrent",
    "colorTextBreadcrumbIcon",
    "colorTextButtonInlineIconDefault",
    "colorTextButtonInlineIconDisabled",
    "colorTextButtonInlineIconHover",
    "colorTextButtonNormalActive",
    "colorTextToggleButtonNormalPressed",
    "colorTextButtonNormalDefault",
    "colorTextButtonNormalHover",
    "colorTextButtonLinkActive",
    "colorTextButtonLinkDefault",
    "colorTextButtonLinkDisabled",
    "colorTextButtonLinkHover",
    "colorTextButtonPrimaryActive",
    "colorTextButtonPrimaryDefault",
    "colorTextButtonPrimaryHover",
    "colorTextCalendarDateSelected",
    "colorTextCounter",
    "colorTextDropdownItemDefault",
    "colorTextDropdownItemDisabled",
    "colorTextDropdownItemFilterMatch",
    "colorTextDropdownItemHighlighted",
    "colorTextDropdownItemSecondary",
    "colorTextEmpty",
    "colorTextFormDefault",
    "colorTextFormSecondary",
    "colorTextGroupLabel",
    "colorTextLabelGenAi",
    "colorTextHeadingDefault",
    "colorTextHeadingSecondary",
    "colorTextHomeHeaderDefault",
    "colorTextHomeHeaderSecondary",
    "colorTextIconSubtle",
    "colorTextInputDisabled",
    "colorTextInputPlaceholder",
    "colorTextInteractiveActive",
    "colorTextInteractiveDefault",
    "colorTextInteractiveDisabled",
    "colorTextInteractiveHover",
    "colorTextToggleButtonIconPressed",
    "colorTextInteractiveInvertedDefault",
    "colorTextInteractiveInvertedHover",
    "colorTextLabel",
    "colorTextLayoutToggle",
    "colorTextLayoutToggleActive",
    "colorTextLayoutToggleHover",
    "colorTextLayoutToggleSelected",
    "colorTextLinkDefault",
    "colorTextLinkHover",
    "colorTextLinkSecondaryDefault",
    "colorTextLinkSecondaryHover",
    "colorTextLinkInfoDefault",
    "colorTextLinkInfoHover",
    "colorTextNotificationDefault",
    "colorTextSegmentActive",
    "colorTextSegmentDefault",
    "colorTextSegmentHover",
    "colorTextStatusError",
    "colorTextStatusInactive",
    "colorTextStatusInfo",
    "colorTextStatusSuccess",
    "colorTextStatusWarning",
    "colorTextTopNavigationTitle",
    "colorBoardPlaceholderActive",
    "colorBoardPlaceholderHover",
    "colorDragPlaceholderActive",
    "colorDragPlaceholderHover",
    "colorDropzoneBackgroundDefault",
    "colorDropzoneBackgroundHover",
    "colorDropzoneTextDefault",
    "colorDropzoneTextHover",
    "colorDropzoneBorderDefault",
    "colorDropzoneBorderHover",
    "colorTreeViewConnectorLine",
    "colorBackgroundActionCardDefault",
    "colorBackgroundActionCardHover",
    "colorBackgroundActionCardActive",
    "colorBorderActionCardDefault",
    "colorBorderActionCardHover",
    "colorBorderActionCardActive",
    "colorBorderActionCardDisabled",
    "colorBackgroundActionCardDisabled",
    "colorTextActionCardDisabled",
    "fontFamilyBase",
    "fontFamilyDisplay",
    "fontFamilyHeading",
    "fontFamilyMonospace",
    "fontSizeBodyM",
    "fontSizeBodyS",
    "fontSizeDisplayL",
    "fontSizeHeadingL",
    "fontSizeHeadingM",
    "fontSizeHeadingS",
    "fontSizeHeadingXl",
    "fontSizeHeadingXs",
    "fontSizeTabs",
    "fontWeightAlertHeader",
    "fontWeightBold",
    "fontWeightButton",
    "fontWeightDisplayL",
    "fontWeightFlashbarHeader",
    "fontWeightHeadingL",
    "fontWeightHeadingM",
    "fontWeightHeadingS",
    "fontWeightHeadingXl",
    "fontWeightHeadingXs",
    "fontWeightHeavy",
    "fontWeightLighter",
    "fontWeightNormal",
    "fontWeightTabs",
    "fontWeightTabsDisabled",
    "letterSpacingDisplayL",
    "letterSpacingHeadingL",
    "letterSpacingHeadingM",
    "letterSpacingHeadingS",
    "letterSpacingHeadingXl",
    "letterSpacingHeadingXs",
    "lineHeightBodyM",
    "lineHeightBodyS",
    "lineHeightDisplayL",
    "lineHeightHeadingL",
    "lineHeightHeadingM",
    "lineHeightHeadingS",
    "lineHeightHeadingXl",
    "lineHeightHeadingXs",
    "lineHeightTabs",
    "borderRadiusActionCardDefault",
    "borderRadiusActionCardEmbedded",
    "borderRadiusAlert",
    "borderRadiusBadge",
    "borderRadiusButton",
    "borderRadiusCalendarDayFocusRing",
    "borderRadiusCardDefault",
    "borderRadiusCardEmbedded",
    "borderRadiusChatBubble",
    "borderRadiusContainer",
    "borderRadiusControlCircularFocusRing",
    "borderRadiusControlDefaultFocusRing",
    "borderRadiusDropdown",
    "borderRadiusDropzone",
    "borderRadiusFlashbar",
    "borderRadiusInput",
    "borderRadiusItem",
    "borderRadiusPopover",
    "borderRadiusTabsFocusRing",
    "borderRadiusTiles",
    "borderRadiusToken",
    "borderRadiusTutorialPanelItem",
    "borderWidthActionCardActive",
    "borderWidthActionCardDefault",
    "borderWidthActionCardDisabled",
    "borderWidthActionCardHover",
    "borderWidthAlert",
    "borderWidthAlertBlockEnd",
    "borderWidthAlertBlockStart",
    "borderWidthAlertInlineEnd",
    "borderWidthAlertInlineStart",
    "borderWidthButton",
    "borderWidthCard",
    "borderWidthCardSelected",
    "borderWidthDropdown",
    "borderWidthField",
    "borderWidthIconBig",
    "borderWidthIconLarge",
    "borderWidthIconMedium",
    "borderWidthIconNormal",
    "borderWidthIconSmall",
    "borderWidthItemSelected",
    "borderWidthPopover",
    "borderWidthToken",
    "motionDurationAvatarGenAiGradient",
    "motionDurationAvatarLoadingDots",
    "motionEasingAvatarGenAiGradient",
    "motionEasingResponsive",
    "motionEasingSticky",
    "motionEasingExpressive",
    "motionDurationResponsive",
    "motionDurationExpressive",
    "motionDurationComplex",
    "motionKeyframesFadeIn",
    "motionKeyframesFadeOut",
    "motionKeyframesStatusIconError",
    "motionKeyframesScalePopup",
    "sizeVerticalInput",
    "spaceAlertVertical",
    "spaceButtonHorizontal",
    "spaceButtonVertical",
    "spaceTokenVertical",
    "spaceFieldVertical",
    "spaceCardHorizontalDefault",
    "spaceCardHorizontalEmbedded",
    "spaceCardVerticalDefault",
    "spaceCardVerticalEmbedded",
    "spaceContainerHorizontal",
    "spaceFieldHorizontal",
    "spaceTabsVertical",
    "spaceTreeViewIndentation",
    "spaceActionCardHorizontalDefault",
    "spaceActionCardHorizontalEmbedded",
    "spaceActionCardVerticalDefault",
    "spaceActionCardVerticalEmbedded",
    "spaceOptionPaddingVertical",
    "spaceOptionPaddingHorizontal",
    "spaceScaledXxxs",
    "spaceScaledXxs",
    "spaceScaledXs",
    "spaceScaledS",
    "spaceScaledM",
    "spaceScaledL",
    "spaceScaledXl",
    "spaceScaledXxl",
    "spaceScaledXxxl",
    "spaceStaticXxxs",
    "spaceStaticXxs",
    "spaceStaticXs",
    "spaceStaticS",
    "spaceStaticM",
    "spaceStaticL",
    "spaceStaticXl",
    "spaceStaticXxl",
    "spaceStaticXxxl",
    "shadowCard",
    "shadowContainerActive"
  ],
  "variablesMap": {
    "colorPrimary50": "color-primary-50",
    "colorPrimary100": "color-primary-100",
    "colorPrimary200": "color-primary-200",
    "colorPrimary300": "color-primary-300",
    "colorPrimary400": "color-primary-400",
    "colorPrimary500": "color-primary-500",
    "colorPrimary600": "color-primary-600",
    "colorPrimary700": "color-primary-700",
    "colorPrimary800": "color-primary-800",
    "colorPrimary900": "color-primary-900",
    "colorPrimary1000": "color-primary-1000",
    "colorNeutral50": "color-neutral-50",
    "colorNeutral100": "color-neutral-100",
    "colorNeutral150": "color-neutral-150",
    "colorNeutral200": "color-neutral-200",
    "colorNeutral250": "color-neutral-250",
    "colorNeutral300": "color-neutral-300",
    "colorNeutral350": "color-neutral-350",
    "colorNeutral400": "color-neutral-400",
    "colorNeutral450": "color-neutral-450",
    "colorNeutral500": "color-neutral-500",
    "colorNeutral550": "color-neutral-550",
    "colorNeutral600": "color-neutral-600",
    "colorNeutral650": "color-neutral-650",
    "colorNeutral700": "color-neutral-700",
    "colorNeutral750": "color-neutral-750",
    "colorNeutral800": "color-neutral-800",
    "colorNeutral850": "color-neutral-850",
    "colorNeutral900": "color-neutral-900",
    "colorNeutral950": "color-neutral-950",
    "colorNeutral1000": "color-neutral-1000",
    "colorError50": "color-error-50",
    "colorError400": "color-error-400",
    "colorError600": "color-error-600",
    "colorError900": "color-error-900",
    "colorError1000": "color-error-1000",
    "colorSuccess50": "color-success-50",
    "colorSuccess500": "color-success-500",
    "colorSuccess600": "color-success-600",
    "colorSuccess1000": "color-success-1000",
    "colorWarning50": "color-warning-50",
    "colorWarning400": "color-warning-400",
    "colorWarning500": "color-warning-500",
    "colorWarning900": "color-warning-900",
    "colorWarning1000": "color-warning-1000",
    "colorInfo50": "color-info-50",
    "colorInfo300": "color-info-300",
    "colorInfo400": "color-info-400",
    "colorInfo600": "color-info-600",
    "colorInfo1000": "color-info-1000",
    "colorGrey50": "color-grey-50",
    "colorGrey100": "color-grey-100",
    "colorGrey150": "color-grey-150",
    "colorGrey200": "color-grey-200",
    "colorGrey250": "color-grey-250",
    "colorGrey300": "color-grey-300",
    "colorGrey350": "color-grey-350",
    "colorGrey400": "color-grey-400",
    "colorGrey450": "color-grey-450",
    "colorGrey500": "color-grey-500",
    "colorGrey600": "color-grey-600",
    "colorGrey650": "color-grey-650",
    "colorGrey700": "color-grey-700",
    "colorGrey750": "color-grey-750",
    "colorGrey800": "color-grey-800",
    "colorGrey850": "color-grey-850",
    "colorGrey900": "color-grey-900",
    "colorGrey950": "color-grey-950",
    "colorGrey1000": "color-grey-1000",
    "colorBlue50": "color-blue-50",
    "colorBlue100": "color-blue-100",
    "colorBlue200": "color-blue-200",
    "colorBlue300": "color-blue-300",
    "colorBlue400": "color-blue-400",
    "colorBlue600": "color-blue-600",
    "colorBlue700": "color-blue-700",
    "colorBlue900": "color-blue-900",
    "colorBlue1000": "color-blue-1000",
    "colorGreen50": "color-green-50",
    "colorGreen500": "color-green-500",
    "colorGreen600": "color-green-600",
    "colorGreen900": "color-green-900",
    "colorGreen1000": "color-green-1000",
    "colorRed50": "color-red-50",
    "colorRed400": "color-red-400",
    "colorRed600": "color-red-600",
    "colorRed900": "color-red-900",
    "colorRed1000": "color-red-1000",
    "colorYellow50": "color-yellow-50",
    "colorYellow400": "color-yellow-400",
    "colorYellow500": "color-yellow-500",
    "colorYellow900": "color-yellow-900",
    "colorYellow1000": "color-yellow-1000",
    "colorPurple400": "color-purple-400",
    "colorPurple700": "color-purple-700",
    "colorAmber400": "color-amber-400",
    "colorAmber500": "color-amber-500",
    "colorAwsSquidInk": "color-aws-squid-ink",
    "colorTransparent": "color-transparent",
    "colorBlack": "color-black",
    "colorWhite": "color-white",
    "colorChartsRed300": "color-charts-red-300",
    "colorChartsRed400": "color-charts-red-400",
    "colorChartsRed500": "color-charts-red-500",
    "colorChartsRed600": "color-charts-red-600",
    "colorChartsRed700": "color-charts-red-700",
    "colorChartsRed800": "color-charts-red-800",
    "colorChartsRed900": "color-charts-red-900",
    "colorChartsRed1000": "color-charts-red-1000",
    "colorChartsRed1100": "color-charts-red-1100",
    "colorChartsRed1200": "color-charts-red-1200",
    "colorChartsOrange300": "color-charts-orange-300",
    "colorChartsOrange400": "color-charts-orange-400",
    "colorChartsOrange500": "color-charts-orange-500",
    "colorChartsOrange600": "color-charts-orange-600",
    "colorChartsOrange700": "color-charts-orange-700",
    "colorChartsOrange800": "color-charts-orange-800",
    "colorChartsOrange900": "color-charts-orange-900",
    "colorChartsOrange1000": "color-charts-orange-1000",
    "colorChartsOrange1100": "color-charts-orange-1100",
    "colorChartsOrange1200": "color-charts-orange-1200",
    "colorChartsYellow300": "color-charts-yellow-300",
    "colorChartsYellow400": "color-charts-yellow-400",
    "colorChartsYellow500": "color-charts-yellow-500",
    "colorChartsYellow600": "color-charts-yellow-600",
    "colorChartsYellow700": "color-charts-yellow-700",
    "colorChartsYellow800": "color-charts-yellow-800",
    "colorChartsYellow900": "color-charts-yellow-900",
    "colorChartsYellow1000": "color-charts-yellow-1000",
    "colorChartsYellow1100": "color-charts-yellow-1100",
    "colorChartsYellow1200": "color-charts-yellow-1200",
    "colorChartsGreen300": "color-charts-green-300",
    "colorChartsGreen400": "color-charts-green-400",
    "colorChartsGreen500": "color-charts-green-500",
    "colorChartsGreen600": "color-charts-green-600",
    "colorChartsGreen700": "color-charts-green-700",
    "colorChartsGreen800": "color-charts-green-800",
    "colorChartsGreen900": "color-charts-green-900",
    "colorChartsGreen1000": "color-charts-green-1000",
    "colorChartsGreen1100": "color-charts-green-1100",
    "colorChartsGreen1200": "color-charts-green-1200",
    "colorChartsTeal300": "color-charts-teal-300",
    "colorChartsTeal400": "color-charts-teal-400",
    "colorChartsTeal500": "color-charts-teal-500",
    "colorChartsTeal600": "color-charts-teal-600",
    "colorChartsTeal700": "color-charts-teal-700",
    "colorChartsTeal800": "color-charts-teal-800",
    "colorChartsTeal900": "color-charts-teal-900",
    "colorChartsTeal1000": "color-charts-teal-1000",
    "colorChartsTeal1100": "color-charts-teal-1100",
    "colorChartsTeal1200": "color-charts-teal-1200",
    "colorChartsBlue1300": "color-charts-blue-1-300",
    "colorChartsBlue1400": "color-charts-blue-1-400",
    "colorChartsBlue1500": "color-charts-blue-1-500",
    "colorChartsBlue1600": "color-charts-blue-1-600",
    "colorChartsBlue1700": "color-charts-blue-1-700",
    "colorChartsBlue1800": "color-charts-blue-1-800",
    "colorChartsBlue1900": "color-charts-blue-1-900",
    "colorChartsBlue11000": "color-charts-blue-1-1000",
    "colorChartsBlue11100": "color-charts-blue-1-1100",
    "colorChartsBlue11200": "color-charts-blue-1-1200",
    "colorChartsBlue2300": "color-charts-blue-2-300",
    "colorChartsBlue2400": "color-charts-blue-2-400",
    "colorChartsBlue2500": "color-charts-blue-2-500",
    "colorChartsBlue2600": "color-charts-blue-2-600",
    "colorChartsBlue2700": "color-charts-blue-2-700",
    "colorChartsBlue2800": "color-charts-blue-2-800",
    "colorChartsBlue2900": "color-charts-blue-2-900",
    "colorChartsBlue21000": "color-charts-blue-2-1000",
    "colorChartsBlue21100": "color-charts-blue-2-1100",
    "colorChartsBlue21200": "color-charts-blue-2-1200",
    "colorChartsPurple300": "color-charts-purple-300",
    "colorChartsPurple400": "color-charts-purple-400",
    "colorChartsPurple500": "color-charts-purple-500",
    "colorChartsPurple600": "color-charts-purple-600",
    "colorChartsPurple700": "color-charts-purple-700",
    "colorChartsPurple800": "color-charts-purple-800",
    "colorChartsPurple900": "color-charts-purple-900",
    "colorChartsPurple1000": "color-charts-purple-1000",
    "colorChartsPurple1100": "color-charts-purple-1100",
    "colorChartsPurple1200": "color-charts-purple-1200",
    "colorChartsPink300": "color-charts-pink-300",
    "colorChartsPink400": "color-charts-pink-400",
    "colorChartsPink500": "color-charts-pink-500",
    "colorChartsPink600": "color-charts-pink-600",
    "colorChartsPink700": "color-charts-pink-700",
    "colorChartsPink800": "color-charts-pink-800",
    "colorChartsPink900": "color-charts-pink-900",
    "colorChartsPink1000": "color-charts-pink-1000",
    "colorChartsPink1100": "color-charts-pink-1100",
    "colorChartsPink1200": "color-charts-pink-1200",
    "colorChartsStatusCritical": "color-charts-status-critical",
    "colorChartsStatusHigh": "color-charts-status-high",
    "colorChartsStatusMedium": "color-charts-status-medium",
    "colorChartsStatusLow": "color-charts-status-low",
    "colorChartsStatusPositive": "color-charts-status-positive",
    "colorChartsStatusInfo": "color-charts-status-info",
    "colorChartsStatusNeutral": "color-charts-status-neutral",
    "colorChartsThresholdNegative": "color-charts-threshold-negative",
    "colorChartsThresholdPositive": "color-charts-threshold-positive",
    "colorChartsThresholdInfo": "color-charts-threshold-info",
    "colorChartsThresholdNeutral": "color-charts-threshold-neutral",
    "colorChartsLineGrid": "color-charts-line-grid",
    "colorChartsLineTick": "color-charts-line-tick",
    "colorChartsLineAxis": "color-charts-line-axis",
    "colorChartsPaletteCategorical1": "color-charts-palette-categorical-1",
    "colorChartsPaletteCategorical2": "color-charts-palette-categorical-2",
    "colorChartsPaletteCategorical3": "color-charts-palette-categorical-3",
    "colorChartsPaletteCategorical4": "color-charts-palette-categorical-4",
    "colorChartsPaletteCategorical5": "color-charts-palette-categorical-5",
    "colorChartsPaletteCategorical6": "color-charts-palette-categorical-6",
    "colorChartsPaletteCategorical7": "color-charts-palette-categorical-7",
    "colorChartsPaletteCategorical8": "color-charts-palette-categorical-8",
    "colorChartsPaletteCategorical9": "color-charts-palette-categorical-9",
    "colorChartsPaletteCategorical10": "color-charts-palette-categorical-10",
    "colorChartsPaletteCategorical11": "color-charts-palette-categorical-11",
    "colorChartsPaletteCategorical12": "color-charts-palette-categorical-12",
    "colorChartsPaletteCategorical13": "color-charts-palette-categorical-13",
    "colorChartsPaletteCategorical14": "color-charts-palette-categorical-14",
    "colorChartsPaletteCategorical15": "color-charts-palette-categorical-15",
    "colorChartsPaletteCategorical16": "color-charts-palette-categorical-16",
    "colorChartsPaletteCategorical17": "color-charts-palette-categorical-17",
    "colorChartsPaletteCategorical18": "color-charts-palette-categorical-18",
    "colorChartsPaletteCategorical19": "color-charts-palette-categorical-19",
    "colorChartsPaletteCategorical20": "color-charts-palette-categorical-20",
    "colorChartsPaletteCategorical21": "color-charts-palette-categorical-21",
    "colorChartsPaletteCategorical22": "color-charts-palette-categorical-22",
    "colorChartsPaletteCategorical23": "color-charts-palette-categorical-23",
    "colorChartsPaletteCategorical24": "color-charts-palette-categorical-24",
    "colorChartsPaletteCategorical25": "color-charts-palette-categorical-25",
    "colorChartsPaletteCategorical26": "color-charts-palette-categorical-26",
    "colorChartsPaletteCategorical27": "color-charts-palette-categorical-27",
    "colorChartsPaletteCategorical28": "color-charts-palette-categorical-28",
    "colorChartsPaletteCategorical29": "color-charts-palette-categorical-29",
    "colorChartsPaletteCategorical30": "color-charts-palette-categorical-30",
    "colorChartsPaletteCategorical31": "color-charts-palette-categorical-31",
    "colorChartsPaletteCategorical32": "color-charts-palette-categorical-32",
    "colorChartsPaletteCategorical33": "color-charts-palette-categorical-33",
    "colorChartsPaletteCategorical34": "color-charts-palette-categorical-34",
    "colorChartsPaletteCategorical35": "color-charts-palette-categorical-35",
    "colorChartsPaletteCategorical36": "color-charts-palette-categorical-36",
    "colorChartsPaletteCategorical37": "color-charts-palette-categorical-37",
    "colorChartsPaletteCategorical38": "color-charts-palette-categorical-38",
    "colorChartsPaletteCategorical39": "color-charts-palette-categorical-39",
    "colorChartsPaletteCategorical40": "color-charts-palette-categorical-40",
    "colorChartsPaletteCategorical41": "color-charts-palette-categorical-41",
    "colorChartsPaletteCategorical42": "color-charts-palette-categorical-42",
    "colorChartsPaletteCategorical43": "color-charts-palette-categorical-43",
    "colorChartsPaletteCategorical44": "color-charts-palette-categorical-44",
    "colorChartsPaletteCategorical45": "color-charts-palette-categorical-45",
    "colorChartsPaletteCategorical46": "color-charts-palette-categorical-46",
    "colorChartsPaletteCategorical47": "color-charts-palette-categorical-47",
    "colorChartsPaletteCategorical48": "color-charts-palette-categorical-48",
    "colorChartsPaletteCategorical49": "color-charts-palette-categorical-49",
    "colorChartsPaletteCategorical50": "color-charts-palette-categorical-50",
    "colorChartsErrorBarMarker": "color-charts-error-bar-marker",
    "colorSeverityDarkRed": "color-severity-dark-red",
    "colorSeverityRed": "color-severity-red",
    "colorSeverityOrange": "color-severity-orange",
    "colorSeverityYellow": "color-severity-yellow",
    "colorSeverityGrey": "color-severity-grey",
    "colorBackgroundNotificationSeverityCritical": "color-background-notification-severity-critical",
    "colorBackgroundNotificationSeverityHigh": "color-background-notification-severity-high",
    "colorBackgroundNotificationSeverityMedium": "color-background-notification-severity-medium",
    "colorBackgroundNotificationSeverityLow": "color-background-notification-severity-low",
    "colorBackgroundNotificationSeverityNeutral": "color-background-notification-severity-neutral",
    "colorTextNotificationSeverityCritical": "color-text-notification-severity-critical",
    "colorTextNotificationSeverityHigh": "color-text-notification-severity-high",
    "colorTextNotificationSeverityMedium": "color-text-notification-severity-medium",
    "colorTextNotificationSeverityLow": "color-text-notification-severity-low",
    "colorTextNotificationSeverityNeutral": "color-text-notification-severity-neutral",
    "colorGreyOpaque10": "color-grey-opaque-10",
    "colorGreyOpaque25": "color-grey-opaque-25",
    "colorGreyOpaque40": "color-grey-opaque-40",
    "colorGreyOpaque50": "color-grey-opaque-50",
    "colorGreyOpaque70": "color-grey-opaque-70",
    "colorGreyOpaque80": "color-grey-opaque-80",
    "colorGreyOpaque90": "color-grey-opaque-90",
    "colorGreyTransparent": "color-grey-transparent",
    "colorGreyTransparentHeavy": "color-grey-transparent-heavy",
    "colorGreyTransparentLight": "color-grey-transparent-light",
    "colorBackgroundBadgeIcon": "color-background-badge-icon",
    "colorBackgroundButtonLinkActive": "color-background-button-link-active",
    "colorBackgroundButtonLinkDefault": "color-background-button-link-default",
    "colorBackgroundButtonLinkDisabled": "color-background-button-link-disabled",
    "colorBackgroundButtonLinkHover": "color-background-button-link-hover",
    "colorBackgroundButtonNormalActive": "color-background-button-normal-active",
    "colorBackgroundButtonNormalDefault": "color-background-button-normal-default",
    "colorBackgroundButtonNormalDisabled": "color-background-button-normal-disabled",
    "colorBackgroundButtonNormalHover": "color-background-button-normal-hover",
    "colorBackgroundToggleButtonNormalPressed": "color-background-toggle-button-normal-pressed",
    "colorBackgroundToggleButtonNormalDefault": "color-background-toggle-button-normal-default",
    "colorBackgroundButtonPrimaryActive": "color-background-button-primary-active",
    "colorBackgroundButtonPrimaryDefault": "color-background-button-primary-default",
    "colorBackgroundButtonPrimaryDisabled": "color-background-button-primary-disabled",
    "colorBackgroundButtonPrimaryHover": "color-background-button-primary-hover",
    "colorBackgroundDirectionButtonActive": "color-background-direction-button-active",
    "colorBackgroundDirectionButtonDefault": "color-background-direction-button-default",
    "colorBackgroundDirectionButtonDisabled": "color-background-direction-button-disabled",
    "colorBackgroundDirectionButtonHover": "color-background-direction-button-hover",
    "colorTextDirectionButtonDefault": "color-text-direction-button-default",
    "colorTextDirectionButtonDisabled": "color-text-direction-button-disabled",
    "colorBackgroundCalendarCurrentDate": "color-background-calendar-current-date",
    "colorBackgroundCellShaded": "color-background-cell-shaded",
    "colorBackgroundCodeEditorGutterActiveLineDefault": "color-background-code-editor-gutter-active-line-default",
    "colorBackgroundCodeEditorGutterActiveLineError": "color-background-code-editor-gutter-active-line-error",
    "colorBackgroundCodeEditorGutterDefault": "color-background-code-editor-gutter-default",
    "colorBackgroundCodeEditorLoading": "color-background-code-editor-loading",
    "colorBackgroundCodeEditorPaneItemHover": "color-background-code-editor-pane-item-hover",
    "colorBackgroundCodeEditorStatusBar": "color-background-code-editor-status-bar",
    "colorBackgroundCard": "color-background-card",
    "colorBackgroundItemCard": "color-background-item-card",
    "colorBackgroundContainerContent": "color-background-container-content",
    "colorBackgroundContainerHeader": "color-background-container-header",
    "colorBackgroundControlChecked": "color-background-control-checked",
    "colorBackgroundControlDefault": "color-background-control-default",
    "colorBackgroundControlDisabled": "color-background-control-disabled",
    "colorBackgroundDropdownItemDefault": "color-background-dropdown-item-default",
    "colorBackgroundDropdownItemDimmed": "color-background-dropdown-item-dimmed",
    "colorBackgroundDropdownItemFilterMatch": "color-background-dropdown-item-filter-match",
    "colorBackgroundDropdownItemHover": "color-background-dropdown-item-hover",
    "colorBackgroundDropdownItemSelected": "color-background-dropdown-item-selected",
    "colorBackgroundHomeHeader": "color-background-home-header",
    "colorBackgroundInlineCode": "color-background-inline-code",
    "colorBackgroundInputDefault": "color-background-input-default",
    "colorBackgroundInputDisabled": "color-background-input-disabled",
    "colorBackgroundItemSelected": "color-background-item-selected",
    "colorBackgroundLayoutMain": "color-background-layout-main",
    "colorBackgroundDrawer": "color-background-drawer",
    "colorBackgroundDrawerBackdrop": "color-background-drawer-backdrop",
    "colorBackgroundLayoutMobilePanel": "color-background-layout-mobile-panel",
    "colorBackgroundLayoutPanelContent": "color-background-layout-panel-content",
    "colorBackgroundLayoutPanelHover": "color-background-layout-panel-hover",
    "colorBackgroundLayoutToolbar": "color-background-layout-toolbar",
    "colorBackgroundLayoutToggleActive": "color-background-layout-toggle-active",
    "colorBackgroundLayoutToggleDefault": "color-background-layout-toggle-default",
    "colorBackgroundLayoutToggleHover": "color-background-layout-toggle-hover",
    "colorBackgroundLayoutToggleSelectedActive": "color-background-layout-toggle-selected-active",
    "colorBackgroundLayoutToggleSelectedDefault": "color-background-layout-toggle-selected-default",
    "colorBackgroundLayoutToggleSelectedHover": "color-background-layout-toggle-selected-hover",
    "colorBackgroundModalOverlay": "color-background-modal-overlay",
    "colorBackgroundNotificationBlue": "color-background-notification-blue",
    "colorBackgroundNotificationGreen": "color-background-notification-green",
    "colorBackgroundNotificationGrey": "color-background-notification-grey",
    "colorBackgroundNotificationRed": "color-background-notification-red",
    "colorBackgroundNotificationYellow": "color-background-notification-yellow",
    "colorBackgroundNotificationStackBar": "color-background-notification-stack-bar",
    "colorBackgroundNotificationStackBarActive": "color-background-notification-stack-bar-active",
    "colorBackgroundNotificationStackBarHover": "color-background-notification-stack-bar-hover",
    "colorBackgroundPopover": "color-background-popover",
    "colorBackgroundProgressBarValueDefault": "color-background-progress-bar-value-default",
    "colorBackgroundProgressBarDefault": "color-background-progress-bar-default",
    "colorBackgroundSegmentActive": "color-background-segment-active",
    "colorBackgroundSegmentDefault": "color-background-segment-default",
    "colorBackgroundSegmentDisabled": "color-background-segment-disabled",
    "colorBackgroundSegmentHover": "color-background-segment-hover",
    "colorBackgroundSegmentWrapper": "color-background-segment-wrapper",
    "colorBackgroundSliderRangeDefault": "color-background-slider-range-default",
    "colorBackgroundSliderRangeActive": "color-background-slider-range-active",
    "colorBackgroundSliderHandleDefault": "color-background-slider-handle-default",
    "colorBackgroundSliderHandleActive": "color-background-slider-handle-active",
    "colorBackgroundSliderTrackDefault": "color-background-slider-track-default",
    "colorBackgroundSliderHandleRing": "color-background-slider-handle-ring",
    "colorBackgroundSliderHandleErrorDefault": "color-background-slider-handle-error-default",
    "colorBackgroundSliderHandleErrorActive": "color-background-slider-handle-error-active",
    "colorBackgroundSliderHandleWarningDefault": "color-background-slider-handle-warning-default",
    "colorBackgroundSliderHandleWarningActive": "color-background-slider-handle-warning-active",
    "colorBackgroundSliderRangeErrorDefault": "color-background-slider-range-error-default",
    "colorBackgroundSliderRangeErrorActive": "color-background-slider-range-error-active",
    "colorBackgroundSliderRangeWarningDefault": "color-background-slider-range-warning-default",
    "colorBackgroundSliderRangeWarningActive": "color-background-slider-range-warning-active",
    "colorBackgroundStatusError": "color-background-status-error",
    "colorBackgroundStatusInfo": "color-background-status-info",
    "colorBackgroundDialog": "color-background-dialog",
    "colorBackgroundStatusSuccess": "color-background-status-success",
    "colorBackgroundStatusWarning": "color-background-status-warning",
    "colorBackgroundTableHeader": "color-background-table-header",
    "colorBackgroundTilesDisabled": "color-background-tiles-disabled",
    "colorBackgroundToggleCheckedDisabled": "color-background-toggle-checked-disabled",
    "colorBackgroundToggleDefault": "color-background-toggle-default",
    "colorBackgroundAvatarGenAi": "color-background-avatar-gen-ai",
    "colorBackgroundAvatarDefault": "color-background-avatar-default",
    "colorTextAvatar": "color-text-avatar",
    "colorBackgroundLoadingBarGenAi": "color-background-loading-bar-gen-ai",
    "colorBackgroundStatusIndicatorError": "color-background-status-indicator-error",
    "colorBackgroundStatusIndicatorWarning": "color-background-status-indicator-warning",
    "colorBackgroundStatusIndicatorSuccess": "color-background-status-indicator-success",
    "colorBackgroundStatusIndicatorInfo": "color-background-status-indicator-info",
    "colorBackgroundStatusIndicatorNeutral": "color-background-status-indicator-neutral",
    "colorBackgroundChatBubbleOutgoing": "color-background-chat-bubble-outgoing",
    "colorBackgroundChatBubbleIncoming": "color-background-chat-bubble-incoming",
    "colorTextChatBubbleOutgoing": "color-text-chat-bubble-outgoing",
    "colorTextChatBubbleIncoming": "color-text-chat-bubble-incoming",
    "colorBorderButtonLinkDisabled": "color-border-button-link-disabled",
    "colorBorderButtonNormalActive": "color-border-button-normal-active",
    "colorBorderButtonNormalDefault": "color-border-button-normal-default",
    "colorBorderToggleButtonNormalPressed": "color-border-toggle-button-normal-pressed",
    "colorBorderButtonNormalDisabled": "color-border-button-normal-disabled",
    "colorTextButtonNormalDisabled": "color-text-button-normal-disabled",
    "colorBorderButtonNormalHover": "color-border-button-normal-hover",
    "colorTextButtonIconDisabled": "color-text-button-icon-disabled",
    "colorBorderButtonPrimaryActive": "color-border-button-primary-active",
    "colorBorderButtonPrimaryDefault": "color-border-button-primary-default",
    "colorBorderButtonPrimaryDisabled": "color-border-button-primary-disabled",
    "colorBorderButtonPrimaryHover": "color-border-button-primary-hover",
    "colorTextButtonPrimaryDisabled": "color-text-button-primary-disabled",
    "colorItemSelected": "color-item-selected",
    "colorBorderCalendarGrid": "color-border-calendar-grid",
    "colorBorderCalendarGridSelectedFocusRing": "color-border-calendar-grid-selected-focus-ring",
    "colorBorderCellShaded": "color-border-cell-shaded",
    "colorBorderCodeEditorAceActiveLineLightTheme": "color-border-code-editor-ace-active-line-light-theme",
    "colorBorderCodeEditorAceActiveLineDarkTheme": "color-border-code-editor-ace-active-line-dark-theme",
    "colorBorderCodeEditorDefault": "color-border-code-editor-default",
    "colorBorderCodeEditorPaneItemHover": "color-border-code-editor-pane-item-hover",
    "colorBorderCard": "color-border-card",
    "colorBorderCardHighlighted": "color-border-card-highlighted",
    "colorBorderItemCard": "color-border-item-card",
    "colorBorderItemCardHighlighted": "color-border-item-card-highlighted",
    "colorBorderContainerDivider": "color-border-container-divider",
    "colorBorderContainerTop": "color-border-container-top",
    "colorBorderControlChecked": "color-border-control-checked",
    "colorBorderControlDefault": "color-border-control-default",
    "colorBorderControlDisabled": "color-border-control-disabled",
    "colorBorderDividerActive": "color-border-divider-active",
    "colorBorderDividerDefault": "color-border-divider-default",
    "colorBorderDividerPanelBottom": "color-border-divider-panel-bottom",
    "colorBorderDividerPanelSide": "color-border-divider-panel-side",
    "colorBorderDividerSecondary": "color-border-divider-secondary",
    "colorBorderDropdownContainer": "color-border-dropdown-container",
    "colorBorderDropdownGroup": "color-border-dropdown-group",
    "colorBorderDropdownItemDefault": "color-border-dropdown-item-default",
    "colorBorderDropdownItemHover": "color-border-dropdown-item-hover",
    "colorBorderDropdownItemDimmedHover": "color-border-dropdown-item-dimmed-hover",
    "colorBorderDropdownItemSelected": "color-border-dropdown-item-selected",
    "colorBorderDropdownItemTop": "color-border-dropdown-item-top",
    "colorBorderEditableCellHover": "color-border-editable-cell-hover",
    "colorBorderInputDefault": "color-border-input-default",
    "colorBorderInputDisabled": "color-border-input-disabled",
    "colorBorderInputFocused": "color-border-input-focused",
    "colorBorderItemFocused": "color-border-item-focused",
    "colorBorderDropdownItemFocused": "color-border-dropdown-item-focused",
    "colorBorderItemPlaceholder": "color-border-item-placeholder",
    "colorBorderItemSelected": "color-border-item-selected",
    "colorBorderLayout": "color-border-layout",
    "colorBorderNotificationStackBar": "color-border-notification-stack-bar",
    "colorBorderPanelHeader": "color-border-panel-header",
    "colorBorderPopover": "color-border-popover",
    "colorBorderSegmentActive": "color-border-segment-active",
    "colorBorderSegmentDefault": "color-border-segment-default",
    "colorBorderSegmentDisabled": "color-border-segment-disabled",
    "colorBorderSegmentHover": "color-border-segment-hover",
    "colorBorderStatusError": "color-border-status-error",
    "colorBorderStatusInfo": "color-border-status-info",
    "colorBorderStatusSuccess": "color-border-status-success",
    "colorBorderStatusWarning": "color-border-status-warning",
    "colorBorderDialog": "color-border-dialog",
    "colorBorderDividerInteractiveDefault": "color-border-divider-interactive-default",
    "colorBorderTabsDivider": "color-border-tabs-divider",
    "colorBorderTabsShadow": "color-border-tabs-shadow",
    "colorBorderTabsUnderline": "color-border-tabs-underline",
    "colorBorderTilesDisabled": "color-border-tiles-disabled",
    "colorBorderTutorial": "color-border-tutorial",
    "colorForegroundControlDefault": "color-foreground-control-default",
    "colorForegroundControlDisabled": "color-foreground-control-disabled",
    "colorForegroundControlReadOnly": "color-foreground-control-read-only",
    "colorShadowDefault": "color-shadow-default",
    "colorShadowMedium": "color-shadow-medium",
    "colorShadowSide": "color-shadow-side",
    "colorStrokeChartLine": "color-stroke-chart-line",
    "colorStrokeCodeEditorGutterActiveLineDefault": "color-stroke-code-editor-gutter-active-line-default",
    "colorStrokeCodeEditorGutterActiveLineHover": "color-stroke-code-editor-gutter-active-line-hover",
    "colorTextAccent": "color-text-accent",
    "colorTextBodyDefault": "color-text-body-default",
    "colorTextBodySecondary": "color-text-body-secondary",
    "colorTextBreadcrumbCurrent": "color-text-breadcrumb-current",
    "colorTextBreadcrumbIcon": "color-text-breadcrumb-icon",
    "colorTextButtonInlineIconDefault": "color-text-button-inline-icon-default",
    "colorTextButtonInlineIconDisabled": "color-text-button-inline-icon-disabled",
    "colorTextButtonInlineIconHover": "color-text-button-inline-icon-hover",
    "colorTextButtonNormalActive": "color-text-button-normal-active",
    "colorTextToggleButtonNormalPressed": "color-text-toggle-button-normal-pressed",
    "colorTextButtonNormalDefault": "color-text-button-normal-default",
    "colorTextButtonNormalHover": "color-text-button-normal-hover",
    "colorTextLinkButtonNormalDefault": "color-text-link-button-normal-default",
    "colorTextLinkButtonNormalHover": "color-text-link-button-normal-hover",
    "colorTextLinkButtonNormalActive": "color-text-link-button-normal-active",
    "colorTextButtonLinkActive": "color-text-button-link-active",
    "colorTextButtonLinkDefault": "color-text-button-link-default",
    "colorTextButtonLinkDisabled": "color-text-button-link-disabled",
    "colorTextButtonLinkHover": "color-text-button-link-hover",
    "colorTextButtonPrimaryActive": "color-text-button-primary-active",
    "colorTextButtonPrimaryDefault": "color-text-button-primary-default",
    "colorTextButtonPrimaryHover": "color-text-button-primary-hover",
    "colorTextCalendarDateHover": "color-text-calendar-date-hover",
    "colorTextCalendarDateSelected": "color-text-calendar-date-selected",
    "colorTextCalendarMonth": "color-text-calendar-month",
    "colorTextCodeEditorGutterActiveLine": "color-text-code-editor-gutter-active-line",
    "colorTextCodeEditorGutterDefault": "color-text-code-editor-gutter-default",
    "colorTextCodeEditorStatusBarDisabled": "color-text-code-editor-status-bar-disabled",
    "colorTextCodeEditorTabButtonError": "color-text-code-editor-tab-button-error",
    "colorTextColumnHeader": "color-text-column-header",
    "colorTextColumnSortingIcon": "color-text-column-sorting-icon",
    "colorTextControlDisabled": "color-text-control-disabled",
    "colorTextCounter": "color-text-counter",
    "colorTextDisabled": "color-text-disabled",
    "colorTextDisabledInlineEdit": "color-text-disabled-inline-edit",
    "colorTextDropdownFooter": "color-text-dropdown-footer",
    "colorTextDropdownGroupLabel": "color-text-dropdown-group-label",
    "colorTextDropdownItemDefault": "color-text-dropdown-item-default",
    "colorTextDropdownItemDimmed": "color-text-dropdown-item-dimmed",
    "colorTextDropdownItemDisabled": "color-text-dropdown-item-disabled",
    "colorTextDropdownItemFilterMatch": "color-text-dropdown-item-filter-match",
    "colorTextDropdownItemHighlighted": "color-text-dropdown-item-highlighted",
    "colorTextDropdownItemSecondary": "color-text-dropdown-item-secondary",
    "colorTextDropdownItemSecondaryHover": "color-text-dropdown-item-secondary-hover",
    "colorTextEmpty": "color-text-empty",
    "colorTextExpandableSectionDefault": "color-text-expandable-section-default",
    "colorTextExpandableSectionHover": "color-text-expandable-section-hover",
    "colorTextExpandableSectionNavigationIconDefault": "color-text-expandable-section-navigation-icon-default",
    "colorTextFormDefault": "color-text-form-default",
    "colorTextFormLabel": "color-text-form-label",
    "colorTextFormSecondary": "color-text-form-secondary",
    "colorTextGroupLabel": "color-text-group-label",
    "colorTextLabelGenAi": "color-text-label-gen-ai",
    "colorTextHeadingDefault": "color-text-heading-default",
    "colorTextHeadingSecondary": "color-text-heading-secondary",
    "colorTextHomeHeaderDefault": "color-text-home-header-default",
    "colorTextHomeHeaderSecondary": "color-text-home-header-secondary",
    "colorTextIconCaret": "color-text-icon-caret",
    "colorTextIconSubtle": "color-text-icon-subtle",
    "colorTextInputDisabled": "color-text-input-disabled",
    "colorTextInputPlaceholder": "color-text-input-placeholder",
    "colorTextInputPlaceholderDisabled": "color-text-input-placeholder-disabled",
    "colorTextInteractiveActive": "color-text-interactive-active",
    "colorTextInteractiveDefault": "color-text-interactive-default",
    "colorTextInteractiveDisabled": "color-text-interactive-disabled",
    "colorTextInteractiveHover": "color-text-interactive-hover",
    "colorTextToggleButtonIconPressed": "color-text-toggle-button-icon-pressed",
    "colorTextInteractiveInvertedDefault": "color-text-interactive-inverted-default",
    "colorTextInteractiveInvertedHover": "color-text-interactive-inverted-hover",
    "colorTextInverted": "color-text-inverted",
    "colorTextLabel": "color-text-label",
    "colorTextKeyValuePairsValue": "color-text-key-value-pairs-value",
    "colorTextLayoutToggle": "color-text-layout-toggle",
    "colorTextLayoutToggleActive": "color-text-layout-toggle-active",
    "colorTextLayoutToggleHover": "color-text-layout-toggle-hover",
    "colorTextLayoutToggleSelected": "color-text-layout-toggle-selected",
    "colorTextLinkDefault": "color-text-link-default",
    "colorTextLinkHover": "color-text-link-hover",
    "colorTextLinkDecorationDefault": "color-text-link-decoration-default",
    "colorTextLinkDecorationHover": "color-text-link-decoration-hover",
    "colorTextLinkSecondaryDefault": "color-text-link-secondary-default",
    "colorTextLinkSecondaryHover": "color-text-link-secondary-hover",
    "colorTextLinkInfoDefault": "color-text-link-info-default",
    "colorTextLinkInfoHover": "color-text-link-info-hover",
    "colorTextLinkInvertedHover": "color-text-link-inverted-hover",
    "colorTextLinkButtonUnderline": "color-text-link-button-underline",
    "colorTextLinkButtonUnderlineHover": "color-text-link-button-underline-hover",
    "colorTextNotificationDefault": "color-text-notification-default",
    "colorTextNotificationStackBar": "color-text-notification-stack-bar",
    "colorTextNotificationYellow": "color-text-notification-yellow",
    "colorTextPaginationPageNumberActiveDisabled": "color-text-pagination-page-number-active-disabled",
    "colorTextPaginationPageNumberDefault": "color-text-pagination-page-number-default",
    "colorTextSegmentActive": "color-text-segment-active",
    "colorTextSegmentDefault": "color-text-segment-default",
    "colorTextSegmentHover": "color-text-segment-hover",
    "colorTextSmall": "color-text-small",
    "colorTextStatusError": "color-text-status-error",
    "colorTextStatusInactive": "color-text-status-inactive",
    "colorTextStatusInfo": "color-text-status-info",
    "colorTextStatusSuccess": "color-text-status-success",
    "colorTextStatusWarning": "color-text-status-warning",
    "colorTextTopNavigationTitle": "color-text-top-navigation-title",
    "colorTextTutorialHotspotDefault": "color-text-tutorial-hotspot-default",
    "colorTextTutorialHotspotHover": "color-text-tutorial-hotspot-hover",
    "colorBoardPlaceholderActive": "color-board-placeholder-active",
    "colorBoardPlaceholderHover": "color-board-placeholder-hover",
    "colorDragPlaceholderActive": "color-drag-placeholder-active",
    "colorDragPlaceholderHover": "color-drag-placeholder-hover",
    "colorDropzoneBackgroundDefault": "color-dropzone-background-default",
    "colorDropzoneBackgroundHover": "color-dropzone-background-hover",
    "colorDropzoneTextDefault": "color-dropzone-text-default",
    "colorDropzoneTextHover": "color-dropzone-text-hover",
    "colorDropzoneBorderDefault": "color-dropzone-border-default",
    "colorDropzoneBorderHover": "color-dropzone-border-hover",
    "colorGapGlobalDrawer": "color-gap-global-drawer",
    "colorTreeViewConnectorLine": "color-tree-view-connector-line",
    "colorBackgroundActionCardDefault": "color-background-action-card-default",
    "colorBackgroundActionCardHover": "color-background-action-card-hover",
    "colorBackgroundActionCardActive": "color-background-action-card-active",
    "colorBorderActionCardDefault": "color-border-action-card-default",
    "colorBorderActionCardHover": "color-border-action-card-hover",
    "colorBorderActionCardActive": "color-border-action-card-active",
    "colorBorderActionCardDisabled": "color-border-action-card-disabled",
    "colorBackgroundActionCardDisabled": "color-background-action-card-disabled",
    "colorTextActionCardDisabled": "color-text-action-card-disabled",
    "colorIconActionCardDefault": "color-icon-action-card-default",
    "colorIconActionCardHover": "color-icon-action-card-hover",
    "colorIconActionCardActive": "color-icon-action-card-active",
    "colorIconActionCardDisabled": "color-icon-action-card-disabled",
    "colorBackgroundSkeleton": "color-background-skeleton",
    "colorBackgroundSkeletonWave": "color-background-skeleton-wave",
    "fontBoxValueLargeWeight": "font-box-value-large-weight",
    "fontButtonLetterSpacing": "font-button-letter-spacing",
    "fontChartDetailSize": "font-chart-detail-size",
    "fontDecorationStyleLink": "font-decoration-style-link",
    "fontDecorationThicknessLink": "font-decoration-thickness-link",
    "fontDecorationThicknessLinkDisplayL": "font-decoration-thickness-link-display-l",
    "fontDisplayLabelWeight": "font-display-label-weight",
    "fontExpandableHeadingSize": "font-expandable-heading-size",
    "fontFamilyBase": "font-family-base",
    "fontFamilyDisplay": "font-family-display",
    "fontFamilyHeading": "font-family-heading",
    "fontFamilyMonospace": "font-family-monospace",
    "fontHeaderH2DescriptionLineHeight": "font-header-h2-description-line-height",
    "fontHeaderH2DescriptionSize": "font-header-h2-description-size",
    "fontLinkButtonLetterSpacing": "font-link-button-letter-spacing",
    "fontLinkButtonWeight": "font-link-button-weight",
    "fontPanelHeaderLineHeight": "font-panel-header-line-height",
    "fontPanelHeaderSize": "font-panel-header-size",
    "fontSizeBodyM": "font-size-body-m",
    "fontSizeBodyS": "font-size-body-s",
    "fontSizeDisplayL": "font-size-display-l",
    "fontSizeFormLabel": "font-size-form-label",
    "fontSizeHeadingL": "font-size-heading-l",
    "fontSizeHeadingM": "font-size-heading-m",
    "fontSizeHeadingS": "font-size-heading-s",
    "fontSizeHeadingXl": "font-size-heading-xl",
    "fontSizeHeadingXs": "font-size-heading-xs",
    "fontSizeKeyValuePairsLabel": "font-size-key-value-pairs-label",
    "fontSizeTabs": "font-size-tabs",
    "fontSmoothingMozOsx": "font-smoothing-moz-osx",
    "fontSmoothingWebkit": "font-smoothing-webkit",
    "fontWayfindingLinkActiveWeight": "font-wayfinding-link-active-weight",
    "fontWeightAlertHeader": "font-weight-alert-header",
    "fontWeightBold": "font-weight-bold",
    "fontWeightBreadcrumbCurrent": "font-weight-breadcrumb-current",
    "fontWeightButton": "font-weight-button",
    "fontWeightDisplayL": "font-weight-display-l",
    "fontWeightFlashbarHeader": "font-weight-flashbar-header",
    "fontWeightFormLabel": "font-weight-form-label",
    "fontWeightHeadingL": "font-weight-heading-l",
    "fontWeightHeadingM": "font-weight-heading-m",
    "fontWeightHeadingS": "font-weight-heading-s",
    "fontWeightHeadingXl": "font-weight-heading-xl",
    "fontWeightHeadingXs": "font-weight-heading-xs",
    "fontWeightHeavy": "font-weight-heavy",
    "fontWeightKeyValuePairsLabel": "font-weight-key-value-pairs-label",
    "fontWeightLighter": "font-weight-lighter",
    "fontWeightNormal": "font-weight-normal",
    "fontWeightTabs": "font-weight-tabs",
    "fontWeightTabsDisabled": "font-weight-tabs-disabled",
    "letterSpacingBodyS": "letter-spacing-body-s",
    "letterSpacingDisplayL": "letter-spacing-display-l",
    "letterSpacingHeadingL": "letter-spacing-heading-l",
    "letterSpacingHeadingM": "letter-spacing-heading-m",
    "letterSpacingHeadingS": "letter-spacing-heading-s",
    "letterSpacingHeadingXl": "letter-spacing-heading-xl",
    "letterSpacingHeadingXs": "letter-spacing-heading-xs",
    "lineHeightBodyM": "line-height-body-m",
    "lineHeightBodyS": "line-height-body-s",
    "lineHeightDisplayL": "line-height-display-l",
    "lineHeightFormLabel": "line-height-form-label",
    "lineHeightHeadingL": "line-height-heading-l",
    "lineHeightHeadingM": "line-height-heading-m",
    "lineHeightHeadingS": "line-height-heading-s",
    "lineHeightHeadingXl": "line-height-heading-xl",
    "lineHeightHeadingXs": "line-height-heading-xs",
    "lineHeightKeyValuePairsLabel": "line-height-key-value-pairs-label",
    "lineHeightTabs": "line-height-tabs",
    "borderActiveWidth": "border-active-width",
    "borderCodeEditorStatusDividerWidth": "border-code-editor-status-divider-width",
    "borderContainerStickyWidth": "border-container-sticky-width",
    "borderContainerTopWidth": "border-container-top-width",
    "borderControlFocusRingShadowSpread": "border-control-focus-ring-shadow-spread",
    "borderControlInvalidFocusRingShadowSpread": "border-control-invalid-focus-ring-shadow-spread",
    "borderDividerListWidth": "border-divider-list-width",
    "borderDividerSectionWidth": "border-divider-section-width",
    "borderDropdownVirtualOffsetWidth": "border-dropdown-virtual-offset-width",
    "borderInvalidWidth": "border-invalid-width",
    "borderItemWidth": "border-item-width",
    "borderLineChartDashArray": "border-line-chart-dash-array",
    "borderLineChartLineJoin": "border-line-chart-line-join",
    "borderLineChartWidth": "border-line-chart-width",
    "borderLinkFocusRingOutline": "border-link-focus-ring-outline",
    "borderLinkFocusRingShadowSpread": "border-link-focus-ring-shadow-spread",
    "borderPanelHeaderWidth": "border-panel-header-width",
    "borderPanelTopWidth": "border-panel-top-width",
    "borderRadiusActionCardDefault": "border-radius-action-card-default",
    "borderRadiusActionCardEmbedded": "border-radius-action-card-embedded",
    "borderRadiusAlert": "border-radius-alert",
    "borderRadiusBadge": "border-radius-badge",
    "borderRadiusButton": "border-radius-button",
    "borderRadiusCalendarDayFocusRing": "border-radius-calendar-day-focus-ring",
    "borderRadiusCardDefault": "border-radius-card-default",
    "borderRadiusCardEmbedded": "border-radius-card-embedded",
    "borderRadiusChatBubble": "border-radius-chat-bubble",
    "borderRadiusCodeEditor": "border-radius-code-editor",
    "borderRadiusContainer": "border-radius-container",
    "borderRadiusControlCircularFocusRing": "border-radius-control-circular-focus-ring",
    "borderRadiusControlDefaultFocusRing": "border-radius-control-default-focus-ring",
    "borderRadiusDropdown": "border-radius-dropdown",
    "borderRadiusDropzone": "border-radius-dropzone",
    "borderRadiusFlashbar": "border-radius-flashbar",
    "borderRadiusInput": "border-radius-input",
    "borderRadiusItem": "border-radius-item",
    "borderRadiusItemCardDefault": "border-radius-item-card-default",
    "borderRadiusItemCardEmbedded": "border-radius-item-card-embedded",
    "borderRadiusPopover": "border-radius-popover",
    "borderRadiusSkeleton": "border-radius-skeleton",
    "borderRadiusStatusIndicator": "border-radius-status-indicator",
    "borderRadiusTabsFocusRing": "border-radius-tabs-focus-ring",
    "borderRadiusTiles": "border-radius-tiles",
    "borderRadiusToken": "border-radius-token",
    "borderRadiusTutorialPanelItem": "border-radius-tutorial-panel-item",
    "borderTableStickyWidth": "border-table-sticky-width",
    "borderWidthActionCardActive": "border-width-action-card-active",
    "borderWidthActionCardDefault": "border-width-action-card-default",
    "borderWidthActionCardDisabled": "border-width-action-card-disabled",
    "borderWidthActionCardHover": "border-width-action-card-hover",
    "borderWidthAlert": "border-width-alert",
    "borderWidthAlertBlockEnd": "border-width-alert-block-end",
    "borderWidthAlertBlockStart": "border-width-alert-block-start",
    "borderWidthAlertInlineEnd": "border-width-alert-inline-end",
    "borderWidthAlertInlineStart": "border-width-alert-inline-start",
    "borderWidthButton": "border-width-button",
    "borderWidthCard": "border-width-card",
    "borderWidthCardSelected": "border-width-card-selected",
    "borderWidthDropdown": "border-width-dropdown",
    "borderWidthField": "border-width-field",
    "borderWidthIconBig": "border-width-icon-big",
    "borderWidthIconLarge": "border-width-icon-large",
    "borderWidthIconMedium": "border-width-icon-medium",
    "borderWidthIconNormal": "border-width-icon-normal",
    "borderWidthIconSmall": "border-width-icon-small",
    "borderWidthItemCard": "border-width-item-card",
    "borderWidthItemCardHighlighted": "border-width-item-card-highlighted",
    "borderWidthItemSelected": "border-width-item-selected",
    "borderWidthPopover": "border-width-popover",
    "borderWidthToken": "border-width-token",
    "motionDurationExtraFast": "motion-duration-extra-fast",
    "motionDurationExtraSlow": "motion-duration-extra-slow",
    "motionDurationFast": "motion-duration-fast",
    "motionDurationModerate": "motion-duration-moderate",
    "motionDurationRefreshOnlyAmbient": "motion-duration-refresh-only-ambient",
    "motionDurationRefreshOnlyFast": "motion-duration-refresh-only-fast",
    "motionDurationRefreshOnlyMedium": "motion-duration-refresh-only-medium",
    "motionDurationRefreshOnlySlow": "motion-duration-refresh-only-slow",
    "motionDurationAvatarGenAiGradient": "motion-duration-avatar-gen-ai-gradient",
    "motionDurationAvatarLoadingDots": "motion-duration-avatar-loading-dots",
    "motionDurationRotate180": "motion-duration-rotate-180",
    "motionDurationRotate90": "motion-duration-rotate-90",
    "motionDurationShowPaced": "motion-duration-show-paced",
    "motionDurationShowQuick": "motion-duration-show-quick",
    "motionDurationSlow": "motion-duration-slow",
    "motionDurationTransitionQuick": "motion-duration-transition-quick",
    "motionDurationTransitionShowPaced": "motion-duration-transition-show-paced",
    "motionDurationTransitionShowQuick": "motion-duration-transition-show-quick",
    "motionEasingEaseOutQuart": "motion-easing-ease-out-quart",
    "motionEasingRefreshOnlyA": "motion-easing-refresh-only-a",
    "motionEasingRefreshOnlyB": "motion-easing-refresh-only-b",
    "motionEasingRefreshOnlyC": "motion-easing-refresh-only-c",
    "motionEasingRefreshOnlyD": "motion-easing-refresh-only-d",
    "motionEasingAvatarGenAiGradient": "motion-easing-avatar-gen-ai-gradient",
    "motionEasingRotate180": "motion-easing-rotate-180",
    "motionEasingRotate90": "motion-easing-rotate-90",
    "motionEasingShowPaced": "motion-easing-show-paced",
    "motionEasingShowQuick": "motion-easing-show-quick",
    "motionEasingTransitionQuick": "motion-easing-transition-quick",
    "motionEasingTransitionShowPaced": "motion-easing-transition-show-paced",
    "motionEasingTransitionShowQuick": "motion-easing-transition-show-quick",
    "motionEasingResponsive": "motion-easing-responsive",
    "motionEasingSticky": "motion-easing-sticky",
    "motionEasingExpressive": "motion-easing-expressive",
    "motionDurationResponsive": "motion-duration-responsive",
    "motionDurationExpressive": "motion-duration-expressive",
    "motionDurationComplex": "motion-duration-complex",
    "motionKeyframesFadeIn": "motion-keyframes-fade-in",
    "motionKeyframesFadeOut": "motion-keyframes-fade-out",
    "motionKeyframesStatusIconError": "motion-keyframes-status-icon-error",
    "motionKeyframesScalePopup": "motion-keyframes-scale-popup",
    "sizeCalendarGridWidth": "size-calendar-grid-width",
    "sizeControl": "size-control",
    "sizeIconBig": "size-icon-big",
    "sizeIconLarge": "size-icon-large",
    "sizeIconMedium": "size-icon-medium",
    "sizeIconNormal": "size-icon-normal",
    "sizeTableSelectionHorizontal": "size-table-selection-horizontal",
    "sizeVerticalInput": "size-vertical-input",
    "sizeVerticalPanelIconOffset": "size-vertical-panel-icon-offset",
    "spaceAlertActionLeft": "space-alert-action-left",
    "spaceAlertHorizontal": "space-alert-horizontal",
    "spaceAlertMessageRight": "space-alert-message-right",
    "spaceAlertVertical": "space-alert-vertical",
    "spaceButtonFocusOutlineGutter": "space-button-focus-outline-gutter",
    "spaceButtonHorizontal": "space-button-horizontal",
    "spaceButtonVertical": "space-button-vertical",
    "spaceTokenVertical": "space-token-vertical",
    "spaceFieldVertical": "space-field-vertical",
    "spaceButtonIconFocusOutlineGutterVertical": "space-button-icon-focus-outline-gutter-vertical",
    "spaceButtonIconOnlyHorizontal": "space-button-icon-only-horizontal",
    "spaceButtonInlineIconFocusOutlineGutter": "space-button-inline-icon-focus-outline-gutter",
    "spaceButtonModalDismissVertical": "space-button-modal-dismiss-vertical",
    "spaceCalendarGridFocusOutlineGutter": "space-calendar-grid-focus-outline-gutter",
    "spaceCalendarGridSelectedFocusOutlineGutter": "space-calendar-grid-selected-focus-outline-gutter",
    "spaceCalendarGridGutter": "space-calendar-grid-gutter",
    "spaceCardHorizontalDefault": "space-card-horizontal-default",
    "spaceCardHorizontalEmbedded": "space-card-horizontal-embedded",
    "spaceCardVerticalDefault": "space-card-vertical-default",
    "spaceCardVerticalEmbedded": "space-card-vertical-embedded",
    "spaceItemCardHorizontalDefault": "space-item-card-horizontal-default",
    "spaceItemCardHorizontalEmbedded": "space-item-card-horizontal-embedded",
    "spaceItemCardVerticalDefault": "space-item-card-vertical-default",
    "spaceItemCardVerticalEmbedded": "space-item-card-vertical-embedded",
    "spaceCodeEditorStatusFocusOutlineGutter": "space-code-editor-status-focus-outline-gutter",
    "spaceContainerContentTop": "space-container-content-top",
    "spaceContainerHeaderTop": "space-container-header-top",
    "spaceContainerHeaderBottom": "space-container-header-bottom",
    "spaceContainerHorizontal": "space-container-horizontal",
    "spaceContentHeaderPaddingBottom": "space-content-header-padding-bottom",
    "spaceDarkHeaderOverlapDistance": "space-dark-header-overlap-distance",
    "spaceExpandableSectionIconOffsetTop": "space-expandable-section-icon-offset-top",
    "spaceFieldHorizontal": "space-field-horizontal",
    "spaceFieldIconOffset": "space-field-icon-offset",
    "spaceFilteringTokenDismissButtonFocusOutlineGutter": "space-filtering-token-dismiss-button-focus-outline-gutter",
    "spaceFilteringTokenOperationSelectFocusOutlineGutter": "space-filtering-token-operation-select-focus-outline-gutter",
    "spaceFlashbarActionLeft": "space-flashbar-action-left",
    "spaceFlashbarDismissRight": "space-flashbar-dismiss-right",
    "spaceFlashbarHorizontal": "space-flashbar-horizontal",
    "spaceFlashbarVertical": "space-flashbar-vertical",
    "spaceGridGutter": "space-grid-gutter",
    "spaceKeyValueGap": "space-key-value-gap",
    "spaceLayoutContentBottom": "space-layout-content-bottom",
    "spaceLayoutContentHorizontal": "space-layout-content-horizontal",
    "spaceLayoutToggleDiameter": "space-layout-toggle-diameter",
    "spaceLayoutTogglePadding": "space-layout-toggle-padding",
    "spaceModalContentBottom": "space-modal-content-bottom",
    "spaceModalHorizontal": "space-modal-horizontal",
    "spacePanelContentBottom": "space-panel-content-bottom",
    "spacePanelContentTop": "space-panel-content-top",
    "spacePanelDividerMarginHorizontal": "space-panel-divider-margin-horizontal",
    "spacePanelHeaderVertical": "space-panel-header-vertical",
    "spacePanelNavLeft": "space-panel-nav-left",
    "spacePanelSideLeft": "space-panel-side-left",
    "spacePanelSideRight": "space-panel-side-right",
    "spacePanelSplitTop": "space-panel-split-top",
    "spacePanelSplitBottom": "space-panel-split-bottom",
    "spaceSegmentedControlFocusOutlineGutter": "space-segmented-control-focus-outline-gutter",
    "spaceTabsContentTop": "space-tabs-content-top",
    "spaceTabsFocusOutlineGutter": "space-tabs-focus-outline-gutter",
    "spaceTabsVertical": "space-tabs-vertical",
    "spaceTableContentBottom": "space-table-content-bottom",
    "spaceTableEmbeddedHeaderTop": "space-table-embedded-header-top",
    "spaceTableFooterHorizontal": "space-table-footer-horizontal",
    "spaceTableHeaderFocusOutlineGutter": "space-table-header-focus-outline-gutter",
    "spaceTableHeaderHorizontal": "space-table-header-horizontal",
    "spaceTableHeaderToolsBottom": "space-table-header-tools-bottom",
    "spaceTableHeaderToolsFullPageBottom": "space-table-header-tools-full-page-bottom",
    "spaceTableHorizontal": "space-table-horizontal",
    "spaceTreeViewIndentation": "space-tree-view-indentation",
    "spaceTileGutter": "space-tile-gutter",
    "spaceActionCardHorizontalDefault": "space-action-card-horizontal-default",
    "spaceActionCardHorizontalEmbedded": "space-action-card-horizontal-embedded",
    "spaceActionCardVerticalDefault": "space-action-card-vertical-default",
    "spaceActionCardVerticalEmbedded": "space-action-card-vertical-embedded",
    "spaceActionCardDescriptionPaddingTop": "space-action-card-description-padding-top",
    "spaceActionCardContentPaddingTop": "space-action-card-content-padding-top",
    "spaceOptionPaddingVertical": "space-option-padding-vertical",
    "spaceOptionPaddingHorizontal": "space-option-padding-horizontal",
    "spaceStatusIndicatorPaddingHorizontal": "space-status-indicator-padding-horizontal",
    "spaceScaled2xNone": "space-scaled-2x-none",
    "spaceScaled2xXxxs": "space-scaled-2x-xxxs",
    "spaceScaled2xXxs": "space-scaled-2x-xxs",
    "spaceScaled2xXs": "space-scaled-2x-xs",
    "spaceScaled2xS": "space-scaled-2x-s",
    "spaceScaled2xM": "space-scaled-2x-m",
    "spaceScaled2xL": "space-scaled-2x-l",
    "spaceScaled2xXl": "space-scaled-2x-xl",
    "spaceScaled2xXxl": "space-scaled-2x-xxl",
    "spaceScaled2xXxxl": "space-scaled-2x-xxxl",
    "spaceScaledNone": "space-scaled-none",
    "spaceScaledXxxs": "space-scaled-xxxs",
    "spaceScaledXxs": "space-scaled-xxs",
    "spaceScaledXs": "space-scaled-xs",
    "spaceScaledS": "space-scaled-s",
    "spaceScaledM": "space-scaled-m",
    "spaceScaledL": "space-scaled-l",
    "spaceScaledXl": "space-scaled-xl",
    "spaceScaledXxl": "space-scaled-xxl",
    "spaceScaledXxxl": "space-scaled-xxxl",
    "spaceStaticXxxs": "space-static-xxxs",
    "spaceStaticXxs": "space-static-xxs",
    "spaceStaticXs": "space-static-xs",
    "spaceStaticS": "space-static-s",
    "spaceStaticM": "space-static-m",
    "spaceStaticL": "space-static-l",
    "spaceStaticXl": "space-static-xl",
    "spaceStaticXxl": "space-static-xxl",
    "spaceStaticXxxl": "space-static-xxxl",
    "spaceNone": "space-none",
    "spaceXxxs": "space-xxxs",
    "spaceXxs": "space-xxs",
    "spaceXs": "space-xs",
    "spaceS": "space-s",
    "spaceM": "space-m",
    "spaceL": "space-l",
    "spaceXl": "space-xl",
    "spaceXxl": "space-xxl",
    "spaceXxxl": "space-xxxl",
    "shadowCard": "shadow-card",
    "shadowItemCard": "shadow-item-card",
    "shadowContainer": "shadow-container",
    "shadowContainerActive": "shadow-container-active",
    "shadowDropdown": "shadow-dropdown",
    "shadowDropup": "shadow-dropup",
    "shadowFlashCollapsed": "shadow-flash-collapsed",
    "shadowFlashSticky": "shadow-flash-sticky",
    "shadowModal": "shadow-modal",
    "shadowPanel": "shadow-panel",
    "shadowPanelToggle": "shadow-panel-toggle",
    "shadowPopover": "shadow-popover",
    "shadowSplitBottom": "shadow-split-bottom",
    "shadowSplitSide": "shadow-split-side",
    "shadowSticky": "shadow-sticky",
    "shadowStickyEmbedded": "shadow-sticky-embedded",
    "shadowStickyColumnFirst": "shadow-sticky-column-first",
    "shadowStickyColumnLast": "shadow-sticky-column-last"
  },
  "propertiesMap": {
    "colorPrimary50": "--color-primary-50-1y05xv",
    "colorPrimary100": "--color-primary-100-f62fz9",
    "colorPrimary200": "--color-primary-200-vubr4w",
    "colorPrimary300": "--color-primary-300-5q65ox",
    "colorPrimary400": "--color-primary-400-n8h4bx",
    "colorPrimary500": "--color-primary-500-q9c16y",
    "colorPrimary600": "--color-primary-600-1lcy1k",
    "colorPrimary700": "--color-primary-700-n6k121",
    "colorPrimary800": "--color-primary-800-j9rj38",
    "colorPrimary900": "--color-primary-900-a5kqrr",
    "colorPrimary1000": "--color-primary-1000-7umopx",
    "colorNeutral50": "--color-neutral-50-pvu04n",
    "colorNeutral100": "--color-neutral-100-gk3lvf",
    "colorNeutral150": "--color-neutral-150-gezhen",
    "colorNeutral200": "--color-neutral-200-fqt4tz",
    "colorNeutral250": "--color-neutral-250-vs1is4",
    "colorNeutral300": "--color-neutral-300-08wi6k",
    "colorNeutral350": "--color-neutral-350-dq6kfr",
    "colorNeutral400": "--color-neutral-400-wtst55",
    "colorNeutral450": "--color-neutral-450-kn0235",
    "colorNeutral500": "--color-neutral-500-8van0b",
    "colorNeutral550": "--color-neutral-550-z2a44u",
    "colorNeutral600": "--color-neutral-600-fln1ww",
    "colorNeutral650": "--color-neutral-650-miik4f",
    "colorNeutral700": "--color-neutral-700-qw8ats",
    "colorNeutral750": "--color-neutral-750-pi9qqd",
    "colorNeutral800": "--color-neutral-800-t7j5ap",
    "colorNeutral850": "--color-neutral-850-3f0gro",
    "colorNeutral900": "--color-neutral-900-v0mtoc",
    "colorNeutral950": "--color-neutral-950-lxybh8",
    "colorNeutral1000": "--color-neutral-1000-7ovvlt",
    "colorError50": "--color-error-50-1upkvz",
    "colorError400": "--color-error-400-c0knb8",
    "colorError600": "--color-error-600-mdn3ng",
    "colorError900": "--color-error-900-skonp1",
    "colorError1000": "--color-error-1000-ecmudm",
    "colorSuccess50": "--color-success-50-yow9uc",
    "colorSuccess500": "--color-success-500-hhxb4g",
    "colorSuccess600": "--color-success-600-g7hz2i",
    "colorSuccess1000": "--color-success-1000-xy1gvq",
    "colorWarning50": "--color-warning-50-uxheb8",
    "colorWarning400": "--color-warning-400-55puga",
    "colorWarning500": "--color-warning-500-zidhub",
    "colorWarning900": "--color-warning-900-kpxt8c",
    "colorWarning1000": "--color-warning-1000-65l070",
    "colorInfo50": "--color-info-50-cdvtrs",
    "colorInfo300": "--color-info-300-q9xd1l",
    "colorInfo400": "--color-info-400-674xac",
    "colorInfo600": "--color-info-600-un21zh",
    "colorInfo1000": "--color-info-1000-s77ok9",
    "colorGrey50": "--color-grey-50-mhbfod",
    "colorGrey100": "--color-grey-100-2sczed",
    "colorGrey150": "--color-grey-150-znah9n",
    "colorGrey200": "--color-grey-200-s986pt",
    "colorGrey250": "--color-grey-250-l5wm60",
    "colorGrey300": "--color-grey-300-tqmb21",
    "colorGrey350": "--color-grey-350-brqf9i",
    "colorGrey400": "--color-grey-400-oueki4",
    "colorGrey450": "--color-grey-450-6n5usg",
    "colorGrey500": "--color-grey-500-argwpz",
    "colorGrey600": "--color-grey-600-qux9qr",
    "colorGrey650": "--color-grey-650-5vpn76",
    "colorGrey700": "--color-grey-700-i9hww0",
    "colorGrey750": "--color-grey-750-3a32f4",
    "colorGrey800": "--color-grey-800-38aulk",
    "colorGrey850": "--color-grey-850-fg4m0u",
    "colorGrey900": "--color-grey-900-2zzggd",
    "colorGrey950": "--color-grey-950-rpj9g8",
    "colorGrey1000": "--color-grey-1000-kdxctl",
    "colorBlue50": "--color-blue-50-1qtweg",
    "colorBlue100": "--color-blue-100-a7atso",
    "colorBlue200": "--color-blue-200-66lcr3",
    "colorBlue300": "--color-blue-300-s2r2o0",
    "colorBlue400": "--color-blue-400-h2lqfk",
    "colorBlue600": "--color-blue-600-dkpfum",
    "colorBlue700": "--color-blue-700-lcgdon",
    "colorBlue900": "--color-blue-900-k0czor",
    "colorBlue1000": "--color-blue-1000-fmz0jt",
    "colorGreen50": "--color-green-50-p1p8l4",
    "colorGreen500": "--color-green-500-c2uzi6",
    "colorGreen600": "--color-green-600-vdmico",
    "colorGreen900": "--color-green-900-6aqp28",
    "colorGreen1000": "--color-green-1000-tarlm7",
    "colorRed50": "--color-red-50-k823mj",
    "colorRed400": "--color-red-400-40ay29",
    "colorRed600": "--color-red-600-lxm4n7",
    "colorRed900": "--color-red-900-gj885t",
    "colorRed1000": "--color-red-1000-jtashw",
    "colorYellow50": "--color-yellow-50-wk1vy0",
    "colorYellow400": "--color-yellow-400-q4m2pa",
    "colorYellow500": "--color-yellow-500-rj98kw",
    "colorYellow900": "--color-yellow-900-jipa9u",
    "colorYellow1000": "--color-yellow-1000-zo0nn2",
    "colorPurple400": "--color-purple-400-o7fr4k",
    "colorPurple700": "--color-purple-700-5hcbeu",
    "colorAmber400": "--color-amber-400-z6oddn",
    "colorAmber500": "--color-amber-500-rsho1x",
    "colorAwsSquidInk": "--color-aws-squid-ink-oxiega",
    "colorTransparent": "--color-transparent-i61gs1",
    "colorBlack": "--color-black-cox1hy",
    "colorWhite": "--color-white-p1zlvy",
    "colorChartsRed300": "--color-charts-red-300-2k7eul",
    "colorChartsRed400": "--color-charts-red-400-ssrf2o",
    "colorChartsRed500": "--color-charts-red-500-m14kmu",
    "colorChartsRed600": "--color-charts-red-600-938v3h",
    "colorChartsRed700": "--color-charts-red-700-f6sq8t",
    "colorChartsRed800": "--color-charts-red-800-tzkaad",
    "colorChartsRed900": "--color-charts-red-900-fhg0lh",
    "colorChartsRed1000": "--color-charts-red-1000-9iigzo",
    "colorChartsRed1100": "--color-charts-red-1100-4n7b3z",
    "colorChartsRed1200": "--color-charts-red-1200-ek3cuo",
    "colorChartsOrange300": "--color-charts-orange-300-hqhtmn",
    "colorChartsOrange400": "--color-charts-orange-400-g8c1fc",
    "colorChartsOrange500": "--color-charts-orange-500-j3c2cu",
    "colorChartsOrange600": "--color-charts-orange-600-1ad7o4",
    "colorChartsOrange700": "--color-charts-orange-700-spsf2r",
    "colorChartsOrange800": "--color-charts-orange-800-244d7b",
    "colorChartsOrange900": "--color-charts-orange-900-8omk92",
    "colorChartsOrange1000": "--color-charts-orange-1000-ezq5pz",
    "colorChartsOrange1100": "--color-charts-orange-1100-bhcmg5",
    "colorChartsOrange1200": "--color-charts-orange-1200-exs6jj",
    "colorChartsYellow300": "--color-charts-yellow-300-fpz8o0",
    "colorChartsYellow400": "--color-charts-yellow-400-vxiqrf",
    "colorChartsYellow500": "--color-charts-yellow-500-1qgrtj",
    "colorChartsYellow600": "--color-charts-yellow-600-aweqy2",
    "colorChartsYellow700": "--color-charts-yellow-700-xh0lj9",
    "colorChartsYellow800": "--color-charts-yellow-800-gp4422",
    "colorChartsYellow900": "--color-charts-yellow-900-r6gx3k",
    "colorChartsYellow1000": "--color-charts-yellow-1000-6dnac6",
    "colorChartsYellow1100": "--color-charts-yellow-1100-fqp4sw",
    "colorChartsYellow1200": "--color-charts-yellow-1200-k7kf4w",
    "colorChartsGreen300": "--color-charts-green-300-6766ev",
    "colorChartsGreen400": "--color-charts-green-400-gd41ay",
    "colorChartsGreen500": "--color-charts-green-500-yr18n3",
    "colorChartsGreen600": "--color-charts-green-600-b1gmr0",
    "colorChartsGreen700": "--color-charts-green-700-305sle",
    "colorChartsGreen800": "--color-charts-green-800-rh42zr",
    "colorChartsGreen900": "--color-charts-green-900-2x5smm",
    "colorChartsGreen1000": "--color-charts-green-1000-opphoq",
    "colorChartsGreen1100": "--color-charts-green-1100-o67uzm",
    "colorChartsGreen1200": "--color-charts-green-1200-sw46fc",
    "colorChartsTeal300": "--color-charts-teal-300-2qlyrg",
    "colorChartsTeal400": "--color-charts-teal-400-s8pa77",
    "colorChartsTeal500": "--color-charts-teal-500-8d830b",
    "colorChartsTeal600": "--color-charts-teal-600-772n9t",
    "colorChartsTeal700": "--color-charts-teal-700-29mnwm",
    "colorChartsTeal800": "--color-charts-teal-800-vp41t6",
    "colorChartsTeal900": "--color-charts-teal-900-k020ya",
    "colorChartsTeal1000": "--color-charts-teal-1000-fhpqt3",
    "colorChartsTeal1100": "--color-charts-teal-1100-6w598w",
    "colorChartsTeal1200": "--color-charts-teal-1200-0u78my",
    "colorChartsBlue1300": "--color-charts-blue-1-300-pdza0q",
    "colorChartsBlue1400": "--color-charts-blue-1-400-ajl038",
    "colorChartsBlue1500": "--color-charts-blue-1-500-9s8gor",
    "colorChartsBlue1600": "--color-charts-blue-1-600-7ymb7g",
    "colorChartsBlue1700": "--color-charts-blue-1-700-5qzras",
    "colorChartsBlue1800": "--color-charts-blue-1-800-awczh4",
    "colorChartsBlue1900": "--color-charts-blue-1-900-6wxwzk",
    "colorChartsBlue11000": "--color-charts-blue-1-1000-00005b",
    "colorChartsBlue11100": "--color-charts-blue-1-1100-8nwfwf",
    "colorChartsBlue11200": "--color-charts-blue-1-1200-v60p8b",
    "colorChartsBlue2300": "--color-charts-blue-2-300-g72slq",
    "colorChartsBlue2400": "--color-charts-blue-2-400-he538m",
    "colorChartsBlue2500": "--color-charts-blue-2-500-quctxu",
    "colorChartsBlue2600": "--color-charts-blue-2-600-6qav3j",
    "colorChartsBlue2700": "--color-charts-blue-2-700-sp7t4m",
    "colorChartsBlue2800": "--color-charts-blue-2-800-q01umt",
    "colorChartsBlue2900": "--color-charts-blue-2-900-gog7z2",
    "colorChartsBlue21000": "--color-charts-blue-2-1000-c13nf8",
    "colorChartsBlue21100": "--color-charts-blue-2-1100-ddk6eo",
    "colorChartsBlue21200": "--color-charts-blue-2-1200-gt550t",
    "colorChartsPurple300": "--color-charts-purple-300-85q036",
    "colorChartsPurple400": "--color-charts-purple-400-9axh6r",
    "colorChartsPurple500": "--color-charts-purple-500-rn2jbl",
    "colorChartsPurple600": "--color-charts-purple-600-26s4rg",
    "colorChartsPurple700": "--color-charts-purple-700-tv8cvg",
    "colorChartsPurple800": "--color-charts-purple-800-h61qlx",
    "colorChartsPurple900": "--color-charts-purple-900-am452b",
    "colorChartsPurple1000": "--color-charts-purple-1000-uarqpb",
    "colorChartsPurple1100": "--color-charts-purple-1100-y8ctnd",
    "colorChartsPurple1200": "--color-charts-purple-1200-hr9f40",
    "colorChartsPink300": "--color-charts-pink-300-ewnht7",
    "colorChartsPink400": "--color-charts-pink-400-smjdat",
    "colorChartsPink500": "--color-charts-pink-500-bw864b",
    "colorChartsPink600": "--color-charts-pink-600-2ro14y",
    "colorChartsPink700": "--color-charts-pink-700-ryxvua",
    "colorChartsPink800": "--color-charts-pink-800-tcusf8",
    "colorChartsPink900": "--color-charts-pink-900-kpyne4",
    "colorChartsPink1000": "--color-charts-pink-1000-1soluc",
    "colorChartsPink1100": "--color-charts-pink-1100-ff6g93",
    "colorChartsPink1200": "--color-charts-pink-1200-w9585d",
    "colorChartsStatusCritical": "--color-charts-status-critical-c6brdu",
    "colorChartsStatusHigh": "--color-charts-status-high-18fhg5",
    "colorChartsStatusMedium": "--color-charts-status-medium-3trmy3",
    "colorChartsStatusLow": "--color-charts-status-low-br6wv0",
    "colorChartsStatusPositive": "--color-charts-status-positive-md7eqa",
    "colorChartsStatusInfo": "--color-charts-status-info-yds4x2",
    "colorChartsStatusNeutral": "--color-charts-status-neutral-k2p33t",
    "colorChartsThresholdNegative": "--color-charts-threshold-negative-aad26m",
    "colorChartsThresholdPositive": "--color-charts-threshold-positive-mk2804",
    "colorChartsThresholdInfo": "--color-charts-threshold-info-ijuzzj",
    "colorChartsThresholdNeutral": "--color-charts-threshold-neutral-pd7kh4",
    "colorChartsLineGrid": "--color-charts-line-grid-kjxf3m",
    "colorChartsLineTick": "--color-charts-line-tick-xmcbvk",
    "colorChartsLineAxis": "--color-charts-line-axis-b95ncf",
    "colorChartsPaletteCategorical1": "--color-charts-palette-categorical-1-xu0deg",
    "colorChartsPaletteCategorical2": "--color-charts-palette-categorical-2-ktit09",
    "colorChartsPaletteCategorical3": "--color-charts-palette-categorical-3-g0srj0",
    "colorChartsPaletteCategorical4": "--color-charts-palette-categorical-4-5vauwp",
    "colorChartsPaletteCategorical5": "--color-charts-palette-categorical-5-3v8ery",
    "colorChartsPaletteCategorical6": "--color-charts-palette-categorical-6-ztdd8d",
    "colorChartsPaletteCategorical7": "--color-charts-palette-categorical-7-3j5o6w",
    "colorChartsPaletteCategorical8": "--color-charts-palette-categorical-8-c5r39m",
    "colorChartsPaletteCategorical9": "--color-charts-palette-categorical-9-8n6iuv",
    "colorChartsPaletteCategorical10": "--color-charts-palette-categorical-10-opta0w",
    "colorChartsPaletteCategorical11": "--color-charts-palette-categorical-11-b2r7jc",
    "colorChartsPaletteCategorical12": "--color-charts-palette-categorical-12-b5drtm",
    "colorChartsPaletteCategorical13": "--color-charts-palette-categorical-13-c69xg9",
    "colorChartsPaletteCategorical14": "--color-charts-palette-categorical-14-db19x8",
    "colorChartsPaletteCategorical15": "--color-charts-palette-categorical-15-8z8vjw",
    "colorChartsPaletteCategorical16": "--color-charts-palette-categorical-16-549jkl",
    "colorChartsPaletteCategorical17": "--color-charts-palette-categorical-17-nrio7t",
    "colorChartsPaletteCategorical18": "--color-charts-palette-categorical-18-tm902v",
    "colorChartsPaletteCategorical19": "--color-charts-palette-categorical-19-ujcr86",
    "colorChartsPaletteCategorical20": "--color-charts-palette-categorical-20-h55e4g",
    "colorChartsPaletteCategorical21": "--color-charts-palette-categorical-21-vs0u8l",
    "colorChartsPaletteCategorical22": "--color-charts-palette-categorical-22-6klt3l",
    "colorChartsPaletteCategorical23": "--color-charts-palette-categorical-23-3zpkdt",
    "colorChartsPaletteCategorical24": "--color-charts-palette-categorical-24-z9a4uk",
    "colorChartsPaletteCategorical25": "--color-charts-palette-categorical-25-tgdsk2",
    "colorChartsPaletteCategorical26": "--color-charts-palette-categorical-26-lo8zn9",
    "colorChartsPaletteCategorical27": "--color-charts-palette-categorical-27-bruhsa",
    "colorChartsPaletteCategorical28": "--color-charts-palette-categorical-28-6b00fb",
    "colorChartsPaletteCategorical29": "--color-charts-palette-categorical-29-aurmid",
    "colorChartsPaletteCategorical30": "--color-charts-palette-categorical-30-fjnmd7",
    "colorChartsPaletteCategorical31": "--color-charts-palette-categorical-31-7zcct5",
    "colorChartsPaletteCategorical32": "--color-charts-palette-categorical-32-rrda6y",
    "colorChartsPaletteCategorical33": "--color-charts-palette-categorical-33-2v0mzv",
    "colorChartsPaletteCategorical34": "--color-charts-palette-categorical-34-g9a9q3",
    "colorChartsPaletteCategorical35": "--color-charts-palette-categorical-35-u0w821",
    "colorChartsPaletteCategorical36": "--color-charts-palette-categorical-36-tthuf8",
    "colorChartsPaletteCategorical37": "--color-charts-palette-categorical-37-y588bl",
    "colorChartsPaletteCategorical38": "--color-charts-palette-categorical-38-qdh97u",
    "colorChartsPaletteCategorical39": "--color-charts-palette-categorical-39-yisq6l",
    "colorChartsPaletteCategorical40": "--color-charts-palette-categorical-40-yeer1v",
    "colorChartsPaletteCategorical41": "--color-charts-palette-categorical-41-tu9dxw",
    "colorChartsPaletteCategorical42": "--color-charts-palette-categorical-42-q410kp",
    "colorChartsPaletteCategorical43": "--color-charts-palette-categorical-43-dwew7q",
    "colorChartsPaletteCategorical44": "--color-charts-palette-categorical-44-2thp96",
    "colorChartsPaletteCategorical45": "--color-charts-palette-categorical-45-6kinj6",
    "colorChartsPaletteCategorical46": "--color-charts-palette-categorical-46-iefxfq",
    "colorChartsPaletteCategorical47": "--color-charts-palette-categorical-47-9l9wl2",
    "colorChartsPaletteCategorical48": "--color-charts-palette-categorical-48-5s2n0r",
    "colorChartsPaletteCategorical49": "--color-charts-palette-categorical-49-bub0l1",
    "colorChartsPaletteCategorical50": "--color-charts-palette-categorical-50-utrpu5",
    "colorChartsErrorBarMarker": "--color-charts-error-bar-marker-r10jgv",
    "colorSeverityDarkRed": "--color-severity-dark-red-j8bmoc",
    "colorSeverityRed": "--color-severity-red-wf5w2d",
    "colorSeverityOrange": "--color-severity-orange-rpbcus",
    "colorSeverityYellow": "--color-severity-yellow-4er6zq",
    "colorSeverityGrey": "--color-severity-grey-sp7qo8",
    "colorBackgroundNotificationSeverityCritical": "--color-background-notification-severity-critical-0xl8pp",
    "colorBackgroundNotificationSeverityHigh": "--color-background-notification-severity-high-8nbgdi",
    "colorBackgroundNotificationSeverityMedium": "--color-background-notification-severity-medium-lbljs2",
    "colorBackgroundNotificationSeverityLow": "--color-background-notification-severity-low-giz8b6",
    "colorBackgroundNotificationSeverityNeutral": "--color-background-notification-severity-neutral-hnhgmv",
    "colorTextNotificationSeverityCritical": "--color-text-notification-severity-critical-tv4vw4",
    "colorTextNotificationSeverityHigh": "--color-text-notification-severity-high-t4suvu",
    "colorTextNotificationSeverityMedium": "--color-text-notification-severity-medium-8f60kb",
    "colorTextNotificationSeverityLow": "--color-text-notification-severity-low-gvojhi",
    "colorTextNotificationSeverityNeutral": "--color-text-notification-severity-neutral-ynm2wl",
    "colorGreyOpaque10": "--color-grey-opaque-10-vwfmts",
    "colorGreyOpaque25": "--color-grey-opaque-25-cjy3al",
    "colorGreyOpaque40": "--color-grey-opaque-40-yj2cvz",
    "colorGreyOpaque50": "--color-grey-opaque-50-dlm5ly",
    "colorGreyOpaque70": "--color-grey-opaque-70-p0svy7",
    "colorGreyOpaque80": "--color-grey-opaque-80-1wrh9m",
    "colorGreyOpaque90": "--color-grey-opaque-90-te8til",
    "colorGreyTransparent": "--color-grey-transparent-g4kcvh",
    "colorGreyTransparentHeavy": "--color-grey-transparent-heavy-bu3q4i",
    "colorGreyTransparentLight": "--color-grey-transparent-light-mwvx49",
    "colorBackgroundBadgeIcon": "--color-background-badge-icon-jyxnxa",
    "colorBackgroundButtonLinkActive": "--color-background-button-link-active-5oi2dp",
    "colorBackgroundButtonLinkDefault": "--color-background-button-link-default-o64utz",
    "colorBackgroundButtonLinkDisabled": "--color-background-button-link-disabled-9xznu3",
    "colorBackgroundButtonLinkHover": "--color-background-button-link-hover-lhrs2u",
    "colorBackgroundButtonNormalActive": "--color-background-button-normal-active-5imwxd",
    "colorBackgroundButtonNormalDefault": "--color-background-button-normal-default-7f99mv",
    "colorBackgroundButtonNormalDisabled": "--color-background-button-normal-disabled-hl039l",
    "colorBackgroundButtonNormalHover": "--color-background-button-normal-hover-53op9s",
    "colorBackgroundToggleButtonNormalPressed": "--color-background-toggle-button-normal-pressed-4khex7",
    "colorBackgroundToggleButtonNormalDefault": "--color-background-toggle-button-normal-default-ipnqr5",
    "colorBackgroundButtonPrimaryActive": "--color-background-button-primary-active-5cqoqt",
    "colorBackgroundButtonPrimaryDefault": "--color-background-button-primary-default-vdt0fu",
    "colorBackgroundButtonPrimaryDisabled": "--color-background-button-primary-disabled-sgo4zo",
    "colorBackgroundButtonPrimaryHover": "--color-background-button-primary-hover-mo85i6",
    "colorBackgroundDirectionButtonActive": "--color-background-direction-button-active-lvo0dy",
    "colorBackgroundDirectionButtonDefault": "--color-background-direction-button-default-bvhbsn",
    "colorBackgroundDirectionButtonDisabled": "--color-background-direction-button-disabled-s9x4zq",
    "colorBackgroundDirectionButtonHover": "--color-background-direction-button-hover-74n5o1",
    "colorTextDirectionButtonDefault": "--color-text-direction-button-default-p88lvb",
    "colorTextDirectionButtonDisabled": "--color-text-direction-button-disabled-2jds36",
    "colorBackgroundCalendarCurrentDate": "--color-background-calendar-current-date-sk0f6i",
    "colorBackgroundCellShaded": "--color-background-cell-shaded-v7o6so",
    "colorBackgroundCodeEditorGutterActiveLineDefault": "--color-background-code-editor-gutter-active-line-default-51v1pv",
    "colorBackgroundCodeEditorGutterActiveLineError": "--color-background-code-editor-gutter-active-line-error-ro2qo1",
    "colorBackgroundCodeEditorGutterDefault": "--color-background-code-editor-gutter-default-15qdwh",
    "colorBackgroundCodeEditorLoading": "--color-background-code-editor-loading-6nwpin",
    "colorBackgroundCodeEditorPaneItemHover": "--color-background-code-editor-pane-item-hover-z6k9mr",
    "colorBackgroundCodeEditorStatusBar": "--color-background-code-editor-status-bar-yjtxod",
    "colorBackgroundCard": "--color-background-card-p5vrq0",
    "colorBackgroundItemCard": "--color-background-item-card-ww2wfv",
    "colorBackgroundContainerContent": "--color-background-container-content-6u8rvp",
    "colorBackgroundContainerHeader": "--color-background-container-header-gs3mbe",
    "colorBackgroundControlChecked": "--color-background-control-checked-ka7kc2",
    "colorBackgroundControlDefault": "--color-background-control-default-4jb21l",
    "colorBackgroundControlDisabled": "--color-background-control-disabled-1f3718",
    "colorBackgroundDropdownItemDefault": "--color-background-dropdown-item-default-qmc033",
    "colorBackgroundDropdownItemDimmed": "--color-background-dropdown-item-dimmed-dhho03",
    "colorBackgroundDropdownItemFilterMatch": "--color-background-dropdown-item-filter-match-49b5vt",
    "colorBackgroundDropdownItemHover": "--color-background-dropdown-item-hover-yunepc",
    "colorBackgroundDropdownItemSelected": "--color-background-dropdown-item-selected-f3v6te",
    "colorBackgroundHomeHeader": "--color-background-home-header-4c9jt4",
    "colorBackgroundInlineCode": "--color-background-inline-code-un8udy",
    "colorBackgroundInputDefault": "--color-background-input-default-ifz5bb",
    "colorBackgroundInputDisabled": "--color-background-input-disabled-dihaja",
    "colorBackgroundItemSelected": "--color-background-item-selected-9gppru",
    "colorBackgroundLayoutMain": "--color-background-layout-main-5ilwcb",
    "colorBackgroundDrawer": "--color-background-drawer-5hs0eh",
    "colorBackgroundDrawerBackdrop": "--color-background-drawer-backdrop-ducxi3",
    "colorBackgroundLayoutMobilePanel": "--color-background-layout-mobile-panel-ed0ava",
    "colorBackgroundLayoutPanelContent": "--color-background-layout-panel-content-xto15e",
    "colorBackgroundLayoutPanelHover": "--color-background-layout-panel-hover-tguulw",
    "colorBackgroundLayoutToolbar": "--color-background-layout-toolbar-y0cu80",
    "colorBackgroundLayoutToggleActive": "--color-background-layout-toggle-active-ap91vm",
    "colorBackgroundLayoutToggleDefault": "--color-background-layout-toggle-default-2hgjdu",
    "colorBackgroundLayoutToggleHover": "--color-background-layout-toggle-hover-0cpm7g",
    "colorBackgroundLayoutToggleSelectedActive": "--color-background-layout-toggle-selected-active-zcl8w3",
    "colorBackgroundLayoutToggleSelectedDefault": "--color-background-layout-toggle-selected-default-izfana",
    "colorBackgroundLayoutToggleSelectedHover": "--color-background-layout-toggle-selected-hover-7953u1",
    "colorBackgroundModalOverlay": "--color-background-modal-overlay-d7uby0",
    "colorBackgroundNotificationBlue": "--color-background-notification-blue-4vnob8",
    "colorBackgroundNotificationGreen": "--color-background-notification-green-2rkyvu",
    "colorBackgroundNotificationGrey": "--color-background-notification-grey-x3vul6",
    "colorBackgroundNotificationRed": "--color-background-notification-red-0487ea",
    "colorBackgroundNotificationYellow": "--color-background-notification-yellow-y6us5r",
    "colorBackgroundNotificationStackBar": "--color-background-notification-stack-bar-qe5n4w",
    "colorBackgroundNotificationStackBarActive": "--color-background-notification-stack-bar-active-a4h9r8",
    "colorBackgroundNotificationStackBarHover": "--color-background-notification-stack-bar-hover-jh82oo",
    "colorBackgroundPopover": "--color-background-popover-e20fy8",
    "colorBackgroundProgressBarValueDefault": "--color-background-progress-bar-value-default-69ydqg",
    "colorBackgroundProgressBarDefault": "--color-background-progress-bar-default-j8kyxd",
    "colorBackgroundSegmentActive": "--color-background-segment-active-1u2ldl",
    "colorBackgroundSegmentDefault": "--color-background-segment-default-b0r494",
    "colorBackgroundSegmentDisabled": "--color-background-segment-disabled-m2a5t7",
    "colorBackgroundSegmentHover": "--color-background-segment-hover-800sl4",
    "colorBackgroundSegmentWrapper": "--color-background-segment-wrapper-5tudmm",
    "colorBackgroundSliderRangeDefault": "--color-background-slider-range-default-3ljdu4",
    "colorBackgroundSliderRangeActive": "--color-background-slider-range-active-vu3lky",
    "colorBackgroundSliderHandleDefault": "--color-background-slider-handle-default-lp5ntg",
    "colorBackgroundSliderHandleActive": "--color-background-slider-handle-active-50ubqb",
    "colorBackgroundSliderTrackDefault": "--color-background-slider-track-default-vk2c9o",
    "colorBackgroundSliderHandleRing": "--color-background-slider-handle-ring-9sfenj",
    "colorBackgroundSliderHandleErrorDefault": "--color-background-slider-handle-error-default-411tqq",
    "colorBackgroundSliderHandleErrorActive": "--color-background-slider-handle-error-active-x65pfh",
    "colorBackgroundSliderHandleWarningDefault": "--color-background-slider-handle-warning-default-or76ej",
    "colorBackgroundSliderHandleWarningActive": "--color-background-slider-handle-warning-active-7o84zp",
    "colorBackgroundSliderRangeErrorDefault": "--color-background-slider-range-error-default-b519qn",
    "colorBackgroundSliderRangeErrorActive": "--color-background-slider-range-error-active-6bo8an",
    "colorBackgroundSliderRangeWarningDefault": "--color-background-slider-range-warning-default-6isqvo",
    "colorBackgroundSliderRangeWarningActive": "--color-background-slider-range-warning-active-dm2pha",
    "colorBackgroundStatusError": "--color-background-status-error-mu3lcw",
    "colorBackgroundStatusInfo": "--color-background-status-info-sfobba",
    "colorBackgroundDialog": "--color-background-dialog-2fj3uu",
    "colorBackgroundStatusSuccess": "--color-background-status-success-h6b8bh",
    "colorBackgroundStatusWarning": "--color-background-status-warning-cv83up",
    "colorBackgroundTableHeader": "--color-background-table-header-hdjxos",
    "colorBackgroundTilesDisabled": "--color-background-tiles-disabled-4ynms7",
    "colorBackgroundToggleCheckedDisabled": "--color-background-toggle-checked-disabled-amxc0a",
    "colorBackgroundToggleDefault": "--color-background-toggle-default-kjlhv0",
    "colorBackgroundAvatarGenAi": "--color-background-avatar-gen-ai-oxp2v6",
    "colorBackgroundAvatarDefault": "--color-background-avatar-default-t427xm",
    "colorTextAvatar": "--color-text-avatar-kuhkoa",
    "colorBackgroundLoadingBarGenAi": "--color-background-loading-bar-gen-ai-tey70i",
    "colorBackgroundStatusIndicatorError": "--color-background-status-indicator-error-txnmnb",
    "colorBackgroundStatusIndicatorWarning": "--color-background-status-indicator-warning-xf3dw4",
    "colorBackgroundStatusIndicatorSuccess": "--color-background-status-indicator-success-o8ig5c",
    "colorBackgroundStatusIndicatorInfo": "--color-background-status-indicator-info-nqw7od",
    "colorBackgroundStatusIndicatorNeutral": "--color-background-status-indicator-neutral-psqqh7",
    "colorBackgroundChatBubbleOutgoing": "--color-background-chat-bubble-outgoing-ay6nj3",
    "colorBackgroundChatBubbleIncoming": "--color-background-chat-bubble-incoming-j38cew",
    "colorTextChatBubbleOutgoing": "--color-text-chat-bubble-outgoing-f3r63s",
    "colorTextChatBubbleIncoming": "--color-text-chat-bubble-incoming-od0yh8",
    "colorBorderButtonLinkDisabled": "--color-border-button-link-disabled-npwqxa",
    "colorBorderButtonNormalActive": "--color-border-button-normal-active-ru7yhb",
    "colorBorderButtonNormalDefault": "--color-border-button-normal-default-glqfp1",
    "colorBorderToggleButtonNormalPressed": "--color-border-toggle-button-normal-pressed-tq8o41",
    "colorBorderButtonNormalDisabled": "--color-border-button-normal-disabled-pkhetz",
    "colorTextButtonNormalDisabled": "--color-text-button-normal-disabled-05p74s",
    "colorBorderButtonNormalHover": "--color-border-button-normal-hover-6a2tdq",
    "colorTextButtonIconDisabled": "--color-text-button-icon-disabled-nnofkn",
    "colorBorderButtonPrimaryActive": "--color-border-button-primary-active-6jnxoc",
    "colorBorderButtonPrimaryDefault": "--color-border-button-primary-default-45p8u2",
    "colorBorderButtonPrimaryDisabled": "--color-border-button-primary-disabled-b5p1ji",
    "colorBorderButtonPrimaryHover": "--color-border-button-primary-hover-rktx0f",
    "colorTextButtonPrimaryDisabled": "--color-text-button-primary-disabled-q79gms",
    "colorItemSelected": "--color-item-selected-72rnwy",
    "colorBorderCalendarGrid": "--color-border-calendar-grid-67r4w4",
    "colorBorderCalendarGridSelectedFocusRing": "--color-border-calendar-grid-selected-focus-ring-jk1fb0",
    "colorBorderCellShaded": "--color-border-cell-shaded-0ipazf",
    "colorBorderCodeEditorAceActiveLineLightTheme": "--color-border-code-editor-ace-active-line-light-theme-q6hsvt",
    "colorBorderCodeEditorAceActiveLineDarkTheme": "--color-border-code-editor-ace-active-line-dark-theme-v09eti",
    "colorBorderCodeEditorDefault": "--color-border-code-editor-default-2bfcfq",
    "colorBorderCodeEditorPaneItemHover": "--color-border-code-editor-pane-item-hover-wvblek",
    "colorBorderCard": "--color-border-card-3n24fu",
    "colorBorderCardHighlighted": "--color-border-card-highlighted-ygosod",
    "colorBorderItemCard": "--color-border-item-card-fia23i",
    "colorBorderItemCardHighlighted": "--color-border-item-card-highlighted-5l7rko",
    "colorBorderContainerDivider": "--color-border-container-divider-9huz1a",
    "colorBorderContainerTop": "--color-border-container-top-k3vmoz",
    "colorBorderControlChecked": "--color-border-control-checked-bdv28l",
    "colorBorderControlDefault": "--color-border-control-default-sh3548",
    "colorBorderControlDisabled": "--color-border-control-disabled-uj7t08",
    "colorBorderDividerActive": "--color-border-divider-active-biq3j4",
    "colorBorderDividerDefault": "--color-border-divider-default-nr68jt",
    "colorBorderDividerPanelBottom": "--color-border-divider-panel-bottom-bruvuz",
    "colorBorderDividerPanelSide": "--color-border-divider-panel-side-an0w07",
    "colorBorderDividerSecondary": "--color-border-divider-secondary-qoitch",
    "colorBorderDropdownContainer": "--color-border-dropdown-container-cmthq7",
    "colorBorderDropdownGroup": "--color-border-dropdown-group-ylcnh8",
    "colorBorderDropdownItemDefault": "--color-border-dropdown-item-default-kape37",
    "colorBorderDropdownItemHover": "--color-border-dropdown-item-hover-aqfuxq",
    "colorBorderDropdownItemDimmedHover": "--color-border-dropdown-item-dimmed-hover-ga9sch",
    "colorBorderDropdownItemSelected": "--color-border-dropdown-item-selected-dl2ezh",
    "colorBorderDropdownItemTop": "--color-border-dropdown-item-top-gp2d1p",
    "colorBorderEditableCellHover": "--color-border-editable-cell-hover-2hmo55",
    "colorBorderInputDefault": "--color-border-input-default-317xk5",
    "colorBorderInputDisabled": "--color-border-input-disabled-zgnzvk",
    "colorBorderInputFocused": "--color-border-input-focused-4z0pgn",
    "colorBorderItemFocused": "--color-border-item-focused-uk47pl",
    "colorBorderDropdownItemFocused": "--color-border-dropdown-item-focused-zacqlp",
    "colorBorderItemPlaceholder": "--color-border-item-placeholder-x8kbjp",
    "colorBorderItemSelected": "--color-border-item-selected-wl5ttm",
    "colorBorderLayout": "--color-border-layout-ayg8vb",
    "colorBorderNotificationStackBar": "--color-border-notification-stack-bar-aszsse",
    "colorBorderPanelHeader": "--color-border-panel-header-ygztvl",
    "colorBorderPopover": "--color-border-popover-1ye6tz",
    "colorBorderSegmentActive": "--color-border-segment-active-ls9t4n",
    "colorBorderSegmentDefault": "--color-border-segment-default-6ig2mo",
    "colorBorderSegmentDisabled": "--color-border-segment-disabled-fcrbcl",
    "colorBorderSegmentHover": "--color-border-segment-hover-0o9ey3",
    "colorBorderStatusError": "--color-border-status-error-j8acpp",
    "colorBorderStatusInfo": "--color-border-status-info-qf6jok",
    "colorBorderStatusSuccess": "--color-border-status-success-8z5f8u",
    "colorBorderStatusWarning": "--color-border-status-warning-j40pg7",
    "colorBorderDialog": "--color-border-dialog-0rjwug",
    "colorBorderDividerInteractiveDefault": "--color-border-divider-interactive-default-r928dz",
    "colorBorderTabsDivider": "--color-border-tabs-divider-f5t9va",
    "colorBorderTabsShadow": "--color-border-tabs-shadow-ugyo07",
    "colorBorderTabsUnderline": "--color-border-tabs-underline-gudemr",
    "colorBorderTilesDisabled": "--color-border-tiles-disabled-19olbu",
    "colorBorderTutorial": "--color-border-tutorial-zggi80",
    "colorForegroundControlDefault": "--color-foreground-control-default-eto4wy",
    "colorForegroundControlDisabled": "--color-foreground-control-disabled-txi6cf",
    "colorForegroundControlReadOnly": "--color-foreground-control-read-only-7ydvuj",
    "colorShadowDefault": "--color-shadow-default-o7dmmm",
    "colorShadowMedium": "--color-shadow-medium-x7of55",
    "colorShadowSide": "--color-shadow-side-rtsbda",
    "colorStrokeChartLine": "--color-stroke-chart-line-3nsnk6",
    "colorStrokeCodeEditorGutterActiveLineDefault": "--color-stroke-code-editor-gutter-active-line-default-5hrdmu",
    "colorStrokeCodeEditorGutterActiveLineHover": "--color-stroke-code-editor-gutter-active-line-hover-vqrb6s",
    "colorTextAccent": "--color-text-accent-n1kmht",
    "colorTextBodyDefault": "--color-text-body-default-vvtq8u",
    "colorTextBodySecondary": "--color-text-body-secondary-yna5sb",
    "colorTextBreadcrumbCurrent": "--color-text-breadcrumb-current-2mqnkk",
    "colorTextBreadcrumbIcon": "--color-text-breadcrumb-icon-9j48ot",
    "colorTextButtonInlineIconDefault": "--color-text-button-inline-icon-default-sm4ql6",
    "colorTextButtonInlineIconDisabled": "--color-text-button-inline-icon-disabled-82hho0",
    "colorTextButtonInlineIconHover": "--color-text-button-inline-icon-hover-rbyzfc",
    "colorTextButtonNormalActive": "--color-text-button-normal-active-vihsxh",
    "colorTextToggleButtonNormalPressed": "--color-text-toggle-button-normal-pressed-wnx2zl",
    "colorTextButtonNormalDefault": "--color-text-button-normal-default-nzalii",
    "colorTextButtonNormalHover": "--color-text-button-normal-hover-gusgyv",
    "colorTextLinkButtonNormalDefault": "--color-text-link-button-normal-default-srprth",
    "colorTextLinkButtonNormalHover": "--color-text-link-button-normal-hover-jrnyw3",
    "colorTextLinkButtonNormalActive": "--color-text-link-button-normal-active-js9ryu",
    "colorTextButtonLinkActive": "--color-text-button-link-active-dqdjg3",
    "colorTextButtonLinkDefault": "--color-text-button-link-default-vvunrs",
    "colorTextButtonLinkDisabled": "--color-text-button-link-disabled-12wh7a",
    "colorTextButtonLinkHover": "--color-text-button-link-hover-kvrc36",
    "colorTextButtonPrimaryActive": "--color-text-button-primary-active-refmba",
    "colorTextButtonPrimaryDefault": "--color-text-button-primary-default-mwl31m",
    "colorTextButtonPrimaryHover": "--color-text-button-primary-hover-pw12ep",
    "colorTextCalendarDateHover": "--color-text-calendar-date-hover-3fcriv",
    "colorTextCalendarDateSelected": "--color-text-calendar-date-selected-m18pgv",
    "colorTextCalendarMonth": "--color-text-calendar-month-ea0e93",
    "colorTextCodeEditorGutterActiveLine": "--color-text-code-editor-gutter-active-line-2addhd",
    "colorTextCodeEditorGutterDefault": "--color-text-code-editor-gutter-default-nlshs8",
    "colorTextCodeEditorStatusBarDisabled": "--color-text-code-editor-status-bar-disabled-xxmtlc",
    "colorTextCodeEditorTabButtonError": "--color-text-code-editor-tab-button-error-avwh01",
    "colorTextColumnHeader": "--color-text-column-header-e6urd1",
    "colorTextColumnSortingIcon": "--color-text-column-sorting-icon-fngn77",
    "colorTextControlDisabled": "--color-text-control-disabled-upk9lz",
    "colorTextCounter": "--color-text-counter-bywf75",
    "colorTextDisabled": "--color-text-disabled-rox5hg",
    "colorTextDisabledInlineEdit": "--color-text-disabled-inline-edit-1cbiz8",
    "colorTextDropdownFooter": "--color-text-dropdown-footer-umcot2",
    "colorTextDropdownGroupLabel": "--color-text-dropdown-group-label-2tmyik",
    "colorTextDropdownItemDefault": "--color-text-dropdown-item-default-f1jr9u",
    "colorTextDropdownItemDimmed": "--color-text-dropdown-item-dimmed-tq8vh3",
    "colorTextDropdownItemDisabled": "--color-text-dropdown-item-disabled-8m65hf",
    "colorTextDropdownItemFilterMatch": "--color-text-dropdown-item-filter-match-ebhvct",
    "colorTextDropdownItemHighlighted": "--color-text-dropdown-item-highlighted-yr1px8",
    "colorTextDropdownItemSecondary": "--color-text-dropdown-item-secondary-v12lfh",
    "colorTextDropdownItemSecondaryHover": "--color-text-dropdown-item-secondary-hover-de15wb",
    "colorTextEmpty": "--color-text-empty-tlohug",
    "colorTextExpandableSectionDefault": "--color-text-expandable-section-default-ynw8my",
    "colorTextExpandableSectionHover": "--color-text-expandable-section-hover-ojzwhd",
    "colorTextExpandableSectionNavigationIconDefault": "--color-text-expandable-section-navigation-icon-default-mklu1s",
    "colorTextFormDefault": "--color-text-form-default-47mtz6",
    "colorTextFormLabel": "--color-text-form-label-6sbm75",
    "colorTextFormSecondary": "--color-text-form-secondary-1nm780",
    "colorTextGroupLabel": "--color-text-group-label-a2qc05",
    "colorTextLabelGenAi": "--color-text-label-gen-ai-a2n3od",
    "colorTextHeadingDefault": "--color-text-heading-default-izpp46",
    "colorTextHeadingSecondary": "--color-text-heading-secondary-iwtvf6",
    "colorTextHomeHeaderDefault": "--color-text-home-header-default-morg6i",
    "colorTextHomeHeaderSecondary": "--color-text-home-header-secondary-i4jhp7",
    "colorTextIconCaret": "--color-text-icon-caret-9mqubk",
    "colorTextIconSubtle": "--color-text-icon-subtle-3sgxlr",
    "colorTextInputDisabled": "--color-text-input-disabled-wh1f3y",
    "colorTextInputPlaceholder": "--color-text-input-placeholder-dclg8u",
    "colorTextInputPlaceholderDisabled": "--color-text-input-placeholder-disabled-wg87og",
    "colorTextInteractiveActive": "--color-text-interactive-active-uoe6zi",
    "colorTextInteractiveDefault": "--color-text-interactive-default-ugh9wp",
    "colorTextInteractiveDisabled": "--color-text-interactive-disabled-1bqmrl",
    "colorTextInteractiveHover": "--color-text-interactive-hover-6naf7i",
    "colorTextToggleButtonIconPressed": "--color-text-toggle-button-icon-pressed-detfkz",
    "colorTextInteractiveInvertedDefault": "--color-text-interactive-inverted-default-xlc0d5",
    "colorTextInteractiveInvertedHover": "--color-text-interactive-inverted-hover-65rnp7",
    "colorTextInverted": "--color-text-inverted-4v4dmq",
    "colorTextLabel": "--color-text-label-28gfmc",
    "colorTextKeyValuePairsValue": "--color-text-key-value-pairs-value-pezok9",
    "colorTextLayoutToggle": "--color-text-layout-toggle-1a15s3",
    "colorTextLayoutToggleActive": "--color-text-layout-toggle-active-ifu7qp",
    "colorTextLayoutToggleHover": "--color-text-layout-toggle-hover-9jwdce",
    "colorTextLayoutToggleSelected": "--color-text-layout-toggle-selected-xpximc",
    "colorTextLinkDefault": "--color-text-link-default-hude44",
    "colorTextLinkHover": "--color-text-link-hover-2hfec2",
    "colorTextLinkDecorationDefault": "--color-text-link-decoration-default-0x8fhu",
    "colorTextLinkDecorationHover": "--color-text-link-decoration-hover-kui2t9",
    "colorTextLinkSecondaryDefault": "--color-text-link-secondary-default-4p0gj8",
    "colorTextLinkSecondaryHover": "--color-text-link-secondary-hover-0kzmc4",
    "colorTextLinkInfoDefault": "--color-text-link-info-default-mrmt1i",
    "colorTextLinkInfoHover": "--color-text-link-info-hover-mu3ega",
    "colorTextLinkInvertedHover": "--color-text-link-inverted-hover-ocd3u3",
    "colorTextLinkButtonUnderline": "--color-text-link-button-underline-z4wjnv",
    "colorTextLinkButtonUnderlineHover": "--color-text-link-button-underline-hover-cn3mqh",
    "colorTextNotificationDefault": "--color-text-notification-default-1iey72",
    "colorTextNotificationStackBar": "--color-text-notification-stack-bar-tjj0ek",
    "colorTextNotificationYellow": "--color-text-notification-yellow-vjtdxk",
    "colorTextPaginationPageNumberActiveDisabled": "--color-text-pagination-page-number-active-disabled-gfl43p",
    "colorTextPaginationPageNumberDefault": "--color-text-pagination-page-number-default-74j15c",
    "colorTextSegmentActive": "--color-text-segment-active-hlorbe",
    "colorTextSegmentDefault": "--color-text-segment-default-vi2vn9",
    "colorTextSegmentHover": "--color-text-segment-hover-65a2x8",
    "colorTextSmall": "--color-text-small-m1tr70",
    "colorTextStatusError": "--color-text-status-error-ksqavh",
    "colorTextStatusInactive": "--color-text-status-inactive-gy7337",
    "colorTextStatusInfo": "--color-text-status-info-ue8bd2",
    "colorTextStatusSuccess": "--color-text-status-success-ybmii8",
    "colorTextStatusWarning": "--color-text-status-warning-6meo06",
    "colorTextTopNavigationTitle": "--color-text-top-navigation-title-en0v40",
    "colorTextTutorialHotspotDefault": "--color-text-tutorial-hotspot-default-xfv3ow",
    "colorTextTutorialHotspotHover": "--color-text-tutorial-hotspot-hover-92pxog",
    "colorBoardPlaceholderActive": "--color-board-placeholder-active-x6yfem",
    "colorBoardPlaceholderHover": "--color-board-placeholder-hover-5nov9c",
    "colorDragPlaceholderActive": "--color-drag-placeholder-active-ea1sgp",
    "colorDragPlaceholderHover": "--color-drag-placeholder-hover-qwadna",
    "colorDropzoneBackgroundDefault": "--color-dropzone-background-default-7efhmb",
    "colorDropzoneBackgroundHover": "--color-dropzone-background-hover-mi8rlm",
    "colorDropzoneTextDefault": "--color-dropzone-text-default-djdnme",
    "colorDropzoneTextHover": "--color-dropzone-text-hover-asw3rt",
    "colorDropzoneBorderDefault": "--color-dropzone-border-default-k648ha",
    "colorDropzoneBorderHover": "--color-dropzone-border-hover-otpag5",
    "colorGapGlobalDrawer": "--color-gap-global-drawer-nh699a",
    "colorTreeViewConnectorLine": "--color-tree-view-connector-line-1usxvn",
    "colorBackgroundActionCardDefault": "--color-background-action-card-default-src0mr",
    "colorBackgroundActionCardHover": "--color-background-action-card-hover-doobfp",
    "colorBackgroundActionCardActive": "--color-background-action-card-active-4mj226",
    "colorBorderActionCardDefault": "--color-border-action-card-default-dtywof",
    "colorBorderActionCardHover": "--color-border-action-card-hover-onrya1",
    "colorBorderActionCardActive": "--color-border-action-card-active-ak3vrv",
    "colorBorderActionCardDisabled": "--color-border-action-card-disabled-9xqqxt",
    "colorBackgroundActionCardDisabled": "--color-background-action-card-disabled-71qsdt",
    "colorTextActionCardDisabled": "--color-text-action-card-disabled-htx40i",
    "colorIconActionCardDefault": "--color-icon-action-card-default-anh0vz",
    "colorIconActionCardHover": "--color-icon-action-card-hover-qxq4pp",
    "colorIconActionCardActive": "--color-icon-action-card-active-rhp94s",
    "colorIconActionCardDisabled": "--color-icon-action-card-disabled-wm3kyf",
    "colorBackgroundSkeleton": "--color-background-skeleton-sjxg4n",
    "colorBackgroundSkeletonWave": "--color-background-skeleton-wave-1dy97d",
    "fontBoxValueLargeWeight": "--font-box-value-large-weight-wr00sw",
    "fontButtonLetterSpacing": "--font-button-letter-spacing-ufowe3",
    "fontChartDetailSize": "--font-chart-detail-size-9qr25q",
    "fontDecorationStyleLink": "--font-decoration-style-link-pk2xmp",
    "fontDecorationThicknessLink": "--font-decoration-thickness-link-uesuo7",
    "fontDecorationThicknessLinkDisplayL": "--font-decoration-thickness-link-display-l-6g5fyl",
    "fontDisplayLabelWeight": "--font-display-label-weight-zavpeo",
    "fontExpandableHeadingSize": "--font-expandable-heading-size-0uk059",
    "fontFamilyBase": "--font-family-base-gmnpzl",
    "fontFamilyDisplay": "--font-family-display-a93nj0",
    "fontFamilyHeading": "--font-family-heading-ugphat",
    "fontFamilyMonospace": "--font-family-monospace-q47m7k",
    "fontHeaderH2DescriptionLineHeight": "--font-header-h2-description-line-height-ts2s6o",
    "fontHeaderH2DescriptionSize": "--font-header-h2-description-size-g2wws3",
    "fontLinkButtonLetterSpacing": "--font-link-button-letter-spacing-imtxwq",
    "fontLinkButtonWeight": "--font-link-button-weight-vslyg9",
    "fontPanelHeaderLineHeight": "--font-panel-header-line-height-8xb2qj",
    "fontPanelHeaderSize": "--font-panel-header-size-33h9j8",
    "fontSizeBodyM": "--font-size-body-m-a7nh2n",
    "fontSizeBodyS": "--font-size-body-s-smc8cv",
    "fontSizeDisplayL": "--font-size-display-l-wa6woo",
    "fontSizeFormLabel": "--font-size-form-label-mxiqd7",
    "fontSizeHeadingL": "--font-size-heading-l-vnacx6",
    "fontSizeHeadingM": "--font-size-heading-m-170yiy",
    "fontSizeHeadingS": "--font-size-heading-s-zp08en",
    "fontSizeHeadingXl": "--font-size-heading-xl-wvkbur",
    "fontSizeHeadingXs": "--font-size-heading-xs-j8yzxv",
    "fontSizeKeyValuePairsLabel": "--font-size-key-value-pairs-label-1mmf3j",
    "fontSizeTabs": "--font-size-tabs-eeo215",
    "fontSmoothingMozOsx": "--font-smoothing-moz-osx-hbm0aq",
    "fontSmoothingWebkit": "--font-smoothing-webkit-oemolo",
    "fontWayfindingLinkActiveWeight": "--font-wayfinding-link-active-weight-ny4hup",
    "fontWeightAlertHeader": "--font-weight-alert-header-zg25o1",
    "fontWeightBold": "--font-weight-bold-fo1afg",
    "fontWeightBreadcrumbCurrent": "--font-weight-breadcrumb-current-v39mbh",
    "fontWeightButton": "--font-weight-button-0eg20c",
    "fontWeightDisplayL": "--font-weight-display-l-h5zsi8",
    "fontWeightFlashbarHeader": "--font-weight-flashbar-header-fg5kye",
    "fontWeightFormLabel": "--font-weight-form-label-mrg9ef",
    "fontWeightHeadingL": "--font-weight-heading-l-0t6dwc",
    "fontWeightHeadingM": "--font-weight-heading-m-zf82dr",
    "fontWeightHeadingS": "--font-weight-heading-s-lcx0ai",
    "fontWeightHeadingXl": "--font-weight-heading-xl-u3m4we",
    "fontWeightHeadingXs": "--font-weight-heading-xs-wqqpne",
    "fontWeightHeavy": "--font-weight-heavy-6yh4un",
    "fontWeightKeyValuePairsLabel": "--font-weight-key-value-pairs-label-zdidmd",
    "fontWeightLighter": "--font-weight-lighter-ldkoj5",
    "fontWeightNormal": "--font-weight-normal-cxw1m3",
    "fontWeightTabs": "--font-weight-tabs-ichxzl",
    "fontWeightTabsDisabled": "--font-weight-tabs-disabled-v5r551",
    "letterSpacingBodyS": "--letter-spacing-body-s-gq78ok",
    "letterSpacingDisplayL": "--letter-spacing-display-l-elyyxk",
    "letterSpacingHeadingL": "--letter-spacing-heading-l-5v6ibv",
    "letterSpacingHeadingM": "--letter-spacing-heading-m-29ewnk",
    "letterSpacingHeadingS": "--letter-spacing-heading-s-4st9ep",
    "letterSpacingHeadingXl": "--letter-spacing-heading-xl-ckkb6u",
    "letterSpacingHeadingXs": "--letter-spacing-heading-xs-fgog7a",
    "lineHeightBodyM": "--line-height-body-m-2mh3ke",
    "lineHeightBodyS": "--line-height-body-s-nu5hx1",
    "lineHeightDisplayL": "--line-height-display-l-vwanzp",
    "lineHeightFormLabel": "--line-height-form-label-asu26u",
    "lineHeightHeadingL": "--line-height-heading-l-mg5bx6",
    "lineHeightHeadingM": "--line-height-heading-m-uoaqdh",
    "lineHeightHeadingS": "--line-height-heading-s-hmi4vc",
    "lineHeightHeadingXl": "--line-height-heading-xl-hko6p0",
    "lineHeightHeadingXs": "--line-height-heading-xs-q9j004",
    "lineHeightKeyValuePairsLabel": "--line-height-key-value-pairs-label-x3ofa3",
    "lineHeightTabs": "--line-height-tabs-vpnjo7",
    "borderActiveWidth": "--border-active-width-axzm24",
    "borderCodeEditorStatusDividerWidth": "--border-code-editor-status-divider-width-4we6jf",
    "borderContainerStickyWidth": "--border-container-sticky-width-nri0ix",
    "borderContainerTopWidth": "--border-container-top-width-n1eke6",
    "borderControlFocusRingShadowSpread": "--border-control-focus-ring-shadow-spread-9mjajk",
    "borderControlInvalidFocusRingShadowSpread": "--border-control-invalid-focus-ring-shadow-spread-9jjf96",
    "borderDividerListWidth": "--border-divider-list-width-tdfx1x",
    "borderDividerSectionWidth": "--border-divider-section-width-uwo8my",
    "borderDropdownVirtualOffsetWidth": "--border-dropdown-virtual-offset-width-3wp954",
    "borderInvalidWidth": "--border-invalid-width-3xd6e1",
    "borderItemWidth": "--border-item-width-miijiw",
    "borderLineChartDashArray": "--border-line-chart-dash-array-desefi",
    "borderLineChartLineJoin": "--border-line-chart-line-join-aslwou",
    "borderLineChartWidth": "--border-line-chart-width-tesor1",
    "borderLinkFocusRingOutline": "--border-link-focus-ring-outline-1p0hnu",
    "borderLinkFocusRingShadowSpread": "--border-link-focus-ring-shadow-spread-39uvxr",
    "borderPanelHeaderWidth": "--border-panel-header-width-t1iq1m",
    "borderPanelTopWidth": "--border-panel-top-width-10990j",
    "borderRadiusActionCardDefault": "--border-radius-action-card-default-ejctkq",
    "borderRadiusActionCardEmbedded": "--border-radius-action-card-embedded-3y65t8",
    "borderRadiusAlert": "--border-radius-alert-syagf6",
    "borderRadiusBadge": "--border-radius-badge-exolfb",
    "borderRadiusButton": "--border-radius-button-7bgkcs",
    "borderRadiusCalendarDayFocusRing": "--border-radius-calendar-day-focus-ring-xvvbuc",
    "borderRadiusCardDefault": "--border-radius-card-default-d8ipr7",
    "borderRadiusCardEmbedded": "--border-radius-card-embedded-fvclp8",
    "borderRadiusChatBubble": "--border-radius-chat-bubble-haafsg",
    "borderRadiusCodeEditor": "--border-radius-code-editor-5palck",
    "borderRadiusContainer": "--border-radius-container-nsfwmm",
    "borderRadiusControlCircularFocusRing": "--border-radius-control-circular-focus-ring-yjhscw",
    "borderRadiusControlDefaultFocusRing": "--border-radius-control-default-focus-ring-1uabki",
    "borderRadiusDropdown": "--border-radius-dropdown-fgc2a1",
    "borderRadiusDropzone": "--border-radius-dropzone-eklq14",
    "borderRadiusFlashbar": "--border-radius-flashbar-pp1ptu",
    "borderRadiusInput": "--border-radius-input-7q0str",
    "borderRadiusItem": "--border-radius-item-iwaia5",
    "borderRadiusItemCardDefault": "--border-radius-item-card-default-pi9u8q",
    "borderRadiusItemCardEmbedded": "--border-radius-item-card-embedded-l0g6e3",
    "borderRadiusPopover": "--border-radius-popover-6fqb5w",
    "borderRadiusSkeleton": "--border-radius-skeleton-9lkvfi",
    "borderRadiusStatusIndicator": "--border-radius-status-indicator-fkcvdq",
    "borderRadiusTabsFocusRing": "--border-radius-tabs-focus-ring-o4qku1",
    "borderRadiusTiles": "--border-radius-tiles-wm1vgw",
    "borderRadiusToken": "--border-radius-token-ycnemh",
    "borderRadiusTutorialPanelItem": "--border-radius-tutorial-panel-item-ojaqxg",
    "borderTableStickyWidth": "--border-table-sticky-width-ai31mi",
    "borderWidthActionCardActive": "--border-width-action-card-active-pwtgzu",
    "borderWidthActionCardDefault": "--border-width-action-card-default-jy3kut",
    "borderWidthActionCardDisabled": "--border-width-action-card-disabled-rdvlbc",
    "borderWidthActionCardHover": "--border-width-action-card-hover-02l6fg",
    "borderWidthAlert": "--border-width-alert-tuifgy",
    "borderWidthAlertBlockEnd": "--border-width-alert-block-end-q8rr42",
    "borderWidthAlertBlockStart": "--border-width-alert-block-start-5wbfsk",
    "borderWidthAlertInlineEnd": "--border-width-alert-inline-end-9s426v",
    "borderWidthAlertInlineStart": "--border-width-alert-inline-start-gjm6m1",
    "borderWidthButton": "--border-width-button-jm0qg7",
    "borderWidthCard": "--border-width-card-x24gzt",
    "borderWidthCardSelected": "--border-width-card-selected-01i6br",
    "borderWidthDropdown": "--border-width-dropdown-youcay",
    "borderWidthField": "--border-width-field-2xc78x",
    "borderWidthIconBig": "--border-width-icon-big-ymgy42",
    "borderWidthIconLarge": "--border-width-icon-large-u645rg",
    "borderWidthIconMedium": "--border-width-icon-medium-b7icqv",
    "borderWidthIconNormal": "--border-width-icon-normal-9h7vj7",
    "borderWidthIconSmall": "--border-width-icon-small-z55i5t",
    "borderWidthItemCard": "--border-width-item-card-3wmyp3",
    "borderWidthItemCardHighlighted": "--border-width-item-card-highlighted-jay4ll",
    "borderWidthItemSelected": "--border-width-item-selected-yv93vd",
    "borderWidthPopover": "--border-width-popover-nflirh",
    "borderWidthToken": "--border-width-token-2ukdpu",
    "motionDurationExtraFast": "--motion-duration-extra-fast-l4w48j",
    "motionDurationExtraSlow": "--motion-duration-extra-slow-29bqym",
    "motionDurationFast": "--motion-duration-fast-unntf6",
    "motionDurationModerate": "--motion-duration-moderate-c9utmg",
    "motionDurationRefreshOnlyAmbient": "--motion-duration-refresh-only-ambient-sxpcba",
    "motionDurationRefreshOnlyFast": "--motion-duration-refresh-only-fast-zfibh6",
    "motionDurationRefreshOnlyMedium": "--motion-duration-refresh-only-medium-5rbn3k",
    "motionDurationRefreshOnlySlow": "--motion-duration-refresh-only-slow-ugjy90",
    "motionDurationAvatarGenAiGradient": "--motion-duration-avatar-gen-ai-gradient-84si5n",
    "motionDurationAvatarLoadingDots": "--motion-duration-avatar-loading-dots-1xxvis",
    "motionDurationRotate180": "--motion-duration-rotate-180-cxi9g7",
    "motionDurationRotate90": "--motion-duration-rotate-90-lyzb0k",
    "motionDurationShowPaced": "--motion-duration-show-paced-otsjh8",
    "motionDurationShowQuick": "--motion-duration-show-quick-tyvnyw",
    "motionDurationSlow": "--motion-duration-slow-zji5vl",
    "motionDurationTransitionQuick": "--motion-duration-transition-quick-mcm2y0",
    "motionDurationTransitionShowPaced": "--motion-duration-transition-show-paced-t8d1os",
    "motionDurationTransitionShowQuick": "--motion-duration-transition-show-quick-5jnnjz",
    "motionEasingEaseOutQuart": "--motion-easing-ease-out-quart-p9axhm",
    "motionEasingRefreshOnlyA": "--motion-easing-refresh-only-a-ccyqaz",
    "motionEasingRefreshOnlyB": "--motion-easing-refresh-only-b-44kz4o",
    "motionEasingRefreshOnlyC": "--motion-easing-refresh-only-c-cxy2sk",
    "motionEasingRefreshOnlyD": "--motion-easing-refresh-only-d-syj3g1",
    "motionEasingAvatarGenAiGradient": "--motion-easing-avatar-gen-ai-gradient-9fwaak",
    "motionEasingRotate180": "--motion-easing-rotate-180-7a58rc",
    "motionEasingRotate90": "--motion-easing-rotate-90-jhbqg9",
    "motionEasingShowPaced": "--motion-easing-show-paced-ym6eyn",
    "motionEasingShowQuick": "--motion-easing-show-quick-9hlj8q",
    "motionEasingTransitionQuick": "--motion-easing-transition-quick-qxak3i",
    "motionEasingTransitionShowPaced": "--motion-easing-transition-show-paced-x2k7uh",
    "motionEasingTransitionShowQuick": "--motion-easing-transition-show-quick-jz3lia",
    "motionEasingResponsive": "--motion-easing-responsive-hjj3ai",
    "motionEasingSticky": "--motion-easing-sticky-tn072u",
    "motionEasingExpressive": "--motion-easing-expressive-o5jqzg",
    "motionDurationResponsive": "--motion-duration-responsive-mehora",
    "motionDurationExpressive": "--motion-duration-expressive-cbdcwy",
    "motionDurationComplex": "--motion-duration-complex-tbdo30",
    "motionKeyframesFadeIn": "--motion-keyframes-fade-in-0r842q",
    "motionKeyframesFadeOut": "--motion-keyframes-fade-out-g7fgdu",
    "motionKeyframesStatusIconError": "--motion-keyframes-status-icon-error-wkou39",
    "motionKeyframesScalePopup": "--motion-keyframes-scale-popup-9iqcu0",
    "sizeCalendarGridWidth": "--size-calendar-grid-width-hv3136",
    "sizeControl": "--size-control-adm93y",
    "sizeIconBig": "--size-icon-big-7pq9l3",
    "sizeIconLarge": "--size-icon-large-mb6y6y",
    "sizeIconMedium": "--size-icon-medium-uv8xcz",
    "sizeIconNormal": "--size-icon-normal-levt08",
    "sizeTableSelectionHorizontal": "--size-table-selection-horizontal-qqiajd",
    "sizeVerticalInput": "--size-vertical-input-p1d7xx",
    "sizeVerticalPanelIconOffset": "--size-vertical-panel-icon-offset-z959cw",
    "spaceAlertActionLeft": "--space-alert-action-left-4s8zo5",
    "spaceAlertHorizontal": "--space-alert-horizontal-ul364s",
    "spaceAlertMessageRight": "--space-alert-message-right-mrjbnn",
    "spaceAlertVertical": "--space-alert-vertical-dlp5wr",
    "spaceButtonFocusOutlineGutter": "--space-button-focus-outline-gutter-jj138g",
    "spaceButtonHorizontal": "--space-button-horizontal-k0c786",
    "spaceButtonVertical": "--space-button-vertical-xaxp6x",
    "spaceTokenVertical": "--space-token-vertical-m3oh2a",
    "spaceFieldVertical": "--space-field-vertical-vm99qz",
    "spaceButtonIconFocusOutlineGutterVertical": "--space-button-icon-focus-outline-gutter-vertical-r44mtq",
    "spaceButtonIconOnlyHorizontal": "--space-button-icon-only-horizontal-i85hxi",
    "spaceButtonInlineIconFocusOutlineGutter": "--space-button-inline-icon-focus-outline-gutter-zbfgku",
    "spaceButtonModalDismissVertical": "--space-button-modal-dismiss-vertical-vqfxjd",
    "spaceCalendarGridFocusOutlineGutter": "--space-calendar-grid-focus-outline-gutter-vvh43m",
    "spaceCalendarGridSelectedFocusOutlineGutter": "--space-calendar-grid-selected-focus-outline-gutter-dy6gf8",
    "spaceCalendarGridGutter": "--space-calendar-grid-gutter-zojo6r",
    "spaceCardHorizontalDefault": "--space-card-horizontal-default-pihe12",
    "spaceCardHorizontalEmbedded": "--space-card-horizontal-embedded-sasxhu",
    "spaceCardVerticalDefault": "--space-card-vertical-default-e40tif",
    "spaceCardVerticalEmbedded": "--space-card-vertical-embedded-30pnhg",
    "spaceItemCardHorizontalDefault": "--space-item-card-horizontal-default-obq2ks",
    "spaceItemCardHorizontalEmbedded": "--space-item-card-horizontal-embedded-e0vef5",
    "spaceItemCardVerticalDefault": "--space-item-card-vertical-default-ppqfu4",
    "spaceItemCardVerticalEmbedded": "--space-item-card-vertical-embedded-zuozef",
    "spaceCodeEditorStatusFocusOutlineGutter": "--space-code-editor-status-focus-outline-gutter-o87hra",
    "spaceContainerContentTop": "--space-container-content-top-1wtqrc",
    "spaceContainerHeaderTop": "--space-container-header-top-am4vzw",
    "spaceContainerHeaderBottom": "--space-container-header-bottom-2taq8v",
    "spaceContainerHorizontal": "--space-container-horizontal-nqrzyh",
    "spaceContentHeaderPaddingBottom": "--space-content-header-padding-bottom-rvy5xz",
    "spaceDarkHeaderOverlapDistance": "--space-dark-header-overlap-distance-ld45ap",
    "spaceExpandableSectionIconOffsetTop": "--space-expandable-section-icon-offset-top-cntyn8",
    "spaceFieldHorizontal": "--space-field-horizontal-0aq2ch",
    "spaceFieldIconOffset": "--space-field-icon-offset-ikwzwx",
    "spaceFilteringTokenDismissButtonFocusOutlineGutter": "--space-filtering-token-dismiss-button-focus-outline-gutter-1iumy3",
    "spaceFilteringTokenOperationSelectFocusOutlineGutter": "--space-filtering-token-operation-select-focus-outline-gutter-jacx1t",
    "spaceFlashbarActionLeft": "--space-flashbar-action-left-rqk3ap",
    "spaceFlashbarDismissRight": "--space-flashbar-dismiss-right-ckhj91",
    "spaceFlashbarHorizontal": "--space-flashbar-horizontal-l63501",
    "spaceFlashbarVertical": "--space-flashbar-vertical-th71op",
    "spaceGridGutter": "--space-grid-gutter-whc3jp",
    "spaceKeyValueGap": "--space-key-value-gap-9glmqc",
    "spaceLayoutContentBottom": "--space-layout-content-bottom-zeb1g9",
    "spaceLayoutContentHorizontal": "--space-layout-content-horizontal-buc0zz",
    "spaceLayoutToggleDiameter": "--space-layout-toggle-diameter-j2qffw",
    "spaceLayoutTogglePadding": "--space-layout-toggle-padding-chwlhz",
    "spaceModalContentBottom": "--space-modal-content-bottom-nl6ceq",
    "spaceModalHorizontal": "--space-modal-horizontal-y5hnwp",
    "spacePanelContentBottom": "--space-panel-content-bottom-24c6lu",
    "spacePanelContentTop": "--space-panel-content-top-qvd1dr",
    "spacePanelDividerMarginHorizontal": "--space-panel-divider-margin-horizontal-yw31p0",
    "spacePanelHeaderVertical": "--space-panel-header-vertical-ckfgmy",
    "spacePanelNavLeft": "--space-panel-nav-left-wn0n7h",
    "spacePanelSideLeft": "--space-panel-side-left-u1m3s9",
    "spacePanelSideRight": "--space-panel-side-right-8wwirc",
    "spacePanelSplitTop": "--space-panel-split-top-3u4vky",
    "spacePanelSplitBottom": "--space-panel-split-bottom-ir16d7",
    "spaceSegmentedControlFocusOutlineGutter": "--space-segmented-control-focus-outline-gutter-x1ywqb",
    "spaceTabsContentTop": "--space-tabs-content-top-ju6qox",
    "spaceTabsFocusOutlineGutter": "--space-tabs-focus-outline-gutter-eerrg4",
    "spaceTabsVertical": "--space-tabs-vertical-3qxuiu",
    "spaceTableContentBottom": "--space-table-content-bottom-tlfqmq",
    "spaceTableEmbeddedHeaderTop": "--space-table-embedded-header-top-twu628",
    "spaceTableFooterHorizontal": "--space-table-footer-horizontal-l5g495",
    "spaceTableHeaderFocusOutlineGutter": "--space-table-header-focus-outline-gutter-ymwujm",
    "spaceTableHeaderHorizontal": "--space-table-header-horizontal-kb5ww2",
    "spaceTableHeaderToolsBottom": "--space-table-header-tools-bottom-d9u5kf",
    "spaceTableHeaderToolsFullPageBottom": "--space-table-header-tools-full-page-bottom-9m47g6",
    "spaceTableHorizontal": "--space-table-horizontal-suurzj",
    "spaceTreeViewIndentation": "--space-tree-view-indentation-xh9kis",
    "spaceTileGutter": "--space-tile-gutter-bi2bdv",
    "spaceActionCardHorizontalDefault": "--space-action-card-horizontal-default-su1e86",
    "spaceActionCardHorizontalEmbedded": "--space-action-card-horizontal-embedded-pb8pj4",
    "spaceActionCardVerticalDefault": "--space-action-card-vertical-default-zqb3v3",
    "spaceActionCardVerticalEmbedded": "--space-action-card-vertical-embedded-f1rm8a",
    "spaceActionCardDescriptionPaddingTop": "--space-action-card-description-padding-top-qw1sd7",
    "spaceActionCardContentPaddingTop": "--space-action-card-content-padding-top-bew8kj",
    "spaceOptionPaddingVertical": "--space-option-padding-vertical-d2srv9",
    "spaceOptionPaddingHorizontal": "--space-option-padding-horizontal-4taa4b",
    "spaceStatusIndicatorPaddingHorizontal": "--space-status-indicator-padding-horizontal-xv70fu",
    "spaceScaled2xNone": "--space-scaled-2x-none-987dp7",
    "spaceScaled2xXxxs": "--space-scaled-2x-xxxs-reumxj",
    "spaceScaled2xXxs": "--space-scaled-2x-xxs-e79hr1",
    "spaceScaled2xXs": "--space-scaled-2x-xs-bcbsqo",
    "spaceScaled2xS": "--space-scaled-2x-s-yr27d5",
    "spaceScaled2xM": "--space-scaled-2x-m-4euqsk",
    "spaceScaled2xL": "--space-scaled-2x-l-u5ida5",
    "spaceScaled2xXl": "--space-scaled-2x-xl-he48nr",
    "spaceScaled2xXxl": "--space-scaled-2x-xxl-sul5ey",
    "spaceScaled2xXxxl": "--space-scaled-2x-xxxl-bxyvwl",
    "spaceScaledNone": "--space-scaled-none-nfyouv",
    "spaceScaledXxxs": "--space-scaled-xxxs-oo06c7",
    "spaceScaledXxs": "--space-scaled-xxs-pfm1nx",
    "spaceScaledXs": "--space-scaled-xs-xwoogq",
    "spaceScaledS": "--space-scaled-s-8ozaad",
    "spaceScaledM": "--space-scaled-m-m892r9",
    "spaceScaledL": "--space-scaled-l-sej05l",
    "spaceScaledXl": "--space-scaled-xl-dunxp5",
    "spaceScaledXxl": "--space-scaled-xxl-6wgq96",
    "spaceScaledXxxl": "--space-scaled-xxxl-hwoy7j",
    "spaceStaticXxxs": "--space-static-xxxs-yidks1",
    "spaceStaticXxs": "--space-static-xxs-ns94dp",
    "spaceStaticXs": "--space-static-xs-gnm0mz",
    "spaceStaticS": "--space-static-s-t763lu",
    "spaceStaticM": "--space-static-m-m6qboo",
    "spaceStaticL": "--space-static-l-n53k41",
    "spaceStaticXl": "--space-static-xl-4tedi6",
    "spaceStaticXxl": "--space-static-xxl-ifa9j8",
    "spaceStaticXxxl": "--space-static-xxxl-tngnnz",
    "spaceNone": "--space-none-xk6qzf",
    "spaceXxxs": "--space-xxxs-pajhad",
    "spaceXxs": "--space-xxs-hwfkai",
    "spaceXs": "--space-xs-ymlm0b",
    "spaceS": "--space-s-tvghoh",
    "spaceM": "--space-m-dsumyt",
    "spaceL": "--space-l-2ud1p3",
    "spaceXl": "--space-xl-jfy3x4",
    "spaceXxl": "--space-xxl-32srm4",
    "spaceXxxl": "--space-xxxl-aut1u7",
    "shadowCard": "--shadow-card-hmrw4q",
    "shadowItemCard": "--shadow-item-card-282f8w",
    "shadowContainer": "--shadow-container-53ltfv",
    "shadowContainerActive": "--shadow-container-active-ypjjoc",
    "shadowDropdown": "--shadow-dropdown-isf0w4",
    "shadowDropup": "--shadow-dropup-2r02r5",
    "shadowFlashCollapsed": "--shadow-flash-collapsed-b68ip6",
    "shadowFlashSticky": "--shadow-flash-sticky-k69vye",
    "shadowModal": "--shadow-modal-kwgqht",
    "shadowPanel": "--shadow-panel-vk7iea",
    "shadowPanelToggle": "--shadow-panel-toggle-qddz27",
    "shadowPopover": "--shadow-popover-pkane9",
    "shadowSplitBottom": "--shadow-split-bottom-vlyulf",
    "shadowSplitSide": "--shadow-split-side-nyajix",
    "shadowSticky": "--shadow-sticky-lolw8j",
    "shadowStickyEmbedded": "--shadow-sticky-embedded-jmny8n",
    "shadowStickyColumnFirst": "--shadow-sticky-column-first-trcd2o",
    "shadowStickyColumnLast": "--shadow-sticky-column-last-qgh697"
  }
};

// node_modules/@cloudscape-design/components/theming/index.js
function applyTheme2({ theme, baseThemeId }) {
  return applyTheme({
    override: theme,
    preset,
    baseThemeId
  });
}
function generateThemeStylesheet2({ theme, baseThemeId }) {
  return generateThemeStylesheet({
    override: theme,
    preset,
    baseThemeId
  });
}
export {
  applyTheme2 as applyTheme,
  generateThemeStylesheet2 as generateThemeStylesheet
};
/*! Bundled license information:

@material/material-color-utilities/utils/math_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/color_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/viewing_conditions.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/cam16.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/hct_solver.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/hct.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/blend/blend.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/contrast/contrast.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dislike/dislike_analyzer.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/dynamic_color.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/palettes/tonal_palette.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/contrast_curve.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/tone_delta_pair.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/variant.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/material_dynamic_colors.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/dynamic_scheme.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/palettes/core_palette.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/lab_point_provider.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_wsmeans.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_map.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_wu.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_celebi.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_android.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/temperature/temperature_cache.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_content.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_expressive.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_fidelity.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_fruit_salad.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_monochrome.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_neutral.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_rainbow.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_tonal_spot.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_vibrant.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/score/score.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/string_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/image_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/theme_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/index.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=@cloudscape-design_components_theming.js.map
