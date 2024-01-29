import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Typography,
} from "@mui/material";
import {
  ButtonEwaStyleShort,
  ButtonEwaStyleShortInverted,
} from "../Button/ButtonStyles";
import { InputBoxMultiLine } from "../TextField/InputBox";
import { useForm } from "react-hook-form";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmitRejectItem: (values: any) => void;
  itemId: string | undefined;
  itemType: string;
};

function ModalRejectItem({
  open,
  onClose,
  itemId,
  onSubmitRejectItem,
  itemType,
}:

ModalProps) {


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      remark: "",
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "1.5rem",
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmitRejectItem)}>
        <DialogTitle sx={{ p: 4 }}>
          <Typography variant="h5">Reject {itemType}</Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 4, borderRadius: "1.5rem" }}>
          {/* <DialogContentText sx={{ mb: 4 }}>
            Please provide a remark to reject. It is mandatory to enter a remark
            in order to submit the withdrawal.
          </DialogContentText> */}
          <InputBoxMultiLine
            {...register("remark", { required: "Please enter your remarks" })}
            multiline
            rows={4}
            value={watch("remark")}
            placeholder="Enter Remarks"
            sx={{ width: "100%" }}
          />
          <FormHelperText sx={{ ml: 2 }} error={errors?.remark ? true : false}>
            {errors?.remark ? errors.remark.message : null}
          </FormHelperText>
        </DialogContent>
        <DialogActions sx={{ p: 4 }}>
          <ButtonEwaStyleShortInverted variant="text" onClick={onClose}>
            Cancel
          </ButtonEwaStyleShortInverted>
          <ButtonEwaStyleShort variant="contained" type="submit">
            Reject
          </ButtonEwaStyleShort>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalRejectItem;
