import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, Typography } from "@mui/material";
import { ButtonEwaStyleShort, ButtonEwaStyleShortInverted } from "../Button/ButtonStyles";
import { InputBoxMultiLine } from "../TextField/InputBox";
import { useForm } from "react-hook-form";
import { updateEventClaim } from "../../api/ClaimAPI";
import { Claim, UpdateEventClaimProps } from "../../models/claim.model";
import { useMutation } from "react-query";
import { ResponseQuery } from "../../models/common.model";


type ModalProps = {
    open: boolean;
    onClose: () => void;
    onSuccessSubmit: () => void;
    claimId: string | undefined;
};

function ModalWithdrawClaim({ open, onClose, claimId, onSuccessSubmit }: ModalProps) {

    const withdrawRemarkMutation = useMutation<ResponseQuery<Claim>, Error, UpdateEventClaimProps>(async (claimProps) => await updateEventClaim(claimProps),
        {
            onSuccess: (data) => {
                if (data.code == "SUCCESS") {
                    onSuccessSubmit();
                }
            },
            onError: (error: Error) => {
                console.log('error', error)
            }
        });

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            remark: '',
        }
    });

    const onSubmitWithdrawal = (values: any) => {
        withdrawRemarkMutation.mutate({ id: claimId, event: 'WITHDRAW', remarks: values.remark })
    }

    return <Dialog open={open} onClose={onClose} sx={{
        '& .MuiPaper-root': {
            borderRadius: '1.5rem'
        }
    }}>
        <form onSubmit={handleSubmit(onSubmitWithdrawal)} >
            <DialogTitle sx={{ p: 4 }}><Typography variant='h5'>Withdraw Claim</Typography></DialogTitle>
            <DialogContent sx={{ p: 4, borderRadius: '1.5rem' }}>
                <DialogContentText sx={{ mb: 4 }}>
                    To proceed with claim withdrawal, please provide a remark. It is mandatory to enter a remark in order to submit the withdrawal.
                </DialogContentText>
                <InputBoxMultiLine   {...register('remark', { required: "Please enter your remark" })} multiline rows={4} value={watch('remark')} placeholder='Enter Remark' sx={{ width: '100%' }} />
                <FormHelperText sx={{ ml: 2 }} error={errors?.remark ? true : false}>{errors?.remark ? errors.remark.message : null}</FormHelperText>
            </DialogContent>
            <DialogActions sx={{ p: 4 }}>
                <ButtonEwaStyleShortInverted variant="text" onClick={onClose}>Cancel</ButtonEwaStyleShortInverted>
                <ButtonEwaStyleShort variant="contained" type="submit">Withdraw</ButtonEwaStyleShort>
            </DialogActions>
        </form >
    </Dialog>

}

export default ModalWithdrawClaim;