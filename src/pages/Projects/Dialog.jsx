import React, { useEffect } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

import { useProjectStore } from './Service';
import { useForm } from "react-hook-form";
import { isEmptyObject } from '../../utils/helper';
const ProjectDialog = ({ open, setOpen }) => {

    const {
        handleSubmit,
    } = useForm();
    const { onCreate, detail, resetDetail, onUpdate } = useProjectStore()

    const [projectData, setProjectData] = React.useState({
        name: '',
        description: '',
        domain:""
    });

    const handleChange = (key, value)=>{
        setProjectData(prev=>({
            ...prev,
            [key]:value
        }))
    }

    const handleClose = () => {
        setOpen(false);
        // reset()
        resetDetail()
        setProjectData({
            name: '',
            description: '',
            domain:""
        })
    };

    const onSubmit = (data) => {
        if (detail?._id)
            onUpdate(detail?._id, projectData);
        else
            onCreate(projectData);
        resetDetail()
        setProjectData({
            name: '',
            description: '',
            domain:""
        })
        handleClose();
    };

    useEffect(()=>{
        if(!isEmptyObject(detail)){
            setProjectData(detail)
        }
    },[detail])
    
    

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Add Project</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                        required
                        variant="outlined"
                        value={projectData.name}
                        onChange={(e)=>{
                            handleChange("name", e.target.value)
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="description"
                        required
                        fullWidth
                        variant="outlined"
                        value={projectData.description}
                        onChange={(e)=>{
                            handleChange("description", e.target.value)
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="domain"
                        label="Domain"
                        type="domain"
                        required
                        fullWidth
                        variant="outlined"
                        value={projectData.domain}
                        onChange={(e)=>{
                            handleChange("domain", e.target.value)
                        }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )

}

export default ProjectDialog