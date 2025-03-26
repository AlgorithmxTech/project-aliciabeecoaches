'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Tag } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

interface Article {
  title: string;
  content: string;
  image_url?: string;
  author_by: string;
  created_at: string;
  tags: string[];
}

interface Author {
  author_id: string;
  author_name: string;
  author_image?: string;
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const calculateReadTime = (content: string): string => {
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
  return `${Math.ceil(words / 200)} min read`;
};

const ReadArticle = ({ slug }: { slug: string }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`/api/articles/${slug}`);
      const data = await res.json();
      setArticle(data);

      // Fetch author details
      if (data.author_by) {
        const authorRes = await fetch(`/api/authors/${data.author_by}`);
        const authorData = await authorRes.json();
        setAuthor(authorData);
      }
    };

    fetchArticle();
  }, [slug]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Article Header */}
      <div className="flex items-center mb-4">
        <Avatar src={author?.author_image || "/default-avatar.jpg"} size="large" />
        <div className="ml-3">
          <p className="text-md font-medium">{author?.author_name || "Unknown Author"}</p>
          <p className="text-gray-500 text-sm">
            {formatDate(article.created_at)} • {calculateReadTime(article.content)}
          </p>
        </div>
        <HeartOutlined className="ml-auto text-lg cursor-pointer text-red-500" />
      </div>

      {/* Article Title */}
      <h1 className="text-3xl font-bold mb-3">{article.title}</h1>

      {/* Tags */}
      <div className="mb-4">
        {article.tags.map((tag, index) => (
          <Tag key={index} color="blue">{tag}</Tag>
        ))}
      </div>

      {/* Article Content */}
      <div className="text-lg leading-relaxed text-gray-700">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {/* Footer */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold">Connect With Me</h2>
        <p className="text-gray-600">
          Are you interested in a technical career but want to know more about no-code jobs? Book a free 15-minute discovery call at <strong>coachablecoaches.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default ReadArticle;
