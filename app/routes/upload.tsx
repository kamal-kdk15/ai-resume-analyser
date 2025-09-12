
import { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";

const Upload = () => {
   const [isProcessing, setIsProcessing] = useState(false);
   const [statusText, setStatusText] = useState("");
   const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
setFile(file);

  }

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();
const form = e.currentTarget.closest('form');
if(!form) return;
const formData = new FormData(form);
const companyName = formData.get('companyName') ;
const jobTitle = formData.get('jobTitle');
const jobDescription = formData.get('jobDescription');

console.log({
    companyName,
    jobTitle,
    jobDescription,
    file    
});
   }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen p-4">
    <Navbar/>
<section className="main-section">
<div className="page-heading py-16">
<h1>Smart feedback for your dream job</h1>
{isProcessing ? (
    <>
    <h2>
        {statusText}
    </h2>
    <img
    src="/images/resume-scan.gif"
    className="w-full"
    />
    </>
): (
    <h2>Drop your resume for ATS score and improvement suggestions</h2>
)}

{!isProcessing && (
    <form id="upload-form" className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
<div className="form-div">
<label htmlFor="company-name">
Company Name
</label>
<input type="text" id="company-name" name="companyName" placeholder="Enter company name" />
</div>

<div className="form-div">
<label htmlFor="job-title">
Job Title
</label>    
<input type="text" id="job-title" name="jobTitle" placeholder="Enter job title" />
</div>

<div className="form-div">
<label htmlFor="job-description">
Job Description
</label>    
<textarea rows={5} id="job-description" name="jobDescription" placeholder="Enter job description" />
</div>

<div className="form-div">
<label htmlFor="uploader">
Upload Resume
</label>
<FileUploader onFileSelect={handleFileSelect} />
</div>
<button type="submit" className="primary-button">
 Analyze Resume
</button>
    </form>
)}
</div>
</section>
        </main>
    )
};

export default Upload;
