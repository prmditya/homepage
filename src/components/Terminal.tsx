"use client";

import { useState, useRef, useEffect } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import Image from "next/image"; // Ensure Image is imported
import { StaticImageData } from "next/image";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { lines, executeCommand } = useTerminal(); // Destructure lines and executeCommand
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new line
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on mount and click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex =
          historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(newIndex === -1 ? "" : commandHistory[newIndex]);
      }
    }
  };

  const renderImage = (
    imageSrc: string | StaticImageData,
    altText?: string,
  ) => {
    if (!imageSrc) return null;

    const isStaticImageData = typeof imageSrc !== "string";
    const width = isStaticImageData ? imageSrc.width : 500;
    const height = isStaticImageData ? imageSrc.height : 300;

    return (
      <Image
        src={imageSrc}
        alt={altText || "Image output"}
        width={width}
        height={height}
        className="block h-auto"
      />
    );
  };

  return (
    <div className="min-h-[100%] bg-black text-green p-4">
      {" "}
      <div
        ref={terminalRef}
        className="max-w-4xl h-[calc(100vh-120px)] overflow-y-auto mx-auto"
      >
        {lines.map((line) => (
          <div key={line.id} className="mb-1">
            {line.type === "command" && (
              <div className="text-green">{line.content}</div>
            )}

            {line.type === "image" && line.imageSrc && (
              // This is for standalone image lines (like your initial logo)
              <div className="terminal-image-wrapper w-[300px] mb-5">
                {" "}
                {/* Adjusted max-width */}
                {renderImage(line.imageSrc, line.content)}
                {line.content && (
                  <p className="text-center text-gray text-sm mt-1">
                    {line.content}
                  </p>
                )}{" "}
                {/* Optional caption */}
              </div>
            )}

            {line.type === "output" && (
              <div className="text-fg whitespace-pre-wrap">
                {/* Keep pre-wrap for 'about' and general text */}
                {/* Check if the output line has an image to display alongside content */}
                {line.imageSrc && (
                  <div className="my-2 max-w-sm">
                    {/* Wrapper for image within output line */}
                    {renderImage(line.imageSrc, line.content)}
                  </div>
                )}
                {/* Render the content, allowing HTML for project details */}
                {/* Use a div to apply styles to the content within the output line */}
                <div
                  className="terminal-content-output"
                  dangerouslySetInnerHTML={{ __html: line.content || "" }}
                />
              </div>
            )}

            {line.type === "error" && (
              <div className="text-red">{line.content}</div>
            )}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-green mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green outline-none caret-green" // Add caret-color
            placeholder="Type a command..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
