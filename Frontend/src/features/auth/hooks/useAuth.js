import { useContext,useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { login, register, logout, getMe } from "../services/auth.api"

export const useAuth = () => {

    const context = useContext(AuthContext);
    const { user, loading, setUser, setLoading } = context;


    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
        } catch (error) {
            throw error; // re-throw so Login page can show the error message
        } finally {
            setLoading(false);
        }
    }
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
        }
        catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        }
        catch (error) {
        }
        finally {
            setLoading(false);
        }
    }

    return { user, loading, handleLogin, handleRegister, handleLogout };
}