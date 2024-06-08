import React, { useEffect, useState } from 'react'
import { UserTable } from '../../components'
import { FieldENDPOINTS } from './Constant';
import { doGET } from '../../utils/HttpUtil';
import FieldTable from '../../components/Table/FieldTable';

const Field = () => {

    const [users, setUsers] = useState()

    const getAllFields = async (e) => {
        try {
            const response = await doGET(FieldENDPOINTS.getFields);
            setUsers(response)
        } catch (error) { }
    };

    useEffect(() => {
        getAllFields()
    }, [])

    return (
        <div className='d-flex w-100'>
            <FieldTable getAllFields={getAllFields} tableData={users} />
        </div>
    )
}


export default Field