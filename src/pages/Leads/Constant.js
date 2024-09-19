export const ENDPOINTS = {
    // addLead: `addProject`,
    getProjects: 'getProjects',

    getFormByProjectId: (id,type=null) => `/project/${id}/Forms${type ? `?type=${type}` : ''}`,
    getProductsByProject: (id) => `/getProductsByProject/${id}`,

    // getProjectFormLead: (projectId, formId, refererId) => `/getFormValues/${projectId}/${formId}${refererId ? `?refererId=${refererId}` : ''}`,
    getProjectFormLead: (projectId, formId, refererId, download = false, page=1, rows=10) => {
        let url = `/getFormValues/${projectId}/${formId}?page=${page}&rows=${rows}&`;
      
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
