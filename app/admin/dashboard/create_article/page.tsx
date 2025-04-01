"use client";
export const dynamic = 'force-dynamic';
import React, { Suspense } from 'react';

import AdminNavbar from '@/components/common/AdminNav/AdminNav'
import CreateArticleForm from '@/pages/CreateArticleForm'


function AddPostPage() {
  return   <>
  <AdminNavbar/>
  <CreateArticleForm/>
  </>;
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AddPostPage />
    </Suspense>
  );
}