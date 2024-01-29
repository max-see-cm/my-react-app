import { Box, Grid, Typography } from "@mui/material";
import StatusCard from "../../components/Card/StatusCard";
import { getColorStatus } from "../../util/util";
import MuiTableApprovalLeaves from "../../components/Table/MuiTableApprovalLeaves";
import { useQuery } from "react-query";
import { ResponseApprovalStats } from "../../models/common.model";
import { fetchApprovalLeaveStats } from "../../api/LeaveAPI";


function LeaveApproval() {

    const { isLoading, isError, data: useApprovalStats } = useQuery<ResponseApprovalStats, Error>(["leaveStats"], fetchApprovalLeaveStats)

    return <Box sx={{ p: 7, minHeight: '100vh' }}>
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant='h3'>
                    My Approval
                </Typography>
            </Grid>
            <Grid item xs={12} container spacing={4}>
                <Grid item xs={3}>
                    <StatusCard color={getColorStatus("Pending")} statusLabel="Pending" value={(!isLoading && !isError && useApprovalStats) ? useApprovalStats.pendingApprovalTotal.toString() : "0"} />
                </Grid>
                <Grid item xs={3}>
                    <StatusCard color={getColorStatus("Approved")} statusLabel="Approved" value={(!isLoading && !isError && useApprovalStats) ? useApprovalStats.approvedTotal.toString() : "0"} />
                </Grid>
                <Grid item xs={3}>
                    <StatusCard color={getColorStatus("Rejected")} statusLabel="Rejected" value={(!isLoading && !isError && useApprovalStats) ? useApprovalStats.rejectedTotal.toString() : "0"} />
                </Grid>
                <Grid item xs={3}>
                    <StatusCard color={getColorStatus("Withdrawn")} statusLabel="Withdrawn" value={(!isLoading && !isError && useApprovalStats) ? useApprovalStats.withdrawnTotal.toString() : "0"} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <MuiTableApprovalLeaves />
            </Grid>

        </Grid>
    </Box>;
}

export default LeaveApproval;