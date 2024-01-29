import { Button, ButtonProps, styled } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const ButtonEwaStyle = styled(Button)<ButtonProps>(() => ({
    borderRadius: '36px',
    width: '100%',
    boxShadow: 'none',
    fontWeight: 500,
    fontFamily: 'Lexend',
    '&:hover': {
        backgroundColor: '#73322C',
        boxShadow: "none !important",
    }

    
}))

export const ButtonEwaStyleShort = styled(Button)<ButtonProps>(() => ({
    borderRadius: '36px',
    boxShadow: 'none',
    fontWeight: 500,
    fontFamily: 'Lexend',
    '&:hover': {
        backgroundColor: '#73322C',
        boxShadow: "none !important",
    }
}))

export const ButtonEwaStyleShortInverted = styled(Button)<ButtonProps>((theme) => ({
    borderRadius: '36px',
    boxShadow: 'none',
    fontWeight: 500,
    fontFamily: 'Lexend',
    // color:'#E66558',
    // backgroundColor:'#ffffff',
    '&:hover': {
        // backgroundColor: '#73322C',
        // boxShadow: "none !important",
    }
}))

export const ButtonDropdownEwaStyle = styled(Button)<ButtonProps>(() => ({
    borderRadius: '36px',
    boxShadow: 'none',
    fontWeight: 500,
    fontFamily: 'Lexend',
    '&:hover': {
        backgroundColor: '#73322C',
        boxShadow: "none !important",
    }
}))

export const RotatingArrowDropDownIcon = styled(ArrowDropDownIcon)({
    transition: "transform 0.2s",
});