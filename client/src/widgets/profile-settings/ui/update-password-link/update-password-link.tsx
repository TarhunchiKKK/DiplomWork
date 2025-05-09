import { routes } from "@/shared/routing";
import Link from "next/link";

export function UpdatePasswordLink() {
    return (
        <Link href={routes.passwordRecovery.reset} className="underline!">
            Изменить пароль
        </Link>
    );
}
