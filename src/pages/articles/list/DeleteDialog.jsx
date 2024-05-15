import { Button, DialogActions, DialogTitle } from "@mui/material";
import Dialog from "components/Dialog";
import { useCallback } from "react";

function DeleteDialog({ dialogOpen, onDelete, onDialogClose }) {
    const handleDialogClose = useCallback(() => {
        onDialogClose();
    }, [onDialogClose]);

    const handleDelete = useCallback(() => {
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
        </>
    )
}

export default DeleteDialog;