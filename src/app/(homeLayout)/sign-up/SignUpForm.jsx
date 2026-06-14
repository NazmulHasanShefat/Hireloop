"use client";

import { useState } from "react";
import { Envelope, Eye, EyeSlash, Lock } from "@gravity-ui/icons";
import { InputGroup, Label, TextField, Button } from "@heroui/react";
import { UserIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [userRoll, setUserRoll] = useState("seeker");
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

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

    const { data, error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      role: userRoll,
    });
    if (error) {
      console.log(error);
      alert(error.message);
    }

    if (data) {
      console.log("Signup successful:", data);
      router.push(`/sign-in${redirectTo !== "/" ? `?redirect=${redirectTo}`: ""}`);
      // alert("sign up successfull")
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
        <div className="flex items-center justify-start gap-3">
          {/* <input
            type="text"
            name="userRoll"
            defaultValue={userRoll}
            className=""
          /> */}
          <div
            onClick={() => setUserRoll("seeker")}
            className={`px-4 py-2 ${userRoll === "seeker" ? "bg-blue-600 border-blue-600" : "border-blue-400 text-white"} border-2 text-white rounded-xl cursor-pointer`}
          >
            Seeker
          </div>
          <div
            onClick={() => setUserRoll("recruiter")}
            className={`px-4 py-2 ${userRoll === "recruiter" ? "bg-blue-600 border-blue-600" : "border-blue-400 text-white"} border-2 text-white rounded-xl cursor-pointer`}
          >
            Recrutiter
          </div>
        </div>
        {/* Name Field */}
        <TextField className="w-full">
          <Label
            className="mb-1.5 block text-xs font-medium"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Sora',sans-serif",
            }}
          >
            Full Name
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
              <UserIcon
                className="size-4"
                style={{
                  color: errors.email ? "#ef4444" : "rgba(255,255,255,0.35)",
                }}
              />
            </InputGroup.Prefix>

            <InputGroup.Input
              name="name"
              type="text"
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

        {/* Email Field*/}
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
                  color: errors.email ? "#ef4444" : "rgba(255,255,255,0.35)",
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

        {/* Password field */}
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
                  color: errors.password ? "#ef4444" : "rgba(255,255,255,0.35)",
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
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: showPassword ? "#a78bfa" : "rgba(255,255,255,0.35)",
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
                <span className="text-xs text-white/60">Password Strength</span>

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
                <li className={password.length >= 8 ? "text-green-400" : ""}>
                  ✓ Minimum 8 characters
                </li>

                <li className={/[A-Z]/.test(password) ? "text-green-400" : ""}>
                  ✓ Uppercase letter
                </li>

                <li className={/[0-9]/.test(password) ? "text-green-400" : ""}>
                  ✓ Number
                </li>

                <li
                  className={
                    /[^A-Za-z0-9]/.test(password) ? "text-green-400" : ""
                  }
                >
                  ✓ Special character
                </li>
              </ul>
            </div>
          )}

          {errors.password && (
            <p className="mt-2 text-xs text-red-500">{errors.password}</p>
          )}
        </TextField>

        <Button
          type="submit"
          className="w-full mt-5 py-3 text-sm font-semibold text-white rounded-xl transition-opacity hover:opacity-90 active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
            boxShadow: "0 8px 24px rgba(124,58,237,0.30)",
            fontFamily: "'Sora',sans-serif",
            height: "44px",
            border: "none",
          }}
        >
          Sign Up Now
        </Button>
      </form>
      {/* Divider */}
      <div className="flex items-center gap-3 mt-5">
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <span
          className="text-xs"
          style={{
            color: "rgba(255,255,255,0.25)",
            fontFamily: "'Sora',sans-serif",
          }}
        >
          or continue with
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
      </div>

      {/* OAuth */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90 active:scale-[0.98]"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.10)",
          color: "rgba(255,255,255,0.75)",
          fontFamily: "'Sora',sans-serif",
          height: "44px",
          cursor: "pointer",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

        {/* Sign Up Link */}
          <p
            className="text-center mt-6 text-xs"
            style={{
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'Sora',sans-serif",
            }}
          >
            I have an account?{" "}
            <Link
              href={`/sign-in${redirectTo !== "/" ? `?redirect=${redirectTo}`: ""}`}
              style={{ color: "#a78bfa", textDecoration: "none" }}
            >
              login
            </Link>
          </p>
    </section>
  );
}
