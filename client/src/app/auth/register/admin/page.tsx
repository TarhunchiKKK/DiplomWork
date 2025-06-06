import { RegisterAdminForm } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth | Register",
    description: "This page will allow you to register in the system."
};

export default function RegisterAdminPage() {
    return <RegisterAdminForm />;
}
