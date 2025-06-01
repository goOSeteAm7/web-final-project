import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
export default function Register() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const submit = async e => {
        e.preventDefault();
        setError('');
        const form = new FormData();
        form.append('username', username);
        form.append('email', email);
        form.append('password', password);
        if (file) form.append('avatar', file);
        try {
            await API.post('/auth/register', form);
            navigate('/login');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Ошибка регистрации. Попробуйте снова.'
            );
        }
    };
    return (
        <div className="row justify-content-center">
            <form className="col-4" onSubmit={submit} encType="multipart/form-data">
                <h3>Регистрация<hr /></h3>
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
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Пароль</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Аватар</label>
                    <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} />
                </div>
                <button className="btn btn-success">Зарегистрироваться</button>
            </form>
        </div>
    );
}