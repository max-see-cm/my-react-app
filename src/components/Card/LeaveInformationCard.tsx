import { Box, Grid, Typography } from "@mui/material";
import { LeaveInformationProps } from "../../models/leave.model";
import { getColorStatus, prettifyStatusLabel } from "../../util/util";

function LeaveInformationCard(leaveInformationProps: LeaveInformationProps) {


    return <Box sx={{ backgroundColor: 'white', p: 2, minHeight: '100%', borderRadius: '1.5rem' }}>
        <Grid container spacing={2} sx={{ p: 4 }}>
            <Grid item xs={12}>
                <Box sx={{ bgcolor: (theme) => theme.palette.secondary.main, p: 1 }}>
                    <Typography variant='h6'>
                        Leave Information
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    Reference No.
                </Typography>
                <Typography variant='subtitle2'>
                    {leaveInformationProps.referenceNo}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    Employee Name
                </Typography>
                <Typography variant='subtitle2'>
                    {leaveInformationProps.userData.name ? leaveInformationProps.userData.name : '-'}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    Employee ID
                </Typography>
                <Typography variant='subtitle2'>
                    {leaveInformationProps.userData.employeeId ? leaveInformationProps.userData.employeeId : '-'}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ bgcolor: (theme) => theme.palette.secondary.main, p: 1 }}>
                    <Typography variant='h6'>
                        Entitlement Summary
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    Entitled
                </Typography>
                <Typography variant='subtitle2'>
                    {leaveInformationProps.entitledDays ? leaveInformationProps.entitledDays === -1 ? "-" : leaveInformationProps.entitledDays : "-"}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    Balance
                </Typography>
                <Typography variant='subtitle2'>
                    {leaveInformationProps.entitledBalance ? leaveInformationProps.entitledBalance === -1 ? "-" : leaveInformationProps.entitledBalance : "-"}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ bgcolor: (theme) => theme.palette.secondary.main, p: 1 }}>
                    <Typography variant='h6'>
                        Approval Information
                    </Typography>
                </Box>
            </Grid>
            {leaveInformationProps.approval ?
                <>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1'>
                            Approval 1
                        </Typography>
                        <Typography variant='subtitle2'>
                            {leaveInformationProps.approval.name}
                        </Typography>
                        <Typography variant='subtitle1' sx={{ mt: 1 }} >
                            Status: <Typography variant='h6' color={getColorStatus(leaveInformationProps.status)}>{prettifyStatusLabel(leaveInformationProps.status)}</Typography>
                        </Typography>
                        <Typography variant='subtitle1' sx={{ mt: 1 }} >
                            Remarks: 
                        </Typography>
                        <Typography variant='subtitle2'>
                            {leaveInformationProps.rejectionRemarks}
                        </Typography>
                    </Grid>
                </> : null}
        </Grid>
    </Box>
}

export default LeaveInformationCard;