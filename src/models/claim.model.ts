import { Approver, DocumentInfo } from "./common.model"
import { User } from "./user.model"

export type Claim  = {
    _id:string
    date:string
    type:ClaimType
    subtype1:ClaimSubtype
    amount:number
    remarks:string
    documents?:DocumentInfo[]
    status:string
    company:string
    user:User
    approver:Approver
    createdAt:string
    transactionId?:string
    withdrawalRemarks?:string
}


export type ClaimType = {
    _id:string
    name:string
    defaultDocuments?:DocumentInfo[]
}

export type ClaimSubtype = {
    _id:string
    name:string
    parentClaimType:string
}

export type ClaimEntitlement = {
    _id:string
    user:string
    claimType:string
    entitledAmount:number
    balance:number
}

export type CreateClaimProps = {
    date:string
    type:string
    subtype1?:string
    remarks?:string
    amount:number
    documents?:string[]
    submit?:boolean
    periodMonth?:string
    periodYear?:string
}

export interface SubmitClaimProps {
    id?:string,
    event:string,
    //claimProps?:CreateClaimProps
} 

export interface UpdateEventClaimProps{
    id?:string,
    event:string,
    remarks?:string
}

export interface UpdateClaimResponse{
    _id:string,
    status:string
}



export type ApproveClaimProps = {
    id:string
    event:string
}

export interface UpdateClaimDraftProps {
   claimProps: CreateClaimProps,
   claimId:string
}

export type ClaimInformationProps = {
    transactionNo: string,
    userData: User,
    entitledAmount: number,
    entitledBalance: number,
    approval?: Approver
    status:string
    rejectionRemarks?: string
}

export type ExternalClaimRejectProps = {
    referenceId:string
    remarks:string
}
