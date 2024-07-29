export const ENDPOINTS = {
    // addLead: `addProject`,
    getProjects: 'getProjects',

    getFormByProjectId: (id) => `/project/${id}/Forms`,
    getProductsByProject: (id) => `/getProductsByProject/${id}`,

    getProjectFormLead: (projectId, formId, refererId) => `/getFormValues/${projectId}/${formId}${refererId ? `?refererId=${refererId}` : ''}`,

    getProjectById: (id) => `/project/${id}`,

    updateProject: (id) => `/project/${id}`,
    deleteProject: (id) => `project/${id}`,
}