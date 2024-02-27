import Image from 'next/image'

export default function Background() {
    return (
        <div className="h-screen w-screen pt-14 pb-10 bg-[#dedac9] text-[#00000005]">
            <div className="w-max text-[12vh] opacity-[1.5%]">
                <Image className="object-contain py-[30vh]" src="/icon.svg" alt="" fill />
            </div>
        </div>
    )
}