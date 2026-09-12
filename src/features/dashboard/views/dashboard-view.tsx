import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { UsageMetrics } from "@/features/dashboard/components/usage-metrics";
import { TextInputPanel } from "@/features/dashboard/components/text-input-panel";
import { QuickActionsPanel } from "@/features/dashboard/components/quick-actions-panel";

export function DashboardView() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-5">
        <DashboardHeader />
        {/*<UsageMetrics />*/}
        <TextInputPanel />
        <QuickActionsPanel />
      </div>
    </div>
  );
}
