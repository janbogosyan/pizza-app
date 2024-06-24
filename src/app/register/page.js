"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";


export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(e) {
        e.preventDefault();
        setCreatingUser(true);
        setError(false); //need to put here in the beggining setError(false) before we send request to work properly bcs we want to reset everything
        setUserCreated(false) // and here the same as upper logic for setError

        //creating a user  //sending request to our src>app>api>register>route.js
        //The method property specifies the HTTP method to use for the request. In this case, it's 'POST', which is used to send data to the server to create a new resource (e.g., registering a new user).
        //The string '/api/register' specifies the endpoint on the server to which the request is being made. This is typically a route in your server's API that handles user registration.
        //The body property contains the data to be sent to the server.
        //JSON.stringify({ email, password }) converts the JavaScript object { email, password } into a JSON string. This is necessary because the server typically expects data in JSON format.
        //The headers property specifies additional information about the request.
        //The 'Content-Type': 'application/json' header indicates that the request body is in JSON format. This tells the server how to interpret the data it receives.
        //ИЗЧАКВА ДА ИЗВЛЕЧЕ ДАННИ ОТ /api/register   и сме го кръстили 'const response'' защото тук получава отговор от /api/register
        const response = await fetch('/api/register', {        //извличам createdUser от api/register и с данните които ми връща правя POST заявка //This line sends an HTTP request to the server.The fetch function is used to make the request //await is used to wait for the response from the server before moving to the next line of code. This makes it an asynchronous operation, meaning it doesn't block the rest of the program from running while it waits for the server to respond.
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
          });
        // console.log(response) вътре в него има .ок по default
        if (response.ok) {
            setUserCreated(true);
        } else {
            setError(true);
        }

        setCreatingUser(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>

            {userCreated &&
                <div className="my-4 text-center">
                    User created. Now you can{' '}
                    <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            }

            {error &&
                <div className="my-4 text-center">
                    An error has occurred. <br />
                    Please try again later
                </div>
            }

            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input
                    disabled={creatingUser}
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    disabled={creatingUser}
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit" disabled={creatingUser}>
                    Register
                </button>
                <div className="my-4 text-center text-gray-400">
                    or Login with provider
                </div>
                <button type="button"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="flex gap-4 justify-center items-center">
                    <Image src={'/google.png'} width={32} height={32} alt="" />
                    Register with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account?{' '}
                    <Link className='underline' href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
    );
}

//we use NextUath.js and to register someone we use credentials from NextAuth.js

//className за input,button и т.н. съм ги сетнал в global.css

//за да се регистрираме ще използваме next-auth.js
//npm add next-auth
//и четем документацията в сайта на next-auth.js

//Summary
//This code sends a POST request to /api/register with the user's email and password.
//The data is formatted as JSON and the server is informed of this format via the Content-Type header.
//The await keyword is used to wait for the server's response before proceeding with the rest of the code.
//The server's response is stored in the response variable, which can then be used to check if the user was successfully created or if there was an error.