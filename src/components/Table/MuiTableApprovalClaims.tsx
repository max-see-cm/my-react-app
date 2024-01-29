import {
  Alert,
  AlertColor,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Pagination,
  PaginationItem,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { DateInputFilterCustom } from "../TextField/InputBox";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { ResponseQuery } from "../../models/common.model";
import {
  ApproveClaimProps,
  Claim,
  UpdateEventClaimProps,
} from "../../models/claim.model";
import {
  convertCentToRM,
  getColorStatus,
  getNotificationMessage,
  prettifyStatusLabel,
} from "../../util/util";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { motion } from "framer-motion";
import ModalRejectItem from "../Modal/ModalRejectItem";
import {
  updateEventClaim,
} from "../../api/ClaimAPI";

function MuiTableApprovalClaims() {
  const [filterDate, setFilterDate] = useState(dayjs());
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(7);
  const navigate = useNavigate();
  const [totalRecord, setTotalRecord] = useState(0);

  const [notificationisOpen, setNotificationIsOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] =
    useState<AlertColor>("success");
  const [openRejectClaimModal, setOpenRejectClaimModal] = useState(false);
  const [modalClaimId, setModalClaimId] = useState('');

  const handleCloseSnackbar = () => {
    setNotificationIsOpen(false);
  };

  const onCloseRejectClaimModal = () => {
    setOpenRejectClaimModal(false);
  };

  const onOpenRejectClaimModal = () => {
    setOpenRejectClaimModal(true);
  };

  const updateEventClaimMutate = useMutation<
    ResponseQuery<Claim>,
    Error,
    UpdateEventClaimProps
  >(async (claimProps) => await updateEventClaim(claimProps), {
    onSuccess: (data) => {
      if (data.code == "SUCCESS") {
        if (data.data.length > 0) {
          pushNotification(
            getNotificationMessage(data.data[0].status),
            "success"
          );

          useApproval.refetch();
        }
      }
    },
    onError: (error: Error) => {
      pushNotification(error.message, "error");
    },
  });

  const onSubmitRejectClaim = (values: any) => {
    updateEventClaimMutate.mutate({
      id: modalClaimId,
      event: "REJECT",
      remarks: values.remark,
    });
    setOpenRejectClaimModal(false);
  }

  const pushNotification = (message: string, type: AlertColor) => {
    setNotificationIsOpen(true);
    setNotificationMessage(message);
    setNotificationType(type);
  };

  async function fetchApprovals() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/claims/approval`,
      {
        params: {
          page: page,
          perPage: rowsPerPage,
        },
      }
    );

    if (data.code == "SUCCESS") {
      return data;
    }
  }
  const useApproval = useQuery<ResponseQuery<Claim>, Error>(
    ["approval", page, rowsPerPage],
    fetchApprovals,
    {
      onSuccess(data) {
        setTotalRecord(data.total);
      },
    }
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data } = useApproval;

  if (useApproval.isLoading) {
    return <div>loading</div>;
  }

  if (useApproval.isError) {
    return <div>{useApproval.error.message}</div>;
  }

  return (
    <>
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={6} justifyContent="space-between">
          {/* <DateInputFilterCustom value={filterDate} onChange={(date) => { date ? setFilterDate(date) : null }} /> */}
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
          <TableContainer sx={{ width: "100%" }}>
            <Table>
              {/* <Box sx={{ mb: 4, borderRadius: '24px', backgroundColor: '#FFFFFF' }}> */}
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
                    <Typography variant="tableHeader">Date</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="tableHeader">Staff Name</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="tableHeader">Type</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="tableHeader">Amount(MYR)</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="tableHeader">Status</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="tableHeader" sx={{ mr: 0 }}>
                      Action
                    </Typography>
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
                {data
                  ? data.data.map((data) => {
                      return (
                        <TableRow
                          hover
                          key={data._id}
                          // onClick={() => { navigate(`/main/employee/employeeDetails/${row._id}`) }}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left" width="50">
                            {dayjs(data.createdAt).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell align="left">{data.user.name}</TableCell>
                          <TableCell align="left">{data.type.name}</TableCell>
                          <TableCell align="right" width="40">
                            {convertCentToRM(data.amount)}
                          </TableCell>
                          <TableCell align="left">
                            <Typography
                              variant="h6"
                              color={getColorStatus(data.status)}
                            >
                              {prettifyStatusLabel(data.status)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right" width="200">
                            {data.status == "PENDING_APPROVAL" && (
                              <>
                                <Tooltip title="Approve Claim" arrow>
                                  <IconButton
                                    color="tertiary"
                                    onClick={() => {
                                      updateEventClaimMutate.mutate({
                                        id: data._id,
                                        event: "APPROVE",
                                      });
                                    }}
                                  >
                                    <CheckCircleOutlinedIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Reject Claim" arrow>
                                  <IconButton
                                    color="primary"
                                    onClick={() => {
                                      setModalClaimId(data._id);
                                      onOpenRejectClaimModal();
                                    }}
                                  >
                                    <CancelOutlinedIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            <Button
                              variant="text"
                              color="tertiary"
                              onClick={() => {
                                navigate(
                                  "/main/claim/my-approval-claim/claim-details",
                                  { state: { claimInfo: data, viewOnly: true } }
                                );
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </motion.div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={notificationisOpen}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={notificationType}
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
      { <ModalRejectItem
        open={openRejectClaimModal}
        onClose={onCloseRejectClaimModal}
        itemId={modalClaimId}
        // onSuccessSubmit={onSuccessWithdraw}
        onSubmitRejectItem={onSubmitRejectClaim}
        itemType="Claim"
      /> }
    </>
  );
}

export default MuiTableApprovalClaims;
