import { LandingNav } from "@/features/landing/components/nav";
import { Hero02 } from "@/features/landing/components/hero-02";
import { Content01 } from "@/features/landing/components/content-01";
import { Cta01 } from "@/features/landing/components/cta-01";
import { LandingFooter } from "@/features/landing/components/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />
      <main className="flex-1">
        <Hero02
          title="Turn text into"
          titleLine2="lifelike speech."
          description="Create studio-quality voiceovers in seconds. Choose from hundreds of expressive voices or clone your own. No recording studio required."
          washImage="https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=1144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          animation="subtle"
          primaryCTA={{
            ctaEnabled: true,
            text: "Go to dashboard",
            link: "/dashboard",
            variant: "default",
            size: "lg",
          }}
        />
        <Content01
          variant="standard"
          animation="subtle"
          items={[
            {
              id: "1",
              title: "Lifelike voices",
              description:
                "Hundreds of natural-sounding voices across languages and accents. Each one tuned for clarity, emotion, and authenticity.",
              media: {
                src: "https://images.unsplash.com/photo-1695152560286-b09a744834e1?q=80&w=1133&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Lifelike voices",
              },
            },
            {
              id: "2",
              title: "Voice cloning",
              description:
                "Clone any voice with just a few minutes of audio. Perfect for consistent branding, characters, or personal projects.",
              media: {
                src: "https://images.unsplash.com/photo-1683143724745-d66cf5ea5ce7?q=80&w=1202&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Voice cloning",
              },
            },
            {
              id: "3",
              title: "Expressive control",
              description:
                "Fine-tune tone, speed, and emphasis with precision. Every word sounds exactly the way you want it to.",
              media: {
                src: "https://images.unsplash.com/photo-1577083862054-7324cd025fa6?q=80&w=1241&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Expressive control",
              },
            },
            {
              id: "4",
              title: "Instant generation",
              description:
                "Generate audio in seconds, not minutes. Our optimized pipeline delivers fast results without sacrificing quality.",
              media: {
                src: "https://images.unsplash.com/photo-1683143726118-9abaed4e10f9?q=80&w=1062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Instant generation",
              },
            },
            {
              id: "5",
              title: "Multi-language",
              description:
                "Support for dozens of languages and regional accents. Reach a global audience with authentic-sounding speech.",
              media: {
                src: "https://images.unsplash.com/photo-1734552452335-e8b67797bad0?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Multi-language support",
              },
            },
          ]}
        />
        <div className="mx-auto max-w-7xl px-6 pb-14">
          <Cta01
            title="Ready to bring your words to life?"
            description="Join thousands of creators using Zenvox to create studio-quality voiceovers in seconds. No credit card required."
            cta={{
              ctaEnabled: true,
              text: "Go to dashboard",
              link: "/dashboard",
              variant: "default",
              size: "lg",
            }}
          />
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
