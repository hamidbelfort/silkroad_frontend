import { SidebarItemType } from "@/lib/types/sidebar";
import {
  LayoutDashboard,
  Settings,
  Users,
  Hotel,
  History,
  HelpCircle,
  UserCircle,
  LogOut,
  Banknote,
  Lock,
  Image,
  Ticket,
  MailQuestionIcon,
  Factory,
  MapPin,
  Info,
  User2,
} from "lucide-react";

export const adminSidebarItems: SidebarItemType[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/admin",
  },
  {
    title: "App Settings",
    icon: Settings,
    href: "#",
    children: [
      { title: "FAQ", href: "/dashboard/admin/faq", icon: MailQuestionIcon },
      {
        title: "Company Info",
        href: "/dashboard/admin/company-info",
        icon: Factory,
      },
      {
        title: "Company Address",
        href: "/dashboard/admin/company-address",
        icon: MapPin,
      },
      {
        title: "Company Details",
        href: "/dashboard/admin/company-details",
        icon: Info,
      },
    ],
  },
  {
    title: "Slider",
    icon: Image,
    href: "/dashboard/admin/slider",
  },
  {
    title: "Change Password",
    icon: Lock,
    href: "/dashboard/admin/change-password",
  },
  {
    title: "Sign out",
    icon: LogOut,
    href: "/signout",
  },
];

export const operatorSidebarItems: SidebarItemType[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/operator",
  },
  {
    title: "Profile",
    icon: UserCircle,
    href: "#",
    children: [
      {
        title: "Edit Profile",
        href: "/dashboard/operator/profile",
        icon: UserCircle,
      },
      {
        title: "Change Password",
        href: "/dashboard/operator/change-password",
        icon: Lock,
      },
    ],
  },
  {
    title: "Sign out",
    icon: LogOut,
    href: "/signout",
  },
];

export const customerSidebarItems: SidebarItemType[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/customer",
  },
  {
    title: "Exchange",
    icon: Banknote,
    href: "/dashboard/customer/exchange",
  },
  {
    title: "Reserve Hotel",
    icon: Hotel,
    href: "/dashboard/customer/reserve-hotel",
  },
  {
    title: "History",
    icon: History,
    href: "#",
    children: [
      {
        title: "Exchanges",
        href: "/dashboard/customer/history/exchanges",
        icon: Banknote,
      },
      {
        title: "Reservations",
        href: "/dashboard/customer/history/reservations",
        icon: Ticket,
      },
    ],
  },
  {
    title: "Support Tickets",
    icon: HelpCircle,
    href: "/dashboard/customer/support-tickets",
  },
  {
    title: "Profile",
    icon: UserCircle,
    href: "#",
    children: [
      {
        title: "Edit Profile",
        href: "/dashboard/customer/profile",
        icon: User2,
      },
      {
        title: "Bank Accounts",
        href: "/dashboard/customer/banks",
        icon: Banknote,
      },
      {
        title: "Change Password",
        href: "/dashboard/customer/change-password",
        icon: Lock,
      },
    ],
  },
  {
    title: "Sign out",
    icon: LogOut,
    href: "/signout",
  },
];
