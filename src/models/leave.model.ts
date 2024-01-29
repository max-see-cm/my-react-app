import { StringKey } from "react-table"
import { User } from "./user.model"
import { Approver } from "./common.model"

export type Leave = {
    type: LeaveType
    startDate: string
    endDate:string
    noOfDays: number
    reason:string
    documents:string[]
    _id:string
    transactionId?: string
    status:string
    createdAt:string
    entitlementBalance?:number
    entitlementTotal?:number
    withdrawalRemarks?:string
    user:User

}

export type LeaveType = {
    _id:string
    name:string
    iconUrl?:string
    requiredInfo?:string[]
}

export type LeaveSubType = {
    _id:string
    name:string
}

export type LeaveProps = {
    date:string
    type:string
    startDate:string
    endDate:string
    amPm?:string
    noOfDays:number
    reason:string
    documents:string[]
    submit:boolean
    isStartDateHalfDay:boolean
    isEndDateHalfDay:boolean
}

export type LeaveEntitlement = {
    _id:string
    user:string
    leaveType:string | LeaveType
    entitledDays:number
    balance:number
}

export type UpdateActionLeaveProps = {
    id?:string 
    event:string 
    remarks?:string
}


export type LeaveInformationProps = {
    referenceNo: string,
    userData: User,
    entitledDays: number,
    entitledBalance: number,
    approval?: Approver
    status:string,
    rejectionRemarks?: string
}


export type ExternalLeaveRejectProps = {
    referenceId:string
    remarks:string
}
