import React, { useState, useEffect } from 'react';
import { ENDPOINTS } from './Constant.js'; // Assuming doGET is a function to make GET requests
import { doGET } from '../../utils/HttpUtil.jsx';
import { LeadsTable } from '../../components'
import { Button } from 'reactstrap';
import ToggleButton from './ToggleButton.jsx';
import { usePagination } from '../../hooks/usePagination.jsx';
import CustomDateFilter from '../../components/DatePicker/MultiSelectDatePicker.jsx';
import { IoMdRefresh } from "react-icons/io";

const Leads = () => {
    const [leads, setLeads] = useState(null);
    const [projects, setProjects] = useState(null);
    const [formsByProject, setFormsByProject] = useState(null);
    const [filters, setFilters] = useState({})
    const [formType, setFormType] = useState("product")

    const { page, rows, total, goToNextPage, goToPrevPage, hasNextPage, updateTotal, updateRowsPerPage } = usePagination()


    const [projectFormValue, setProjectFormValue] = useState({
        leads: null,
        headers: null,
        formId: null,
        projectId: null,
        data: null,
        refererId: null, //productId
    });
    const [products, setProducts] = useState([]);

    const getProductByProject = async (projectId) => {
        try {
            const response = await doGET(ENDPOINTS.getProductsByProject(projectId));
            setProducts(response);
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    const getProjects = async () => {
        try {
            const response = await doGET(ENDPOINTS.getProjects);
            if (response) {
                setProjects(response);
                setProjectFormValue((prev) => ({
                    ...prev,
                    projectId: response[0]?._id || null
                }));
                // getProductByProject(response[0]?._id)
            }
        } catch (error) {
            console.error("Error fetching projects: ", error);
        }
    };

    const getFormData = async (refererId, download = false) => {
        try {
            if (!projectFormValue.formId) {
                return;
            }
            const response = await doGET(ENDPOINTS.getProjectFormLead(projectFormValue?.projectId, projectFormValue?.formId, refererId, download, page, rows, filters?.date?.startDate ?? "", filters?.date?.endDate ?? ""));
            if (response) {
                if (download) {
                    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(response?.data);
                    const link = document.createElement('a');
                    link.href = csvContent;
                    link.target = '_blank';
                    link.download = 'leads.csv';

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    if (response?.total) {
                        updateTotal(Math.ceil(response?.total / rows))
                    }
                    setProjectFormValue((prev) => ({
                        ...prev,
                        data: response?.rows?.filter((lead) => lead?.refererId === refererId),
                    }));
                }
            }
        } catch (error) {
            console.error("Error fetching form data: ", error);
        }
    };

    const getFormByProjectId = async () => {
        try {
            const response = await doGET(ENDPOINTS.getFormByProjectId(projectFormValue.projectId, formType));
            if (response) {
                let formId = response[0]?._id;
                let refererId = formType === "product" && products?.length ? products[0]?._id : null;
                if (refererId) {
                    const filteredProducts = products?.find((product) => product?._id === refererId)
                    setFormsByProject(filteredProducts?.forms);
                } else {
                    setFormsByProject(response)
                }

                setProjectFormValue((prev) => ({
                    ...prev,
                    formId,
                    refererId
                }));
            } else {
                setProjectFormValue((prev) => ({
                    ...prev,
                    formId: null,
                    refererId: null
                }));
            }
        } catch (error) {
            console.error("Error fetching forms by project ID: ", error);
        }
    };


    const filterFormHeaders = () => {
        const form = formsByProject?.find((form) => (form?.type == formType && form?._id == projectFormValue?.formId));
        if (form) {
            setProjectFormValue((prev) => ({
                ...prev,
                headers: form?.fields ?? [],
                utmParameters: form?.utmParameters
            }));

        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    useEffect(() => {
        if (projectFormValue.projectId) {
            getProductByProject(projectFormValue.projectId)
        }
    }, [projectFormValue.projectId]);



    useEffect(() => {
        if (projectFormValue.projectId) {
            getFormByProjectId();
        }
    }, [projectFormValue.projectId, formType, products]);

    useEffect(() => {

        if (projectFormValue.projectId && projectFormValue.formId && !projectFormValue.refererId) {
            getFormData();
        }
        if (projectFormValue.refererId) {
            getFormData(projectFormValue.refererId);
        }
        if (formType) {
            filterFormHeaders();
        }
    }, [projectFormValue.formId, formType, projectFormValue.projectId, projectFormValue.refererId, page, rows, filters]);

    return (
        <div className='w-100'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center '>
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
                    <CustomDateFilter
                        onDateRangeSelected={(v) => {
                            setFilters(prev => ({
                                ...prev,
                                date: v
                            }));
                        }}
                    />
                    <ToggleButton formType={formType} setFormType={setFormType} />

                    {formType === "product" && (
                        <>
                            <div className="m-3">
                                <label className='mb-1'>Products</label>
                                <select
                                    className="form-select"
                                    value={projectFormValue?.refererId}
                                    onChange={(e) => {
                                        setProjectFormValue((prev) => ({ ...prev, refererId: e.target.value }));
                                        const product = products?.find((product) => product?._id === e.target.value);
                                        if (product?.forms) {
                                            setFormsByProject(product?.forms);
                                            setProjectFormValue((prev) => ({
                                                ...prev,
                                                formId: product?.forms.sort((a, b) => a.formIndex - b.formIndex)[0]?._id || null
                                            }));
                                        } else {
                                            getFormByProjectId();
                                        }
                                    }}
                                >
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
                                        onChange={(e) =>
                                            setProjectFormValue((prev) => ({ ...prev, formId: e.target.value }))
                                        }
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
                        </>
                    )}
                </div>
                <IoMdRefresh className='cursor-pointer' size={24} onClick={() => getFormData(projectFormValue?.refererId, false)}/>
                <Button onClick={() => getFormData(projectFormValue?.refererId, true)} className='my-4'>Download</Button>
            </div>
            <LeadsTable
                rows={rows}
                page={page}
                total={total}
                goToNextPage={goToNextPage}
                goToPrevPage={goToPrevPage}
                hasNextPage={hasNextPage}
                tableHeaders={projectFormValue?.headers}
                tableData={projectFormValue?.data}
                utmParameters={projectFormValue.utmParameters}
                updateRowsPerPage={updateRowsPerPage}
            />
        </div>
    );
};

export default Leads;
