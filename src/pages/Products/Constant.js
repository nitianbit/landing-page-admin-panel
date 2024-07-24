export const ENDPOINTS = {
    addProduct: `addProduct`,
    getProjects: 'getProjects',
    getFormByProjectId: (id) => `/project/${id}/forms`,
    getProductFormValue: (productId, formId) => `/getFormValues/${productId}/${formId}`,

    getProductByProjectId: (id) => `/getProductsByProject/${id}`,

    getProductFormLead: (productId, formId) => `/getFormValues/${productId}/${formId}`,

    getProductById: (productId) => `/product/${productId}`,

    updateProduct: (id) => `/product/${id}`,
    deleteProduct: (id) => `/product/${id}`,
}