import { Box, Grid, Typography } from "@mui/material";
import StatusCard from "../../components/Card/StatusCard";
import MuiTableApprovalClaims from "../../components/Table/MuiTableApprovalClaims";
import axios from "axios";
import { useQuery } from "react-query";
import { ResponseApprovalStats } from "../../models/common.model";
import { getColorStatus } from "../../util/util";
import { fetchApprovalStats } from "../../api/ClaimAPI";

function ClaimsApproval() {

    const useApprovalStats = useQuery<ResponseApprovalStats, Error>(["approvalStats"], fetchApprovalStats)

    return <Box sx={{ p: 7, minHeight: '100vh' }}>
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant='h3'>
                    My Approval
                </Typography>
            </Grid>
            <Grid item xs={12} container spacing={4}>
                <Grid item xs={3}>
                    <StatusCard color={getColorStatus("Pending")} statusLabel="Pending" value={useApprovalStats.data ? useApprovalStats.data.pendingApprovalTotal.toString() : "0"} />
                </Grid>
                <Grid item xs={3}>
                    <StatusCard color={getColorStatus("Approved")} statusLabel="Approved" value={useApprovalStats.data ? useApprovalStats.data.approvedTotal.toString() : "0"} />
                </Grid>
                <Grid item xs={3}>
                    <StatusCard color={getColorStatus("Rejected")} statusLabel="Rejected" value={useApprovalStats.data ? useApprovalStats.data.rejectedTotal.toString() : "0"} />
                </Grid>
                <Grid item xs={3}>
                    <StatusCard color={getColorStatus("Withdrawn")} statusLabel="Withdrawn" value={useApprovalStats.data ? useApprovalStats.data.withdrawnTotal.toString() : "0"} />
                </Grid>

            </Grid>
            <Grid item xs={12}>
                <MuiTableApprovalClaims />
            </Grid>

        </Grid>
    </Box>;
}


export default ClaimsApproval;