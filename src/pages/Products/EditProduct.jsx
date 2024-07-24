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

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    const response = await doGET(ENDPOINTS.getProductById(productId));
                    setProduct(response);

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

    const handleFormSubmit = async (formIndex, productIdInput) => {
        try {
            const form = forms[formIndex];
            const fields = form.fields.map(field => field?._id);
            if (!form?.title) {
                return error('Please Enter Form title');
            }
            if (form._id) {
                await doPUT(FORMENDPOINTS.updateForm(form._id), { ...form, fields, product: productIdInput });
            } else {
                await doPOST(FORMENDPOINTS.addForm, { ...form, fields, product: productIdInput });
            }
            success(form?._id ? "Form updated" : "Form created");
        } catch (error) {
            console.error("Failed to save form", error);
            error(error)
        }
    };

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
                <button onClick={handleProductSubmit} className="btn btn-outline-success" style={{
                    position: "relative",
                    width: productId ? "140px" : "120px"
                }}>{productId ? "Update" : "Save"} Product</button>
            </Card>

            {product?._id && (
                <div className='mt-3'>
                    {forms?.map((form, formIndex) => (
                        <Card key={formIndex} className="mb-3 px-4 py-2 row">
                            <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(formIndex, product._id); }}>
                                <div className='d-flex align-items-end my-2'>
                                    <div>
                                        <label className='mb-1 required'>Form Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={form.title}
                                            onChange={(e) => handleFormChange(formIndex, 'title', e.target.value)}
                                            placeholder="Enter Form Title"
                                        />
                                    </div>
                                    <button type="button" className="btn btn-secondary mx-2" onClick={() => addFieldToForm(formIndex)}>Add Field</button>
                                </div>
                                {form?.fields?.map((field, fieldIndex) => (
                                    <div key={fieldIndex} className="input-group mb-2 w-50">
                                        <select
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
                                            onChange={(e) => handleFormChange(formIndex, 'showOTP', e.target.checked)}
                                        />
                                        <label class="form-check-label" for="flexCheckIndeterminate">
                                            Show OTP
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">{form?._id ? "Update" : "Save"} Form</button>
                            </form>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EditProduct;
