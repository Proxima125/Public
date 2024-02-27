'use client'
import localFont from 'next/font/local';
const Koulen = localFont({ src: "../Koulen-Regular.ttf" })
import { useState } from "react";
import { Projectstype } from "@/jsonserver/types";

export default function Result({ Project }: { Project: Projectstype }) {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetailson = () => {
        {/*setShowDetails(!showDetails)*/ }
        setShowDetails(!showDetails)
    };
    const toggleDetailsoff = () => {
        {/*onMouseLeave*/ }
        setTimeout(() => {
            if (showDetails) {
                setShowDetails(false);
            }
        }, 4000);
    };

    return (
        <div>
            <div key={Project.id} className="flex justify-center mb-1">
                <div className="">
                    <div className={`w-[50vw] min-w-[25rem] pt-[0.5rem] pb-[0.5rem] px-3 rounded-lg group hover:bg-[#00000015] mb-1 overflow-hidden transition-all duration-500 ease-in-out ${showDetails ? 'h-[15rem]' : 'h-[4rem]'}`} onClick={toggleDetailson}>
                        <div className="w-full relative transition-all duration-200">
                            <div className={Koulen.className}>
                                <div className="relative">
                                    <div className="flex justify-between">
                                        <p className="w-max text-[2.3rem] tracking-[0.15rem] px-[0.75rem]">
                                            {Project.projectName}
                                        </p>
                                        <p　className="w-max text-[2.3rem] px-[0.35rem]">{showDetails ?"－":"＋"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`h-[60%] text-[0.8rem] transition-all hidden-scrollbar${showDetails ? 'animate-[fadein_0.55s_ease-in-out_forwards]' : 'h-0 animate-[fadeout_0.25s_ease-in-out_forwards]'}`}>
                            <div className="w-full border-b mt-1.5 mb-[1rem] border-[#00000030]"></div>
                            <p className="text-[1.2rem] px-[0.75rem]">{Project.projectdescription}</p>
                        </div>
                    </div>
                    <div className="w-full border-b border-[#292929]"></div>
                </div>
            </div>
        </div>
    )
}