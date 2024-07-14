import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from '@/components/menu/MenuItemTile';
import Image from "next/image";

//we take image,name,description etc from /models/MenuItem.js
export default function MenuItem(menuItem) {

    const { image, name, description, basePrice, sizes, extraIngredientPrices } = menuItem;
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const { addToCart } = useContext(CartContext)

    function handleAddToCartButtonClick() {
        if (sizes.length === 0 && extraIngredientPrices.length === 0) {
            addToCart(menuItem);
            toast.success('Added to cart')
        } else {
            setShowPopup(true);
        }
    }

    function handleExtraThingClick(ev, extraThing) {
        const checked = ev.target.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extraThing]);
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extraThing.name);
            })
        }
    }

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }

    return (
        <>
            {showPopup && (
                <div
                    // da zatvorq popup-a kato cukna otstrani nqkude
                    onClick={() => setShowPopup(false)}
                    className="fixed inset-0 inset-0 bg-black/40 flex items-center justify-center">
                    <div
                        //da ne zatvarqm popup-a kato izbiram vutre v nego razmer,extraEngridient etc 10:20:00 
                        //a samo ot vunshnata strana da moje da se zatvarq
                        onClick={ev => ev.stopPropagation()}
                        className="my-8 bg-white p-2 rounded-lg max-w-md">
                        <div
                            className="overflow-y-scroll p-2"
                            style={{ maxHeight: 'calc(100vh-100px)' }}>
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
                                            <input
                                                type="radio"
                                                name="size"
                                                onClick={() => setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                            />
                                            {size.name}
                                            ${basePrice + size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {extraIngredientPrices?.length > 0 && (
                                <div className=" py-2">
                                    <h3 className="text-center text-gray-500">Any extras?</h3>
                                    {extraIngredientPrices.map(extraThing => (
                                        <label
                                            key={extraThing._id}
                                            className="flex items-center gap-2 p-2 rounded-md border mb-1">
                                            <input
                                                type="checkbox"
                                                name={extraThing.name}
                                                onChange={ev => handleExtraThingClick(ev, extraThing)}
                                            />
                                            {extraThing.name}+${extraThing.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button
                                className="primary sticky bottom-2"
                                type="button">
                                Add to cart ${selectedPrice}
                            </button>
                        </div>
                    </div>

                // </div>

            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
        </>
    );
}

//nqma image zashtoto gi vzima ot menu-items a az ne sum kachil vse oshte
//text was overflowing so i find this solution with taiwind css className: 'truncate'

//tozi komponent e svurzan s /src/components/AppContext.js