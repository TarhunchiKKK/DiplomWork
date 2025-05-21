"use client";

import "./globals.css";
import { queryClient } from "@/shared/api";
import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/shared/ui";
import { ThemeProvider } from "@/features/dark-mode";
import { RefreshProfile } from "@/features/auth";

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>{children}</ThemeProvider>

                    <RefreshProfile />
                </QueryClientProvider>

                <Toaster />
            </body>
        </html>
    );
}
