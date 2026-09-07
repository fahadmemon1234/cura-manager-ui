import {
  Activity,
  BedDouble,
  Boxes,
  CalendarDays,
  ClipboardList,
  FileText,
  FlaskConical,
  LayoutDashboard,
  ListChecks,
  Pill,
  Receipt,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  DatabaseBackup,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = { label: string; to: string; icon: LucideIcon };
export type NavGroup = { group: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    group: "Overview",
    items: [{ label: "Dashboard", to: "/dashboard", icon: LayoutDashboard }],
  },
  {
    group: "Clinical",
    items: [
      { label: "Patients", to: "/patients", icon: Users },
      { label: "Appointments", to: "/appointments", icon: CalendarDays },
      { label: "Visits", to: "/visits", icon: Activity },
      { label: "Prescriptions", to: "/prescriptions", icon: Pill },
      { label: "Treatment Plans", to: "/treatment-plans", icon: ClipboardList },
      { label: "Lab Orders", to: "/lab-orders", icon: FlaskConical },
      { label: "In-Patient (IPD)", to: "/ipd", icon: BedDouble },
    ],
  },
  {
    group: "Financial",
    items: [
      { label: "Billing", to: "/billing", icon: Receipt },
      { label: "Expenses", to: "/expenses", icon: Wallet },
      { label: "Reports", to: "/reports", icon: BarChart3 },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Inventory", to: "/inventory", icon: Boxes },
      { label: "Tasks", to: "/tasks", icon: ListChecks },
      { label: "Automation", to: "/automation", icon: Sparkles },
      { label: "SMS & Backups", to: "/backups", icon: DatabaseBackup },
    ],
  },
  {
    group: "Admin",
    items: [
      { label: "Users & Roles", to: "/users", icon: ShieldCheck },
      { label: "Settings", to: "/settings", icon: Settings },
      { label: "Documents", to: "/patients", icon: FileText },
    ],
  },
];
