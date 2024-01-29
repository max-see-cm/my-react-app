import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, Typography } from "@mui/material";
import { ButtonEwaStyleShort, ButtonEwaStyleShortInverted } from "../Button/ButtonStyles";
import { InputBoxMultiLine } from "../TextField/InputBox";
import { useForm } from "react-hook-form";

import { useMutation, useQueryClient } from "react-query";
import { ResponseQuery } from "../../models/common.model";
import { UpdateActionLeaveProps } from "../../models/leave.model";
import { updateEventLeave } from "../../api/LeaveAPI";


type ModalProps = {
    open: boolean;
    onClose: () => void;
    onSuccessSubmit: () => void;
    leaveId: string | undefined;
    onFailSubmit: (error: Error) => void;
};

function ModalWithdrawLeave({ open, onClose, leaveId, onSuccessSubmit, onFailSubmit }: ModalProps) {
    const queryClient = useQueryClient();
    const withdrawLeaveMutation = useMutation<ResponseQuery<any>, Error, UpdateActionLeaveProps>(async (updateActionLeaveProps: UpdateActionLeaveProps) => await updateEventLeave(updateActionLeaveProps),
        {
            onSuccess: (data) => {
                if (data.code === 'SUCCESS') {
                    onSuccessSubmit()
                    queryClient.invalidateQueries(['approvalLeaveResponse']);
                }
            },
            onError: (error: Error) => {
                onFailSubmit(error);
            }
        })

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            remark: '',
        }
    });

    const onSubmitWithdrawal = (values: any) => {
        withdrawLeaveMutation.mutate({ id: leaveId, event: 'WITHDRAW', remarks: values.remark })
    }

    return <Dialog open={open} onClose={onClose} sx={{
        '& .MuiPaper-root': {
            borderRadius: '1.5rem'
        }
    }}>
        <form onSubmit={handleSubmit(onSubmitWithdrawal)} >
            <DialogTitle sx={{ p: 4 }}><Typography variant='h5'>Withdraw Leave</Typography></DialogTitle>
            <DialogContent sx={{ p: 4, borderRadius: '1.5rem' }}>
                <DialogContentText sx={{ mb: 4 }}>
                    To proceed with leave withdrawal, please provide a remark. It is mandatory to enter a remark in order to submit the withdrawal.
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

export default ModalWithdrawLeave;