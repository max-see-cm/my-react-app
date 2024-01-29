
import { Select, SelectProps, TextField, TextFieldProps, createTheme, styled } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";

export const InputBox = styled(TextField)<TextFieldProps>(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '24px',
        width: '100%',
        height: '54px',
        '& fieldset': {
            borderColor: theme.palette.secondary.main,
        },
        '& input': {
            marginLeft: '1rem',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#73322C',
        },
        // '& .MuiInputBase-input': {
        //     padding: 8
        // }

    },

}));


export const InputBoxMultiLine = styled(TextField)<TextFieldProps>(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '24px',
        width: '100%',
        '& fieldset': {
            borderColor: theme.palette.secondary.main,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#73322C',
        },
        '& input': {
            marginLeft: '1rem',
        },
        '& .MuiInputBase-input': {
            padding: 8
        }

    },
}));


export const SelectInput = styled(Select)<SelectProps>(({ theme }) => ({
    '& .MuiSelect-select': {
        borderRadius: '36px',
        width: '100%',
        borderColor: theme.palette.secondary.main,
        '& fieldset': {
            borderColor: theme.palette.secondary.main,
        },

        '& .MuiInputBase-input': {
            padding: 8
        }

        // '& input': {
        //     marginLeft: '1rem'
        // }
    },

}));



export const DateInputCustom = styled(DatePicker)<DatePickerProps<any>>(({ theme }) => ({
    width: '100%',
    mr: 2,

    '& .MuiPickersCalendarHeader-label': {
        color: 'black',

    },
    // '& .MuiPickersCalendarHeader-root': {
    //     '& .MuiPickersCalendarHeader-label': {
    //         color: 'black'
    //     }
    // },
    '& .MuiOutlinedInput-root': {
        borderRadius: '36px',
        width: '100%',

        '& fieldset': {
            borderColor: theme.palette.secondary.main,

        },
        '& input': {
            marginLeft: '1rem',

        },
        // '&.Mui-focused': {
        //     borderColor: '#73322C',
        // },


    },
    '& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline ': {
        borderColor: '#73322C',

    },



}));

export const DateInputFilterCustom = styled(DatePicker)<DatePickerProps<any>>(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        width: '100%',
        '& fieldset': {
            border: 'none'
        },
        '& input': {
            marginLeft: '1rem'
        }
    },
    border: 'none',
    outline: 'none',
}));


export const SelectDropdownCustom = styled(Select)<SelectProps<any>>(({ theme }) => ({

    '& .MuiInputBase-root ': {
        pl: 2,
        '& .MuiSvgIcon-root': {
            mr: 2
        }
    },

    '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '36px',

    }, '& fieldset': {
        borderColor: theme.palette.secondary.main,

    },
    '& legend': { display: 'none' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#73322C',
    },



}));