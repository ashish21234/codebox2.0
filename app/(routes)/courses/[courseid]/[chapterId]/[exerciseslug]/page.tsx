'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import 'react-splitter-layout/lib/index.css';

const SplitterLayout = dynamic(() => import('react-splitter-layout'), { ssr: false });
import { CompletedExercises, exercise } from '../../../_components/CourseList';
import ContentSection from './_components/ContentSection';
import CodeEditor from './_components/CodeEditor';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

 export type CourseExercise={
  chapterId:number,
  courseId:number,
  desc:string,
  name:string,
  exercises:exercise[],

   prevChapter?: {
    chapterId: number;
    exercises: exercise[];
  };

  nextChapter?: {
    chapterId: number;
    exercises: exercise[];
  };

  exerciseData:ExerciseData,
  completedExercise:CompletedExercises[]

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
const [ExerciseInfo,setExerciseInfo]=useState<exercise>();
const [CourseExerciseData,setCourseExerciseData]=useState<CourseExercise>();
const [nextButtonRoute,setNextButtonRoute]=useState<string>();
const [prevButtonRoute,setPrevButtonRoute]=useState<string>();

useEffect(() => {
  if (courseid && chapterId && exerciseslug) {
    GetExerciseCourseDetail();
  }
}, [courseid, chapterId, exerciseslug]);


const GetExerciseCourseDetail = async () => {
  setLoading(true);
  const result = await axios.post('/api/exercise',{
    courseId:courseid,
    chapterId:chapterId,
    exerciseId:exerciseslug
  })
  setLoading(false);
  console.log(result.data);
  setCourseExerciseData(result.data);
}


useEffect(() => {
  if (!CourseExerciseData) return;

  GetExerciseDetail();
  GetNavigationButtons();
}, [CourseExerciseData, exerciseslug]);




const GetNavigationButtons = () => {
  if (!CourseExerciseData) return;

  const { exercises, prevChapter, nextChapter } = CourseExerciseData;

  const currentIndex = exercises.findIndex(
    (item) => item.slug === exerciseslug
  );

  /* ---------- PREVIOUS ---------- */
  if (currentIndex > 0) {
    setPrevButtonRoute(
      `/courses/${courseid}/${chapterId}/${exercises[currentIndex - 1].slug}`
    );
  } else if (prevChapter && prevChapter.exercises.length > 0) {
    const lastExercise =
      prevChapter.exercises[prevChapter.exercises.length - 1];

    setPrevButtonRoute(
      `/courses/${courseid}/${prevChapter.chapterId}/${lastExercise.slug}`
    );
  } else {
    setPrevButtonRoute(`/courses/${courseid}`);
  }

  /* ---------- NEXT ---------- */
  if (currentIndex < exercises.length - 1) {
    setNextButtonRoute(
      `/courses/${courseid}/${chapterId}/${exercises[currentIndex + 1].slug}`
    );
  } else if (nextChapter && nextChapter.exercises.length > 0) {
    const firstExercise = nextChapter.exercises[0];

    setNextButtonRoute(
      `/courses/${courseid}/${nextChapter.chapterId}/${firstExercise.slug}`
    );
  } else {
    setNextButtonRoute(undefined); // course finished
  }
};



const GetExerciseDetail=()=>{
  const ExerciseInfo=CourseExerciseData?.exercises?.find((item)=>item.slug==exerciseslug);
  setExerciseInfo(ExerciseInfo);
}


  useEffect(()=>{
     document.body.style.overflow = 'hidden';
     return () => {
       document.body.style.overflow = '';
     };
  },[])


  return (
    <div className='border-t-4'>
        <SplitterLayout percentage primaryMinSize={40} secondaryInitialSize={60}>
        <div><ContentSection courseExerciseData={CourseExerciseData} loading={loading}/></div>
        <div><CodeEditor courseExerciseData={CourseExerciseData} loading={loading}/></div>
      </SplitterLayout>
      <div className="font-game fixed bottom-0 w-full bg-zinc-900 flex p-3 justify-between items-center">
        <Link href={prevButtonRoute??'/courses/'+courseid}>
      <Button variant={'pixel'} className="text-xl">Previous</Button>
      </Link>
      <div className='flex gap-2 items-center'>
        <Image src='/star.ico' alt='star' width={30} height={30}/>
        <h2 className='text-xl'>You can Earn <span className='text-4xl'>{ExerciseInfo?.xp}</span> Xp</h2>

      </div>
      <Link href={nextButtonRoute??'/courses/'+courseid}>
      <Button variant={'pixel'} className="text-xl">Next</Button>
      </Link>
    </div>
    </div>
  )
}

export default Playground