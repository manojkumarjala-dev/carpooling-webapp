'use client'
import React, { useState, useEffect } from 'react';

export default function Page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!params || !params.slug) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/posting/${encodeURIComponent(params.slug)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My Post: {params.slug}</h1>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
}
