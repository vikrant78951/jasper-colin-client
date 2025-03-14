"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "@redux/authSlice/authSlice"; 
import Link from 'next/link'
import {API} from '@lib/data'
import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    retypePassword: z
      .string()
      .min(8, { message: "Retype password is required" }),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords do not match",
    path: ["retypePassword"],
  });

export default function RegisterForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      retypePassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(API.register, values, {
        withCredentials: true,
      });

      const {  user } = response.data;
      dispatch(setUser(user));
      toast.success("Registration successful!");
      router.push('/')

      form.reset();
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <div className="shadow-md p-6 rounded w-sm">
        <h1 className="text-xl font-semibold mb-4">Register</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Retype Password */}
          <FormField
            control={form.control}
            name="retypePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retype Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
        <p className="mt-4 text-sm">
         Already have an account? 
          <Link className="text-blue-600 hover:underlink" href="/auth/register">
            Login here.
          </Link>
        </p>
      </div>
    </Form>
  );
}
