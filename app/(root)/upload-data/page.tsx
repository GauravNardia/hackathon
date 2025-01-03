"use client"
import { useState } from 'react';

export default function UploadData() {
  const [form, setForm] = useState({ postType: '', likes: 0, shares: 0, comments: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) alert('Data uploaded!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input type="text" placeholder="Post Type" onChange={(e) => setForm({ ...form, postType: e.target.value })} />
      <input type="number" placeholder="Likes" onChange={(e) => setForm({ ...form, likes: +e.target.value })} />
      <input type="number" placeholder="Shares" onChange={(e) => setForm({ ...form, shares: +e.target.value })} />
      <input type="number" placeholder="Comments" onChange={(e) => setForm({ ...form, comments: +e.target.value })} />
      <button type="submit">Submit</button>
    </form>
  );
}
