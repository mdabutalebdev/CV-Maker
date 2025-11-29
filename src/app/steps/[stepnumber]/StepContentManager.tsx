"use client";

import React from "react";
import { usePathname } from 'next/navigation';

import PersonalInformation from '@/components/PersonalInformation'; 
import CareerSummary from '@/components/CareerSummary'; 
import SkillAndExperiance from '@/components/SkillAndExperiance';
import EduceationAndCertificeation from "@/components/EduceationAndCertificeation";
import ContactInformation from "@/components/ContactInformation"; 
import AiResumeGenaration from "@/components/AiResumeGenaration";
import ReviewAndDownload from "@/components/ReviewAndDownload";

export default function StepContentManager() {
    const pathname = usePathname();

    if (!pathname) return null; // ✅ safeguard

    const totalSteps = 7;
    const pathParts = pathname.split('/');
    const stepNumberString = pathParts[pathParts.length - 1];  
    const stepId = parseInt(stepNumberString);

    if (isNaN(stepId) || stepId < 1 || stepId > totalSteps) {
        return (
            <div className="text-center p-10 bg-red-50 rounded-lg">
                <h1 className="text-3xl text-red-600 font-bold">Invalid Step Number</h1>
            </div>
        );
    }

    let CurrentFormComponent: React.FC | null = null;

    switch (stepId) {
        case 1: CurrentFormComponent = PersonalInformation; break;
        case 2: CurrentFormComponent = CareerSummary; break;
        case 3: CurrentFormComponent = SkillAndExperiance; break;
        case 4: CurrentFormComponent = EduceationAndCertificeation; break;
        case 5: CurrentFormComponent = ContactInformation; break;
        case 6: CurrentFormComponent = AiResumeGenaration; break;
        case 7: CurrentFormComponent = ReviewAndDownload; break;
    }

    if (!CurrentFormComponent) {
        return (
            <div className="text-center p-10 bg-yellow-50 rounded-lg">
                <h1 className="text-3xl text-yellow-600 font-bold">Step {stepId} Component Missing</h1>
            </div>
        );
    }

    return (
        <div className="py-8">
            <CurrentFormComponent />
        </div>
    );
}
