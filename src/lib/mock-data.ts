/**
 * Mock data layer. Every screen reads from typed collections here, so wiring a
 * real API later is a drop-in swap (same shapes, same prop contracts).
 */

export type Status =
  | "completed"
  | "pending"
  | "overdue"
  | "active"
  | "inactive"
  | "cancelled"
  | "in-progress"
  | "ordered"
  | "paid"
  | "approved"
  | "scheduled";

export type Patient = {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  phone: string;
  email: string;
  bloodGroup: string;
  address: string;
  doctor: string;
  lastVisit: string;
  status: "active" | "inactive";
  allergies: string[];
  conditions: string[];
  balance: number;
};

export type Doctor = { id: string; name: string; specialty: string; color: string };

export type Appointment = {
  id: string;
  patient: string;
  patientId: string;
  doctor: string;
  date: string;
  start: string;
  end: string;
  type: "Consultation" | "Follow-up" | "Procedure" | "Teleconsult";
  status: "scheduled" | "completed" | "cancelled" | "pending";
};

export type Invoice = {
  id: string;
  patient: string;
  date: string;
  due: string;
  amount: number;
  paid: number;
  status: "paid" | "pending" | "overdue";
  items: { label: string; qty: number; rate: number }[];
};

export const clinics = [
  { id: "c1", name: "Meridian Health — Bandra", city: "Mumbai" },
  { id: "c2", name: "Meridian Health — Powai", city: "Mumbai" },
  { id: "c3", name: "Meridian Dental Studio", city: "Pune" },
];

export const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Aisha Nourani", specialty: "General Medicine", color: "chart-1" },
  { id: "d2", name: "Dr. Marcus Feld", specialty: "Cardiology", color: "chart-4" },
  { id: "d3", name: "Dr. Priya Raghavan", specialty: "Pediatrics", color: "chart-2" },
  { id: "d4", name: "Dr. Samuel Okafor", specialty: "Orthopaedics", color: "chart-3" },
];

export const patients: Patient[] = [
  {
    id: "p1",
    mrn: "MRN-10482",
    name: "Rohan Mehta",
    age: 34,
    gender: "Male",
    phone: "+91 98204 11872",
    email: "rohan.mehta@gmail.com",
    bloodGroup: "O+",
    address: "12 Carter Road, Bandra West, Mumbai",
    doctor: "Dr. Aisha Nourani",
    lastVisit: "2026-09-04",
    status: "active",
    allergies: ["Penicillin"],
    conditions: ["Hypertension"],
    balance: 2400,
  },
  {
    id: "p2",
    mrn: "MRN-10483",
    name: "Elena Rodriguez",
    age: 41,
    gender: "Female",
    phone: "+91 99303 88120",
    email: "elena.r@outlook.com",
    bloodGroup: "A-",
    address: "804 Hiranandani Gardens, Powai",
    doctor: "Dr. Marcus Feld",
    lastVisit: "2026-09-02",
    status: "active",
    allergies: [],
    conditions: ["Type 2 Diabetes", "Dyslipidemia"],
    balance: 0,
  },
  {
    id: "p3",
    mrn: "MRN-10488",
    name: "Aarav Sharma",
    age: 7,
    gender: "Male",
    phone: "+91 98675 20014",
    email: "sharma.family@gmail.com",
    bloodGroup: "B+",
    address: "27 Pali Hill, Bandra",
    doctor: "Dr. Priya Raghavan",
    lastVisit: "2026-08-29",
    status: "active",
    allergies: ["Dust mite"],
    conditions: ["Asthma"],
    balance: 850,
  },
  {
    id: "p4",
    mrn: "MRN-10491",
    name: "Fatima Qureshi",
    age: 58,
    gender: "Female",
    phone: "+91 97690 45521",
    email: "fatima.q@yahoo.com",
    bloodGroup: "AB+",
    address: "5 Juhu Tara Road, Mumbai",
    doctor: "Dr. Samuel Okafor",
    lastVisit: "2026-08-21",
    status: "active",
    allergies: ["Sulfa drugs"],
    conditions: ["Osteoarthritis"],
    balance: 12600,
  },
  {
    id: "p5",
    mrn: "MRN-10502",
    name: "Daniel Okonkwo",
    age: 29,
    gender: "Male",
    phone: "+91 90042 71190",
    email: "d.okonkwo@proton.me",
    bloodGroup: "O-",
    address: "19 Chapel Road, Bandra",
    doctor: "Dr. Aisha Nourani",
    lastVisit: "2026-07-14",
    status: "inactive",
    allergies: [],
    conditions: [],
    balance: 0,
  },
  {
    id: "p6",
    mrn: "MRN-10510",
    name: "Meera Iyer",
    age: 46,
    gender: "Female",
    phone: "+91 98110 33429",
    email: "meera.iyer@gmail.com",
    bloodGroup: "A+",
    address: "302 Kalpataru Heights, Worli",
    doctor: "Dr. Marcus Feld",
    lastVisit: "2026-09-05",
    status: "active",
    allergies: ["Latex"],
    conditions: ["Atrial fibrillation"],
    balance: 5400,
  },
  {
    id: "p7",
    mrn: "MRN-10517",
    name: "Thomas Bergström",
    age: 62,
    gender: "Male",
    phone: "+91 88790 12043",
    email: "t.bergstrom@mail.com",
    bloodGroup: "B-",
    address: "Sea Breeze Apartments, Versova",
    doctor: "Dr. Samuel Okafor",
    lastVisit: "2026-09-01",
    status: "active",
    allergies: [],
    conditions: ["Lumbar spondylosis"],
    balance: 3100,
  },
  {
    id: "p8",
    mrn: "MRN-10522",
    name: "Sana Kapoor",
    age: 22,
    gender: "Female",
    phone: "+91 99871 60034",
    email: "sana.kapoor@gmail.com",
    bloodGroup: "O+",
    address: "44 Linking Road, Khar",
    doctor: "Dr. Priya Raghavan",
    lastVisit: "2026-08-30",
    status: "active",
    allergies: [],
    conditions: ["Iron deficiency anaemia"],
    balance: 0,
  },
];

export const appointments: Appointment[] = [
  { id: "a1", patient: "Rohan Mehta", patientId: "p1", doctor: "Dr. Aisha Nourani", date: "2026-09-07", start: "09:00", end: "09:30", type: "Follow-up", status: "completed" },
  { id: "a2", patient: "Meera Iyer", patientId: "p6", doctor: "Dr. Marcus Feld", date: "2026-09-07", start: "09:30", end: "10:15", type: "Consultation", status: "completed" },
  { id: "a3", patient: "Aarav Sharma", patientId: "p3", doctor: "Dr. Priya Raghavan", date: "2026-09-07", start: "10:30", end: "11:00", type: "Follow-up", status: "scheduled" },
  { id: "a4", patient: "Fatima Qureshi", patientId: "p4", doctor: "Dr. Samuel Okafor", date: "2026-09-07", start: "11:15", end: "12:00", type: "Procedure", status: "scheduled" },
  { id: "a5", patient: "Sana Kapoor", patientId: "p8", doctor: "Dr. Priya Raghavan", date: "2026-09-07", start: "12:00", end: "12:30", type: "Teleconsult", status: "pending" },
  { id: "a6", patient: "Elena Rodriguez", patientId: "p2", doctor: "Dr. Marcus Feld", date: "2026-09-07", start: "14:00", end: "14:45", type: "Consultation", status: "scheduled" },
  { id: "a7", patient: "Thomas Bergström", patientId: "p7", doctor: "Dr. Samuel Okafor", date: "2026-09-07", start: "15:00", end: "15:30", type: "Follow-up", status: "cancelled" },
  { id: "a8", patient: "Daniel Okonkwo", patientId: "p5", doctor: "Dr. Aisha Nourani", date: "2026-09-07", start: "16:00", end: "16:30", type: "Consultation", status: "scheduled" },
  { id: "a9", patient: "Rohan Mehta", patientId: "p1", doctor: "Dr. Aisha Nourani", date: "2026-09-08", start: "09:00", end: "09:30", type: "Follow-up", status: "scheduled" },
  { id: "a10", patient: "Meera Iyer", patientId: "p6", doctor: "Dr. Marcus Feld", date: "2026-09-09", start: "11:00", end: "11:45", type: "Procedure", status: "scheduled" },
];

export const invoices: Invoice[] = [
  {
    id: "INV-2026-0841",
    patient: "Rohan Mehta",
    date: "2026-09-04",
    due: "2026-09-11",
    amount: 2400,
    paid: 0,
    status: "pending",
    items: [
      { label: "Consultation — General Medicine", qty: 1, rate: 900 },
      { label: "Lipid profile", qty: 1, rate: 1100 },
      { label: "ECG", qty: 1, rate: 400 },
    ],
  },
  {
    id: "INV-2026-0838",
    patient: "Meera Iyer",
    date: "2026-09-02",
    due: "2026-09-09",
    amount: 5400,
    paid: 5400,
    status: "paid",
    items: [
      { label: "Cardiology consultation", qty: 1, rate: 1500 },
      { label: "2D Echo", qty: 1, rate: 3200 },
      { label: "Nursing charges", qty: 1, rate: 700 },
    ],
  },
  {
    id: "INV-2026-0812",
    patient: "Fatima Qureshi",
    date: "2026-08-21",
    due: "2026-08-28",
    amount: 12600,
    paid: 4000,
    status: "overdue",
    items: [
      { label: "Knee arthroscopy — day care", qty: 1, rate: 9800 },
      { label: "Physiotherapy session", qty: 4, rate: 700 },
    ],
  },
  {
    id: "INV-2026-0829",
    patient: "Aarav Sharma",
    date: "2026-08-29",
    due: "2026-09-05",
    amount: 850,
    paid: 0,
    status: "overdue",
    items: [{ label: "Pediatric follow-up", qty: 1, rate: 850 }],
  },
  {
    id: "INV-2026-0844",
    patient: "Thomas Bergström",
    date: "2026-09-01",
    due: "2026-09-08",
    amount: 3100,
    paid: 3100,
    status: "paid",
    items: [
      { label: "Orthopaedic consultation", qty: 1, rate: 1200 },
      { label: "Lumbar X-ray (2 views)", qty: 1, rate: 1900 },
    ],
  },
];

export const revenueTrend = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(2026, 7, 9 + i);
  const base = 38000 + Math.sin(i / 2.4) * 9000 + (i % 7 === 0 ? -12000 : 0);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
    revenue: Math.round(base + (i % 3) * 2400),
    collected: Math.round((base + (i % 3) * 2400) * 0.86),
  };
});

export const appointmentsByStatus = [
  { name: "Completed", value: 42, color: "var(--color-chart-2)" },
  { name: "Scheduled", value: 27, color: "var(--color-chart-1)" },
  { name: "Pending", value: 11, color: "var(--color-chart-3)" },
  { name: "Cancelled", value: 6, color: "var(--color-chart-5)" },
];

export const activityFeed = [
  { id: "f1", type: "patient", text: "New patient registered — Sana Kapoor (MRN-10522)", time: "6 min ago" },
  { id: "f2", type: "invoice", text: "Invoice INV-2026-0838 paid — ₹5,400 by Meera Iyer", time: "24 min ago" },
  { id: "f3", type: "lab", text: "Lab result uploaded — CBC for Aarav Sharma", time: "1 hr ago" },
  { id: "f4", type: "appointment", text: "Appointment rescheduled — Thomas Bergström → 9 Sep, 3:00 PM", time: "2 hrs ago" },
  { id: "f5", type: "prescription", text: "E-prescription issued — Rohan Mehta by Dr. Aisha Nourani", time: "3 hrs ago" },
  { id: "f6", type: "inventory", text: "Low stock alert — Amoxicillin 500mg (12 units left)", time: "4 hrs ago" },
];

export const visits = [
  { id: "v1", patient: "Rohan Mehta", patientId: "p1", doctor: "Dr. Aisha Nourani", date: "2026-09-04", reason: "Blood pressure review", diagnosis: "Essential hypertension, controlled", status: "completed" as const, vitals: "BP 128/82 · HR 74 · 78 kg" },
  { id: "v2", patient: "Meera Iyer", patientId: "p6", doctor: "Dr. Marcus Feld", date: "2026-09-02", reason: "Palpitations", diagnosis: "Paroxysmal atrial fibrillation", status: "completed" as const, vitals: "BP 134/86 · HR 96 · 64 kg" },
  { id: "v3", patient: "Aarav Sharma", patientId: "p3", doctor: "Dr. Priya Raghavan", date: "2026-08-29", reason: "Night-time cough", diagnosis: "Mild persistent asthma", status: "completed" as const, vitals: "SpO2 98% · HR 102 · 22 kg" },
  { id: "v4", patient: "Fatima Qureshi", patientId: "p4", doctor: "Dr. Samuel Okafor", date: "2026-08-21", reason: "Right knee pain", diagnosis: "Grade III osteoarthritis", status: "completed" as const, vitals: "BP 142/88 · 81 kg" },
  { id: "v5", patient: "Sana Kapoor", patientId: "p8", doctor: "Dr. Priya Raghavan", date: "2026-08-30", reason: "Fatigue, dizziness", diagnosis: "Iron deficiency anaemia", status: "in-progress" as const, vitals: "Hb 9.4 · HR 88 · 51 kg" },
];

export const prescriptionsMock = [
  { id: "rx1", patient: "Rohan Mehta", doctor: "Dr. Aisha Nourani", date: "2026-09-04", meds: 3, status: "completed" as const },
  { id: "rx2", patient: "Aarav Sharma", doctor: "Dr. Priya Raghavan", date: "2026-08-29", meds: 2, status: "completed" as const },
  { id: "rx3", patient: "Sana Kapoor", doctor: "Dr. Priya Raghavan", date: "2026-08-30", meds: 2, status: "pending" as const },
];

export const medicines = [
  { id: "m1", name: "Amlodipine 5mg", form: "Tablet" },
  { id: "m2", name: "Telmisartan 40mg", form: "Tablet" },
  { id: "m3", name: "Metformin 500mg", form: "Tablet" },
  { id: "m4", name: "Amoxicillin 500mg", form: "Capsule" },
  { id: "m5", name: "Salbutamol inhaler", form: "Inhaler" },
  { id: "m6", name: "Ferrous ascorbate 100mg", form: "Tablet" },
  { id: "m7", name: "Paracetamol 650mg", form: "Tablet" },
  { id: "m8", name: "Pantoprazole 40mg", form: "Tablet" },
];

export const labOrders = [
  { id: "LAB-3391", patient: "Rohan Mehta", test: "Lipid profile", doctor: "Dr. Aisha Nourani", ordered: "2026-09-04", status: "completed" as const, result: "Total cholesterol 214 mg/dL (borderline high)" },
  { id: "LAB-3396", patient: "Sana Kapoor", test: "CBC + Ferritin", doctor: "Dr. Priya Raghavan", ordered: "2026-09-05", status: "in-progress" as const, result: "" },
  { id: "LAB-3402", patient: "Meera Iyer", test: "Thyroid profile", doctor: "Dr. Marcus Feld", ordered: "2026-09-06", status: "ordered" as const, result: "" },
  { id: "LAB-3405", patient: "Aarav Sharma", test: "Allergy panel (inhalant)", doctor: "Dr. Priya Raghavan", ordered: "2026-09-06", status: "ordered" as const, result: "" },
  { id: "LAB-3388", patient: "Fatima Qureshi", test: "Vitamin D, B12", doctor: "Dr. Samuel Okafor", ordered: "2026-08-30", status: "completed" as const, result: "Vitamin D 14 ng/mL (deficient)" },
];

export const inventory = [
  { id: "i1", name: "Amoxicillin 500mg", category: "Antibiotic", qty: 12, threshold: 40, expiry: "2027-02-28", unit: "caps", price: 9 },
  { id: "i2", name: "Paracetamol 650mg", category: "Analgesic", qty: 480, threshold: 100, expiry: "2027-11-30", unit: "tabs", price: 2 },
  { id: "i3", name: "Salbutamol inhaler", category: "Respiratory", qty: 26, threshold: 15, expiry: "2026-10-15", unit: "units", price: 210 },
  { id: "i4", name: "Surgical gloves (M)", category: "Consumable", qty: 8, threshold: 25, expiry: "2028-01-31", unit: "boxes", price: 340 },
  { id: "i5", name: "Insulin glargine", category: "Endocrine", qty: 34, threshold: 20, expiry: "2026-09-25", unit: "pens", price: 780 },
  { id: "i6", name: "Ferrous ascorbate 100mg", category: "Haematinic", qty: 210, threshold: 60, expiry: "2027-06-30", unit: "tabs", price: 7 },
];

export const expenses = [
  { id: "e1", label: "Medical oxygen refill", vendor: "AirMed Gases", category: "Clinical supplies", amount: 18400, date: "2026-09-03", status: "approved" as const },
  { id: "e2", label: "Reception AC servicing", vendor: "CoolCare Services", category: "Facilities", amount: 4200, date: "2026-09-02", status: "paid" as const },
  { id: "e3", label: "Pharmacy restock — antibiotics", vendor: "Medilink Distributors", category: "Pharmacy", amount: 62500, date: "2026-09-01", status: "pending" as const },
  { id: "e4", label: "Front-desk staff uniforms", vendor: "Threadline", category: "Admin", amount: 9800, date: "2026-08-28", status: "paid" as const },
  { id: "e5", label: "Biomedical waste disposal", vendor: "EcoSafe Disposal", category: "Compliance", amount: 7600, date: "2026-08-26", status: "approved" as const },
];

export const budgetVsActual = [
  { category: "Pharmacy", budget: 80000, actual: 62500 },
  { category: "Facilities", budget: 20000, actual: 24200 },
  { category: "Clinical", budget: 30000, actual: 18400 },
  { category: "Admin", budget: 15000, actual: 9800 },
  { category: "Compliance", budget: 10000, actual: 7600 },
];

export const treatmentPlans = [
  {
    id: "tp1",
    patient: "Fatima Qureshi",
    title: "Knee osteoarthritis — 12 week programme",
    phases: [
      { name: "Assessment & imaging", duration: "Week 1", cost: 4200 },
      { name: "Intra-articular injections", duration: "Week 2–4", cost: 14500 },
      { name: "Supervised physiotherapy", duration: "Week 4–10", cost: 11200 },
      { name: "Review & maintenance plan", duration: "Week 12", cost: 1800 },
    ],
    packagePrice: 28900,
  },
  {
    id: "tp2",
    patient: "Elena Rodriguez",
    title: "Diabetes reversal programme",
    phases: [
      { name: "Baseline panel + dietitian", duration: "Week 1", cost: 5600 },
      { name: "Monthly monitoring", duration: "Month 1–3", cost: 9600 },
      { name: "Quarterly review", duration: "Month 3", cost: 2400 },
    ],
    packagePrice: 16200,
  },
];

export const users = [
  { id: "u1", name: "Dr. Aisha Nourani", email: "aisha@meridianhealth.in", role: "Doctor", status: "active" as const, lastActive: "2 min ago" },
  { id: "u2", name: "Nikhil Bansal", email: "nikhil@meridianhealth.in", role: "Admin", status: "active" as const, lastActive: "18 min ago" },
  { id: "u3", name: "Grace Fernandes", email: "grace@meridianhealth.in", role: "Receptionist", status: "active" as const, lastActive: "1 hr ago" },
  { id: "u4", name: "Dr. Marcus Feld", email: "marcus@meridianhealth.in", role: "Doctor", status: "active" as const, lastActive: "3 hrs ago" },
  { id: "u5", name: "Rita Dsouza", email: "rita@meridianhealth.in", role: "Pharmacist", status: "inactive" as const, lastActive: "12 days ago" },
  { id: "u6", name: "Ashok Menon", email: "ashok@meridianhealth.in", role: "Accountant", status: "active" as const, lastActive: "yesterday" },
];

export const roles = ["Admin", "Doctor", "Receptionist", "Pharmacist", "Accountant"] as const;
export const modules = ["Patients", "Appointments", "Billing", "Prescriptions", "Lab", "Inventory", "Reports", "Settings"] as const;
export const permissionMatrix: Record<string, Record<string, "full" | "read" | "none">> = {
  Admin: { Patients: "full", Appointments: "full", Billing: "full", Prescriptions: "full", Lab: "full", Inventory: "full", Reports: "full", Settings: "full" },
  Doctor: { Patients: "full", Appointments: "full", Billing: "read", Prescriptions: "full", Lab: "full", Inventory: "read", Reports: "read", Settings: "none" },
  Receptionist: { Patients: "full", Appointments: "full", Billing: "full", Prescriptions: "none", Lab: "read", Inventory: "none", Reports: "none", Settings: "none" },
  Pharmacist: { Patients: "read", Appointments: "none", Billing: "read", Prescriptions: "read", Lab: "none", Inventory: "full", Reports: "read", Settings: "none" },
  Accountant: { Patients: "read", Appointments: "read", Billing: "full", Prescriptions: "none", Lab: "none", Inventory: "read", Reports: "full", Settings: "none" },
};

export const wards = [
  {
    id: "w1",
    name: "General Ward A",
    beds: [
      { id: "A-01", patient: "Fatima Qureshi", status: "occupied" as const, since: "2026-09-05" },
      { id: "A-02", patient: null, status: "available" as const, since: null },
      { id: "A-03", patient: "Thomas Bergström", status: "occupied" as const, since: "2026-09-06" },
      { id: "A-04", patient: null, status: "cleaning" as const, since: null },
      { id: "A-05", patient: null, status: "available" as const, since: null },
      { id: "A-06", patient: "Rohan Mehta", status: "occupied" as const, since: "2026-09-07" },
    ],
  },
  {
    id: "w2",
    name: "ICU",
    beds: [
      { id: "ICU-1", patient: "Meera Iyer", status: "occupied" as const, since: "2026-09-06" },
      { id: "ICU-2", patient: null, status: "available" as const, since: null },
      { id: "ICU-3", patient: null, status: "reserved" as const, since: null },
    ],
  },
  {
    id: "w3",
    name: "Private Rooms",
    beds: [
      { id: "P-101", patient: "Elena Rodriguez", status: "occupied" as const, since: "2026-09-04" },
      { id: "P-102", patient: null, status: "available" as const, since: null },
      { id: "P-103", patient: null, status: "available" as const, since: null },
    ],
  },
];

export const ipdNotes = [
  { id: "n1", time: "2026-09-07 08:10", author: "Nurse Grace F.", note: "Vitals stable. BP 132/84, temp 98.4°F. Tolerating oral intake." },
  { id: "n2", time: "2026-09-06 21:40", author: "Dr. Samuel Okafor", note: "Post-op day 1 review. Wound dry, no discharge. Continue analgesia, start mobilisation tomorrow." },
  { id: "n3", time: "2026-09-06 14:05", author: "Physio Rahul K.", note: "Passive range-of-motion exercises started, tolerated well up to 40° flexion." },
];

export const tasks = [
  { id: "t1", title: "Call Fatima Qureshi about overdue invoice", assignee: "Ashok Menon", patient: "Fatima Qureshi", priority: "high" as const, column: "todo" as const },
  { id: "t2", title: "Order Amoxicillin restock", assignee: "Rita Dsouza", patient: null, priority: "high" as const, column: "todo" as const },
  { id: "t3", title: "Upload Aarav's allergy panel results", assignee: "Grace Fernandes", patient: "Aarav Sharma", priority: "medium" as const, column: "in-progress" as const },
  { id: "t4", title: "Prepare monthly pharmacy report", assignee: "Rita Dsouza", patient: null, priority: "low" as const, column: "in-progress" as const },
  { id: "t5", title: "Confirm tomorrow's teleconsults", assignee: "Grace Fernandes", patient: null, priority: "medium" as const, column: "done" as const },
  { id: "t6", title: "Discharge summary — Meera Iyer", assignee: "Dr. Marcus Feld", patient: "Meera Iyer", priority: "high" as const, column: "done" as const },
];

export const automationRules = [
  { id: "r1", name: "Appointment reminder", trigger: "Appointment is 24 hours away", action: "Send SMS reminder to patient", active: true, runs: 1284 },
  { id: "r2", name: "Overdue invoice nudge", trigger: "Invoice becomes overdue", action: "Send payment-due SMS + notify accountant", active: true, runs: 216 },
  { id: "r3", name: "Low stock purchase order", trigger: "Stock falls below reorder level", action: "Create task for pharmacist", active: true, runs: 47 },
  { id: "r4", name: "Lab result ready", trigger: "Lab result is uploaded", action: "Notify ordering doctor", active: false, runs: 0 },
];

export const backups = [
  { id: "b1", date: "2026-09-07 03:00", size: "1.8 GB", type: "Automatic", status: "completed" as const },
  { id: "b2", date: "2026-09-06 03:00", size: "1.8 GB", type: "Automatic", status: "completed" as const },
  { id: "b3", date: "2026-09-05 16:22", size: "1.7 GB", type: "Manual", status: "completed" as const },
  { id: "b4", date: "2026-09-05 03:00", size: "1.7 GB", type: "Automatic", status: "completed" as const },
];

export const smsTemplates = [
  { id: "s1", name: "Appointment reminder", body: "Hi {{patient}}, reminder of your appointment with {{doctor}} on {{date}} at {{time}}. — Meridian Health", active: true },
  { id: "s2", name: "Payment due", body: "Hi {{patient}}, invoice {{invoice}} of ₹{{amount}} is due on {{due_date}}. Pay here: {{link}}", active: true },
  { id: "s3", name: "Lab result ready", body: "Hi {{patient}}, your {{test}} report is ready for collection at Meridian Health.", active: true },
  { id: "s4", name: "Birthday wish", body: "Happy birthday {{patient}}! Wishing you a healthy year ahead. — Meridian Health", active: false },
];

export const smsLog = [
  { id: "l1", to: "+91 98204 11872", patient: "Rohan Mehta", template: "Appointment reminder", sent: "2026-09-06 18:00", status: "completed" as const },
  { id: "l2", to: "+91 97690 45521", patient: "Fatima Qureshi", template: "Payment due", sent: "2026-09-06 10:15", status: "completed" as const },
  { id: "l3", to: "+91 98675 20014", patient: "Aarav Sharma", template: "Lab result ready", sent: "2026-09-05 17:40", status: "pending" as const },
  { id: "l4", to: "+91 88790 12043", patient: "Thomas Bergström", template: "Appointment reminder", sent: "2026-09-05 18:00", status: "overdue" as const },
];

export const reportVisits = [
  { month: "Apr", opd: 640, ipd: 48 },
  { month: "May", opd: 712, ipd: 55 },
  { month: "Jun", opd: 688, ipd: 41 },
  { month: "Jul", opd: 754, ipd: 62 },
  { month: "Aug", opd: 812, ipd: 58 },
  { month: "Sep", opd: 296, ipd: 21 },
];

export const reportPharmacy = [
  { name: "Antibiotics", sales: 184000 },
  { name: "Analgesics", sales: 96000 },
  { name: "Respiratory", sales: 74000 },
  { name: "Endocrine", sales: 142000 },
  { name: "Consumables", sales: 61000 },
];

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const prettyDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
