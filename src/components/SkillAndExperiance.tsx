"use client";

import React, { useState, useRef, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setExperiences, updateExperienceField, addExperience, Experience } from "@/redux/slices/formSlice";

const FormInput: React.FC<{ 
  label: string; 
  name: string; 
  type?: string; 
  value?: string;
  onChange?: (field: string, value: string) => void;
  placeholder?: string; 
}> = ({ 
  label, 
  name, 
  type = 'text', 
  value,
  onChange,
  placeholder 
}) => (
  <div className="flex flex-col w-full">
    <label htmlFor={name} className="text-sm font-medium text-gray-800 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(name, e.target.value)}
      className="w-full border border-gray-300 font-normal text-secondary rounded-lg h-10 px-3 focus:outline-none focus:border-gray-500 text-[12px]"
    />
  </div>
);

const DateInput: React.FC<{ 
  label: string; 
  name: string; 
  value?: string;
  onChange?: (field: string, value: string) => void;
}> = ({ label, name, value, onChange }) => (
  <div className="flex flex-col w-full">
    <label htmlFor={name} className="text-sm font-medium text-gray-800 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type="month"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange && onChange(name, e.target.value)}
        className="w-full border border-gray-300 font-normal text-secondary rounded-lg h-10 px-3 focus:outline-none focus:border-gray-500 appearance-none text-[12px]" 
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6.5 7a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2z"/>
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path d="M4.5 3.5a.5.5 0 0 0 0-1H2v1h.5a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1H14V2H4.5a.5.5 0 0 0 0 1z"/>
        </svg>
      </div>
    </div>
  </div>
);

const TextArea: React.FC<{ 
  label: string; 
  name: string; 
  value?: string;
  onChange?: (field: string, value: string) => void;
  placeholder?: string;
}> = ({ label, name, value, onChange, placeholder }) => (
  <div className="flex flex-col w-full">
    <label htmlFor={name} className="text-sm font-medium text-gray-800 mb-1">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      rows={4}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(name, e.target.value)}
      className="w-full border border-gray-300 font-normal text-secondary rounded-lg p-3 resize-none focus:outline-none focus:border-gray-500 text-[12px]"
    ></textarea>
  </div>
);

const SkillTag: React.FC<{ children: React.ReactNode; onRemove: () => void }> = ({ children, onRemove }) => (
    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full mr-2 mb-1 flex items-center">
      {children}
      <button 
        type="button" 
        onClick={onRemove} 
        className="ml-2  hover:text-gray-900 focus:outline-none text-[12px] font-normal text-secondary"
        aria-label={`Remove skill ${children}`}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </span>
);

interface ExperienceFormSectionProps {
    experience: Experience;
}

const ExperienceFormSection: React.FC<ExperienceFormSectionProps> = ({ 
    experience
}) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFieldChange = (field: keyof Experience, value: string | string[]) => {
        dispatch(updateExperienceField({ 
            id: experience.id, 
            field, 
            value 
        }));
    };

    const handleBrowseFiles = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const fileArray = Array.from(files);
            dispatch(updateExperienceField({ 
                id: experience.id, 
                field: "achievements", 
                value: fileArray 
            }));
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const newSkill = event.currentTarget.value.trim();
            if (newSkill && !experience.skills.includes(newSkill)) {
                const updatedSkills = [...experience.skills, newSkill];
                handleFieldChange("skills", updatedSkills);
                event.currentTarget.value = '';
            }
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        const updatedSkills = experience.skills.filter(skill => skill !== skillToRemove);
        handleFieldChange("skills", updatedSkills);
    };

    return (
        <div className="space-y-6 border-b border-gray-200 pb-6 mb-6">
            
            {/* Job Title */}
            <FormInput 
                label="Job Title" 
                name="jobTitle" 
                value={experience.jobTitle}
                onChange={(field, value) => handleFieldChange(field as keyof Experience, value)}
                placeholder="Mid-Level UI/UX Designer"
            />

            {/* Company Name */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <FormInput 
                    label="Company Name" 
                    name="companyName" 
                    value={experience.companyName}
                    onChange={(field, value) => handleFieldChange(field as keyof Experience, value)}
                    placeholder="SM Technology (betopia Group)"
                />
            </div>

            {/* Duration: Start Date & End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DateInput 
                    label="Start Date" 
                    name="startDate" 
                    value={experience.startDate}
                    onChange={(field, value) => handleFieldChange(field as keyof Experience, value)}
                />
                <DateInput 
                    label="End Date" 
                    name="endDate" 
                    value={experience.endDate}
                    onChange={(field, value) => handleFieldChange(field as keyof Experience, value)}
                />
            </div>

            {/* Job Description/Responsibilities */}
            <TextArea 
                label="Job Description/Responsibilities" 
                name="description" 
                value={experience.description}
                onChange={(field, value) => handleFieldChange(field as keyof Experience, value)}
                placeholder="An experienced marketing professional with over 5 years of expertise in digital marketing, specializing in SEO, social media strategies, and content creation."
            />

            {/* Achievements & Skills (Two Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                
                {/* Achievements (File Upload) */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-medium text-gray-800 mb-1">
                        Achievements
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-full flex flex-col items-center justify-center">
                        <p className="text-gray-500 mb-2">Drop file or browse</p>
                        <p className="text-xs text-gray-400 mb-3">Format: jpg, .png & Max file size: 25 MB</p>
                        
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange}
                            accept=".jpg,.png" 
                            style={{ display: 'none' }} 
                        />
                        
                        <button 
                            type="button"
                            onClick={handleBrowseFiles} 
                            className="bg-gray-100 text-gray-700 text-sm font-medium py-1.5 px-4 rounded-lg hover:bg-gray-200 transition"
                        >
                            Browse Files
                        </button>
                    </div>
                </div>

                {/* Skills */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-medium text-gray-800 mb-1">
                        Skills
                    </label>
                    <div className="w-full border border-gray-300 rounded-lg p-3 min-h-[100px] focus-within:border-gray-500 flex flex-wrap items-start content-start">
                        
                        {experience.skills.map((skill) => (
                            <SkillTag key={skill} onRemove={() => handleRemoveSkill(skill)}>
                                {skill}
                            </SkillTag>
                        ))}
                        
                        <input 
                            type="text" 
                            placeholder="Type skill and press Enter" 
                            onKeyDown={handleKeyDown} 
                            className="flex-1 min-w-[50px] text-[12px] font-normal text-secondary focus:outline-none h-auto py-0.5" 
                        />
                    </div>
                </div>
            </div>

        </div> 
    );
};

const SkillAndExperiance: React.FC = () => {
    const dispatch = useDispatch();
    const experiences = useSelector((state: RootState) => state.form.experiences);

    const handleSkip = () => {
        console.log("Skipping to the next step...");
    };

    const handleAddExperience = () => {
        // এখন কিছুই করবে না - শুধু ১টা experience থাকবে
        console.log("Only one experience is allowed");
    };

    return (
        <div className="max-w-4xl mx-auto">
            
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-4xl font-bold text-heading mb-2">
                    Your Work Experience & Skills
                </h1>
                <button 
                    onClick={handleSkip} 
                    className="flex items-center text-sm font-medium text-gray-600 bg-gray-50 py-1 px-3 rounded-full hover:bg-gray-100"
                >
                    Skip 
                    <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <p className="text-secondary text-base font-normal pb-4">
                Highlight your work experience and skills. The more detail you provide, the better the AI can tailor your resume to match job opportunities.
            </p>

            {/* শুধু প্রথম experience টা show করবে */}
            {experiences.slice(0, 1).map((experience) => (
                <ExperienceFormSection 
                    key={experience.id}
                    experience={experience}
                />
            ))}

            {/* "Add Another Work Experience" বাটন hide করেছি */}
            <div className="pt-6">
                <button 
                    onClick={handleAddExperience}
                    className="flex items-center text-green-600 text-base font-medium hover:text-green-700"
                >
                    <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Another Work Experience
                </button>
            </div>

        </div>
    );
};

export default SkillAndExperiance;