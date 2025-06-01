import React from 'react';
import CreatePost from '../components/CreatePost';
import PostList from '../components/PostList';

export default function Dashboard() {
    const [refresh, setRefresh] = React.useState(false);
    return (
        <>
            <h2>Галерея</h2>
            <CreatePost onPostCreated={() => setRefresh(r => !r)} />
            <PostList key={refresh} />
        </>
    );
}