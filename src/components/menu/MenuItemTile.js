



export default function MenuItemTile({ onAddToCart, ...menuItem }) {

    const { image, description, name, basePrice } = menuItem;

    return (
        <div className="bg-gray-100 p-4 rounded-lg text-center 
        group hover:bg-white hover:shadow-md hover:shadow-black/25  transition-all ">
            <div className="text-center">
                <img src={image} className="max-h-auto max-h-24 block mx-auto" alt="pizza" />
            </div>
            <h4 className="font-semibold my-3 text-xl ">
                {name}
            </h4>
            <p className="text-white-500 text-sm trancate line-clamp-3">
                {description.length > 0 ? description : <p className="text-6xl text-center">...</p>}
            </p>
            <button
                onClick={onAddToCart}
                className="mt-4 bg-primary text-white rounded-full px-8 py-2">
                Add to cart ${basePrice}
            </button>
        </div>
    )
}