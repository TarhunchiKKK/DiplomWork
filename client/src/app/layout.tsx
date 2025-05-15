"use client";

import "./globals.css";
import { queryClient } from "@/shared/api";
import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/shared/ui";
import { ThemeProvider } from "@/features/dark-mode";
import { useProfileStore } from "@/features/auth";
import { mocks, useDevEffect } from "@/dev";

export default function RootLayout({ children }: PropsWithChildren) {
    const setProfile = useProfileStore(state => state.setProfile);

    useDevEffect(() => {
        setProfile(mocks.profile);
    }, [setProfile]);

    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>{children}</ThemeProvider>
                </QueryClientProvider>

                <Toaster />
            </body>
        </html>
    );
}
