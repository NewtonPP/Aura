"use client"
import { useForm } from "react-hook-form"
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

// You can add validation schema using Zod if needed.
// const formSchema = z.object({
//   Email: z.string().email({ message: "Invalid email address." }),
//   Password: z.string().min(6, { message: "Password must be at least 6 characters." }),
// })

export function Login() {
  const {setAuthUser} = useAuthContext();
  // 1. Define your form.
  const form = useForm({
    // resolver: zodResolver(formSchema), // Uncomment if using validation schema
    defaultValues: {
      Email: "",
      Password: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values) {
    axios.post("http://localhost:5000/api/auth/login", values, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {localStorage.setItem("UserId",response.data.user._id)
    setAuthUser(response.data.user._id)})
      .catch((error) => console.log(error))
  }

  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
    <div className="w-[400px] mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <Button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
    </div>
  )
}
