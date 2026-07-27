import { WavyBackground } from "@/components/ui/wavy-background";

export function HeroPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      <WavyBackground
        colors={["#8BA888", "#A3B89A", "#B8C9A8", "#6B8F5E"]}
        backgroundFill="hsl(0 0% 100%)"
        blur={3}
        speed="slow"
        waveOpacity={0.08}
        waveWidth={60}
        waveYOffset={250}
        containerClassName="h-full"
        className="hidden"
      />
    </div>
  );
}
