import React, { useRef } from 'react'
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import './home.scss' // Share common animations
import '../../../../styles/resume.scss'

const ResumeBuilder = ({ data, onBack }) => {
    const resumeRef = useRef()

    if (!data) return null;

    const { personalInfo = {}, experience = [], education = [], skills = [], projects = [] } = data;

    const downloadPDF = async () => {
        const element = resumeRef.current
        const canvas = await html2canvas(element, { scale: 2, useCORS: true })
        const imgData = canvas.toDataURL('image/png')
        
        const pdf = new jsPDF('p', 'mm', 'a4')
        const imgProps = pdf.getImageProperties(imgData)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save(`${(personalInfo.name || 'Resume').replace(/\s+/g, '_')}.pdf`)
    }

    return (
        <div className="resume-builder-overlay fade-in">
            <nav className="resume-nav">
                <button className="back-btn" onClick={onBack}>← Back to Report</button>
                <div className="nav-title">Professional Resume Builder</div>
                <button className="download-btn-premium" onClick={downloadPDF}>✨ Download Official PDF</button>
            </nav>

            <div className="resume-preview-container">
                <div className="resume-paper" ref={resumeRef}>
                    <header className="resume-header-pro">
                        <h1>{personalInfo.name || 'Your Name'}</h1>
                        <div className="contact-info-pro">
                            {personalInfo.email && <span>{personalInfo.email}</span>}
                            {personalInfo.phone && <><span>•</span><span>{personalInfo.phone}</span></>}
                            {personalInfo.location && <><span>•</span><span>{personalInfo.location}</span></>}
                            {personalInfo.linkedin && <><span>•</span><span>LinkedIn</span></>}
                        </div>
                    </header>

                    {personalInfo.summary && (
                        <section className="resume-section-pro">
                            <p className="summary-pro">{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section className="resume-section-pro">
                            <h2 className="section-title-pro">Professional Experience</h2>
                            <div className="experience-list-pro">
                                {experience.map((exp, i) => (
                                    <div key={i} className="exp-item-pro">
                                        <div className="exp-header-pro">
                                            <strong>{exp.role}</strong>
                                            <span>{exp.duration}</span>
                                        </div>
                                        <div className="company-pro">{exp.company}</div>
                                        {exp.achievements && (
                                            <ul className="achievements-pro">
                                                {exp.achievements.map((ach, ai) => (
                                                    <li key={ai}>{ach}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education.length > 0 && (
                        <section className="resume-section-pro">
                            <h2 className="section-title-pro">Education</h2>
                            <div className="education-list-pro">
                                {education.map((edu, i) => (
                                    <div key={i} className="edu-item-pro">
                                        <div className="exp-header-pro">
                                            <strong>{edu.degree}</strong>
                                            <span>{edu.year}</span>
                                        </div>
                                        <div className="company-pro">{edu.school}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section className="resume-section-pro">
                            <h2 className="section-title-pro">Technical Skills</h2>
                            <div className="skills-grid-pro">
                                {skills.map((skill, i) => (
                                    <span key={i} className="skill-tag-pro">{skill}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects && projects.length > 0 && (
                        <section className="resume-section-pro">
                            <h2 className="section-title-pro">Key Projects</h2>
                            <div className="projects-list-pro">
                                {projects.map((proj, i) => (
                                    <div key={i} className="project-item-pro">
                                        <strong>{proj.name}</strong>
                                        <p>{proj.description}</p>
                                        {proj.technologies && (
                                            <div className="tech-tags-pro">
                                                {proj.technologies.map((tech, ti) => (
                                                    <small key={ti}>{tech}</small>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ResumeBuilder
