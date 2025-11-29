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
      // Step 1-এ Back button এ ক্লিক করলে home page-এ যাবে
      router.push("/");
    }
    resetProgress();
  };

  const handleNext = () => {
    if (currentStep < 6) {
      router.push(`/steps/${currentStep + 1}`);
    } else if (currentStep === 6) {
      console.log("Generating Resume...");
      triggerStart();
    }
  };

  // Step 6-এর জন্য আলাদা লেআউট
  if (currentStep === 6) {
    return (
      <div className="flex justify-center container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Button
          onClick={handleNext}
          className="flex items-center justify-center gap-2 px-40 bg-primary text-white"
        >
          {nextButtonText}
          <FaArrowRightLong />
        </Button>
      </div>
    );
  }

  // অন্যান্য স্টেপের জন্য সাধারণ লেআউট
  return (
    <div className="flex justify-between container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {/* Back Button - সব স্টেপেই দেখাবে (Step 1-এও) */}
      {(currentStep >= 1 && currentStep < 7) && (
        <Button
          onClick={handleBack}
          className="bg-[#9A9A9A]! px-40 text-white flex items-center gap-2"
        >
          <FaArrowLeftLong />
          {currentStep === 1 ? "Home" : "Back"}
        </Button>
      )}

      {/* Next Button */}
      {showNextButton && currentStep < 7 && (
        <Button
          onClick={handleNext}
          className="flex items-center justify-center gap-2 px-40 bg-primary text-white"
        >
          {nextButtonText}
          <FaArrowRightLong />
        </Button>
      )}

      {/* Step 7 Buttons */}
      {currentStep === 7 && (
        <div className="flex items-center gap-10 justify-center w-full">
          <Button className="bg-secondary px-25 text-white">Download Resume</Button>
          <Button className="bg-primary px-25 text-white">Find Your Favorite Job</Button>
        </div>
      )}
    </div>
  );
}