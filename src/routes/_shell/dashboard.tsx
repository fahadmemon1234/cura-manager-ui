import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  CalendarDays,
  CircleDollarSign,
  Download,
  FlaskConical,
  Plus,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CardSkeleton,
  PageHeader,
  PageTransition,
  SectionCard,
  Stagger,
  StaggerItem,
  StatCard,
  StatusBadge,
  TableSkeleton,
  useMockLoading,
} from "@/components/clinic/primitives";
import {
  activityFeed,
  appointments,
  appointmentsByStatus,
  initials,
  inr,
  invoices,
  labOrders,
  patients,
  revenueTrend,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Meridian Clinic OS" },
      {
        name: "description",
        content:
          "Today's appointments, revenue trend, outstanding invoices and clinic activity at a glance.",
      },
      { property: "og:title", content: "Dashboard — Meridian Clinic OS" },
      { property: "og:description", content: "Live clinic performance overview." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
      <p className="text-xs font-medium">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-xs text-muted-foreground">
          {p.name}: <span className="font-medium text-foreground">{inr(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

function Dashboard() {
  const { loading } = useMockLoading(650);
  const today = appointments.filter((a) => a.date === "2026-09-07");
  const outstanding = invoices
    .filter((i) => i.status !== "paid")
    .reduce((s, i) => s + (i.amount - i.paid), 0);

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Good morning, Nikhil"
          subtitle="Monday, 7 September 2026 · Meridian Health — Bandra"
          actions={
            <>
              <Button variant="outline" size="sm">
                <Download className="size-4" /> Export
              </Button>
              <Button size="sm" asChild>
                <Link to="/appointments">
                  <Plus className="size-4" /> New appointment
                </Link>
              </Button>
            </>
          }
        />

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StaggerItem>
              <StatCard
                label="Appointments today"
                value={today.length}
                icon={CalendarDays}
                delta="+12%"
                hint="vs last Monday"
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label="Revenue today"
                value={86400}
                format={(n) => inr(n)}
                icon={CircleDollarSign}
                delta="+8.4%"
                hint="collections included"
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label="Active patients"
                value={patients.filter((p) => p.status === "active").length * 148}
                icon={Users}
                delta="+3.1%"
                hint="last 90 days"
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label="Outstanding dues"
                value={outstanding}
                format={(n) => inr(n)}
                icon={Activity}
                delta="-2.7%"
                hint="across 3 invoices"
              />
            </StaggerItem>
          </Stagger>
        )}

        <div className="grid gap-5 xl:grid-cols-3">
          <SectionCard
            title="Revenue trend"
            description="Billed vs collected, last 30 days"
            className="xl:col-span-2"
            bodyClassName="p-3 pt-5"
          >
            <div className="h-[288px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend} margin={{ left: 4, right: 12, top: 4 }}>
                  <defs>
                    <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.32} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--color-border)" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    interval={4}
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={44}
                    tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Billed"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    fill="url(#revFill)"
                  />
                  <Area
                    type="monotone"
                    dataKey="collected"
                    name="Collected"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                    fill="transparent"
                    strokeDasharray="4 4"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Appointments" description="This week by status">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appointmentsByStatus}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={54}
                    outerRadius={82}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {appointmentsByStatus.map((s) => (
                      <Cell key={s.name} fill={s.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-4 space-y-2">
              {appointmentsByStatus.map((s) => (
                <li key={s.name} className="flex items-center gap-2 text-sm">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                    aria-hidden
                  />
                  <span className="flex-1 text-muted-foreground">{s.name}</span>
                  <span className="font-medium tabular-nums">{s.value}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          <SectionCard
            title="Today's schedule"
            description={`${today.length} appointments`}
            className="xl:col-span-2"
            bodyClassName="p-0"
            actions={
              <Button variant="ghost" size="sm" asChild>
                <Link to="/appointments">View all</Link>
              </Button>
            }
          >
            {loading ? (
              <TableSkeleton rows={5} cols={4} />
            ) : (
              <ul className="divide-y divide-border">
                {today.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/60"
                  >
                    <span className="w-16 shrink-0 text-sm font-medium tabular-nums">{a.start}</span>
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback className="bg-primary-soft text-[0.7rem] text-accent-foreground">
                        {initials(a.patient)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{a.patient}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {a.type} · {a.doctor}
                      </p>
                    </div>
                    <StatusBadge status={a.status} />
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <div className="space-y-5">
            <SectionCard title="Recent activity" bodyClassName="p-0">
              <ul className="divide-y divide-border">
                {activityFeed.slice(0, 5).map((f) => (
                  <li key={f.id} className="px-5 py-3">
                    <p className="text-sm leading-snug">{f.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{f.time}</p>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Pending lab results" bodyClassName="p-0">
              <ul className="divide-y divide-border">
                {labOrders
                  .filter((l) => l.status !== "completed")
                  .map((l) => (
                    <li key={l.id} className="flex items-center gap-3 px-5 py-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-accent-foreground">
                        <FlaskConical className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{l.test}</p>
                        <p className="truncate text-xs text-muted-foreground">{l.patient}</p>
                      </div>
                      <StatusBadge status={l.status} />
                    </li>
                  ))}
              </ul>
            </SectionCard>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
