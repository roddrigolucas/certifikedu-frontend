import {
  initAwsUiVersions,
  useComponentMetadata,
  useComponentMetrics,
  useFocusVisible,
  useRuntimeVisualRefresh
} from "./chunk-5BBL4WRE.js";
import {
  require_jsx_runtime
} from "./chunk-G6KX4V4D.js";
import "./chunk-LAJ4J425.js";
import "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/chat-components/loading-bar/index.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());

// node_modules/@cloudscape-design/chat-components/internal/environment.js
var PACKAGE_SOURCE = "chat-components";
var PACKAGE_VERSION = "1.0.0 (56da4c50)";
var THEME = "open-source-visual-refresh";
var ALWAYS_VISUAL_REFRESH = true;

// node_modules/@cloudscape-design/chat-components/internal/utils/get-visual-theme.js
var getVisualTheme = (theme, isVR) => {
  if (theme === "polaris" && isVR) {
    return "vr";
  }
  return theme;
};

// node_modules/@cloudscape-design/chat-components/internal/base-component/use-visual-refresh.js
var useVisualRefresh = ALWAYS_VISUAL_REFRESH ? () => true : useRuntimeVisualRefresh;

// node_modules/@cloudscape-design/chat-components/internal/base-component/use-base-component.js
initAwsUiVersions(PACKAGE_SOURCE, PACKAGE_VERSION);
function useBaseComponent(componentName, config) {
  const isVisualRefresh = useVisualRefresh();
  const theme = getVisualTheme(THEME, isVisualRefresh);
  useComponentMetrics(componentName, { packageSource: PACKAGE_SOURCE, packageVersion: PACKAGE_VERSION, theme }, config);
  useFocusVisible();
  const elementRef = useComponentMetadata(componentName, {
    packageName: PACKAGE_SOURCE,
    version: PACKAGE_VERSION,
    theme
  });
  return { __internalRootRef: elementRef };
}

// node_modules/@cloudscape-design/chat-components/internal/utils/apply-display-name.js
function applyDisplayName(component, displayName) {
  component.displayName = displayName;
}

// node_modules/@cloudscape-design/chat-components/loading-bar/internal.js
var import_jsx_runtime = __toESM(require_jsx_runtime());

// node_modules/@cloudscape-design/chat-components/node_modules/clsx/dist/clsx.m.js
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

// node_modules/@cloudscape-design/chat-components/internal/base-component/get-data-attributes.js
function getDataAttributes(props) {
  const result = {};
  Object.keys(props).forEach((prop) => {
    if (prop.startsWith("data-")) {
      result[prop] = props[prop];
    }
  });
  return result;
}

// node_modules/@cloudscape-design/chat-components/loading-bar/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/chat-components/loading-bar/styles.scoped.css";
var styles_css_default = {
  "root": "awsui_root_pac4k_jbpw1_11",
  "variant-gen-ai": "awsui_variant-gen-ai_pac4k_jbpw1_55",
  "variant-gen-ai-masked": "awsui_variant-gen-ai-masked_pac4k_jbpw1_56",
  "searchbar": "awsui_searchbar_pac4k_jbpw1_1",
  "searchbar-rtl": "awsui_searchbar-rtl_pac4k_jbpw1_1"
};

// node_modules/@cloudscape-design/chat-components/loading-bar/internal.js
function InternalLoadingBar({ variant, __internalRootRef, ...rest }) {
  return (0, import_jsx_runtime.jsx)("div", { ref: __internalRootRef, ...getDataAttributes(rest), className: clsx_m_default([styles_css_default.root, styles_css_default[`variant-${variant}`]]) });
}

// node_modules/@cloudscape-design/chat-components/loading-bar/index.js
function LoadingBar(props) {
  const baseComponentProps = useBaseComponent("LoadingBar", { props: { variant: props.variant } });
  return (0, import_jsx_runtime2.jsx)(InternalLoadingBar, { ...props, ...baseComponentProps });
}
applyDisplayName(LoadingBar, "LoadingBar");
export {
  LoadingBar as default
};
//# sourceMappingURL=@cloudscape-design_chat-components_loading-bar.js.map
