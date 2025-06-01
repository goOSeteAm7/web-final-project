import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {
    const nav = useNavigate();
    const logout = () => { localStorage.removeItem('token'); nav('/login'); };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">PhotoShare</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        {localStorage.getItem('token') ? (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/profile">Профиль</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/my-posts">Мои публикации</Link></li>
                                <li className="nav-item"><button className="btn btn-link nav-link" onClick={logout}>Выйти</button></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/login">Войти</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/register">Регистрация</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}