import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/Link';

import { DataStore } from '@aws-amplify/datastore';
import { Post } from '../models';

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      const postData = await DataStore.query(Post);
      setPosts(postData);
    }
    fetchPosts();
    DataStore.observe(Post).subscribe(() => {
      fetchPosts();
    });
  });
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`}>
          <a>
            <h2>{post.title}</h2>
          </a>
        </Link>
      ))}
    </div>
  );
}
