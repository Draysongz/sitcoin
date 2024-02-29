import React, {useMemo, FC} from "react";
import Dashboard from './Components/Dashboard';
import {Routes, Route} from 'react-router-dom'
import { ConnectionProvider,
WalletProvider } from "@solana/wallet-adapter-react";
import * as web3 from '@solana/web3.js'
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function App() {
  const endpoint =  "https://shy-old-meme.solana-mainnet.quiknode.pro/c5ecdc3056fa2c1b7e3f13d3f0f1cbdc0c583ddb/";
  const wallets = useMemo(()=> [], [])


  return (
    <div className="App">
      <ConnectionProvider endpoint={endpoint} >
      <WalletProvider wallets={wallets}>
      <WalletModalProvider>
      
     <Routes>
      <Route path='/' element={< Dashboard />} />
     
     </Routes>
     </WalletModalProvider>
    </WalletProvider>
    </ConnectionProvider>
    </div>
    
  );
}

export default App;
