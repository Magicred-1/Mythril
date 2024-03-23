import type { NextApiRequest, NextApiResponse } from 'next'

import {
  createPublicClient,
  custom,
} from 'viem'

import { etherlinkTestnet } from 'viem/chains'

const client = createPublicClient({
  chain: etherlinkTestnet,
  transport: custom("https://node.ghostnet.etherlink.com" as any),
})

 
async function POST(req: NextApiRequest) {
  const { signature, walletAddress } = req.body

  const message =  await client.verifySignature({
    address: walletAddress,
    message: "By signing this message, you agree to the terms and conditions of the Mythril platform.",
    signature,
  })
  
  // TODO: Sumsub




  const { request } = await client.simulateContract({
    ...mithrylContract,
    functionName: 'whitelistSubscriber',
    args: [externalUserId],
  })

  const hash = await client.writeContract(request)

  const receipt = await client.getTransactionReceipt(hash)

  return new Response(JSON.stringify({ receipt }), {
    status: 200,
  })
}

export { POST }