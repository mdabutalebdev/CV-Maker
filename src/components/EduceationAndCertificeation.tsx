"use client";

import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { 
  setEducations, updateEducationField, addEducation, deleteEducation, Education,
  setCertifications, updateCertificationField, addCertification, deleteCertification, Certification 
} from "@/redux/slices/formSlice";

// Prop types for helper components
interface FormInputProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password'; 
    value?: string;
    onChange?: (field: string, value: string) => void;
    placeholder?: string;
    fullWidth?: boolean;
    index: number;
}

interface DateInputProps {
    label: string;
    name: string;
    value?: string;
    onChange?: (field: string, value: string) => void;
    placeholder?: string;
    useToggle?: boolean;
    index: number;
}

// Prop types for dynamic forms
interface EducationFormProps {
    index: number;
    education: Education;
    onDelete: () => void;
}

interface CertificationFormProps {
    index: number;
    certification: Certification;
    onDelete: () => void;
}

// Standard text input component with explicit prop types
const FormInput: React.FC<FormInputProps> = ({ 
    label, 
    name, 
    type = 'text', 
    value,
    onChange,
    placeholder, 
    fullWidth = false, 
    index 
}) => (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : 'w-full'}`}>
        <label htmlFor={`${name}-${index}`} className="text-sm font-medium text-gray-800 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={`${name}-${index}`}
            name={`${name}-${index}`}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange && onChange(name, e.target.value)}
            className="w-full border border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:border-gray-500 placeholder:text-gray-500 placeholder:font-normal placeholder:text-xs"
        />
    </div>
);

// Date input component with explicit prop types
const DateInput: React.FC<DateInputProps> = ({ 
    label, 
    name, 
    value,
    onChange,
    placeholder, 
    useToggle = false, 
    index 
}) => (
    <div className="flex flex-col w-full">
        <label htmlFor={`${name}-${index}`} className="text-sm font-medium text-secondary mb-1">
            {label}
        </label>
        <div className="relative">
            <input
                type="month"
                id={`${name}-${index}`}
                name={`${name}-${index}`}
                value={value}
                onChange={(e) => onChange && onChange(name, e.target.value)}
                placeholder={placeholder}
                className="w-full border text-[12px] font-normal text-secondary border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:border-gray-500 appearance-none placeholder:text-gray-500 placeholder:font-normal placeholder:text-xs"
            />
            {/* Calendar Icon */}
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

// File Upload Component with actual file input functionality
const FileUploadArea: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFileName(file.name);
            console.log("Selected file:", file.name);
        } else {
            setFileName(null);
        }
    }, []);

    const handleButtonClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    return (
        <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-800 mb-1">
                Achievements
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-[180px] flex flex-col items-center justify-center">
                {/* Hidden file input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"  
                />

                {fileName ? (
                    <div className="text-center">
                        <p className="text-gray-900 font-medium mb-1 truncate max-w-xs">{fileName}</p>
                        <p className="text-xs text-green-600 mb-3">File selected successfully.</p>
                        <button 
                            type="button" 
                            onClick={handleButtonClick}
                            className="text-sm text-red-500 hover:text-red-700 transition"
                        >
                            Change File
                        </button>
                    </div>
                ) : (
                    <>
                        <svg className="w-8 h-8 text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <p className="text-gray-500 mb-1">Drop file or browse</p>
                        <p className="text-xs text-gray-400 mb-3">Format: jpg, .png & Max file size: 25 MB</p>
                        <button 
                            type="button"
                            onClick={handleButtonClick}
                            className="bg-gray-100 text-gray-700 text-sm font-medium py-1.5 px-4 rounded-lg hover:bg-gray-200 transition"
                        >
                            Browse Files
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

// --- Degree Form ---
const DegreeForm: React.FC<EducationFormProps> = ({ index, education, onDelete }) => {
    const dispatch = useDispatch();

    const handleFieldChange = (field: keyof Education, value: string) => {
        dispatch(updateEducationField({ 
            id: education.id, 
            field, 
            value 
        }));
    };

    return (
        <div className="relative">
            <FormInput 
                label="Your Degree" 
                name="degree" 
                value={education.degree}
                onChange={(field, value) => handleFieldChange(field as keyof Education, value)}
                placeholder="e.g., Bachelor's, Master's"
                fullWidth={true}
                index={index}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormInput 
                    label="Institution Name" 
                    name="institution" 
                    value={education.institution}
                    onChange={(field, value) => handleFieldChange(field as keyof Education, value)}
                    placeholder="University of Example" 
                    index={index} 
                />
                <FormInput 
                    label="Major" 
                    name="description" 
                    value={education.description}
                    onChange={(field, value) => handleFieldChange(field as keyof Education, value)}
                    placeholder="e.g., Computer Science" 
                    index={index} 
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <DateInput 
                    label="Start Date" 
                    name="startDate" 
                    value={education.startDate}
                    onChange={(field, value) => handleFieldChange(field as keyof Education, value)}
                    placeholder="Select Start Date" 
                    index={index} 
                />
                <DateInput 
                    label="End Date" 
                    name="endDate" 
                    value={education.endDate}
                    onChange={(field, value) => handleFieldChange(field as keyof Education, value)}
                    placeholder="Select End Date" 
                    index={index} 
                />
            </div>

            <div className="mt-6">
                <FileUploadArea />
            </div>
        </div>
    );
};

// --- Certification Form ---
// --- Certification Form ---
const CertificationForm: React.FC<CertificationFormProps> = ({ index, certification, onDelete }) => {
    const dispatch = useDispatch();

    const handleFieldChange = (field: keyof Certification, value: string) => {
        dispatch(updateCertificationField({ 
            id: certification.id, 
            field, 
            value 
        }));
    };

    return (
        <div className="relative">
            <FormInput 
                label="Certification Title" 
                name="title" 
                value={certification.title}
                onChange={(field, value) => handleFieldChange(field as keyof Certification, value)}
                placeholder="e.g., Google Cloud Certified"
                fullWidth={true}
                index={index}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormInput 
                    label="Issuing Organization" 
                    name="organization" 
                    value={certification.organization}
                    onChange={(field, value) => handleFieldChange(field as keyof Certification, value)}
                    placeholder="e.g., Coursera, Microsoft" 
                    index={index} 
                />
                <div></div> {/* Empty div for grid alignment */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <DateInput 
                    label="Certificate Issue Date" 
                    name="issueDate" 
                    value={certification.issueDate}
                    onChange={(field, value) => handleFieldChange(field as keyof Certification, value)}
                    placeholder="Select Issue Date" 
                    index={index} 
                />
                <DateInput 
                    label="Expiry Date (if applicable)" 
                    name="expiryDate" 
                    value={certification.expiryDate}
                    onChange={(field, value) => handleFieldChange(field as keyof Certification, value)}
                    placeholder="Select Expiry Date" 
                    index={index} 
                />
            </div>

            {/* File Upload Area REMOVED from Certification */}
        </div>
    );
};

// --- Education Content View ---
const EducationContent: React.FC<{ toggle: () => void }> = ({ toggle }) => {
    const dispatch = useDispatch();
    const educations = useSelector((state: RootState) => state.form.educations);

    const addDegree = useCallback(() => {
        dispatch(addEducation());
    }, [dispatch]);

    const deleteDegree = useCallback((idToDelete: number) => {
        if (educations.length > 1) {
            dispatch(deleteEducation(idToDelete));
        }
    }, [educations.length, dispatch]);

    return (
        <>
            {/* Heading and Button */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-heading mb-2">
                        Your Educational Background
                    </h1>
                    <p className="text-secondary font-normal text-base">
                        Provide your academic qualifications and any relevant certifications to strengthen your resume.
                    </p>
                </div>
                
                {/* Certification Button - Retaining user's design classes */}
                <button 
                    type="button"
                    onClick={toggle} 
                    className="bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition self-start shadow-md"
                >
                    Certifications
                </button>
            </div>

            {/* Form Section */}
            <div className="space-y-6">
                {educations.map((education, index) => (
                    <DegreeForm 
                        key={education.id} 
                        index={index} 
                        education={education}
                        onDelete={() => deleteDegree(education.id)}
                    />
                ))}
                
                {/* Add Another Degree Button - Retaining user's design classes */}
                <div className="pt-4">
                    <button 
                        type="button" 
                        onClick={addDegree}
                        className="flex items-center text-green-600 text-base font-medium hover:text-green-700 transition"
                    >
                        <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Another Degree
                    </button>
                </div>
            </div>
        </>
    );
};

// --- Certification Content View ---
const CertificationContent: React.FC<{ toggle: () => void }> = ({ toggle }) => {
    const dispatch = useDispatch();
    const certifications = useSelector((state: RootState) => state.form.certifications);

    const addCert = useCallback(() => {
        dispatch(addCertification());
    }, [dispatch]);

    const deleteCert = useCallback((idToDelete: number) => {
        if (certifications.length > 1) {
            dispatch(deleteCertification(idToDelete));
        }
    }, [certifications.length, dispatch]);

    return (
        <>
            {/* Heading and Button */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-heading mb-2">
                        Your Certifications
                    </h1>
                    <p className="text-secondary font-normal text-base">
                        List any professional certifications you have acquired to boost your credentials.
                    </p>
                </div>
                
                {/* Education Button - Retaining user's design classes */}
                <button 
                    type="button"
                    onClick={toggle} 
                    className="bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition self-start shadow-md"
                >
                    Education
                </button>
            </div>

            {/* Form Section */}
            <div className="space-y-6">
                {certifications.map((certification, index) => (
                    <CertificationForm 
                        key={certification.id} 
                        index={index} 
                        certification={certification}
                        onDelete={() => deleteCert(certification.id)}
                    />
                ))}
                
                {/* Add Another Certification Button - Retaining user's design classes */}
                <div className="pt-4">
                    <button 
                        type="button" 
                        onClick={addCert}
                        className="flex items-center text-green-600 text-base font-medium hover:text-green-700 transition"
                    >
                        <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Another Certification
                    </button>
                </div>
            </div>
        </>
    );
};

const EducationAndCertificationForm: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'education' | 'certification'>('education');

    const toggleTab = useCallback(() => {
        setActiveTab(prev => prev === 'education' ? 'certification' : 'education');
    }, []);

    return (
        <div className="min-h-screen flex justify-center items-start">
            <div className="max-w-4xl w-full bg-white rounded-xl p-6 md:p-10">
                {activeTab === 'education' ? (
                    <EducationContent toggle={toggleTab} />
                ) : (
                    <CertificationContent toggle={toggleTab} />
                )}
            </div>
        </div>
    );
};

export default EducationAndCertificationForm;