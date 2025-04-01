'use client';

import React, { useEffect, useState } from 'react';
import { Card, Avatar, Button, Input, Tag } from 'antd';
import { useRouter } from 'next/navigation';
import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Search } = Input;

interface Article {
    article_id: string;
    title: string;
    slug: string;
    content: string;
    image_url?: string;
    author_by: string;
    created_at: string;
    views: number;
    tags: string[];
}

interface Author {
    author_id: string;
    author_name: string;
    author_image: string
}

const calculateReadTime = (content: string): string => {
    const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    return `${Math.ceil(words / 200)} min read`;
};

const ArticlesPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTag, setSelectedTag] = useState<string | null>('All Posts');
    const [showAllTags, setShowAllTags] = useState(false);
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch('/api/articles');
            const data = await res.json();
            setArticles(data);
            setFilteredArticles(data);

            const uniqueTags = ['All Posts', ...new Set(data.flatMap((article: Article) => article.tags))];
            setTags(uniqueTags);
        };

        const fetchAuthors = async () => {
            const res = await fetch('/api/authors');
            const data = await res.json();
            setAuthors(data);
        };

        fetchArticles();
        fetchAuthors();
    }, []);

    const handleTagFilter = (tag: string) => {
        if (tag === 'All Posts') {
            setSelectedTag('All Posts');
            setFilteredArticles(articles);
        } else {
            setSelectedTag(tag);
            setFilteredArticles(articles.filter(article => article.tags.includes(tag)));
        }
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
        const filtered = articles.filter(article =>
            article.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredArticles(filtered);
    };

    const getAuthorName = (authorId: string): string => {
        const author = authors.find((a) => a.author_id === authorId);
        return author ? author.author_name : 'Unknown Author';
    };
    const getAuthorImage = (authorId: string): string => {
        const author = authors.find((a) => a.author_id === authorId);
        return author ? author.author_image : 'No Image';
    };
    return (
        <div className="p-4 max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Latest Articles</h2>
                <Search
                    placeholder="Search articles..."
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchText}
                    style={{ width: 300 }}
                    allowClear
                />
            </div>

            {/* Tags Filter Bar */}
            <div className="flex flex-wrap gap-3 mb-6">
                {tags.slice(0, showAllTags ? tags.length : 5).map(tag => (
                    <Tag
                        key={tag}
                        color={selectedTag === tag ? 'red' : 'default'}
                        className="cursor-pointer text-lg px-3 py-1 rounded-md"
                        onClick={() => handleTagFilter(tag)}
                        style={{
                            fontSize: selectedTag === tag ? '1rem' : '0.95rem',
                            fontWeight: selectedTag === tag ? 'bold' : 'normal',
                        }}
                    >
                        {tag}
                    </Tag>
                ))}
                {tags.length > 5 && (
                    <Button type="link" onClick={() => setShowAllTags(!showAllTags)}>
                        {showAllTags ? 'Show Less' : 'More'}
                    </Button>
                )}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 gap-6">
                {filteredArticles.map(article => (
                    <Card key={article.article_id}>
                        <div className="w-full shadow-md hover:shadow-lg transition p-4 flex flex-col md:flex-row">
                            {/* Article Image (Left Side) */}
                            <div className="w-full md:w-1/2">
                                <img
                                    alt={article.title}
                                    src={article.image_url}
                                    className="h-58 w-full object-cover rounded-md"
                                />
                            </div>


                            <div className="w-full md:w-2/3 md:pl-4 flex flex-col justify-between">
                                <div className='w-full'>
                                    <div className="flex  w-full flex-col items-start mb-3">
                                        <div className='w-full flex items-center justify-between'>

                                            <div className='flex items-center'>
                                                <img
                                                    alt={getAuthorName(article.author_by)}
                                                    src={getAuthorImage(article.author_by)}
                                                    className="h-18 w-full object-cover rounded-full"
                                                />
                                                <span className="ml-2  text-xl font-medium">{getAuthorName(article.author_by)}</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <HeartOutlined className="cursor-pointer text-red-500 text-lg" />
                                                <ShareAltOutlined className="cursor-pointer text-gray-500 text-lg" />
                                            </div>
                                        </div>


                                        <span className="ml-2 text-gray-500 text-sm">
                                            {new Date(article.created_at).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })} • {calculateReadTime(article.content)}
                                        </span>

                                    </div>

                                    <h3 className="text-xl font-semibold">{article.title}</h3>
                                    <p
                                        className="text-gray-600 mt-2"
                                        dangerouslySetInnerHTML={{ __html: article.content.slice(0, 250) + "..." }}
                                    />
                                    <div className="mt-3 font-bold">
                                        <Link

                                            
                                            href={`/articles/${article.slug}`}
                                        >
                                            <span className='text-red-500 ' >
                                            Read More →
                                            </span>
                                         
                                        </Link>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ArticlesPage;
