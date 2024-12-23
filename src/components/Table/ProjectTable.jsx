import React, { useEffect, useState } from 'react';
import { useProjectStore } from '../../pages/Projects/Service';
import ConfirmationDialog from '../Modal/ConfirmationModal';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import Editcon from "@mui/icons-material/Edit";

const ProjectTable = ({openDialog }) => {
    const { data, fetchGrid, onDelete, onPageChange, rows,fetchDetail, currentPage, total } = useProjectStore()
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        visible: false,
        data: false
    });

    const handleOpenDialog = (data) => setDeleteConfirmation({ visible: true, data });
    const handleCloseDialog = () => setDeleteConfirmation({ visible: false, data: null });


    const onActionClick = (data) => {
        handleOpenDialog(data);
    }

    const handleConfirm = () => {
        try {
            onDelete(deleteConfirmation.data);
            handleCloseDialog();
        } catch (error) {

        }
    };

    const handleEdit = async (id) => {
        await fetchDetail(id); // Ensure data is fetched before opening
        openDialog()
    };
    

    useEffect(() => {
        if(data.length == 0){
            fetchGrid();
        }
    }, []);

    return (
        <Box mt={2}>
            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: 650, position: "relative" }} aria-label="general table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr No.</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell>Domain</TableCell>
                            <TableCell
                            >
                                ACTIONS
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 &&
                            data.map((row, rowIndex) => (
                                <TableRow key={rowIndex} style={{ textDecoration: "none", color: "inherit" }}>
                                    <TableCell>
                                        {rowIndex + 1}
                                    </TableCell>
                                    <TableCell>
                                        {row?.name}
                                    </TableCell>
                                    <TableCell>
                                        {row?.domain}
                                    </TableCell>

                                    <TableCell>
                                    <Editcon color='success' sx={{cursor:"pointer"}} onClick={()=>{
                                        handleEdit(row?._id)
                                    }}/>

                                    <DeleteIcon variant="outlined" color='error' sx={{cursor:"pointer"}} onClick={() => onActionClick(row?._id)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[2]}
                component="div"
                count={total}
                rowsPerPage={2}
                page={currentPage - 1}
                onPageChange={onPageChange}
            />
            <ConfirmationDialog
                open={deleteConfirmation.visible}
                title="Delete Confirmation"
                message="Are you sure you want to delete this item? This action cannot be undone."
                onConfirm={handleConfirm}
                onCancel={handleCloseDialog}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </Box>
    );
};

export default ProjectTable;
