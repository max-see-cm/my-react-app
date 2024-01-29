import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  PaginationItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DateInputFilterCustom, InputBox } from "../TextField/InputBox";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate, useNavigation } from "react-router-dom";
import { ResponsePatient, ResponseQuery } from "../../models/common.model";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import { RPA } from "../../models/patient.model";

interface MenuState {
  anchorEl: null | HTMLElement;
  isOpen: boolean;
}

function MuiTableRPA() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(7);
  const [menus, setMenus] = useState<MenuState[]>([]);
  const navigate = useNavigate();
  const [totalRecord, setTotalRecord] = useState(0);
  const [searchText, setSearchText] = useState("");

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log("page change", value);
    setPage(value);
  };

  async function fetchRpaList() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_DAYA_AUTOMATION_API_URL}/PatientVisit`, {
        // params: {
        //   "pagingParameter.pageNumber": page,
        //   "pagingParameter.pageSize": rowsPerPage,
        //  status: 1,
        //   searchText: searchText,
        // },
        headers: {
          "X-Api-Key":
            "oPBkPFNkgNuAtobw0CVWaZ8ARxb9munj",
        },
      });

      //return [
      //  {
      //    id: 0,
      //    clinicName: "string",
      //    patientName: "string",
      //    batchId: 0,
      //    patientId: "string",
      //    visitId: "string",
      //    processStatus: "string",
      //    remark: "string",
      //  },
      //];
      return response.data;
    } catch (error) {
      return [
      ];
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error for error handling in the component
    }
  }

  const usePatient = useQuery<RPA[], Error>(
    ["patientvisit", page, rowsPerPage, searchText],
    fetchRpaList,
    {
      onSuccess(data) {
        console.log("data usePatientVisit", data);
        setTotalRecord(data.length);
      },
    }
  );
  const { data, isLoading, isError, error } = usePatient;

  return (
    <>
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={6} justifyContent="space-between">
          <InputBox
            variant="outlined"
            fullWidth
            placeholder="Search"
            type="text"
            value={searchText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          ></InputBox>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pagination
              page={page}
              count={Math.ceil(totalRecord / rowsPerPage)}
              onChange={handleChange}
              renderItem={(item) => {
                return (
                  <PaginationItem
                    slots={{
                      previous: ArrowCircleLeftOutlinedIcon,
                      next: ArrowCircleRightOutlinedIcon,
                    }}
                    {...item}
                  />
                );
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ backgroundColor: "white", borderRadius: "24px", p: 2 }}>
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
                    <Typography variant="tableHeader">Clinic Name</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="tableHeader">Patient Name</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="tableHeader">Batch ID</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="tableHeader">Patient ID</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="tableHeader">Visit ID</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="tableHeader">Status</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="tableHeader">Remarks</Typography>
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
                {isLoading && <div>Loading</div>}
                {isError && <div>{error.message}</div>}
                {data
                  ? data.map((data: RPA, index: number) => {
                      return (
                        <>
                          <TableRow
                            key={index}
                            // onClick={() => { navigate(`/main/employee/employeeDetails/${row._id}`) }}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="left">
                              {data.clinicName}
                            </TableCell>
                            <TableCell align="left" width="50">
                              {data.patientName}
                              {/* {dayjs(data.createdAt).format("DD/MM/YYYY")} */}
                            </TableCell>
                            <TableCell align="left">{data.batchId}</TableCell>
                            <TableCell align="left">{data.patientId}</TableCell>
                            <TableCell align="left">{data.visitId}</TableCell>
                            <TableCell align="left">
                              {data.processStatus}
                            </TableCell>
                            <TableCell align="left">{data.remark}</TableCell>
                            {/* <TableCell align="right">
                            
                              <Button
                                variant="text"
                                color="tertiary"
                                sx={{ m: 0, p: 0 }}
                                onClick={() => {
                                  navigate("/main/patient/patient-details", {
                                    state: {
                                      patientId: data.id,
                                    },
                                  });
                                }}
                              >
                                View
                              </Button>
                            </TableCell> */}
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

export default MuiTableRPA;
