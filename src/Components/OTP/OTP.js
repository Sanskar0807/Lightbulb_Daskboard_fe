import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
// import { getFormattedMobile } from "utils/common";
// import CloseIcon from "@mui/icons-material/Close";
// import "../../../../App.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "#f4f6fb",
  pt: "30px",
  border: "2px solid #000",
  boxShadow: 24,
  px: 6,
  py: 3,
  borderRadius: 2,
  border: "none",
};
const style2 = {
  height: "35px",
  marginTop: "0 1.5rem",
  fontSize: "1.5rem",
  borderRadius: "4px",
  marginLeft: "18px",
  border: "1px solid rgba(0, 0, 0, 0.5)",
};
let timerId = null;
export default function OTP({
  open,
  handleVerifyOtp,
  mobileNumber,
  resendOTP,
  closeModal
  
}) {
  const dispatch = useDispatch();
  
  const [remainingTime, setRemainingTime] = useState(59);
  const [showResendButton, setShowResendButton] = useState(false);
  const [otp, setOtp] = useState("");
  useEffect(() => {
    open && startTimer();
    return () => {
      !open && stopTimer();
    };
  }, [open]);
  useEffect(() => {
    if (remainingTime === 0) {
      setShowResendButton(true);
      stopTimer();
    }
  }, [remainingTime]);
  const handlechange = (e) => {
    setOtp(e);
  };
  const handleClose = () => {
    setOtp("")
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerifyOtp(otp);
    handleClose()
  };
  const handleResend = () => {
    startTimer();
    resendOTP();
  };
  const startTimer = () => {
    setRemainingTime(59);
    setShowResendButton(false);
    timerId = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(timerId);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={closeModal                                                                                                                                                                }
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={closeModal}>
        <form onSubmit={handleSubmit}>
          <Box className="otp-mobile-screen" sx={style}>
            <Box sx={{ textAlignLast: "right" }}>
              {/* <CloseIcon onClick={handleClose} className="close-button" /> */}
            </Box>
            <Grid xs={12}>
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h1"
                sx={{ mb: 2, justifyContent: "center", display: "flex" }}
              >
                Enter Verification Code
              </Typography>
            </Grid>
            <Typography
              id="transition-modal-description"
              sx={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "13px",
                  textAlign: "center",
                  marginBottom: "2rem",
                }}
              >
                {/* We have just sent a verification code to {getFormattedMobile(mobileNumber)} */}
              </Typography>
              <Box>
                <OtpInput
                  inputStyle={style2}
                  value={otp}
                  onChange={handlechange}
                  numInputs={4}
                  isInputNum={true}
                  shouldAutoFocus
                />
              </Box>
            </Typography>
            <Grid container alignItems={"center"} gap={2} justifyContent="center" sx={{ my: 2 }}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {true ? (
                  <Typography
                    onClick={handleResend}
                    sx={{
                      color: "#344767",
                      fontSize: "13px",
                      textDecoration: "underline",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Resend
                  </Typography>
                ) : (
                  <Typography sx={{ color: "#344767", fontSize: "14px" }}>
                    {remainingTime} Sec
                  </Typography>
                )}
              </Grid>
              {(otp.length==4) &&<Grid item xs={10}>
                <Button
                  fullWidth
                  variant="gradient"
                  color="info"
                  type="submit"
                  className="otp-button"
                >
                  Verify
                </Button>
              </Grid>}
            </Grid>
          </Box>
        </form>
      </Fade>
    </Modal>
  );
}