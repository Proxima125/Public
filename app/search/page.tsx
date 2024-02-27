'use client'
import Header from '../header';
import Footer from '../footer';
import Background from '../background';
import Result from './result';
import Select from 'react-select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { V5datatype } from "@/jsonserver/types"
import { getv5datalist } from "./dataaccess/dataaccess"
import { SyntheticEvent } from "react";
import Image from 'next/image';

export default function Search() {

    const [isLoading, setIsLoading] = useState(true)
    let [V5datalist, setV5datalist] = useState<V5datatype[]>([]);
    let [searchCategory, setsearchCategory] = useState("partnum");
    let [searchStr, setsearchStr] = useState("");
    
    async function fetchData() {
        let data: V5datatype[] = await getv5datalist(searchCategory, searchStr);
        setV5datalist(data);
    };

    useEffect(() => {
        setIsLoading(true)
        fetchData();
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearchStr = async (e: SyntheticEvent) => {
        e.preventDefault();
        fetchData();
    };

    const selectoptions = [
        { value: 'partnum', label: 'Number' },
        { value: 'name', label: 'Name' }
    ]

    return (
        <body className="bg-[#dedac9]">
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
                            <div className="flex justify-center">
                                <div className="h-[4.5rem] w-[65vw] mt-[2.0rem] mb-[2.5rem] bg-[#00000010] flex justify-center items-center rounded-[1rem]">
                                    <form className="flex justify-between text-lg h-[2rem] w-[94%]" onSubmit={handleSearchStr}>
                                        <div className="flex items-center w-min mr-2 bg-[#00000000] border-b-[2px] border-[#292929]">
                                            <Select className="" options={selectoptions} unstyled={false} onChange={(e) => e == null ? console.log('Error: SearchCategorySelect') : setsearchCategory(e.value)} placeholder="" defaultValue={{ value: 'partnum', label: 'Number' }}
                                                styles={{
                                                    control: (baseStyles) => ({
                                                        ...baseStyles,
                                                        height: '100%',
                                                        border: 'none',
                                                        backgroundColor: 'none',
                                                        width: 'max-content',
                                                        boxShadow: 'none',
                                                    }),
                                                    singleValue: (baseStyles) => ({
                                                        ...baseStyles,
                                                        textOverflow: 'none',
                                                    }),
                                                    dropdownIndicator: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        color: state.isFocused ? '#00000050' : '#00000080',
                                                    }),
                                                    input: (baseStyles) => ({
                                                        ...baseStyles,
                                                        paddingBottom: 1,
                                                        caretColor: 'transparent',
                                                    }),
                                                    indicatorSeparator: (baseStyles) => ({
                                                        ...baseStyles,
                                                        backgroundColor: '#00000050',
                                                    }),
                                                    menuList: (baseStyles) => ({
                                                        ...baseStyles,
                                                        padding: 0,
                                                        backgroundColor: '#cccccc',
                                                    }),
                                                    option: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        backgroundColor: state.isFocused ? '#00000020' : '#00000000',
                                                        color: '#000000',
                                                        ':active': {
                                                            ...baseStyles[':active'],
                                                            backgroundColor: state.isFocused ? '#00000020' : '#00000000',
                                                        }
                                                    }),
                                                }}
                                                classNames={{
                                                    option: (state) =>
                                                        state.isDisabled ? 'bg-[#00000050]' : 'bg-[#00000000]',
                                                }}
                                            />
                                        </div>
                                        <div className="px-4 pb-1 w-full border-b-[2px] border-[#292929] h-full">
                                            <input className="w-full bg-[#29292900] border-none focus:outline-none hidden-search-cancel-button placeholder:text-[#292929a6]" type="search" placeholder="Search Word" value={searchStr} onChange={(e) => setsearchStr(e.target.value)}></input>
                                        </div>
                                        <button type="submit" className="px-2 h-full">
                                            <div className="h-[1.5rem] w-[1.5rem] flex justify-center items-center">
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </div>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="h-max">
                                {V5datalist.map((V5data: V5datatype, index: number) => (
                                    <div key={V5data.id}>
                                        <Result V5data={V5data} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className=""><Footer /></div>
                    </div>
                </div>
            }
        </body >
    )
}