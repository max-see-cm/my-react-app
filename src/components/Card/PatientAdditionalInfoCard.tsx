import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { PatientFullInfo } from "../../models/patient.model";

type PatientDetailsProps = {
  patientDetails: PatientFullInfo;
};

function PatientAdditionalInfoCard({ patientDetails }: PatientDetailsProps) {
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
          <Typography variant="subtitle1">Is confidential</Typography>
          <Typography variant="subtitle2">
            {patientDetails.patientAdditionalInfo.isConfidential ? "Yes" : "No"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Is VIP</Typography>
          <Typography variant="subtitle2">
            {patientDetails.patientAdditionalInfo.isVip ? "Yes" : "No"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Allow Portal Access</Typography>
          <Typography variant="subtitle2">
            {patientDetails.patientAdditionalInfo.allowPortalAccess
              ? "Yes"
              : "No"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Is deceased</Typography>
          <Typography variant="subtitle2">
            {" "}
            {patientDetails.patientAdditionalInfo.isDeceased ? "Yes" : "No"}
          </Typography>
        </Grid>

        {patientDetails.patientAdditionalInfo.isDeceased && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Date of death</Typography>
              <Typography variant="subtitle2">
                {dayjs(
                  patientDetails.patientAdditionalInfo.deceasedDate
                ).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Reason of death</Typography>
              <Typography variant="subtitle2">
                {patientDetails.patientAdditionalInfo.deceasedReason}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default PatientAdditionalInfoCard;
