import { Box, Card, Stack, Typography } from "@mui/material";
import { LeaveEntitlement, LeaveType } from "../../models/leave.model";

type LeaveEntitlementCardProps = {
    leaveEntitlement: LeaveEntitlement
}

function LeaveEntitlementCard(leaveEntitlementCardProps: LeaveEntitlementCardProps) {
    const { leaveEntitlement } = leaveEntitlementCardProps;

    return <Card variant="outlined" sx={{ border: 'none', borderRadius: '24px', p: 3, minWidth: '200px', mr: '16px' }}>
        <Stack spacing={1}>
            <Typography variant="h6" color="secondary" textAlign="center">{(leaveEntitlement.leaveType as LeaveType).name}</Typography>
            <Box textAlign="center"> <img style={{ width: 80, height: 80 }} src={(leaveEntitlement.leaveType as LeaveType).iconUrl} /></Box>
            <Typography variant="h4" textAlign="center">{leaveEntitlement.balance}</Typography>
            <Typography variant="body2" color="textColor" textAlign="center">Total: {leaveEntitlement.entitledDays}</Typography>
        </Stack>
    </Card>
}

export default LeaveEntitlementCard;