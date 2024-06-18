import React, { useContext, useEffect, useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Modal from '../Modal/Modal';
import EditUserContent from '../Modal/EditUserContent';
import { ENDPOINTS } from '../../pages/Projects/Constant';
import { doDELETE, doPOST, doPUT } from '../../utils/HttpUtil';
import { AppContext } from '../../services/context/AppContext';
import EditFieldContent from '../Modal/FieldsModal';
import { useNavigate } from 'react-router-dom';
import { EditProject } from '../../pages';

const LeadsTable = ({ tableData, tableHeaders }) => {

    const navigate = useNavigate();

    const { success, error } = useContext(AppContext)

    const [data, setData] = useState(tableData);
    const [loading, setLoading] = useState(false)
    const [deleteProjectId, setDeleteProjectId] = useState(null)
    const [editState, setEditState] = useState({
        isModalOpen: false,
        selectedProject: null
    })

    const handleUpdateData = async () => {
        try {
            setLoading(true)
            if (!editState.selectedProject?._id) {
                await doPOST(ENDPOINTS.addProject, editState.selectedProject)
            } else {
                await doPUT(ENDPOINTS.updateProject(editState.selectedProject?._id), editState.selectedProject)
            }
            setEditState({
                isModalOpen: false,
                selectedProject: null
            })
            getAllProjects()
            success("Project Updated Successfully")
        } catch (e) {
            error("Server error")
        } finally {
            setLoading(false)

        }
    }

    const updateData = (updatedObj) => setEditState(prev => ({
        ...prev,
        selectedProject: {
            ...prev.selectedProject,
            ...updatedObj
        }
    }))


    const openModal = (selectedProject) => {
        setEditState(prev => ({
            ...prev,
            isModalOpen: true,
            selectedProject
        }));
    };


    const closeEditModal = () => {
        setEditState(prev => ({
            ...prev,
            isModalOpen: false,
            selectedProject: null
        }));
    };

    const deleteProject = async () => {
        try {
            setLoading(true)
            const response = await doDELETE(ENDPOINTS.deleteProject(deleteProjectId))
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
        console.log(tableData)
    }, [tableData])

    return (
        <div >
            <div className="container shadow-sm bg-white p-2 w-100">
                <div className="table-wrapper">
                    <table className="table">
                        <thead style={{ fontWeight: 600 }}>
                            <tr>
                                <th className='font-weight-600' scope="col">#</th>
                                {
                                    tableHeaders ?
                                        tableHeaders?.map((item, thIndex) => {
                                            return <th key={thIndex} className='font-weight-600' scope="col">{item?.label}</th>
                                        }) : null
                                }
                            </tr>
                        </thead>
                        <tbody className='text-grey'>
                            {data?.map((row, index) => (
                                <tr key={row?.id}>
                                    <td scope="row">{index + 1}</td>
                                    {
                                        row?.values ?
                                            row?.values?.map((tdValue, tdIndex) => {
                                                return <td>{tdValue?.value}</td>
                                            })
                                            : null
                                    }
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
        </div>
    );
};

export default LeadsTable;
