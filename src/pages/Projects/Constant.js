export const ENDPOINTS = {
    create: `project/create`,
    grid: `project/grid`,
    detail: (id) => `project/detail?id=${id}`,
    update: (id) => `project/update/${id}`,
    delete: (id) => `project/delete/${id}`,
}


export const COLUMNS = [
    {
        header: "Name",
        accessor: "name",
    },
    {
        header: "Domain",
        accessor: "domain",
    },
]
