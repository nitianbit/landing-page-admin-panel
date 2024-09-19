import { useState } from "react";

export const usePagination = () => {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [total, setTotal] = useState(1);

    const goToNextPage = () => {
        setPage(prev => Math.min(prev + 1, total))
    }

    const goToPrevPage = () => {
            setPage(prev => Math.max(prev-1, 1))
    }

    const updateTotal = (total) => {
        setTotal(total)
    }

    const hasNextPage = ()=>{
        return page < total
    }

    return { page, rows, total, goToNextPage, goToPrevPage, updateTotal, hasNextPage }
}
