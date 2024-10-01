import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { getDate, getTime } from '../../utils/helper';

const LeadsTable = ({ tableData, tableHeaders, utmParameters, rows, page, total, goToNextPage, goToPrevPage, hasNextPage, updateRowsPerPage }) => {

    const [data, setData] = useState(tableData);

    useEffect(() => {
        const updatedData = tableData?.map(rowValues => {
            const row = tableHeaders?.map(item => {
                const found = rowValues?.values?.find(value => value.fieldId === item._id);
                return found?.value;
            });

            rowValues.utmParameters = rowValues.utmParameters || {};
            rowValues.ipAddress = rowValues.ipAddress || '';

            return {
                ...rowValues,
                utmParameters: rowValues.utmParameters,
                ipAddress: rowValues.ipAddress,
                values: row,
            };
        });

        setData(updatedData);

    }, [tableData, tableHeaders])
     

    return (
        <div >
            <div className="container shadow-sm bg-white p-2 w-100">
                <div className="table-wrapper">
                    <table className="table">
                        <thead style={{ fontWeight: 600 }}>
                            <tr>
                                <th className='font-weight-600' scope="col">#</th>
                                <th>Date</th>
                                <th>Time</th>
                                {tableHeaders?.map((item, thIndex) => (
                                    <th key={thIndex} className='font-weight-600' scope="col">{item?.label}</th>
                                ))}
                                <th>IP Address</th>

                                {utmParameters?.map((utm, utmIndex) => {
                                    return <th key={utmIndex} className='font-weight-600' scope="col">{utm}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody className='text-grey'>
                            {data?.map((row, index) => (
                                <tr key={row?.id}>
                                    <td scope="row">{index + 1}</td>
                                    <td>{getDate(row?.submittedAt)}</td>
                                    <td>{getTime(row?.submittedAt)}</td>
                                    {row?.values?.map((tdValue, tdIndex) => (
                                        <td key={tdIndex}>{tdValue}</td>
                                    ))}
                                    <td>
                                        {row?.ipAddress}
                                    </td>

                                    {Object?.entries(row?.utmParameters || {}).map(([key, value]) => (
                                        <td key={key}>{` ${value}`}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="hint-text me-2 text-grey">Showing Page <b>{page}</b>  of <b>{total}</b> Page</div>
                        <ul className="pagination mb-0">
                            <div className="dropdown me-3">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Rows per page: {rows}
                                </button>
                                <ul className="dropdown-menu">
                                    {[10, 50, 100 ].map((value) => (
                                        <li key={value}>
                                            <button className="dropdown-item" type="button" onClick={()=>updateRowsPerPage(value)}>
                                                {value}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Button className="page-item" onClick={goToPrevPage} disabled={page == 1}>
                                <span aria-hidden="true">&laquo;</span>
                            </Button>
                            <li className="page-item"><a className="page-link" href="#">{page}</a></li>
                            <Button className="page-item" onClick={goToNextPage} disabled={!hasNextPage()}>
                                <span aria-hidden="true">&raquo;</span>
                            </Button>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LeadsTable;
