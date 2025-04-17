import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PixelPopupProps {
    children: ReactNode;
    className?: string;
}

export function PixelPopup({ children, className }: PixelPopupProps) {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div
                className={cn(
                    "animate-in fade-in zoom-in duration-300",
                    "bg-gray-900 border-2 border-green-500 py-2 px-4",
                    "relative",
                    className
                )}
            >
                {/* Pixel corners */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-green-500" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-500" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500" />

                {children}
            </div>
        </div>
    );
}
