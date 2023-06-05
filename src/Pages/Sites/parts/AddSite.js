import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import {usePatchUserMutation} from "../../../services/auth";
import {usePostSiteMutation} from "../../../services/sites";
import {toast} from "react-toastify";
import {getErrors} from "../../../features/utils/general";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddSite() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {register, handleSubmit, reset} = useForm();
    const [postSite, {error}] = usePostSiteMutation();


    const submitForm = (data) => {
        postSite({"name": data.name, "uri": data.uri})
            .unwrap()
            .then((payload) => {
                toast.success("Site created");
                setOpen(false)
                reset();
            })
            .catch((e) => {
                toast.error("Errors occured");
            });
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>Add new site</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box
                            component="form"
                            noValidate
                            sx={{mt: 1}}
                            onSubmit={handleSubmit(submitForm)}
                        >
                            <Typography variant="overline" gutterBottom>
                                Create new site
                            </Typography>
                            <TextField
                                // @ts-ignore
                                error={getErrors(error, "name")}
                                // @ts-ignore
                                helperText={getErrors(error, "name")}
                                type="text"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Site name"
                                autoComplete="name"
                                autoFocus
                                {...register("name")}
                            />
                            <TextField
                                // @ts-ignore
                                error={getErrors(error, "uri")}
                                // @ts-ignore
                                helperText={getErrors(error, "uri")}
                                type="text"
                                margin="normal"
                                required
                                fullWidth
                                id="uri"
                                label="Site uri"
                                autoComplete="uri"
                                autoFocus
                                {...register("uri")}
                            />
                            <Button variant="contained" type="submit">Add</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}