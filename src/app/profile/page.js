'use client';
import { useSession } from "next-auth/react";  //The useSession() React Hook in the NextAuth.js client is the easiest way to check if someone is signed in.
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession();
    // console.log(session);
    const [userName, setUserName] = useState('');
    // const [saved, setSaved] = useState(false);
    // const [isSaving, setIsSaving] = useState(false);
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);  //използваме го в видеото на 5:08:00 малък детайл за подобряване на user expirience

    const { status } = session; //по този начин просто взимаме status-a от обекта session

    // console.log(session); //f12 в browsera в consolata
    // чрез този блок от код, след като напишем нови данни в нашия Profile дори и да рефрешнем страницата, ще си останат запаметени там
    useEffect(() => {
        if (status === 'authenticated') {
            // console.log(session);
            setUserName(session.data.user.name);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    console.log(data.admin); //true
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status]);

    //body: JSON.stringify({ name:userName }) --- name will be userName, name go vmuknahme sega prosto kato novo naimenovanie
    //we sending in body: JSON.stringify  only the userName bcs we are going to update here only the userName 
    // we will handle this request in our api/profile/route.js
    async function handleProfileInfoUpdate(e) {
        e.preventDefault();
        // setSaved(false); //just to be sure to reset this
        // setIsSaving(true)
        // toast('Saving...');
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userName,
                    streetAddress,
                    phone,
                    postalCode,
                    city,
                    country,
                }),
            });
            //4:22:00
            if (response.ok) 
                resolve()
            else
                reject();
        });
        // setIsSaving(false);
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
        });
    }

    async function handleFileChange(e) {
        // console.log('hello')
        //    console.log(e) //vutre po default ima mnogo neshta , moje da vidim koe ni trqbva kato gi console lognem
        ////FormData objects are used to capture HTML form and submit it using fetch or another network method
        //fetch - демек изпращаме данните към /api/upload
        const files = e.target.files;
        if (files?.length === 1) {
            // console.log('hello 2')
            const data = new FormData;
            data.set('file', files[0]);
            
            await fetch('/api/upload', {
                method: 'POST',
                body: data
            });
        }
    }

    if (status === 'loading' || !profileFetched) {
        return 'Loading...';
    }
    if (status === 'unauthenticated') {
        return redirect('/login');  //беше ми направило грешен import горе вместо да ми импортне redirect from "next/navigation" беше го импортнало от другаде
    }
    const userImage = session.data.user.image;


    return (
        <section className="mt-8">
            {/* tozi blok ot kod za tabs si go premestihme v otdelen komponents components/layouts/UserTabs */}

            {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! isAdmin={isAdmin} taka trqbva da e, no go hardcordnah da pokazva true zashtoto neshto ne raboti pravilno!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            <UserTabs isAdmin={isAdmin} />

            <div className="max-w-md mx-auto mt-8">
                {/* {saved && (
                    <h2 className="text-center bg-green-100 p-4 rounded-lg border border-orange-300 ">
                        Profile saved!
                    </h2>
                )}
                {isSaving && (
                    <h2 className="text-center bg-orange-100 p-4 rounded-lg border border-green-300 ">
                        Saving!...
                    </h2>
                )} */}
                {/* razdelqme dizaina na lqva i dqsna chast */}
                <div className="flex gap-4">
                    {/* lqvata chast */}
                    <div>
                        <div className="p-2 rounded-lg relative">
                            <Image className="rounded-lg w-full h-full mb-1" src={userImage} alt={'avatar'}
                                width={250} height={250} />
                            {/*3:34:00 chrez tozi kod v <label> i vkluchitelno <label> razbira se, shte moje da editvame snimkata na profila 
                            premahnahme <button>Edit</button> i vmesto nego slojihme <span>Edit</span>*/}
                            <label >
                                {/* type="files"  !!!*/}
                                <input type="file" className="hidden" onChange={handleFileChange} />
                                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                                    Edit
                                </span>
                            </label>
                        </div>
                    </div>
                    {/* dqsnata chast */}
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <label>
                            First and last name
                        </label>
                        <input type="text" placeholder="first and last name"
                            value={userName} onChange={e => setUserName(e.target.value)} />
                        <label>Email</label>
                        <input type="email" value={session.data.user.email} disabled={true} />
                        <label>Phone</label>
                        <input type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} />
                        <label>Street address</label>
                        <input type="text" placeholder="Street address" value={streetAddress} onChange={e => setStreetAddress(e.target.value)} />
                        <div className="flex gap-2">
                            <div>
                                <label>City</label>
                                <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                            </div>
                            <div>
                                <label>Postal Code</label>
                                <input type="text" placeholder="Postal code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                            </div>
                        </div>
                        <label>Country</label>
                        <input type="text" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    )
}