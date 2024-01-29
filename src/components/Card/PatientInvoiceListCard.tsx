import {
  Box,
  Button,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import React from "react";
import { BillingInfo, PatientFullInfo } from "../../models/patient.model";

type PatientDetailsProps = {
  patientDetails: PatientFullInfo;
};
function PatientInvoiceListCard({ patientDetails }: PatientDetailsProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ backgroundColor: "white", borderRadius: "24px", p: 2 }}>
          {/* <Grid item xs={12}>
            <Box
              sx={{ bgcolor: (theme) => theme.palette.secondary.main, p: 1 }}
            >
              <Typography variant="h6">Invoicing</Typography>
            </Box>
          </Grid> */}
          <TableContainer>
            <Table sx={{ width: "100%" }}>
              <TableHead
                sx={{
                  backgroundColor: "#FFFFFF",
                  minWidth: "100%",
                  " & , MuiTableHead- root": {
                    mt: 4,
                    mb: 4,
                    borderRadius: "24px",
                  },
                }}
              >
                <TableRow>
                  <TableCell align="left">
                    <Typography variant="tableHeader">Payor name</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="tableHeader">Patient name</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="tableHeader">ID no</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="tableHeader">
                      Membership number
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="tableHeader">
                      Employee number
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="tableHeader">
                      Cover category
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="tableHeader">
                      Membership expiry
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="tableHeader">Member Status</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="tableHeader">Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* </Box> */}

              <TableBody
                sx={{
                  backgroundColor: "#FFFFFF",
                  mt: 4,
                  "& .MuiTableBody-root": { mt: 4, borderRadius: "24px" },
                }}
              >
                {patientDetails.billingInfo
                  ? patientDetails.billingInfo.map(
                      (data: BillingInfo, index: number) => {
                        return (
                          <>
                            <TableRow
                              key={data.billingInfoId}
                              // onClick={() => { navigate(`/main/employee/employeeDetails/${row._id}`) }}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left" width="50">
                                {data.payor.name}
                              </TableCell>
                              <TableCell align="left">
                                {data.employee?.name}
                              </TableCell>
                              <TableCell align="right">
                                {data.nationalIdNo}
                              </TableCell>
                              <TableCell align="left">
                                {data.medNumber}
                              </TableCell>
                              <TableCell align="left">
                                {data.employeeCode}
                              </TableCell>
                              <TableCell align="left">
                                {dayjs(data.expiry).format("DD/MM/YYYY")}
                              </TableCell>
                              <TableCell align="right">
                                {data.memberStatus}
                              </TableCell>
                              <TableCell align="right">
                                {data.memberStatus}
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="text"
                                  color="tertiary"
                                  sx={{ m: 0, p: 0 }}
                                  onClick={() => {}}
                                >
                                  Action
                                </Button>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      }
                    )
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </motion.div>
    </>
  );
}

export default PatientInvoiceListCard;
