import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ButtonEwaStyleShort } from "../../components/Button/ButtonStyles";
import MuiTableClaims from "../../components/Table/MuiTableClaims";
import MuiTableApprovalClaims from "../../components/Table/MuiTableApprovalClaims";

function ClaimMain() {
    const navigate = useNavigate();
    return <Box sx={{ p: 7, minHeight: '100vh' }}
    >
        <Grid container>
            <Grid item xs={6}>
                <Typography variant='h3'>
                    My Claims
                </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <ButtonEwaStyleShort
                    onClick={() => {
                        navigate('/main/claim/my-claim/claim-submission')
                    }}
                    variant="contained"
                    size="large"

                >
                    Create New
                </ButtonEwaStyleShort>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
                {/* <Table /> */}

                <MuiTableClaims />


            </Grid>
            <Grid item xs={12} sx={{ mt: 8 }} >
                <Typography variant='h3'>
                    My Approval
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
                {/* <Table /> */}

                <MuiTableApprovalClaims />


            </Grid>
        </Grid>
    </Box >
}

export default ClaimMain;