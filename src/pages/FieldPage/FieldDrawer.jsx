import React, { useEffect } from 'react'
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Drawer, MenuItem, Select, TextField } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import { useFieldsStore } from './Service';
import { useForm } from "react-hook-form";
import { isEmptyObject } from '../../utils/helper';
import { FieldTypeConstants } from '../../components/Modal/Constant';
import DeleteIcon from '@mui/icons-material/Delete';
const FieldDrawer = ({ open, setOpen, anchor = "right" }) => {

    const {
        handleSubmit,
    } = useForm();
    const { onCreate, detail, resetDetail, onUpdate } = useFieldsStore()

    const [fieldData, setFieldData] = React.useState({
        name: '',
        label: '',
        type: "text",
        options: []
    });

    const handleChange = (key, value) => {
        setFieldData(prev => ({
            ...prev,
            [key]: value
        }))
    }
    const handleClose = () => {
        setOpen(false);
        resetDetail()
        setFieldData({
            name: '',
            type: '',
            label: "text",
            option: []
        })
    };

    const handleAddOptions = ()=>{
        setFieldData(prev=>({
            ...prev,
            options: [...prev.options, ""]
        }))
    }

    const handleDeleteOptions = (index)=>{
        setFieldData(prev=>({
            ...prev,
            options: prev.options.filter((_, i)=> i !== index)
        }))
    }
    const handleOptionChange = (index, value)=>{
        setFieldData(prev=>({
            ...prev,
            options: prev.options.map((option, i)=> i === index ? value : option)
        }))
    }

    const onSubmit = () => {
        if (detail?._id)
            onUpdate(detail?._id, fieldData);
        else {
            onCreate(fieldData);
        }
        resetDetail()
        handleClose();
    };

    useEffect(() => {
        if (!isEmptyObject(detail)) {
            setFieldData(detail)
        }
    }, [detail])



    return (
        <Drawer
            open={open}
            onClose={handleClose}
            anchor={anchor}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Add Project</DialogTitle>
                <DialogContent  dividers>
                    <TextField
                        margin="dense"
                        id="label"
                        label="Label"
                        type="label"
                        required
                        fullWidth
                        variant="outlined"
                        value={fieldData.label}
                        onChange={(e) => {
                            handleChange("label", e.target.value)
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                        required
                        variant="outlined"
                        value={fieldData.name}
                        onChange={(e) => {
                            handleChange("name", e.target.value)
                        }}
                    />
                    <Select
                        labelId="type"
                        id="type"
                        fullWidth
                        sx={{
                            my:1
                        }}
                        label="Field Type"
                        value={fieldData?.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                    >
                        {FieldTypeConstants?.map((item, index) => (
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        ))}
                    </Select>

                    <Divider sx={{ margin: "10px 0" }} />

                    {fieldData?.type === "select" && (
                        <Box>
                            <Button
                            sx={{my:2}}
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddOptions}
                            >
                                Add Select Value
                            </Button>
                            {fieldData.options.map((option, index) => (
                                <Box key={index} sx={{
                                    display:"flex",
                                    alignItems:"center",
                                    my:1
                                }}>
                                    <TextField
                                        type="text"
                                        className="form-control"
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        placeholder="Enter option"
                                    />
                                    <DeleteIcon sx={{ml:1, color:"red", cursor:"pointer"}} onClick={()=>{handleDeleteOptions(index)}}/>
                                </Box>
                            ))}
                        </Box>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Drawer>
    )

}

export default FieldDrawer