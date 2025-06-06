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
            <head>
                <title>E-Doc-Hub</title>
                <meta name="description" content="Electronic document management system"></meta>
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>{children}</ThemeProvider>
                </QueryClientProvider>

                <Toaster />
            </body>
        </html>
    );
}
