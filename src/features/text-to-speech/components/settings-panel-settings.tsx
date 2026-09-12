"use client";

import { useStore } from "@tanstack/react-form";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { useTypedAppFormContext } from "@/hooks/use-app-form";

import { sliders } from "@/features/text-to-speech/data/sliders";
import { ttsFormOptions } from "@/features/text-to-speech/components/text-to-speech-form";
import { VoiceSelector } from "@/features/text-to-speech/components/voice-selector";

export function SettingsPanelSettings() {
  const form = useTypedAppFormContext(ttsFormOptions);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  return (
    <>
      {/* Voice Style Dropdown Section */}
      <div className="border-border/50 frosted dark:frosted-dark border-b p-4">
        <VoiceSelector />
      </div>

      {/* Voice Adjustments Section */}
      <div className="frosted dark:frosted-dark flex-1 p-4">
        <FieldGroup className="gap-8">
          {sliders.map((slider) => (
            <form.Field key={slider.id} name={slider.id}>
              {(field) => (
                <Field>
                  <FieldLabel>{slider.label}</FieldLabel>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">
                      {slider.leftLabel}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {slider.rightLabel}
                    </span>
                  </div>
                  <Slider
                    value={[field.state.value]}
                    onValueChange={(value) => field.handleChange(value[0])}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    disabled={isSubmitting}
                    className="**:data-[slot=slider-thumb]:bg-foreground **:data-[slot=slider-thumb]:size-3 **:data-[slot=slider-track]:h-1"
                  />
                </Field>
              )}
            </form.Field>
          ))}
        </FieldGroup>
      </div>
    </>
  );
}
