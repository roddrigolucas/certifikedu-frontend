import {
  Metrics,
  initAwsUiVersions,
  useComponentMetadata,
  useComponentMetrics,
  useFocusVisible,
  useRuntimeVisualRefresh
} from "./chunk-5BBL4WRE.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/node_modules/clsx/dist/clsx.m.js
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = ""; f < arguments.length; )
    (e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_m_default = clsx;

// node_modules/@cloudscape-design/components/internal/environment.js
var PACKAGE_SOURCE = "components";
var PACKAGE_VERSION = "3.0.0 (5ca6b745)";
var GIT_SHA = "5ca6b745";
var THEME = "open-source-visual-refresh";
var SYSTEM = "core";
var ALWAYS_VISUAL_REFRESH = true;

// node_modules/@cloudscape-design/components/internal/base-component/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/base-component/styles.scoped.css";

// node_modules/@cloudscape-design/components/internal/base-component/index.js
initAwsUiVersions(PACKAGE_SOURCE, PACKAGE_VERSION);
function getBaseProps(props) {
  const baseProps = {};
  Object.keys(props).forEach((prop) => {
    if (prop === "id" || prop === "className" || prop.match(/^data-/)) {
      baseProps[prop] = props[prop];
    }
  });
  return baseProps;
}

// node_modules/@cloudscape-design/components/internal/hooks/use-visual-mode/index.js
var useVisualRefresh = ALWAYS_VISUAL_REFRESH ? () => true : useRuntimeVisualRefresh;

// node_modules/@cloudscape-design/components/internal/utils/get-visual-theme.js
var getVisualTheme = (theme, isVR) => {
  if (theme === "polaris" && isVR) {
    return "vr";
  }
  return theme;
};

// node_modules/@cloudscape-design/components/internal/hooks/use-base-component/styles-check.js
var import_react = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/metrics.js
var metrics = new Metrics({ packageSource: PACKAGE_SOURCE, packageVersion: PACKAGE_VERSION, theme: THEME });

// node_modules/@cloudscape-design/components/internal/hooks/use-base-component/styles-check.js
function checkMissingStyles(ownerDocument) {
  if (!ownerDocument.defaultView) {
    return;
  }
  const result = getComputedStyle(ownerDocument.body).getPropertyValue(`--awsui-version-info-${GIT_SHA}`);
  if (!result) {
    console.error(`Missing AWS-UI CSS for theme "${THEME}", version "${PACKAGE_VERSION}", and git sha "${GIT_SHA}".`);
    metrics.sendOpsMetricObject("awsui-missing-css-asset", {});
  }
}
function documentReady(document2, callback) {
  var _a;
  if (document2.readyState === "complete") {
    callback();
  } else {
    (_a = document2.defaultView) === null || _a === void 0 ? void 0 : _a.addEventListener("load", () => callback(), { once: true });
  }
}
async function documentReadyAndIdle(document2, signal) {
  await new Promise((resolve, reject) => {
    signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    documentReady(document2, () => {
      setTimeout(() => requestIdleCallback(() => resolve()), 1e3);
    });
  });
  const stylesheets = Array.from(document2.querySelectorAll('link[rel="stylesheet"]'));
  await Promise.all(stylesheets.map((link) => {
    if (link.sheet) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      function cleanup(done) {
        link.removeEventListener("load", onLoad);
        link.removeEventListener("error", onError);
        signal.removeEventListener("abort", onAbort);
        done();
      }
      const onLoad = () => cleanup(resolve);
      const onError = () => cleanup(resolve);
      const onAbort = () => cleanup(() => reject(new DOMException("Aborted", "AbortError")));
      link.addEventListener("load", onLoad);
      link.addEventListener("error", onError);
      signal.addEventListener("abort", onAbort);
    });
  }));
}
var checkedDocs = /* @__PURE__ */ new WeakMap();
var checkMissingStylesOnce = (document2) => {
  const checked = checkedDocs.get(document2);
  if (!checked) {
    checkMissingStyles(document2);
    checkedDocs.set(document2, true);
  }
};
function useMissingStylesCheck(elementRef) {
  (0, import_react.useEffect)(() => {
    var _a, _b;
    if (typeof requestIdleCallback !== "function") {
      return;
    }
    const ownerDocument = (_b = (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.ownerDocument) !== null && _b !== void 0 ? _b : document;
    const abortController = new AbortController();
    documentReadyAndIdle(ownerDocument, abortController.signal).then(() => checkMissingStylesOnce(ownerDocument), (error) => {
      if (error.name !== "AbortError") {
        throw error;
      }
    });
    return () => abortController.abort();
  }, [elementRef]);
}

// node_modules/@cloudscape-design/components/internal/hooks/use-base-component/index.js
function useBaseComponent(componentName, config, analyticsMetadata) {
  const isVisualRefresh = useVisualRefresh();
  const theme = getVisualTheme(THEME, isVisualRefresh);
  useComponentMetrics(componentName, { packageSource: PACKAGE_SOURCE, packageVersion: PACKAGE_VERSION, theme }, config);
  const elementRef = useComponentMetadata(componentName, { packageName: PACKAGE_SOURCE, version: PACKAGE_VERSION, theme }, analyticsMetadata);
  useMissingStylesCheck(elementRef);
  useFocusVisible(elementRef);
  return { __internalRootRef: elementRef };
}

// node_modules/@cloudscape-design/components/internal/utils/apply-display-name.js
function applyDisplayName(component, displayName) {
  component.displayName = displayName;
}

export {
  clsx_m_default,
  PACKAGE_VERSION,
  SYSTEM,
  ALWAYS_VISUAL_REFRESH,
  getBaseProps,
  useVisualRefresh,
  metrics,
  useBaseComponent,
  applyDisplayName
};
//# sourceMappingURL=chunk-EFQZML4R.js.map
