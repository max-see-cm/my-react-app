import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { PatientFullInfo } from "../../models/patient.model";

type PatientDetailsProps = {
  patientDetails: PatientFullInfo;
};

function PatientDetailsCard({ patientDetails }: PatientDetailsProps) {
  async function fetchNationalIDTypeList() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v3/identity-document-types/${
        patientDetails.patientAdditionalInfo.nationalIdType
      }`
    );
    return data;
  }

  const useNationalIDType = useQuery(
    ["nationalIDType", patientDetails.patientAdditionalInfo.nationalIdType],
    fetchNationalIDTypeList,
    {
      onSuccess(data) {
        console.log("data fetchNationalIDTypeList", data);
      },
    }
  );

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
            <Typography variant="h6">Patient Information details</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1"> Age</Typography>
          <Typography variant="subtitle2">{patientDetails.age}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Gender</Typography>
          <Typography variant="subtitle2">
            {patientDetails.gender === "1" ? "Male" : "Female"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Date of Birth</Typography>
          <Typography variant="subtitle2">
            {dayjs(patientDetails.dateOfBirth).format("DD/MM/YYYY")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Nationality</Typography>
          <Typography variant="subtitle2">
            {"-"}
            {/* {patientDetails.patientAdditionalInfo.nationality} */}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">National ID type</Typography>
          <Typography variant="subtitle2">
            {useNationalIDType.data && useNationalIDType.data?.name}
            {/* {patientDetails.patientAdditionalInfo.nationalIdType} */}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">National ID number</Typography>
          <Typography variant="subtitle2">
            {patientDetails.patientAdditionalInfo.nationalIdNo}
          </Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <Typography variant="subtitle1">File no</Typography>
          <Typography variant="subtitle2">{patientDetails.fileNo}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">Patient Category</Typography>
          <Typography variant="subtitle2"></Typography>
        </Grid> */}

        <Grid item xs={12}>
          <Typography variant="subtitle1">Mobile</Typography>
          <Typography variant="subtitle2">
            {patientDetails.contact.mobileCode + patientDetails.contact.mobile}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PatientDetailsCard;
