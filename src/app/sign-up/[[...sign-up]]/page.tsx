import { SignUp } from "@clerk/nextjs";

import { clerkAppearance } from "@/lib/clerk-appearance";

export default function SignUpPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <SignUp
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
