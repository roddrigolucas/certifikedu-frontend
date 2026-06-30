import {
  useVisualContext
} from "./chunk-AF2UB4B7.js";
import {
  ALWAYS_VISUAL_REFRESH,
  clsx_m_default,
  useVisualRefresh
} from "./chunk-EFQZML4R.js";
import {
  useCurrentMode,
  useDensityMode
} from "./chunk-5BBL4WRE.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/internal/hooks/use-previous/index.js
var import_react = __toESM(require_react());
var usePrevious = (value) => {
  const ref = (0, import_react.useRef)();
  (0, import_react.useEffect)(() => {
    ref.current = value;
  });
  return ref.current;
};

// node_modules/@cloudscape-design/components/internal/hooks/use-portal-mode-classes/index.js
function usePortalModeClasses(ref, options) {
  const colorMode = useCurrentMode(ref);
  const densityMode = useDensityMode(ref);
  const context = useVisualContext(ref);
  const visualRefreshWithClass = useVisualRefresh() && !ALWAYS_VISUAL_REFRESH;
  return clsx_m_default({
    "awsui-polaris-dark-mode awsui-dark-mode": colorMode === "dark",
    "awsui-polaris-compact-mode awsui-compact-mode": densityMode === "compact",
    "awsui-visual-refresh": visualRefreshWithClass,
    [`awsui-context-${context}`]: context && !(options === null || options === void 0 ? void 0 : options.resetVisualContext)
  });
}

export {
  usePortalModeClasses,
  usePrevious
};
//# sourceMappingURL=chunk-Y6WKMOSF.js.map
