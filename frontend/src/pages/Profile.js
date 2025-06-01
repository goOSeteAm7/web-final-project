import React, { useEffect, useState, useRef } from 'react';
import API from '../services/api';

export default function Profile() {
    const [user, setUser] = useState(null);
    const fileInput = useRef(null);

    useEffect(() => {
        API.get('/users/me').then(({ data }) => setUser(data));
    }, []);

    const handleAvatarClick = () => {
        fileInput.current.click();
    };

    const onFileChange = async e => {
        if (e.target.files.length) {
            const form = new FormData();
            form.append('avatar', e.target.files[0]);
            const { data } = await API.put('/users/me/avatar', form);
            setUser(data);
        }
    };

    if (!user) return <p className="text-center mt-5">Загрузка...</p>;

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <div
                style={{
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0'
                }}
            >
                <img
                    src={`http://localhost:8000${user.avatar}`}
                    alt="Аватар"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            <button
                className="btn btn-outline-primary mt-3"
                onClick={handleAvatarClick}
            >
                Изменить аватар
            </button>
            <input
                type="file"
                ref={fileInput}
                onChange={onFileChange}
                style={{ display: 'none' }}
                accept="image/*"
            />

            <div className="card mt-4 p-4" style={{ width: 300 }}>
                <h5 className="card-title text-center">{user.username}</h5>
                <p className="card-text text-center">{user.email}</p>
            </div>
        </div>
    );
}
