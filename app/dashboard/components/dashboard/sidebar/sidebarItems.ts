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
  Settings2,
  ListOrdered,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
//Admin
export const adminSidebarItems: SidebarItemType[] = [
  {
    label: "label.sidebar.dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "label.sidebar.usersManagement",
    icon: User2,
    href: "/dashboard/admin/users",
  },
  {
    label: "label.sidebar.ordersManagement",
    icon: ListOrdered,
    href: "/dashboard/admin/orders",
  },
  {
    label: "label.sidebar.appSettings",
    icon: Settings,
    href: "#",
    children: [
      {
        label: "label.sidebar.faq",
        href: "/dashboard/admin/manageFaq",
        icon: MailQuestionIcon,
      },
      {
        label: "label.sidebar.companyInfo",
        href: "/dashboard/admin/company-info",
        icon: Factory,
      },
      {
        label: "label.sidebar.companyAddress",
        href: "/dashboard/admin/company-address",
        icon: MapPin,
      },
      {
        label: "label.sidebar.companyDetails",
        href: "/dashboard/admin/company-details",
        icon: Info,
      },
      {
        label: "label.sidebar.appSettings",
        href: "/dashboard/admin/app-settings",
        icon: Settings2,
      },
    ],
  },
  {
    label: "label.sidebar.sliderManagement",
    icon: Image,
    href: "/dashboard/admin/manageSlider",
  },
  {
    label: "label.sidebar.changePassword",
    icon: Lock,
    href: "/dashboard/change-password",
  },
  {
    label: "label.sidebar.logout",
    icon: LogOut,
    href: "#",
    hrefRouter: "/login",
    onClick: () => {
      useAuthStore.getState().logout();
    },
  },
];
//Operator
export const operatorSidebarItems: SidebarItemType[] = [
  {
    label: "label.sidebar.dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "label.sidebar.profile",
    icon: UserCircle,
    href: "#",
    children: [
      {
        label: "label.sidebar.editProfile",
        href: "/dashboard/profile",
        icon: UserCircle,
      },
      {
        label: "label.sidebar.changePassword",
        href: "/dashboard/change-password",
        icon: Lock,
      },
    ],
  },
  {
    label: "label.sidebar.logout",
    icon: LogOut,
    href: "/#",
    hrefRouter: "/login",
    onClick: () => {
      useAuthStore.getState().logout();
    },
  },
];
//Customer
export const customerSidebarItems: SidebarItemType[] = [
  {
    label: "label.sidebar.dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "label.sidebar.exchange",
    icon: Banknote,
    href: "/dashboard/exchange",
  },
  {
    label: "label.sidebar.hotelBooking",
    icon: Hotel,
    href: "#",
  },
  {
    label: "label.sidebar.history",
    icon: History,
    href: "#",
    children: [
      {
        label: "label.sidebar.exchanges",
        href: "#",
        icon: Banknote,
      },
      {
        label: "label.sidebar.bookings",
        href: "#",
        icon: Ticket,
      },
    ],
  },
  {
    label: "label.sidebar.supportTickets",
    icon: HelpCircle,
    href: "#",
  },
  {
    label: "label.sidebar.profile",
    icon: UserCircle,
    href: "#",
    children: [
      {
        label: "label.sidebar.editProfile",
        href: "/dashboard/profile",
        icon: User2,
      },
      {
        label: "label.sidebar.bankAccounts",
        href: "/dashboard/banks",
        icon: Banknote,
      },
      {
        label: "label.sidebar.changePassword",
        href: "/dashboard/change-password",
        icon: Lock,
      },
    ],
  },
  {
    label: "label.sidebar.logout",
    icon: LogOut,
    href: "#",
    hrefRouter: "/login",
    onClick: () => {
      useAuthStore.getState().logout();
    },
  },
];
