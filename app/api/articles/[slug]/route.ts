// app/api/articles/[slug]/route.ts

import {  NextResponse } from 'next/server';
import { getArticleBySlug,deleteArticle } from '@/services/article.services';

export async function GET(req: Request, context: { params: { slug: string } }) {
  const { slug } = context.params;

  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const deleted = await deleteArticle(params.slug);
    return NextResponse.json(deleted);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}