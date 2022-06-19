import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext();

const { ethereum } = window;

//イーサリアムのコントラクトを取得
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI, //コントラクトをコンパイルしたJSON形式のデータをABIとして持つ。
    signer
  );

  console.log({
    provider,
    signer,
    transactionContract,
  });

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  //メタマスクと連携しているのかをまずは確認しよう
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("メタマスクをインストールしてください");

      //メタマスクのアカウントIDを取得
      const accounts = await ethereum.request({ method: "eth_accounts" });

      console.log(accounts);

      //すでにメタマスクのアカウントを１つでも持っているなら
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        //getAllTransactions();
      } else {
        console.log("アカウントが見つかりませんでした");
      }
    } catch (err) {
      console.log(err);
      throw new Error("イーサリアムオブジェクトがありません。");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("メタマスクをインストールしてください");

      //メタマスクを持っていればアカウントをリクエストする。
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
      throw new Error("イーサリアムオブジェクトがありません。");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("メタマスクをインストールしてください");

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", //21000 GWEI
            value: parsedAmount._hex, //0.00001
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockChain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log(`ローディング - ${transactionHash.hash}`);
      await transactionHash.wait();
    } catch (err) {
      console.log(err);
      throw new Error("イーサリアムオブジェクトがありません。");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
