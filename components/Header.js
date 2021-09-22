import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

const Header = () => {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      {/* Top nav */}
      <div className="flex items-center flex-grow px-1 py-2 bg-amazon_blue">
        <div className="flex items-center flex-grow mt-2">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/*  Search */}
        <div className="items-center flex-grow hidden h-8 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 sm:flex">
          <input
            className="flex-grow flex-shrink h-full p-2 outline-none w-55 lg:w-96 rounded-l-md"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right Nav */}
        <div className="flex items-center mx-6 space-x-6 text-xs text-white whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className="link">
            <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div onClick={() => router.push("/orders")} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="relative flex items-center link"
          >
            <span className="absolute top-0 right-0 w-4 h-4 font-bold text-center text-black bg-yellow-400 rounded-full md:right-10">
              {items.length}
            </span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden font-extrabold md:text-sm md:inline">Basket</p>
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div className="flex items-center p-2 pl-6 space-x-3 text-sm text-white bg-amazon_blue-light">
        <p className="flex items-center link">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="hidden link lg:inline-flex">Electronics</p>
        <p className="hidden link lg:inline-flex">Food & Grocery</p>
        <p className="hidden link lg:inline-flex">Prime</p>
        <p className="hidden link lg:inline-flex">Buy Again</p>
        <p className="hidden link lg:inline-flex">Shopper Toolkit</p>
        <p className="hidden link lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
