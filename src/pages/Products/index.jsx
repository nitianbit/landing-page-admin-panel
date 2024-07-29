import React, { useState, useEffect } from 'react';
import { ENDPOINTS } from './Constant.js'; // Assuming doGET is a function to make GET requests
import { doGET } from '../../utils/HttpUtil.jsx';
import { ProductsTable } from '../../components/index.jsx'

const Products = () => {
    const [projects, setProjects] = useState(null);
    const [productByProject, setProductByProject] = useState(null);
    const [projectProductValue, setProjectProductValue] = useState({
        projects: null,
        headers: null,
        productId: null,
        projectId: null
    });

    const getProjects = async () => {
        try {
            const response = await doGET(ENDPOINTS.getProjects);
            if (response) {
                setProjects(response);
                setProjectProductValue((prev) => ({
                    ...prev,
                    projectId: response[0]?._id || null
                }));
            }
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    const getProductByProjectId = async (req, res) => {
        try {
            const response = await doGET(ENDPOINTS.getProductByProjectId(projectProductValue.projectId));
            if (response) {
                setProductByProject(response);
                setProjectProductValue((prev) => ({
                    ...prev,
                    productId: response[0]?._id || null
                }));
            }
        } catch (error) {
            console.error("Error fetching Product by project ID: ", error);
        }
    };


    useEffect(() => {
        getProjects();
    }, []);



    useEffect(() => {
        if (projectProductValue.projectId) {
            getProductByProjectId();
        }
    }, [projectProductValue.projectId]);

    return (
        <div className='w-100'>
            <div className='d-flex'>
                {projects && (
                    <div className="m-3">
                        <label className='mb-1'>Projects</label>
                        <select
                            className="form-select"
                            value={projectProductValue?.projectId}
                            onChange={(e) => setProjectProductValue((prev) => ({ ...prev, projectId: e.target.value }))}
                        >
                            <option selected>Open this select Product</option>
                            {projects?.map((item) => (
                                <option key={item?._id} value={item._id}>
                                    {item?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {productByProject && (
                    <div className="m-3">
                        <label className='mb-1'>Products</label>
                        <select
                            className="form-select"
                            value={projectProductValue?.productId}
                            onChange={(e) => setProjectProductValue((prev) => ({ ...prev, productId: e.target.value }))}
                        >
                            <option selected>Open this select Product</option>
                            {productByProject?.map((item) => (
                                <option key={item?._id} value={item?._id}>
                                    {item?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            <ProductsTable selectedProject={projectProductValue?.projectId} tableHeaders={projectProductValue?.headers} tableData={productByProject} />
        </div>
    );
};

export default Products;
