import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Backdrop,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputBox } from "../components/TextField/InputBox";
import { ButtonEwaStyle } from "../components/Button/ButtonStyles";
import { AuthContext } from "../auth/AuthContext";
import BackgroundImage from "../assets/login-background.svg";
import EwaMedLogo from "../assets/ewark-logo.svg";
import AstuteLogo from "../assets/astute-logo.png";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { ErrorAPIReponse } from "../models/common.model";
import { encodeToBase64, getErrorMessageLogin } from "../util/util";

function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [tenantName, setTenantName] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  async function login(loginInfo: {
    userName: string;
    password: string;
    grant_type: string;
    tenantName: string;
  }) {
    return await axios.post(
      `${import.meta.env.VITE_API_URL}/api/Validate`,

      loginInfo,

      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

  // /api/Validate`,

  async function getProfile() {
    return await axios.get(`${import.meta.env.VITE_API_URL}/profile`);
  }

  // const mutateProfile = useMutation(getProfile, {
  //     onSuccess: ({ data }) => {

  //     },
  //     onError: (error: Error) => {

  //         throw new Error(error.message)

  //     }
  // });

  // useEffect(() => {
  //     document.body.style.overflow = "hidden";

  //     return () => { document.body.style.overflow = "scroll" };
  // }, []);

  const mutateLogin = useMutation(login, {
    onSuccess: ({ data }) => {
      auth.signin(
        {
          _id: data.id,
          username: data.userName,
          name: data.userName,
        },
        data.access_token,
        () => {
          navigate("/main", { replace: true });
        }
      );
    },
    onError: (error: AxiosError<ErrorAPIReponse>) => {
      console.log("Error message", error.message);

      // setError(error.message);
      //  return error
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // navigate("/main", { replace: true });
    mutateLogin.mutate({
      userName: encodeToBase64(username),
      password: encodeToBase64(password),
      tenantName: encodeToBase64(tenantName),
      grant_type: "password",
    });
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <>
        <Grid container>
          <Grid
            item
            md={4}
            lg={4}
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <img style={{ height: "100vh" }} src={BackgroundImage} />
          </Grid>
          {/* <Grid item md={8} lg={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ pl: 10, pr: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '100vh' }}> */}
          <Grid
            item
            md={8}
            lg={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 10,
            }}
          >
            <Grid container spacing={4} sx={{ maxWidth: "600px" }}>
              <Grid item md={12} xs={12} sx={{ mb: "2rem" }}>
                <img src={AstuteLogo} />
              </Grid>
              {/* <Grid item md={12} xs={12} sx={{ mb: "1.25rem" }}>
                <Typography variant="h3">Welcome to Astute</Typography>
              </Grid> */}
              <Grid
                item
                md={3}
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent="left"
              >
                <Typography variant="subtitle1">Tenant Name</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <InputBox
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  value={tenantName}
                  onChange={(event) => {
                    setTenantName(event.target.value);
                  }}
                ></InputBox>
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent="left"
              >
                <Typography variant="subtitle1">Username</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <InputBox
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                ></InputBox>
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent="left"
              >
                <Typography variant="subtitle1">Password</Typography>
              </Grid>
              <Grid item md={9} xs={12}>
                <InputBox
                  key="input-password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  required
                  value={password}
                  onChange={handlePasswordInput}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: 2 }}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></InputBox>
              </Grid>

              <Grid item md={3} xs={12}></Grid>
              <Grid item md={9} xs={12}>
                {/* <Typography
                  sx={{
                    ml: 2,
                    fontSize: "0.75rem",
                    color: (theme) => theme.palette.tertiary.main,
                  }}
                  variant="subtitle1"
                >
                  Forgot password?
                </Typography> */}
                <FormHelperText error={mutateLogin.isError}>
                  {mutateLogin.error?.message}
                </FormHelperText>
              </Grid>

              {/* <Grid item xs={12} alignContent="center">
                </Grid> */}

              <Grid item md={12} xs={12}>
                <ButtonEwaStyle
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={mutateLogin.isLoading}
                >
                  Login Now
                </ButtonEwaStyle>
              </Grid>
              {/* <Grid item md={12} xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: (theme) => theme.palette.textColor.main }}
                  align="center"
                >
                  By continuing, you are indicating that you have read and agree
                  to the{" "}
                  <Link
                    underline="none"
                    href="#"
                    sx={{
                      color: (theme) => theme.palette.tertiary.main,
                      fontWeight: 600,
                    }}
                  >
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    underline="none"
                    sx={{
                      color: (theme) => theme.palette.tertiary.main,
                      fontWeight: 600,
                    }}
                  >
                    Privacy Policy
                  </Link>
                  .
                </Typography>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={mutateLogin.isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    </form>
  );
}

export default Login;
