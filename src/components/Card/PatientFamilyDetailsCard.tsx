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
import { Relations } from "../../models/patient.model";

type PatientFamilyProps = {
  relations: Relations[];
};

export function PatientFamilyDetailsCard({ relations }: PatientFamilyProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "24px",
            p: 2,
            width: "100%",
          }}
        >
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
                    <Typography variant="tableHeader">Name</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="tableHeader">Relation</Typography>
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
                {relations
                  ? relations.map((data: Relations, index: number) => {
                      return (
                        <>
                          <TableRow
                            key={data.id}
                            // onClick={() => { navigate(`/main/employee/employeeDetails/${row._id}`) }}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="left">{data.id}</TableCell>
                            <TableCell align="left">{data.relation}</TableCell>
                          </TableRow>
                        </>
                      );
                    })
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </motion.div>
    </>
  );
}

export default PatientFamilyDetailsCard;
