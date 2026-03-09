"use client";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  SandpackConsole,
  useSandpackConsole,
} from "@codesandbox/sandpack-react";
import { python } from "@codemirror/lang-python";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import { CourseExercise } from "../page";
import { Button } from "@/components/ui/button";
import { monokaiPro } from "@codesandbox/sandpack-themes";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle, Loader2, Sparkles } from "lucide-react";

type Props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
};

// Define the interface for SandpackConsole ref
interface SandpackConsoleRef {
  reset: () => void;
}

// Helper to generate the HTML that runs Pyodide
const generatePythonIndexHtml = (pythonFileName: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 10px; font-family: monospace; color: #fff; background: #1e1e1e; }
    #status { color: #66d9ef; margin-bottom: 10px; font-size: 12px; }
    .error { color: #f92672; }
  </style>
</head>
<body>
  <div id="status">Initializing Python Engine...</div>
  <script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
  <script>
    async function main() {
      const status = document.getElementById("status");
      try {
        window.pyodide = await loadPyodide({
           indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });
        status.innerText = "Python Ready.";
        
        // Capture all print() output to the terminal
        window.pyodide.setStdout({ batched: (msg) => console.log(msg) });
        window.pyodide.setStderr({ batched: (msg) => console.error(msg) });

        // Fetch the user's code
        const filePath = "${pythonFileName}".startsWith("/") ? "." + "${pythonFileName}" : "./" + "${pythonFileName}";
        const response = await fetch(filePath);
        if (!response.ok) throw new Error("Could not load " + filePath);
        const code = await response.text();

        // CRITICAL FIX: Automatically convert // comments to # to prevent SyntaxErrors
        const cleanCode = code.split('\\n').map(line => {
          const trimmed = line.trimStart();
          if (trimmed.startsWith('//')) {
            return line.replace('//', '#');
          }
          return line;
        }).join('\\n');

        // Run the cleaned code
        await window.pyodide.runPythonAsync(cleanCode);
      } catch (err) {
        status.innerHTML += '<div class="error">' + err.message + '</div>';
        console.error("Python Error:", err);
      }
    }
    main();
  </script>
</body>
</html>
`;

const ConsoleToolbar = ({ consoleRef }: { consoleRef: React.RefObject<SandpackConsoleRef | null> }) => {
  const { logs, reset } = useSandpackConsole({ resetOnPreviewRestart: true });

  return (
    <div className="flex items-center justify-between bg-[#1e1e1e] border-b border-[#333] px-4 py-2">
      <span className="text-sm font-medium text-gray-400">Terminal</span>
      <Button
        variant={"ghost"}
        size={"sm"}
        className="text-white hover:bg-slate-700 h-8"
        onClick={() => {
          if (consoleRef?.current) {
            consoleRef.current.reset();
          } else {
            reset();
          }
        }}
        disabled={!logs || logs.length === 0}
      >
        Clear
      </Button>
    </div>
  );
};

const CodeEditorChildren = ({ onCompletedExercise, isCompleted, starterCode, courseExerciseData }: any) => {
  const { sandpack } = useSandpack();
  const [open, setOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleAskAI = async () => {
    if (!prompt) return;
    setAiLoading(true);
    setAiResponse("");

    const code = sandpack.files[starterCode.filename].code;

    try {
      const result = await axios.post("/api/ai", {
        prompt: prompt,
        code: code,
        exerciseContext: {
          task: courseExerciseData?.exerciseData?.exerciseContent?.task,
          content: courseExerciseData?.exerciseData?.exerciseContent?.content,
        }
      });
      setAiResponse(result.data.result);
    } catch (error) {
      toast.error("Failed to get AI response");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="font-game absolute bottom-40 z-20 flex gap-5 right-5">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 shadow-lg flex items-center justify-center p-0">
            <Sparkles size={30} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] w-full h-[90vh] flex flex-col bg-white text-black p-10 shadow-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">CodeBox AI Mentor</DialogTitle>
            <DialogDescription className="text-lg">
              Ask for hints, explanations, or code reviews.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6 flex-1 h-full overflow-hidden">
            <textarea
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg text-black focus:border-blue-500 focus:ring-0 resize-none shadow-sm"
              placeholder="E.g., Why is my code failing? or How do I center this div?"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button onClick={handleAskAI} disabled={aiLoading || !prompt} className="text-lg py-6">
              {aiLoading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
              {aiLoading ? "Thinking..." : "Ask AI Mentor"}
            </Button>

            {aiResponse && (
              <div className="flex-1 p-6 bg-slate-50 rounded-xl overflow-y-auto border border-gray-100 shadow-inner">
                <div className="prose prose-lg max-w-none text-slate-800 whitespace-pre-wrap font-medium">
                  {aiResponse}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Button
        variant={"pixel"}
        size={"lg"}
        className="text-xl"
        onClick={() => sandpack.runSandpack()}
      >
        Run Code
      </Button>
      <Button
        variant={"pixel"}
        className="bg-[#a3e534] text-xl"
        size={"lg"}
        disabled={isCompleted}
        onClick={() => onCompletedExercise()}
      >
        {isCompleted ? "Already Completed!" : "Mark Completed"}
      </Button>
    </div>
  );
};

function CodeEditor({ courseExerciseData, loading }: Props) {
  const { exerciseslug } = useParams();
  const [isCompletedLocally, setIsCompletedLocally] = useState(false);
  const consoleRef = useRef<SandpackConsoleRef>(null);

  const exerciseIndex = courseExerciseData?.exercises?.findIndex(
    (item) => item.slug == exerciseslug
  );
  const isCompleted =
    isCompletedLocally ||
    courseExerciseData?.completedExercise?.find(
      (item) => item.exerciseId == Number(exerciseIndex) + 1
    );

  const onCompletedExercise = async () => {
    if (exerciseIndex == undefined) {
      return;
    }
    const result = await axios.post("/api/exercise/complete", {
      courseId: courseExerciseData?.courseId,
      chapterId: courseExerciseData?.chapterId,
      exerciseId: exerciseIndex + 1,
      xpEarned: courseExerciseData?.exercises[exerciseIndex].xp,
    });
    console.log(result);
    toast.success("Exercise completed!");
    setIsCompletedLocally(true);
  };
  const starterCode =
    courseExerciseData?.exerciseData?.exerciseContent?.starterCode;

  if (!starterCode) return null;

  const isPythonType = courseExerciseData?.editorType === 'python';
  const isCSSType = courseExerciseData?.editorType === 'css';
  const shouldRunPython = isPythonType && starterCode.filename.endsWith('.py');

  const files = {
    [starterCode.filename]: {
      code: starterCode.code,
    },
    ...(isPythonType ? {
      "index.html": {
        code: generatePythonIndexHtml(starterCode.filename),
        hidden: true
      }
    } : {}),
    ...(isCSSType ? {
      "index.html": {
        code: `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="${starterCode.filename}" />
  </head>
  <body>
    <div id="root">
      <h1>CSS Playground</h1>
      <p>Edit styles in <strong>${starterCode.filename}</strong></p>
      
      <div class="test-container">
        <button class="btn">Button</button>
        <div class="box">Box</div>
      </div>
    </div>
  </body>
</html>`,
        hidden: true
      }
    } : {})
  };

  return (

    <SandpackProvider
      //@ts-ignore
      template={
        isPythonType || isCSSType ? "static" : (courseExerciseData?.editorType as any ?? "static")
      }
      customSetup={isPythonType || isCSSType ? { entry: "/index.html" } : undefined}
      files={files}
      style={{ height: "100vh" }}
      theme={monokaiPro}
      options={{
        autorun: false,
        autoReload: false,
        activeFile: isCSSType || isPythonType ? `/${starterCode.filename}` : undefined,
      }}
    >
      <SandpackLayout style={{ height: "100%" }}>
        <SplitterLayout percentage secondaryInitialSize={50}>
          <div className="relative h-full">
            <SandpackCodeEditor
              showTabs
              style={{ height: "100%" }}
              additionalLanguages={[
                {
                  name: "python",
                  extensions: ["py"],
                  language: python(),
                },
              ]}
            />
            <CodeEditorChildren
              courseExerciseData={courseExerciseData}
              starterCode={starterCode}
              onCompletedExercise={onCompletedExercise}
              isCompleted={isCompleted}
            />
          </div>

          {isPythonType ? (
            <div className="h-full flex flex-col">
              <SandpackPreview
                style={{ height: "1px", opacity: 0 }}
                showOpenInCodeSandbox={false}
                showRefreshButton={true}
              />
              <ConsoleToolbar consoleRef={consoleRef} />
              <SandpackConsole ref={consoleRef} style={{ height: "100%" }} />
            </div>
          ) : <SandpackPreview
            showNavigator
            showOpenInCodeSandbox={false}
            showOpenNewtab
            style={{ height: "100%" }}
          />}
        </SplitterLayout>
      </SandpackLayout>
    </SandpackProvider >



  );
}

export default CodeEditor;
