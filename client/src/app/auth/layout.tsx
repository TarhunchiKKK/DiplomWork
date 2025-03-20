import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <main>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{children}</div>
        </main>
    );
}
