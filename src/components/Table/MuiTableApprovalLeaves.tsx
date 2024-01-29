import { Alert, AlertColor, Box, Button, Grid, IconButton, Pagination, PaginationItem, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getColorStatus, getNotificationLeaveMessage, prettifyStatusLabel } from "../../util/util";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useActionOnLeaveMutate, useApprovalLeave } from "../../api/LeaveAPI";
import { motion } from "framer-motion";
import ModalRejectItem from "../Modal/ModalRejectItem";

function MuiTableApprovalLeaves() {

    const [filterDate, setFilterDate] = useState(dayjs());
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowPerPage] = useState(7);
    const [notificationisOpen, setNotificationIsOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState<AlertColor>("success");
    const [openRejectLeaveModal, setOpenRejectLeaveModal] = useState(false);
    const [modalLeaveId, setModalLeaveId] = useState('');

    const pushNotification = (message: string, type: AlertColor, status?: string) => {
        setNotificationIsOpen(true);
        setNotificationType(type);
        if (status) {
            setNotificationMessage(getNotificationLeaveMessage(status));
        } else {
            setNotificationMessage(message);
        }

        //refetchApprovalLeave();


    }

    const { approvalLeave, approvalLeaveCount, refetchApprovalLeave } = useApprovalLeave(page, rowsPerPage);
    const approvalLeaveActionMutation = useActionOnLeaveMutate(pushNotification);
    const navigate = useNavigate();

    const handleCloseSnackbar = () => {
        setNotificationIsOpen(false);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const onCloseRejectLeaveModal = () => {
        setOpenRejectLeaveModal(false);
    };

    const onOpenRejectLeaveModal = () => {
        setOpenRejectLeaveModal(true);
    };

    const onSubmitRejectLeave = (values: any) => {
        approvalLeaveActionMutation.mutate({
            id: modalLeaveId,
            event: "REJECT",
            remarks: values.remark,
        });
        setOpenRejectLeaveModal(false);
    }

    return <>
        <Grid container sx={{ mb: 2 }}>
            <Grid item xs={6} justifyContent="space-between">
                {/* <DateInputFilterCustom value={filterDate} onChange={(date) => { date ? setFilterDate(date) : null }} /> */}
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end" >
                <Box sx={{
                    display: 'flex', alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Pagination
                        page={page}
                        count={Math.ceil(approvalLeaveCount / rowsPerPage)}
                        onChange={handleChange}
                        renderItem={(item) => {

                            return <PaginationItem
                                slots={{ previous: ArrowCircleLeftOutlinedIcon, next: ArrowCircleRightOutlinedIcon }}
                                {...item}
                            />
                        }}
                    />
                </Box>
            </Grid>
        </Grid>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <Box sx={{ backgroundColor: 'white', borderRadius: '24px', p: 2 }}>
                <TableContainer sx={{ width: '100%' }}  >
                    <Table>
                        {/* <Box sx={{ mb: 4, borderRadius: '24px', backgroundColor: '#FFFFFF' }}> */}
                        <TableHead sx={{ backgroundColor: '#FFFFFF', minWidth: '100%', ' & , MuiTableHead- root': { mt: 4, mb: 4, borderRadius: '24px' } }}>
                            <TableRow>
                                <TableCell align="left" ><Typography variant="tableHeader">Date</Typography></TableCell>
                                <TableCell align="left" ><Typography variant="tableHeader">Staff Name</Typography></TableCell>
                                <TableCell align="left"><Typography variant="tableHeader">Type</Typography></TableCell>
                                <TableCell align="left" ><Typography variant="tableHeader">Start Date</Typography></TableCell>
                                <TableCell align="left"><Typography variant="tableHeader">End Date</Typography></TableCell>
                                <TableCell align="right"><Typography variant="tableHeader">Day(s)</Typography></TableCell>
                                <TableCell align="left"><Typography variant="tableHeader">Status</Typography></TableCell>
                                <TableCell align="right"><Typography variant="tableHeader" sx={{ pr: 2 }}>Actions</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        {/* </Box> */}

                        <TableBody sx={{ backgroundColor: '#FFFFFF', mt: 4, '& .MuiTableBody-root': { mt: 4, borderRadius: '24px' } }} >

                            {approvalLeave ? approvalLeave.map((data, index) => {

                                return <TableRow
                                    hover
                                    key={data._id}
                                    // onClick={() => { navigate(`/main/employee/employeeDetails/${row._id}`) }}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left" width="50" >{dayjs(data.createdAt).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell align="left" >{data.user.name}</TableCell>
                                    <TableCell align="left" >{data.type.name}</TableCell>
                                    <TableCell align="left">{data.startDate ? dayjs(data.startDate).format('DD/MM/YYYY') : ""}</TableCell>
                                    <TableCell align="right" width="40">{data.startDate ? dayjs(data.endDate).format('DD/MM/YYYY') : ""}</TableCell>
                                    <TableCell align="right" >{data.noOfDays ? data.noOfDays : ""}</TableCell>
                                    <TableCell align="left" ><Typography variant="h6" color={getColorStatus(data.status)}>{prettifyStatusLabel(data.status)}</Typography></TableCell>
                                    <TableCell align="right" width="200">
                                        {(data.status == 'PENDING_APPROVAL' &&
                                            <>
                                                <Tooltip title="Approve Leave" arrow>
                                                    <IconButton color="tertiary" onClick={() => { approvalLeaveActionMutation.mutate({ id: data._id, event: 'APPROVE' }) }}>
                                                        <CheckCircleOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Reject Leave" arrow>
                                                    <IconButton color="primary" onClick={() => {
                                                        setModalLeaveId(data._id);
                                                        onOpenRejectLeaveModal();
                                                    }
                                                    }>
                                                        <CancelOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </>)}
                                        <Button variant="text" color="tertiary" onClick={() => { navigate('/main/leave/my-approval-leaves/leave-application', { state: { leaveInfo: data, viewOnly: true } }) }} >View</Button>
                                    </TableCell>
                                </TableRow>
                            }) : null}
                        </TableBody>
                    </Table>
                </TableContainer >
            </Box>
        </motion.div>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={notificationisOpen}
            onClose={handleCloseSnackbar}
        >
            <Alert onClose={handleCloseSnackbar} severity={notificationType} sx={{ width: '100%' }}>
                {notificationMessage}
            </Alert>
        </Snackbar>
        {<ModalRejectItem
            open={openRejectLeaveModal}
            onClose={onCloseRejectLeaveModal}
            itemId={modalLeaveId}
            // onSuccessSubmit={onSuccessWithdraw}
            onSubmitRejectItem={onSubmitRejectLeave}
            itemType="Claim"
        />}
    </>

}

export default MuiTableApprovalLeaves;