import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// --- Contact Info Interface ---
export interface ContactInfo {
  linkedinProfile: string;
  portfolio: string;
  socialMedia: {
    platform: string;
    url: string;
  };
}

// --- Certification Interface ---
export interface Certification {
  id: number;
  title: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
}

// --- Education Interface ---
export interface Education {
  id: number;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

// --- Skill Interface ---
export interface Skill {
  category: string;
  items: string[];
}

// --- Project Interface ---
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

// --- Experience Interface ---
export interface Experience {
  id: number;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
  achievements: string[]; // Changed from File[] to string[]
}

// --- Career Info Interface ---
export interface CareerInfo {
  jobTitle: string;
  summary: string;
}

// --- Personal Info Interface ---
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  countryRegion: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

// --- Form State Interface ---
export interface FormState {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  careerInfo: CareerInfo;
  educations: Education[];
  certifications: Certification[];
  skills: Skill[];
  projects: Project[];
  contactInfo: ContactInfo;
}

// --- Initial State ---
const initialState: FormState = {
  personalInfo: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    countryRegion: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  },
  experiences: [
    {
      id: 1,
      jobTitle: "Mid-Level UI/UX Designer",
      companyName: "SM Technology (betopia Group)",
      startDate: "",
      endDate: "",
      description:
        "An experienced marketing professional with over 5 years of expertise in digital marketing, specializing in SEO, social media strategies, and content creation.",
      skills: ["UI Designer", "UX Designer", "Figma"],
      achievements: [] // Now string array instead of File[]
    }
  ],
  careerInfo: {
    jobTitle: "",
    summary: ""
  },
  educations: [
    {
      id: 1,
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  ],
  certifications: [
    {
      id: 1,
      title: "",
      organization: "",
      issueDate: "",
      expiryDate: ""
    }
  ],
  skills: [
    {
      category: "Technical Skills",
      items: []
    },
    {
      category: "Soft Skills", 
      items: []
    },
    {
      category: "Languages",
      items: []
    },
    {
      category: "Tools & Technologies",
      items: []
    }
  ],
  projects: [
    {
      id: 1,
      title: "",
      description: "",
      technologies: [],
      link: ""
    }
  ],
  contactInfo: {
    linkedinProfile: "",
    portfolio: "",
    socialMedia: {
      platform: "Facebook",
      url: ""
    }
  }
};

// --- Slice ---
export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Personal Info
    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },

    // Contact Info
    setContactInfo: (state, action: PayloadAction<Partial<ContactInfo>>) => {
      state.contactInfo = { ...state.contactInfo, ...action.payload };
    },
    updateContactField: (
      state,
      action: PayloadAction<{
        field: keyof ContactInfo;
        value: string;
      }>
    ) => {
      const { field, value } = action.payload;
      (state.contactInfo[field] as string) = value;
    },
    updateSocialMediaField: (
      state,
      action: PayloadAction<{
        field: keyof ContactInfo['socialMedia'];
        value: string;
      }>
    ) => {
      const { field, value } = action.payload;
      (state.contactInfo.socialMedia[field] as string) = value;
    },

    // Experiences
    setExperiences: (state, action: PayloadAction<Experience[]>) => {
      state.experiences = action.payload;
    },
    updateExperienceField: (
      state,
      action: PayloadAction<{
        id: number;
        field: keyof Experience;
        value: string | string[];
      }>
    ) => {
      const exp = state.experiences.find(e => e.id === action.payload.id);
      if (!exp) return;

      const { field, value } = action.payload;
      if (field === "skills" && Array.isArray(value)) {
        exp.skills = value as string[];
      } else if (field === "achievements" && Array.isArray(value)) {
        exp.achievements = value as string[]; // Now string array
      } else {
        (exp[field] as string) = value as string;
      }
    },
    addExperience: (state) => {
      const newId =
        state.experiences.length > 0
          ? Math.max(...state.experiences.map(e => e.id)) + 1
          : 1;
      state.experiences.push({
        id: newId,
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        description: "",
        skills: [],
        achievements: [] // Now string array
      });
    },

    // Career Info
    setCareerInfo: (state, action: PayloadAction<Partial<CareerInfo>>) => {
      state.careerInfo = { ...state.careerInfo, ...action.payload };
    },

    // Educations
    setEducations: (state, action: PayloadAction<Education[]>) => {
      state.educations = action.payload;
    },
    updateEducationField: (
      state,
      action: PayloadAction<{
        id: number;
        field: keyof Education;
        value: string;
      }>
    ) => {
      const edu = state.educations.find(e => e.id === action.payload.id);
      if (edu) {
        (edu[action.payload.field] as string) = action.payload.value;
      }
    },
    addEducation: (state) => {
      const newId =
        state.educations.length > 0
          ? Math.max(...state.educations.map(e => e.id)) + 1
          : 1;
      state.educations.push({
        id: newId,
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        description: ""
      });
    },

    // Certifications
    setCertifications: (state, action: PayloadAction<Certification[]>) => {
      state.certifications = action.payload;
    },
    updateCertificationField: (
      state,
      action: PayloadAction<{
        id: number;
        field: keyof Certification;
        value: string;
      }>
    ) => {
      const cert = state.certifications.find(c => c.id === action.payload.id);
      if (cert) {
        (cert[action.payload.field] as string) = action.payload.value;
      }
    },
    addCertification: (state) => {
      const newId =
        state.certifications.length > 0
          ? Math.max(...state.certifications.map(c => c.id)) + 1
          : 1;
      state.certifications.push({
        id: newId,
        title: "",
        organization: "",
        issueDate: "",
        expiryDate: ""
      });
    },

    // Skills
    setSkills: (state, action: PayloadAction<Skill[]>) => {
      state.skills = action.payload;
    },
    updateSkillCategory: (
      state,
      action: PayloadAction<{
        category: string;
        items: string[];
      }>
    ) => {
      const skillCategory = state.skills.find(s => s.category === action.payload.category);
      if (skillCategory) {
        skillCategory.items = action.payload.items;
      }
    },
    addSkillToCategory: (
      state,
      action: PayloadAction<{
        category: string;
        skill: string;
      }>
    ) => {
      const skillCategory = state.skills.find(s => s.category === action.payload.category);
      if (skillCategory && !skillCategory.items.includes(action.payload.skill)) {
        skillCategory.items.push(action.payload.skill);
      }
    },
    removeSkillFromCategory: (
      state,
      action: PayloadAction<{
        category: string;
        skill: string;
      }>
    ) => {
      const skillCategory = state.skills.find(s => s.category === action.payload.category);
      if (skillCategory) {
        skillCategory.items = skillCategory.items.filter(item => item !== action.payload.skill);
      }
    },

    // Projects
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    updateProjectField: (
      state,
      action: PayloadAction<{
        id: number;
        field: keyof Project;
        value: string | string[];
      }>
    ) => {
      const project = state.projects.find(p => p.id === action.payload.id);
      if (project) {
        if (action.payload.field === "technologies" && Array.isArray(action.payload.value)) {
          project.technologies = action.payload.value as string[];
        } else {
          (project[action.payload.field] as string) = action.payload.value as string;
        }
      }
    },
    addProject: (state) => {
      const newId =
        state.projects.length > 0
          ? Math.max(...state.projects.map(p => p.id)) + 1
          : 1;
      state.projects.push({
        id: newId,
        title: "",
        description: "",
        technologies: [],
        link: ""
      });
    },

    // Delete actions for all sections
    deleteEducation: (state, action: PayloadAction<number>) => {
      if (state.educations.length > 1) {
        state.educations = state.educations.filter(edu => edu.id !== action.payload);
      }
    },
    deleteCertification: (state, action: PayloadAction<number>) => {
      if (state.certifications.length > 1) {
        state.certifications = state.certifications.filter(cert => cert.id !== action.payload);
      }
    },
    deleteExperience: (state, action: PayloadAction<number>) => {
      if (state.experiences.length > 1) {
        state.experiences = state.experiences.filter(exp => exp.id !== action.payload);
      }
    },
    deleteProject: (state, action: PayloadAction<number>) => {
      if (state.projects.length > 1) {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      }
    },

    // Clean up non-serializable values
    cleanupFormState: (state) => {
      // Clean up experiences achievements
      state.experiences = state.experiences.map(exp => ({
        ...exp,
        achievements: Array.isArray(exp.achievements) 
          ? exp.achievements.filter(achievement => 
              achievement !== null && 
              achievement !== undefined && 
              !(typeof achievement === 'object' && Object.keys(achievement).length === 0)
            )
          : []
      }));
    }
  }
});

// --- Exports ---
export const {
  setPersonalInfo,
  setContactInfo,
  updateContactField,
  updateSocialMediaField,
  setExperiences,
  updateExperienceField,
  addExperience,
  deleteExperience,
  setCareerInfo,
  setEducations,
  updateEducationField,
  addEducation,
  deleteEducation,
  setCertifications,
  updateCertificationField,
  addCertification,
  deleteCertification,
  setSkills,
  updateSkillCategory,
  addSkillToCategory,
  removeSkillFromCategory,
  setProjects,
  updateProjectField,
  addProject,
  deleteProject,
  cleanupFormState
} = formSlice.actions;

export default formSlice.reducer;