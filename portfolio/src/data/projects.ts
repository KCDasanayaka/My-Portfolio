import BookMyBusImage from "../app/projects/BookMyBus.jpg";

interface Project {
    id: number;
    title: string;
    subtitle: string;
    image: string | { src: string };
    href: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "BookMyBus",
        subtitle: "Long-Distance Bus Booking App",
        image: BookMyBusImage,
        href: "/projects/ecommerce",
    },
    {
        id: 2,
        title: "Task Management App",
        subtitle: "Collaborative productivity tool",
        image: "/projects/taskapp.jpg",
        href: "/projects/taskapp",
    },
    {
        id: 3,
        title: "Analytics Dashboard",
        subtitle: "Real-time data visualization",
        image: "/projects/analytics.jpg",
        href: "/projects/analytics",
    },
    {
        id: 4,
        title: "Social Media Feed",
        subtitle: "Interactive content sharing",
        image: "/projects/social.jpg",
        href: "/projects/social",
    },
    {
        id: 5,
        title: "Music Streaming Service",
        subtitle: "Audio platform with playlists",
        image: "/projects/music.jpg",
        href: "/projects/music",
    },
    {
        id: 6,
        title: "Weather Application",
        subtitle: "Forecast and climate insights",
        image: "/projects/weather.jpg",
        href: "/projects/weather",
    },
];