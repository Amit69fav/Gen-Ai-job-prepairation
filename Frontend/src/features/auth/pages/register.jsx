import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../auth.form.scss'
import Button from '../../../components/Button'
import { useAuth } from '../hooks/useAuth';


export const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const { user, loading, handleRegister } = useAuth();

    React.useEffect(() => {
        if (user && !loading) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await handleRegister({ username, email, password })
            navigate("/")
        } catch (err) {
            setError(err?.response?.data?.message || 'Registration failed. Please try again.');
        }

    }
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <p className="form-subtitle">Create your account to start your interview preparation</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='Username' placeholder='Enter your full name or nickname' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='Email' placeholder='e.g., alex@example.com' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type={showPassword ? 'text' : 'password'} 
                                id="password" 
                                name='Password' 
                                placeholder='Choose a strong password' 
                            />
                            <button 
                                type="button" 
                                className="password-toggle" 
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    </div>
                    {error && <p style={{ color: 'red', marginBottom: '8px' }}>{error}</p>}
                    <Button type='submit'>Register</Button>
                </form>
                <p style={{ marginTop: 6 }}>Already have an account? <span className="redirect-link" onClick={() => navigate('/login')}>Login</span></p>
            </div>

        </main>
    )
}
