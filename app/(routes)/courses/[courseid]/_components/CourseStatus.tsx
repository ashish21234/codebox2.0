import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Course } from '../../_components/CourseList'
type Props={
    courseDetail:Course|undefined
}

function CourseStatus({courseDetail}:Props) {
    const [counts,setCounts]=useState<{
              totalExce: number,
              totalXp:number
    }>({ totalExce: 0, totalXp: 0 })

    useEffect(()=>{
        if (courseDetail) {
            let totalExercises = 0;
            let totalXp = 0;
            courseDetail.chapters?.forEach((chapter) => {
                totalExercises += chapter?.exercises?.length ?? 0;
                chapter?.exercises?.forEach((exercise) => {
                    totalXp += exercise?.xp ?? 0;
                })
            })
            setCounts({
                totalExce: totalExercises,
                totalXp: totalXp
            })
        }
    },[courseDetail])
    const UpdateProgress=(currentValue:number,totalValue:number)=>{
        if(currentValue&&totalValue){
            const perc=(currentValue*100)/totalValue;
            return perc;
        }
        return 0;
    }
  return (
    <div className='font-game p-4 border-4 rounded-xl w-full'>
        <h2 className='text-3xl'>
           Course Progress
        </h2>
        <div className='flex items-center gap-5 mt-4'>
            <Image src={'/books.png'} alt='book' width={50} height={50}/>
            <div className='w-full'>
            <h2 className='flex justify-between text-2xl w-full'>Exercises 
                <span className='text-gray-400'>{courseDetail?.completedExercises?.length}/{counts?.totalExce}</span></h2>
            <Progress value={UpdateProgress(courseDetail?.completedExercises?.length??0,counts?.totalExce)} className='mt-2'/>
            </div>
        </div>

        <div className='flex items-center gap-5 mt-4'>
            <Image src={'/star.ico'} alt='book' width={50} height={50}/>
            <div className='w-full'>
            <h2 className='flex justify-between text-2xl w-full'>XP Earned
                <span className='text-gray-400'>{courseDetail?.courseEnrolledInfo?.xpEarned}/{counts?.totalXp}</span></h2>
            <Progress value={UpdateProgress(courseDetail?.courseEnrolledInfo?.xpEarned??0,counts?.totalXp)} className='mt-2'/>
            </div>
        </div>
    </div>
  )
}

export default CourseStatus