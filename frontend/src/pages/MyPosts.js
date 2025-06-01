import React, { useEffect, useState } from 'react';
import API from '../services/api';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';

export default function MyPosts() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const { data } = await API.get('/posts/my/');
        setPosts(data);
    };

    const deletePost = async (id) => {
        try {
            await API.delete(`/posts/${id}/`);
        } catch (error) {
            console.error("Ошибка при удалении поста:", error);
        }
        setPosts(prev => prev.filter(post => post.id !== id));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Мои посты</h2>
            <CreatePost onPostCreated={() => fetchPosts()} />
            <div className="row">
                {posts.map(post => (
                    <div key={post.id} className="col-md-3 mb-3">
                        <PostCard post={post} onDeleted={deletePost} showDelete={true} />
                    </div>
                ))}
            </div>
        </div>
    );
}
