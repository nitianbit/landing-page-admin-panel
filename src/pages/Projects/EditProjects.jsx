import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doGET, doPOST, doPUT } from '../../utils/HttpUtil';
import { ENDPOINTS } from './Constant';
import { FORMENDPOINTS } from '../FormPage/Constant';
import { FieldENDPOINTS } from '../FieldPage/Constant';
import { Card } from 'reactstrap';

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState({
        name: '',
        description: ''
    });
    const [forms, setForms] = useState([]);
    const [fields, setFields] = useState([]);

    useEffect(() => {
        if (id) {
            const fetchProject = async () => {
                try {
                    const response = await doGET(ENDPOINTS.getProjectById(id));
                    setProject(response);

                    const formsResponse = await doGET(FORMENDPOINTS.getFormByProjectId(id));
                    setForms(formsResponse);
                } catch (error) {
                    console.error("Failed to fetch project", error);
                }
            };
            fetchProject();
        }
        const fetchFields = async () => {
            try {
                const response = await doGET(FieldENDPOINTS.getFields);
                setFields(response);
            } catch (error) {
                console.error("Failed to fetch fields", error);
            }
        };
        fetchFields();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({
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

    const addForm = () => {
        setForms([...forms, { title: '', fields: [], project: project?._id }]);
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

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        try {
            let projectId = id;
            if (projectId) {
                await doPUT(ENDPOINTS.updateProject(projectId), project);
            } else {
                const projectResponse = await doPOST(ENDPOINTS.addProject, project);
                projectId = projectResponse._id;
                setProject(projectResponse);
                // Update the URL with the new project ID
                navigate(`/projects/edit/${projectId}`);
            }
            // Submit forms after project creation/update
            forms.forEach((form, index) => {
                handleFormSubmit(index, projectId);
            });
        } catch (error) {
            console.error("Failed to save project", error);
        }
    };

    const handleFormSubmit = async (formIndex, projectId) => {
        try {
            const form = forms[formIndex];
            const fields = form.fields.map(field => field?._id);
            if (form._id) {
                await doPUT(FORMENDPOINTS.updateForm(form._id), { ...form, fields, project: projectId });
            } else {
                await doPOST(FORMENDPOINTS.addForm, { ...form, fields, project: projectId });
            }
        } catch (error) {
            console.error("Failed to save form", error);
        }
    };

    // const handleFormSubmit = async (formIndex, projectId) => {
    //     try {
    //         const form = forms[formIndex];
    //         const formattedFields = form.fields.map(field => ({ fieldId: field.fieldId }));
    //         if (form._id) {
    //             await doPUT(FORMENDPOINTS?.updateForm(form._id), { ...form, fields: formattedFields, project: projectId });
    //         } else {
    //             await doPOST(FORMENDPOINTS.addForm, { ...form, fields: formattedFields, project: projectId });
    //         }
    //     } catch (error) {
    //         console.error("Failed to save form", error);
    //     }
    // };

    return (
        <div className='container'>
            <Card onSubmit={handleProjectSubmit} className='mt-3 p-2 px-3'>
                <div className="mb-3">
                    <label className='mb-1'>Project Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={project?.name}
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
                        value={project?.description}
                        onChange={handleChange}
                        placeholder="Enter Description"
                    />
                </div>
                <div className="mb-3">
                    <label className='mb-1'>Enter Domain</label>
                    <input
                        type="text"
                        name="domain"
                        className="form-control"
                        value={project?.domain}
                        onChange={handleChange}
                        placeholder="Enter Domain"
                    />
                </div>
                <button onClick={handleProjectSubmit} className="btn btn-outline-success" style={{
                    position: "relative",
                    width: "120px"
                }}>Save Project</button>
            </Card>

            {project?._id && (
                <div className='mt-3'>
                    <button type="button" className="btn btn-primary ms-1 mb-2" onClick={addForm}>Add Form</button>
                    {forms?.map((form, formIndex) => (
                        <Card key={formIndex} className="mb-3 px-4 py-2">
                            <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(formIndex, project._id); }}>
                                <div className='d-flex align-items-end my-2'>
                                    <div>
                                        <label className='mb-1'>Form Title</label>
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
                                <button type="submit" className="btn btn-primary">Save Form</button>
                            </form>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EditProject;
