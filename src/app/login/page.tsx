"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "@/components/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
  
    // Client-side validation
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }
  
    if (password.length < 8) {
      setErrorMessage("Password should be at least 8 characters long.");
      return;
    }
  
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        if (data.message === "User not found") {
          setErrorMessage("User not found. Please register first.");
        } else if (data.message === "Invalid credentials") {
          setErrorMessage("Incorrect email or password.");
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
        }
      } else {
        // Success: Store token in cookie with path set to '/'
        document.cookie = `token=${data.token}; path=/;`;
        login(); // Trigger context update
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        router.push("/dashboard"); 
      }
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMessage("Login failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return null; // Avoid rendering login form if already logged in
  }

  return (
    <div className="h-screen w-screen p-20">
      <div className="flex justify-center">
        <div className="flex flex-col sm:border-[1px] dark:border-[#575e5a] border-[#CECECE] rounded-lg p-10 sm:w-1/2 w-full">
          <form onSubmit={handleLogin}>
            <h1 className="text-center whitespace-nowrap font-sans font-bold text-3xl sm:px-12 mb-4 text-green-600">
              Welcome to <span className="text-[#6d7a73]">BEP!</span>
            </h1>

            <div className="mb-4 dark:text-[#999999] text-[#2D2D2D] text-sm">
              <Input type="email" id="email" placeholder="Your email" value={email} 
                onChange={(e) => setEmail(e.target.value)} required
              />
            </div>

            <div className="mb-4 relative dark:text-[#999999] text-[#2D2D2D] text-sm">
              <Input type={showPassword ? "text" : "password"} id="password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)} required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>

            {errorMessage && (
              <p className="text-[#a93b3b] text-sm text-center mb-4">
                {errorMessage}
              </p>
            )}

            <div className="flex items-center justify-between">
              <Button type="submit"
                className="w-full text-sm text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>

            <h2 className="mt-4 text-[#606060] text-center text-sm">
              Don't have an account? Create a{" "}
              <Link href="/signup" className="text-[#0054A1]">
                new account.
              </Link>
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
