"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/hooks/use-toast"

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDOB] = useState('');
  const [isDateFocused, setIsDateFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();  

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        username,
        dob,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast({
        title: "Success!",
        description: "Registration successful. Please Login",
        variant: "default",
      });
      router.push('/login');
    } else {
      toast({
        title: "Error!",
        description: data.message || "Registration failed. Please try again.",
        variant: "destructive",  
      });
    }
  };

  return (
    <div className="h-screen w-screen sm:p-20">
      <div className="flex justify-center">
        <div className="flex flex-col sm:border-[1px] px-5 py-20 dark:border-[#575e5a] border-[#CECECE] rounded-lg sm:p-10 sm:w-1/2 w-auto">
          <form onSubmit={handleRegister}>
            <h1 className="text-center font-sans font-bold text-3xl sm:px-12 mb-4 text-[#fb820b]">
              Welcome to <span className="text-[#6d7a73]">BEP!</span>
            </h1>
            <div className="mb-4 dark:text-[#999999] text-[#2D2D2D] text-sm">
              <Input type="name" id="fullName" placeholder="Full name" value={fullName} 
                onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="mb-4 dark:text-[#999999] text-[#2D2D2D] text-sm">
              <Input type="username" id="username" placeholder="Username" value={username} 
                onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-4 dark:text-[#999999] text-[#2D2D2D] text-sm">
              <Input placeholder={isDateFocused ? '' : 'Date of birth'} type={isDateFocused ? 'date' : 'text'}
                id="dob" value={dob} onChange={(e) => setDOB(e.target.value)}
                onFocus={() => setIsDateFocused(true)} onBlur={() => !dob && setIsDateFocused(false)}
              />
            </div>
            <div className="mb-4 dark:text-[#999999] text-[#2D2D2D] text-sm">
              <Input type="email" id="email" placeholder="Your email" value={email} 
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-4 relative dark:text-[#999999] text-[#2D2D2D] text-sm">
              <Input type={showPassword ? 'text' : 'password'} id="password" placeholder="Password" 
                value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <Button type="submit" className="w-full text-sm text-white py-2 px-4 rounded-lg">
                Sign up
              </Button>
            </div>
            <h2 className="mt-4 text-[#606060] text-center text-sm">Already have an account? 
              <Link href="/signin" className="text-[#0054A1]">
                Log in.
              </Link> </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
