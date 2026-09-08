import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Bell,
  ChevronDown,
  HeartPulse,
  LogOut,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sun,
  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { navGroups } from "./nav";
import { clinics } from "@/lib/mock-data";

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("clinic-theme");
    const isDark = stored ? stored === "dark" : false;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("clinic-theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

function NavContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="scroll-slim flex-1 space-y-6 overflow-y-auto px-3 py-4">
      {navGroups.map((group) => (
        <div key={group.group}>
          {!collapsed ? (
            <p className="px-3 pb-2 text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
              {group.group}
            </p>
          ) : (
            <div className="mx-3 mb-2 h-px bg-sidebar-border" />
          )}
          <ul className="space-y-1">
            {group.items.map((item) => {
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <li key={group.group + item.label}>
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-secondary",
                      collapsed && "justify-center px-0",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-accent"
                        className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-sidebar-primary"
                      />
                    ) : null}
                    <item.icon className="size-[1.05rem] shrink-0" />
                    {!collapsed ? <span className="truncate">{item.label}</span> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Brand({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 px-4 py-5", collapsed && "justify-center px-0")}>
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-card">
        <HeartPulse className="size-5" />
      </span>
      {!collapsed ? (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Meridian Clinic OS</p>
          <p className="truncate text-xs text-muted-foreground">Bandra West</p>
        </div>
      ) : null}
    </div>
  );
}

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [clinic, setClinic] = useState(clinics[0]!);
  const { dark, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 lg:flex",
          collapsed ? "w-[74px]" : "w-[260px]",
        )}
      >
        <Brand collapsed={collapsed} />
        <NavContent collapsed={collapsed} />
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed((c) => !c)}
            className="w-full justify-center text-muted-foreground"
          >
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
            {!collapsed ? <span className="ml-2">Collapse</span> : null}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur-xl">
          <div className="flex items-center gap-2 px-4 py-3 sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[272px] bg-sidebar p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Brand />
                <NavContent collapsed={false} />
              </SheetContent>
            </Sheet>

            <div className="relative hidden min-w-0 flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search patients, invoices, appointments…"
                className="h-10 max-w-md rounded-lg border-transparent bg-secondary pl-9"
              />
            </div>
            <div className="flex-1 md:hidden" />

            <div className="flex shrink-0 items-center gap-1.5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden gap-2 rounded-lg sm:flex">
                    <span className="max-w-[150px] truncate">{clinic.name}</span>
                    <ChevronDown className="size-3.5 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Switch clinic</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {clinics.map((c) => (
                    <DropdownMenuItem key={c.id} onClick={() => setClinic(c)}>
                      <div className="min-w-0">
                        <p className="truncate text-sm">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.city}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
                {dark ? <Sun className="size-[1.1rem]" /> : <Moon className="size-[1.1rem]" />}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                    <Bell className="size-[1.1rem]" />
                    <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-destructive text-[0.625rem] font-semibold text-destructive-foreground">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="items-start gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-destructive" />
                    <span className="text-sm">Invoice INV-2026-0812 is 10 days overdue</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="items-start gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-warning" />
                    <span className="text-sm">Amoxicillin 500mg below reorder level</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="items-start gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-primary" />
                    <span className="text-sm">Lab result ready for Aarav Sharma</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-1 flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-secondary">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                        NB
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="text-sm font-medium">Nikhil Bansal</p>
                    <p className="text-xs font-normal text-muted-foreground">Clinic administrator</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/settings">
                      <UserCircle className="size-4" /> Profile & settings
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/">
                      <LogOut className="size-4" /> Sign out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main key={pathname} className="mx-auto w-full max-w-[1500px] flex-1 px-4 py-6 sm:px-6 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
