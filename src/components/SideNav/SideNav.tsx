import {
  Avatar,
  Box,
  Button,
  CSSObject,
  Collapse,
  Container,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
  styled,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { AuthContext } from "../../auth/AuthContext";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Link, Outlet, useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { User } from "../../models/user.model";
import {
  adminRoutes,
  managerRoutes,
  employeeRoutes,
  route,
} from "./sidenav.data";
import EwaMedLogo from "../../assets/ewark-logo.svg";
import EwaMainMenu from "../Menu/EwaMainMenu";

function SideNav() {
  const [open, setOpen] = useState(true);
  const auth = useContext(AuthContext);
  const userData: User = auth.getUserInfo();

  const [openMenus, setOpenMenus] = useState<any[]>([]);
  const [currentRoute, setCurrentRoute] = useState<route[]>([]);

  const [selectedIndex, setSelectedIndex] = useState("0");

  const imgBackgroundUrl = new URL(
    "../../assets/navbar-background.svg",
    import.meta.url
  ).href;

  const drawerWidth = 250;
  const location = useLocation();

  const handleBoxClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setOpen(!open);
  };

  const getCurrentRoute = (role: string) => {
    return employeeRoutes;
    // switch (userData.role) {
    //   case "admin":
    //     return adminRoutes;
    //   case "manager":
    //     return managerRoutes;
    //   case "employee":
    //     return employeeRoutes;
    //   default:
    //     return [];
    // }
  };

  useEffect(() => {
    setCurrentRoute(getCurrentRoute(""));
  });

  const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    backgroundColor: "#F5F5F5",
  }));

  const handleListItemClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index.toString());
  };

  useEffect(() => {
    const currentRoute: route[] = employeeRoutes;
    const paths = location.pathname.split("/");
    const getCurrentRouteInfo = currentRoute.find(
      (item) => item.key === paths[2]
    );

    // console.log("location useeffect", paths)
    // console.log("current", currentRoute)
    // console.log("getCurrentRouteInfo", getCurrentRouteInfo)

    if (getCurrentRouteInfo) {
      const parentIndex = currentRoute.findIndex(
        (item) => item.key === getCurrentRouteInfo.key
      );
      let submenuIndex = -1;

      setOpenMenus([parentIndex]);

      if (getCurrentRouteInfo?.subMenu) {
        //const parentKey = paths[paths.length - 2];

        if (parentIndex > -1) {
          // Get the key of the submenu item
          //const submenuKey = paths[3];

          // console.log("submenykey", submenuKey)
          // console.log("parentmenu", currentRoute[parentIndex].subMenu)
          // console.log('parentindex', parentIndex)

          // Get the index of the submenu item in the parent's subItems array")

          // Get the index of the submenu item in the parent's subItems array

          submenuIndex = getCurrentRouteInfo.subMenu.findIndex(
            (item) => item.key === paths[3]
          );

          // if (currentRoute[parentIndex].subMenu) {
          //     submenuIndex = currentRoute[parentIndex].subMenu!.findIndex((item) => item.key === submenuKey);

          // }

          if (submenuIndex == -1) {
            setSelectedIndex(`${parentIndex}`);
          } else {
            // Set the selectedIndex state to the string value of the combined parent and submenu index
            setSelectedIndex(`${parentIndex}-${submenuIndex}`);
          }
        }
      } else {
        // const index = currentRoute.findIndex((item) => item.key === paths[paths.length - 1]);

        if (parentIndex > -1) {
          // Set the selectedIndex state to the string value of the index
          setSelectedIndex(`${parentIndex}`);
        }
      }
    }

    // console.log("location useeffect", paths)
    // const isSubmenu = paths.length > 3;
    // console.log("location issubmenu", isSubmenu)

    // console.log("current", currentRoute)

    // if (isSubmenu) {
    //     const parentKey = paths[paths.length - 2];
    //     const parentIndex = currentRoute.findIndex((item) => item.key === parentKey);

    //     if (parentIndex > -1) {
    //         // Get the key of the submenu item
    //         const submenuKey = paths[paths.length - 1];

    //         // Get the index of the submenu item in the parent's subItems array")

    //         // Get the index of the submenu item in the parent's subItems array
    //         if (currentRoute[parentIndex].subMenu) {
    //             submenuIndex = currentRoute[parentIndex].subMenu!.findIndex((item) => item.key === submenuKey);
    //         }

    //         if (submenuIndex > -1) {
    //             // Set the selectedIndex state to the string value of the combined parent and submenu index
    //             setSelectedIndex(`${parentIndex}-${submenuIndex}`);
    //         }
    //     }

    // } else {
    //     // Get the index of the current route in the routes array

    //     console.log("index path", paths[paths.length - 1])
    //     // console.log("index", index)

    //     const index = currentRoute.findIndex((item) => item.key === paths[paths.length - 1]);

    //     if (index > -1) {
    //         // Set the selectedIndex state to the string value of the index
    //         setSelectedIndex(`${index}`);
    //     }
    // }
  }, [location]);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box
          sx={{
            height: 325,
            backgroundImage: `url(${imgBackgroundUrl})`,
            p: 4,
          }}
        >
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6">My Profile</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
              {/* <Box sx={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', cursor: 'pointer' }} >
                            <EditOutlinedIcon sx={{ p: 0.25 }} />
                        </Box> */}
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Avatar sx={{ height: 84, width: 84 }} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ mt: 3 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="body1" align="center">
                {userData.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6" align="center">
                {userData.designation}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <EwaMainMenu />
            </Grid>
          </Grid>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <List sx={{ mt: 2 }}>
            {currentRoute.map((item, index) => {
              const hasSubMenu = item.subMenu && item.subMenu.length > 0;
              const isSelected = hasSubMenu
                ? selectedIndex.charAt(0) === index.toString()
                : selectedIndex === index.toString();
              let isMenuOpen = openMenus.includes(index);

              const props = { ...{ to: item.route, component: Link } };
              return (
                <>
                  <ListItem
                    key={item.key + "item"}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      {...props}
                      key={item.key + "listitembutton"}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        "&.Mui-selected": {
                          backgroundColor: "transparent", //(theme) => theme.palette.tertiary.main,
                          //primary: (theme) => theme.palette.tertiary.main,
                          // '&, & .MuiTypography-subtitle1': {
                          //     color: (theme) => theme.palette.tertiary.main,
                          // }
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "transparent", //(theme) => theme.palette.tertiary.main,
                        },
                      }}
                      selected={isSelected}
                      onClick={(event) => {
                        handleListItemClick(event, index);
                        if (openMenus.includes(index)) {
                          setOpenMenus(openMenus.filter((i) => i !== index));
                        } else {
                          //setOpenMenus([...openMenus, index]);
                          setOpenMenus([index]);
                        }
                        // if (!hasSubMenu) { handleListItemClick(event, index) } else {
                        //     if (openMenus.includes(index)) {
                        //         setOpenMenus(openMenus.filter((i) => i !== index));
                        //     } else {
                        //         //setOpenMenus([...openMenus, index]);
                        //         setOpenMenus([index]);
                        //     }
                        // }
                      }}
                    >
                      <ListItemIcon
                        key={item.key + "icon"}
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        key={item.key + "text"}
                        primary={
                          <Typography
                            variant={isSelected ? "selectedTitle" : "subtitle1"}
                          >
                            {item.name}
                          </Typography>
                        }
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                      {hasSubMenu ? (
                        isMenuOpen ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : null}
                    </ListItemButton>
                  </ListItem>
                  {item.subMenu &&
                    item.subMenu.map((subitem, subindex) => {
                      const isSelectedSub =
                        selectedIndex === `${index}-${subindex}`;
                      return (
                        <Collapse
                          key={subitem.key + "collapse"}
                          in={isMenuOpen}
                          timeout="auto"
                        >
                          <ListItem
                            key={subitem.key + "subitem"}
                            sx={{ display: "block" }}
                            disablePadding
                          >
                            <ListItemButton
                              key={subitem.key + "button"}
                              component={Link}
                              to={subitem.route}
                              sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                                "&.Mui-selected": {
                                  backgroundColor: "#DBF1F1",
                                  color: (theme) => theme.palette.tertiary.main,
                                },
                                "&.Mui-selected:hover": {
                                  backgroundColor: "#DBF1F1",
                                },
                              }}
                              selected={isSelectedSub}
                              onClick={(event) =>
                                setSelectedIndex(`${index}-${subindex}`)
                              }
                            >
                              {/* <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {subitem.icon}
                                </ListItemIcon> */}
                              <ListItemText
                                key={subitem.key + "subtext"}
                                primary={
                                  <Typography
                                    variant={
                                      isSelectedSub
                                        ? "selectedTitle"
                                        : "subtitle1"
                                    }
                                  >
                                    {subitem.name}
                                  </Typography>
                                }
                                sx={{ opacity: open ? 1 : 0, ml: 6 }}
                              />
                            </ListItemButton>
                          </ListItem>
                        </Collapse>
                      );
                    })}
                </>
              );
            })}
          </List>
          {/* <Box sx={{ mb: 4 }}>
            <img
              src={EwaMedLogo}
              style={{
                objectFit: "cover",
                width: "100%",
                transform: "scale(0.65)",
              }}
            />
          </Box> */}
        </Box>
      </Drawer>
      <Main open={open}>
        <Outlet />
      </Main>

      {/* <Box sx={{ width: '100%', height: '100%', backgroundColor: 'grey' }} display="flex" justifyContent="right" alignItems="center">  <Box sx={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', cursor: 'pointer' }} onClick={handleBoxClick}>
            <EditOutlinedIcon sx={{ p: 0.25 }} />
        </Box></Box> */}
    </Box>
  );
}

export default SideNav;
