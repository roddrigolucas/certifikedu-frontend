import { LucideIcon } from 'lucide-react';

export interface SubMenuItem {
  label: string;
  path: string;
  isExternal?: boolean;
}
export interface MenuItem extends SubMenuItem {
  icon: LucideIcon;
  shouldRender?: any;
  subMenu?: SubMenuItem[];
}
