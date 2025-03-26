"use client";

import "./globals.css";
import { queryClient } from "@/shared/api";
import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/shared/ui";
import { ThemeProvider } from "@/features/dark-mode";

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>
                        <div className="py-6">
                            <div className="container mx-auto">{children}</div>
                        </div>
                    </ThemeProvider>
                </QueryClientProvider>

                <Toaster />
            </body>
        </html>
    );
}
