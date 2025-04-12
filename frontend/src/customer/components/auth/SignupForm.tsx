import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAuth } from "../../../auth/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
import {
  completeSignup,
  resetAuthState,
} from "../../../Redux/Customer/AuthSlice";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { login, isLoggedIn } = useAuth();

  // Get the auth state from Redux
  const { isLoading, error, signupSuccess } = useAppSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Reset auth state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Redirect to login after successful signup
  useEffect(() => {
    if (signupSuccess) {
      console.log("Signup successful, redirecting to login");
      // Short delay before redirecting to login
      const timer = setTimeout(() => {
        login(); // This calls the Keycloak login function from AuthContext
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [signupSuccess, login]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    if (validateForm()) {
      const { confirmPassword, ...signupData } = formData;
      console.log("Dispatching completeSignup with data:", signupData);
      dispatch(completeSignup(signupData));
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ color: "#00927c" }}
        >
          Create Your Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {signupSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Account created successfully! Redirecting to login...
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            error={!!formErrors.username}
            helperText={formErrors.username}
            disabled={isLoading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            disabled={isLoading}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
              disabled={isLoading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
              disabled={isLoading}
            />
          </Box>

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            disabled={isLoading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            disabled={isLoading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#00927c",
              "&:hover": {
                bgcolor: "#007c69",
              },
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Button
                onClick={login}
                sx={{
                  textTransform: "none",
                  color: "#00927c",
                  "&:hover": {
                    bgcolor: "rgba(0, 146, 124, 0.04)",
                  },
                }}
              >
                Log in
              </Button>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupForm;
