import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ENDPOINTS } from './Constant.js'; // Assuming doGET is a function to make GET requests
import { doGET } from '../../utils/HttpUtil.jsx';
import { LeadsTable } from '../../components'
import { Button } from 'reactstrap';
import ToggleButton from './ToggleButton.jsx';
import { usePagination } from '../../hooks/usePagination.jsx';
import CustomDateFilter from '../../components/DatePicker/MultiSelectDatePicker.jsx';
import { IoMdRefresh } from "react-icons/io";
import { useLocation, useNavigate, } from 'react-router-dom';


const Leads = () => {
    const [projects, setProjects] = useState(null);
    const [filters, setFilters] = useState({})
    const [formType, setFormType] = useState("product");
    const location = useLocation()
    const navigate = useNavigate()
    const qParams = useMemo(() => new URLSearchParams(location.search), [location.search])



    const { page, rows, total, goToNextPage, goToPrevPage, hasNextPage, updateTotal, updateRowsPerPage, resetPageRows, updatePage, updateRows } = usePagination()

    const [data, setData] = useState({
        leads: null,
        headers: null,
        formId: null,
        projectId: null,
        values: null,
        formsByProject: [],
        refererId: null, //productId,
        products: [],
    });

    const navigateWithNewParams = useCallback((params) => {
        navigate({
            pathname: location.pathname,
            search: `?${params.toString()}`,
            replace: true,
        });
    }, [location.pathname, navigate, rows,]);


    const handleFormType = (type) => {
        setFormType(type);
        let parms = new URLSearchParams(location.search)
        parms.set('formType', type)
        setData((prev) => ({
            ...prev,
            products: [],
            refererId: null,
            formId: null
        }));
        parms.delete('refererId')
        parms.delete('productId')
        parms.delete('formId')
        parms.set("page", 1);
        parms.set("rows", 10);
        navigateWithNewParams(parms)
        // resetPageRows()
    }

    const getProductByProject = async (projectId) => {
        try {
            const response = await doGET(ENDPOINTS.getProductsByProject(projectId));
            setData((prev) => ({
                ...prev,
                products: response
            }));
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    const getProjects = async () => {
        try {
            const response = await doGET(ENDPOINTS.getProjects);
            if (response) {
                let parms = new URLSearchParams(location.search)
                setProjects(response);
                setData((prev) => ({
                    ...prev,
                    projectId: parms.get("projectId") ?? (response[0]?._id || null)
                }));
                
                parms.set('projectId', parms.get("projectId") ?? response[0]?._id)
                navigateWithNewParams(parms)
            }
        } catch (error) {
            console.error("Error fetching projects: ", error);
        }
    };

    const parseQueryParams = () => {
        const params = new URLSearchParams(location.search);
        const projectId = params.get('projectId') || null;
        const refererId = params.get('refererId') || null;
        const formId = params.get('formId') || null;
        const startDate = params.get('startDate') || null;
        const endDate = params.get('endDate') || null;
        const rowsParam = parseInt(params.get('rows')) || rows;
        const pageParam = parseInt(params.get('page')) || page;
        const formType = params.get("formType") || "product";

        return { projectId, refererId, formId, startDate, endDate, rows: rowsParam, page: pageParam, formType };
    };


    const getFormData = async (refererId, download = false) => {
        try {
            if (!data.formId) {
                return;
            }

            const url = `${ENDPOINTS.getProjectFormLead(qParams.toString(), download)}`;
            const response = await doGET(url)
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
                    setData((prev) => ({
                        ...prev,
                        values: response?.rows?.filter((lead) => lead?.refererId === refererId),
                    }));
                }
            }
        } catch (error) {
            console.error("Error fetching form data: ", error);
        }
    };

    const getFormByProjectId = async () => {
        try {
            const response = await doGET(ENDPOINTS.getFormByProjectId(data.projectId, formType));
            let parms = new URLSearchParams(location.search)
            if (response) {
                let formId = response[0]?._id;
                let refererId = parms.get("refererId") ?? ((parms.get("formType") ?? (formType === "product")) && data?.products?.length ? data?.products[0]?._id : null);
                if (refererId) {
                    const filteredProducts = data?.products?.find((product) => product?._id === refererId)
                    setData((prev) => ({
                        ...prev,
                        formsByProject: filteredProducts?.forms,
                        refererId: parms.get("refererId") ?? refererId
                    }));
                } else {
                    setData((prev) => ({
                        ...prev,
                        formsByProject: response
                    }));
                }

                setData((prev) => ({
                    ...prev,
                    formId: parms.get("formId") ?? formId,
                    refererId: parms.get("refererId") ?? refererId
                }));

                if (!parms.get("formId") && formId) {
                    parms.set('formId', formId)
                }
                if (!parms.get("refererId") && refererId) {
                    parms.set('refererId', refererId)
                }
                if (!refererId) {
                    parms.delete('refererId')
                }
                if (!formId) {
                    parms.delete('formId')
                }
                navigateWithNewParams(parms)
            } else {
                setData((prev) => ({
                    ...prev,
                    formId: null,
                    refererId: null
                }));
                let parms = new URLSearchParams(location.search)
                parms.delete('formId')
                parms.delete('refererId')
                navigateWithNewParams(parms)
            }
        } catch (error) {
            console.error("Error fetching forms by project ID: ", error);
        }
    };


    const filterFormHeaders = () => {
        const form = data?.formsByProject?.find((form) => (form?.type == formType && form?._id == data?.formId));
        if (form) {
            setData((prev) => ({
                ...prev,
                headers: form?.fields ?? [],
                utmParameters: form?.utmParameters
            }));

        }
    };

    const fetchData = ()=>{
        if (data.projectId && data.formId && !data.refererId) {
            getFormData();
        }
        if (data.refererId) {
            getFormData(data.refererId);
        }
        if (formType) {
            filterFormHeaders();
        }
    }

    const handleDataFilters = (v) => {
        setFilters(prev => ({
            ...prev,
            date: v
        }));
        let parms = new URLSearchParams(location.search)
        parms.set('startDate', v.startDate)
        parms.set('endDate', v.endDate)

        navigateWithNewParams(parms)
    }


    // Set state from URL on component load
    useEffect(() => {
        const queryParams = parseQueryParams();
        setData((prev) => ({
            ...prev,
            ...queryParams,
        }));
        if (queryParams.formType) {
            setFormType(queryParams.formType)
        }

        if (queryParams.rows) updateRows(queryParams.rows);
        if (queryParams.page) updatePage(queryParams.page);

    }, [qParams]);


    useEffect(() => {
        getProjects();
    }, []);

    useEffect(() => {
        if (data.projectId && formType == "product") {
            getProductByProject(data.projectId)
        }
    }, [data.projectId, formType]);



    useEffect(() => {
        if (data.projectId) {
            getFormByProjectId();
        }
    }, [data.projectId, formType, data?.products]);

    useEffect(() => {
        fetchData()
       
    }, [data.formId, formType, data.projectId, data.formsByProject, data.refererId, page, rows, filters]);

    return (
        <div className='w-100'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center '>
                    {projects && (
                        <div className="m-3">
                            <label className='mb-1'>Projects</label>
                            <select
                                className="form-select"
                                value={data?.projectId}
                                onChange={(e) => {
                                    setData((prev) => ({ ...prev, projectId: e.target.value, products: [], formsByProject: [] }))
                                    let parms = new URLSearchParams(location.search)
                                    parms.set('projectId', e.target.value)
                                    parms.delete("refererId")
                                    parms.delete("formId")
                                    parms.set("page", 1);
                                    parms.set("rows", 10);

                                    navigateWithNewParams(parms)
                                }
                                }
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
                        onDateRangeSelected={handleDataFilters}
                    />
                    <ToggleButton formType={formType} setFormType={handleFormType} />

                    {formType === "product" && (
                        <>
                            <div className="m-3">
                                <label className='mb-1'>Products</label>
                                <select
                                    className="form-select"
                                    value={data?.refererId}
                                    onChange={(e) => {
                                        setData((prev) => ({ ...prev, refererId: e.target.value }));
                                        let parms = new URLSearchParams(location.search)
                                        parms.set('refererId', e.target.value)
                                        const product = data?.products?.find((product) => product?._id === e.target.value);
                                        if (product?.forms) {
                                            setData((prev) => ({
                                                ...prev,
                                                formsByProject: product?.forms,
                                                formId: product?.forms.sort((a, b) => a.formIndex - b.formIndex)[0]?._id || null
                                            }));
                                            parms.set('formId', product?.forms.sort((a, b) => a.formIndex - b.formIndex)[0]?._id || null)
                                        } else {
                                            getFormByProjectId();
                                        }
                                        parms.set("page", 1);
                                        parms.set("rows", 10);
                                        navigateWithNewParams(parms)
                                    }}
                                >
                                    {data?.products?.map((item) => (
                                        <option key={item?._id} value={item?._id}>
                                            {item?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {data.formsByProject && (
                                <div className="m-3">
                                    <label className='mb-1'>Forms</label>
                                    <select
                                        className="form-select"
                                        value={data?.formId}
                                        onChange={(e) => {

                                            setData((prev) => ({ ...prev, formId: e.target.value }))
                                            let parms = new URLSearchParams(location.search)
                                            parms.set('formId', e.target.value)
                                            parms.set("page", 1);
                                            parms.set("rows", 10);
                                            navigateWithNewParams(parms)
                                        }
                                        }
                                    >
                                        <option selected>Open this select Form</option>
                                        {data.formsByProject?.map((item) => (
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
                <IoMdRefresh className='cursor-pointer' size={24} onClick={() => fetchData()} />
                <Button onClick={() => getFormData(data?.refererId, true)} className='my-4'>Download</Button>
            </div>
            <LeadsTable
                rows={rows}
                page={page}
                total={total}
                goToNextPage={goToNextPage}
                goToPrevPage={goToPrevPage}
                hasNextPage={hasNextPage}
                tableHeaders={data?.headers}
                tableData={data?.values}
                utmParameters={data.utmParameters}
                updateRowsPerPage={updateRowsPerPage}
            />
        </div>
    );
};

export default Leads;
