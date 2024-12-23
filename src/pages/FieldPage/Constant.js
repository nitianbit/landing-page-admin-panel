export const ENDPOINTS = {
    create: `field/create`,
    grid: `field/grid`,
    detail: (id) => `field/detail?id=${id??""}`,
    update: (id) => `field/update/${id}`,
    delete: (id) => `field/delete/${id}`,
}

export const COLUMNS = [
    {
        header: "Label",
        accessor: "label",
    },
    {
        header: "Type",
        accessor: "type",
    },
]

export const FieldENDPOINTS = {
    addField: `addField`,
    getFields: `getFields`,
    getFieldById: (id) => `field/${id}`,
    updateField: (id) => `field/${id}`,
    deleteField: (id) => `field/${id}`,
}