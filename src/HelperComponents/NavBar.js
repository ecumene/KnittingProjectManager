import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppBar, Grid, Menu, Button } from "@mui/material";
import navBarWool from "../images/navBarWool.jpg";
import { WelcomePageOptionButtons } from "../PagesHome/HelperComponents/WelcomePageOptionButtons";
import { Logo } from "./logo";
import { NewProjectSizeAndColourSelectionModal } from "./NewProjectSizeAndColourSelectionModal";

export const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isOpen, setIsOpen] = useState(false);
  const pathName = window.location.pathname;
  return (
    <>
      <AppBar
        postion="sticky"
        sx={{
          backgroundImage: `url(${navBarWool})`,
          padding: "10px",
          flexDirection: "row",
          justifyContent: "end",
        }}
      >
        {pathName !== "/KnittingProjectManager/NewProject" && (
          <WelcomePageOptionButtons
            btnText="New Project"
            onClick={() => {
              setIsOpen(true);
            }}
          />
        )}
        <NewProjectSizeAndColourSelectionModal
          open={isOpen}
          setIsOpen={setIsOpen}
        />
        <Button
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ width: "50px" }}
        >
          <Logo />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Grid container direction="column">
            <Link
              to="/KnittingProjectManager/"
              style={{ textDecoration: "none" }}
            >
              <WelcomePageOptionButtons btnText="Home" onClick={handleClose} />
            </Link>
            <Link
              to="/KnittingProjectManager/ViewProject"
              style={{ textDecoration: "none" }}
            >
              <WelcomePageOptionButtons
                btnText={"View Projects"}
                onClick={handleClose}
              />
            </Link>
            <Link
              to="/KnittingProjectManager/"
              style={{ textDecoration: "none" }}
            >
              <WelcomePageOptionButtons
                btnText="Log-in"
                onClick={handleClose}
              />
            </Link>
          </Grid>
        </Menu>
      </AppBar>
      <Outlet />
    </>
  );
};
