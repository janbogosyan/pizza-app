import { useEffect, useState } from "react";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";


export default function MenuItemForm({ onSubmit, menuItem }) {

    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);


    //useEffect so we can fetch all the categories
    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }, []);

    

    return (
        <form
            onSubmit={e =>
                onSubmit(e, {name, description, basePrice, sizes, extraIngredientPrices, category
                })
            }
            className="mt-8 max-w-md mx-auto"
        >
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
                    <label>Category</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        {categories?.length > 0 && categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    {/* <select value={category} onChange={e => setCategory(e.target.value)}>
                        {categories?.length > 0 && categories.map(c => (
                            <option key={c._id} values={c._id}>{c.name}</option>
                        ))}
                    </select>  */}
                    <label>Base price</label>
                    <input
                        type="text"
                        value={basePrice}
                        onChange={e => setBasePrice(e.target.value)}
                    />
                    <MenuItemPriceProps
                        props={sizes}
                        setProps={setSizes}
                        name={'Sizes'}
                        addLabel={'Add item size'}
                    />
                    <MenuItemPriceProps
                        name={'Extra ingredients'}
                        addLabel={'Add ingredients prices'}
                        props={extraIngredientPrices}
                        setProps={setExtraIngredientPrices}
                    />

                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    )
}