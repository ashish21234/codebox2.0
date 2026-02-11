'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { UserButton, useUser, SignedIn, SignedOut } from '@clerk/nextjs'
import { useParams, usePathname } from 'next/navigation'
import axios from 'axios'
import { Course } from '../(routes)/courses/_components/CourseList'

function Header() {
  const {user} = useUser();
  const path = usePathname();
  const {exerciseslug}=useParams();
  const [courses,setCourses]=useState<Course[]>();
useEffect(()=>{
  GetCourses();
},[])

  const GetCourses=async()=>{
    const result= await axios.get('/api/course');
    console.log(result.data);
    setCourses(result.data);
  }
  return (
    <div className="p-4 max-w-7xl flex justify-between w-full items-center font-game">
      <div className='flex gap-2 items-center'>
        
        <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
        <Link href={'/'}>
      <h2 className='font-bold text-3xl font-game'>CodeBox  </h2>
        </Link>
      </div>
      {!exerciseslug&&courses ? <NavigationMenu>
  <NavigationMenuList className='gap-8'>
    <NavigationMenuItem>
      <NavigationMenuTrigger className='text-xl'>Courses</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className='grid grid-cols-2 gap-2 w-80 md:w-96 text-xl'>
            {courses.map((course,index)=>(
                <Link href={'/courses/'+course?.courseId} key={index}>
                  <div className='p-2 hover:bg-accent rounded-xl cursor-pointer'>
                      <h2 className='font-medium'>{course?.title}</h2>
                      <p className='text-sm text-gray-500'>{course.desc}</p>
                  </div>
               </Link>
              ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuLink asChild className='text-xl'>
        <Link href={'/projects'}>Projects</Link>
    </NavigationMenuLink>
    <NavigationMenuLink asChild className='text-xl'>
        <Link href={'/pricing'}>Pricing</Link>
    </NavigationMenuLink>
    <NavigationMenuLink asChild className='text-xl'>
        <Link href={'/Contact-us'}>Contact Us</Link>
    </NavigationMenuLink>
  </NavigationMenuList>
</NavigationMenu>:
<h2 className='text-2xl'>{exerciseslug?.toString()?.replaceAll('-', ' ').toLocaleUpperCase()}</h2>
}
      {!user ? 
      <Link href={'/sign-in'}>
      <Button className='font-game text-2xl' variant={'pixel'}>Signup</Button> </Link>
      :<div className='flex items-center gap-4'>
      <Link href={'/dashboard'}>
      <Button className='font-game text-2xl px-4 py-2' variant={'pixel'}>Dashboard</Button></Link>
      <UserButton />
      </div>}
    </div>
  )
}

export default Header
