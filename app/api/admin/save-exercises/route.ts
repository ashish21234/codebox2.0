import { db } from "@/config/db";
import { ExerciseTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

const DATA =[
    {
      "courseId": 2,
      "exerciseId": "explore-the-web-skeleton",
      "exerciseName": "Explore the Web Skeleton",
      "chapterId": 1,
      "exercisesContent": {
        "content": "<body style=\"font-family:Arial,sans-serif;line-height:1.6;padding:20px;color:#e5e7eb;\"><p style=\"margin-bottom:8px;\">Welcome, brave explorer! Your journey begins by discovering the <strong>web skeleton</strong>. Every web page is built on the foundation of HTML.</p><p style=\"margin-bottom:8px;\">The <code>&lt;!DOCTYPE html&gt;</code> declaration tells the browser the document type and prepares it for modern rendering.</p><p style=\"margin-bottom:8px;\">The outer wrapper <code>&lt;html&gt;</code> contains everything on the page, like the walls of a fortress.</p><p style=\"margin-bottom:8px;\">Inside the fortress, the <code>&lt;head&gt;</code> stores tools like the title and meta data.</p><p style=\"margin-bottom:8px;\">The <code>&lt;body&gt;</code> is the open field where your content appears.</p><p style=\"margin-bottom:8px;\">Browsers read HTML from top to bottom, so order matters.</p><p style=\"margin-bottom:8px;\">A broken skeleton leads to broken pages.</p><p style=\"margin-bottom:8px;\">Learning this structure is your first power-up.</p><p style=\"margin-bottom:8px;\">Once mastered, styling and logic become easier.</p><p style=\"margin-bottom:8px;\">This is the base of every website.</p><p style=\"margin-bottom:8px;\">Train your eyes to recognize these tags.</p><p style=\"margin-bottom:8px;\">Your adventure starts now.</p></body>",
        "task": "<body style=\"font-family:Arial,sans-serif;padding:10px;color:#e5e7eb;\"><p>Create a complete HTML skeleton including <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code>. Inside body write: <strong>My first web skeleton is ready!</strong></p></body>",
        "hint": "<body style=\"font-family:Arial,sans-serif;padding:10px;color:#e5e7eb;\"><p>Start with <code>&lt;!DOCTYPE html&gt;</code>. The head comes before the body, both inside html.</p></body>",
        "starterCode": {
          "filename": "/index.html",
          "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <title></title>\n  </head>\n  <body>\n\n  </body>\n</html>"
        },
        "regex": "<!DOCTYPE html>[\\s\\S]*<body>[\\s\\S]*My first web skeleton is ready![\\s\\S]*</body>",
        "output": "My first web skeleton is ready!",
        "hintXp": 30
      }
    },
    {
      "courseId": 2,
      "exerciseId": "build-your-base-camp",
      "exerciseName": "Build Your Base Camp",
      "chapterId": 1,
      "exercisesContent": {
        "content": "<body style=\"font-family:Arial,sans-serif;line-height:1.6;padding:20px;color:#e5e7eb;\"><p style=\"margin-bottom:8px;\">Every adventurer needs a base camp.</p><p style=\"margin-bottom:8px;\">In HTML, your base camp lives inside the body.</p><p style=\"margin-bottom:8px;\">Headings act like flags showing importance.</p><p style=\"margin-bottom:8px;\">Paragraphs store your notes and stories.</p><p style=\"margin-bottom:8px;\">The <code>&lt;h1&gt;</code> tag is your main banner.</p><p style=\"margin-bottom:8px;\">The <code>&lt;p&gt;</code> tag holds readable content.</p><p style=\"margin-bottom:8px;\">Together they create structure.</p><p style=\"margin-bottom:8px;\">Good structure improves readability.</p><p style=\"margin-bottom:8px;\">Browsers and users love clarity.</p><p style=\"margin-bottom:8px;\">This camp is where future quests begin.</p><p style=\"margin-bottom:8px;\">A strong base supports expansion.</p><p style=\"margin-bottom:8px;\">Plant your flag now.</p></body>",
        "task": "<body style=\"font-family:Arial,sans-serif;padding:10px;color:#e5e7eb;\"><p>Inside the body, add an <code>&lt;h1&gt;</code> with text <strong>Welcome to Base Camp</strong> and a <code>&lt;p&gt;</code> with text <strong>Prepare yourself for the HTML adventure!</strong>.</p></body>",
        "hint": "<body style=\"font-family:Arial,sans-serif;padding:10px;color:#e5e7eb;\"><p>Use one <code>&lt;h1&gt;</code> and one <code>&lt;p&gt;</code>, both inside body.</p></body>",
        "starterCode": {
          "filename": "/index.html",
          "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Base Camp</title>\n  </head>\n  <body>\n\n  </body>\n</html>"
        },
        "regex": "<h1>\\s*Welcome to Base Camp\\s*</h1>[\\s\\S]*<p>\\s*Prepare yourself for the HTML adventure!\\s*</p>",
        "output": "<h1>Welcome to Base Camp</h1><p>Prepare yourself for the HTML adventure!</p>",
        "hintXp": 35
      }
    },
    {
      "courseId": 2,
      "exerciseId": "name-your-world",
      "exerciseName": "Name Your World",
      "chapterId": 1,
      "exercisesContent": {
        "content": "<body style=\"font-family:Arial,sans-serif;line-height:1.6;padding:20px;color:#e5e7eb;\"><p style=\"margin-bottom:8px;\">Every world needs a name.</p><p style=\"margin-bottom:8px;\">In HTML, the name lives in the title tag.</p><p style=\"margin-bottom:8px;\">The title appears in browser tabs.</p><p style=\"margin-bottom:8px;\">It also helps search engines.</p><p style=\"margin-bottom:8px;\">Titles should be clear and meaningful.</p><p style=\"margin-bottom:8px;\">They belong inside the head.</p><p style=\"margin-bottom:8px;\">Never place title in body.</p><p style=\"margin-bottom:8px;\">A good title improves professionalism.</p><p style=\"margin-bottom:8px;\">Small detail, big impact.</p><p style=\"margin-bottom:8px;\">This defines your page identity.</p><p style=\"margin-bottom:8px;\">Name wisely.</p><p style=\"margin-bottom:8px;\">Your world is remembered by its title.</p></body>",
        "task": "<body style=\"font-family:Arial,sans-serif;padding:10px;color:#e5e7eb;\"><p>Set the page <code>&lt;title&gt;</code> to <strong>My Adventure World</strong> inside the head.</p></body>",
        "hint": "<body style=\"font-family:Arial,sans-serif;padding:10px;color:#e5e7eb;\"><p>The title must be inside <code>&lt;head&gt;</code>, not body.</p></body>",
        "starterCode": {
          "filename": "/index.html",
          "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <title></title>\n  </head>\n  <body>\n  </body>\n</html>"
        },
        "regex": "<title>\\s*My Adventure World\\s*</title>",
        "output": "<title>My Adventure World</title>",
        "hintXp": 30
      }
    },
    {
      "courseId": 2,
      "exerciseId": "break-and-repair",
      "exerciseName": "Break & Repair",
      "chapterId": 1,
      "exercisesContent": {
        "content": "<body style=\"font-family:Arial,sans-serif;line-height:1.6;padding:20px;color:#e5e7eb;\"><p style=\"margin-bottom:8px;\">Even strong structures can crack.</p><p style=\"margin-bottom:8px;\">HTML errors often come from missing tags.</p><p style=\"margin-bottom:8px;\">Unclosed tags confuse browsers.</p><p style=\"margin-bottom:8px;\">Nesting tags incorrectly breaks layout.</p><p style=\"margin-bottom:8px;\">Your job is to repair the damage.</p><p style=\"margin-bottom:8px;\">Every opening tag needs a closing tag.</p><p style=\"margin-bottom:8px;\">Order matters in nesting.</p><p style=\"margin-bottom:8px;\">Fixing HTML improves reliability.</p><p style=\"margin-bottom:8px;\">Debugging is a core skill.</p><p style=\"margin-bottom:8px;\">This mission sharpens attention.</p><p style=\"margin-bottom:8px;\">Clean code equals strong pages.</p><p style=\"margin-bottom:8px;\">Repair and move forward.</p></body>",
        "task": "<body style=\"font-family:Arial,sans-serif;padding:10px;color:#e5e7eb;\"><p>Fix the broken HTML so the heading <strong>Mission Complete</strong> and paragraph <strong>All tags repaired.</strong> display correctly.</p></body>",
        "hint": "<body style=\"font-family:Arial,sans-serif;padding:10px;color:#e5e7eb;\"><p>Check for missing closing tags.</p></body>",
        "starterCode": {
          "filename": "/index.html",
          "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Repair</title>\n  </head>\n  <body>\n    <h1>Mission Complete\n    <p>All tags repaired.</p>\n  </body>\n</html>"
        },
        "regex": "<h1>\\s*Mission Complete\\s*</h1>[\\s\\S]*<p>\\s*All tags repaired.\\s*</p>",
        "output": "<h1>Mission Complete</h1><p>All tags repaired.</p>",
        "hintXp": 40
      }
    },
    {
      "courseId": 2,
      "exerciseId": "html-detective",
      "exerciseName": "HTML Detective",
      "chapterId": 1,
      "exercisesContent": {
        "content": "<body style=\"font-family:Arial,sans-serif;line-height:1.6;padding:20px;color:#e5e7eb;\"><p style=\"margin-bottom:8px;\">Put on your detective hat.</p><p style=\"margin-bottom:8px;\">HTML elements each have roles.</p><p style=\"margin-bottom:8px;\">Headings define importance.</p><p style=\"margin-bottom:8px;\">Paragraphs hold information.</p><p style=\"margin-bottom:8px;\">Lists organize data.</p><p style=\"margin-bottom:8px;\">Images show visuals.</p><p style=\"margin-bottom:8px;\">Links connect pages.</p><p style=\"margin-bottom:8px;\">Detecting correct tags matters.</p><p style=\"margin-bottom:8px;\">Wrong tags confuse users.</p><p style=\"margin-bottom:8px;\">Semantic HTML improves meaning.</p><p style=\"margin-bottom:8px;\">This skill grows with practice.</p><p style=\"margin-bottom:8px;\">Observe carefully.</p></body>",
        "task": "<body style=\"font-family:Arial,sans-serif;padding:10px;color:#e5e7eb;\"><p>Add an ordered list with three items: <strong>Inspect</strong>, <strong>Analyze</strong>, <strong>Solve</strong>.</p></body>",
        "hint": "<body style=\"font-family:Arial,sans-serif;padding:10px;color:#e5e7eb;\"><p>Use <code>&lt;ol&gt;</code> and <code>&lt;li&gt;</code>.</p></body>",
        "starterCode": {
          "filename": "/index.html",
          "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Detective</title>\n  </head>\n  <body>\n  </body>\n</html>"
        },
        "regex": "<ol>[\\s\\S]*<li>Inspect</li>[\\s\\S]*<li>Analyze</li>[\\s\\S]*<li>Solve</li>[\\s\\S]*</ol>",
        "output": "<ol><li>Inspect</li><li>Analyze</li><li>Solve</li></ol>",
        "hintXp": 45
      }
    },
    {
      "courseId": 2,
      "exerciseId": "element-collector",
      "exerciseName": "Element Collector",
      "chapterId": 1,
      "exercisesContent": {
        "content": "<body style=\"font-family:Arial,sans-serif;line-height:1.6;padding:20px;color:#e5e7eb;\"><p style=\"margin-bottom:8px;\">Time to collect elements.</p><p style=\"margin-bottom:8px;\">HTML is built from many tags.</p><p style=\"margin-bottom:8px;\">Each tag has a purpose.</p><p style=\"margin-bottom:8px;\">Images use the <code>&lt;img&gt;</code> tag.</p><p style=\"margin-bottom:8px;\">Links use the <code>&lt;a&gt;</code> tag.</p><p style=\"margin-bottom:8px;\">Attributes add extra power.</p><p style=\"margin-bottom:8px;\">src and href are common.</p><p style=\"margin-bottom:8px;\">Collecting elements builds mastery.</p><p style=\"margin-bottom:8px;\">Practice improves memory.</p><p style=\"margin-bottom:8px;\">This is your loot phase.</p><p style=\"margin-bottom:8px;\">Every element counts.</p><p style=\"margin-bottom:8px;\">Fill your inventory.</p></body>",
        "task": "<body style=\"font-family:Arial,sans-serif;padding:10px;color:#e5e7eb;\"><p>Add a link using <code>&lt;a&gt;</code> that points to <strong>https://example.com</strong> with text <strong>Visit Example</strong>.</p></body>",
        "hint": "<body style=\"font-family:Arial,sans-serif;padding:10px;color:#e5e7eb;\"><p>Use the <code>href</code> attribute.</p></body>",
        "starterCode": {
          "filename": "/index.html",
          "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Collector</title>\n  </head>\n  <body>\n  </body>\n</html>"
        },
        "regex": "<a\\s+href=\"https://example.com\">\\s*Visit Example\\s*</a>",
        "output": "<a href=\"https://example.com\">Visit Example</a>",
        "hintXp": 50
      }
    }
  ];
  
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
