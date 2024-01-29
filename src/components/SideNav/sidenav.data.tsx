import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export type route = {
  name: string;
  key: string;
  icon: JSX.Element | null;
  route: string;
  subMenu?: route[];
};

export const adminRoutes = [
  {
    name: "Home",
    key: "home",
    icon: <CalendarMonthOutlinedIcon />,
    route: "",
  },
  {
    name: "Leave",
    key: "leave",
    icon: <CalendarMonthOutlinedIcon />,
    route: "leave/leave-main",
    subMenu: [
      {
        name: "My Leaves",
        key: "my-leaves",
        icon: <CalendarMonthOutlinedIcon />,
        route: "leave/my-leaves",
      },
      {
        name: "My Approval",
        key: "my-approval-leaves",
        icon: <CalendarMonthOutlinedIcon />,
        route: "leave/my-approval-leaves",
      },
    ],
  },
  {
    name: "Claim",
    key: "claim",
    icon: <CalendarMonthOutlinedIcon />,
    route: "claim/claim-main",
    subMenu: [
      {
        name: "My Claim",
        key: "my-claim",
        icon: <CalendarMonthOutlinedIcon />,
        route: "claim/my-claim",
      },
      {
        name: "My Approval",
        key: "my-approval-claim",
        icon: <CalendarMonthOutlinedIcon />,
        route: "claim/my-approval-claim",
      },
    ],
  },
];

export const managerRoutes = [
  {
    name: "Home",
    key: "home",
    icon: <CalendarMonthOutlinedIcon />,
    route: "",
  },
  {
    name: "Leave",
    key: "leave",
    icon: <CalendarMonthOutlinedIcon />,
    route: "leave/leave-main",
    subMenu: [
      {
        name: "My Leaves",
        key: "my-leaves",
        icon: <CalendarMonthOutlinedIcon />,
        route: "leave/my-leaves",
      },
      {
        name: "My Approval",
        key: "my-approval-leaves",
        icon: <CalendarMonthOutlinedIcon />,
        route: "leave/my-approval-leaves",
      },
    ],
  },
  {
    name: "Claim",
    key: "claim",
    icon: <CalendarMonthOutlinedIcon />,
    route: "claim/claim-main",
    subMenu: [
      {
        name: "My Claim",
        key: "my-claim",
        icon: <CalendarMonthOutlinedIcon />,
        route: "claim/my-claim",
      },
      {
        name: "My Approval",
        key: "my-approval-claim",
        icon: <CalendarMonthOutlinedIcon />,
        route: "claim/my-approval-claim",
      },
    ],
  },
];

export const employeeRoutes = [
  {
    name: "Home",
    key: "home",
    icon: <CalendarMonthOutlinedIcon />,
    route: "",
  },

  // {
  //   name: "Claim",
  //   key: "claim",
  //   icon: <CalendarMonthOutlinedIcon />,
  //   route: "claim/my-claim",
  // },
  {
    name: "Patient",
    key: "patient",
    icon: <CalendarMonthOutlinedIcon />,
    route: "patient/",
  },

  {
    name: "Daya Automation",
    key: "rpa",
    icon: <CalendarMonthOutlinedIcon />,
    route: "rpa",
  },
  // {
  //   name: "Visit",
  //   key: "visit",
  //   icon: <CalendarMonthOutlinedIcon />,
  //   route: "visit/",
  // },
];
