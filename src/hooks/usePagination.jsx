import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePagination = () => {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [total, setTotal] = useState(1);

    const location = useLocation();
    const navigate = useNavigate()

    const navigateWithNewParams = useCallback((params) => {
        navigate({
            pathname: location.pathname,
            search: `?${params.toString()}`,
            replace: true,
        });
    }, [location.pathname, navigate, rows,]);


    const goToNextPage = () => {
        setPage(prev => {
            const next = Math.min(prev + 1, total)
            let parms = new URLSearchParams(location.search)
            parms.set("page", next);
            navigateWithNewParams(parms)
        })
    }

    const goToPrevPage = () => {

        setPage(prev => {
            const next = Math.max(prev - 1, 1)
            let parms = new URLSearchParams(location.search)
            parms.set("page", next);
            navigateWithNewParams(parms)
        })
    }

    const updateTotal = (total) => {
        setTotal(total)
    }

    const updateRowsPerPage = (newRows) => {
        setRows(newRows);
        setPage(1);
        let parms = new URLSearchParams(location.search)
        parms.set("page", 1);
        parms.set("rows", newRows);
        navigateWithNewParams(parms)
    };

    const hasNextPage = () => {
        return page < total
    }

    const resetPageRows = () => {
        setPage(1);
        setRows(10)

        let parms = new URLSearchParams(location.search)
        parms.set("page", 1);
        parms.set("rows", 10);
        navigateWithNewParams(parms)
    }

    const updatePage = (page) => {
        setPage(page)
        let parms = new URLSearchParams(location.search)
        parms.set("page", page);
        navigateWithNewParams(parms)
    }

    const updateRows = (row) => {
        setRows(row)
        let parms = new URLSearchParams(location.search)
        parms.set("rows", row);
        navigateWithNewParams(parms)
    }

    return { page, rows, total, goToNextPage, goToPrevPage, updateTotal, hasNextPage, updateRowsPerPage, resetPageRows, updatePage, updateRows }
}
