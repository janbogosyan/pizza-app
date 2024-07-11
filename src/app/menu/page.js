'use client';
import SectionHeaders from "@/components/layout/SectionHeadesrs";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";



export default function MenuPage() {

    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(c => setCategories(c))
        });
        fetch('/api/menu-items').then(res => {
            res.json().then(item => setMenuItems(item))
        });
    }, []);


    return (
        <section className="mt-8">
            {categories?.length > 0 && categories.map(c => (
                <div>
                    <div className="text-center">
                        <SectionHeaders mainHeader={c.name} />
                    </div>
                    {/* 9:34 */}
                    <div className="grid grid-cols-3 gap-4 mt-6 mb-12">
                        {menuItems.filter(item => item.category === c._id).map(item => (
                            <MenuItem {...item} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}