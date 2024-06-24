'use client';
import UserTabs from "@/components/layout/UserTabs"
import { useEffect, useState } from "react";
import { useProfile } from '../../components/UseProfile';
import toast from "react-hot-toast";

export default function CategoriesPage() {

    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const { loading: profileLoading, data: profileData } = useProfile(); //its object{} renaming loading to profileLoading and data to profileData
    const [editedCategory, setEditedCategory] = useState(null);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            })
        })
    }

    useEffect(() => {
        fetchCategories();
    }, []);


    async function handleCategorySubmit(e) {
        e.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName }; //if its new category it will have only this data and not id
            //if we update already exist category this will be a object and inside will have that _id
            if (editedCategory) {
                data._id = editedCategory._id
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(creationPromise, {
            loading: 'Creating your new category...',
            success: 'Category created',
            error: 'Error, sorry...'
        });
    }

    if (profileLoading) {
        return 'Loading user info...';
    }

    if (!profileData.admin) {
        return 'Noat an admin';
    }


    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                {/* div for left side  */}
                <div className="flex gap-2 items-end items-center">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category' : 'New category name'}
                            {editedCategory && (
                                <p className="inline text-red-500">: {editedCategory.name}</p>
                            )}
                        </label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div className="pt-2">
                        <button className='border border-primary' type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
                {categories?.length > 0 && categories.map(c =>
                    <button
                        className="rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-2"
                        onClick={() => {
                            setEditedCategory(c);
                            setCategoryName(c.name)
                        }}
                    >
                        <span>{c.name}</span>
                    </button>
                )}
            </div>
        </section>
    )
}