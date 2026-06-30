const DEFAULT_LTI_ENDPOINT = 'lti';
const DEFAULT_CANVAS_ENDPOINT = 'canvas';

export const CanvasEndpoints = {
  GetGlobalLTIConfiguration: () => `${DEFAULT_LTI_ENDPOINT}/config.json`,
  GetCanvasConfiguration: () => `${DEFAULT_CANVAS_ENDPOINT}/configuration`,
  GetUserLTIConfiguration: () => `${DEFAULT_CANVAS_ENDPOINT}/lti/configuration`,
};
