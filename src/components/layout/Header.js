'use client';
import { CartContext } from "@/components/AppContext";
// import Bars2 from "@/components/icons/Bars2";
// import ShoppingCart from "@/components/icons/ShoppingCart";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import ShoppingCart from '@/components/icons/ShoppingCart';


//HEADER COMPONENT CANT ACCESS USESESSION DATA PROPERLY


export default function Header() {

    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    const { cartProducts } = useContext(CartContext);
    // const [mobileNavOpen, setMobileNavOpen] = useState(false);
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];

    }
    return (

        <header className="flex items-center justify-between">
            <nav className="flex gap-8 text-gray-500 font-semibold items-center">
                <Link className="text-primary font-semibold text-2xl" href={'/'}>
                    ST PIZZA
                </Link>
                <Link href={'/'}>Home</Link>
                <Link href={'/menu'}>Menu</Link>
                <Link href={'/#about'}>About</Link>
                <Link href={'/#contact'}>Contact</Link>
            </nav>
            <nav className="flex items-center gap-4  text-gray-500 font-semibold">
                {status === "authenticated" && (
                    <>
                        <Link href={'/profile'} className="whitespace-nowrap">
                            Hi, {userName}
                        </Link>
                        <button
                            onClick={() => signOut()}
                            className="bg-primary text-white px-8 py-2 rounded-full">
                            Logout
                        </button>
                    </>
                )}
                {status !== "authenticated" && (
                    <>
                        <Link href={'/login'}>Login</Link>
                        <Link href={'/register'} className="bg-primary text-white px-8 py-2 rounded-full">
                            Register
                        </Link>
                    </>
                )}
                <Link href={'/cart'} className="relative">
                    <ShoppingCart />
                    <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                        {cartProducts.length}
                    </span>
                </Link>
            </nav>
        </header>

    );
}

//<Link href={'/#about'}>About</Link>  sloji li sme # pred about i sme setnali id="about" v /app/page.js toest sled kato kliknem vurhu ABOUT v nashiq sait shte ni skrolne avtomatichno na dolu kudeto e nashiq about
//The useSession() React Hook in the NextAuth.js client is the easiest way 
//to check if someone is signed in. You can use the useSession hook from 
//anywhere in your application (e.g. in a header component).
//След като натиснем бутона Register  href={'/register'} препраща ни към app>register>page.js*/
