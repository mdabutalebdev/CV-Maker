"use client";

import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ReviewAndDownload: React.FC = () => {
  const formData = useSelector((state: RootState) => state.form);

  // Safe check for skills array
  const hasSkills = Array.isArray(formData.skills) && formData.skills.some(skill => 
    skill && skill.items && Array.isArray(skill.items) && skill.items.length > 0
  );

  // Get job title - priority: careerInfo.jobTitle > experiences[0].jobTitle > default
  const getJobTitle = () => {
    if (formData.careerInfo.jobTitle) {
      return formData.careerInfo.jobTitle;
    }
    if (formData.experiences.length > 0 && formData.experiences[0].jobTitle) {
      return formData.experiences[0].jobTitle;
    }
    return "UX/UI Designer";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-heading mb-2">
          Review Your AI-Generated Resume
        </h1>
        <p className="text-secondary font-normal text-[14px]">
          Take a moment to review your resume. You can make changes and regenerate if needed. When youre ready, download it and start applying!
        </p>
      </div>

      {/* Modern Resume Design */}
      <div className="bg-white border border-gray-300 p-8 font-sans">
        
        {/* Header Section */}
        <div className="border-b-2 border-gray-800 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {formData.personalInfo.firstName} {formData.personalInfo.lastName}
          </h1>
          <p className="text-lg text-secondary mb-4">
            {getJobTitle()}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-secondary">
            <div className="flex items-center">
              <span className="mr-1">📱</span>
              {formData.personalInfo.phoneNumber}
            </div>
            <div className="flex items-center">
              <span className="mr-1">✉️</span>
              {formData.personalInfo.emailAddress}
            </div>
            {(formData.contactInfo.linkedinProfile || formData.contactInfo.portfolio) && (
              <>
                {formData.contactInfo.linkedinProfile && (
                  <a href={formData.contactInfo.linkedinProfile} className="text-blue-600 hover:underline flex items-center">
                    <span className="mr-1">💼</span>
                    LinkedIn
                  </a>
                )}
                {formData.contactInfo.portfolio && (
                  <a href={formData.contactInfo.portfolio} className="text-blue-600 hover:underline flex items-center">
                    <span className="mr-1">🌐</span>
                    Portfolio
                  </a>
                )}
              </>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {formData.careerInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              ABOUT ME
            </h2>
            <p className="text-gray-700 leading-relaxed">{formData.careerInfo.summary}</p>
          </div>
        )}

        {/* Skills Section - Modern Pill Design */}
        {hasSkills && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-3">
              {formData.skills.map((skillCategory, index) => (
                skillCategory && skillCategory.items && Array.isArray(skillCategory.items) && 
                skillCategory.items.map((skill, idx) => (
                  skill && (
                    <span 
                      key={`${index}-${idx}`} 
                      className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm border border-gray-200"
                    >
                      {skill}
                    </span>
                  )
                ))
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {formData.experiences.length > 0 && formData.experiences[0].jobTitle && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-6">
              {formData.experiences.map((exp, index) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-gray-300">
                  <div className="absolute -left-1.5 top-2 w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{exp.jobTitle}</h3>
                    <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium text-sm mb-2">{exp.companyName}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{exp.description}</p>
                  {exp.skills && Array.isArray(exp.skills) && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.skills.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {formData.educations.length > 0 && formData.educations[0].degree && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {formData.educations.map((edu, index) => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-gray-300">
                  <div className="absolute -left-1.5 top-2 w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-gray-500 text-sm">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-gray-700 text-sm mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {formData.certifications.length > 0 && formData.certifications[0].title && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              TRAINING & CERTIFICATION
            </h2>
            <div className="space-y-4">
              {formData.certifications.map((cert, index) => (
                <div key={cert.id} className="relative pl-6 border-l-2 border-gray-300">
                  <div className="absolute -left-1.5 top-2 w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <h3 className="font-bold text-gray-900">{cert.title}</h3>
                    <span className="text-gray-500 text-sm">{cert.issueDate}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{cert.organization}</p>
                  {cert.expiryDate && (
                    <p className="text-gray-500 text-xs mt-1">Expires: {cert.expiryDate}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Co-curricular Activities */}
        {(formData.contactInfo.socialMedia.url) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              CO-CURRICULAR ACTIVITIES
            </h2>
            <div className="flex flex-wrap gap-4 text-sm">
              {formData.contactInfo.socialMedia.url && (
                <div className="flex items-center">
                  <span className="mr-2"></span>
                  <span>{formData.contactInfo.socialMedia.platform}</span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ReviewAndDownload;