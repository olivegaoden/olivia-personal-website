"""
Olivia Gao's knowledge base — source of truth for the RAG system.
Edit these documents to keep the AI assistant up to date.
"""

DOCUMENTS = [
    {
        "id": "bio",
        "source": "about_me.txt",
        "text": (
            "Olivia Gao is a software engineer based in the New York Metropolitan Area. "
            "She graduated from Northeastern University in May 2025 with a B.S. in Computer Science "
            "and a Minor in Graphic & Information Design, with a 3.9 GPA and Dean's List honors. "
            "She currently works as a Software Engineer at AT&T. She has experience across frontend, "
            "backend, and machine learning, and is passionate about building clean, impactful software."
        ),
    },
    {
        "id": "education",
        "source": "resume.txt",
        "text": (
            "Olivia attended Northeastern University in Boston, MA, graduating May 2025. "
            "She earned a B.S. in Computer Science with a Minor in Graphic & Information Design. "
            "Her GPA was 3.9 out of 4.0. She was on the Dean's List."
        ),
    },
    {
        "id": "skills",
        "source": "resume.txt",
        "text": (
            "Olivia's programming languages include Java, Python, TypeScript, JavaScript, SQL, and C. "
            "Her frameworks and libraries include Angular, React, React Native, PyTorch, NumPy, and Pandas. "
            "Her databases include MongoDB and MySQL. "
            "Her tools and platforms include Git, Linux, Docker, Jenkins, Kafka, Postman, "
            "Xcode, Android Studio, and Palantir Foundry."
        ),
    },
    {
        "id": "experience_att",
        "source": "experience/att",
        "text": (
            "Olivia has been a Software Engineer at AT&T since July 2025. "
            "She replaced client-side polling with a Kafka-based pipeline to support real-time updates "
            "in the Angular frontend, reducing API load. "
            "She reworked a core Angular data table used by over 35,000 AT&T technicians, "
            "adding column resizing and improving performance for large datasets. "
            "She also consolidated two Angular applications into a single codebase by merging shared "
            "modules and functionality, reducing duplication and improving maintainability."
        ),
    },
    {
        "id": "experience_morse",
        "source": "experience/morse-corp",
        "text": (
            "Olivia worked as a Python Software Engineer Co-op at MORSE Corp from January to June 2024. "
            "She built a Python dashboard using the Palantir Foundry API to monitor machine learning model "
            "performance, including accuracy metrics, helping engineers identify and troubleshoot "
            "underperforming models. "
            "She maintained data pipelines and transforms supporting the testing and evaluation of ML models. "
            "She integrated data from computer vision systems, traditional sensors, and human-labeled data "
            "for machine learning and AI projects."
        ),
    },
    {
        "id": "experience_skillz",
        "source": "experience/skillz",
        "text": (
            "Olivia worked as an SDK Co-op at Skillz from January to August 2023. "
            "Skillz is a gaming platform with 3 million monthly active users. "
            "She increased tutorial completion by 40%, Day-1 retention by 30%, and Day-0 paid conversions "
            "by 7% by creating a new onboarding tutorial and username generator. "
            "She developed a cross-platform league progression system used in 6 million+ daily competitions, "
            "improving player engagement and long-term retention. "
            "She resolved UI and authentication bugs in single-sign-on flows across supported games."
        ),
    },
    {
        "id": "project_huskyflow",
        "source": "projects/huskyflow",
        "text": (
            "HuskyFlow is a full-stack Q&A platform Olivia built, inspired by Stack Overflow. "
            "It features community spaces, user following, and Google OAuth authentication. "
            "She added real-time polls using WebSockets so votes update and polls expire automatically. "
            "Tech stack: TypeScript, React, Node.js, MongoDB, WebSockets. "
            "It has a live demo and is available on GitHub."
        ),
    },
    {
        "id": "project_text_simplification",
        "source": "projects/text-simplification",
        "text": (
            "Olivia built a Text Simplification Application using Python and PyTorch. "
            "She built a text simplification model using a custom word complexity approach and a "
            "fine-tuned T5 transformer. She created a React + Flask app that accepts text or audio "
            "input and returns simplified text with text-to-speech output. "
            "Tech stack: Python, PyTorch, React, Flask."
        ),
    },
    {
        "id": "project_shell",
        "source": "projects/shell",
        "text": (
            "Olivia implemented a Custom Command Line Shell in C. "
            "She built a Unix-like shell using Linux syscalls including fork, exec, and pipe, "
            "with support for command execution, pipelines, and I/O redirection. "
            "This project demonstrates low-level systems programming skills."
        ),
    },
    {
        "id": "contact",
        "source": "contact.json",
        "text": (
            "Olivia Gao can be contacted at oliviagao825@gmail.com. "
            "She is based in the New York Metropolitan Area. "
            "Her LinkedIn is linkedin.com/in/olivia-gao03. "
            "Her GitHub is github.com/olivegaoden."
        ),
    },
    {
        "id": "interests",
        "source": "about_me.txt",
        "text": (
            "Outside of work, Olivia enjoys crochet, cozy gaming, and singing. "
            "She has a background in graphic and information design from her minor at Northeastern, "
            "which informs her approach to building user-facing software."
        ),
    },
]
