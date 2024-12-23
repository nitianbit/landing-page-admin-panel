import React, { useEffect, useState } from 'react'
import { ProjectTable } from '../../components'
import AddIcon from "@mui/icons-material/Add";
import ProjectDialog from './Dialog';
import { Box, Button } from '@mui/material';

const Projects = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <Box>
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
            >
                Add Project
            </Button>
            <ProjectDialog
                open={open}
                setOpen={setOpen}
            />
            <ProjectTable  openDialog={handleClickOpen}/>
        </Box>
    )
}


export default Projects