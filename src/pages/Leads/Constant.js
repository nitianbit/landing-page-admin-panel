export const ENDPOINTS = {
    // addLead: `addProject`,
    getProjects: 'getProjects',
    getProjectFormValue: (projectId, formId) => `/getFormValues/${projectId}/${formId}`,

    getFormByProjectId: (id) => `/project/${id}/Forms`,

    getProjectFormLead: (projectId, formId) => `/getFormValues/${projectId}/${formId}`,

    getProjectById: (id) => `/project/${id}`,

    updateProject: (id) => `/project/${id}`,
    deleteProject: (id) => `project/${id}`,
}