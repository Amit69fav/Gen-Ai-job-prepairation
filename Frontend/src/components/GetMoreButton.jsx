import React from 'react'
import '../styles/get-more.scss'

export const GetMoreButton = ({ onClick, label = 'Get More', loading = false }) => {
    return (
        <button className={`get-more-btn ${loading ? 'loading' : ''}`} onClick={onClick} disabled={loading}>
            <span className="label">{label}</span>
            {loading && <span className="spinner" aria-hidden />}
        </button>
    )
}

export default GetMoreButton
