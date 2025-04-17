"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { PixelBorder } from "./pixel-border";
import { PixelText } from "./pixel-text";
import { Button } from "./ui/button";
import { useState } from "react";

export default function PixelNumberGenerator() {
    const [digitCount, setDigitCount] = useState(16);

    // Fetch data from API GET METHOD
    const useGenerateData = (d: number = 2) => {
        return useQuery<string>({
            queryKey: ["generate", d],
            queryFn: async () => {
                const response = await fetch(
                    `https://snqvpcpc6zmlfvn4k4xl4qfgoy0vaeve.lambda-url.ap-southeast-1.on.aws/generate?d=${d}`
                );

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                return response.json();
            },
        });
    };

    // Fetch data from API POST METHOD (Generate button)
    const generateMutation = useMutation({
        mutationFn: async (digit: number) => {
            if (digit <= 20) throw new Error(`API error: overlimit`);
            const response = await fetch(
                `https://snqvpcpc6zmlfvn4k4xl4qfgoy0vaeve.lambda-url.ap-southeast-1.on.aws/run-generate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        digit,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            return response.json();
        },
    });

    const generateQuery = useGenerateData();
    console.log(generateQuery);

    return (
        <div className="w-full max-w-md">
            <div className="mb-8 text-center">
                <PixelText
                    text="NUMBER GENERATOR"
                    className="text-3xl md:text-4xl text-green-400"
                />
            </div>

            <PixelBorder className="p-6 mb-6 bg-gray-900">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <PixelText
                            text="DIGIT COUNT"
                            className="text-sm text-green-400"
                        />
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <input
                                    type="number"
                                    min="1"
                                    max="19"
                                    value={digitCount}
                                    onChange={(e) =>
                                        setDigitCount(Number(e.target.value))
                                    }
                                    className="w-full h-12 bg-black border-2 border-green-500 text-green-400 font-mono text-center text-xl px-4"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <Button className="h-5 px-2 py-0 bg-green-600 hover:bg-green-500 text-black">
                                    <PixelText
                                        text="+"
                                        className="text-black"
                                    />
                                </Button>
                                <Button className="h-5 px-2 py-0 bg-green-600 hover:bg-green-500 text-black">
                                    <PixelText
                                        text="-"
                                        className="text-black"
                                    />
                                </Button>
                            </div>
                        </div>
                        <div className="mt-2 text-center">
                            <PixelText
                                text={`GENERATES 1-DIGIT NUMBER`}
                                className="text-sm text-gray-400"
                            />
                        </div>
                    </div>

                    <Button
                        className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-6"
                        onClick={() => generateMutation.mutate(digitCount)}
                    >
                        <PixelText text="GENERATE" className="text-black" />
                    </Button>
                </div>
            </PixelBorder>

            <PixelBorder className="p-6 bg-gray-900 relative">
                <div className="text-center">
                    <PixelText
                        text="RESULT"
                        className="text-sm text-orange-400 mb-2"
                    />
                    <div
                        className={`h-24 flex items-center justify-center transition-all duration-300`}
                    >
                        {generateQuery.status === "pending" &&
                        generateMutation.isPending ? (
                            <PixelText
                                text="WAITING..."
                                className="text-2xl text-gray-500"
                            />
                        ) : (
                            <PixelText
                                text={
                                    generateMutation.data != null
                                        ? generateMutation.data
                                        : generateQuery.data ?? "0"
                                }
                                className="text-2xl text-green-400 font-bold"
                            />
                        )}
                    </div>
                </div>

                {/* Copy Popup */}
            </PixelBorder>
        </div>
    );
}
