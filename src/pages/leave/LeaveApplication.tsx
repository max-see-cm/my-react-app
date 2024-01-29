import { Alert, AlertColor, Box, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, Menu, MenuItem, Select, Snackbar, Typography } from "@mui/material";
import { ButtonDropdownEwaStyle, RotatingArrowDropDownIcon } from "../../components/Button/ButtonStyles";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Leave, LeaveEntitlement, LeaveProps, LeaveType } from "../../models/leave.model";
import { createLeave, fetchEntitlementsLeave, fetchLeaveType, useActionOnLeaveMutate, useOnFinalSubmitMutate, useOnSaveasDraftMutate, useOnSubmitMutate, useOnUpdateDraftMutate } from "../../api/LeaveAPI";
import { useForm } from "react-hook-form";
import { DateInputCustom, InputBox, InputBoxMultiLine } from "../../components/TextField/InputBox";
import CancelIcon from '@mui/icons-material/Cancel';
import { Approver, DocumentInfo, ResponseQuery } from "../../models/common.model";
import UploadFile from "../../components/Upload/UploadFile";
import { getFileName, getNotificationLeaveMessage, getNoOfDays } from "../../util/util";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../models/user.model";
import { AuthContext } from "../../auth/AuthContext";
import ModalWithdrawLeave from "../../components/Modal/ModalWithdrawLeave";
import LeaveInformationCard from "../../components/Card/LeaveInformationCard";
import ModalRejectItem from "../../components/Modal/ModalRejectItem";

function LeaveApplication() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [file, setFile] = useState<DocumentInfo>();
    const [approval, setApproval] = useState<Approver>();
    const [notificationisOpen, setNotificationIsOpen] = useState(false);
    const [notificationType, setNotificationType] = useState<AlertColor>("success");
    const [notificationMessage, setNotificationMessage] = useState("");
    const [leaveId, setLeaveId] = useState<string | undefined>();
    const [isViewOnly, setIsViewOnly] = useState(false);
    const [status, setStatus] = useState('DRAFT');
    const [editDisabled, setEditDisabled] = useState(false);
    const auth = useContext(AuthContext);
    const [referenceNo, setReferenceNo] = useState("");
    const [userData, setUserData] = useState<User>(auth.getUserInfo());
    // const userData: User = auth.getUserInfo();
    const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
    const [entitlementBalance, setEntitlementBalance] = useState(-1);
    const [entitlementTotal, setEntitledTotal] = useState(-1);
    const [withdrawalRemarks, setWithdrawalRemarks] = useState();
    const [rejectionRemarks, setRejectionRemarks] = useState();
    const [openRejectLeaveModal, setOpenRejectLeaveModal] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const pushNotification = (message: string, type: AlertColor, status?: string) => {
        setNotificationIsOpen(true);
        setNotificationType(type);
        if (status) {
            setStatus(status);
            setNotificationMessage(getNotificationLeaveMessage(status));
        }
        else {
            setNotificationMessage(message);
        }

        if (type !== 'error') {
            setTimeout(function () {
                navigate(-1);
            }, 1000);
        }
    }

    const updateEventLeaveMutation = useActionOnLeaveMutate(pushNotification);

    const onCloseRejectLeaveModal = () => {
        setOpenRejectLeaveModal(false);
    };

    const onSubmitRejectLeave = (values: any) => {
        updateEventLeaveMutation.mutate({
            id: leaveId,
            event: "REJECT",
            remarks: values.remark,
        });

        setOpenRejectLeaveModal(false);
    };

    const shouldDisableEdit = () => {

        if (isViewOnly) {
            return true;
        }

        if (status == 'WITHDRAWN') {
            setIsViewOnly(true);
            return true;
        }

        if (status == 'REJECTED') {
            setIsViewOnly(true);
            return true;
        }

        if (status == 'APPROVED') {
            setIsViewOnly(true);
            return true;
        }

        if (status == 'DRAFT') {
            return false;
        }
        if (status == 'PENDING_APPROVAL') {
            return true;
        }
        return false;
    }

    useEffect(() => {
        reset();
        if (location.state) {
            const { leaveInfo, viewOnly } = location.state;
            setLeaveId(leaveInfo._id);
            setValue('typeOfLeave', leaveInfo.type._id);
            setValue('startDate', dayjs(leaveInfo.startDate));
            setValue('endDate', dayjs(leaveInfo.endDate));
            setValue('numberOfDay', leaveInfo.noOfDays);
            setValue('reason', leaveInfo.reason);
            setValue('isEndDateHalfDay', leaveInfo.isEndDateHalfDay);
            setValue('isStartDateHalfDay', leaveInfo.isStartDateHalfDay);
            setEntitledTotal(leaveInfo.entitlementTotal);
            setEntitlementBalance(leaveInfo.entitlementBalance);
            setWithdrawalRemarks(leaveInfo.withdrawalRemarks);
            setRejectionRemarks(leaveInfo.rejectionRemarks);

            setStatus(leaveInfo.status);
            setApproval(leaveInfo.approver);
            setReferenceNo(leaveInfo.transactionId);

            if (viewOnly) {
                setIsViewOnly(viewOnly);
                setEditDisabled(true);
                setUserData(leaveInfo.user)
            }

            if (leaveInfo.documents.length > 0) {
                setFile(leaveInfo.documents[0]);
            }

            if (leaveInfo.amPm) {
                setValue('typeOfDay', leaveInfo.amPm);
            }
        }


        return () => {
            reset();
        }
    }, [])

    useEffect(() => {
        setEditDisabled(shouldDisableEdit());
    }, [status])



    const { register, handleSubmit, formState: { errors }, clearErrors, watch, getValues, setError, setValue, reset } = useForm({
        defaultValues: {
            typeOfLeave: '',
            startDate: dayjs().startOf('day'),
            endDate: dayjs().startOf('day'),
            numberOfDay: 0,
            reason: '',
            documents: [],
            typeOfDay: 'full',
            isStartDateHalfDay: false,
            isEndDateHalfDay: false
        }
    });

    const onSuccessSubmit = () => {
        setOpenWithdrawModal(false);
        setStatus('WITHDRAW');
        pushNotification("Success withdraw leave", 'success');
    }

    const onFailSubmit = (error: Error) => {
        setOpenWithdrawModal(false);
        pushNotification(error.message, 'error');
    }

    const onClose = () => {
        setOpenWithdrawModal(false);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseSnackbar = () => {
        setNotificationIsOpen(false);
    }

    const onUploadSuccess = (file: DocumentInfo) => {
        setFile(file);
        clearErrors("documents");
    }

    const onUploadError = (error: Error) => {

        setError("documents", { message: error.message, type: "manual" })

    }

    const getEntitledLeave = (): number => {
        return isViewOnly ? entitlementTotal : !leaveEntitlementQuery.isLoading ? (leaveEntitlementQuery.data && leaveEntitlementQuery.data.length > 0) ? leaveEntitlementQuery.data[0].entitledDays : -1 : -1;
    }

    const getEntitledBalance = (): number => {
        return isViewOnly ? entitlementBalance : !leaveEntitlementQuery.isLoading ? (leaveEntitlementQuery.data && leaveEntitlementQuery.data.length > 0) ? leaveEntitlementQuery.data[0].balance : -1 : -1;
    }



    const onSubmitSaveDraft = (values: any) => {


        let submitLeaveProps: LeaveProps = {
            date: values.date,
            type: values.typeOfLeave,
            startDate: values.startDate,
            endDate: values.endDate,
            noOfDays: getNoOfDays(values.numberOfDay, values.typeOfDay),
            reason: values.reason,
            isStartDateHalfDay: values.isStartDateHalfDay,
            isEndDateHalfDay: values.isEndDateHalfDay,
            documents: [],
            submit: false
        }

        if (file) {
            submitLeaveProps.documents.push(file._id);
        }

        if (values.numberOfDay === 1) {
            if (values.typeOfDay !== 'full') {

            }
            submitLeaveProps.amPm = values.typeOfDay;
        }

        if (leaveId) {
            updateDraftMutation.mutate({ leaveId: leaveId, leaveProps: submitLeaveProps });
        } else {
            saveAsDraftMutation.mutate(submitLeaveProps);
        }

    }

    const getIsRequireDocument = () => {
        const selectedLeaveType = watch('typeOfLeave');

        if (leaveTypeQuery.data) {
            let leavetype = leaveTypeQuery.data.find(type => type._id === selectedLeaveType)
            if (leavetype?.requiredInfo) {
                return leavetype?.requiredInfo.includes('document')
            }
        }
        return false;
    }

    const onSubmitLeave = (values: any) => {

        if (values.reason == "") {
            setError("reason", { message: "Please enter reason", type: "manual" })
            return;
        }

        if (getIsRequireDocument() && !file) {
            setError("documents", { message: "Please select file", type: "manual" })
            return;
        }

        let submitLeaveProps: LeaveProps = {
            date: values.date,
            type: values.typeOfLeave,
            startDate: values.startDate,
            endDate: values.endDate,
            noOfDays: getNoOfDays(values.numberOfDay, values.typeOfDay),
            reason: values.reason,
            isStartDateHalfDay: values.isStartDateHalfDay,
            isEndDateHalfDay: values.isEndDateHalfDay,
            documents: [],
            submit: true
        }

        if (file) {
            submitLeaveProps.documents.push(file._id);
        }

        if (values.numberOfDay === 1) {
            submitLeaveProps.amPm = values.typeOfDay;
        }


        if (leaveId) {
            submitFinalLeaveMutation.mutate({ leaveId: leaveId, leaveProps: submitLeaveProps });
        } else {
            submitLeaveMutation.mutate(submitLeaveProps);
        }

    }

    const getTrueDiffDays = () => {
        const startDate = dayjs(watch('startDate')).startOf('day');
        const endDate = dayjs(watch('endDate')).startOf('day');
        return endDate.diff(startDate, 'day') + 1;
    }

    useEffect(() => {
        const startDate = dayjs(watch('startDate')).startOf('day');
        const endDate = dayjs(watch('endDate')).startOf('day');
        if (startDate.isAfter(endDate)) {
            setValue('endDate', startDate)
        }

        let noOfDays = getTrueDiffDays();

        if (watch('isEndDateHalfDay')) {
            noOfDays -= 0.5;
        }

        if (watch('isStartDateHalfDay')) {
            noOfDays -= 0.5;
        }

        if (noOfDays > 1) {
            setValue('typeOfDay', 'full');
        }

        setValue('numberOfDay', noOfDays);
        // setValue('isEndDateHalfDay', false);
        // setValue('isStartDateHalfDay', false);
    }, [watch('startDate'), watch('endDate')])


    const onEndDateHalfDayChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        const noOfDays = watch('numberOfDay');
        if (event.target.checked) {
            setValue('numberOfDay', noOfDays - 0.5);
        } else {
            setValue('numberOfDay', noOfDays + 0.5);
        }
        setValue('isEndDateHalfDay', event.target.checked);

    }

    const onStartDateHalfDayChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        const noOfDays = watch('numberOfDay');

        if (event.target.checked) {
            setValue('numberOfDay', noOfDays - 0.5);
        } else {
            setValue('numberOfDay', noOfDays + 0.5);
        }


        setValue('isStartDateHalfDay', event.target.checked);


    }





    const selectedLeaveType = watch('typeOfLeave');
    const leaveTypeQuery = useQuery<LeaveType[], Error>({ queryKey: ['leaveType'], queryFn: fetchLeaveType });
    const leaveEntitlementQuery = useQuery<LeaveEntitlement[], Error>(['leaveEntitlement', selectedLeaveType], () => fetchEntitlementsLeave(selectedLeaveType));
    const saveAsDraftMutation = useOnSaveasDraftMutate(pushNotification);
    const updateDraftMutation = useOnUpdateDraftMutate(pushNotification);
    const submitLeaveMutation = useOnSubmitMutate(pushNotification);
    const submitFinalLeaveMutation = useOnFinalSubmitMutate(pushNotification);
    const approvalLeaveActionMutation = useActionOnLeaveMutate(pushNotification);

    return <>
        <form>
            <Box sx={{ p: 7, minHeight: '100vh' }}
            >
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant='h3'>
                            Leave Application
                        </Typography>
                    </Grid>

                    <Grid item xs={6} sx={{ textAlign: 'right' }}>

                        {!isViewOnly ?
                            <>
                                <ButtonDropdownEwaStyle
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    variant="contained"
                                    size="large"
                                    endIcon={<RotatingArrowDropDownIcon sx={{
                                        transform: open ? "rotate(180deg)" : "",
                                    }} />}>
                                    Action
                                </ButtonDropdownEwaStyle>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    sx={{
                                        '& .MuiMenu-paper': {
                                            backgroundColor: (theme) => theme.palette.primary.main,
                                            width: '150px',
                                            mt: 0.5,

                                        }
                                    }}

                                >
                                    {
                                        status == 'DRAFT' && <MenuItem onClick={() => {
                                            clearErrors();
                                            handleSubmit(onSubmitSaveDraft)();
                                        }}>Save Draft</MenuItem>

                                    }
                                    {
                                        status == 'DRAFT' &&
                                        <MenuItem onClick={() => {
                                            clearErrors();
                                            handleSubmit(onSubmitLeave)();
                                        }}>Save & Submit</MenuItem>

                                    }
                                    {status == 'PENDING_APPROVAL' && <MenuItem onClick={() => {
                                        setOpenWithdrawModal(true);
                                        // clearErrors();
                                        // submitWithdrawClaimMutate.mutate({ id: claimId, event: "WITHDRAW" })
                                        // handleSubmit(onSubmitClaim)();
                                    }}>Withdraw</MenuItem>}
                                </Menu>
                            </>
                            : <>
                                {status == 'PENDING_APPROVAL' && <>
                                    <ButtonDropdownEwaStyle
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        variant="contained"
                                        size="medium"
                                        endIcon={<RotatingArrowDropDownIcon sx={{
                                            transform: open ? "rotate(180deg)" : "",
                                        }} />}>
                                        Action
                                    </ButtonDropdownEwaStyle>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        sx={{
                                            '& .MuiMenu-paper': {
                                                backgroundColor: (theme) => theme.palette.primary.main,
                                                width: '150px',
                                                mt: 0.5,

                                            }
                                        }}

                                    >
                                        <MenuItem onClick={() => {
                                            if (leaveId)
                                                approvalLeaveActionMutation.mutate({ id: leaveId, event: 'APPROVE' })

                                        }}>Approve</MenuItem>
                                        <MenuItem onClick={() => {
                                            setOpenRejectLeaveModal(true);
                                        }}>Reject</MenuItem>

                                    </Menu>
                                </>}
                            </>
                        }
                    </Grid>

                    <Grid item container xs={12} sx={{ mt: 4 }} spacing={4}>
                        <Grid item xs={8}>
                            <Box sx={{ backgroundColor: 'white', p: 6, minHeight: '100%', borderRadius: '1.5rem' }}>
                                <Typography variant='h5'>
                                    Leave
                                </Typography>
                                <Grid container spacing={4} sx={{ mt: 1 }}>
                                    <Grid item xs={4} alignSelf="center">
                                        <Typography variant='subtitle1'>
                                            Type of Leave
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} alignContent="left" >
                                        <FormControl fullWidth>
                                            <Select
                                                disabled={editDisabled}
                                                id="type-of-leave-select"
                                                value={watch('typeOfLeave')}
                                                displayEmpty

                                                {...register('typeOfLeave', { required: "Please Select type of leave" })}
                                                //onChange={handleTypeChange}
                                                renderValue={(selected) => {

                                                    if (selected.length === 0) {
                                                        return "Please Select";
                                                    }

                                                    if (leaveTypeQuery.data) {
                                                        var selectedTypeQuery = leaveTypeQuery.data.find(leaveType => leaveType._id === selected)
                                                        return selectedTypeQuery?.name;
                                                    }

                                                    return selected;
                                                }}
                                                sx={{
                                                    pl: 2,
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderRadius: '36px',

                                                    }, '& fieldset': {
                                                        borderColor: (theme) => theme.palette.secondary.main,

                                                    },
                                                    '& legend': { display: 'none' },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#73322C',
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        mr: 2
                                                    }
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            //bgcolor: 'pink',
                                                            '& .MuiMenuItem-root': {
                                                                padding: 2,
                                                                color: (theme) => theme.palette.textColor.main,
                                                            },
                                                        },
                                                    },
                                                }}
                                            >
                                                {leaveTypeQuery.data && leaveTypeQuery.data.map((leaveType: LeaveType, index: number) => <MenuItem key={leaveType._id} value={leaveType._id}>{leaveType.name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                        <FormHelperText sx={{ ml: 2 }} error={errors?.typeOfLeave ? true : false}>{errors?.typeOfLeave ? errors.typeOfLeave.message : null}</FormHelperText>
                                    </Grid>
                                    <Grid item xs={4} sx={{ mt: 2 }}>
                                        <Typography variant='subtitle1' >
                                            Start Date
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <DateInputCustom slotProps={{
                                            popper: {
                                                sx: {
                                                    '& .MuiPickersCalendarHeader-label': {
                                                        color: 'black',
                                                    },
                                                }
                                            }
                                        }} disabled={editDisabled} format="DD/MM/YYYY" value={watch('startDate')} {...register('startDate', { required: 'Please select start date' })} onChange={(date) => {
                                            setValue('startDate', date)
                                        }} />
                                        <FormHelperText sx={{ ml: 2 }} error={errors?.startDate ? true : false}>{errors?.startDate ? errors.startDate.message : null}</FormHelperText>
                                        {getTrueDiffDays() > 1 && <FormControlLabel sx={{ ml: 2 }} control={<Checkbox   {...register('isStartDateHalfDay')} disabled={editDisabled} defaultChecked checked={watch('isStartDateHalfDay')} sx={{
                                            color: '#D1D3D4',
                                            '&.Mui-checked': {
                                                color: (theme) => theme.palette.tertiary.main,
                                            },
                                        }} onChange={onStartDateHalfDayChecked} />} label={<Typography variant='labelText1'>Half day</Typography>} />}
                                    </Grid>
                                    <Grid item xs={4} sx={{ mt: 2 }} >
                                        <Typography variant='subtitle1'>
                                            End Date
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <DateInputCustom slotProps={{
                                            popper: {
                                                sx: {
                                                    '& .MuiPickersCalendarHeader-label': {
                                                        color: 'black',
                                                    },
                                                }
                                            }
                                        }} disabled={editDisabled} format="DD/MM/YYYY" minDate={watch('startDate')} value={watch('endDate')} {...register('endDate', { required: 'Please select end date' })} onChange={(date) => {
                                            setValue('endDate', date)
                                        }} />
                                        <FormHelperText sx={{ ml: 2 }} error={errors?.startDate ? true : false}>{errors?.startDate ? errors.startDate.message : null}</FormHelperText>
                                        {getTrueDiffDays() > 1 ? <FormControlLabel sx={{ ml: 2 }} control={<Checkbox {...register('isEndDateHalfDay')} disabled={editDisabled} defaultChecked checked={watch('isEndDateHalfDay')} sx={{
                                            color: '#D1D3D4',
                                            '&.Mui-checked': {
                                                color: (theme) => theme.palette.tertiary.main,
                                            },
                                        }} onChange={onEndDateHalfDayChecked} />} label={<Typography variant='labelText1'>Half day</Typography>} /> : null}

                                    </Grid>
                                    <Grid item xs={4} alignSelf="center">
                                        <Typography variant='subtitle1'>
                                            Number of Day(s)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        {getTrueDiffDays() == 1 ?
                                            <FormControl fullWidth>
                                                <Select
                                                    disabled={editDisabled}
                                                    id="type-of-leave-select"
                                                    {...register("typeOfDay")}
                                                    value={watch('typeOfDay')}
                                                    displayEmpty
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                //bgcolor: 'pink',
                                                                '& .MuiMenuItem-root': {
                                                                    padding: 2,
                                                                    color: (theme) => theme.palette.textColor.main,
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        pl: 2,
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            borderRadius: '36px',
                                                            width: '100%',
                                                        }, '& fieldset': {
                                                            borderColor: (theme) => theme.palette.secondary.main,
                                                        },
                                                        '& legend': { display: 'none' },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#73322C',
                                                        },
                                                        '& .MuiSvgIcon-root': {
                                                            mr: 2
                                                        }
                                                    }}
                                                >
                                                    <MenuItem key="one-day" value="full">1</MenuItem>
                                                    <MenuItem key="half-day-am" value="am">0.5(am)</MenuItem>
                                                    <MenuItem key="half-day-pm" value="pm">0.5(pm)</MenuItem>
                                                </Select>
                                            </FormControl>
                                            : <InputBox
                                                fullWidth
                                                disabled
                                                value={watch('numberOfDay')}  {...register("numberOfDay")} />
                                        }

                                        <FormHelperText sx={{ ml: 2 }} error={errors?.numberOfDay ? true : false}>{errors?.numberOfDay ? errors.numberOfDay.message : null}</FormHelperText>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Typography variant='subtitle1'>
                                            Reason
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <InputBoxMultiLine disabled={editDisabled} multiline rows={4} value={watch('reason')} {...register('reason')} placeholder='Enter reason' sx={{ width: '100%' }} />
                                        <FormHelperText sx={{ ml: 2 }} error={errors?.reason ? true : false}>{errors?.reason ? errors.reason.message : null}</FormHelperText>
                                    </Grid>
                                    <Grid item xs={4} alignSelf="center">
                                        <Typography variant='subtitle1'>
                                            Attachment
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        {
                                            file ?
                                                <Box sx={{ display: 'flex', alignItem: 'start' }}>
                                                    <Typography variant='inherit' sx={{ display: 'flex', alignItems: 'center', color: '#4EB8B9', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { window.open(file.url, "_blank") }} >{file && `${getFileName(file.url)}`}</Typography>
                                                    {!editDisabled && <IconButton color="primary" aria-label="delete file" onClick={() => { setFile(undefined) }}>
                                                        <CancelIcon />
                                                    </IconButton>}
                                                </Box> : !editDisabled ? <UploadFile onUploadError={onUploadError} onUploadSuccess={onUploadSuccess} type="leaveattachments" /> : null
                                        }
                                        <FormHelperText sx={{ ml: 2 }} error={errors?.documents ? true : false}>{errors?.documents ? errors.documents.message : null}</FormHelperText>
                                    </Grid>
                                    {status === "WITHDRAWN" && <>
                                        <Grid item xs={4} alignSelf="center">
                                            <Typography variant='subtitle1'>
                                                Withdrawal Remark
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant='inherit' sx={{ color: 'black' }} >{withdrawalRemarks ? withdrawalRemarks : "-"}</Typography>
                                        </Grid>

                                    </>}


                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={4} >
                            <LeaveInformationCard referenceNo={referenceNo} userData={userData} entitledBalance={getEntitledBalance()} entitledDays={getEntitledLeave()} approval={approval} status={status} rejectionRemarks={rejectionRemarks} />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </form>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={notificationisOpen}
            onClose={handleCloseSnackbar}
        >
            <Alert onClose={handleCloseSnackbar} severity={notificationType} sx={{ width: '100%' }}>
                {notificationMessage}
            </Alert>
        </Snackbar>
        <ModalWithdrawLeave open={openWithdrawModal} leaveId={leaveId} onClose={onClose} onFailSubmit={onFailSubmit} onSuccessSubmit={onSuccessSubmit} />
        <ModalRejectItem
            open={openRejectLeaveModal}
            onClose={onCloseRejectLeaveModal}
            itemId={leaveId}
            // onSuccessSubmit={onSuccessWithdraw}
            onSubmitRejectItem={onSubmitRejectLeave}
            itemType="Claim"
        />
    </>
}

export default LeaveApplication;