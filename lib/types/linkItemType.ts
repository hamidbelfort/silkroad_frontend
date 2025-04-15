//import { LucideIcon } from "lucide-react";
export interface LinkItemType {
  label: string;
  href: string;
  icon: React.ReactNode;
  onClick?: (router: unknown) => void;
}
