export type DocumentInfo = {
  description: string;
  mimeType: string;
  createdAt: string;
  thumbnailUrl: string;
  url: string;
  _id: string;
};

export interface ResponseQuery<T> {
  code: string;
  message: string;
  data: T[];
  total: number;
  error?: string;
}

export interface ResponsePatient<T> {
  patients: T[];
  locationId: string;
  permission: string;
  status: string;
  totalNoOfRecords: number;
}

export interface ResponseApprovalStats {
  code: string;
  message: string;
  pendingApprovalTotal: number;
  approvedTotal: number;
  rejectedTotal: number;
  withdrawnTotal: number;
}

export type Approver = {
  _id: string;
  name: string;
};

export interface ErrorAPIReponse {
  code?: string;
  message?: string;
  name?: string;
  statusCode?: number;
}
