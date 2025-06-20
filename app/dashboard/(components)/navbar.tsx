"use client";
import {
  LogoutOutlined,
  MenuOutlined,
  ProfileOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useSession } from "next-auth/react";
import { handleSignOut } from "@/lib/actions/auth.action";
import CustomDropdown, {
  MoreOperationsItem,
} from "@/components/ui/custom-dropdown";
import TooltipButton from "@/components/ui/custom-tooltip";

interface NavbarProps {
  setIsMenuClicked?: Dispatch<SetStateAction<boolean>>;
  isMenuClicked?: boolean;
}

const Navbar = ({ setIsMenuClicked, isMenuClicked }: NavbarProps) => {
  // session
  const session = useSession();

  // Define menu items for the dropdown
  const menuItems: MoreOperationsItem[] = [
    {
      title: "Profile",
      icon: <ProfileOutlined className="mr-2 h-4 w-4" />,
      isClickable: false,
      handleClick: () => {},
    },
    {
      title: "Settings",
      icon: <SettingOutlined className="mr-2 h-4 w-4" />,
      isClickable: false,
      handleClick: () => {},
    },
    {
      title: "Log out",
      icon: <LogoutOutlined className="mr-2 h-4 w-4" />,
      isClickable: true,
      handleClick: async () => await handleSignOut(),
    },
  ];

  const handleMenuToggle = () => {
    // localStorage.setItem("menuToggle", JSON.stringify({ isMenuClicked: true }));
    // setIsMenuClicked(!isMenuClicked);
  };

  return (
    <div className="sticky top-0 left-0 right-0 overflow-y-hidden p-2 flex justify-between items-center border-b border-gray-200 w-full">
      {/* Hamburger Menu */}
      {/* <TooltipButton
        icon={<MenuOutlined />}
        tooltipText="Main menu"
        onClick={handleMenuToggle}
      /> */}

      {/* Search Bar */}
      <div className="w-[40%] mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchOutlined />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl pl-10 pr-4 py-2 rounded bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:bg-white focus:shadow"
          />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center flex-shrink-0">
        <h1 className="font-medium mr-3">{session?.data?.user?.name || ""}</h1>
        <CustomDropdown menuitems={menuItems || []} direction="end">
          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
            <Image
              src={
                session?.data?.user?.image ??
                "https://avatars.githubusercontent.com/u/1?v=4"
              }
              alt="User Avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        </CustomDropdown>
      </div>
    </div>
  );
};

export default Navbar;
