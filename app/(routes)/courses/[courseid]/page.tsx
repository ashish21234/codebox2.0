"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseDetailBanner from './_components/CourseDetailBanner';
import axios from 'axios';
import { Course } from '../_components/CourseList';
import CourseChapter from './_components/CourseChapter';
import CourseStatus from './_components/CourseStatus';
import UpgradeToPro from '@/app/_components/UpgradeToPro';
import CommunityHelp from './_components/CommunityHelp';

export default function CourseDetail() {
    const {courseid}=useParams();
    const [courseDetail,setCourseDetail]=useState<Course>();
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        courseid&&GetCourseDetail();
    },[courseid])

    const GetCourseDetail=async()=>{
      setLoading(true);
        const result=await axios.get('/api/course?courseid='+courseid);
        console.log(result.data);
        setCourseDetail(result.data);
        setLoading(false);
    }
    
  return (
    <div><CourseDetailBanner loading={loading} courseDetail={courseDetail} refreshData={()=>GetCourseDetail()}/>
    <div className='grid grid-cols-3 p-10 md:px-24 lg:px-36 gap-7'>
      <div className='col-span-2'>
        <CourseChapter loading={loading} courseDetail={courseDetail}/>
        </div>
        <div className='col-span-1'>
        <CourseStatus courseDetail={courseDetail}/>
        <UpgradeToPro/>
        <CommunityHelp/>
        </div>
    </div>
    </div>
  )
}
