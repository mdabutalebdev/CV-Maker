"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "./shared/Button";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useProgressStore } from "@/store/progressStore";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function StepNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const currentStep = parseInt(pathname.split("/").pop() || "1");
  const formData = useSelector((state: RootState) => state.form);

  const triggerStart = useProgressStore((state) => state.triggerStart);
  const resetProgress = useProgressStore((state) => state.resetProgress);

  let nextButtonText = "Next";
  let showNextButton = true;

  if (currentStep === 6) {
    nextButtonText = "Generate Resume";
  } else if (currentStep === 7) {
    showNextButton = false;
  }

  const handleBack = () => {
    if (currentStep > 1) {
      router.push(`/steps/${currentStep - 1}`);
    } else if (currentStep === 1) {
      router.push("/");
    }
    resetProgress();
  };

  const handleNext = () => {
    if (currentStep < 6) {
      router.push(`/steps/${currentStep + 1}`);
    } else if (currentStep === 6) {
      console.log("Generating Resume...");
      triggerStart();
    }
  };

const handleDownloadPDF = async () => {
  try {
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;

    // Target the resume content specifically
    const targetElement = document.getElementById('resume-content') || 
                         document.querySelector('.bg-white.border.border-gray-300') ||
                         document.querySelector('.max-w-4xl.mx-auto > div:last-child');
    
    if (!targetElement) {
      alert('Resume content not found. Please try again.');
      return;
    }

    // Show loading
    const downloadButton = document.querySelector('.bg-secondary');
    const originalText = downloadButton?.textContent;
    if (downloadButton) {
      downloadButton.textContent = 'Generating PDF...';
      (downloadButton as HTMLButtonElement).disabled = true;
    }

    // Use html2canvas with options that ignore unsupported CSS
    const canvas = await html2canvas(targetElement as HTMLElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      ignoreElements: (element) => {
        // Ignore elements that might cause issues
        return false;
      },
      onclone: (clonedDoc) => {
        // Remove any problematic styles from the cloned document
        const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
        styles.forEach(style => style.remove());
        
        // Add basic styles for PDF
        const style = clonedDoc.createElement('style');
        style.textContent = `
          * {
            color: #000000 !important;
            background-color: #ffffff !important;
            border-color: #cccccc !important;
          }
          .bg-gray-100, .bg-blue-50, .bg-gray-50 {
            background-color: #f8f8f8 !important;
          }
          .text-blue-600, .text-primary {
            color: #0000ff !important;
          }
          .text-gray-500, .text-gray-600, .text-gray-700, .text-secondary {
            color: #666666 !important;
          }
          .border-gray-200, .border-gray-300, .border-blue-200 {
            border-color: #cccccc !important;
          }
        `;
        clonedDoc.head.appendChild(style);
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    const pdfImgHeight = pdfWidth / ratio;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfImgHeight);

    // Download PDF
    pdf.save(`${formData.personalInfo.firstName}_${formData.personalInfo.lastName}_Resume.pdf`);

    // Restore button
    if (downloadButton && originalText) {
      downloadButton.textContent = originalText;
      (downloadButton as HTMLButtonElement).disabled = false;
    }

  } catch (error) {
    console.error('PDF Generation Error:', error);
    
    // Restore button
    const downloadButton = document.querySelector('.bg-secondary');
    if (downloadButton) {
      downloadButton.textContent = 'Download Resume PDF';
      (downloadButton as HTMLButtonElement).disabled = false;
    }
    
    alert('PDF generation failed. Downloading text version instead.');
    handleDownloadText();
  }
};

  const handleDownloadText = () => {
    // Create professional resume text content (fallback)
    let resumeText = `RESUME\n`;
    resumeText += `${'='.repeat(50)}\n\n`;
    
    // Personal Information
    resumeText += `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}\n`;
    resumeText += `${formData.careerInfo.jobTitle || 'Professional'}\n\n`;
    
    resumeText += `CONTACT INFORMATION\n`;
    resumeText += `${'='.repeat(25)}\n`;
    resumeText += `Phone: ${formData.personalInfo.phoneNumber}\n`;
    resumeText += `Email: ${formData.personalInfo.emailAddress}\n`;
    resumeText += `Address: ${formData.personalInfo.address}, ${formData.personalInfo.city}, ${formData.personalInfo.state} ${formData.personalInfo.zipCode}\n`;
    
    if (formData.contactInfo.linkedinProfile) {
      resumeText += `LinkedIn: ${formData.contactInfo.linkedinProfile}\n`;
    }
    if (formData.contactInfo.portfolio) {
      resumeText += `Portfolio: ${formData.contactInfo.portfolio}\n`;
    }
    resumeText += `\n`;
    
    // Professional Summary
    if (formData.careerInfo.summary) {
      resumeText += `PROFESSIONAL SUMMARY\n`;
      resumeText += `${'='.repeat(25)}\n`;
      resumeText += `${formData.careerInfo.summary}\n\n`;
    }
    
    // Work Experience
    if (formData.experiences.length > 0 && formData.experiences[0].jobTitle) {
      resumeText += `WORK EXPERIENCE\n`;
      resumeText += `${'='.repeat(25)}\n`;
      formData.experiences.forEach((exp, index) => {
        resumeText += `\n${index + 1}. ${exp.jobTitle}\n`;
        resumeText += `   Company: ${exp.companyName}\n`;
        resumeText += `   Duration: ${exp.startDate} - ${exp.endDate || 'Present'}\n`;
        resumeText += `   Description: ${exp.description}\n`;
        
        if (exp.skills && exp.skills.length > 0) {
          resumeText += `   Skills: ${exp.skills.join(', ')}\n`;
        }
      });
      resumeText += `\n`;
    }
    
    // Education
    if (formData.educations.length > 0 && formData.educations[0].degree) {
      resumeText += `EDUCATION\n`;
      resumeText += `${'='.repeat(25)}\n`;
      formData.educations.forEach((edu, index) => {
        resumeText += `\n${index + 1}. ${edu.degree}\n`;
        resumeText += `   Institution: ${edu.institution}\n`;
        resumeText += `   Duration: ${edu.startDate} - ${edu.endDate || 'Present'}\n`;
        if (edu.description) {
          resumeText += `   Details: ${edu.description}\n`;
        }
      });
      resumeText += `\n`;
    }
    
    // Certifications
    if (formData.certifications.length > 0 && formData.certifications[0].title) {
      resumeText += `CERTIFICATIONS\n`;
      resumeText += `${'='.repeat(25)}\n`;
      formData.certifications.forEach((cert, index) => {
        resumeText += `\n${index + 1}. ${cert.title}\n`;
        resumeText += `   Organization: ${cert.organization}\n`;
        resumeText += `   Issue Date: ${cert.issueDate}\n`;
        if (cert.expiryDate) {
          resumeText += `   Expiry Date: ${cert.expiryDate}\n`;
        }
      });
      resumeText += `\n`;
    }
    
    // Skills
    if (formData.skills && formData.skills.length > 0) {
      resumeText += `SKILLS\n`;
      resumeText += `${'='.repeat(25)}\n`;
      formData.skills.forEach(skillCategory => {
        if (skillCategory.items && skillCategory.items.length > 0) {
          resumeText += `\n${skillCategory.category}:\n`;
          resumeText += `   ${skillCategory.items.join(', ')}\n`;
        }
      });
      resumeText += `\n`;
    }

    // Create and download text file
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.personalInfo.firstName}_${formData.personalInfo.lastName}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFindJob = () => {
    window.open('https://www.linkedin.com/jobs/', '_blank');
  };

  // Step 6-এর জন্য আলাদা লেআউট
  if (currentStep === 6) {
    return (
      <div className="flex justify-center container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Button
          onClick={handleNext}
          className="flex items-center justify-center gap-2 px-40 bg-primary text-white"
        >
          {nextButtonText}
          <FaArrowRightLong />
        </Button>
      </div>
    );
  }

  // অন্যান্য স্টেপের জন্য সাধারণ লেআউট
  return (
    <div className="flex justify-between container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {/* Back Button - সব স্টেপেই দেখাবে (Step 1-এও) */}
      {(currentStep >= 1 && currentStep < 7) && (
        <Button
          onClick={handleBack}
          className="bg-[#9A9A9A]! px-40 text-white flex items-center gap-2"
        >
          <FaArrowLeftLong />
          {currentStep === 1 ? "Home" : "Back"}
        </Button>
      )}

      {/* Next Button */}
      {showNextButton && currentStep < 7 && (
        <Button
          onClick={handleNext}
          className="flex items-center justify-center gap-2 px-40 bg-primary text-white"
        >
          {nextButtonText}
          <FaArrowRightLong />
        </Button>
      )}

      {/* Step 7 Buttons */}
      {currentStep === 7 && (
        <div className="flex items-center gap-10 justify-center w-full">
          <Button 
            onClick={handleDownloadPDF}
            className="bg-secondary px-25 text-white"
          >
            Download Resume PDF
          </Button>
          <Button 
            onClick={handleFindJob}
            className="bg-primary px-25 text-white"
          >
            Find Your Favorite Job
          </Button>
        </div>
      )}
    </div>
  );
}