import React from 'react'

const ToggleButton = ({formType, setFormType}) => {
    const onToggle = (type)=>{
        setFormType(type)
    }
    return (
        <div className="container mt-4">
            <div className="btn-group btn-group-toggle" data-bs-toggle="buttons">
            <label className={`btn btn-secondary toggle-btn ${formType === "product" ? "active" : ""}`}>
                    <input type="radio" checked={formType === "product"} autocomplete="off" onClick={()=>{
                        onToggle("product")
                    }}/> Product
                </label>
                <label className={`btn btn-secondary toggle-btn ${formType === "client" ? "active" : ""}`}>
                    <input type="radio" checked={formType === "client"} autocomplete="off" onClick={()=>{
                        onToggle("client")
                    }}/> Client
                </label>
                <label className={`btn btn-secondary toggle-btn ${formType === "contact" ? "active" : ""}`}>
                    <input type="radio" checked={formType === "contact"} autocomplete="off" onClick={()=>{
                        onToggle("contact")
                    }}/> Contact
                </label>
                
            </div>
        </div>
    )
}

export default ToggleButton
