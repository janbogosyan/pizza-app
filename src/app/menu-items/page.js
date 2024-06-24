'use client'
import { useProfile } from "@/components/UseProfile"
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function MenuItemsPage() {

    const [menuItems, setMenuItems] = useState([]);

    const { loading, data } = useProfile();

    //GET is by default thats why we didnt write it
    //ofcourse this endpoint /api/menu-items we need always to create in the api folder/menu-items
    useEffect(() => {
        fetch('/api/menu-items')
            .then(res => {
                res.json().then(item => {
                    setMenuItems(item);
                });
            })
    }, []);

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'Not an admin.';
    }
    console.log(menuItems)

    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link
                    className="button flex"
                    href={'/menu-items/new'}>
                    <span>Create new menu item</span>
                    <Right />
                </Link>
            </div>

            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
                <div className="grid grid-cols-4 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link href={'/menu-items/edit/' + item._id}
                            className="bg-gray-200 rounded-lg p-4">
                            <div className="relative">
                                <Image
                                    className="rounded-md"
                                    src={''} alt={''} height={200} width={200} />
                            </div>
                            <div className="text-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}