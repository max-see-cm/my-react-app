import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { PatientFullInfo } from "../../models/patient.model";

type PatientDetailsProps = {
  patientDetails: PatientFullInfo;
};
function PatientAdditionalDetails({ patientDetails }: PatientDetailsProps) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 2,
        minHeight: "100%",
        borderRadius: "1.5rem",
      }}
    >
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Box sx={{ bgcolor: (theme) => theme.palette.secondary.main, p: 1 }}>
            <Typography variant="h6">More Information</Typography>
          </Box>
        </Grid>
        {/* <Grid item xs={12}>
              <Typography variant="subtitle1">Name</Typography>
              <Typography variant="subtitle2">{patientDetails.fullName}</Typography>
            </Grid> */}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Registration date</Typography>
          <Typography variant="subtitle2">
            {dayjs(
              patientDetails.patientAdditionalInfo.registrationDate
            ).format("DD/MM/YYYY")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Register At</Typography>
          <Typography variant="subtitle2">
            {patientDetails.patientAdditionalInfo.registrationLocationName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Register Type</Typography>
          <Typography variant="subtitle2">
            {patientDetails.isTemporary ? "Registered" : "Temporary"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Address</Typography>
          <Typography variant="subtitle2">
            {patientDetails.invoiceAddress.addressLine1} +
            {patientDetails.invoiceAddress.addressLine2}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PatientAdditionalDetails;
