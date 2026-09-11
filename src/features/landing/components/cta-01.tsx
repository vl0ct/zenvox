import Balancer from "react-wrap-balancer";

import type { CtaProps } from "./cta";
import { Cta } from "./cta";

export interface Cta01Props {
  title: string;
  description: string;
  cta?: CtaProps;
}

export function Cta01({ title, description, cta }: Readonly<Cta01Props>) {
  return (
    <div className="relative w-full overflow-hidden rounded-sm bg-muted py-6 sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-lg space-y-2">
          {title && (
            <h2 className="text-3xl text-foreground/80 font-sans font-normal tracking-tight md:text-4xl">
              <Balancer balance={0.5}>{title}</Balancer>
            </h2>
          )}
        </div>
        {cta && (
          <Cta className="order-2 shrink-0 font-semibold border-none bg-accent-foreground/80 hover:bg-accent-foreground/70 sm:order-none" cta={cta} />
        )}
        {description && (
          <p className="order-3 text-muted-foreground whitespace-pre-line sm:order-none sm:max-w-lg">
            <Balancer balance={0.5}>{description}</Balancer>
          </p>
        )}
      </div>
    </div>
  );
}
