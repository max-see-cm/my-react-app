import { Box, Grid, Typography } from "@mui/material"
import { ButtonEwaStyleShort } from "../../components/Button/ButtonStyles"
import MuiTableClaims from "../../components/Table/MuiTableClaims"
import { useNavigate } from "react-router-dom"

function Claims() {

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
        </Grid>
    </Box>
}

export default Claims;