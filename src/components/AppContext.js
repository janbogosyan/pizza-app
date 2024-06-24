'use client';
import {SessionProvider} from "next-auth/react";


export function AppProvider({children}) {
    return (
      <SessionProvider> {children}</SessionProvider>
    );
}



//we will wrap up our App in <AppProvider so we can use useSession from anywhere

//The useSession() React Hook in the NextAuth.js client is the easiest way 
//to check if someone is signed in. You can use the useSession hook from 
//anywhere in your application (e.g. in a header component).

//his is a good approach to ensure that the session context is available to all components in your application.
