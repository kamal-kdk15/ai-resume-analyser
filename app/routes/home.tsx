import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "constants";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMind" },
    { name: "description", content: "AI that understands your resume" },
  ];
}

export default function Home() {
  const {auth} = usePuterStore();

const navigate = useNavigate();

useEffect(() => {
if(!auth.isAuthenticated) navigate('/auth?next=/');
}, [auth.isAuthenticated]);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
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
