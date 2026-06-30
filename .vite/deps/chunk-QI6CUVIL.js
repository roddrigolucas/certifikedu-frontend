import {
  isDevelopment
} from "./chunk-ZFEHNID6.js";
import {
  usePortalModeClasses,
  usePrevious
} from "./chunk-Y6WKMOSF.js";
import {
  TokenInlineContext,
  useTokenInlineContext
} from "./chunk-WJTR4N7X.js";
import {
  internal_default as internal_default3
} from "./chunk-XKJOMHSK.js";
import {
  InfoLinkLabelContext
} from "./chunk-ONPXF3KM.js";
import {
  checkbox_icon_default
} from "./chunk-J6UKYNCZ.js";
import {
  getBreakpointValue,
  useMobile
} from "./chunk-J5AO3UDI.js";
import {
  useDebounceCallback
} from "./chunk-5JE6SL2T.js";
import {
  StatusIndicator
} from "./chunk-UUT4C247.js";
import {
  joinStrings
} from "./chunk-ICFQLI2S.js";
import {
  FunnelMetrics,
  InternalTooltip,
  KeyCode,
  LinkDefaultVariantContext,
  TabTrap,
  Transition,
  checkSafeUrl,
  custom_css_properties_default,
  fireCancelableEvent,
  fireKeyboardEvent,
  fireNonCancelableEvent,
  getFirstFocusable,
  getLastFocusable,
  internal_default,
  internal_default2,
  isPlainLeftClick,
  nodeBelongs,
  useContainerQuery,
  useForwardFocus,
  useFunnel,
  useFunnelStep,
  useFunnelSubStep,
  useHiddenDescription,
  useInternalI18n
} from "./chunk-AF2UB4B7.js";
import {
  DATA_ATTR_FUNNEL_VALUE,
  getAnalyticsMetadataAttribute,
  getFunnelValueSelector,
  getOverflowParentDimensions,
  getOverflowParents,
  getSubStepAllSelector,
  getTextFromSelector
} from "./chunk-M6E2PW6E.js";
import {
  with_native_attributes_default
} from "./chunk-UPYVBQFI.js";
import {
  SYSTEM,
  clsx_m_default,
  getBaseProps,
  useVisualRefresh
} from "./chunk-EFQZML4R.js";
import {
  findUpUntil,
  getLogicalBoundingClientRect,
  useMergeRefs,
  useResizeObserver,
  useSingleTabStopNavigation,
  useStableCallback,
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

// node_modules/@cloudscape-design/components/internal/components/button-trigger/analytics-metadata/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/button-trigger/analytics-metadata/styles.scoped.css";
var styles_css_default = {
  "button-trigger": "awsui_button-trigger_l32fn_xo3sj_5"
};

// node_modules/@cloudscape-design/components/dropdown/internal.js
var import_react2 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/@cloudscape-design/components/dropdown/context.js
var import_react = __toESM(require_react());
var DropdownContext = import_react.default.createContext({
  position: "bottom-right"
});
function DropdownContextProvider({ children, position = "bottom-right" }) {
  return import_react.default.createElement(DropdownContext.Provider, { value: { position } }, children);
}

// node_modules/@cloudscape-design/components/dropdown/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/dropdown/styles.scoped.css";
var styles_css_default2 = {
  "dropdown-content-wrapper": "awsui_dropdown-content-wrapper_9duf6_1byh5_153",
  "awsui-motion-fade-in-dropdown": "awsui_awsui-motion-fade-in-dropdown_9duf6_1byh5_1",
  "refresh": "awsui_refresh_9duf6_1byh5_174",
  "awsui-motion-fade-in-0": "awsui_awsui-motion-fade-in-0_9duf6_1byh5_1",
  "root": "awsui_root_9duf6_1byh5_199",
  "interior": "awsui_interior_9duf6_1byh5_232",
  "dropdown": "awsui_dropdown_9duf6_1byh5_153",
  "use-portal": "awsui_use-portal_9duf6_1byh5_242",
  "is-empty": "awsui_is-empty_9duf6_1byh5_318",
  "dropdown-drop-up": "awsui_dropdown-drop-up_9duf6_1byh5_325",
  "with-limited-width": "awsui_with-limited-width_9duf6_1byh5_329",
  "dropdown-drop-left": "awsui_dropdown-drop-left_9duf6_1byh5_332",
  "dropdown-drop-right": "awsui_dropdown-drop-right_9duf6_1byh5_335",
  "occupy-entire-width": "awsui_occupy-entire-width_9duf6_1byh5_338",
  "use-flexible-width": "awsui_use-flexible-width_9duf6_1byh5_341",
  "hide-block-border": "awsui_hide-block-border_9duf6_1byh5_349",
  "open": "awsui_open_9duf6_1byh5_358",
  "nowrap": "awsui_nowrap_9duf6_1byh5_367",
  "dropdown-content": "awsui_dropdown-content_9duf6_1byh5_153",
  "stretch-trigger-height": "awsui_stretch-trigger-height_9duf6_1byh5_378"
};

// node_modules/@cloudscape-design/components/dropdown/dropdown-fit-handler.js
var AVAILABLE_SPACE_RESERVE_DEFAULT = 50;
var AVAILABLE_SPACE_RESERVE_MOBILE_VERTICAL = 19;
var AVAILABLE_SPACE_RESERVE_MOBILE_HORIZONTAL = 20;
var getClosestParentDimensions = (element) => {
  const parents = getOverflowParents(element).map((element2) => {
    const { blockSize, inlineSize, insetBlockStart, insetInlineStart } = getLogicalBoundingClientRect(element2);
    return {
      blockSize,
      inlineSize,
      insetBlockStart,
      insetInlineStart
    };
  });
  return parents.shift();
};
var getAvailableSpace = ({ trigger, overflowParents, stretchWidth = false, stretchHeight = false, isMobile }) => {
  const availableSpaceReserveVertical = stretchHeight ? 0 : isMobile ? AVAILABLE_SPACE_RESERVE_MOBILE_VERTICAL : AVAILABLE_SPACE_RESERVE_DEFAULT;
  const availableSpaceReserveHorizontal = stretchWidth ? 0 : isMobile ? AVAILABLE_SPACE_RESERVE_MOBILE_HORIZONTAL : AVAILABLE_SPACE_RESERVE_DEFAULT;
  const { insetBlockEnd: triggerBlockEnd, insetInlineStart: triggerInlineStart, insetInlineEnd: triggerInlineEnd } = getLogicalBoundingClientRect(trigger);
  return overflowParents.reduce(({ blockStart, blockEnd, inlineStart, inlineEnd }, overflowParent) => {
    const offsetTop = triggerBlockEnd - overflowParent.insetBlockStart;
    const currentBlockStart = offsetTop - trigger.offsetHeight - availableSpaceReserveVertical;
    const currentBlockEnd = overflowParent.blockSize - offsetTop - availableSpaceReserveVertical;
    const currentInlineStart = triggerInlineEnd - overflowParent.insetInlineStart - availableSpaceReserveHorizontal;
    const currentInlineEnd = overflowParent.insetInlineStart + overflowParent.inlineSize - triggerInlineStart - availableSpaceReserveHorizontal;
    return {
      blockStart: Math.min(blockStart, currentBlockStart),
      blockEnd: Math.min(blockEnd, currentBlockEnd),
      inlineStart: Math.min(inlineStart, currentInlineStart),
      inlineEnd: Math.min(inlineEnd, currentInlineEnd)
    };
  }, {
    blockStart: Number.MAX_VALUE,
    blockEnd: Number.MAX_VALUE,
    inlineStart: Number.MAX_VALUE,
    inlineEnd: Number.MAX_VALUE
  });
};
var getInteriorAvailableSpace = ({ trigger, overflowParents, isMobile }) => {
  const AVAILABLE_SPACE_RESERVE_VERTICAL = isMobile ? AVAILABLE_SPACE_RESERVE_MOBILE_VERTICAL : AVAILABLE_SPACE_RESERVE_DEFAULT;
  const AVAILABLE_SPACE_RESERVE_HORIZONTAL = isMobile ? AVAILABLE_SPACE_RESERVE_MOBILE_HORIZONTAL : AVAILABLE_SPACE_RESERVE_DEFAULT;
  const { insetBlockEnd: triggerBlockEnd, insetBlockStart: triggerBlockStart, insetInlineStart: triggerInlineStart, insetInlineEnd: triggerInlineEnd } = getLogicalBoundingClientRect(trigger);
  return overflowParents.reduce(({ blockStart, blockEnd, inlineStart, inlineEnd }, overflowParent) => {
    const currentBlockStart = triggerBlockEnd - overflowParent.insetBlockStart - AVAILABLE_SPACE_RESERVE_VERTICAL;
    const currentBlockEnd = overflowParent.blockSize - triggerBlockStart + overflowParent.insetBlockStart - AVAILABLE_SPACE_RESERVE_VERTICAL;
    const currentInlineStart = triggerInlineStart - overflowParent.insetInlineStart - AVAILABLE_SPACE_RESERVE_HORIZONTAL;
    const currentInlineEnd = overflowParent.insetInlineStart + overflowParent.inlineSize - triggerInlineEnd - AVAILABLE_SPACE_RESERVE_HORIZONTAL;
    return {
      blockStart: Math.min(blockStart, currentBlockStart),
      blockEnd: Math.min(blockEnd, currentBlockEnd),
      inlineStart: Math.min(inlineStart, currentInlineStart),
      inlineEnd: Math.min(inlineEnd, currentInlineEnd)
    };
  }, {
    blockStart: Number.MAX_VALUE,
    blockEnd: Number.MAX_VALUE,
    inlineStart: Number.MAX_VALUE,
    inlineEnd: Number.MAX_VALUE
  });
};
var resolveWidthConstraint = (constraint, triggerWidth, fallback) => {
  if (constraint === "trigger") {
    return triggerWidth;
  }
  if (typeof constraint === "number") {
    return constraint;
  }
  return fallback;
};
var getWidths = ({ triggerElement, dropdownElement, minWidthConstraint, maxWidthConstraint }) => {
  const { inlineSize: triggerInlineSize } = getLogicalBoundingClientRect(triggerElement);
  const { inlineSize: requiredWidth } = getLogicalBoundingClientRect(dropdownElement);
  const minWidth = resolveWidthConstraint(minWidthConstraint, triggerInlineSize, 0);
  const maxWidth = resolveWidthConstraint(maxWidthConstraint, triggerInlineSize, Number.MAX_VALUE);
  const idealWidth = Math.min(Math.max(requiredWidth, minWidth), maxWidth);
  return { idealWidth, minWidth, triggerInlineSize };
};
var hasEnoughSpaceForFlexibleWidth = ({ triggerElement, dropdownElement, minWidthConstraint, maxWidthConstraint, expandToViewport, stretchHeight, isMobile }) => {
  const overflowParents = getOverflowParentDimensions({
    element: dropdownElement,
    excludeClosestParent: false,
    expandToViewport,
    canExpandOutsideViewport: stretchHeight
  });
  const { idealWidth } = getWidths({
    triggerElement,
    dropdownElement,
    minWidthConstraint,
    maxWidthConstraint
  });
  const availableSpace = getAvailableSpace({
    trigger: triggerElement,
    overflowParents,
    stretchHeight,
    isMobile
  });
  return idealWidth <= availableSpace.inlineStart || idealWidth <= availableSpace.inlineEnd;
};
var getDropdownPosition = ({ triggerElement, dropdownElement, overflowParents, minWidth: minWidthConstraint, maxWidth: maxWidthConstraint, preferCenter = false, matchTriggerWidth = false, stretchHeight = false, isMobile = false, maxHeight }) => {
  const availableSpace = getAvailableSpace({
    trigger: triggerElement,
    overflowParents,
    stretchWidth: matchTriggerWidth,
    stretchHeight,
    isMobile
  });
  const { idealWidth, minWidth, triggerInlineSize } = getWidths({
    triggerElement,
    dropdownElement,
    minWidthConstraint,
    maxWidthConstraint
  });
  let dropInlineStart;
  let insetInlineStart = null;
  let inlineSize = idealWidth;
  if (idealWidth <= availableSpace.inlineEnd) {
    dropInlineStart = false;
  } else if (idealWidth <= availableSpace.inlineStart) {
    dropInlineStart = true;
  } else {
    dropInlineStart = availableSpace.inlineStart > availableSpace.inlineEnd;
    inlineSize = Math.max(availableSpace.inlineStart, availableSpace.inlineEnd, minWidth);
  }
  if (preferCenter) {
    const spillOver = (idealWidth - triggerInlineSize) / 2;
    const availableOutsideLeft = availableSpace.inlineStart - triggerInlineSize;
    const availableOutsideRight = availableSpace.inlineEnd - triggerInlineSize;
    const fitsInCenter = availableOutsideLeft >= spillOver && availableOutsideRight >= spillOver;
    if (fitsInCenter) {
      insetInlineStart = -spillOver;
    }
  }
  const dropBlockStart = availableSpace.blockEnd < dropdownElement.offsetHeight && availableSpace.blockStart > availableSpace.blockEnd;
  const availableHeight = dropBlockStart ? availableSpace.blockStart : availableSpace.blockEnd;
  const croppedHeight = Math.max(stretchHeight ? availableHeight : Math.floor(availableHeight / 31) * 31 + 16, 15);
  const blockSize = maxHeight ? `min(${croppedHeight}px, ${maxHeight}px)` : `${croppedHeight}px`;
  return {
    dropBlockStart,
    dropInlineStart,
    insetInlineStart: insetInlineStart === null ? "auto" : `${insetInlineStart}px`,
    blockSize,
    inlineSize: `${inlineSize}px`
  };
};
var getInteriorDropdownPosition = (trigger, dropdown, overflowParents, isMobile) => {
  const availableSpace = getInteriorAvailableSpace({ trigger, overflowParents, isMobile });
  const { insetBlockEnd: triggerBlockEnd, insetBlockStart: triggerBlockStart, inlineSize: triggerInlineSize } = getLogicalBoundingClientRect(trigger);
  const { insetBlockStart: parentDropdownBlockStart, blockSize: parentDropdownHeight } = getClosestParentDimensions(trigger);
  let dropInlineStart;
  let { inlineSize } = getLogicalBoundingClientRect(dropdown);
  const insetBlockStart = triggerBlockStart - parentDropdownBlockStart;
  if (inlineSize <= availableSpace.inlineEnd) {
    dropInlineStart = false;
  } else if (inlineSize <= availableSpace.inlineStart) {
    dropInlineStart = true;
  } else {
    dropInlineStart = availableSpace.inlineStart > availableSpace.inlineEnd;
    inlineSize = Math.max(availableSpace.inlineStart, availableSpace.inlineEnd);
  }
  const insetInlineStart = dropInlineStart ? 0 - inlineSize : triggerInlineSize;
  const dropBlockStart = availableSpace.blockEnd < dropdown.offsetHeight && availableSpace.blockStart > availableSpace.blockEnd;
  const insetBlockEnd = dropBlockStart ? parentDropdownBlockStart + parentDropdownHeight - triggerBlockEnd : 0;
  const availableHeight = dropBlockStart ? availableSpace.blockStart : availableSpace.blockEnd;
  const croppedHeight = Math.floor(availableHeight / 31) * 31 + 16;
  return {
    dropBlockStart,
    dropInlineStart,
    blockSize: `${croppedHeight}px`,
    inlineSize: `${inlineSize}px`,
    insetBlockStart: `${insetBlockStart}px`,
    insetBlockEnd: `${insetBlockEnd}px`,
    insetInlineStart: `${insetInlineStart}px`
  };
};
var calculatePosition = (dropdownElement, triggerElement, verticalContainerElement, interior, expandToViewport, preferCenter, matchTriggerWidth, stretchHeight, isMobile, minWidth, maxWidth, maxHeight) => {
  verticalContainerElement.style.maxBlockSize = "";
  dropdownElement.style.inlineSize = "";
  dropdownElement.style.insetBlockStart = "";
  dropdownElement.style.insetBlockEnd = "";
  dropdownElement.style.insetInlineStart = "";
  dropdownElement.classList.remove(styles_css_default2["dropdown-drop-left"]);
  dropdownElement.classList.remove(styles_css_default2["dropdown-drop-right"]);
  dropdownElement.classList.remove(styles_css_default2["dropdown-drop-up"]);
  const overflowParents = getOverflowParentDimensions({
    element: dropdownElement,
    excludeClosestParent: interior,
    expandToViewport,
    canExpandOutsideViewport: stretchHeight
  });
  const position = interior ? getInteriorDropdownPosition(triggerElement, dropdownElement, overflowParents, isMobile) : getDropdownPosition({
    triggerElement,
    dropdownElement,
    overflowParents,
    minWidth,
    maxWidth,
    preferCenter,
    matchTriggerWidth,
    stretchHeight,
    isMobile,
    maxHeight
  });
  const triggerBox = getLogicalBoundingClientRect(triggerElement);
  return [position, triggerBox];
};

// node_modules/@cloudscape-design/components/dropdown/dropdown-position.js
function applyDropdownPositionRelativeToViewport({ position, dropdownElement, triggerRect, isMobile }) {
  const useAbsolutePositioning = isMobile;
  const verticalScrollOffset = useAbsolutePositioning ? document.documentElement.scrollTop : 0;
  const horizontalScrollOffset = useAbsolutePositioning ? document.documentElement.scrollLeft : 0;
  dropdownElement.style.position = useAbsolutePositioning ? "absolute" : "fixed";
  if (position.dropBlockStart) {
    dropdownElement.style.insetBlockEnd = `calc(100% - ${verticalScrollOffset + triggerRect.insetBlockStart}px)`;
  } else {
    dropdownElement.style.insetBlockStart = `${verticalScrollOffset + triggerRect.insetBlockEnd}px`;
  }
  if (position.dropInlineStart) {
    const actualWidth = dropdownElement.getBoundingClientRect().width;
    dropdownElement.style.insetInlineStart = `calc(${horizontalScrollOffset + triggerRect.insetInlineEnd}px - ${actualWidth}px)`;
  } else {
    dropdownElement.style.insetInlineStart = `${horizontalScrollOffset + triggerRect.insetInlineStart}px`;
  }
}

// node_modules/@cloudscape-design/components/dropdown/style.js
function getDropdownStyles(style) {
  if (SYSTEM !== "core" || !(style === null || style === void 0 ? void 0 : style.dropdown)) {
    return void 0;
  }
  return {
    background: style.dropdown.background,
    [custom_css_properties_default.dropdownContentBorderColor]: style.dropdown.borderColor,
    [custom_css_properties_default.dropdownContentBorderWidth]: style.dropdown.borderWidth,
    [custom_css_properties_default.dropdownContentBorderRadius]: style.dropdown.borderRadius
  };
}

// node_modules/@cloudscape-design/components/dropdown/test-classes/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/dropdown/test-classes/styles.scoped.css";
var styles_css_default3 = {
  "trigger": "awsui_trigger_1hezk_1wraf_5",
  "header": "awsui_header_1hezk_1wraf_9",
  "footer": "awsui_footer_1hezk_1wraf_13"
};

// node_modules/@cloudscape-design/components/dropdown/internal.js
var DropdownContainer = ({ triggerRef, children, renderWithPortal, id, referrerId, open }) => {
  var _a, _b;
  if (!renderWithPortal) {
    return import_react2.default.createElement(import_react2.default.Fragment, null, children);
  }
  if (!open) {
    return null;
  }
  const currentDocument = (_b = (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.ownerDocument) !== null && _b !== void 0 ? _b : document;
  return (0, import_react_dom.createPortal)(import_react2.default.createElement("div", { id, "data-awsui-referrer-id": referrerId }, children), currentDocument.body);
};
var TransitionContent = ({ state, transitionRef, dropdownClasses, matchTriggerWidth, hideBlockBorder, interior, isRefresh, dropdownRef, verticalContainerRef, expandToViewport, minWidth, maxWidth, header, content, footer, position, open, onMouseDown, onFocusEnter, onFocusLeave, id, ariaRole, ariaLabel, ariaLabelledby, ariaDescribedby, dropdownStyle }) => {
  const contentRef = useMergeRefs(dropdownRef, transitionRef);
  const dropdownStyles = {};
  if (minWidth) {
    dropdownStyles[custom_css_properties_default.dropdownDefaultMinWidth] = minWidth;
  }
  if (maxWidth) {
    dropdownStyles[custom_css_properties_default.dropdownDefaultMaxWidth] = maxWidth;
  }
  return import_react2.default.createElement(
    "div",
    { className: clsx_m_default(styles_css_default2.dropdown, dropdownClasses, {
      [styles_css_default2.open]: open,
      [styles_css_default2["with-limited-width"]]: !matchTriggerWidth,
      [styles_css_default2["hide-block-border"]]: hideBlockBorder,
      [styles_css_default2.interior]: interior,
      [styles_css_default2.refresh]: isRefresh,
      [styles_css_default2["use-portal"]]: expandToViewport && !interior,
      [styles_css_default2["use-flexible-width"]]: !matchTriggerWidth && !interior
    }), ref: contentRef, id, role: ariaRole, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, "aria-describedby": ariaDescribedby, "data-open": open, "data-animating": state !== "exited", "aria-hidden": !open, style: dropdownStyles, onMouseDown, onFocus: onFocusEnter, onBlur: onFocusLeave },
    import_react2.default.createElement(
      "div",
      { className: clsx_m_default(styles_css_default2["dropdown-content-wrapper"], !header && !content && styles_css_default2["is-empty"], isRefresh && styles_css_default2.refresh), style: dropdownStyle },
      import_react2.default.createElement(
        "div",
        { ref: verticalContainerRef, className: styles_css_default2["dropdown-content"] },
        import_react2.default.createElement(
          DropdownContextProvider,
          { position },
          header && import_react2.default.createElement("div", { className: styles_css_default3.header }, header),
          content,
          footer && import_react2.default.createElement("div", { className: styles_css_default3.footer }, footer)
        )
      )
    )
  );
};
var InternalDropdown = ({ content, trigger, triggerRef: externalTriggerRef, triggerId: externalTriggerId, open, onOutsideClick, onMouseDown, header, footer, dropdownId, stretchTriggerHeight = false, stretchHeight = false, minWidth, maxWidth, maxHeight, hideBlockBorder = true, expandToViewport = false, preferredAlignment = "start", interior = false, scrollable = true, loopFocus = expandToViewport, onFocus, onBlur, onFocusEnter, onFocusLeave, onEscape, contentKey, dropdownContentId, ariaRole, ariaLabel, ariaLabelledby, ariaDescribedby, style, __internalRootRef, ...restProps }) => {
  const baseProps = getBaseProps(restProps);
  const wrapperRef = (0, import_react2.useRef)(null);
  const mergedRef = useMergeRefs(wrapperRef, __internalRootRef);
  const internalTriggerRef = (0, import_react2.useRef)(null);
  const dropdownRef = (0, import_react2.useRef)(null);
  const dropdownContainerRef = (0, import_react2.useRef)(null);
  const verticalContainerRef = (0, import_react2.useRef)(null);
  const fixedPosition = (0, import_react2.useRef)(null);
  const triggerRef = externalTriggerRef || internalTriggerRef;
  const isRefresh = useVisualRefresh();
  const dropdownClasses = usePortalModeClasses(triggerRef);
  const [position, setPosition] = (0, import_react2.useState)("bottom-right");
  const isMobile = useMobile();
  const matchTriggerWidth = minWidth === "trigger" && maxWidth === "trigger";
  const preferCenter = preferredAlignment === "center";
  const setDropdownPosition = (position2, triggerBox, target, verticalContainer) => {
    verticalContainer.style.maxBlockSize = position2.blockSize;
    if (!interior && matchTriggerWidth && !expandToViewport) {
      target.classList.add(styles_css_default2["occupy-entire-width"]);
    } else {
      target.style.inlineSize = position2.inlineSize;
    }
    if (position2.dropBlockStart && !interior) {
      target.classList.add(styles_css_default2["dropdown-drop-up"]);
      if (!expandToViewport) {
        target.style.insetBlockEnd = "100%";
      }
    } else {
      target.classList.remove(styles_css_default2["dropdown-drop-up"]);
    }
    target.classList.add(position2.dropInlineStart ? styles_css_default2["dropdown-drop-left"] : styles_css_default2["dropdown-drop-right"]);
    if (position2.insetInlineStart && position2.insetInlineStart !== "auto") {
      target.style.insetInlineStart = position2.insetInlineStart;
    }
    if (expandToViewport && !interior) {
      applyDropdownPositionRelativeToViewport({
        position: position2,
        dropdownElement: target,
        triggerRect: triggerBox,
        isMobile
      });
      fixedPosition.current = position2;
      return;
    }
    if (interior && isInteriorPosition(position2)) {
      if (position2.dropBlockStart) {
        target.style.insetBlockEnd = position2.insetBlockEnd;
      } else {
        target.style.insetBlockStart = position2.insetBlockStart;
      }
      target.style.insetInlineStart = position2.insetInlineStart;
    }
    if (position2.dropBlockStart && position2.dropInlineStart) {
      setPosition("top-left");
    } else if (position2.dropBlockStart) {
      setPosition("top-right");
    } else if (position2.dropInlineStart) {
      setPosition("bottom-left");
    } else {
      setPosition("bottom-right");
    }
  };
  const isOutsideDropdown = (element) => (!wrapperRef.current || !nodeBelongs(wrapperRef.current, element)) && (!dropdownContainerRef.current || !nodeBelongs(dropdownContainerRef.current, element));
  const focusHandler = (event) => {
    if (!event.relatedTarget || isOutsideDropdown(event.relatedTarget)) {
      fireNonCancelableEvent(onFocus, event);
    }
  };
  const blurHandler = (event) => {
    if (!event.relatedTarget || isOutsideDropdown(event.relatedTarget)) {
      fireNonCancelableEvent(onBlur, event);
    }
  };
  const isOutsideDropdownContent = (element) => !dropdownRef.current || !nodeBelongs(dropdownRef.current, element);
  const focusEnterHandler = (event) => {
    if (!event.relatedTarget || isOutsideDropdownContent(event.relatedTarget)) {
      fireNonCancelableEvent(onFocusEnter, event);
    }
  };
  const focusLeaveHandler = (event) => {
    if (!event.relatedTarget || isOutsideDropdownContent(event.relatedTarget)) {
      fireNonCancelableEvent(onFocusLeave, event);
    }
  };
  const fixStretching = () => {
    const classNameToRemove = styles_css_default2["use-flexible-width"];
    if (open && dropdownRef.current && triggerRef.current && dropdownRef.current.classList.contains(classNameToRemove) && !hasEnoughSpaceForFlexibleWidth({
      triggerElement: triggerRef.current,
      dropdownElement: dropdownRef.current,
      minWidthConstraint: minWidth,
      maxWidthConstraint: maxWidth,
      expandToViewport,
      stretchHeight,
      isMobile
    })) {
      dropdownRef.current.classList.remove(classNameToRemove);
    }
  };
  useResizeObserver(() => dropdownRef.current, fixStretching);
  (0, import_react2.useLayoutEffect)(() => {
    const onDropdownOpen = () => {
      if (open && dropdownRef.current && triggerRef.current && verticalContainerRef.current) {
        if (scrollable) {
          dropdownRef.current.classList.add(styles_css_default2.nowrap);
        }
        setDropdownPosition(...calculatePosition(dropdownRef.current, triggerRef.current, verticalContainerRef.current, interior, expandToViewport, preferCenter, matchTriggerWidth, stretchHeight, isMobile, minWidth, maxWidth, maxHeight), dropdownRef.current, verticalContainerRef.current);
        if (scrollable) {
          dropdownRef.current.classList.remove(styles_css_default2.nowrap);
        }
      }
    };
    onDropdownOpen();
    if (open) {
      window.addEventListener("scroll", onDropdownOpen);
      const timeoutId = setTimeout(() => {
        window.removeEventListener("scroll", onDropdownOpen);
      }, 500);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("scroll", onDropdownOpen);
      };
    }
  }, [open, dropdownRef, triggerRef, verticalContainerRef, interior, matchTriggerWidth, isMobile, contentKey]);
  (0, import_react2.useEffect)(() => {
    if (!open) {
      return;
    }
    const clickListener = (event) => {
      const target = event.composedPath ? event.composedPath()[0] : event.target;
      const isOutsideTrigger = !nodeBelongs(triggerRef.current, target) || !externalTriggerRef && target === triggerRef.current;
      if (!nodeBelongs(dropdownRef.current, target) && isOutsideTrigger) {
        fireNonCancelableEvent(onOutsideClick);
      }
    };
    window.addEventListener("click", clickListener, true);
    return () => {
      window.removeEventListener("click", clickListener, true);
    };
  }, [open, onOutsideClick, triggerRef, externalTriggerRef]);
  (0, import_react2.useEffect)(() => {
    if (!open || !onEscape) {
      return;
    }
    const keydownListener = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        fireNonCancelableEvent(onEscape);
      }
    };
    window.addEventListener("keydown", keydownListener, true);
    return () => {
      window.removeEventListener("keydown", keydownListener, true);
    };
  }, [open, onEscape]);
  (0, import_react2.useLayoutEffect)(() => {
    if (!expandToViewport || !open) {
      return;
    }
    const updateDropdownPosition = () => {
      if (triggerRef.current && dropdownRef.current && verticalContainerRef.current && fixedPosition.current) {
        applyDropdownPositionRelativeToViewport({
          position: fixedPosition.current,
          dropdownElement: dropdownRef.current,
          triggerRect: getLogicalBoundingClientRect(triggerRef.current),
          isMobile
        });
      }
    };
    updateDropdownPosition();
    const controller = new AbortController();
    window.addEventListener("scroll", updateDropdownPosition, { capture: true, signal: controller.signal });
    window.addEventListener("resize", updateDropdownPosition, { capture: true, signal: controller.signal });
    return () => {
      controller.abort();
    };
  }, [open, expandToViewport, isMobile, triggerRef]);
  const internalReferrerId = useUniqueId();
  const referrerId = externalTriggerId !== null && externalTriggerId !== void 0 ? externalTriggerId : internalReferrerId;
  const getMinWidthCssValue = () => {
    if (minWidth === void 0) {
      return void 0;
    }
    if (typeof minWidth === "number") {
      return `${minWidth}px`;
    }
    return "100%";
  };
  const getMaxWidthCssValue = () => {
    if (maxWidth === void 0) {
      return "none";
    }
    if (typeof maxWidth === "number") {
      return `${maxWidth}px`;
    }
    return "100%";
  };
  return import_react2.default.createElement(
    "div",
    { ...baseProps, className: clsx_m_default(styles_css_default2.root, interior && styles_css_default2.interior, stretchTriggerHeight && styles_css_default2["stretch-trigger-height"], baseProps.className), ref: mergedRef, onFocus: focusHandler, onBlur: blurHandler },
    !externalTriggerRef && import_react2.default.createElement("div", { id: referrerId, className: clsx_m_default(stretchTriggerHeight && styles_css_default2["stretch-trigger-height"], styles_css_default3.trigger), ref: internalTriggerRef }, trigger),
    import_react2.default.createElement(TabTrap, { focusNextCallback: () => {
      var _a;
      return dropdownRef.current && ((_a = getFirstFocusable(dropdownRef.current)) === null || _a === void 0 ? void 0 : _a.focus());
    }, disabled: !open || !loopFocus }),
    import_react2.default.createElement(
      DropdownContainer,
      { triggerRef, renderWithPortal: expandToViewport && !interior, id: dropdownId, referrerId, open },
      import_react2.default.createElement(Transition, { in: open !== null && open !== void 0 ? open : false, exit: false }, (state, ref) => import_react2.default.createElement(
        "div",
        { ref: dropdownContainerRef },
        import_react2.default.createElement(TabTrap, { focusNextCallback: () => {
          var _a;
          return triggerRef.current && ((_a = getLastFocusable(triggerRef.current)) === null || _a === void 0 ? void 0 : _a.focus());
        }, disabled: !open || !loopFocus }),
        import_react2.default.createElement(TransitionContent, { state, transitionRef: ref, dropdownClasses, open, matchTriggerWidth, hideBlockBorder, interior, header, content, expandToViewport, minWidth: getMinWidthCssValue(), maxWidth: getMaxWidthCssValue(), footer, onMouseDown, onFocusEnter: focusEnterHandler, onFocusLeave: focusLeaveHandler, isRefresh, dropdownRef, verticalContainerRef, position, id: dropdownContentId, ariaRole, ariaLabel, ariaLabelledby, ariaDescribedby, dropdownStyle: getDropdownStyles(style) }),
        import_react2.default.createElement(TabTrap, { focusNextCallback: () => {
          var _a;
          return triggerRef.current && ((_a = getFirstFocusable(triggerRef.current)) === null || _a === void 0 ? void 0 : _a.focus());
        }, disabled: !open || !loopFocus })
      ))
    )
  );
};
var isInteriorPosition = (position) => position.insetBlockEnd !== void 0;
var internal_default4 = InternalDropdown;

// node_modules/@cloudscape-design/components/internal/components/dropdown-status/index.js
var import_react4 = __toESM(require_react());

// node_modules/@cloudscape-design/components/link/internal.js
var import_react3 = __toESM(require_react());

// node_modules/@cloudscape-design/components/link/style.js
function getLinkStyles(style) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  let properties = {};
  if ((style === null || style === void 0 ? void 0 : style.root) && SYSTEM === "core") {
    properties = {
      ...((_a = style === null || style === void 0 ? void 0 : style.root) === null || _a === void 0 ? void 0 : _a.color) && {
        [custom_css_properties_default.styleColorActive]: (_b = style.root.color) === null || _b === void 0 ? void 0 : _b.active,
        [custom_css_properties_default.styleColorDefault]: (_c = style.root.color) === null || _c === void 0 ? void 0 : _c.default,
        [custom_css_properties_default.styleColorHover]: (_d = style.root.color) === null || _d === void 0 ? void 0 : _d.hover
      },
      ...((_e = style.root) === null || _e === void 0 ? void 0 : _e.focusRing) && {
        [custom_css_properties_default.styleFocusRingBorderColor]: (_f = style.root.focusRing) === null || _f === void 0 ? void 0 : _f.borderColor,
        [custom_css_properties_default.styleFocusRingBorderRadius]: (_g = style.root.focusRing) === null || _g === void 0 ? void 0 : _g.borderRadius,
        [custom_css_properties_default.styleFocusRingBorderWidth]: (_h = style.root.focusRing) === null || _h === void 0 ? void 0 : _h.borderWidth
      }
    };
  }
  return properties;
}

// node_modules/@cloudscape-design/components/link/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/link/styles.scoped.css";
var styles_css_default4 = {
  "link": "awsui_link_4c84z_1crek_145",
  "variant-recovery": "awsui_variant-recovery_4c84z_1crek_213",
  "variant-secondary": "awsui_variant-secondary_4c84z_1crek_246",
  "variant-primary": "awsui_variant-primary_4c84z_1crek_281",
  "variant-info": "awsui_variant-info_4c84z_1crek_314",
  "variant-value-large": "awsui_variant-value-large_4c84z_1crek_349",
  "variant-top-navigation": "awsui_variant-top-navigation_4c84z_1crek_381",
  "button": "awsui_button_4c84z_1crek_416",
  "color-inverted": "awsui_color-inverted_4c84z_1crek_451",
  "font-size-body-s": "awsui_font-size-body-s_4c84z_1crek_472",
  "font-size-body-m": "awsui_font-size-body-m_4c84z_1crek_480",
  "font-size-heading-xs": "awsui_font-size-heading-xs_4c84z_1crek_487",
  "font-size-heading-s": "awsui_font-size-heading-s_4c84z_1crek_495",
  "font-size-heading-m": "awsui_font-size-heading-m_4c84z_1crek_503",
  "font-size-heading-l": "awsui_font-size-heading-l_4c84z_1crek_511",
  "font-size-heading-xl": "awsui_font-size-heading-xl_4c84z_1crek_519",
  "font-size-display-l": "awsui_font-size-display-l_4c84z_1crek_527",
  "font-size-inherit": "awsui_font-size-inherit_4c84z_1crek_535",
  "in-inline-token": "awsui_in-inline-token_4c84z_1crek_543",
  "icon-wrapper": "awsui_icon-wrapper_4c84z_1crek_547",
  "icon": "awsui_icon_4c84z_1crek_547"
};

// node_modules/@cloudscape-design/components/link/internal.js
var InternalLink = import_react3.default.forwardRef(({ variant: providedVariant, fontSize = "body-m", color = "normal", external = false, target, href, rel, ariaLabel, externalIconAriaLabel, onFollow, onClick, children, nativeAttributes, __internalRootRef, style, ...props2 }, ref) => {
  checkSafeUrl("Link", href);
  const isButton = !href;
  const { defaultVariant } = (0, import_react3.useContext)(LinkDefaultVariantContext);
  const variant = providedVariant || defaultVariant;
  const specialStyles = ["top-navigation", "link", "recovery"];
  const hasSpecialStyle = specialStyles.indexOf(variant) > -1;
  const i18n = useInternalI18n("link");
  const baseProps = getBaseProps(props2);
  const anchorTarget = target !== null && target !== void 0 ? target : external ? "_blank" : void 0;
  const anchorRel = rel !== null && rel !== void 0 ? rel : anchorTarget === "_blank" ? "noopener noreferrer" : void 0;
  const uniqueId = useUniqueId("link");
  const linkId = useUniqueId("link-self");
  const infoId = useUniqueId("link-info");
  const infoLinkLabelFromContext = (0, import_react3.useContext)(InfoLinkLabelContext);
  const { funnelIdentifier, funnelInteractionId } = useFunnel();
  const { stepIdentifier, stepNumber, stepNameSelector } = useFunnelStep();
  const { subStepIdentifier, subStepSelector, subStepNameSelector } = useFunnelSubStep();
  const fireFunnelEvent = (funnelInteractionId2) => {
    if (variant === "info") {
      const stepName = getTextFromSelector(stepNameSelector);
      const subStepName = getTextFromSelector(subStepNameSelector);
      FunnelMetrics.helpPanelInteracted({
        funnelIdentifier,
        funnelInteractionId: funnelInteractionId2,
        stepIdentifier,
        stepNumber,
        stepName,
        subStepIdentifier,
        stepNameSelector,
        subStepSelector,
        subStepName,
        subStepNameSelector,
        elementSelector: getFunnelValueSelector(uniqueId),
        subStepAllSelector: getSubStepAllSelector()
      });
    } else if (external) {
      const stepName = getTextFromSelector(stepNameSelector);
      const subStepName = getTextFromSelector(subStepNameSelector);
      FunnelMetrics.externalLinkInteracted({
        funnelIdentifier,
        funnelInteractionId: funnelInteractionId2,
        stepIdentifier,
        stepNumber,
        stepName,
        stepNameSelector,
        subStepIdentifier,
        subStepSelector,
        subStepName,
        subStepNameSelector,
        elementSelector: getFunnelValueSelector(uniqueId),
        subStepAllSelector: getSubStepAllSelector()
      });
    }
  };
  const fireFollowEvent = (event) => {
    if (funnelInteractionId) {
      fireFunnelEvent(funnelInteractionId);
    }
    fireCancelableEvent(onFollow, { href, external, target: anchorTarget }, event);
  };
  const fireClickEvent = (event) => {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    const button = "button" in event ? event.button : 0;
    fireNonCancelableEvent(onClick, { altKey, button, ctrlKey, metaKey, shiftKey });
  };
  const handleLinkClick = (event) => {
    if (isPlainLeftClick(event)) {
      fireFollowEvent(event);
    }
    fireClickEvent(event);
  };
  const handleButtonClick = (event) => {
    fireFollowEvent(event);
    fireClickEvent(event);
  };
  const handleButtonKeyDown = (event) => {
    if (event.keyCode === KeyCode.space || event.keyCode === KeyCode.enter) {
      event.preventDefault();
      fireFollowEvent(event);
      fireClickEvent(event);
    }
  };
  const linkRef = (0, import_react3.useRef)(null);
  const isVisualRefresh = useVisualRefresh();
  const { isInlineToken } = useTokenInlineContext();
  useForwardFocus(ref, linkRef);
  const applyButtonStyles = isButton && isVisualRefresh && !hasSpecialStyle;
  const sharedProps = {
    id: linkId,
    ...baseProps,
    ref: useMergeRefs(linkRef, __internalRootRef),
    className: clsx_m_default(styles_css_default4.link, baseProps.className, applyButtonStyles ? styles_css_default4.button : null, styles_css_default4[getVariantStyle(variant)], styles_css_default4[getFontSizeStyle(variant, fontSize)], styles_css_default4[getColorStyle(variant, color)], isInlineToken && styles_css_default4["in-inline-token"]),
    style: getLinkStyles(style),
    "aria-label": ariaLabel,
    "aria-labelledby": void 0,
    [DATA_ATTR_FUNNEL_VALUE]: uniqueId
  };
  if (variant === "info" && infoLinkLabelFromContext && !ariaLabel) {
    sharedProps["aria-labelledby"] = `${sharedProps.id} ${infoId} ${infoLinkLabelFromContext}`;
  }
  const renderedExternalIconAriaLabel = i18n("externalIconAriaLabel", externalIconAriaLabel);
  const content = import_react3.default.createElement(
    import_react3.default.Fragment,
    null,
    import_react3.default.createElement("span", null, children),
    external && import_react3.default.createElement(
      "span",
      { className: styles_css_default4["icon-wrapper"] },
      " ",
      import_react3.default.createElement(
        "span",
        { className: styles_css_default4.icon, "aria-label": renderedExternalIconAriaLabel, role: renderedExternalIconAriaLabel ? "img" : void 0 },
        import_react3.default.createElement(internal_default2, { name: "external", size: "inherit" })
      )
    ),
    variant === "info" && import_react3.default.createElement("span", { hidden: true, id: infoId }, ":")
  );
  const { tabIndex } = useSingleTabStopNavigation(linkRef, { tabIndex: isButton ? 0 : void 0 });
  if (isButton) {
    return import_react3.default.createElement(with_native_attributes_default, { ...sharedProps, tag: "a", componentName: "Link", nativeAttributes, role: "button", tabIndex, onKeyDown: handleButtonKeyDown, onClick: handleButtonClick }, content);
  }
  return import_react3.default.createElement(with_native_attributes_default, { ...sharedProps, tag: "a", componentName: "Link", nativeAttributes, tabIndex, target: anchorTarget, rel: anchorRel, href, onClick: handleLinkClick }, content);
});
function getVariantStyle(variant) {
  return `variant-${variant.replace(/^awsui-/, "")}`;
}
function getFontSizeStyle(variant, fontSize) {
  switch (variant) {
    case "info":
      return "font-size-body-s";
    case "awsui-value-large":
      return "font-size-display-l";
    default:
      return `font-size-${fontSize}`;
  }
}
function getColorStyle(variant, color) {
  return `color-${variant === "info" ? "normal" : color}`;
}
var internal_default5 = InternalLink;

// node_modules/@cloudscape-design/components/internal/components/dropdown-status/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/dropdown-status/styles.scoped.css";
var styles_css_default5 = {
  "root": "awsui_root_vrgzu_2pqh1_145",
  "recovery": "awsui_recovery_vrgzu_2pqh1_180"
};

// node_modules/@cloudscape-design/components/internal/components/dropdown-status/index.js
function DropdownStatus({ children }) {
  return import_react4.default.createElement("div", { className: styles_css_default5.root }, children);
}
var useDropdownStatus = ({ statusType, empty, loadingText, finishedText, filteringResultsText, errorText, recoveryText, isEmpty, isNoMatch, noMatch, onRecoveryClick, hasRecoveryCallback = false, errorIconAriaLabel }) => {
  const previousStatusType = usePrevious(statusType);
  const statusResult = { isSticky: true, content: null, hasRecoveryButton: false };
  if (statusType === "loading") {
    statusResult.content = import_react4.default.createElement(StatusIndicator, { type: "loading" }, loadingText);
  } else if (statusType === "error") {
    statusResult.hasRecoveryButton = !!recoveryText && hasRecoveryCallback;
    statusResult.content = import_react4.default.createElement(
      "span",
      null,
      import_react4.default.createElement(StatusIndicator, { type: "error", __display: "inline", __animate: previousStatusType !== "error", iconAriaLabel: errorIconAriaLabel }, errorText),
      " ",
      statusResult.hasRecoveryButton && import_react4.default.createElement(internal_default5, { onFollow: () => fireNonCancelableEvent(onRecoveryClick), variant: "recovery", className: styles_css_default5.recovery }, recoveryText)
    );
  } else if (isEmpty && empty) {
    statusResult.content = empty;
  } else if (isNoMatch && noMatch) {
    statusResult.content = noMatch;
  } else if (filteringResultsText) {
    statusResult.content = filteringResultsText;
  } else if (statusType === "finished" && finishedText) {
    statusResult.content = finishedText;
    statusResult.isSticky = false;
  }
  return statusResult;
};
var dropdown_status_default = DropdownStatus;

// node_modules/@cloudscape-design/components/internal/components/dropdown-footer/index.js
var import_react5 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/dropdown-footer/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/dropdown-footer/styles.scoped.css";
var styles_css_default6 = {
  "root": "awsui_root_1afi9_9sgdj_145",
  "hidden": "awsui_hidden_1afi9_9sgdj_176",
  "no-items": "awsui_no-items_1afi9_9sgdj_179"
};

// node_modules/@cloudscape-design/components/internal/components/dropdown-footer/index.js
var DropdownFooter = ({ content, id, hasItems = true }) => import_react5.default.createElement("div", { className: clsx_m_default(styles_css_default6.root, { [styles_css_default6.hidden]: content === null, [styles_css_default6["no-items"]]: !hasItems }) }, content && import_react5.default.createElement(
  internal_default,
  { id },
  import_react5.default.createElement(dropdown_status_default, null, content)
));
var dropdown_footer_default = DropdownFooter;

// node_modules/@cloudscape-design/components/internal/utils/get-dropdown-min-width.js
function getDropdownMinWidth({ expandToViewport, triggerWidth, dropdownWidth }) {
  if (dropdownWidth) {
    return dropdownWidth;
  }
  if (!expandToViewport) {
    return "trigger";
  }
  return triggerWidth !== null ? Math.min(triggerWidth, getBreakpointValue("xxs")) : void 0;
}

// node_modules/@cloudscape-design/components/select/parts/filter.js
var import_react6 = __toESM(require_react());

// node_modules/@cloudscape-design/components/select/parts/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/select/parts/styles.scoped.css";
var styles_css_default7 = {
  "placeholder": "awsui_placeholder_dwuol_1nllu_145",
  "item": "awsui_item_dwuol_1nllu_151",
  "checkbox": "awsui_checkbox_dwuol_1nllu_155",
  "option-group": "awsui_option-group_dwuol_1nllu_164",
  "filter": "awsui_filter_dwuol_1nllu_168",
  "trigger": "awsui_trigger_dwuol_1nllu_173",
  "layout-strut": "awsui_layout-strut_dwuol_1nllu_179",
  "list-bottom": "awsui_list-bottom_dwuol_1nllu_185",
  "selected-icon": "awsui_selected-icon_dwuol_1nllu_189",
  "show-label-tag": "awsui_show-label-tag_dwuol_1nllu_194",
  "inline-token-trigger": "awsui_inline-token-trigger_dwuol_1nllu_198",
  "inline-token-list": "awsui_inline-token-list_dwuol_1nllu_205",
  "inline-token-hidden-placeholder": "awsui_inline-token-hidden-placeholder_dwuol_1nllu_219",
  "inline-token-counter": "awsui_inline-token-counter_dwuol_1nllu_225",
  "inline-label-trigger-wrapper": "awsui_inline-label-trigger-wrapper_dwuol_1nllu_229",
  "inline-label-wrapper": "awsui_inline-label-wrapper_dwuol_1nllu_233",
  "inline-label": "awsui_inline-label_dwuol_1nllu_229",
  "inline-label-disabled": "awsui_inline-label-disabled_dwuol_1nllu_258",
  "inline-label-inline-tokens": "awsui_inline-label-inline-tokens_dwuol_1nllu_262",
  "disabled-reason-tooltip": "awsui_disabled-reason-tooltip_dwuol_1nllu_267"
};

// node_modules/@cloudscape-design/components/select/parts/filter.js
var Filter = import_react6.default.forwardRef(({ filteringType, ...filterProps }, ref) => {
  if (filteringType === "none") {
    return null;
  }
  return import_react6.default.createElement(internal_default3, { ref, type: "visualSearch", className: styles_css_default7.filter, autoComplete: false, disableBrowserAutocorrect: true, invalid: false, __noBorderRadius: true, ...filterProps, nativeInputAttributes: {
    "aria-expanded": true,
    "aria-haspopup": "listbox",
    role: "combobox",
    autoCorrect: "off",
    autoCapitalize: "off",
    ...filterProps.nativeInputAttributes
  }, __skipNativeAttributesWarnings: true });
});
var filter_default = Filter;

// node_modules/@cloudscape-design/components/select/parts/plain-list.js
var import_react16 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/options-list/index.js
var import_react7 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/options-list/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/options-list/styles.scoped.css";
var styles_css_default8 = {
  "options-list": "awsui_options-list_19gcf_eqp8j_145",
  "options-list-embedded": "awsui_options-list-embedded_19gcf_eqp8j_192",
  "decrease-block-margin": "awsui_decrease-block-margin_19gcf_eqp8j_199"
};

// node_modules/@cloudscape-design/components/internal/components/options-list/index.js
var BOTTOM_TRIGGER_OFFSET = 80;
var getItemIndex = (containerRef, event) => {
  const target = findUpUntil(event.target, (element) => element === containerRef.current || !!element.dataset.mouseTarget);
  const mouseTarget = target === null || target === void 0 ? void 0 : target.dataset.mouseTarget;
  return mouseTarget ? parseInt(mouseTarget) : -1;
};
var OptionsList = ({ open, statusType, children, nativeAttributes = {}, onKeyDown, onBlur, onFocus, onLoadMore, onMouseUp, onMouseMove, position = "relative", role = "listbox", tagOverride: Tag = "div", decreaseBlockMargin = false, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired, embedded, stickyItemBlockSize, isMultiSelect, ...restProps }, ref) => {
  const baseProps = getBaseProps(restProps);
  const menuRef = (0, import_react7.useRef)(null);
  const handleScroll = useStableCallback(() => {
    const scrollContainer = menuRef === null || menuRef === void 0 ? void 0 : menuRef.current;
    if (scrollContainer) {
      const bottomEdgePosition = scrollContainer.scrollTop + scrollContainer.clientHeight;
      const remainingScrollHeight = scrollContainer.scrollHeight - bottomEdgePosition;
      if (remainingScrollHeight < BOTTOM_TRIGGER_OFFSET) {
        fireNonCancelableEvent(onLoadMore);
      }
    }
  });
  (0, import_react7.useEffect)(() => {
    if (open && statusType === "pending") {
      handleScroll();
    }
  }, [open, statusType, handleScroll]);
  const className = clsx_m_default(styles_css_default8["options-list"], {
    [styles_css_default8["decrease-block-margin"]]: decreaseBlockMargin,
    [styles_css_default8["options-list-embedded"]]: embedded
  });
  const mergedRef = useMergeRefs(ref, menuRef);
  return import_react7.default.createElement(Tag, { ...baseProps, ...nativeAttributes, className, ref: mergedRef, style: { position, scrollPaddingBlockStart: stickyItemBlockSize !== null && stickyItemBlockSize !== void 0 ? stickyItemBlockSize : void 0 }, role, onScroll: handleScroll, onKeyDown: (event) => fireKeyboardEvent(onKeyDown, event), onMouseMove: (event) => onMouseMove === null || onMouseMove === void 0 ? void 0 : onMouseMove(getItemIndex(menuRef, event)), onMouseUp: (event) => onMouseUp === null || onMouseUp === void 0 ? void 0 : onMouseUp(getItemIndex(menuRef, event)), onBlur: (event) => fireNonCancelableEvent(onBlur, { relatedTarget: event.relatedTarget }), onFocus: () => fireNonCancelableEvent(onFocus), tabIndex: embedded ? 0 : -1, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, "aria-describedby": ariaDescribedby, "aria-multiselectable": role === "listbox" && isMultiSelect ? true : void 0, "aria-required": ariaRequired }, open && children);
};
var options_list_default = import_react7.default.forwardRef(OptionsList);

// node_modules/@cloudscape-design/components/select/utils/render-options.js
var import_react15 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/option/utils/unflatten-options.js
function unflattenOptions(options) {
  const nestedOptions = [];
  let currentParent;
  options.forEach((option, index) => {
    var _a;
    if (option.type === "parent") {
      const wrapped = { type: "parent", option, index, children: [] };
      currentParent = wrapped;
      nestedOptions.push(wrapped);
    } else if (option.type === "child") {
      ((_a = currentParent === null || currentParent === void 0 ? void 0 : currentParent.children) !== null && _a !== void 0 ? _a : nestedOptions).push({ type: "child", option, index });
    } else {
      currentParent = void 0;
      nestedOptions.push({ type: "child", option, index });
    }
  });
  return nestedOptions;
}

// node_modules/@cloudscape-design/components/select/parts/item.js
var import_react12 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/option/index.js
var import_react10 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/option/option-parts.js
var import_react9 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/option/highlight-match.js
var import_react8 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/option/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/option/styles.scoped.css";
var styles_css_default9 = {
  "option": "awsui_option_1p2cx_kx9n7_153",
  "disabled": "awsui_disabled_1p2cx_kx9n7_190",
  "parent": "awsui_parent_1p2cx_kx9n7_193",
  "highlighted": "awsui_highlighted_1p2cx_kx9n7_196",
  "content": "awsui_content_1p2cx_kx9n7_200",
  "label-content": "awsui_label-content_1p2cx_kx9n7_207",
  "label": "awsui_label_1p2cx_kx9n7_207",
  "tag": "awsui_tag_1p2cx_kx9n7_214",
  "label-tag": "awsui_label-tag_1p2cx_kx9n7_215",
  "label-prefix": "awsui_label-prefix_1p2cx_kx9n7_225",
  "tags": "awsui_tags_1p2cx_kx9n7_238",
  "description": "awsui_description_1p2cx_kx9n7_239",
  "selected": "awsui_selected_1p2cx_kx9n7_250",
  "icon": "awsui_icon_1p2cx_kx9n7_264",
  "filtering-match-highlight": "awsui_filtering-match-highlight_1p2cx_kx9n7_271",
  "trigger-variant": "awsui_trigger-variant_1p2cx_kx9n7_286",
  "custom-content": "awsui_custom-content_1p2cx_kx9n7_292"
};

// node_modules/@cloudscape-design/components/internal/components/option/highlight-match.js
var splitOnFiltering = (str, highlightText) => {
  if (highlightText.length > 1e4) {
    return { noMatches: [str], matches: null };
  }
  const filteringPattern = highlightText.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
  const regexp = new RegExp(filteringPattern, "gi");
  const noMatches = str.split(regexp);
  const matches = str.match(regexp);
  return { noMatches, matches };
};
function Highlight({ str, labelRef }) {
  return import_react8.default.createElement("mark", { ref: labelRef, className: styles_css_default9["filtering-match-highlight"] }, str);
}
function HighlightMatch({ str, highlightText, labelRef }) {
  if (!str || !highlightText) {
    return import_react8.default.createElement("span", { ref: labelRef }, str);
  }
  if (str === highlightText) {
    return import_react8.default.createElement(Highlight, { labelRef, str });
  }
  const { noMatches, matches } = splitOnFiltering(str, highlightText);
  const highlighted = [];
  noMatches.forEach((noMatch, idx) => {
    highlighted.push(import_react8.default.createElement("span", { key: `noMatch-${idx}` }, noMatch));
    if (matches && idx < matches.length) {
      highlighted.push(import_react8.default.createElement(Highlight, { key: `match-${idx}`, str: matches[idx] }));
    }
  });
  return import_react8.default.createElement("span", { ref: labelRef }, highlighted);
}

// node_modules/@cloudscape-design/components/internal/components/option/analytics-metadata/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/option/analytics-metadata/styles.scoped.css";
var styles_css_default10 = {
  "label": "awsui_label_1q5vz_ocied_5"
};

// node_modules/@cloudscape-design/components/internal/components/option/option-parts.js
var Label = ({ labelContainerRef, labelRef, labelId, label, prefix, highlightText, triggerVariant }) => {
  return import_react9.default.createElement(
    "span",
    { id: labelId, ref: labelContainerRef, className: clsx_m_default(styles_css_default9.label, styles_css_default10.label, triggerVariant && styles_css_default9["trigger-variant"]) },
    prefix && import_react9.default.createElement(
      "span",
      { className: clsx_m_default(styles_css_default9["label-prefix"], triggerVariant && styles_css_default9["trigger-variant"]) },
      prefix,
      " "
    ),
    import_react9.default.createElement(HighlightMatch, { labelRef, str: label, highlightText })
  );
};
var LabelTag = ({ labelTag, highlightText, triggerVariant }) => labelTag ? import_react9.default.createElement(
  "span",
  { className: clsx_m_default(styles_css_default9["label-tag"], triggerVariant && styles_css_default9["trigger-variant"]) },
  import_react9.default.createElement(HighlightMatch, { str: labelTag, highlightText })
) : null;
var Description = ({ description, highlightedOption, highlightText, selectedOption, triggerVariant }) => description ? import_react9.default.createElement(
  "span",
  { className: clsx_m_default(styles_css_default9.description, {
    [styles_css_default9["trigger-variant"]]: triggerVariant,
    [styles_css_default9.highlighted]: highlightedOption,
    [styles_css_default9.selected]: selectedOption
  }) },
  import_react9.default.createElement(HighlightMatch, { str: description, highlightText })
) : null;
var Tags = ({ tags, highlightedOption, highlightText, selectedOption, triggerVariant }) => tags ? import_react9.default.createElement("span", { className: clsx_m_default(styles_css_default9.tags, {
  [styles_css_default9.highlighted]: highlightedOption,
  [styles_css_default9.selected]: selectedOption
}) }, tags.map((tag, idx) => import_react9.default.createElement(
  "span",
  { key: idx, className: clsx_m_default(styles_css_default9.tag, triggerVariant && styles_css_default9["trigger-variant"]) },
  import_react9.default.createElement(HighlightMatch, { str: tag, highlightText })
))) : null;
var FilteringTags = ({ filteringTags, highlightedOption, highlightText, selectedOption, triggerVariant }) => {
  if (!highlightText || !filteringTags) {
    return null;
  }
  const searchElement = highlightText.toLowerCase();
  return import_react9.default.createElement("span", { className: clsx_m_default(styles_css_default9.tags, {
    [styles_css_default9.highlighted]: highlightedOption,
    [styles_css_default9.selected]: selectedOption
  }) }, filteringTags.map((filteringTag, key) => {
    const match = filteringTag.toLowerCase().indexOf(searchElement) !== -1;
    if (match) {
      return import_react9.default.createElement(
        "span",
        { className: clsx_m_default(styles_css_default9.tag, triggerVariant && styles_css_default9["trigger-variant"]), key },
        import_react9.default.createElement(HighlightMatch, { str: filteringTag, highlightText })
      );
    }
    return null;
  }));
};
var OptionIcon = (props2) => {
  if (!props2.name && !props2.url && !props2.svg) {
    return null;
  }
  return import_react9.default.createElement(
    "span",
    { className: styles_css_default9.icon },
    import_react9.default.createElement(internal_default2, { ...props2 })
  );
};

// node_modules/@cloudscape-design/components/internal/components/option/index.js
function validateStringValue(value, propertyName) {
  if (typeof value !== "undefined" && typeof value !== "string") {
    warnOnce("DropdownOption", `This component only supports string values, but "option.${propertyName}" has ${typeof value} type. The component may work incorrectly.`);
  }
}
var Option = ({ option, highlightText, triggerVariant = false, isGroupOption = false, highlightedOption = false, selectedOption = false, disableTitleTooltip = false, labelContainerRef, labelRef, labelId, customContent, ...restProps }) => {
  var _a, _b, _c, _d;
  if (!option) {
    return null;
  }
  if (customContent) {
    return import_react10.default.createElement(
      "div",
      { "data-value": option.value, className: clsx_m_default(styles_css_default9.option) },
      import_react10.default.createElement("div", { className: clsx_m_default(styles_css_default9["custom-content"]) }, customContent)
    );
  }
  const { disabled } = option;
  const baseProps = getBaseProps(restProps);
  const SpanOrDivTag = option.labelContent ? "div" : "span";
  if (isDevelopment) {
    validateStringValue(option.label, "label");
    validateStringValue(option.description, "description");
    validateStringValue(option.labelTag, "labelTag");
    (_a = option.tags) === null || _a === void 0 ? void 0 : _a.forEach((tag, index) => {
      validateStringValue(tag, `tags[${index}]`);
    });
    (_b = option.filteringTags) === null || _b === void 0 ? void 0 : _b.forEach((tag, index) => {
      validateStringValue(tag, `filteringTags[${index}]`);
    });
  }
  const className = clsx_m_default(styles_css_default9.option, disabled && styles_css_default9.disabled, isGroupOption && styles_css_default9.parent, highlightedOption && styles_css_default9.highlighted, baseProps.className);
  const icon = option.__customIcon || import_react10.default.createElement(OptionIcon, { name: option.iconName, url: option.iconUrl, svg: option.iconSvg, alt: option.iconAlt, ariaLabel: option.iconAriaLabel, size: "normal" });
  return import_react10.default.createElement(
    SpanOrDivTag,
    { ...baseProps, "data-value": option.value, className, lang: option.lang, title: !disableTitleTooltip ? (_c = option.label) !== null && _c !== void 0 ? _c : option.value : void 0 },
    icon,
    import_react10.default.createElement(
      SpanOrDivTag,
      { className: styles_css_default9.content },
      import_react10.default.createElement(
        SpanOrDivTag,
        { className: styles_css_default9["label-content"] },
        option.labelContent ? import_react10.default.createElement(SpanOrDivTag, { className: clsx_m_default(styles_css_default9.label, styles_css_default10.label) }, option.labelContent) : import_react10.default.createElement(Label, { labelContainerRef, labelRef, labelId, label: (_d = option.label) !== null && _d !== void 0 ? _d : option.value, prefix: option.__labelPrefix, highlightText, triggerVariant }),
        import_react10.default.createElement(LabelTag, { labelTag: option.labelTag, highlightText, triggerVariant })
      ),
      import_react10.default.createElement(Description, { description: option.description, highlightedOption, selectedOption, highlightText, triggerVariant }),
      import_react10.default.createElement(Tags, { tags: option.tags, highlightedOption, selectedOption, highlightText, triggerVariant }),
      import_react10.default.createElement(FilteringTags, { filteringTags: option.filteringTags, highlightedOption, selectedOption, highlightText, triggerVariant })
    )
  );
};
var option_default = Option;

// node_modules/@cloudscape-design/components/internal/components/selectable-item/index.js
var import_react11 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/selectable-item/analytics-metadata/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/selectable-item/analytics-metadata/styles.scoped.css";
var styles_css_default11 = {
  "parent": "awsui_parent_2dmmi_qu62t_5",
  "option-content": "awsui_option-content_2dmmi_qu62t_6"
};

// node_modules/@cloudscape-design/components/internal/components/selectable-item/analytics-metadata/utils.js
var getAnalyticsSelectActionMetadata = ({ isChild, value, ...restProps }) => {
  const dataAttributes = restProps;
  const analyticsMetadata = {
    action: "select",
    detail: {
      label: {
        selector: [`.${styles_css_default10.label}`, `.${styles_css_default11["option-content"]}`]
      }
    }
  };
  let position = void 0;
  if (isChild && dataAttributes["data-group-index"] && dataAttributes["data-in-group-index"] || dataAttributes["data-child-index"]) {
    position = `${dataAttributes["data-group-index"]},${dataAttributes["data-in-group-index"] || dataAttributes["data-child-index"]}`;
  } else if (dataAttributes["data-test-index"]) {
    position = `${dataAttributes["data-test-index"]}`;
  }
  if (position) {
    analyticsMetadata.detail.position = position;
  }
  if (value) {
    analyticsMetadata.detail.value = value;
  }
  if (isChild) {
    analyticsMetadata.detail.groupLabel = {
      root: "body",
      selector: `.${styles_css_default11.parent}[data-group-index="${dataAttributes["data-group-index"]}"] .${styles_css_default11["option-content"]}`
    };
  }
  return analyticsMetadata;
};

// node_modules/@cloudscape-design/components/internal/components/selectable-item/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/selectable-item/styles.scoped.css";
var styles_css_default12 = {
  "selectable-item": "awsui_selectable-item_15o6u_k2c9q_145",
  "parent": "awsui_parent_15o6u_k2c9q_164",
  "interactiveGroups": "awsui_interactiveGroups_15o6u_k2c9q_164",
  "highlighted": "awsui_highlighted_15o6u_k2c9q_164",
  "selected": "awsui_selected_15o6u_k2c9q_164",
  "selectable-item-content": "awsui_selectable-item-content_15o6u_k2c9q_167",
  "pad-bottom": "awsui_pad-bottom_15o6u_k2c9q_171",
  "virtual": "awsui_virtual_15o6u_k2c9q_178",
  "has-background": "awsui_has-background_15o6u_k2c9q_181",
  "child": "awsui_child_15o6u_k2c9q_184",
  "disabled": "awsui_disabled_15o6u_k2c9q_190",
  "is-keyboard": "awsui_is-keyboard_15o6u_k2c9q_205",
  "visual-refresh": "awsui_visual-refresh_15o6u_k2c9q_215",
  "next-item-selected": "awsui_next-item-selected_15o6u_k2c9q_229",
  "previous-item-selected": "awsui_previous-item-selected_15o6u_k2c9q_239",
  "sticky": "awsui_sticky_15o6u_k2c9q_271",
  "with-scrollbar": "awsui_with-scrollbar_15o6u_k2c9q_290",
  "after-header": "awsui_after-header_15o6u_k2c9q_293",
  "measure-strut": "awsui_measure-strut_15o6u_k2c9q_322",
  "screenreader-content": "awsui_screenreader-content_15o6u_k2c9q_334",
  "option-content": "awsui_option-content_15o6u_k2c9q_340",
  "select-all": "awsui_select-all_15o6u_k2c9q_344"
};

// node_modules/@cloudscape-design/components/internal/components/selectable-item/index.js
var SelectableItem = ({ children: content, ariaSelected, ariaChecked, selected, highlighted, disabled, hasBackground, isParent, isChild, isSelectAll, virtualPosition, padBottom, disableContentStyling, isNextSelected, isPreviousSelected, useInteractiveGroups, screenReaderContent, ariaPosinset, ariaSetsize, highlightType, value, sticky, afterHeader, withScrollbar, ...restProps }, ref) => {
  const isVisualRefresh = useVisualRefresh();
  const { className, ...rest } = getBaseProps(restProps);
  const classNames = clsx_m_default(className, styles_css_default12["selectable-item"], {
    [styles_css_default12.selected]: selected,
    [styles_css_default12.highlighted]: highlighted,
    [styles_css_default12["has-background"]]: hasBackground,
    [styles_css_default12.parent]: isParent,
    [styles_css_default11.parent]: isParent,
    [styles_css_default12.child]: isChild,
    [styles_css_default12["select-all"]]: isSelectAll,
    [styles_css_default12["is-keyboard"]]: highlightType === "keyboard",
    [styles_css_default12.disabled]: disabled,
    [styles_css_default12.virtual]: virtualPosition !== void 0 && !sticky,
    [styles_css_default12["pad-bottom"]]: padBottom,
    [styles_css_default12["next-item-selected"]]: isNextSelected,
    [styles_css_default12["previous-item-selected"]]: isPreviousSelected,
    [styles_css_default12.interactiveGroups]: useInteractiveGroups,
    [styles_css_default12.sticky]: sticky,
    [styles_css_default12["after-header"]]: !!afterHeader,
    [styles_css_default12["with-scrollbar"]]: withScrollbar,
    [styles_css_default12["visual-refresh"]]: isVisualRefresh
  });
  const contentClassNames = clsx_m_default(styles_css_default12["option-content"], styles_css_default11["option-content"], {
    [styles_css_default12["selectable-item-content"]]: !disableContentStyling
  });
  const contentRef = (0, import_react11.useRef)(null);
  const screenReaderContentRef = (0, import_react11.useRef)(null);
  (0, import_react11.useLayoutEffect)(() => {
    if (highlighted && screenReaderContent) {
      if (contentRef.current) {
        contentRef.current.setAttribute("aria-hidden", "true");
      }
      if (screenReaderContentRef.current) {
        screenReaderContentRef.current.textContent = screenReaderContent;
      }
    }
  }, [highlighted, screenReaderContent, contentRef, screenReaderContentRef]);
  const style = virtualPosition !== void 0 ? {
    transform: `translateY(${virtualPosition}px)`
  } : void 0;
  const a11yProperties = {};
  if (isParent && ariaChecked === void 0) {
    a11yProperties.role = "presentation";
  } else {
    a11yProperties.role = "option";
    a11yProperties["aria-disabled"] = disabled;
    if (ariaSelected !== void 0) {
      a11yProperties["aria-selected"] = ariaSelected;
    }
    if (ariaChecked !== void 0) {
      a11yProperties["aria-checked"] = ariaChecked;
    }
    if (ariaPosinset && ariaSetsize) {
      a11yProperties["aria-posinset"] = ariaPosinset;
      a11yProperties["aria-setsize"] = ariaSetsize;
    }
    if (restProps.ariaDescribedby) {
      a11yProperties["aria-describedby"] = restProps.ariaDescribedby;
    }
  }
  return import_react11.default.createElement(
    "div",
    { className: classNames, style, ...a11yProperties, ...rest, ...isParent || disabled ? {} : getAnalyticsMetadataAttribute(getAnalyticsSelectActionMetadata({ isChild, value, ...restProps })) },
    import_react11.default.createElement("div", { className: contentClassNames, ref: contentRef }, content),
    import_react11.default.createElement("div", { className: styles_css_default12["measure-strut"], ref }),
    import_react11.default.createElement("div", { className: styles_css_default12["screenreader-content"], ref: screenReaderContentRef })
  );
};
var selectable_item_default = import_react11.default.forwardRef(SelectableItem);

// node_modules/@cloudscape-design/components/select/parts/item.js
var toSelectOptionGroupItem = (props2) => {
  var _a;
  return {
    type: "group",
    index: (_a = props2.virtualIndex) !== null && _a !== void 0 ? _a : props2.index,
    option: props2.option.option,
    disabled: props2.disabled
  };
};
var toSelectOptionItem = (props2) => {
  var _a, _b, _c, _d;
  return {
    type: "item",
    index: (_a = props2.virtualIndex) !== null && _a !== void 0 ? _a : props2.index,
    option: props2.option.option,
    selected: props2.selected,
    highlighted: props2.highlighted,
    disabled: props2.disabled,
    parent: props2.parentProps ? toSelectOptionGroupItem({
      index: (_b = props2.parentProps) === null || _b === void 0 ? void 0 : _b.index,
      virtualIndex: (_c = props2.parentProps) === null || _c === void 0 ? void 0 : _c.virtualIndex,
      option: (_d = props2.parentProps) === null || _d === void 0 ? void 0 : _d.option,
      disabled: props2.disabled
    }) : null
  };
};
var Item = ({ index, virtualIndex, option, highlighted, selected, filteringValue, hasCheckbox, virtualPosition, padBottom, isNextSelected, isPreviousSelected, screenReaderContent, ariaPosinset, ariaSetsize, highlightType, withScrollbar, sticky, renderOption, parentProps, ...restProps }, ref) => {
  const baseProps = getBaseProps(restProps);
  const isParent = option.type === "parent";
  const isChild = option.type === "child";
  const wrappedOption = option.option;
  const disabled = option.disabled || wrappedOption.disabled;
  const disabledReason = disabled && wrappedOption.disabledReason ? wrappedOption.disabledReason : "";
  const isDisabledWithReason = !!disabledReason;
  const internalRef = (0, import_react12.useRef)(null);
  const { descriptionEl, descriptionId } = useHiddenDescription(disabledReason);
  const [canShowTooltip, setCanShowTooltip] = (0, import_react12.useState)(true);
  (0, import_react12.useEffect)(() => setCanShowTooltip(true), [highlighted]);
  const getSelectItemProps = (option2) => {
    if (option2.type === "parent") {
      return toSelectOptionGroupItem({
        option: option2,
        index,
        virtualIndex,
        disabled: !!disabled
      });
    } else {
      return toSelectOptionItem({
        option: option2,
        index,
        virtualIndex,
        disabled: !!disabled,
        highlighted: !!highlighted,
        selected: !!selected,
        parentProps
      });
    }
  };
  const renderOptionWrapper = (option2) => {
    if (!renderOption) {
      return null;
    }
    return renderOption({ item: getSelectItemProps(option2), filterText: filteringValue });
  };
  const renderResult = renderOptionWrapper(option);
  return import_react12.default.createElement(
    selectable_item_default,
    { disableContentStyling: !!renderResult, ariaSelected: Boolean(selected), selected, isNextSelected, isPreviousSelected, highlighted, disabled: option.disabled, isParent, isChild, ref: useMergeRefs(ref, internalRef), virtualPosition, padBottom, screenReaderContent, ariaPosinset, ariaSetsize, highlightType, ariaDescribedby: isDisabledWithReason ? descriptionId : "", value: option.option.value, withScrollbar, sticky, ...baseProps },
    import_react12.default.createElement(
      "div",
      { className: clsx_m_default(styles_css_default7.item, !isParent && wrappedOption.labelTag && styles_css_default7["show-label-tag"]) },
      !renderResult && hasCheckbox && !isParent && import_react12.default.createElement(
        "div",
        { className: styles_css_default7.checkbox },
        import_react12.default.createElement(checkbox_icon_default, { checked: selected || false, disabled: option.disabled })
      ),
      import_react12.default.createElement(option_default, { customContent: renderResult, option: { ...wrappedOption, disabled }, highlightedOption: highlighted, selectedOption: selected, highlightText: filteringValue, isGroupOption: isParent }),
      !renderResult && !hasCheckbox && !isParent && selected && import_react12.default.createElement(
        "div",
        { className: styles_css_default7["selected-icon"] },
        import_react12.default.createElement(internal_default2, { name: "check" })
      ),
      !renderResult && isDisabledWithReason && import_react12.default.createElement(
        import_react12.default.Fragment,
        null,
        descriptionEl,
        highlighted && canShowTooltip && import_react12.default.createElement(InternalTooltip, { className: styles_css_default7["disabled-reason-tooltip"], getTrack: () => internalRef.current, content: disabledReason, position: "right", onEscape: () => setCanShowTooltip(false) })
      )
    )
  );
};
var item_default = import_react12.default.memo(import_react12.default.forwardRef(Item));

// node_modules/@cloudscape-design/components/select/parts/multiselect-item.js
var import_react13 = __toESM(require_react());
var toMultiselectOptionGroupItem = (props2) => {
  var _a, _b;
  return {
    type: "group",
    index: (_a = props2.virtualIndex) !== null && _a !== void 0 ? _a : props2.index,
    option: props2.option.option,
    indeterminate: (_b = props2.indeterminate) !== null && _b !== void 0 ? _b : false,
    selected: props2.selected,
    highlighted: props2.highlighted,
    disabled: props2.disabled
  };
};
var toMultiselectOptionItem = (props2) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
  return {
    type: "item",
    index: (_a = props2.virtualIndex) !== null && _a !== void 0 ? _a : props2.index,
    option: props2.option.option,
    selected: props2.selected,
    highlighted: props2.highlighted,
    disabled: props2.disabled,
    parent: props2.parentProps ? toMultiselectOptionGroupItem({
      index: (_b = props2.parentProps) === null || _b === void 0 ? void 0 : _b.index,
      virtualIndex: (_c = props2.parentProps) === null || _c === void 0 ? void 0 : _c.virtualIndex,
      option: (_d = props2.parentProps) === null || _d === void 0 ? void 0 : _d.option,
      disabled: props2.disabled,
      highlighted: (_f = (_e = props2.parentProps) === null || _e === void 0 ? void 0 : _e.highlighted) !== null && _f !== void 0 ? _f : false,
      indeterminate: (_h = (_g = props2.parentProps) === null || _g === void 0 ? void 0 : _g.indeterminate) !== null && _h !== void 0 ? _h : false,
      selected: (_k = (_j = props2.parentProps) === null || _j === void 0 ? void 0 : _j.selected) !== null && _k !== void 0 ? _k : false
    }) : null
  };
};
var MultiSelectItem = ({ index, virtualIndex, option, highlighted, selected, filteringValue, hasCheckbox, virtualPosition, padBottom, isNextSelected, isPreviousSelected, indeterminate, screenReaderContent, ariaPosinset, ariaSetsize, highlightType, withScrollbar, sticky, renderOption, parentProps, ...restProps }, ref) => {
  const baseProps = getBaseProps(restProps);
  const isParent = option.type === "parent";
  const isChild = option.type === "child";
  const isSelectAll = option.type === "select-all";
  const wrappedOption = option.option;
  const disabled = option.disabled || wrappedOption.disabled;
  const disabledReason = disabled && (option.disabledReason || wrappedOption.disabledReason) ? option.disabledReason || wrappedOption.disabledReason : "";
  const isDisabledWithReason = !!disabledReason;
  const internalRef = (0, import_react13.useRef)(null);
  const className = styles_css_default7.item;
  const { descriptionId, descriptionEl } = useHiddenDescription(disabledReason);
  const [canShowTooltip, setCanShowTooltip] = (0, import_react13.useState)(true);
  (0, import_react13.useEffect)(() => setCanShowTooltip(true), [highlighted]);
  const getMultiselectItemProps = (option2) => {
    if (option2.type === "parent") {
      return toMultiselectOptionGroupItem({
        option: option2,
        index,
        virtualIndex,
        disabled: !!disabled,
        highlighted: !!highlighted,
        selected: !!selected,
        indeterminate: indeterminate !== null && indeterminate !== void 0 ? indeterminate : false
      });
    } else if (option2.type === "select-all") {
      return {
        type: "select-all",
        option: option2.option,
        indeterminate: indeterminate !== null && indeterminate !== void 0 ? indeterminate : false,
        selected: !!selected,
        highlighted: !!highlighted
      };
    } else {
      return toMultiselectOptionItem({
        option: option2,
        index,
        virtualIndex,
        disabled: !!disabled,
        highlighted: !!highlighted,
        selected: !!selected,
        parentProps
      });
    }
  };
  const renderOptionWrapper = (option2) => {
    if (!renderOption) {
      return null;
    }
    return renderOption({ item: getMultiselectItemProps(option2), filterText: filteringValue });
  };
  const renderResult = renderOptionWrapper(option);
  return import_react13.default.createElement(
    selectable_item_default,
    { disableContentStyling: !!renderResult, ariaSelected: isParent && indeterminate ? void 0 : Boolean(selected), ariaChecked: isParent && indeterminate ? "mixed" : Boolean(selected), selected, isNextSelected, isPreviousSelected, highlighted, disabled, isParent, isChild, isSelectAll, highlightType, ref: useMergeRefs(ref, internalRef), virtualPosition, padBottom, useInteractiveGroups: true, screenReaderContent, ariaPosinset, ariaSetsize, ariaDescribedby: isDisabledWithReason ? descriptionId : "", value: option.option.value, afterHeader: option.afterHeader, withScrollbar, sticky, ...baseProps },
    import_react13.default.createElement(
      "div",
      { className },
      !renderResult && hasCheckbox && import_react13.default.createElement(
        "div",
        { className: styles_css_default7.checkbox },
        import_react13.default.createElement(checkbox_icon_default, { checked: selected, indeterminate: (isParent || isSelectAll) && indeterminate, disabled })
      ),
      import_react13.default.createElement(option_default, { customContent: renderResult, option: { ...wrappedOption, disabled }, highlightedOption: highlighted, selectedOption: selected, highlightText: filteringValue, isGroupOption: isParent })
    ),
    !renderResult && isDisabledWithReason && import_react13.default.createElement(
      import_react13.default.Fragment,
      null,
      descriptionEl,
      highlighted && canShowTooltip && import_react13.default.createElement(InternalTooltip, { className: styles_css_default7["disabled-reason-tooltip"], getTrack: () => internalRef.current, content: disabledReason, position: "right", onEscape: () => setCanShowTooltip(false) })
    )
  );
};
var multiselect_item_default = import_react13.default.memo(import_react13.default.forwardRef(MultiSelectItem));

// node_modules/@cloudscape-design/components/select/parts/option-group.js
var import_react14 = __toESM(require_react());
function OptionGroup({ children, virtual, ariaLabelledby, ariaDisabled }) {
  return import_react14.default.createElement("div", { role: "group", className: clsx_m_default(styles_css_default7["option-group"], virtual && styles_css_default7.virtual), "aria-labelledby": ariaLabelledby, "aria-disabled": ariaDisabled }, children);
}

// node_modules/@cloudscape-design/components/internal/components/options-list/utils/test-indexes.js
var testIndexMap = /* @__PURE__ */ new WeakMap();
var getTestOptionIndexes = (item) => testIndexMap.get(item);
var generateTestIndexes = (filteredItems, getParentGroup) => {
  let throughIndex = 1;
  let groupIndex = 0;
  let inGroupIndex = 1;
  let currentGroup = null;
  filteredItems.forEach((item) => {
    const isGroup2 = item.type === "parent";
    const group = isGroup2 ? item : getParentGroup(item);
    if (group && group !== currentGroup) {
      currentGroup = group;
      groupIndex += 1;
      inGroupIndex = 1;
    }
    if (isGroup2) {
      testIndexMap.set(item, { groupIndex });
    } else if (group && item.type === "child") {
      testIndexMap.set(item, {
        throughIndex: throughIndex++,
        groupIndex,
        inGroupIndex: inGroupIndex++
      });
    } else if (item.type === "child" || !item.type) {
      testIndexMap.set(item, { throughIndex: throughIndex++ });
    }
  });
};

// node_modules/@cloudscape-design/components/select/utils/get-item-props.js
var getItemProps = ({ option, index, getOptionProps, filteringValue, checkboxes = false }) => {
  const optionProps = getOptionProps(option, index);
  optionProps.filteringValue = filteringValue;
  const { inGroupIndex, groupIndex, throughIndex } = getTestOptionIndexes(option) || {};
  return {
    ...optionProps,
    hasCheckbox: checkboxes,
    ["data-group-index"]: groupIndex,
    ["data-child-index"]: inGroupIndex,
    ["data-test-index"]: throughIndex
  };
};

// node_modules/@cloudscape-design/components/select/utils/render-options.js
var renderOptions = ({ options, getOptionProps, filteringValue, highlightType, idPrefix, checkboxes = false, hasDropdownStatus, virtualItems, useInteractiveGroups, screenReaderContent, ariaSetsize, withScrollbar, firstOptionSticky, stickyOptionRef, renderOption }) => {
  const getNestedItemProps = ({ index, option }) => {
    const virtualItem = virtualItems && virtualItems[index];
    const globalIndex = virtualItem ? virtualItem.index : index;
    return getItemProps({
      option,
      index: globalIndex,
      getOptionProps,
      filteringValue: option.type === "select-all" ? "" : filteringValue,
      checkboxes
    });
  };
  const renderListItem = (props2, index, parentProps) => {
    const virtualItem = virtualItems && virtualItems[index];
    const globalIndex = virtualItem ? virtualItem.index : index;
    const isLastItem = index === options.length - 1;
    const padBottom = !hasDropdownStatus && isLastItem;
    const ListItem = useInteractiveGroups ? multiselect_item_default : item_default;
    const isSticky = firstOptionSticky && globalIndex === 0;
    return import_react15.default.createElement(ListItem, { index, virtualIndex: virtualItem ? virtualItem.index : void 0, key: globalIndex, ...props2, virtualPosition: virtualItem === null || virtualItem === void 0 ? void 0 : virtualItem.start, ref: isSticky && stickyOptionRef ? stickyOptionRef : virtualItem && virtualItem.measureRef, padBottom, screenReaderContent, ariaPosinset: globalIndex + 1, ariaSetsize, highlightType: highlightType.type, withScrollbar, sticky: isSticky, renderOption, parentProps });
  };
  const unflattenedOptions = unflattenOptions(options);
  return unflattenedOptions.map((nestedDropdownOption) => {
    var _a;
    const index = nestedDropdownOption.index;
    const props2 = getNestedItemProps(nestedDropdownOption);
    if (nestedDropdownOption.type === "parent") {
      const { children } = nestedDropdownOption;
      const optionId = (_a = props2.id) !== null && _a !== void 0 ? _a : `${idPrefix}-option-${index}`;
      return import_react15.default.createElement(
        OptionGroup,
        { key: `group-${index}`, virtual: (virtualItems === null || virtualItems === void 0 ? void 0 : virtualItems[index]) !== void 0, ariaLabelledby: optionId, ariaDisabled: props2["aria-disabled"] },
        renderListItem(props2, index),
        children.map((child) => {
          var _a2, _b, _c, _d, _e, _f;
          return import_react15.default.createElement(import_react15.default.Fragment, { key: child.index }, renderListItem(getNestedItemProps(child), child.index, {
            option: nestedDropdownOption.option,
            disabled: (_a2 = nestedDropdownOption.option.disabled) !== null && _a2 !== void 0 ? _a2 : false,
            index,
            virtualIndex: (_c = (_b = virtualItems === null || virtualItems === void 0 ? void 0 : virtualItems[index]) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : void 0,
            highlighted: (_d = props2.highlighted) !== null && _d !== void 0 ? _d : false,
            selected: (_e = props2.selected) !== null && _e !== void 0 ? _e : false,
            indeterminate: (_f = props2.indeterminate) !== null && _f !== void 0 ? _f : false
          }));
        })
      );
    }
    return renderListItem(props2, index);
  });
};

// node_modules/@cloudscape-design/components/select/utils/scroll-to-index.js
function scroll_to_index_default({ index, menuEl }) {
  const item = menuEl.querySelector(`[data-mouse-target="${index}"]`);
  if (item) {
    if (menuEl.clientHeight !== void 0 && menuEl.clientHeight > 15) {
      const menuRect = menuEl.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const offset = parseInt(menuEl.style.scrollPaddingBlockStart) || 0;
      if (itemRect.top < menuRect.top + offset || itemRect.height > menuRect.height - offset) {
        menuEl.scrollBy({ top: itemRect.top - menuRect.top - offset });
      } else if (itemRect.bottom > menuRect.bottom) {
        menuEl.scrollBy({ top: itemRect.bottom - menuRect.bottom });
      }
    }
  }
}

// node_modules/@cloudscape-design/components/select/parts/common.js
var fallbackItemHeight = 31;

// node_modules/@cloudscape-design/components/select/parts/plain-list.js
var PlainList = ({ menuProps, getOptionProps, filteredOptions, filteringValue, highlightType, checkboxes, hasDropdownStatus, listBottom, useInteractiveGroups, screenReaderContent, firstOptionSticky, isMultiSelect, renderOption }, ref) => {
  const idPrefix = useUniqueId("select-list-");
  const stickyOptionRef = (0, import_react16.useRef)(null);
  const [stickyOptionBlockSize, setStickyOptionBlockSize] = (0, import_react16.useState)(firstOptionSticky ? fallbackItemHeight : 0);
  const [width, menuMeasureRef] = useContainerQuery((rect) => {
    if (stickyOptionRef.current) {
      setStickyOptionBlockSize(stickyOptionRef.current.clientHeight);
    }
    return { inner: rect.contentBoxWidth, outer: rect.borderBoxWidth };
  });
  const menuRef = menuProps.ref;
  const mergedRef = useMergeRefs(menuMeasureRef, menuRef);
  (0, import_react16.useImperativeHandle)(ref, () => (index) => {
    const isSticky = firstOptionSticky && index === 0;
    if (highlightType.moveFocus && menuRef.current && !isSticky) {
      scroll_to_index_default({ index, menuEl: menuRef.current });
    }
  }, [firstOptionSticky, highlightType.moveFocus, menuRef]);
  const withScrollbar = !!width && width.inner < width.outer;
  return import_react16.default.createElement(
    options_list_default,
    { ...menuProps, ref: mergedRef, stickyItemBlockSize: stickyOptionBlockSize, isMultiSelect },
    renderOptions({
      renderOption,
      options: filteredOptions,
      getOptionProps,
      filteringValue,
      idPrefix,
      highlightType,
      checkboxes,
      hasDropdownStatus,
      useInteractiveGroups,
      screenReaderContent,
      firstOptionSticky,
      stickyOptionRef,
      withScrollbar
    }),
    listBottom ? import_react16.default.createElement("div", { role: "option", className: styles_css_default7["list-bottom"] }, listBottom) : null
  );
};
var plain_list_default = (0, import_react16.forwardRef)(PlainList);

// node_modules/@cloudscape-design/components/select/parts/trigger.js
var import_react20 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/button-trigger/index.js
var import_react17 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/button-trigger/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/button-trigger/styles.scoped.css";
var styles_css_default13 = {
  "button-trigger": "awsui_button-trigger_18eso_ci96j_161",
  "arrow": "awsui_arrow_18eso_ci96j_161",
  "in-filtering-token-root": "awsui_in-filtering-token-root_18eso_ci96j_221",
  "in-filtering-token-nested": "awsui_in-filtering-token-nested_18eso_ci96j_221",
  "has-caret": "awsui_has-caret_18eso_ci96j_257",
  "placeholder": "awsui_placeholder_18eso_ci96j_260",
  "pressed": "awsui_pressed_18eso_ci96j_273",
  "disabled": "awsui_disabled_18eso_ci96j_276",
  "in-filtering-token": "awsui_in-filtering-token_18eso_ci96j_221",
  "readonly": "awsui_readonly_18eso_ci96j_297",
  "invalid": "awsui_invalid_18eso_ci96j_322",
  "warning": "awsui_warning_18eso_ci96j_331",
  "custom-option": "awsui_custom-option_18eso_ci96j_340",
  "inline-tokens": "awsui_inline-tokens_18eso_ci96j_345"
};

// node_modules/@cloudscape-design/components/internal/components/button-trigger/index.js
var ButtonTrigger = ({ children, pressed, hideCaret = false, disabled = false, readOnly = false, invalid = false, warning = false, inlineTokens, inFilteringToken, ariaHasPopup, ariaLabelledby, ariaDescribedby, ariaControls, onKeyDown, onKeyUp, onMouseDown, onClick, onFocus, onBlur, hasCustomContent = false, autoFocus, ...restProps }, ref) => {
  const baseProps = getBaseProps(restProps);
  let attributes = {
    ...baseProps,
    type: "button",
    className: clsx_m_default(styles_css_default13["button-trigger"], styles_css_default["button-trigger"], baseProps.className, pressed && styles_css_default13.pressed, disabled && styles_css_default13.disabled, invalid && styles_css_default13.invalid, warning && !invalid && styles_css_default13.warning, !hideCaret && styles_css_default13["has-caret"], readOnly && styles_css_default13.readonly, inFilteringToken && styles_css_default13["in-filtering-token"], inFilteringToken && styles_css_default13[`in-filtering-token-${inFilteringToken}`], inlineTokens && styles_css_default13["inline-tokens"], !!hasCustomContent && styles_css_default13["custom-option"]),
    disabled,
    "aria-expanded": pressed,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    "aria-haspopup": ariaHasPopup !== null && ariaHasPopup !== void 0 ? ariaHasPopup : "listbox",
    "aria-controls": ariaControls,
    "aria-disabled": readOnly && !disabled ? "true" : void 0,
    autoFocus
  };
  if (!readOnly) {
    attributes = {
      ...attributes,
      onKeyDown: onKeyDown && ((event) => fireKeyboardEvent(onKeyDown, event)),
      onKeyUp: onKeyUp && ((event) => fireKeyboardEvent(onKeyUp, event)),
      onMouseDown: onMouseDown && ((event) => fireCancelableEvent(onMouseDown, {}, event)),
      onClick: onClick && ((event) => fireCancelableEvent(onClick, {}, event)),
      onFocus: onFocus && ((event) => fireCancelableEvent(onFocus, {}, event)),
      onBlur: onBlur && ((event) => fireCancelableEvent(onBlur, { relatedTarget: event.relatedTarget }, event))
    };
  }
  if (invalid) {
    attributes["aria-invalid"] = invalid;
  }
  const analyticsMetadata = {
    action: !pressed ? "expand" : "collapse",
    detail: {
      label: { root: "self" }
    }
  };
  return import_react17.default.createElement(
    "button",
    { ref, ...attributes, ...disabled || readOnly ? {} : getAnalyticsMetadataAttribute(analyticsMetadata) },
    children,
    !hideCaret && import_react17.default.createElement(
      "span",
      { className: styles_css_default13.arrow },
      import_react17.default.createElement(internal_default2, { name: "caret-down-filled", variant: disabled || readOnly ? "disabled" : "normal" })
    )
  );
};
var button_trigger_default = import_react17.default.forwardRef(ButtonTrigger);

// node_modules/@cloudscape-design/components/token/internal.js
var import_react19 = __toESM(require_react());

// node_modules/@cloudscape-design/components/token/dismiss-button.js
var import_react18 = __toESM(require_react());

// node_modules/@cloudscape-design/components/token-group/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/token-group/styles.scoped.css";
var styles_css_default14 = {
  "dismiss-button": "awsui_dismiss-button_dm8gx_16m1t_145",
  "token": "awsui_token_dm8gx_16m1t_146",
  "root": "awsui_root_dm8gx_16m1t_150",
  "has-items": "awsui_has-items_dm8gx_16m1t_181",
  "no-padding": "awsui_no-padding_dm8gx_16m1t_181"
};

// node_modules/@cloudscape-design/components/token/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/token/styles.scoped.css";
var styles_css_default15 = {
  "root": "awsui_root_1i2wg_bud6h_161",
  "dismiss-button": "awsui_dismiss-button_1i2wg_bud6h_193",
  "dismiss-button-inline": "awsui_dismiss-button-inline_1i2wg_bud6h_234",
  "icon": "awsui_icon_1i2wg_bud6h_241",
  "icon-inline": "awsui_icon-inline_1i2wg_bud6h_247",
  "token-normal": "awsui_token-normal_1i2wg_bud6h_252",
  "token-inline": "awsui_token-inline_1i2wg_bud6h_259",
  "token-option-inline": "awsui_token-option-inline_1i2wg_bud6h_285",
  "token-box": "awsui_token-box_1i2wg_bud6h_289",
  "token-box-without-dismiss": "awsui_token-box-without-dismiss_1i2wg_bud6h_308",
  "token-box-inline": "awsui_token-box-inline_1i2wg_bud6h_312",
  "disable-padding": "awsui_disable-padding_1i2wg_bud6h_332",
  "token-box-readonly": "awsui_token-box-readonly_1i2wg_bud6h_339",
  "token-box-disabled": "awsui_token-box-disabled_1i2wg_bud6h_340"
};

// node_modules/@cloudscape-design/components/token/test-classes/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/token/test-classes/styles.scoped.css";
var styles_css_default16 = {
  "root": "awsui_root_1epxo_12cv0_5",
  "dismiss-button": "awsui_dismiss-button_1epxo_12cv0_6"
};

// node_modules/@cloudscape-design/components/token/dismiss-button.js
var dismiss_button_default = (0, import_react18.forwardRef)(DismissButton);
function DismissButton({ disabled, dismissLabel, onDismiss, readOnly, inline }, ref) {
  const analyticsMetadata = {
    action: "dismiss",
    detail: {
      label: { root: "self" }
    }
  };
  return import_react18.default.createElement(
    "button",
    { ref, type: "button", className: clsx_m_default(styles_css_default15["dismiss-button"], styles_css_default14["dismiss-button"], styles_css_default16["dismiss-button"], inline && styles_css_default15["dismiss-button-inline"]), "aria-disabled": disabled || readOnly ? true : void 0, onClick: () => {
      if (disabled || readOnly || !onDismiss) {
        return;
      }
      fireNonCancelableEvent(onDismiss);
    }, "aria-label": dismissLabel, ...disabled || readOnly ? {} : getAnalyticsMetadataAttribute(analyticsMetadata) },
    import_react18.default.createElement(internal_default2, { name: "close" })
  );
}

// node_modules/@cloudscape-design/components/token/styles.js
function getTokenRootStyles(style) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
  if (SYSTEM !== "core") {
    return {};
  }
  return {
    borderRadius: (_a = style === null || style === void 0 ? void 0 : style.root) === null || _a === void 0 ? void 0 : _a.borderRadius,
    borderWidth: (_b = style === null || style === void 0 ? void 0 : style.root) === null || _b === void 0 ? void 0 : _b.borderWidth,
    paddingBlock: (_c = style === null || style === void 0 ? void 0 : style.root) === null || _c === void 0 ? void 0 : _c.paddingBlock,
    paddingInline: (_d = style === null || style === void 0 ? void 0 : style.root) === null || _d === void 0 ? void 0 : _d.paddingInline,
    [custom_css_properties_default.tokenStyleBackgroundDefault]: (_f = (_e = style === null || style === void 0 ? void 0 : style.root) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.default,
    [custom_css_properties_default.tokenStyleBackgroundDisabled]: (_h = (_g = style === null || style === void 0 ? void 0 : style.root) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.disabled,
    [custom_css_properties_default.tokenStyleBackgroundReadOnly]: (_k = (_j = style === null || style === void 0 ? void 0 : style.root) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.readOnly,
    [custom_css_properties_default.tokenStyleBorderColorDefault]: (_m = (_l = style === null || style === void 0 ? void 0 : style.root) === null || _l === void 0 ? void 0 : _l.borderColor) === null || _m === void 0 ? void 0 : _m.default,
    [custom_css_properties_default.tokenStyleBorderColorDisabled]: (_p = (_o = style === null || style === void 0 ? void 0 : style.root) === null || _o === void 0 ? void 0 : _o.borderColor) === null || _p === void 0 ? void 0 : _p.disabled,
    [custom_css_properties_default.tokenStyleBorderColorReadOnly]: (_r = (_q = style === null || style === void 0 ? void 0 : style.root) === null || _q === void 0 ? void 0 : _q.borderColor) === null || _r === void 0 ? void 0 : _r.readOnly,
    [custom_css_properties_default.tokenStyleDismissColorDefault]: (_t = (_s = style === null || style === void 0 ? void 0 : style.dismissButton) === null || _s === void 0 ? void 0 : _s.color) === null || _t === void 0 ? void 0 : _t.default,
    [custom_css_properties_default.tokenStyleDismissColorDisabled]: (_v = (_u = style === null || style === void 0 ? void 0 : style.dismissButton) === null || _u === void 0 ? void 0 : _u.color) === null || _v === void 0 ? void 0 : _v.disabled,
    [custom_css_properties_default.tokenStyleDismissColorHover]: (_x = (_w = style === null || style === void 0 ? void 0 : style.dismissButton) === null || _w === void 0 ? void 0 : _w.color) === null || _x === void 0 ? void 0 : _x.hover,
    [custom_css_properties_default.tokenStyleDismissColorReadOnly]: (_z = (_y = style === null || style === void 0 ? void 0 : style.dismissButton) === null || _y === void 0 ? void 0 : _y.color) === null || _z === void 0 ? void 0 : _z.readOnly,
    ...((_0 = style === null || style === void 0 ? void 0 : style.dismissButton) === null || _0 === void 0 ? void 0 : _0.focusRing) && {
      [custom_css_properties_default.styleFocusRingBorderColor]: style.dismissButton.focusRing.borderColor,
      [custom_css_properties_default.styleFocusRingBorderRadius]: style.dismissButton.focusRing.borderRadius,
      [custom_css_properties_default.styleFocusRingBorderWidth]: style.dismissButton.focusRing.borderWidth
    }
  };
}

// node_modules/@cloudscape-design/components/token/analytics-metadata/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/token/analytics-metadata/styles.scoped.css";
var styles_css_default17 = {
  "token": "awsui_token_v05f6_c8hk2_5"
};

// node_modules/@cloudscape-design/components/token/internal.js
function InternalToken({
  // External
  label,
  ariaLabel,
  labelTag,
  description,
  variant = "normal",
  disabled,
  readOnly,
  icon,
  tags,
  dismissLabel,
  onDismiss,
  tooltipContent,
  // Internal
  role,
  disableInnerPadding,
  // Base
  __internalRootRef,
  ...restProps
}) {
  const baseProps = getBaseProps(restProps);
  const tokenRootStyleProps = getTokenRootStyles(restProps.style);
  const labelContainerRef = (0, import_react19.useRef)(null);
  const labelRef = (0, import_react19.useRef)(null);
  const [showTooltip, setShowTooltip] = (0, import_react19.useState)(false);
  const [isEllipsisActive, setIsEllipsisActive] = (0, import_react19.useState)(false);
  const isInline = variant === "inline";
  const ariaLabelledbyId = useUniqueId();
  const isLabelOverflowing = () => {
    const labelContent = labelRef.current;
    const labelContainer = labelContainerRef.current;
    if (labelContent && labelContainer) {
      return labelContent.offsetWidth > labelContainer.offsetWidth;
    }
  };
  useResizeObserver(labelContainerRef, () => {
    var _a;
    if (isInline) {
      setIsEllipsisActive((_a = isLabelOverflowing()) !== null && _a !== void 0 ? _a : false);
    }
  });
  const buildOptionDefinition = () => {
    const isLabelStringOrNumber = typeof label === "string" || typeof label === "number";
    const labelObject = isLabelStringOrNumber ? { label: String(label) } : { labelContent: label };
    if (isInline) {
      if (!isLabelStringOrNumber) {
        warnOnce("Label", `Only plain text (strings or numbers) are supported when variant="inline".`);
      }
      return {
        ...labelObject,
        disabled,
        __customIcon: icon && import_react19.default.createElement("span", { className: clsx_m_default(styles_css_default15.icon, styles_css_default15["icon-inline"]) }, icon)
      };
    } else {
      return {
        ...labelObject,
        disabled,
        labelTag,
        description,
        tags,
        __customIcon: icon && import_react19.default.createElement("span", { className: styles_css_default15.icon }, icon)
      };
    }
  };
  const SpanOrDivTag = isInline ? "span" : "div";
  return import_react19.default.createElement(
    TokenInlineContext.Provider,
    { value: { isInlineToken: isInline } },
    import_react19.default.createElement(
      SpanOrDivTag,
      { ...baseProps, ref: __internalRootRef, className: clsx_m_default(styles_css_default15.root, styles_css_default14.token, styles_css_default16.root, !isInline ? styles_css_default15["token-normal"] : styles_css_default15["token-inline"], styles_css_default17.token, baseProps.className), "aria-label": ariaLabel, "aria-labelledby": !ariaLabel ? ariaLabelledbyId : void 0, "aria-disabled": !!disabled, role: role !== null && role !== void 0 ? role : "group", onFocus: () => {
        setShowTooltip(true);
      }, onBlur: () => {
        setShowTooltip(false);
      }, onMouseEnter: () => {
        setShowTooltip(true);
      }, onMouseLeave: () => {
        setShowTooltip(false);
      }, tabIndex: !!tooltipContent && isInline && isEllipsisActive ? 0 : void 0 },
      import_react19.default.createElement(
        SpanOrDivTag,
        { className: clsx_m_default(!isInline ? styles_css_default15["token-box"] : styles_css_default15["token-box-inline"], disabled && styles_css_default15["token-box-disabled"], readOnly && styles_css_default15["token-box-readonly"], !isInline && !onDismiss && styles_css_default15["token-box-without-dismiss"], disableInnerPadding && styles_css_default15["disable-padding"]), style: tokenRootStyleProps },
        import_react19.default.createElement(option_default, { className: clsx_m_default(isInline && styles_css_default15["token-option-inline"]), triggerVariant: isInline, option: buildOptionDefinition(), disableTitleTooltip: !!tooltipContent, labelContainerRef, labelRef, labelId: ariaLabelledbyId }),
        onDismiss && import_react19.default.createElement(dismiss_button_default, { disabled, dismissLabel, onDismiss, readOnly, inline: isInline })
      ),
      !!tooltipContent && isInline && isEllipsisActive && showTooltip && import_react19.default.createElement(InternalTooltip, { "data-testid": "token-tooltip", getTrack: () => labelContainerRef.current, content: import_react19.default.createElement(
        internal_default,
        null,
        import_react19.default.createElement("span", { "data-testid": "tooltip-live-region-content" }, tooltipContent)
      ), onEscape: () => {
        setShowTooltip(false);
      } })
    )
  );
}
var internal_default6 = InternalToken;

// node_modules/@cloudscape-design/components/select/parts/trigger.js
var Trigger = import_react20.default.forwardRef(({ ariaLabelledby, ariaDescribedby, controlId, invalid, inlineLabelText, warning, triggerProps, selectedOption, selectedOptions, triggerVariant, inFilteringToken, isOpen, placeholder, disabled, readOnly, renderOption }, ref) => {
  const isVisualRefresh = useVisualRefresh();
  const generatedId = useUniqueId();
  const id = controlId !== null && controlId !== void 0 ? controlId : generatedId;
  const triggerContentId = useUniqueId("trigger-content-");
  let ariaLabelledbyIds = joinStrings(ariaLabelledby, triggerContentId);
  let triggerContent = null;
  let hasCustomContent = false;
  if (triggerVariant === "tokens") {
    if (selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.length) {
      triggerContent = import_react20.default.createElement(
        "span",
        { className: clsx_m_default(styles_css_default7["inline-token-trigger"], disabled && styles_css_default7["inline-token-trigger--disabled"], isVisualRefresh && styles_css_default7["visual-refresh"]) },
        import_react20.default.createElement("span", { className: styles_css_default7["inline-token-list"] }, selectedOptions.map(({ label }, i) => import_react20.default.createElement(internal_default6, { key: i, label, variant: "inline", disabled }))),
        import_react20.default.createElement(
          "span",
          { className: styles_css_default7["inline-token-counter"], id: triggerContentId },
          import_react20.default.createElement("span", { className: styles_css_default7["inline-token-hidden-placeholder"] }, placeholder),
          import_react20.default.createElement(
            "span",
            null,
            "(",
            selectedOptions.length,
            ")"
          )
        )
      );
      ariaLabelledbyIds = ariaLabelledby;
    } else {
      triggerContent = import_react20.default.createElement("span", { className: clsx_m_default(styles_css_default7.placeholder, styles_css_default7.trigger), id: triggerContentId }, placeholder);
    }
  } else if (!selectedOption) {
    triggerContent = import_react20.default.createElement("span", { className: clsx_m_default(styles_css_default7.placeholder, styles_css_default7.trigger), id: triggerContentId }, placeholder);
  } else if (triggerVariant === "option") {
    const triggerCustomContent = renderOption === null || renderOption === void 0 ? void 0 : renderOption({
      filterText: void 0,
      item: {
        type: "trigger",
        option: selectedOption
      }
    });
    if (triggerCustomContent) {
      hasCustomContent = true;
      triggerContent = import_react20.default.createElement(option_default, { customContent: triggerCustomContent, id: triggerContentId, option: { ...selectedOption, disabled }, triggerVariant: true });
    } else {
      triggerContent = import_react20.default.createElement(option_default, { id: triggerContentId, option: { ...selectedOption, disabled }, triggerVariant: true });
    }
  } else {
    triggerContent = import_react20.default.createElement("span", { id: triggerContentId, className: styles_css_default7.trigger }, selectedOption.label || selectedOption.value);
  }
  const mergedRef = useMergeRefs(triggerProps.ref, ref);
  const triggerButton = import_react20.default.createElement(button_trigger_default, { ...triggerProps, id, ref: mergedRef, pressed: !!isOpen, disabled, readOnly, invalid, warning: warning && !invalid, inFilteringToken, inlineTokens: triggerVariant === "tokens", hasCustomContent, ariaDescribedby, ariaLabelledby: ariaLabelledbyIds }, triggerContent);
  return import_react20.default.createElement(import_react20.default.Fragment, null, inlineLabelText ? import_react20.default.createElement(
    "div",
    { className: styles_css_default7["inline-label-wrapper"] },
    import_react20.default.createElement("label", { htmlFor: controlId, className: clsx_m_default(styles_css_default7["inline-label"], disabled && styles_css_default7["inline-label-disabled"], triggerVariant === "tokens" && styles_css_default7["inline-label-inline-tokens"]) }, inlineLabelText),
    import_react20.default.createElement("div", { className: styles_css_default7["inline-label-trigger-wrapper"] }, triggerButton)
  ) : import_react20.default.createElement(import_react20.default.Fragment, null, triggerButton));
});
var trigger_default = Trigger;

// node_modules/@cloudscape-design/components/select/parts/virtual-list.js
var import_react23 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/hooks/use-virtual/index.js
var import_react22 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/vendor/react-virtual.js
var import_react21 = __toESM(require_react());
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var props = ["bottom", "height", "left", "right", "top", "width"];
var rectChanged = function rectChanged2(a, b) {
  if (a === void 0) {
    a = {};
  }
  if (b === void 0) {
    b = {};
  }
  return props.some(function(prop) {
    return a[prop] !== b[prop];
  });
};
var observedNodes = /* @__PURE__ */ new Map();
var rafId;
var run = function run2() {
  var changedStates = [];
  observedNodes.forEach(function(state, node) {
    var newRect = node.getBoundingClientRect();
    if (rectChanged(newRect, state.rect)) {
      state.rect = newRect;
      changedStates.push(state);
    }
  });
  changedStates.forEach(function(state) {
    state.callbacks.forEach(function(cb) {
      return cb(state.rect);
    });
  });
  rafId = window.requestAnimationFrame(run2);
};
function observeRect(node, cb) {
  return {
    observe: function observe() {
      var wasEmpty = observedNodes.size === 0;
      if (observedNodes.has(node)) {
        observedNodes.get(node).callbacks.push(cb);
      } else {
        observedNodes.set(node, {
          rect: void 0,
          hasRectChanged: false,
          callbacks: [cb]
        });
      }
      if (wasEmpty)
        run();
    },
    unobserve: function unobserve() {
      var state = observedNodes.get(node);
      if (state) {
        var index = state.callbacks.indexOf(cb);
        if (index >= 0)
          state.callbacks.splice(index, 1);
        if (!state.callbacks.length)
          observedNodes["delete"](node);
        if (!observedNodes.size)
          cancelAnimationFrame(rafId);
      }
    }
  };
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react21.default.useLayoutEffect : import_react21.default.useEffect;
function useRect(nodeRef, initialRect) {
  if (initialRect === void 0) {
    initialRect = {
      width: 0,
      height: 0
    };
  }
  var _React$useState = import_react21.default.useState(nodeRef.current), element = _React$useState[0], setElement = _React$useState[1];
  var _React$useReducer = import_react21.default.useReducer(rectReducer, initialRect), rect = _React$useReducer[0], dispatch = _React$useReducer[1];
  var initialRectSet = import_react21.default.useRef(false);
  useIsomorphicLayoutEffect(function() {
    if (nodeRef.current !== element) {
      setElement(nodeRef.current);
    }
  });
  useIsomorphicLayoutEffect(function() {
    if (element && !initialRectSet.current) {
      initialRectSet.current = true;
      var _rect = element.getBoundingClientRect();
      dispatch({
        rect: _rect
      });
    }
  }, [element]);
  import_react21.default.useEffect(function() {
    if (!element) {
      return;
    }
    var observer = observeRect(element, function(rect2) {
      dispatch({
        rect: rect2
      });
    });
    observer.observe();
    return function() {
      observer.unobserve();
    };
  }, [element]);
  return rect;
}
function rectReducer(state, action) {
  var rect = action.rect;
  if (state.height !== rect.height || state.width !== rect.width) {
    return rect;
  }
  return state;
}
var defaultEstimateSize = function defaultEstimateSize2() {
  return 50;
};
var defaultKeyExtractor = function defaultKeyExtractor2(index) {
  return index;
};
var defaultMeasureSize = function defaultMeasureSize2(el, horizontal) {
  var key = horizontal ? "offsetWidth" : "offsetHeight";
  return el[key];
};
var defaultRangeExtractor = function defaultRangeExtractor2(range) {
  var start = Math.max(range.start - range.overscan, 0);
  var end = Math.min(range.end + range.overscan, range.size - 1);
  var arr = [];
  for (var i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};
function useVirtual(_ref) {
  var _measurements;
  var _ref$size = _ref.size, size = _ref$size === void 0 ? 0 : _ref$size, _ref$estimateSize = _ref.estimateSize, estimateSize = _ref$estimateSize === void 0 ? defaultEstimateSize : _ref$estimateSize, _ref$overscan = _ref.overscan, overscan = _ref$overscan === void 0 ? 1 : _ref$overscan, _ref$paddingStart = _ref.paddingStart, paddingStart = _ref$paddingStart === void 0 ? 0 : _ref$paddingStart, _ref$paddingEnd = _ref.paddingEnd, paddingEnd = _ref$paddingEnd === void 0 ? 0 : _ref$paddingEnd, parentRef = _ref.parentRef, horizontal = _ref.horizontal, scrollToFn = _ref.scrollToFn, useObserver = _ref.useObserver, initialRect = _ref.initialRect, onScrollElement = _ref.onScrollElement, scrollOffsetFn = _ref.scrollOffsetFn, _ref$keyExtractor = _ref.keyExtractor, keyExtractor = _ref$keyExtractor === void 0 ? defaultKeyExtractor : _ref$keyExtractor, _ref$measureSize = _ref.measureSize, measureSize = _ref$measureSize === void 0 ? defaultMeasureSize : _ref$measureSize, _ref$rangeExtractor = _ref.rangeExtractor, rangeExtractor = _ref$rangeExtractor === void 0 ? defaultRangeExtractor : _ref$rangeExtractor;
  var sizeKey = horizontal ? "width" : "height";
  var scrollKey = horizontal ? "scrollLeft" : "scrollTop";
  var latestRef = import_react21.default.useRef({
    scrollOffset: 0,
    measurements: []
  });
  var _React$useState = import_react21.default.useState(0), scrollOffset = _React$useState[0], setScrollOffset = _React$useState[1];
  latestRef.current.scrollOffset = scrollOffset;
  var useMeasureParent = useObserver || useRect;
  var _useMeasureParent = useMeasureParent(parentRef, initialRect), outerSize = _useMeasureParent[sizeKey];
  latestRef.current.outerSize = outerSize;
  var defaultScrollToFn = import_react21.default.useCallback(function(offset) {
    if (parentRef.current) {
      parentRef.current[scrollKey] = offset;
    }
  }, [parentRef, scrollKey]);
  var resolvedScrollToFn = scrollToFn || defaultScrollToFn;
  scrollToFn = import_react21.default.useCallback(function(offset) {
    resolvedScrollToFn(offset, defaultScrollToFn);
  }, [defaultScrollToFn, resolvedScrollToFn]);
  var _React$useState2 = import_react21.default.useState({}), measuredCache = _React$useState2[0], setMeasuredCache = _React$useState2[1];
  var measure = import_react21.default.useCallback(function() {
    return setMeasuredCache({});
  }, []);
  var pendingMeasuredCacheIndexesRef = import_react21.default.useRef([]);
  var measurements = import_react21.default.useMemo(function() {
    var min = pendingMeasuredCacheIndexesRef.current.length > 0 ? Math.min.apply(Math, pendingMeasuredCacheIndexesRef.current) : 0;
    pendingMeasuredCacheIndexesRef.current = [];
    var measurements2 = latestRef.current.measurements.slice(0, min);
    for (var i = min; i < size; i++) {
      var key = keyExtractor(i);
      var measuredSize = measuredCache[key];
      var _start = measurements2[i - 1] ? measurements2[i - 1].end : paddingStart;
      var _size = typeof measuredSize === "number" ? measuredSize : estimateSize(i);
      var _end = _start + _size;
      measurements2[i] = {
        index: i,
        start: _start,
        size: _size,
        end: _end,
        key
      };
    }
    return measurements2;
  }, [estimateSize, measuredCache, paddingStart, size, keyExtractor]);
  var totalSize = (((_measurements = measurements[size - 1]) == null ? void 0 : _measurements.end) || paddingStart) + paddingEnd;
  latestRef.current.measurements = measurements;
  latestRef.current.totalSize = totalSize;
  var element = onScrollElement ? onScrollElement.current : parentRef.current;
  var scrollOffsetFnRef = import_react21.default.useRef(scrollOffsetFn);
  scrollOffsetFnRef.current = scrollOffsetFn;
  useIsomorphicLayoutEffect(function() {
    if (!element) {
      setScrollOffset(0);
      return;
    }
    var onScroll = function onScroll2(event) {
      var offset = scrollOffsetFnRef.current ? scrollOffsetFnRef.current(event) : element[scrollKey];
      setScrollOffset(offset);
    };
    onScroll();
    element.addEventListener("scroll", onScroll, {
      capture: false,
      passive: true
    });
    return function() {
      element.removeEventListener("scroll", onScroll);
    };
  }, [element, scrollKey]);
  var _calculateRange = calculateRange(latestRef.current), start = _calculateRange.start, end = _calculateRange.end;
  var indexes = import_react21.default.useMemo(function() {
    return rangeExtractor({
      start,
      end,
      overscan,
      size: measurements.length
    });
  }, [start, end, overscan, measurements.length, rangeExtractor]);
  var measureSizeRef = import_react21.default.useRef(measureSize);
  measureSizeRef.current = measureSize;
  var virtualItems = import_react21.default.useMemo(function() {
    var virtualItems2 = [];
    var _loop = function _loop2(k2, len2) {
      var i = indexes[k2];
      var measurement = measurements[i];
      var item = _extends(_extends({}, measurement), {}, {
        measureRef: function measureRef(el) {
          if (el) {
            var measuredSize = measureSizeRef.current(el, horizontal);
            if (measuredSize !== item.size) {
              var _scrollOffset = latestRef.current.scrollOffset;
              if (item.start < _scrollOffset) {
                defaultScrollToFn(_scrollOffset + (measuredSize - item.size));
              }
              pendingMeasuredCacheIndexesRef.current.push(i);
              setMeasuredCache(function(old) {
                var _extends2;
                return _extends(_extends({}, old), {}, (_extends2 = {}, _extends2[item.key] = measuredSize, _extends2));
              });
            }
          }
        }
      });
      virtualItems2.push(item);
    };
    for (var k = 0, len = indexes.length; k < len; k++) {
      _loop(k);
    }
    return virtualItems2;
  }, [indexes, defaultScrollToFn, horizontal, measurements]);
  var mountedRef = import_react21.default.useRef(false);
  useIsomorphicLayoutEffect(function() {
    if (mountedRef.current) {
      setMeasuredCache({});
    }
    mountedRef.current = true;
  }, [estimateSize]);
  var scrollToOffset = import_react21.default.useCallback(function(toOffset, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp, _ref2$align = _ref2.align, align = _ref2$align === void 0 ? "start" : _ref2$align;
    var _latestRef$current = latestRef.current, scrollOffset2 = _latestRef$current.scrollOffset, outerSize2 = _latestRef$current.outerSize;
    if (align === "auto") {
      if (toOffset <= scrollOffset2) {
        align = "start";
      } else if (toOffset >= scrollOffset2 + outerSize2) {
        align = "end";
      } else {
        align = "start";
      }
    }
    if (align === "start") {
      scrollToFn(toOffset);
    } else if (align === "end") {
      scrollToFn(toOffset - outerSize2);
    } else if (align === "center") {
      scrollToFn(toOffset - outerSize2 / 2);
    }
  }, [scrollToFn]);
  var tryScrollToIndex = import_react21.default.useCallback(function(index, _temp2) {
    var _ref3 = _temp2 === void 0 ? {} : _temp2, _ref3$align = _ref3.align, align = _ref3$align === void 0 ? "auto" : _ref3$align, rest = _objectWithoutPropertiesLoose(_ref3, ["align"]);
    var _latestRef$current2 = latestRef.current, measurements2 = _latestRef$current2.measurements, scrollOffset2 = _latestRef$current2.scrollOffset, outerSize2 = _latestRef$current2.outerSize;
    var measurement = measurements2[Math.max(0, Math.min(index, size - 1))];
    if (!measurement) {
      return;
    }
    if (align === "auto") {
      if (measurement.end >= scrollOffset2 + outerSize2) {
        align = "end";
      } else if (measurement.start <= scrollOffset2) {
        align = "start";
      } else {
        return;
      }
    }
    var toOffset = align === "center" ? measurement.start + measurement.size / 2 : align === "end" ? measurement.end : measurement.start;
    scrollToOffset(toOffset, _extends({
      align
    }, rest));
  }, [scrollToOffset, size]);
  var scrollToIndex = import_react21.default.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    tryScrollToIndex.apply(void 0, args);
    requestAnimationFrame(function() {
      tryScrollToIndex.apply(void 0, args);
    });
  }, [tryScrollToIndex]);
  return {
    virtualItems,
    totalSize,
    scrollToOffset,
    scrollToIndex,
    measure
  };
}
var findNearestBinarySearch = function findNearestBinarySearch2(low, high, getCurrentValue, value) {
  while (low <= high) {
    var middle = (low + high) / 2 | 0;
    var currentValue = getCurrentValue(middle);
    if (currentValue < value) {
      low = middle + 1;
    } else if (currentValue > value) {
      high = middle - 1;
    } else {
      return middle;
    }
  }
  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};
function calculateRange(_ref4) {
  var measurements = _ref4.measurements, outerSize = _ref4.outerSize, scrollOffset = _ref4.scrollOffset;
  var size = measurements.length - 1;
  var getOffset = function getOffset2(index) {
    return measurements[index].start;
  };
  var start = findNearestBinarySearch(0, size, getOffset, scrollOffset);
  var end = start;
  while (end < size && measurements[end].end < scrollOffset + outerSize) {
    end++;
  }
  return {
    start,
    end
  };
}

// node_modules/@cloudscape-design/components/internal/hooks/use-virtual/sticky-range-extractor.js
function sticky_range_extractor_default(range) {
  const defaultRange = defaultRangeExtractor(range);
  return defaultRange[0] === 0 ? defaultRange : [0, ...defaultRange];
}

// node_modules/@cloudscape-design/components/internal/hooks/use-virtual/index.js
var MAX_ITEM_MOUNTS = 50 - 1;
function useVirtual2({ items, parentRef, estimateSize, firstItemSticky }) {
  var _a, _b;
  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize,
    overscan: 5,
    rangeExtractor: firstItemSticky ? sticky_range_extractor_default : void 0
  });
  const measuresCache = (0, import_react22.useRef)(/* @__PURE__ */ new WeakMap());
  const indicesKey = rowVirtualizer.virtualItems.map((item) => `${item.index}`).join(":");
  (0, import_react22.useEffect)(() => {
    measuresCache.current = /* @__PURE__ */ new WeakMap();
  }, [indicesKey, items, estimateSize]);
  const virtualItems = (0, import_react22.useMemo)(() => rowVirtualizer.virtualItems.map((virtualItem) => ({
    ...virtualItem,
    start: virtualItem.start,
    measureRef: (node) => {
      var _a2;
      const mountedCount = (_a2 = measuresCache.current.get(items[virtualItem.index])) !== null && _a2 !== void 0 ? _a2 : 0;
      if (mountedCount < MAX_ITEM_MOUNTS) {
        virtualItem.measureRef(node);
        measuresCache.current.set(items[virtualItem.index], mountedCount + 1);
      }
    }
  })), [items, rowVirtualizer.virtualItems]);
  const firstItemSize = (_b = (_a = virtualItems[0]) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0;
  const adjustedTotalSize = firstItemSticky ? rowVirtualizer.totalSize - firstItemSize : rowVirtualizer.totalSize;
  return {
    virtualItems,
    totalSize: adjustedTotalSize,
    scrollToIndex: rowVirtualizer.scrollToIndex
  };
}

// node_modules/@cloudscape-design/components/select/parts/virtual-list.js
var VirtualList = (props2, ref) => {
  return props2.menuProps.open ? import_react23.default.createElement(VirtualListOpen, { ...props2, ref }) : import_react23.default.createElement(VirtualListClosed, { ...props2, ref });
};
var VirtualListOpen = (0, import_react23.forwardRef)(({ menuProps, getOptionProps, filteredOptions, filteringValue, highlightType, checkboxes, hasDropdownStatus, listBottom, useInteractiveGroups, screenReaderContent, firstOptionSticky, isMultiSelect, renderOption }, ref) => {
  const [width, menuMeasureRef] = useContainerQuery((rect) => ({ inner: rect.contentBoxWidth, outer: rect.borderBoxWidth }), []);
  const menuRefObject = (0, import_react23.useRef)(null);
  const menuRef = useMergeRefs(menuMeasureRef, menuRefObject, menuProps.ref);
  const previousHighlightedIndex = (0, import_react23.useRef)();
  const { virtualItems, totalSize, scrollToIndex } = useVirtual2({
    items: filteredOptions,
    parentRef: menuRefObject,
    // estimateSize is a dependency of measurements memo. We update it to force full recalculation
    // when the height of any option could have changed:
    // 1: because the component got resized (width property got updated)
    // 2: because the option changed its content (filteringValue property controls the highlight and the visibility of hidden tags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    estimateSize: (0, import_react23.useCallback)(() => fallbackItemHeight, [width === null || width === void 0 ? void 0 : width.inner, filteringValue]),
    firstItemSticky: firstOptionSticky
  });
  (0, import_react23.useImperativeHandle)(ref, () => (index) => {
    if (highlightType.moveFocus) {
      const movingUp = previousHighlightedIndex.current !== void 0 && index < previousHighlightedIndex.current;
      if (firstOptionSticky && movingUp && index !== 0 && menuRefObject.current) {
        scroll_to_index_default({
          index,
          menuEl: menuRefObject === null || menuRefObject === void 0 ? void 0 : menuRefObject.current
        });
      } else {
        requestAnimationFrame(() => scrollToIndex(index));
      }
    }
    previousHighlightedIndex.current = index;
  }, [firstOptionSticky, highlightType.moveFocus, scrollToIndex]);
  const stickySize = firstOptionSticky ? virtualItems[0].size : 0;
  const withScrollbar = !!width && width.inner < width.outer;
  const idPrefix = useUniqueId("select-list-");
  const finalOptions = renderOptions({
    options: virtualItems.map(({ index }) => filteredOptions[index]),
    renderOption,
    getOptionProps,
    filteringValue,
    highlightType,
    idPrefix,
    checkboxes,
    hasDropdownStatus,
    virtualItems,
    useInteractiveGroups,
    screenReaderContent,
    firstOptionSticky,
    withScrollbar
  });
  return import_react23.default.createElement(
    options_list_default,
    { ...menuProps, stickyItemBlockSize: stickySize, ref: menuRef, isMultiSelect },
    finalOptions,
    import_react23.default.createElement("div", { "aria-hidden": "true", key: "total-size", className: styles_css_default7["layout-strut"], style: { height: totalSize } }),
    listBottom ? import_react23.default.createElement("div", { role: "option", className: styles_css_default7["list-bottom"] }, listBottom) : null
  );
});
var VirtualListClosed = (0, import_react23.forwardRef)(({ menuProps, listBottom, isMultiSelect }, ref) => {
  (0, import_react23.useImperativeHandle)(ref, () => () => {
  }, []);
  return import_react23.default.createElement(options_list_default, { ...menuProps, ref: menuProps.ref, isMultiSelect }, listBottom ? import_react23.default.createElement("div", { role: "option", className: styles_css_default7["list-bottom"] }, listBottom) : null);
});
var virtual_list_default = (0, import_react23.forwardRef)(VirtualList);

// node_modules/@cloudscape-design/components/internal/components/option/utils/filter-options.js
var searchableFields = ["value", "label", "description", "labelTag"];
var matchesString = (value, searchText, strictMatching) => {
  if (!value) {
    return false;
  }
  const index = value.toLowerCase().indexOf(searchText);
  return strictMatching ? index === 0 : index > -1;
};
var matchesSingleOption = (dropdownOption, text, strictMatching) => {
  const searchText = text.toLowerCase();
  const option = dropdownOption.option;
  const searchStrFields = (attr) => matchesString(option[attr], searchText, strictMatching);
  const searchTagsFields = (attr) => {
    var _a;
    return (_a = option[attr]) === null || _a === void 0 ? void 0 : _a.some((value) => matchesString(value, searchText, strictMatching));
  };
  const searchableTagFields = ["tags"];
  if (!strictMatching) {
    searchableTagFields.push("filteringTags");
  }
  return searchableFields.some(searchStrFields) || searchableTagFields.some(searchTagsFields);
};
var filterOptions = (options, searchText, strictMatching = false) => {
  if (searchText === "") {
    return options;
  }
  let currentGroup = null;
  let parentMatched = false;
  return options.reduce((acc, option) => {
    if (option.type === "parent") {
      parentMatched = false;
      currentGroup = option;
      if (matchesSingleOption(option, searchText, strictMatching)) {
        parentMatched = true;
        acc.push(currentGroup);
      }
      return acc;
    }
    if (option.type !== "child") {
      currentGroup = null;
      parentMatched = false;
    }
    if (parentMatched) {
      acc.push(option);
    } else if (matchesSingleOption(option, searchText, strictMatching)) {
      if (currentGroup) {
        acc.push(currentGroup);
        currentGroup = null;
      }
      acc.push(option);
    }
    return acc;
  }, []);
};
var isInteractive = (option) => !!option && !option.disabled && option.type !== "parent";
var isGroupInteractive = (option) => !!option && !option.disabled;
var isGroup = (option) => {
  const key = "options";
  return !!option && key in option && !!option.options;
};

// node_modules/@cloudscape-design/components/internal/components/option/utils/flatten-options.js
var flattenOptions = (options) => {
  const parentMap = /* @__PURE__ */ new Map();
  const flatOptions = options.reduce((acc, option) => {
    if (isGroup(option)) {
      const { options: options2, ...rest } = option;
      const parentDropdownOption = { type: "parent", option };
      const allOptionsDisabled = options2.every((option2) => option2.disabled);
      if (option.disabled || allOptionsDisabled) {
        parentDropdownOption.disabled = true;
      }
      acc.push(parentDropdownOption);
      options2.forEach((child) => {
        const childDropdownOption = { type: "child", option: child };
        if (rest.disabled || child.disabled) {
          childDropdownOption.disabled = true;
        }
        acc.push(childDropdownOption);
        parentMap.set(childDropdownOption, parentDropdownOption);
      });
    } else {
      const dropdownOption = { option };
      if (option.disabled) {
        dropdownOption.disabled = true;
      }
      acc.push(dropdownOption);
    }
    return acc;
  }, []);
  return {
    flatOptions,
    parentMap
  };
};

// node_modules/@cloudscape-design/components/internal/components/option/utils/prepare-options.js
function prepareOptions(options, filteringType, filteringText) {
  const { flatOptions, parentMap } = flattenOptions(options);
  const filteredOptions = filteringType !== "auto" ? flatOptions : filterOptions(flatOptions, filteringText);
  generateTestIndexes(filteredOptions, parentMap.get.bind(parentMap));
  return {
    flatOptions,
    filteredOptions,
    parentMap,
    totalCount: flatOptions.length,
    matchesCount: filteredOptions.length
  };
}

// node_modules/@cloudscape-design/components/select/utils/check-option-value-field.js
function checkOptionValueField(componentName, propertyName, propertyValue) {
  if (isDevelopment) {
    if (!propertyValue) {
      return;
    }
    const valuePropertyMissing = !propertyValue.every((element) => {
      return "options" in element || "value" in element;
    });
    if (valuePropertyMissing) {
      warnOnce(componentName, `You provided an \`${propertyName}\` prop where at least one non-group array element is missing the \`value\` field. This field is required for all options without sub-items.`);
    }
  }
}

// node_modules/@cloudscape-design/components/select/utils/use-announcement.js
var import_react24 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/option/option-announcer.js
function getMatchingFilteringTags(filteringTags, highlightText) {
  if (!highlightText || !filteringTags) {
    return [];
  }
  return filteringTags.filter((filteringTag) => matchesString(filteringTag, highlightText, false));
}
function defaultOptionDescription({ option, parentGroup, highlightText }) {
  return [
    parentGroup && parentGroup.label,
    option.__labelPrefix,
    option.label || option.value,
    option.description,
    option.labelTag
  ].concat(option.tags).concat(getMatchingFilteringTags(option.filteringTags, highlightText)).filter((el) => !!el).join(" ");
}
var option_announcer_default = defaultOptionDescription;

// node_modules/@cloudscape-design/components/select/utils/use-announcement.js
function useAnnouncement({ highlightText, announceSelected, highlightedOption, getParent, selectedAriaLabel, renderHighlightedAriaLive }) {
  const prevAnnouncedGroup = (0, import_react24.useRef)(void 0);
  (0, import_react24.useEffect)(() => {
    if (highlightedOption) {
      const frameId = requestAnimationFrame(() => {
        prevAnnouncedGroup.current = getParent(highlightedOption);
      });
      return () => cancelAnimationFrame(frameId);
    }
  });
  if (!highlightedOption) {
    return "";
  }
  const option = highlightedOption.option;
  const parent = getParent(highlightedOption);
  const group = parent && parent !== prevAnnouncedGroup.current ? parent : void 0;
  if (renderHighlightedAriaLive) {
    return renderHighlightedAriaLive(option, group);
  }
  const selectedAnnouncement = announceSelected && selectedAriaLabel ? selectedAriaLabel : "";
  const defaultDescription = option_announcer_default({ option, parentGroup: group, highlightText });
  return [selectedAnnouncement, defaultDescription].filter(Boolean).join(" ");
}

// node_modules/@cloudscape-design/components/select/utils/use-load-items.js
var import_react25 = __toESM(require_react());
var useLoadItems = ({ onLoadItems, options, statusType }) => {
  const prevFilteringText = (0, import_react25.useRef)(void 0);
  const fireLoadItems = (filteringText) => {
    if (prevFilteringText.current === filteringText) {
      return;
    }
    prevFilteringText.current = filteringText;
    fireNonCancelableEvent(onLoadItems, { filteringText, firstPage: true, samePage: false });
  };
  const handleLoadMore = () => {
    const firstPage = options.length === 0;
    if (statusType === "pending") {
      fireNonCancelableEvent(onLoadItems, {
        firstPage,
        samePage: false,
        filteringText: prevFilteringText.current || ""
      });
    }
  };
  const handleRecoveryClick = () => fireNonCancelableEvent(onLoadItems, {
    firstPage: false,
    samePage: true,
    filteringText: prevFilteringText.current || ""
  });
  return {
    fireLoadItems,
    handleLoadMore,
    handleRecoveryClick
  };
};

// node_modules/@cloudscape-design/components/select/utils/use-native-search.js
var import_react26 = __toESM(require_react());
var isRepeatedChar = (str) => str.split("").every((c) => c === str[0]);
function findMatchingOption(options, searchText, currentHighlight, useInteractiveGroups) {
  const interactivityCheck = useInteractiveGroups ? isGroupInteractive : isInteractive;
  const filter = (searchText2) => filterOptions(options, searchText2, true).filter((option) => interactivityCheck(option));
  const matchingOptions = filter(searchText);
  if (matchingOptions.length === 1) {
    return matchingOptions[0];
  }
  if (currentHighlight && searchText.length > 1 && isRepeatedChar(searchText)) {
    const matchingOptions2 = filter(searchText[0]);
    if (matchingOptions2.length > 0) {
      let active = isGroup(currentHighlight) ? matchingOptions2.map(({ option }) => option).indexOf(currentHighlight) : matchingOptions2.map(({ option }) => option.value).indexOf(currentHighlight.value);
      active += 1;
      active = active % matchingOptions2.length;
      return matchingOptions2[active];
    }
  }
  if (matchingOptions.length > 0) {
    return matchingOptions[0];
  }
  return null;
}
function useNativeSearch({ isEnabled, options, highlightOption, highlightedOption, useInteractiveGroups }) {
  const value = (0, import_react26.useRef)("");
  const delayedResetValue = useDebounceCallback(() => value.current = "", 500);
  return (event) => {
    if (!isEnabled) {
      return;
    }
    const { key } = event;
    if (!key || key.length !== 1) {
      return;
    }
    delayedResetValue();
    const newValue = value.current + key;
    value.current = newValue;
    const nextHighlight = findMatchingOption(options, newValue, highlightedOption, useInteractiveGroups);
    if (nextHighlight) {
      highlightOption(nextHighlight);
    }
  };
}

// node_modules/@cloudscape-design/components/select/utils/use-select.js
var import_react29 = __toESM(require_react());
var import_react30 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/options-list/utils/use-highlight-option.js
var import_react27 = __toESM(require_react());
var HighlightType = class {
  constructor(type, moveFocus = type === "keyboard") {
    this.type = type;
    this.moveFocus = moveFocus;
  }
};
function useHighlightedOption({ options, isHighlightable }) {
  const [highlightedIndex, setHighlightedIndexState] = (0, import_react27.useState)(-1);
  const [highlightType, setHighlightType] = (0, import_react27.useState)(new HighlightType("keyboard"));
  const setHighlightedIndex = (0, import_react27.useCallback)((index, newHighlightType) => {
    setHighlightedIndexState(index);
    setHighlightType((oldHighlight) => oldHighlight.type !== newHighlightType.type ? newHighlightType : oldHighlight);
  }, []);
  const highlightedOption = options[highlightedIndex] && isHighlightable(options[highlightedIndex]) ? options[highlightedIndex] : void 0;
  const moveHighlightFrom = (direction, startIndex = highlightedIndex, highlightType2) => {
    const fromBottomEnd = startIndex === -1 && direction === -1;
    let newIndex = fromBottomEnd ? options.length : startIndex;
    do {
      newIndex += direction;
    } while (options[newIndex] && !isHighlightable(options[newIndex]));
    if (options[newIndex]) {
      setHighlightedIndex(newIndex, highlightType2);
    }
  };
  const moveHighlight = (direction, highlightType2) => moveHighlightFrom(direction, highlightedIndex, highlightType2);
  const highlightOption = (0, import_react27.useCallback)((option, highlightType2) => {
    const index = options.indexOf(option);
    setHighlightedIndex(index, highlightType2);
  }, [options, setHighlightedIndex]);
  return [
    { highlightType, highlightedIndex, highlightedOption },
    {
      setHighlightedIndexWithMouse: (index, moveFocus = false) => setHighlightedIndex(index, new HighlightType("mouse", moveFocus)),
      highlightFirstOptionWithMouse: () => moveHighlightFrom(1, -1, new HighlightType("mouse", true)),
      moveHighlightWithKeyboard: (direction) => moveHighlight(direction, new HighlightType("keyboard")),
      highlightOptionWithKeyboard: (option) => highlightOption(option, new HighlightType("keyboard")),
      resetHighlightWithKeyboard: () => setHighlightedIndex(-1, new HighlightType("keyboard")),
      goHomeWithKeyboard: () => moveHighlightFrom(1, -1, new HighlightType("keyboard")),
      goEndWithKeyboard: () => moveHighlightFrom(-1, options.length, new HighlightType("keyboard"))
    }
  ];
}

// node_modules/@cloudscape-design/components/internal/components/options-list/utils/use-ids.js
var getOptionId = (menuId, index) => {
  if (index < 0) {
    return void 0;
  }
  return `${menuId}-option-${index}`;
};

// node_modules/@cloudscape-design/components/internal/components/options-list/utils/use-keyboard.js
var HOME = 36;
var END = 35;
var useMenuKeyboard = ({ goUp, goDown, selectOption, goHome, goEnd, closeDropdown, preventNativeSpace = false }) => {
  return (event) => {
    switch (event.detail.keyCode) {
      case KeyCode.up:
        event.preventDefault();
        goUp();
        break;
      case KeyCode.down:
        event.preventDefault();
        goDown();
        break;
      case HOME:
        goHome();
        break;
      case END:
        goEnd();
        break;
      case KeyCode.escape:
        event.stopPropagation();
        closeDropdown();
        break;
      case KeyCode.enter:
        event.preventDefault();
        selectOption();
        break;
      case KeyCode.space:
        if (preventNativeSpace) {
          event.preventDefault();
          selectOption();
        }
    }
  };
};
var useTriggerKeyboard = ({ openDropdown, goHome }) => {
  return (event) => {
    switch (event.detail.keyCode) {
      case KeyCode.up:
      case KeyCode.down:
        event.preventDefault();
        goHome();
        openDropdown();
        break;
      case KeyCode.space:
      case KeyCode.enter:
        event.preventDefault();
        openDropdown();
        break;
    }
  };
};

// node_modules/@cloudscape-design/components/internal/components/options-list/utils/use-open-state.js
var import_react28 = __toESM(require_react());
var useOpenState = ({ onOpen, onClose, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = (0, import_react28.useState)(defaultOpen);
  const [openedWithKeyboard, setOpenedWithKeyboard] = (0, import_react28.useState)(false);
  const openDropdown = (isKeyboard) => {
    if (!isOpen) {
      setIsOpen(true);
      setOpenedWithKeyboard(!!isKeyboard);
      onOpen === null || onOpen === void 0 ? void 0 : onOpen();
    }
  };
  const closeDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
      onClose === null || onClose === void 0 ? void 0 : onClose();
    }
  };
  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown(false);
    }
  };
  return { isOpen, openDropdown, closeDropdown, toggleDropdown, openedWithKeyboard };
};

// node_modules/@cloudscape-design/components/select/utils/connect-options.js
var connectOptionsByValue = (options, selectedOptions) => {
  return (selectedOptions || []).map((selectedOption) => {
    for (const dropdownOption of options) {
      if (dropdownOption.type !== "parent" && dropdownOption.option.value === selectedOption.value) {
        return dropdownOption;
      }
    }
    return { option: selectedOption };
  });
};
var findOptionIndex = (options, option) => {
  for (let index = 0; index < options.length; index++) {
    const __option = options[index];
    if (__option === option || __option.value === option.value) {
      return index;
    }
  }
  return -1;
};

// node_modules/@cloudscape-design/components/select/utils/use-select.js
function useSelect({ selectedOptions, updateSelectedOption, options, filteringType, onBlur, onFocus, externalRef, keepOpen, embedded, fireLoadItems, setFilteringValue, useInteractiveGroups = false, statusType, isAllSelected, isSomeSelected, toggleAll }) {
  const interactivityCheck = useInteractiveGroups ? isGroupInteractive : isInteractive;
  const isHighlightable = (option) => !!option && (useInteractiveGroups || option.type !== "parent");
  const filterRef = (0, import_react30.useRef)(null);
  const triggerRef = (0, import_react30.useRef)(null);
  const menuRef = (0, import_react30.useRef)(null);
  const hasFilter = filteringType !== "none" && !embedded;
  const activeRef = hasFilter ? filterRef : menuRef;
  const __selectedOptions = connectOptionsByValue(options, selectedOptions);
  const __selectedValuesSet = selectedOptions.reduce((selectedValuesSet, item) => {
    if (item.value) {
      selectedValuesSet.add(item.value);
    }
    return selectedValuesSet;
  }, /* @__PURE__ */ new Set());
  const [{ highlightType, highlightedOption, highlightedIndex }, { moveHighlightWithKeyboard, resetHighlightWithKeyboard, setHighlightedIndexWithMouse, highlightOptionWithKeyboard, highlightFirstOptionWithMouse, goHomeWithKeyboard, goEndWithKeyboard }] = useHighlightedOption({ options, isHighlightable });
  const { isOpen, openDropdown, closeDropdown, toggleDropdown, openedWithKeyboard } = useOpenState({
    defaultOpen: embedded,
    onOpen: () => fireLoadItems(""),
    onClose: () => {
      resetHighlightWithKeyboard();
      setFilteringValue === null || setFilteringValue === void 0 ? void 0 : setFilteringValue("");
    }
  });
  const handleFocus = () => {
    fireNonCancelableEvent(onFocus, {});
  };
  const handleBlur = () => {
    fireNonCancelableEvent(onBlur, {});
    closeDropdown();
  };
  const hasSelectedOption = __selectedOptions.length > 0;
  const menuId = useUniqueId("option-list");
  const dialogId = useUniqueId("dialog");
  const highlightedOptionId = getOptionId(menuId, highlightedIndex);
  const closeDropdownIfNecessary = () => {
    var _a;
    if (!keepOpen) {
      (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      closeDropdown();
    }
  };
  const selectOption = (option) => {
    const optionToSelect = option || highlightedOption;
    if (!optionToSelect || !interactivityCheck(optionToSelect)) {
      return;
    }
    if (optionToSelect.type === "select-all" && toggleAll) {
      toggleAll();
    } else {
      updateSelectedOption(optionToSelect.option);
    }
    closeDropdownIfNecessary();
  };
  const activeKeyDownHandler = useMenuKeyboard({
    goUp: () => {
      if (!useInteractiveGroups && (highlightedOption === null || highlightedOption === void 0 ? void 0 : highlightedOption.type) === "child" && highlightedIndex === 1 || highlightedIndex === 0) {
        goEndWithKeyboard();
        return;
      }
      moveHighlightWithKeyboard(-1);
    },
    goDown: () => {
      if (highlightedIndex === options.length - 1) {
        goHomeWithKeyboard();
        return;
      }
      moveHighlightWithKeyboard(1);
    },
    selectOption,
    goHome: goHomeWithKeyboard,
    goEnd: goEndWithKeyboard,
    closeDropdown: () => {
      var _a;
      if (!embedded) {
        (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        closeDropdown();
      }
    },
    preventNativeSpace: !hasFilter || highlightedOption && highlightType.type === "keyboard"
  });
  const triggerKeyDownHandler = useTriggerKeyboard({
    openDropdown: () => openDropdown(true),
    goHome: goHomeWithKeyboard
  });
  const getDropdownProps = () => ({
    onFocus: handleFocus,
    onBlur: handleBlur,
    dropdownContentId: dialogId,
    ariaRole: hasFilter ? "dialog" : void 0
  });
  const getTriggerProps = (disabled = false, autoFocus = false) => {
    const triggerProps = {
      ref: triggerRef,
      onFocus: () => closeDropdown(),
      autoFocus,
      ariaHasPopup: hasFilter ? "dialog" : "listbox",
      ariaControls: isOpen ? hasFilter ? dialogId : menuId : void 0
    };
    if (!disabled) {
      triggerProps.onMouseDown = (event) => {
        var _a;
        event.preventDefault();
        if (isOpen) {
          (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
        toggleDropdown();
      };
      triggerProps.onKeyDown = triggerKeyDownHandler;
    }
    return triggerProps;
  };
  const getFilterProps = () => {
    if (!hasFilter || !setFilteringValue) {
      return {};
    }
    return {
      ref: filterRef,
      onKeyDown: activeKeyDownHandler,
      onChange: (event) => {
        setFilteringValue(event.detail.value);
        resetHighlightWithKeyboard();
      },
      __onDelayedInput: (event) => {
        fireLoadItems(event.detail.value);
      },
      nativeInputAttributes: {
        "aria-activedescendant": highlightedOptionId,
        ["aria-owns"]: menuId,
        ["aria-controls"]: menuId
      }
    };
  };
  const getMenuProps = () => {
    const menuProps = {
      id: menuId,
      ref: menuRef,
      open: isOpen,
      onMouseUp: (itemIndex) => {
        if (itemIndex > -1) {
          selectOption(options[itemIndex]);
        }
      },
      onMouseMove: (itemIndex) => {
        if (itemIndex > -1) {
          setHighlightedIndexWithMouse(itemIndex);
        }
      },
      statusType
    };
    if (!hasFilter) {
      menuProps.onKeyDown = activeKeyDownHandler;
      menuProps.nativeAttributes = {
        "aria-activedescendant": highlightedOptionId
      };
    }
    if (embedded) {
      menuProps.onFocus = () => {
        if (!highlightedOption) {
          goHomeWithKeyboard();
        }
      };
      menuProps.onBlur = () => {
        resetHighlightWithKeyboard();
      };
    }
    return menuProps;
  };
  const getGroupState = (option) => {
    const totalSelected = option.options.filter((item) => !!item.value && __selectedValuesSet.has(item.value)).length;
    const hasSelected = totalSelected > 0;
    const allSelected = totalSelected === option.options.length;
    return {
      selected: hasSelected && allSelected && useInteractiveGroups,
      indeterminate: hasSelected && !allSelected
    };
  };
  const getOptionProps = (option, index) => {
    var _a, _b;
    const isSelectAll = option.type === "select-all";
    const highlighted = option === highlightedOption;
    const groupState = isGroup(option.option) ? getGroupState(option.option) : void 0;
    const selected = isSelectAll ? isAllSelected : __selectedOptions.indexOf(option) > -1 || !!(groupState === null || groupState === void 0 ? void 0 : groupState.selected);
    const nextOption = (_a = options[index + 1]) === null || _a === void 0 ? void 0 : _a.option;
    const isNextSelected = !!nextOption && isGroup(nextOption) ? getGroupState(nextOption).selected : __selectedOptions.indexOf(options[index + 1]) > -1;
    const previousOption = (_b = options[index - 1]) === null || _b === void 0 ? void 0 : _b.option;
    const isPreviousSelected = !!previousOption && isGroup(previousOption) ? getGroupState(previousOption).selected : __selectedOptions.indexOf(options[index - 1]) > -1;
    const optionProps = {
      key: index,
      option,
      highlighted,
      selected,
      isNextSelected,
      isPreviousSelected,
      indeterminate: !!(groupState === null || groupState === void 0 ? void 0 : groupState.indeterminate) || isSelectAll && !isAllSelected && isSomeSelected,
      ["data-mouse-target"]: isHighlightable(option) ? index : -1,
      id: getOptionId(menuId, index)
    };
    return optionProps;
  };
  const prevOpen = usePrevious(isOpen);
  (0, import_react30.useEffect)(() => {
    if (isOpen && !prevOpen && options.length > 0 && !hasFilter) {
      if (openedWithKeyboard) {
        if (__selectedOptions[0]) {
          highlightOptionWithKeyboard(__selectedOptions[0]);
        } else {
          goHomeWithKeyboard();
        }
      } else {
        if (!__selectedOptions[0] || !options.includes(__selectedOptions[0])) {
          highlightFirstOptionWithMouse();
        } else {
          const highlightedIndex2 = options.indexOf(__selectedOptions[0]);
          setHighlightedIndexWithMouse(highlightedIndex2, true);
        }
      }
    }
  }, [
    isOpen,
    __selectedOptions,
    hasSelectedOption,
    setHighlightedIndexWithMouse,
    highlightOptionWithKeyboard,
    highlightFirstOptionWithMouse,
    goHomeWithKeyboard,
    openedWithKeyboard,
    options,
    prevOpen,
    hasFilter
  ]);
  const focusActiveRef = (0, import_react29.useCallback)(() => {
    var _a;
    (_a = activeRef.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
  }, [activeRef]);
  (0, import_react30.useEffect)(() => {
    if (isOpen && !embedded) {
      focusActiveRef();
    }
  }, [isOpen, activeRef, embedded, focusActiveRef]);
  useForwardFocus(externalRef, triggerRef);
  const highlightedGroupSelected = !!highlightedOption && isGroup(highlightedOption.option) && getGroupState(highlightedOption.option).selected;
  const announceSelected = !!highlightedOption && (__selectedOptions.indexOf(highlightedOption) > -1 || highlightedGroupSelected);
  return {
    isOpen,
    highlightedOption,
    highlightedIndex,
    highlightType,
    getTriggerProps,
    getDropdownProps,
    getMenuProps,
    getFilterProps,
    getOptionProps,
    highlightOption: highlightOptionWithKeyboard,
    selectOption,
    announceSelected,
    dialogId,
    focusActiveRef
  };
}

export {
  internal_default4 as internal_default,
  useDropdownStatus,
  dropdown_footer_default,
  getDropdownMinWidth,
  filter_default,
  plain_list_default,
  styles_css_default,
  styles_css_default14 as styles_css_default2,
  internal_default6 as internal_default2,
  trigger_default,
  virtual_list_default,
  isGroup,
  prepareOptions,
  checkOptionValueField,
  findOptionIndex,
  useAnnouncement,
  useLoadItems,
  useNativeSearch,
  useSelect
};
//# sourceMappingURL=chunk-QI6CUVIL.js.map
