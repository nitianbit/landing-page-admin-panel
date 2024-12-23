export const ENDPOINTS = {
    create: `addProject`,
    grid: `getProjects`,
    detail: (id) => `project/${id}`,
    update: (id) => `project/${id}`,
    delete: (id) => `project/${id}`,
}