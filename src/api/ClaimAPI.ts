import axios from "axios";
import { CreateClaimProps, ExternalClaimRejectProps, SubmitClaimProps, UpdateClaimDraftProps, UpdateEventClaimProps } from "../models/claim.model";


export async function fetchApprovalStats() {
    const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/claims/approval-statistics`)
    if (data.code == "SUCCESS") {
        return data;
    }
}

export  async function fetchClaimSubtype(typeOfClaim:string) {
    const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/claim-type`, {
        params: { parentClaimType: typeOfClaim }
    }
    )
    return data;
}

export async function fetchClaimType() {
    const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/claim-type`,
    )

    return data;
}

export  async function fetchEntitlements(type: string, subtype: string | undefined) {

    let typeId = '';

    if (!subtype) {
        typeId = type;
    } else {
        typeId = subtype;
    }

    if(typeId){
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/claim-entitlements/claim-type/${typeId}`,
        )
    
        if (data.code == "SUCCESS") {
            return data.data;
        }
    }
}

export async function updateClaimDraft(claimProps: UpdateClaimDraftProps) {
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/claims/${claimProps.claimId}`, claimProps.claimProps)
    return data;
}

export async function createClaim(claimProps: CreateClaimProps) {
    const data = await axios.post(`${import.meta.env.VITE_API_URL}/claims`, claimProps)
    return data;
}

export async function submitClaim(claimProps: SubmitClaimProps) {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/claims/${claimProps.id}/event`, { event: claimProps.event })
    return data;
}

export async function updateEventClaim(claimProps: UpdateEventClaimProps) {

    let body:UpdateEventClaimProps = { event: claimProps.event }
    if(claimProps.remarks){
        body.remarks = claimProps.remarks
    }

    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/claims/${claimProps.id}/event`,body)
        return data;
    } catch (error) {
        throw new Error('Failed to update event claim');
    }

}

export async function externalActionApproveClaim(referenceId:string){
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/claims/externalaction/${referenceId}`)
        return data;
    } catch (error) {
        throw new Error('Failed to update event claim');
    }
}

export async function externalActionRejectClaim(externalClaimRejectProps:ExternalClaimRejectProps){
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/claims/externalaction/${externalClaimRejectProps.referenceId}`,{
            remarks:externalClaimRejectProps.remarks
        })
        return data;
    } catch (error) {
        throw new Error('Failed to update event claim');
    }
}