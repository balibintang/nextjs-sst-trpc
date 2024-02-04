import Image from "next/image";
import Link from "next/link";
import burger from "../../../../public/burger.svg";
import logo from "../../../../public/sst-next-banner.png";

import NavbarProfileDropdown from "./NavbarProfileDropdown";

export const Navbar = () => {
  return (
    <div className={`navbar sticky top-0 z-10 h-16 justify-center`}>
      {/* Blurred Background - Visible when over content */}
      <div className="absolute h-full w-full bg-primary bg-opacity-80 backdrop-blur-sm"></div>

      {/* Navbar Content */}
      <div className={"relative flex h-full w-[70%]  max-w-6xl rounded-md"}>
        {/* Drawer */}
        <div className="drawer w-fit md:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              className="btn btn-ghost drawer-button btn-sm rounded-md"
              htmlFor="my-drawer"
            >
              <Image src={burger} alt="burger" className="h-full w-6" />
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
              <NavBarLinks />
            </ul>
          </div>
        </div>

        {/* Logo */}
        <div className="mx-auto  flex flex-row md:ml-0 md:mr-auto">
          <Link
            href="/"
            className=" flex h-5 min-h-[20px] flex-row items-center font-normal capitalize hover:bg-none"
          >
            <Image src={logo} alt="Logo" className="mr-2  h-7  w-auto" />
          </Link>
        </div>

        {/* Right links and profile dropdown */}
        <div className="relative mr-2 flex h-12 w-fit items-center">
          <div className="hidden md:flex">
            <NavBarLinks />
          </div>
          <div className="divider divider-horizontal mx-2 my-2 hidden md:flex"></div>
          <NavbarProfileDropdown />
        </div>
      </div>
    </div>
  );
};

function NavBarLinks() {
  return (
    <div className="flex flex-col md:flex-row">
      <Link
        href="/client-fetch"
        className="weight btn btn-ghost btn-sm mr-2 font-normal capitalize"
      >
        Client Fetch
      </Link>
      <Link
        href="/server-client-fetch"
        className="btn btn-ghost btn-sm font-normal capitalize"
      >
        Server Hydrated Client Fetch
      </Link>

      <Link
        href="/fileupload"
        className="btn btn-ghost btn-sm font-normal capitalize"
      >
        File Upload
      </Link>
    </div>
  );
}
