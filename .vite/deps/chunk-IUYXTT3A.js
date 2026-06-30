import {
  parseCountValue
} from "./chunk-A6RJQIQJ.js";
import {
  useTableComponentsContext
} from "./chunk-OEIH233U.js";
import {
  InfoLinkLabelContext
} from "./chunk-ONPXF3KM.js";
import {
  StickyHeaderContext,
  useContainerHeader
} from "./chunk-V6HLTBDJ.js";
import {
  CollectionLabelContext
} from "./chunk-7ITRMATN.js";
import {
  useMobile
} from "./chunk-J5AO3UDI.js";
import {
  DATA_ATTR_FUNNEL_KEY,
  FUNNEL_KEY_SUBSTEP_NAME,
  getAnalyticsLabelAttribute
} from "./chunk-M6E2PW6E.js";
import {
  clsx_m_default,
  getBaseProps,
  useVisualRefresh
} from "./chunk-EFQZML4R.js";
import {
  useUniqueId
} from "./chunk-5BBL4WRE.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/header/internal.js
var import_react2 = __toESM(require_react());

// node_modules/@cloudscape-design/components/header/analytics/use-table-integration.js
var import_react = __toESM(require_react());
var useTableIntegration = (countText) => {
  const tableComponentContext = useTableComponentsContext();
  const countValue = (0, import_react.useMemo)(() => {
    if (typeof countText === "string") {
      return parseCountValue(countText);
    } else {
      return void 0;
    }
  }, [countText]);
  (0, import_react.useEffect)(() => {
    var _a;
    if (((_a = tableComponentContext === null || tableComponentContext === void 0 ? void 0 : tableComponentContext.headerRef) === null || _a === void 0 ? void 0 : _a.current) && countValue !== void 0) {
      tableComponentContext.headerRef.current.totalCount = countValue;
      return () => {
        var _a2;
        (_a2 = tableComponentContext.headerRef.current) === null || _a2 === void 0 ? true : delete _a2.totalCount;
      };
    }
  }, [tableComponentContext === null || tableComponentContext === void 0 ? void 0 : tableComponentContext.headerRef, countValue]);
};

// node_modules/@cloudscape-design/components/header/analytics-metadata/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/header/analytics-metadata/styles.scoped.css";
var styles_css_default = {
  "heading-text": "awsui_heading-text_105ke_268sp_5"
};

// node_modules/@cloudscape-design/components/header/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/header/styles.scoped.css";
var styles_css_default2 = {
  "root": "awsui_root_2qdw9_1pryo_185",
  "refresh": "awsui_refresh_2qdw9_1pryo_221",
  "root-no-actions": "awsui_root-no-actions_2qdw9_1pryo_221",
  "root-variant-h2": "awsui_root-variant-h2_2qdw9_1pryo_224",
  "root-variant-h3": "awsui_root-variant-h3_2qdw9_1pryo_224",
  "root-has-description": "awsui_root-has-description_2qdw9_1pryo_224",
  "root-variant-h1": "awsui_root-variant-h1_2qdw9_1pryo_233",
  "main": "awsui_main_2qdw9_1pryo_243",
  "no-wrap": "awsui_no-wrap_2qdw9_1pryo_253",
  "main-variant-h1": "awsui_main-variant-h1_2qdw9_1pryo_259",
  "actions": "awsui_actions_2qdw9_1pryo_267",
  "actions-centered": "awsui_actions-centered_2qdw9_1pryo_272",
  "actions-variant-h1": "awsui_actions-variant-h1_2qdw9_1pryo_275",
  "actions-variant-h2": "awsui_actions-variant-h2_2qdw9_1pryo_279",
  "actions-variant-h3": "awsui_actions-variant-h3_2qdw9_1pryo_283",
  "title": "awsui_title_2qdw9_1pryo_299",
  "title-variant-h1": "awsui_title-variant-h1_2qdw9_1pryo_304",
  "title-variant-h2": "awsui_title-variant-h2_2qdw9_1pryo_311",
  "title-variant-h3": "awsui_title-variant-h3_2qdw9_1pryo_317",
  "virtual-space": "awsui_virtual-space_2qdw9_1pryo_338",
  "info": "awsui_info_2qdw9_1pryo_344",
  "description": "awsui_description_2qdw9_1pryo_348",
  "description-variant-h1": "awsui_description-variant-h1_2qdw9_1pryo_355",
  "description-variant-h2": "awsui_description-variant-h2_2qdw9_1pryo_359",
  "description-variant-h3": "awsui_description-variant-h3_2qdw9_1pryo_366",
  "heading": "awsui_heading_2qdw9_1pryo_377",
  "heading-variant-h1": "awsui_heading-variant-h1_2qdw9_1pryo_402",
  "heading-variant-h2": "awsui_heading-variant-h2_2qdw9_1pryo_407",
  "heading-variant-h3": "awsui_heading-variant-h3_2qdw9_1pryo_412",
  "heading-text": "awsui_heading-text_2qdw9_1pryo_418",
  "heading-text-variant-h1": "awsui_heading-text-variant-h1_2qdw9_1pryo_421",
  "heading-text-variant-h2": "awsui_heading-text-variant-h2_2qdw9_1pryo_430",
  "heading-text-variant-h3": "awsui_heading-text-variant-h3_2qdw9_1pryo_439",
  "counter": "awsui_counter_2qdw9_1pryo_449"
};

// node_modules/@cloudscape-design/components/header/internal.js
function InternalHeader({ variant, headingTagOverride, children, actions, counter, description, info, __internalRootRef, __disableActionsWrapping, __headingTagRef, __headingTagTabIndex, ...restProps }) {
  const isMobile = useMobile();
  const HeadingTag = headingTagOverride !== null && headingTagOverride !== void 0 ? headingTagOverride : variant === "awsui-h1-sticky" ? "h1" : variant;
  const { isStuck } = (0, import_react2.useContext)(StickyHeaderContext);
  const baseProps = getBaseProps(restProps);
  const isRefresh = useVisualRefresh();
  const assignHeaderId = (0, import_react2.useContext)(CollectionLabelContext).assignId;
  const isInContainer = useContainerHeader();
  const headingId = useUniqueId("heading");
  useTableIntegration(counter);
  if (assignHeaderId !== void 0) {
    assignHeaderId(headingId);
  }
  const dynamicVariant = !isMobile && isStuck ? "h2" : "h1";
  const variantOverride = variant === "awsui-h1-sticky" ? isRefresh ? dynamicVariant : "h2" : variant;
  return import_react2.default.createElement(
    "div",
    { ...baseProps, className: clsx_m_default(styles_css_default2.root, baseProps.className, styles_css_default2[`root-variant-${variantOverride}`], isRefresh && styles_css_default2.refresh, !actions && [styles_css_default2[`root-no-actions`]], description && [styles_css_default2[`root-has-description`]]), ref: __internalRootRef },
    import_react2.default.createElement(
      "div",
      { className: clsx_m_default(styles_css_default2.main, styles_css_default2[`main-variant-${variantOverride}`], isRefresh && styles_css_default2.refresh, __disableActionsWrapping && [styles_css_default2["no-wrap"]]) },
      import_react2.default.createElement(
        "div",
        { className: clsx_m_default(styles_css_default2.title, styles_css_default2[`title-variant-${variantOverride}`], isRefresh && styles_css_default2.refresh) },
        import_react2.default.createElement(
          HeadingTag,
          { className: clsx_m_default(styles_css_default2.heading, styles_css_default2[`heading-variant-${variantOverride}`]), ref: __headingTagRef, tabIndex: __headingTagTabIndex, ...getAnalyticsLabelAttribute(`.${styles_css_default["heading-text"]}`) },
          import_react2.default.createElement("span", { ...isInContainer ? { [DATA_ATTR_FUNNEL_KEY]: FUNNEL_KEY_SUBSTEP_NAME } : {}, className: clsx_m_default(styles_css_default2["heading-text"], styles_css_default["heading-text"], styles_css_default2[`heading-text-variant-${variantOverride}`]), id: headingId }, children),
          counter !== void 0 && import_react2.default.createElement(
            "span",
            { className: styles_css_default2.counter },
            " ",
            counter
          )
        ),
        info && import_react2.default.createElement(
          InfoLinkLabelContext.Provider,
          { value: headingId },
          import_react2.default.createElement("span", { className: styles_css_default2["virtual-space"] }, "  "),
          import_react2.default.createElement("span", { className: styles_css_default2.info }, info)
        )
      ),
      actions && import_react2.default.createElement("div", { className: clsx_m_default(styles_css_default2.actions, styles_css_default2[`actions-variant-${variantOverride}`], isRefresh && styles_css_default2.refresh, !__disableActionsWrapping && [styles_css_default2["actions-centered"]]) }, actions)
    ),
    import_react2.default.createElement(Description, { variantOverride }, description)
  );
}
function Description({ children, variantOverride }) {
  const isRefresh = useVisualRefresh();
  return children && import_react2.default.createElement("p", { className: clsx_m_default(styles_css_default2.description, styles_css_default2[`description-variant-${variantOverride}`], isRefresh && styles_css_default2.refresh) }, children) || null;
}

export {
  InternalHeader
};
//# sourceMappingURL=chunk-IUYXTT3A.js.map
