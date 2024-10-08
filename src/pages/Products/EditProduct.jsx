import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { doDELETE, doGET, doPOST, doPUT } from '../../utils/HttpUtil';
import { ENDPOINTS } from './Constant';
import { FORMENDPOINTS } from '../FormPage/Constant';
import { FieldENDPOINTS } from '../FieldPage/Constant';
import { Card } from 'reactstrap';
import { AppContext } from '../../services/context/AppContext';

const EditProduct = () => {
    const { productId, projectId } = useParams();
    const location = useLocation()
    const queryParams = useMemo(() => {
        return new URLSearchParams(location.search)
    }, [location.search])
    const project_id = queryParams.get("project")
    const navigate = useNavigate();
    const { success, error } = useContext(AppContext);
    const [product, setProduct] = useState({
        name: '',
        description: ''
    });
    const [forms, setForms] = useState([]);
    const [fields, setFields] = useState([]);
    const [parentForms, setParentForms] = useState([]);

    const fetchProduct = async () => {
        try {
            const response = await doGET(ENDPOINTS.getProductById(productId));
            setProduct({ ...response, product });
            // if (response?.parent) {
            // const formsResponse = await doGET(FORMENDPOINTS.getFormByProjectId(response?.parent));
            // setParentForms(formsResponse?.map(form => ({ ...form, parent: true })));
            //     const productForms = await doGET(FORMENDPOINTS.getFormByProjectId(productId));
            // }
            setForms(response?.forms);

        } catch (error) {
            console.error("Failed to fetch product", error);
        }
    };

    useEffect(() => {
        if (productId) {
            const fetchProjectForms = async () => {
                try {
                    const response = await doGET(ENDPOINTS.getFormByProjectId(productId ?? project_id));
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
                setForms(forms)
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

    const addUtmParameters = (formIndex,) => {
        const updatedForms = [...forms];
        updatedForms[formIndex].utmParameters.push("")
        setForms(updatedForms);
    }

    const removeUtmParameters = (formIndex, utmIndex) => {
        const updatedForms = [...forms];
        updatedForms[formIndex].utmParameters.splice(utmIndex, 1)
        setForms(updatedForms);
    }

    const handleUtmParameters = (formIndex, utmIndex,  value)=>{
        const updatedForms = [...forms];
        updatedForms[formIndex].utmParameters[utmIndex] = value;
        setForms(updatedForms);
    }

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
                navigate(`/products/edit/${id}?project=${projectId ?? project_id}`);
            }
            success(id ? "Product updated" : "Product created");

        } catch (error) {
            console.error("Failed to save product", error);
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
                response = await doPUT(FORMENDPOINTS.updateForm(form._id), { ...form, fields, project: projectId ?? project_id });
                updateProductForms(product.forms.map((item, index) => (index == formIndex ? response : item)))
            } else {
                response = await doPOST(FORMENDPOINTS.addForm, { ...form, fields, project: projectId ?? project_id, type: "product" });
                updateProductForms([...product.forms, response])
            }
            success(form?._id ? "Form updated" : "Form created");
        } catch (error) {
            console.error("Failed to save form", error);
        }
    };

    const handleToggle = (form) => {
        // setProduct(prev => ({ ...prev, useParentForms: !prev?.useParentForms,forms:[] }));
        const presentForm = product?.forms?.find(productForm => productForm?._id == form?._id);
        if (presentForm) {
            updateProductForms(product?.forms?.filter(form => form?._id != presentForm?._id))
        } else {
            updateProductForms([...product?.forms, form])
        }
    }

    const isFormSelected = (form) => product?.forms?.find(productForm => productForm?._id == form?._id);

    const handleDeleteForm = async (form) => {
        try {
            await doDELETE(ENDPOINTS.deleteForm(form?._id));
            fetchProduct();
        } catch (error) {

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
                            <form className='row' onSubmit={(e) => { e.preventDefault(); handleFormSubmit(formIndex, product._id); }}>
                                {/* {form?.parent ? <div className='d-flex align-items-center gap-2 my-2'>
                                    <input type='checkbox' checked={isFormSelected(form)} onChange={() => handleToggle(form)} name="Use Parent Forms" />
                                    <label className=''>Use Parent Form</label>
                                </div> : null} */}
                                <div className='col-8 pe-4'>
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
                                    <div className='d-flex gap-2'>
                                        {form?._id && !form?.parent ? <button disabled={form?.parent} onClick={() => handleDeleteForm(form)} type="submit" className="btn btn-danger">Delete Form</button> : null}
                                        <button disabled={form?.parent} type="submit" className="btn btn-primary">{form?._id ? "Update" : "Save"} Form</button>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <button type="button" className="btn btn-secondary mx-2" onClick={() => addUtmParameters(formIndex)}>Add UTM Parameters</button>
                                    {form?.utmParameters?.map((utm, utmIndex) => (
                                        <div className='d-flex' index={`${formIndex} + ${utmIndex}`}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={utm ?? ""}
                                                onChange={(e) => handleUtmParameters(formIndex, utmIndex, e.target.value)}
                                                placeholder="Enter UTM Parameter"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => removeUtmParameters(formIndex, utmIndex)}
                                            >
                                                Remove UTM
                                            </button>
                                        </div>

                                    ))}
                                </div>
                            </form>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EditProduct;
