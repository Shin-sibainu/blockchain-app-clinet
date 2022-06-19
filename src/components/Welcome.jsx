import React from "react";

import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import Loader from "./Loader";
import { useContext } from "react";

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
  } = useContext(TransactionContext);

  const isLoading = false;

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-center md:p-20 py-12 px-4 space-x-20">
        {/* 左側 */}
        <div className="flex flex-1 items-start flex-col md:mr-10 mt-32">
          <h1 className="lg:text-7xl sm:text-5xl text-white py-1">
            Crypt Card
          </h1>

          {currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-10 bg-[#6b407d] p-3 rounded-full cursor-pointer hover:bg-[#985688] duration-300"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                ウォレット連携
              </p>
            </button>
          )}
        </div>
        {/* 右側のInput */}
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center white-glassmorphism">
            <Input
              placeholder="住所"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="通貨(ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="キーワード(Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="メッセージ"
              name="message"
              type="text"
              handleChange={handleChange}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                送信
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
