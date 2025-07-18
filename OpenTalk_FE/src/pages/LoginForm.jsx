import React, { useState } from 'react';
import authApi from '../api/authApi'
import { saveAuthTokens } from '../helper/auth';

export default function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await authApi.login(form);
            const data = res.data.result;
            saveAuthTokens(data);
            window.location.href = '/dashboard'; //
        } catch (err) {
            alert('Login failed');
            console.error(err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="bg-white p-5 shadow rounded" style={{ width: '100%', maxWidth: 400 }}>
                <div className="text-center mb-4">
                    {/* <img src="https://via.placeholder.com/60x60?text=F" alt="Logo" className="mb-3" /> */}
                    <h5 className="fw-bold">Welcome Back</h5>
                    <p className="text-muted" style={{ fontSize: 14 }}>
                        Login to your account to continue
                    </p>
                </div>

                <div className="d-grid gap-2 mb-3">
                    <button className="btn btn-outline-primary">
                        <i className="bi bi-facebook me-2"></i> Continue with Facebook
                    </button>
                    <button className="btn btn-outline-danger">
                        <i className="bi bi-google me-2"></i> Continue with Google
                    </button>
                </div>

                <hr className="my-4" />

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email<span className="text-danger">*</span></label>
                        <input type="text" name="username" className="form-control" placeholder="Enter your email" value={form.username} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password<span className="text-danger">*</span></label>
                        <input type="password" name="password" className="form-control" placeholder="Enter your password" value={form.password} onChange={handleChange} required />
                    </div>

                    <div className="mb-3 text-end">
                        <a href="#" className="text-decoration-none small">Forgot password?</a>
                    </div>

                    <button type="submit" className="btn btn-dark w-100">Login</button>
                </form>

                <p className="text-center mt-3 small">
                    Don’t have an account? <a href="/register">Register now.</a>
                </p>
            </div>
        </div>
    );
}
