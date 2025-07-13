import { StaticImageData } from "next/image";

export interface Command {
  name: string;
  description: string;
  action: () => void;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
  imageSrc?: StaticImageData | string;
}

export interface TerminalLine {
  id: string;
  type: "command" | "output" | "image" | "error";
  imageSrc?: StaticImageData | string;
  content?: string;
  timestamp: Date;
}
