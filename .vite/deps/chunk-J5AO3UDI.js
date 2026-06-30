import {
  createSingletonState
} from "./chunk-5BBL4WRE.js";

// node_modules/@cloudscape-design/components/internal/breakpoints.js
var BREAKPOINT_MAPPING = [
  ["xl", 1840],
  ["l", 1320],
  ["m", 1120],
  ["s", 912],
  ["xs", 688],
  ["xxs", 465],
  ["default", -1]
];
var mobileBreakpoint = BREAKPOINT_MAPPING.filter((b) => b[0] === "xs")[0][1];
var BREAKPOINTS_DESCENDING = BREAKPOINT_MAPPING.map(([bp]) => bp);
function matchBreakpointMapping(subset, actual) {
  const qualifyingBreakpoints = BREAKPOINT_MAPPING.slice(BREAKPOINTS_DESCENDING.indexOf(actual));
  for (const [breakpoint] of qualifyingBreakpoints) {
    const breakpointValue = subset[breakpoint];
    if (breakpointValue !== void 0) {
      return breakpointValue;
    }
  }
  return null;
}
function getMatchingBreakpoint(width, breakpointFilter) {
  for (const [breakpoint, breakpointWidth] of BREAKPOINT_MAPPING) {
    if (width > breakpointWidth && (!breakpointFilter || breakpointFilter.indexOf(breakpoint) !== -1)) {
      return breakpoint;
    }
  }
  return "default";
}
function getBreakpointValue(breakpoint) {
  return BREAKPOINT_MAPPING.find((bp) => bp[0] === breakpoint)[1];
}

// node_modules/@cloudscape-design/components/internal/hooks/use-mobile/index.js
var forceMobileModeSymbol = Symbol.for("awsui-force-mobile-mode");
function getIsMobile() {
  var _a;
  const forceMobileMode = globalThis[forceMobileModeSymbol];
  if (typeof forceMobileMode !== "undefined") {
    return forceMobileMode;
  }
  if (typeof window === "undefined") {
    return false;
  }
  if (window.matchMedia) {
    return (_a = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`)) === null || _a === void 0 ? void 0 : _a.matches;
  }
  return getMatchingBreakpoint(window.innerWidth, ["xs"]) !== "xs";
}
var useMobile = createSingletonState({
  initialState: () => getIsMobile(),
  factory: (handler) => {
    const listener = () => handler(getIsMobile());
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }
});

export {
  matchBreakpointMapping,
  getMatchingBreakpoint,
  getBreakpointValue,
  useMobile
};
//# sourceMappingURL=chunk-J5AO3UDI.js.map
