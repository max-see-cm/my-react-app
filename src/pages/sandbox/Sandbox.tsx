import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";


export default function Sandbox() {

    const onSubmitRejectClaim = () => {

    }

    const imgBackgroundUrl = new URL('../../assets/background.svg', import.meta.url).href
    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}>
        <Box
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
            {/* <Stack> */}
            {/* <SuccessApproveClaimCard referenceNo="asdas" /> */}
            {/* <SuccessRejectClaimCard referenceNo="qwwdaads" /> */}
            {/* </Stack> */}
            {/* <Stack>

               
            </Stack> */}



        </Box>
    </motion.div>
}