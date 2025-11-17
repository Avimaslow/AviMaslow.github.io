// assets/js/data.js

window.resumeData = {
    titles: ["Data Analyst", "Data Scientist", "Cloud Engineer", "C++ Systems Engineer"],
    profiles: {
        hft: "Designing a modern C++ trading engine focused on determinism, type safety, and clear data flow from market data to execution.",
        cloud: "Building on AWS and GCP: static sites, APIs, and data pipelines that stay simple, observable, and affordable.",
        data: "Turning messy operational data into dashboards and narratives managers can actually use for decisions.",
        human: "Translating between technical and non-technical teams, writing documentation, and running live demos without drama."
    },
    timeline: [
        {
            role: "Technology & Engineering Fellow",
            company: "MTA - Metropolitan Transportation Authority",
            location: "New York, NY",
            dates: "2025 – Present",
            bullets: [
                "Own dashboards tracking thousands of devices through upgrade lifecycle.",
                "Coordinate between field technicians, management, and reporting teams.",
                "Document and automate repeatable steps to reduce friction in upgrades."
            ]
        },
        {
            role: "IT Analyst Intern",
            company: "MTA - Metropolitan Transportation Authority",
            location: "New York, NY",
            dates: "2024 – 2025",
            bullets: [
                "Maintained a program dashboard with multiple data sources and complex rules.",
                "Wrote SOPs and guides for technicians performing device upgrades.",
                "Helped triage issues and keep management aligned on status."
            ]
        },
        {
            role: "Student",
            company: "Columbia University",
            location: "New York, NY",
            dates: "Ongoing",
            bullets: [
                "Built course projects in algorithms, databases, NLP, AI, and systems.",
                "Explored LLM interpretability and custom training setups.",
                "Collaborated with peers on projects mixing theory and real data."
            ]
        },
                {
            role: "Data Acquisition Intern",
            company: "Moneza Inc",
            location: "New York, NY",
            dates: "2020-2021",
            bullets: [
                "Modeled and secured SQL databases for time-series financial data, implementing validation "+
                "and aggregation pipelines with strong data integrity controls.",
                "Created scripts for volatility tracking and anomaly detection—experience "+
                "directly transferable to security event log analysis and incident response."
            ]
        }
    ],
    projects: [
        {
            name: "MAP – High-Frequency Trading Engine",
            type: "systems",
            role: "C++ Lead (Safety & Engine)",
            summary: "In-memory limit order book with deterministic replay and type-safe primitives.",
            tech: ["C++20", "CMake", "GitHub Actions"],
            image: "assets/img/MAP-HFT.png",
            link: "https://github.com/MAP-High-Frequency-Trading-Engine/map-hft"
        },
        {
            name: "TorsX – Real Estate Explorer",
            type: "web",
            role: "iOS & Backend",
            summary: "SwiftUI front-end with data-driven listings and image galleries.",
            tech: ["SwiftUI", "CloudKit", "MVVM"],
            image: "assets/img/Torsx.png",
            link: "https://github.com/Avimaslow/Torsx"
        },
        {
            name: "NYC Study Spots",
            type: "web",
            role: "Full-stack",
            summary: "A catalog of study spots with reviews, using a microservices architecture.",
            tech: ["React", "Flask", "GCP", "Cloud SQL"],
            image: "assets/img/study_spots.png",
            link: "https://github.com/orgs/nyc-study-project/repositories"
        },
        {
            name: "Cruise Review NLP Analyzer",
            type: "data",
            role: "Developer",
            summary: "NLP pipeline for scraping, cleaning, and analyzing cruise reviews to identify themes, sentiment, and traveler insights.",
            tech: ["Python", "BeautifulSoup", "Pandas", "NLTK"],
            image: "assets/img/CruiseNLP.png",
            link: "https://github.com/Avimaslow/cruise-nlp-project"
        },
        {
            name: "DWTS – Dancing with the Stars Analysis",
            type: "data",
            role: "Data Analyst",
            summary: "Statistical and visual analysis of judge scoring patterns across seasons using Python regression models.",
            tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "StatsModels"],
            image: "assets/img/dwts.png",
            link: "https://github.com/Avimaslow/DWTS/tree/main"
        },
        {
            name: "Broadway Where",
            type: "web",
            role: "iOS & Backend",
            summary: "SwiftUI front-end with data-driven listings and image galleries.",
            tech: ["SwiftUI", "CloudKit", "MVVM"],
            image: "assets/img/BroadwayWhereApp.png",
            link: "https://github.com/Avimaslow/BroadwayWhere-"
        },
        {
            name: "ONE&DONE – Bathroom Finder",
            type: "web",
            role: "Solo Developer",
            summary: "Mobile-first app to locate nearby public restrooms in NYC.",
            tech: ["SwiftUI", "Location Services"],
            image: "assets/img/oneAndDoneApp.png",
            link: "https://github.com/Avimaslow/OneAndDoneApp"
        }
    ],
    nowWorkingOn: [
    {
        title: "MAP – High-Frequency Trading Engine",
        subtitle: "Deep dive into matching logic, replay, and risk constraints."
    },

    {
        title: "NYC Study Spots (GCP microservices)",
        subtitle: "Hardening APIs, auth, and deployment for a public beta."
    },
    {
        title: "Prediction Market NLP",
        subtitle: "Cleaning datasets and experimenting with alignment metrics."
    }
],






    skills: {
        core: {
            title: "Core Engineering",
            text: "Solid foundation in algorithms, data structures, and systems thinking. Comfortable reasoning about performance, trade-offs, and failure modes.",
            list: ["Algorithms & Data Structures", "Object-Oriented Design", "Testing & Debugging"]
        },
        backend: {
            title: "Backend & Systems",
            text: "From event-driven C++ engines to Python APIs and SQL schemas, I enjoy designing backends that are predictable and observable.",
            list: ["C++ / Python", "PostgreSQL / MySQL", "REST APIs, JSON, logging"]
        },
        cloud: {
            title: "Cloud & Data",
            text: "Experience deploying low-traffic but high-value apps using managed services and careful cost control.",
            list: ["AWS / GCP basics", "Static hosting, Lambdas, APIs", "Power BI / Tableau dashboards"]
        },
        human: {
            title: "Human Skills",
            text: "I like talking with non-technical stakeholders, preparing demos, and documenting systems so they can outlive the original author.",
            list: ["Stakeholder communication", "Documentation & SOPs", "Mentoring & collaboration"]
        }
    },

  certificates: [
    {
      id: "aws-ai",
      name: "AWS Certified AI Practitioner",
      issuer: "AWS",
      image: "assets/img/awsAiPractioner.png",
      url: "https://www.credly.com/badges/935184a8-902c-43d3-8536-e18a9843b18a/public_url"
    },
    {
      id: "aws-cloud",
      name: "AWS Certified Cloud Practitioner",
      issuer: "AWS",
      image: "assets/img/CloudPractioner.png",
      url: "https://www.credly.com/badges/135f8aac-c563-4277-9d93-0dbc47b79a96/public_url"
    },
    {
      id: "net-plus",
      name: "CompTIA Network+",
      issuer: "CompTIA",
      image: "assets/img/net+.png",
      url: "https://www.credly.com/badges/f6effc37-188a-4e1a-8856-0638a95de55a/public_url"
    },
    {
      id: "sec-plus",
      name: "CompTIA Security+",
      issuer: "CompTIA",
      image: "assets/img/securityPlus.png",
      url: "https://www.credly.com/badges/db783870-f386-4210-8fd1-7f8f635a9449/public_url"
    }
  ]
};
