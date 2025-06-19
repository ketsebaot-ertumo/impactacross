"use client";

import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "@formspree/react";


export default function Form() {
  const [state, handleSubmit] = useForm("mzzppzop");
  const [errors, setErrors] = useState({});

  if (state.succeeded) {
    window.location.href = "/thank-you";
    return;
  }

  const validateField = (name, value) => {
    let error = "";
    if (name === "first_name") {
      if (!value) {
        error = "First Name is required!";
      } else if (!/^[A-Za-z]+$/.test(value)) {
        error = "First Name should contain only letters";
      }
    }
    if (name === "email") {
      if (!value) {
        error = "Email is required!";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email is invalid";
      }
    }
    if (name === "message" && !value) {
      error = "Message is required!";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl p-5 border border-gray-300 shadow-lg"
    >
      <div className="md:flex gap-5 pt-3">
        <TextField
          sx={{
            mb: 3,
            "& .MuiInputBase-root": {
              color: "text.secondary",
            },
            fieldset: { borderColor: "rgb(231, 215, 240)" },
          }}
          fullWidth
          id="first_name"
          label="First Name"
          name="first_name"
          placeholder="First Name"
          onBlur={handleBlur}
          error={Boolean(errors.first_name)}
          helperText={errors.first_name}
          required
        />

        <TextField
          sx={{
            mb: 3,
            "& .MuiInputBase-root": {
              color: "text.secondary",
            },
            fieldset: { borderColor: "rgb(231, 215, 240)" },
          }}
          fullWidth
          id="last_name"
          label="Last Name"
          name="last_name"
          placeholder="Last Name"
          onBlur={handleBlur}
          error={Boolean(errors.last_name)}
          helperText={errors.last_name}
        />
      </div>

      <TextField
        sx={{
          mb: 3,
          "& .MuiInputBase-root": {
            color: "text.secondary",
          },
          fieldset: { borderColor: "rgb(231, 215, 240)" },
        }}
        fullWidth
        id="email"
        label="E-mail"
        name="email"
        placeholder="your@email.com"
        onBlur={handleBlur}
        error={Boolean(errors.email)}
        helperText={errors.email}
        required
      />

      <TextField
        sx={{
          mb: 3,
          "& .MuiInputBase-root": {
            color: "text.secondary",
          },
          fieldset: { borderColor: "rgb(231, 215, 240)" },
        }}
        fullWidth
        multiline
        rows={3}
        id="message"
        label="Message"
        name="message"
        type="text"
        placeholder="Message"
        onBlur={handleBlur}
        error={Boolean(errors.message)}
        helperText={errors.message}
        required
      />

      <button
        className="text-white hover:opacity-60 bg-green-800 opacity-60 py-2 px-20 rounded-lg"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
