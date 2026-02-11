'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Hero() {
  const {user} = useUser();
  return (
    <div className='w-full relative h-screen overflow-hidden'>
        <Image src={'/hero1.gif'} alt="Hero" width={1000} height={1000} className='w-full h-full object-cover absolute inset-0' />
        <div className='absolute w-full flex flex-col items-center mt-24'>
          <h2 className='font-bold text-7xl font-game'>Start Your</h2>
          <h2 className='font-bold text-9xl font-game text-yellow-400'
          style={{
            textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0px 2px 0 #000, 2px 0px 0 #000, 0px -2px 0 #000, -2px 0px 0 #000',
          }}>Coding Adventure</h2>
          <h2 className='mt-5 font-game text-3xl'>Beginner friendly coding courses and projects</h2>
          {!user ? (
            <Link href={'/sign-in'}>
              <Button className='mt-7 font-game text-3xl p-6' variant={'pixel'}>Get Started</Button>
            </Link>
          ) : (
            
            <div className="mt-7 p-3 border-2 border-yellow-400 rounded-lg">
              <h2 className="font-game text-3xl font-bold">Welcome back, <span className="text-yellow-400">{user.firstName || 'User'} !</span></h2>
            </div>
             
          )}
        </div>
    </div>
  )
}

export default Hero
