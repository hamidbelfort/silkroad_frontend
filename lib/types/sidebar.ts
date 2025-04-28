export interface SidebarItemType {
  label: string;
  href: string;
  icon: React.ElementType;
  onClick?: (router: unknown) => void;
  hrefRouter?: string;
  children?: SidebarItemType[];
}

export interface SidebarItemProps extends SidebarItemType {
  isCollapsed: boolean;
}
