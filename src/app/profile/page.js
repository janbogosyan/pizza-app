'use client';
import { useSession } from "next-auth/react";  //The useSession() React Hook in the NextAuth.js client is the easiest way to check if someone is signed in.
// import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import toast from "react-hot-toast";
import UserForm from '@/components/layout/UserForm'

export default function ProfilePage() {
    const session = useSession();
    // const [saved, setSaved] = useState(false);
    // const [isSaving, setIsSaving] = useState(false);
    const [user, setUser] = useState(null);
    const [image,setImage] = useState()
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);  //използваме го в видеото на 5:08:00 малък детайл за подобряване на user expirience
    const { status } = session; //по този начин просто взимаме status-a от обекта session

    // console.log(session); //f12 в browsera в consolata
    // чрез този блок от код, след като напишем нови данни в нашия Profile дори и да рефрешнем страницата, ще си останат запаметени там
    useEffect(() => {
        if (status === 'authenticated') {
            // setUserName(session.data.user.name);
            // setImage(session.data.user.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    // console.log(data.admin); //true
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status]);

    //body: JSON.stringify({ name:userName }) --- name will be userName, name go vmuknahme sega prosto kato novo naimenovanie
    //we sending in body: JSON.stringify  only the userName bcs we are going to update here only the userName 
    // we will handle this request in our api/profile/route.js
    async function handleProfileInfoUpdate(e, data) {
        e.preventDefault();
        // setSaved(false); //just to be sure to reset this
        // setIsSaving(true)
        // toast('Saving...');
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
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

            <div className="max-w-lg mx-auto mt-8">
                <UserForm user={user} onSave={handleProfileInfoUpdate} />
            </div>
        </section>
    )
}