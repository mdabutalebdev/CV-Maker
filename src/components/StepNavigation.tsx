// /components/StepNavigation.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "./shared/Button";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useProgressStore } from "@/store/progressStore";

export default function StepNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const currentStep = parseInt(pathname.split("/").pop() || "1");

const triggerStart = useProgressStore((state) => state.triggerStart);
const resetProgress = useProgressStore((state) => state.resetProgress);


  let nextButtonText = "Next";
  let showNextButton = true;

  if (currentStep === 6) {
    nextButtonText = "Generate Resume";
  } else if (currentStep === 7) {
    showNextButton = false;
  }

  const handleBack = () => {
    if (currentStep > 1) {
      router.push(`/steps/${currentStep - 1}`);
    } else if (currentStep === 1) {
      router.push("/");
    }

    // Back এ গেলে progress reset হবে
    resetProgress();
  };

  const handleNext = () => {
    if (currentStep < 6) {
      router.push(`/steps/${currentStep + 1}`);
    } else if (currentStep === 6) {
      console.log("Generating Resume...");

      // 🔥 Progress Start
      triggerStart();

      // Step 7 এ push হবে AiResumeGenaration এর useEffect থেকে
      // সরাসরি router.push() remove করা
    }
  };

  return (
    <div className="flex justify-between container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {currentStep < 6 && (
        <Button
          onClick={handleBack}
          className="bg-gray-600! px-40 text-white flex items-center gap-2"
        >
          <FaArrowLeftLong />
          Back
        </Button>
      )}

      {showNextButton && currentStep < 7 && (
        <Button
          onClick={handleNext}
          className="flex items-center justify-center gap-2 px-40"
        >
          {nextButtonText}
          <FaArrowRightLong />
        </Button>
      )}

      {currentStep === 7 && (
        <div className="flex items-center gap-10">
          <Button className="bg-secondary px-25">Download Resume</Button>
          <Button className="px-25">Find Your Favorite Job</Button>
        </div>
      )}
    </div>
  );
}
