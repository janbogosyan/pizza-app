'use client';
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeadesrs";
import { useEffect,useState } from "react";

export default function HomeMenu() {

    const [lastThree, setLastThree] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                const last3 = menuItems.slice(-3);
                setLastThree(last3)
            });
        });
    }, []);

    return (
        <section className="">
            <div className="absolute left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[70px] text-left -z-10">
                    <Image src={'/sallad1.png'} width={109} height={189}
                        alt={'salad'} />
                </div>
                <div className="absolute -top-[100px] right-0 -z-10">
                    <Image src={'/sallad2.png'} width={107} height={195}
                        alt={'salad'} />
                </div>
            </div>
            <div className="text-center mb-4 ">
                <SectionHeaders
                    subHeader={'check out'}
                    mainHeader={'Our Best Sellers'} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {lastThree?.length > 0 && lastThree.map(item => (
                    <MenuItem {...item} />
                ))}
            </div>
        </section>
    );
}