import { Box, Grid, Typography } from "@mui/material";
import { ButtonEwaStyleShort } from "../../components/Button/ButtonStyles";
import { useNavigate } from "react-router-dom";
import MuiTablePatient from "../../components/Table/MuiTablePatient";

function Patient() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 7, minHeight: "100vh" }}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h3">Patient List</Typography>
        </Grid>
        {/* <Grid item xs={6} sx={{ textAlign: "right" }}>
          <ButtonEwaStyleShort
            onClick={() => {
              navigate("/main/patient/create-patient");
            }}
            variant="contained"
            size="large"
          >
            Create New
          </ButtonEwaStyleShort>
        </Grid> */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <MuiTablePatient />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Patient;
