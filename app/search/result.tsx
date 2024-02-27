'use client'
import localFont from 'next/font/local';
const LibreBarcode128 = localFont({ src: "../LibreBarcode128-Regular.ttf" })
const Koulen = localFont({ src: "../Koulen-Regular.ttf" })
const Inconsolata = localFont({ src: "../Inconsolata-Bold.ttf" })
import { useState } from "react";
import { V5datatype } from "@/jsonserver/types";

export default function Result({ V5data }: { V5data: V5datatype }) {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetailson = () => {
        {/*setShowDetails(!showDetails)*/}
        setShowDetails(false)
    };
    const toggleDetailsoff = () => {
    {/*onMouseLeave*/}
        setTimeout(() => {
            if (showDetails) {
                setShowDetails(false);
            }
        }, 4000);
    };

    const handleDoubleClick = (datalocation: string) => {
        const link = document.createElement('a');
        link.href = datalocation;
        link.download = datalocation;
        link.click();
    };
    return (
        <div>
            <div key={V5data.id} className="flex justify-center mb-1">
                <div className="">
                    <div className={`w-[70vw] min-w-[25rem] py-2 px-[0.75rem] rounded-lg group hover:bg-[#00000015] mb-1 overflow-hidden transition-all duration-500 ease-in-out ${showDetails ? 'h-[7.5rem]' : 'h-[4rem]'}`}
                        onClick={toggleDetailson} onDoubleClick={() => handleDoubleClick(V5data.datalocation)}>
                        <div className="w-full relative  transition-all duration-200">
                            <div className={Koulen.className}>
                                <div className="relative text-[1.05rem] tracking-[0.06rem]">
                                    <div className="flex">
                                        <p className="w-max">
                                            {V5data.name}
                                        </p>
                                        <div className="text-[0.65rem]">
                                            <p className="absolute bottom-0 pb-[0.17rem]">
                                                .{V5data.type}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={Inconsolata.className}>
                                <div className="h-[1.6rem] flex items-center overflow-hidden">
                                    <p className="text-[1.6rem] tracking-[0.1rem]">{V5data.partnum}</p>
                                </div>
                            </div>
                            <div className="absolute right-0 bottom-0 h-full">
                                <div className="flex items-center h-full">
                                    <div>
                                        <div className="h-[1.4rem] overflow-hidden text-[#29292990] text-[1.45rem]">
                                            <div className={LibreBarcode128.className}>{V5data.partnum}</div>
                                        </div>
                                        <p className="text-[0.8rem]">{V5data.regtime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`h-[3.5rem] overflow-y-auto text-[0.8rem] transition-all ${showDetails ? 'animate-[fadein_0.55s_ease-in-out_forwards]' : 'h-0 animate-[fadeout_0.25s_ease-in-out_forwards]'}`}>
                            <div className="w-full border-b mt-1.5 mb-1.5 border-[#00000030]"></div>
                            <p className="">詳細詳細詳細詳細詳細詳細詳細詳細詳細詳細詳細詳細詳細詳細詳細詳細詳細詳細詳細</p>
                            <p className="">詳細詳細詳細詳細詳細詳細詳細詳細詳細詳細詳細</p>
                        </div>
                    </div>
                    <div className="w-full border-b border-[#292929]"></div>
                </div>
            </div>
        </div>
    )
}