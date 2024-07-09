'use client';
import { useState } from "react";
import Image from "next/image";


export default function UserForm({ user, onSave }) {

    const [image, setImage] = useState(user?.image || '');  
    const [userName, setUserName] = useState(user?.userName || '');  //8:41:00
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');

    return (
        <div className="flex gap-4">
            {/* lqvata chast */}
            <div>
                <div className="p-2 rounded-lg relative">
                    <Image className="rounded-lg w-full h-full mb-1" src={image} alt={'avatar'}
                        width={250} height={250} />
                    {/*3:34:00 chrez tozi kod v <label> i vkluchitelno <label> razbira se, shte moje da editvame snimkata na profila 
                premahnahme <button>Edit</button> i vmesto nego slojihme <span>Edit</span>*/}
                    <label >
                        {/* type="files"  !!!*/}
                        <input type="file" className="hidden" onChange={onSave} />
                        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                            Edit
                        </span>
                    </label>
                </div>
            </div>
            {/* dqsnata chast */}
            <form
                className="grow"
                onSubmit={ev =>
                    onSave(ev, { name:userName, phone, streetAddress, postalCode, city, country})}
            >
                <label>
                    First and last name
                </label>
                <input type="text" placeholder="first and last name"
                    value={userName} onChange={e => setUserName(e.target.value)} />
                <label>Email</label>
                <input type="email" value={DataTransfer.email} disabled={true} />
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
    )
}