import React from 'react'
import { Box, Text, Flex, Heading, HStack, Icon, Button, Link, useDisclosure,  Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, } from '@chakra-ui/react'
    import {HamburgerIcon} from '@chakra-ui/icons'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { MdSpaceDashboard } from "react-icons/md";
import { MdCandlestickChart } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

const MobileNav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex alignItems={'center'} display={['flex', 'flex', 'flex', 'none']} bgColor={'#edeeee'} p={1 } gap={5}>


        <Button color={'#005287'} onClick={onOpen}>
        <Icon as={HamburgerIcon} boxSize={6}/>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        // finalFocusRef={btnRef}
        
      >
        <DrawerOverlay />
        <DrawerContent bg={'#1f1f1f'} color={'#8b8b8f'} >
          <DrawerCloseButton />

          <DrawerBody>
            <Flex py={10}  direction={'column'} gap={10} >
            <Box>
            <WalletMultiButton/>
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
        
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </Flex>
  )
}

export default MobileNav