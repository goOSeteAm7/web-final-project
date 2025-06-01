import React from 'react';
import { Card, Button } from 'react-bootstrap';
import API from '../services/api';

export default function PostCard({ post, onDeleted, showDelete = false }) {
    const deletePost = async () => {
        onDeleted(post.id);
    };

    return (
        <Card className="mb-3">
            <Card.Img variant="top" src={`http://localhost:8000${post.image}`} />
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                {showDelete && (
                    <Button variant="danger" onClick={deletePost}>
                        Удалить
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}