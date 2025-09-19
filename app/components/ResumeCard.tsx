import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState<string>("");

  useEffect(() => {
    const loadResume = async () => {
      try {
        if (!imagePath) return;
        const blob = await fs.read(imagePath); // 👈 must be awaited
        if (!blob) return;

        // Ensure blob is valid
        const url = URL.createObjectURL(blob);
        setResumeUrl(url);

        // cleanup on unmount
        return () => URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Failed to load resume preview:", err);
      }
    };

    loadResume();
  }, [imagePath, fs]);

  // Ensure score is always out of 100
const normalizeScore = (score: number) => {
  if (score <= 10) {
    return score * 10; // e.g., 6.5 -> 65
  }
  return score; // already in 0–100 scale
};


  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card max-w-[360px] h-[400px] overflow-hidden animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {companyName && (
            <h2 className="!text-black font-bold break-words">{companyName}</h2>
          )}
          {jobTitle && (
            <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className="!text-black font-bold">Resume</h2>
          )}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={normalizeScore(feedback.overallScore)} />

        </div>
      </div>

      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
