import React, { useContext, useEffect, useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import Modal from '../Modal/Modal';
import { ENDPOINTS } from '../../pages/Products/Constant';
import { doDELETE, doPOST, doPUT } from '../../utils/HttpUtil';
import { AppContext } from '../../services/context/AppContext';
import { useNavigate } from 'react-router-dom';

const ProductsTable = ({ selectedProject, tableData, getAllProjects }) => {

    const navigate = useNavigate();

    const { success, error } = useContext(AppContext)

    const [data, setData] = useState(tableData?.rows);
    const [loading, setLoading] = useState(false)
    const [deleteProjectId, setDeleteProjectId] = useState(null)
    const [editState, setEditState] = useState({
        isModalOpen: false,
        selectedProject: null
    })

    const deleteProject = async () => {
        try {
            setLoading(true)
            const response = await doDELETE(ENDPOINTS.deleteProduct(deleteProjectId))
            setDeleteProjectId(null)
            getAllProjects()
            success("Project deleted Successfully")
        } catch (error) {
            error("server error")

        }
        finally {
            setLoading(false)
        }
    }

    const closeDeleteModal = () => {
        setDeleteProjectId(null)
    }

    useEffect(() => {
        setData(tableData)
    }, [tableData])

    return (
        <div className='w-100'>
            <button onClick={(e) => {
                navigate(`/products/create/${selectedProject}`)
            }} className="btn btn-primary my-2" type="submit">Add Product</button>
            <div className="container shadow-sm bg-white p-2 w-100">
                <div className="table-wrapper">
                    <table className="table">
                        <thead style={{ fontWeight: 600 }}>
                            <tr>
                                <th className='font-weight-600' scope="col">#</th>
                                <th className='font-weight-600' scope="col">Name</th>
                                <th className='font-weight-600' scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-grey'>
                            {data?.map((row, index) => (
                                <tr key={row?.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{row.name}</td>
                                    <td>
                                        <MdEdit onClick={() => {
                                            navigate(`/products/edit/${row?._id}?project=${selectedProject}`)
                                        }} className='cursor-pointer' color='#8296EE' />
                                        <MdDelete onClick={() => {
                                            setDeleteProjectId(row?._id)
                                        }} className='cursor-pointer' color='red' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="hint-text me-2 text-grey">Showing <b>{data?.length ?? 0}</b> out of <b>{tableData?.total ?? 0}</b> entries</div>
                        <ul className="pagination mb-0">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            {deleteProjectId && <Modal
                header="Delete Project"
                onSave={deleteProject}
                content="Are You Sure you want to delete this Project?"
                isOpen={deleteProjectId ? true : false}
                okText="Delete"
                onClose={closeDeleteModal} />
            }
        </div>
    );
};

export default ProductsTable;
