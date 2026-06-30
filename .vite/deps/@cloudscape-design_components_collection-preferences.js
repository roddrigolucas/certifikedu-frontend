"use client";
import {
  internal_default as internal_default6
} from "./chunk-TXOTYGJJ.js";
import {
  InternalHeader
} from "./chunk-IUYXTT3A.js";
import "./chunk-A6RJQIQJ.js";
import {
  reset_contexts_for_modal_default
} from "./chunk-KHGLTFQ7.js";
import {
  useTableComponentsContext
} from "./chunk-OEIH233U.js";
import {
  flattenChildren,
  internal_default as internal_default5
} from "./chunk-NTNXT65H.js";
import {
  ScreenreaderOnly
} from "./chunk-6QZPSAOL.js";
import {
  checkControlled,
  isDevelopment
} from "./chunk-ZFEHNID6.js";
import "./chunk-WJTR4N7X.js";
import "./chunk-XKJOMHSK.js";
import {
  InfoLinkLabelContext
} from "./chunk-ONPXF3KM.js";
import {
  AbstractSwitch,
  InternalStructuredItem,
  getComputedAbstractSwitchState,
  internal_default as internal_default4,
  radio_button_default,
  useContainerBreakpoints
} from "./chunk-O3V62YPV.js";
import "./chunk-V6HLTBDJ.js";
import "./chunk-7ITRMATN.js";
import "./chunk-J6UKYNCZ.js";
import {
  matchBreakpointMapping
} from "./chunk-J5AO3UDI.js";
import {
  FormFieldContext,
  useFormFieldContext
} from "./chunk-5JE6SL2T.js";
import {
  joinStrings
} from "./chunk-ICFQLI2S.js";
import {
  BuiltInErrorBoundary,
  ButtonContext,
  FunnelMetrics,
  FunnelNameSelectorContext,
  InternalButton,
  KeyCode,
  ModalContext,
  PerformanceMetrics,
  PopoverContainer,
  Transition,
  arrow_default,
  body_default,
  custom_css_properties_default,
  fireNonCancelableEvent,
  focus_lock_default,
  internal_default,
  internal_default2,
  internal_default3,
  styles_css_default2 as styles_css_default,
  useContainerQuery,
  useForwardFocus,
  useFunnel,
  useFunnelStep,
  useFunnelSubStep,
  useInternalI18n
} from "./chunk-AF2UB4B7.js";
import {
  DATA_ATTR_FIELD_ERROR,
  DATA_ATTR_FIELD_LABEL,
  copyAnalyticsMetadataAttribute,
  getAnalyticsMetadataAttribute,
  getFieldSlotSeletor,
  getSubStepAllSelector,
  getTextFromSelector,
  scrollElementIntoView
} from "./chunk-M6E2PW6E.js";
import "./chunk-DLEXJQLO.js";
import {
  InternalBox
} from "./chunk-QRZONLZG.js";
import {
  with_native_attributes_default
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
  Portal,
  getIsRtl,
  getLogicalBoundingClientRect,
  getScrollInlineStart,
  nodeContains,
  useMergeRefs,
  useUniqueId,
  warnOnce
} from "./chunk-5BBL4WRE.js";
import {
  require_react_dom
} from "./chunk-LAJ4J425.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/collection-preferences/index.js
var import_react31 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/context/collection-preferences-metadata-context.js
var import_react = __toESM(require_react());
var CollectionPreferencesMetadata = (0, import_react.createContext)({});

// node_modules/@cloudscape-design/components/modal/internal.js
var import_react3 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/hooks/use-intersection-observer/index.js
var import_react2 = __toESM(require_react());
function useIntersectionObserver({ initialState = false } = {}) {
  const observerRef = (0, import_react2.useRef)(null);
  const [isIntersecting, setIsIntersecting] = (0, import_react2.useState)(initialState);
  const ref = (0, import_react2.useCallback)((targetElement) => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (targetElement) {
      let TopLevelIntersectionObserver = IntersectionObserver;
      try {
        if (window.top) {
          TopLevelIntersectionObserver = window.top.IntersectionObserver;
        }
      } catch {
      }
      observerRef.current = new TopLevelIntersectionObserver((entries) => {
        let latestEntry = entries[0];
        for (const entry of entries) {
          if (entry.time > latestEntry.time) {
            latestEntry = entry;
          }
        }
        setIsIntersecting(latestEntry.isIntersecting);
      });
      observerRef.current.observe(targetElement);
    }
  }, []);
  return { ref, isIntersecting };
}

// node_modules/@cloudscape-design/components/internal/utils/calculate-once.js
function calculateOnce(callback) {
  let result = void 0;
  return () => {
    if (result === void 0) {
      result = callback();
    }
    return result;
  };
}

// node_modules/@cloudscape-design/components/internal/utils/browser-scrollbar-size.js
var browserScrollbarSize = calculateOnce(() => {
  if (typeof document === "undefined") {
    return { width: 0, height: 0 };
  }
  const scrollDiv = document.createElement("div");
  scrollDiv.style.overflow = "scroll";
  scrollDiv.style.height = "100px";
  scrollDiv.style.width = "100px";
  scrollDiv.style.position = "absolute";
  scrollDiv.style.top = "-9999px";
  scrollDiv.style.left = "-9999px";
  document.body.appendChild(scrollDiv);
  const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  const height = scrollDiv.offsetHeight - scrollDiv.clientHeight;
  document.body.removeChild(scrollDiv);
  return { width, height };
});

// node_modules/@cloudscape-design/components/modal/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/modal/styles.scoped.css";
var styles_css_default2 = {
  "dialog": "awsui_dialog_1d2i7_e1im7_169",
  "modal-slide-up": "awsui_modal-slide-up_1d2i7_e1im7_1",
  "awsui-motion-fade-in-0": "awsui_awsui-motion-fade-in-0_1d2i7_e1im7_1",
  "refresh": "awsui_refresh_1d2i7_e1im7_192",
  "awsui-motion-scale-popup": "awsui_awsui-motion-scale-popup_1d2i7_e1im7_1",
  "root": "awsui_root_1d2i7_e1im7_225",
  "awsui-motion-fade-in": "awsui_awsui-motion-fade-in_1d2i7_e1im7_1",
  "hidden": "awsui_hidden_1d2i7_e1im7_302",
  "focus-lock": "awsui_focus-lock_1d2i7_e1im7_306",
  "position-top": "awsui_position-top_1d2i7_e1im7_314",
  "position-center": "awsui_position-center_1d2i7_e1im7_317",
  "small": "awsui_small_1d2i7_e1im7_331",
  "medium": "awsui_medium_1d2i7_e1im7_334",
  "large": "awsui_large_1d2i7_e1im7_337",
  "x-large": "awsui_x-large_1d2i7_e1im7_340",
  "xx-large": "awsui_xx-large_1d2i7_e1im7_343",
  "custom-width": "awsui_custom-width_1d2i7_e1im7_346",
  "max": "awsui_max_1d2i7_e1im7_349",
  "breakpoint-xs": "awsui_breakpoint-xs_1d2i7_e1im7_349",
  "custom-height": "awsui_custom-height_1d2i7_e1im7_354",
  "container": "awsui_container_1d2i7_e1im7_359",
  "custom-height-container": "awsui_custom-height-container_1d2i7_e1im7_399",
  "content": "awsui_content_1d2i7_e1im7_405",
  "no-paddings": "awsui_no-paddings_1d2i7_e1im7_410",
  "custom-height-content": "awsui_custom-height-content_1d2i7_e1im7_414",
  "header": "awsui_header_1d2i7_e1im7_419",
  "header--text": "awsui_header--text_1d2i7_e1im7_431",
  "footer": "awsui_footer_1d2i7_e1im7_435",
  "footer--rounded": "awsui_footer--rounded_1d2i7_e1im7_444",
  "dismiss-control": "awsui_dismiss-control_1d2i7_e1im7_456",
  "modal-open": "awsui_modal-open_1d2i7_e1im7_460"
};

// node_modules/@cloudscape-design/components/modal/body-scroll.js
var initialBodyPaddingRightStyle = void 0;
function disableBodyScrolling() {
  setBodyScrollbarPadding();
  document.body.classList.add(styles_css_default2["modal-open"]);
}
function enableBodyScrolling() {
  document.body.classList.remove(styles_css_default2["modal-open"]);
  restoreBodyScrollbarPadding();
}
function setBodyScrollbarPadding() {
  if (bodyHasScrollbar()) {
    initialBodyPaddingRightStyle = document.body.style.paddingRight;
    const initialBodyPaddingRight = computedBodyPaddingRightPixels();
    const scrollbarWidth = browserScrollbarSize().width;
    const newBodyPaddingRight = initialBodyPaddingRight + scrollbarWidth;
    document.body.style.paddingRight = newBodyPaddingRight + "px";
  }
}
function computedBodyPaddingRightPixels() {
  return parseInt(window.getComputedStyle(document.body).paddingRight, 10);
}
function restoreBodyScrollbarPadding() {
  if (initialBodyPaddingRightStyle) {
    document.body.style.setProperty("padding-right", initialBodyPaddingRightStyle);
  } else {
    document.body.style.removeProperty("padding-right");
  }
  initialBodyPaddingRightStyle = void 0;
}
function bodyHasScrollbar() {
  return document.body.clientWidth < window.innerWidth;
}

// node_modules/@cloudscape-design/components/modal/use-modal-dimensions.js
var MIN_CONTENT_HEIGHT = 60;
var MIN_MODAL_WIDTH = 320;
function useModalDimensions({ height, width, hasFooter }) {
  const [footerHeight, footerRef] = useContainerQuery((rect) => rect.borderBoxHeight);
  const [headerHeight, headerRef] = useContainerQuery((rect) => rect.borderBoxHeight);
  const minModalHeight = (headerHeight !== null && headerHeight !== void 0 ? headerHeight : 0) + (hasFooter ? footerHeight !== null && footerHeight !== void 0 ? footerHeight : 0 : 0) + MIN_CONTENT_HEIGHT;
  const constrainedHeight = Math.max(height !== null && height !== void 0 ? height : 0, minModalHeight);
  const constrainedWidth = Math.max(width !== null && width !== void 0 ? width : 0, MIN_MODAL_WIDTH);
  const hasCustomHeight = height !== void 0 && !Number.isNaN(height);
  const hasCustomWidth = width !== void 0 && !Number.isNaN(width);
  if (isDevelopment) {
    if (Number.isNaN(height)) {
      warnOnce("Modal", "Height is NaN and will not be set. This is likely a bug in your code.");
    } else if (hasCustomHeight && constrainedHeight !== height) {
      warnOnce("Modal", `Height (${height}px) is too small. Modal requires at least ${MIN_CONTENT_HEIGHT}px for content plus header/footer space (total: ${minModalHeight}px). Height will be adjusted to ${constrainedHeight}px.`);
    }
    if (Number.isNaN(width)) {
      warnOnce("Modal", "Width is NaN and will not be set. This is likely a bug in your code.");
    } else if (hasCustomWidth && constrainedWidth !== width) {
      warnOnce("Modal", `Width (${width}px) is below minimum (${MIN_MODAL_WIDTH}px) and will be adjusted to ${constrainedWidth}px.`);
    }
  }
  return {
    footerRef,
    headerRef,
    footerHeight,
    hasCustomHeight,
    hasCustomWidth,
    dialogCustomStyles: {
      ...hasCustomWidth && { [custom_css_properties_default.modalCustomWidth]: `${constrainedWidth}px` },
      ...hasCustomHeight && { [custom_css_properties_default.modalCustomHeight]: `${constrainedHeight}px` }
    }
  };
}

// node_modules/@cloudscape-design/components/modal/analytics-metadata/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/modal/analytics-metadata/styles.scoped.css";
var styles_css_default3 = {
  "header": "awsui_header_15dxs_1ns0c_5"
};

// node_modules/@cloudscape-design/components/modal/internal.js
function InternalModal({ modalRoot, getModalRoot, removeModalRoot, ...rest }) {
  return import_react3.default.createElement(
    Portal,
    { container: modalRoot, getContainer: getModalRoot, removeContainer: removeModalRoot },
    import_react3.default.createElement(PortaledModal, { ...rest })
  );
}
function PortaledModal({ size, visible, header, children, footer, disableContentPaddings, position = "center", onButtonClick = () => {
}, onDismiss, width, height, __internalRootRef, __injectAnalyticsComponentMetadata, __funnelProps, __funnelStepProps, __subStepRef, __subStepFunnelProps, referrerId, ...rest }) {
  var _a;
  const instanceUniqueId = useUniqueId();
  const headerId = `${rest.id || instanceUniqueId}-header`;
  const lastMouseDownElementRef = (0, import_react3.useRef)(null);
  const [breakpoint, breakpointsRef] = useContainerBreakpoints(["xs"]);
  const i18n = useInternalI18n("modal");
  const closeAriaLabel = i18n("closeAriaLabel", rest.closeAriaLabel);
  const refObject = (0, import_react3.useRef)(null);
  const mergedRef = useMergeRefs(breakpointsRef, refObject, __internalRootRef);
  const isRefresh = useVisualRefresh();
  const baseProps = getBaseProps(rest);
  const analyticsComponentMetadata = {
    name: "awsui.Modal",
    label: `.${styles_css_default3.header} h2`
  };
  const metadataAttribute = __injectAnalyticsComponentMetadata ? getAnalyticsMetadataAttribute({ component: analyticsComponentMetadata }) : {};
  const loadStartTime = (0, import_react3.useRef)(0);
  const loadCompleteTime = (0, import_react3.useRef)(0);
  const componentLoadingCount = (0, import_react3.useRef)(0);
  const performanceMetricLogged = (0, import_react3.useRef)(false);
  (0, import_react3.useEffect)(() => {
    return () => {
      enableBodyScrolling();
    };
  }, []);
  const resetModalPerformanceData = () => {
    loadStartTime.current = performance.now();
    loadCompleteTime.current = 0;
    performanceMetricLogged.current = false;
  };
  const emitTimeToContentReadyInModal = (loadCompleteTime2) => {
    var _a2;
    if (componentLoadingCount.current === 0 && loadStartTime.current && loadStartTime.current !== 0 && !performanceMetricLogged.current) {
      const timeToContentReadyInModal = loadCompleteTime2 - loadStartTime.current;
      PerformanceMetrics.modalPerformanceData({
        timeToContentReadyInModal,
        instanceIdentifier: instanceUniqueId,
        componentIdentifier: ((_a2 = headerTextRef.current) === null || _a2 === void 0 ? void 0 : _a2.textContent) || ""
      });
      performanceMetricLogged.current = true;
    }
  };
  const MODAL_READY_TIMEOUT = 100;
  (0, import_react3.useEffect)(() => {
    if (visible) {
      disableBodyScrolling();
      resetModalPerformanceData();
      setTimeout(() => {
        emitTimeToContentReadyInModal(loadStartTime.current);
      }, MODAL_READY_TIMEOUT);
    } else {
      enableBodyScrolling();
    }
  }, [visible]);
  (0, import_react3.useEffect)(() => {
    if (visible && refObject.current) {
      refObject.current.scrollTop = 0;
    }
  }, [visible]);
  const dismiss = (reason) => fireNonCancelableEvent(onDismiss, { reason });
  const onOverlayMouseDown = (event) => {
    lastMouseDownElementRef.current = event.target;
  };
  const onOverlayClick = (event) => {
    const overlay = refObject.current;
    const lastClicked = lastMouseDownElementRef.current;
    if (event.target === overlay && lastClicked === overlay) {
      dismiss("overlay");
    }
  };
  const onCloseButtonClick = () => dismiss("closeButton");
  const escKeyHandler = (event) => {
    if (event.keyCode === KeyCode.escape) {
      dismiss("keyboard");
    }
  };
  const { ref: stickySentinelRef, isIntersecting: footerStuck } = useIntersectionObserver();
  const headerTextRef = (0, import_react3.useRef)(null);
  const { subStepRef } = useFunnelSubStep();
  const { footerRef, headerRef, hasCustomHeight, hasCustomWidth, dialogCustomStyles, footerHeight } = useModalDimensions({
    height,
    width,
    hasFooter: !!footer
  });
  return import_react3.default.createElement(
    FunnelNameSelectorContext.Provider,
    { value: `.${styles_css_default2["header--text"]}` },
    import_react3.default.createElement(
      reset_contexts_for_modal_default,
      null,
      import_react3.default.createElement(
        ModalContext.Provider,
        { value: {
          isInModal: true,
          componentLoadingCount,
          emitTimeToContentReadyInModal
        } },
        import_react3.default.createElement(
          "div",
          { ...baseProps, ...__funnelProps, ...__funnelStepProps, className: clsx_m_default(styles_css_default2.root, { [styles_css_default2.hidden]: !visible }, baseProps.className, isRefresh && styles_css_default2.refresh), role: "dialog", "aria-labelledby": headerId, onMouseDown: onOverlayMouseDown, onClick: onOverlayClick, ref: mergedRef, style: footerHeight ? { scrollPaddingBottom: footerHeight } : void 0, "data-awsui-referrer-id": ((_a = subStepRef.current) === null || _a === void 0 ? void 0 : _a.id) || referrerId },
          import_react3.default.createElement(
            focus_lock_default,
            { disabled: !visible, autoFocus: true, restoreFocus: true, className: clsx_m_default(styles_css_default2["focus-lock"], styles_css_default2[`position-${position}`]) },
            import_react3.default.createElement(
              "div",
              { className: clsx_m_default(styles_css_default2.dialog, !hasCustomWidth && styles_css_default2[size], styles_css_default2[`breakpoint-${breakpoint}`], isRefresh && styles_css_default2.refresh, hasCustomWidth && styles_css_default2["custom-width"], hasCustomHeight && styles_css_default2["custom-height"]), style: dialogCustomStyles, onKeyDown: escKeyHandler, ...metadataAttribute },
              import_react3.default.createElement(
                "div",
                { className: clsx_m_default(styles_css_default2.container, hasCustomHeight && styles_css_default2["custom-height-container"]) },
                import_react3.default.createElement(
                  "div",
                  { ref: headerRef, className: clsx_m_default(styles_css_default2.header, styles_css_default3.header) },
                  import_react3.default.createElement(
                    InternalHeader,
                    { variant: "h2", __disableActionsWrapping: true, actions: import_react3.default.createElement(
                      "div",
                      { ...getAnalyticsMetadataAttribute({
                        action: "dismiss"
                      }) },
                      import_react3.default.createElement(InternalButton, { ariaLabel: closeAriaLabel, className: styles_css_default2["dismiss-control"], variant: "modal-dismiss", iconName: "close", formAction: "none", onClick: onCloseButtonClick })
                    ) },
                    import_react3.default.createElement("span", { ref: headerTextRef, id: headerId, className: styles_css_default2["header--text"] }, header)
                  )
                ),
                import_react3.default.createElement(
                  BuiltInErrorBoundary,
                  { wrapper: (content) => import_react3.default.createElement(InternalBox, { padding: { bottom: "m", horizontal: "l" } }, content) },
                  import_react3.default.createElement(
                    "div",
                    { ref: __subStepRef, ...__subStepFunnelProps, className: clsx_m_default(styles_css_default2.content, { [styles_css_default2["no-paddings"]]: disableContentPaddings }, hasCustomHeight && styles_css_default2["custom-height-content"]), ...hasCustomHeight && {
                      tabIndex: 0,
                      role: "region",
                      "aria-labelledby": headerId
                    } },
                    children,
                    import_react3.default.createElement("div", { ref: stickySentinelRef })
                  ),
                  footer && import_react3.default.createElement(
                    ButtonContext.Provider,
                    { value: { onClick: onButtonClick } },
                    import_react3.default.createElement("div", { ref: footerRef, className: clsx_m_default(styles_css_default2.footer, (footerStuck || hasCustomHeight) && styles_css_default2["footer--rounded"]) }, footer)
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

// node_modules/@cloudscape-design/components/collection-preferences/analytics-metadata/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/collection-preferences/analytics-metadata/styles.scoped.css";
var styles_css_default4 = {
  "trigger-button": "awsui_trigger-button_119fv_11zih_5"
};

// node_modules/@cloudscape-design/components/collection-preferences/analytics-metadata/utils.js
var getComponentAnalyticsMetadata = (disabled, preferences = {}) => {
  const metadata = {
    name: "awsui.CollectionPreferences",
    label: `.${styles_css_default4["trigger-button"]}`,
    properties: {
      disabled: `${!!disabled}`
    }
  };
  if (preferences.pageSize) {
    metadata.properties.pageSize = `${preferences.pageSize}`;
  }
  if (preferences.wrapLines !== void 0) {
    metadata.properties.wrapLines = `${!!preferences.wrapLines}`;
  }
  if (preferences.stripedRows !== void 0) {
    metadata.properties.stripedRows = `${!!preferences.stripedRows}`;
  }
  if (preferences.contentDensity !== void 0) {
    metadata.properties.contentDensity = preferences.contentDensity;
  }
  if (preferences.visibleContent) {
    metadata.properties.visibleContentCount = `${preferences.visibleContent.length}`;
  }
  if (preferences.stickyColumns) {
    if (preferences.stickyColumns.first) {
      metadata.properties.stickyColumnsFirst = `${preferences.stickyColumns.first}`;
    }
    if (preferences.stickyColumns.last) {
      metadata.properties.stickyColumnsLast = `${preferences.stickyColumns.last}`;
    }
  }
  if (preferences.contentDisplay) {
    metadata.properties.contentDisplayVisibleCount = `${preferences.contentDisplay.filter(({ visible }) => !!visible).length}`;
  }
  return metadata;
};
var getAnalyticsInnerContextAttribute = (preference) => getAnalyticsMetadataAttribute({
  component: {
    innerContext: {
      preference
    }
  }
});

// node_modules/@cloudscape-design/components/collection-preferences/content-display/index.js
var import_react21 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/sortable-area/use-live-announcements.js
var import_react4 = __toESM(require_react());
var formatDndStarted = (format) => (position, total) => format({ position, total });
var formatDndItemReordered = (format) => (initialPosition, currentPosition, total) => format({ currentPosition, total, isInitialPosition: `${initialPosition === currentPosition}` });
var formatDndItemCommitted = (format) => (initialPosition, finalPosition, total) => format({
  initialPosition,
  finalPosition,
  total,
  isInitialPosition: `${initialPosition === finalPosition}`
});
function useLiveAnnouncements({ items, itemDefinition, isDragging, liveAnnouncementDndStarted, liveAnnouncementDndItemReordered, liveAnnouncementDndItemCommitted, liveAnnouncementDndDiscarded }) {
  const isFirstAnnouncement = (0, import_react4.useRef)(true);
  if (!isDragging) {
    isFirstAnnouncement.current = true;
  }
  return {
    onDragStart({ active }) {
      if (active && liveAnnouncementDndStarted) {
        const index = items.findIndex((item) => itemDefinition.id(item) === active.id);
        return liveAnnouncementDndStarted(index + 1, items.length);
      }
    },
    onDragOver({ active, over }) {
      if (liveAnnouncementDndItemReordered) {
        if (isFirstAnnouncement.current) {
          isFirstAnnouncement.current = false;
          if (!over || over.id === active.id) {
            return;
          }
        }
        const initialIndex = items.findIndex((item) => itemDefinition.id(item) === active.id);
        const currentIdex = over ? items.findIndex((item) => itemDefinition.id(item) === over.id) : initialIndex;
        return liveAnnouncementDndItemReordered(initialIndex + 1, currentIdex + 1, items.length);
      }
    },
    onDragEnd({ active, over }) {
      if (liveAnnouncementDndItemCommitted) {
        const initialIndex = items.findIndex((item) => itemDefinition.id(item) === active.id);
        const finalIndex = over ? items.findIndex((item) => itemDefinition.id(item) === over.id) : initialIndex;
        return liveAnnouncementDndItemCommitted(initialIndex + 1, finalIndex + 1, items.length);
      }
    },
    onDragCancel() {
      return liveAnnouncementDndDiscarded;
    }
  };
}

// node_modules/@cloudscape-design/components/list/internal.js
var import_react18 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/drag-handle/index.js
var import_react11 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/drag-handle-wrapper/index.js
var import_react8 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/tooltip/index.js
var import_react5 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/tooltip/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/tooltip/styles.scoped.css";
var styles_css_default5 = {
  "root": "awsui_root_1qprf_160mh_5"
};

// node_modules/@cloudscape-design/components/internal/components/tooltip/index.js
function Tooltip({ value, trackRef, trackKey, className: className2, contentAttributes = {}, position = "top", size = "small", hideOnOverscroll, onDismiss }) {
  if (!trackKey && (typeof value === "string" || typeof value === "number")) {
    trackKey = value;
  }
  (0, import_react5.useEffect)(() => {
    const controller = new AbortController();
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
      }
    }, {
      // The tooltip is often activated on mouseover, which means the focus can
      // be anywhere else on the page. Capture also means that this gets called
      // before any wrapper modals or dialogs can detect it and act on it.
      capture: true,
      signal: controller.signal
    });
    return () => {
      controller.abort();
    };
  }, [onDismiss]);
  return import_react5.default.createElement(
    Portal,
    null,
    import_react5.default.createElement(
      "div",
      { className: `${styles_css_default5.root} ${styles_css_default.root}`, ...contentAttributes, "data-testid": trackKey },
      import_react5.default.createElement(Transition, { in: true }, () => import_react5.default.createElement(
        PopoverContainer,
        { trackRef, trackKey, size, fixedWidth: false, position, zIndex: 7e3, arrow: (position2) => import_react5.default.createElement(arrow_default, { position: position2 }), hideOnOverscroll, className: className2 },
        import_react5.default.createElement(body_default, { dismissButton: false, dismissAriaLabel: void 0, onDismiss: void 0, header: void 0 }, value)
      ))
    )
  );
}

// node_modules/@cloudscape-design/components/internal/components/drag-handle-wrapper/direction-button.js
var import_react6 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/drag-handle-wrapper/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/drag-handle-wrapper/styles.scoped.css";
var styles_css_default6 = {
  "direction-button-wrapper": "awsui_direction-button-wrapper_155yk_1rpq3_169",
  "direction-button-wrapper-motion-enter": "awsui_direction-button-wrapper-motion-enter_155yk_1rpq3_189",
  "direction-button-wrapper-motion-entering": "awsui_direction-button-wrapper-motion-entering_155yk_1rpq3_189",
  "direction-button-wrapper-motion-exit": "awsui_direction-button-wrapper-motion-exit_155yk_1rpq3_189",
  "direction-button-wrapper-motion-exiting": "awsui_direction-button-wrapper-motion-exiting_155yk_1rpq3_189",
  "drag-handle-entry": "awsui_drag-handle-entry_155yk_1rpq3_1",
  "awsui-motion-fade-in": "awsui_awsui-motion-fade-in_155yk_1rpq3_1",
  "drag-handle-exit": "awsui_drag-handle-exit_155yk_1rpq3_1",
  "awsui-motion-fade-out-0": "awsui_awsui-motion-fade-out-0_155yk_1rpq3_1",
  "direction-button-wrapper-block-start": "awsui_direction-button-wrapper-block-start_155yk_1rpq3_229",
  "direction-button-wrapper-block-end": "awsui_direction-button-wrapper-block-end_155yk_1rpq3_233",
  "direction-button-wrapper-inline-start": "awsui_direction-button-wrapper-inline-start_155yk_1rpq3_237",
  "direction-button-wrapper-inline-end": "awsui_direction-button-wrapper-inline-end_155yk_1rpq3_248",
  "contents": "awsui_contents_155yk_1rpq3_259",
  "portal-overlay": "awsui_portal-overlay_155yk_1rpq3_263",
  "portal-overlay-disabled": "awsui_portal-overlay-disabled_155yk_1rpq3_271",
  "portal-overlay-contents": "awsui_portal-overlay-contents_155yk_1rpq3_275",
  "drag-handle": "awsui_drag-handle_155yk_1rpq3_279",
  "direction-button-wrapper-hidden": "awsui_direction-button-wrapper-hidden_155yk_1rpq3_292",
  "direction-button-wrapper-forced": "awsui_direction-button-wrapper-forced_155yk_1rpq3_316",
  "direction-button-wrapper-forced-top-0": "awsui_direction-button-wrapper-forced-top-0_155yk_1rpq3_320",
  "direction-button-wrapper-forced-top-1": "awsui_direction-button-wrapper-forced-top-1_155yk_1rpq3_324",
  "direction-button-wrapper-forced-top-2": "awsui_direction-button-wrapper-forced-top-2_155yk_1rpq3_328",
  "direction-button-wrapper-forced-top-3": "awsui_direction-button-wrapper-forced-top-3_155yk_1rpq3_332",
  "direction-button-wrapper-forced-bottom-0": "awsui_direction-button-wrapper-forced-bottom-0_155yk_1rpq3_336",
  "direction-button-wrapper-forced-bottom-1": "awsui_direction-button-wrapper-forced-bottom-1_155yk_1rpq3_340",
  "direction-button-wrapper-forced-bottom-2": "awsui_direction-button-wrapper-forced-bottom-2_155yk_1rpq3_344",
  "direction-button-wrapper-forced-bottom-3": "awsui_direction-button-wrapper-forced-bottom-3_155yk_1rpq3_348",
  "direction-button": "awsui_direction-button_155yk_1rpq3_169",
  "direction-button-disabled": "awsui_direction-button-disabled_155yk_1rpq3_371"
};

// node_modules/@cloudscape-design/components/internal/components/drag-handle-wrapper/test-classes/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/drag-handle-wrapper/test-classes/styles.scoped.css";
var styles_css_default7 = {
  "root": "awsui_root_8k1rt_1i1h9_5",
  "direction-button": "awsui_direction-button_8k1rt_1i1h9_9",
  "direction-button-visible": "awsui_direction-button-visible_8k1rt_1i1h9_13",
  "direction-button-block-start": "awsui_direction-button-block-start_8k1rt_1i1h9_17",
  "direction-button-block-end": "awsui_direction-button-block-end_8k1rt_1i1h9_21",
  "direction-button-inline-start": "awsui_direction-button-inline-start_8k1rt_1i1h9_25",
  "direction-button-inline-end": "awsui_direction-button-inline-end_8k1rt_1i1h9_29"
};

// node_modules/@cloudscape-design/components/internal/components/drag-handle-wrapper/direction-button.js
var ICON_LOGICAL_PROPERTY_MAP = {
  "block-start": "arrow-up",
  "block-end": "arrow-down",
  "inline-start": "arrow-left",
  "inline-end": "arrow-right"
};
function DirectionButton({ direction, state, show, onClick, forcedPosition, forcedIndex }) {
  return import_react6.default.createElement(Transition, { in: show }, (transitionState, ref) => (
    // The wrapper exists to provide a padding around each direction button that
    // prevents any accidental presses around the button from propagating to any
    // interactive elements behind the button.
    import_react6.default.createElement(
      "span",
      { ref, className: clsx_m_default(styles_css_default6["direction-button-wrapper"], !forcedPosition && styles_css_default6[`direction-button-wrapper-${direction}`], forcedPosition && styles_css_default6["direction-button-wrapper-forced"], forcedPosition && styles_css_default6[`direction-button-wrapper-forced-${forcedPosition}-${forcedIndex}`], transitionState === "exited" && styles_css_default6["direction-button-wrapper-hidden"], styles_css_default6[`direction-button-wrapper-motion-${transitionState}`]) },
      import_react6.default.createElement(
        "span",
        {
          className: clsx_m_default(styles_css_default6["direction-button"], state === "disabled" && styles_css_default6["direction-button-disabled"], styles_css_default7[`direction-button-${direction}`], !["exiting", "exited"].includes(transitionState) && styles_css_default7["direction-button-visible"]),
          onClick: state !== "disabled" ? onClick : void 0,
          // This prevents focus from being lost to `document.body` on
          // mouse/pointer press. This allows us to listen to onClick while
          // keeping this button pointer-accessible only.
          onPointerDown: (event) => event.preventDefault()
        },
        import_react6.default.createElement(internal_default2, { name: ICON_LOGICAL_PROPERTY_MAP[direction], size: "small" })
      )
    )
  ));
}

// node_modules/@cloudscape-design/components/internal/components/drag-handle-wrapper/portal-overlay.js
var import_react7 = __toESM(require_react());
function PortalOverlay({ track, isDisabled, children }) {
  const ref = (0, import_react7.useRef)(null);
  const [container, setContainer] = (0, import_react7.useState)(null);
  (0, import_react7.useLayoutEffect)(() => {
    if (track.current) {
      const newContainer = track.current.ownerDocument.createElement("div");
      track.current.ownerDocument.body.appendChild(newContainer);
      setContainer(newContainer);
      return () => newContainer.remove();
    }
  }, [track]);
  (0, import_react7.useEffect)(() => {
    if (track.current === null || isDisabled) {
      return;
    }
    let cleanedUp = false;
    let lastX;
    let lastY;
    let lastInlineSize;
    let lastBlockSize;
    const updateElement = () => {
      if (track.current && ref.current && document.body.contains(ref.current)) {
        const isRtl = getIsRtl(ref.current);
        const { insetInlineStart, insetBlockStart, inlineSize, blockSize } = getLogicalBoundingClientRect(track.current);
        const newX = (insetInlineStart + getScrollInlineStart(document.documentElement)) * (isRtl ? -1 : 1);
        const newY = insetBlockStart + document.documentElement.scrollTop;
        if (lastX !== newX || lastY !== newY) {
          ref.current.style.translate = `${newX}px ${newY}px`;
          lastX = newX;
          lastY = newY;
        }
        if (lastInlineSize !== inlineSize || lastBlockSize !== blockSize) {
          ref.current.style.width = `${inlineSize}px`;
          ref.current.style.height = `${blockSize}px`;
          lastInlineSize = inlineSize;
          lastBlockSize = blockSize;
        }
      }
      if (!cleanedUp) {
        requestAnimationFrame(updateElement);
      }
    };
    updateElement();
    return () => {
      cleanedUp = true;
    };
  }, [isDisabled, track]);
  return import_react7.default.createElement(
    Portal,
    { container },
    import_react7.default.createElement(
      "span",
      { ref, className: clsx_m_default(styles_css_default6["portal-overlay"], isDisabled && styles_css_default6["portal-overlay-disabled"]) },
      import_react7.default.createElement("span", { className: styles_css_default6["portal-overlay-contents"] }, children)
    )
  );
}

// node_modules/@cloudscape-design/components/internal/components/drag-handle-wrapper/index.js
var FORCED_POSITION_PROXIMITY_PX = 50;
var UAP_BUTTON_SIZE_PX = 40;
var DIRECTIONS_ORDER = ["block-end", "block-start", "inline-end", "inline-start"];
function DragHandleWrapper({ directions: directions2, tooltipText, children, onDirectionClick, triggerMode = "focus", initialShowButtons = false, controlledShowButtons = false, wrapperClassName, hideButtonsOnDrag, clickDragThreshold }) {
  const wrapperRef = (0, import_react8.useRef)(null);
  const dragHandleRef = (0, import_react8.useRef)(null);
  const [showTooltip, setShowTooltip] = (0, import_react8.useState)(false);
  const [uncontrolledShowButtons, setUncontrolledShowButtons] = (0, import_react8.useState)(initialShowButtons);
  const isPointerDown = (0, import_react8.useRef)(false);
  const initialPointerPosition = (0, import_react8.useRef)();
  const didPointerDrag = (0, import_react8.useRef)(false);
  const isDisabled = !directions2["block-start"] && !directions2["block-end"] && !directions2["inline-start"] && !directions2["inline-end"];
  const onWrapperFocusIn = (event) => {
    if (document.body.dataset.awsuiFocusVisible && !nodeContains(wrapperRef.current, event.relatedTarget)) {
      setShowTooltip(false);
      if (triggerMode === "focus") {
        setUncontrolledShowButtons(true);
      }
    }
  };
  const onWrapperFocusOut = (event) => {
    if (document.hasFocus() && !nodeContains(wrapperRef.current, event.relatedTarget)) {
      setUncontrolledShowButtons(false);
    }
  };
  (0, import_react8.useEffect)(() => {
    const controller = new AbortController();
    document.addEventListener("pointermove", (event) => {
      if (isPointerDown.current && initialPointerPosition.current && (event.clientX > initialPointerPosition.current.x + clickDragThreshold || event.clientX < initialPointerPosition.current.x - clickDragThreshold || event.clientY > initialPointerPosition.current.y + clickDragThreshold || event.clientY < initialPointerPosition.current.y - clickDragThreshold)) {
        didPointerDrag.current = true;
        if (hideButtonsOnDrag) {
          setUncontrolledShowButtons(false);
        }
      }
    }, { signal: controller.signal });
    const resetPointerDownState = () => {
      isPointerDown.current = false;
      initialPointerPosition.current = void 0;
    };
    document.addEventListener("pointercancel", () => {
      resetPointerDownState();
    }, { signal: controller.signal });
    document.addEventListener("pointerup", () => {
      if (isPointerDown.current && !didPointerDrag.current) {
        setUncontrolledShowButtons(true);
      }
      resetPointerDownState();
    }, { signal: controller.signal });
    return () => controller.abort();
  }, [clickDragThreshold, hideButtonsOnDrag]);
  const onHandlePointerDown = (event) => {
    isPointerDown.current = true;
    didPointerDrag.current = false;
    initialPointerPosition.current = { x: event.clientX, y: event.clientY };
    setShowTooltip(false);
  };
  const onTooltipGroupPointerEnter = () => {
    if (!isPointerDown.current) {
      setShowTooltip(true);
    }
  };
  const onTooltipGroupPointerLeave = () => {
    setShowTooltip(false);
  };
  const onDragHandleKeyDown = (event) => {
    if (event.key === "Escape") {
      setUncontrolledShowButtons(false);
    } else if (triggerMode === "keyboard-activate" && (event.key === "Enter" || event.key === " ")) {
      setUncontrolledShowButtons((prevShowButtons) => !prevShowButtons);
    } else if (event.key !== "Alt" && event.key !== "Control" && event.key !== "Meta" && event.key !== "Shift" && triggerMode === "focus") {
      setUncontrolledShowButtons(true);
    }
  };
  const showButtons = triggerMode === "controlled" ? controlledShowButtons : uncontrolledShowButtons;
  const [forcedPosition, setForcedPosition] = (0, import_react8.useState)(null);
  const directionsOrder = forcedPosition === "bottom" ? [...DIRECTIONS_ORDER].reverse() : DIRECTIONS_ORDER;
  const visibleDirections = directionsOrder.filter((dir) => directions2[dir]);
  (0, import_react8.useEffect)(() => {
    if (!showButtons || !dragHandleRef.current) {
      if (forcedPosition !== null) {
        setForcedPosition(null);
      }
      return;
    }
    let frameId;
    const checkPosition = () => {
      if (!dragHandleRef.current) {
        return;
      }
      const rect = getLogicalBoundingClientRect(dragHandleRef.current);
      const conflicts = {
        "block-start": rect.insetBlockStart < FORCED_POSITION_PROXIMITY_PX,
        "block-end": window.innerHeight - rect.insetBlockEnd < FORCED_POSITION_PROXIMITY_PX,
        "inline-start": rect.insetInlineStart < FORCED_POSITION_PROXIMITY_PX,
        "inline-end": window.innerWidth - rect.insetInlineEnd < FORCED_POSITION_PROXIMITY_PX
      };
      if (visibleDirections.some((direction) => conflicts[direction])) {
        const hasEnoughSpaceAbove = rect.insetBlockStart > visibleDirections.length * UAP_BUTTON_SIZE_PX;
        setForcedPosition(hasEnoughSpaceAbove ? "top" : "bottom");
      } else {
        setForcedPosition(null);
      }
      frameId = requestAnimationFrame(checkPosition);
    };
    frameId = requestAnimationFrame(checkPosition);
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [forcedPosition, showButtons, visibleDirections]);
  return import_react8.default.createElement(
    import_react8.default.Fragment,
    null,
    import_react8.default.createElement(
      "div",
      { className: clsx_m_default(styles_css_default7.root, styles_css_default6.contents), ref: wrapperRef, onFocus: onWrapperFocusIn, onBlur: onWrapperFocusOut },
      import_react8.default.createElement(
        "div",
        { className: styles_css_default6.contents, onPointerEnter: onTooltipGroupPointerEnter, onPointerLeave: onTooltipGroupPointerLeave },
        import_react8.default.createElement("div", { className: clsx_m_default(styles_css_default6["drag-handle"], wrapperClassName), ref: dragHandleRef, onPointerDown: onHandlePointerDown, onKeyDown: onDragHandleKeyDown }, children),
        !isDisabled && !showButtons && showTooltip && tooltipText && // Rendered in a portal but pointerenter/pointerleave events still propagate
        // up the React DOM tree, which is why it's placed in this nested context.
        import_react8.default.createElement(Tooltip, { trackRef: dragHandleRef, value: tooltipText, onDismiss: () => setShowTooltip(false) })
      )
    ),
    import_react8.default.createElement(PortalOverlay, { track: dragHandleRef, isDisabled: !showButtons }, visibleDirections.map((direction, index) => directions2[direction] && import_react8.default.createElement(DirectionButton, { key: direction, show: !isDisabled && showButtons, direction, state: directions2[direction], onClick: () => onDirectionClick === null || onDirectionClick === void 0 ? void 0 : onDirectionClick(direction), forcedPosition, forcedIndex: index })))
  );
}

// node_modules/@cloudscape-design/components/internal/components/drag-handle/button.js
var import_react10 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/drag-handle/resize-icon.js
var import_react9 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/drag-handle/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/drag-handle/styles.scoped.css";
var styles_css_default8 = {
  "handle": "awsui_handle_sdha6_45ome_145",
  "handle-size-normal": "awsui_handle-size-normal_sdha6_45ome_153",
  "handle-size-small": "awsui_handle-size-small_sdha6_45ome_157",
  "handle-drag-indicator": "awsui_handle-drag-indicator_sdha6_45ome_160",
  "handle-disabled": "awsui_handle-disabled_sdha6_45ome_160",
  "active": "awsui_active_sdha6_45ome_163",
  "handle-resize-area": "awsui_handle-resize-area_sdha6_45ome_166",
  "handle-resize-horizontal": "awsui_handle-resize-horizontal_sdha6_45ome_173",
  "handle-resize-vertical": "awsui_handle-resize-vertical_sdha6_45ome_176",
  "hide-focus": "awsui_hide-focus_sdha6_45ome_186",
  "resize-icon": "awsui_resize-icon_sdha6_45ome_208",
  "resize-icon-vertical": "awsui_resize-icon-vertical_sdha6_45ome_214",
  "resize-icon-horizontal": "awsui_resize-icon-horizontal_sdha6_45ome_218",
  "prevent-pointer": "awsui_prevent-pointer_sdha6_45ome_222"
};

// node_modules/@cloudscape-design/components/internal/components/drag-handle/resize-icon.js
function ResizeIcon({ variant }) {
  return import_react9.default.createElement(
    "svg",
    { focusable: "false", className: clsx_m_default(styles_css_default8["resize-icon"], styles_css_default8[`resize-icon-${variant}`]), xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": true },
    import_react9.default.createElement("path", { d: "M2 8H14", strokeWidth: "2", strokeLinecap: "round" })
  );
}

// node_modules/@cloudscape-design/components/internal/components/drag-handle/test-classes/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/drag-handle/test-classes/styles.scoped.css";
var styles_css_default9 = {
  "root": "awsui_root_1om0h_im8v7_5"
};

// node_modules/@cloudscape-design/components/internal/components/drag-handle/button.js
var DragHandleButton = (0, import_react10.forwardRef)(({ variant = "drag-indicator", size = "normal", active = false, className: className2, ariaLabel, ariaLabelledBy, ariaDescribedby, ariaValue, disabled, onPointerDown, onClick, onKeyDown }, ref) => {
  const dragHandleRefObject = (0, import_react10.useRef)(null);
  const iconProps = (() => {
    const shared = {
      variant: disabled ? "disabled" : void 0,
      size
    };
    switch (variant) {
      case "drag-indicator":
        return { ...shared, name: "drag-indicator" };
      case "resize-area":
        return { ...shared, name: "resize-area" };
      case "resize-horizontal":
        return { ...shared, svg: import_react10.default.createElement(ResizeIcon, { variant: "horizontal" }) };
      case "resize-vertical":
        return { ...shared, svg: import_react10.default.createElement(ResizeIcon, { variant: "vertical" }) };
    }
  })();
  return (
    // We need to use a div with button role instead of a button
    // so that Safari will focus on it when clicking it.
    // (See https://bugs.webkit.org/show_bug.cgi?id=22261)
    // Otherwise, we can't reliably catch keyboard events coming from the handle
    // when it is being dragged.
    import_react10.default.createElement(
      "div",
      { ref: useMergeRefs(ref, dragHandleRefObject), role: ariaValue ? "slider" : "button", tabIndex: 0, className: clsx_m_default(className2, styles_css_default8.handle, styles_css_default9.root, styles_css_default8[`handle-${variant}`], styles_css_default8[`handle-size-${size}`], disabled && styles_css_default8["handle-disabled"], active && styles_css_default8.active), "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedby, "aria-disabled": disabled, "aria-pressed": ariaValue ? void 0 : active, "aria-valuemax": ariaValue === null || ariaValue === void 0 ? void 0 : ariaValue.valueMax, "aria-valuemin": ariaValue === null || ariaValue === void 0 ? void 0 : ariaValue.valueMin, "aria-valuenow": ariaValue === null || ariaValue === void 0 ? void 0 : ariaValue.valueNow, onPointerDown, onClick, onKeyDown },
      import_react10.default.createElement(
        "div",
        { className: styles_css_default8["prevent-pointer"] },
        import_react10.default.createElement(internal_default2, { ...iconProps })
      )
    )
  );
});
var button_default = DragHandleButton;

// node_modules/@cloudscape-design/components/internal/components/drag-handle/index.js
var InternalDragHandle = (0, import_react11.forwardRef)(({ variant, size, ariaLabel, ariaLabelledBy, ariaDescribedby, tooltipText, ariaValue, disabled, directions: directions2 = {}, onPointerDown, onClick, onKeyDown, onDirectionClick, triggerMode, initialShowButtons, controlledShowButtons, hideButtonsOnDrag = false, clickDragThreshold = 3, active, ...rest }, ref) => {
  const baseProps = getBaseProps(rest);
  return import_react11.default.createElement(
    DragHandleWrapper,
    { directions: !disabled ? directions2 : {}, tooltipText, onDirectionClick, triggerMode, initialShowButtons, controlledShowButtons, hideButtonsOnDrag, clickDragThreshold },
    import_react11.default.createElement(button_default, { ref, className: baseProps.className, variant, size, ariaLabel, ariaLabelledBy, ariaDescribedby, ariaValue, disabled, active, onPointerDown, onClick, onKeyDown })
  );
});
var drag_handle_default = InternalDragHandle;

// node_modules/@cloudscape-design/components/internal/components/sortable-area/index.js
var import_react17 = __toESM(require_react());

// node_modules/@dnd-kit/core/dist/core.esm.js
var import_react14 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/@dnd-kit/utilities/dist/utilities.esm.js
var import_react12 = __toESM(require_react());
function useCombinedRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }
  return (0, import_react12.useMemo)(
    () => (node) => {
      refs.forEach((ref) => ref(node));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}
var canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function isWindow(element) {
  const elementString = Object.prototype.toString.call(element);
  return elementString === "[object Window]" || // In Electron context the Window object serializes to [object global]
  elementString === "[object global]";
}
function isNode(node) {
  return "nodeType" in node;
}
function getWindow(target) {
  var _target$ownerDocument, _target$ownerDocument2;
  if (!target) {
    return window;
  }
  if (isWindow(target)) {
    return target;
  }
  if (!isNode(target)) {
    return window;
  }
  return (_target$ownerDocument = (_target$ownerDocument2 = target.ownerDocument) == null ? void 0 : _target$ownerDocument2.defaultView) != null ? _target$ownerDocument : window;
}
function isDocument(node) {
  const {
    Document
  } = getWindow(node);
  return node instanceof Document;
}
function isHTMLElement(node) {
  if (isWindow(node)) {
    return false;
  }
  return node instanceof getWindow(node).HTMLElement;
}
function isSVGElement(node) {
  return node instanceof getWindow(node).SVGElement;
}
function getOwnerDocument(target) {
  if (!target) {
    return document;
  }
  if (isWindow(target)) {
    return target.document;
  }
  if (!isNode(target)) {
    return document;
  }
  if (isDocument(target)) {
    return target;
  }
  if (isHTMLElement(target) || isSVGElement(target)) {
    return target.ownerDocument;
  }
  return document;
}
var useIsomorphicLayoutEffect = canUseDOM ? import_react12.useLayoutEffect : import_react12.useEffect;
function useEvent(handler) {
  const handlerRef = (0, import_react12.useRef)(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });
  return (0, import_react12.useCallback)(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return handlerRef.current == null ? void 0 : handlerRef.current(...args);
  }, []);
}
function useInterval() {
  const intervalRef = (0, import_react12.useRef)(null);
  const set = (0, import_react12.useCallback)((listener, duration) => {
    intervalRef.current = setInterval(listener, duration);
  }, []);
  const clear = (0, import_react12.useCallback)(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  return [set, clear];
}
function useLatestValue(value, dependencies) {
  if (dependencies === void 0) {
    dependencies = [value];
  }
  const valueRef = (0, import_react12.useRef)(value);
  useIsomorphicLayoutEffect(() => {
    if (valueRef.current !== value) {
      valueRef.current = value;
    }
  }, dependencies);
  return valueRef;
}
function useLazyMemo(callback, dependencies) {
  const valueRef = (0, import_react12.useRef)();
  return (0, import_react12.useMemo)(
    () => {
      const newValue = callback(valueRef.current);
      valueRef.current = newValue;
      return newValue;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...dependencies]
  );
}
function useNodeRef(onChange) {
  const onChangeHandler = useEvent(onChange);
  const node = (0, import_react12.useRef)(null);
  const setNodeRef = (0, import_react12.useCallback)(
    (element) => {
      if (element !== node.current) {
        onChangeHandler == null ? void 0 : onChangeHandler(element, node.current);
      }
      node.current = element;
    },
    //eslint-disable-next-line
    []
  );
  return [node, setNodeRef];
}
function usePrevious(value) {
  const ref = (0, import_react12.useRef)();
  (0, import_react12.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
var ids = {};
function useUniqueId2(prefix, value) {
  return (0, import_react12.useMemo)(() => {
    if (value) {
      return value;
    }
    const id = ids[prefix] == null ? 0 : ids[prefix] + 1;
    ids[prefix] = id;
    return prefix + "-" + id;
  }, [prefix, value]);
}
function createAdjustmentFn(modifier) {
  return function(object) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }
    return adjustments.reduce((accumulator, adjustment) => {
      const entries = Object.entries(adjustment);
      for (const [key2, valueAdjustment] of entries) {
        const value = accumulator[key2];
        if (value != null) {
          accumulator[key2] = value + modifier * valueAdjustment;
        }
      }
      return accumulator;
    }, {
      ...object
    });
  };
}
var add = createAdjustmentFn(1);
var subtract = createAdjustmentFn(-1);
function hasViewportRelativeCoordinates(event) {
  return "clientX" in event && "clientY" in event;
}
function isKeyboardEvent(event) {
  if (!event) {
    return false;
  }
  const {
    KeyboardEvent
  } = getWindow(event.target);
  return KeyboardEvent && event instanceof KeyboardEvent;
}
function isTouchEvent(event) {
  if (!event) {
    return false;
  }
  const {
    TouchEvent
  } = getWindow(event.target);
  return TouchEvent && event instanceof TouchEvent;
}
function getEventCoordinates(event) {
  if (isTouchEvent(event)) {
    if (event.touches && event.touches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.touches[0];
      return {
        x,
        y
      };
    } else if (event.changedTouches && event.changedTouches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.changedTouches[0];
      return {
        x,
        y
      };
    }
  }
  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }
  return null;
}
var CSS = Object.freeze({
  Translate: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        x,
        y
      } = transform;
      return "translate3d(" + (x ? Math.round(x) : 0) + "px, " + (y ? Math.round(y) : 0) + "px, 0)";
    }
  },
  Scale: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        scaleX,
        scaleY
      } = transform;
      return "scaleX(" + scaleX + ") scaleY(" + scaleY + ")";
    }
  },
  Transform: {
    toString(transform) {
      if (!transform) {
        return;
      }
      return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(" ");
    }
  },
  Transition: {
    toString(_ref) {
      let {
        property,
        duration,
        easing
      } = _ref;
      return property + " " + duration + "ms " + easing;
    }
  }
});
var SELECTOR = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function findFirstFocusableNode(element) {
  if (element.matches(SELECTOR)) {
    return element;
  }
  return element.querySelector(SELECTOR);
}

// node_modules/@dnd-kit/accessibility/dist/accessibility.esm.js
var import_react13 = __toESM(require_react());
var hiddenStyles = {
  display: "none"
};
function HiddenText(_ref) {
  let {
    id,
    value
  } = _ref;
  return import_react13.default.createElement("div", {
    id,
    style: hiddenStyles
  }, value);
}
function LiveRegion(_ref) {
  let {
    id,
    announcement,
    ariaLiveType = "assertive"
  } = _ref;
  const visuallyHidden = {
    position: "fixed",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(100%)",
    whiteSpace: "nowrap"
  };
  return import_react13.default.createElement("div", {
    id,
    style: visuallyHidden,
    role: "status",
    "aria-live": ariaLiveType,
    "aria-atomic": true
  }, announcement);
}
function useAnnouncement() {
  const [announcement, setAnnouncement] = (0, import_react13.useState)("");
  const announce = (0, import_react13.useCallback)((value) => {
    if (value != null) {
      setAnnouncement(value);
    }
  }, []);
  return {
    announce,
    announcement
  };
}

// node_modules/@dnd-kit/core/dist/core.esm.js
var DndMonitorContext = (0, import_react14.createContext)(null);
function useDndMonitor(listener) {
  const registerListener = (0, import_react14.useContext)(DndMonitorContext);
  (0, import_react14.useEffect)(() => {
    if (!registerListener) {
      throw new Error("useDndMonitor must be used within a children of <DndContext>");
    }
    const unsubscribe = registerListener(listener);
    return unsubscribe;
  }, [listener, registerListener]);
}
function useDndMonitorProvider() {
  const [listeners] = (0, import_react14.useState)(() => /* @__PURE__ */ new Set());
  const registerListener = (0, import_react14.useCallback)((listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, [listeners]);
  const dispatch = (0, import_react14.useCallback)((_ref) => {
    let {
      type,
      event
    } = _ref;
    listeners.forEach((listener) => {
      var _listener$type;
      return (_listener$type = listener[type]) == null ? void 0 : _listener$type.call(listener, event);
    });
  }, [listeners]);
  return [dispatch, registerListener];
}
var defaultScreenReaderInstructions = {
  draggable: "\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  "
};
var defaultAnnouncements = {
  onDragStart(_ref) {
    let {
      active
    } = _ref;
    return "Picked up draggable item " + active.id + ".";
  },
  onDragOver(_ref2) {
    let {
      active,
      over
    } = _ref2;
    if (over) {
      return "Draggable item " + active.id + " was moved over droppable area " + over.id + ".";
    }
    return "Draggable item " + active.id + " is no longer over a droppable area.";
  },
  onDragEnd(_ref3) {
    let {
      active,
      over
    } = _ref3;
    if (over) {
      return "Draggable item " + active.id + " was dropped over droppable area " + over.id;
    }
    return "Draggable item " + active.id + " was dropped.";
  },
  onDragCancel(_ref4) {
    let {
      active
    } = _ref4;
    return "Dragging was cancelled. Draggable item " + active.id + " was dropped.";
  }
};
function Accessibility(_ref) {
  let {
    announcements = defaultAnnouncements,
    container,
    hiddenTextDescribedById,
    screenReaderInstructions = defaultScreenReaderInstructions
  } = _ref;
  const {
    announce,
    announcement
  } = useAnnouncement();
  const liveRegionId = useUniqueId2("DndLiveRegion");
  const [mounted, setMounted] = (0, import_react14.useState)(false);
  (0, import_react14.useEffect)(() => {
    setMounted(true);
  }, []);
  useDndMonitor((0, import_react14.useMemo)(() => ({
    onDragStart(_ref2) {
      let {
        active
      } = _ref2;
      announce(announcements.onDragStart({
        active
      }));
    },
    onDragMove(_ref3) {
      let {
        active,
        over
      } = _ref3;
      if (announcements.onDragMove) {
        announce(announcements.onDragMove({
          active,
          over
        }));
      }
    },
    onDragOver(_ref4) {
      let {
        active,
        over
      } = _ref4;
      announce(announcements.onDragOver({
        active,
        over
      }));
    },
    onDragEnd(_ref5) {
      let {
        active,
        over
      } = _ref5;
      announce(announcements.onDragEnd({
        active,
        over
      }));
    },
    onDragCancel(_ref6) {
      let {
        active,
        over
      } = _ref6;
      announce(announcements.onDragCancel({
        active,
        over
      }));
    }
  }), [announce, announcements]));
  if (!mounted) {
    return null;
  }
  const markup = import_react14.default.createElement(import_react14.default.Fragment, null, import_react14.default.createElement(HiddenText, {
    id: hiddenTextDescribedById,
    value: screenReaderInstructions.draggable
  }), import_react14.default.createElement(LiveRegion, {
    id: liveRegionId,
    announcement
  }));
  return container ? (0, import_react_dom.createPortal)(markup, container) : markup;
}
var Action;
(function(Action2) {
  Action2["DragStart"] = "dragStart";
  Action2["DragMove"] = "dragMove";
  Action2["DragEnd"] = "dragEnd";
  Action2["DragCancel"] = "dragCancel";
  Action2["DragOver"] = "dragOver";
  Action2["RegisterDroppable"] = "registerDroppable";
  Action2["SetDroppableDisabled"] = "setDroppableDisabled";
  Action2["UnregisterDroppable"] = "unregisterDroppable";
})(Action || (Action = {}));
function noop() {
}
function useSensor(sensor, options) {
  return (0, import_react14.useMemo)(
    () => ({
      sensor,
      options: options != null ? options : {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sensor, options]
  );
}
function useSensors() {
  for (var _len = arguments.length, sensors = new Array(_len), _key = 0; _key < _len; _key++) {
    sensors[_key] = arguments[_key];
  }
  return (0, import_react14.useMemo)(
    () => [...sensors].filter((sensor) => sensor != null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...sensors]
  );
}
var defaultCoordinates = Object.freeze({
  x: 0,
  y: 0
});
function distanceBetween(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
function getRelativeTransformOrigin(event, rect) {
  const eventCoordinates = getEventCoordinates(event);
  if (!eventCoordinates) {
    return "0 0";
  }
  const transformOrigin = {
    x: (eventCoordinates.x - rect.left) / rect.width * 100,
    y: (eventCoordinates.y - rect.top) / rect.height * 100
  };
  return transformOrigin.x + "% " + transformOrigin.y + "%";
}
function sortCollisionsAsc(_ref, _ref2) {
  let {
    data: {
      value: a
    }
  } = _ref;
  let {
    data: {
      value: b
    }
  } = _ref2;
  return a - b;
}
function sortCollisionsDesc(_ref3, _ref4) {
  let {
    data: {
      value: a
    }
  } = _ref3;
  let {
    data: {
      value: b
    }
  } = _ref4;
  return b - a;
}
function getFirstCollision(collisions, property) {
  if (!collisions || collisions.length === 0) {
    return null;
  }
  const [firstCollision] = collisions;
  return property ? firstCollision[property] : firstCollision;
}
function centerOfRectangle(rect, left, top) {
  if (left === void 0) {
    left = rect.left;
  }
  if (top === void 0) {
    top = rect.top;
  }
  return {
    x: left + rect.width * 0.5,
    y: top + rect.height * 0.5
  };
}
var closestCenter = (_ref) => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const centerRect = centerOfRectangle(collisionRect, collisionRect.left, collisionRect.top);
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const distBetween = distanceBetween(centerOfRectangle(rect), centerRect);
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: distBetween
        }
      });
    }
  }
  return collisions.sort(sortCollisionsAsc);
};
function getIntersectionRatio(entry, target) {
  const top = Math.max(target.top, entry.top);
  const left = Math.max(target.left, entry.left);
  const right = Math.min(target.left + target.width, entry.left + entry.width);
  const bottom = Math.min(target.top + target.height, entry.top + entry.height);
  const width = right - left;
  const height = bottom - top;
  if (left < right && top < bottom) {
    const targetArea = target.width * target.height;
    const entryArea = entry.width * entry.height;
    const intersectionArea = width * height;
    const intersectionRatio = intersectionArea / (targetArea + entryArea - intersectionArea);
    return Number(intersectionRatio.toFixed(4));
  }
  return 0;
}
var rectIntersection = (_ref) => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const intersectionRatio = getIntersectionRatio(rect, collisionRect);
      if (intersectionRatio > 0) {
        collisions.push({
          id,
          data: {
            droppableContainer,
            value: intersectionRatio
          }
        });
      }
    }
  }
  return collisions.sort(sortCollisionsDesc);
};
function adjustScale(transform, rect1, rect2) {
  return {
    ...transform,
    scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
    scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1
  };
}
function getRectDelta(rect1, rect2) {
  return rect1 && rect2 ? {
    x: rect1.left - rect2.left,
    y: rect1.top - rect2.top
  } : defaultCoordinates;
}
function createRectAdjustmentFn(modifier) {
  return function adjustClientRect(rect) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }
    return adjustments.reduce((acc, adjustment) => ({
      ...acc,
      top: acc.top + modifier * adjustment.y,
      bottom: acc.bottom + modifier * adjustment.y,
      left: acc.left + modifier * adjustment.x,
      right: acc.right + modifier * adjustment.x
    }), {
      ...rect
    });
  };
}
var getAdjustedRect = createRectAdjustmentFn(1);
function parseTransform(transform) {
  if (transform.startsWith("matrix3d(")) {
    const transformArray = transform.slice(9, -1).split(/, /);
    return {
      x: +transformArray[12],
      y: +transformArray[13],
      scaleX: +transformArray[0],
      scaleY: +transformArray[5]
    };
  } else if (transform.startsWith("matrix(")) {
    const transformArray = transform.slice(7, -1).split(/, /);
    return {
      x: +transformArray[4],
      y: +transformArray[5],
      scaleX: +transformArray[0],
      scaleY: +transformArray[3]
    };
  }
  return null;
}
function inverseTransform(rect, transform, transformOrigin) {
  const parsedTransform = parseTransform(transform);
  if (!parsedTransform) {
    return rect;
  }
  const {
    scaleX,
    scaleY,
    x: translateX,
    y: translateY
  } = parsedTransform;
  const x = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
  const y = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(" ") + 1));
  const w = scaleX ? rect.width / scaleX : rect.width;
  const h = scaleY ? rect.height / scaleY : rect.height;
  return {
    width: w,
    height: h,
    top: y,
    right: x + w,
    bottom: y + h,
    left: x
  };
}
var defaultOptions = {
  ignoreTransform: false
};
function getClientRect(element, options) {
  if (options === void 0) {
    options = defaultOptions;
  }
  let rect = element.getBoundingClientRect();
  if (options.ignoreTransform) {
    const {
      transform,
      transformOrigin
    } = getWindow(element).getComputedStyle(element);
    if (transform) {
      rect = inverseTransform(rect, transform, transformOrigin);
    }
  }
  const {
    top,
    left,
    width,
    height,
    bottom,
    right
  } = rect;
  return {
    top,
    left,
    width,
    height,
    bottom,
    right
  };
}
function getTransformAgnosticClientRect(element) {
  return getClientRect(element, {
    ignoreTransform: true
  });
}
function getWindowClientRect(element) {
  const width = element.innerWidth;
  const height = element.innerHeight;
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  };
}
function isFixed(node, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = getWindow(node).getComputedStyle(node);
  }
  return computedStyle.position === "fixed";
}
function isScrollable(element, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = getWindow(element).getComputedStyle(element);
  }
  const overflowRegex = /(auto|scroll|overlay)/;
  const properties2 = ["overflow", "overflowX", "overflowY"];
  return properties2.some((property) => {
    const value = computedStyle[property];
    return typeof value === "string" ? overflowRegex.test(value) : false;
  });
}
function getScrollableAncestors(element, limit) {
  const scrollParents = [];
  function findScrollableAncestors(node) {
    if (limit != null && scrollParents.length >= limit) {
      return scrollParents;
    }
    if (!node) {
      return scrollParents;
    }
    if (isDocument(node) && node.scrollingElement != null && !scrollParents.includes(node.scrollingElement)) {
      scrollParents.push(node.scrollingElement);
      return scrollParents;
    }
    if (!isHTMLElement(node) || isSVGElement(node)) {
      return scrollParents;
    }
    if (scrollParents.includes(node)) {
      return scrollParents;
    }
    const computedStyle = getWindow(element).getComputedStyle(node);
    if (node !== element) {
      if (isScrollable(node, computedStyle)) {
        scrollParents.push(node);
      }
    }
    if (isFixed(node, computedStyle)) {
      return scrollParents;
    }
    return findScrollableAncestors(node.parentNode);
  }
  if (!element) {
    return scrollParents;
  }
  return findScrollableAncestors(element);
}
function getFirstScrollableAncestor(node) {
  const [firstScrollableAncestor] = getScrollableAncestors(node, 1);
  return firstScrollableAncestor != null ? firstScrollableAncestor : null;
}
function getScrollableElement(element) {
  if (!canUseDOM || !element) {
    return null;
  }
  if (isWindow(element)) {
    return element;
  }
  if (!isNode(element)) {
    return null;
  }
  if (isDocument(element) || element === getOwnerDocument(element).scrollingElement) {
    return window;
  }
  if (isHTMLElement(element)) {
    return element;
  }
  return null;
}
function getScrollXCoordinate(element) {
  if (isWindow(element)) {
    return element.scrollX;
  }
  return element.scrollLeft;
}
function getScrollYCoordinate(element) {
  if (isWindow(element)) {
    return element.scrollY;
  }
  return element.scrollTop;
}
function getScrollCoordinates(element) {
  return {
    x: getScrollXCoordinate(element),
    y: getScrollYCoordinate(element)
  };
}
var Direction;
(function(Direction2) {
  Direction2[Direction2["Forward"] = 1] = "Forward";
  Direction2[Direction2["Backward"] = -1] = "Backward";
})(Direction || (Direction = {}));
function isDocumentScrollingElement(element) {
  if (!canUseDOM || !element) {
    return false;
  }
  return element === document.scrollingElement;
}
function getScrollPosition(scrollingContainer) {
  const minScroll = {
    x: 0,
    y: 0
  };
  const dimensions = isDocumentScrollingElement(scrollingContainer) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: scrollingContainer.clientHeight,
    width: scrollingContainer.clientWidth
  };
  const maxScroll = {
    x: scrollingContainer.scrollWidth - dimensions.width,
    y: scrollingContainer.scrollHeight - dimensions.height
  };
  const isTop = scrollingContainer.scrollTop <= minScroll.y;
  const isLeft = scrollingContainer.scrollLeft <= minScroll.x;
  const isBottom = scrollingContainer.scrollTop >= maxScroll.y;
  const isRight = scrollingContainer.scrollLeft >= maxScroll.x;
  return {
    isTop,
    isLeft,
    isBottom,
    isRight,
    maxScroll,
    minScroll
  };
}
var defaultThreshold = {
  x: 0.2,
  y: 0.2
};
function getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, _ref, acceleration, thresholdPercentage) {
  let {
    top,
    left,
    right,
    bottom
  } = _ref;
  if (acceleration === void 0) {
    acceleration = 10;
  }
  if (thresholdPercentage === void 0) {
    thresholdPercentage = defaultThreshold;
  }
  const {
    isTop,
    isBottom,
    isLeft,
    isRight
  } = getScrollPosition(scrollContainer);
  const direction = {
    x: 0,
    y: 0
  };
  const speed = {
    x: 0,
    y: 0
  };
  const threshold = {
    height: scrollContainerRect.height * thresholdPercentage.y,
    width: scrollContainerRect.width * thresholdPercentage.x
  };
  if (!isTop && top <= scrollContainerRect.top + threshold.height) {
    direction.y = Direction.Backward;
    speed.y = acceleration * Math.abs((scrollContainerRect.top + threshold.height - top) / threshold.height);
  } else if (!isBottom && bottom >= scrollContainerRect.bottom - threshold.height) {
    direction.y = Direction.Forward;
    speed.y = acceleration * Math.abs((scrollContainerRect.bottom - threshold.height - bottom) / threshold.height);
  }
  if (!isRight && right >= scrollContainerRect.right - threshold.width) {
    direction.x = Direction.Forward;
    speed.x = acceleration * Math.abs((scrollContainerRect.right - threshold.width - right) / threshold.width);
  } else if (!isLeft && left <= scrollContainerRect.left + threshold.width) {
    direction.x = Direction.Backward;
    speed.x = acceleration * Math.abs((scrollContainerRect.left + threshold.width - left) / threshold.width);
  }
  return {
    direction,
    speed
  };
}
function getScrollElementRect(element) {
  if (element === document.scrollingElement) {
    const {
      innerWidth,
      innerHeight
    } = window;
    return {
      top: 0,
      left: 0,
      right: innerWidth,
      bottom: innerHeight,
      width: innerWidth,
      height: innerHeight
    };
  }
  const {
    top,
    left,
    right,
    bottom
  } = element.getBoundingClientRect();
  return {
    top,
    left,
    right,
    bottom,
    width: element.clientWidth,
    height: element.clientHeight
  };
}
function getScrollOffsets(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return add(acc, getScrollCoordinates(node));
  }, defaultCoordinates);
}
function getScrollXOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollXCoordinate(node);
  }, 0);
}
function getScrollYOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollYCoordinate(node);
  }, 0);
}
function scrollIntoViewIfNeeded(element, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }
  if (!element) {
    return;
  }
  const {
    top,
    left,
    bottom,
    right
  } = measure(element);
  const firstScrollableAncestor = getFirstScrollableAncestor(element);
  if (!firstScrollableAncestor) {
    return;
  }
  if (bottom <= 0 || right <= 0 || top >= window.innerHeight || left >= window.innerWidth) {
    element.scrollIntoView({
      block: "center",
      inline: "center"
    });
  }
}
var properties = [["x", ["left", "right"], getScrollXOffset], ["y", ["top", "bottom"], getScrollYOffset]];
var Rect = class {
  constructor(rect, element) {
    this.rect = void 0;
    this.width = void 0;
    this.height = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.right = void 0;
    this.left = void 0;
    const scrollableAncestors = getScrollableAncestors(element);
    const scrollOffsets = getScrollOffsets(scrollableAncestors);
    this.rect = {
      ...rect
    };
    this.width = rect.width;
    this.height = rect.height;
    for (const [axis, keys, getScrollOffset] of properties) {
      for (const key2 of keys) {
        Object.defineProperty(this, key2, {
          get: () => {
            const currentOffsets = getScrollOffset(scrollableAncestors);
            const scrollOffsetsDeltla = scrollOffsets[axis] - currentOffsets;
            return this.rect[key2] + scrollOffsetsDeltla;
          },
          enumerable: true
        });
      }
    }
    Object.defineProperty(this, "rect", {
      enumerable: false
    });
  }
};
var Listeners = class {
  constructor(target) {
    this.target = void 0;
    this.listeners = [];
    this.removeAll = () => {
      this.listeners.forEach((listener) => {
        var _this$target;
        return (_this$target = this.target) == null ? void 0 : _this$target.removeEventListener(...listener);
      });
    };
    this.target = target;
  }
  add(eventName, handler, options) {
    var _this$target2;
    (_this$target2 = this.target) == null ? void 0 : _this$target2.addEventListener(eventName, handler, options);
    this.listeners.push([eventName, handler, options]);
  }
};
function getEventListenerTarget(target) {
  const {
    EventTarget
  } = getWindow(target);
  return target instanceof EventTarget ? target : getOwnerDocument(target);
}
function hasExceededDistance(delta, measurement) {
  const dx = Math.abs(delta.x);
  const dy = Math.abs(delta.y);
  if (typeof measurement === "number") {
    return Math.sqrt(dx ** 2 + dy ** 2) > measurement;
  }
  if ("x" in measurement && "y" in measurement) {
    return dx > measurement.x && dy > measurement.y;
  }
  if ("x" in measurement) {
    return dx > measurement.x;
  }
  if ("y" in measurement) {
    return dy > measurement.y;
  }
  return false;
}
var EventName;
(function(EventName3) {
  EventName3["Click"] = "click";
  EventName3["DragStart"] = "dragstart";
  EventName3["Keydown"] = "keydown";
  EventName3["ContextMenu"] = "contextmenu";
  EventName3["Resize"] = "resize";
  EventName3["SelectionChange"] = "selectionchange";
  EventName3["VisibilityChange"] = "visibilitychange";
})(EventName || (EventName = {}));
function preventDefault(event) {
  event.preventDefault();
}
function stopPropagation(event) {
  event.stopPropagation();
}
var KeyboardCode;
(function(KeyboardCode2) {
  KeyboardCode2["Space"] = "Space";
  KeyboardCode2["Down"] = "ArrowDown";
  KeyboardCode2["Right"] = "ArrowRight";
  KeyboardCode2["Left"] = "ArrowLeft";
  KeyboardCode2["Up"] = "ArrowUp";
  KeyboardCode2["Esc"] = "Escape";
  KeyboardCode2["Enter"] = "Enter";
  KeyboardCode2["Tab"] = "Tab";
})(KeyboardCode || (KeyboardCode = {}));
var defaultKeyboardCodes = {
  start: [KeyboardCode.Space, KeyboardCode.Enter],
  cancel: [KeyboardCode.Esc],
  end: [KeyboardCode.Space, KeyboardCode.Enter, KeyboardCode.Tab]
};
var defaultKeyboardCoordinateGetter = (event, _ref) => {
  let {
    currentCoordinates
  } = _ref;
  switch (event.code) {
    case KeyboardCode.Right:
      return {
        ...currentCoordinates,
        x: currentCoordinates.x + 25
      };
    case KeyboardCode.Left:
      return {
        ...currentCoordinates,
        x: currentCoordinates.x - 25
      };
    case KeyboardCode.Down:
      return {
        ...currentCoordinates,
        y: currentCoordinates.y + 25
      };
    case KeyboardCode.Up:
      return {
        ...currentCoordinates,
        y: currentCoordinates.y - 25
      };
  }
  return void 0;
};
var KeyboardSensor = class {
  constructor(props) {
    this.props = void 0;
    this.autoScrollEnabled = false;
    this.referenceCoordinates = void 0;
    this.listeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    const {
      event: {
        target
      }
    } = props;
    this.props = props;
    this.listeners = new Listeners(getOwnerDocument(target));
    this.windowListeners = new Listeners(getWindow(target));
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.attach();
  }
  attach() {
    this.handleStart();
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    setTimeout(() => this.listeners.add(EventName.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const {
      activeNode,
      onStart
    } = this.props;
    const node = activeNode.node.current;
    if (node) {
      scrollIntoViewIfNeeded(node);
    }
    onStart(defaultCoordinates);
  }
  handleKeyDown(event) {
    if (isKeyboardEvent(event)) {
      const {
        active,
        context,
        options
      } = this.props;
      const {
        keyboardCodes = defaultKeyboardCodes,
        coordinateGetter = defaultKeyboardCoordinateGetter,
        scrollBehavior = "smooth"
      } = options;
      const {
        code
      } = event;
      if (keyboardCodes.end.includes(code)) {
        this.handleEnd(event);
        return;
      }
      if (keyboardCodes.cancel.includes(code)) {
        this.handleCancel(event);
        return;
      }
      const {
        collisionRect
      } = context.current;
      const currentCoordinates = collisionRect ? {
        x: collisionRect.left,
        y: collisionRect.top
      } : defaultCoordinates;
      if (!this.referenceCoordinates) {
        this.referenceCoordinates = currentCoordinates;
      }
      const newCoordinates = coordinateGetter(event, {
        active,
        context: context.current,
        currentCoordinates
      });
      if (newCoordinates) {
        const coordinatesDelta = subtract(newCoordinates, currentCoordinates);
        const scrollDelta = {
          x: 0,
          y: 0
        };
        const {
          scrollableAncestors
        } = context.current;
        for (const scrollContainer of scrollableAncestors) {
          const direction = event.code;
          const {
            isTop,
            isRight,
            isLeft,
            isBottom,
            maxScroll,
            minScroll
          } = getScrollPosition(scrollContainer);
          const scrollElementRect = getScrollElementRect(scrollContainer);
          const clampedCoordinates = {
            x: Math.min(direction === KeyboardCode.Right ? scrollElementRect.right - scrollElementRect.width / 2 : scrollElementRect.right, Math.max(direction === KeyboardCode.Right ? scrollElementRect.left : scrollElementRect.left + scrollElementRect.width / 2, newCoordinates.x)),
            y: Math.min(direction === KeyboardCode.Down ? scrollElementRect.bottom - scrollElementRect.height / 2 : scrollElementRect.bottom, Math.max(direction === KeyboardCode.Down ? scrollElementRect.top : scrollElementRect.top + scrollElementRect.height / 2, newCoordinates.y))
          };
          const canScrollX = direction === KeyboardCode.Right && !isRight || direction === KeyboardCode.Left && !isLeft;
          const canScrollY = direction === KeyboardCode.Down && !isBottom || direction === KeyboardCode.Up && !isTop;
          if (canScrollX && clampedCoordinates.x !== newCoordinates.x) {
            const newScrollCoordinates = scrollContainer.scrollLeft + coordinatesDelta.x;
            const canScrollToNewCoordinates = direction === KeyboardCode.Right && newScrollCoordinates <= maxScroll.x || direction === KeyboardCode.Left && newScrollCoordinates >= minScroll.x;
            if (canScrollToNewCoordinates && !coordinatesDelta.y) {
              scrollContainer.scrollTo({
                left: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }
            if (canScrollToNewCoordinates) {
              scrollDelta.x = scrollContainer.scrollLeft - newScrollCoordinates;
            } else {
              scrollDelta.x = direction === KeyboardCode.Right ? scrollContainer.scrollLeft - maxScroll.x : scrollContainer.scrollLeft - minScroll.x;
            }
            if (scrollDelta.x) {
              scrollContainer.scrollBy({
                left: -scrollDelta.x,
                behavior: scrollBehavior
              });
            }
            break;
          } else if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
            const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y;
            const canScrollToNewCoordinates = direction === KeyboardCode.Down && newScrollCoordinates <= maxScroll.y || direction === KeyboardCode.Up && newScrollCoordinates >= minScroll.y;
            if (canScrollToNewCoordinates && !coordinatesDelta.x) {
              scrollContainer.scrollTo({
                top: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }
            if (canScrollToNewCoordinates) {
              scrollDelta.y = scrollContainer.scrollTop - newScrollCoordinates;
            } else {
              scrollDelta.y = direction === KeyboardCode.Down ? scrollContainer.scrollTop - maxScroll.y : scrollContainer.scrollTop - minScroll.y;
            }
            if (scrollDelta.y) {
              scrollContainer.scrollBy({
                top: -scrollDelta.y,
                behavior: scrollBehavior
              });
            }
            break;
          }
        }
        this.handleMove(event, add(subtract(newCoordinates, this.referenceCoordinates), scrollDelta));
      }
    }
  }
  handleMove(event, coordinates) {
    const {
      onMove
    } = this.props;
    event.preventDefault();
    onMove(coordinates);
  }
  handleEnd(event) {
    const {
      onEnd
    } = this.props;
    event.preventDefault();
    this.detach();
    onEnd();
  }
  handleCancel(event) {
    const {
      onCancel
    } = this.props;
    event.preventDefault();
    this.detach();
    onCancel();
  }
  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
  }
};
KeyboardSensor.activators = [{
  eventName: "onKeyDown",
  handler: (event, _ref, _ref2) => {
    let {
      keyboardCodes = defaultKeyboardCodes,
      onActivation
    } = _ref;
    let {
      active
    } = _ref2;
    const {
      code
    } = event.nativeEvent;
    if (keyboardCodes.start.includes(code)) {
      const activator = active.activatorNode.current;
      if (activator && event.target !== activator) {
        return false;
      }
      event.preventDefault();
      onActivation == null ? void 0 : onActivation({
        event: event.nativeEvent
      });
      return true;
    }
    return false;
  }
}];
function isDistanceConstraint(constraint) {
  return Boolean(constraint && "distance" in constraint);
}
function isDelayConstraint(constraint) {
  return Boolean(constraint && "delay" in constraint);
}
var AbstractPointerSensor = class {
  constructor(props, events2, listenerTarget) {
    var _getEventCoordinates;
    if (listenerTarget === void 0) {
      listenerTarget = getEventListenerTarget(props.event.target);
    }
    this.props = void 0;
    this.events = void 0;
    this.autoScrollEnabled = true;
    this.document = void 0;
    this.activated = false;
    this.initialCoordinates = void 0;
    this.timeoutId = null;
    this.listeners = void 0;
    this.documentListeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    this.events = events2;
    const {
      event
    } = props;
    const {
      target
    } = event;
    this.props = props;
    this.events = events2;
    this.document = getOwnerDocument(target);
    this.documentListeners = new Listeners(this.document);
    this.listeners = new Listeners(listenerTarget);
    this.windowListeners = new Listeners(getWindow(target));
    this.initialCoordinates = (_getEventCoordinates = getEventCoordinates(event)) != null ? _getEventCoordinates : defaultCoordinates;
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.removeTextSelection = this.removeTextSelection.bind(this);
    this.attach();
  }
  attach() {
    const {
      events: events2,
      props: {
        options: {
          activationConstraint,
          bypassActivationConstraint
        }
      }
    } = this;
    this.listeners.add(events2.move.name, this.handleMove, {
      passive: false
    });
    this.listeners.add(events2.end.name, this.handleEnd);
    if (events2.cancel) {
      this.listeners.add(events2.cancel.name, this.handleCancel);
    }
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.DragStart, preventDefault);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    this.windowListeners.add(EventName.ContextMenu, preventDefault);
    this.documentListeners.add(EventName.Keydown, this.handleKeydown);
    if (activationConstraint) {
      if (bypassActivationConstraint != null && bypassActivationConstraint({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      })) {
        return this.handleStart();
      }
      if (isDelayConstraint(activationConstraint)) {
        this.timeoutId = setTimeout(this.handleStart, activationConstraint.delay);
        this.handlePending(activationConstraint);
        return;
      }
      if (isDistanceConstraint(activationConstraint)) {
        this.handlePending(activationConstraint);
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
    setTimeout(this.documentListeners.removeAll, 50);
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
  handlePending(constraint, offset) {
    const {
      active,
      onPending
    } = this.props;
    onPending(active, constraint, this.initialCoordinates, offset);
  }
  handleStart() {
    const {
      initialCoordinates
    } = this;
    const {
      onStart
    } = this.props;
    if (initialCoordinates) {
      this.activated = true;
      this.documentListeners.add(EventName.Click, stopPropagation, {
        capture: true
      });
      this.removeTextSelection();
      this.documentListeners.add(EventName.SelectionChange, this.removeTextSelection);
      onStart(initialCoordinates);
    }
  }
  handleMove(event) {
    var _getEventCoordinates2;
    const {
      activated,
      initialCoordinates,
      props
    } = this;
    const {
      onMove,
      options: {
        activationConstraint
      }
    } = props;
    if (!initialCoordinates) {
      return;
    }
    const coordinates = (_getEventCoordinates2 = getEventCoordinates(event)) != null ? _getEventCoordinates2 : defaultCoordinates;
    const delta = subtract(initialCoordinates, coordinates);
    if (!activated && activationConstraint) {
      if (isDistanceConstraint(activationConstraint)) {
        if (activationConstraint.tolerance != null && hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
        if (hasExceededDistance(delta, activationConstraint.distance)) {
          return this.handleStart();
        }
      }
      if (isDelayConstraint(activationConstraint)) {
        if (hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
      }
      this.handlePending(activationConstraint, delta);
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    onMove(coordinates);
  }
  handleEnd() {
    const {
      onAbort,
      onEnd
    } = this.props;
    this.detach();
    if (!this.activated) {
      onAbort(this.props.active);
    }
    onEnd();
  }
  handleCancel() {
    const {
      onAbort,
      onCancel
    } = this.props;
    this.detach();
    if (!this.activated) {
      onAbort(this.props.active);
    }
    onCancel();
  }
  handleKeydown(event) {
    if (event.code === KeyboardCode.Esc) {
      this.handleCancel();
    }
  }
  removeTextSelection() {
    var _this$document$getSel;
    (_this$document$getSel = this.document.getSelection()) == null ? void 0 : _this$document$getSel.removeAllRanges();
  }
};
var events = {
  cancel: {
    name: "pointercancel"
  },
  move: {
    name: "pointermove"
  },
  end: {
    name: "pointerup"
  }
};
var PointerSensor = class extends AbstractPointerSensor {
  constructor(props) {
    const {
      event
    } = props;
    const listenerTarget = getOwnerDocument(event.target);
    super(props, events, listenerTarget);
  }
};
PointerSensor.activators = [{
  eventName: "onPointerDown",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    if (!event.isPrimary || event.button !== 0) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
var events$1 = {
  move: {
    name: "mousemove"
  },
  end: {
    name: "mouseup"
  }
};
var MouseButton;
(function(MouseButton2) {
  MouseButton2[MouseButton2["RightClick"] = 2] = "RightClick";
})(MouseButton || (MouseButton = {}));
var MouseSensor = class extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$1, getOwnerDocument(props.event.target));
  }
};
MouseSensor.activators = [{
  eventName: "onMouseDown",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    if (event.button === MouseButton.RightClick) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
var events$2 = {
  cancel: {
    name: "touchcancel"
  },
  move: {
    name: "touchmove"
  },
  end: {
    name: "touchend"
  }
};
var TouchSensor = class extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$2);
  }
  static setup() {
    window.addEventListener(events$2.move.name, noop2, {
      capture: false,
      passive: false
    });
    return function teardown() {
      window.removeEventListener(events$2.move.name, noop2);
    };
    function noop2() {
    }
  }
};
TouchSensor.activators = [{
  eventName: "onTouchStart",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    const {
      touches
    } = event;
    if (touches.length > 1) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
var AutoScrollActivator;
(function(AutoScrollActivator2) {
  AutoScrollActivator2[AutoScrollActivator2["Pointer"] = 0] = "Pointer";
  AutoScrollActivator2[AutoScrollActivator2["DraggableRect"] = 1] = "DraggableRect";
})(AutoScrollActivator || (AutoScrollActivator = {}));
var TraversalOrder;
(function(TraversalOrder2) {
  TraversalOrder2[TraversalOrder2["TreeOrder"] = 0] = "TreeOrder";
  TraversalOrder2[TraversalOrder2["ReversedTreeOrder"] = 1] = "ReversedTreeOrder";
})(TraversalOrder || (TraversalOrder = {}));
function useAutoScroller(_ref) {
  let {
    acceleration,
    activator = AutoScrollActivator.Pointer,
    canScroll,
    draggingRect,
    enabled,
    interval = 5,
    order = TraversalOrder.TreeOrder,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects,
    delta,
    threshold
  } = _ref;
  const scrollIntent = useScrollIntent({
    delta,
    disabled: !enabled
  });
  const [setAutoScrollInterval, clearAutoScrollInterval] = useInterval();
  const scrollSpeed = (0, import_react14.useRef)({
    x: 0,
    y: 0
  });
  const scrollDirection = (0, import_react14.useRef)({
    x: 0,
    y: 0
  });
  const rect = (0, import_react14.useMemo)(() => {
    switch (activator) {
      case AutoScrollActivator.Pointer:
        return pointerCoordinates ? {
          top: pointerCoordinates.y,
          bottom: pointerCoordinates.y,
          left: pointerCoordinates.x,
          right: pointerCoordinates.x
        } : null;
      case AutoScrollActivator.DraggableRect:
        return draggingRect;
    }
  }, [activator, draggingRect, pointerCoordinates]);
  const scrollContainerRef = (0, import_react14.useRef)(null);
  const autoScroll = (0, import_react14.useCallback)(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }
    const scrollLeft = scrollSpeed.current.x * scrollDirection.current.x;
    const scrollTop = scrollSpeed.current.y * scrollDirection.current.y;
    scrollContainer.scrollBy(scrollLeft, scrollTop);
  }, []);
  const sortedScrollableAncestors = (0, import_react14.useMemo)(() => order === TraversalOrder.TreeOrder ? [...scrollableAncestors].reverse() : scrollableAncestors, [order, scrollableAncestors]);
  (0, import_react14.useEffect)(
    () => {
      if (!enabled || !scrollableAncestors.length || !rect) {
        clearAutoScrollInterval();
        return;
      }
      for (const scrollContainer of sortedScrollableAncestors) {
        if ((canScroll == null ? void 0 : canScroll(scrollContainer)) === false) {
          continue;
        }
        const index = scrollableAncestors.indexOf(scrollContainer);
        const scrollContainerRect = scrollableAncestorRects[index];
        if (!scrollContainerRect) {
          continue;
        }
        const {
          direction,
          speed
        } = getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, rect, acceleration, threshold);
        for (const axis of ["x", "y"]) {
          if (!scrollIntent[axis][direction[axis]]) {
            speed[axis] = 0;
            direction[axis] = 0;
          }
        }
        if (speed.x > 0 || speed.y > 0) {
          clearAutoScrollInterval();
          scrollContainerRef.current = scrollContainer;
          setAutoScrollInterval(autoScroll, interval);
          scrollSpeed.current = speed;
          scrollDirection.current = direction;
          return;
        }
      }
      scrollSpeed.current = {
        x: 0,
        y: 0
      };
      scrollDirection.current = {
        x: 0,
        y: 0
      };
      clearAutoScrollInterval();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      acceleration,
      autoScroll,
      canScroll,
      clearAutoScrollInterval,
      enabled,
      interval,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(rect),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(scrollIntent),
      setAutoScrollInterval,
      scrollableAncestors,
      sortedScrollableAncestors,
      scrollableAncestorRects,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(threshold)
    ]
  );
}
var defaultScrollIntent = {
  x: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  },
  y: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  }
};
function useScrollIntent(_ref2) {
  let {
    delta,
    disabled
  } = _ref2;
  const previousDelta = usePrevious(delta);
  return useLazyMemo((previousIntent) => {
    if (disabled || !previousDelta || !previousIntent) {
      return defaultScrollIntent;
    }
    const direction = {
      x: Math.sign(delta.x - previousDelta.x),
      y: Math.sign(delta.y - previousDelta.y)
    };
    return {
      x: {
        [Direction.Backward]: previousIntent.x[Direction.Backward] || direction.x === -1,
        [Direction.Forward]: previousIntent.x[Direction.Forward] || direction.x === 1
      },
      y: {
        [Direction.Backward]: previousIntent.y[Direction.Backward] || direction.y === -1,
        [Direction.Forward]: previousIntent.y[Direction.Forward] || direction.y === 1
      }
    };
  }, [disabled, delta, previousDelta]);
}
function useCachedNode(draggableNodes, id) {
  const draggableNode = id != null ? draggableNodes.get(id) : void 0;
  const node = draggableNode ? draggableNode.node.current : null;
  return useLazyMemo((cachedNode) => {
    var _ref;
    if (id == null) {
      return null;
    }
    return (_ref = node != null ? node : cachedNode) != null ? _ref : null;
  }, [node, id]);
}
function useCombineActivators(sensors, getSyntheticHandler) {
  return (0, import_react14.useMemo)(() => sensors.reduce((accumulator, sensor) => {
    const {
      sensor: Sensor
    } = sensor;
    const sensorActivators = Sensor.activators.map((activator) => ({
      eventName: activator.eventName,
      handler: getSyntheticHandler(activator.handler, sensor)
    }));
    return [...accumulator, ...sensorActivators];
  }, []), [sensors, getSyntheticHandler]);
}
var MeasuringStrategy;
(function(MeasuringStrategy2) {
  MeasuringStrategy2[MeasuringStrategy2["Always"] = 0] = "Always";
  MeasuringStrategy2[MeasuringStrategy2["BeforeDragging"] = 1] = "BeforeDragging";
  MeasuringStrategy2[MeasuringStrategy2["WhileDragging"] = 2] = "WhileDragging";
})(MeasuringStrategy || (MeasuringStrategy = {}));
var MeasuringFrequency;
(function(MeasuringFrequency2) {
  MeasuringFrequency2["Optimized"] = "optimized";
})(MeasuringFrequency || (MeasuringFrequency = {}));
var defaultValue = /* @__PURE__ */ new Map();
function useDroppableMeasuring(containers, _ref) {
  let {
    dragging,
    dependencies,
    config
  } = _ref;
  const [queue, setQueue] = (0, import_react14.useState)(null);
  const {
    frequency,
    measure,
    strategy
  } = config;
  const containersRef = (0, import_react14.useRef)(containers);
  const disabled = isDisabled();
  const disabledRef = useLatestValue(disabled);
  const measureDroppableContainers = (0, import_react14.useCallback)(function(ids2) {
    if (ids2 === void 0) {
      ids2 = [];
    }
    if (disabledRef.current) {
      return;
    }
    setQueue((value) => {
      if (value === null) {
        return ids2;
      }
      return value.concat(ids2.filter((id) => !value.includes(id)));
    });
  }, [disabledRef]);
  const timeoutId = (0, import_react14.useRef)(null);
  const droppableRects = useLazyMemo((previousValue) => {
    if (disabled && !dragging) {
      return defaultValue;
    }
    if (!previousValue || previousValue === defaultValue || containersRef.current !== containers || queue != null) {
      const map = /* @__PURE__ */ new Map();
      for (let container of containers) {
        if (!container) {
          continue;
        }
        if (queue && queue.length > 0 && !queue.includes(container.id) && container.rect.current) {
          map.set(container.id, container.rect.current);
          continue;
        }
        const node = container.node.current;
        const rect = node ? new Rect(measure(node), node) : null;
        container.rect.current = rect;
        if (rect) {
          map.set(container.id, rect);
        }
      }
      return map;
    }
    return previousValue;
  }, [containers, queue, dragging, disabled, measure]);
  (0, import_react14.useEffect)(() => {
    containersRef.current = containers;
  }, [containers]);
  (0, import_react14.useEffect)(
    () => {
      if (disabled) {
        return;
      }
      measureDroppableContainers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dragging, disabled]
  );
  (0, import_react14.useEffect)(
    () => {
      if (queue && queue.length > 0) {
        setQueue(null);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(queue)]
  );
  (0, import_react14.useEffect)(
    () => {
      if (disabled || typeof frequency !== "number" || timeoutId.current !== null) {
        return;
      }
      timeoutId.current = setTimeout(() => {
        measureDroppableContainers();
        timeoutId.current = null;
      }, frequency);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [frequency, disabled, measureDroppableContainers, ...dependencies]
  );
  return {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled: queue != null
  };
  function isDisabled() {
    switch (strategy) {
      case MeasuringStrategy.Always:
        return false;
      case MeasuringStrategy.BeforeDragging:
        return dragging;
      default:
        return !dragging;
    }
  }
}
function useInitialValue(value, computeFn) {
  return useLazyMemo((previousValue) => {
    if (!value) {
      return null;
    }
    if (previousValue) {
      return previousValue;
    }
    return typeof computeFn === "function" ? computeFn(value) : value;
  }, [computeFn, value]);
}
function useInitialRect(node, measure) {
  return useInitialValue(node, measure);
}
function useMutationObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleMutations = useEvent(callback);
  const mutationObserver = (0, import_react14.useMemo)(() => {
    if (disabled || typeof window === "undefined" || typeof window.MutationObserver === "undefined") {
      return void 0;
    }
    const {
      MutationObserver
    } = window;
    return new MutationObserver(handleMutations);
  }, [handleMutations, disabled]);
  (0, import_react14.useEffect)(() => {
    return () => mutationObserver == null ? void 0 : mutationObserver.disconnect();
  }, [mutationObserver]);
  return mutationObserver;
}
function useResizeObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleResize = useEvent(callback);
  const resizeObserver = (0, import_react14.useMemo)(
    () => {
      if (disabled || typeof window === "undefined" || typeof window.ResizeObserver === "undefined") {
        return void 0;
      }
      const {
        ResizeObserver
      } = window;
      return new ResizeObserver(handleResize);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled]
  );
  (0, import_react14.useEffect)(() => {
    return () => resizeObserver == null ? void 0 : resizeObserver.disconnect();
  }, [resizeObserver]);
  return resizeObserver;
}
function defaultMeasure(element) {
  return new Rect(getClientRect(element), element);
}
function useRect(element, measure, fallbackRect) {
  if (measure === void 0) {
    measure = defaultMeasure;
  }
  const [rect, setRect] = (0, import_react14.useState)(null);
  function measureRect() {
    setRect((currentRect) => {
      if (!element) {
        return null;
      }
      if (element.isConnected === false) {
        var _ref;
        return (_ref = currentRect != null ? currentRect : fallbackRect) != null ? _ref : null;
      }
      const newRect = measure(element);
      if (JSON.stringify(currentRect) === JSON.stringify(newRect)) {
        return currentRect;
      }
      return newRect;
    });
  }
  const mutationObserver = useMutationObserver({
    callback(records) {
      if (!element) {
        return;
      }
      for (const record of records) {
        const {
          type,
          target
        } = record;
        if (type === "childList" && target instanceof HTMLElement && target.contains(element)) {
          measureRect();
          break;
        }
      }
    }
  });
  const resizeObserver = useResizeObserver({
    callback: measureRect
  });
  useIsomorphicLayoutEffect(() => {
    measureRect();
    if (element) {
      resizeObserver == null ? void 0 : resizeObserver.observe(element);
      mutationObserver == null ? void 0 : mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      mutationObserver == null ? void 0 : mutationObserver.disconnect();
    }
  }, [element]);
  return rect;
}
function useRectDelta(rect) {
  const initialRect = useInitialValue(rect);
  return getRectDelta(rect, initialRect);
}
var defaultValue$1 = [];
function useScrollableAncestors(node) {
  const previousNode = (0, import_react14.useRef)(node);
  const ancestors = useLazyMemo((previousValue) => {
    if (!node) {
      return defaultValue$1;
    }
    if (previousValue && previousValue !== defaultValue$1 && node && previousNode.current && node.parentNode === previousNode.current.parentNode) {
      return previousValue;
    }
    return getScrollableAncestors(node);
  }, [node]);
  (0, import_react14.useEffect)(() => {
    previousNode.current = node;
  }, [node]);
  return ancestors;
}
function useScrollOffsets(elements) {
  const [scrollCoordinates, setScrollCoordinates] = (0, import_react14.useState)(null);
  const prevElements = (0, import_react14.useRef)(elements);
  const handleScroll = (0, import_react14.useCallback)((event) => {
    const scrollingElement = getScrollableElement(event.target);
    if (!scrollingElement) {
      return;
    }
    setScrollCoordinates((scrollCoordinates2) => {
      if (!scrollCoordinates2) {
        return null;
      }
      scrollCoordinates2.set(scrollingElement, getScrollCoordinates(scrollingElement));
      return new Map(scrollCoordinates2);
    });
  }, []);
  (0, import_react14.useEffect)(() => {
    const previousElements = prevElements.current;
    if (elements !== previousElements) {
      cleanup(previousElements);
      const entries = elements.map((element) => {
        const scrollableElement = getScrollableElement(element);
        if (scrollableElement) {
          scrollableElement.addEventListener("scroll", handleScroll, {
            passive: true
          });
          return [scrollableElement, getScrollCoordinates(scrollableElement)];
        }
        return null;
      }).filter((entry) => entry != null);
      setScrollCoordinates(entries.length ? new Map(entries) : null);
      prevElements.current = elements;
    }
    return () => {
      cleanup(elements);
      cleanup(previousElements);
    };
    function cleanup(elements2) {
      elements2.forEach((element) => {
        const scrollableElement = getScrollableElement(element);
        scrollableElement == null ? void 0 : scrollableElement.removeEventListener("scroll", handleScroll);
      });
    }
  }, [handleScroll, elements]);
  return (0, import_react14.useMemo)(() => {
    if (elements.length) {
      return scrollCoordinates ? Array.from(scrollCoordinates.values()).reduce((acc, coordinates) => add(acc, coordinates), defaultCoordinates) : getScrollOffsets(elements);
    }
    return defaultCoordinates;
  }, [elements, scrollCoordinates]);
}
function useScrollOffsetsDelta(scrollOffsets, dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }
  const initialScrollOffsets = (0, import_react14.useRef)(null);
  (0, import_react14.useEffect)(
    () => {
      initialScrollOffsets.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );
  (0, import_react14.useEffect)(() => {
    const hasScrollOffsets = scrollOffsets !== defaultCoordinates;
    if (hasScrollOffsets && !initialScrollOffsets.current) {
      initialScrollOffsets.current = scrollOffsets;
    }
    if (!hasScrollOffsets && initialScrollOffsets.current) {
      initialScrollOffsets.current = null;
    }
  }, [scrollOffsets]);
  return initialScrollOffsets.current ? subtract(scrollOffsets, initialScrollOffsets.current) : defaultCoordinates;
}
function useSensorSetup(sensors) {
  (0, import_react14.useEffect)(
    () => {
      if (!canUseDOM) {
        return;
      }
      const teardownFns = sensors.map((_ref) => {
        let {
          sensor
        } = _ref;
        return sensor.setup == null ? void 0 : sensor.setup();
      });
      return () => {
        for (const teardown of teardownFns) {
          teardown == null ? void 0 : teardown();
        }
      };
    },
    // TO-DO: Sensors length could theoretically change which would not be a valid dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sensors.map((_ref2) => {
      let {
        sensor
      } = _ref2;
      return sensor;
    })
  );
}
function useSyntheticListeners(listeners, id) {
  return (0, import_react14.useMemo)(() => {
    return listeners.reduce((acc, _ref) => {
      let {
        eventName,
        handler
      } = _ref;
      acc[eventName] = (event) => {
        handler(event, id);
      };
      return acc;
    }, {});
  }, [listeners, id]);
}
function useWindowRect(element) {
  return (0, import_react14.useMemo)(() => element ? getWindowClientRect(element) : null, [element]);
}
var defaultValue$2 = [];
function useRects(elements, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }
  const [firstElement] = elements;
  const windowRect = useWindowRect(firstElement ? getWindow(firstElement) : null);
  const [rects, setRects] = (0, import_react14.useState)(defaultValue$2);
  function measureRects() {
    setRects(() => {
      if (!elements.length) {
        return defaultValue$2;
      }
      return elements.map((element) => isDocumentScrollingElement(element) ? windowRect : new Rect(measure(element), element));
    });
  }
  const resizeObserver = useResizeObserver({
    callback: measureRects
  });
  useIsomorphicLayoutEffect(() => {
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    measureRects();
    elements.forEach((element) => resizeObserver == null ? void 0 : resizeObserver.observe(element));
  }, [elements]);
  return rects;
}
function getMeasurableNode(node) {
  if (!node) {
    return null;
  }
  if (node.children.length > 1) {
    return node;
  }
  const firstChild = node.children[0];
  return isHTMLElement(firstChild) ? firstChild : node;
}
function useDragOverlayMeasuring(_ref) {
  let {
    measure
  } = _ref;
  const [rect, setRect] = (0, import_react14.useState)(null);
  const handleResize = (0, import_react14.useCallback)((entries) => {
    for (const {
      target
    } of entries) {
      if (isHTMLElement(target)) {
        setRect((rect2) => {
          const newRect = measure(target);
          return rect2 ? {
            ...rect2,
            width: newRect.width,
            height: newRect.height
          } : newRect;
        });
        break;
      }
    }
  }, [measure]);
  const resizeObserver = useResizeObserver({
    callback: handleResize
  });
  const handleNodeChange = (0, import_react14.useCallback)((element) => {
    const node = getMeasurableNode(element);
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    if (node) {
      resizeObserver == null ? void 0 : resizeObserver.observe(node);
    }
    setRect(node ? measure(node) : null);
  }, [measure, resizeObserver]);
  const [nodeRef, setRef] = useNodeRef(handleNodeChange);
  return (0, import_react14.useMemo)(() => ({
    nodeRef,
    rect,
    setRef
  }), [rect, nodeRef, setRef]);
}
var defaultSensors = [{
  sensor: PointerSensor,
  options: {}
}, {
  sensor: KeyboardSensor,
  options: {}
}];
var defaultData = {
  current: {}
};
var defaultMeasuringConfiguration = {
  draggable: {
    measure: getTransformAgnosticClientRect
  },
  droppable: {
    measure: getTransformAgnosticClientRect,
    strategy: MeasuringStrategy.WhileDragging,
    frequency: MeasuringFrequency.Optimized
  },
  dragOverlay: {
    measure: getClientRect
  }
};
var DroppableContainersMap = class extends Map {
  get(id) {
    var _super$get;
    return id != null ? (_super$get = super.get(id)) != null ? _super$get : void 0 : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((_ref) => {
      let {
        disabled
      } = _ref;
      return !disabled;
    });
  }
  getNodeFor(id) {
    var _this$get$node$curren, _this$get;
    return (_this$get$node$curren = (_this$get = this.get(id)) == null ? void 0 : _this$get.node.current) != null ? _this$get$node$curren : void 0;
  }
};
var defaultPublicContext = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: new DroppableContainersMap(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: noop
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: defaultMeasuringConfiguration,
  measureDroppableContainers: noop,
  windowRect: null,
  measuringScheduled: false
};
var defaultInternalContext = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: noop,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: noop
};
var InternalContext = (0, import_react14.createContext)(defaultInternalContext);
var PublicContext = (0, import_react14.createContext)(defaultPublicContext);
function getInitialState() {
  return {
    draggable: {
      active: null,
      initialCoordinates: {
        x: 0,
        y: 0
      },
      nodes: /* @__PURE__ */ new Map(),
      translate: {
        x: 0,
        y: 0
      }
    },
    droppable: {
      containers: new DroppableContainersMap()
    }
  };
}
function reducer(state, action) {
  switch (action.type) {
    case Action.DragStart:
      return {
        ...state,
        draggable: {
          ...state.draggable,
          initialCoordinates: action.initialCoordinates,
          active: action.active
        }
      };
    case Action.DragMove:
      if (state.draggable.active == null) {
        return state;
      }
      return {
        ...state,
        draggable: {
          ...state.draggable,
          translate: {
            x: action.coordinates.x - state.draggable.initialCoordinates.x,
            y: action.coordinates.y - state.draggable.initialCoordinates.y
          }
        }
      };
    case Action.DragEnd:
    case Action.DragCancel:
      return {
        ...state,
        draggable: {
          ...state.draggable,
          active: null,
          initialCoordinates: {
            x: 0,
            y: 0
          },
          translate: {
            x: 0,
            y: 0
          }
        }
      };
    case Action.RegisterDroppable: {
      const {
        element
      } = action;
      const {
        id
      } = element;
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.set(id, element);
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    case Action.SetDroppableDisabled: {
      const {
        id,
        key: key2,
        disabled
      } = action;
      const element = state.droppable.containers.get(id);
      if (!element || key2 !== element.key) {
        return state;
      }
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.set(id, {
        ...element,
        disabled
      });
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    case Action.UnregisterDroppable: {
      const {
        id,
        key: key2
      } = action;
      const element = state.droppable.containers.get(id);
      if (!element || key2 !== element.key) {
        return state;
      }
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.delete(id);
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    default: {
      return state;
    }
  }
}
function RestoreFocus(_ref) {
  let {
    disabled
  } = _ref;
  const {
    active,
    activatorEvent,
    draggableNodes
  } = (0, import_react14.useContext)(InternalContext);
  const previousActivatorEvent = usePrevious(activatorEvent);
  const previousActiveId = usePrevious(active == null ? void 0 : active.id);
  (0, import_react14.useEffect)(() => {
    if (disabled) {
      return;
    }
    if (!activatorEvent && previousActivatorEvent && previousActiveId != null) {
      if (!isKeyboardEvent(previousActivatorEvent)) {
        return;
      }
      if (document.activeElement === previousActivatorEvent.target) {
        return;
      }
      const draggableNode = draggableNodes.get(previousActiveId);
      if (!draggableNode) {
        return;
      }
      const {
        activatorNode,
        node
      } = draggableNode;
      if (!activatorNode.current && !node.current) {
        return;
      }
      requestAnimationFrame(() => {
        for (const element of [activatorNode.current, node.current]) {
          if (!element) {
            continue;
          }
          const focusableNode = findFirstFocusableNode(element);
          if (focusableNode) {
            focusableNode.focus();
            break;
          }
        }
      });
    }
  }, [activatorEvent, disabled, draggableNodes, previousActiveId, previousActivatorEvent]);
  return null;
}
function applyModifiers(modifiers, _ref) {
  let {
    transform,
    ...args
  } = _ref;
  return modifiers != null && modifiers.length ? modifiers.reduce((accumulator, modifier) => {
    return modifier({
      transform: accumulator,
      ...args
    });
  }, transform) : transform;
}
function useMeasuringConfiguration(config) {
  return (0, import_react14.useMemo)(
    () => ({
      draggable: {
        ...defaultMeasuringConfiguration.draggable,
        ...config == null ? void 0 : config.draggable
      },
      droppable: {
        ...defaultMeasuringConfiguration.droppable,
        ...config == null ? void 0 : config.droppable
      },
      dragOverlay: {
        ...defaultMeasuringConfiguration.dragOverlay,
        ...config == null ? void 0 : config.dragOverlay
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config == null ? void 0 : config.draggable, config == null ? void 0 : config.droppable, config == null ? void 0 : config.dragOverlay]
  );
}
function useLayoutShiftScrollCompensation(_ref) {
  let {
    activeNode,
    measure,
    initialRect,
    config = true
  } = _ref;
  const initialized = (0, import_react14.useRef)(false);
  const {
    x,
    y
  } = typeof config === "boolean" ? {
    x: config,
    y: config
  } : config;
  useIsomorphicLayoutEffect(() => {
    const disabled = !x && !y;
    if (disabled || !activeNode) {
      initialized.current = false;
      return;
    }
    if (initialized.current || !initialRect) {
      return;
    }
    const node = activeNode == null ? void 0 : activeNode.node.current;
    if (!node || node.isConnected === false) {
      return;
    }
    const rect = measure(node);
    const rectDelta = getRectDelta(rect, initialRect);
    if (!x) {
      rectDelta.x = 0;
    }
    if (!y) {
      rectDelta.y = 0;
    }
    initialized.current = true;
    if (Math.abs(rectDelta.x) > 0 || Math.abs(rectDelta.y) > 0) {
      const firstScrollableAncestor = getFirstScrollableAncestor(node);
      if (firstScrollableAncestor) {
        firstScrollableAncestor.scrollBy({
          top: rectDelta.y,
          left: rectDelta.x
        });
      }
    }
  }, [activeNode, x, y, initialRect, measure]);
}
var ActiveDraggableContext = (0, import_react14.createContext)({
  ...defaultCoordinates,
  scaleX: 1,
  scaleY: 1
});
var Status;
(function(Status2) {
  Status2[Status2["Uninitialized"] = 0] = "Uninitialized";
  Status2[Status2["Initializing"] = 1] = "Initializing";
  Status2[Status2["Initialized"] = 2] = "Initialized";
})(Status || (Status = {}));
var DndContext = (0, import_react14.memo)(function DndContext2(_ref) {
  var _sensorContext$curren, _dragOverlay$nodeRef$, _dragOverlay$rect, _over$rect;
  let {
    id,
    accessibility,
    autoScroll = true,
    children,
    sensors = defaultSensors,
    collisionDetection = rectIntersection,
    measuring,
    modifiers,
    ...props
  } = _ref;
  const store = (0, import_react14.useReducer)(reducer, void 0, getInitialState);
  const [state, dispatch] = store;
  const [dispatchMonitorEvent, registerMonitorListener] = useDndMonitorProvider();
  const [status, setStatus] = (0, import_react14.useState)(Status.Uninitialized);
  const isInitialized = status === Status.Initialized;
  const {
    draggable: {
      active: activeId,
      nodes: draggableNodes,
      translate
    },
    droppable: {
      containers: droppableContainers
    }
  } = state;
  const node = activeId != null ? draggableNodes.get(activeId) : null;
  const activeRects = (0, import_react14.useRef)({
    initial: null,
    translated: null
  });
  const active = (0, import_react14.useMemo)(() => {
    var _node$data;
    return activeId != null ? {
      id: activeId,
      // It's possible for the active node to unmount while dragging
      data: (_node$data = node == null ? void 0 : node.data) != null ? _node$data : defaultData,
      rect: activeRects
    } : null;
  }, [activeId, node]);
  const activeRef = (0, import_react14.useRef)(null);
  const [activeSensor, setActiveSensor] = (0, import_react14.useState)(null);
  const [activatorEvent, setActivatorEvent] = (0, import_react14.useState)(null);
  const latestProps = useLatestValue(props, Object.values(props));
  const draggableDescribedById = useUniqueId2("DndDescribedBy", id);
  const enabledDroppableContainers = (0, import_react14.useMemo)(() => droppableContainers.getEnabled(), [droppableContainers]);
  const measuringConfiguration = useMeasuringConfiguration(measuring);
  const {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled
  } = useDroppableMeasuring(enabledDroppableContainers, {
    dragging: isInitialized,
    dependencies: [translate.x, translate.y],
    config: measuringConfiguration.droppable
  });
  const activeNode = useCachedNode(draggableNodes, activeId);
  const activationCoordinates = (0, import_react14.useMemo)(() => activatorEvent ? getEventCoordinates(activatorEvent) : null, [activatorEvent]);
  const autoScrollOptions = getAutoScrollerOptions();
  const initialActiveNodeRect = useInitialRect(activeNode, measuringConfiguration.draggable.measure);
  useLayoutShiftScrollCompensation({
    activeNode: activeId != null ? draggableNodes.get(activeId) : null,
    config: autoScrollOptions.layoutShiftCompensation,
    initialRect: initialActiveNodeRect,
    measure: measuringConfiguration.draggable.measure
  });
  const activeNodeRect = useRect(activeNode, measuringConfiguration.draggable.measure, initialActiveNodeRect);
  const containerNodeRect = useRect(activeNode ? activeNode.parentElement : null);
  const sensorContext = (0, import_react14.useRef)({
    activatorEvent: null,
    active: null,
    activeNode,
    collisionRect: null,
    collisions: null,
    droppableRects,
    draggableNodes,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  });
  const overNode = droppableContainers.getNodeFor((_sensorContext$curren = sensorContext.current.over) == null ? void 0 : _sensorContext$curren.id);
  const dragOverlay = useDragOverlayMeasuring({
    measure: measuringConfiguration.dragOverlay.measure
  });
  const draggingNode = (_dragOverlay$nodeRef$ = dragOverlay.nodeRef.current) != null ? _dragOverlay$nodeRef$ : activeNode;
  const draggingNodeRect = isInitialized ? (_dragOverlay$rect = dragOverlay.rect) != null ? _dragOverlay$rect : activeNodeRect : null;
  const usesDragOverlay = Boolean(dragOverlay.nodeRef.current && dragOverlay.rect);
  const nodeRectDelta = useRectDelta(usesDragOverlay ? null : activeNodeRect);
  const windowRect = useWindowRect(draggingNode ? getWindow(draggingNode) : null);
  const scrollableAncestors = useScrollableAncestors(isInitialized ? overNode != null ? overNode : activeNode : null);
  const scrollableAncestorRects = useRects(scrollableAncestors);
  const modifiedTranslate = applyModifiers(modifiers, {
    transform: {
      x: translate.x - nodeRectDelta.x,
      y: translate.y - nodeRectDelta.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect,
    over: sensorContext.current.over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  });
  const pointerCoordinates = activationCoordinates ? add(activationCoordinates, translate) : null;
  const scrollOffsets = useScrollOffsets(scrollableAncestors);
  const scrollAdjustment = useScrollOffsetsDelta(scrollOffsets);
  const activeNodeScrollDelta = useScrollOffsetsDelta(scrollOffsets, [activeNodeRect]);
  const scrollAdjustedTranslate = add(modifiedTranslate, scrollAdjustment);
  const collisionRect = draggingNodeRect ? getAdjustedRect(draggingNodeRect, modifiedTranslate) : null;
  const collisions = active && collisionRect ? collisionDetection({
    active,
    collisionRect,
    droppableRects,
    droppableContainers: enabledDroppableContainers,
    pointerCoordinates
  }) : null;
  const overId = getFirstCollision(collisions, "id");
  const [over, setOver] = (0, import_react14.useState)(null);
  const appliedTranslate = usesDragOverlay ? modifiedTranslate : add(modifiedTranslate, activeNodeScrollDelta);
  const transform = adjustScale(appliedTranslate, (_over$rect = over == null ? void 0 : over.rect) != null ? _over$rect : null, activeNodeRect);
  const activeSensorRef = (0, import_react14.useRef)(null);
  const instantiateSensor = (0, import_react14.useCallback)(
    (event, _ref2) => {
      let {
        sensor: Sensor,
        options
      } = _ref2;
      if (activeRef.current == null) {
        return;
      }
      const activeNode2 = draggableNodes.get(activeRef.current);
      if (!activeNode2) {
        return;
      }
      const activatorEvent2 = event.nativeEvent;
      const sensorInstance = new Sensor({
        active: activeRef.current,
        activeNode: activeNode2,
        event: activatorEvent2,
        options,
        // Sensors need to be instantiated with refs for arguments that change over time
        // otherwise they are frozen in time with the stale arguments
        context: sensorContext,
        onAbort(id2) {
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragAbort
          } = latestProps.current;
          const event2 = {
            id: id2
          };
          onDragAbort == null ? void 0 : onDragAbort(event2);
          dispatchMonitorEvent({
            type: "onDragAbort",
            event: event2
          });
        },
        onPending(id2, constraint, initialCoordinates, offset) {
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragPending
          } = latestProps.current;
          const event2 = {
            id: id2,
            constraint,
            initialCoordinates,
            offset
          };
          onDragPending == null ? void 0 : onDragPending(event2);
          dispatchMonitorEvent({
            type: "onDragPending",
            event: event2
          });
        },
        onStart(initialCoordinates) {
          const id2 = activeRef.current;
          if (id2 == null) {
            return;
          }
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragStart
          } = latestProps.current;
          const event2 = {
            activatorEvent: activatorEvent2,
            active: {
              id: id2,
              data: draggableNode.data,
              rect: activeRects
            }
          };
          (0, import_react_dom.unstable_batchedUpdates)(() => {
            onDragStart == null ? void 0 : onDragStart(event2);
            setStatus(Status.Initializing);
            dispatch({
              type: Action.DragStart,
              initialCoordinates,
              active: id2
            });
            dispatchMonitorEvent({
              type: "onDragStart",
              event: event2
            });
            setActiveSensor(activeSensorRef.current);
            setActivatorEvent(activatorEvent2);
          });
        },
        onMove(coordinates) {
          dispatch({
            type: Action.DragMove,
            coordinates
          });
        },
        onEnd: createHandler(Action.DragEnd),
        onCancel: createHandler(Action.DragCancel)
      });
      activeSensorRef.current = sensorInstance;
      function createHandler(type) {
        return async function handler() {
          const {
            active: active2,
            collisions: collisions2,
            over: over2,
            scrollAdjustedTranslate: scrollAdjustedTranslate2
          } = sensorContext.current;
          let event2 = null;
          if (active2 && scrollAdjustedTranslate2) {
            const {
              cancelDrop
            } = latestProps.current;
            event2 = {
              activatorEvent: activatorEvent2,
              active: active2,
              collisions: collisions2,
              delta: scrollAdjustedTranslate2,
              over: over2
            };
            if (type === Action.DragEnd && typeof cancelDrop === "function") {
              const shouldCancel = await Promise.resolve(cancelDrop(event2));
              if (shouldCancel) {
                type = Action.DragCancel;
              }
            }
          }
          activeRef.current = null;
          (0, import_react_dom.unstable_batchedUpdates)(() => {
            dispatch({
              type
            });
            setStatus(Status.Uninitialized);
            setOver(null);
            setActiveSensor(null);
            setActivatorEvent(null);
            activeSensorRef.current = null;
            const eventName = type === Action.DragEnd ? "onDragEnd" : "onDragCancel";
            if (event2) {
              const handler2 = latestProps.current[eventName];
              handler2 == null ? void 0 : handler2(event2);
              dispatchMonitorEvent({
                type: eventName,
                event: event2
              });
            }
          });
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draggableNodes]
  );
  const bindActivatorToSensorInstantiator = (0, import_react14.useCallback)((handler, sensor) => {
    return (event, active2) => {
      const nativeEvent = event.nativeEvent;
      const activeDraggableNode = draggableNodes.get(active2);
      if (
        // Another sensor is already instantiating
        activeRef.current !== null || // No active draggable
        !activeDraggableNode || // Event has already been captured
        nativeEvent.dndKit || nativeEvent.defaultPrevented
      ) {
        return;
      }
      const activationContext = {
        active: activeDraggableNode
      };
      const shouldActivate = handler(event, sensor.options, activationContext);
      if (shouldActivate === true) {
        nativeEvent.dndKit = {
          capturedBy: sensor.sensor
        };
        activeRef.current = active2;
        instantiateSensor(event, sensor);
      }
    };
  }, [draggableNodes, instantiateSensor]);
  const activators = useCombineActivators(sensors, bindActivatorToSensorInstantiator);
  useSensorSetup(sensors);
  useIsomorphicLayoutEffect(() => {
    if (activeNodeRect && status === Status.Initializing) {
      setStatus(Status.Initialized);
    }
  }, [activeNodeRect, status]);
  (0, import_react14.useEffect)(
    () => {
      const {
        onDragMove
      } = latestProps.current;
      const {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        over: over2
      } = sensorContext.current;
      if (!active2 || !activatorEvent2) {
        return;
      }
      const event = {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        delta: {
          x: scrollAdjustedTranslate.x,
          y: scrollAdjustedTranslate.y
        },
        over: over2
      };
      (0, import_react_dom.unstable_batchedUpdates)(() => {
        onDragMove == null ? void 0 : onDragMove(event);
        dispatchMonitorEvent({
          type: "onDragMove",
          event
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollAdjustedTranslate.x, scrollAdjustedTranslate.y]
  );
  (0, import_react14.useEffect)(
    () => {
      const {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        droppableContainers: droppableContainers2,
        scrollAdjustedTranslate: scrollAdjustedTranslate2
      } = sensorContext.current;
      if (!active2 || activeRef.current == null || !activatorEvent2 || !scrollAdjustedTranslate2) {
        return;
      }
      const {
        onDragOver
      } = latestProps.current;
      const overContainer = droppableContainers2.get(overId);
      const over2 = overContainer && overContainer.rect.current ? {
        id: overContainer.id,
        rect: overContainer.rect.current,
        data: overContainer.data,
        disabled: overContainer.disabled
      } : null;
      const event = {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        delta: {
          x: scrollAdjustedTranslate2.x,
          y: scrollAdjustedTranslate2.y
        },
        over: over2
      };
      (0, import_react_dom.unstable_batchedUpdates)(() => {
        setOver(over2);
        onDragOver == null ? void 0 : onDragOver(event);
        dispatchMonitorEvent({
          type: "onDragOver",
          event
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [overId]
  );
  useIsomorphicLayoutEffect(() => {
    sensorContext.current = {
      activatorEvent,
      active,
      activeNode,
      collisionRect,
      collisions,
      droppableRects,
      draggableNodes,
      draggingNode,
      draggingNodeRect,
      droppableContainers,
      over,
      scrollableAncestors,
      scrollAdjustedTranslate
    };
    activeRects.current = {
      initial: draggingNodeRect,
      translated: collisionRect
    };
  }, [active, activeNode, collisions, collisionRect, draggableNodes, draggingNode, draggingNodeRect, droppableRects, droppableContainers, over, scrollableAncestors, scrollAdjustedTranslate]);
  useAutoScroller({
    ...autoScrollOptions,
    delta: translate,
    draggingRect: collisionRect,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects
  });
  const publicContext = (0, import_react14.useMemo)(() => {
    const context = {
      active,
      activeNode,
      activeNodeRect,
      activatorEvent,
      collisions,
      containerNodeRect,
      dragOverlay,
      draggableNodes,
      droppableContainers,
      droppableRects,
      over,
      measureDroppableContainers,
      scrollableAncestors,
      scrollableAncestorRects,
      measuringConfiguration,
      measuringScheduled,
      windowRect
    };
    return context;
  }, [active, activeNode, activeNodeRect, activatorEvent, collisions, containerNodeRect, dragOverlay, draggableNodes, droppableContainers, droppableRects, over, measureDroppableContainers, scrollableAncestors, scrollableAncestorRects, measuringConfiguration, measuringScheduled, windowRect]);
  const internalContext = (0, import_react14.useMemo)(() => {
    const context = {
      activatorEvent,
      activators,
      active,
      activeNodeRect,
      ariaDescribedById: {
        draggable: draggableDescribedById
      },
      dispatch,
      draggableNodes,
      over,
      measureDroppableContainers
    };
    return context;
  }, [activatorEvent, activators, active, activeNodeRect, dispatch, draggableDescribedById, draggableNodes, over, measureDroppableContainers]);
  return import_react14.default.createElement(DndMonitorContext.Provider, {
    value: registerMonitorListener
  }, import_react14.default.createElement(InternalContext.Provider, {
    value: internalContext
  }, import_react14.default.createElement(PublicContext.Provider, {
    value: publicContext
  }, import_react14.default.createElement(ActiveDraggableContext.Provider, {
    value: transform
  }, children)), import_react14.default.createElement(RestoreFocus, {
    disabled: (accessibility == null ? void 0 : accessibility.restoreFocus) === false
  })), import_react14.default.createElement(Accessibility, {
    ...accessibility,
    hiddenTextDescribedById: draggableDescribedById
  }));
  function getAutoScrollerOptions() {
    const activeSensorDisablesAutoscroll = (activeSensor == null ? void 0 : activeSensor.autoScrollEnabled) === false;
    const autoScrollGloballyDisabled = typeof autoScroll === "object" ? autoScroll.enabled === false : autoScroll === false;
    const enabled = isInitialized && !activeSensorDisablesAutoscroll && !autoScrollGloballyDisabled;
    if (typeof autoScroll === "object") {
      return {
        ...autoScroll,
        enabled
      };
    }
    return {
      enabled
    };
  }
});
var NullContext = (0, import_react14.createContext)(null);
var defaultRole = "button";
var ID_PREFIX = "Draggable";
function useDraggable(_ref) {
  let {
    id,
    data,
    disabled = false,
    attributes
  } = _ref;
  const key2 = useUniqueId2(ID_PREFIX);
  const {
    activators,
    activatorEvent,
    active,
    activeNodeRect,
    ariaDescribedById,
    draggableNodes,
    over
  } = (0, import_react14.useContext)(InternalContext);
  const {
    role = defaultRole,
    roleDescription = "draggable",
    tabIndex = 0
  } = attributes != null ? attributes : {};
  const isDragging = (active == null ? void 0 : active.id) === id;
  const transform = (0, import_react14.useContext)(isDragging ? ActiveDraggableContext : NullContext);
  const [node, setNodeRef] = useNodeRef();
  const [activatorNode, setActivatorNodeRef] = useNodeRef();
  const listeners = useSyntheticListeners(activators, id);
  const dataRef = useLatestValue(data);
  useIsomorphicLayoutEffect(
    () => {
      draggableNodes.set(id, {
        id,
        key: key2,
        node,
        activatorNode,
        data: dataRef
      });
      return () => {
        const node2 = draggableNodes.get(id);
        if (node2 && node2.key === key2) {
          draggableNodes.delete(id);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draggableNodes, id]
  );
  const memoizedAttributes = (0, import_react14.useMemo)(() => ({
    role,
    tabIndex,
    "aria-disabled": disabled,
    "aria-pressed": isDragging && role === defaultRole ? true : void 0,
    "aria-roledescription": roleDescription,
    "aria-describedby": ariaDescribedById.draggable
  }), [disabled, role, tabIndex, isDragging, roleDescription, ariaDescribedById.draggable]);
  return {
    active,
    activatorEvent,
    activeNodeRect,
    attributes: memoizedAttributes,
    isDragging,
    listeners: disabled ? void 0 : listeners,
    node,
    over,
    setNodeRef,
    setActivatorNodeRef,
    transform
  };
}
function useDndContext() {
  return (0, import_react14.useContext)(PublicContext);
}
var ID_PREFIX$1 = "Droppable";
var defaultResizeObserverConfig = {
  timeout: 25
};
function useDroppable(_ref) {
  let {
    data,
    disabled = false,
    id,
    resizeObserverConfig
  } = _ref;
  const key2 = useUniqueId2(ID_PREFIX$1);
  const {
    active,
    dispatch,
    over,
    measureDroppableContainers
  } = (0, import_react14.useContext)(InternalContext);
  const previous = (0, import_react14.useRef)({
    disabled
  });
  const resizeObserverConnected = (0, import_react14.useRef)(false);
  const rect = (0, import_react14.useRef)(null);
  const callbackId = (0, import_react14.useRef)(null);
  const {
    disabled: resizeObserverDisabled,
    updateMeasurementsFor,
    timeout: resizeObserverTimeout
  } = {
    ...defaultResizeObserverConfig,
    ...resizeObserverConfig
  };
  const ids2 = useLatestValue(updateMeasurementsFor != null ? updateMeasurementsFor : id);
  const handleResize = (0, import_react14.useCallback)(
    () => {
      if (!resizeObserverConnected.current) {
        resizeObserverConnected.current = true;
        return;
      }
      if (callbackId.current != null) {
        clearTimeout(callbackId.current);
      }
      callbackId.current = setTimeout(() => {
        measureDroppableContainers(Array.isArray(ids2.current) ? ids2.current : [ids2.current]);
        callbackId.current = null;
      }, resizeObserverTimeout);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [resizeObserverTimeout]
  );
  const resizeObserver = useResizeObserver({
    callback: handleResize,
    disabled: resizeObserverDisabled || !active
  });
  const handleNodeChange = (0, import_react14.useCallback)((newElement, previousElement) => {
    if (!resizeObserver) {
      return;
    }
    if (previousElement) {
      resizeObserver.unobserve(previousElement);
      resizeObserverConnected.current = false;
    }
    if (newElement) {
      resizeObserver.observe(newElement);
    }
  }, [resizeObserver]);
  const [nodeRef, setNodeRef] = useNodeRef(handleNodeChange);
  const dataRef = useLatestValue(data);
  (0, import_react14.useEffect)(() => {
    if (!resizeObserver || !nodeRef.current) {
      return;
    }
    resizeObserver.disconnect();
    resizeObserverConnected.current = false;
    resizeObserver.observe(nodeRef.current);
  }, [nodeRef, resizeObserver]);
  (0, import_react14.useEffect)(
    () => {
      dispatch({
        type: Action.RegisterDroppable,
        element: {
          id,
          key: key2,
          disabled,
          node: nodeRef,
          rect,
          data: dataRef
        }
      });
      return () => dispatch({
        type: Action.UnregisterDroppable,
        key: key2,
        id
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );
  (0, import_react14.useEffect)(() => {
    if (disabled !== previous.current.disabled) {
      dispatch({
        type: Action.SetDroppableDisabled,
        id,
        key: key2,
        disabled
      });
      previous.current.disabled = disabled;
    }
  }, [id, key2, disabled, dispatch]);
  return {
    active,
    rect,
    isOver: (over == null ? void 0 : over.id) === id,
    node: nodeRef,
    over,
    setNodeRef
  };
}
function AnimationManager(_ref) {
  let {
    animation,
    children
  } = _ref;
  const [clonedChildren, setClonedChildren] = (0, import_react14.useState)(null);
  const [element, setElement] = (0, import_react14.useState)(null);
  const previousChildren = usePrevious(children);
  if (!children && !clonedChildren && previousChildren) {
    setClonedChildren(previousChildren);
  }
  useIsomorphicLayoutEffect(() => {
    if (!element) {
      return;
    }
    const key2 = clonedChildren == null ? void 0 : clonedChildren.key;
    const id = clonedChildren == null ? void 0 : clonedChildren.props.id;
    if (key2 == null || id == null) {
      setClonedChildren(null);
      return;
    }
    Promise.resolve(animation(id, element)).then(() => {
      setClonedChildren(null);
    });
  }, [animation, clonedChildren, element]);
  return import_react14.default.createElement(import_react14.default.Fragment, null, children, clonedChildren ? (0, import_react14.cloneElement)(clonedChildren, {
    ref: setElement
  }) : null);
}
var defaultTransform = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1
};
function NullifiedContextProvider(_ref) {
  let {
    children
  } = _ref;
  return import_react14.default.createElement(InternalContext.Provider, {
    value: defaultInternalContext
  }, import_react14.default.createElement(ActiveDraggableContext.Provider, {
    value: defaultTransform
  }, children));
}
var baseStyles = {
  position: "fixed",
  touchAction: "none"
};
var defaultTransition = (activatorEvent) => {
  const isKeyboardActivator = isKeyboardEvent(activatorEvent);
  return isKeyboardActivator ? "transform 250ms ease" : void 0;
};
var PositionedOverlay = (0, import_react14.forwardRef)((_ref, ref) => {
  let {
    as,
    activatorEvent,
    adjustScale: adjustScale2,
    children,
    className: className2,
    rect,
    style,
    transform,
    transition = defaultTransition
  } = _ref;
  if (!rect) {
    return null;
  }
  const scaleAdjustedTransform = adjustScale2 ? transform : {
    ...transform,
    scaleX: 1,
    scaleY: 1
  };
  const styles = {
    ...baseStyles,
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    transform: CSS.Transform.toString(scaleAdjustedTransform),
    transformOrigin: adjustScale2 && activatorEvent ? getRelativeTransformOrigin(activatorEvent, rect) : void 0,
    transition: typeof transition === "function" ? transition(activatorEvent) : transition,
    ...style
  };
  return import_react14.default.createElement(as, {
    className: className2,
    style: styles,
    ref
  }, children);
});
var defaultDropAnimationSideEffects = (options) => (_ref) => {
  let {
    active,
    dragOverlay
  } = _ref;
  const originalStyles = {};
  const {
    styles,
    className: className2
  } = options;
  if (styles != null && styles.active) {
    for (const [key2, value] of Object.entries(styles.active)) {
      if (value === void 0) {
        continue;
      }
      originalStyles[key2] = active.node.style.getPropertyValue(key2);
      active.node.style.setProperty(key2, value);
    }
  }
  if (styles != null && styles.dragOverlay) {
    for (const [key2, value] of Object.entries(styles.dragOverlay)) {
      if (value === void 0) {
        continue;
      }
      dragOverlay.node.style.setProperty(key2, value);
    }
  }
  if (className2 != null && className2.active) {
    active.node.classList.add(className2.active);
  }
  if (className2 != null && className2.dragOverlay) {
    dragOverlay.node.classList.add(className2.dragOverlay);
  }
  return function cleanup() {
    for (const [key2, value] of Object.entries(originalStyles)) {
      active.node.style.setProperty(key2, value);
    }
    if (className2 != null && className2.active) {
      active.node.classList.remove(className2.active);
    }
  };
};
var defaultKeyframeResolver = (_ref2) => {
  let {
    transform: {
      initial,
      final
    }
  } = _ref2;
  return [{
    transform: CSS.Transform.toString(initial)
  }, {
    transform: CSS.Transform.toString(final)
  }];
};
var defaultDropAnimationConfiguration = {
  duration: 250,
  easing: "ease",
  keyframes: defaultKeyframeResolver,
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0"
      }
    }
  })
};
function useDropAnimation(_ref3) {
  let {
    config,
    draggableNodes,
    droppableContainers,
    measuringConfiguration
  } = _ref3;
  return useEvent((id, node) => {
    if (config === null) {
      return;
    }
    const activeDraggable = draggableNodes.get(id);
    if (!activeDraggable) {
      return;
    }
    const activeNode = activeDraggable.node.current;
    if (!activeNode) {
      return;
    }
    const measurableNode = getMeasurableNode(node);
    if (!measurableNode) {
      return;
    }
    const {
      transform
    } = getWindow(node).getComputedStyle(node);
    const parsedTransform = parseTransform(transform);
    if (!parsedTransform) {
      return;
    }
    const animation = typeof config === "function" ? config : createDefaultDropAnimation(config);
    scrollIntoViewIfNeeded(activeNode, measuringConfiguration.draggable.measure);
    return animation({
      active: {
        id,
        data: activeDraggable.data,
        node: activeNode,
        rect: measuringConfiguration.draggable.measure(activeNode)
      },
      draggableNodes,
      dragOverlay: {
        node,
        rect: measuringConfiguration.dragOverlay.measure(measurableNode)
      },
      droppableContainers,
      measuringConfiguration,
      transform: parsedTransform
    });
  });
}
function createDefaultDropAnimation(options) {
  const {
    duration,
    easing,
    sideEffects,
    keyframes
  } = {
    ...defaultDropAnimationConfiguration,
    ...options
  };
  return (_ref4) => {
    let {
      active,
      dragOverlay,
      transform,
      ...rest
    } = _ref4;
    if (!duration) {
      return;
    }
    const delta = {
      x: dragOverlay.rect.left - active.rect.left,
      y: dragOverlay.rect.top - active.rect.top
    };
    const scale = {
      scaleX: transform.scaleX !== 1 ? active.rect.width * transform.scaleX / dragOverlay.rect.width : 1,
      scaleY: transform.scaleY !== 1 ? active.rect.height * transform.scaleY / dragOverlay.rect.height : 1
    };
    const finalTransform = {
      x: transform.x - delta.x,
      y: transform.y - delta.y,
      ...scale
    };
    const animationKeyframes = keyframes({
      ...rest,
      active,
      dragOverlay,
      transform: {
        initial: transform,
        final: finalTransform
      }
    });
    const [firstKeyframe] = animationKeyframes;
    const lastKeyframe = animationKeyframes[animationKeyframes.length - 1];
    if (JSON.stringify(firstKeyframe) === JSON.stringify(lastKeyframe)) {
      return;
    }
    const cleanup = sideEffects == null ? void 0 : sideEffects({
      active,
      dragOverlay,
      ...rest
    });
    const animation = dragOverlay.node.animate(animationKeyframes, {
      duration,
      easing,
      fill: "forwards"
    });
    return new Promise((resolve) => {
      animation.onfinish = () => {
        cleanup == null ? void 0 : cleanup();
        resolve();
      };
    });
  };
}
var key = 0;
function useKey(id) {
  return (0, import_react14.useMemo)(() => {
    if (id == null) {
      return;
    }
    key++;
    return key;
  }, [id]);
}
var DragOverlay = import_react14.default.memo((_ref) => {
  let {
    adjustScale: adjustScale2 = false,
    children,
    dropAnimation: dropAnimationConfig,
    style,
    transition,
    modifiers,
    wrapperElement = "div",
    className: className2,
    zIndex = 999
  } = _ref;
  const {
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggableNodes,
    droppableContainers,
    dragOverlay,
    over,
    measuringConfiguration,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  } = useDndContext();
  const transform = (0, import_react14.useContext)(ActiveDraggableContext);
  const key2 = useKey(active == null ? void 0 : active.id);
  const modifiedTransform = applyModifiers(modifiers, {
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect: dragOverlay.rect,
    over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    transform,
    windowRect
  });
  const initialRect = useInitialValue(activeNodeRect);
  const dropAnimation = useDropAnimation({
    config: dropAnimationConfig,
    draggableNodes,
    droppableContainers,
    measuringConfiguration
  });
  const ref = initialRect ? dragOverlay.setRef : void 0;
  return import_react14.default.createElement(NullifiedContextProvider, null, import_react14.default.createElement(AnimationManager, {
    animation: dropAnimation
  }, active && key2 ? import_react14.default.createElement(PositionedOverlay, {
    key: key2,
    id: active.id,
    ref,
    as: wrapperElement,
    activatorEvent,
    adjustScale: adjustScale2,
    className: className2,
    transition,
    rect: initialRect,
    style: {
      zIndex,
      ...style
    },
    transform: modifiedTransform
  }, children) : null));
});

// node_modules/@dnd-kit/sortable/dist/sortable.esm.js
var import_react15 = __toESM(require_react());
function arrayMove(array, from, to) {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}
function getSortedRects(items, rects) {
  return items.reduce((accumulator, id, index) => {
    const rect = rects.get(id);
    if (rect) {
      accumulator[index] = rect;
    }
    return accumulator;
  }, Array(items.length));
}
function isValidIndex(index) {
  return index !== null && index >= 0;
}
function itemsEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function normalizeDisabled(disabled) {
  if (typeof disabled === "boolean") {
    return {
      draggable: disabled,
      droppable: disabled
    };
  }
  return disabled;
}
var rectSortingStrategy = (_ref) => {
  let {
    rects,
    activeIndex,
    overIndex,
    index
  } = _ref;
  const newRects = arrayMove(rects, overIndex, activeIndex);
  const oldRect = rects[index];
  const newRect = newRects[index];
  if (!newRect || !oldRect) {
    return null;
  }
  return {
    x: newRect.left - oldRect.left,
    y: newRect.top - oldRect.top,
    scaleX: newRect.width / oldRect.width,
    scaleY: newRect.height / oldRect.height
  };
};
var defaultScale$1 = {
  scaleX: 1,
  scaleY: 1
};
var verticalListSortingStrategy = (_ref) => {
  var _rects$activeIndex;
  let {
    activeIndex,
    activeNodeRect: fallbackActiveRect,
    index,
    rects,
    overIndex
  } = _ref;
  const activeNodeRect = (_rects$activeIndex = rects[activeIndex]) != null ? _rects$activeIndex : fallbackActiveRect;
  if (!activeNodeRect) {
    return null;
  }
  if (index === activeIndex) {
    const overIndexRect = rects[overIndex];
    if (!overIndexRect) {
      return null;
    }
    return {
      x: 0,
      y: activeIndex < overIndex ? overIndexRect.top + overIndexRect.height - (activeNodeRect.top + activeNodeRect.height) : overIndexRect.top - activeNodeRect.top,
      ...defaultScale$1
    };
  }
  const itemGap = getItemGap$1(rects, index, activeIndex);
  if (index > activeIndex && index <= overIndex) {
    return {
      x: 0,
      y: -activeNodeRect.height - itemGap,
      ...defaultScale$1
    };
  }
  if (index < activeIndex && index >= overIndex) {
    return {
      x: 0,
      y: activeNodeRect.height + itemGap,
      ...defaultScale$1
    };
  }
  return {
    x: 0,
    y: 0,
    ...defaultScale$1
  };
};
function getItemGap$1(clientRects, index, activeIndex) {
  const currentRect = clientRects[index];
  const previousRect = clientRects[index - 1];
  const nextRect = clientRects[index + 1];
  if (!currentRect) {
    return 0;
  }
  if (activeIndex < index) {
    return previousRect ? currentRect.top - (previousRect.top + previousRect.height) : nextRect ? nextRect.top - (currentRect.top + currentRect.height) : 0;
  }
  return nextRect ? nextRect.top - (currentRect.top + currentRect.height) : previousRect ? currentRect.top - (previousRect.top + previousRect.height) : 0;
}
var ID_PREFIX2 = "Sortable";
var Context = import_react15.default.createContext({
  activeIndex: -1,
  containerId: ID_PREFIX2,
  disableTransforms: false,
  items: [],
  overIndex: -1,
  useDragOverlay: false,
  sortedRects: [],
  strategy: rectSortingStrategy,
  disabled: {
    draggable: false,
    droppable: false
  }
});
function SortableContext(_ref) {
  let {
    children,
    id,
    items: userDefinedItems,
    strategy = rectSortingStrategy,
    disabled: disabledProp = false
  } = _ref;
  const {
    active,
    dragOverlay,
    droppableRects,
    over,
    measureDroppableContainers
  } = useDndContext();
  const containerId = useUniqueId2(ID_PREFIX2, id);
  const useDragOverlay = Boolean(dragOverlay.rect !== null);
  const items = (0, import_react15.useMemo)(() => userDefinedItems.map((item) => typeof item === "object" && "id" in item ? item.id : item), [userDefinedItems]);
  const isDragging = active != null;
  const activeIndex = active ? items.indexOf(active.id) : -1;
  const overIndex = over ? items.indexOf(over.id) : -1;
  const previousItemsRef = (0, import_react15.useRef)(items);
  const itemsHaveChanged = !itemsEqual(items, previousItemsRef.current);
  const disableTransforms = overIndex !== -1 && activeIndex === -1 || itemsHaveChanged;
  const disabled = normalizeDisabled(disabledProp);
  useIsomorphicLayoutEffect(() => {
    if (itemsHaveChanged && isDragging) {
      measureDroppableContainers(items);
    }
  }, [itemsHaveChanged, items, isDragging, measureDroppableContainers]);
  (0, import_react15.useEffect)(() => {
    previousItemsRef.current = items;
  }, [items]);
  const contextValue = (0, import_react15.useMemo)(
    () => ({
      activeIndex,
      containerId,
      disabled,
      disableTransforms,
      items,
      overIndex,
      useDragOverlay,
      sortedRects: getSortedRects(items, droppableRects),
      strategy
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeIndex, containerId, disabled.draggable, disabled.droppable, disableTransforms, items, overIndex, droppableRects, useDragOverlay, strategy]
  );
  return import_react15.default.createElement(Context.Provider, {
    value: contextValue
  }, children);
}
var defaultNewIndexGetter = (_ref) => {
  let {
    id,
    items,
    activeIndex,
    overIndex
  } = _ref;
  return arrayMove(items, activeIndex, overIndex).indexOf(id);
};
var defaultAnimateLayoutChanges = (_ref2) => {
  let {
    containerId,
    isSorting,
    wasDragging,
    index,
    items,
    newIndex,
    previousItems,
    previousContainerId,
    transition
  } = _ref2;
  if (!transition || !wasDragging) {
    return false;
  }
  if (previousItems !== items && index === newIndex) {
    return false;
  }
  if (isSorting) {
    return true;
  }
  return newIndex !== index && containerId === previousContainerId;
};
var defaultTransition2 = {
  duration: 200,
  easing: "ease"
};
var transitionProperty = "transform";
var disabledTransition = CSS.Transition.toString({
  property: transitionProperty,
  duration: 0,
  easing: "linear"
});
var defaultAttributes = {
  roleDescription: "sortable"
};
function useDerivedTransform(_ref) {
  let {
    disabled,
    index,
    node,
    rect
  } = _ref;
  const [derivedTransform, setDerivedtransform] = (0, import_react15.useState)(null);
  const previousIndex = (0, import_react15.useRef)(index);
  useIsomorphicLayoutEffect(() => {
    if (!disabled && index !== previousIndex.current && node.current) {
      const initial = rect.current;
      if (initial) {
        const current = getClientRect(node.current, {
          ignoreTransform: true
        });
        const delta = {
          x: initial.left - current.left,
          y: initial.top - current.top,
          scaleX: initial.width / current.width,
          scaleY: initial.height / current.height
        };
        if (delta.x || delta.y) {
          setDerivedtransform(delta);
        }
      }
    }
    if (index !== previousIndex.current) {
      previousIndex.current = index;
    }
  }, [disabled, index, node, rect]);
  (0, import_react15.useEffect)(() => {
    if (derivedTransform) {
      setDerivedtransform(null);
    }
  }, [derivedTransform]);
  return derivedTransform;
}
function useSortable(_ref) {
  let {
    animateLayoutChanges = defaultAnimateLayoutChanges,
    attributes: userDefinedAttributes,
    disabled: localDisabled,
    data: customData,
    getNewIndex = defaultNewIndexGetter,
    id,
    strategy: localStrategy,
    resizeObserverConfig,
    transition = defaultTransition2
  } = _ref;
  const {
    items,
    containerId,
    activeIndex,
    disabled: globalDisabled,
    disableTransforms,
    sortedRects,
    overIndex,
    useDragOverlay,
    strategy: globalStrategy
  } = (0, import_react15.useContext)(Context);
  const disabled = normalizeLocalDisabled(localDisabled, globalDisabled);
  const index = items.indexOf(id);
  const data = (0, import_react15.useMemo)(() => ({
    sortable: {
      containerId,
      index,
      items
    },
    ...customData
  }), [containerId, customData, index, items]);
  const itemsAfterCurrentSortable = (0, import_react15.useMemo)(() => items.slice(items.indexOf(id)), [items, id]);
  const {
    rect,
    node,
    isOver,
    setNodeRef: setDroppableNodeRef
  } = useDroppable({
    id,
    data,
    disabled: disabled.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: itemsAfterCurrentSortable,
      ...resizeObserverConfig
    }
  });
  const {
    active,
    activatorEvent,
    activeNodeRect,
    attributes,
    setNodeRef: setDraggableNodeRef,
    listeners,
    isDragging,
    over,
    setActivatorNodeRef,
    transform
  } = useDraggable({
    id,
    data,
    attributes: {
      ...defaultAttributes,
      ...userDefinedAttributes
    },
    disabled: disabled.draggable
  });
  const setNodeRef = useCombinedRefs(setDroppableNodeRef, setDraggableNodeRef);
  const isSorting = Boolean(active);
  const displaceItem = isSorting && !disableTransforms && isValidIndex(activeIndex) && isValidIndex(overIndex);
  const shouldDisplaceDragSource = !useDragOverlay && isDragging;
  const dragSourceDisplacement = shouldDisplaceDragSource && displaceItem ? transform : null;
  const strategy = localStrategy != null ? localStrategy : globalStrategy;
  const finalTransform = displaceItem ? dragSourceDisplacement != null ? dragSourceDisplacement : strategy({
    rects: sortedRects,
    activeNodeRect,
    activeIndex,
    overIndex,
    index
  }) : null;
  const newIndex = isValidIndex(activeIndex) && isValidIndex(overIndex) ? getNewIndex({
    id,
    items,
    activeIndex,
    overIndex
  }) : index;
  const activeId = active == null ? void 0 : active.id;
  const previous = (0, import_react15.useRef)({
    activeId,
    items,
    newIndex,
    containerId
  });
  const itemsHaveChanged = items !== previous.current.items;
  const shouldAnimateLayoutChanges = animateLayoutChanges({
    active,
    containerId,
    isDragging,
    isSorting,
    id,
    index,
    items,
    newIndex: previous.current.newIndex,
    previousItems: previous.current.items,
    previousContainerId: previous.current.containerId,
    transition,
    wasDragging: previous.current.activeId != null
  });
  const derivedTransform = useDerivedTransform({
    disabled: !shouldAnimateLayoutChanges,
    index,
    node,
    rect
  });
  (0, import_react15.useEffect)(() => {
    if (isSorting && previous.current.newIndex !== newIndex) {
      previous.current.newIndex = newIndex;
    }
    if (containerId !== previous.current.containerId) {
      previous.current.containerId = containerId;
    }
    if (items !== previous.current.items) {
      previous.current.items = items;
    }
  }, [isSorting, newIndex, containerId, items]);
  (0, import_react15.useEffect)(() => {
    if (activeId === previous.current.activeId) {
      return;
    }
    if (activeId && !previous.current.activeId) {
      previous.current.activeId = activeId;
      return;
    }
    const timeoutId = setTimeout(() => {
      previous.current.activeId = activeId;
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [activeId]);
  return {
    active,
    activeIndex,
    attributes,
    data,
    rect,
    index,
    newIndex,
    items,
    isOver,
    isSorting,
    isDragging,
    listeners,
    node,
    overIndex,
    over,
    setNodeRef,
    setActivatorNodeRef,
    setDroppableNodeRef,
    setDraggableNodeRef,
    transform: derivedTransform != null ? derivedTransform : finalTransform,
    transition: getTransition()
  };
  function getTransition() {
    if (
      // Temporarily disable transitions for a single frame to set up derived transforms
      derivedTransform || // Or to prevent items jumping to back to their "new" position when items change
      itemsHaveChanged && previous.current.newIndex === index
    ) {
      return disabledTransition;
    }
    if (shouldDisplaceDragSource && !isKeyboardEvent(activatorEvent) || !transition) {
      return void 0;
    }
    if (isSorting || shouldAnimateLayoutChanges) {
      return CSS.Transition.toString({
        ...transition,
        property: transitionProperty
      });
    }
    return void 0;
  }
}
function normalizeLocalDisabled(localDisabled, globalDisabled) {
  var _localDisabled$dragga, _localDisabled$droppa;
  if (typeof localDisabled === "boolean") {
    return {
      draggable: localDisabled,
      // Backwards compatibility
      droppable: false
    };
  }
  return {
    draggable: (_localDisabled$dragga = localDisabled == null ? void 0 : localDisabled.draggable) != null ? _localDisabled$dragga : globalDisabled.draggable,
    droppable: (_localDisabled$droppa = localDisabled == null ? void 0 : localDisabled.droppable) != null ? _localDisabled$droppa : globalDisabled.droppable
  };
}
function hasSortableData(entry) {
  if (!entry) {
    return false;
  }
  const data = entry.data.current;
  if (data && "sortable" in data && typeof data.sortable === "object" && "containerId" in data.sortable && "items" in data.sortable && "index" in data.sortable) {
    return true;
  }
  return false;
}
var directions = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];

// node_modules/@cloudscape-design/components/internal/components/sortable-area/keyboard-sensor/utilities/events.js
var EventName2;
(function(EventName3) {
  EventName3["Blur"] = "blur";
  EventName3["Keydown"] = "keydown";
  EventName3["Resize"] = "resize";
  EventName3["VisibilityChange"] = "visibilitychange";
  EventName3["CustomDown"] = "custom-movedown";
  EventName3["CustomUp"] = "custom-moveup";
})(EventName2 || (EventName2 = {}));

// node_modules/@cloudscape-design/components/internal/components/sortable-area/use-drag-and-drop-reorder.js
var import_react16 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/sortable-area/keyboard-sensor/defaults.js
var defaultKeyboardCodes2 = {
  start: [KeyboardCode.Space, KeyboardCode.Enter],
  cancel: [KeyboardCode.Esc],
  end: [KeyboardCode.Space, KeyboardCode.Enter]
};

// node_modules/@cloudscape-design/components/internal/components/sortable-area/keyboard-sensor/utilities/listeners.js
var Listeners2 = class {
  constructor(target) {
    this.target = target;
    this.listeners = [];
    this.removeAll = () => {
      this.listeners.forEach((listener) => {
        var _a;
        return (_a = this.target) === null || _a === void 0 ? void 0 : _a.removeEventListener(...listener);
      });
    };
  }
  add(eventName, handler, options) {
    var _a;
    (_a = this.target) === null || _a === void 0 ? void 0 : _a.addEventListener(eventName, handler, options);
    this.listeners.push([eventName, handler, options]);
  }
};

// node_modules/@cloudscape-design/components/internal/components/sortable-area/keyboard-sensor/utilities/scroll.js
function isDocumentScrollingElement2(element) {
  if (!canUseDOM || !element) {
    return false;
  }
  return element === document.scrollingElement;
}
function getScrollPosition2(scrollingContainer) {
  const minScroll = {
    x: 0,
    y: 0
  };
  const dimensions = isDocumentScrollingElement2(scrollingContainer) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: scrollingContainer.clientHeight,
    width: scrollingContainer.clientWidth
  };
  const maxScroll = {
    x: scrollingContainer.scrollWidth - dimensions.width,
    y: scrollingContainer.scrollHeight - dimensions.height
  };
  const isTop = scrollingContainer.scrollTop <= minScroll.y;
  const isLeft = scrollingContainer.scrollLeft <= minScroll.x;
  const isBottom = scrollingContainer.scrollTop >= maxScroll.y;
  const isRight = scrollingContainer.scrollLeft >= maxScroll.x;
  return {
    isTop,
    isLeft,
    isBottom,
    isRight,
    maxScroll,
    minScroll
  };
}
function getScrollElementRect2(element) {
  if (element === document.scrollingElement) {
    const { innerWidth, innerHeight } = window;
    return {
      top: 0,
      left: 0,
      right: innerWidth,
      bottom: innerHeight,
      width: innerWidth,
      height: innerHeight
    };
  }
  const { top, left, right, bottom } = element.getBoundingClientRect();
  return {
    top,
    left,
    right,
    bottom,
    width: element.clientWidth,
    height: element.clientHeight
  };
}
function applyScroll({ currentCoordinates, direction, newCoordinates, scrollableAncestors }) {
  for (const scrollContainer of scrollableAncestors) {
    const coordinatesDelta = subtract(newCoordinates, currentCoordinates);
    const { isTop, isBottom, maxScroll, minScroll } = getScrollPosition2(scrollContainer);
    const scrollElementRect = getScrollElementRect2(scrollContainer);
    const clampedCoordinates = {
      y: Math.min(direction === "down" ? scrollElementRect.bottom - scrollElementRect.height / 2 : scrollElementRect.bottom, Math.max(direction === "down" ? scrollElementRect.top : scrollElementRect.top + scrollElementRect.height / 2, newCoordinates.y))
    };
    const canScrollY = direction === "down" && !isBottom || direction === "up" && !isTop;
    if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
      const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y;
      const canScrollToNewCoordinates = direction === "down" && newScrollCoordinates <= maxScroll.y || direction === "up" && newScrollCoordinates >= minScroll.y;
      if (canScrollToNewCoordinates) {
        scrollContainer.scrollTo({
          top: newScrollCoordinates,
          behavior: "smooth"
        });
        return true;
      }
      break;
    }
  }
  return false;
}

// node_modules/@cloudscape-design/components/internal/components/sortable-area/keyboard-sensor/index.js
var KeyboardAndUAPSensor = class {
  constructor(props) {
    this.props = props;
    this.autoScrollEnabled = false;
    const { event: { target } } = props;
    this.props = props;
    this.listeners = new Listeners2(getOwnerDocument(target));
    this.windowListeners = new Listeners2(getWindow(target));
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCustomDirectionEvent = this.handleCustomDirectionEvent.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.attach();
  }
  attach() {
    var _a;
    this.handleStart();
    this.windowListeners.add(EventName2.Resize, this.handleCancel);
    this.windowListeners.add(EventName2.VisibilityChange, this.handleCancel);
    (_a = this.props.event.target) === null || _a === void 0 ? void 0 : _a.addEventListener(EventName2.Blur, this.handleEnd);
    setTimeout(() => {
      this.listeners.add(EventName2.Keydown, this.handleKeyDown);
      this.listeners.add(EventName2.CustomDown, this.handleCustomDirectionEvent);
      this.listeners.add(EventName2.CustomUp, this.handleCustomDirectionEvent);
    });
  }
  handleStart() {
    const { activeNode, onStart } = this.props;
    const node = activeNode.node.current;
    if (node) {
      scrollElementIntoView(node);
    }
    onStart(defaultCoordinates);
  }
  handleKeyDown(event) {
    if (isKeyboardEvent(event)) {
      const { options } = this.props;
      const { keyboardCodes = defaultKeyboardCodes2 } = options;
      const { code } = event;
      if (keyboardCodes.end.indexOf(code) !== -1) {
        this.handleEnd(event);
        return;
      }
      if (keyboardCodes.cancel.indexOf(code) !== -1) {
        this.handleCancel(event);
        return;
      }
      switch (code) {
        case KeyboardCode.Up:
          this.handleDirectionalMove(event, "up");
          break;
        case KeyboardCode.Down:
          this.handleDirectionalMove(event, "down");
          break;
      }
    }
  }
  handleCustomDirectionEvent(event) {
    switch (event.type) {
      case EventName2.CustomUp:
        this.handleDirectionalMove(event, "up");
        break;
      case EventName2.CustomDown:
        this.handleDirectionalMove(event, "down");
        break;
    }
  }
  handleDirectionalMove(event, direction) {
    const { active, context, options } = this.props;
    const { coordinateGetter } = options;
    const { collisionRect } = context.current;
    const currentCoordinates = collisionRect ? { x: collisionRect.left, y: collisionRect.top } : defaultCoordinates;
    if (!this.referenceCoordinates) {
      this.referenceCoordinates = currentCoordinates;
    }
    const newCoordinates = coordinateGetter(event, {
      active,
      context: context.current,
      currentCoordinates
    });
    if (newCoordinates) {
      const { scrollableAncestors } = context.current;
      const scrolled = applyScroll({ currentCoordinates, direction, newCoordinates, scrollableAncestors });
      if (!scrolled) {
        this.handleMove(event, subtract(newCoordinates, this.referenceCoordinates));
      }
    }
  }
  handleMove(event, coordinates) {
    const { onMove } = this.props;
    event.preventDefault();
    onMove(coordinates);
  }
  handleEnd(event) {
    const { onEnd } = this.props;
    event.preventDefault();
    this.detach();
    onEnd();
  }
  handleCancel(event) {
    const { onCancel } = this.props;
    if (event.type !== EventName2.Blur) {
      event.preventDefault();
    }
    this.detach();
    onCancel();
  }
  detach() {
    var _a;
    (_a = this.props.event.target) === null || _a === void 0 ? void 0 : _a.removeEventListener(EventName2.Blur, this.handleCancel);
    this.listeners.removeAll();
    this.windowListeners.removeAll();
  }
};
KeyboardAndUAPSensor.activators = [
  {
    eventName: "onKeyDown",
    handler: (event, { keyboardCodes = defaultKeyboardCodes2, onActivation }, { active }) => {
      const { code } = event.nativeEvent;
      if (keyboardCodes.start.indexOf(code) !== -1) {
        const activator = active.activatorNode.current;
        if (activator && event.target !== activator) {
          return false;
        }
        event.preventDefault();
        onActivation === null || onActivation === void 0 ? void 0 : onActivation({ event: event.nativeEvent });
        return true;
      }
      return false;
    }
  },
  {
    eventName: "onClick",
    handler: ({ nativeEvent: event }, { onActivation }) => {
      if (event.button !== 0) {
        return false;
      }
      onActivation === null || onActivation === void 0 ? void 0 : onActivation({ event });
      return true;
    }
  }
];

// node_modules/@cloudscape-design/components/internal/components/sortable-area/use-drag-and-drop-reorder.js
function useDragAndDropReorder({ items, itemDefinition }) {
  const isKeyboard = (0, import_react16.useRef)(false);
  const positionDelta = (0, import_react16.useRef)(0);
  const [activeItemId, setActiveItemId] = (0, import_react16.useState)(null);
  const setActiveItem = (id) => {
    setActiveItemId(id);
    if (!id) {
      isKeyboard.current = false;
      positionDelta.current = 0;
    }
  };
  const handleKeyDown = (event) => {
    if (isKeyboard.current && activeItemId) {
      const currentTargetIndex = items.findIndex((item) => itemDefinition.id(item) === activeItemId) + positionDelta.current;
      if ((event.key === "ArrowDown" || event.type === EventName2.CustomDown) && currentTargetIndex < items.length - 1) {
        positionDelta.current += 1;
      } else if ((event.key === "ArrowUp" || event.type === EventName2.CustomUp) && currentTargetIndex > 0) {
        positionDelta.current -= 1;
      }
    }
    if (activeItemId && isEscape(event.key)) {
      event.stopPropagation();
    }
  };
  const getClosestId = (active) => {
    if (positionDelta.current === 0) {
      return active.id;
    }
    const currentIndex = items.findIndex((item) => itemDefinition.id(item) === active.id);
    const newIndex = Math.max(0, Math.min(items.length - 1, currentIndex + positionDelta.current));
    return itemDefinition.id(items[newIndex]);
  };
  const collisionDetection = ({ active, collisionRect, droppableContainers, droppableRects, pointerCoordinates }) => {
    if (isKeyboard.current) {
      const collidingContainer = getCollidingContainer({
        activeId: active.id,
        closestId: getClosestId(active),
        droppableContainers
      });
      return collidingContainer ? [collidingContainer] : [];
    } else {
      return closestCenter({ active, collisionRect, droppableRects, droppableContainers, pointerCoordinates });
    }
  };
  const coordinateGetter = (event, { context: { active, collisionRect, droppableRects, droppableContainers } }) => {
    event.preventDefault();
    if (!active || !collisionRect) {
      return;
    }
    const closestId = getClosestId(active);
    if (closestId !== null) {
      const activeDroppable = droppableContainers.get(active.id);
      const newDroppable = droppableContainers.get(closestId);
      const newRect = newDroppable ? droppableRects.get(newDroppable.id) : null;
      const newNode = newDroppable === null || newDroppable === void 0 ? void 0 : newDroppable.node.current;
      if (newNode && newRect && activeDroppable && newDroppable) {
        const isAfterActive = isAfter(activeDroppable, newDroppable);
        const offset = {
          x: isAfterActive ? collisionRect.width - newRect.width : 0,
          y: isAfterActive ? collisionRect.height - newRect.height : 0
        };
        const rectCoordinates = {
          x: newRect.left,
          y: newRect.top
        };
        return {
          x: rectCoordinates.x - offset.x,
          y: rectCoordinates.y - offset.y
        };
      }
    }
  };
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      // allow KeyboardSensor (click to display UAP) to take priority
      // if handle is clicked without movement
      distance: 1
    }
  }), useSensor(KeyboardAndUAPSensor, {
    coordinateGetter,
    onActivation: () => {
      isKeyboard.current = true;
    }
  }));
  return {
    activeItemId,
    setActiveItemId: setActiveItem,
    collisionDetection,
    coordinateGetter,
    handleKeyDown,
    sensors,
    isKeyboard
  };
}
function isAfter(a, b) {
  return hasSortableData(a) && hasSortableData(b) && a.data.current.sortable.index < b.data.current.sortable.index;
}
function getCollidingContainer({ activeId, closestId, droppableContainers }) {
  if (closestId === activeId) {
    return;
  }
  const collidingContainer = droppableContainers.find(({ id }) => id === closestId);
  if (collidingContainer) {
    return {
      id: collidingContainer.id,
      data: {
        droppableContainer: collidingContainer,
        value: 0
      }
    };
  }
}
var isEscape = (key2) => key2 === "Escape" || key2 === "Esc";

// node_modules/@cloudscape-design/components/internal/components/sortable-area/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/sortable-area/styles.scoped.css";
var styles_css_default10 = {
  "drag-overlay": "awsui_drag-overlay_1ksmw_1ekcd_145",
  "drag-overlay-item": "awsui_drag-overlay-item_1ksmw_1ekcd_149",
  "drag-overlay-container": "awsui_drag-overlay-container_1ksmw_1ekcd_174",
  "active": "awsui_active_1ksmw_1ekcd_200",
  "placeholder": "awsui_placeholder_1ksmw_1ekcd_210",
  "placeholder-item": "awsui_placeholder-item_1ksmw_1ekcd_219",
  "placeholder-container": "awsui_placeholder-container_1ksmw_1ekcd_225",
  "sorting": "awsui_sorting_1ksmw_1ekcd_232"
};

// node_modules/@cloudscape-design/components/internal/components/sortable-area/index.js
function SortableArea({ items, itemDefinition, renderItem, onItemsChange, disableReorder, i18nStrings }) {
  var _a;
  const { activeItemId, setActiveItemId, collisionDetection, handleKeyDown, sensors, isKeyboard } = useDragAndDropReorder({
    items,
    itemDefinition
  });
  const activeItem = activeItemId ? items.find((item) => itemDefinition.id(item) === activeItemId) : null;
  const isDragging = activeItemId !== null;
  const announcements = useLiveAnnouncements({ items, itemDefinition, isDragging, ...i18nStrings });
  const portalContainer = usePortalContainer();
  return import_react17.default.createElement(
    DndContext,
    { sensors, collisionDetection, accessibility: {
      announcements,
      restoreFocus: false,
      screenReaderInstructions: (i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.dragHandleAriaDescription) ? { draggable: i18nStrings.dragHandleAriaDescription } : void 0,
      container: portalContainer !== null && portalContainer !== void 0 ? portalContainer : void 0
    }, onDragStart: ({ active }) => setActiveItemId(active.id), onDragEnd: (event) => {
      setActiveItemId(null);
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const movedItem = items.find((item) => itemDefinition.id(item) === active.id);
        const oldIndex = items.findIndex((item) => itemDefinition.id(item) === active.id);
        const newIndex = items.findIndex((item) => itemDefinition.id(item) === over.id);
        fireNonCancelableEvent(onItemsChange, { items: arrayMove([...items], oldIndex, newIndex), movedItem });
      }
    }, onDragCancel: () => setActiveItemId(null) },
    import_react17.default.createElement(SortableContext, { disabled: disableReorder, items: items.map((item) => itemDefinition.id(item)), strategy: verticalListSortingStrategy }, items.map((item) => import_react17.default.createElement(DraggableItem, { key: itemDefinition.id(item), item, itemDefinition, showDirectionButtons: item === activeItem && isKeyboard.current, renderItem, onKeyDown: handleKeyDown, dragHandleAriaLabel: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.dragHandleAriaLabel }))),
    import_react17.default.createElement(
      Portal,
      { container: portalContainer },
      import_react17.default.createElement(DragOverlay, { className: clsx_m_default(styles_css_default10["drag-overlay"], styles_css_default10[`drag-overlay-${getBorderRadiusVariant(itemDefinition)}`]), dropAnimation: null, style: { zIndex: 5e3 }, transition: isKeyboard.current ? "transform 250ms" : "" }, activeItem && renderItem({
        item: activeItem,
        id: activeItemId.toString(),
        style: {},
        className: styles_css_default10.active,
        isDropPlaceholder: true,
        isSortingActive: false,
        isDragGhost: true,
        dragHandleProps: {
          ariaLabel: (_a = joinStrings(i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.dragHandleAriaLabel, itemDefinition.label(activeItem))) !== null && _a !== void 0 ? _a : "",
          active: true,
          onKeyDown: handleKeyDown
        }
      }))
    )
  );
}
function usePortalContainer() {
  const portalContainerRef = (0, import_react17.useRef)(typeof document !== "undefined" ? document.createElement("div") : null);
  (0, import_react17.useEffect)(() => {
    const container = portalContainerRef.current;
    if (container && !container.isConnected) {
      document.body.appendChild(container);
    }
    return () => {
      if (container && container.isConnected) {
        document.body.removeChild(container);
      }
    };
  }, []);
  return portalContainerRef.current;
}
function DraggableItem({ item, itemDefinition, dragHandleAriaLabel, showDirectionButtons, onKeyDown, renderItem }) {
  var _a;
  const id = itemDefinition.id(item);
  const { isDragging, isSorting, listeners, setNodeRef, transform, attributes } = useSortable({
    id
  });
  const style = { transform: CSS.Translate.toString(transform) };
  const dragHandleListeners = attributes["aria-disabled"] ? {} : {
    ...listeners,
    onKeyDown: (event) => {
      if (onKeyDown) {
        onKeyDown(event);
      }
      if (listeners === null || listeners === void 0 ? void 0 : listeners.onKeyDown) {
        listeners.onKeyDown(event);
      }
    }
  };
  const className2 = clsx_m_default(isDragging && clsx_m_default(styles_css_default10.placeholder, styles_css_default10[`placeholder-${getBorderRadiusVariant(itemDefinition)}`]), isSorting && styles_css_default10.sorting);
  const dragHandleRef = (0, import_react17.useRef)(null);
  return import_react17.default.createElement(import_react17.default.Fragment, null, renderItem({
    item,
    id,
    ref: setNodeRef,
    style,
    className: className2,
    isDropPlaceholder: isDragging,
    isSortingActive: isSorting,
    isDragGhost: false,
    dragHandleProps: {
      ...dragHandleListeners,
      active: isDragging,
      ariaLabel: (_a = joinStrings(dragHandleAriaLabel, itemDefinition.label(item))) !== null && _a !== void 0 ? _a : "",
      ariaDescribedby: attributes["aria-describedby"],
      disabled: attributes["aria-disabled"],
      triggerMode: "controlled",
      controlledShowButtons: showDirectionButtons,
      ref: dragHandleRef,
      directions: showDirectionButtons ? {
        "block-start": "active",
        "block-end": "active"
      } : void 0,
      onDirectionClick: (direction) => {
        var _a2;
        const event = new Event(direction === "block-start" ? EventName2.CustomUp : EventName2.CustomDown, {
          bubbles: true,
          cancelable: true
        });
        onKeyDown(event);
        (_a2 = dragHandleRef.current) === null || _a2 === void 0 ? void 0 : _a2.dispatchEvent(event);
      }
    }
  }));
}
function getBorderRadiusVariant(itemDefinition) {
  var _a;
  return (_a = itemDefinition.borderRadius) !== null && _a !== void 0 ? _a : "item";
}

// node_modules/@cloudscape-design/components/list/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/list/styles.scoped.css";
var styles_css_default11 = {
  "root": "awsui_root_1axkx_1vu2m_145",
  "item": "awsui_item_1axkx_1vu2m_183",
  "disable-item-paddings": "awsui_disable-item-paddings_1axkx_1vu2m_186",
  "disable-paddings": "awsui_disable-paddings_1axkx_1vu2m_189",
  "sortable-item": "awsui_sortable-item_1axkx_1vu2m_196"
};

// node_modules/@cloudscape-design/components/list/test-classes/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/list/test-classes/styles.scoped.css";
var styles_css_default12 = {
  "root": "awsui_root_rckk5_b9f2m_5",
  "item": "awsui_item_rckk5_b9f2m_6"
};

// node_modules/@cloudscape-design/components/list/internal.js
var extractValidStructuredItemProps = ({ content, secondaryContent, icon, actions }) => ({
  content,
  secondaryContent,
  icon,
  actions
});
function InternalList({ items, renderItem, sortable = false, sortDisabled = false, tagOverride: Tag = sortable ? "ol" : "ul", ariaLabel, ariaLabelledby, ariaDescribedby, onSortingChange, i18nStrings, disablePaddings, disableItemPaddings, __internalRootRef, ...rest }) {
  const baseProps = getBaseProps(rest);
  const i18n = useInternalI18n("list");
  let contents;
  if (sortable) {
    contents = import_react18.default.createElement(SortableArea, { items, disableReorder: sortDisabled, itemDefinition: {
      id: (item) => renderItem(item).id,
      label: (item) => {
        var _a;
        const details = renderItem(item);
        return (_a = details.announcementLabel) !== null && _a !== void 0 ? _a : details.content;
      }
    }, onItemsChange: (event) => fireNonCancelableEvent(onSortingChange, { items: event.detail.items }), i18nStrings: {
      liveAnnouncementDndStarted: i18n("liveAnnouncementDndStarted", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.liveAnnouncementDndStarted, formatDndStarted),
      liveAnnouncementDndItemReordered: i18n("liveAnnouncementDndItemReordered", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.liveAnnouncementDndItemReordered, formatDndItemReordered),
      liveAnnouncementDndItemCommitted: i18n("liveAnnouncementDndItemCommitted", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.liveAnnouncementDndItemCommitted, formatDndItemCommitted),
      liveAnnouncementDndDiscarded: i18n("liveAnnouncementDndDiscarded", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.liveAnnouncementDndDiscarded),
      dragHandleAriaLabel: i18n("dragHandleAriaLabel", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.dragHandleAriaLabel),
      dragHandleAriaDescription: i18n("dragHandleAriaDescription", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.dragHandleAriaDescription)
    }, renderItem: ({ ref, item, id, style, className: className2, dragHandleProps, isDragGhost }) => {
      const structuredItemProps = extractValidStructuredItemProps(renderItem(item));
      const itemClass = clsx_m_default(styles_css_default11.item, styles_css_default12.item, disableItemPaddings && styles_css_default11["disable-item-paddings"], styles_css_default11["sortable-item"], className2);
      const content = import_react18.default.createElement(
        import_react18.default.Fragment,
        null,
        import_react18.default.createElement(drag_handle_default, { ...dragHandleProps }),
        import_react18.default.createElement(InternalStructuredItem, { ...structuredItemProps, disablePaddings: disableItemPaddings })
      );
      if (isDragGhost) {
        return import_react18.default.createElement("div", { className: itemClass }, content);
      }
      return import_react18.default.createElement("li", { ref, className: itemClass, style, "data-testid": id }, content);
    } });
  } else {
    contents = items === null || items === void 0 ? void 0 : items.map((item) => {
      const { id, ...structuredItemProps } = renderItem(item);
      return import_react18.default.createElement(
        "li",
        { key: id, "data-testid": id, className: clsx_m_default(styles_css_default11.item, styles_css_default12.item, disablePaddings && styles_css_default11["disable-paddings"], disableItemPaddings && styles_css_default11["disable-item-paddings"]) },
        import_react18.default.createElement(InternalStructuredItem, { ...extractValidStructuredItemProps(structuredItemProps), disablePaddings: disableItemPaddings })
      );
    });
  }
  return import_react18.default.createElement(Tag, { ref: __internalRootRef, ...baseProps, className: clsx_m_default(baseProps.className, styles_css_default11.root, styles_css_default12.root), "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, "aria-describedby": ariaDescribedby }, contents);
}

// node_modules/@cloudscape-design/components/collection-preferences/content-display/content-display-option.js
var import_react20 = __toESM(require_react());

// node_modules/@cloudscape-design/components/toggle/internal.js
var import_react19 = __toESM(require_react());

// node_modules/@cloudscape-design/components/toggle/style.js
function getAbstractSwitchStyles(style, checked, disabled, readOnly) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  let properties2 = {};
  if (SYSTEM === "core" && ((style === null || style === void 0 ? void 0 : style.input) || (style === null || style === void 0 ? void 0 : style.label))) {
    const computedState = getComputedAbstractSwitchState(checked, disabled, readOnly, false);
    properties2 = {
      control: {
        background: ((_a = style === null || style === void 0 ? void 0 : style.input) === null || _a === void 0 ? void 0 : _a.background) && style.input.background[computedState]
      },
      label: {
        color: ((_b = style === null || style === void 0 ? void 0 : style.label) === null || _b === void 0 ? void 0 : _b.color) && style.label.color[computedState]
      },
      focusRing: {
        borderColor: (_d = (_c = style === null || style === void 0 ? void 0 : style.input) === null || _c === void 0 ? void 0 : _c.focusRing) === null || _d === void 0 ? void 0 : _d.borderColor,
        borderRadius: (_f = (_e = style === null || style === void 0 ? void 0 : style.input) === null || _e === void 0 ? void 0 : _e.focusRing) === null || _f === void 0 ? void 0 : _f.borderRadius,
        borderWidth: (_h = (_g = style === null || style === void 0 ? void 0 : style.input) === null || _g === void 0 ? void 0 : _g.focusRing) === null || _h === void 0 ? void 0 : _h.borderWidth
      }
    };
  }
  return properties2;
}
function getStyledControlStyle(style, checked, disabled, readOnly) {
  var _a, _b;
  let properties2 = {};
  if (SYSTEM === "core" && ((_b = (_a = style === null || style === void 0 ? void 0 : style.input) === null || _a === void 0 ? void 0 : _a.handle) === null || _b === void 0 ? void 0 : _b.background)) {
    const computedState = getComputedAbstractSwitchState(checked, disabled, readOnly, void 0);
    properties2 = {
      background: style.input.handle.background[computedState]
    };
  }
  return properties2;
}

// node_modules/@cloudscape-design/components/toggle/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/toggle/styles.scoped.css";
var styles_css_default13 = {
  "root": "awsui_root_4yi2u_123in_145",
  "outline": "awsui_outline_4yi2u_123in_178",
  "toggle-control": "awsui_toggle-control_4yi2u_123in_201",
  "toggle-control-checked": "awsui_toggle-control-checked_4yi2u_123in_214",
  "toggle-control-disabled": "awsui_toggle-control-disabled_4yi2u_123in_217",
  "toggle-control-readonly": "awsui_toggle-control-readonly_4yi2u_123in_223",
  "toggle-handle": "awsui_toggle-handle_4yi2u_123in_227",
  "toggle-handle-checked": "awsui_toggle-handle-checked_4yi2u_123in_252",
  "toggle-handle-disabled": "awsui_toggle-handle-disabled_4yi2u_123in_259",
  "toggle-handle-readonly": "awsui_toggle-handle-readonly_4yi2u_123in_263"
};

// node_modules/@cloudscape-design/components/toggle/internal.js
var InternalToggle = import_react19.default.forwardRef(({ controlId, checked, name, disabled, readOnly, children, description, ariaLabel, ariaControls, onFocus, onBlur, onChange, nativeInputAttributes, __internalRootRef, style, __injectAnalyticsComponentMetadata, ...rest }, ref) => {
  const { ariaDescribedby, ariaLabelledby } = useFormFieldContext(rest);
  const baseProps = getBaseProps(rest);
  const checkboxRef = (0, import_react19.useRef)(null);
  const analyticsMetadata = {};
  const analyticsComponentMetadata = {
    name: "awsui.Toggle",
    label: { root: "self" },
    properties: {
      checked: `${!!checked}`
    }
  };
  if (__injectAnalyticsComponentMetadata) {
    analyticsMetadata.component = analyticsComponentMetadata;
  }
  if (!disabled && !readOnly) {
    analyticsMetadata.action = !checked ? "select" : "deselect";
  }
  useForwardFocus(ref, checkboxRef);
  return import_react19.default.createElement(AbstractSwitch, { ...baseProps, className: clsx_m_default(styles_css_default13.root, baseProps.className), controlClassName: clsx_m_default(styles_css_default13["toggle-control"], {
    [styles_css_default13["toggle-control-checked"]]: checked,
    [styles_css_default13["toggle-control-disabled"]]: disabled,
    [styles_css_default13["toggle-control-readonly"]]: readOnly
  }), outlineClassName: styles_css_default13.outline, controlId, disabled, readOnly, label: children, description, descriptionBottomPadding: true, ariaLabel, ariaLabelledby, ariaDescribedby, ariaControls, nativeControl: (nativeControlProps) => import_react19.default.createElement(with_native_attributes_default, {
    ...nativeControlProps,
    tag: "input",
    componentName: "Toggle",
    nativeAttributes: nativeInputAttributes,
    ref: checkboxRef,
    type: "checkbox",
    checked,
    name,
    "aria-disabled": readOnly && !disabled ? "true" : void 0,
    onFocus: () => fireNonCancelableEvent(onFocus),
    onBlur: () => fireNonCancelableEvent(onBlur),
    // empty handler to suppress React controllability warning
    onChange: () => {
    }
  }), onClick: () => {
    var _a;
    (_a = checkboxRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    fireNonCancelableEvent(onChange, { checked: !checked });
  }, styledControl: (
    /*Using span, not div for HTML validity*/
    import_react19.default.createElement("span", { className: clsx_m_default(styles_css_default13["toggle-handle"], {
      [styles_css_default13["toggle-handle-checked"]]: checked,
      [styles_css_default13["toggle-handle-disabled"]]: disabled,
      [styles_css_default13["toggle-handle-readonly"]]: readOnly
    }), style: getStyledControlStyle(style, checked, disabled, readOnly) })
  ), style: getAbstractSwitchStyles(style, checked, disabled, readOnly), __internalRootRef, ...getAnalyticsMetadataAttribute(analyticsMetadata) });
});
var internal_default7 = InternalToggle;

// node_modules/@cloudscape-design/components/collection-preferences/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/collection-preferences/styles.scoped.css";
var styles_css_default14 = {
  "visible-content": "awsui_visible-content_tc96w_hw4t7_153",
  "visible-content-toggle": "awsui_visible-content-toggle_tc96w_hw4t7_154",
  "visible-content-groups": "awsui_visible-content-groups_tc96w_hw4t7_155",
  "visible-content-group": "awsui_visible-content-group_tc96w_hw4t7_155",
  "visible-content-title": "awsui_visible-content-title_tc96w_hw4t7_160",
  "visible-content-group-label": "awsui_visible-content-group-label_tc96w_hw4t7_170",
  "visible-content-option": "awsui_visible-content-option_tc96w_hw4t7_176",
  "visible-content-option-label": "awsui_visible-content-option-label_tc96w_hw4t7_189",
  "content-display-option-toggle": "awsui_content-display-option-toggle_tc96w_hw4t7_212",
  "content-display-option-content": "awsui_content-display-option-content_tc96w_hw4t7_216",
  "content-display-option-label": "awsui_content-display-option-label_tc96w_hw4t7_256",
  "content-display": "awsui_content-display_tc96w_hw4t7_212",
  "content-display-text-filter": "awsui_content-display-text-filter_tc96w_hw4t7_264",
  "content-display-no-match": "awsui_content-display-no-match_tc96w_hw4t7_265",
  "content-display-title": "awsui_content-display-title_tc96w_hw4t7_269",
  "content-display-description": "awsui_content-display-description_tc96w_hw4t7_278",
  "content-display-option-list": "awsui_content-display-option-list_tc96w_hw4t7_286",
  "root": "awsui_root_tc96w_hw4t7_293",
  "modal-root": "awsui_modal-root_tc96w_hw4t7_294",
  "trigger-button": "awsui_trigger-button_tc96w_hw4t7_295",
  "cancel-button": "awsui_cancel-button_tc96w_hw4t7_296",
  "confirm-button": "awsui_confirm-button_tc96w_hw4t7_297",
  "custom": "awsui_custom_tc96w_hw4t7_298",
  "content-before": "awsui_content-before_tc96w_hw4t7_299",
  "second-column-small": "awsui_second-column-small_tc96w_hw4t7_303",
  "wrap-lines": "awsui_wrap-lines_tc96w_hw4t7_307",
  "striped-rows": "awsui_striped-rows_tc96w_hw4t7_308",
  "content-density": "awsui_content-density_tc96w_hw4t7_309",
  "page-size": "awsui_page-size_tc96w_hw4t7_310",
  "page-size-form-field": "awsui_page-size-form-field_tc96w_hw4t7_311",
  "page-size-radio-group": "awsui_page-size-radio-group_tc96w_hw4t7_312",
  "sticky-columns": "awsui_sticky-columns_tc96w_hw4t7_313",
  "sticky-columns-form-field": "awsui_sticky-columns-form-field_tc96w_hw4t7_314",
  "sticky-columns-radio-group": "awsui_sticky-columns-radio-group_tc96w_hw4t7_315",
  "sticky-columns-first": "awsui_sticky-columns-first_tc96w_hw4t7_316",
  "sticky-columns-last": "awsui_sticky-columns-last_tc96w_hw4t7_317"
};

// node_modules/@cloudscape-design/components/collection-preferences/content-display/content-display-option.js
var componentPrefix = "content-display-option";
var getClassName = (suffix) => styles_css_default14[[componentPrefix, suffix].filter(Boolean).join("-")];
var ContentDisplayOption = (0, import_react20.forwardRef)(({ onToggle, option }, ref) => {
  const idPrefix = useUniqueId(componentPrefix);
  const controlId = `${idPrefix}-control-${option.id}`;
  return import_react20.default.createElement(
    "div",
    { ref, className: getClassName("content") },
    import_react20.default.createElement("label", { className: getClassName("label"), htmlFor: controlId }, option.label),
    import_react20.default.createElement(
      "div",
      { className: getClassName("toggle") },
      import_react20.default.createElement(internal_default7, { checked: !!option.visible, onChange: () => onToggle && onToggle(option), disabled: option.alwaysVisible === true, controlId })
    )
  );
});
var content_display_option_default = ContentDisplayOption;

// node_modules/@cloudscape-design/components/collection-preferences/content-display/utils.js
function getSortedOptions({ options, contentDisplay }) {
  const optionsById = /* @__PURE__ */ new Map();
  for (const { id, visible } of contentDisplay) {
    optionsById.set(id, { id, label: id, visible });
  }
  for (const option of options) {
    const existing = optionsById.get(option.id);
    optionsById.set(option.id, { ...option, visible: !!(existing === null || existing === void 0 ? void 0 : existing.visible) });
  }
  return Array.from(optionsById.values());
}
function getFilteredOptions(options, filterText) {
  filterText = filterText.trim().toLowerCase();
  if (!filterText) {
    return options;
  }
  return options.filter((option) => option.label.toLowerCase().trim().includes(filterText));
}

// node_modules/@cloudscape-design/components/collection-preferences/content-display/index.js
var componentPrefix2 = "content-display";
var getClassName2 = (suffix) => styles_css_default14[`${componentPrefix2}-${suffix}`];
function ContentDisplayPreference({ title, description, options, value = options.map(({ id }) => ({
  id,
  visible: true
})), onChange, liveAnnouncementDndStarted, liveAnnouncementDndItemReordered, liveAnnouncementDndItemCommitted, liveAnnouncementDndDiscarded, dragHandleAriaDescription, dragHandleAriaLabel, enableColumnFiltering = false, i18nStrings }) {
  const idPrefix = useUniqueId(componentPrefix2);
  const i18n = useInternalI18n("collection-preferences");
  const [columnFilteringText, setColumnFilteringText] = (0, import_react21.useState)("");
  const titleId = `${idPrefix}-title`;
  const descriptionId = `${idPrefix}-description`;
  const [sortedOptions, sortedAndFilteredOptions] = (0, import_react21.useMemo)(() => {
    const sorted = getSortedOptions({ options, contentDisplay: value });
    const filtered = getFilteredOptions(sorted, columnFilteringText);
    return [sorted, filtered];
  }, [columnFilteringText, options, value]);
  const onToggle = (option) => {
    onChange(sortedOptions.map(({ id, visible }) => ({ id, visible: id === option.id ? !option.visible : visible })));
  };
  return import_react21.default.createElement(
    "div",
    { role: "group", "aria-labelledby": titleId, "aria-describedby": descriptionId, className: styles_css_default14[componentPrefix2], ...getAnalyticsInnerContextAttribute("contentDisplay") },
    import_react21.default.createElement("h3", { className: getClassName2("title"), id: titleId }, i18n("contentDisplayPreference.title", title)),
    import_react21.default.createElement("p", { className: getClassName2("description"), id: descriptionId }, i18n("contentDisplayPreference.description", description)),
    enableColumnFiltering && import_react21.default.createElement(
      "div",
      { className: getClassName2("text-filter") },
      import_react21.default.createElement(internal_default6, { filteringText: columnFilteringText, filteringPlaceholder: i18n("contentDisplayPreference.i18nStrings.columnFilteringPlaceholder", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringPlaceholder), filteringAriaLabel: i18n("contentDisplayPreference.i18nStrings.columnFilteringAriaLabel", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringAriaLabel), filteringClearAriaLabel: i18n("contentDisplayPreference.i18nStrings.columnFilteringClearFilterText", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringClearFilterText), onChange: ({ detail }) => setColumnFilteringText(detail.filteringText), countText: i18n("contentDisplayPreference.i18nStrings.columnFilteringCountText", (i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringCountText) ? i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringCountText(sortedAndFilteredOptions.length) : void 0, (format) => format({ count: sortedAndFilteredOptions.length })) })
    ),
    sortedAndFilteredOptions.length === 0 && import_react21.default.createElement(
      "div",
      { className: getClassName2("no-match") },
      import_react21.default.createElement(
        internal_default5,
        { size: "s", alignItems: "center" },
        import_react21.default.createElement(InternalBox, { margin: { top: "m" } }, i18n("contentDisplayPreference.i18nStrings.columnFilteringNoMatchText", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringNoMatchText)),
        import_react21.default.createElement(internal_default3, { onClick: () => setColumnFilteringText("") }, i18n("contentDisplayPreference.i18nStrings.columnFilteringClearFilterText", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringClearFilterText))
      )
    ),
    import_react21.default.createElement(InternalList, { items: sortedAndFilteredOptions, renderItem: (item) => ({
      id: item.id,
      content: import_react21.default.createElement(content_display_option_default, { option: item, onToggle }),
      announcementLabel: item.label
    }), disableItemPaddings: true, sortable: true, sortDisabled: columnFilteringText.trim().length > 0, onSortingChange: ({ detail: { items } }) => {
      onChange(items);
    }, ariaDescribedby: descriptionId, ariaLabelledby: titleId, i18nStrings: {
      liveAnnouncementDndStarted: i18n("contentDisplayPreference.liveAnnouncementDndStarted", liveAnnouncementDndStarted, formatDndStarted),
      liveAnnouncementDndItemReordered: i18n("contentDisplayPreference.liveAnnouncementDndItemReordered", liveAnnouncementDndItemReordered, formatDndItemReordered),
      liveAnnouncementDndItemCommitted: i18n("contentDisplayPreference.liveAnnouncementDndItemCommitted", liveAnnouncementDndItemCommitted, formatDndItemCommitted),
      liveAnnouncementDndDiscarded: i18n("contentDisplayPreference.liveAnnouncementDndDiscarded", liveAnnouncementDndDiscarded),
      dragHandleAriaLabel: i18n("contentDisplayPreference.dragHandleAriaLabel", dragHandleAriaLabel),
      dragHandleAriaDescription: i18n("contentDisplayPreference.dragHandleAriaDescription", dragHandleAriaDescription)
    } })
  );
}

// node_modules/@cloudscape-design/components/collection-preferences/utils.js
var import_react29 = __toESM(require_react());

// node_modules/@cloudscape-design/components/column-layout/internal.js
var import_react25 = __toESM(require_react());

// node_modules/@cloudscape-design/components/column-layout/flexible-column-layout/index.js
var import_react22 = __toESM(require_react());

// node_modules/@cloudscape-design/components/column-layout/flexible-column-layout/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/column-layout/flexible-column-layout/styles.scoped.css";
var styles_css_default15 = {
  "css-grid": "awsui_css-grid_zqq3x_1t536_181",
  "grid-no-gutters": "awsui_grid-no-gutters_zqq3x_1t536_192",
  "grid-variant-text-grid": "awsui_grid-variant-text-grid_zqq3x_1t536_195",
  "item": "awsui_item_zqq3x_1t536_195",
  "first-column": "awsui_first-column_zqq3x_1t536_212"
};

// node_modules/@cloudscape-design/components/column-layout/flexible-column-layout/index.js
var isOdd = (value) => value % 2 !== 0;
function calculcateCssColumnCount(columns, minColumnWidth, containerWidth) {
  if (!containerWidth) {
    return columns;
  }
  const targetColumnCount = Math.min(columns, Math.floor(containerWidth / minColumnWidth));
  return Math.max(1, targetColumnCount < columns && isOdd(targetColumnCount) ? targetColumnCount - 1 : targetColumnCount);
}
function FlexibleColumnLayout({ columns = 1, minColumnWidth = 0, disableGutters, variant, children, __tagOverride }) {
  const [containerWidth, containerRef] = useContainerQuery((rect) => rect.contentBoxWidth);
  const columnCount = calculcateCssColumnCount(columns, minColumnWidth, containerWidth);
  const shouldDisableGutters = variant !== "text-grid" && disableGutters;
  const flattenedChildren = flattenChildren(children, "ColumnLayout");
  const Tag = __tagOverride !== null && __tagOverride !== void 0 ? __tagOverride : "div";
  return import_react22.default.createElement(Tag, { ref: containerRef, className: clsx_m_default(styles_css_default15["css-grid"], styles_css_default15[`grid-variant-${variant}`], shouldDisableGutters && [styles_css_default15["grid-no-gutters"]]), style: { gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` } }, flattenedChildren.map((child, i) => {
    const key2 = child && typeof child === "object" ? child.key : void 0;
    return import_react22.default.createElement("div", { key: key2 ? String(key2) : void 0, className: clsx_m_default(styles_css_default15.item, {
      [styles_css_default15["first-column"]]: i % columnCount === 0
    }) }, child);
  }));
}

// node_modules/@cloudscape-design/components/column-layout/grid-column-layout.js
var import_react24 = __toESM(require_react());

// node_modules/@cloudscape-design/components/grid/internal.js
var import_react23 = __toESM(require_react());

// node_modules/@cloudscape-design/components/grid/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/grid/styles.scoped.css";
var styles_css_default16 = {
  "grid": "awsui_grid_14yj0_14sr9_145",
  "no-gutters": "awsui_no-gutters_14yj0_14sr9_181",
  "grid-column": "awsui_grid-column_14yj0_14sr9_186",
  "colspan-1": "awsui_colspan-1_14yj0_14sr9_197",
  "push-1": "awsui_push-1_14yj0_14sr9_201",
  "pull-1": "awsui_pull-1_14yj0_14sr9_204",
  "colspan-2": "awsui_colspan-2_14yj0_14sr9_207",
  "push-2": "awsui_push-2_14yj0_14sr9_211",
  "pull-2": "awsui_pull-2_14yj0_14sr9_214",
  "colspan-3": "awsui_colspan-3_14yj0_14sr9_217",
  "push-3": "awsui_push-3_14yj0_14sr9_221",
  "pull-3": "awsui_pull-3_14yj0_14sr9_224",
  "colspan-4": "awsui_colspan-4_14yj0_14sr9_227",
  "push-4": "awsui_push-4_14yj0_14sr9_231",
  "pull-4": "awsui_pull-4_14yj0_14sr9_234",
  "colspan-5": "awsui_colspan-5_14yj0_14sr9_237",
  "push-5": "awsui_push-5_14yj0_14sr9_241",
  "pull-5": "awsui_pull-5_14yj0_14sr9_244",
  "colspan-6": "awsui_colspan-6_14yj0_14sr9_247",
  "push-6": "awsui_push-6_14yj0_14sr9_251",
  "pull-6": "awsui_pull-6_14yj0_14sr9_254",
  "colspan-7": "awsui_colspan-7_14yj0_14sr9_257",
  "push-7": "awsui_push-7_14yj0_14sr9_261",
  "pull-7": "awsui_pull-7_14yj0_14sr9_264",
  "colspan-8": "awsui_colspan-8_14yj0_14sr9_267",
  "push-8": "awsui_push-8_14yj0_14sr9_271",
  "pull-8": "awsui_pull-8_14yj0_14sr9_274",
  "colspan-9": "awsui_colspan-9_14yj0_14sr9_277",
  "push-9": "awsui_push-9_14yj0_14sr9_281",
  "pull-9": "awsui_pull-9_14yj0_14sr9_284",
  "colspan-10": "awsui_colspan-10_14yj0_14sr9_287",
  "push-10": "awsui_push-10_14yj0_14sr9_291",
  "pull-10": "awsui_pull-10_14yj0_14sr9_294",
  "colspan-11": "awsui_colspan-11_14yj0_14sr9_297",
  "push-11": "awsui_push-11_14yj0_14sr9_301",
  "pull-11": "awsui_pull-11_14yj0_14sr9_304",
  "colspan-12": "awsui_colspan-12_14yj0_14sr9_307",
  "push-12": "awsui_push-12_14yj0_14sr9_311",
  "pull-12": "awsui_pull-12_14yj0_14sr9_314",
  "push-0": "awsui_push-0_14yj0_14sr9_317",
  "pull-0": "awsui_pull-0_14yj0_14sr9_320",
  "offset-1": "awsui_offset-1_14yj0_14sr9_323",
  "offset-2": "awsui_offset-2_14yj0_14sr9_326",
  "offset-3": "awsui_offset-3_14yj0_14sr9_329",
  "offset-4": "awsui_offset-4_14yj0_14sr9_332",
  "offset-5": "awsui_offset-5_14yj0_14sr9_335",
  "offset-6": "awsui_offset-6_14yj0_14sr9_338",
  "offset-7": "awsui_offset-7_14yj0_14sr9_341",
  "offset-8": "awsui_offset-8_14yj0_14sr9_344",
  "offset-9": "awsui_offset-9_14yj0_14sr9_347",
  "offset-10": "awsui_offset-10_14yj0_14sr9_350",
  "offset-11": "awsui_offset-11_14yj0_14sr9_353",
  "restore-pointer-events": "awsui_restore-pointer-events_14yj0_14sr9_357"
};

// node_modules/@cloudscape-design/components/grid/internal.js
var InternalGrid = import_react23.default.forwardRef(({ __breakpoint, gridDefinition = [], disableGutters = false, children, __tagOverride, __responsiveClassName, __internalRootRef, ...restProps }, ref) => {
  let [defaultBreakpoint, defaultRef] = useContainerBreakpoints(void 0);
  if (__breakpoint !== void 0) {
    defaultBreakpoint = __breakpoint;
    defaultRef = ref;
  }
  const baseProps = getBaseProps(restProps);
  const flattenedChildren = flattenChildren(children, "Grid");
  const Tag = __tagOverride !== null && __tagOverride !== void 0 ? __tagOverride : "div";
  if (isDevelopment) {
    const columnCount = gridDefinition.length;
    const childCount = flattenedChildren.length;
    if (columnCount !== childCount) {
      warnOnce("Grid", `The number of children (${childCount}) does not match the number of columns defined (${columnCount}).`);
    }
  }
  const mergedRef = useMergeRefs(defaultRef, __internalRootRef);
  return import_react23.default.createElement(Tag, { ...baseProps, className: clsx_m_default(styles_css_default16.grid, baseProps.className, { [styles_css_default16["no-gutters"]]: disableGutters }, __responsiveClassName ? __responsiveClassName(defaultBreakpoint) : null), ref: mergedRef }, flattenedChildren.map((child, i) => {
    var _a, _b, _c, _d;
    const key2 = child && typeof child === "object" ? child.key : void 0;
    return import_react23.default.createElement(
      "div",
      { key: key2 ? String(key2) : void 0, className: clsx_m_default(styles_css_default16["grid-column"], getColumnClassNames("colspan", (_a = gridDefinition[i]) === null || _a === void 0 ? void 0 : _a.colspan, defaultBreakpoint), getColumnClassNames("offset", (_b = gridDefinition[i]) === null || _b === void 0 ? void 0 : _b.offset, defaultBreakpoint), getColumnClassNames("pull", (_c = gridDefinition[i]) === null || _c === void 0 ? void 0 : _c.pull, defaultBreakpoint), getColumnClassNames("push", (_d = gridDefinition[i]) === null || _d === void 0 ? void 0 : _d.push, defaultBreakpoint)) },
      import_react23.default.createElement("div", { className: styles_css_default16["restore-pointer-events"] }, child)
    );
  }));
});
function getColumnClassNames(prop, mapping, breakpoint) {
  if (typeof mapping === "number") {
    return styles_css_default16[`${prop}-${mapping}`];
  }
  if (breakpoint === null || mapping === void 0) {
    return null;
  }
  return styles_css_default16[`${prop}-${matchBreakpointMapping(mapping, breakpoint)}`];
}
var internal_default8 = InternalGrid;

// node_modules/@cloudscape-design/components/column-layout/util.js
function repeat(value, times) {
  const array = [];
  for (let i = 0; i < times; i++) {
    array[i] = value;
  }
  return array;
}

// node_modules/@cloudscape-design/components/column-layout/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/column-layout/styles.scoped.css";
var styles_css_default17 = {
  "column-layout": "awsui_column-layout_vvxn7_kakvq_181",
  "grid": "awsui_grid_vvxn7_kakvq_213",
  "grid-no-gutters": "awsui_grid-no-gutters_vvxn7_kakvq_219",
  "grid-variant-text-grid": "awsui_grid-variant-text-grid_vvxn7_kakvq_223",
  "grid-breakpoint-default": "awsui_grid-breakpoint-default_vvxn7_kakvq_231",
  "grid-columns-1": "awsui_grid-columns-1_vvxn7_kakvq_234",
  "grid-breakpoint-xxs": "awsui_grid-breakpoint-xxs_vvxn7_kakvq_234",
  "grid-breakpoint-xs": "awsui_grid-breakpoint-xs_vvxn7_kakvq_237",
  "grid-columns-2": "awsui_grid-columns-2_vvxn7_kakvq_240",
  "grid-columns-3": "awsui_grid-columns-3_vvxn7_kakvq_246",
  "grid-columns-4": "awsui_grid-columns-4_vvxn7_kakvq_252",
  "grid-vertical-borders": "awsui_grid-vertical-borders_vvxn7_kakvq_268",
  "grid-horizontal-borders": "awsui_grid-horizontal-borders_vvxn7_kakvq_301"
};

// node_modules/@cloudscape-design/components/column-layout/grid-column-layout.js
var COLUMN_DEFS = {
  1: { colspan: { default: 12, xxs: 12, xs: 12 } },
  2: { colspan: { default: 12, xxs: 6, xs: 6 } },
  3: { colspan: { default: 12, xxs: 6, xs: 4 } },
  4: { colspan: { default: 12, xxs: 6, xs: 3 } }
};
function GridColumnLayout({ columns, variant, borders, disableGutters, __breakpoint, children, __tagOverride }) {
  var _a;
  const isTextGridVariant = variant === "text-grid";
  const shouldDisableGutters = !isTextGridVariant && disableGutters;
  const shouldHaveHorizontalBorders = !isTextGridVariant && (borders === "horizontal" || borders === "all");
  const shouldHaveVerticalBorders = !isTextGridVariant && (borders === "vertical" || borders === "all");
  const flattenedChildren = flattenChildren(children, "ColumnLayout");
  const [breakpoint, ref] = useContainerBreakpoints(COLUMN_TRIGGERS);
  return import_react24.default.createElement(internal_default8, { ref, disableGutters: true, gridDefinition: repeat((_a = COLUMN_DEFS[columns]) !== null && _a !== void 0 ? _a : {}, flattenedChildren.length), className: clsx_m_default(styles_css_default17.grid, styles_css_default17[`grid-columns-${columns}`], styles_css_default17[`grid-variant-${variant}`], {
    [styles_css_default17["grid-horizontal-borders"]]: shouldHaveHorizontalBorders,
    [styles_css_default17["grid-vertical-borders"]]: shouldHaveVerticalBorders,
    [styles_css_default17["grid-no-gutters"]]: shouldDisableGutters
  }), __breakpoint: __breakpoint || breakpoint, __responsiveClassName: (breakpoint2) => breakpoint2 && styles_css_default17[`grid-breakpoint-${breakpoint2}`], __tagOverride }, children);
}

// node_modules/@cloudscape-design/components/column-layout/internal.js
var COLUMN_TRIGGERS = ["default", "xxs", "xs"];
function ColumnLayout({ columns = 1, variant = "default", borders = "none", disableGutters = false, minColumnWidth, children, __tagOverride, __breakpoint, __internalRootRef, ...restProps }) {
  const baseProps = getBaseProps(restProps);
  return import_react25.default.createElement("div", { ...baseProps, className: clsx_m_default(baseProps.className, styles_css_default17["column-layout"]), ref: __internalRootRef }, minColumnWidth ? import_react25.default.createElement(FlexibleColumnLayout, { columns, borders, variant, minColumnWidth, disableGutters, __tagOverride }, children) : import_react25.default.createElement(GridColumnLayout, { columns, variant, borders, disableGutters, __breakpoint, __tagOverride }, children));
}

// node_modules/@cloudscape-design/components/form-field/internal.js
var import_react26 = __toESM(require_react());

// node_modules/@cloudscape-design/components/form-field/util.js
function makeSlotId(prop, formFieldId, propName) {
  if (!prop) {
    return void 0;
  }
  return `${formFieldId}-${propName}`;
}
function getSlotIds(formFieldId, label, description, constraintText, characterCount, errorText, warningText) {
  const ids2 = {
    label: makeSlotId(label, formFieldId, "label"),
    description: makeSlotId(description, formFieldId, "description"),
    constraint: makeSlotId(constraintText, formFieldId, "constraint"),
    characterCount: makeSlotId(characterCount, formFieldId, "character-count"),
    error: makeSlotId(errorText, formFieldId, "error"),
    warning: makeSlotId(warningText, formFieldId, "warning")
  };
  return ids2;
}
function getAriaDescribedBy({ error, warning, description, constraint, characterCount }) {
  const describedByAttributes = [error, warning, description, constraint, characterCount].filter((e) => !!e);
  const describedBy = describedByAttributes.length ? describedByAttributes.join(" ") : void 0;
  return describedBy;
}
function getGridDefinition(stretch, secondaryControlPresent, isRefresh) {
  let columns;
  if (stretch) {
    columns = [{ colspan: 12 }, { colspan: 12 }];
  } else if (isRefresh) {
    columns = [{ colspan: { default: 12, xs: 8 } }, { colspan: { default: 12, xs: 4 } }];
  } else {
    columns = [{ colspan: { default: 12, xs: 9 } }, { colspan: { default: 12, xs: 3 } }];
  }
  if (!secondaryControlPresent) {
    return [columns[0]];
  }
  return columns;
}

// node_modules/@cloudscape-design/components/form-field/analytics-metadata/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/form-field/analytics-metadata/styles.scoped.css";
var styles_css_default18 = {
  "label": "awsui_label_aqu00_ocied_5"
};

// node_modules/@cloudscape-design/components/form-field/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/form-field/styles.scoped.css";
var styles_css_default19 = {
  "error-icon-shake-wrapper": "awsui_error-icon-shake-wrapper_14mhv_ilwf6_153",
  "warning-icon-shake-wrapper": "awsui_warning-icon-shake-wrapper_14mhv_ilwf6_154",
  "awsui-motion-shake-horizontally": "awsui_awsui-motion-shake-horizontally_14mhv_ilwf6_1",
  "error-icon-scale-wrapper": "awsui_error-icon-scale-wrapper_14mhv_ilwf6_184",
  "warning-icon-scale-wrapper": "awsui_warning-icon-scale-wrapper_14mhv_ilwf6_185",
  "awsui-motion-scale-popup": "awsui_awsui-motion-scale-popup_14mhv_ilwf6_1",
  "warning": "awsui_warning_14mhv_ilwf6_154",
  "error": "awsui_error_14mhv_ilwf6_153",
  "awsui-motion-fade-in-0": "awsui_awsui-motion-fade-in-0_14mhv_ilwf6_1",
  "root": "awsui_root_14mhv_ilwf6_236",
  "label": "awsui_label_14mhv_ilwf6_269",
  "info": "awsui_info_14mhv_ilwf6_285",
  "description": "awsui_description_14mhv_ilwf6_291",
  "constraint": "awsui_constraint_14mhv_ilwf6_292",
  "hints": "awsui_hints_14mhv_ilwf6_299",
  "constraint-has-validation-text": "awsui_constraint-has-validation-text_14mhv_ilwf6_300",
  "secondary-control": "awsui_secondary-control_14mhv_ilwf6_304",
  "controls": "awsui_controls_14mhv_ilwf6_308",
  "label-hidden": "awsui_label-hidden_14mhv_ilwf6_308",
  "label-wrapper": "awsui_label-wrapper_14mhv_ilwf6_311",
  "control": "awsui_control_14mhv_ilwf6_308",
  "error__message": "awsui_error__message_14mhv_ilwf6_338",
  "warning__message": "awsui_warning__message_14mhv_ilwf6_339",
  "visually-hidden": "awsui_visually-hidden_14mhv_ilwf6_343"
};

// node_modules/@cloudscape-design/components/form-field/test-classes/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/form-field/test-classes/styles.scoped.css";
var styles_css_default20 = {
  "constraint": "awsui_constraint_6mjrv_ag0bo_5",
  "character-count": "awsui_character-count_6mjrv_ag0bo_6"
};

// node_modules/@cloudscape-design/components/form-field/internal.js
var CHARACTER_COUNT_DEBOUNCE_MS = 1e3;
function FormFieldError({ id, children, errorIconAriaLabel }) {
  const i18n = useInternalI18n("form-field");
  const contentRef = (0, import_react26.useRef)(null);
  const i18nErrorIconAriaLabel = i18n("i18nStrings.errorIconAriaLabel", errorIconAriaLabel);
  return import_react26.default.createElement(
    import_react26.default.Fragment,
    null,
    import_react26.default.createElement(
      "div",
      { id, className: styles_css_default19.error },
      import_react26.default.createElement(
        "div",
        { className: styles_css_default19["error-icon-shake-wrapper"] },
        import_react26.default.createElement(
          "div",
          { className: styles_css_default19["error-icon-scale-wrapper"] },
          import_react26.default.createElement(internal_default2, { name: "status-negative", size: "small", ariaLabel: i18nErrorIconAriaLabel })
        )
      ),
      import_react26.default.createElement("span", { className: styles_css_default19.error__message, ref: contentRef }, children)
    ),
    import_react26.default.createElement(internal_default, { assertive: true, tagName: "span", sources: [i18nErrorIconAriaLabel, contentRef] })
  );
}
function FormFieldWarning({ id, children, warningIconAriaLabel }) {
  const i18n = useInternalI18n("form-field");
  const contentRef = (0, import_react26.useRef)(null);
  const i18nWarningIconAriaLabel = i18n("i18nStrings.warningIconAriaLabel", warningIconAriaLabel);
  return import_react26.default.createElement(
    import_react26.default.Fragment,
    null,
    import_react26.default.createElement(
      "div",
      { id, className: styles_css_default19.warning },
      import_react26.default.createElement(
        "div",
        { className: styles_css_default19["warning-icon-shake-wrapper"] },
        import_react26.default.createElement(
          "div",
          { className: styles_css_default19["warning-icon-scale-wrapper"] },
          import_react26.default.createElement(internal_default2, { name: "status-warning", size: "small", ariaLabel: i18nWarningIconAriaLabel })
        )
      ),
      import_react26.default.createElement("span", { className: styles_css_default19.warning__message, ref: contentRef }, children)
    ),
    import_react26.default.createElement(internal_default, { assertive: true, tagName: "span", sources: [i18nWarningIconAriaLabel, contentRef] })
  );
}
function ConstraintTextRegion({ id, hasValidationText, children }) {
  return import_react26.default.createElement("div", { id, className: clsx_m_default(styles_css_default19.constraint, hasValidationText && styles_css_default19["constraint-has-validation-text"]) }, children);
}
function InternalFormField({ controlId, stretch = false, label, info, i18nStrings, children, secondaryControl, description, constraintText, characterCountText, errorText, warningText, __hideLabel, __internalRootRef, __disableGutters = false, __analyticsMetadata = void 0, __style = {}, ...rest }) {
  const rootRef = (0, import_react26.useRef)();
  const ref = useMergeRefs(rootRef, __internalRootRef);
  const baseProps = getBaseProps(rest);
  const isRefresh = useVisualRefresh();
  const instanceUniqueId = useUniqueId("formField");
  const generatedControlId = controlId || instanceUniqueId;
  const formFieldId = controlId || generatedControlId;
  const { funnelIdentifier, funnelInteractionId, submissionAttempt, funnelState, errorCount } = useFunnel();
  const { stepIdentifier, stepNumber, stepNameSelector } = useFunnelStep();
  const { subStepIdentifier, subStepSelector, subStepNameSelector } = useFunnelSubStep();
  const showWarning = warningText && !errorText;
  if (warningText && errorText) {
    warnOnce("FileUpload", "Both `errorText` and `warningText` exist. `warningText` will not be shown.");
  }
  const slotIds = getSlotIds(formFieldId, label, description, constraintText, characterCountText, errorText, showWarning ? warningText : void 0);
  const ariaDescribedBy = getAriaDescribedBy(slotIds);
  const gridDefinition = getGridDefinition(stretch, !!secondaryControl, isRefresh);
  const { ariaLabelledby: parentAriaLabelledby, ariaDescribedby: parentAriaDescribedby, invalid: parentInvalid, warning: parentWarning } = useFormFieldContext({});
  const contextValuesWithoutControlId = {
    ariaLabelledby: joinStrings(parentAriaLabelledby, slotIds.label) || void 0,
    ariaDescribedby: joinStrings(parentAriaDescribedby, ariaDescribedBy) || void 0,
    invalid: !!errorText || !!parentInvalid,
    warning: !!warningText && !errorText || !!parentWarning && !parentInvalid
  };
  const analyticsAttributes = {
    [DATA_ATTR_FIELD_LABEL]: slotIds.label ? getFieldSlotSeletor(slotIds.label) : void 0,
    [DATA_ATTR_FIELD_ERROR]: slotIds.error ? getFieldSlotSeletor(slotIds.error) : void 0
  };
  const debounceTimeoutRef = (0, import_react26.useRef)();
  const [debouncedCharacterCountText, setDebouncedCharacterCountText] = (0, import_react26.useState)(characterCountText);
  (0, import_react26.useEffect)(() => {
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedCharacterCountText(characterCountText);
    }, CHARACTER_COUNT_DEBOUNCE_MS);
    return () => clearTimeout(debounceTimeoutRef.current);
  }, [characterCountText]);
  (0, import_react26.useEffect)(() => {
    var _a, _b, _c;
    if (funnelInteractionId && errorText && funnelState.current !== "complete") {
      const stepName = getTextFromSelector(stepNameSelector);
      const subStepName = getTextFromSelector(subStepNameSelector);
      errorCount.current++;
      const errorIsVisible = ((_c = (_b = (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) === null || _b === void 0 ? void 0 : _b.width) !== null && _c !== void 0 ? _c : 0) > 0;
      if (errorIsVisible) {
        FunnelMetrics.funnelSubStepError({
          funnelInteractionId,
          funnelIdentifier,
          subStepSelector,
          subStepName,
          subStepNameSelector,
          subStepIdentifier,
          stepNumber,
          stepName,
          stepNameSelector,
          stepIdentifier,
          fieldErrorSelector: `${getFieldSlotSeletor(slotIds.error)} .${styles_css_default19.error__message}`,
          fieldLabelSelector: getFieldSlotSeletor(slotIds.label),
          subStepAllSelector: getSubStepAllSelector(),
          fieldIdentifier: __analyticsMetadata === null || __analyticsMetadata === void 0 ? void 0 : __analyticsMetadata.instanceIdentifier,
          errorContext: __analyticsMetadata === null || __analyticsMetadata === void 0 ? void 0 : __analyticsMetadata.errorContext
        });
      }
      return () => {
        errorCount.current--;
      };
    }
  }, [funnelInteractionId, errorText, submissionAttempt, errorCount]);
  return import_react26.default.createElement(
    "div",
    { ...baseProps, className: clsx_m_default(baseProps.className, styles_css_default19.root), style: __style, ref, ...analyticsAttributes, ...copyAnalyticsMetadataAttribute(rest) },
    import_react26.default.createElement(
      "div",
      { className: clsx_m_default(styles_css_default19["label-wrapper"], __hideLabel && styles_css_default19["visually-hidden"]) },
      label && import_react26.default.createElement("label", { className: clsx_m_default(styles_css_default19.label, styles_css_default18.label), id: slotIds.label, htmlFor: generatedControlId }, label),
      import_react26.default.createElement(InfoLinkLabelContext.Provider, { value: slotIds.label }, !__hideLabel && info && import_react26.default.createElement("span", { className: styles_css_default19.info }, info))
    ),
    description && import_react26.default.createElement("div", { className: styles_css_default19.description, id: slotIds.description }, description),
    import_react26.default.createElement(
      "div",
      { className: clsx_m_default(styles_css_default19.controls, __hideLabel && styles_css_default19["label-hidden"]) },
      import_react26.default.createElement(
        internal_default8,
        { gridDefinition, disableGutters: __disableGutters },
        import_react26.default.createElement(FormFieldContext.Provider, { value: {
          controlId: generatedControlId,
          ...contextValuesWithoutControlId
        } }, children && import_react26.default.createElement("div", { className: styles_css_default19.control }, children)),
        secondaryControl && import_react26.default.createElement(
          FormFieldContext.Provider,
          { value: contextValuesWithoutControlId },
          import_react26.default.createElement("div", { className: styles_css_default19["secondary-control"] }, secondaryControl)
        )
      )
    ),
    (constraintText || characterCountText || errorText || warningText) && import_react26.default.createElement(
      "div",
      { className: styles_css_default19.hints },
      errorText && import_react26.default.createElement(FormFieldError, { id: slotIds.error, errorIconAriaLabel: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.errorIconAriaLabel }, errorText),
      showWarning && import_react26.default.createElement(FormFieldWarning, { id: slotIds.warning, warningIconAriaLabel: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.warningIconAriaLabel }, warningText),
      (constraintText || characterCountText) && import_react26.default.createElement(
        ConstraintTextRegion,
        { hasValidationText: !!errorText || !!warningText },
        constraintText && import_react26.default.createElement("span", { id: slotIds.constraint, className: styles_css_default20.constraint }, constraintText),
        characterCountText && import_react26.default.createElement(
          import_react26.default.Fragment,
          null,
          !!constraintText && " ",
          import_react26.default.createElement("span", { className: styles_css_default20["character-count"], "aria-hidden": true }, characterCountText),
          import_react26.default.createElement(ScreenreaderOnly, { id: slotIds.characterCount }, debouncedCharacterCountText)
        )
      )
    )
  );
}

// node_modules/@cloudscape-design/components/radio-group/internal.js
var import_react28 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/hooks/forward-focus/radio-group.js
var import_react27 = __toESM(require_react());
function useRadioGroupForwardFocus(forwardedRef, items, value) {
  const itemRef = (0, import_react27.useRef)(null);
  const itemIndex = items && items.findIndex((item) => item.value === value);
  (0, import_react27.useImperativeHandle)(forwardedRef, () => ({
    focus() {
      var _a;
      (_a = itemRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }));
  return [itemRef, itemIndex !== void 0 && itemIndex !== -1 ? itemIndex : 0];
}

// node_modules/@cloudscape-design/components/radio-group/analytics-metadata/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/radio-group/analytics-metadata/styles.scoped.css";
var styles_css_default21 = {
  "selected": "awsui_selected_1m93f_14fvl_5"
};

// node_modules/@cloudscape-design/components/radio-group/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/radio-group/styles.scoped.css";
var styles_css_default22 = {
  "radio-group": "awsui_radio-group_1mabk_1wcm0_145",
  "horizontal-group": "awsui_horizontal-group_1mabk_1wcm0_176",
  "radio": "awsui_radio_1mabk_1wcm0_145",
  "horizontal": "awsui_horizontal_1mabk_1wcm0_176",
  "radio--has-description": "awsui_radio--has-description_1mabk_1wcm0_190"
};

// node_modules/@cloudscape-design/components/radio-group/test-classes/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/radio-group/test-classes/styles.scoped.css";
var styles_css_default23 = {
  "root": "awsui_root_1np5w_1q93l_5"
};

// node_modules/@cloudscape-design/components/radio-group/internal.js
var InternalRadioGroup = import_react28.default.forwardRef(({ name, value, items, ariaLabel, ariaRequired, ariaControls, onChange, readOnly, __internalRootRef, style, direction, ...props }, ref) => {
  const { ariaDescribedby, ariaLabelledby } = useFormFieldContext(props);
  const baseProps = getBaseProps(props);
  const generatedName = useUniqueId("awsui-radio-");
  const [radioButtonRef, radioButtonRefIndex] = useRadioGroupForwardFocus(ref, items, value);
  return import_react28.default.createElement("div", { role: "radiogroup", "aria-labelledby": ariaLabelledby, "aria-label": ariaLabel, "aria-describedby": ariaDescribedby, "aria-required": ariaRequired, "aria-controls": ariaControls, "aria-readonly": readOnly ? "true" : void 0, ...baseProps, className: clsx_m_default(baseProps.className, styles_css_default23.root, styles_css_default22["radio-group"], direction === "horizontal" && styles_css_default22["horizontal-group"]), ref: __internalRootRef }, items && items.map((item, index) => import_react28.default.createElement(radio_button_default, { key: item.value, ref: index === radioButtonRefIndex ? radioButtonRef : void 0, className: clsx_m_default(styles_css_default22.radio, item.description && styles_css_default22["radio--has-description"], direction === "horizontal" && styles_css_default22.horizontal, item.value === value && styles_css_default21.selected), checked: item.value === value, name: name || generatedName, value: item.value, description: item.description, disabled: item.disabled, onSelect: () => fireNonCancelableEvent(onChange, { value: item.value }), controlId: item.controlId, readOnly, style, ...getAnalyticsMetadataAttribute(!item.disabled && !readOnly ? {
    detail: {
      position: `${index + 1}`,
      value: item.value
    }
  } : {}) }, item.label)));
});
var internal_default9 = InternalRadioGroup;

// node_modules/@cloudscape-design/components/collection-preferences/utils.js
var copyPreferences = ({ pageSize, wrapLines, stripedRows, contentDensity, visibleContent, contentDisplay, stickyColumns, custom }) => ({
  pageSize,
  wrapLines,
  stripedRows,
  contentDensity,
  visibleContent,
  contentDisplay,
  stickyColumns,
  custom
});
var mergePreferences = (newPref, oldPref) => {
  const newObj = { ...oldPref };
  const prefNames = [
    "pageSize",
    "wrapLines",
    "stripedRows",
    "contentDensity",
    "visibleContent",
    "custom",
    "contentDisplay",
    "stickyColumns"
  ];
  for (const prefName of prefNames) {
    if (newPref[prefName] !== void 0) {
      newObj[prefName] = newPref[prefName];
    }
  }
  return newObj;
};
var ModalContentLayout = ({ left, right }) => {
  const [breakpoint, ref] = useContainerBreakpoints(["xs"]);
  const smallContainer = breakpoint === "default";
  const columns = left && right ? 2 : 1;
  return import_react29.default.createElement(
    "div",
    { ref },
    import_react29.default.createElement(
      ColumnLayout,
      { columns: smallContainer ? 1 : columns, variant: "text-grid" },
      left && import_react29.default.createElement("div", null, left),
      right && import_react29.default.createElement("div", { className: clsx_m_default(left && smallContainer && styles_css_default14["second-column-small"]) }, right)
    )
  );
};
var PageSizePreference = ({ title, options, value, onChange }) => {
  const i18n = useInternalI18n("collection-preferences");
  return import_react29.default.createElement(
    "div",
    { className: styles_css_default14["page-size"], ...getAnalyticsInnerContextAttribute("pageSize") },
    import_react29.default.createElement(
      InternalFormField,
      { label: i18n("pageSizePreference.title", title), stretch: true, className: styles_css_default14["page-size-form-field"] },
      import_react29.default.createElement(internal_default9, { className: styles_css_default14["page-size-radio-group"], value: `${value}`, items: options.map(({ label, value: value2 }) => ({ label, value: `${value2}` })), onChange: ({ detail }) => onChange(parseInt(detail.value, 10)) })
    )
  );
};
var WrapLinesPreference = ({ label, description, value, onChange }) => {
  const i18n = useInternalI18n("collection-preferences");
  return import_react29.default.createElement(
    "div",
    { ...getAnalyticsInnerContextAttribute("wrapLines") },
    import_react29.default.createElement(internal_default4, { checked: !!value, description: i18n("wrapLinesPreference.description", description), onChange: ({ detail }) => onChange(detail.checked), className: styles_css_default14["wrap-lines"] }, i18n("wrapLinesPreference.label", label))
  );
};
function StripedRowsPreference({ label, description, value, onChange }) {
  const i18n = useInternalI18n("collection-preferences");
  return import_react29.default.createElement(
    "div",
    { ...getAnalyticsInnerContextAttribute("stripedRows") },
    import_react29.default.createElement(internal_default4, { checked: !!value, description: i18n("stripedRowsPreference.description", description), onChange: ({ detail }) => onChange(detail.checked), className: styles_css_default14["striped-rows"] }, i18n("stripedRowsPreference.label", label))
  );
}
var ContentDensityPreference = ({ label, description, value, onChange }) => {
  const i18n = useInternalI18n("collection-preferences");
  return import_react29.default.createElement(
    "div",
    { ...getAnalyticsInnerContextAttribute("contentDensity") },
    import_react29.default.createElement(internal_default4, { checked: value === "compact", description: i18n("contentDensityPreference.description", description), onChange: ({ detail }) => onChange(detail.checked ? "compact" : "comfortable"), className: styles_css_default14["content-density"] }, i18n("contentDensityPreference.label", label))
  );
};
var StickyPreference = ({ firstOrLast, preference, value, onChange }) => {
  const { title, description, options } = preference;
  return import_react29.default.createElement(
    "div",
    { className: styles_css_default14[`sticky-columns-${firstOrLast}`], ...getAnalyticsInnerContextAttribute("stickyColumns") },
    import_react29.default.createElement(
      InternalFormField,
      { className: styles_css_default14["sticky-columns-form-field"], label: title, description },
      import_react29.default.createElement(internal_default9, { className: styles_css_default14["sticky-columns-radio-group"], value: typeof value !== "undefined" ? `${value}` : null, items: options.map(({ label, value: value2 }) => ({ label, value: `${value2}` })), onChange: ({ detail }) => onChange(Number(detail.value)) })
    )
  );
};
var StickyColumnsPreference = ({ firstColumns, lastColumns, onChange, value }) => {
  return import_react29.default.createElement(
    internal_default5,
    { className: styles_css_default14["sticky-columns"], size: "l" },
    firstColumns && import_react29.default.createElement(StickyPreference, { firstOrLast: "first", preference: firstColumns, value: value === null || value === void 0 ? void 0 : value.first, onChange: (newValue) => onChange({ ...value, first: newValue }) }),
    lastColumns && import_react29.default.createElement(StickyPreference, { firstOrLast: "last", preference: lastColumns, value: value === null || value === void 0 ? void 0 : value.last, onChange: (newValue) => onChange({ ...value, last: newValue }) })
  );
};
var CustomPreference = ({ value, customPreference, onChange }) => {
  const [customState, setCustomState] = (0, import_react29.useState)(value);
  if (customPreference) {
    return import_react29.default.createElement("div", { className: styles_css_default14.custom, ...getAnalyticsInnerContextAttribute("custom") }, customPreference(customState, (value2) => {
      setCustomState(() => value2);
      onChange(value2);
    }));
  }
  return null;
};

// node_modules/@cloudscape-design/components/collection-preferences/visible-content.js
var import_react30 = __toESM(require_react());
var isVisible = (id, visibleIds) => visibleIds.indexOf(id) !== -1;
var className = (suffix) => ({
  className: styles_css_default14[`visible-content-${suffix}`]
});
function VisibleContentPreference({ title, options, value = [], onChange }) {
  const idPrefix = useUniqueId("visible-content");
  const flatOptionsIds = options.flatMap((group) => group.options.map((option) => option.id));
  const onToggle = (id) => {
    if (!isVisible(id, value)) {
      onChange([...value, id].sort((firstId, secondId) => flatOptionsIds.indexOf(firstId) - flatOptionsIds.indexOf(secondId)));
    } else {
      onChange(value.filter((currentId) => currentId !== id));
    }
  };
  const selectionOption = (option, optionGroupIndex, optionIndex) => {
    const labelId = `${idPrefix}-${optionGroupIndex}-${optionIndex}`;
    return import_react30.default.createElement(
      "div",
      { key: optionIndex, ...className("option") },
      import_react30.default.createElement("label", { ...className("option-label"), htmlFor: labelId }, option.label),
      import_react30.default.createElement(
        "div",
        { ...className("toggle") },
        import_react30.default.createElement(internal_default7, { checked: isVisible(option.id, value), onChange: () => onToggle(option.id), disabled: option.editable === false, controlId: labelId })
      )
    );
  };
  const outerGroupLabelId = `${idPrefix}-outer`;
  return import_react30.default.createElement(
    "div",
    { className: styles_css_default14["visible-content"], ...getAnalyticsInnerContextAttribute("visibleContent") },
    import_react30.default.createElement("h3", { ...className("title"), id: outerGroupLabelId }, title),
    import_react30.default.createElement(internal_default5, { ...className("groups"), size: "xs" }, options.map((optionGroup, optionGroupIndex) => {
      const groupLabelId = `${idPrefix}-${optionGroupIndex}`;
      return import_react30.default.createElement(
        "div",
        { key: optionGroupIndex, ...className("group"), role: "group", "aria-labelledby": `${outerGroupLabelId} ${groupLabelId}` },
        import_react30.default.createElement("div", { ...className("group-label"), id: groupLabelId }, optionGroup.label),
        import_react30.default.createElement("div", null, optionGroup.options.map((option, optionIndex) => selectionOption(option, optionGroupIndex, optionIndex)))
      );
    }))
  );
}

// node_modules/@cloudscape-design/components/collection-preferences/index.js
var componentName = "CollectionPreferences";
function CollectionPreferences({ title, confirmLabel, cancelLabel, closeAriaLabel, disabled = false, onConfirm, onCancel, visibleContentPreference, contentDisplayPreference, pageSizePreference, wrapLinesPreference, stripedRowsPreference, contentDensityPreference, stickyColumnsPreference, preferences, customPreference, getModalRoot, removeModalRoot, contentBefore, ...rest }) {
  var _a;
  const parentMetadata = (0, import_react31.useContext)(CollectionPreferencesMetadata);
  const { __internalRootRef } = useBaseComponent("CollectionPreferences", {
    props: {},
    metadata: {
      ...parentMetadata,
      hasStripedRowsPreference: !!stripedRowsPreference,
      hasVisibleContentPreference: !!visibleContentPreference,
      hasContentDisplayPreference: !!contentDisplayPreference,
      hasContentDensityPreference: !!contentDensityPreference,
      hasStickyColumnsPreference: !!stickyColumnsPreference,
      hasContentDisplayColumnFiltering: !!(contentDisplayPreference === null || contentDisplayPreference === void 0 ? void 0 : contentDisplayPreference.enableColumnFiltering),
      visibleContentOptionsCount: (_a = visibleContentPreference === null || visibleContentPreference === void 0 ? void 0 : visibleContentPreference.options) === null || _a === void 0 ? void 0 : _a.length
    }
  });
  checkControlled("CollectionPreferences", "preferences", preferences, "onConfirm", onConfirm);
  const i18n = useInternalI18n("collection-preferences");
  const baseProps = getBaseProps(rest);
  const [modalVisible, setModalVisible] = (0, import_react31.useState)(false);
  const [temporaryPreferences, setTemporaryPreferences] = (0, import_react31.useState)(copyPreferences(preferences || {}));
  const triggerRef = (0, import_react31.useRef)(null);
  const dialogPreviouslyOpen = (0, import_react31.useRef)(false);
  (0, import_react31.useEffect)(() => {
    var _a2;
    if (!modalVisible) {
      if (dialogPreviouslyOpen.current) {
        (_a2 = triggerRef.current) === null || _a2 === void 0 ? void 0 : _a2.focus();
      }
    } else {
      dialogPreviouslyOpen.current = true;
    }
  }, [modalVisible]);
  const onConfirmListener = () => {
    setModalVisible(false);
    fireNonCancelableEvent(onConfirm, temporaryPreferences);
  };
  const onCancelListener = () => {
    fireNonCancelableEvent(onCancel, {});
    setModalVisible(false);
    setTemporaryPreferences(copyPreferences(preferences || {}));
  };
  const hasContentOnTheLeft = !!(pageSizePreference || wrapLinesPreference || stripedRowsPreference || contentDensityPreference || stickyColumnsPreference || customPreference);
  const hasContentOnTheRight = !!(visibleContentPreference || contentDisplayPreference);
  const onChange = (changedPreferences) => setTemporaryPreferences(mergePreferences(changedPreferences, temporaryPreferences));
  if (visibleContentPreference && contentDisplayPreference) {
    warnOnce(componentName, "You provided both `visibleContentPreference` and `contentDisplayPreference` props. `visibleContentPreference` will be ignored and only `contentDisplayPreference` will be rendered.");
  }
  const referrerId = useUniqueId();
  const tableComponentContext = useTableComponentsContext();
  (0, import_react31.useEffect)(() => {
    var _a2;
    if ((_a2 = tableComponentContext === null || tableComponentContext === void 0 ? void 0 : tableComponentContext.preferencesRef) === null || _a2 === void 0 ? void 0 : _a2.current) {
      tableComponentContext.preferencesRef.current.pageSize = preferences === null || preferences === void 0 ? void 0 : preferences.pageSize;
      if (preferences === null || preferences === void 0 ? void 0 : preferences.contentDisplay) {
        tableComponentContext.preferencesRef.current.visibleColumns = preferences === null || preferences === void 0 ? void 0 : preferences.contentDisplay.filter((column) => column.visible).map((column) => column.id);
      } else if (preferences === null || preferences === void 0 ? void 0 : preferences.visibleContent) {
        tableComponentContext.preferencesRef.current.visibleColumns = [...preferences.visibleContent];
      }
      return () => {
        var _a3, _b;
        (_a3 = tableComponentContext.preferencesRef.current) === null || _a3 === void 0 ? true : delete _a3.pageSize;
        (_b = tableComponentContext.preferencesRef.current) === null || _b === void 0 ? true : delete _b.visibleColumns;
      };
    }
  }, [
    tableComponentContext === null || tableComponentContext === void 0 ? void 0 : tableComponentContext.preferencesRef,
    preferences === null || preferences === void 0 ? void 0 : preferences.contentDisplay,
    preferences === null || preferences === void 0 ? void 0 : preferences.visibleContent,
    preferences === null || preferences === void 0 ? void 0 : preferences.pageSize
  ]);
  return import_react31.default.createElement(
    "div",
    { ...baseProps, className: clsx_m_default(baseProps.className, styles_css_default14.root), ref: __internalRootRef },
    import_react31.default.createElement(
      "div",
      { id: referrerId, ...getAnalyticsMetadataAttribute({ component: getComponentAnalyticsMetadata(disabled, preferences) }) },
      import_react31.default.createElement(InternalButton, { ref: triggerRef, className: clsx_m_default(styles_css_default14["trigger-button"], styles_css_default4["trigger-button"]), disabled, ariaLabel: i18n("title", title), onClick: () => {
        setTemporaryPreferences(copyPreferences(preferences || {}));
        setModalVisible(true);
      }, variant: "icon", iconName: "settings", formAction: "none", analyticsAction: "open" }),
      !disabled && modalVisible && import_react31.default.createElement(
        InternalModal,
        { className: styles_css_default14["modal-root"], visible: true, getModalRoot, removeModalRoot, header: i18n("title", title), referrerId, footer: import_react31.default.createElement(
          InternalBox,
          { float: "right" },
          import_react31.default.createElement(
            internal_default5,
            { direction: "horizontal", size: "xs" },
            import_react31.default.createElement(InternalButton, { className: styles_css_default14["cancel-button"], variant: "link", formAction: "none", onClick: onCancelListener, analyticsAction: "cancel" }, i18n("cancelLabel", cancelLabel)),
            import_react31.default.createElement(InternalButton, { className: styles_css_default14["confirm-button"], variant: "primary", formAction: "none", onClick: onConfirmListener, analyticsAction: "confirm" }, i18n("confirmLabel", confirmLabel))
          )
        ), closeAriaLabel: closeAriaLabel || cancelLabel, size: hasContentOnTheLeft && hasContentOnTheRight ? "large" : "medium", onDismiss: onCancelListener },
        import_react31.default.createElement("div", { className: styles_css_default14["content-before"] }, contentBefore),
        import_react31.default.createElement(ModalContentLayout, { left: hasContentOnTheLeft && import_react31.default.createElement(
          internal_default5,
          { size: "l" },
          pageSizePreference && import_react31.default.createElement(PageSizePreference, { value: temporaryPreferences.pageSize, ...pageSizePreference, onChange: (pageSize) => onChange({ pageSize }) }),
          wrapLinesPreference && import_react31.default.createElement(WrapLinesPreference, { value: temporaryPreferences.wrapLines, ...wrapLinesPreference, onChange: (wrapLines) => onChange({ wrapLines }) }),
          stripedRowsPreference && import_react31.default.createElement(StripedRowsPreference, { value: temporaryPreferences.stripedRows, ...stripedRowsPreference, onChange: (stripedRows) => onChange({ stripedRows }) }),
          contentDensityPreference && import_react31.default.createElement(ContentDensityPreference, { value: temporaryPreferences.contentDensity, ...contentDensityPreference, onChange: (contentDensity) => onChange({ contentDensity }) }),
          stickyColumnsPreference && import_react31.default.createElement(StickyColumnsPreference, { value: temporaryPreferences.stickyColumns, ...stickyColumnsPreference, onChange: (stickyColumns) => onChange({ stickyColumns }) }),
          customPreference && import_react31.default.createElement(CustomPreference, { value: temporaryPreferences.custom, customPreference, onChange: (custom) => onChange({ custom }) })
        ), right: contentDisplayPreference ? import_react31.default.createElement(ContentDisplayPreference, { ...contentDisplayPreference, value: temporaryPreferences.contentDisplay, onChange: (contentDisplay) => onChange({ contentDisplay }) }) : visibleContentPreference && import_react31.default.createElement(VisibleContentPreference, { value: temporaryPreferences.visibleContent, ...visibleContentPreference, onChange: (visibleItems) => onChange({ visibleContent: visibleItems }) }) })
      )
    )
  );
}
applyDisplayName(CollectionPreferences, componentName);
export {
  CollectionPreferences as default
};
//# sourceMappingURL=@cloudscape-design_components_collection-preferences.js.map
