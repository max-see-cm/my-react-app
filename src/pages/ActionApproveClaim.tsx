import { Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import ErrorClaimActionCard from "../components/Card/ErrorClaimActionCard";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { ResponseQuery } from "../models/common.model";
import { Claim } from "../models/claim.model";
import { externalActionApproveClaim } from "../api/ClaimAPI";
import SuccessApproveCard from "../components/Card/SuccessApproveCard";


function ActionApproveClaim() {

    const imgBackgroundUrl = new URL('../assets/background.svg', import.meta.url).href

    const { actionRef } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);


    useEffect(() => {
        if (actionRef) {
            approveClaimMutation.mutate(actionRef)
        } else {
            setIsLoading(false)
        }
    }, [])

    const approveClaimMutation = useMutation<ResponseQuery<Claim>, Error, string>(async (referenceId) => await externalActionApproveClaim(referenceId),
        {
            onSuccess: (data) => {
                console.log('onsucccessdata', data)
                if (data.code == "SUCCESS") {

                    setIsLoading(false);
                    setIsSuccess(true);

                } else {
                    setIsLoading(false);
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


    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}>
        <Box
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
                isLoading ? <CircularProgress color="inherit" /> : isSuccess ? <SuccessApproveCard actionType="claim" referenceNo={approveClaimMutation.data ? approveClaimMutation.data.data[0].transactionId : "-"} />
                    : <ErrorClaimActionCard />
            }
        </Box>
    </motion.div>
}

export default ActionApproveClaim;