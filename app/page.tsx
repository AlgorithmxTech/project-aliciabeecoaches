"use client"

import React, { useState } from "react";
import { FaQuoteRight } from "react-icons/fa6";
import Footer from "@/components/common/Footer/Footer";
import Navbar from "@/components/common/NavBar/Navbar";
import Layout from "@/components/common/Layout/Layout";
import { Modal } from "antd";
export default function Home() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()
    if (res.ok) {
      setEmail('')
      setIsModalOpen(true)  // ✅ Show the modal on success
    } else {
      Modal.error({
        title: 'Subscription Failed',
        content: data.error || 'Something went wrong 😢',
      });
    }
    setLoading(false)
  }
  return (
<>
<Navbar/>
<Layout>


<div className=" flex items-center px-5 md:px-0 flex-col gap-10 justify-center py-10">

  <h1 className="text-4xl py-20 text-center bg-gradient-to-r  from-black  to-red-500 text-transparent bg-clip-text italic ">
  There&apos;s joy in helping others have their lightbulb moment!  <br/>
I help women make the transition into a career in technology. <br/> 
If you have five years of experience and are looking for the blueprint, you&apos;ve made it! 
​
  </h1>

  <h1 className="text-black md:px-20 px-5 text-center text-xl uppercase">
  tum, enim a semper varius, purus lorem consequat ipsum, ut ultrices justo tellus eu ex. Maecenas vel pellentesque sapien. Nulla justo mauris, tempus faucibus dignissim nec, vulputate tempus ante. Nunc lectus ipsum, volutpat et sagittis sit amet, maximus nec tortor. Quisque aliquet nisi eu libero auctor tempus nec sed arcu. Donec lobortis, libero at faucibus lobortis, odio purus iaculis augue, non pharetra nisl dolor non ipsum. 
  </h1>
<form onSubmit={handleSubmit}>
<div className="flex md:flex-row md:gap-0 gap-4 flex-col my-5 md:px-0 px-10">
    <input
    type="email" 
    value={email} 
    onChange={handleEmailChange} 
    placeholder="Enter Your Email"
    className="bg-white border border-black text-black px-10 py-4 shadow-lg"
    />
    <button className="flex gap-3 items-center py-5 px-5 bg-red-500"
       type="submit"
       disabled={loading}>
      <hr className="w-5"/>
      <span className="font-bold uppercase">{loading ? 'Subscribing...' : 'Subscribe'}</span>
    </button>

  </div>
  {message && <p>{message}</p>}
</form>


  {/* Testimonial Part */}
  <div className="flex md:flex-row flex-col px-5 md:px-0 justify-between gap-10 text-black items-center">
    <div>
      <FaQuoteRight size={44} className="text-red-500" />
      <h1 className="text-2xl">
      “Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.”
      </h1>

      <div className="flex py-5 flex-col">
        <span className="font-bold">Jhon Doe</span>
        <span>client</span>
      </div>
    </div>

    <div>
      <FaQuoteRight size={44} className="text-red-500" />
      <h1 className="text-2xl">
      “Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.”
      </h1>

      <div className="flex py-5 flex-col">
        <span className="font-bold">Jhon Doe</span>
        <span>client</span>
      </div>
    </div>


    <div>
      <FaQuoteRight size={44} className="text-red-500" />
      <h1 className="text-2xl">
      “Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.”
      </h1>

      <div className="flex py-5 flex-col">
        <span className="font-bold">Jhon Doe</span>
        <span>client</span>
      </div>
    </div>
  </div>
</div>
</Layout>
<Footer/>

<Modal
        title="Thank you!"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        okText="Close"
      >
        <p>You have successfully subscribed  🎉</p>
      </Modal>
</>



  
  );
}
