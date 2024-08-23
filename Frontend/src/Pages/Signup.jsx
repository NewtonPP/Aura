"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useAuthContext } from "@/context/AuthContext"

const formSchema = z.object({
  FullName: z.string().min(2, { message: "Full Name must be at least 2 characters." }),
  Email: z.string().email({ message: "Invalid email address." }),
  Password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  ConfirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters." })
}).superRefine((data, ctx) => {
  if (data.Password !== data.ConfirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match.",
      path: ["ConfirmPassword"],
    });
  }
});

export function Signup() {
  const {authUser, setAuthUser} = useAuthContext();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FullName: "",
      Email: "",
      Password: "",
      ConfirmPassword: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values) {
    axios.post("http://localhost:5000/api/auth/signup", values, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      localStorage.setItem("UserId",response.data.user._id)
      setAuthUser(localStorage.getItem("UserId"));
    })
    .catch((error) => console.log(error))
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
    <div className="w-[400px] mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="FullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input className="w-full p-2 border border-gray-300 rounded" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="w-full p-2 border border-gray-300 rounded" placeholder="someone@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="w-full p-2 border border-gray-300 rounded" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ConfirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input className="w-full p-2 border border-gray-300 rounded" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
    </div>
  )
}
