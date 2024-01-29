import {
  Alert,
  AlertColor,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  ButtonDropdownEwaStyle,
  RotatingArrowDropDownIcon,
} from "../../components/Button/ButtonStyles";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  DateInputCustom,
  InputBox,
  InputBoxMultiLine,
} from "../../components/TextField/InputBox";
import dayjs from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Claim,
  ClaimEntitlement,
  ClaimSubtype,
  ClaimType,
  CreateClaimProps,
  SubmitClaimProps,
  UpdateClaimDraftProps,
  UpdateClaimResponse,
  UpdateEventClaimProps,
} from "../../models/claim.model";
import {
  Approver,
  DocumentInfo,
  ResponseQuery,
} from "../../models/common.model";
import UploadFile from "../../components/Upload/UploadFile";
import { useLocation, useNavigate } from "react-router-dom";
import {
  convertCentToRM,
  convertRMStringtoCent,
  getColorStatus,
  getFileName,
  getNotificationMessage,
  prettifyStatusLabel,
} from "../../util/util";
import { User } from "../../models/user.model";
import { AuthContext } from "../../auth/AuthContext";
import ModalWithdrawClaim from "../../components/Modal/ModalWithdrawClaim";
import {
  createClaim,
  fetchClaimType,
  fetchEntitlements,
  submitClaim,
  updateClaimDraft,
  updateEventClaim,
  fetchClaimSubtype,
} from "../../api/ClaimAPI";
import ClaimInformationCard from "../../components/Card/ClaimInformationCard";
import { motion } from "framer-motion";
import ModalRejectItem from "../../components/Modal/ModalRejectItem";

function ClaimsSubmission() {
  const [transationNo, setTransactionNo] = useState("");
  const [approval, setApproval] = useState<Approver>();
  const [claimId, setClaimId] = useState<string | undefined>();
  const [file, setFile] = useState<DocumentInfo>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [notificationisOpen, setNotificationIsOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] =
    useState<AlertColor>("success");
  const [status, setStatus] = useState("DRAFT");
  const [isEditing, setIsEditing] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [editDisabled, setEditDisabled] = useState(false);
  const [updateEntitlementSummary, setUpdateEntitlementSummary] =
    useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [openRejectClaimModal, setOpenRejectClaimModal] = useState(false);
  const [entitledAmount, setEntitledAmount] = useState(-1);
  const [entitledBalance, setEntitledBalance] = useState(-1);
  const [withdrawalRemarks, setWithdrawalRemarks] = useState();
  const [rejectionRemarks, setRejectionRemarks] = useState();

  const auth = useContext(AuthContext);
  // const userData: User = auth.getUserInfo();
  const [userData, setUserData] = useState<User>(auth.getUserInfo());
  const queryClient = useQueryClient();

  const location = useLocation();

  const navigate = useNavigate();

  const shouldDisableEdit = () => {
    if (isViewOnly) {
      return true;
    }

    if (status == "WITHDRAWN") {
      setIsViewOnly(true);
      return true;
    }

    if (status == "REJECTED") {
      setIsViewOnly(true);
      return true;
    }

    if (status == "APPROVED") {
      setIsViewOnly(true);
      return true;
    }

    if (status == "DRAFT") {
      return false;
    }
    if (status == "PENDING_APPROVAL") {
      return !isEditing;
    }
    return false;
  };

  useEffect(() => {
    if (location.state) {
      const { claimInfo, viewOnly } = location.state;
      setClaimId(claimInfo._id);
      setValue("typeOfClaim", claimInfo.type._id);
      setValue("receiptDate", dayjs(claimInfo.date));
      const claimPeriodMonth = claimInfo.periodMonth;
      const claimPeriodYear = claimInfo.periodYear;
      if (claimPeriodMonth && claimPeriodYear) {
        const claimPeriodDayJs = dayjs()
          .month(claimPeriodMonth)
          .year(claimPeriodYear);
        setValue("claimPeriod", claimPeriodDayJs);
      }
      setValue("claimAmount", (claimInfo.amount / 100).toString());
      setValue("remark", claimInfo.remarks);

      setApproval(claimInfo.approver);
      setStatus(claimInfo.status);
      setEntitledAmount(claimInfo.entitlementTotal);
      setEntitledBalance(claimInfo.entitlementBalance);
      setWithdrawalRemarks(claimInfo.withdrawalRemarks);
      setRejectionRemarks(claimInfo.rejectionRemarks);

      setTransactionNo(claimInfo.transactionId);

      if (claimInfo.subtype1) {
        setValue("subType", claimInfo.subtype1._id);
      }

      if (viewOnly) {
        setIsViewOnly(viewOnly);
        setEditDisabled(true);
        setUserData(claimInfo.user);
      }

      if (claimInfo.documents.length > 0) {
        setFile(claimInfo.documents[0]);
      }
    }
  }, []);

  useEffect(() => {
    setEditDisabled(shouldDisableEdit());
  }, [status, isEditing]);

  const pushNotification = (message: string, type: AlertColor) => {
    setNotificationIsOpen(true);
    setNotificationMessage(message);
    setNotificationType(type);

    if (type !== "error") {
      setTimeout(function () {
        navigate(-1);
      }, 1000);
    }
  };

  const onCloseWitdrawModal = () => {
    setOpenWithdrawModal(false);
  };

  const onCloseRejectClaimModal = () => {
    setOpenRejectClaimModal(false);
  };

  const onSuccessWithdraw = () => {
    setOpenWithdrawModal(false);
    setStatus("WITHDRAWN");
    queryClient.invalidateQueries(["claim"]);
    pushNotification("Success withdraw claim", "success");
  };

  const useSubtypeDataQuery = (type: string) => {
    return useQuery<ClaimSubtype[], Error>(
      ["claimSubType", type],
      () => fetchClaimSubtype(type),
      {
        enabled: !!type,
      }
    );
  };

  const useEntitlementDataQuery = (
    type: string,
    subtype: string | undefined
  ) => {
    return useQuery<ClaimEntitlement[], Error>(
      ["entitlementInfo", type, subtype],
      () => fetchEntitlements(type, subtype),
      {
        enabled: (!!type && !subtype) || (!!type && !!subtype),
      }
    );
  };

  const useUpdateEventClaimMutate = (
    pushNotification: (message: string, type: AlertColor) => void
  ) => {
    return useMutation<ResponseQuery<Claim>, Error, UpdateEventClaimProps>(
      async (claimProps) => await updateEventClaim(claimProps),
      {
        onSuccess: (data) => {
          if (data.code == "SUCCESS") {
            if (data.data.length > 0) {
              pushNotification(
                getNotificationMessage(data.data[0].status),
                "success"
              );
              queryClient.invalidateQueries(["claim"]);
              setIsEditing(false);
              setStatus(data.data[0].status);
            }
          }
        },
        onError: (error: Error) => {
          console.log("error", error);
          pushNotification(error.message, "error");
        },
      }
    );
  };

  const submitWithdrawClaimMutate = useMutation(updateEventClaim, {
    onSuccess: (data) => {
      if (data.error) {
        pushNotification(data.error, "error");
        return;
      }
      pushNotification("Success withdraw claim", "success");
      queryClient.invalidateQueries(["claim"]);
      setIsEditing(false);
    },
    onError: (error: Error) => {
      console.log("error", error);
      pushNotification(error.message, "error");
    },
  });

  const submitUpdateClaimDraftMutate = useMutation(updateClaimDraft, {
    onSuccess: (data) => {
      pushNotification("Success update draft", "success");
      queryClient.invalidateQueries(["claim"]);
    },
    onError: (error: Error) => {
      console.log("error", error);
      pushNotification(error.message, "error");
    },
  });

  const submitUpdateClaimMutate = useMutation(updateClaimDraft, {
    onSuccess: (data) => {
      // pushNotification("Success update claim", "success")
      // queryClient.invalidateQueries(['claim']);
      // setIsEditing(false);

      if (data.code == "SUCCESS") {
        submitClaimMutate.mutate({ id: claimId, event: "SEND_FOR_APPROVAL" });
      }
    },
    onError: (error: Error) => {
      console.log("error", error);
      pushNotification(error.message, "error");
    },
  });

  // const submitUpdateClaimForApprovalMutate = useMutation(updateClaimDraft, {
  //     onSuccess: (data) => {

  //         // console.log("submitupdateclaimmutate", data)
  //         //   let createClaimValues: CreateClaimProps = {
  //         //     date: value.receiptDate,
  //         //     type: value.typeOfClaim,
  //         //     subtype1: value.subType,
  //         //     remarks: value.remark,
  //         //     amount: convertRMStringtoCent(value.claimAmount),

  //         // }

  //         // if (file) {
  //         //     createClaimValues.documents = [];
  //         //     createClaimValues.documents.push(file._id);
  //         // }

  //         submitClaimMutate.mutate();
  //         // pushNotification("Success update claim", "success")
  //         // queryClient.invalidateQueries(['claim']);
  //         // setIsEditing(false);

  //     },
  //     onError: (error: Error) => {
  //         console.log('error', error)
  //         pushNotification(error.message, "error")
  //     }
  // })

  const submitClaimMutate = useMutation(submitClaim, {
    onSuccess: (data) => {
      if (data.code == "SUCCESS") {
        pushNotification("Success Submit Claim", "success");
        setStatus("PENDING_APPROVAL");
        queryClient.invalidateQueries(["claim"]);
      }

      if (data.code == "INSUFFICIENT_BALANCE") {
        pushNotification(
          "The entered claim amount exceeds the entitled balance",
          "error"
        );
      }

      if (data.code == "GENERIC_ERROR") {
        pushNotification(data.message, "error");
      }
    },
    onError: (error: Error) => {
      console.log("error", error);
      pushNotification(error.message, "error");
    },
  });

  const createSubmitClaimMutate = useMutation(createClaim, {
    onSuccess: ({ data }) => {
      if (data.code == "SUCCESS") {
        setTransactionNo(data.data[0]._id);
        setClaimId(data.data[0]._id);
        pushNotification("Success Submit Claim", "success");
        setStatus("PENDING_APPROVAL");
        queryClient.invalidateQueries(["claim"]);
      }

      if (data.code == "INSUFFICIENT_BALANCE") {
        pushNotification(
          "The entered claim amount exceeds the entitled balance",
          "error"
        );
      }

      if (data.code == "GENERIC_ERROR") {
        pushNotification(data.message, "error");
      }
    },
    onError: (error: Error) => {
      pushNotification(error.message, "error");
      console.log("error", error);
    },
  });

  const createClaimMutate = useMutation(createClaim, {
    onSuccess: ({ data }) => {
      if (data.code == "SUCCESS") {
        setTransactionNo(data.data[0]._id);

        setClaimId(data.data[0]._id);
        pushNotification("Success Save draft", "success");

        queryClient.invalidateQueries(["claim"]);
      }

      if (data.code == "GENERIC_ERROR") {
        pushNotification(data.message, "error");
      }
    },
    onError: (error: Error) => {
      pushNotification(error.message, "error");
      console.log("error", error);
    },
  });

  const onSubmitRejectClaim = (values: any) => {
    updateEventClaimMutation.mutate({
      id: claimId,
      event: "REJECT",
      remarks: values.remark,
    });

    setOpenRejectClaimModal(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSnackbar = () => {
    setNotificationIsOpen(false);
  };

  const onUploadSuccess = (file: DocumentInfo) => {
    setFile(file);
    clearErrors("attachment");
  };

  const onUploadError = (error: Error) => {
    setError("attachment", { message: error.message, type: "manual" });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //setFile(e.target.files[0]);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
    getValues,
    setError,
    setValue,
  } = useForm({
    defaultValues: {
      typeOfClaim: "",
      subType: "",
      receiptDate: dayjs(),
      claimPeriod: dayjs(),
      claimAmount: "",
      remark: "",
      attachment: "",
    },
  });

  const type = watch("typeOfClaim");
  const subtype = watch("subType");

  const claimTypeQuery = useQuery<ClaimType[], Error>({
    queryKey: ["claimType"],
    queryFn: fetchClaimType,
  });

  const {
    data: subtypeData,
    isLoading: subtypeLoading,
    error: subtypeError,
  } = useSubtypeDataQuery(type);
  const {
    data: entitlementData,
    isLoading: entitlementLoading,
    error: entitlementError,
  } = useEntitlementDataQuery(type, subtype);
  const updateEventClaimMutation = useUpdateEventClaimMutate(pushNotification);

  const checkContainDefaultDocument = (typeId: string) => {
    if (claimTypeQuery && claimTypeQuery.data) {
      var selectedTypeQuery = claimTypeQuery.data.find(
        (claimType) => claimType._id === typeId
      );
      if (selectedTypeQuery?.defaultDocuments) {
        setFile(selectedTypeQuery?.defaultDocuments[0]);
      }
    }
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    queryClient.invalidateQueries(["claimSubType", type]);
    queryClient.invalidateQueries(["entitlementInfo", type, subtype]);

    checkContainDefaultDocument(event.target.value);

    setValue("typeOfClaim", event.target.value);
  };

  const handleSubtypeChange = (event: SelectChangeEvent) => {
    queryClient.invalidateQueries(["entitlementInfo", type, subtype]);
    setValue("subType", event.target.value);
  };

  useEffect(() => {
    if (subtypeData && subtypeData.length === 0) {
      setValue("subType", "");
    }
  }, [subtypeData]);

  const getTypeName = (typeId: string) => {
    if (claimTypeQuery.data) {
      var selectedTypeQuery = claimTypeQuery.data.find(
        (claimType) => claimType._id === typeId
      );

      return selectedTypeQuery?.name;
    }

    return "";
  };

  const getEntitledAmount = () => {
    return isViewOnly
      ? entitledAmount
      : !entitlementLoading
      ? entitlementData && entitlementData.length > 0
        ? entitlementData[0]
          ? entitlementData[0].entitledAmount
          : -1
        : -1
      : -1;
  };

  const getEntitledBalance = () => {
    return isViewOnly
      ? entitledBalance
      : !entitlementLoading
      ? entitlementData && entitlementData.length > 0
        ? entitlementData[0]
          ? entitlementData[0].balance
          : -1
        : -1
      : -1;
  };

  // const onUpdateClaim = (value: any) => {

  //     if (claimId) {
  //         let createClaimValues: CreateClaimProps = {
  //             date: value.receiptDate,
  //             type: value.typeOfClaim,

  //             subtype1: value.subType,
  //             remarks: value.remark,
  //             amount: convertRMStringtoCent(value.claimAmount),

  //         }

  //         if (file) {
  //             createClaimValues.documents = [];
  //             createClaimValues.documents.push(file._id);
  //         }

  //         submitUpdateClaimMutate.mutate({ claimId: claimId, claimProps: createClaimValues })
  //     }

  // }

  const onSubmitSaveDraft = (value: any) => {
    let createClaimValues: CreateClaimProps = {
      date: value.receiptDate,
      type: value.typeOfClaim,
      periodMonth: value.claimPeriod.month() + "",
      periodYear: value.claimPeriod.year() + "",

      remarks: value.remark,
      amount: convertRMStringtoCent(value.claimAmount),
    };

    if (value.subType !== "") {
      createClaimValues.subtype1 = value.subType;
    }

    if (file) {
      createClaimValues.documents = [];
      createClaimValues.documents.push(file._id);
    }

    if (claimId) {
      submitUpdateClaimDraftMutate.mutate({
        claimId: claimId,
        claimProps: createClaimValues,
      });
    } else {
      createClaimValues.submit = false;
      createClaimMutate.mutate(createClaimValues);
    }
  };

  const onSubmitClaim = (value: any) => {
    if (value.claimAmount == "") {
      setError("claimAmount", {
        message: "Please enter amount",
        type: "manual",
      });
      return;
    }

    if (!file) {
      setError("attachment", { message: "Please select file", type: "manual" });
      return;
    }

    let submitClaimValues: CreateClaimProps = {
      date: value.receiptDate,
      type: value.typeOfClaim,
      remarks: value.remark,
      periodMonth: value.claimPeriod.month() + "",
      periodYear: value.claimPeriod.year() + "",
      amount: convertRMStringtoCent(value.claimAmount),
    };

    if (value.subType !== "") {
      submitClaimValues.subtype1 = value.subType;
    }

    if (file) {
      submitClaimValues.documents = [];
      submitClaimValues.documents.push(file._id);
    }

    if (claimId) {
      submitUpdateClaimMutate.mutate({
        claimId: claimId,
        claimProps: submitClaimValues,
      });
    } else {
      submitClaimValues.submit = true;
      createSubmitClaimMutate.mutate(submitClaimValues);
    }
  };

  return (
    <>
      <form>
        <Box sx={{ p: 7, minHeight: "100vh" }}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h3">Claim Submission</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              {!isViewOnly ? (
                <>
                  <ButtonDropdownEwaStyle
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    variant="contained"
                    size="large"
                    endIcon={
                      <RotatingArrowDropDownIcon
                        sx={{
                          transform: open ? "rotate(180deg)" : "",
                        }}
                      />
                    }
                  >
                    Action
                  </ButtonDropdownEwaStyle>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    sx={{
                      "& .MuiMenu-paper": {
                        backgroundColor: (theme) => theme.palette.primary.main,
                        width: "150px",
                        mt: 0.5,
                      },
                    }}
                  >
                    {status == "DRAFT" && (
                      <MenuItem
                        onClick={() => {
                          clearErrors();
                          handleSubmit(onSubmitSaveDraft)();
                        }}
                      >
                        Save Draft
                      </MenuItem>
                    )}
                    {status == "DRAFT" && (
                      <MenuItem
                        onClick={() => {
                          clearErrors();
                          handleSubmit(onSubmitClaim)();
                        }}
                      >
                        Save & Submit
                      </MenuItem>
                    )}
                    {status == "PENDING_APPROVAL" && (
                      <MenuItem
                        onClick={() => {
                          clearErrors();
                          setOpenWithdrawModal(true);
                        }}
                      >
                        Withdraw
                      </MenuItem>
                    )}
                  </Menu>
                </>
              ) : (
                <>
                  {status == "PENDING_APPROVAL" && (
                    <>
                      <ButtonDropdownEwaStyle
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        variant="contained"
                        size="medium"
                        endIcon={
                          <RotatingArrowDropDownIcon
                            sx={{
                              transform: open ? "rotate(180deg)" : "",
                            }}
                          />
                        }
                      >
                        Action
                      </ButtonDropdownEwaStyle>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        sx={{
                          "& .MuiMenu-paper": {
                            backgroundColor: (theme) =>
                              theme.palette.primary.main,
                            width: "150px",
                            mt: 0.5,
                          },
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            updateEventClaimMutation.mutate({
                              id: claimId,
                              event: "APPROVE",
                            });
                          }}
                        >
                          Approve
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setOpenRejectClaimModal(true);
                            // updateEventClaimMutation.mutate({
                            //   id: claimId,
                            //   event: "REJECT",
                            // });
                          }}
                        >
                          Reject
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </>
              )}
            </Grid>
            <Grid item container xs={12} sx={{ mt: 4 }} spacing={4}>
              <Grid item xs={8}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    p: 8,
                    minHeight: "100%",
                    borderRadius: "1.5rem",
                  }}
                >
                  <Typography variant="h5">Claim</Typography>
                  <Grid container spacing={4} sx={{ mt: 1 }}>
                    <Grid item xs={4} alignSelf="center">
                      <Typography variant="subtitle1">Type of Claim</Typography>
                    </Grid>
                    <Grid item xs={8} alignContent="left">
                      <FormControl fullWidth>
                        <Select
                          disabled={editDisabled}
                          id="type-of-claim-select"
                          value={watch("typeOfClaim")}
                          displayEmpty
                          {...register("typeOfClaim", {
                            required: "Please Select type of claim",
                          })}
                          onChange={handleTypeChange}
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return "Please Select";
                            }

                            if (claimTypeQuery.data) {
                              var selectedTypeQuery = claimTypeQuery.data.find(
                                (claimType) => claimType._id === selected
                              );

                              return selectedTypeQuery?.name;
                            }

                            return selected;
                          }}
                          sx={{
                            pl: 2,

                            "& .MuiOutlinedInput-notchedOutline": {
                              borderRadius: "36px",
                            },
                            "& fieldset": {
                              borderColor: (theme) =>
                                theme.palette.secondary.main,
                            },
                            "& legend": { display: "none" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#73322C",
                            },
                            "& .MuiSvgIcon-root": {
                              mr: 2,
                            },
                          }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                //bgcolor: 'pink',
                                "& .MuiMenuItem-root": {
                                  padding: 2,
                                  color: (theme) =>
                                    theme.palette.textColor.main,
                                },
                              },
                            },
                          }}
                        >
                          {claimTypeQuery.data &&
                            claimTypeQuery.data.map(
                              (claimType: ClaimType, index: number) => (
                                <MenuItem
                                  key={claimType._id}
                                  value={claimType._id}
                                >
                                  {claimType.name}
                                </MenuItem>
                              )
                            )}
                        </Select>
                      </FormControl>
                      <FormHelperText
                        sx={{ ml: 2 }}
                        error={errors?.typeOfClaim ? true : false}
                      >
                        {errors?.typeOfClaim
                          ? errors.typeOfClaim.message
                          : null}
                      </FormHelperText>
                    </Grid>
                    {subtypeLoading ? (
                      <div>Loading subtypes...</div>
                    ) : subtypeError ? (
                      <div>Error: {subtypeError.message}</div>
                    ) : subtypeData && subtypeData.length > 0 ? (
                      <>
                        <Grid item xs={4} alignSelf="center">
                          <Typography variant="subtitle1">
                            Type of {getTypeName(type)}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <FormControl fullWidth>
                            <Select
                              disabled={editDisabled}
                              id="type-of-transportation-select"
                              value={watch("subType")}
                              // label="Age"
                              displayEmpty
                              {...register("subType", {
                                required: `Please Select type of ${getTypeName(
                                  type
                                )}`,
                              })}
                              onChange={handleSubtypeChange}
                              sx={{
                                pl: 2,
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderRadius: "36px",
                                  width: "100%",
                                },
                                "& fieldset": {
                                  borderColor: (theme) =>
                                    theme.palette.secondary.main,
                                },
                                "& legend": { display: "none" },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#73322C",
                                  },
                                "& .MuiSvgIcon-root": {
                                  mr: 2,
                                },
                              }}
                              MenuProps={{
                                PaperProps: {
                                  sx: {
                                    //bgcolor: 'pink',
                                    "& .MuiMenuItem-root": {
                                      padding: 2,
                                      color: (theme) =>
                                        theme.palette.textColor.main,
                                    },
                                  },
                                },
                              }}
                              renderValue={(selected) => {
                                //console.log("selected subtype", selected)
                                if (selected.length === 0) {
                                  return "Please Select";
                                }
                                if (subtypeData) {
                                  //console.log("rendersubtypedata", subtypeData)
                                  var selectedSubtypeQuery = subtypeData.find(
                                    (claimSubtype) =>
                                      claimSubtype._id === selected
                                  );

                                  return selectedSubtypeQuery?.name;
                                }

                                return selected;
                              }}
                            >
                              {subtypeData &&
                                subtypeData.map(
                                  (
                                    claimSubtype: ClaimSubtype,
                                    index: number
                                  ) => (
                                    <MenuItem
                                      key={claimSubtype._id}
                                      value={claimSubtype._id}
                                    >
                                      {claimSubtype.name}
                                    </MenuItem>
                                  )
                                )}
                              {/* {
                                                subTypeSelect.map(type => <MenuItem value={type.value}>{type.label}</MenuItem>)
                                            } */}
                            </Select>
                          </FormControl>
                          <FormHelperText
                            sx={{ ml: 2 }}
                            error={errors?.subType ? true : false}
                          >
                            {errors?.subType ? errors.subType.message : null}
                          </FormHelperText>
                        </Grid>
                      </>
                    ) : null}

                    <Grid item xs={4} alignSelf="center">
                      <Typography variant="subtitle1">Receipt Date</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <DateInputCustom
                        slotProps={{
                          popper: {
                            sx: {
                              "& .MuiPickersCalendarHeader-label": {
                                color: "black",
                              },
                            },
                          },
                        }}
                        disabled={editDisabled}
                        format="DD/MM/YYYY"
                        value={watch("receiptDate")}
                        {...register("receiptDate", {
                          required: "Please select receipt date",
                        })}
                        onChange={(date) => {
                          setValue("receiptDate", date);
                        }}
                      />
                      <FormHelperText
                        sx={{ ml: 2 }}
                        error={errors?.receiptDate ? true : false}
                      >
                        {errors?.receiptDate
                          ? errors.receiptDate.message
                          : null}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={4} alignSelf="center">
                      <Typography variant="subtitle1">Claim period</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <DateInputCustom
                        views={["month", "year"]}
                        slotProps={{
                          popper: {
                            sx: {
                              "& .MuiPickersCalendarHeader-label": {
                                color: "black",
                              },
                            },
                          },
                        }}
                        disabled={editDisabled}
                        format="MM/YYYY"
                        value={watch("claimPeriod")}
                        {...register("claimPeriod", {
                          required: "Please select claim period",
                        })}
                        onChange={(date) => {
                          setValue("claimPeriod", date);
                        }}
                      />
                      <FormHelperText
                        sx={{ ml: 2 }}
                        error={errors?.claimPeriod ? true : false}
                      >
                        {errors?.claimPeriod
                          ? errors.claimPeriod.message
                          : null}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={4} alignSelf="center">
                      <Typography variant="subtitle1">
                        Claim Amount (MYR)
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <InputBox
                        disabled={editDisabled}
                        fullWidth
                        value={watch("claimAmount")}
                        {...register("claimAmount", {
                          pattern: {
                            value: /^(0|[1-9]\d*)(\.\d{0,2})?$/,
                            message: "Please enter valid amount 0.00",
                          },
                        })}
                      ></InputBox>
                      <FormHelperText
                        sx={{ ml: 2 }}
                        error={errors?.claimAmount ? true : false}
                      >
                        {errors?.claimAmount
                          ? errors.claimAmount.message
                          : null}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">Remark</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <InputBoxMultiLine
                        disabled={editDisabled}
                        multiline
                        rows={4}
                        value={watch("remark")}
                        {...register("remark")}
                        placeholder="Enter Remark"
                        sx={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={4} alignSelf="center">
                      <Typography variant="subtitle1">Attachment</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      {file ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Box sx={{ display: "flex", alignItem: "start" }}>
                            <Typography
                              variant="inherit"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "#4EB8B9",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                window.open(file.url, "_blank");
                              }}
                            >
                              {file && `${getFileName(file.url)}`}
                            </Typography>
                            {!editDisabled && (
                              <IconButton
                                color="primary"
                                aria-label="delete file"
                                onClick={() => {
                                  setFile(undefined);
                                }}
                              >
                                <CancelIcon />
                              </IconButton>
                            )}
                          </Box>{" "}
                        </motion.div>
                      ) : (
                        <UploadFile
                          onUploadError={onUploadError}
                          onUploadSuccess={onUploadSuccess}
                          type="claimattachments"
                        />
                      )}
                      <FormHelperText
                        sx={{ ml: 2 }}
                        error={errors?.attachment ? true : false}
                      >
                        {errors?.attachment ? errors.attachment.message : null}
                      </FormHelperText>
                    </Grid>
                    {status === "WITHDRAWN" && (
                      <>
                        <Grid item xs={4} alignSelf="center">
                          <Typography variant="subtitle1">
                            Withdrawal Remark
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="inherit" sx={{ color: "black" }}>
                            {withdrawalRemarks ? withdrawalRemarks : "-"}
                          </Typography>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <ClaimInformationCard
                  transactionNo={transationNo}
                  userData={userData}
                  entitledBalance={getEntitledBalance()}
                  entitledAmount={getEntitledAmount()}
                  approval={approval}
                  status={status}
                  rejectionRemarks={rejectionRemarks}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={notificationisOpen}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={notificationType}
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
      <ModalWithdrawClaim
        open={openWithdrawModal}
        onClose={onCloseWitdrawModal}
        claimId={claimId}
        onSuccessSubmit={onSuccessWithdraw}
      />
      <ModalRejectItem
        open={openRejectClaimModal}
        onClose={onCloseRejectClaimModal}
        itemId={claimId}
        // onSuccessSubmit={onSuccessWithdraw}
        onSubmitRejectItem={onSubmitRejectClaim}
        itemType="Claim"
      />
    </>
  );
}

export default ClaimsSubmission;
