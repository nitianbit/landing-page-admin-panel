export const FORMENDPOINTS = {
    addForm: `addForm`,
    getForms: `getForm`,
    getFormById: (id) => `Forms/${id}`,
    updateForm: (id) => `Forms/${id}`,
    getFormByProjectId: (id) => `/projects/${id}/Forms`,
    // deleteForm: (id) => `Forms/${id}`,
}