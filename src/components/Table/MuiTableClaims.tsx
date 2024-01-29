import { Box, Button, Grid, IconButton, Menu, MenuItem, Pagination, PaginationItem, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DateInputFilterCustom } from "../TextField/InputBox";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import axios from "axios";
import { useQuery } from "react-query";
import { Claim } from "../../models/claim.model";
import { useNavigate, useNavigation } from "react-router-dom";
import { ResponseQuery } from "../../models/common.model";
import { convertCentToRM, getColorStatus, prettifyStatusLabel } from "../../util/util";
import { motion } from "framer-motion";

interface MenuState {
    anchorEl: null | HTMLElement;
    isOpen: boolean;

}


function MuiTableClaims() {

    const [filterDate, setFilterDate] = useState(dayjs());
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowPerPage] = useState(7);
    const [menus, setMenus] = useState<MenuState[]>([]);
    const navigate = useNavigate();
    const [totalRecord, setTotalRecord] = useState(0);

    // const [anchorEl, setAnchorEl] = useState<null | HTMLElement[]>([]);
    // const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        const newMenus = [...menus];
        newMenus[index] = {
            anchorEl: event.currentTarget,
            isOpen: true,
        };
        setMenus(newMenus);
        // setAnchorEl(event.currentTarget);
    };
    const handleClose = (index: number) => {
        // setAnchorEl(null);
        const newMenus = [...menus];
        newMenus[index].isOpen = false;
        setMenus(newMenus);
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    async function fetchClaims() {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/claims`, {
            params: {
                page: page,
                perPage: rowsPerPage
            }
        })

        if (data.code == "SUCCESS") {
            return data;
        }

    }


    const useClaim = useQuery<ResponseQuery<Claim>, Error>(['claim', page, rowsPerPage], fetchClaims, {
        onSuccess(data) {
            setTotalRecord(data.total);
        },
        // enabled: true
    })
    const { data } = useClaim;

    if (useClaim.isLoading) {
        return <div>loading</div>
    }

    if (useClaim.isError) {
        return <div>{useClaim.error.message}</div>
    }

    return <>
        <Grid container sx={{ mb: 2 }}>
            <Grid item xs={6} justifyContent="space-between">
                {/* <DateInputFilterCustom value={filterDate} onChange={(date) => { date ? setFilterDate(date) : null }} /> */}
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end" >
                <Box sx={{
                    display: 'flex', alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Pagination
                        page={page}
                        count={Math.ceil(totalRecord / rowsPerPage)}
                        onChange={handleChange}
                        renderItem={(item) => {

                            return <PaginationItem

                                slots={{ previous: ArrowCircleLeftOutlinedIcon, next: ArrowCircleRightOutlinedIcon }}
                                {...item}
                            />
                        }}
                    />
                </Box>
            </Grid>
        </Grid >

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>

            <Box sx={{ backgroundColor: 'white', borderRadius: '24px', p: 2 }}>
                <TableContainer >
                    <Table sx={{ width: '100%' }} >
                        <TableHead sx={{ backgroundColor: '#FFFFFF', minWidth: '100%', ' & , MuiTableHead- root': { mt: 4, mb: 4, borderRadius: '24px', } }}>
                            <TableRow>
                                <TableCell align="left" ><Typography variant="tableHeader">Date</Typography></TableCell>
                                <TableCell align="left"><Typography variant="tableHeader">Type</Typography></TableCell>
                                <TableCell align="right" ><Typography variant="tableHeader">Amount(MYR)</Typography></TableCell>
                                <TableCell align="left"><Typography variant="tableHeader">Status</Typography></TableCell>
                                <TableCell align="right"><Typography variant="tableHeader" >Action</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        {/* </Box> */}

                        <TableBody sx={{ backgroundColor: '#FFFFFF', mt: 4, '& .MuiTableBody-root': { mt: 4, borderRadius: '24px' } }} >
                            {
                                // data ?
                                //     (rowsPerPage > 0
                                //         ? data.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                //         : data
                                //     ).


                                data ? data.data.map((data, index) => {
                                    return <>
                                        <TableRow
                                            key={data._id}
                                            // onClick={() => { navigate(`/main/employee/employeeDetails/${row._id}`) }}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0, } }}
                                        >
                                            <TableCell align="left" width="50">{dayjs(data.createdAt).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell align="left">{data.type.name}</TableCell>
                                            <TableCell align="right" >{convertCentToRM(data.amount)}</TableCell>
                                            <TableCell align="left"><Typography variant="h6" color={getColorStatus(data.status)}>{prettifyStatusLabel(data.status)}</Typography></TableCell>
                                            <TableCell align="right">
                                                <Button variant="text" color="tertiary" sx={{ m: 0, p: 0 }} onClick={() => { navigate('/main/claim/my-claim/claim-submission', { state: { claimInfo: data, viewOnly: false } }) }} >View</Button>
                                                {/* <IconButton color="secondary" onClick={(event) => { handleClick(event, index) }}
                                                aria-haspopup="true"
                                                aria-expanded={Boolean(menus[index]?.isOpen) ? 'true' : undefined}>
                                                <MoreVertIcon />
                                            </IconButton> */}
                                            </TableCell>

                                            {/* <TableCell align="right"> <Button variant="text" color="tertiary" onClick={() => { }} >Send Reminder</Button>
                                            <IconButton color="secondary" onClick={(event) => { handleClick(event, index) }}
                                                aria-haspopup="true"
                                                aria-expanded={Boolean(menus[index]?.isOpen) ? 'true' : undefined}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={menus[index]?.anchorEl}
                                                id="account-menu"
                                                open={Boolean(menus[index]?.isOpen)}
                                                onClose={() => handleClose(index)}
                                                onClick={() => handleClose(index)}
                                                PaperProps={{
                                                    elevation: 1,
                                                    sx: {
                                                        overflow: 'visible',
                                                        mt: 0.5
                                                    },
                                                }}
                                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                            >
                                                <MenuItem onClick={() => {
                                                    navigate('/main/claim/my-claim/claim-submission', { state: { claimInfo: data } })
                                                    handleClose(index);
                                                }}>
                                                    <Typography variant="menuLink1">View</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={() => {
                                                    navigate('/main/claim/my-claim/claim-submission', { state: { claimInfo: data } })
                                                    handleClose(index);
                                                }}>
                                                    <Typography variant="menuLink1">Edit</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={() => handleClose(index)}>
                                                    <Typography variant="menuLink1">Delete</Typography>
                                                </MenuItem>
                                            </Menu>
                                        </TableCell> */}
                                        </TableRow>
                                    </>
                                }) : null}
                        </TableBody>
                    </Table>
                </TableContainer >
            </Box>
        </motion.div>
    </>

}

export default MuiTableClaims;