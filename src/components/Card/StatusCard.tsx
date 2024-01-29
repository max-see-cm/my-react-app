import { Card, Stack, Typography } from "@mui/material"

interface StatusProps {
    statusLabel: string,
    value: string,
    color: string
}

export default function StatusCard(status: StatusProps) {

    return <Card variant="outlined" sx={{ border: 'none', borderRadius: '12px', p: 3 }}>
        <Stack spacing={1}>
            <Typography variant="h6" color={status.color} textAlign="center">{status.statusLabel}</Typography>
            <Typography variant="h4" textAlign="center">{status.value}</Typography>
        </Stack>
    </Card>

}