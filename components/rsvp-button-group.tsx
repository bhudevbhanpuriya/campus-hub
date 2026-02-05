"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Check, Star, X } from "lucide-react";

type RSVPStatus = "going" | "interested" | "not-going" | null;

interface RSVPButtonGroupProps {
    defaultValue?: RSVPStatus;
    onValueChange?: (value: RSVPStatus) => void;
}

export function RSVPButtonGroup({ defaultValue, onValueChange }: RSVPButtonGroupProps) {
    const [value, setValue] = useState<RSVPStatus>(defaultValue || null);

    const handleValueChange = (newValue: string) => {
        const rsvpValue = newValue === "" ? null : (newValue as RSVPStatus);
        setValue(rsvpValue);
        onValueChange?.(rsvpValue);
    };

    return (
        <ToggleGroup
            type="single"
            value={value || ""}
            onValueChange={handleValueChange}
            className="flex flex-col gap-2 sm:flex-row"
        >
            <ToggleGroupItem
                value="going"
                aria-label="Going"
                className="flex-1 gap-2 data-[state=on]:bg-accent-yellow/20 data-[state=on]:text-accent-yellow data-[state=on]:border-accent-yellow/50"
            >
                <Check className="h-4 w-4" />
                Going
            </ToggleGroupItem>
            <ToggleGroupItem
                value="interested"
                aria-label="Interested"
                className="flex-1 gap-2 data-[state=on]:bg-accent-blue/20 data-[state=on]:text-accent-blue data-[state=on]:border-accent-blue/50"
            >
                <Star className="h-4 w-4" />
                Interested
            </ToggleGroupItem>
            <ToggleGroupItem
                value="not-going"
                aria-label="Not Going"
                className="flex-1 gap-2 data-[state=on]:bg-muted data-[state=on]:text-muted-foreground"
            >
                <X className="h-4 w-4" />
                Not Going
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
