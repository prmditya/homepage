"use client";

import { useState, useCallback, useRef } from "react";
import { TerminalLine, Project } from "@/types"; // Import Project type
import { projects, skills, about } from "@/lib/data";
import Logo from "../app/assets/logo-white.png"; // Assuming Logo is StaticImageData
import { StaticImageData } from "next/image"; // Make sure StaticImageData is imported

export const useTerminal = () => {
  const nextId = useRef(0);

  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: (nextId.current++).toString(),
      type: "image",
      imageSrc: Logo,
      timestamp: new Date(),
    },
    {
      id: (nextId.current++).toString(),
      type: "output",
      content: "Welcome to prmditya's terminal homepage",
      timestamp: new Date(),
    },
    {
      id: (nextId.current++).toString(),
      type: "output",
      content: 'Type "help" to see available commands',
      timestamp: new Date(),
    },
  ]);

  const addLine = useCallback(
    (
      type: TerminalLine["type"],
      // Allow imageSrc to be StaticImageData in the payload
      payload:
        | string
        | { content?: string; imageSrc?: string | StaticImageData },
    ) => {
      let newLine: TerminalLine;

      if (typeof payload === "string") {
        newLine = {
          id: (nextId.current++).toString(),
          type,
          content: payload,
          timestamp: new Date(),
        };
      } else {
        // Assign payload.imageSrc directly, as TerminalLine type now supports StaticImageData
        newLine = {
          id: (nextId.current++).toString(),
          type,
          content: payload.content,
          imageSrc: payload.imageSrc,
          timestamp: new Date(),
        };
      }
      setLines((prev) => [...prev, newLine]);
    },
    [],
  );

  const executeCommand = useCallback(
    (command: string) => {
      const cmd = command.trim().toLowerCase();
      addLine("command", `$ ${command}`);

      switch (cmd) {
        case "help":
          addLine("output", "Available commands:");
          addLine("output", "  help       - Show this help message");
          addLine("output", "  about      - About me");
          addLine("output", "  projects   - List my projects");
          addLine("output", "  skills     - My technical skills");
          addLine("output", "  contact    - Contact information");
          addLine("output", "  clear      - Clear terminal");
          addLine("output", "  whoami     - Display current user");
          addLine("output", "  date       - Show current date");
          addLine("output", "  showlogo   - Display the main logo");
          break;

        case "about":
          addLine("output", about);
          break;

        case "projects":
          addLine("output", "My Recent Projects:");
          projects.forEach((project: Project) => {
            // Explicitly type project
            addLine("output", {
              content: `
[${project.name}] - ${project.description}

    Tech: ${project.tech.join(", ")}
    ${project.repo ? `<a href="${project.repo}" target="_blank" rel="noopener noreferrer">Repo: ${project.repo}</a>` : ""}`,
              imageSrc: project.imageSrc,
            });
            addLine("output", " ");
          });
          break;

        case "skills":
          addLine("output", "Technical skills:");
          addLine("output", skills.join(", "));
          break;

        case "contact":
          addLine("output", "Contact information:");
          addLine(
            "output",
            `  Email: <a href="mailto:tparamaditya@gmail.com" target"_blank" rel="noopener noreferrer">tparamaditya@gmail.com</a>`,
          );
          addLine(
            "output",
            `  GitHub: <a href="https://github.com/prmditya" target"_blank" rel="noopener noreferrer">https://github.com/prmditya</a>`,
          );
          addLine(
            "output",
            `  LinkedIn: <a href="https://www.linkedin.com/in/prmdtya/" target"_blank" rel="noopener noreferrer">https://www.linkedin.com/in/prmdtya/</a>`,
          );
          break;

        case "clear":
          setLines([]);
          nextId.current = 0;
          break;

        case "whoami":
          addLine("output", "prmditya");
          break;

        case "date":
          const now = new Date();
          const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
            timeZone: "Asia/Jakarta",
          };
          const formattedDate = new Intl.DateTimeFormat(
            "en-US",
            options,
          ).format(now);
          addLine("output", formattedDate);
          break;

        case "ls":
          addLine("output", "about.txt  projects/  skills.txt  contact.txt");
          break;

        case "pwd":
          addLine("output", "/home/prmditya/homepage");
          break;

        case "uname":
          addLine("output", "Linux prmditya/homepage 6.1.0 x86_64");
          break;

        case "showlogo": // New command to display the logo dynamically
          addLine("image", { imageSrc: Logo, content: "prmditya's logo" });
          break;

        case "":
          break;

        default:
          addLine("error", `Command not found: ${command}`);
          addLine("output", 'Type "help" for available commands');
      }
    },
    [addLine],
  );

  return { lines, executeCommand };
};
