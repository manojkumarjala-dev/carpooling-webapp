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
        <div className='min-h-screen w-1/4 bg-gray-800 flex flex-col justify-between'>
            <div className='flex flex-col gap-2 mt-40'>
                {
                    options.map((option, index) => {
                        const isActive = option.id === currentTab;
                        const buttonClass = `p-2 ${isActive ? 'bg-gray-500 ' : ''}`;
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
    );
}

export default LeftNav;
