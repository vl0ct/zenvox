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
    <div className="relative w-full overflow-hidden rounded-2xl outline outline-black/10 dark:outline-white/10 py-16 sm:py-20">
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center space-y-4 self-center">
          <div className="space-y-2">
            {title && (
              <h2 className="text-center text-3xl font-serif font-normal tracking-tight md:text-4xl md:max-w-200">
                <Balancer balance={0.5}>{title}</Balancer>
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground text-center whitespace-pre-line md:max-w-200">
                <Balancer balance={0.5}>{description}</Balancer>
              </p>
            )}
          </div>
          {cta && <Cta cta={cta} />}
        </div>
      </div>
    </div>
  );
}
