import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import {
  Alert,
  Box,
  Button,
  Grid,
  Input,
  LinearProgress,
  Menu,
  MenuItem,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ButtonDropdownEwaStyle,
  RotatingArrowDropDownIcon,
} from "../components/Button/ButtonStyles";
import { User } from "../models/user.model";
import { motion } from "framer-motion";
import React from "react";
import MuiTableRPA from "../components/Table/MuiTableRPA";

function RPA() {
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

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("Error, file must be uploaded first");
      return;
    }

    var data = new FormData();
    data.append("file", selectedFile);
    console.log(selectedFile);

    // console.log(formData);
    console.log(`uploading,,,`);
    axios
      .post(
        `${import.meta.env.VITE_CLOUD_STORAGE_API_URL}/File?bucketName=dayaautomation`,
        data,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 100)
            );
            setUploadProgress(percentCompleted);
          },
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Api-Key":
              "yt2yPh7Ck6Ks1zWi1orub18aNYs3A9buW9vvxLLYoNg4Yg8yvWWAdMYC6aeFSeou50nVKT1UrcOkDWUFj6LZHn4bdr0KP0AeA2TFqBSU8bWPOoZBbz5NuLbk0Y0CuvKs",
          },
        }
      )
      .then((response) => {
        alert(`File Uploaded`);
        console.log(response);
      })
      .catch((error) => {
        alert(`Upload Failed`);
        console.error(error);
      });
  };

  // const handleFileUpload = (event: any) => {
  //   if (!event || !event.target || !event.target.files) {
  //     console.error("NO EVENT");
  //     return;
  //   }
  //   const file = event?.target?.files[0];
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   // console.log(formData);
  //   console.log(`uploading,,,`);
  //   axios
  //     .post(
  //       `https://cloudstorageapi20231115182011.azurewebsites.net/api/Files`,
  //       formData,
  //       {
  //         onUploadProgress: (progressEvent) => {
  //           const percentCompleted = Math.round(
  //             (progressEvent.loaded * 100) / (progressEvent.total || 100)
  //           );
  //           setUploadProgress(percentCompleted);
  //         },
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           "X-Api-Key":
  //             "6CBxzdYcEgNDrRhMbDpkBF7e4d4Kib46dwL9ZE5egiL0iL5Y3dzREUBSUYVUwUkN",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       alert(`File Uploaded`);
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       alert(`Upload Failed`);
  //       console.error(error);
  //     });
  // };

  return (
    <Box sx={{ p: 7, minHeight: "100vh" }}>
      <Grid container direction="column">
        <Grid item>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3">Upload CSV here</Typography>
          </motion.div>
        </Grid>
        {/* <Grid
          container
          direction="column"
          alignItems="start"
          justifyItems="center"
          justifyContent="center"
        >
          <Grid item paddingTop={5}>
            <form onSubmit={(e) => handleFileUpload(e)}>
              <TextField type="file" style={{ height: "40px" }} />
              <button
                type="submit"
                // variant="contained"
                color="primary"
                style={{ marginLeft: 5, height: "40px" }}
              >
                Upload
              </button>
            </form>
          </Grid>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Grid> */}
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Input type="file" onChange={handleFileChange} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFileUpload}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container paddingTop={5}>
        <Grid item xs={6}>
          <Typography variant="h3">Daya Automation List</Typography>
        </Grid>
        {/* <Grid item xs={6} sx={{ textAlign: "right" }}>
          <ButtonEwaStyleShort
            onClick={() => {
              navigate("/main/patient/create-patient");
            }}
            variant="contained"
            size="large"
          >
            Create New
          </ButtonEwaStyleShort>
        </Grid> */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <MuiTableRPA />
        </Grid>
      </Grid>
    </Box>
  );
}

export default RPA;
