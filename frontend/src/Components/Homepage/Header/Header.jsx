import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useAtom } from "jotai";
import state from "../../Atom/Atom";
import { Avatar } from "flowbite-react";
import { useState } from "react";


const Header = () => {
  const navigate = useNavigate();
  const [isUserLogged, setIsUserLogged] = useAtom(state.isUserLogged);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loggedUser, setLoggedUser] = useAtom(state.loggedUser);
  const [avatar, setAvatar] = useAtom(state.avatar);

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsUserLogged(false);
    navigate("/");
  };

  const displayAvatar = avatar ? (
    <Avatar img={avatar} className="w-10 h-7" rounded />
  ) : (
    <Avatar rounded />
  );

  return (
    <header className="fixed z-10 w-full">
      <nav className="bg-primary-100 px-4 py-2.5">
        <div className="flex flex-wrap justify-between mx-auto">
          <a href="/homepage" className="flex items-center">
            <img
              src="./images/headerRaccoon.png"
              className="mr-3 h-8 sm:h-9 absolute xl:h-10 xl:w-16"
            />
            <div>
              <span className="pb-2 sm:text-2xl font-bold pl-16 text-md sm:hidden">
                TR
              </span>
              <span className="pb-2 sm:text-2xl font-bold pl-16 text-md hidden sm:block">
                Travelling Raccoon
              </span>
            </div>
          </a>
          <div className="flex items-center h-10 lg:order-2">
            <Menu as="div" className="relative inline-block">
              <div className="">
                <Menu.Button className="bg-primary-200 text-black inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset hover:bg-primary-300">
                  {displayAvatar}
                  <span
                    className={!avatar ? "text-lg font-bold  pt-1.5 ml-2" : " "}
                  >
                    {loggedUser.first_name}
                  </span>
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-primary-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/accountSettings">
                          <div
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
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
                          <div
                            onClick={handleLogout}
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block w-full px-4 py-2 text-left text-sm cursor-pointer"
                            )}
                          >
                            Sign out
                          </div>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-black rounded-lg xl:hidden hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={
                !mobileMenu
                  ? () => setMobileMenu(true)
                  : () => setMobileMenu(false)
              }
            >
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
            className={
              !mobileMenu
                ? "hidden justify-between items-center w-full xl:flex xl:w-auto xl:order-1"
                : "block justify-between items-center w-full xl:flex xl:w-auto xl:order-1"
            }
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-mediuml lg:flex-row lg:space-x-4 xl:space-x-14 lg:mt-0">
              <li className="">
                <div
                  className="flex py-2 pr-4 pl-3 text-black rounded bg-primary-700 lg:bg-transparent lg:text-zinc-950 lg:p-0"
                  aria-current="page"
                >
                  <a href="/homepage" className="flex items-center">
                    <span className="font-bold text-2xl">H</span>
                    <img
                      src="./images/earth.gif"
                      className="h-6 sm:h-9 inline xl:h-8 xl:pb-2"
                    />
                    <span className="font-bold text-2xl">ME</span>
                  </a>
                </div>
              </li>

              <li>
                <div className="block py-2 text-2xl pr-4 pl-3 text-black border-b font-bold border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">
                  <Link to="/myTrips">My Trips</Link>
                </div>
              </li>
              <li>
                <Link
                  to="/mementos"
                  className="block py-2 text-2xl pr-4 pl-3 text-black border-b font-bold border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Mementos
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="block py-2 text-2xl pr-4 pl-3 text-black border-b font-bold border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/discover"
                  className="block py-2 text-2xl pr-4 pl-3 text-black border-b font-bold border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Discover
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
