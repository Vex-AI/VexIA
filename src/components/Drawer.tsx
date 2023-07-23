import {
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { RootState } from "../store/";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useState } from "react";
import { Brush, Delete, School, Person, Home } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Dispatch } from "redux";
import { dropAllMessage } from "../store/reducers/vexReducer";
import { useNavigate, NavigateFunction } from "react-router-dom";

interface IDrawerProps {
  dispatch: Dispatch;
}
const Drawer: React.FC<IDrawerProps> = ({ dispatch }) => {
  const [drawer, setDrawer] = useState<boolean>(false);
  const { t } = useTranslation();

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#424242",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });
  const navigate: NavigateFunction = useNavigate();

  const DItem = styled(ListItem)({
    display: "flex",
    gap: "1rem",
    padding: "1.5rem 2rem",
  });

  return (
    <ThemeProvider theme={theme}>
      <SwipeableDrawer
        variant="temporary"
        anchor="left"
        open={drawer}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <List>
          <DItem onClick={() => navigate("custom")}>
            <Brush />
            {t("customization")}
          </DItem>
          <Divider />
          <DItem
            onClick={() => {
              dispatch(dropAllMessage);
            }}
          >
            <Delete />
            {t("clearChat")}
          </DItem>
          <Divider />
          <DItem onClick={() => navigate("profile")}>
            <Person />
            {t("vexProfile")}
          </DItem>
          <Divider />
          <DItem onClick={() => navigate("/home")}>
            <Home />
            {t("home")}
          </DItem>
          <Divider />
        </List>
      </SwipeableDrawer>
    </ThemeProvider>
  );
};

export default connect((state) => state)(Drawer);
