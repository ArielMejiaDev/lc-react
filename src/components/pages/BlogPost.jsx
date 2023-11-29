import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogPost() {
  const params = useParams();

  return (
    <div className="container">This is a blog post from id: {params.id}</div>
  );
}
