import { cn } from "@/lib/utils";

interface PixelTextProps {
    text: string;
    className?: string;
}

export function PixelText({ text, className }: PixelTextProps) {
    return (
        <div className={cn("font-mono tracking-wider", className)}>{text}</div>
    );
}
