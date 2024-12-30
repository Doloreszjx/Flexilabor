'use client'
import Image from 'next/image'
import React, {useState, useRef, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase/config'; 
import { signOut } from 'firebase/auth';
import "@/app/globals.css";
import { useRouter } from 'next/navigation';

// Reference from HyperUI Tailwind  (Library for Tailwind CSS)
function Header() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState(
[
     {
      label: "Contractor Jobs",
      link: "/contractorJobs"
    },
    {
      label: "Worker Jobs",
      link: "/workerJobs",
    },
    {
      label: "How it works",
      link: "/how-it-works",
    }]
  )

  const [open, setOpen] = useState(false);
  const menuItemClick = (link) => {
    router.push(link)
    setOpen(false)
  }

  const logout = () => {
    router.push('/')
    signOut(auth);
    sessionStorage.clear();
  }; 
  
  const [user] = useAuthState(auth)
  useEffect(() => {
    if(user){
      setMenuItems([
        {
          label: "Browse Jobs",
          link: "/jobslist"
        },
        {
          label: "How it works",
          link: "/how-it-works",
        }])
    }
  }, [user]);
    useEffect(() => {
      const clickHandler = ({ target }) => {
        const container = document.getElementById('menu');
        if (!container?.contains(target)) return;
        setOpen(false);
      };
     
      document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });
  
  return (
<header className="bg-white z-50 sticky top-0 drop-shadow-md">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="md:flex md:items-center md:gap-12">
        <a className="block cursor-pointer" onClick={()=>router.push('/')}>
        {/* Logo  */}
          <Image
           src="/logo.svg"
           alt="Logo"
           width={200}
           height={33}
           />
        </a>
      </div>

      <div className="hidden lg:block">
        <nav aria-label="Global">
          <ul className="flex gap-6 items-center text-sm">
            {
              menuItems.map((el, index)=>(
                <div key={index}>
                <li>
                <a className="text-black text-lg hover:text-[#1D90F1] transition" href={el.link}> {el.label} </a>
              </li>
             
              </div>
              ))
            }
           </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {!user && <div className="sm:flex sm:gap-4">
          <a
            className="rounded-md cursor-pointer bg-white border px-5 py-2.5 text-base font-medium text-black"
            onClick={()=>router.push('signin')}
          >
            Login
          </a>

          <div className="hidden sm:flex">
            <a
              className="rounded-md cursor-pointer bg-[#1D90F1] px-5 py-2.5 text-base font-medium text-white"
              onClick={()=>router.push('signup')}

            >
              Register
            </a>
          </div>
        </div>}
        {user &&  <div className="hidden md:relative md:block">
          <button
            type="button"
            className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
            onClick={ () => setOpen(!open) }>
            <Image 
            src={!JSON.parse(sessionStorage.getItem('userInfo'))?.profilePicture ? "/avatar.svg": JSON.parse(sessionStorage.getItem('userInfo')).profilePicture}
            alt="Avatar"
            width={40}
            height={40}
          />
          </button>

          {open && <div id="menu"
            className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
            role="menu"
          >
                 <div className="p-2" >
              <a
                className="cursor-pointer block rounded-lg px-4 py-2 text-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
                onClick={()=>menuItemClick('dashboard')}
              >
                Dashboard
              </a>

             
            </div>
          
            <div className="p-2" >
              <a
                className="cursor-pointer block rounded-lg px-4 py-2 text-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
                onClick={()=>menuItemClick('messages')}
              >
                Messages
              </a>

             
            </div>

            <div className="p-2" >
              <a
                className="cursor-pointer block rounded-lg px-4 py-2 text-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
   onClick={()=>menuItemClick('profile')}
>
                My profile
              </a>

             
            </div>
       
            <div className="p-2">
              <form method="POST" action="#" onClick={()=> logout()}>
                <button
                  type="submit"
                  className="cursor-pointer flex w-full items-center gap-2 rounded-lg px-4 py-2 text-lg text-red-700 hover:bg-red-50"
                  role="menuitem"
             
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>

                  Logout
                </button>
              </form>
            </div>
          </div>}
        </div>}

        <div className="block lg:hidden">
          <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
 )
}

export default Header