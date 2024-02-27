'use client'

import Header from './header';
import Footer from './footer';
import Background from './background';
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false);
    }, 1700)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const ManualClick = () => {
    const link = document.createElement('a');
    link.href = "/部品表マニュアル.pptx";
    link.click();
  };
  return (
    <body className="">
      {isLoading ?
        /* Loading */
        <div className="h-screen w-screen relative bg-[#dedac9]">
          <Header />
          <div className="h-full w-full flex justify-center items-center">
            <Image className="object-contain bg-cover py-[30vh] animate-loadb" src="/icon.svg" alt="" fill />
          </div>
          <Footer />
        </div>
        :
        /* After Loading */
        <div className="h-screen w-screen relative text-[#292929]">
          <div className="absolute top-0 left-0 z-[-10]">
            <Background />
          </div>
          <div className="absolute">
            <div className=""><Header /></div>
            <div className="h-screen w-screen animate-loada">
              <div className='h-screen w-screen pt-14 pb-16 overflow-y-scroll hidden-scrollbar animate-loada'>
                <div className='flex h-screen w-screen justify-center items-center'>
                  <button className='border-b-[2px] border-[#000000] hover:border-[#00000030] px-8 pb-3 pt-6 translate-y-[-100%] transition-all duration-300 ease-in-out' onClick={ManualClick}>
                    マニュアルをダウンロード
                  </button>
                </div>
              </div>
            </div>
            <div className=""><Footer /></div>
          </div>
        </div>
      }
    </body>
  )
}
