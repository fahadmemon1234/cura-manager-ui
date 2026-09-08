import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CircleDollarSign, Plus, Printer, Receipt } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  EmptyState,
  PageHeader,
  PageTransition,
  SectionCard,
  StatCard,
  StatusBadge,
  TableSkeleton,
  Toolbar,
  useMockLoading,
} from "@/components/clinic/primitives";
import { inr, invoices, prettyDate, type Invoice } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/billing")({
  head: () => ({
    meta: [
      { title: "Billing — Meridian Clinic OS" },
      {
        name: "description",
        content:
          "Invoices, payments, outstanding dues and GST-ready billing for every patient visit.",
      },
      { property: "og:title", content: "Billing — Meridian Clinic OS" },
      { property: "og:description", content: "Invoices, collections and outstanding dues." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BillingPage,
});

function BillingPage() {
  const { loading } = useMockLoading(650);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState<Invoice | null>(null);

  const rows = useMemo(
    () =>
      invoices.filter((i) => {
        const q = search.trim().toLowerCase();
        return (
          (!q || i.patient.toLowerCase().includes(q) || i.id.toLowerCase().includes(q)) &&
          (status === "all" || i.status === status)
        );
      }),
    [search, status],
  );

  const billed = invoices.reduce((s, i) => s + i.amount, 0);
  const collected = invoices.reduce((s, i) => s + i.paid, 0);

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Billing"
          subtitle="Invoices, part-payments and outstanding dues"
          actions={
            <>
              <Button variant="outline" size="sm">
                <Printer className="size-4" /> Print statement
              </Button>
              <Button size="sm">
                <Plus className="size-4" /> New invoice
              </Button>
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Billed this month" value={billed} format={inr} icon={Receipt} delta="+6.2%" />
          <StatCard
            label="Collected"
            value={collected}
            format={inr}
            icon={CircleDollarSign}
            delta="+4.8%"
          />
          <StatCard
            label="Outstanding"
            value={billed - collected}
            format={inr}
            icon={Receipt}
            delta="-1.9%"
            hint={`${invoices.filter((i) => i.status !== "paid").length} open invoices`}
          />
        </div>

        <SectionCard bodyClassName="p-0">
          <div className="border-b border-border p-4">
            <Toolbar search={search} onSearch={setSearch} placeholder="Search invoice or patient…">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-10 w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {["all", "paid", "pending", "overdue"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s === "all" ? "All statuses" : s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Toolbar>
          </div>

          {loading ? (
            <TableSkeleton rows={6} cols={6} />
          ) : rows.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="No invoices found"
              message="Try another invoice number or clear the status filter."
              actionLabel="Clear filters"
              onAction={() => {
                setSearch("");
                setStatus("all");
              }}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Invoice</th>
                    <th className="px-5 py-3 font-medium">Patient</th>
                    <th className="px-5 py-3 font-medium">Issued</th>
                    <th className="px-5 py-3 font-medium">Due</th>
                    <th className="px-5 py-3 text-right font-medium">Amount</th>
                    <th className="px-5 py-3 text-right font-medium">Balance</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((i) => (
                    <tr
                      key={i.id}
                      onClick={() => setOpen(i)}
                      className="cursor-pointer transition-colors hover:bg-secondary/60"
                    >
                      <td className="px-5 py-3.5 font-medium">{i.id}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{i.patient}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{prettyDate(i.date)}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{prettyDate(i.due)}</td>
                      <td className="px-5 py-3.5 text-right tabular-nums">{inr(i.amount)}</td>
                      <td className="px-5 py-3.5 text-right tabular-nums">
                        {i.amount - i.paid > 0 ? (
                          <span className="font-medium text-destructive">
                            {inr(i.amount - i.paid)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={i.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="sm:max-w-lg">
          {open ? (
            <>
              <DialogHeader>
                <DialogTitle>{open.id}</DialogTitle>
                <DialogDescription>
                  {open.patient} · issued {prettyDate(open.date)} · due {prettyDate(open.due)}
                </DialogDescription>
              </DialogHeader>
              <ul className="divide-y divide-border rounded-lg border border-border">
                {open.items.map((it) => (
                  <li key={it.label} className="flex items-center gap-3 px-4 py-3 text-sm">
                    <span className="min-w-0 flex-1 truncate">{it.label}</span>
                    <span className="text-muted-foreground">×{it.qty}</span>
                    <span className="tabular-nums">{inr(it.rate * it.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-1.5 text-sm">
                <Row label="Subtotal" value={inr(open.amount)} />
                <Row label="Paid" value={inr(open.paid)} />
                <div className="flex items-center justify-between border-t border-border pt-2 text-base font-semibold">
                  <span>Balance due</span>
                  <span className="tabular-nums">{inr(open.amount - open.paid)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Record payment</Button>
                <Button variant="outline" className="flex-1">
                  <Printer className="size-4" /> Print
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="tabular-nums text-foreground">{value}</span>
    </div>
  );
}
