'use client';
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";


export default function NewMenuItemPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [redirectToItems, setRedirectToItems] = useState(false);  //6:35

    const { loading, data } = useProfile();



    async function handleFormSubmit(e) {
        e.preventDefault();
        const data = { name, description, basePrice };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            // console.log(response);
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved',
            error: 'Error',
        });
      
        setRedirectToItems(true);
    }
    if(redirectToItems){
        return redirect('/menu-items');
    }

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'Not an admin.';
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
                <div className="flex items-start gap-4">
                    {/* left side */}
                    <div>
                        image
                    </div>
                    <div className="grow">
                        <label>Item name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label>Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <label>Base price</label>
                        <input
                            type="text"
                            value={basePrice}
                            onChange={e => setBasePrice(e.target.value)}
                        />
                        <button type="submit">Save</button>
                    </div>
                    {/* right side */}
                    <div className="p-2 px-4 cursor-pointer mb-2">
                    </div>
                </div>
            </form>
        </section>
    )
}