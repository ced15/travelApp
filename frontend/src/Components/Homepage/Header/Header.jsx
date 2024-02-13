import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAtom } from "jotai";
import state from "../../Atom/Atom";

const Header = () => {
  const navigate = useNavigate();
  const [isUserLogged, setIsUserLogged] = useAtom(state.isUserLogged);
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsUserLogged(false);
    navigate("/logIn")
  };

  return (
    <header className="fixed z-10 w-full">
      <nav className="bg-gray-300 border-gray-200 px-4 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between mx-auto">
          <a href="/" className="flex items-center">
            <img
              src="https://cdn.discordapp.com/attachments/1080482388221640805/1179396900902928456/image_2023-11-29_142157241-removebg-preview.png?ex=6579a1f5&is=65672cf5&hm=a1d742bfd3886b27f454fde1249cbf0e9e3d54f0541656ff72b411bb56d53bb1&"
              className="mr-3 h-8 sm:h-9 absolute xl:h-10 xl:w-16"
            />
            <span className="pb-2 text-xl font-semibold whitespace-nowrap dark:text-white pl-16">
              Travelling Raccoons
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {!isUserLogged ? (
              <>
                <a
                  href="/logIn"
                  className="text-gray-800 cursor-pointer dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </a>
                <a
                  href="/signUp"
                  className="text-gray-800 cursor-pointer dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Get started
                </a>
              </>
            ) : (
              <Menu as="div" className="relative inline-block">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Hello {loggedUser.first_name}
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/accountSettings">
                            <div
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              Account settings
                            </div>
                          </Link>
                        )}
                      </Menu.Item>

                      <form method="POST" action="#">
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="/logIn">
                              <div
                                onClick={handleLogout}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block w-full px-4 py-2 text-left text-sm cursor-pointer"
                                )}
                              >
                                Sign out
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fillRule="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fillRule="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full xl:flex xl:w-auto xl:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-mediuml lg:flex-row lg:space-x-4 xl:space-x-14 lg:mt-0">
              <li className="">
                <div
                  className="flex py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-zinc-950 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  <Link to="/">
                    <span className="font-bold text-2xl">H</span>
                    <img
                      src="https://cdn.discordapp.com/attachments/1080482388221640805/1179367597372866611/earth-4823_256.gif?ex=657986aa&is=656711aa&hm=a12a57ca18e1c7410b70b648dba4c278107525ceaee525188b1678a95f66e777&"
                      className="h-6 sm:h-9 inline xl:h-8 xl:pb-2"
                      alt="Flowbite Logo"
                    />
                    <span className="font-bold text-2xl">ME</span>
                  </Link>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  <img
                    src="https://cdn.discordapp.com/attachments/1080482388221640805/1179396900902928456/image_2023-11-29_142157241-removebg-preview.png?ex=6579a1f5&is=65672cf5&hm=a1d742bfd3886b27f454fde1249cbf0e9e3d54f0541656ff72b411bb56d53bb1&"
                    className="mr-3 sm:h-9 xl:h-10 xl:w-20"
                    alt="Raccoon"
                  />
                </a>
              </li>

              <li>
                <div className="block py-2 text-2xl pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                  <Link to="/myTrips">My Trips</Link>
                </div>
              </li>
              <li>
                <Link
                  to="/mementos"
                  className="block py-2 text-2xl pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Mementos
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="block py-2 text-2xl pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/discover"
                  className="block py-2 text-2xl pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Discover
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="border-t border-gray-200"></div>
    </header>
  );
};

export default Header;
