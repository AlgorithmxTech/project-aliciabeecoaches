import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa6'
import petrionImage from '../../../public/images/patrion_icon.svg'
import Image from 'next/image'
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
                    <div className='rounded-full p-2 bg-red-500 '>
                        <FaInstagram size={24} className=' text-black' />
                    </div>
                    <div className='rounded-full p-2 bg-red-500 '>
                        <FaTiktok size={24} className='text-black' />
                    </div>
                    <div className='rounded-full p-2 bg-red-500 '>
                        <Image
                            src={petrionImage}
                            alt='patreon_logo'
                            className='w-[24px] h-[24px]'
                        />
                    </div>

                </div>

                <div className="flex py-5 justify-between w-full items-center">
                    <span>©2025 by ABC&apos;s of Agile with Alicia Bee Coaches.</span>
                    <span>
                        Developed by{' '}
                        <a
                            href="https://algorithmx.tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Algorithmx
                        </a>
                    </span>
                </div>


            </div>

        </div>
    )
}

export default Footer
