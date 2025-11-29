"use client";

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateContactField, updateSocialMediaField } from "@/redux/slices/formSlice";

const FormInput: React.FC<{ 
  label: string; 
  name: string; 
  type?: string; 
  value?: string;
  onChange?: (field: string, value: string) => void;
  placeholder?: string; 
  fullWidth?: boolean 
}> = ({ 
  label, 
  name, 
  type = 'text', 
  value,
  onChange,
  placeholder,
  fullWidth = false
}) => (
  <div className={`flex flex-col ${fullWidth ? 'w-full' : 'w-full'}`}>
    <label htmlFor={name} className="text-sm font-medium text-heading mb-1">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(name, e.target.value)}
      className="w-full border font-normal text-[12px] text-secondary border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:border-gray-500"
    />
  </div>
);

const SocialMediaInput: React.FC = () => {
  const dispatch = useDispatch();
  const contactInfo = useSelector((state: RootState) => state.form.contactInfo);

  const handlePlatformChange = (platform: string) => {
    dispatch(updateSocialMediaField({ field: 'platform', value: platform }));
  };

  const handleUrlChange = (url: string) => {
    dispatch(updateSocialMediaField({ field: 'url', value: url }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Social Media Dropdown */}
      <div className="flex flex-col w-full col-span-1">
        <label htmlFor="socialMedia" className="text-sm font-medium  text-secondary-800 mb-1">
          Other Social Media
        </label>
        <div className="relative">
          <select 
            id="socialMedia" 
            name="socialMedia"
            value={contactInfo.socialMedia.platform}
            onChange={(e) => handlePlatformChange(e.target.value)}
            className="w-full border font-normal text-[12px] text-secondary border-gray-300 rounded-lg h-10 px-3 bg-white appearance-none focus:outline-none focus:ring-0"
          >
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>
            <option value="Instagram">Instagram</option>
            <option value="GitHub">GitHub</option>
          </select>
    
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none  text-secondary-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            </svg>
          </div>
        </div>
      </div>

      {/* URL Input */}
      <div className="flex flex-col w-full col-span-1 md:col-span-2">
        <label htmlFor="socialMediaUrl" className="text-sm font-medium  text-secondary-800 mb-1 ml-2">
          URL
        </label>
        <input
          type="url"
          id="socialMediaUrl"
          name="socialMediaUrl"
          value={contactInfo.socialMedia.url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="Enter other social media profiles (optional)"
          className="w-full border font-normal text-[12px] text-secondary border-gray-300 rounded-lg h-10 px-3 focus:outline-none focus:border-gray-500"
        />
      </div>
    </div>
  );
};

const ContactInformation: React.FC = () => {
  const dispatch = useDispatch();
  const contactInfo = useSelector((state: RootState) => state.form.contactInfo);

  const handleFieldChange = (field: string, value: string) => {
    dispatch(updateContactField({ field: field as keyof typeof contactInfo, value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold  text-secondary-900 mb-2">
          Your Contact Information
        </h1>
        <p className=" text-secondary-600 text-base">
          Include additional contact details and social media links to showcase your professional presence.
        </p>
      </div>

      {/* Form Section */}
      <form className="space-y-6">
        {/* LinkedIn Profile */}
        <FormInput 
          label="LinkedIn Profile" 
          name="linkedinProfile" 
          type="url"
          value={contactInfo.linkedinProfile}
          onChange={handleFieldChange}
          placeholder="Enter your LinkedIn profile URL"
          fullWidth={true}
        />

        {/* Personal Website/Portfolio */}
        <FormInput 
          label="Personal Website/Portfolio" 
          name="portfolio" 
          type="url"
          value={contactInfo.portfolio}
          onChange={handleFieldChange}
          placeholder="Enter your personal website or portfolio URL"
          fullWidth={true}
        />

        {/* Other Social Media & URL */}
        <SocialMediaInput />
      </form>
    </div>
  );
};

export default ContactInformation;