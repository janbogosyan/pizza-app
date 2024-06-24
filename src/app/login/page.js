// 'use client';
// import { signIn } from "next-auth/react";
// import Image from "next/image";
// import { useState } from "react";

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginInProgress, setLoginInProgress] = useState(false);

//   async function handleFormSubmit(ev) {
//     ev.preventDefault();
//     setLoginInProgress(true);

//     await signIn('credentials', {email, password, callbackUrl: '/'});

//     setLoginInProgress(false);
//   }
//   return (
//     <section className="mt-8">
//       <h1 className="text-center text-primary text-4xl mb-4">
//         Login
//       </h1>
//       <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
//         <input
//           onChange={ev => setEmail(ev.target.value)}
//           value={email}
//           type="email"
//           name="email"
//           placeholder="email"
//           disabled={loginInProgress}
//         />
//         <input
//           onChange={ev => setPassword(ev.target.value)}
//           value={password}
//           type="password"
//           name="password"
//           placeholder="password"
//           disabled={loginInProgress}
//         />
//         <button disabled={loginInProgress} type="submit">Login</button>
//         <div className="my-4 text-center text-gray-500">
//           or login with provider
//         </div>
//         <button
//           type="button"
//           onClick={() => signIn('google', { callbackUrl: '/' })}
//           className="flex gap-4 justify-center">
//           <Image src={'/google.png'} alt={''} width={24} height={24} />
//           Login with google
//         </button>
//       </form>
//     </section>
//   );
// }


'use client';
import { useState } from 'react';
import { signIn } from "next-auth/react";
import Image from "next/image";



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault()
    setLoginInProgress(true);

    await signIn('credentials', { email, password, callbackUrl:'/' });

    setLoginInProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>
      <form className='max-w-xs mx-auto' onSubmit={handleFormSubmit}>
        <input type='email' placeholder='email' value={email}
          disabled={loginInProgress}
          onChange={e => setEmail(e.target.value)} />
        <input type='password' placeholder='password' value={password}
          disabled={loginInProgress}
          onChange={e => setPassword(e.target.value)} />
        <button disabled={loginInProgress} type='submit'>Login</button>



        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button>


      </form>
    </section>
  )
}

//we write type of the button to be >>>>>>type="button" bcs otherwise it will be type submit by default and will send the form and this will make problems when we try to login with google


