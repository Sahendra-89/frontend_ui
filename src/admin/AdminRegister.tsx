import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const AdminRegister = () => {
    const [formData, setFormData] = useState({ username: '', password: '', secretKey: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            // Note: In a real production app, this should be restricted or use a secret key.
            // We'll use a placeholder 'secretKey' check if we want to mimic security, 
            // but for now let's just try to call the register endpoint.
            // Actually, the backend requires an existing superadmin token.
            // For this user's request, I will simplify and provide instructions or 
            // suggest a 'First Admin' creation.

            // IF we want to allow public registration for now (per user request):
            await api.post('/admin/public-register', formData);
            setSuccess('Admin registered successfully! Redirecting to login...');
            setTimeout(() => navigate('/admin/login'), 2000);
        } catch (err: any) {
            const errorMsg = err.response?.data?.msg || err.response?.data || err.message || 'Registration failed';
            setError(typeof errorMsg === 'string' ? errorMsg : 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA]">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#1E1E2D]">Admin Registration</h2>
                    <p className="text-gray-500 mt-2 text-sm font-medium">Create a new administrator account</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 font-medium">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-50 text-green-700 text-sm rounded-xl border border-green-100 font-medium">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Admin Secret Key</label>
                        <input
                            type="password"
                            name="secretKey"
                            placeholder="Enter the system secret key"
                            value={formData.secretKey}
                            onChange={handleChange}
                            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                            required
                        />
                        <p className="text-[10px] text-gray-400 mt-2 px-1 leading-relaxed">This key is required to register new administrators for security purposes.</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#1E1E2D] text-white p-4 rounded-xl font-bold hover:bg-[#2A2A3C] transition-all transform active:scale-95 shadow-lg shadow-gray-200 mt-4"
                    >
                        Create Admin Account
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                    <p className="text-sm text-gray-500 font-medium">
                        Already have an account?{' '}
                        <Link to="/admin/login" className="text-blue-600 hover:text-blue-700 font-bold ml-1 transition-colors">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
