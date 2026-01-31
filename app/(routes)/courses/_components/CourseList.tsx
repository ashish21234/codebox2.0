'use client'
import axios from 'axios'
import { ChartNoAxesColumnIncreasingIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export type Course={
    id:number,
    courseId:number,
    title:string,
    desc:string,
    bannerImage:string,
    level:string,
    tag:string,
    chapters?:Chapter[],
    userEnrolled?:boolean,
    courseEnrolledInfo?:CourseEnrolledInfo,
    completedExercises?:CompletedExercises[]
}

type CompletedExercises={
    chapterId:number,
    courseId:number,
    exerciseId:number
}
type CourseEnrolledInfo={
    xpEarned:number,
    enrolledDate:any
}
type Chapter={
    chapterId:number,
    courseId:number,
    desc:string,
    name:string,
    id:number,
    exercises:exercise[]
}
type exercise={
        name:string,
        slug:string,
        xp:number,
        difficulty:string
}
function CourseList() {
    const [courseList,setCourseList]=useState<Course[]>([])
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        getAllCourses();
    },[])
    const getAllCourses = async () =>{
        try{
            setLoading(true);
            const result = await axios.get('/api/course');
            console.log(result);
            setCourseList(result?.data || []);
        }catch(error){
            console.error('Failed to fetch courses', error);
        }finally{
            setLoading(false);
        }
    } 
        
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-3'>
        {loading && <p>Loading courses...</p>}
        {!loading && courseList?.map((course: Course,index: number)=>(
            <Link href={'/courses/'+course?.courseId} key={index}>
            <div className='border-4 rounded-xl hover:bg-zinc-900 cursor-pointer'>
                <Image 
                    src={(course?.bannerImage).trimEnd()} 
                    width={400} 
                    height={400} 
                    alt={course.title}
                    className='w-full h-[200px]  object-cover rounded-t-lg'
                />
                <div className='p-4'>
                    <h2 className='font-game text-2xl'>{course?.title}</h2>
                    <p className='font-game text-xl text-gray-400 line-clamp-2'>{course?.desc}</p>
                    <h2 className='bg-zinc-800 inline-flex gap-2 font-game p-1 mt-3 px-4 rounded-2xl items-center'>
                        <ChartNoAxesColumnIncreasingIcon className='h-3 w-4'/>
                        {course?.level}
                    </h2>
                    </div>
            </div>
            </Link>
        ))}
    </div>
  )
}

export default CourseList