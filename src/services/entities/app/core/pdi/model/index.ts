export interface IPDI {
  title: string;
  dailyTime: string;
  previousEducation: string;
  skills: string;
  goals: string;
}
export interface TokenResponse {
  access_token: string;
}

export interface WebSocketTokenResponse {
  token: string;
}

export interface IPDIResponse {
  pdis: IInternalPDIs[];
}

export interface IInternalPDIs {
  pdiId: string;
  createdAt: string;
  title: string;
  status: string;
  progressPercentage: number;
}

// Interface for a single book object
export interface IBook {
  bookId: string;
  title: string;
  authorName: string;
  isbn: string;
}

// Interface for a single ability object
export interface IAbility {
  abilityId: string;
  ability: string;
  category: string;
  isReview: boolean;
}

// Interface for a single node object
export interface INode {
  nodeId: string;
  objective: string;
  description: string;
  markedAsFinished: boolean;
  books: IBook[];
  abilities: IAbility[];
}

// Interface for the main PDI object
export interface IExtendedPDI extends IInternalPDIs {
  nodes: INode[];
}
