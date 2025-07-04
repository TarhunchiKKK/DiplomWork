import { RequireAuth } from "@/features/auth";
import { ThemeSwitch } from "@/features/dark-mode";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <RequireAuth>
            <main>
                <div className="p-4">
                    <ThemeSwitch />
                </div>

                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{children}</div>
            </main>
        </RequireAuth>
    );
}
