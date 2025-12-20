'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Step = {
  id: number;
  name: string;
};

const steps: Step[] = [
  { id: 1, name: 'Personal Information' },
  { id: 2, name: 'Career Summary' },
  { id: 3, name: 'Skills & Experience' },
  { id: 4, name: 'Education & Certifications' },
  { id: 5, name: 'Contact Information' },
  { id: 6, name: 'AI Resume Generation' },
  { id: 7, name: 'Review & Download' },
];

export default function Stepper() {
  const pathname = usePathname();
  const router = useRouter();

  const currentStepId: number = Number(pathname.split('/').pop()) || 1;

  const goToStep = (stepId: number): void => {
    router.push(`/steps/${stepId}`);
  };

  const StepContent = ({ step }: { step: Step }) => {
    const isActive = step.id === currentStepId;
    const isCompleted = step.id < currentStepId;

    return (
      <div
        onClick={() => goToStep(step.id)}
        className="group flex flex-col items-center cursor-pointer"
      >
        <span
          className={`flex items-center justify-center h-8 w-8 rounded-full transition
            ${
              isActive
                ? 'bg-primary'
                : isCompleted
                ? 'bg-primary'
                : 'border-2 border-gray-300'
            }`}
        >
          <span
            className={`text-sm font-medium ${
              isActive || isCompleted ? 'text-white' : 'text-secondary'
            }`}
          >
            {step.id}
          </span>
        </span>

        <span
          className={`mt-2 w-20 text-center text-xs font-medium transition
            ${isActive ? 'text-primary' : 'text-secondary group-hover:text-primary'}`}
        >
          {step.name}
        </span>
      </div>
    );
  };

  return (
    <nav
      aria-label="Progress"
      className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
    >
      {/* 🔹 Mobile Slider */}
      <div className="block md:hidden">
        <Swiper
          slidesPerView={3}
          spaceBetween={12}
          centeredSlides
          initialSlide={currentStepId - 1}
        >
          {steps.map((step) => (
            <SwiperSlide key={step.id}>
              <StepContent step={step} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🔹 Desktop (UNCHANGED DESIGN) */}
      <ol
        role="list"
        className="hidden md:flex items-center justify-between text-center"
      >
        {steps.map((step, index) => (
          <li key={step.id} className="relative flex-1">
            <StepContent step={step} />

            {index !== steps.length - 1 && (
              <div
                className={`absolute top-4 left-[calc(50%+1rem)] right-[calc(-50%+1rem)] h-0.5 z-[-1]
                  ${step.id < currentStepId ? 'bg-primary' : 'bg-gray-300'}`}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
