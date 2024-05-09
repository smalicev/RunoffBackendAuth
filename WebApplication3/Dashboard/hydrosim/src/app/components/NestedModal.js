import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "flex",
    flexDirection: "column",
    rowGap: "2rem",
    transform: "translate(-50%, -50%)",
    bgcolor: "primary.dark",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button color="secondary" variant="contained" onClick={handleOpen}>
                Equation Sheet
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box color="secondary.main" sx={{ ...style, width: "20rem" }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit.
                    </p>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleClose}
                    >
                        Close Child Modal
                    </Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function NestedModal({
    buttonLabel,
    icon,
    modalText,
    childModalText,
    fullDoc,
}) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button

                sx={{
                    color: "black",
                    textShadow: "0px 0px 2px rgba(0, 0, 0, 0.26)",
                }}
                onClick={handleOpen}
            >
                {buttonLabel} {icon}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box color="secondary.main" sx={{ ...style, width: "35rem" }}>
                    <h2 id="parent-modal-title">Summary</h2>
                    <p id="parent-modal-description">{modalText}</p>
                    <ChildModal />
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleOpen}
                    >
                        Full Documentation
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
