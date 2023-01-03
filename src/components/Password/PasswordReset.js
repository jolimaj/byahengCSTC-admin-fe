import Footer from "../";
import ResetForm from "../ResetPassword";
import Box from "@mui/material/Box";

export default function PasswordReset() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <ResetForm />
        <Footer />
      </Box>
    </Box>
  );
}
