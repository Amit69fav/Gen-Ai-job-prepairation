import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../auth.form.scss'
import Button from '../../../components/Button'
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
    const { user, loading, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        if (user && !loading) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await handleLogin({ email, password });
            navigate('/'); // Redirect to home page after successful login
        } catch (err) {
            setError(err?.response?.data?.message || 'Login failed. Please check your credentials.');
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
                <h1>Login</h1>
                <p className="form-subtitle">Sign in to continue to your Interview Suite</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='Email' placeholder='Enter your email' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type={showPassword ? 'text' : 'password'} 
                                id="password" 
                                name='Password' 
                                placeholder='Your password' 
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
                    <Button type='submit'>Login</Button>
                </form>
                <p style={{ marginTop: 6 }}>Don't have an account? <span className="redirect-link" onClick={() => navigate('/register')}>Register</span></p>
            </div>

        </main>
    )
}
