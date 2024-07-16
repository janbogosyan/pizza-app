'use client';  //error zashtoto nqmah use client
import SectionHeaders from "@/components/layout/SectionHeadesrs";
import { CartContext } from "@/components/AppContext";
import { useContext } from "react";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import { cartProductPrice } from "@/components/AppContext";

export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    let total = 0;
    for (const p of cartProducts) {
        total += cartProductPrice(p);
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart" />
            </div>
            <div className="mt-4 grid gap-4 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products on your shoping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <div className="flex items-center gap-4 mb-2 border-b py-2">
                            <div className="w-24">
                                <Image width={240} height={240} src={product.image} alt={""} />
                            </div>
                            <div className="grow">
                                <h3 className="font-semibold"> {product.name} </h3>
                                {product.size && (
                                    <div className="text-sm">
                                        Size: <span>{product.size?.name}</span>
                                    </div>
                                )}
                                {product.extras?.length > 0 && (
                                    <div className="text-sm text-gray-500">
                                        {product.extras.map(extra => (
                                            <div>extra {extra.name} :${extra.price}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-lg font-semibold">
                                ${cartProductPrice(product)}
                            </div>
                            <div className="ml-2">
                                <button
                                    type="button"
                                    onClick={() => removeCartProduct(index)}
                                    className="p-2">
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="py-4 text-right pr-16">
                        <span className="text-gray-500">
                            Subtotal:&nbsp;
                        </span>
                        <span className="text-lg font-semibold pl-2">
                            ${total}
                        </span>
                    </div>
                </div>
                {/* right side */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form>
                        <label>Address</label>
                        <input type="text" placeholder="Street address"/>
                        <button type="submit">Pay ${total}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}