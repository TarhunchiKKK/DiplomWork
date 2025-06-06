import { RequireAuth } from "@/features/auth";
import {
    ProfileSettingsWrapper,
    UpdateAuthTypeForm,
    UpdatePasswordLink,
    UpdateProfileForm
} from "@/widgets/profile-settings";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings | Profile",
    description: "This page will allow you to specify your profile info."
};

export default function ProfileSettingsPage() {
    return (
        <RequireAuth>
            <div className="space-y-4">
                <ProfileSettingsWrapper title="Настройки профиля">
                    <UpdateProfileForm />
                </ProfileSettingsWrapper>

                <ProfileSettingsWrapper title="Смена пароля">
                    <UpdatePasswordLink />
                </ProfileSettingsWrapper>

                <ProfileSettingsWrapper title="Аутентификация">
                    <UpdateAuthTypeForm />
                </ProfileSettingsWrapper>
            </div>
        </RequireAuth>
    );
}
