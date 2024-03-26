import { PERMIT2_ADDRESS } from '@uniswap/permit2-sdk'

type Permit2Addresses = {
  [chainId: number]: string
}

export const getPermit2 = (chainId: number | undefined): string => {
  if (!chainId) return PERMIT2_ADDRESS
  const permit2Addresses: Permit2Addresses = {
    48900: '0x57a2aA8C06dCA6D383Aa5618db4a3EcFfE42A654',
    48899: '0x57a2aA8C06dCA6D383Aa5618db4a3EcFfE42A654',
  }
  return permit2Addresses[chainId] ? permit2Addresses[chainId] : PERMIT2_ADDRESS
}
