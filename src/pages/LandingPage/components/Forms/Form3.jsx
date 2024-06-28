import React, { useEffect, useState } from 'react'

const Form3 = ({ form, handleSubmit }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (fieldName, value) => {
        setData(prevData => ({
            ...prevData,
            [fieldName]: value
        }));
    };
    useEffect(() => {
        console.log(form)
    }, [])
    return (
        <form className=''>
            {form?.fields?.map((field, index) => {
                return (
                    <div className="mb-6" key={`${field?._id}-${index}`}>
                        {field?.type === "textarea" ? (
                            <textarea
                                value={data[field?.label] || ''}
                                onChange={(e) => handleInputChange(field?.label, e.target.value)}
                                id={field?.label.toLowerCase()}
                                rows="4"
                                className="w-full px-4 py-3 bg-white rounded-3xl border border-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffcd73] focus:border-transparent sm:text-sm"
                                placeholder={field?.label}
                            ></textarea>
                        ) : (
                            <input
                                value={data[field?.label] || ''}
                                onChange={(e) => handleInputChange(field?.label, e.target.value)}
                                type={field?.type}
                                id={field?.label.toLowerCase()}
                                className="w-full px-4 py-3 bg-white rounded-3xl border border-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffcd73] focus:border-transparent sm:text-sm"
                                placeholder={field?.label}
                            />
                        )}
                    </div>
                );
            })}
            <button
                onClick={(e) => {
                    handleSubmit(e, form, data).then(res => {
                        res && setData({})
                    })
                }}
                type="submit"
                className="w-full bg-[#e9825c] text-white py-3 px-6 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Schedule a Meeting
            </button>
        </form>
    )
}

export default Form3