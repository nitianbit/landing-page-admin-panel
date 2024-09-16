export const FORMENDPOINTS = {
    addForm: `addForm`,
    getForms: `getForms`,
    getFormById: (id) => `form/${id}`,
    updateForm: (id) => `form/${id}`,
    getFormByProjectId: (id, query) => `/project/${id}/forms?${query}`,
    // deleteForm: (id) => `Forms/${id}`,
}
