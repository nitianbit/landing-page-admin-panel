export const ENDPOINTS = {
    // addLead: `addProject`,
    getProjects: 'getProjects',

    getFormByProjectId: (id,type=null) => `/project/${id}/Forms${type ? `?type=${type}` : ''}`,
    getProductsByProject: (id) => `/getProductsByProject/${id}`,

    // getProjectFormLead: (projectId, formId, refererId) => `/getFormValues/${projectId}/${formId}${refererId ? `?refererId=${refererId}` : ''}`,
    getProjectFormLead: (query, download=false) => {
        let url = `/getFormValues?${query}`
      
        if (download) {
          url += '&download=true';
        }
      
        return url;
      },

    getProjectById: (id) => `/project/${id}`,

    updateProject: (id) => `/project/${id}`,
    deleteProject: (id) => `project/${id}`,
}
