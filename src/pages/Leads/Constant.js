export const ENDPOINTS = {
    // addLead: `addProject`,
    getProjects: 'getProjects',

    getFormByProjectId: (id) => `/project/${id}/Forms`,
    getProductsByProject: (id) => `/getProductsByProject/${id}`,

    // getProjectFormLead: (projectId, formId, refererId) => `/getFormValues/${projectId}/${formId}${refererId ? `?refererId=${refererId}` : ''}`,
    getProjectFormLead: (projectId, formId, refererId,download=false) => `/getFormValues/${projectId}/${formId}?${refererId ? `refererId=${refererId}` : ''}${download ? `&download=true` : ''}`,


    getProjectById: (id) => `/project/${id}`,

    updateProject: (id) => `/project/${id}`,
    deleteProject: (id) => `project/${id}`,
}
