export const ENDPOINTS = {
    // addLead: `addProject`,
    getProjects: 'getProjects',
    getProjectFormValue: (projectId, formId) => `/getFormValues/${projectId}/${formId}`,

    getFormByProjectId: (id) => `/projects/${id}/Forms`,

    getProjectFormLead: (projectId, formId) => `/getFormValues/${projectId}/${formId}`,

    getProjectById: (id) => `/project/${id}`,

    updateProject: (id) => `/project/${id}`,
    deleteProject: (id) => `project/${id}`,
}