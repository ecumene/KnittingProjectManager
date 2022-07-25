import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ThemeProvider,
  Typography,
  Box,
  TextField,
  Select,
} from "@mui/material";
import KnittingTheme, { palette, modalTitle } from "../assets/theme";
import { ModalButton } from "./ModalButton";

export const NewProjectSizeAndColourSelectionModal = ({
  open,
  onClick,
  setIsOpen,
}) => {
  const form = useRef();
  const validationSchema = yup.object().shape({
    projectName: yup.string().required("This is required"),
    Row: yup.string().required("This is required"),
    Column: yup.string().required("This is required"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(validationSchema) });
  const [state, setState] = useState({
    currentProjectName: " ",
    currentProjectType: " ",
    Row: " ",
    Column: " ",
  });
  const handleInput = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const navigate = useNavigate();
  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(JSON.stringify(data, null, 2));
    console.log(state.currentProjectName);
    console.log(state.currentProjectType);
    console.log(state.Row);
    console.log(state.Column);
    setIsOpen(false);
    navigate("/NewProject");
  };
  return (
    <ThemeProvider theme={KnittingTheme}>
      <Modal open={open} onClick={onClick}>
        <Box
          style={{
            overflow: "scroll",
            transform: "translate(25%, 15%)",
            display: "inline-block",
            height: "80%",
            maxHeight: "500px",
            width: "70%",
          }}
        >
          <Typography variant="h4" sx={modalTitle}>
            New Knitting Project
          </Typography>
          <Box
            sx={{
              padding: "24px 24px 0 24px",
              backgroundColor: "#f1e1f1",
              borderRadius: "0 0 24px 24px",
            }}
          >
            <form ref={form} onSubmit={handleSubmit(onSubmit)}>
              <Box padding="10px">
                <TextField
                  required
                  fullWidth
                  {...register("projectName")}
                  error={errors.projectName ? true : false}
                  label="Project Name"
                  name="currentProjectName"
                  value={state.currentProjectName}
                  onChange={handleInput}
                />
                <Typography variant="inherit" color={palette.knittingPurple}>
                  {errors.projectName?.message}
                </Typography>
              </Box>
              <Box padding="10px">
                <TextField
                  fullWidth
                  {...register("projectType")}
                  label="Project Type"
                  name="currentProjectType"
                  value={state.currentProjectType}
                  onChange={handleInput}
                />
              </Box>
              <Box padding="10px" textAlign="center">
                <Select
                  required
                  {...register("Row")}
                  error={errors.Row ? true : false}
                  native
                  label="Row"
                  sx={{ margin: "10px" }}
                  name="Row"
                  value={state.Row}
                  onChange={handleInput}
                >
                  <option value=""> ---Row*--- </option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                  <option value={4}>Four</option>
                  <option value={5}>Five</option>
                  <option value={6}>Six</option>
                  <option value={7}>Seven</option>
                  <option value={8}>Eight</option>
                  <option value={9}>Nine</option>
                  <option value={10}>Ten</option>
                  <option value={11}>Eleven</option>
                  <option value={12}>Twelve</option>
                </Select>
                <Typography variant="inherit" color={palette.knittingPurple}>
                  {errors.Row?.message}
                </Typography>
                <Select
                  required
                  {...register("Column")}
                  error={errors.Column ? true : false}
                  native
                  label="Column"
                  sx={{ margin: "10px" }}
                  name="Column"
                  value={state.Column}
                  onChange={handleInput}
                >
                  <option value=""> --Column*-- </option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                  <option value={4}>Four</option>
                  <option value={5}>Five</option>
                  <option value={6}>Six</option>
                  <option value={7}>Seven</option>
                  <option value={8}>Eight</option>
                  <option value={9}>Nine</option>
                  <option value={10}>Ten</option>
                  <option value={11}>Eleven</option>
                  <option value={12}>Twelve</option>
                </Select>
                <Typography variant="inherit" color={palette.knittingPurple}>
                  {errors.Column?.message}
                </Typography>
              </Box>
              <Box textAlign="center">
                <ModalButton onClick={handleSubmit(onSubmit)} text="Submit" />
                <ModalButton
                  text="Cancel"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                />
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};
