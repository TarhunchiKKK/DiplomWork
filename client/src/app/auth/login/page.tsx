import { LoginProcess } from "@/processes";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth | Login",
    description: "This page will allow you to log in to the system."
};

export default function LoginPage() {
    return <LoginProcess />;
}
