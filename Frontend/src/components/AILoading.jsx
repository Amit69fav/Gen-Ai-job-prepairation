import React, { useState, useEffect } from 'react'
import '../styles/loading.scss'

const AILoading = ({ active }) => {
    const [step, setStep] = useState(0)
    const messages = [
        "Initializing AI engine...",
        "Analyzing resume structure...",
        "Extracting key technical skills...",
        "Cross-referencing job requirements...",
        "Identifying expertise gaps...",
        "Crafting tailored interview questions...",
        "Building personalized roadmap...",
        "Finalizing analysis report..."
    ]

    useEffect(() => {
        if (!active) return
        const interval = setInterval(() => {
            setStep((prev) => (prev < messages.length - 1 ? prev + 1 : prev))
        }, 1500)
        return () => clearInterval(interval)
    }, [active, messages.length])

    if (!active) return null

    return (
        <div className="ai-loading-overlay">
            <div className="loading-content-pro">
                <div className="scanner-orb">
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <div className="core"></div>
                </div>
                
                <div className="text-sequence">
                    <h2>AI is Analyzing</h2>
                    <p className="current-status">{messages[step]}</p>
                </div>

                <div className="loading-progress-container">
                    <div className="progress-bar-pro">
                        <div className="progress-fill" style={{ width: `${((step + 1) / messages.length) * 100}%` }}></div>
                    </div>
                    <span className="percentage">{Math.round(((step + 1) / messages.length) * 100)}%</span>
                </div>
            </div>
        </div>
    )
}

export default AILoading
