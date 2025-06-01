import React, { useState } from 'react';
import API from '../services/api';

export default function CreatePost({ onPostCreated }) {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const submit = async e => {
        e.preventDefault();
        const form = new FormData();
        form.append('title', title);
        if (file) form.append('image', file);
        await API.post('/posts/', form);
        setTitle(''); setFile(null);
        onPostCreated();
    };
    return (
        <form className="mb-4" onSubmit={submit} encType="multipart/form-data">
            <div className="row g-2">
                <div className="col">
                    <input className="form-control" placeholder="Заголовок" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="col-auto">
                    <input
                        type="file"
                        className="form-control"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={e => setFile(e.target.files[0])}
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        {file ? file.name : 'Выбрать файл'}
                    </button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary">Добавить</button>
                </div>
            </div>
        </form>
    );
}