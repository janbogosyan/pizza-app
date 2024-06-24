'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";


// {isAdmin} go slagame tuk i sme go podali ot app/profile/page
export default function UserTabs({ isAdmin }) {
    const path = usePathname();
    console.log(path);
    return (
        <div className="flex mx-auto gap-2 tabs justify-center">

            <Link className={path === '/profile' ? 'active' : ''} href={'/profile'}> Profile</Link>

            {isAdmin && (
                <>
                    <Link
                        href={'/categories'}
                        className={path === '/categories' ? 'active' : ''} >
                        Categories
                    </Link>
                    <Link
                        href={'/menu-items'}
                        className={path.includes('menu-items') ? 'active' : ''} >
                        Menu items
                    </Link>
                    <Link
                        href={'/users'}
                        className={path === '/users' ? 'active' : ''} >
                        Users
                    </Link>
                </>
            )}
        </div>
    )
}


// app/profile/page tam sme postavili UserTabs

// usePathname works only in 'use client' components
//чрез usePathname и console.log ще ни покаже на кой path сме, примерно сме на /categories 
//и това ще ни помогне да видим кой Link е активен за да може да ни светне в друг цвят чрез нашия css

{/* tabs - setnali sme go v gobal.css */ }