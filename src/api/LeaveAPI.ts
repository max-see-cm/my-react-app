import axios from "axios";
import { ExternalLeaveRejectProps, Leave, LeaveProps, UpdateActionLeaveProps } from "../models/leave.model";
import { ResponseQuery } from "../models/common.model";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AlertColor } from "@mui/material";


export async function fetchAllEntitlementLeave(){
    const  {data}  = await axios.get(`${import.meta.env.VITE_API_URL}/leave-entitlements`)
    if (data.code == "SUCCESS") {
        return data.data;
    }
}

export async function fetchApprovalLeave(page:number,rowsPerPage:number){
    const  {data}  = await axios.get(
        `${import.meta.env.VITE_API_URL}/leaves/approval`, {
        params: {
            page: page,
            perPage: rowsPerPage
        }
    })
    return data;
}

export async function fetchApprovalLeaveStats(){
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/leaves/approval-statistics`)
    if (data.code == "SUCCESS") {
        return data;
    }
}

export async function fetchLeaveSubtype(typeOfLeave:string) {
    const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/leave-type`, {
        params: { parentLeaveType: typeOfLeave }
    }
    )
    return data;
}

export async function fetchLeaveType() {
    const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/leave-type`,
    )
    return data;
}

export async function fetchEntitlementsLeave(leaveTypeId:string){
    if(leaveTypeId){
        const {data} = await axios.get( `${import.meta.env.VITE_API_URL}/leave-entitlements/leave-type/${leaveTypeId}`)

        if(data.code === 'SUCCESS'){
            return data.data;
        }
    
        throw Error(data.error)
    }
}

export async function updateLeave(claimId: string, leaveProps: LeaveProps) {
    const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/leaves/${claimId}`, leaveProps)
    return data;
}

export async function createLeave(leaveProps:LeaveProps){
    const {data} = await axios.post<ResponseQuery<Leave>>(`${import.meta.env.VITE_API_URL}/leaves`,leaveProps)
    return data;
}


export async function updateEventLeave(updateActionLeaveProps:UpdateActionLeaveProps) {
    let body:UpdateActionLeaveProps = {event:updateActionLeaveProps.event}
    if(updateActionLeaveProps.remarks){
        body.remarks =updateActionLeaveProps.remarks;
    }
    const { data } = await axios.post<ResponseQuery<any>>(`${import.meta.env.VITE_API_URL}/leaves/${updateActionLeaveProps.id}/event`, body)
    return data;
}

export const useOnSaveasDraftMutate = (pushNotification: (message: string, type: AlertColor) => void) => {
    return useMutation<ResponseQuery<Leave>, Error, LeaveProps>(async (leaveProps:LeaveProps) => await createLeave(leaveProps),
        {
            onSuccess: (data) => {

                pushNotification(data.message, "success")
            },
            onError: (error: Error) => {
                pushNotification(error.message, "error")
            }
        })

}

export const useOnUpdateDraftMutate = (pushNotification: (message: string, type: AlertColor) => void) => {
        return useMutation<ResponseQuery<Leave>, Error,{ leaveId: string; leaveProps: LeaveProps }>(async ({leaveId,leaveProps}) => await updateLeave(leaveId,leaveProps),
        {
            onSuccess: (data) => {
                pushNotification(data.message, "success")
            },
            onError: (error: Error) => {
                pushNotification(error.message, "error")
            }
        })

}


export const useOnSubmitMutate = (pushNotification: (message: string, type: AlertColor,status?:string) => void) => {
    return useMutation<ResponseQuery<Leave>, Error, LeaveProps>(async (leaveProps:LeaveProps) => await createLeave(leaveProps),
    {
        onSuccess: (data) => { 
            
            if(data.code === "SUCCESS"){
                pushNotification(data.message, "success",data.data[0].status)
            }else{
                throw Error(data.error)
            }
         
        },
        onError: (error: Error) => {
            pushNotification(error.message, "error")
        }
    })
}

export const useOnFinalSubmitMutate = (pushNotification: (message: string, type: AlertColor,status?:string) => void) => {

    const submitFinalLeaveMutation =  useOnSendForApprovalMutate(pushNotification);

    return useMutation<ResponseQuery<Leave>, Error,{ leaveId: string; leaveProps: LeaveProps }>(async ({leaveId,leaveProps}) => await updateLeave(leaveId,leaveProps),
    {
        onSuccess: (data) => {
            if(data.code === 'SUCCESS'){
                submitFinalLeaveMutation.mutate(data.data[0]._id);
            }
            // pushNotification(data.message, "success")
        },
        onError: (error: Error) => {
            pushNotification(error.message, "error")
        }
    })
}


export const useOnSendForApprovalMutate = (pushNotification: (message: string, type: AlertColor,status?:string) => void) => {
    return useMutation<ResponseQuery<any>, Error, string >(async (leaveId:string) => await updateEventLeave({id:leaveId,event:'SEND_FOR_APPROVAL'}),
    {
        onSuccess: (data) => {
            if(data.code === 'SUCCESS')
            pushNotification('Suceesfully submit leave application', "success",data.data[0].status)
        },
        onError: (error: Error) => {
            pushNotification(error.message, "error")
            console.log('error', error)
        }
    })
}

 

export const useApprovalLeave = (page:number, rowsPerPage:number) => {
    const {data:approvalLeaveResponse,refetch:refetchApprovalLeave} = useQuery<ResponseQuery<Leave[]>,Error>({
        queryKey: ['approvalLeaveResponse',page,rowsPerPage],
        queryFn: () => fetchApprovalLeave(page,rowsPerPage)
    })

    if(approvalLeaveResponse?.code === "SUCCESS"){
        const approvalLeaveCount = approvalLeaveResponse?.total ?? 0;
        const approvalLeave = approvalLeaveResponse?.data.flat() ?? [];

        return{approvalLeave:approvalLeave,approvalLeaveCount:approvalLeaveCount,refetchApprovalLeave}
    }

    return {approvalLeave:[],approvalLeaveCount:0,refetchApprovalLeave}
   
}

export const useActionOnLeaveMutate = (pushNotification: (message: string, type: AlertColor,status?:string) => void) => {
    const queryClient = useQueryClient();

    return useMutation<ResponseQuery<any>, Error, UpdateActionLeaveProps >(async (updateActionLeaveProps:UpdateActionLeaveProps) => await updateEventLeave(updateActionLeaveProps),
    {
        onSuccess: (data) => {
            if(data.code === 'SUCCESS')
            pushNotification(data.message, "success",data.data[0].status)
            queryClient.invalidateQueries(['approvalLeaveResponse']);

        },
        onError: (error: Error) => {
            pushNotification(error.message, "error")
            console.log('error', error)
        }
    })
}


export async function externalActionApproveLeaves(referenceId:string){
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/leaves/externalaction/${referenceId}`)
        return data;
    } catch (error) {
        throw new Error('Failed to update event claim');
    }
}

export async function externalActionRejectLeaves(externalLeaveRejectProps:ExternalLeaveRejectProps){
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/leaves/externalaction/${externalLeaveRejectProps.referenceId}`,{
            remarks:externalLeaveRejectProps.remarks
        })
        return data;
    } catch (error) {
        throw new Error('Failed to update event claim');
    }
}