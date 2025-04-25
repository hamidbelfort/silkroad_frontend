import { SidebarItemType } from "@/lib/types/sidebar";
import {
  LayoutDashboard,
  Settings,
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
import { useAuthStore } from "@/store/authStore";
export const adminSidebarItems: SidebarItemType[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "App Settings",
    icon: Settings,
    href: "#",
    children: [
      {
        label: "FAQ",
        href: "/dashboard/admin/faq",
        icon: MailQuestionIcon,
      },
      {
        label: "Company Info",
        href: "/dashboard/admin/company-info",
        icon: Factory,
      },
      {
        label: "Company Address",
        href: "/dashboard/admin/company-address",
        icon: MapPin,
      },
      {
        label: "Company Details",
        href: "/dashboard/admin/company-details",
        icon: Info,
      },
    ],
  },
  {
    label: "Slider",
    icon: Image,
    href: "/dashboard/admin/manageSlider",
  },
  {
    label: "Change Password",
    icon: Lock,
    href: "/dashboard/change-password",
  },
  {
    label: "Sign out",
    icon: LogOut,
    href: "#",
    hrefRouter: "/login",
    onClick: () => {
      useAuthStore.getState().logout();
    },
  },
];

export const operatorSidebarItems: SidebarItemType[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Profile",
    icon: UserCircle,
    href: "#",
    children: [
      {
        label: "Edit Profile",
        href: "/dashboard/profile",
        icon: UserCircle,
      },
      {
        label: "Change Password",
        href: "/dashboard/change-password",
        icon: Lock,
      },
    ],
  },
  {
    label: "Sign out",
    icon: LogOut,
    href: "/#",
    hrefRouter: "/login",
    onClick: () => {
      useAuthStore.getState().logout();
    },
  },
];

export const customerSidebarItems: SidebarItemType[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Exchange",
    icon: Banknote,
    href: "/dashboard/exchange",
  },
  {
    label: "Reserve Hotel",
    icon: Hotel,
    href: "/dashboard/customer/reserve-hotel",
  },
  {
    label: "History",
    icon: History,
    href: "#",
    children: [
      {
        label: "Exchanges",
        href: "/dashboard/customer/history/exchanges",
        icon: Banknote,
      },
      {
        label: "Reservations",
        href: "/dashboard/customer/history/reservations",
        icon: Ticket,
      },
    ],
  },
  {
    label: "Support Tickets",
    icon: HelpCircle,
    href: "/dashboard/customer/support-tickets",
  },
  {
    label: "Profile",
    icon: UserCircle,
    href: "#",
    children: [
      {
        label: "Edit Profile",
        href: "/dashboard/profile",
        icon: User2,
      },
      {
        label: "Bank Accounts",
        href: "/dashboard/banks",
        icon: Banknote,
      },
      {
        label: "Change Password",
        href: "/dashboard/change-password",
        icon: Lock,
      },
    ],
  },
  {
    label: "Sign out",
    icon: LogOut,
    href: "#",
    hrefRouter: "/login",
    onClick: () => {
      useAuthStore.getState().logout();
    },
  },
];
