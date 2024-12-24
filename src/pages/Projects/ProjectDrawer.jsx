import React, { useEffect } from 'react'
import { Box, Button, Card, DialogActions, DialogContent, DialogTitle, Divider, Drawer, Grid2, MenuItem, Select, TextField } from '@mui/material';
import { useProjectStore } from './Service';
import { useForm } from "react-hook-form";
import { isEmptyObject } from '../../utils/helper';
import { useFormsStore } from '../Forms/Service';
import { useFieldsStore } from '../FieldPage/Service';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from 'antd';
import Checkbox from '@mui/material/Checkbox';
const ProjectDrawer = ({ open, setOpen, anchor = "right" }) => {

    const {
        handleSubmit,
    } = useForm();
    const { onCreate, detail, resetDetail, onUpdate } = useProjectStore()
    const { detail: formDetail, fetchDetail: fetchFormDetail, onCreate: onFormCreate, onUpdate: onFormUpdate } = useFormsStore()
    const { data: fieldData, fetchGrid: fetchFieldGrid, filters: fieldFilter, setFilters: fieldSetFilter } = useFieldsStore()

    const [projectData, setProjectData] = React.useState({
        name: '',
        description: '',
        domain: "",
        forms: []
    });

    const handleChange = (key, value) => {
        setProjectData(prev => ({
            ...prev,
            [key]: value
        }))
    }
    const handleClose = () => {
        setOpen(false);
        resetDetail()
        setProjectData({
            name: '',
            description: '',
            domain: ""
        })
    };

    const addFieldToForm = (formIndex) => {
        const updatedForms = [...projectData.forms];
        updatedForms[formIndex].fields.push({ _id: fieldData.length ? fieldData[0]._id : '' });
        setProjectData((prev) => ({
            ...prev,
            forms: updatedForms
        }));
    };


    const handleFormChange = (index, key, value) => {
        const updatedForms = [...projectData.forms];
        updatedForms[index][key] = value;
        setProjectData((prev) => ({
            ...prev,
            forms: updatedForms
        }));
    };



    const handleFieldChange = (formIndex, fieldIndex, key, value) => {
        const updatedForms = [...projectData.forms];
        updatedForms[formIndex].fields[fieldIndex][key] = value;
        setProjectData((prev) => ({
            ...prev,
            forms: updatedForms
        }));
    };


    const handleRequiredFields = (formIndex, fieldId) => {
        const updatedForms = projectData.forms.map((form, index) => {

            if (index == formIndex) {
                let requiredFieldsArray = form?.requiredFields ?? [];

                const foundIndex = requiredFieldsArray.findIndex(requiredField => requiredField == fieldId);
                if (foundIndex != -1) {
                    requiredFieldsArray.splice(foundIndex, 1);
                } else requiredFieldsArray.push(fieldId);
                return { ...form, requiredFields: requiredFieldsArray }
            }
            return form
        })
        setProjectData((prev) => ({
            ...prev,
            forms: updatedForms
        }));
    }

    const removeFieldFromForm = (formIndex, fieldIndex) => {
        const updatedForms = [...projectData.forms];
        updatedForms[formIndex].fields.splice(fieldIndex, 1);
        setProjectData((prev) => ({
            ...prev,
            forms: updatedForms
        }));
    };


    const onProjectSubmit = () => {
        if (detail?._id)
            onUpdate(detail?._id, projectData);
        else {
            onCreate(projectData);
        }
        resetDetail()
        handleClose();
    };


    const handleFormSubmit = async (formIndex) => {

        const form = projectData.forms[formIndex];
        onFormUpdate(form?._id, form, false)
    };

    const removeUtmParameters = (formIndex, utmIndex) => {
        const updatedForms = [...projectData.forms];
        updatedForms[formIndex].utmParameters.splice(utmIndex, 1)
        setProjectData((prev) => ({
            ...prev,
            forms: updatedForms
        }));
    }

    const addUtmParameters = (formIndex,) => {
        const updatedForms = [...projectData.forms];
        updatedForms[formIndex].utmParameters.push("")
        setProjectData((prev) => ({
            ...prev,
            forms: updatedForms
        }));
    }

    const handleUtmParameters = (formIndex, utmIndex, value) => {
        const updatedForms = [...projectData.forms];
        updatedForms[formIndex].utmParameters[utmIndex] = value;
        setProjectData((prev) => ({
            ...prev,
            forms: updatedForms
        }));
    }

    useEffect(() => {
        if (!isEmptyObject(detail)) {
            setProjectData(detail)
        }
        if (detail?._id) {
            fetchFormDetail("", "in[client,contact]", detail?._id,)
        }

    }, [detail])

    useEffect(() => {
        if (formDetail) {
            setProjectData((prev) => ({
                ...prev,
                forms: formDetail
            }))
        }
    }, [formDetail])

    useEffect(() => {
        if (fieldData.length == 0) {
            fetchFieldGrid()
        }
    }, [])

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            anchor={anchor}
            PaperProps={{
                sx: { width: "70%" },
            }}

        >
            <form onSubmit={handleSubmit(onProjectSubmit)}>
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
                        onChange={(e) => {
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
                        onChange={(e) => {
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
                        onChange={(e) => {
                            handleChange("domain", e.target.value)
                        }}
                    />
                    <Divider sx={{ my: 3 }} />
                    {projectData.forms?.length > 0 && projectData?.forms?.map((form, formIndex) => {
                        return <Card sx={{
                            p: 2,
                            my: 2
                        }} key={`form-${formIndex}`}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <TextField
                                    margin="dense"
                                    id="Title"
                                    label="Form Title"
                                    type="title"
                                    sx={{
                                        flex: 1,
                                        mr: 8
                                    }}
                                    required
                                    variant="outlined"
                                    value={form.title}
                                    onChange={(e) => {
                                        handleFormChange(formIndex, "title", e.target.value)
                                    }}
                                />

                                <Checkbox
                                    checked={form?.showOTP ? true : false}
                                    onChange={(e) => handleFormChange(formIndex, 'showOTP', e.target.checked)}
                                />
                                <Typography>
                                    Show OTP
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                gap: 2,
                            }}>
                                <Box sx={{
                                    flex: 1
                                }}>
                                    <Button
                                        size='4'
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => {
                                            addFieldToForm(formIndex)
                                        }}
                                    >
                                        Field
                                    </Button>
                                    {form?.fields?.map((field, fieldIndex) => (
                                        <Box key={`form-${formIndex}-field-${fieldIndex}`} className="input-group mb-2 w-100">
                                            <Select
                                                className="form-select"
                                                value={field?._id || ''}
                                                onChange={(e) => handleFieldChange(formIndex, fieldIndex, '_id', e.target.value)}
                                            >
                                                <MenuItem value="" disabled>Select a field</MenuItem>
                                                {fieldData?.map((f) => (
                                                    <MenuItem key={f?._id} value={f?._id}>{f?.label}</MenuItem>
                                                ))}
                                            </Select>
                                            <Box className="form-check m-2">
                                                <Checkbox
                                                    className="form-check-input"
                                                    checked={form?.requiredFields?.includes(field?._id) || false}
                                                    onChange={(e) => handleRequiredFields(formIndex, field?._id)}
                                                />
                                                <Typography>
                                                    *
                                                </Typography>
                                                <CloseIcon className='delete-icon' onClick={() => removeFieldFromForm(formIndex, fieldIndex)} />
                                            </Box>
                                        </Box>
                                    ))}

                                </Box>
                                <Box sx={{
                                    flex: 1,
                                }}>
                                    <Button
                                        size='4'
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => {
                                            addUtmParameters(formIndex)
                                        }}
                                    >
                                        Utm Paramters
                                    </Button>
                                    {form?.utmParameters?.map((utmParameter, utmIndex) => (
                                        <Box key={`form-${formIndex}-utm-${utmIndex}`} className="input-group mb-2 w-100">
                                            <TextField
                                                margin="dense"
                                                id="Title"
                                                label="Form Title"
                                                type="title"
                                                sx={{
                                                    flex: 1,
                                                    mr: 8
                                                }}
                                                required
                                                variant="outlined"
                                                value={utmParameter}
                                                onChange={(e) => {
                                                    handleUtmParameters(formIndex, utmIndex, e.target.value)
                                                }}
                                            />
                                            <CloseIcon className='delete-icon' onClick={() => removeUtmParameters(formIndex, utmIndex)} />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Button variant="contained" onClick={() => {
                                handleFormSubmit(formIndex)
                            }} >{form?._id ? "Update" : "Save"} Form</Button>
                        </Card>
                    })}
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

export default ProjectDrawer