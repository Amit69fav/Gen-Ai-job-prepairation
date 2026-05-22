import React, { useEffect, useState } from 'react'
import '../styles/circular.scss'

export const CircularProgress = ({ score = 0, size = 160 }) => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        let raf
        const start = performance.now()
        const duration = 1200
        const from = 0
        const to = Math.min(100, Math.max(0, score))
        const tick = (now) => {
            const elapsed = now - start
            const t = Math.min(1, elapsed / duration)
            const easeOutCubic = 1 - Math.pow(1 - t, 3)
            setValue(Math.round(from + (to - from) * easeOutCubic))
            if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [score])

    const stroke = 8
    const radius = (size - stroke * 4) / 2
    const center = size / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (value / 100) * circumference

    const color = score >= 80 ? '#28cd41' : score >= 60 ? '#ff9f0a' : '#ff3b30'

    return (
        <div className="circular-container" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={color} />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                
                {/* Background Track */}
                <circle
                    className="track"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={stroke}
                    fill="none"
                />

                {/* Progress Ring */}
                <circle
                    className="progress-ring"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    stroke="url(#scoreGradient)"
                    strokeLinecap="round"
                    fill="none"
                    transform={`rotate(-90 ${center} ${center})`}
                    filter="url(#glow)"
                />

                {/* Inner Accent Ring */}
                <circle
                    className="inner-accent"
                    cx={center}
                    cy={center}
                    r={radius - 12}
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                />
            </svg>

            <div className="score-content">
                <span className="score-number">{value}<small>%</small></span>
                <span className="score-label">Match</span>
            </div>
            
            {/* Pulsing Dot */}
            <div className="pulse-container" style={{ 
                transform: `rotate(${(value / 100) * 360 - 90}deg)`,
                width: radius * 2 + stroke
            }}>
                <div className="pulse-dot" style={{ background: color }}></div>
            </div>
        </div>
    )
}

export default CircularProgress
