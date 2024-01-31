import { Link, useNavigate } from "react-router-dom";

const Header = () => {

  return (
    <header>
      <nav class="bg-white border-gray-200 px-4 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between mx-auto">
          <a href="/" class="flex items-center">
            <img
              src="https://cdn.discordapp.com/attachments/1080482388221640805/1179396900902928456/image_2023-11-29_142157241-removebg-preview.png?ex=6579a1f5&is=65672cf5&hm=a1d742bfd3886b27f454fde1249cbf0e9e3d54f0541656ff72b411bb56d53bb1&"
              class="mr-3 h-8 sm:h-9 absolute xl:h-10 xl:w-16"
            />
            <span class="pb-2 text-xl font-semibold whitespace-nowrap dark:text-white pl-16">
              Travelling Raccoons
            </span>
          </a>
          <div class="flex items-center lg:order-2">
            <a
              href="/logIn"
              class="text-gray-800 cursor-pointer dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Log in
            </a>
            <a
              href="/signUp"
              class="text-gray-800 cursor-pointer dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Get started
            </a>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                class="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul class="flex flex-col mt-4 font-mediuml lg:flex-row lg:space-x-8 xl:space-x-20 lg:mt-0">
              <li class="">
                <a
                  href="#"
                  class="flex py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-zinc-950 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  <Link to="/">
                  <span class="font-bold text-2xl">H</span>
                  <img
                    src="https://cdn.discordapp.com/attachments/1080482388221640805/1179367597372866611/earth-4823_256.gif?ex=657986aa&is=656711aa&hm=a12a57ca18e1c7410b70b648dba4c278107525ceaee525188b1678a95f66e777&"
                    class="h-6 sm:h-9 inline xl:h-8 xl:pb-2"
                    alt="Flowbite Logo"
                  />
                  <span class="font-bold text-2xl">ME</span>
                  </Link>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  <img
                    src="https://cdn.discordapp.com/attachments/1080482388221640805/1179396900902928456/image_2023-11-29_142157241-removebg-preview.png?ex=6579a1f5&is=65672cf5&hm=a1d742bfd3886b27f454fde1249cbf0e9e3d54f0541656ff72b411bb56d53bb1&"
                    class="mr-3 sm:h-9 xl:h-10 xl:w-20"
                    alt="Raccoon"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block text-2xl py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  <Link to="/myTrips">
                    My Trips
                  </Link>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 text-2xl pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  <Link to="/mementos">
                  Mementos
                  </Link>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 text-2xl pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  <Link to="/wishlist">
                  Wishlist
                  </Link>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 text-2xl pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  <Link to="/discover">
                  Discover
                  </Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="border-t border-gray-200"></div>
    </header>
  );
};

export default Header;
