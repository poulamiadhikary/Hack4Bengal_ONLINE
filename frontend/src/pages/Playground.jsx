import Navbar from "../components/Navbar";
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react"
import { useState } from "react";

function Playground() {

    const [option, setOption] = useState('preview');
    const [template, setTemplate] = useState('react');

    return (
        <>
            <div className={`w-full min-h-screen flex flex-col justify-start items-center relative pb-10 px-5`}>
                <Navbar />

                <h1 className={`text-center w-full mt-5 text-3xl font-bold duration-200 ease-in-out font-Titillium`}>Web Playground</h1>

                <div className={`w-full lg:w-auto mt-5 px-5 py-2 flex justify-start lg:justify-center rounded-full items-center gap-2 overflow-x-auto border-2 border-blue-500`}>
                    <p onClick={() => setTemplate('react')} className={`${template === 'react' ? "bg-blue-400 text-white" : "bg-white text-black"} cursor-pointer duration-200 ease-in-out px-4 py-2 rounded-full hover:bg-gray-200`}>React</p>
                    <p onClick={() => setTemplate('angular')} className={`${template === 'angular' ? "bg-blue-400 text-white" : "bg-white text-black"} cursor-pointer duration-200 ease-in-out px-4 py-2 rounded-full hover:bg-gray-200`}>Angular</p>
                    <p onClick={() => setTemplate('svelte')} className={`${template === 'svelte' ? "bg-blue-400 text-white" : "bg-white text-black"} cursor-pointer duration-200 ease-in-out px-4 py-2 rounded-full hover:bg-gray-200`}>Svelte</p>
                    <p onClick={() => setTemplate('static')} className={`${template === 'static' ? "bg-blue-400 text-white" : "bg-white text-black"} cursor-pointer duration-200 ease-in-out px-4 py-2 rounded-full hover:bg-gray-200`}>Static</p>
                    <p onClick={() => setTemplate('vue')} className={`${template === 'vue' ? "bg-blue-400 text-white" : "bg-white text-black"} cursor-pointer duration-200 ease-in-out px-4 py-2 rounded-full hover:bg-gray-200`}>Vue</p>
                    <p onClick={() => setTemplate('solid')} className={`${template === 'solid' ? "bg-blue-400 text-white" : "bg-white text-black"} cursor-pointer duration-200 ease-in-out px-4 py-2 rounded-full hover:bg-gray-200`}>Solid</p>
                </div>

                <div className={`w-full py-3 border-b-[1px] border-black mt-5 flex justify-start md:justify-center items-start gap-2 rounded-md lg:rounded-lg `}>
                    <p onClick={() => setOption('preview')} className={`${option === 'preview' ? "bg-blue-700 text-white" : "bg-white text-black"} px-4 text-[12px] py-2 rounded-full cursor-pointer`}>Preview</p>
                    <p onClick={() => setOption('code')} className={`${option === 'code' ? "bg-blue-700 text-white" : "bg-white text-black"} px-4 text-[12px] py-2 rounded-full cursor-pointer`}>Code</p>
                </div>

                {/* react */}
                {template === 'react' && <div className={`w-full h-auto lg:h-[80vh] mt-5 bg-gray-200`}>
                    <SandpackProvider theme="dark" template="react">
                        <SandpackLayout className="md:h-[80vh]">
                            <SandpackFileExplorer style={{ height: '100%' }} />
                            {option === 'code' && <SandpackCodeEditor theme="dark" style={{ height: '100%' }} showTabs
                                showLineNumbers={true}
                                showInlineErrors
                                wrapContent
                                closableTabs />}
                            {option === 'preview' && <SandpackPreview style={{ height: '100%' }} />}
                        </SandpackLayout>
                    </SandpackProvider>
                </div>}

                {/* angular */}
                {template === 'angular' && <div className={`w-full h-auto lg:h-[80vh] mt-5 bg-gray-200`}>
                    <SandpackProvider theme="dark" template="angular">
                        <SandpackLayout className="md:h-[80vh]">
                            <SandpackFileExplorer style={{ height: '100%' }} />
                            {option === 'code' && <SandpackCodeEditor theme="dark" style={{ height: '100%' }} showTabs
                                showLineNumbers={true}
                                showInlineErrors
                                wrapContent
                                closableTabs />}
                            {option === 'preview' && <SandpackPreview style={{ height: '100%' }} />}
                        </SandpackLayout>
                    </SandpackProvider>
                </div>}

                {/* svelte */}
                {template === 'svelte' && <div className={`w-full h-auto lg:h-[80vh] mt-5 bg-gray-200`}>
                    <SandpackProvider theme="dark" template="svelte">
                        <SandpackLayout className="md:h-[80vh]">
                            <SandpackFileExplorer style={{ height: '100%' }} />
                            {option === 'code' && <SandpackCodeEditor theme="dark" style={{ height: '100%' }} showTabs
                                showLineNumbers={true}
                                showInlineErrors
                                wrapContent
                                closableTabs />}
                            {option === 'preview' && <SandpackPreview style={{ height: '100%' }} />}
                        </SandpackLayout>
                    </SandpackProvider>
                </div>}

                {/* static */}
                {template === 'static' && <div className={`w-full h-auto lg:h-[80vh] mt-5 bg-gray-200`}>
                    <SandpackProvider theme="dark" template="static">
                        <SandpackLayout className="md:h-[80vh]">
                            <SandpackFileExplorer style={{ height: '100%' }} />
                            {option === 'code' && <SandpackCodeEditor theme="dark" style={{ height: '100%' }} showTabs
                                showLineNumbers={true}
                                showInlineErrors
                                wrapContent
                                closableTabs />}
                            {option === 'preview' && <SandpackPreview style={{ height: '100%' }} />}
                        </SandpackLayout>
                    </SandpackProvider>
                </div>}

                {/* vue */}
                {template === 'vue' && <div className={`w-full h-auto lg:h-[80vh] mt-5 bg-gray-200`}>
                    <SandpackProvider theme="dark" template="vue">
                        <SandpackLayout className="md:h-[80vh]">
                            <SandpackFileExplorer style={{ height: '100%' }} />
                            {option === 'code' && <SandpackCodeEditor theme="dark" style={{ height: '100%' }} showTabs
                                showLineNumbers={true}
                                showInlineErrors
                                wrapContent
                                closableTabs />}
                            {option === 'preview' && <SandpackPreview style={{ height: '100%' }} />}
                        </SandpackLayout>
                    </SandpackProvider>
                </div>}

                {/* solid */}
                {template === 'solid' && <div className={`w-full h-auto lg:h-[80vh] mt-5 bg-gray-200`}>
                    <SandpackProvider theme="dark" template="solid">
                        <SandpackLayout className="md:h-[80vh]">
                            <SandpackFileExplorer style={{ height: '100%' }} />
                            {option === 'code' && <SandpackCodeEditor theme="dark" style={{ height: '100%' }} showTabs
                                showLineNumbers={true}
                                showInlineErrors
                                wrapContent
                                closableTabs />}
                            {option === 'preview' && <SandpackPreview style={{ height: '100%' }} />}
                        </SandpackLayout>
                    </SandpackProvider>
                </div>}


            </div>
        </>
    )
}

export default Playground
