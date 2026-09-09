export interface ProjectLink {
  behance?: string;
  dribbble?: string;
  github?: string;
  live?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectDetails {
  overview?: string;
  problem?: string;
  solution?: string;
  result?: string;
}

export interface Project {
  id: number;

  // Home page
  title: string;
  subtitle: string;
  image: string;
  href: string;

  // Inner project page
  slug: string;
  year: string;
  role: string;
  category: string;
  description: string;

  // Hero
  heroImage: string;
  heroPosition?: string;

  // External links
  links: ProjectLink;

  // Project information
  details: ProjectDetails;

  // Gallery
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    id: 1,

    title: "BookMyBus",
    subtitle: "Long-Distance Bus Booking App",

    image: "/projects/BookMyBus.webp",
    href: "/projects/bookmybus",

    slug: "bookmybus",

    year: "2026",
    role: "UI/UX Designer",
    category: "Mobile App",

    description:
      "A user-focused long-distance bus booking experience designed to make searching, selecting and booking intercity bus journeys simple and intuitive.",

    heroImage: "/projects/BookMyBus1.webp",
    heroPosition: "center",

    links: {
      behance: "https://www.behance.net/gallery/255028499/BookMyBus-Long-Distance-Bus-Booking-App",
      dribbble: "https://dribbble.com/shots/27690425-BookMyBus-Long-Distance-Bus-Booking-App-UX-UI-Case-Study",
      github: "",
      live: "",
    },

    details: {
      overview:
        "BookMyBus is a long-distance bus booking application focused on creating a simple and reliable booking experience for passengers.",

      problem:
        "Users often need to navigate through complicated booking processes while comparing routes, boarding points, drop-off points and available buses.",

      solution:
        "The experience was structured around clear route selection, bus information, boarding and drop-off points, driver and conductor information, and a simplified booking flow.",

      result:
        "The final interface provides a clearer journey from discovering a bus to completing a booking while keeping important travel information accessible.",
    },

    images: [
      {
        src: "/projects/bookmybus/1.webp",
        alt: "BookMyBus project screen 01",
      },
      {
        src: "/projects/bookmybus/2.webp",
        alt: "BookMyBus project screen 02",
      },
      {
        src: "/projects/bookmybus/3.webp",
        alt: "BookMyBus project screen 03",
      },
      {
        src: "/projects/bookmybus/4.webp",
        alt: "BookMyBus project screen 04",
      },
      {
        src: "/projects/bookmybus/5.webp",
        alt: "BookMyBus project screen 05",
      },
      {
        src: "/projects/bookmybus/6.webp",
        alt: "BookMyBus project screen 06",
      },
      {
        src: "/projects/bookmybus/7.jpg",
        alt: "BookMyBus project screen 07",
      },
    
    ],
  },

  {
    id: 2,

    title: "ChildCare",
    subtitle: "UX Research & UI Design Case Study",

    image: "/projects/childCare.jpg",
    href: "/projects/childcare",

    slug: "childcare",

    year: "2026",
    role: "Branding & UI/UX Designer",
    category: "Web Application",

    description:
      "A childcare-focused digital experience designed to help users organize, manage and coordinate everyday childcare activities.",

    heroImage: "/projects/childCare.jpg",
    heroPosition: "center",

    links: {
      behance: "https://www.behance.net/gallery/255335983/ChildCare-UX-Research-UI-Design-Case-Study",
      dribbble: "https://dribbble.com/shots/27708034-ChildCare-UX-Research-UI-Design-Case-Study",
      github: "",
      live: "",
    },

    details: {
      overview:
        "ChildCare is a digital experience designed around simplifying childcare-related organization and communication.",

      problem:
        "Managing childcare information and everyday activities can become difficult when information is scattered across different places.",

      solution:
        "The interface brings important information into a structured and easy-to-understand experience.",

      result:
        "A cleaner and more approachable interface that helps users interact with childcare information more efficiently.",
    },

    images: [
      {
        src: "/projects/ChildCare/1.jpg",
        alt: "ChildCare project screen 01",
      },
      {
        src: "/projects/ChildCare/2.jpg",
        alt: "ChildCare project screen 02",
      },
      
    ],
  },

  {
    id: 3,

    title: "NatureWinYala",
    subtitle: "Hotel Web Design",

    image: "/projects/natureWinYala.webp",
    href: "/projects/naturewinyala",

    slug: "naturewinyala",

    year: "2026",
    role: "UI/UX Designer & Frondend Dev",
    category: "Web Experience",

    description:
      "Nature Win yala is a hospitality destination and goal of this project was to craft a website that translates this natural serenity into a seamless digital journey",

    heroImage: "/projects/natureWinYala.jpg",
    heroPosition: "center",

    links: {
      behance: "https://www.behance.net/gallery/245191133/Nature-Win-Yala-Hotel-Web-Design",
      dribbble: "https://dribbble.com/shots/27148054-Nature-Win-Yala-Hotel-Web-Design",
      github: "",
      live: "",
    },

    details: {
      overview:
        "NatureWinYala focuses on presenting nature and wildlife-related information through a modern digital experience.",

      problem:
        "Large amounts of information can become difficult to understand when they are not presented through a clear visual structure.",

      solution:
        "The interface uses visual hierarchy and data-focused layouts to make information easier to explore.",

      result:
        "A more engaging experience for discovering and understanding wildlife and environmental information.",
    },

    images: [
      {
        src: "/projects/NatureWinYala/1.webp",
        alt: "NatureWinYala project screen 01",
      }
    ],
  },

  {
    id: 4,

    title: "UGC",
    subtitle: "UX/UI case study ",

    image: "/projects/ugc.webp",
    href: "/projects/ugc",

    slug: "ugc",

    year: "2025",
    role: "UI/UX Designer",
    category: "Web Platform",

    description:
      "UX/UI case study focused on improving the usability, accessibility, and overall experience of one of Sri Lanka's most critical educational platforms.",

    heroImage: "/projects/ugc.webp",
    heroPosition: "center",

    links: {
      behance: "https://www.behance.net/gallery/219288223/UGC-Website-Redesign",
      dribbble: "https://dribbble.com/shots/27147843-UGC-Website-Redesign",
      github: "",
      live: "",
    },

    details: {
      overview:
        "UGC is an interactive platform concept focused on user-generated content and content discovery.",

      problem:
        "Users need an intuitive way to discover relevant content while also being able to interact with and contribute to the platform.",

      solution:
        "The interface was designed around clear content hierarchy, discovery and interaction patterns.",

      result:
        "A structured content experience that makes exploration and engagement easier.",
    },

    images: [
      {
        src: "/projects/UGC/1.webp",
        alt: "UGC project screen 01",
      },
      
    ],
  },

  {
    id: 5,

    title: "Quantum",
    subtitle: "BRANDING • UI/UX • WEB",

    image: "/projects/quantum.webp",
    href: "/projects/quantum",

    slug: "quantum",

    year: "2026",
    role: "Branding & UI/UX Designer",
    category: "Hospitality Consulting",

    description:
      "Professional Brand Created To Help Businesses Navigate The Complexities Of Modern Hospitality Through Expertise, Strategic Guidance And Practical Solutions.",

    heroImage: "/projects/quantum.webp",
    heroPosition: "center",

    links: {
      behance: "https://www.behance.net/gallery/255236743/QUANTUM-HOSPITALITY-BRANDING-UIUX-WEB",
      dribbble: "https://dribbble.com/shots/27702487-QUANTUM-HOSPITALITY-EXPERTS-BRANDING-UI-UX-WEB",
      github: "",
      live: "",
    },

    details: {
      overview:
        "Quantum is an audio platform concept designed around music discovery and playlist management.",

      problem:
        "Audio platforms contain large amounts of content, making navigation and discovery important parts of the experience.",

      solution:
        "The interface uses structured navigation, visual hierarchy and playlist-focused interactions.",

      result:
        "A cleaner audio experience focused on discovery and effortless navigation.",
    },

    images: [
      {
        src: "/projects/Quantum/1.webp",
        alt: "Quantum project screen 01",
      },
      {
        src: "/projects/Quantum/2.webp",
        alt: "Quantum project screen 02",
      },
    ],
  },

  {
    id: 6,

    title: "BuildMatePlus",
    subtitle: "Construction Enablement Platform",

    image: "/projects/buildMatePlus.webp",
    href: "/projects/buildmateplus",

    slug: "buildmateplus",

    year: "2025",
    role: "UI/UX Designer & Frontend Dev",
    category: "Web Application",

    description:
      "Innovative construction enablement platform designed to simplify project management, enhance collaboration, and connect clients with industry professionals.",

    heroImage: "/projects/buildMatePlus.webp",
    heroPosition: "center",

    links: {
      behance: "https://www.behance.net/gallery/219426941/BuildMate-Construction-Enablement-Platform",
      dribbble: "https://dribbble.com/shots/27717236-BuildMate-Construction-Enablement-Platform?new_shot_upload=true&utm_source=Clipboard_Shot&utm_campaign=Kavindu_Chathuranga_01&utm_content=BuildMate%2B%20-%20Construction%20Enablement%20Platform&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=Kavindu_Chathuranga_01&utm_content=BuildMate%2B%20-%20Construction%20Enablement%20Platform&utm_medium=Social_Share",
      github: "",
      live: "",
    },

    details: {
      overview:
        "BuildMatePlus presents forecast and climate-related information through a structured digital experience.",

      problem:
        "Weather and climate information can be difficult to interpret when presented as raw data.",

      solution:
        "The interface focuses on visual hierarchy and simplified information presentation.",

      result:
        "A clearer experience for exploring forecast and climate information.",
    },

    images: [
      {
        src: "/projects/buildMatePlus/1.jpg",
        alt: "BuildMatePlus project screen 01",
      },
      {
        src: "/projects/buildMatePlus/2.jpg",
        alt: "BuildMatePlus project screen 02",
      },
    ],
  },
];


// ----------------------------------------
// GET PROJECT BY SLUG
// ----------------------------------------

export function getProjectBySlug(
  slug: string
): Project | undefined {
  return projects.find(
    (project) => project.slug === slug
  );
}


// ----------------------------------------
// GET PROJECT INDEX
// ----------------------------------------

export function getProjectIndex(
  slug: string
): number {
  return projects.findIndex(
    (project) => project.slug === slug
  );
}


// ----------------------------------------
// PREVIOUS PROJECT
// ----------------------------------------

export function getPreviousProject(
  slug: string
): Project | null {
  const index = getProjectIndex(slug);

  if (index === -1) {
    return null;
  }

  const previousIndex =
    index === 0
      ? projects.length - 1
      : index - 1;

  return projects[previousIndex];
}


// ----------------------------------------
// NEXT PROJECT
// ----------------------------------------

export function getNextProject(
  slug: string
): Project | null {
  const index = getProjectIndex(slug);

  if (index === -1) {
    return null;
  }

  const nextIndex =
    index === projects.length - 1
      ? 0
      : index + 1;

  return projects[nextIndex];
}