import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Plus, UserPlus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EmptyState,
  PageHeader,
  PageTransition,
  SectionCard,
  StatusBadge,
  TableSkeleton,
  Tag,
  Toolbar,
  useMockLoading,
} from "@/components/clinic/primitives";
import {
  doctors,
  initials,
  inr,
  invoices,
  labOrders,
  patients,
  prescriptionsMock,
  prettyDate,
  visits,
  type Patient,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/patients")({
  head: () => ({
    meta: [
      { title: "Patients — Meridian Clinic OS" },
      {
        name: "description",
        content:
          "Search the patient register, review medical history, visits, prescriptions and outstanding balances.",
      },
      { property: "og:title", content: "Patients — Meridian Clinic OS" },
      { property: "og:description", content: "Complete patient register and records." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PatientsPage,
});

function PatientsPage() {
  const { loading } = useMockLoading(700);
  const [search, setSearch] = useState("");
  const [doctor, setDoctor] = useState("all");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<Patient | null>(null);

  const rows = useMemo(
    () =>
      patients.filter((p) => {
        const q = search.trim().toLowerCase();
        const matches =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.mrn.toLowerCase().includes(q) ||
          p.phone.includes(q);
        return matches && (doctor === "all" || p.doctor === doctor) && (status === "all" || p.status === status);
      }),
    [search, doctor, status],
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Patients"
          subtitle={`${patients.length} registered · ${patients.filter((p) => p.status === "active").length} active`}
          actions={
            <>
              <Button variant="outline" size="sm">
                <Download className="size-4" /> Export CSV
              </Button>
              <Button size="sm">
                <Plus className="size-4" /> Add patient
              </Button>
            </>
          }
        />

        <SectionCard bodyClassName="p-0">
          <div className="border-b border-border p-4">
            <Toolbar
              search={search}
              onSearch={setSearch}
              placeholder="Search by name, MRN or phone…"
            >
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
                <SelectTrigger className="h-10 w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </Toolbar>
          </div>

          {loading ? (
            <TableSkeleton rows={7} cols={6} />
          ) : rows.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No patients match those filters"
              message="Try a different name, MRN or clear the doctor and status filters."
              actionLabel="Clear filters"
              onAction={() => {
                setSearch("");
                setDoctor("all");
                setStatus("all");
              }}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Patient</th>
                    <th className="px-5 py-3 font-medium">Age / Gender</th>
                    <th className="px-5 py-3 font-medium">Primary doctor</th>
                    <th className="px-5 py-3 font-medium">Last visit</th>
                    <th className="px-5 py-3 text-right font-medium">Balance</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => setSelected(p)}
                      className="cursor-pointer transition-colors hover:bg-secondary/60"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9">
                            <AvatarFallback className="bg-primary-soft text-xs text-accent-foreground">
                              {initials(p.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate font-medium">{p.name}</p>
                            <p className="truncate text-xs text-muted-foreground">
                              {p.mrn} · {p.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        {p.age} · {p.gender}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">{p.doctor}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{prettyDate(p.lastVisit)}</td>
                      <td className="px-5 py-3.5 text-right tabular-nums">
                        {p.balance > 0 ? (
                          <span className="font-medium text-destructive">{inr(p.balance)}</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          {selected ? <PatientDetail patient={selected} /> : null}
        </SheetContent>
      </Sheet>
    </PageTransition>
  );
}

function PatientDetail({ patient }: { patient: Patient }) {
  const pVisits = visits.filter((v) => v.patient === patient.name);
  const pRx = prescriptionsMock.filter((r) => r.patient === patient.name);
  const pLabs = labOrders.filter((l) => l.patient === patient.name);
  const pInv = invoices.filter((i) => i.patient === patient.name);

  return (
    <>
      <SheetHeader>
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarFallback className="bg-primary text-sm text-primary-foreground">
              {initials(patient.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <SheetTitle className="truncate">{patient.name}</SheetTitle>
            <SheetDescription>
              {patient.mrn} · {patient.age} yrs · {patient.gender} · {patient.bloodGroup}
            </SheetDescription>
          </div>
        </div>
      </SheetHeader>

      <div className="space-y-5 px-4 pb-8">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Field label="Phone" value={patient.phone} />
          <Field label="Email" value={patient.email} />
          <Field label="Primary doctor" value={patient.doctor} />
          <Field label="Last visit" value={prettyDate(patient.lastVisit)} />
          <div className="col-span-2">
            <Field label="Address" value={patient.address} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {patient.conditions.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
          {patient.allergies.map((a) => (
            <span
              key={a}
              className="inline-flex items-center rounded-full border border-destructive/25 bg-danger-soft px-2.5 py-0.5 text-xs font-medium text-destructive"
            >
              Allergy: {a}
            </span>
          ))}
        </div>

        <Tabs defaultValue="visits">
          <TabsList className="w-full">
            <TabsTrigger value="visits">Visits</TabsTrigger>
            <TabsTrigger value="rx">Prescriptions</TabsTrigger>
            <TabsTrigger value="labs">Labs</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="visits" className="mt-4 space-y-3">
            {pVisits.length === 0 ? (
              <EmptyState
                icon={UserPlus}
                title="No visits yet"
                message="This patient has no recorded consultations."
              />
            ) : (
              pVisits.map((v) => (
                <div key={v.id} className="card-surface p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{v.reason}</p>
                    <StatusBadge status={v.status} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {prettyDate(v.date)} · {v.doctor}
                  </p>
                  <p className="mt-2 text-sm">{v.diagnosis}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{v.vitals}</p>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="rx" className="mt-4 space-y-3">
            {pRx.length === 0 ? (
              <EmptyState
                icon={UserPlus}
                title="No prescriptions"
                message="Nothing has been prescribed to this patient yet."
              />
            ) : (
              pRx.map((r) => (
                <div key={r.id} className="card-surface flex items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{r.meds} medicines</p>
                    <p className="text-xs text-muted-foreground">
                      {prettyDate(r.date)} · {r.doctor}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="labs" className="mt-4 space-y-3">
            {pLabs.length === 0 ? (
              <EmptyState icon={UserPlus} title="No lab orders" message="No tests ordered yet." />
            ) : (
              pLabs.map((l) => (
                <div key={l.id} className="card-surface p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{l.test}</p>
                    <StatusBadge status={l.status} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {l.id} · ordered {prettyDate(l.ordered)}
                  </p>
                  {l.result ? <p className="mt-2 text-sm">{l.result}</p> : null}
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="billing" className="mt-4 space-y-3">
            {pInv.length === 0 ? (
              <EmptyState icon={UserPlus} title="No invoices" message="Nothing billed yet." />
            ) : (
              pInv.map((i) => (
                <div key={i.id} className="card-surface flex items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{i.id}</p>
                    <p className="text-xs text-muted-foreground">due {prettyDate(i.due)}</p>
                  </div>
                  <p className="text-sm font-medium tabular-nums">{inr(i.amount)}</p>
                  <StatusBadge status={i.status} />
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-medium">{value}</p>
    </div>
  );
}
