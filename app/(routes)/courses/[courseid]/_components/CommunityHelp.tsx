import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function CommunityHelp() {
  return (
    <div className='font-game p-4 border-4 rounded-xl mt-7 flex items-center flex-col'>
        <h2 className='text-3xl'>Need Help?</h2>
        <p className='text-2xl'>Ask Questions in our Community</p>
        <Link href={'/contact-us'}>
        <Button className='text-2xl mt-3' variant={'pixel'} size={'lg'}>Go To Community</Button>
        </Link>
    </div>
  )
}

export default CommunityHelp