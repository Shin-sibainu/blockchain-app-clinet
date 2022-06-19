import React from "react";

import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <h2 className="text-white font-bold text-3xl">BlockChains</h2>
      </div>
      <ul className="text-white md:flex list-none flex-row justify-between items-center flex-initial">
        <li className="mx-4 cursor-pointer Market">マーケット</li>
        <li className="mx-4 cursor-pointer Exchange">交換</li>
        <li className="mx-4 cursor-pointer BlockChain">ブロックチェーン</li>
        <li className="mx-4 cursor-pointer Wallets">ウォレット</li>
        <li className="bg-[#6b407d] py-2 px-7 rounded-full cursor-pointer hover:bg-[#985688] duration-300">
          ログイン
        </li>
      </ul>
      {/* <div className="flex relative"></div> */}
    </nav>
  );
};

export default Navbar;
