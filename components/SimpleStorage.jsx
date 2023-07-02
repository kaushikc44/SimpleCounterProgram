'use client'
import { useContractRead,usePrepareContractWrite, useContractWrite  } from "wagmi"
import {useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { useWaitForTransaction } from 'wagmi'
import Success from "./Success"
import Button from '@mui/material/Button';
import Spinner from "./Spinner";


const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "counter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "increment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export default function SimpleStorage(){
    const [countervalue,setCounterValue] = useState(0)
    const {address,isConnecting,isDisconnected,isConnected} = useAccount()
    const  [successStatus,setsuccessStatus] = useState(false)
    const [rotating,setRotating] = useState(false)
    console.log(isConnected)
    console.log(address)
    
    const {data:CounterValue,isError,isLoading} = useContractRead({
        address:"0x9a2b8157348F2D04154e8f79b09EB77D2c506A17",
        abi:abi,
        functionName:"getCounter",
        watch: true
    })
  
    
    const { config:increment, error } = usePrepareContractWrite({
        address: '0x9a2b8157348F2D04154e8f79b09EB77D2c506A17',
        abi: abi,
        functionName: 'increment',
        })
    const {data:value, write,isSuccess:writeTransactionexecuted,isLoading:contractLoading } = useContractWrite(increment)
    
    
    const {data:waitTransaction, isSuccess:ConfimedTransaction,isLoading:transactionLoading,isSuccess:transactionSuccess,isError:transactionError} = useWaitForTransaction({confirmations:2,hash:value?.hash})

    
    

    useEffect(() => {
        if(address){
            setCounterValue(Number(CounterValue))
        }
    },[address,CounterValue]) 
    

    
   

    return (
        <>
            <div className="flex w-full items-center justify-center">{transactionLoading ? <Spinner  /> : null}</div>
            {transactionSuccess ? <Success /> : null}
            <div className="mt-20 flex flex-col items-center justify-items-center ">
                <h1 className="mb-10  text-2xl">The value of Counter is:- <span className="font-bold text-teal-300" >{countervalue}</span></h1>
                <Button color="primary" variant="filledTonal" disabled={!write} onClick={() => write?.()}> Increment </Button>
               
                
            </div>
        </>
    )
    
}