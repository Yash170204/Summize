"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import signupSchema from "@/schemas/signupSchema";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/authClient";
import { toast } from 'sonner';
import { redirect } from "next/navigation";
import { FiFileText, FiLock, FiMail, FiUser, FiUserPlus } from "react-icons/fi";

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const { name, email, password } = values;
    await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/login"
    }, {
      onRequest: () => {
        setLoading(true);
        toast("Processing registration...", {
          position: "top-right",
          duration: 3000,
          icon: (
            <div className="animate-spin h-4 w-4 border-2 border-[#00EEFF] border-t-transparent rounded-full" />
          )
        });
      },
      onSuccess: () => {
        setLoading(false);
        form.reset();
        toast.success("Account created successfully! Please login.", {
          position: "top-right",
          duration: 3000
        });
        redirect('/login');
      },
      onError: (ctx) => {
        setLoading(false);
        toast.error(ctx.error.message || "Registration failed, please try again!", {
          position: "top-right",
          duration: 3000
        });
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E0E0FF] font-sans flex justify-center items-center p-4">
      <div className="absolute top-0 left-0 w-full h-16 bg-[#0D1117] border-b border-[#1C2333] shadow-[0_4px_20px_rgba(0,221,255,0.08)] flex items-center justify-center">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-[#131620] border border-[#2F3B54] rounded-md flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#00EEFF] opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
            <FiFileText className="h-4 w-4 text-[#00EEFF] relative z-10" />
          </div>
          <span className="ml-3 text-xl font-bold text-[#00EEFF] tracking-wider">
            SUMMIZE
          </span>
        </div>
      </div>

      <div className="max-w-md w-full">
        <div className="text-center mb-8 mt-20">
          <h1 className="text-3xl font-bold mb-3 tracking-tight relative inline-block">
            <span className="bg-gradient-to-r from-[#00EEFF] to-[#00A3FF] bg-clip-text text-transparent">
              Create Account
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00EEFF] to-transparent"></div>
          </h1>
          <p className="text-[#8B9AC0] text-sm">
            Join the neural document synthesis revolution
          </p>
        </div>

        <Card className="bg-[#0D1117] border border-[#1C2333] shadow-[0_8px_32px_rgba(0,221,255,0.1)] backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#00EEFF] opacity-5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <CardHeader className="relative z-10 border-b border-[#1C2333]">
            <CardTitle className="text-[#E0E0FF] flex items-center">
              <FiUserPlus className="mr-2 text-[#00EEFF]" /> Register
            </CardTitle>
            <CardDescription className="text-[#8B9AC0]">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 relative z-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#E0E0FF] flex items-center text-sm">
                        <div className="h-1 w-1 rounded-full bg-[#00EEFF] mr-2"></div>
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9AC0]" />
                          <Input 
                            type="text" 
                            placeholder="Enter your name" 
                            {...field}
                            className="bg-[#131620] border-[#1C2333] pl-10 focus:border-[#00EEFF] focus:ring focus:ring-[#00EEFF]/10 text-[#E0E0FF] placeholder:text-[#8B9AC0]/70"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[#FF5370]" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#E0E0FF] flex items-center text-sm">
                        <div className="h-1 w-1 rounded-full bg-[#00EEFF] mr-2"></div>
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9AC0]" />
                          <Input 
                            type="email" 
                            placeholder="example@email.com" 
                            {...field}
                            className="bg-[#131620] border-[#1C2333] pl-10 focus:border-[#00EEFF] focus:ring focus:ring-[#00EEFF]/10 text-[#E0E0FF] placeholder:text-[#8B9AC0]/70"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[#FF5370]" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#E0E0FF] flex items-center text-sm">
                        <div className="h-1 w-1 rounded-full bg-[#00EEFF] mr-2"></div>
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9AC0]" />
                          <Input 
                            type="password" 
                            placeholder="Minimum 6 characters" 
                            {...field}
                            className="bg-[#131620] border-[#1C2333] pl-10 focus:border-[#00EEFF] focus:ring focus:ring-[#00EEFF]/10 text-[#E0E0FF] placeholder:text-[#8B9AC0]/70"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[#FF5370]" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#E0E0FF] flex items-center text-sm">
                        <div className="h-1 w-1 rounded-full bg-[#00EEFF] mr-2"></div>
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9AC0]" />
                          <Input 
                            type="password" 
                            placeholder="Re-enter your password" 
                            {...field}
                            className="bg-[#131620] border-[#1C2333] pl-10 focus:border-[#00EEFF] focus:ring focus:ring-[#00EEFF]/10 text-[#E0E0FF] placeholder:text-[#8B9AC0]/70"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[#FF5370]" />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#131620] text-[#00EEFF] border border-[#1C2333] hover:border-[#00EEFF] hover:bg-[#00EEFF]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00EEFF]/0 via-[#00EEFF]/5 to-[#00EEFF]/0 opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-300"></div>
                    
                    {loading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-[#00EEFF] border-t-transparent rounded-full mr-2"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FiUserPlus className="mr-2" /> <span>Create Account</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="border-t border-[#1C2333] relative z-10">
            <p className="text-[#8B9AC0] text-sm">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-[#00EEFF] hover:text-[#00EEFF]/80 transition-colors"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="text-center mt-8">
          <p className="text-xs text-[#8B9AC0]/60 tracking-wider">
            NEURAL ENGINE v2.3.4 • CYBERNETIC SYNTHESIS
          </p>
        </div>
      </div>
    </div>
  );
}