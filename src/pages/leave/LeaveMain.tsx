import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ButtonEwaStyleShort } from "../../components/Button/ButtonStyles";
import MuiTableLeaves from "../../components/Table/MuiTableLeaves";
import MuiTableApprovalLeaves from "../../components/Table/MuiTableApprovalLeaves";

function LeaveMain() {
    const navigate = useNavigate();
    return <Box sx={{ p: 7, minHeight: '100vh' }}
    >
        <Grid container>
            <Grid item xs={6}>
                <Typography variant='h3'>
                    My Leaves
                </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <ButtonEwaStyleShort
                    onClick={() => {
                        navigate('/main/leave/my-leaves/leave-application')
                    }}
                    variant="contained"
                    size="large"

                >
                    Create New
                </ButtonEwaStyleShort>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
                {/* <Table /> */}

                <MuiTableLeaves />


            </Grid>
            <Grid item xs={12} sx={{ mt: 8 }} >
                <Typography variant='h3'>
                    My Approval
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
                {/* <Table /> */}

                <MuiTableApprovalLeaves />


            </Grid>
        </Grid>
    </Box >
}

export default LeaveMain;