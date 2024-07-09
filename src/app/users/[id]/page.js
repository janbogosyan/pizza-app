'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";

export default function EditUserPage() {
    const { loading, data } = useProfile();

    if (loading) {
        return 'Loading user profile...'
    }

    if (!data.admin) {
        return 'Not an admin';
    }

    return (
        <section className="mt-8 mx-auto max-w-lg">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                User info form
            </div>
        </section>
    )
}