export const ENDPOINTS = {
    // addLead: `addProject`,
    getProjects: 'getProjects',

    getFormByProjectId: (id) => `/project/${id}/Forms`,
    getProductsByProject: (id) => `/getProductsByProject/${id}`,

    // getProjectFormLead: (projectId, formId, refererId) => `/getFormValues/${projectId}/${formId}${refererId ? `?refererId=${refererId}` : ''}`,
    getProjectFormLead: (projectId, formId, refererId, download = false) => {
        let url = `/getFormValues/${projectId}/${formId}?`;
      
        if (refererId) {
          url += `refererId=${refererId}`;
        }
      
        if (download) {
          if (refererId) {
            url += '&';
          }
          url += 'download=true';
        }
      
        return url;
      },

    getProjectById: (id) => `/project/${id}`,

    updateProject: (id) => `/project/${id}`,
    deleteProject: (id) => `project/${id}`,
}
