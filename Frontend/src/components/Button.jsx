import React from 'react'
import '../styles/button.scss'

export const Button = ({ children, className = '', variant = 'primary', ...props }) => {
    return (
        <button className={`btn ${variant} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
