import { FormHelperText, FormHelperTextProps, styled } from "@mui/material";


export const ErrorMessageLabel = styled(FormHelperText)<FormHelperTextProps>(({ theme }) => ({

    'p &.MuiFormHelperText-root': {
        ml: 2,
    }


}));