import PixelNumberGenerator from "@/components/pixel-number-generator";
import { PixelText } from "@/components/pixel-text";

export default function Home() {
    return (
        <div>
            <main className="min-h-screen bg-black p-4 flex flex-col items-center justify-center">
                <PixelNumberGenerator />
            </main>
            <footer className="row-start-3 bg-black flex gap-[24px] flex-wrap items-center justify-center">
                <div className="mt-8 mb-4 text-center">
                    <PixelText
                        text="© SCHIAS 2025"
                        className="text-xs text-gray-500"
                    />
                </div>
            </footer>
        </div>
    );
}
