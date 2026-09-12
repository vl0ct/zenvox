import { SignIn } from "@clerk/nextjs";

import { clerkAppearance } from "@/lib/clerk-appearance";

export default function SignInPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <SignIn
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
