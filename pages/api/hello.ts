// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from '@/types/global'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Data>>
) {
  try {
    res.status(200).json({ 
      success: true,
      data: { name: 'Santiago Olayo' }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}
