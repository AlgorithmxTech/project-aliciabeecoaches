"use client"
import React from 'react'
import Footer from "@/components/common/Footer/Footer";
import Navbar from "@/components/common/NavBar/Navbar";
import Layout from "@/components/common/Layout/Layout";
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
const page = () => {
  return (
  <>
  <Navbar/>
  <Layout>
<PrivacyPolicyPage/>
  </Layout>
  <Footer/>
  </>
  )
}

export default page
