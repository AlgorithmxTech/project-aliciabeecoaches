"use client"
import React from 'react'
import Footer from "@/components/common/Footer/Footer";
import Navbar from "@/components/common/NavBar/Navbar";
import Layout from "@/components/common/Layout/Layout";
import ArticlesPage from '@/pages/ArticlePage';
const page = () => {
  return (
  <>
  <Navbar/>
  <Layout>
    <ArticlesPage/>
  </Layout>
  <Footer/>
  </>
  )
}

export default page
