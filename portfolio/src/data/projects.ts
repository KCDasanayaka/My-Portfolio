import BookMyBusImage from "../app/projects/BookMyBus.jpg";
import ChildCare from "../app/projects/childCare.jpg";
import natureWinYala from "../app/projects/natureWinYala.jpg";
import quantum from "../app/projects/quantum.jpg";
import ugc from "../app/projects/ugc.jpg";
import buildMatePlus from "../app/projects/buildMatePlus.jpg";

interface Project {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    href: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "BookMyBus",
        subtitle: "Long-Distance Bus Booking App",
        image: "/projects/BookMyBus.jpg",
        href: "/projects/ecommerce",
    },
    {
        id: 2,
        title: "ChildCare",
        subtitle: "Collaborative productivity tool",
        image: "/projects/childCare.jpg",
        href: "/projects/taskapp",
    },
    {
        id: 3,
        title: "NatureWinYala",
        subtitle: "Real-time data visualization",
        image: "/projects/natureWinYala.jpg",
        href: "/projects/analytics",
    },
    {
        id: 4,
        title: "UGC",
        subtitle: "Interactive content sharing",
        image: "/projects/ugc.jpg",
        href: "/projects/social",
    },
    {
        id: 5,
        title: "Quantum",
        subtitle: "Audio platform with playlists",
        image: "/projects/quantum.jpg",
        href: "/projects/music",
    },
    {
        id: 6,
        title: "BuildMatePlus",
        subtitle: "Forecast and climate insights",
        image: "/projects/buildMatePlus.jpg",
        href: "/projects/weather",
    },
];