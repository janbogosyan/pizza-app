import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from '@/components/menu/MenuItemTile';
import Image from "next/image";

//we take image,name,description etc from /models/MenuItem.js
export default function MenuItem(menuItem) {

    const { image, name, description, basePrice, sizes, extraIngredientPrices } = menuItem;
    const [showPopup, setShowPopup] = useState(false);

    const { addToCart } = useContext(CartContext)

    function handleAddToCartButtonClick() {
        if (sizes.length === 0 && extraIngredientPrices.length === 0) {
            addToCart(menuItem);
            toast.success('Added to cart')
        } else {
            setShowPopup(true);
        }
    }

    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="my-8 bg-white p-4 rounded-lg max-w-lg">
                        <Image
                            className="mx-auto"
                            src={'/goku.jpg'}
                            alt={name}
                            width={300}
                            height={200}
                        />
                        <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                        <p className="text-center text-gray-500 text-sm">{description}</p>
                        {sizes?.length > 0 && (
                            <div className=" py-2">
                                <h3 className="text-center text-gray-500">Pick your size</h3>
                                {sizes.map(size => (
                                    <label className="flex items-center gap-2 p-2 rounded-md border mb-1">
                                        <input type="radio" name="size" />
                                        {size.name}
                                        ${basePrice + size.price}
                                    </label>
                                ))}
                            </div>
                        )}
                        {extraIngredientPrices?.length > 0 && (
                            <div className=" py-2">
                                <h3 className="text-center text-gray-500">Pick your size</h3>
                                {extraIngredientPrices.map(extraIngPrice => (
                                    <label className="flex items-center gap-2 p-2 rounded-md border mb-1">
                                        <input type="checkbox" name={extraIngPrice.name} />
                                        {extraIngPrice.name}
                                        +${extraIngPrice.price}
                                    </label>
                                ))}
                            </div>
                        )}
                        <button
                            className="primary"
                            type="button">
                            Add to cart
                        </button>
                    </div>

                </div>

            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
        </>
    );
}

//nqma image zashtoto gi vzima ot menu-items a az ne sum kachil vse oshte
//text was overflowing so i find this solution with taiwind css className: 'truncate'

//tozi komponent e svurzan s /src/components/AppContext.js