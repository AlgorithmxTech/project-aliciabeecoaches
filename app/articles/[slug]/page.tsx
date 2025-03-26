'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Spin, Tag, Avatar } from 'antd';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';

interface Author {
  author_name: string;
}

interface Article {
  title: string;
  content: string;
  tags: string[]; // will convert to array if stored as string in DB
  image_url?: string;
  author?: Author;
  created_at: string;
}

export default function ArticlePage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${slug}`);
        const data = await res.json();

        // If tags is a stringified array, convert it to real array
        const parsedTags = typeof data.tags === 'string' ? JSON.parse(data.tags) : data.tags;

        setArticle({
          ...data,
          tags: parsedTags,
        });
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center mt-20 text-lg text-gray-500">
        Article not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

      <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Avatar icon={<UserOutlined />} />
          <span>{article.author?.author_name || 'Unknown Author'}</span>
        </div>
        <div className="flex items-center gap-1">
          <ClockCircleOutlined />
          <span>{new Date(article.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      {article.tags?.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {article.tags.map((tag: string, index: number) => (
            <Tag key={index} color="blue">
              {tag}
            </Tag>
          ))}
        </div>
      )}

      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full max-h-[500px] object-cover rounded mb-6"
        />
      )}

      <div
        className=""
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
