// import React from 'react'

// const Form2 = ({ form, handleSubmit }) => {
//     return (
//         <div className="bg-[#ffcd73] py-8 rounded-3xl mx-12 sm:mx-20 mb-20">
//             <div className="container mx-auto px-4">
//                 <div className="flex flex-wrap items-center justify-between">
//                     <div className="w-full md:w-1/3 text-left mb-4 md:mb-0">
//                         <h2 className="text-3xl font-bold text-white dark:text-white">

//                             Start Your Property <br /> Purchase Jurney Now!
//                         </h2>
//                     </div>
//                     <div className="w-full md:w-2/3">
//                         <form className="flex flex-wrap items-center">
//                             <div className="relative mb-4 mr-4 flex-grow">
//                                 <input
//                                     type="text"
//                                     id="fullname"
//                                     className="block w-full px-4 pt-6 pb-2 border border-gray-100 rounded-3xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                     placeholder=" "
//                                 />
//                                 <label htmlFor="fullname" className="absolute top-0 left-0 px-4 pt-2 text-gray-700 text-sm">
//                                     Full Name
//                                 </label>
//                             </div>
//                             <div className="relative mb-4 mr-4 flex-grow">
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className="block w-full px-4 pt-6 pb-2 border border-gray-100 rounded-3xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                     placeholder=" "
//                                 />
//                                 <label htmlFor="email" className="absolute top-0 left-0 px-4 pt-2 text-gray-700 text-sm">
//                                     Email ID
//                                 </label>
//                             </div>
//                             <div className="relative mb-4 mr-4 flex-grow">
//                                 <div className="relative">
//                                     <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">+91 |</span>
//                                     <input
//                                         type="tel"
//                                         id="mobile"
//                                         className="block w-full px-4 pt-6 pb-2 border border-gray-100 rounded-3xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                         placeholder=" "
//                                     />
//                                     <label htmlFor="mobile" className="absolute top-0 left-0 pl-16 pt-2 text-gray-700 text-sm">
//                                         Mobile Number
//                                     </label>
//                                 </div>
//                             </div>
//                             <div className="flex items-center">
//                                 <button
//                                     type="submit"
//                                     className="bg-[#ff9d7a] text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-6 w-6"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth={2}
//                                             d="M5 12h14M12 5l7 7-7 7"
//                                         />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default Form2
import React, { useState } from 'react';

const Form2 = ({ form, handleSubmit }) => {
    const [data, setData] = useState({});

    const handleInputChange = (fieldName, value) => {
        setData(prevData => ({
            ...prevData,
            [fieldName]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(data);
    };

    return (
        <div className="bg-[#ffcd73] py-8 rounded-3xl mx-12 sm:mx-20 mb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="w-full md:w-1/3 text-left mb-4 md:mb-0">
                        <h2 className="text-3xl font-bold text-white dark:text-white">
                            Start Your Property <br /> Purchase Journey Now!
                        </h2>
                    </div>
                    <div className="w-full md:w-2/3">
                        <form className="flex flex-wrap items-center">
                            {form?.fields?.map((field, index) => {
                                return field?.type === "select" ? (
                                    <div className="relative mb-4 mr-4 flex-grow" key={`${field?._id}-${index}`}>
                                        <select
                                            value={data[field?.label] || ''}
                                            onChange={(e) => handleInputChange(field?.label, e.target.value)}
                                            id={field?.label.toLowerCase()}
                                            className="block w-full px-4 pt-6 pb-2 border border-gray-100 rounded-3xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#f6f2ec]"
                                        >
                                            <option>Select {field?.label}</option>
                                            {field?.options.map((option, optionIndex) => (
                                                <option key={optionIndex} value={option}>{option}</option>
                                            ))}
                                        </select>
                                        <label htmlFor={field?.label.toLowerCase()} className="absolute top-0 left-0 px-4 pt-2 text-gray-700 text-sm">
                                            {field?.label}
                                        </label>
                                    </div>
                                ) : (
                                    <div className="relative mb-4 mr-4 flex-grow" key={`${field?._id}-${index}`}>
                                        {field?.label === "Mobile Number" ? (
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">+91 |</span>
                                                <input
                                                    value={data[field?.label] || ''}
                                                    onChange={(e) => handleInputChange(field?.label, e.target.value)}
                                                    type={field?.type}
                                                    id={field?.label.toLowerCase()}
                                                    className="block w-full px-4 pt-6 pb-2 border border-gray-100 rounded-3xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#f6f2ec]"
                                                    placeholder=" "
                                                />
                                                <label htmlFor={field?.label.toLowerCase()} className="absolute top-0 left-0 pl-16 pt-2 text-gray-700 text-sm">
                                                    {field?.label}
                                                </label>
                                            </div>
                                        ) : (
                                            <input
                                                value={data[field?.label] || ''}
                                                onChange={(e) => handleInputChange(field?.label, e.target.value)}
                                                type={field?.type}
                                                id={field?.label.toLowerCase()}
                                                className="block w-full px-4 pt-6 pb-2 border border-gray-100 rounded-3xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#f6f2ec]"
                                                placeholder=" "
                                            />
                                        )}
                                        <label htmlFor={field?.label.toLowerCase()} className="absolute top-0 left-0 px-4 pt-2 text-gray-700 text-sm">
                                            {field?.label}
                                        </label>
                                    </div>
                                );
                            })}
                            <div className="flex items-center">
                                <button
                                    onClick={(e) => {
                                        handleSubmit(e, form, data).then(res => {
                                            res && setData({})
                                        })
                                    }}
                                    type="submit"
                                    className="bg-[#ff9d7a] text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 12h14M12 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form2;
