import ScoreBadge from "./ScoreBadge";
import ScoreGauge from "./ScoreGauge";

const Category = ({title, score}: {title: string, score: number}) => {
    const textColor = score > 70 ? 'text-green-600'
    : score > 49
    ? 'text-yellow-600' : 'text-red-600';
    return(
        <div className="resume-summary">
  <div className="category">
<div className="flex flex-row gap-2 items-center justify-center">
    <p className="text-xl md:text-xl sm:text-2xl">{title}</p>
    <ScoreBadge score={score}/>
</div>
<p className="text-2xl">
    <span className={textColor}>{score}</span>/100
</p>
  </div>
</div>

    )
}

export const normalizeScore = (score: number, scale: number = 10): number => {
  return Math.round((score / scale) * 100);
};


const Summary = ({feedback}: {feedback: Feedback}) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
<div className="flex flex-row items-center p-4 gap-8"> 
<ScoreGauge score={normalizeScore(feedback.overallScore)} />


<div className="flex flex-col gap-2">
<h2 className="text-2xl font-bold">Your Resume Score</h2>
<p className="text-sm text-gray-500">
This score is calculated based on the variables listed below.
</p>
</div>
</div>
 
<Category title="Tone & Style" score={normalizeScore(feedback.toneAndStyle?.score)} />
<Category title="Content" score={normalizeScore(feedback.content?.score)} />
<Category title="Structure" score={normalizeScore(feedback.structure?.score)} />
<Category title="Skills Matching" score={normalizeScore(feedback.skills?.score)} />



        </div>
    )
}

export default Summary;
