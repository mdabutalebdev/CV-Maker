"use client";

import React, { useState, useEffect } from "react";
import { useProgressStore } from "@/store/progressStore";
import { useRouter } from "next/navigation";

const AiResumeGenaration: React.FC = () => {
  const router = useRouter();
  const start = useProgressStore((state) => state.start);
  const triggerStart = useProgressStore((state) => state.triggerStart);
  const resetProgress = useProgressStore((state) => state.resetProgress);

  // Initial slightly filled progress
  const [progress, setProgress] = useState(5);  

  useEffect(() => {
    // Automatically start the progress when component mounts
    triggerStart();
  }, [triggerStart]);

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
    <div className="flex flex-col space-y-6 py-10">
      <h3 className="text-4xl font-bold text-heading">AI Resume Magic</h3>
      <p className="font-normal text-[14px] text-secondary">Now, lets turn all the information youve provided into a professional resume! Our AI will generate a polished version that showcases your strengths and matches industry standards.</p>
       <h3 className="font-medium text-base">AI is refining your resume...</h3>
      {/* Progress Bar */}
      <div className="w-full max-w-2xl bg-gray-200 h-3 rounded overflow-hidden">
        <div
          className="bg-primary h-full rounded transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      
    </div>
  );
};

export default AiResumeGenaration;