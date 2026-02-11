import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import { CourseExercise } from "../page";
import { Button } from "@/components/ui/button";
import { monokaiPro } from "@codesandbox/sandpack-themes";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
type Props={
  courseExerciseData: CourseExercise | undefined,
  loading:boolean
}
function CodeEditor({ courseExerciseData,loading}:Props) {
  const {exerciseslug}=useParams();
  const [isCompletedLocally, setIsCompletedLocally] = useState(false);
  
  const exerciseIndex=courseExerciseData?.exercises?.findIndex(item=>item.slug==exerciseslug)
const isCompleted=isCompletedLocally || courseExerciseData?.completedExercise?.find(item=>item.exerciseId==Number(exerciseIndex)+1);
  const onCompletedExercise= async()=>{
    
    if(exerciseIndex==undefined){
      return ;
    }
    const result = await axios.post('/api/exercise/complete', {
      courseId:courseExerciseData?.courseId,
      chapterId:courseExerciseData?.chapterId,
      exerciseId:exerciseIndex+1,
      xpEarned:courseExerciseData?.exercises[exerciseIndex].xp
  })
  console.log(result);
  toast.success('Exercise completed!');
  setIsCompletedLocally(true);
  }
  const starterCode =
    courseExerciseData?.exerciseData?.exerciseContent?.starterCode;

  if (!starterCode) return null;

  // ⭐ ONE LINE FIX
  const files = {
    [starterCode.filename]: {
      code: starterCode.code,
    },
  };
const CodeEditorChildren=({onCompletedExercise,isCompleted}:any)=>{
  const {sandpack}=useSandpack();
  return(
    <div className="font-game absolute bottom-40 flex gap-5 right-5">
      <Button variant={'pixel'} size={'lg'} className="text-xl" onClick={()=>sandpack.runSandpack()}>Run Code</Button>
      <Button variant={'pixel'} className="bg-[#a3e534] text-xl" size={'lg'}  disabled={isCompleted} onClick={()=>onCompletedExercise()}>
        {isCompleted?'Already Completed!':'Mark Completed'}</Button>
    </div>
  )
}
  return (
    
    <SandpackProvider
    //@ts-ignore
      template={courseExerciseData?.editorType??'static'}
      customSetup={{ entry: "/index.html" }}
      files={files}
      style={{ height: "100vh" }}
      theme={monokaiPro}
      options={{
        autorun:false,
        autoReload:false
      }}
    >
      <SandpackLayout style={{ height: "100%" }}>
        <SplitterLayout percentage secondaryInitialSize={50}>
          <div className="relative h-full">
          <SandpackCodeEditor showTabs style={{ height: "100%" }}/>
          <CodeEditorChildren onCompletedExercise={onCompletedExercise} isCompleted={isCompleted}/></div>
           
          <SandpackPreview showNavigator showOpenInCodeSandbox={false}  showOpenNewtab style={{ height: "100%" }}/>
        </SplitterLayout>
      </SandpackLayout>
    </SandpackProvider>
    
   
  );
}

export default CodeEditor;
