import React, { useEffect, useState } from 'react';

const LeadsTable = ({ tableData, tableHeaders }) => {

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
                                {tableHeaders?.map((item, thIndex) => (
                                    <th key={thIndex} className='font-weight-600' scope="col">{item?.label}</th>
                                ))}
                                <th>IP Address</th>
                                <th>UTM Parameters</th>
                            </tr>
                        </thead>
                        <tbody className='text-grey'>
                            {data?.map((row, index) => (
                                <tr key={row?.id}>
                                    <td scope="row">{index + 1}</td>
                                    {row?.values?.map((tdValue, tdIndex) => (
                                        <td key={tdIndex}>{tdValue}</td>
                                    ))}
                                    <td>
                                        {row?.ipAddress}
                                    </td>
                                    <td>
                                        {Object?.entries(row?.utmParameters || {}).map(([key, value]) => (
                                            <li key={key}>{`${key}: ${value}`}</li>
                                        ))}
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
        </div>
    );
};

export default LeadsTable;