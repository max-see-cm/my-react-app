import { Box, Grid, Typography } from "@mui/material";
import { ButtonEwaStyleShort } from "../../components/Button/ButtonStyles";
import MuiTableLeaves from "../../components/Table/MuiTableLeaves";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchAllEntitlementLeave } from "../../api/LeaveAPI";
import { LeaveEntitlement, LeaveType } from "../../models/leave.model";
import LeaveEntitlementCard from "../../components/Card/LeaveEntitlementCard";
import { useEffect, useRef, useState } from "react";

function Leaves() {

    const navigate = useNavigate();
    const [mouseDown, setMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const divElement = sliderRef.current;
            if (divElement) {
                const isScrollable = divElement.scrollWidth > divElement.clientWidth;
                divElement.style.cursor = isScrollable ? 'all-scroll' : 'default';
                if (isScrollable) {
                    scrollToStart();
                }

            }
        };

        window.addEventListener('resize', handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // useEffect(() => {
    //     if (isScrollable) {
    //         scrollToStart();
    //     }
    // }, [isScrollable]);

    const scrollToStart = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollTo({
                left: 30,
                behavior: 'smooth',
            });
        }
    };

    const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
        setMouseDown(true);
        if (sliderRef.current) {
            setStartX(e.pageX - sliderRef.current.offsetLeft);
            setScrollLeft(sliderRef.current.scrollLeft);
        }
    };

    const stopDragging = () => {
        setMouseDown(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!mouseDown) return;
        if (sliderRef.current) {
            const x = e.pageX - sliderRef.current.offsetLeft;
            const scroll = x - startX;
            sliderRef.current.scrollLeft = scrollLeft - scroll;
        }
    };


    const { isLoading, isError, data } = useQuery<LeaveEntitlement[], Error>(['fetchAllEntitlementLeave'], fetchAllEntitlementLeave);

    return <Box sx={{ p: 7, minHeight: '100vh', minwidth: '100%' }}>
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <Typography variant='h3'>
                    Leave
                </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <ButtonEwaStyleShort
                    onClick={() => {
                        navigate('/main/leave/my-leaves/leave-application')
                    }}
                    variant="contained"
                    size="large"
                >
                    Apply Now
                </ButtonEwaStyleShort>
            </Grid>

            <Grid item xs={12} width="100vh">
                <div style={{
                    width: '100%', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'default'
                }}
                    ref={sliderRef}
                    onMouseMove={handleMouseMove}
                    onMouseDown={startDragging}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                >
                    <div style={{ display: 'flex' }}>
                        {(!isLoading && !isError && data && data.length > 0) && data.map((leaveEntitlement: LeaveEntitlement) => <LeaveEntitlementCard leaveEntitlement={leaveEntitlement} />)}
                    </div>
                </div>

            </Grid>

            <Grid item xs={12} >
                <MuiTableLeaves />
            </Grid>
        </Grid>
    </Box >
}

export default Leaves;