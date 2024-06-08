import React, { useEffect, useState } from 'react'
import { ProjectTable } from '../../components'
import { ENDPOINTS } from './Constant';
import { doGET } from '../../utils/HttpUtil';

const Projects = () => {

    const [projects, setProjects] = useState()

    const getAllProjects = async (e) => {
        try {
            const response = await doGET(ENDPOINTS.getProjects);
            setProjects(response)
        } catch (error) { }
    };

    useEffect(() => {
        getAllProjects()
    }, [])

    return (
        <div className='d-flex w-100'>
            <ProjectTable getAllProjects={getAllProjects} tableData={projects} />
        </div>
    )
}


export default Projects