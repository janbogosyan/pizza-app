import { useState } from "react";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";


export default function MenuItemForm({ onSubmit, menuItem }) {

    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);


    return (
        <form
            onSubmit={e => onSubmit(e,{ name, description, basePrice, sizes, extraIngredientPrices })}
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