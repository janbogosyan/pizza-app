import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
    return (
        //className='hero' си го сетнахме в app>global.css
        //className='text-primary' сме го сетнали в taiwind.config.js 
        <section className="hero mt-4">
            <div className="py-12">
                <h1 className="text-4xl font-semibold">
                    Everything <br />
                    is better <br />
                    with a&nbsp;
                    <span className="text-primary">
                        Pizza
                    </span>
                </h1>
                <p className="my-6 text-gray-500 text-sm">
                    Pizza is the missing piece that makes everything better.
                    The best prices are here.
                    Come and see yourself !
                </p>
                <div className="flex gap-4 text-sm">
                    <button className="flex justify-center bg-primary uppercase text-white px-4 py-2 rounded-full flex items-center gap-2">
                        Order now
                        <Right />
                    </button>
                    <button className="flex items-center border-0 gap-2 py-2 text-gray-600 semibold">
                        Learn more
                        <Right />
                    </button>
                </div>
            </div>
            <div className="relative">
                <Image src={'/pizza.png '} layout={'fill'}         //layout и objectFit ги добавихме,защото ни изписваше грешка че трябва да се добави width, но вместо него добавихме тях защото искаме големината на изображението да може да се променя автоматично, а не ние да я задаваме ръчно
                    objectFit={'contain'} alt="pizza" />
            </div>
        </section>
    );
} 