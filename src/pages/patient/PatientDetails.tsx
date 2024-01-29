import { Avatar, Box, Card, Grid, Tab, Tabs, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { json, useLocation } from "react-router-dom";
import PatientDetailsCard from "../../components/Card/PatientDetailsCard";
import PatientVisitDetails from "../../components/Card/PatientAdditionalDetails";
import PatientInvoiceListCard from "../../components/Card/PatientInvoiceListCard";
import PatientFamilyDetailsCard from "../../components/Card/PatientFamilyDetailsCard";
import PatientAdditionalInfoCard from "../../components/Card/PatientAdditionalInfoCard";
import { PatientDetailsResponse } from "../../models/patient.model";

function PatientDetails() {
  const location = useLocation();
  const [patientId, setPatientId] = useState();
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  async function fetchPatientDetails() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v3/patients/${patientId}`,
      {
        params: {
          patientAdditionalInfos: true,
          addresses: true,
          referralInfo: true,
          visit: true,
          contact: true,
          BillingInfo: true,
          IsAllowMultiIdSupportPatient: true,
          billPageNo: 1,
          billPageSize: 5,
        },
      }
    );

    //cf1158df-9ca1-46ed-915f-277e2ef79b4f

    // if (data.code == "SUCCESS") {
    return data;
    //}
  }

  const usePatientDetails = useQuery<PatientDetailsResponse, Error>(
    ["patient", patientId],
    fetchPatientDetails,
    {
      onSuccess(data) {
        console.log("data usePatientdetails", data);
      },
      enabled: patientId !== null,
    }
  );
  const { data } = usePatientDetails;

  useEffect(() => {
    if (location.state) {
      const { patientId } = location.state;
      if (patientId) setPatientId(patientId);
    }
  });

  return (
    <Box sx={{ p: 7, minHeight: "100vh" }}>
      <Grid container gap={4}>
        {/* <Grid item xs={1}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Avatar sx={{ height: 84, width: 84 }} />
          </Box>
        </Grid> */}
        <Grid item xs={10}>
          <Typography variant="h5">{data?.patient.fullName}</Typography>
          <Typography variant="subtitle1">
            {data?.patient.sequenceNo}
          </Typography>
        </Grid>

        {data && (
          <>
            <Grid container gap={2}>
              <Grid item xs={6}>
                <PatientDetailsCard patientDetails={data?.patient} />
              </Grid>
              <Grid item xs={5}>
                <PatientVisitDetails patientDetails={data?.patient} />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Tabs
                onChange={handleChange}
                value={tabValue}
                indicatorColor="secondary"
                sx={{
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                  "& .MuiButtonBase-root.MuiTab-root": {
                    color: "black",
                    transition: "color 0.2s ease-in-out",
                    "&:hover": {
                      color: "green)",
                    },
                    "&.Mui-selected": {
                      color: "white",
                      backgroundColor: "secondary.main",
                      borderRadius: "12px",
                    },

                    backgroundColor: "white",
                    fontFamily: "Lexend",
                  },
                }}
                // TabIndicatorProps={{ sx: { backgroundColor: "black" } }}
                textColor="inherit"
                aria-label="Tabs where each tab needs to be selected manually"
              >
                <Tab label="Invoicing" />
                <Tab label="Additional information" />
                <Tab label="Family" />
              </Tabs>
            </Grid>
            <div
              hidden={tabValue !== 0}
              id={`simple-tabpanel-0`}
              aria-labelledby={`simple-tab-0`}
            >
              <PatientInvoiceListCard patientDetails={data?.patient} />
            </div>
            <div
              hidden={tabValue !== 1}
              id={`simple-tabpanel-1`}
              aria-labelledby={`simple-tab-1`}
            >
              <PatientAdditionalInfoCard patientDetails={data?.patient} />
            </div>
            <div
              hidden={tabValue !== 2}
              id={`simple-tabpanel-2`}
              aria-labelledby={`simple-tab-2`}
            >
              <PatientFamilyDetailsCard relations={data.relations} />
            </div>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default PatientDetails;
