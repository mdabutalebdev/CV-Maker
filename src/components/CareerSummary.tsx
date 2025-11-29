"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCareerInfo } from "@/redux/slices/formSlice";

const jobTitles = [
  "Software Developer",
  "Data Analyst",
  "UX/UI Designer",
  "Marketing Manager",
  "Financial Analyst",
  "Product Manager",
  "DevOps Engineer",
  "Customer Support Specialist"
];

const JobTitleDropdown: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <div className="flex flex-col w-full">
    <label htmlFor="jobTitleDropdown" className="text-sm font-medium text-heading mb-1">
      Job Title
    </label>
    <div className="relative">
      <select
        id="jobTitleDropdown"
        name="jobTitleDropdown"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border text-secondary text-[12px] border-gray-300 rounded-lg h-10 px-3 bg-white appearance-none focus:outline-none focus:ring-0"
      >
        <option value="" disabled>
          Enter your most recent or current job title
        </option>
        {jobTitles.map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
        </svg>
      </div>
    </div>
  </div>
);

const CareerSummaryTextarea: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <div className="flex flex-col w-full">
    <label htmlFor="careerSummary" className="text-sm font-medium text-heading mb-1">
      Career Summary
    </label>
    <textarea
      id="careerSummary"
      name="careerSummary"
      rows={5}
      value={value || ""}
      placeholder="Write a brief summary highlighting your experience, skills, and career goals..."
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 text-secondary rounded-lg p-3 resize-none focus:outline-none focus:border-gray-200 text-[12px] font-normal"
    />
  </div>
);

const CareerSummary: React.FC = () => {
  const dispatch = useDispatch();
  const careerInfo = useSelector((state: RootState) => state.form.careerInfo);

  const handleJobTitleChange = (value: string) => {
    dispatch(setCareerInfo({ jobTitle: value }));
  };

  const handleCareerSummaryChange = (value: string) => {
    dispatch(setCareerInfo({ summary: value }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-heading mb-2">Your Career Overview</h1>
        <p className="text-secondary text-base font-normal">
          A strong career summary will make a lasting impression on recruiters. Lets create a summary that highlights your experience and goals.
        </p>
      </div>

      <form className="space-y-6">
        <JobTitleDropdown value={careerInfo.jobTitle || ""} onChange={handleJobTitleChange} />
        <CareerSummaryTextarea value={careerInfo.summary || ""} onChange={handleCareerSummaryChange} />
      </form>
    </div>
  );
};

export default CareerSummary;
