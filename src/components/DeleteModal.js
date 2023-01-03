import { React } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid red",
  boxShadow: 24,
  p: 4,
};

const text = {
  textAlign: "center",
};
export default function DeleteModal(props) {
  return (
    <div>
      <Modal
        open={props.values}
        onClose={props.openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ ...text, fontWeight: "bold", color: "primary" }}
          >
            Are you sure?
          </Typography>
          <Typography variant="body1" component="div" sx={{ ...text }}>
            Do you really want to delete this record? This process cannot be
            undone.
          </Typography>
          <Box
            sx={{
              marginX: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={props.deleteItem}
              sx={{ marginRight: 1 }}
            >
              Yes
            </Button>
            <Button variant="outlined" color="error" onClick={props.openModal}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
