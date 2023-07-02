'use client'
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme,
  } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    zora,
    sepolia,
  } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


export default function Navbar({children}){
    const { chains, publicClient } = configureChains(
        [mainnet, polygon, optimism, arbitrum, zora,sepolia],
        [
          alchemyProvider({ apiKey: "aY4A_HeY-ILaTfkvSm8P4Kh2gNxayqBG" }),
          publicProvider()
        ]
    );

    const { connectors } = getDefaultWallets({
        appName: 'My RainbowKit App',
        projectId: '7a81b60db81d4ef0f7d4a734d087712c',
        chains
      });
       
    const wagmiConfig = createConfig({
        autoConnect: true,
        connectors,
        publicClient
      })

    
    return (
        <>
            <WagmiConfig config={wagmiConfig}> 
            <RainbowKitProvider  theme={darkTheme({
                accentColor: '#7b3fe4',
                accentColorForeground: 'white',
                borderRadius: 'medium',
            })}  chains={chains}>
                 <nav className="bg-white border-gray-200 dark:bg-gray-900">
                    <div className=" flex flex-row  items-center justify-between mx-auto p-2">
                        <div className="w-1/2 mt-2">
                            <ConnectButton />
                        </div>
                    <div className="hidden w-1/2 h-full  md:block " id="navbar-default">
                    <ul className="font-medium flex flex-col items-end justify-end  p-2 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                        <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                        </li>
                        <li>
                        <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">About</a>
                        </li>
                    </ul>
                    </div>
                    </div>
                </nav>
                
            {children}
            </RainbowKitProvider>
            </WagmiConfig>
        </>
    )
}