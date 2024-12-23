import React, { useState } from "react";
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    TablePagination,
    Button,
    Box,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from "../Modal/ConfirmationModal";
import Editcon from "@mui/icons-material/Edit";


const GridTable = ({
    data = [],
    columns,
    spacing = 2,
    styles = {},
    rows,
    currentPage = 1,
    total,
    onPageChange,
    onRowsPerPageChange,
    onDelete = (...args) => { },
    onEdit = () => { },
}) => {
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        visible: false,
        data: false
    });

    const handleOpenDialog = (data) => setDeleteConfirmation({ visible: true, data });
    const handleCloseDialog = () => setDeleteConfirmation({ visible: false, data: null });

    const handleConfirm = () => {
        try {
            onDelete(deleteConfirmation.data);
            handleCloseDialog();
        } catch (error) {

        }
    };

    const onActionClick = (data) => {
        handleOpenDialog(data);
    }

    return (
        <Box>
            <Paper container spacing={spacing} sx={{ marginLeft: "10px", marginTop: "40px", ...styles }}>
                <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                    <Table sx={{ minWidth: 650, position: "relative" }} aria-label="general table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr No.</TableCell>
                                {columns.map((col, index) => (
                                    <TableCell key={index}>{col.header}</TableCell>
                                ))}
                                {/* Action Column Header */}
                                <TableCell
                                    sx={{
                                        position: "sticky",
                                        right: 0,
                                        backgroundColor: "#FAF9F6",
                                        zIndex: 10,
                                        boxShadow: "10px 10px",
                                    }}
                                >
                                    ACTIONS
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length > 0 &&
                                data.map((row, rowIndex) => (
                                    <TableRow key={rowIndex} style={{ textDecoration: "none", color: "inherit" }}>
                                        <TableCell>{rowIndex + 1}</TableCell>
                                        {columns.map((col, colIndex) => (
                                            <TableCell key={colIndex}>
                                                {col.render ? col.render(row) : row[col.accessor]}
                                            </TableCell>
                                        ))}
                                        <TableCell
                                            sx={{
                                                position: "sticky",
                                                right: 0,
                                                backgroundColor: "#FAF9F6",
                                                zIndex: 1,
                                                boxShadow: "10px 10px",
                                            }}
                                        >
                                            <Editcon color='success' sx={{ cursor: "pointer" }} onClick={() => {
                                                onEdit(row?._id)
                                            }} />

                                            <DeleteIcon variant="outlined" color='error' sx={{ cursor: "pointer" }} onClick={() => onActionClick(row)} />

                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[2, 4, 6]}
                    component="div"
                    count={total}
                    rowsPerPage={rows}
                    page={currentPage - 1}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </Paper>
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

export default GridTable;