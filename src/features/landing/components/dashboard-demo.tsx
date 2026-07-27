import Image from "next/image";

export function DashboardDemo() {
  return (
    <div className="relative w-full max-w-4xl">
      <Image
        src="/screenshot.png"
        alt="Dashboard preview"
        width={1200}
        height={675}
        className="w-full rounded-sm shadow-2xl"
        priority
      />
    </div>
  );
}
