import React, { useEffect } from 'react'
import { COLUMNS } from './Constant';
import GridTable from '../../components/Table/GridTable';
import { useFieldsStore } from './Service';
import FieldDrawer from './FieldDrawer';
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from '@mui/material';

const Field = () => {
    const { data, rows, fetchGrid, isLoading, onDelete, onPageChange, currentPage,fetchDetail, onRowsPerPageChange, totalPages, total, onUpdate } = useFieldsStore();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleEdit = async (id)=>[
        await fetchDetail(id),
        handleClickOpen()
    ]
    useEffect(() => {
        if(data.length == 0){
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
                Add Field
            </Button>
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

            <FieldDrawer
                open={open}
                setOpen={setOpen}
            />
        </Box>
    )
}


export default Field