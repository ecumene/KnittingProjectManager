import { useState } from "react";
import { Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  palette,
  editorDrawerProjectNames,
  editorDrawerLabels,
} from "../../assets/theme";
import { ColorPicker } from "./ColorPicker";
import { EditDrawerButtonsAndPopover } from "./EditDrawerButtonsAndPopovers";
import { ProjectExitButtonModal } from "../../HelperComponents/ProjectExitButtonModal";

export const NewProjectEditorDrawerDetails = ({
  currentProjectNameForDrawer,
  currentProjectTypeForDrawer,
  currentlySelectedColor,
  setCurrentlySelectedColor,
  clearGrid,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = window.location.pathname;
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          backgroundColor: palette.knittingLightBlue,
          paddingTop: "36px",
          paddingBottom: "28px",
          fontFamily: "La Belle Aurore",
          textAlign: "center",
          color: palette.knittingPurple,
        }}
      >
        Edit Project
        <EditIcon />
      </Typography>
      <Box sx={{ margin: "18px" }}>
        <Box sx={{ display: "flex", paddingTop: "12px" }}>
          <Typography variant="h8" sx={editorDrawerLabels}>
            Project Name:
          </Typography>
          <Typography variant="h5" sx={editorDrawerProjectNames}>
            {currentProjectNameForDrawer || "---"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h8" sx={editorDrawerLabels}>
            Project Type:
          </Typography>
          <Typography variant="h5" sx={editorDrawerProjectNames}>
            {currentProjectTypeForDrawer || "---"}
          </Typography>
        </Box>
        <hr sx={editorDrawerLabels} />
        <Typography variant="h8" sx={editorDrawerLabels}>
          Wool Color:
        </Typography>
        <ColorPicker
          currentlySelectedColor={currentlySelectedColor}
          setCurrentlySelectedColor={setCurrentlySelectedColor}
        />
        <hr sx={editorDrawerLabels} />
        <Box sx={{ textAlign: "center", marginTop: "18px" }}>
          {pathName !== "/KnittingProjectManager/NewProject" && (
            <EditDrawerButtonsAndPopover
              popoverText={"Reset Project."}
              onClick={() => {
                clearGrid();
              }}
            />
          )}
          {pathName === "/KnittingProjectManager/NewProject" && (
            <EditDrawerButtonsAndPopover
              popoverText={"Clear Grid."}
              onClick={() => {
                clearGrid();
              }}
            />
          )}
          <EditDrawerButtonsAndPopover popoverText={"Save."} />
          <EditDrawerButtonsAndPopover
            popoverText={"Exit."}
            onClick={() => {
              setIsOpen(true);
            }}
          />
          <ProjectExitButtonModal open={isOpen} setIsOpen={setIsOpen} />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: palette.knittingLightBlue,
          height: "100%",
          marginTop: "6px",
        }}
      />
    </>
  );
};
