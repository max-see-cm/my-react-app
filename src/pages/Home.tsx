import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import {
  Alert,
  Box,
  Grid,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ButtonDropdownEwaStyle,
  RotatingArrowDropDownIcon,
} from "../components/Button/ButtonStyles";
import { User } from "../models/user.model";
import { motion } from "framer-motion";

function Home() {
  const auth = useContext(AuthContext);
  const userData: User = auth.getUserInfo();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 7, minHeight: "100vh" }}>
      <Grid container>
        <Grid item xs={6}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3">Welcome, {userData.name}</Typography>
          </motion.div>
        </Grid>
        {/* <Grid item xs={6} sx={{ textAlign: "right" }}>
          <ButtonDropdownEwaStyle
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="contained"
            size="large"
            endIcon={
              <RotatingArrowDropDownIcon
                sx={{
                  transform: open ? "rotate(180deg)" : "",
                }}
              />
            }
          >
            Create New
          </ButtonDropdownEwaStyle>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              // "&:hover": {
              //     backgroundColor: "#009900 !important"
              // }
            }}
            sx={{
              "& .MuiMenu-paper": {
                backgroundColor: (theme) => theme.palette.primary.main,
                minWidth: "10%",
                mt: 0.5,
                ml: 2,
                boxShadow: "none",
                "& .MuiMenuItem-root": {
                  "&:hover": {
                    backgroundColor: "#73322C",
                    //color: 'black',
                  },
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("claim/my-claim/claim-submission");
              }}
            >
              Claim
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/main/leave/my-leaves/leave-application");
              }}
            >
              Leave
            </MenuItem>
          </Menu>
        </Grid> */}

        {/* <Grid item xs={12}>
          <Alert
            icon={
              <SvgIcon>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Layer_1">
                    <path
                      id="Vector"
                      d="M18.25 34.75C27.3627 34.75 34.75 27.3627 34.75 18.25C34.75 9.1373 27.3627 1.75 18.25 1.75C9.1373 1.75 1.75 9.1373 1.75 18.25C1.75 27.3627 9.1373 34.75 18.25 34.75Z"
                      stroke="#295576"
                      stroke-width="2"
                      stroke-miterlimit="10"
                    />
                    <g id="Group">
                      <path
                        id="Vector_2"
                        d="M18.25 16V26"
                        stroke="#4EB8B9"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        id="Vector_3"
                        d="M18.25 12.5C18.8023 12.5 19.25 12.0523 19.25 11.5C19.25 10.9477 18.8023 10.5 18.25 10.5C17.6977 10.5 17.25 10.9477 17.25 11.5C17.25 12.0523 17.6977 12.5 18.25 12.5Z"
                        fill="#4EB8B9"
                      />
                    </g>
                  </g>
                </svg>
              </SvgIcon>
            }
            severity="error"
            sx={{
              color: "#252A2D",
              mt: 4,
              borderRadius: "0.75rem",
              backgroundColor: "#FAE0DE",
              "& .MuiAlert-icon": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            Please be reminded that all claims need to be submitted before the{" "}
            <b>
              10<sup>th</sup>
            </b>{" "}
            of every month to obtain approval from your direct superior. Any
            late submissions will be processed in the following month.
          </Alert>
        </Grid> */}
      </Grid>

      {/* <Button onClick={() => {
            auth.signout(() => {
                navigate('/', { replace: true });
            })
        }}>Logout</Button> */}
    </Box>
  );
}

export default Home;
