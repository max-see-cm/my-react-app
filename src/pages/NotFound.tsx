import { Box, Stack, Typography } from "@mui/material";
import ErrorWrongActionHuman from '../assets/error-wrong-human.svg';
import { ButtonEwaStyle } from "../components/Button/ButtonStyles";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function NotFound() {

    const navigate = useNavigate();

    const imgBackgroundUrl = new URL('../assets/background.svg', import.meta.url).href
    const onClickToLoginPage = () => {
        navigate('/', { replace: true });
    }

    return <Box
        sx={{
            backgroundImage: `url(${imgBackgroundUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}>
            <Stack>
                <Typography variant="h2" align="center" >Oops! Where am I?</Typography>
                <img src={ErrorWrongActionHuman} />
                <Typography variant="h2" align="center" >404</Typography>
                <ButtonEwaStyle sx={{ mt: 4 }} variant="contained" size="large" onClick={onClickToLoginPage}>Let's go back</ButtonEwaStyle>
            </Stack>
        </motion.div>

    </Box>
}