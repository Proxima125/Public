'use client'
import Header from '@/app/header';
import Footer from '@/app/footer';
import Background from '@/app/background';
import { useEffect, useState } from "react";
import Image from 'next/image';

import Result from './result';
import { Projectstype } from "@/jsonserver/types"
import { getprojectlist } from "./dataacces/dataaccess"
import localFont from 'next/font/local';
const Koulen = localFont({ src: "../Koulen-Regular.ttf" })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  let [Projectlist, setProjectlist] = useState<Projectstype[]>([]);

  async function fetchData() {
    let data: Projectstype[] = await getprojectlist();
    setProjectlist(data);
  };

  useEffect(() => {
    setIsLoading(true)
    fetchData()
    setTimeout(() => {
      setIsLoading(false);
    }, 1700)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <div className="h-screen w-screen pt-14 pb-16 overflow-y-scroll hidden-scrollbar animate-loada">
              <div className=' mb-[2.5rem] tracking-[0.15rem] flex justify-center'>
                <div className={Koulen.className}>
                  <h1 className='text-[3.5rem] mt-[3rem]'>Projects</h1>
                </div>
              </div>
              <div className="w-screen pb-[2rem]">
                <div className="">
                  {Projectlist.map((Project: Projectstype, index: number) => (
                    <div key={Project.id}>
                      <Result Project={Project} />
                    </div>
                  ))}
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
