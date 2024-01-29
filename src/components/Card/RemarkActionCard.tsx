import { Card, Stack, Typography, Box, FormHelperText } from "@mui/material"
import { motion } from "framer-motion"
import EwaMedLogo from '../../assets/ewark-logo.svg';
import { ButtonEwaStyle } from "../Button/ButtonStyles";
import { InputBoxMultiLine } from "../TextField/InputBox";
import { useForm } from "react-hook-form";

interface RemarkActionProps {
    referenceNo: string | undefined,
    onSubmitRejectClaim: (value: any) => void,
    actionType:string

}

export default function RemarkActionCard(props: RemarkActionProps) {

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            remark: '',
        }
    });

    return <form onSubmit={handleSubmit(props.onSubmitRejectClaim)}>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}>


            <Card
                sx={{
                    width: '35rem', // Approximately 600px in rem (assuming 1rem = 16px)
                    //height: '48.625rem', // Approximately 778px in rem (assuming 1rem = 16px)
                    borderRadius: '1.5rem', // Approximately 24px in rem (assuming 1rem = 16px)
                    backgroundColor: 'white',
                    padding: { xs: '2rem', sm: '4rem' },
                }}
            >
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <Stack >
                        <img src={EwaMedLogo} style={{
                            transform: 'scale(0.7)'
                        }} />

                        <Typography variant="h5" align="center" sx={{ mt: 2 }}>Please provide your remarks for rejecting the {props.actionType}</Typography>
                        {/* <Typography variant="labelText2" align="center" sx={{ mt: 4 }}>Reference No.</Typography>
                        <Typography variant="subtitle2" align="center" sx={{ color: '#252A2D', fontSize: '1.125rem', mt: 1 }}>{props.referenceNo ? props.referenceNo : '-'}</Typography> */}
                        <InputBoxMultiLine   {...register('remark', { required: "Please enter your remark" })} multiline rows={9} value={watch('remark')} placeholder='Enter your remark here' sx={{ width: '100%', mt: 8 }} />
                        <FormHelperText sx={{ ml: 2 }} error={errors?.remark ? true : false}>{errors?.remark ? errors.remark.message : null}</FormHelperText>
                    </Stack>
                    <Stack sx={{ mt: 4 }} spacing={1} justifyContent="flex-end">
                        <ButtonEwaStyle variant="contained" size="large" type="submit">Submit Now</ButtonEwaStyle>
                    </Stack>
                </Box>


            </Card>
        </motion.div>
    </ form>

}