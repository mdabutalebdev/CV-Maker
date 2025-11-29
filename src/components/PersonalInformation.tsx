"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setPersonalInfo, PersonalInfo } from "@/redux/slices/formSlice";

const countries = [
  "Bangladesh", "United States", "Canada", "United Kingdom",
  "Australia", "Germany", "France", "Japan", "India"
];

const FormInput: React.FC<{
  label: string;
  name: keyof PersonalInfo;
  type?: string;
  value: string;
  onChange: (name: keyof PersonalInfo, value: string) => void;
  placeholder?: string;
  isDropdown?: boolean;
}> = ({ label, name, type = "text", value, onChange, placeholder, isDropdown = false }) => (
  <div className="flex flex-col w-full">
    <label htmlFor={name} className="text-sm font-medium text-heading mb-1">{label}</label>
    {isDropdown ? (
      <select
        id={name}
        name={name}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full border text-secondary text-[12px] border-gray-300 rounded-lg h-10 px-3 bg-white focus:outline-none"
      >
        {countries.map((country) => <option key={country} value={country}>{country}</option>)}
      </select>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full border border-gray-300 rounded-lg h-10 px-3 text-[12px] focus:outline-none"
      />
    )}
  </div>
);

const PersonalInformation: React.FC = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state: RootState) => state.form.personalInfo);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    dispatch(setPersonalInfo({ ...personalInfo, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-heading mb-2">Tell Us About Yourself</h1>
      <p className="text-secondary text-base font-normal mb-6">
        Fill in your personal details so we can tailor your resume perfectly to your career goals.
      </p>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="First Name" name="firstName" value={personalInfo.firstName} placeholder="Saifur" onChange={handleChange} />
          <FormInput label="Last Name" name="lastName" value={personalInfo.lastName} placeholder="Rahman" onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Phone Number" name="phoneNumber" value={personalInfo.phoneNumber} type="tel" placeholder="+880 1567808747" onChange={handleChange} />
          <FormInput label="Email Address" name="emailAddress" value={personalInfo.emailAddress} type="email" placeholder="ux.saifur.info@gmail.com" onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Country/Region" name="countryRegion" value={personalInfo.countryRegion} isDropdown onChange={handleChange} />
          <FormInput label="Address" name="address" value={personalInfo.address} placeholder="Section-06, Mirpur, Dhaka." onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput label="City" name="city" value={personalInfo.city} placeholder="Dhaka" onChange={handleChange} />
          <FormInput label="State" name="state" value={personalInfo.state} placeholder="Dhaka" onChange={handleChange} />
          <FormInput label="ZIP Code" name="zipCode" value={personalInfo.zipCode} placeholder="1216" onChange={handleChange} />
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
