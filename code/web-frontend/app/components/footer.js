import React from 'react'
import "@/app/globals.css";

// Reference from HyperUI Tailwind  (Library for Tailwind CSS)
function Footer() {
  return (  
  <footer className="bg-blue-50">
    <div className="mx-auto max-w-screen-xl px-4 pt-16 sm:px-6 lg:px-8">  
      <div className="mx-auto max-w-screen-xl px-4 p-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div>
        <div className="flex justify-center sm:justify-start">
          <p className="text-lg font-medium text-gray-900">FlexiLabour</p>
           </div>
        <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">
        Find Trusted Helping Hands for Any Job, BIG or small
        </p>

    
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
        <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-gray-900">Quick Links</p>

          <ul className="mt-8 space-y-4 text-sm">
            {["Search a Job", "Categories", "How it works"].map((el)=> (
              <li key={el}>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
{el}         </a>
            </li>
            ))}
          

          </ul>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-gray-900">Featured Categories</p>
          <ul className="mt-8 space-y-4 text-sm">
            {["Painting", "Gardening", "Construction"].map((el)=> (
              <li key={el}>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
{el}         </a>
            </li>
            ))}
          

          </ul>
      
        </div>

     
        <div className="text-center sm:text-left hidden md:block">
          <p className="text-lg font-medium text-gray-900">Contact Us</p>

          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <a
                className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 shrink-0 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <span className="flex-1 text-gray-700">john@doe.com</span>
              </a>
            </li>

            <li>
              <a
                className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 shrink-0 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                <span className="flex-1 text-gray-700">0123456789</span>
              </a>
            </li>

            <li
              className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 shrink-0 text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <address className="-mt-0.5 flex-1 not-italic text-gray-700">
                213, Ryde, Sydney, NSW
              </address>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="mt-12 border-t border-gray-100 pt-6">
      <div className="text-center sm:flex sm:justify-between sm:text-left">
        <p className="text-sm text-gray-500">
        </p>

        <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">&copy; {new Date().getFullYear()} FlexiLabour</p>
      </div>
    </div>
  </div>
    </div>
  </footer>  )
}

export default Footer

