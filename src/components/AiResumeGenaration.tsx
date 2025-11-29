"use client";

import React, { useState, useEffect } from "react";
import { useProgressStore } from "@/store/progressStore";
import { useRouter } from "next/navigation";

const AiResumeGenaration: React.FC = () => {
  const router = useRouter();
  const start = useProgressStore((state) => state.start);
  const resetProgress = useProgressStore((state) => state.resetProgress);

  // Initial slightly filled progress
  const [progress, setProgress] = useState(5); // <-- load হলে 5% fill থাকবে

  useEffect(() => {
    if (!start) return;

    let frameId: number;
    const duration = 5000; // 5 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      if (newProgress < 100) {
        frameId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          resetProgress();
          router.push("/steps/7");
        }, 500);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [start, router, resetProgress]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-10">
      <h1 className="text-4xl font-bold">AI Resume Magic</h1>
      <p>Now, lets turn all the information youve provided into a professional resume!</p>

      {/* Progress Bar */}
      <div className="w-full max-w-xl bg-gray-200 h-3 rounded overflow-hidden">
        <div
          className="bg-green-500 h-full rounded transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default AiResumeGenaration;
