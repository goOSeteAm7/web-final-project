import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const submit = async e => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await API.post('/auth/login', { username, password });
            localStorage.setItem('token', data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Ошибка входа. Проверьте данные и попробуйте снова.'
            );
        }
    };
    return (
        <div className="row justify-content-center">
            <form className="col-4" onSubmit={submit}>
                <h3>Войти</h3>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div className="mb-3">
                    <label>Имя пользователя</label>
                    <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Пароль</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="btn btn-primary">Войти</button>
            </form>
        </div>
    );
}