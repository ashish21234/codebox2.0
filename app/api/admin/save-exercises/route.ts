import { db } from "@/config/db";
import { ExerciseTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

const DATA =[
  {
    "courseId": 2,
    "exerciseId": "build-the-core-structure",
    "exerciseName": "Build the Core Structure",
    "chapterId": 2,
    "exercisesContent": {
      "content": "<body style=\"font-family:Arial,sans-serif;line-height:1.7;padding:20px;color:#e5e7eb;\"><p style=\"margin-bottom:8px;\">Every powerful website begins with a solid core structure.</p><p style=\"margin-bottom:8px;\">The HTML boilerplate is the foundation that browsers rely on to correctly interpret your page.</p><p style=\"margin-bottom:8px;\">It starts by clearly declaring the document type using <code>&lt;!DOCTYPE html&gt;</code>.</p><p style=\"margin-bottom:8px;\">The <code>&lt;html&gt;</code> tag wraps your entire application and defines the root of the document.</p><p style=\"margin-bottom:8px;\">Inside it, the <code>&lt;head&gt;</code> stores configuration data and page identity.</p><p style=\"margin-bottom:8px;\">The <code>&lt;body&gt;</code> is where all visible content will eventually live.</p><p style=\"margin-bottom:8px;\">Browsers expect this structure and may behave unpredictably without it.</p><p style=\"margin-bottom:8px;\">A clean boilerplate improves compatibility across devices.</p><p style=\"margin-bottom:8px;\">Professional developers never skip this step.</p><p style=\"margin-bottom:8px;\">This exercise trains you to write the structure from memory.</p><p style=\"margin-bottom:8px;\">Think of it as assembling the blueprint of your digital building.</p><p style=\"margin-bottom:8px;\">Once complete, you are ready to add more advanced features.</p></body>",
      "task": "<body style=\"font-family:Arial,sans-serif;padding:12px;color:#e5e7eb;\"><p>Create a complete HTML boilerplate from scratch. Include <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code>. Leave the head and body empty for now.</p></body>",
      "hint": "<body style=\"font-family:Arial,sans-serif;padding:12px;color:#e5e7eb;\"><p>The correct order is DOCTYPE → html → head → body.</p></body>",
      "starterCode": {
        "filename": "/index.html",
        "code": "<!DOCTYPE html>\n<html>\n\n</html>"
      },
      "regex": "<!DOCTYPE html>[\\s\\S]*<html>[\\s\\S]*<head>[\\s\\S]*</head>[\\s\\S]*<body>[\\s\\S]*</body>[\\s\\S]*</html>",
      "output": "Valid HTML core structure created",
      "hintXp": 35
    }
  },
  {
    "courseId": 2,
    "exerciseId": "fix-the-broken-blueprint",
    "exerciseName": "Fix the Broken Blueprint",
    "chapterId": 2,
    "exercisesContent": {
      "content": "<body style=\"font-family:Arial,sans-serif;line-height:1.7;padding:20px;color:#e5e7eb;\"><p style=\"margin-bottom:8px;\">Even the best blueprints can be damaged.</p><p style=\"margin-bottom:8px;\">Broken HTML often comes from missing or misplaced tags.</p><p style=\"margin-bottom:8px;\">Browsers try to guess your intent, but mistakes cause layout issues.</p><p style=\"margin-bottom:8px;\">Unclosed tags are one of the most common errors.</p><p style=\"margin-bottom:8px;\">Incorrect nesting breaks structure and meaning.</p><p style=\"margin-bottom:8px;\">Debugging HTML is a vital real-world skill.</p><p style=\"margin-bottom:8px;\">This exercise simulates fixing a faulty blueprint.</p><p style=\"margin-bottom:8px;\">You must carefully inspect opening and closing tags.</p><p style=\"margin-bottom:8px;\">Attention to detail is the key to success.</p><p style=\"margin-bottom:8px;\">Clean markup improves maintainability.</p><p style=\"margin-bottom:8px;\">Once repaired, the page becomes predictable.</p><p style=\"margin-bottom:8px;\">Fix the errors and restore balance.</p></body>",
      "task": "<body style=\"font-family:Arial,sans-serif;padding:12px;color:#e5e7eb;\"><p>Repair the broken HTML so that both the heading and paragraph display correctly. Ensure all tags are properly closed and nested.</p></body>",
      "hint": "<body style=\"font-family:Arial,sans-serif;padding:12px;color:#e5e7eb;\"><p>Check if every opening tag has a matching closing tag.</p></body>",
      "starterCode": {
        "filename": "/index.html",
        "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Broken</title>\n  </head>\n  <body>\n    <h1>Blueprint Fixed\n    <p>Structure restored\n  </body>\n</html>"
      },
      "regex": "<h1>\\s*Blueprint Fixed\\s*</h1>[\\s\\S]*<p>\\s*Structure restored\\s*</p>",
      "output": "<h1>Blueprint Fixed</h1><p>Structure restored</p>",
      "hintXp": 40
    }
  },
  {
    "courseId": 2,
    "exerciseId": "boost-meta-power",
    "exerciseName": "Boost Meta Power",
    "chapterId": 2,
    "exercisesContent": {
      "content": "<body style=\"font-family:Arial,sans-serif;line-height:1.7;padding:20px;color:#e5e7eb;\"><p style=\"margin-bottom:8px;\">Meta tags give hidden power to your webpage.</p><p style=\"margin-bottom:8px;\">They communicate information to browsers and search engines.</p><p style=\"margin-bottom:8px;\">The charset meta tag defines text encoding.</p><p style=\"margin-bottom:8px;\">Without it, characters may display incorrectly.</p><p style=\"margin-bottom:8px;\">Meta tags live inside the head.</p><p style=\"margin-bottom:8px;\">They do not appear visually on the page.</p><p style=\"margin-bottom:8px;\">Correct metadata improves reliability.</p><p style=\"margin-bottom:8px;\">UTF-8 is the modern standard encoding.</p><p style=\"margin-bottom:8px;\">This ensures global character support.</p><p style=\"margin-bottom:8px;\">Professional pages always define charset.</p><p style=\"margin-bottom:8px;\">This is a silent but critical upgrade.</p><p style=\"margin-bottom:8px;\">Power up your document now.</p></body>",
      "task": "<body style=\"font-family:Arial,sans-serif;padding:12px;color:#e5e7eb;\"><p>Add a meta charset tag using <code>UTF-8</code> inside the head section.</p></body>",
      "hint": "<body style=\"font-family:Arial,sans-serif;padding:12px;color:#e5e7eb;\"><p>Use <code>&lt;meta charset=\"UTF-8\"&gt;</code>.</p></body>",
      "starterCode": {
        "filename": "/index.html",
        "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Meta Power</title>\n  </head>\n  <body>\n  </body>\n</html>"
      },
      "regex": "<meta\\s+charset=\"UTF-8\"\\s*/?>",
      "output": "<meta charset=\"UTF-8\">",
      "hintXp": 30
    }
  },
  {
    "courseId": 2,
    "exerciseId": "add-language-identity",
    "exerciseName": "Add Language Identity",
    "chapterId": 2,
    "exercisesContent": {
      "content": "<body style=\"font-family:Arial,sans-serif;line-height:1.7;padding:20px;color:#e5e7eb;\"><p style=\"margin-bottom:8px;\">Every document should declare its language.</p><p style=\"margin-bottom:8px;\">Language identity improves accessibility.</p><p style=\"margin-bottom:8px;\">Screen readers rely on this information.</p><p style=\"margin-bottom:8px;\">Search engines use it for localization.</p><p style=\"margin-bottom:8px;\">The language attribute belongs on the html tag.</p><p style=\"margin-bottom:8px;\">English pages commonly use <code>lang=\"en\"</code>.</p><p style=\"margin-bottom:8px;\">This small attribute has a big impact.</p><p style=\"margin-bottom:8px;\">It improves SEO and usability.</p><p style=\"margin-bottom:8px;\">Professional pages always define language.</p><p style=\"margin-bottom:8px;\">This helps assistive technologies.</p><p style=\"margin-bottom:8px;\">Your page now speaks clearly.</p><p style=\"margin-bottom:8px;\">Give your document an identity.</p></body>",
      "task": "<body style=\"font-family:Arial,sans-serif;padding:12px;color:#e5e7eb;\"><p>Add a language attribute to the <code>&lt;html&gt;</code> tag and set it to English.</p></body>",
      "hint": "<body style=\"font-family:Arial,sans-serif;padding:12px;color:#e5e7eb;\"><p>Use <code>&lt;html lang=\"en\"&gt;</code>.</p></body>",
      "starterCode": {
        "filename": "/index.html",
        "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Language</title>\n  </head>\n  <body>\n  </body>\n</html>"
      },
      "regex": "<html\\s+lang=\"en\">",
      "output": "<html lang=\"en\">",
      "hintXp": 30
    }
  },
  {
    "courseId": 2,
    "exerciseId": "viewport-setup",
    "exerciseName": "Viewport Setup",
    "chapterId": 2,
    "exercisesContent": {
      "content": "<body style=\"font-family:Arial,sans-serif;line-height:1.7;padding:20px;color:#e5e7eb;\"><p style=\"margin-bottom:8px;\">Modern users browse on many screen sizes.</p><p style=\"margin-bottom:8px;\">The viewport meta tag controls layout on mobile.</p><p style=\"margin-bottom:8px;\">Without it, pages may zoom incorrectly.</p><p style=\"margin-bottom:8px;\">Responsive design depends on viewport setup.</p><p style=\"margin-bottom:8px;\">This tag belongs in the head.</p><p style=\"margin-bottom:8px;\">It defines width and initial scale.</p><p style=\"margin-bottom:8px;\">Mobile-first design starts here.</p><p style=\"margin-bottom:8px;\">Every modern site uses this tag.</p><p style=\"margin-bottom:8px;\">It improves usability instantly.</p><p style=\"margin-bottom:8px;\">Ignoring this causes poor UX.</p><p style=\"margin-bottom:8px;\">One line unlocks responsiveness.</p><p style=\"margin-bottom:8px;\">Prepare your page for all devices.</p></body>",
      "task": "<body style=\"font-family:Arial,sans-serif;padding:12px;color:#e5e7eb;\"><p>Add a viewport meta tag with width set to device-width and initial-scale set to 1.0.</p></body>",
      "hint": "<body style=\"font-family:Arial,sans-serif;padding:12px;color:#e5e7eb;\"><p>Use <code>name=\"viewport\"</code> and <code>content=\"width=device-width, initial-scale=1.0\"</code>.</p></body>",
      "starterCode": {
        "filename": "/index.html",
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <title>Viewport</title>\n  </head>\n  <body>\n  </body>\n</html>"
      },
      "regex": "<meta\\s+name=\"viewport\"\\s+content=\"width=device-width,\\s*initial-scale=1.0\"\\s*/?>",
      "output": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "hintXp": 35
    }
  },
  {
    "courseId": 2,
    "exerciseId": "author-credit",
    "exerciseName": "Author Credit",
    "chapterId": 2,
    "exercisesContent": {
      "content": "<body style=\"font-family:Arial,sans-serif;line-height:1.7;padding:20px;color:#e5e7eb;\"><p style=\"margin-bottom:8px;\">Every creation deserves a signature.</p><p style=\"margin-bottom:8px;\">Author metadata identifies who built the page.</p><p style=\"margin-bottom:8px;\">This information is useful for documentation.</p><p style=\"margin-bottom:8px;\">It can also help search engines.</p><p style=\"margin-bottom:8px;\">Author meta tags live in the head.</p><p style=\"margin-bottom:8px;\">They are invisible to users.</p><p style=\"margin-bottom:8px;\">Professional projects often include this.</p><p style=\"margin-bottom:8px;\">It adds ownership and clarity.</p><p style=\"margin-bottom:8px;\">This is a small but meaningful detail.</p><p style=\"margin-bottom:8px;\">You are claiming your work.</p><p style=\"margin-bottom:8px;\">Good habits start early.</p><p style=\"margin-bottom:8px;\">Sign your creation proudly.</p></body>",
      "task": "<body style=\"font-family:Arial,sans-serif;padding:12px;color:#e5e7eb;\"><p>Add a meta tag that sets the author name to <strong>Your Name</strong>.</p></body>",
      "hint": "<body style=\"font-family:Arial,sans-serif;padding:12px;color:#e5e7eb;\"><p>Use <code>name=\"author\"</code> and <code>content</code>.</p></body>",
      "starterCode": {
        "filename": "/index.html",
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <title>Author</title>\n  </head>\n  <body>\n  </body>\n</html>"
      },
      "regex": "<meta\\s+name=\"author\"\\s+content=\"Your Name\"\\s*/?>",
      "output": "<meta name=\"author\" content=\"Your Name\">",
      "hintXp": 30
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
