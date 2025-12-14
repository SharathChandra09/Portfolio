const portfolioData = {
    personalInfo: {
        name: "Prodduturi Sharath Chandra",
        role: "Full Stack Developer & Software Engineer",
        tagline: "I build scalable, high-performance web applications with a foundation in engineering excellence.",
        bio: [
            "I am a Full Stack Developer with deep expertise in the MERN stack and Java, focused on designing robust backend architectures and intuitive front-end interfaces.",
            "Currently at LTIMindtree, I engineer complex automation solutions and optimize data services, applying a 'quality-first' mindset to every line of code I write.",
            "With a strong foundation in both development and testing, I bring a unique perspective to software engineering"
        ],
        contact: {
            email: "sharathchandraprodduturi@gmail.com",
            phone: "+91 9642730647",
            linkedin: "https://www.linkedin.com/in/sharath-chandra-b3920724b/",
            github: "https://github.com/SharathChandra01",
            location: "Bengaluru, India"
        }
    },
    education: [
        {
            institution: "Sathyabama Institute of Science and Technology",
            degree: "B.E. Computer Science",
            duration: "2021 - 2025",
            score: "CGPA: 8.13",
            details: "Focused on Core CS principles, Software Engineering, and specialized in Java & Data Structures."
        }
    ],
    skills: {
        languages: ["Java", "JavaScript", "SQL", "Groovy"],
        frameworks: ["MERN Stack", "Selenium", "TestNG", "Rest Assured", "React", "Node.js"],
        database: ["MySQL", "PostgreSQL", "MongoDB"],
        tools: ["Postman", "ReadyAPI", "Tosca", "Jenkins", "Git", "Docker"],
        others: ["API Automation", "CI/CD Pipelines", "Test Data Management", "Agile"]
    },
    experience: [
        {
            role: "Quality Engineer",
            company: "LTIMindtree",
            duration: "Aug 2025 - Present",
            location: "Bengaluru (Hybrid)",
            description: [
                "Focusing on Test Data Management (TDM) and API/UI Automation within the Test Data Services team.",
                "Designing automated test flows using Postman, ReadyAPI, and Groovy.",
                "Integrating automation scripts with CI/CD pipelines to ensure continuous delivery."
            ]
        },
        {
            role: "SDET Apprentice",
            company: "LTIMindtree",
            duration: "Jun 2025 - Aug 2025",
            location: "Bhubaneswar (On-site)",
            description: [
                "Trained intensively in Java Full Stack Testing (Selenium, Postman, JDBC).",
                "Led a team to develop hybrid automation frameworks using BDD and Data-Driven approaches.",
                "Engineered robust test suites using TestNG and Maven for end-to-end validation."
            ]
        },
        {
            role: "Marketing Intern",
            company: "Corizo",
            duration: "Nov 2024 - Dec 2024",
            location: "Remote",
            description: [
                "Executed data-driven digital marketing strategies to uncover consumer trends.",
                "Refined campaign performance through analytics, maximizing ROI and engagement.",
                "Collaborated cross-functionally to streamline project management workflows."
            ]
        },
        {
            role: "Project Intern",
            company: "HCLTech",
            duration: "Feb 2024 - May 2024",
            location: "Remote",
            description: [
                "Resolved 20+ critical system bugs, significantly improving application stability.",
                "Streamlined testing processes in collaboration with QA teams to accelerate deployment.",
                "Contributed to the architectural design of scalable, fault-tolerant solutions."
            ]
        }
    ],
    projects: [
        {
            title: "Real Estate Platform",
            tech: ["Node.js", "Express", "MongoDB", "EJS"],
            description: "A comprehensive property management solution featuring role-based access control and secure authentication. Engineered a responsive MVC architecture that handles property listings and user inquiries with optimized query performance."
        },
        {
            title: "Alzheimer's Detection AI",
            tech: ["Python", "TensorFlow", "CNN"],
            description: "Leveraged Deep Learning to diagnose neurodegenerative diseases early. Built and trained a Convolutional Neural Network on 80,000+ MRI scans, Authored and presented a research paper at ICRETM 2025."
        },
        {
            title: "Department Management System",
            tech: ["Java", "JDBC", "MySQL"],
            description: "Designed a robust console-based application to streamline departmental operations. Implemented a layered architecture (DAO, Service) to ensure separation of concerns and maintainability."
        },
        {
            title: "Automated Testing Suite",
            tech: ["Selenium", "Cucumber", "TestNG"],
            description: "Led the automation of end-to-end testing for a live website. Developed a Hybrid framework reducing regression testing time significantly while ensuring high software quality."
        }
    ],
    certifications: [
        "NPTEL - Programming in Java",
        "SQL Bootcamp - Udemy",
        "WISSENAIRE'23 Participant"
    ]
};

module.exports = portfolioData;
