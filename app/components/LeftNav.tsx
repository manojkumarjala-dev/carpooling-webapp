'use client'
import React, { Dispatch, SetStateAction, useState } from 'react';
interface Props {
    setTab: Dispatch<SetStateAction<string>>
  }
function LeftNav(props:Props) {
    const [currentTab, setCurrentTab] = useState('viewPosting')
    const options = [
        {
            option: 'View Posting',
            id: 'viewPosting'
        },
        {
            option: 'Create Posting',
            id: 'createPosting'
        },
        {
            option: 'Manage my Posting',
            id: 'managePosting'
        },
    ];

    return (
        <div className='pt-2 sm:pt-0 sm:w-1/4 w-full'>
            <div className=' w-full justify-around flex sm:hidden'>
                {
                    options.map((option, index) => {
                        const isActive = option.id === currentTab;
                        const buttonClass = `text-black p-2 rounded-3xl ${isActive ? 'bg-gray-200 ' : ''}`;
                        return (
                            <button 
                                key={index} 
                                className={buttonClass}
                                onClick={()=>{setCurrentTab(option.id);props.setTab(option.id)}}
                                
                            >
                                {option.option}
                            </button>
                        );
                    })
                }
            </div>

        <div className='min-h-screen bg-gray-800 flex-col justify-between hidden sm:flex'>
            <div className='flex flex-col gap-2 mt-40'>
                {
                    options.map((option, index) => {
                        const isActive = option.id === currentTab;
                        const buttonClass = `text-white p-2 ${isActive ? 'bg-gray-500 ' : ''}`;
                        return (
                            <button 
                                key={index} 
                                className={buttonClass}
                                onClick={()=>{setCurrentTab(option.id);props.setTab(option.id)}}
                                
                            >
                                {option.option}
                            </button>
                        );
                    })
                }
            </div>
            <div className='text-center mb-8'>
                <button>Log Out</button>
            </div>
        </div>
        </div>
    );
}

export default LeftNav;
