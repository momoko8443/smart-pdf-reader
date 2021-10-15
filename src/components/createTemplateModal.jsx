import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Select, TextField, Typography, } from "@material-ui/core";
import { useState } from "react";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
const BigDialogPaper = styled(Paper)({
    maxWidth: '600px'
})
const useStyles = (theme => ({

}));
// {
//     open:boolean,
//     onClose: function
// }
export default function CreateTemplateModal(props) {
    const classes = useStyles();
    const handleClose = () => {
        props.onClose && props.onClose();
    }
    const createTemplate = () => {
        props.onSubmit = () => {

        }
    }
    const emptyField = {
        name: '',
        type: 'number',
        coordinate: { x: 0, y: 0 },
        rect: { w: 0, h: 0 }
    }
    const [fields, setFields] = useState([emptyField]);

    const handleDateTypeChange = ()=>{

    }

    const addField = () => {
        const copyFields = JSON.parse(JSON.stringify(fields));
        copyFields.push({
            emptyField
        });
        setFields(copyFields);
    }
    const removeField = (item, index) => {
        if(index > 0){
            const copyFields = JSON.parse(JSON.stringify(fields));
            copyFields.splice(index,1);
            setFields(copyFields);
        }
    }
    return (
        <Dialog
            fullWidth
            // PaperComponent={BigDialogPaper}
            open={props.open}
            onClose={handleClose} maxWidth="sm">
            <DialogTitle>
                Create Template
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Template Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <Typography>
                    Fields:
                </Typography>
                {
                    fields.map((item,index) => {
                        return (
                            <Grid key={index} container spacing={2} justifyContent="center">
                                <Grid item xs={6}>
                                    <TextField
                                    fullWidth
                                        autoFocus
                                        margin="dense"
                                        label="Field Name"
                                        type="text"
                                        variant="standard"
                                        value={item.name}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <Select
                                    fullWidth
                                        variant="filled"
                                        value={item.type}
                                        label="Data Type"
                                        onChange={handleDateTypeChange}>
                                        <MenuItem value={'string'}>String</MenuItem>
                                        <MenuItem value={'number'}>Number</MenuItem>
                                        <MenuItem value={'date'}>Date</MenuItem>
                                        <MenuItem value={'array'}>Array</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton onClick={() => removeField(item, index)}>
                                        <DeleteOutlineIcon></DeleteOutlineIcon>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        )
                    })
                }
                <IconButton onClick={addField}>
                    <AddIcon></AddIcon>
                </IconButton>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={createTemplate}>Create</Button>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}