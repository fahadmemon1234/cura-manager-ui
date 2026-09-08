# Clinic Flow

Lovable Prompt — Clinic Management System (Premium UI First)

Copy this into Lovable to build the frontend/UI first, with mock data. Backend (Neon Postgres, real auth) gets connected after the UI is approved.

Project Brief

Build a premium, enterprise-grade Clinic Management System web app UI. This is a SaaS dashboard clinics use to manage patients, appointments, billing, prescriptions, lab orders, inventory, and staff. The bar is: it should look and feel like a funded healthcare SaaS product (think Practo's dashboard polish, or Linear's UI craft applied to healthcare) — not a generic admin template.

For this stage, build the full UI with realistic mock/dummy data. No real backend or database yet — just clean component structure with props/mock data so real data can be wired in later.

Tech Stack (Lovable defaults)

React + Vite + TypeScript

Tailwind CSS

shadcn/ui as the base component library, customized to match the design direction below (don't leave it looking like default shadcn)

Framer Motion for animations and transitions

Recharts for dashboard charts

React Router for navigation between screens

Design Direction — Premium Healthcare SaaS

Palette: neutral off-white/slate background (#F8FAFC light / deep slate #0B1220 dark), one confident primary accent — deep teal or indigo blue — used sparingly and deliberately, not on everything. Status colors: amber for pending, emerald for completed, red for overdue/critical.

Typography: Inter or Geist. Strong hierarchy — large confident headings, comfortable body text, generous line-height on data-dense tables.

Cards: soft shadows, 12–16px radius, subtle 1px border in low-contrast slate — not flat, not overly skeuomorphic.

Sidebar: collapsible, icon + label, active state with a subtle left accent bar, grouped sections (Clinical, Financial, Operations, Admin).

Topbar: global search, notification bell with badge, clinic switcher (for multi-clinic support later), user avatar menu.

Motion: page transitions (fade + slight slide) on route change, staggered fade-in for list items and dashboard cards on load, animated number count-up on KPI cards, smooth accordion/dialog open-close, skeleton loaders (not spinners) while "loading" mock data.

Empty states: every list/table needs a designed empty state with an icon, short message, and a call-to-action — not a blank white box.

Dark mode: fully supported from the start, toggle in the topbar.

Responsive: full desktop dashboard experience; on tablet/mobile, sidebar collapses to a drawer and tables become stacked cards.

Screens to Build

1. Auth

Login screen — split layout, clinic branding on one side, form on the other. Clean, minimal, no default browser-form look.

2. Dashboard (Clinic Dashboard Management)

KPI row: today's appointments, today's revenue, pending bills, active patients, bed occupancy (if IPD toggled on).

Revenue trend chart (last 30 days), appointments-by-status donut chart.

Recent activity feed (new patient registered, invoice paid, lab result uploaded).

Quick action buttons: New Patient, New Appointment, New Invoice.

3. Patients (Clinic Patients Management)

List view: searchable, filterable (by status, last visit, doctor), paginated table with avatar, name, phone, last visit, status badge.

Patient profile page: tabs for Overview, Visit History, Prescriptions, Lab Orders, Billing, Documents. Header with patient photo, key info, and quick actions.

4. Appointments (Appointment Scheduling)

Calendar view — day/week/month toggle, color-coded by doctor or status, drag-to-reschedule interaction.

New appointment modal with patient search, doctor select, time slot picker showing availability.

5. Visits (Visit Tracking)

Timeline-style view per patient and a clinic-wide visit log with filters by doctor, date range, and status.

6. Billing & Invoicing

Invoice list with status badges (Paid, Pending, Overdue), filters, and totals summary bar at top.

Invoice detail/print view — clean, professional invoice layout with clinic branding, line items, totals, payment status.

7. Expense Tracking

Expense entry form, approval status pipeline (Pending → Approved → Paid), budget vs actual comparison chart.

8. Electronic Prescriptions

Prescription builder: search medicine, add dosage/frequency/duration, live preview of the prescription as it's built.

9. Treatment Plans

Plan builder with steps/phases, estimated cost and duration per phase, and a package-pricing summary card.

10. Clinic Lab Orders

Order list with status pipeline (Ordered → In Progress → Completed), result upload/view, linked to patient and consultation.

11. Inventory Management

Stock table with quantity, reorder threshold, expiry date, low-stock/expiry visual indicators (badge or row highlight).

12. Clinic Reporting System

Report dashboard with tabs for Visits, Billing, Pharmacy — each with filterable charts and an export button.

13. Multi-User Access

User list with role badges, invite-user modal, permission matrix view (roles vs modules).

14. In-Patient (IPD) Module

Ward/bed occupancy grid (visual bed map), admission form, per-patient daily notes timeline, discharge summary generator.

15. Task Management

Kanban-style board (To Do / In Progress / Done) for staff tasks, assignable to users, optionally linked to a patient.

16. Workflow Automation

Rule builder UI: "When [trigger] happens, do [action]" — visual, dropdown-based, with a list of active/inactive rules.

17. Settings

Tabs: Clinic Profile & Branding, Roles & Permissions, Tax & Billing Rules, Communication Templates, Printing Preferences.

18. Backups & SMS Alerts

Backups: list of backup snapshots with date/size, "Create Backup Now" button, restore action with confirmation dialog.

SMS Alerts: template list (Appointment Reminder, Payment Due, etc.), delivery log table with status.

Build Instructions for Lovable

Start with the design system: color tokens, typography scale, and the dashboard shell (sidebar + topbar + content area) before building individual screens — every screen should visibly share the same design language.

Build screens in this order: Login → Dashboard shell + KPIs → Patients (list + profile) → Appointments → Billing → then the remaining modules.

Use realistic mock data (real-sounding patient names, dates, amounts) — not "Lorem ipsum" or "Item 1, Item 2."

Every table/list needs: search, filter, empty state, and loading skeleton — even with mock data, wire up the loading/empty states so they're visible on demand.

Keep components modular and typed with clear props, so swapping mock data for real API calls later is a drop-in change, not a rewrite.

After each screen, show a quick preview and short summary before moving to the next one.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c84c8caa-22f8-4b9b-8a07-459620a17d30).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
