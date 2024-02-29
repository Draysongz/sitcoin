import React, { useEffect, useState, FC } from 'react';
import { Box, Flex, Text, Heading, Input, Button, Icon, HStack, Center, Image, CardBody, Card } from '@chakra-ui/react'
import { MdSpaceDashboard } from "react-icons/md";
import { MdCandlestickChart } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import Typed from 'typed.js';
import sit from './sit.png'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import broke from './broke4.png'
import mask from './mask.png'
import { ChevronDownIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import MobileNav from './MobileNav';


const Dashboard = () => {

  const {connection} = useConnection()
  const {publicKey, sendTransaction } = useWallet()
  const [trunk, setTrunk] = useState('')
  const [isHidden, setIsHidden] = useState(true)


  function truncatePublicKey(publicKey, firstPartLength, lastPartLength){
    const base58Key = publicKey.toBase58();
    const firstPart = base58Key.slice(0, firstPartLength);
    const lastPart = base58Key.slice(-lastPartLength);
    return `${firstPart}.....${lastPart}`;
}

const getTransactions = async (publicKey, limit) =>{
  const pubKey = new PublicKey(publicKey)
  let transactionList = await connection.getSignaturesForAddress(pubKey, {limit:limit});
  let signatureList = transactionList.map(transaction=>transaction.signature);
  let transactionDetails = await connection.getParsedTransactions(signatureList, {maxSupportedTransactionVersion:0});

  transactionList.forEach((transaction, i) => {
      const date = new Date(transaction.blockTime*1000);
      const transactionInstructions = transactionDetails[i].transaction.message.instructions;
      console.log(`Transaction No: ${i+1}`);
      console.log(`Signature: ${transaction.signature}`);
      console.log(`Time: ${date}`);
      console.log(`Status: ${transaction.confirmationStatus}`);
      transactionInstructions.forEach((instruction, n)=>{
          if(instruction.parsed && instruction['parsed']['type'] == 'transferChecked'){
            console.log(`---Instructions ${n+1}: ${instruction.parsed.info.tokenAmount.uiAmount}`);
          }
      })
      console.log(transactionInstructions)
      console.log(("-").repeat(20));
  })
}

useEffect(()=>{
  if(!publicKey){
    return ;
  }
  getTransactions(publicKey, 10)
  const trunkey = truncatePublicKey(publicKey, 4, 4 )
  setTrunk(trunkey)
}, [publicKey])





  return (
    <Flex minH={'120vh'} bg={'#101010'}>
        <Flex display={['none', 'none', 'flex', 'flex']} p={5} bg={'#1f1f1f'} w={'18vw'} justifyContent={'space-evenly'} direction={'column'} color={'#8b8b8f'}>
         <Box>
          <Image src={sit}  alt='logo' />
         </Box>
        <HStack _hover={{
            background: '#0baab5',
            color: 'white'
          }} p={4} borderRadius={'15px'} cursor={'pointer'}>
            <Icon as={MdSpaceDashboard} boxSize={6} color={'white'} />
            <Text fontSize={'medium'}>Dashboard</Text>
          </HStack>

          <HStack _hover={{
            background: '#0baab5',
            color: 'white'
          }} p={4} borderRadius={'15px'} cursor={'pointer'}>
            <Icon as={MdCandlestickChart} boxSize={6} color={'white'} />
            <Text fontSize={'medium'}>Markets</Text>
          </HStack>

          <HStack _hover={{
            background: '#0baab5',
            color: 'white'
          }} p={4} borderRadius={'15px'} cursor={'pointer'}>
            <Icon as={GrTransaction} boxSize={6} color={'white'} />
            <Text fontSize={'medium'}>Transactions</Text>
          </HStack>

          <HStack>
           <WalletDisconnectButton />
          </HStack>
        </Flex>

        <Flex p={['3%', '3%', '1%', '1%']} color={'white'} direction={'column'} w={['100vw', '100vw', '82vw', '82vw']} gap={10} > 
        <Flex justifyContent={'space-between'}  alignItems={'center'} borderBottom={'1px solid white'} py={2}>
        <Image  src={sit}  alt='logo' w={['40%', '40%', '40%', '20%']} />
        <Box display={['none', 'none', 'block', 'block']}>
        <WalletMultiButton />
        </Box>
        
        <MobileNav />
          
        </Flex>
          {!publicKey ? <Card  bg={'#1f1f1f'} color={'#d1d5db'} >
            <CardBody>
              
              <Flex direction={'column'} minH={'30vh'} justifyContent={'center'} alignItems={'center'}>
                <Box   >
                <Heading textAlign={['center', 'center', 'left', 'left']}  fontSize={['xl', 'xl', '2xl', '2xl']}>Connect your wallet to view earnings! </Heading>
                </Box>
              </Flex>
            </CardBody>
          </Card> : 
          <Flex direction={'column'}  >
            <Flex direction={['column', 'column', 'row', 'row']} justifyContent={'space-between'} p={2} gap={['7%', '7%', '0%', '0%']} >
              <Card bg={'#1f1f1f'} color={'#d1d5db'}>
                <CardBody>
                  <Flex w={['80vw', '80vw', '28vw', '28vw']} h={['50vh', '50vh', '50vh', '50vh']}  direction={'column'} justifyContent={'center'} gap={['10%', '10%', '0%', '0%']}   >
                    <Text fontSize={'xl'}>Token Allocation</Text>
                  
                      <Image alignSelf={'center'} src={broke} alt='broke' w={'40%'}/>
                   
                  </Flex>
                </CardBody>
              </Card>

              <Card  bg={'#1f1f1f'} color={'#d1d5db'}>
                <CardBody>
                <Flex w={['80vw', '80vw', '40vw','40vw']} minH={['30vh', '30vh', '50vh','50vh']} direction={'column'}>
                    <Flex p={['3%', '3%', '10%', '10%']}  justifyContent={'center'} alignItems={'center'} w={'100%'}>
                      <Flex direction={'column'}  gap={3}  >
                        <Image src={mask} alt='wallet' w={'50%'} />
                        <HStack backgroundColor={'#343434'} spacing={['4%', '4%', '8%', '8%']} letterSpacing={1} w={'13vw'} borderRadius={'10px'} p={[null, null, '3%', '3%']}>
                          <Text fontSize={['medium', 'medium', 'large', 'large']}>{trunk}</Text>
                          <Icon as={ChevronDownIcon} boxSize={6} />
                        </HStack>
                        
                      </Flex>
                      <Flex direction={'column'} w={['30%', '30%','50% ','50% ']}>
                        <HStack spacing={10}>
                          <Text fontSize={['medium', 'medium', 'xl', 'xl']}>Net Worth</Text>
                          
                          <Icon cursor={'pointer'} as={isHidden ? ViewOffIcon : ViewIcon} onClick={()=>setIsHidden(!isHidden)} />
                        </HStack>
                        {isHidden ?  <Text fontSize={'2xl'}  >****</Text> : <Text fontSize={'2xl'}  >$0.00</Text>  }
                       
                      </Flex>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            </Flex>
          </Flex>
          }
      
        </Flex>

        
    </Flex>
  )
}

export default Dashboard