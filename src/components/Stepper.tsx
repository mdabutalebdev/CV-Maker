 
'use client'; 

import React from 'react'; 
import { usePathname, useRouter } from 'next/navigation';

const steps = [
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
  const currentStepId = parseInt(pathname.split('/').pop() || '1'); 

  const goToStep = (stepId: number) => {
    router.push(`/steps/${stepId}`);
  };

  return (
    <nav aria-label="Progress" className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <ol role="list" className="flex items-center justify-between text-center">
        {steps.map((step, index) => (
          <li key={step.id} className="relative flex-1">
        
            {step.id < currentStepId && ( 
              <div onClick={() => goToStep(step.id)} className="group flex flex-col items-center cursor-pointer">
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary group-hover:bg-primary/80 transition">
                  <span className="text-sm font-medium text-white" aria-hidden="true">
                     {step.id}
                   </span>
                </span>
             
                <span className="mt-2 w-20 text-center text-xs font-medium text-secondary group-hover:text-primary transition"> 
                  {step.name}
                </span>
              </div>
            )}
            
      
            {step.id === currentStepId && ( 
              <div className="flex flex-col items-center" aria-current="step">
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary transition"> 
                  <span className="text-sm font-medium text-white" aria-hidden="true">
                    {step.id}
                  </span>
                </span>
        
                <span className="mt-2 w-20 text-center text-xs font-medium text-primary">
                  {step.name}
                </span>
              </div>
            )}
            
    
            {step.id > currentStepId && ( 
              <div onClick={() => goToStep(step.id)} className="group flex flex-col items-center cursor-pointer">
                <span className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-gray-300 group-hover:border-gray-400 transition">
                  <span className="text-sm font-medium text-secondary group-hover: text-secondary-600">
                    {step.id}
                  </span>
                </span>
        
                <span className="mt-2 w-20 text-center text-xs font-medium text-secondary group-hover: text-secondary-600 transition">
                  {step.name}
                </span>
              </div>
            )}
 
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