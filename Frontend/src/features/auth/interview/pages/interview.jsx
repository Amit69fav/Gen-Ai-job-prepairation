import React from 'react'
import './interview.scss'

const sample = {
    message: "Interview report generated successfully",
    interviewReport: {
        jobDescription: "We are seeking a motivated Junior Front-End Developer to join our technical team. In this role, you will bridge the gap between design and implementation...",
        resume: "Curriculum Vitae\nName: Amit Mohapatra\n...",
        matchScore: 75,
        technicalQuestions: [],
        behavioralQuestions: [],
        skillGaps: [],
        preparationPlan: []
    }
}

const Interview = ({ report }) => {
    const data = report || sample.interviewReport || {};

    return (
        <main className="interview-page">
            <header className="interview-header">
                <h1>Interview Report</h1>
                <div className="score">Match: <span>{data.matchScore ?? '—'}%</span></div>
            </header>
            <section className="interview-content">
                <div className="left">
                    <div className="card">
                        <h2>Job Description</h2>
                        <p className="job-desc">{data.jobDescription}</p>
                    </div>

                    <div className="card">
                        <h2>Resume</h2>
                        <pre className="resume">{data.resume}</pre>
                    </div>
                </div>

                <aside className="right">
                    <div className="card">
                        <h3>Technical Questions</h3>
                        <ul>
                            {(data.technicalQuestions || []).map((q, i) => (
                                <li key={i}>
                                    <strong>{q.question}</strong>
                                    <p className="answer">{q.answer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="card">
                        <h3>Behavioral Questions</h3>
                        <ul>
                            {(data.behavioralQuestions || []).map((q, i) => (
                                <li key={i}>
                                    <strong>{q.question}</strong>
                                    <p className="answer">{q.answer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="card">
                        <h3>Skill Gaps</h3>
                        <ul className="gaps">
                            {(data.skillGaps || []).map((s, i) => (
                                <li key={i}><span className={`chip ${s.severity}`}>{s.skill}</span></li>
                            ))}
                        </ul>
                    </div>

                </aside>
            </section>
        </main>
    )
}

export default Interview
