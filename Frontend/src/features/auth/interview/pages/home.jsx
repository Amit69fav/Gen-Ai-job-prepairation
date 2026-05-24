import React, { useState } from 'react'
import './home.scss'
import { generateInterviewReport } from '../services/interview.api'
import CircularProgress from '../../../../components/CircularProgress'
import AILoading from '../../../../components/AILoading'
import { useAuth } from '../../hooks/useAuth'

const Home = () => {
    const { user, handleLogout } = useAuth()
    const [jobDescription, setJobDescription] = useState('')
    const [selfDescription, setSelfDescription] = useState('')
    const [resumeFile, setResumeFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState({})
    const [error, setError] = useState('')
    const [report, setReport] = useState(null)
    const [roadmapDays, setRoadmapDays] = useState(3)
    const [activeSection, setActiveSection] = useState('technical')

    const handleResumeChange = (event) => {
        setError('')
        const file = event.target.files?.[0]
        if (file && file.type !== 'application/pdf') {
            setError('Please upload a PDF file only.')
            return
        }
        setResumeFile(file || null)
    }

    const handleRemoveResume = () => {
        setResumeFile(null)
        // Reset the file input value so the same file can be re-selected if needed
        const fileInput = document.getElementById('resume');
        if (fileInput) fileInput.value = '';
    }

    const handleNewAnalysis = () => {
        setReport(null)
        setJobDescription('')
        setSelfDescription('')
        setResumeFile(null)
        setError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setReport(null)

        if (!jobDescription.trim()) {
            setError('Please enter a job description')
            return
        }
        if (!resumeFile && !selfDescription.trim()) {
            setError('Please upload a resume or enter a self description')
            return
        }

        setLoading(true)
        try {
            const data = await generateInterviewReport({
                resume: resumeFile,
                jobDescription,
                selfDescription,
            })
            setReport(data.interviewReport || data)
            setActiveSection('technical')
        } catch (err) {
            const message = err?.response?.data?.message || err.message || 'Failed to generate interview report'
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    const handleRoadmapDaysChange = async (days) => {
        setRoadmapDays(days)
        setLoadingMore((prev) => ({ ...prev, preparationPlan: true }))

        try {
            const { generateRoadmapForDays } = await import('../services/interview.api')
            const newRoadmap = await generateRoadmapForDays({
                days,
                jobDescription,
                selfDescription
            })

            if (!Array.isArray(newRoadmap)) {
                throw new Error('Invalid roadmap format')
            }

            setReport((prevReport) => ({
                ...prevReport,
                preparationPlan: newRoadmap
            }))
        } catch (e) {
            console.error(e)
        } finally {
            setLoadingMore((prev) => ({ ...prev, preparationPlan: false }))
        }
    }

    const toggleSection = (sectionId) => {
        setActiveSection(activeSection === sectionId ? null : sectionId);
    }

    return (
        <>
            <AILoading active={loading} />
            <nav className="navbar">
                <div className="nav-brand">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px', color: '#3b82f6'}}>
                        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                        <path d="m12 8-2 4 2 4 2-4-2-4Z"/>
                    </svg>
                    Gen AI Job Preparation
                </div>
                <div className="nav-user">
                    <span>{user?.username}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>
            
            <main className={`home ${report ? 'report-view' : ''}`}>
                {!report ? (
                    <>
                        <div className="hero-section">
                            <h1>Master Your Next Interview</h1>
                            <p>AI-powered preparation tailored to your profile and target role. Get instant feedback, roadmaps, and optimized resumes.</p>
                        </div>

                        <div className="main-container">
                            <div className="input-card">
                                <div className="jd-container">
                                    <label htmlFor="JobDescription">Target Job Description</label>
                                    <textarea
                                        name="JobDescription"
                                        id="JobDescription"
                                        placeholder='Paste the job requirements here to align the analysis...'
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="input-card">
                                <div className="profile-container">
                                    <label>Candidate Profile</label>
                                    <div 
                                        className={`upload-zone ${resumeFile ? 'has-file' : ''}`}
                                        onClick={() => !resumeFile && document.getElementById('resume').click()}
                                    >
                                        <input 
                                            type="file" 
                                            name="resume" 
                                            id="resume" 
                                            accept='.pdf' 
                                            onChange={handleResumeChange} 
                                            style={{ display: 'none' }}
                                        />
                                        {resumeFile ? (
                                            <div className="file-info-active">
                                                <div className="file-main">
                                                    <span className="icon">📄</span>
                                                    <p className="file-name">{resumeFile.name}</p>
                                                </div>
                                                <button type="button" className="remove-pill-btn" onClick={(e) => { e.stopPropagation(); handleRemoveResume(); }}>
                                                    Remove Resume ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="upload-placeholder">
                                                <span className="icon">📤</span>
                                                <p>Upload Resume (PDF)</p>
                                                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Recommended for best results</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="or-separator">
                                        <span>or</span>
                                    </div>

                                    <div className="self-desc-area">
                                        <textarea
                                            name="selfDescription"
                                            id="selfDescription"
                                            placeholder='Describe your key achievements and skills manually...'
                                            value={selfDescription}
                                            onChange={(e) => setSelfDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                                
                                <button className='generate-btn' type="button" onClick={handleSubmit} disabled={loading}>
                                    Start Analysis
                                </button>
                                {error && <p className="error-message fade-in">{error}</p>}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="report-dashboard fade-in">
                        <header className="report-header">
                            <div className="title-group">
                                <span className="badge">AI Analysis Complete</span>
                                <h1>Interview Readiness Report</h1>
                            </div>
                            <div className="action-group">
                                <button className="secondary-btn" onClick={handleNewAnalysis}>← New Analysis</button>
                            </div>
                        </header>

                        <div className="dashboard-grid">
                            <aside className="stats-sidebar">
                                <div className="stat-card score-main">
                                    <label>Overall Match</label>
                                    <CircularProgress score={report.matchScore || 0} size={160} />
                                    <p className="score-desc">
                                        {report.matchScore >= 80 ? "Excellent alignment with the role." : 
                                         report.matchScore >= 60 ? "Good match, some areas to improve." : 
                                         "Significant gaps identified."}
                                    </p>
                                </div>

                                <div className="stat-card">
                                    <label>Quick Summary</label>
                                    <div className="summary-pills">
                                        <span className="pill success">Technical: {report.technicalQuestions?.length} Qs</span>
                                        <span className="pill warning">Behavioral: {report.behavioralQuestions?.length} Qs</span>
                                        <span className="pill danger">Gaps: {report.skillGaps?.length} Areas</span>
                                    </div>
                                </div>
                            </aside>

                            <div className="content-area">
                                <section className={`dashboard-section accordion ${activeSection === 'technical' ? 'active' : ''}`}>
                                    <div className="section-header" onClick={() => toggleSection('technical')}>
                                        <div className="header-main">
                                            <div className="icon-wrap">💻</div>
                                            <div>
                                                <h2>Technical Proficiency</h2>
                                                <p>Targeted questions to test your domain expertise.</p>
                                            </div>
                                        </div>
                                        <div className="chevron">⌄</div>
                                    </div>
                                    <div className="accordion-content">
                                        <div className="qa-container">
                                            {report.technicalQuestions?.map((q, i) => (
                                                <div key={i} className="qa-item">
                                                    <div className="qa-number">Q{i+1}</div>
                                                    <div className="qa-content">
                                                        <h4>{q.question}</h4>
                                                        <div className="qa-meta">
                                                            <span><strong>Intent:</strong> {q.intention}</span>
                                                        </div>
                                                        <div className="qa-answer-box">
                                                            <strong>Ideal Answer:</strong>
                                                            <p>{q.answer}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                <section className={`dashboard-section accordion ${activeSection === 'behavioral' ? 'active' : ''}`}>
                                    <div className="section-header" onClick={() => toggleSection('behavioral')}>
                                        <div className="header-main">
                                            <div className="icon-wrap">🤝</div>
                                            <div>
                                                <h2>Behavioral & Culture</h2>
                                                <p>Soft skills and situational response analysis.</p>
                                            </div>
                                        </div>
                                        <div className="chevron">⌄</div>
                                    </div>
                                    <div className="accordion-content">
                                        <div className="qa-container">
                                            {report.behavioralQuestions?.map((q, i) => (
                                                <div key={i} className="qa-item">
                                                    <div className="qa-number">Q{i+1}</div>
                                                    <div className="qa-content">
                                                        <h4>{q.question}</h4>
                                                        <div className="qa-meta">
                                                            <span><strong>Intent:</strong> {q.intention}</span>
                                                        </div>
                                                        <div className="qa-answer-box">
                                                            <strong>Suggested Approach:</strong>
                                                            <p>{q.answer}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                <section className={`dashboard-section accordion ${activeSection === 'gaps' ? 'active' : ''}`}>
                                    <div className="section-header" onClick={() => toggleSection('gaps')}>
                                        <div className="header-main">
                                            <div className="icon-wrap">🎯</div>
                                            <div>
                                                <h2>Skill Gap Analysis</h2>
                                                <p>Specific areas where your profile can be strengthened.</p>
                                            </div>
                                        </div>
                                        <div className="chevron">⌄</div>
                                    </div>
                                    <div className="accordion-content">
                                        <div className="gap-grid">
                                            {report.skillGaps?.map((gap, i) => (
                                                <div key={i} className={`gap-card ${gap.severity}`}>
                                                    <div className="gap-header">
                                                        <span className="gap-name">{gap.skill}</span>
                                                        <span className="gap-priority">{gap.severity} priority</span>
                                                    </div>
                                                    <div className="gap-progress-bar">
                                                        <div className="fill" style={{ width: gap.severity === 'high' ? '30%' : gap.severity === 'medium' ? '60%' : '85%' }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                <section className={`dashboard-section accordion ${activeSection === 'roadmap' ? 'active' : ''}`}>
                                    <div className="section-header" onClick={() => toggleSection('roadmap')}>
                                        <div className="header-main">
                                            <div className="icon-wrap">📅</div>
                                            <div>
                                                <h2>Preparation Roadmap</h2>
                                                <p>A structured day-by-day plan to get you ready.</p>
                                            </div>
                                        </div>
                                        <div className="chevron">⌄</div>
                                    </div>
                                    <div className="accordion-content">
                                        <div className="roadmap-controls">
                                            {[7, 14, 21].map((days) => (
                                                <button
                                                    key={days}
                                                    onClick={() => handleRoadmapDaysChange(days)}
                                                    className={`roadmap-pill ${roadmapDays === days ? 'active' : ''}`}
                                                    disabled={loadingMore.preparationPlan}
                                                >
                                                    {days} Days
                                                </button>
                                            ))}
                                        </div>
                                        <div className="roadmap-timeline">
                                            {loadingMore.preparationPlan ? (
                                                <div className="loader-box">Crafting your custom roadmap...</div>
                                            ) : report.preparationPlan?.map((item, i) => (
                                                <div key={i} className="timeline-item">
                                                    <div className="day-marker">Day {item.day}</div>
                                                    <div className="timeline-content">
                                                        <h3>{item.focus}</h3>
                                                        <ul className="task-list">
                                                            {item.tasks?.map((task, ti) => (
                                                                <li key={ti}>{task}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default Home
