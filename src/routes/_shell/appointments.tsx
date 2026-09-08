import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EmptyState,
  PageHeader,
  PageTransition,
  SectionCard,
  StatusBadge,
  TableSkeleton,
  Toolbar,
  useMockLoading,
} from "@/components/clinic/primitives";
import { appointments, doctors, prettyDate } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — Meridian Clinic OS" },
      {
        name: "description",
        content:
          "Day and list views of clinic appointments across doctors, with status, type and quick booking.",
      },
      { property: "og:title", content: "Appointments — Meridian Clinic OS" },
      { property: "og:description", content: "Scheduling across every doctor and room." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppointmentsPage,
});

const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function AppointmentsPage() {
  const { loading } = useMockLoading(650);
  const [search, setSearch] = useState("");
  const [doctor, setDoctor] = useState("all");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState("2026-09-07");

  const filtered = useMemo(
    () =>
      appointments.filter((a) => {
        const q = search.trim().toLowerCase();
        return (
          (!q || a.patient.toLowerCase().includes(q)) &&
          (doctor === "all" || a.doctor === doctor) &&
          (status === "all" || a.status === status)
        );
      }),
    [search, doctor, status],
  );

  const dayAppts = filtered.filter((a) => a.date === date);

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Appointments"
          subtitle="Book, reschedule and track consultations across all doctors"
          actions={
            <Button size="sm">
              <Plus className="size-4" /> New appointment
            </Button>
          }
        />

        <SectionCard bodyClassName="p-0">
          <div className="border-b border-border p-4">
            <Toolbar search={search} onSearch={setSearch} placeholder="Search patient…">
              <Select value={doctor} onValueChange={setDoctor}>
                <SelectTrigger className="h-10 w-[190px]">
                  <SelectValue placeholder="Doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All doctors</SelectItem>
                  {doctors.map((d) => (
                    <SelectItem key={d.id} value={d.name}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-10 w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {["all", "scheduled", "completed", "pending", "cancelled"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s === "all" ? "All statuses" : s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Toolbar>
          </div>

          <Tabs defaultValue="day" className="gap-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
              <TabsList>
                <TabsTrigger value="day">Day view</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9"
                  onClick={() => setDate("2026-09-06")}
                  aria-label="Previous day"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <span className="min-w-[130px] text-center text-sm font-medium">
                  {prettyDate(date)}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9"
                  onClick={() => setDate("2026-09-08")}
                  aria-label="Next day"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="day" className="m-0">
              {loading ? (
                <TableSkeleton rows={6} cols={5} />
              ) : dayAppts.length === 0 ? (
                <EmptyState
                  icon={CalendarDays}
                  title="Nothing booked for this day"
                  message="Pick another date or create a new appointment for this slot."
                  actionLabel="New appointment"
                />
              ) : (
                <div className="overflow-x-auto">
                  <div className="min-w-[820px]">
                    <div className="grid grid-cols-[80px_repeat(4,minmax(0,1fr))] border-b border-border bg-secondary/50 text-xs font-medium text-muted-foreground">
                      <div className="px-3 py-2.5">Time</div>
                      {doctors.map((d) => (
                        <div key={d.id} className="truncate px-3 py-2.5">
                          {d.name}
                        </div>
                      ))}
                    </div>
                    {HOURS.map((h) => (
                      <div
                        key={h}
                        className="grid min-h-[64px] grid-cols-[80px_repeat(4,minmax(0,1fr))] border-b border-border last:border-0"
                      >
                        <div className="px-3 py-2 text-xs tabular-nums text-muted-foreground">{h}</div>
                        {doctors.map((d) => {
                          const slot = dayAppts.filter(
                            (a) => a.doctor === d.name && a.start.slice(0, 2) === h.slice(0, 2),
                          );
                          return (
                            <div key={d.id} className="border-l border-border p-1.5">
                              {slot.map((a) => (
                                <div
                                  key={a.id}
                                  className="cursor-pointer rounded-lg border border-primary/20 bg-primary-soft px-2.5 py-1.5 transition-shadow hover:shadow-card"
                                >
                                  <p className="truncate text-xs font-semibold">{a.patient}</p>
                                  <p className="truncate text-[0.6875rem] text-muted-foreground">
                                    {a.start}–{a.end} · {a.type}
                                  </p>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="list" className="m-0">
              {loading ? (
                <TableSkeleton rows={7} cols={5} />
              ) : filtered.length === 0 ? (
                <EmptyState
                  icon={CalendarDays}
                  title="No appointments match"
                  message="Adjust the search or filters to see more bookings."
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                        <th className="px-5 py-3 font-medium">Patient</th>
                        <th className="px-5 py-3 font-medium">Doctor</th>
                        <th className="px-5 py-3 font-medium">Date</th>
                        <th className="px-5 py-3 font-medium">Time</th>
                        <th className="px-5 py-3 font-medium">Type</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filtered.map((a) => (
                        <tr key={a.id} className="transition-colors hover:bg-secondary/60">
                          <td className="px-5 py-3.5 font-medium">{a.patient}</td>
                          <td className="px-5 py-3.5 text-muted-foreground">{a.doctor}</td>
                          <td className="px-5 py-3.5 text-muted-foreground">{prettyDate(a.date)}</td>
                          <td className="px-5 py-3.5 tabular-nums text-muted-foreground">
                            {a.start}–{a.end}
                          </td>
                          <td className="px-5 py-3.5 text-muted-foreground">{a.type}</td>
                          <td className="px-5 py-3.5">
                            <StatusBadge status={a.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </SectionCard>
      </div>
    </PageTransition>
  );
}
