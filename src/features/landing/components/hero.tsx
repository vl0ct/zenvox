"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Balancer from "react-wrap-balancer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Cta, type CtaProps } from "./cta";
import { DashboardDemo } from "./dashboard-demo";
import { MoveDownRight } from "lucide-react";

export interface Hero02Props {
  title: React.ReactNode;
  titleLine2?: React.ReactNode;
  description: string;
  washImage: string;
  animation?: "none" | "subtle";
  primaryCTA: CtaProps;
  variant?: "standard" | "compact";
}

const variantStyles = {
  standard: {
    section: "py-20 sm:py-28",
    title: "text-3xl sm:text-4xl md:text-5xl",
    description: "max-w-lg text-lg/6 sm:text-2xl/7",
    header: "gap-5",
    content: "gap-14 sm:gap-20",
  },
  compact: {
    section: "py-14 sm:py-20",
    title: "text-2xl sm:text-3xl md:text-4xl",
    description: "max-w-sm text-sm",
    header: "gap-4",
    content: "gap-10 sm:gap-14",
  },
} as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const mediaItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Reveal({
  active,
  variants,
  className,
  children,
}: Readonly<{
  active: boolean;
  variants?: Variants;
  className?: string;
  children: React.ReactNode;
}>) {
  if (!active) return <div className={className}>{children}</div>;

  return (
    <motion.div variants={variants ?? item} className={className}>
      {children}
    </motion.div>
  );
}

export function Hero({
  title,
  titleLine2,
  description,
  washImage,
  animation = "none",
  primaryCTA,
  variant = "standard",
}: Readonly<Hero02Props>) {
  const reduce = useReducedMotion();
  const animate = animation === "subtle" && !reduce;
  const vs = variantStyles[variant];

  const titleElement = title && (
    <h1
      className={cn(
        "text-foreground/80 font-sans font-normal tracking-tight text-balance",
        vs.title,
      )}
    >
      <Balancer>{title}</Balancer>
      {titleLine2 && (
        <>
          <br />
          <Balancer>{titleLine2}</Balancer>
        </>
      )}
    </h1>
  );

  const descriptionElement = description && (
    <p className={cn("text-neutral-600", vs.description)}>
      <Balancer>{description}</Balancer>
    </p>
  );

  const ctaElement = (
    <Cta
      className="bg-accent-foreground/80 border-none shadow-sm"
      cta={primaryCTA}
    />
  );

  const mediaElement = (
    <>
      <div className="hidden min-[1300px]:block">
        <div className="relative w-full overflow-hidden rounded-md outline outline-black/10 sm:h-120 lg:h-152 dark:outline-white/10">
          {washImage && (
            <img
              src={washImage}
              alt=""
              aria-hidden
              className="absolute inset-0 size-full object-cover"
            />
          )}
          <div className="from-background/30 via-background/10 to-background/40 absolute inset-0 bg-gradient-to-b" />
          <div className="relative flex justify-center overflow-hidden px-6 py-6 sm:px-12 sm:py-8">
            <div className="translate-y-22 scale-120">
              <DashboardDemo />
            </div>
          </div>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
              style={{
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                maskImage: "linear-gradient(to top, grey 0%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to top, grey 0%, transparent 100%)",
              }}
            />
        </div>
      </div>
      <div className="h-[40vh] hidden max-[1299px]:block">
      <div className="bg-muted hidden w-fit items-center rounded-sm p-1 max-[1299px]:block">
        <Button
          variant="default"
          className="text-background hover:text-background rounded-sm bg-neutral-700 font-semibold tracking-wide hover:bg-neutral-600"
          asChild
        >
          <Link href="/demo" className="">
            Live Demo
            <MoveDownRight className="size-4" />
          </Link>
        </Button>
        </div>
      </div>
    </>
  );

  return (
    <section className="relative isolate w-full overflow-hidden">
      <motion.div
        className={cn(
          "relative z-10 mx-auto flex max-w-7xl flex-col px-6",
          vs.section,
          vs.content,
        )}
        variants={animate ? container : undefined}
        initial={animate ? "hidden" : false}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true, margin: "-80px" }}
      >
        <Reveal
          active={animate}
          className={cn("flex max-w-2xl flex-col items-start pt-20", vs.header)}
        >
          {titleElement}
          {descriptionElement}
          {ctaElement}
        </Reveal>

        <Reveal active={animate} variants={mediaItem} className="w-full">
          {mediaElement}
        </Reveal>
      </motion.div>
    </section>
  );
}
