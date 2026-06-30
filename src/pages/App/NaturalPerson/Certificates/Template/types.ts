interface Ability {
  category: string;
  ability: string;
}

interface ITemplate {
  templateId: string;
  schoolId: string;
  description: string;
  name: string;
  hoursWorkload: number;
  abilities: Ability[];
  issuedAt: string;
  expiresAt: string;
  imageTemplateUrl: string;
  schoolName: string;
  logoImage: string;
}

export interface ITemplateResponse {
  templates: ITemplate[];
}
