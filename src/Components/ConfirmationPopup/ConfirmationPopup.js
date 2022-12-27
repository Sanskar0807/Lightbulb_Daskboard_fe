import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

const ConfirmationPopup = ({ handleConfirmation, message, render }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleYes = () => {
    handleConfirmation();
    setIsPopupOpen(false);
  };
  const handlePopupOpen = () => setIsPopupOpen(true);
  return (
    <>
      <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setIsPopupOpen(false)}>
            No
          </Button>
          <Button variant="contained" onClick={handleYes}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {render(handlePopupOpen, isPopupOpen)}
    </>
  );
};
export default ConfirmationPopup;