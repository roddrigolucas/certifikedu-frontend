export interface ICanvasConfigResponse {
  redirectUri: string;
}

export interface IUserLTIConfigurationResponse {
  id: string;
  canvasDomain: string;
  canvasClientIdLTI: string;
  canvasClientIdDevKey: string;
  idPJ: string;
}

export interface ICreateUserLTIConfiguration {
  canvasClientIdLTI: string;
  canvasClientSecretLTI: string;
  canvasClientIdDevKey: string;
  canvasClientSecretDevKey: string;
  canvasDomain: string;
}
