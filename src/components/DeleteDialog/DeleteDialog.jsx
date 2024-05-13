import { Button, DialogActions, DialogTitle, Snackbar } from "@mui/material";
import Dialog from "components/Dialog";
import IconButton from "components/IconButton";
import Close from "components/icons/Close";
import { useCallback, useState } from "react";

function DeleteDialog({ dialogOpen, onDelete, onDialogClose }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleDialogClose = useCallback(() => {
        onDialogClose();
    }, [onDialogClose]);

    const handleSnackbarClose = useCallback(() => {
        setSnackbarOpen(false);
    }, []);

    const handleDelete = useCallback(() => {
        setSnackbarOpen(true);//todo this not working and no idea why
        onDelete();
    }, [onDelete]);
    
    return (
        <>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle>Are you sure you want delete this article?</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={handleDelete}
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={handleDialogClose}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Article deleted successfully"
                action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                    <Close fontSize="small" />
                </IconButton>
                }
            />
        </>
    )
}

export default DeleteDialog;