'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { exercise } from '../../../_components/CourseList';
import ContentSection from './_components/ContentSection';
 export type CourseExercise={
  chapterId:number,
  courseId:number,
  desc:string,
  name:string,
  exercises:exercise[],
  exerciseData:ExerciseData

}

type ExerciseData={
  chapterId:number,
  courseId:number,
  exerciseId:string,
  exerciseName:string,
  exerciseContent:ExerciseContent
}

type ExerciseContent={
 content:string,
 hint:string,
 hintXp:string,
 starterCode:any,
 task:string
}


function Playground() {
const {courseid,chapterId,exerciseslug}=useParams();
const [loading,setLoading]=useState(false);

const [CourseExerciseData,setCourseExerciseData]=useState<CourseExercise>();
useEffect(()=>{
  GetExerciseCourseDetail();
},[])
   
const GetExerciseCourseDetail = async () => {
  setLoading(true);
  const result = await axios.post('/api/exercise',{
    courseId:courseid,
    chapterId:chapterId,
    exerciseId:exerciseslug
  
  }

  )
  setLoading(false);
  console.log(result.data);
  setCourseExerciseData(result.data);
}
  return (
    <div className='border-t-4'>
        <SplitterLayout percentage primaryMinSize={40} secondaryInitialSize={60}>
        <div><ContentSection courseExerciseData={CourseExerciseData} loading={loading}/></div>
        <div>Code Editor</div>
      </SplitterLayout>
    </div>
  )
}

export default Playground