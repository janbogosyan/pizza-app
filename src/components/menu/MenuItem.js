


//we take image,name,description etc from /models/MenuItem.js
export default function MenuItem({ image, name, description, basePrice, sizes, extraIngredientPrices }) {
    return (
        <div className="bg-gray-100 p-4 rounded-lg text-center 
        group hover:bg-white hover:shadow-md hover:shadow-black/25  transition-all truncate">
            <div className="text-center">
                <img src={image} className="max-h-auto max-h-24 block mx-auto" alt="pizza" />
            </div>
            <h4 className="font-semibold my-3 text-xl ">
                {name}
            </h4>
            <p className="text-white-500 text-sm max-h-14 truncate">
                {description.length > 0 ? description : '...'}
            </p>
            <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
                Add to cart ${basePrice}
            </button>
        </div>
    )
}

//nqma image zashtoto gi vzima ot menu-items a az ne sum kachil vse oshte
//text was overflowing so i find this solution with taiwind css className: 'truncate'