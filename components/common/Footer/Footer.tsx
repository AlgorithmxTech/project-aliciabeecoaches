import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa6'
const Footer = () => {
    return (
        <div className='w-full bg-gray-900 py-10 text-white'>
            <div className='max-w-[1280px] mx-auto flex flex-col items-center gap-5'>
                <div className='flex items-center flex-col'>
                    <span>
                        Alice Bee Coaches
                    </span>
                    <span>
                        hello@alicebeecoaches.com
                    </span>
                    <span>2931 Ridge Rd Ste. 101 #643</span>
                    <span>Rockwall, TX 75189</span>
                </div>
                {/* social media links */}
                <div className='flex gap-5 '>
                    <FaFacebook size={34} className='text-red-500' />
                    <FaInstagram size={34} className='text-red-500' />
                    <FaTiktok size={34} className='text-red-500' />
                </div>

                <div className='flex  py-5 justify-between w-full items-center'>
                    <span>©2025 by ABC&apos;s of Agile with Alicia Bee.</span>
                    <span>Developed By Algorithmx </span>
                </div>

            </div>

        </div>
    )
}

export default Footer
