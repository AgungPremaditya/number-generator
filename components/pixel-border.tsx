import type React from "react";
import { cn } from "@/lib/utils";

interface PixelBorderProps {
    children: React.ReactNode;
    className?: string;
}

export function PixelBorder({ children, className }: PixelBorderProps) {
    return (
        <div className={cn("relative p-1", className)}>
            <div className="absolute inset-0 bg-green-500 p-1">
                <div className="h-full w-full bg-gray-900" />
            </div>

            {/* Pixel corners */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-green-500" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-500" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500" />

            <div className="relative z-10">{children}</div>
        </div>
    );
}
