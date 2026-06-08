"use client";

import { useState } from "react";
import { Envelope, Eye, EyeSlash, Lock } from "@gravity-ui/icons";
import {
  InputGroup,
  Label,
  TextField,
  Button,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) return "Email is required";

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";

    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least 1 uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least 1 lowercase letter";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least 1 number";
    }

    return "";
  };

  const getPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^A-Za-z0-9]/.test(password)) score += 10;

    return Math.min(score, 100);
  };

  const strength = getPasswordStrength(password);

  const getStrengthLabel = () => {
    if (strength === 0) return "";
    if (strength < 40) return "Weak";
    if (strength < 70) return "Medium";
    if (strength < 90) return "Strong";
    return "Very Strong";
  };

  const getStrengthColor = () => {
    if (strength < 40) return "#ef4444";
    if (strength < 70) return "#f59e0b";
    if (strength < 90) return "#3b82f6";
    return "#22c55e";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) return;

    console.log("Form Data:", values);

     const { data, error } = await authClient.signIn.email({
          email: values.email,
          password: values.password,
          callbackURL: "/",
        });
        if(error){
          console.log(error)
          alert(error.message)
        }
        
        if (data) {
          console.log("Signup successful:", data);
        }

    // e.currentTarget.reset();
    // setPassword("");

    // setErrors({
    //   email: "",
    //   password: "",
    // });
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <TextField className="w-full">
          <Label
            className="mb-1.5 block text-xs font-medium"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Sora',sans-serif",
            }}
          >
            Email address
          </Label>

          <InputGroup
            className="rounded-xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: errors.email
                ? "1px solid #ef4444"
                : "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <InputGroup.Prefix
              className="flex items-center pl-3.5"
              style={{ background: "transparent", border: "none" }}
            >
              <Envelope
                className="size-4"
                style={{
                  color: errors.email
                    ? "#ef4444"
                    : "rgba(255,255,255,0.35)",
                }}
              />
            </InputGroup.Prefix>

            <InputGroup.Input
              name="email"
              type="email"
              placeholder="name@email.com"
              className="w-full py-2.5 pr-3 text-sm text-white placeholder:text-white/25 bg-transparent outline-none border-none"
              style={{
                fontFamily: "'Sora',sans-serif",
                caretColor: "#a78bfa",
              }}
            />
          </InputGroup>

          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </TextField>

        {/* Password */}
        <TextField className="w-full">
          <Label
            className="mb-1.5 block text-xs font-medium"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Sora',sans-serif",
            }}
          >
            Password
          </Label>

          <InputGroup
            className="rounded-xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: errors.password
                ? "1px solid #ef4444"
                : "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <InputGroup.Prefix
              className="flex items-center pl-3.5"
              style={{ background: "transparent", border: "none" }}
            >
              <Lock
                className="size-4"
                style={{
                  color: errors.password
                    ? "#ef4444"
                    : "rgba(255,255,255,0.35)",
                }}
              />
            </InputGroup.Prefix>

            <InputGroup.Input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full py-2.5 text-sm text-white placeholder:text-white/25 bg-transparent outline-none border-none"
              style={{
                fontFamily: "'Sora',sans-serif",
                caretColor: "#a78bfa",
              }}
            />

            <InputGroup.Suffix
              className="flex items-center pr-3.5"
              style={{ background: "transparent", border: "none" }}
            >
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: showPassword
                    ? "#a78bfa"
                    : "rgba(255,255,255,0.35)",
                }}
              >
                {showPassword ? (
                  <EyeSlash className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </InputGroup.Suffix>
          </InputGroup>

          {/* Password Strength */}
          {password && (
            <div className="mt-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-white/60">
                  Password Strength
                </span>

                <span
                  className="text-xs font-medium"
                  style={{ color: getStrengthColor() }}
                >
                  {getStrengthLabel()}
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${strength}%`,
                    backgroundColor: getStrengthColor(),
                  }}
                />
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {[25, 50, 75, 100].map((level) => (
                  <div
                    key={level}
                    className="h-1 rounded-full transition-all"
                    style={{
                      background:
                        strength >= level
                          ? getStrengthColor()
                          : "rgba(255,255,255,0.12)",
                    }}
                  />
                ))}
              </div>

              <ul className="mt-3 space-y-1 text-xs text-white/50">
                <li
                  className={
                    password.length >= 8
                      ? "text-green-400"
                      : ""
                  }
                >
                  ✓ Minimum 8 characters
                </li>

                <li
                  className={
                    /[A-Z]/.test(password)
                      ? "text-green-400"
                      : ""
                  }
                >
                  ✓ Uppercase letter
                </li>

                <li
                  className={
                    /[0-9]/.test(password)
                      ? "text-green-400"
                      : ""
                  }
                >
                  ✓ Number
                </li>

                <li
                  className={
                    /[^A-Za-z0-9]/.test(password)
                      ? "text-green-400"
                      : ""
                  }
                >
                  ✓ Special character
                </li>
              </ul>
            </div>
          )}

          {errors.password && (
            <p className="mt-2 text-xs text-red-500">
              {errors.password}
            </p>
          )}
        </TextField>

        <Button
          type="submit"
          className="w-full mt-5 py-3 text-sm font-semibold text-white rounded-xl transition-opacity hover:opacity-90 active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
            boxShadow:
              "0 8px 24px rgba(124,58,237,0.30)",
            fontFamily: "'Sora',sans-serif",
            height: "44px",
            border: "none",
          }}
        >
          Sign In Now
        </Button>
      </form>
    </section>
  );
}