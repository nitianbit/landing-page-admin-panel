import React, { useEffect, useState } from 'react'
import { ProjectTable } from '../../components'
import AddIcon from "@mui/icons-material/Add";
import ProjectDrawer from './ProjectDrawer';
import { Box, Button } from '@mui/material';
import GridTable from '../../components/Table/GridTable';
import { COLUMNS } from './Constant';
import { useProjectStore } from './Service';

const Projects = () => {
    const [open, setOpen] = React.useState(false);
    const { data, rows, fetchGrid, isLoading, onDelete, onPageChange, currentPage, fetchDetail, onRowsPerPageChange, totalPages, total, onUpdate } = useProjectStore();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleEdit = async (id) => [
        await fetchDetail(id),
        handleClickOpen()
    ]
    useEffect(() => {
        if (data.length == 0) {
            fetchGrid()
        }
    }, [])
    return (
        <Box>
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
            >
                Add Project
            </Button>
            <ProjectDrawer
                open={open}
                setOpen={setOpen}
            />
            <GridTable
                data={data}
                columns={COLUMNS}
                currentPage={currentPage}
                totalPages={totalPages}
                total={total}
                rows={rows}
                loading={isLoading}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                onDelete={(data) => {
                    onDelete(data._id)
                }}
                onEdit={handleEdit}
                fetchDetail={fetchGrid}
            />
        </Box>
    )
}


export default Projects