import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";

import ResumeCard from "~/components/ResumeCard";
import { resumes } from "constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMind" },
    { name: "description", content: "AI that understands your resume" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
<section className="main-section">
<div className="page-heading py-15">
<h1>
  Smart Resume Insights & Application Tracking
</h1>
<h2>
  Track Your Submissions. Improve with AI Feedback.
</h2>
</div>
{Array.isArray(resumes) && resumes.length > 0 && (
  <div className="resumes-section">
    {resumes.map((resume) => (
      <div key={resume.id}>
        <ResumeCard resume={resume} />
      </div>
    ))}
  </div>
)}
</section>
  </main>
}
