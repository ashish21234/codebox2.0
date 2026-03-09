import { db } from "@/config/db";
import { ExerciseTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

const DATA = [
  {
    "courseId": 4,
    "exerciseId": "what-is-python",
    "exerciseName": "What is Python?",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;line-height:1.7;\">Welcome to the Python realm 🐍 Python is a high-level programming language known for its simplicity and readability. It was designed to be easy for humans to understand. Python uses simple English-like syntax. This makes it beginner-friendly. Python is interpreted, which means code runs line by line. It supports multiple programming styles like procedural and object-oriented. Python is used in web development, data science, automation, and more. It has a huge collection of libraries. These libraries save development time. Python code is concise and clean. Developers love Python for its flexibility. Learning Python opens many career paths. This is your first step into Python programming.</body>",
      "task": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;\">Write a simple Python statement that prints <strong>Hello Python</strong> to the console.</body>",
      "hint": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;\">Use the <code>print()</code> function.</body>",
      "starterCode": {
        "filename": "main.py",
        "code": "# Write your Python code below\n"
      },
      "regex": "print\\(\\s*['\"]Hello Python['\"]\\s*\\)",
      "output": "Hello Python",
      "hintXp": 30
    }
  },
  {
    "courseId": 4,
    "exerciseId": "why-python",
    "exerciseName": "Why Python?",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;line-height:1.7;\">Why do so many developers choose Python? 🧠 Python focuses on simplicity and productivity. It allows you to write fewer lines of code. Python has a massive community. This means lots of tutorials and help. It works on all major platforms. Python is widely used in AI and machine learning. It powers popular frameworks and tools. Python is also great for beginners. At the same time, professionals use it in production. Python helps you focus on logic, not syntax. It is versatile and powerful. This makes Python a top choice worldwide.</body>",
      "task": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;\">Write a Python comment explaining one reason why Python is popular.</body>",
      "hint": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;\">Python comments start with <code>#</code>.</body>",
      "starterCode": {
        "filename": "main.py",
        "code": "# Write your comment below\n"
      },
      "regex": "#[\\s\\S]*Python",
      "output": "Python is popular",
      "hintXp": 30
    }
  },
  {
    "courseId": 4,
    "exerciseId": "install-python",
    "exerciseName": "Install Python",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;line-height:1.7;\">Before writing Python code, you need Python installed 🛠️ Python can be downloaded from the official website. It works on Windows, macOS, and Linux. During installation, you must add Python to PATH. This allows Python to run from the terminal. Python comes with a package manager called pip. Pip helps install libraries easily. Verifying installation is important. You can check the version using a command. A correct setup prevents future issues. Installation is quick and simple. This step prepares your environment. Once installed, you're ready to code.</body>",
      "task": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;\">Write the command used to check the installed Python version.</body>",
      "hint": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;\">Use the word <code>python</code> with a version flag.</body>",
      "starterCode": {
        "filename": "main.py",
        "code": "# Type your command below\n"
      },
      "regex": "python\\s+--version|python3\\s+--version",
      "output": "Python version",
      "hintXp": 35
    }
  },
  {
    "courseId": 4,
    "exerciseId": "run-first-program",
    "exerciseName": "Run Your First Program",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;line-height:1.7;\">Running your first Python program is exciting 🚀 Python programs are saved with a <code>.py</code> extension. You can run them using the terminal. Python executes code from top to bottom. Errors are shown clearly. This helps beginners debug easily. Running programs helps you see results instantly. The terminal is your main tool. Python programs can be run interactively or from files. This flexibility is powerful. Your first run builds confidence. Every developer remembers this moment. This exercise marks your first execution.</body>",
      "task": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;\">Write the command used to run a Python file named <strong>main.py</strong>.</body>",
      "hint": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;\">Use <code>python</code> followed by the filename.</body>",
      "starterCode": {
        "filename": "main.py",
        "code": "# Type your command below\n"
      },
      "regex": "python\\s+main\\.py|python3\\s+main\\.py",
      "output": "program executed",
      "hintXp": 40
    }
  },
  {
    "courseId": 4,
    "exerciseId": "python-vs-languages",
    "exerciseName": "Python vs Other Languages",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;line-height:1.7;\">Python is often compared with other languages ⚔️ Compared to C++ or Java, Python has simpler syntax. Python requires less boilerplate code. This speeds up development. Other languages may run faster, but Python excels in productivity. Python is interpreted, while many languages are compiled. Python has dynamic typing. This makes coding flexible. Python shines in scripting and automation. Each language has strengths. Python focuses on ease of use. Understanding these differences helps choose the right tool. Python is ideal for beginners and experts alike.</body>",
      "task": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;\">Write one difference between Python and other programming languages.</body>",
      "hint": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;\">Think about syntax or typing.</body>",
      "starterCode": {
        "filename": "main.py",
        "code": "# Write your answer here\n"
      },
      "regex": "Python",
      "output": "difference explained",
      "hintXp": 35
    }
  },
  {
    "courseId": 4,
    "exerciseId": "basic-css-styling",
    "exerciseName": "Basic CSS Styling",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;line-height:1.7;\">Welcome to CSS! 🎨 CSS (Cascading Style Sheets) is used to style and layout web pages. You can change colors, fonts, spacing, and much more. This exercise will show you how to link a CSS file to an HTML document.</body>",
      "task": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;\">Modify the <code>styles.css</code> file to change the background color of the <code>.box</code> to <strong>red</strong>.</body>",
      "hint": "<body style=\"color:#e5e7eb;font-family:Arial,sans-serif;\">Use <code>background-color: red;</code> inside the <code>.box</code> selector.</body>",
      "starterCode": {
        "filename": "styles.css",
        "code": "body {\n  background-color: #1e1e1e;\n  color: white;\n}\n\n.box {\n  width: 100px;\n  height: 100px;\n  background-color: blue;\n  margin: 20px;\n}\n"
      },
      "regex": "background-color:\\s*red",
      "output": "Box is now red",
      "hintXp": 30
    }
  }
]




export async function GET(req: NextRequest) {
  for (const item of DATA) {
    await db.insert(ExerciseTable).values({
      courseId: item.courseId,
      chapterId: item.chapterId,
      exerciseId: item.exerciseId,
      exerciseName: item.exerciseName,
      exerciseContent: item.exercisesContent,
    });
  }

  return NextResponse.json({ success: true });
}
