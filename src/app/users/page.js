'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function UsersPage() {

    const [users, setUsers] = useState([]);
    const { loading, data } = useProfile();

    //vzimame vsichki users ot src/app/api/users/route.js 
    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            });
        })
    }, []);

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'Not an admin';
    }

    return (
        <section className="ax-wlg mx-auto mt-8">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                {users.length > 0 && users.map(user => (
                    <div className="flex bg-gray-100 rounded-lg mb-2 p-1 px-4 items-center gap-4 ">
                        <div className="grid grid-cols-2 gap-4 grow">
                            <div className="text-gray-700">
                                {user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">No name</span>)}
                            </div>

                            <span className="text-gray-500">{user.email}</span>
                        </div>
                        <div>
                            <Link className="button" href={'/users/' + user._id}>
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}




//<UserTabs isAdmin={true}/>
