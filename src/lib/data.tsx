import { Project } from "@/types";

const freewriteImg = "/assets/freewrite-screenshot.png";
const smartLeleImg = "/assets/smartLele-screenshot.png";
const phishGuardImg = "/assets/phishguard-screenshot.png";

export const projects: Project[] = [
  {
    id: "1",
    name: "freewrite-tui",
    description: "Just Rust based TUI software for freewriting. ",
    tech: ["Rust", "Ratatui(Rust TUI Library)"],
    repo: "https://github.com/prmditya/freewrite-tui",
    imageSrc: freewriteImg,
  },
  {
    id: "2",
    name: "smart-lele",
    description:
      "Smart Lele is an AIoT-based project designed for real-time monitoring and control of a catfish pond environment. ",
    tech: [
      "Python",
      "Arduino",
      "ESP32",
      "TensorflowLite",
      "PHP",
      "MySQL",
      "Terraform",
      "aws",
    ],
    repo: "https://github.com/prmditya/smart-lele",
    imageSrc: smartLeleImg,
  },
  {
    id: "3",
    name: "phish-guard",
    description: "URL based phising detector website using machine learning ",
    tech: ["Python", "ScikitLearn", "Flask", "HTML", "CSS", "JavaScript"],
    repo: "https://github.com/prmditya/phish-guard",
    imageSrc: phishGuardImg,
  },
];

export const skills = [
  "C",
  "Shell",
  "JavaScript",
  "TypeScript",
  "PHP",
  "Python",
  "Rust",
  "Git",
  "Vim",
  "Docker",
];

export const about = `Hi, my name is Thoriq Kusuma Paramaditya.
I'm born in Semarang, Central Java, Indonesia. 
Currently live in Sidoarjo, East Java.

I'm a Computer Engineering student and a Tech Nerd. 
I like to learn and explore new concepts,
from software development to hardware interactions.

Currently, I'm focusing on Web Development, AI/ML, and 
Embedded Systems. Oh yes, and I use Arch btw.`;
