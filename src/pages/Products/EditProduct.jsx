import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doGET, doPOST, doPUT } from '../../utils/HttpUtil';
import { ENDPOINTS } from './Constant';
import { FORMENDPOINTS } from '../FormPage/Constant';
import { FieldENDPOINTS } from '../FieldPage/Constant';
import { Card } from 'reactstrap';
import { AppContext } from '../../services/context/AppContext';

const EditProduct = () => {
    const { productId, projectId } = useParams();
    const navigate = useNavigate();
    const { success, error } = useContext(AppContext);
    const [product, setProduct] = useState({
        name: '',
        description: ''
    });
    const [forms, setForms] = useState([]);
    const [fields, setFields] = useState([]);
    const [parentForms, setParentForms] = useState([]);

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    const response = await doGET(ENDPOINTS.getProductById(productId));
                    setProduct(response);
                    if (response?.parent) {
                        const formsResponse = await doGET(FORMENDPOINTS.getFormByProjectId(response?.parent));
                        setParentForms(formsResponse?.map(form => ({ ...form, parent: true })));
                        const productForms = await doGET(FORMENDPOINTS.getFormByProjectId(productId));
                        setForms([...formsResponse?.map(form => ({ ...form, parent: true })), ...productForms]);
                    }

                } catch (error) {
                    console.error("Failed to fetch product", error);
                }
            };
            const fetchProjectForms = async () => {
                try {
                    const response = await doGET(ENDPOINTS.getFormByProjectId(productId));
                    setProduct(response);

                } catch (error) {
                    console.error("Failed to fetch product", error);
                }
            };
            const fetchFields = async () => {
                try {
                    const response = await doGET(FieldENDPOINTS.getFields);
                    setFields(response);
                } catch (error) {
                    console.error("Failed to fetch fields", error);
                }
            };
            fetchFields();
            fetchProduct();
        }

    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const updateProductForms = async (forms) => {
        try {
            let id = productId;
            if (id) {
                const response = await doPUT(ENDPOINTS.updateProduct(id), { ...product, forms });
                setProduct(response);
            }
        } catch (error) {
            console.error("Failed to save product", error);
            error(error)
        }
    }

    const handleFormChange = (index, key, value) => {
        const updatedForms = [...forms];
        updatedForms[index][key] = value;
        setForms(updatedForms);
    };

    const handleFieldChange = (formIndex, fieldIndex, key, value) => {
        const updatedForms = [...forms];
        updatedForms[formIndex].fields[fieldIndex][key] = value;
        setForms(updatedForms);
    };

    const handleRequiredFields = (formIndex, fieldId) => {
        const updatedForms = forms.map((form, index) => {

            if (index == formIndex) {
                let requiredFieldsArray = form?.requiredFields ?? [];

                const foundIndex = requiredFieldsArray.findIndex(requiredField => requiredField == fieldId);
                if (foundIndex != -1) {
                    requiredFieldsArray.splice(foundIndex, 1);
                } else requiredFieldsArray.push(fieldId);
                return { ...form, requiredFields: requiredFieldsArray }
            }
            return form
        })
        setForms(updatedForms)
    }

    const addForm = () => {
        setForms([...forms, { title: '', fields: [], product: product?._id }]);
    };

    const addFieldToForm = (formIndex) => {
        const updatedForms = [...forms];
        updatedForms[formIndex].fields.push({ _id: fields.length ? fields[0]._id : '' });
        setForms(updatedForms);
    };

    const removeFieldFromForm = (formIndex, fieldIndex) => {
        const updatedForms = [...forms];
        updatedForms[formIndex].fields.splice(fieldIndex, 1);
        setForms(updatedForms);
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            let id = productId;
            if (!product?.name) {
                return error('Please Enter all required Fields');
            }
            if (id) {
                await doPUT(ENDPOINTS.updateProduct(id), product);
            } else {
                const productResponse = await doPOST(ENDPOINTS.addProduct, { ...product, projectId });
                id = productResponse._id;
                setProduct(productResponse);
                // Update the URL with the new product ID
                navigate(`/products/edit/${id}`);
            }
            success(id ? "Product updated" : "Product created");

        } catch (error) {
            console.error("Failed to save product", error);
            error(error)
        }
    };

    const handleFormSubmit = async (formIndex) => {
        try {
            const form = forms[formIndex];
            const fields = form.fields.map(field => field?._id);
            if (!form?.title) {
                return error('Please Enter Form title');
            }
            let response = null
            if (form._id) {
                response = await doPUT(FORMENDPOINTS.updateForm(form._id), { ...form, fields, project: productId });
            } else {
                response = await doPOST(FORMENDPOINTS.addForm, { ...form, fields, project: productId });
            }
            updateProductForms([...product.forms, response?._id])
            success(form?._id ? "Form updated" : "Form created");
        } catch (error) {
            console.error("Failed to save form", error);
            error(error)
        }
    };

    const handleToggle = (form) => {
        // setProduct(prev => ({ ...prev, useParentForms: !prev?.useParentForms,forms:[] }));
        const presentForm = product?.forms?.find(id => id == form?._id);
        if (presentForm) {
            updateProductForms(Array.from(new Set(product?.forms?.filter(id => id != presentForm))))
        } else {
            updateProductForms(Array.from(new Set([...product?.forms, form?._id])))
        }
    }

    return (
        <div className='container'>
            <Card onSubmit={handleProductSubmit} className='mt-3 p-2 px-3'>
                <div className="mb-3">
                    <label className='mb-1 required'>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={product?.name}
                        onChange={handleChange}
                        placeholder="Enter Name"
                    />
                </div>
                <div className="mb-3">
                    <label className='mb-1'>Description</label>
                    <input
                        type="text"
                        name="description"
                        className="form-control"
                        value={product?.description}
                        onChange={handleChange}
                        placeholder="Enter Description"
                    />
                </div>
                <button onClick={handleProductSubmit} className="btn btn-outline-success align-self-start" style={{
                    position: "relative",
                    // width: productId ? "140px" : "120px"
                }}>{productId ? "Update" : "Save"} Product</button>
            </Card>


            <button onClick={addForm} className="btn btn-secondary mt-3">Add Form</button>

            {product?._id && (
                <div className='mt-3'>
                    {forms?.map((form, formIndex) => (
                        <Card key={formIndex} className="mb-3 px-4 py-2 row">
                            <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(formIndex, product._id); }}>
                                {form?.parent ? <div className='d-flex align-items-center gap-2 my-2'>
                                    <input type='checkbox' checked={product?.forms?.includes(form?._id)} onChange={() => handleToggle(form)} name="Use Parent Forms" />
                                    <label className=''>Use Parent Form</label>
                                </div> : null}
                                <div className='d-flex align-items-end my-2'>
                                    <div>
                                        <label className='mb-1 required'>Form Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            readOnly={form?.parent}
                                            value={form.title}
                                            onChange={(e) => handleFormChange(formIndex, 'title', e.target.value)}
                                            placeholder="Enter Form Title"
                                        />
                                    </div>
                                    <div>
                                        <label className='mb-1 ms-2 required'>Form Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            readOnly={form?.parent}
                                            value={form?.formIndex}
                                            onChange={(e) => handleFormChange(formIndex, 'formIndex', e.target.value)}
                                            placeholder="Enter Form Number"
                                        />
                                    </div>
                                    <button disabled={form?.parent} type="button" className="btn btn-secondary mx-2" onClick={() => addFieldToForm(formIndex)}>Add Field</button>
                                </div>
                                {form?.fields?.map((field, fieldIndex) => (
                                    <div key={fieldIndex} className="input-group mb-2 w-50">
                                        <select
                                            disabled={form?.parent}
                                            className="form-select"
                                            value={field?._id || ''}
                                            onChange={(e) => handleFieldChange(formIndex, fieldIndex, '_id', e.target.value)}
                                        >
                                            <option value="" disabled>Select a field</option>
                                            {fields?.map((f) => (
                                                <option key={f?._id} value={f?._id}>{f?.label}</option>
                                            ))}
                                        </select>
                                        <div className="form-check m-2">
                                            <input
                                                readOnly={form?.parent}
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={form?.requiredFields?.includes(field?._id) || false}
                                                onChange={(e) => handleRequiredFields(formIndex, field?._id)}
                                            />
                                            <label className="form-check-label">
                                                Is Required
                                            </label>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            disabled={form?.parent}
                                            onClick={() => removeFieldFromForm(formIndex, fieldIndex)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <div>
                                    <div className="form-check m-2">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"
                                            checked={form?.showOTP}
                                            disabled={form?.parent}
                                            onChange={(e) => handleFormChange(formIndex, 'showOTP', e.target.checked)}
                                        />
                                        <label class="form-check-label" for="flexCheckIndeterminate">
                                            Show OTP
                                        </label>
                                    </div>
                                </div>
                                <button disabled={form?.parent} type="submit" className="btn btn-primary">{form?._id ? "Update" : "Save"} Form</button>
                            </form>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EditProduct;
