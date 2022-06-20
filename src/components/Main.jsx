import React from "react";
import { TransactionContext } from "../context/TransactionContext";
import { useContext } from "react";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className=""
  />
);

const Main = () => {
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
    <div className="mainContainer">
      {/* 左側 */}
      <div className="cryptContainer">
        <h1 className="title">Crypt Card</h1>

        <button type="button" onClick={connectWallet} className="">
          <p className="buttonText">ウォレット連携</p>
        </button>
      </div>
      {/* 右側のInput */}

      <div className="inputContainer">
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

        <button type="button" onClick={(e) => handleSubmit(e)} className="">
          送信
        </button>
      </div>
    </div>
  );
};

export default Main;
