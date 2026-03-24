"""
Olivia Gao's knowledge base — source of truth for the RAG system.
Chunks are deliberately small and specific so retrieval is precise.
"""

DOCUMENTS = [
    {
        "id": "bio",
        "source": "about_me.txt",
        "text": (
            "Olivia Gao is a software engineer based in the New York Metropolitan Area. "
            "She graduated from Northeastern University in Boston, MA in May 2025 with a "
            "B.S. in Computer Science and a Minor in Graphic and Information Design. "
            "Her GPA was 3.9/4.0 and she was on the Dean's List throughout. "
            "She currently works as a Software Engineer at AT&T. "
            "She has strong experience in frontend engineering, full-stack development, "
            "and ML data pipelines. She cares deeply about building polished, "
            "user-facing products at the intersection of engineering and design."
        ),
    },
    {
        "id": "contact",
        "source": "contact.json",
        "text": (
            "Olivia Gao contact information: "
            "Email: oliviagao825@gmail.com. "
            "Phone: (908) 581-2578. "
            "LinkedIn: linkedin.com/in/olivia-gao03. "
            "GitHub: github.com/olivegaoden. "
            "Location: New York Metropolitan Area. "
            "She is open to new full-time opportunities."
        ),
    },
    {
        "id": "education",
        "source": "resume.txt",
        "text": (
            "Olivia Gao attended Northeastern University in Boston, MA. "
            "She earned a Bachelor of Science in Computer Science "
            "with a Minor in Graphic and Information Design, graduating in May 2025. "
            "GPA: 3.9 out of 4.0. Dean's List every semester. "
            "The design minor gives her a strong foundation in visual thinking, "
            "information hierarchy, and user experience alongside her CS degree."
        ),
    },
    {
        "id": "skills_languages",
        "source": "resume.txt",
        "text": (
            "Olivia Gao's programming languages: Java, Python, TypeScript, JavaScript, SQL, C. "
            "She is most proficient in TypeScript, JavaScript, and Python with 2+ years each in production. "
            "She also has strong C skills from systems programming coursework."
        ),
    },
    {
        "id": "skills_frontend",
        "source": "resume.txt",
        "text": (
            "Olivia Gao's frontend and mobile frameworks: Angular, React, React Native. "
            "She has built production Angular applications at AT&T used by tens of thousands of users. "
            "She has built React applications for personal projects and co-ops. "
            "She has mobile development experience with React Native, Xcode for iOS, and Android Studio."
        ),
    },
    {
        "id": "skills_backend",
        "source": "resume.txt",
        "text": (
            "Olivia Gao's backend and infrastructure skills: Node.js, Flask, FastAPI, "
            "Docker, Jenkins, Kafka, Git, Linux, Postman. "
            "She built a Kafka-based real-time event pipeline at AT&T. "
            "She has experience with CI/CD using Jenkins and containerization with Docker."
        ),
    },
    {
        "id": "skills_data",
        "source": "resume.txt",
        "text": (
            "Olivia Gao's data and AI/ML skills: PyTorch, NumPy, Pandas, Palantir Foundry. "
            "She maintained ML data pipelines and built monitoring dashboards for model performance at MORSE Corp. "
            "She fine-tuned a T5 transformer model for NLP in her text simplification project."
        ),
    },
    {
        "id": "skills_databases",
        "source": "resume.txt",
        "text": (
            "Olivia Gao's database experience: MongoDB and MySQL. "
            "She used MongoDB for HuskyFlow's full-stack Q&A platform. "
            "She has experience with SQL and relational database design."
        ),
    },
    {
        "id": "experience_att",
        "source": "resume.txt",
        "text": (
            "Olivia Gao works as a Software Engineer at AT&T starting July 2025 (current role). "
            "Key contributions: "
            "1) Replaced client-side polling with a Kafka-based event pipeline for real-time Angular frontend updates, reducing API load. "
            "2) Reworked a core Angular data table used daily by 35,000+ AT&T field technicians — added column resizing and improved rendering performance for large datasets. "
            "3) Consolidated two separate Angular applications into a single unified codebase by merging shared modules, reducing code duplication and improving maintainability. "
            "Technologies: Angular, TypeScript, Kafka, REST APIs."
        ),
    },
    {
        "id": "experience_morse",
        "source": "resume.txt",
        "text": (
            "Olivia Gao worked as a Python Software Engineer Co-op at MORSE Corp from January 2024 to June 2024. "
            "Key contributions: "
            "1) Built a Python dashboard using the Palantir Foundry API to monitor ML model performance metrics including accuracy, precision, and recall — helping engineers identify and debug underperforming models. "
            "2) Maintained data transformation pipelines supporting testing and evaluation of machine learning models. "
            "3) Integrated heterogeneous data sources: computer vision outputs, traditional sensors, and human-labeled ground truth for AI training workflows. "
            "Technologies: Python, Palantir Foundry, data pipelines."
        ),
    },
    {
        "id": "experience_skillz",
        "source": "resume.txt",
        "text": (
            "Olivia Gao worked as an SDK Co-op at Skillz from January 2023 to August 2023. "
            "Skillz is a real-money gaming platform with 3 million monthly active users. "
            "Key contributions: "
            "1) Increased tutorial completion by 40%, Day-1 retention by 30%, and Day-0 paid conversions by 7% by designing and building a new player onboarding tutorial and username generator. "
            "2) Developed a cross-platform league progression system integrated into 6 million+ daily competitions, improving long-term player engagement. "
            "3) Resolved UI and authentication bugs in SSO flows across supported games. "
            "Technologies: React Native, iOS (Xcode), Android Studio, SSO/OAuth."
        ),
    },
    {
        "id": "project_huskyflow",
        "source": "projects/huskyflow",
        "text": (
            "HuskyFlow is a full-stack Q&A platform Olivia Gao built, inspired by Stack Overflow. "
            "Features: community spaces with user following, Google OAuth authentication, "
            "and real-time polls implemented with WebSockets so votes update live and polls auto-expire. "
            "Tech stack: TypeScript, React, Node.js, MongoDB, WebSockets. "
            "GitHub: github.com/olivegaoden/CS4530-fake-stack-overflow. Has a live demo."
        ),
    },
    {
        "id": "project_text_simplification",
        "source": "projects/text-simplification",
        "text": (
            "Olivia Gao built a Text Simplification Application using Python, PyTorch, React, and Flask. "
            "She developed a custom word complexity scoring approach and fine-tuned a T5 transformer model for text simplification. "
            "She created a React + Flask web app that accepts text or audio input and returns simplified output with text-to-speech. "
            "GitHub: github.com/olivegaoden/NLP-text-simplification."
        ),
    },
    {
        "id": "project_shell",
        "source": "projects/shell",
        "text": (
            "Olivia Gao implemented a Custom Command Line Shell in C on Linux. "
            "Uses Linux syscalls: fork, exec, pipe. "
            "Supports full command execution, multi-stage pipelines (cmd1 | cmd2), and I/O redirection (< and >). "
            "Demonstrates low-level systems programming and OS concepts. "
            "GitHub: github.com/olivegaoden."
        ),
    },
    {
        "id": "project_portfolio",
        "source": "projects/portfolio-os",
        "text": (
            "Portfolio OS is Olivia Gao's interactive portfolio website built as a desktop OS UI. "
            "Features: draggable and resizable windows, a window manager with z-index focus stacking, "
            "a taskbar with live clock, desktop icons, responsive layout (desktop OS on large screens, "
            "scrollable mobile layout on small screens), and an AI assistant powered by RAG (FAISS + OpenAI). "
            "Tech stack: React, TypeScript, Vite, Tailwind CSS, Framer Motion, FastAPI, FAISS."
        ),
    },
    {
        "id": "personality",
        "source": "about_me.txt",
        "text": (
            "Olivia Gao's interests outside of work: crochet, cozy gaming, and singing. "
            "She has a Minor in Graphic and Information Design which shapes how she thinks about "
            "building polished, accessible, user-facing software. "
            "She is collaborative, curious, and cares about craft and user experience. "
            "She enjoys work at the intersection of engineering and design."
        ),
    },
    {
        "id": "availability",
        "source": "contact.json",
        "text": (
            "Olivia Gao is open to new software engineering opportunities. "
            "She is particularly interested in roles involving frontend engineering, full-stack development, "
            "or design-focused engineering teams. "
            "She is available for full-time roles in the New York Metropolitan Area. "
            "Best way to reach her: oliviagao825@gmail.com or linkedin.com/in/olivia-gao03."
        ),
    },
    {
        "id": "strengths",
        "source": "about_me.txt",
        "text": (
            "Olivia Gao's professional strengths as a software engineer: "
            "1) Passion for user experience — her first instinct when building anything is whether the design "
            "is intuitive and frictionless. She actively finds pain points and takes the initiative to fix them herself. "
            "2) Shipping in complex codebases — at AT&T she navigated a large existing codebase to rework a data table "
            "used by 35,000+ technicians and consolidated two separate applications, making impactful changes without breaking things. "
            "3) Attention to measurable outcomes — she thinks in metrics and impact: 40% increase in tutorial completion, "
            "30% improvement in Day-1 retention, 7% lift in paid conversions at Skillz; real-time pipeline reducing API load at AT&T. "
            "4) Independence — she is able to solve problems on her own but knows when to ask for help to avoid being blocked too long. "
            "5) Breadth across the stack — frontend (Angular, React), backend (Kafka, Flask, FastAPI), "
            "ML data pipelines (Palantir Foundry), and mobile (React Native)."
        ),
    },
    {
        "id": "weaknesses",
        "source": "about_me.txt",
        "text": (
            "Olivia Gao's professional weaknesses and areas for growth as a software engineer: "
            "1) Over-scoping — because she sees the full picture and cares about quality, she sometimes wants to fix "
            "everything she notices rather than staying focused on the task at hand. "
            "She is working on scoping work tightly and creating separate tickets for improvements she spots. "
            "2) Public speaking and presenting to large groups — presenting to large audiences is something she finds "
            "challenging and is actively working to improve through seeking out opportunities to present at work and practicing on her own. "
        ),
    },
]