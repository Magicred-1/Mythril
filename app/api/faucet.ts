import type { NextApiRequest, NextApiResponse } from 'next'

import {
  createWalletClient,
  custom,
} from 'viem'

import { privateKeyToAccount } from 'viem/accounts'

import { etherlinkTestnet } from 'viem/chains'

const walletClient = createWalletClient({
  chain: etherlinkTestnet,
  transport: custom("https://node.ghostnet.etherlink.com" as any),
})
 
export async function POST(
  req: NextApiRequest,
) {
  const { user } = req.body

  const account = privateKeyToAccount(process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`)

  const walletAddress = user.data.walletPublicKey;

  const hash = await walletClient.sendTransaction({
    account,
    to: walletAddress,
    value: 1000000000000000000n
  })

  return hash;
}