import React from "react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import cn from "bem-cn-lite";

import "./Wallet.scss";

const b = cn("tc-wallet");

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export const Wallet = (props) => {
  return (
    <WalletModalProvider>
      <div className={b()}>
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
    </WalletModalProvider>
  );
};
