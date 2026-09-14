import { DemoHeader } from "@/features/dashboard/components/demo-header";
import { TextInputPanel } from "@/features/dashboard/components/text-input-panel";
import { QuickActionsPanel } from "@/features/dashboard/components/quick-actions-panel";

export default function DemoPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-5">
        <DemoHeader />
        <TextInputPanel />
        <QuickActionsPanel />
      </div>
    </div>
  );
}
