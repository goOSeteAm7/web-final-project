import React, { useEffect, useState } from 'react';
import API from '../services/api';
import PostCard from './PostCard';

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const load = async () => {
        const { data } = await API.get('/posts/');
        setPosts(data);
    };
    useEffect(() => { load(); }, []);
    return (
        <div className="row">
            {posts.map(p => (
                <div className="col-md-3 mb-3" key={p.id}>
                    <PostCard post={p} onDeleted={load} showDelete={false} />
                </div>
            ))}
        </div>
    );
}
