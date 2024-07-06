
//menu-items/edit/[id]/page.js добавихме вътре в edit, нова папка с име [id] за да може
//да достигнем до пътя който сме сетнали в app/menu-items  <Link href={'/menu-items/edit/' + item._id}


'use client';
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import MenuItemForm from '../../../../components/layout/MenuItemForm'
import DeleteButton from '@/components/DeleteButton';


export default function EditMenuItemPage() {
    const { id } = useParams(); //в случая взимам само {id} from params защото друго не ми трябва,когато натисна върху някой от добавените itemi в menuItems чрез params ще ми върне _id на определения item, 
    const [menuItem, setMenuItem] = useState(null)
    const [redirectToItems, setRedirectToItems] = useState(false);  //6:35
    const { loading, data } = useProfile();

    //we must use UseEffect to fetch information about this menuItem
    useEffect(() => {
        // console.log(params);  //мога да проверя в developer tools конзолата дали params ми връща _id-то на натиснатия item 
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {

                const item = items.find(i => i._id === id); //i want to find that item which his id is equal to the id of the item we pressed
                // console.log(item)
                setMenuItem(item);
            });
        })
    }, [])


    async function handleFormSubmit(e, data) {
        e.preventDefault();
        data = { ...data, _id: id };          //_id да бъде id от useParams
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items?_id=' + id, {
                method: 'DELETE',
            });
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error',
        });
        setRedirectToItems(true);
    }


    if (redirectToItems) {
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
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
            <div className="max-w-md mx-auto mt-4">
                <div className="max-w-96 ml-auto ">
                    <DeleteButton
                        label="Delete this menu item"
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>
        </section>
    )
}