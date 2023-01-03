import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function SimpleSnackbar(props) {
  console.log("🚀 ~ file: Snack.js ~ line 8 ~ SimpleSnackbar ~ props", props);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        open={props.values != ""}
        autoHideDuration={6000}
        onClose={handleClose}
        message={props.values}
      />
    </div>
  );
}
