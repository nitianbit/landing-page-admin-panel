

// const Form1 = ({ form }) => {
//     return (
//         <form>
//             <div className="mb-6 mt-10">
//                 <input
//                     type="text"
//                     id="fullname"
//                     className="mt-1 block w-full px-3 py-2 border border-[#dddcdb] rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#f6f2ec]"
//                     placeholder="Full Name"
//                 />
//             </div>
//             <div className="mb-6">
//                 <input
//                     type="email"
//                     id="email"
//                     className="mt-1 block w-full px-3 py-2 border border-[#dddcdb] rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#f6f2ec]"
//                     placeholder="Email"
//                 />
//             </div>
//             <div className="mb-6">
//                 <input
//                     type="tel"
//                     id="mobile"
//                     className="mt-1 block w-full px-3 py-2 border border-[#dddcdb] rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#f6f2ec]"
//                     placeholder="Mobile Number"
//                 />
//             </div>
//             <div className="mb-6">
//                 <select
//                     id="state"
//                     className="mt-1 block w-full px-3 py-2 border border-[#dddcdb] rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#f6f2ec]"
//                 >
//                     <option>Select State</option>
//                     <option>State 1</option>
//                     <option>State 2</option>
//                 </select>
//             </div>
//             <div className="mb-6">
//                 <select
//                     id="city"
//                     className="mt-1 block w-full px-3 py-2 border border-[#dddcdb] rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#f6f2ec]"
//                 >
//                     <option>Select City</option>
//                     <option>City 1</option>
//                     <option>City 2</option>
//                 </select>
//             </div>
//             <div className="mb-6">
//                 <select
//                     id="property"
//                     className="mt-1 block w-full px-3 py-2 border border-[#dddcdb] rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#f6f2ec]"
//                 >
//                     <option>Select Property</option>
//                     <option>Property 1</option>
//                     <option>Property 2</option>
//                 </select>
//             </div>
//             <div className="mb-6">
//                 <select
//                     id="location"
//                     className="mt-1 block w-full px-3 py-2 border border-[#dddcdb] rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#f6f2ec]"
//                 >
//                     <option>Select Location</option>
//                     <option>Location 1</option>
//                     <option>Location 2</option>
//                 </select>
//             </div>
//             <div className="mb-6 flex items-center">
//                 <input
//                     type="checkbox"
//                     id="terms"
//                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
//                     I agree to terms and conditions
//                 </label>
//             </div>
//             <button
//                 type="submit"
//                 className="w-full bg-[#ffcd73] text-black text-xl py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//                 Schedule a Call
//             </button>
//         </form>
//     )
// }

// export default Form1

import React, { useState } from 'react';

const Form1 = ({ form, handleSubmit }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (fieldName, value) => {
        setData(prevData => ({
            ...prevData,
            [fieldName]: value
        }));
    };

    return (
        <form>
            {form?.fields?.map((field, index) => {
                return field?.type === "select" ? (
                    <div className="mb-6" key={`${field?._id}-${index}`}>
                        <select
                            value={data[field?.label] || ''}
                            onChange={(e) => handleInputChange(field?.label, e.target.value)}
                            id={field?.label.toLowerCase()}
                            className="mt-1 block w-full px-3 py-2 border border-[#dddcdb] rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#f6f2ec]"
                        >
                            <option>Select {field?.label}</option>
                            {field?.options.map((option, optionIndex) => (
                                <option key={optionIndex} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div className="mb-6" key={`${field?._id}-${index}`}>
                        <input
                            value={data[field?.label] || ''}
                            onChange={(e) => handleInputChange(field?.label, e.target.value)}
                            type={field?.type}
                            id={field?.label.toLowerCase()}
                            className="mt-1 block w-full px-3 py-2 border border-[#dddcdb] rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#f6f2ec]"
                            placeholder={field?.label}
                        />
                    </div>
                );
            })}
            <div className="mb-6 flex items-center">
                <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to terms and conditions
                </label>
            </div>
            <button
                onClick={(e) => {
                    handleSubmit(e, form, data).then(res => {
                        res && setData({})
                    })
                }}
                type="submit"
                className="w-full bg-[#ffcd73] text-black text-xl py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Schedule a Call
            </button>
        </form>
    );
};

export default Form1;

