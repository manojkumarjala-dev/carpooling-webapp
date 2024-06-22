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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {post && <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-black text-2xl font-bold mb-4">Trip Details</h2>
        <p className="mb-2 text-black"><span className="font-semibold text-black">From:</span> {post.posting.startLocation}</p>
        <p className="mb-2 text-black"><span className="font-semibold text-black">To:</span> {post.posting.endLocation}</p>
        <p className="mb-2 text-black"><span className="font-semibold text-black">Date:</span> {new Date(post.posting.date).toLocaleDateString()}</p>
        <p className="mb-2 text-black"><span className="font-semibold text-black">Time:</span> {post.posting.time}</p>
        <p className="mb-2 text-black"><span className="font-semibold text-black">Available Seats:</span> {post.posting.availableSeats}</p>
        <p className="mb-2 text-black"><span className="font-semibold text-black">Occupied Seats:</span> {post.posting.occupiedSeats}</p>
        <p className="mb-2 text-black"><span className="font-semibold text-black">Notes:</span> {post.posting.notes}</p>
      </div>}
    </div>
    </div>
  );
}
