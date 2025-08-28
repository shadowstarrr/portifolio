"use client";

import { useState, useRef, useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin-ext']
});

interface FileInter {
  iconName: string;
  iconImage: string;
  textSize: number;
  preview: string;
  width: number;
  height: number;
  name: string;
}

export default function File({
  iconName,
  iconImage,
  textSize,
  preview,
  width,
  height,
  name,
}: FileInter) {
  const [modal, setModal] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragging = useRef({ is: false, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;

    const handleMouseDown = (e: MouseEvent) => {
      dragging.current.is = true;
      const rect = el.getBoundingClientRect();
      dragging.current.offsetX = e.clientX - rect.left;
      dragging.current.offsetY = e.clientY - rect.top;

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current.is) return;

      el.style.left = `${e.clientX - dragging.current.offsetX}px`;
      el.style.top = `${e.clientY - dragging.current.offsetY}px`;
    };

    const handleMouseUp = () => {
      dragging.current.is = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const bar = el.querySelector(".title-bar");
    if (bar) bar.addEventListener("mousedown", handleMouseDown as EventListener);

    return () => {
      if (bar) bar.removeEventListener("mousedown", handleMouseDown as EventListener);
    };
  }, [modal]);

  return (
    <div className="flex">
      <div
        className="flex flex-col items-center justify-center cursor-default select-none group"
        onClick={() => setModal(true)}
      >
        <button
          className="bg-transparent cursor-default inline-block p-2"
          aria-label={`Open ${iconName} preview`}
        >
          <img
            src={`/${iconImage}`}
            alt={`${iconName} icon`}
            style={{ width, height }}
            className="block mx-auto"
          />
        </button>

        <p
          className={`text-white text-center ${inter.className} mt-1 px-2 py-0.5 rounded text-[12px] leading-tight transition-all duration-150 group-hover:bg-white/10`}
          style={{
            fontSize: textSize,
            maxWidth: width + 20,
            wordWrap: "break-word",
          }}
        >
          {iconName}
        </p>
      </div>

{modal && (
  <div
    ref={windowRef}
    className="fixed z-50"
    style={{ top: "30%", left: "30%" }}
  >
    <div className="w-[640px] max-w-full rounded-xl shadow-2xl border border-white/10 backdrop-blur-xl overflow-hidden z-50">
      <div className="title-bar flex justify-between items-center px-4 py-2 h-10 bg-white/5 backdrop-blur-md border-b border-white/10 cursor-move select-none">
        <h2 className="text-white text-sm font-medium tracking-wide">
          {name}
        </h2>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setModal(false)}
            className="w-3 h-3 rounded-full bg-red-500 hover:scale-105 transition-transform"
            title="Close"
          />
        </div>
      </div>

      <div
        className="backdrop-blur-xl bg-transparent text-white text-sm p-6 min-h-[200px] flex items-center justify-center flex-col"
        dangerouslySetInnerHTML={{ __html: preview }}
      />
    </div>
  </div>
)}



    </div>
  );
}
