import { Card, Stack, Typography, Box } from "@mui/material"
import { motion } from "framer-motion"
import EwaMedLogo from '../../assets/ewark-logo.svg';
import ErrorWrongActionHuman from '../../assets/error-wrong-human.svg';
import { ButtonEwaStyle } from "../Button/ButtonStyles";
import { useNavigate } from "react-router-dom";

export default function ErrorClaimActionCard() {
    const navigate = useNavigate();

    const onClickToLoginPage = () => {
        navigate('/', { replace: true });
    }


    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>


        <Card
            sx={{
                width: '38.4rem', // Approximately 600px in rem (assuming 1rem = 16px)
                height: '48.625rem', // Approximately 778px in rem (assuming 1rem = 16px)
                borderRadius: '1.5rem', // Approximately 24px in rem (assuming 1rem = 16px)
                backgroundColor: 'white',
                padding: '4rem',
            }}
        >
            <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                <Stack >
                    <img src={EwaMedLogo} style={{
                        transform: 'scale(0.7)'
                    }} />
                    <img src={ErrorWrongActionHuman} style={{
                        transform: 'scale(0.8)'
                    }} />

                    <Typography variant="h5" align="center" >Oops! Something went wrong!</Typography>
                    <Typography variant="subtitle2" align="center" sx={{ color: '#252A2D', fontSize: '1.125rem', mt: 3 }}>You are unable to carry out the action.</Typography>
                </Stack>
                <Stack spacing={1} justifyContent="flex-end">
                    <ButtonEwaStyle variant="contained" size="large" onClick={onClickToLoginPage}>Login to Ewark</ButtonEwaStyle>
                </Stack>
            </Box>


        </Card>
    </motion.div>

}