export const ENDPOINTS = {
    create: `form/create`,
    grid: `form/grid`,
    detail: (id, type, projectId) => `form/detail?id=${id??""}&type=${type??""}&projectId=${projectId??""}`,
    update: (id) => `form/update/${id}`,
    delete: (id) => `form/delete/${id}`,
}