import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import {useState} from "react";

const ConfirmDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog
            onClose={() => setIsOpen(false)}
            open={isOpen}
            disableEscapeKeyDown={true}
        >
            <DialogTitle>
                {" "}
                <Typography variant="h4">Delete</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6">
                    Are you sure you want to delete this user?
                </Typography>
                <Typography variant="subtitle2">
                    You can't undo this operation
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained">No</Button>
                <Button variant="contained" color="error">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;