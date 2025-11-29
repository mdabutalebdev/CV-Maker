 
import React from 'react';
import Stepper from '@/components/Stepper'; 
import StepNavigation from '@/components/StepNavigation';
 

export default function StepsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 ">
        <Stepper /> 
      </header>
      
      <main className="flex-grow container mx-auto p-8 max-w-4xl">
        {children} 
      </main>
      
      <footer className="py-4  sticky bottom-0 bg-white">
        <StepNavigation />
      </footer>
    </div>
  );
}