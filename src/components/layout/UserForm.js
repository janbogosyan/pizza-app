'use client';
import { useState } from "react";
// import Image from "next/image";
import { useProfile } from "../UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import AddressInputs from '@/components/layout/AddressInputs';

export default function UserForm({ user, onSave }) {

    const [image, setImage] = useState(user?.image || '');
    const [userName, setUserName] = useState(user?.name || '');  //onSave(ev, { name:userName,
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const { data: loggedInUserData } = useProfile();   //renaming the data we take from useProfile() to loggedInUserData

    function handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'postalCode') setPostalCode(value);
        if (propName === 'city') setCity(value);
        if (propName === 'country') setCountry(value);
    }

    return (
        <div className="flex gap-4">
            {/* lqvata chast */}
            <div>
                <div className="p-2 rounded-lg relative max-w-[120px]">
                    <EditableImage link={image} setLink={setImage} />
                    {/*3:34:00 chrez tozi kod v <label> i vkluchitelno <label> razbira se, shte moje da editvame snimkata na profila 
                premahnahme <button>Edit</button> i vmesto nego slojihme <span>Edit</span>*/}
                    {/* type="file"  za da moje kato natisnem edit da ni otvori nov prozorec za da izberem nova snimka !!!*/}
                    {/* <label >
                        <input type="file" className="hidden" onChange={onSave} />
                        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                            Edit
                        </span>
                    </label> */}
                </div>
            </div>
            {/* dqsnata chast */}
            <form
                className="grow"
                onSubmit={ev =>
                    onSave(ev, { name: userName, admin, phone, streetAddress, postalCode, city, country })}
            >
                <label>
                    First and last name
                </label>
                <input type="text" placeholder="first and last name"
                    value={userName} onChange={e => setUserName(e.target.value)} />

                <label>Email</label>
                <input
                    type="email"
                    value={user.email}
                    disabled={true}
                    placeholder={'email'}
                />

                <AddressInputs
                    addressProps={{ phone, streetAddress, postalCode, city, country }}
                    setAddressProp={handleAddressChange}
                />


                {loggedInUserData.admin && (
                    <div>
                        {/* {JSON.stringify(admin)} */}
                        <label className="p-2 inline-flex flex items-center gap-2  mb-2" htmlFor="adminCb">
                            <input
                                id="adminCb"
                                type="checkbox"
                                className=""
                                value={'1'}
                                checked={admin}
                                onClick={ev => setAdmin(ev.target.checked)}
                            />
                            <span>Admin</span>
                        </label>
                    </div>
                )}
                <button type="submit">Save</button>
            </form>
        </div>
    )
}