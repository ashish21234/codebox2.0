'use client'
import { UserDetailContext } from '@/context/UserDetailContext';
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useContext } from 'react'

function UserStatus() {
    const {user}=useUser();
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
  return (
    <div className='p-7 border-4 rounded-2xl'>
      <div className='flex gap-3 items-center'>

      
        <Image src="/walking_man.gif" alt='walking_user' width={70} height={70}/>
        <h2>{user?.primaryEmailAddress?.emailAddress}</h2>
        </div>
        <div className='grid grid-cols-2 gap-5'>
           <div className='flex gap-3 items-center'>
            <Image src={'/star.ico'} alt='star' width={35} height={35}/>
            <div>
              <h2 className='font-game text-3xl'>{userDetail?.points}</h2>
              <h2 className='font-game text-xl text-gray-500'>Total Rewards</h2>
            </div>
           </div>
           
           <div className='flex gap-3 items-center'>
            <Image src={'/badge.png'} alt='star' width={35} height={35}/>
            <div>
              <h2 className='font-game text-3xl'>3</h2>
              <h2 className='font-game text-xl text-gray-500'>Badge</h2>
            </div>
           </div>
           <div className='flex gap-3 items-center'>
            <Image src={'/fire.png'} alt='star' width={35} height={35}/>
            <div>
              <h2 className='font-game text-3xl'>12</h2>
              <h2 className='font-game text-xl text-gray-500'> Daily Streak</h2>
            </div>
           </div>
          </div>
    </div>
  )
}

export default UserStatus