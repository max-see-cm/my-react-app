import { ChangeEvent, useState } from "react";
import { DocumentInfo } from "../../models/common.model";
import axios from "axios";
import { Box, Button, IconButton, Typography } from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';
import { ElevatorSharp } from "@mui/icons-material";

interface UploadComponentProps {
    onUploadSuccess: (file: DocumentInfo) => void;
    onUploadError: (error: Error) => void;
    type: string

}

interface AxiosError {
    code: string;
    message: string;
}


function UploadFile(props: UploadComponentProps) {

    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files[0].size < 5000000) {
                uploadFile(e.target.files[0]);
            } else {
                props.onUploadError(new Error("Cannot upload more than 5MB file"));
            }
            //setFile(e.target.files[0]);
        }
    };

    async function uploadFile(acceptedFile: File) {
        try {
            const formData = new FormData();
            formData.append("file", acceptedFile);
            formData.append("filename", acceptedFile.name);
            formData.append("folder", props.type);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/documents/upload`, formData);

            if (data) {
                if (data.code === 'SUCCESS') {
                    props.onUploadSuccess(data.data[0])
                    setFile(acceptedFile);
                } else {
                    props.onUploadError(new Error("Unknown Error"))
                }
            }

        } catch (error) {
            console.log("error", error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                props.onUploadError(new Error(axiosError.message || "Unknown error"));
            } else {
                props.onUploadError(new Error("Unknown error"));
            }
        }

    }

    return <>

        {!file && <Button variant="text" color="tertiary" startIcon={<AttachFileIcon />} component="label">
            Add File
            <input
                type="file"
                onChange={handleFileChange}
                hidden
            />
        </Button>
        }

        {
            file &&
            <Box sx={{ display: 'flex', alignItem: 'start' }}>
                <Typography variant='subtitle1' sx={{ display: 'flex', alignItems: 'center', color: '#4EB8B9', textDecoration: 'underline' }}>{file && `${file.name}`}</Typography>
                <IconButton color="primary" aria-label="delete file" onClick={() => { setFile(undefined) }}>
                    <CancelIcon />
                </IconButton>
            </Box>
        }

    </>


}


export default UploadFile