export const FORMENDPOINTS = {
    addForm: `addForm`,
    getForms: `getForms`,
    getFormById: (id) => `form/${id}`,
    updateForm: (id) => `form/${id}`,
    getFormByProjectId: (id) => `/project/${id}/forms`,
    // deleteForm: (id) => `Forms/${id}`,
}