"use client";

import "./globals.css";
import { queryClient } from "@/shared/api";
import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/shared/ui";

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

                <Toaster />
            </body>
        </html>
    );
}
