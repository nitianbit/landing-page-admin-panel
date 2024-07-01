import React, { useState } from 'react';

const Form1 = ({ form, handleSubmit }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [phoneNo, setPhoneNo] = useState(null)


    const handleInputChange = (fieldName, value, type) => {
        setData(prevData => ({
            ...prevData,
            [fieldName]: value
        }));
        if ((type == "number" && (fieldName == "Phone" || fieldName == "phone")) ? value : null) {
            setPhoneNo((type == "number" && (fieldName == "Phone" || fieldName == "phone")) ? value : null)
        }
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
                            onChange={(e) => handleInputChange(field?.label, e.target.value, field?.type)}
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
                    handleSubmit(e, form, data, phoneNo).then(res => {
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

