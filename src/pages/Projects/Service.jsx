import { create } from 'zustand';
import { doDELETE, doGET, doPOST, doPUT } from "../../utils/HttpUtil"
import {showError, showSuccess} from '../../services/toaster/index';
import { ENDPOINTS } from "./Constant"


const store = create((set, get) => ({
    data: [],
    detail:{},
    totalPages: 0,
    currentPage: 1,
    filters: {},
    isLoading: false,
    rows: 2,
    total:0,

    fetchGrid: async () => {
        try {
            const { filters, currentPage, rows, isLoading, total } = get();
            if (isLoading) return;

            set({ isLoading: true });

            const queryParams = new URLSearchParams(filters);
            queryParams.append('page', String(currentPage));
            queryParams.append('rows', String(rows));
            const apiUrl = `${ENDPOINTS.grid}?${queryParams.toString()}`;

            const response = await doGET(apiUrl);

            if (response.status >= 200 && response.status < 400) {
                set({
                    data: response.data.data.rows,
                    ...(currentPage == 1 && { totalPages: Math.ceil(response.data.data.total / rows) }),
                    total:response.data.data.total ? response.data.data.total : total
                });
            } else {
                showError(response.message);
            }
        } catch (err) {
            showError('Failed to fetch doctors');
        } finally {
            set({ isLoading: false });
        }
    },

    setFilters: (newFilters) => {
        set({ filters: newFilters });
        get().fetchGrid(1, newFilters);
    },

    nextPage: () => {
        const { currentPage, totalPages, fetchGrid } = get();
        if (currentPage < totalPages) {
            set(state => ({
                currentPage: state.currentPage + 1
            }))
            fetchGrid();
        }
    },

    prevPage: () => {
        const { currentPage, filters, fetchGrid } = get();
        if (currentPage > 1) {
            set(state => ({
                currentPage: state.currentPage - 1
            }))
            fetchGrid();
        }
    },
    onPageChange: (event, page) => {
        const { currentPage, filters, fetchGrid, totalPages } = get();
        if (currentPage > 1 || currentPage <= totalPages) {
            set({
                currentPage: page+1
            })
            fetchGrid();
        }
    },

    fetchDetail: async (id) => {
        try {
            const response = await doGET(ENDPOINTS.detail(id));
            console.log(response);
            if(response.status>=200 && response.status<400){
                set({
                    detail: response.data.data,
                });
            }
        } catch (error) {

        }
    },

    resetDetail: () => set({ detail: {} }),

    onCreate: async (data) => {
        try {
            const response = await doPOST(ENDPOINTS.create, data);
            console.log(response);
            if(response.status>=200 && response.status<400){
                get().fetchGrid();
                showSuccess(response.data.message)
                resetDetail()
            }
        } catch (error) {

        }
    },
    onUpdate: async (id ,data) => {
        try {
            const response = await doPUT(ENDPOINTS.update(id), data);
            console.log(response);
            if(response.status>=200 && response.status<400){
                get().fetchGrid();
                resetDetail()
                showSuccess(response.data.message)
            }
        } catch (error) {

        }
    },
    onDelete: async (id) => {
        try {
            const response = await doDELETE(ENDPOINTS.delete(id));
            console.log(response);
            if(response.status>=200 && response.status<400){
                get().fetchGrid();
                showSuccess(response.data.message)
            }
        } catch (error) {

        }
    }
}));


export const useProjectStore = () => store((state) => state);
