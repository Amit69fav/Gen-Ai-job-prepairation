import React, { useState } from 'react'
import '../styles/roadmap.scss'

const presets = [7, 30, 90, 180]

export const Roadmap = ({ onGenerate }) => {
    const [selected, setSelected] = useState(30)
    const [custom, setCustom] = useState('')

    const handleGenerate = () => {
        const days = custom ? parseInt(custom, 10) : selected
        onGenerate && onGenerate(days)
    }

    return (
        <div className="roadmap-panel">
            <div className="chips">
                {presets.map(p => (
                    <button key={p} className={`chip ${selected === p ? 'active' : ''}`} onClick={() => { setSelected(p); setCustom('') }}>{p === 7 ? '1 Week' : p === 30 ? '1 Month' : p === 90 ? '3 Months' : '6 Months'}</button>
                ))}
                <div className="custom">
                    <input placeholder="Custom days" value={custom} onChange={(e) => { setCustom(e.target.value); setSelected(null) }} />
                </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <button className="btn primary" onClick={handleGenerate}>Generate Roadmap</button>
            </div>
        </div>
    )
}

export default Roadmap
