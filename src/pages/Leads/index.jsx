import React, { useState, useEffect } from 'react';
import { ENDPOINTS } from './Constant.js'; // Assuming doGET is a function to make GET requests
import { doGET } from '../../utils/HttpUtil.jsx';
import { LeadsTable } from '../../components'

const Leads = () => {
    const [leads, setLeads] = useState(null);
    const [projects, setProjects] = useState(null);
    const [formsByProject, setFormsByProject] = useState(null);
    const [projectFormValue, setProjectFormValue] = useState({
        leads: null,
        headers: null,
        formId: null,
        projectId: null
    });
    const [products, setProducts] = useState([]);

    const getProductByProject = async (projectId) => {
        try {
            const response = await doGET(ENDPOINTS.getProductsByProject(projectId));
            setProducts(response)
        } catch (error) {

        }
    }

    const getProjects = async () => {
        try {
            const response = await doGET(ENDPOINTS.getProjects);
            if (response) {
                setProjects(response);
                setProjectFormValue((prev) => ({
                    ...prev,
                    projectId: response[0]?._id || null
                }));
                getProductByProject(response[0]?._id)
            }
        } catch (error) {
            console.error("Error fetching projects: ", error);
        }
    };

    const getProjectFormLeads = async (refererId) => {
        try {
            const response = await doGET(ENDPOINTS.getProjectFormLead(projectFormValue?.projectId, projectFormValue?.formId, refererId));
            if (response) {
                // setProjects(response);
                setProjectFormValue((prev) => ({
                    ...prev,
                    data: response?.filter((lead) => lead?.refererId === refererId)
                }));
                // setProjectFormValue(response?.values)
            }
        } catch (error) {
            console.error("Error fetching projects: ", error);
        }
    };

    const getFormByProjectId = async () => {
        try {
            const response = await doGET(ENDPOINTS.getFormByProjectId(projectFormValue.projectId));
            if (response) {
                setFormsByProject(response);
                setProjectFormValue((prev) => ({
                    ...prev,
                    formId: response[0]?._id || null
                }));
            }
        } catch (error) {
            console.error("Error fetching forms by project ID: ", error);
        }
    };


    const filterFormHeaders = () => {
        const form = formsByProject?.find((form) => form?._id === projectFormValue?.formId);
        if (form) {
            setProjectFormValue((prev) => ({
                ...prev,
                headers: form?.fields ?? []
            }));

        }
    };

    useEffect(() => {
        getProjects();
    }, []);



    useEffect(() => {
        if (projectFormValue.projectId) {
            getFormByProjectId();
        }
    }, [projectFormValue.projectId]);

    useEffect(() => {
        if (projectFormValue.projectId && projectFormValue.formId) {
            getProjectFormLeads();
        }
        if (projectFormValue?.formId) {
            filterFormHeaders();
        }
    }, [projectFormValue.formId, projectFormValue.projectId]);

    return (
        <div className='w-100'>
            <div className='d-flex'>
                {projects && (
                    <div className="m-3">
                        <label className='mb-1'>Projects</label>
                        <select
                            className="form-select"
                            value={projectFormValue?.projectId}
                            onChange={(e) => setProjectFormValue((prev) => ({ ...prev, projectId: e.target.value }))}
                        >
                            <option selected>Open this select Project</option>
                            {projects?.map((item) => (
                                <option key={item?._id} value={item._id}>
                                    {item?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="m-3">
                    <label className='mb-1'>Products</label>
                    <select
                        className="form-select"
                        value={projectFormValue?.refererId}
                        onChange={(e) => {
                            setProjectFormValue((prev) => ({ ...prev, refererId: e.target.value }));
                            getProjectFormLeads(e.target.value);
                            // getFormByProjectId(e.target.value);
                            const product = products?.find((product) => product?._id === e.target.value)
                            if (product?.forms) {
                                setFormsByProject(product?.forms);
                                setProjectFormValue((prev) => ({
                                    ...prev,
                                    formId: product?.forms[0]?._id || null
                                }));
                            }

                        }}
                    >
                        <option selected>Open this select Form</option>
                        {products?.map((item) => (
                            <option key={item?._id} value={item?._id}>
                                {item?.name}
                            </option>
                        ))}
                    </select>
                </div>

                {formsByProject && (
                    <div className="m-3">
                        <label className='mb-1'>Forms</label>
                        <select
                            className="form-select"
                            value={projectFormValue?.formId}
                            onChange={(e) => setProjectFormValue((prev) => ({ ...prev, formId: e.target.value }))}
                        >
                            <option selected>Open this select Form</option>
                            {formsByProject?.map((item) => (
                                <option key={item?._id} value={item?._id}>
                                    {item?.title}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            <LeadsTable tableHeaders={projectFormValue?.headers} tableData={projectFormValue?.data} />
        </div>
    );
};

export default Leads;
