'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Spin, Tag, Avatar } from 'antd';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';

import Footer from "@/components/common/Footer/Footer";
import Navbar from "@/components/common/NavBar/Navbar";
import Layout from "@/components/common/Layout/Layout";

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug ;
  const [article, setArticle] = useState(null);
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
        console.log(data)
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
    <>
    <Navbar/>
    <Layout>
    <div className="max-w-5xl h-auto mx-auto p-6">
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
          {article.tags.map((tag, index) => (
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

<div className="mt-5 dark:text-white text-black" dangerouslySetInnerHTML={{ __html: article.content }} />

    </div>
    </Layout>
    <Footer/>
    </>
    
  );
}
