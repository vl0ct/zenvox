import { OrganizationList } from "@clerk/nextjs";

import { clerkAppearance } from "@/lib/clerk-appearance";

export default function OrgSelectionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F8F2]">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
        appearance={{
          ...clerkAppearance,
          elements: {
            ...clerkAppearance.elements,
            rootBox: "mx-auto",
          },
        }}
      />
    </div>
  );
}
