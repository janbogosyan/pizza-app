export default function MenuItem() {
    return (
        <div className="bg-gray-100 p-4 rounded-lg text-center hover:bg-white 
        hover:shadow-md hover:shadow-black/25 transition-all">
            <div className="text-center">
                <img src="/pizza.png" className="max-h-auto max-h-24
                block mx-auto" alt="pizza" />
            </div>
            <h4 className="font-semibold my-3 text-xl ">
                Margarita pizza
            </h4>
            <p className="text-white-500 text-sm">
                asdsad asdasd asdasdasdasdasd asdasdasdasdasdasd
            </p>
            <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
                Add to cart $12
            </button>
        </div>
    )
}