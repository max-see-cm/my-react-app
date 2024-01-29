import { IconButton, Menu, MenuItem } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";


export default function EwaMainMenu() {


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return <>
        <IconButton sx={{ color: 'white' }} aria-label="mainmenu" aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
            <KeyboardArrowDownIcon sx={{
                transform: open ? "rotate(180deg)" : "",
            }} />
        </IconButton>
        <Menu
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
            id="main-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',

            }}
            sx={{
                '& .MuiMenu-paper': {
                    backgroundColor: (theme) => theme.palette.primary.main,
                    minWidth: '10%',
                   // mr:50,

                
                    boxShadow: 'none',
                    '& .MuiMenuItem-root': {
                        '&:hover': {
                            backgroundColor: '#73322C',
                        }
                    }
                },
            }}

        >
            <MenuItem onClick={() => {
                auth.signout(() => {
                    navigate('/', { replace: true });
                })
            }}>Logout</MenuItem>
            {/* <MenuItem onClick={() => { navigate('/main/leave') }}>Edit Password</MenuItem> */}
        </Menu>

    </>


}

