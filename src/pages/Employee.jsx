import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUserById } from "../utils/apiFunctions";

const Employee = () => {
  const token = localStorage.getItem("token");

  let params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessageUser, setErrorMessageUser] = useState("");

  const [successMessageUpdate, setSuccessMessageUpdate] = useState("");
  const [errorMessageUpdate, setErrorMessageUpdate] = useState("");

  const formatter = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    otherNames: "",
    phoneNumber: "",
    email: "",
    birthday: "",
    firstAddress: "",
    secondAdress: "",
    details: "",
    scores: "",
  });

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(params.id, token);
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        setErrorMessageUser(error.message);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [params.id, token]);

  const handleUserUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserById(params.id, user);

      if (response !== 200) {
        setSuccessMessageUpdate("Donnees mise a jour avec succes!");
        setErrorMessageUpdate("");
        setOpen(true)
      } else {
        setErrorMessageUpdate("Error de mise a jour les infos");
        setOpen(true)
      }
    } catch (error) {
      setErrorMessageUpdate(error.message);
      setOpen(true)
    }
  };

  return (
    <Paper
      sx={{ padding: "5px", margin: 3, bgcolor: "whitesmoke" }}
      elevation={10}
    >
      <Grid container my={1} rowSpacing={1} columnSpacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Box m="20px" width={"100%"}>
            <h2>Mise a jour d'infos</h2>

            {isLoading && "Veuillez patienter"}

            {errorMessageUser && (
              <Alert
                variant="standard"
                severity="error"
                onClose={() => {
                  setErrorMessageUser("");
                }}
              >
                {errorMessageUser}
              </Alert>
            )}

            {errorMessageUpdate && (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  {errorMessageUpdate}
                </Alert>
              </Snackbar>
            )}
            {successMessageUpdate && (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  {successMessageUpdate}
                </Alert>
              </Snackbar>
            )}

            <form onSubmit={handleUserUpdateSubmit}>
              <Stack spacing={2} sx={{ marginRight: 3, marginBottom: 3 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Prenom"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleUserInputChange}
                  fullWidth
                  required
                />
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Nom"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleUserInputChange}
                  fullWidth
                  required
                />
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Surnom"
                  name="otherNames"
                  value={user.otherNames}
                  onChange={handleUserInputChange}
                  fullWidth
                  sx={{ mb: 4 }}
                />

                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Telephone"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleUserInputChange}
                  fullWidth
                  sx={{ mb: 4 }}
                />

                <TextField
                  type="email"
                  variant="outlined"
                  color="secondary"
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={handleUserInputChange}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />

                <TextField
                  type="date"
                  variant="outlined"
                  color="secondary"
                  label="Date de Naissance"
                  name="birthday"
                  value={formatter.format(new Date())}
                  onChange={handleUserInputChange}
                  min={moment().format("YYYY-MM-DD")}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />

                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Adress 1"
                  name="firstAddress"
                  value={user.firstAddress}
                  onChange={handleUserInputChange}
                  fullWidth
                  sx={{ mb: 4 }}
                />

                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Adress 2"
                  name="secondAdress"
                  value={user.secondAdress}
                  onChange={handleUserInputChange}
                  fullWidth
                  sx={{ mb: 4 }}
                />

                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Details"
                  name="details"
                  value={user.details}
                  onChange={handleUserInputChange}
                  fullWidth
                  sx={{ mb: 4 }}
                />
              </Stack>
              <Button variant="outlined" color="secondary" type="submit">
                Sauvegarder
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Employee;
