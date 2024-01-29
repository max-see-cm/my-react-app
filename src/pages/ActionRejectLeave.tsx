import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import ErrorClaimActionCard from "../components/Card/ErrorClaimActionCard";
import RemarkActionClaimCard from "../components/Card/RemarkActionCard";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { ResponseQuery } from "../models/common.model";
import { Claim, ExternalClaimRejectProps } from "../models/claim.model";
import { externalActionRejectClaim } from "../api/ClaimAPI";
import SuccessRejectCard from "../components/Card/SuccessRejectCard";
import { externalActionRejectLeaves } from "../api/LeaveAPI";
import { Leave } from "../models/leave.model";


function ActionRejectLeave() {

    const imgBackgroundUrl = new URL('../assets/background.svg', import.meta.url).href

    const { actionRef } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmitRejectClaim = (value: any) => {

        if (actionRef) {
            rejectClaimMutation.mutate({
                referenceId: actionRef,
                remarks: value.remark
            })
        }
    }

    const rejectClaimMutation = useMutation<ResponseQuery<Leave>, Error, ExternalClaimRejectProps>(async (props) => await externalActionRejectLeaves(props),
        {
            onSuccess: (data) => {
                console.log('onsucccessdata', data)
                if (data.code == "SUCCESS") {

                    setIsLoading(false);
                    setIsEditing(false);
                    setIsSuccess(true);
                } else {

                    setIsLoading(false);
                    setIsEditing(false);
                    setIsSuccess(false);
                }
            },
            onError: (error: Error) => {
                console.log('error', error)
            }
        });


    if (!actionRef) {
        return <Box
            sx={{
                backgroundImage: `url(${imgBackgroundUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ErrorClaimActionCard />
        </Box>
    }


    return <Box
        sx={{
            backgroundImage: `url(${imgBackgroundUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >

        {
            isLoading ? <CircularProgress color="inherit" /> : isEditing ? < RemarkActionClaimCard actionType="leave" referenceNo={actionRef} onSubmitRejectClaim={onSubmitRejectClaim} />
                : isSuccess ? <SuccessRejectCard actionType="leave" referenceNo={rejectClaimMutation.data ? rejectClaimMutation.data.data[0].transactionId : "-"}  /> : <ErrorClaimActionCard />

        }

    </Box>
}

export default ActionRejectLeave;