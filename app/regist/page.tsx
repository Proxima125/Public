'use client'
import Header from '../header';
import Footer from '../footer';
import Background from '@/app/background';

import { useEffect, useState } from "react";
import { V5datatype, Projectstype } from "@/jsonserver/types"
import { addv5datalist, getProjectslist, getNextCharCode } from "./dataaccess/dataaccess"
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import Select from 'react-select';
import localFont from 'next/font/local';
import { useRouter } from 'next/navigation'

const Inconsolata = localFont({ src: "../Inconsolata-Light.ttf" })

export default function Regist() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)
  const [isProjectslist, setisProjectslist] = useState<Projectstype[]>([]);
  let [inputProject, setinputProject] = useState("");
  let [inputCategory, setinputCategory] = useState("");
  let [inputPartcode, setinputPartcode] = useState("");
  let [inputName, setinputName] = useState("XXXX");
  let [inputChange, setinputChange] = useState("");
  let [inputPosition, setinputPosition] = useState("");
  let [isanimationCategory, setisanimationCategory] = useState(false);
  let [isanimationPartcode, setisanimationPartcode] = useState(false);
  let [isanimationPosition, setisanimationPosition] = useState(false);
  let [isanimationbutton, setisanimationbutton] = useState(false);
  let [Partcodeselectoptions, setPartcodeselectoptions] = useState<{ value: string; label: string; }[]>([]);
  let [Positionselectoptions, setPositionselectoptions] = useState<{ value: string; label: string; }[]>([]);
  let [file, setFile] = useState<File>()
  const [FileSelected, setFileSelected] = useState(false);

  //Project
  const fetchProjectslist = async () => {
    setisProjectslist(await getProjectslist())
  }
  const Projectselectoptions = isProjectslist.map((project) => ({
    value: project.projectName,
    label: project.projectName,
  }));
  const handleinputchangeProject = (value: string) => {
    setinputProject(value)
    setinputName(value)
    setinputCategory("")
    setinputPartcode("")
    setinputPosition("")
    setinputChange("")
    setPositionselectoptions([])
    setisanimationCategory(true)
    setisanimationPartcode(false)
    setisanimationPosition(false)
    setisanimationbutton(false)
  };

  //Category
  const Categoryselectoptions = [
    { value: 'M', label: 'M' },
    { value: 'P', label: 'P' },
    { value: 'F', label: 'F' },
    { value: 'E', label: 'E' },
  ]
  const handleinputchangeCategory = (value: string) => {
    setinputCategory(value)
    let options
    if (value === "M") {
      options = Array.from({ length: 13 }, (_, index) => ({
        value: String(index + 1).padStart(2, '0'),
        label: String(index + 1).padStart(2, '0'),
      }));
    } else if (value === "P") {
      options = Array.from({ length: 23 }, (_, index) => ({
        value: String(index + 1).padStart(2, '0'),
        label: String(index + 1).padStart(2, '0'),
      }));
    } else if (value === "F") {
      options = Array.from({ length: 10 }, (_, index) => ({
        value: String(index + 1).padStart(2, '0'),
        label: String(index + 1).padStart(2, '0'),
      }));
    } else if (value === "E") {
      options = Array.from({ length: 8 }, (_, index) => ({
        value: String(index + 1).padStart(2, '0'),
        label: String(index + 1).padStart(2, '0'),
      }));
    } else {
      options = [{
        value: 'Error',
        label: 'エラーが発生しています。画面を閉じてください。',
      }]
    }
    setinputName(inputProject)
    setinputPartcode("")
    setinputPosition("")
    setinputChange("")
    setPartcodeselectoptions(options)
    setPositionselectoptions([])
    setisanimationPartcode(true)
    setisanimationPosition(false)
    setisanimationbutton(false)
  };

  //Partcode
  const PaetcodeToName: Record<string, { name: string, selectposition: boolean }> = {
    'M01': { name: 'MOTOR', selectposition: false },
    'M02': { name: 'MOTOR MOUNT', selectposition: false },
    'M03': { name: 'MISSION', selectposition: false },
    'M04': { name: 'TIRE', selectposition: true },
    'M05': { name: 'WHEEL', selectposition: true },
    'M06': { name: 'FRONT WHEEL GARNISH', selectposition: true },
    'M07': { name: 'REAR WHEEL GARNISH', selectposition: true },
    'M08': { name: 'WHEEL COVER', selectposition: true },
    'M09': { name: 'SUSPENSION', selectposition: true },
    'M10': { name: 'BRAKE DISK', selectposition: true },
    'M11': { name: 'FRONT AXLE', selectposition: true },
    'M12': { name: 'REAR AXLE', selectposition: true },
    'M13': { name: 'STEERING COLUMN', selectposition: false },
    'P01': { name: 'BULKHEAD', selectposition: false },
    'P02': { name: 'DAMPER HOUSING', selectposition: true },
    'P03': { name: 'SIDE FRAME', selectposition: false },
    'P04': { name: 'FLOOR PANEL', selectposition: false },
    'P05': { name: 'HOOD', selectposition: false },
    'P06': { name: 'FENDER', selectposition: true },
    'P07': { name: 'ROOF PANEL', selectposition: false },
    'P08': { name: 'OUTER PANEL', selectposition: true },
    'P09': { name: 'FRONT DOOR', selectposition: true },
    'P10': { name: 'REAR DOOR', selectposition: true },
    'P11': { name: 'TAILGATE', selectposition: false },
    'P12': { name: 'TAILGATE KNOB', selectposition: false },
    'P13': { name: 'FRONT BUMPER', selectposition: false },
    'P14': { name: 'FRONT GRILL', selectposition: false },
    'P15': { name: 'COWL TOP', selectposition: false },
    'P16': { name: 'REAR BUMPER', selectposition: false },
    'P17': { name: 'DOOR MIRROR', selectposition: true },
    'P18': { name: 'FRONT GLASS', selectposition: false },
    'P19': { name: 'FRONT QUARTER GLASS', selectposition: true },
    'P20': { name: 'FRONT DOOR GLASS', selectposition: true },
    'P21': { name: 'REAR DOOR GLASS', selectposition: true },
    'P22': { name: 'REAR GLASS', selectposition: false },
    'P23': { name: 'REAR QUARTER GLASS', selectposition: true },
    'F01': { name: 'INSTRUMENT PANEL', selectposition: false },
    'F02': { name: 'DASHBOARD', selectposition: false },
    'F03': { name: 'CONSOLE', selectposition: false },
    'F04': { name: 'CONTROL LEVER', selectposition: false },
    'F05': { name: 'STEERING WHEEL', selectposition: false },
    'F06': { name: 'FRONT SEAT', selectposition: true },
    'F07': { name: 'REAR SEAT', selectposition: true },
    'F08': { name: 'CARPET', selectposition: false },
    'F09': { name: 'CARGO BOARD', selectposition: false },
    'F10': { name: 'BOX', selectposition: false },
    'E01': { name: 'BATTERY', selectposition: false },
    'E02': { name: 'WIRE HARNESS', selectposition: false },
    'E03': { name: 'HEADLIGHT', selectposition: true },
    'E04': { name: 'TAIL LIGHT', selectposition: true },
    'E05': { name: 'METER', selectposition: false },
    'E06': { name: 'CAR NAVIGATION', selectposition: false },
    'E07': { name: 'AIR CONDITIONER', selectposition: false },
    'E08': { name: 'SPEAKER', selectposition: true },
  };
  const PaetcodeToChange = async (code: string) => {
    const partnum = `${inputProject}-${code}`
    const json = await getNextCharCode(partnum)
    if (json.length === 0) {
      return 'A'
    } else {
      const sortedjson = json.sort((a, b) => a.partnum.localeCompare(b.partnum));
      const lastElementPartnumCharCode = sortedjson[sortedjson.length - 1].partnum[8].charCodeAt(0) + 1
      const alphabet = String.fromCharCode(lastElementPartnumCharCode)
      return alphabet
    }
  };
  const handleinputchangePartcode = async (value: string) => {
    setinputPartcode(value)
    let key = `${inputCategory}${value}`
    setinputChange(await PaetcodeToChange(key))
    let name = `${inputProject} ${PaetcodeToName[key].name} ${await PaetcodeToChange(key)}`
    setinputName(name)
    let bool = PaetcodeToName[key].selectposition
    if (bool) {
      setinputPosition('')
      setPositionselectoptions([
        { value: 'R', label: 'R' },
        { value: 'L', label: 'L' },
      ])
      setisanimationPosition(true)
      setisanimationbutton(false)
    } else {
      setinputPosition('N')
      setPositionselectoptions([])
      setisanimationbutton(true)
    }
  };

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
    fetchProjectslist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Position
  const handleinputchangePosition = async (value: string) => {
    setinputPosition(value)
    setisanimationbutton(true)
  };

  function getprocessedDate(): string {
    const currentDate = new Date();
    const year = String(currentDate.getFullYear()).slice(-2);
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const processedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return processedDate;
  }
  function getprocessedPartnum(inputProject: string, inputCategory: string, inputPartcode: string, inputChange: string, inputPosition: string): string {
    const processedPartnum = `${inputProject}-${inputCategory}${inputPartcode}${inputChange}-${inputPosition}`;
    return processedPartnum;
  }

  function getFileExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      return fileName.slice(lastDotIndex + 1);
    }
    return '';
  }
  async function sendclick(inputProject: string, inputCategory: string, inputPartcode: string, inputChange: string, inputPosition: string) {
    if (
      !inputProject.trim() ||
      !inputCategory.trim() ||
      !inputPartcode.trim() ||
      !inputChange.trim() ||
      !inputPosition.trim()
    ) {
      alert('すべての項目を選択してください。');
      return;
    }
    if (!file) {
      alert('ファイルを選択してください。');
      return
    }

    try {
      const data = new FormData()
      data.set('file', file)
      data.set('name', getprocessedPartnum(inputProject, inputCategory, inputPartcode, inputChange, inputPosition))
      const res = await fetch('/api/dataaccess', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      // Handle errors here
      console.error(e)
      alert('エラーが発生しました。登録できません。')
      return
    }
    const fileExtension = getFileExtension(file.name);
    let addcontent: V5datatype = {
      "id": uuidv4(),
      "name": inputName,
      "category": inputCategory,
      "partnum": getprocessedPartnum(inputProject, inputCategory, inputPartcode, inputChange, inputPosition),
      "type": fileExtension,
      "datalocation": `/${getprocessedPartnum(inputProject, inputCategory, inputPartcode, inputChange, inputPosition)}.${fileExtension}`,
      "regtime": getprocessedDate(),
      "project": inputProject
    };
    await addv5datalist(addcontent);
    alert(getprocessedPartnum(inputProject, inputCategory, inputPartcode, inputChange, inputPosition) + 'を登録しました。');
    router.push('/search')
  };

  const handleFileButtonClick = () => {
    // ボタンがクリックされたときの処理
    const inputElement = document.querySelector("#inputfile") as HTMLInputElement | null;
    if (inputElement) {
      inputElement.click();
    }
    setFileSelected(true);
  };

  return (
    <body className="h-min w-screen">
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
        <div>
          <div className=""><Header /></div>
          <div className="absolute top-0 left-0 z-[-10]">
            <Background />
          </div>
          <div className="h-screen w-screen pt-14 pb-7 text-[#000000] flex-col justify-center animate-loada overflow-hidden">
            <div className='w-full'>
              <div className={Inconsolata.className}>
                <div className='flex justify-center items-center h-[14rem] w-full mt-[2.0rem]'>
                  <div className='w-[35vw] min-w-[650px] bg-[#00000010] p-[2rem] rounded-[1rem]'>
                    <div className='flex w-full border-b-[1px] border-[#000000]'>
                      <div className='relative'>
                        <p className='absolute pl-2 bottom-0 text-[1.3rem]'>PartName</p>
                        <p className='ml-[10rem] text-[1.8rem]'>{inputName}</p>
                      </div>
                    </div>
                    <div className='pt-[1rem] flex border-b-[1px] border-[#000000]'>
                      <div className='relative'>
                        <p className='absolute pl-2 bottom-0 text-[1.3rem]'>PartNumber</p>
                        <p className='ml-[10rem] text-[1.8rem]'>{`${inputProject}-${inputCategory}${inputPartcode}${inputChange}-${inputPosition}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='my-[1rem]'></div>
            <div className="w-full flex justify-center items-center">
              <div className="w-[40vw] min-w-[540px]">
                <div className={Inconsolata.className}>
                  <div className='text-[1.5rem]'>
                    <div className='flex justify-between items-center'>
                      <p>Please select a Project.</p>
                      <Select className="border-b-[1px] border-[#00000050]" value={{ value: inputProject, label: inputProject }} options={Projectselectoptions} unstyled={false} onChange={(e) => e == null ? console.log('Error: SearchCategorySelect') : handleinputchangeProject(e.value)} placeholder="" defaultValue={{ value: '', label: '' }}
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            height: '100%',
                            border: 'none',
                            backgroundColor: 'none',
                            width: '12rem',
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
                        }} />
                    </div>

                    <div className={`flex justify-between items-center overflow-y-hidden ${inputProject === "" ? 'h-0 w-0' : 'overflow-y-visible'}`}>
                      <p className={`${isanimationCategory === true ? 'animate-fadein' : ''}`}>Please select a Category.</p>
                      <Select className={`border-b-[1px] border-[#00000050] ${isanimationCategory === true ? 'animate-fadein' : ''}`} value={{ value: inputCategory, label: inputCategory }} options={Categoryselectoptions} unstyled={false} onChange={(e) => e == null ? console.log('Error: SearchCategorySelect') : handleinputchangeCategory(e.value)} placeholder="" defaultValue={{ value: '', label: '' }}
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            height: '100%',
                            border: 'none',
                            backgroundColor: 'none',
                            width: '12rem',
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
                        }} />
                    </div>

                    <div className={`flex justify-between items-center overflow-y-hidden ${inputCategory === "" ? 'h-0 w-0' : 'overflow-y-visible'}`}>
                      <p className={`${isanimationPartcode === true ? 'animate-fadein' : ''}`}>Please select a Partcode.</p>
                      <Select className={`border-b-[1px] border-[#00000050] ${isanimationPartcode === true ? 'animate-fadein' : ''}`} value={{ value: inputPartcode, label: inputPartcode }} options={Partcodeselectoptions} unstyled={false} onChange={(e) => e == null ? console.log('Error: SearchCategorySelect') : handleinputchangePartcode(e.value)} placeholder="" defaultValue={{ value: '', label: '' }}
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            height: '100%',
                            border: 'none',
                            backgroundColor: 'none',
                            width: '12rem',
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
                        }} />
                    </div>

                    <div className={`flex justify-between items-center overflow-y-hidden ${Positionselectoptions.length === 0 ? 'h-0 w-0' : 'overflow-y-visible'}`}>
                      <p className={`${isanimationPosition === true ? 'animate-fadein' : ''}`}>Please select a Position.</p>
                      <Select className={`border-b-[1px] border-[#00000050] ${isanimationPosition === true ? 'animate-fadein' : ''}`} value={{ value: inputPosition, label: inputPosition }} options={Positionselectoptions} unstyled={false} onChange={(e) => e == null ? console.log('Error: SearchCategorySelect') : handleinputchangePosition(e.value)} placeholder="" defaultValue={{ value: '', label: '' }}
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            height: '100%',
                            border: 'none',
                            backgroundColor: 'none',
                            width: '12rem',
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
                        }} />
                    </div>

                  </div>
                </div>
                <div className={`w-full ${isanimationbutton === true ? 'animate-fadein' : 'hidden'}`}>
                  <button className='w-full h-[6rem] mt-10 rounded-lg bg-[#00000010]' onClick={handleFileButtonClick}>
                    {FileSelected ? <p className='animate-fadein'>{file?.name}</p> : <p>Click to select file</p>}
                  </button>
                  <input
                    style={{ display: 'none' }}
                    id="inputfile"
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                  />
                </div>
                <div className={`w-full ${FileSelected === true ? 'animate-fadein' : 'hidden'}`}>
                  <button onClick={() => sendclick(inputProject, inputCategory, inputPartcode, inputChange, inputPosition)} className={`overflow-y-hidden mt-[3rem] ${inputPosition === "" ? 'h-0 w-0' : 'w-[16%] mx-[42%] h-[3rem] border-b-[2px] border-[#000000] overflow-y-visible hover:border-[#00000030] transition-all duration-300 ease-in-out'}`}>
                    <span className="translate-x-[-50%] translate-y-[-50%]">Regist</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=""><Footer /></div>
        </div>
      }
    </body >
  )
}