import { Box, Grid, Typography } from "@mui/material";
import { convertCentToRM, getColorStatus, prettifyStatusLabel } from "../../util/util";
import { ClaimInformationProps } from "../../models/claim.model";


function ClaimInformationCard(claimInformationProps: ClaimInformationProps) {

    return <Box sx={{ backgroundColor: 'white', p: 2, minHeight: '100%', borderRadius: '1.5rem' }}>
        <Grid container spacing={2} sx={{ p: 4 }}>
            <Grid item xs={12}>
                <Box sx={{ bgcolor: (theme) => theme.palette.secondary.main, p: 1 }}>
                    <Typography variant='h6'>
                        Claim Information
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    Transaction No.
                </Typography>
                <Typography variant='subtitle2'>
                    {claimInformationProps.transactionNo ? claimInformationProps.transactionNo : '-'}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    Employee Name
                </Typography>
                <Typography variant='subtitle2'>
                    {claimInformationProps.userData.name ? claimInformationProps.userData.name : '-'}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    Employee ID
                </Typography>
                <Typography variant='subtitle2'>
                    {claimInformationProps.userData.employeeId ? claimInformationProps.userData.employeeId : '-'}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ bgcolor: (theme) => theme.palette.secondary.main, p: 1 }}>
                    <Typography variant='h6'>
                        Entitled Summary
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    Type
                </Typography>
                <Typography variant='subtitle2'>
                    Per Month
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    Entitled (MYR)
                </Typography>
                <Typography variant='subtitle2'>
                    {claimInformationProps.entitledAmount ? claimInformationProps.entitledAmount === -1 ? "-" : convertCentToRM(claimInformationProps.entitledAmount) : '-'}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    Balance (MYR)
                </Typography>
                <Typography variant='subtitle2'>
                    {claimInformationProps.entitledBalance === -1 ? "-" : convertCentToRM(claimInformationProps.entitledBalance)}
                    {/* {claimInformationProps.entitledBalance ? claimInformationProps.entitledBalance === -1 ? "-" : convertCentToRM(claimInformationProps.entitledBalance) : '-'} */}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ bgcolor: (theme) => theme.palette.secondary.main, p: 1 }}>
                    <Typography variant='h6'>
                        Approval Information
                    </Typography>
                </Box>
            </Grid>

            {claimInformationProps.approval ?
                <>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1'>
                            Approval 1
                        </Typography>
                        <Typography variant='subtitle2'>
                            {claimInformationProps.approval.name}
                        </Typography>
                        <Typography variant='subtitle2' sx={{ mt: 1 }} >
                            Status:  <Typography variant='h6' color={getColorStatus(claimInformationProps.status)}>{prettifyStatusLabel(claimInformationProps.status)}</Typography>
                        </Typography>
                        <Typography variant='subtitle1' sx={{ mt: 1 }} >
                            Remarks:
                        </Typography>
                        <Typography variant='subtitle2'>
                            {claimInformationProps.rejectionRemarks}
                        </Typography>
                    </Grid>
                </>
                : null}
            {/* <Grid item xs={12}>
            <Typography variant='subtitle1'>
                Approval 2
            </Typography>
            <Typography variant='subtitle2'>
                Nurul
            </Typography>
            <Typography variant='subtitle2'>
                Status:
            </Typography>
            <Typography variant='subtitle2'>
                Remark
            </Typography>
        </Grid> */}
        </Grid>
    </Box>

}

export default ClaimInformationCard;