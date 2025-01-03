"use client"
import { useState } from 'react';

export default function AnalyzeData() {
  const [postType, setPostType] = useState('carousel');
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    const res = await fetch(`/api/analytics?postType=${postType}`);
    const data = await res.json();
    setAnalytics(data);
  };

  return (
    <div>
      <select value={postType} onChange={(e) => setPostType(e.target.value)}>
        <option value="carousel">Carousel</option>
        <option value="reels">Reels</option>
        <option value="static">Static</option>
      </select>
      <button onClick={fetchAnalytics}>Fetch Analytics</button>
      {analytics && <pre>{JSON.stringify(analytics, null, 2)}</pre>}
    </div>
  );
}
