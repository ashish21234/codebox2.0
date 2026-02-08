'use client'
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { set } from 'date-fns';
import { serial } from 'drizzle-orm/mysql-core';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import CourseProgressCard from './CourseProgressCard';

export type EnrolledCourseInfo={
bannerImage:string,
courseId:number,
completedExercises:number,
level:string,
title:string,
totalExercises:number,
xpEarned:number
}
function EnrolledCourses() {
    const [enrolledcourses, setEnrolledCourses]=useState<EnrolledCourseInfo[]>([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        GetUserEnrolledCourse();
    },[])

    const GetUserEnrolledCourse=async ()=>{
      setLoading(true);
        const res=await axios.get('/api/course?courseid=enrolled');
       setEnrolledCourses(res?.data);
       console.log(res?.data);
       setLoading(false);
    }
  return (
    <div className='mt-8'>
        <h2 className='text-3xl mb-2 font-game'>Your Enrolled Courses</h2>
        {loading&&<Skeleton className='w-full rounded-2xl my-5'/>}
        {enrolledcourses?.length==0 ? 
        <div className='flex flex-col items-center gap-3 p-7 border rounded-2xl bg-zinc-900'>
            <Image src={'/books.png'} alt='book' width={90} height={90} />
            <h2 className='font-game text-2xl'>You Don't have any enrolled courses</h2>
            <Link href={'/courses'}>  
            <Button variant={'pixel'} size={'lg'} className='font-game text-lg'>Browse All Courses</Button>
            </Link>

            </div>
            :
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
                 {enrolledcourses.map((course:any,index:number)=>(
                  <div key={index}>
                      <CourseProgressCard course={course}/>
                    </div>
                 ))}
                 </div>
            }
    </div>
  )
}

export default EnrolledCourses