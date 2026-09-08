import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/clinic/AppShell";

export const Route = createFileRoute("/_shell")({
  component: AppShell,
});
