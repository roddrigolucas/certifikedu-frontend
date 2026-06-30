"use client";
import {
  InternalStructuredItem,
  internal_default as internal_default2,
  radio_button_default,
  useContainerBreakpoints
} from "./chunk-O3V62YPV.js";
import {
  ContainerHeaderContextProvider,
  StickyHeaderContext,
  useStickyHeader
} from "./chunk-V6HLTBDJ.js";
import {
  CollectionLabelContext
} from "./chunk-7ITRMATN.js";
import "./chunk-J6UKYNCZ.js";
import {
  useMobile
} from "./chunk-J5AO3UDI.js";
import "./chunk-5JE6SL2T.js";
import {
  StatusIndicator
} from "./chunk-UUT4C247.js";
import {
  joinStrings
} from "./chunk-ICFQLI2S.js";
import {
  BuiltInErrorBoundary,
  FunnelSubStepContext,
  KeyCode,
  LinkDefaultVariantContext,
  custom_css_properties_default,
  fireNonCancelableEvent,
  internal_default,
  nodeBelongs,
  useContainerQuery,
  useFunnel,
  useFunnelStep,
  useFunnelSubStep,
  useInternalI18n,
  useModalContext
} from "./chunk-AF2UB4B7.js";
import {
  getAnalyticsLabelAttribute,
  getAnalyticsMetadataAttribute,
  getOverflowParents,
  getSubStepNameSelector,
  getSubStepSelector
} from "./chunk-M6E2PW6E.js";
import "./chunk-DLEXJQLO.js";
import {
  InternalBox
} from "./chunk-QRZONLZG.js";
import {
  processAttributes
} from "./chunk-UPYVBQFI.js";
import {
  SYSTEM,
  applyDisplayName,
  clsx_m_default,
  getBaseProps,
  useBaseComponent,
  useVisualRefresh
} from "./chunk-EFQZML4R.js";
import "./chunk-636W5DY3.js";
import "./chunk-Q5GZAUWR.js";
import "./chunk-CDGJA232.js";
import {
  createSingletonHandler,
  findUpUntil,
  getLogicalBoundingClientRect,
  useMergeRefs,
  useSingleTabStopNavigation,
  useUniqueId
} from "./chunk-5BBL4WRE.js";
import "./chunk-LAJ4J425.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/cards/index.js
var import_react8 = __toESM(require_react());

// node_modules/@cloudscape-design/components/container/internal.js
var import_react = __toESM(require_react());

// node_modules/@cloudscape-design/components/container/style.js
function getRootStyles(style) {
  var _a, _b, _c, _d, _e, _f;
  if (SYSTEM !== "core") {
    return {};
  }
  return {
    background: (_a = style === null || style === void 0 ? void 0 : style.root) === null || _a === void 0 ? void 0 : _a.background,
    borderColor: (_b = style === null || style === void 0 ? void 0 : style.root) === null || _b === void 0 ? void 0 : _b.borderColor,
    borderRadius: (_c = style === null || style === void 0 ? void 0 : style.root) === null || _c === void 0 ? void 0 : _c.borderRadius,
    borderWidth: (_d = style === null || style === void 0 ? void 0 : style.root) === null || _d === void 0 ? void 0 : _d.borderWidth,
    boxShadow: (_e = style === null || style === void 0 ? void 0 : style.root) === null || _e === void 0 ? void 0 : _e.boxShadow,
    color: (_f = style === null || style === void 0 ? void 0 : style.root) === null || _f === void 0 ? void 0 : _f.color
  };
}
function getContentStyles(style) {
  var _a, _b;
  if (SYSTEM !== "core") {
    return {};
  }
  return {
    paddingBlock: (_a = style === null || style === void 0 ? void 0 : style.content) === null || _a === void 0 ? void 0 : _a.paddingBlock,
    paddingInline: (_b = style === null || style === void 0 ? void 0 : style.content) === null || _b === void 0 ? void 0 : _b.paddingInline
  };
}
function getHeaderStyles(style) {
  var _a, _b, _c, _d;
  if (SYSTEM !== "core") {
    return {};
  }
  return {
    ...((_a = style === null || style === void 0 ? void 0 : style.root) === null || _a === void 0 ? void 0 : _a.background) && { background: "transparent" },
    // Fix for AWSUI-61442
    borderRadius: (_b = style === null || style === void 0 ? void 0 : style.root) === null || _b === void 0 ? void 0 : _b.borderRadius,
    paddingBlock: (_c = style === null || style === void 0 ? void 0 : style.header) === null || _c === void 0 ? void 0 : _c.paddingBlock,
    paddingInline: (_d = style === null || style === void 0 ? void 0 : style.header) === null || _d === void 0 ? void 0 : _d.paddingInline
  };
}
function getFooterStyles(style) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  if (SYSTEM !== "core") {
    return {};
  }
  return {
    borderColor: (_b = (_a = style === null || style === void 0 ? void 0 : style.footer) === null || _a === void 0 ? void 0 : _a.divider) === null || _b === void 0 ? void 0 : _b.borderColor,
    borderWidth: (_d = (_c = style === null || style === void 0 ? void 0 : style.footer) === null || _c === void 0 ? void 0 : _c.divider) === null || _d === void 0 ? void 0 : _d.borderWidth,
    paddingBlock: (_f = (_e = style === null || style === void 0 ? void 0 : style.footer) === null || _e === void 0 ? void 0 : _e.root) === null || _f === void 0 ? void 0 : _f.paddingBlock,
    paddingInline: (_h = (_g = style === null || style === void 0 ? void 0 : style.footer) === null || _g === void 0 ? void 0 : _g.root) === null || _h === void 0 ? void 0 : _h.paddingInline
  };
}
function getMediaStyles(mediaPosition, style) {
  var _a;
  if (SYSTEM !== "core") {
    return {};
  }
  return {
    borderRadius: (_a = style === null || style === void 0 ? void 0 : style.root) === null || _a === void 0 ? void 0 : _a.borderRadius,
    ...mediaPosition === "top" && { borderEndStartRadius: "0px", borderEndEndRadius: "0px" },
    ...mediaPosition === "side" && { borderStartEndRadius: "0px", borderEndEndRadius: "0px" }
  };
}

// node_modules/@cloudscape-design/components/container/analytics-metadata/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/container/analytics-metadata/styles.scoped.css";
var styles_css_default = {
  "header": "awsui_header_164jl_1ns0c_5"
};

// node_modules/@cloudscape-design/components/container/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/container/styles.scoped.css";
var styles_css_default2 = {
  "root": "awsui_root_14iqq_z2ga6_189",
  "fit-height": "awsui_fit-height_14iqq_z2ga6_222",
  "with-side-media": "awsui_with-side-media_14iqq_z2ga6_227",
  "variant-default": "awsui_variant-default_14iqq_z2ga6_230",
  "variant-stacked": "awsui_variant-stacked_14iqq_z2ga6_230",
  "refresh": "awsui_refresh_14iqq_z2ga6_238",
  "sticky-enabled": "awsui_sticky-enabled_14iqq_z2ga6_288",
  "with-stuck-sticky-header-at-bottom": "awsui_with-stuck-sticky-header-at-bottom_14iqq_z2ga6_294",
  "with-top-media": "awsui_with-top-media_14iqq_z2ga6_304",
  "content-wrapper": "awsui_content-wrapper_14iqq_z2ga6_309",
  "content-wrapper-fit-height": "awsui_content-wrapper-fit-height_14iqq_z2ga6_314",
  "media": "awsui_media_14iqq_z2ga6_321",
  "media-top": "awsui_media-top_14iqq_z2ga6_339",
  "media-side": "awsui_media-side_14iqq_z2ga6_344",
  "header": "awsui_header_14iqq_z2ga6_350",
  "header-full-page": "awsui_header-full-page_14iqq_z2ga6_355",
  "header-variant-embedded": "awsui_header-variant-embedded_14iqq_z2ga6_358",
  "header-sticky-enabled": "awsui_header-sticky-enabled_14iqq_z2ga6_358",
  "header-with-media": "awsui_header-with-media_14iqq_z2ga6_361",
  "header-sticky-disabled": "awsui_header-sticky-disabled_14iqq_z2ga6_367",
  "header-stuck": "awsui_header-stuck_14iqq_z2ga6_377",
  "header-variant-cards": "awsui_header-variant-cards_14iqq_z2ga6_387",
  "header-dynamic-height": "awsui_header-dynamic-height_14iqq_z2ga6_390",
  "with-paddings": "awsui_with-paddings_14iqq_z2ga6_396",
  "with-hidden-content": "awsui_with-hidden-content_14iqq_z2ga6_405",
  "header-variant-full-page": "awsui_header-variant-full-page_14iqq_z2ga6_463",
  "header-cover": "awsui_header-cover_14iqq_z2ga6_466",
  "content": "awsui_content_14iqq_z2ga6_309",
  "content-fit-height": "awsui_content-fit-height_14iqq_z2ga6_494",
  "content-inner": "awsui_content-inner_14iqq_z2ga6_500",
  "with-header": "awsui_with-header_14iqq_z2ga6_507",
  "footer": "awsui_footer_14iqq_z2ga6_511",
  "with-divider": "awsui_with-divider_14iqq_z2ga6_515"
};

// node_modules/@cloudscape-design/components/container/test-classes/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/container/test-classes/styles.scoped.css";
var styles_css_default3 = {
  "content-inner": "awsui_content-inner_1mwlm_oyjaq_5"
};

// node_modules/@cloudscape-design/components/container/internal.js
function InternalContainerAsSubstep(props) {
  const { subStepRef, funnelSubStepProps } = useFunnelSubStep();
  const modalContext = useModalContext();
  return import_react.default.createElement(InternalContainer, { ...props, __subStepRef: (modalContext === null || modalContext === void 0 ? void 0 : modalContext.isInModal) ? { current: null } : subStepRef, __funnelSubStepProps: (modalContext === null || modalContext === void 0 ? void 0 : modalContext.isInModal) ? {} : funnelSubStepProps });
}
function InternalContainer({ header, footer, children, variant = "default", disableHeaderPaddings = false, disableContentPaddings = false, disableFooterPaddings = false, fitHeight, media, style, __stickyOffset, __mobileStickyOffset, __stickyHeader = false, __internalRootRef, __disableFooterDivider = false, __hiddenContent = false, __headerRef, __fullPage = false, __disableStickyMobile = true, __funnelSubStepProps, __subStepRef, __contentKey, ...restProps }) {
  var _a;
  const isMobile = useMobile();
  const isRefresh = useVisualRefresh();
  const baseProps = getBaseProps(restProps);
  const rootRef = (0, import_react.useRef)(null);
  const headerRef = (0, import_react.useRef)(null);
  const { isSticky, isStuck, isStuckAtBottom, stickyStyles } = useStickyHeader(rootRef, headerRef, __stickyHeader, __stickyOffset, __mobileStickyOffset, __disableStickyMobile, __fullPage && isRefresh && !isMobile);
  const contentId = useUniqueId();
  const hasDynamicHeight = isRefresh && variant === "full-page";
  const mergedRef = useMergeRefs(rootRef, __internalRootRef);
  const headerMergedRef = useMergeRefs(headerRef, __headerRef);
  const shouldHaveStickyStyles = isSticky && !isMobile;
  const hasMedia = !!(media === null || media === void 0 ? void 0 : media.content);
  const mediaPosition = (_a = media === null || media === void 0 ? void 0 : media.position) !== null && _a !== void 0 ? _a : "top";
  return import_react.default.createElement(
    "div",
    { ...baseProps, ...__funnelSubStepProps, className: clsx_m_default(baseProps.className, styles_css_default2.root, styles_css_default2[`variant-${variant}`], fitHeight && styles_css_default2["fit-height"], hasMedia && (mediaPosition === "side" ? styles_css_default2["with-side-media"] : styles_css_default2["with-top-media"]), shouldHaveStickyStyles && [styles_css_default2["sticky-enabled"]], shouldHaveStickyStyles && isStuck && isStuckAtBottom && [styles_css_default2["with-stuck-sticky-header-at-bottom"]], isRefresh && styles_css_default2.refresh), ref: mergedRef, ...getAnalyticsLabelAttribute(`.${styles_css_default.header} h1, .${styles_css_default.header} h2, .${styles_css_default.header} h3`), style: getRootStyles(style) },
    hasMedia && import_react.default.createElement("div", { className: clsx_m_default(styles_css_default2[`media-${mediaPosition === "side" ? "side" : "top"}`], styles_css_default2.media), style: mediaPosition === "top" ? { ...getMediaStyles(mediaPosition, style), height: (media === null || media === void 0 ? void 0 : media.height) || "" } : { ...getMediaStyles(mediaPosition, style), width: (media === null || media === void 0 ? void 0 : media.width) || "" } }, media.content),
    import_react.default.createElement(
      "div",
      { id: contentId, ref: __subStepRef, key: __contentKey, className: clsx_m_default(styles_css_default2["content-wrapper"], fitHeight && styles_css_default2["content-wrapper-fit-height"]) },
      import_react.default.createElement(
        BuiltInErrorBoundary,
        { wrapper: (content) => import_react.default.createElement(InternalBox, { padding: "m" }, content) },
        header && import_react.default.createElement(
          ContainerHeaderContextProvider,
          null,
          import_react.default.createElement(
            StickyHeaderContext.Provider,
            { value: { isStuck, isStuckAtBottom } },
            import_react.default.createElement(
              "div",
              { className: clsx_m_default(isRefresh && styles_css_default2.refresh, styles_css_default2.header, styles_css_default.header, styles_css_default2[`header-variant-${variant}`], {
                [styles_css_default2["header-sticky-disabled"]]: __stickyHeader && !isSticky,
                [styles_css_default2["header-sticky-enabled"]]: isSticky,
                [styles_css_default2["header-dynamic-height"]]: hasDynamicHeight,
                [styles_css_default2["header-stuck"]]: isStuck,
                [styles_css_default2["with-paddings"]]: !disableHeaderPaddings,
                [styles_css_default2["with-hidden-content"]]: !children || __hiddenContent,
                [styles_css_default2["header-with-media"]]: hasMedia,
                [styles_css_default2["header-full-page"]]: __fullPage && isRefresh
              }), ref: headerMergedRef, style: {
                ...stickyStyles.style,
                ...getHeaderStyles(style)
              } },
              isStuck && !isMobile && isRefresh && __fullPage && import_react.default.createElement("div", { className: styles_css_default2["header-cover"] }),
              header
            )
          )
        ),
        import_react.default.createElement(
          "div",
          { className: clsx_m_default(styles_css_default2.content, fitHeight && styles_css_default2["content-fit-height"]) },
          import_react.default.createElement(
            "div",
            { className: clsx_m_default(styles_css_default2["content-inner"], styles_css_default3["content-inner"], {
              [styles_css_default2["with-paddings"]]: !disableContentPaddings,
              [styles_css_default2["with-header"]]: !!header
            }), style: getContentStyles(style) },
            import_react.default.createElement(BuiltInErrorBoundary, { wrapper: (content) => import_react.default.createElement(InternalBox, { padding: disableContentPaddings ? "m" : void 0 }, content) }, children)
          )
        ),
        footer && import_react.default.createElement("div", { className: clsx_m_default(styles_css_default2.footer, {
          [styles_css_default2["with-divider"]]: !__disableFooterDivider,
          [styles_css_default2["with-paddings"]]: !disableFooterPaddings
        }), style: getFooterStyles(style) }, footer)
      )
    )
  );
}

// node_modules/@cloudscape-design/components/internal/analytics/components/analytics-funnel.js
var import_react2 = __toESM(require_react());
var AnalyticsFunnelSubStep = ({ children, subStepIdentifier, subStepErrorContext }) => {
  const subStepId = useUniqueId("substep");
  const subStepSelector = getSubStepSelector(subStepId);
  const subStepNameSelector = getSubStepNameSelector(subStepId);
  const subStepRef = (0, import_react2.useRef)(null);
  const { subStepCount, onStepChange } = useFunnelStep();
  const mousePressed = (0, import_react2.useRef)(false);
  const isFocusedSubStep = (0, import_react2.useRef)(false);
  const focusCleanupFunction = (0, import_react2.useRef)(void 0);
  const { funnelState, funnelInteractionId } = useFunnel();
  const { stepNumber, stepNameSelector } = useFunnelStep();
  const newContext = {
    subStepIdentifier,
    subStepErrorContext,
    subStepSelector,
    subStepNameSelector,
    subStepId,
    subStepRef,
    mousePressed,
    isFocusedSubStep,
    focusCleanupFunction,
    isNestedSubStep: false
  };
  const inheritedContext = { ...(0, import_react2.useContext)(FunnelSubStepContext), isNestedSubStep: true };
  const isNested = Boolean(inheritedContext.subStepId);
  (0, import_react2.useEffect)(() => {
    if (!isNested) {
      subStepCount.current++;
      onStepChange();
      return () => {
        subStepCount.current--;
        onStepChange();
      };
    }
  }, [isNested, subStepCount, onStepChange]);
  const context = isNested ? inheritedContext : newContext;
  (0, import_react2.useEffect)(() => {
    if (isNested || !subStepRef.current) {
      return;
    }
    const onMouseDown = () => mousePressed.current = true;
    const onMouseUp = async () => {
      var _a;
      mousePressed.current = false;
      if (!isFocusedSubStep.current) {
        return;
      }
      await new Promise((r) => setTimeout(r, 1));
      if (!subStepRef.current || !document.activeElement || !nodeBelongs(subStepRef.current, document.activeElement)) {
        isFocusedSubStep.current = false;
        (_a = focusCleanupFunction.current) === null || _a === void 0 ? void 0 : _a.call(focusCleanupFunction);
      }
    };
    const controller = new AbortController();
    window.addEventListener("mousedown", onMouseDown, { signal: controller.signal });
    window.addEventListener("mouseup", onMouseUp, { signal: controller.signal });
    return () => {
      controller.abort();
    };
  }, [
    funnelInteractionId,
    funnelState,
    stepNameSelector,
    stepNumber,
    subStepNameSelector,
    subStepSelector,
    focusCleanupFunction,
    isNested,
    subStepRef
  ]);
  return import_react2.default.createElement(FunnelSubStepContext.Provider, { value: context }, typeof children === "function" ? children(context) : children);
};

// node_modules/@cloudscape-design/components/internal/hooks/use-mouse-down-target.js
var import_react3 = __toESM(require_react());
var useEventListenersSingleton = createSingletonHandler((setTarget) => {
  function handleMouseDown(event) {
    setTarget(event.target);
  }
  function handleKeyDown() {
    setTarget(null);
  }
  const controller = new AbortController();
  window.addEventListener("mousedown", handleMouseDown, { signal: controller.signal });
  window.addEventListener("keydown", handleKeyDown, { signal: controller.signal });
  return () => {
    controller.abort();
  };
});
function useMouseDownTarget() {
  const mouseDownTargetRef = (0, import_react3.useRef)(null);
  useEventListenersSingleton((target) => {
    mouseDownTargetRef.current = target;
  });
  return () => mouseDownTargetRef.current;
}

// node_modules/@cloudscape-design/components/item-card/internal.js
var import_react4 = __toESM(require_react());

// node_modules/@cloudscape-design/components/item-card/style.js
function getRootStyles2(style) {
  var _a, _b, _c, _d, _e;
  if (SYSTEM !== "core") {
    return {};
  }
  return {
    ...((_a = style === null || style === void 0 ? void 0 : style.root) === null || _a === void 0 ? void 0 : _a.background) && { [custom_css_properties_default.styleItemCardBackgroundDefault]: style.root.background },
    ...((_b = style === null || style === void 0 ? void 0 : style.root) === null || _b === void 0 ? void 0 : _b.borderRadius) && {
      [custom_css_properties_default.styleItemCardBorderRadius]: style.root.borderRadius,
      borderRadius: style.root.borderRadius
    },
    ...((_c = style === null || style === void 0 ? void 0 : style.root) === null || _c === void 0 ? void 0 : _c.borderColor) && { [custom_css_properties_default.styleItemCardBorderColorDefault]: style.root.borderColor },
    ...((_d = style === null || style === void 0 ? void 0 : style.root) === null || _d === void 0 ? void 0 : _d.borderWidth) && { [custom_css_properties_default.styleItemCardBorderWidthDefault]: style.root.borderWidth },
    ...((_e = style === null || style === void 0 ? void 0 : style.root) === null || _e === void 0 ? void 0 : _e.boxShadow) && { [custom_css_properties_default.styleItemCardBoxShadowDefault]: style.root.boxShadow }
  };
}
function getContentStyles2(style) {
  var _a, _b;
  if (SYSTEM !== "core") {
    return {};
  }
  return {
    ...((_a = style === null || style === void 0 ? void 0 : style.content) === null || _a === void 0 ? void 0 : _a.paddingBlock) && { paddingBlock: style.content.paddingBlock },
    ...((_b = style === null || style === void 0 ? void 0 : style.content) === null || _b === void 0 ? void 0 : _b.paddingInline) && { paddingInline: style.content.paddingInline }
  };
}
function getHeaderStyles2(style) {
  var _a, _b;
  if (SYSTEM !== "core") {
    return {};
  }
  return {
    ...((_a = style === null || style === void 0 ? void 0 : style.header) === null || _a === void 0 ? void 0 : _a.paddingBlock) && { paddingBlock: style.header.paddingBlock },
    ...((_b = style === null || style === void 0 ? void 0 : style.header) === null || _b === void 0 ? void 0 : _b.paddingInline) && { paddingInline: style.header.paddingInline }
  };
}
function getFooterStyles2(style) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
  if (SYSTEM !== "core") {
    return {};
  }
  const hasDivider = ((_b = (_a = style === null || style === void 0 ? void 0 : style.footer) === null || _a === void 0 ? void 0 : _a.divider) === null || _b === void 0 ? void 0 : _b.borderColor) || ((_d = (_c = style === null || style === void 0 ? void 0 : style.footer) === null || _c === void 0 ? void 0 : _c.divider) === null || _d === void 0 ? void 0 : _d.borderWidth);
  return {
    ...hasDivider && { borderBlockStartStyle: "solid" },
    ...((_f = (_e = style === null || style === void 0 ? void 0 : style.footer) === null || _e === void 0 ? void 0 : _e.divider) === null || _f === void 0 ? void 0 : _f.borderColor) && { borderBlockStartColor: style.footer.divider.borderColor },
    ...((_h = (_g = style === null || style === void 0 ? void 0 : style.footer) === null || _g === void 0 ? void 0 : _g.divider) === null || _h === void 0 ? void 0 : _h.borderWidth) && { borderBlockStartWidth: style.footer.divider.borderWidth },
    ...((_k = (_j = style === null || style === void 0 ? void 0 : style.footer) === null || _j === void 0 ? void 0 : _j.root) === null || _k === void 0 ? void 0 : _k.paddingBlock) && { paddingBlock: style.footer.root.paddingBlock },
    ...((_m = (_l = style === null || style === void 0 ? void 0 : style.footer) === null || _l === void 0 ? void 0 : _l.root) === null || _m === void 0 ? void 0 : _m.paddingInline) && { paddingInline: style.footer.root.paddingInline }
  };
}

// node_modules/@cloudscape-design/components/item-card/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/item-card/styles.scoped.css";
var styles_css_default4 = {
  "root": "awsui_root_n1fwt_dwmmw_153",
  "header-inner": "awsui_header-inner_n1fwt_dwmmw_185",
  "header": "awsui_header_n1fwt_dwmmw_185",
  "body": "awsui_body_n1fwt_dwmmw_194",
  "footer": "awsui_footer_n1fwt_dwmmw_202",
  "refresh": "awsui_refresh_n1fwt_dwmmw_268",
  "highlighted": "awsui_highlighted_n1fwt_dwmmw_271",
  "variant-embedded": "awsui_variant-embedded_n1fwt_dwmmw_278",
  "inner-card": "awsui_inner-card_n1fwt_dwmmw_278",
  "variant-default": "awsui_variant-default_n1fwt_dwmmw_278",
  "no-padding": "awsui_no-padding_n1fwt_dwmmw_284",
  "with-actions": "awsui_with-actions_n1fwt_dwmmw_309",
  "full-height": "awsui_full-height_n1fwt_dwmmw_355",
  "description": "awsui_description_n1fwt_dwmmw_359"
};

// node_modules/@cloudscape-design/components/item-card/test-classes/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/item-card/test-classes/styles.scoped.css";
var styles_css_default5 = {
  "icon": "awsui_icon_14an4_tn651_5",
  "body": "awsui_body_14an4_tn651_9",
  "description": "awsui_description_14an4_tn651_13",
  "header": "awsui_header_14an4_tn651_17",
  "footer": "awsui_footer_14an4_tn651_21"
};

// node_modules/@cloudscape-design/components/item-card/internal.js
function InternalItemCard({ actions, highlighted, children, className, header, description, footer, icon, style, metadataAttributes, nativeAttributes, onClick, disableHeaderPaddings, disableContentPaddings, disableFooterPaddings, fullHeight, variant = "default", __internalRootRef, ...restProps }) {
  const baseProps = getBaseProps(restProps);
  const isRefresh = useVisualRefresh();
  const headerRowEmpty = !header && !description && !icon && !actions;
  const rootAttributes = processAttributes({
    className: clsx_m_default(className, styles_css_default4.root, highlighted && styles_css_default4.highlighted, fullHeight && styles_css_default4["full-height"], isRefresh && styles_css_default4.refresh, styles_css_default4[`variant-${variant}`]),
    ...metadataAttributes,
    onClick,
    style: getRootStyles2(style)
  }, nativeAttributes, "Card");
  return import_react4.default.createElement(
    "div",
    { ref: __internalRootRef, ...baseProps, ...rootAttributes },
    import_react4.default.createElement(
      "div",
      { className: styles_css_default4["inner-card"] },
      !headerRowEmpty && import_react4.default.createElement(
        "div",
        { className: clsx_m_default(styles_css_default4.header, disableHeaderPaddings && styles_css_default4["no-padding"], !!actions && styles_css_default4["with-actions"]), style: getHeaderStyles2(style) },
        import_react4.default.createElement(InternalStructuredItem, { content: header && import_react4.default.createElement("div", { className: clsx_m_default(styles_css_default4["header-inner"], styles_css_default5.header) }, header), secondaryContent: description && import_react4.default.createElement("div", { className: clsx_m_default(styles_css_default4.description, styles_css_default5.description) }, description), icon: icon && import_react4.default.createElement("div", { className: styles_css_default5.icon }, icon), actions, disablePaddings: disableHeaderPaddings, wrapActions: false })
      ),
      children && import_react4.default.createElement("div", { className: clsx_m_default(styles_css_default4.body, styles_css_default5.body, disableContentPaddings && styles_css_default4["no-padding"]), style: getContentStyles2(style) }, children),
      footer && import_react4.default.createElement("div", { className: clsx_m_default(styles_css_default4.footer, styles_css_default5.footer, disableFooterPaddings && styles_css_default4["no-padding"]), style: getFooterStyles2(style) }, footer)
    )
  );
}

// node_modules/@cloudscape-design/components/table/selection/selection-control.js
var import_react5 = __toESM(require_react());

// node_modules/@cloudscape-design/components/table/selection/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/table/selection/styles.scoped.css";
var styles_css_default6 = {
  "root": "awsui_root_1s55x_14pps_145",
  "label": "awsui_label_1s55x_14pps_149",
  "label-top": "awsui_label-top_1s55x_14pps_163",
  "stud": "awsui_stud_1s55x_14pps_168"
};

// node_modules/@cloudscape-design/components/table/selection/selection-control.js
function SelectionControl({ selectionType, indeterminate = false, onShiftToggle, onFocusUp, onFocusDown, name, ariaLabel, ariaDescribedby, focusedComponent, rowIndex, itemKey, verticalAlign = "middle", onChange, ...sharedProps }) {
  const controlId = useUniqueId();
  const isMultiSelection = selectionType === "multi";
  const { navigationActive } = useSingleTabStopNavigation(null);
  const setShiftState = (event) => {
    if (isMultiSelection) {
      onShiftToggle === null || onShiftToggle === void 0 ? void 0 : onShiftToggle(event.shiftKey);
    }
  };
  const onMouseDownHandler = (event) => {
    setShiftState(event);
    if (isMultiSelection) {
      event.preventDefault();
    }
  };
  const handleKeyDown = (event) => {
    setShiftState(event);
    if (isMultiSelection && !navigationActive) {
      if (event.keyCode === KeyCode.up) {
        event.preventDefault();
        onFocusUp === null || onFocusUp === void 0 ? void 0 : onFocusUp(event);
      }
      if (event.keyCode === KeyCode.down) {
        event.preventDefault();
        onFocusDown === null || onFocusDown === void 0 ? void 0 : onFocusDown(event);
      }
    }
  };
  const handleClick = (event) => {
    const target = event.currentTarget;
    const nativeInput = target.tagName === "INPUT" ? target : target.querySelector("input");
    nativeInput === null || nativeInput === void 0 ? void 0 : nativeInput.focus();
  };
  const nativeInputAttributes = {};
  if (ariaLabel) {
    nativeInputAttributes["aria-label"] = ariaLabel;
  }
  if (ariaDescribedby) {
    nativeInputAttributes["aria-describedby"] = ariaDescribedby;
  }
  const selector = isMultiSelection ? import_react5.default.createElement(internal_default2, { ...sharedProps, onChange, showOutline: focusedComponent === "selection-control", controlId, "data-focus-id": "selection-control", indeterminate, ariaLabel, ariaDescribedby }) : import_react5.default.createElement(radio_button_default, { ...sharedProps, controlId, name, value: "", onSelect: onChange, nativeInputAttributes: Object.keys(nativeInputAttributes).length > 0 ? nativeInputAttributes : void 0, __skipNativeAttributesWarnings: ["aria-label", "aria-describedby"] });
  return import_react5.default.createElement(
    import_react5.default.Fragment,
    null,
    import_react5.default.createElement("label", { onKeyDown: handleKeyDown, onKeyUp: setShiftState, onMouseDown: onMouseDownHandler, onMouseUp: setShiftState, onClick: handleClick, htmlFor: controlId, className: clsx_m_default(styles_css_default6.label, styles_css_default6.root, verticalAlign === "top" && styles_css_default6["label-top"]), "aria-label": ariaLabel, title: ariaLabel, ...rowIndex !== void 0 && !sharedProps.disabled ? getAnalyticsMetadataAttribute({
      detail: {
        position: `${rowIndex + 1}`,
        item: itemKey || ""
      }
    }) : {} }, selector),
    import_react5.default.createElement("span", { className: styles_css_default6.stud, "aria-hidden": true }, " ")
  );
}

// node_modules/@cloudscape-design/components/table/utils.js
var applyTrackBy = (trackBy, item) => {
  if (typeof trackBy === "function") {
    return trackBy(item);
  }
  return item[trackBy];
};
var getItemKey = (trackBy, item, index) => {
  if (!trackBy) {
    return index;
  }
  return applyTrackBy(trackBy, item);
};
var getTrackableValue = (trackBy, item) => {
  if (!trackBy) {
    return item;
  }
  return applyTrackBy(trackBy, item);
};

// node_modules/@cloudscape-design/components/table/selection/utils.js
var SELECTION_ITEM = "selection-item";
var SELECTION_ROOT = "selection-root";
var ItemSet = class {
  constructor(trackBy, items) {
    this.map = /* @__PURE__ */ new Map();
    this.put = (item) => this.map.set.call(this.map, getTrackableValue(this.trackBy, item), item);
    this.has = (item) => this.map.has.call(this.map, getTrackableValue(this.trackBy, item));
    this.forEach = this.map.forEach.bind(this.map);
    this.trackBy = trackBy;
    items.forEach(this.put);
  }
};
var focusMarkers = {
  item: { ["data-" + SELECTION_ITEM]: "item" },
  all: { ["data-" + SELECTION_ITEM]: "all" },
  root: { ["data-" + SELECTION_ROOT]: "true" }
};

// node_modules/@cloudscape-design/components/table/selection/use-selection-focus-move.js
function useSelectionFocusMove(selectionType, totalItems) {
  if (selectionType !== "multi") {
    return {};
  }
  function moveFocus(sourceElement, fromIndex, direction) {
    let index = fromIndex;
    const rootContainer = findRootContainer(sourceElement);
    while (index >= -1 && index < totalItems) {
      index += direction;
      const control = findSelectionControlByIndex(rootContainer, index);
      if (control && !control.disabled) {
        control.focus();
        break;
      }
    }
  }
  const [moveFocusDown, moveFocusUp] = [1, -1].map((direction) => {
    return (event) => {
      const target = event.currentTarget;
      const itemNode = findUpUntil(target, (node) => node.dataset.selectionItem === "item");
      const fromIndex = Array.prototype.indexOf.call(itemNode.parentElement.children, itemNode);
      moveFocus(target, fromIndex, direction);
    };
  });
  return {
    moveFocusDown,
    moveFocusUp,
    moveFocus
  };
}
function findSelectionControlByIndex(rootContainer, index) {
  if (index === -1) {
    return rootContainer.querySelector(`[data-${SELECTION_ITEM}="all"] .${styles_css_default6.root} input`);
  }
  return rootContainer.querySelectorAll(`[data-${SELECTION_ITEM}="item"] .${styles_css_default6.root} input`)[index];
}
function findRootContainer(element) {
  return findUpUntil(element, (node) => node.dataset.selectionRoot === "true");
}

// node_modules/@cloudscape-design/components/table/selection/use-selection.js
var import_react6 = __toESM(require_react());
function useSelection(options) {
  const singleSelectionProps = useSingleSelection(options);
  const multiSelectionProps = useMultiSelection(options);
  switch (options.selectionType) {
    case "single":
      return singleSelectionProps;
    case "multi":
      return multiSelectionProps;
    default:
      return { isItemSelected: () => false };
  }
}
function useSingleSelection({ ariaLabels, isItemDisabled = () => false, onSelectionChange, selectedItems = [], selectionType, trackBy, setLastUserAction }) {
  const selectionControlName = useUniqueId();
  if (selectionType !== "single") {
    return { isItemSelected: () => false };
  }
  const selectedSet = new ItemSet(trackBy, selectedItems.slice(0, 1));
  const isItemSelected = selectedSet.has.bind(selectedSet);
  const handleToggleItem = (item) => {
    if (!isItemDisabled(item) && !isItemSelected(item)) {
      fireNonCancelableEvent(onSelectionChange, { selectedItems: [item] });
      setLastUserAction === null || setLastUserAction === void 0 ? void 0 : setLastUserAction("selection");
    }
  };
  return {
    isItemSelected,
    getItemSelectionProps: (item) => {
      var _a;
      return {
        name: selectionControlName,
        selectionType: "single",
        disabled: isItemDisabled(item),
        checked: isItemSelected(item),
        onChange: () => handleToggleItem(item),
        ariaLabel: joinStrings(ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.selectionGroupLabel, (_a = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.itemSelectionLabel) === null || _a === void 0 ? void 0 : _a.call(ariaLabels, { selectedItems }, item))
      };
    }
  };
}
function useMultiSelection({ ariaLabels, isItemDisabled = () => false, items, loading, onSelectionChange, selectedItems = [], selectionType, trackBy, setLastUserAction, totalItemsCount }) {
  const selectionControlName = useUniqueId();
  const [shiftPressed, setShiftPressed] = (0, import_react6.useState)(false);
  const [lastClickedItem, setLastClickedItem] = (0, import_react6.useState)(null);
  if (selectionType !== "multi") {
    return { isItemSelected: () => false };
  }
  const selectedSet = new ItemSet(trackBy, selectedItems);
  const isItemSelected = selectedSet.has.bind(selectedSet);
  let allItemsDisabled = true;
  let allEnabledItemsSelected = true;
  for (const item of items) {
    allItemsDisabled = allItemsDisabled && isItemDisabled(item);
    allEnabledItemsSelected = allEnabledItemsSelected && (isItemSelected(item) || isItemDisabled(item));
  }
  const allItemsCheckboxSelected = selectedItems.length > 0 && allEnabledItemsSelected;
  const allItemsCheckboxIndeterminate = selectedItems.length > 0 && !allEnabledItemsSelected;
  const itemIndexesMap = /* @__PURE__ */ new Map();
  items.forEach((item, i) => itemIndexesMap.set(getTrackableValue(trackBy, item), i));
  const getShiftSelectedItems = (item) => {
    const lastClickedItemIndex = lastClickedItem ? itemIndexesMap.get(getTrackableValue(trackBy, lastClickedItem)) : void 0;
    if (lastClickedItemIndex !== void 0) {
      const currentItemIndex = itemIndexesMap.get(getTrackableValue(trackBy, item));
      const start = Math.min(currentItemIndex, lastClickedItemIndex);
      const end = Math.max(currentItemIndex, lastClickedItemIndex);
      return items.slice(start, end + 1);
    }
    return [item];
  };
  const selectItems = (requestedItems) => {
    const newSelectedItems = [...selectedItems];
    requestedItems.forEach((newItem) => {
      if (!isItemSelected(newItem) && !isItemDisabled(newItem)) {
        newSelectedItems.push(newItem);
      }
    });
    return newSelectedItems;
  };
  const deselectItems = (requestedItems) => {
    const requestedItemsSet = new ItemSet(trackBy, requestedItems);
    const newSelectedItems = [];
    selectedItems.forEach((selectedItem) => {
      const shouldUnselect = requestedItemsSet.has(selectedItem);
      if (!shouldUnselect || isItemDisabled(selectedItem)) {
        newSelectedItems.push(selectedItem);
      }
    });
    return newSelectedItems;
  };
  const handleToggleAll = () => {
    const newSelectedItems = allEnabledItemsSelected ? deselectItems(items) : selectItems(items);
    fireNonCancelableEvent(onSelectionChange, { selectedItems: newSelectedItems });
    setLastUserAction === null || setLastUserAction === void 0 ? void 0 : setLastUserAction("selection");
  };
  const handleToggleItem = (item) => {
    if (!isItemDisabled(item)) {
      const requestedItems = shiftPressed ? getShiftSelectedItems(item) : [item];
      const selectedItems2 = isItemSelected(item) ? deselectItems(requestedItems) : selectItems(requestedItems);
      fireNonCancelableEvent(onSelectionChange, { selectedItems: selectedItems2 });
      setLastClickedItem(item);
      setLastUserAction === null || setLastUserAction === void 0 ? void 0 : setLastUserAction("selection");
    }
  };
  return {
    isItemSelected,
    getSelectAllProps: () => {
      var _a;
      return {
        name: selectionControlName,
        selectionType: "multi",
        disabled: allItemsDisabled || !!loading,
        checked: allItemsCheckboxSelected,
        indeterminate: allItemsCheckboxIndeterminate,
        onChange: handleToggleAll,
        ariaLabel: joinStrings(ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.selectionGroupLabel, (_a = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.allItemsSelectionLabel) === null || _a === void 0 ? void 0 : _a.call(ariaLabels, {
          selectedItems,
          itemsCount: totalItemsCount,
          selectedItemsCount: selectedItems.length
        })),
        selectionGroupLabel: ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.selectionGroupLabel
      };
    },
    getItemSelectionProps: (item) => {
      var _a;
      return {
        name: selectionControlName,
        selectionType: "multi",
        disabled: isItemDisabled(item),
        checked: isItemSelected(item),
        onChange: () => handleToggleItem(item),
        onShiftToggle: (value) => setShiftPressed(value),
        ariaLabel: joinStrings(ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.selectionGroupLabel, (_a = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.itemSelectionLabel) === null || _a === void 0 ? void 0 : _a.call(ariaLabels, { selectedItems }, item))
      };
    }
  };
}

// node_modules/@cloudscape-design/components/table/sticky-scrolling.js
function stickyScrolling(containerRef, stickyRef) {
  const scrollToTop = () => {
    if (!containerRef.current || !stickyRef.current) {
      return;
    }
    const scrollingOffset = calculateScrollingOffset(containerRef.current, stickyRef.current);
    if (scrollingOffset > 0) {
      scrollUpBy(scrollingOffset, containerRef.current);
    }
  };
  const scrollToItem = (item) => {
    if (!item || !containerRef.current || !stickyRef.current) {
      return;
    }
    const stickyBottom = getLogicalBoundingClientRect(stickyRef.current).insetBlockEnd;
    const scrollingOffset = stickyBottom - getLogicalBoundingClientRect(item).insetBlockStart;
    if (scrollingOffset > 0) {
      scrollUpBy(scrollingOffset, containerRef.current);
    }
  };
  return {
    scrollToTop,
    scrollToItem
  };
}
function calculateScrollingOffset(container, sticky) {
  const stickyRect = getLogicalBoundingClientRect(sticky);
  const containerRect = getLogicalBoundingClientRect(container);
  return stickyRect.insetBlockStart - containerRect.insetBlockStart;
}
function scrollUpBy(amount, container) {
  const parent = getOverflowParents(container);
  if (parent.length) {
    parent[0].scrollTop -= amount;
  } else {
    window.scrollTo({ top: window.pageYOffset - amount });
  }
}

// node_modules/@cloudscape-design/components/table/tools-header.js
var import_react7 = __toESM(require_react());

// node_modules/@cloudscape-design/components/table/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/table/styles.scoped.css";
var styles_css_default7 = {
  "root": "awsui_root_wih1l_1y83p_153",
  "tools": "awsui_tools_wih1l_1y83p_164",
  "tools-filtering": "awsui_tools-filtering_wih1l_1y83p_173",
  "tools-align-right": "awsui_tools-align-right_wih1l_1y83p_186",
  "tools-pagination": "awsui_tools-pagination_wih1l_1y83p_190",
  "tools-preferences": "awsui_tools-preferences_wih1l_1y83p_190",
  "tools-small": "awsui_tools-small_wih1l_1y83p_196",
  "table": "awsui_table_wih1l_1y83p_200",
  "table-layout-fixed": "awsui_table-layout-fixed_wih1l_1y83p_206",
  "wrapper": "awsui_wrapper_wih1l_1y83p_210",
  "variant-stacked": "awsui_variant-stacked_wih1l_1y83p_217",
  "wrapper-content-measure": "awsui_wrapper-content-measure_wih1l_1y83p_217",
  "variant-container": "awsui_variant-container_wih1l_1y83p_217",
  "has-footer": "awsui_has-footer_wih1l_1y83p_220",
  "has-header": "awsui_has-header_wih1l_1y83p_223",
  "cell-merged": "awsui_cell-merged_wih1l_1y83p_240",
  "cell-merged-content": "awsui_cell-merged-content_wih1l_1y83p_252",
  "empty": "awsui_empty_wih1l_1y83p_268",
  "loading": "awsui_loading_wih1l_1y83p_272",
  "selection-control": "awsui_selection-control_wih1l_1y83p_281",
  "selection-control-header": "awsui_selection-control-header_wih1l_1y83p_288",
  "header-secondary": "awsui_header-secondary_wih1l_1y83p_294",
  "variant-full-page": "awsui_variant-full-page_wih1l_1y83p_305",
  "table-has-header": "awsui_table-has-header_wih1l_1y83p_311",
  "header-controls": "awsui_header-controls_wih1l_1y83p_322",
  "variant-embedded": "awsui_variant-embedded_wih1l_1y83p_331",
  "variant-borderless": "awsui_variant-borderless_wih1l_1y83p_331",
  "footer-wrapper": "awsui_footer-wrapper_wih1l_1y83p_336",
  "footer": "awsui_footer_wih1l_1y83p_336",
  "footer-with-pagination": "awsui_footer-with-pagination_wih1l_1y83p_344",
  "footer-pagination": "awsui_footer-pagination_wih1l_1y83p_352",
  "thead-active": "awsui_thead-active_wih1l_1y83p_356",
  "row": "awsui_row_wih1l_1y83p_357",
  "row-selected": "awsui_row-selected_wih1l_1y83p_358"
};

// node_modules/@cloudscape-design/components/table/tools-header.js
function ToolsHeader({ header, filter, pagination, preferences, setLastUserAction }) {
  const [breakpoint, ref] = useContainerBreakpoints(["xs"]);
  const isHeaderString = typeof header === "string";
  const assignHeaderId = (0, import_react7.useContext)(CollectionLabelContext).assignId;
  const headingId = useUniqueId("heading");
  if (assignHeaderId !== void 0 && isHeaderString) {
    assignHeaderId(headingId);
  }
  const isSmall = breakpoint === "default";
  const hasTools = filter || pagination || preferences;
  const hasRightAlignedTools = !!(pagination || preferences);
  return import_react7.default.createElement(
    import_react7.default.Fragment,
    null,
    isHeaderString ? import_react7.default.createElement("span", { id: headingId }, header) : header,
    hasTools && import_react7.default.createElement(
      "div",
      { ref, className: clsx_m_default(styles_css_default7.tools, isSmall && styles_css_default7["tools-small"]) },
      filter && import_react7.default.createElement("div", { className: styles_css_default7["tools-filtering"], onClickCapture: () => setLastUserAction === null || setLastUserAction === void 0 ? void 0 : setLastUserAction("filter"), onKeyDownCapture: () => setLastUserAction === null || setLastUserAction === void 0 ? void 0 : setLastUserAction("filter") }, filter),
      hasRightAlignedTools && import_react7.default.createElement(
        "div",
        { className: styles_css_default7["tools-align-right"] },
        pagination && import_react7.default.createElement("div", { className: styles_css_default7["tools-pagination"], onClickCapture: () => setLastUserAction === null || setLastUserAction === void 0 ? void 0 : setLastUserAction("pagination") }, pagination),
        preferences && import_react7.default.createElement("div", { className: styles_css_default7["tools-preferences"], onClickCapture: () => setLastUserAction === null || setLastUserAction === void 0 ? void 0 : setLastUserAction("preferences") }, preferences)
      )
    )
  );
}

// node_modules/@cloudscape-design/components/cards/cards-layout-helper.js
var WIDTHS = [1920, 1400, 1200, 992, 768];
var defaultCardsPerRow = WIDTHS.map((value, index, widths) => ({
  minWidth: value,
  cards: widths.length + 1 - index
}));
var getCardsPerRow = (width, config) => {
  if (config.length === 0) {
    config = defaultCardsPerRow;
  }
  let cardsPerRow = 1;
  const sortedConfig = config.slice().map((value) => ({
    minWidth: value.minWidth || 0,
    cards: value.cards
  })).sort((a, b) => b.minWidth - a.minWidth);
  sortedConfig.some((layout) => {
    if (width >= layout.minWidth) {
      cardsPerRow = layout.cards;
      return true;
    }
  });
  return cardsPerRow;
};

// node_modules/@cloudscape-design/components/cards/analytics-metadata/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/cards/analytics-metadata/styles.scoped.css";
var styles_css_default8 = {
  "container": "awsui_container_6umcw_d7u8j_5",
  "cards-list": "awsui_cards-list_6umcw_d7u8j_9",
  "card-header": "awsui_card-header_6umcw_d7u8j_13"
};

// node_modules/@cloudscape-design/components/cards/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/cards/styles.scoped.css";
var styles_css_default9 = {
  "root": "awsui_root_p8a6i_1lot4_145",
  "header-variant-full-page": "awsui_header-variant-full-page_p8a6i_1lot4_177",
  "header-refresh": "awsui_header-refresh_p8a6i_1lot4_177",
  "list": "awsui_list_p8a6i_1lot4_184",
  "list-grid-1": "awsui_list-grid-1_p8a6i_1lot4_195",
  "card": "awsui_card_p8a6i_1lot4_195",
  "list-grid-2": "awsui_list-grid-2_p8a6i_1lot4_198",
  "list-grid-3": "awsui_list-grid-3_p8a6i_1lot4_201",
  "list-grid-4": "awsui_list-grid-4_p8a6i_1lot4_204",
  "list-grid-5": "awsui_list-grid-5_p8a6i_1lot4_207",
  "list-grid-6": "awsui_list-grid-6_p8a6i_1lot4_210",
  "list-grid-7": "awsui_list-grid-7_p8a6i_1lot4_213",
  "list-grid-8": "awsui_list-grid-8_p8a6i_1lot4_216",
  "list-grid-9": "awsui_list-grid-9_p8a6i_1lot4_219",
  "list-grid-10": "awsui_list-grid-10_p8a6i_1lot4_222",
  "list-grid-11": "awsui_list-grid-11_p8a6i_1lot4_225",
  "list-grid-12": "awsui_list-grid-12_p8a6i_1lot4_228",
  "list-grid-13": "awsui_list-grid-13_p8a6i_1lot4_231",
  "list-grid-14": "awsui_list-grid-14_p8a6i_1lot4_234",
  "list-grid-15": "awsui_list-grid-15_p8a6i_1lot4_237",
  "list-grid-16": "awsui_list-grid-16_p8a6i_1lot4_240",
  "list-grid-17": "awsui_list-grid-17_p8a6i_1lot4_243",
  "list-grid-18": "awsui_list-grid-18_p8a6i_1lot4_246",
  "list-grid-19": "awsui_list-grid-19_p8a6i_1lot4_249",
  "list-grid-20": "awsui_list-grid-20_p8a6i_1lot4_252",
  "selection-control": "awsui_selection-control_p8a6i_1lot4_256",
  "loading": "awsui_loading_p8a6i_1lot4_266",
  "empty": "awsui_empty_p8a6i_1lot4_267",
  "has-header": "awsui_has-header_p8a6i_1lot4_274",
  "refresh": "awsui_refresh_p8a6i_1lot4_277",
  "card-header": "awsui_card-header_p8a6i_1lot4_293",
  "card-header-inner": "awsui_card-header-inner_p8a6i_1lot4_302",
  "card-header-inner-selectable": "awsui_card-header-inner-selectable_p8a6i_1lot4_305",
  "card-selected": "awsui_card-selected_p8a6i_1lot4_308",
  "section": "awsui_section_p8a6i_1lot4_312",
  "section-header": "awsui_section-header_p8a6i_1lot4_319",
  "section-content": "awsui_section-content_p8a6i_1lot4_325",
  "footer-pagination": "awsui_footer-pagination_p8a6i_1lot4_337"
};

// node_modules/@cloudscape-design/components/cards/index.js
var Cards = import_react8.default.forwardRef(function({ items = [], cardDefinition, cardsPerRow = [], header, filter, pagination, preferences, empty, loading, loadingText, trackBy, selectedItems, selectionType, isItemDisabled, onSelectionChange, ariaLabels, visibleSections, stickyHeader, stickyHeaderVerticalOffset, variant = "container", renderAriaLive, firstIndex = 1, totalItemsCount, entireCardClickable, ...rest }, ref) {
  const { __internalRootRef } = useBaseComponent("Cards", {
    props: { entireCardClickable, selectionType, stickyHeader, variant },
    metadata: { usesVisibleSections: !!visibleSections }
  });
  const baseProps = getBaseProps(rest);
  const isRefresh = useVisualRefresh();
  const isMobile = useMobile();
  const computedVariant = isRefresh ? variant : "container";
  const headerIdRef = (0, import_react8.useRef)(void 0);
  const setHeaderRef = (0, import_react8.useCallback)((id) => {
    headerIdRef.current = id;
  }, []);
  const isLabelledByHeader = !(ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.cardsLabel) && !!header;
  const [columns, measureRef] = useContainerQuery(({ contentBoxWidth }) => getCardsPerRow(contentBoxWidth, cardsPerRow), [cardsPerRow]);
  const refObject = (0, import_react8.useRef)(null);
  const mergedRef = useMergeRefs(measureRef, refObject, __internalRootRef);
  const getMouseDownTarget = useMouseDownTarget();
  const i18n = useInternalI18n("cards");
  const { isItemSelected, getItemSelectionProps } = useSelection({
    items,
    trackBy,
    selectedItems,
    selectionType,
    isItemDisabled,
    onSelectionChange,
    ariaLabels: {
      itemSelectionLabel: ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.itemSelectionLabel,
      selectionGroupLabel: i18n("ariaLabels.selectionGroupLabel", ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.selectionGroupLabel)
    }
  });
  const hasToolsHeader = header || filter || pagination || preferences;
  const hasFooterPagination = isMobile && variant === "full-page" && !!pagination;
  const headerRef = (0, import_react8.useRef)(null);
  const { scrollToTop, scrollToItem } = stickyScrolling(refObject, headerRef);
  stickyHeader = !isMobile && stickyHeader;
  const onCardFocus = (event) => {
    if (stickyHeader && !event.currentTarget.contains(getMouseDownTarget())) {
      scrollToItem(event.currentTarget);
    }
  };
  (0, import_react8.useImperativeHandle)(ref, () => ({
    scrollToTop: () => {
      if (stickyHeader) {
        scrollToTop();
      }
    }
  }), [stickyHeader, scrollToTop]);
  let status;
  if (loading) {
    status = import_react8.default.createElement(
      "div",
      { className: styles_css_default9.loading },
      import_react8.default.createElement(
        StatusIndicator,
        { type: "loading" },
        import_react8.default.createElement(internal_default, { tagName: "span" }, loadingText)
      )
    );
  } else if (empty && !items.length) {
    status = import_react8.default.createElement("div", { className: styles_css_default9.empty }, empty);
  }
  const analyticsComponentMetadata = {
    name: "awsui.Cards",
    label: `.${styles_css_default8.container}`,
    properties: {
      selectionType: selectionType || "none",
      itemsCount: `${items.length}`,
      selectedItemsCount: `${(selectedItems || []).length}`,
      selectedItemsLabels: {
        root: "self",
        selector: `.${styles_css_default9["card-selected"]} .${styles_css_default8["card-header"]}`
      },
      variant
    }
  };
  if (trackBy) {
    analyticsComponentMetadata.properties.selectedItems = (selectedItems || []).map((item, index) => `${getItemKey(trackBy, item, index)}`);
  }
  return import_react8.default.createElement(
    LinkDefaultVariantContext.Provider,
    { value: { defaultVariant: "primary" } },
    import_react8.default.createElement(
      AnalyticsFunnelSubStep,
      null,
      import_react8.default.createElement(
        "div",
        { ...baseProps, className: clsx_m_default(baseProps.className, styles_css_default9.root), ref: mergedRef, ...getAnalyticsMetadataAttribute({ component: analyticsComponentMetadata }) },
        import_react8.default.createElement(
          InternalContainerAsSubstep,
          { header: hasToolsHeader && import_react8.default.createElement(
            "div",
            { className: clsx_m_default(styles_css_default9.header, isRefresh && styles_css_default9["header-refresh"], styles_css_default9[`header-variant-${computedVariant}`]) },
            import_react8.default.createElement(
              CollectionLabelContext.Provider,
              { value: { assignId: setHeaderRef } },
              import_react8.default.createElement(ToolsHeader, { header, filter, pagination, preferences })
            )
          ), footer: hasFooterPagination && import_react8.default.createElement("div", { className: styles_css_default9["footer-pagination"] }, pagination), disableContentPaddings: true, disableHeaderPaddings: computedVariant === "full-page", variant: computedVariant === "container" ? "cards" : computedVariant, __stickyHeader: stickyHeader, __stickyOffset: stickyHeaderVerticalOffset, __headerRef: headerRef, __fullPage: computedVariant === "full-page", __disableFooterDivider: true, className: styles_css_default8.container },
          import_react8.default.createElement(
            "div",
            { className: clsx_m_default(hasToolsHeader && styles_css_default9["has-header"], isRefresh && styles_css_default9.refresh, styles_css_default9[`header-variant-${computedVariant}`]) },
            !!renderAriaLive && !!firstIndex && import_react8.default.createElement(
              internal_default,
              { hidden: true, tagName: "span" },
              import_react8.default.createElement("span", null, renderAriaLive({ totalItemsCount, firstIndex, lastIndex: firstIndex + items.length - 1 }))
            ),
            status !== null && status !== void 0 ? status : import_react8.default.createElement(CardsList, { items, cardDefinition, trackBy, selectionType, columns, isItemSelected, getItemSelectionProps, visibleSections, onFocus: onCardFocus, ariaLabel: ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.cardsLabel, ariaLabelledby: isLabelledByHeader && headerIdRef.current ? headerIdRef.current : void 0, entireCardClickable })
          )
        )
      )
    )
  );
});
var cards_default = Cards;
var CardItem = ({ item, index, itemKey, cardDefinition, selectable, canClickEntireCard, selectionProps, isItemSelected, visibleSectionsDefinition, listItemRole, moveFocusDown, moveFocusUp, onFocus }) => {
  const cardId = useUniqueId("card:");
  const selected = isItemSelected(item);
  const disabled = selectionProps && selectionProps.disabled;
  const selectionAnalyticsMetadata = {
    action: selected ? "deselect" : "select",
    detail: {
      label: {
        selector: `.${styles_css_default8["cards-list"]} li:nth-child(${index + 1}) .${styles_css_default8["card-header"]}`,
        root: "component"
      },
      position: `${index + 1}`,
      item: `${itemKey}`
    }
  };
  const firstContentSectionIndex = selectionProps ? visibleSectionsDefinition.findIndex(({ content }) => !!content) : -1;
  const ariaDescribedby = firstContentSectionIndex >= 0 ? `${cardId}-section-${firstContentSectionIndex}` : void 0;
  return import_react8.default.createElement(
    "li",
    { className: clsx_m_default(styles_css_default9.card, {
      [styles_css_default9["card-selected"]]: selectable && selected
    }), onFocus, ...focusMarkers && focusMarkers.item, role: listItemRole, ...getAnalyticsMetadataAttribute({
      component: {
        innerContext: {
          position: `${index + 1}`,
          item: `${itemKey}`
        }
      }
    }) },
    import_react8.default.createElement(InternalItemCard, { fullHeight: true, highlighted: selectable && selected, header: import_react8.default.createElement(
      "div",
      { className: styles_css_default9["card-header"] },
      import_react8.default.createElement("div", { className: clsx_m_default(styles_css_default9["card-header-inner"], selectable && styles_css_default9["card-header-inner-selectable"], styles_css_default8["card-header"]) }, cardDefinition.header ? cardDefinition.header(item) : ""),
      selectionProps && import_react8.default.createElement(
        "div",
        { className: styles_css_default9["selection-control"], ...!canClickEntireCard && !disabled ? getAnalyticsMetadataAttribute(selectionAnalyticsMetadata) : {} },
        import_react8.default.createElement(SelectionControl, { onFocusDown: moveFocusDown, onFocusUp: moveFocusUp, ...selectionProps, ariaDescribedby })
      )
    ), metadataAttributes: canClickEntireCard && !disabled ? getAnalyticsMetadataAttribute(selectionAnalyticsMetadata) : {}, onClick: canClickEntireCard ? (event) => {
      var _a;
      selectionProps === null || selectionProps === void 0 ? void 0 : selectionProps.onChange();
      (_a = event.currentTarget.querySelector("input")) === null || _a === void 0 ? void 0 : _a.focus();
    } : void 0 }, visibleSectionsDefinition.length > 0 && visibleSectionsDefinition.map(({ width = 100, header, content, id }, sectionIndex) => import_react8.default.createElement(
      "div",
      { key: id || sectionIndex, id: selectionProps && sectionIndex === firstContentSectionIndex ? `${cardId}-section-${sectionIndex}` : void 0, className: styles_css_default9.section, style: { width: `${width}%` } },
      header ? import_react8.default.createElement("div", { className: styles_css_default9["section-header"] }, header) : "",
      content ? import_react8.default.createElement("div", { className: styles_css_default9["section-content"] }, content(item)) : ""
    )))
  );
};
var CardsList = ({ items, cardDefinition, trackBy, selectionType, columns, isItemSelected, getItemSelectionProps, visibleSections, onFocus, ariaLabelledby, ariaLabel, entireCardClickable }) => {
  const selectable = !!selectionType;
  const canClickEntireCard = selectable && !!entireCardClickable;
  const { moveFocusDown, moveFocusUp } = useSelectionFocusMove(selectionType, items.length);
  let visibleSectionsDefinition = cardDefinition.sections || [];
  visibleSectionsDefinition = visibleSections ? visibleSectionsDefinition.filter((section) => section.id && visibleSections.indexOf(section.id) !== -1) : visibleSectionsDefinition;
  let listRole = void 0;
  let listItemRole = void 0;
  if (selectable) {
    listRole = "group";
    listItemRole = "presentation";
  }
  return import_react8.default.createElement("ol", { className: clsx_m_default(styles_css_default9.list, styles_css_default9[`list-grid-${columns || 1}`], styles_css_default8["cards-list"]), role: listRole, "aria-labelledby": ariaLabelledby, "aria-label": ariaLabel, ...focusMarkers && focusMarkers.root }, items.map((item, index) => {
    const key = getItemKey(trackBy, item, index);
    const selectionProps = getItemSelectionProps ? getItemSelectionProps(item) : null;
    return import_react8.default.createElement(CardItem, { key, item, index, itemKey: key, cardDefinition, selectable, canClickEntireCard, selectionProps, isItemSelected, visibleSectionsDefinition, listItemRole, moveFocusDown, moveFocusUp, onFocus });
  }));
};
applyDisplayName(Cards, "Cards");
export {
  cards_default as default
};
//# sourceMappingURL=@cloudscape-design_components_cards.js.map
