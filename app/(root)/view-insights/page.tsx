"use client"
import { useEffect, useState } from 'react';

export default function ViewInsights() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchInsights = async () => {
      const res = await fetch('/api/insights');
      const data = await res.json();
      setInsights(data);
    };
    fetchInsights();
  }, []);

  return (
    <div>
      <h2>Insights</h2>
      {insights.map((insight, idx) => (
        <p key={idx}>{insight}</p>
      ))}
    </div>
  );
}
