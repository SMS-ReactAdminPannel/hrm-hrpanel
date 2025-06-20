
import { useForm } from "react-hook-form";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { postSignup } from "../../features/auth/service";

type SignupData = {
  email: string;
  password: string;
};

const SignupPage = () => {
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [confirmPassword, setConfirmPassword] = useState("")
   const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
   const { signup } = useAuth()
   const { register, handleSubmit } = useForm<SignupData>();


const onSubmit = async(data: SignupData) => {
    console.log("Signup Data:", data);
    if (!data.email && !data.password) {
      setError("Fill all required fields")
      return
    }

    try {
      setIsLoading(true)
      const response = await postSignup({email: data.email, password: data.password})
      console.log(response, 'sign up response')
      signup(data.email,  data.password)
      navigate("/")
    } catch (err) {
      setError("Signup failed. Try again.")
    } finally {
      setIsLoading(false)
    }


  };
  

  // const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   setError(null)

  //   if (password !== confirmPassword) {
  //     setError("Passwords do not match")
  //     return
  //   }

  //   setIsLoading(true)
  //   try {
  //     await signup?.(email, password)
  //     navigate("/login")
  //   } catch (err) {
  //     setError("Signup failed. Try again.")
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div className="flex min-h-screen items-center bg-[url('/loginbg.jpg')] bg-cover bg-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#006666]">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-md"
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
             {...register("password")}
            className="w-full px-4 py-2 border rounded-md"
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Confirm Password"
             {...register("password")}
            className="w-full px-4 py-2 border rounded-md"
            required
            disabled={isLoading}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#006666] hover:bg-[#004d4d] disabled:bg-[#99cccc] text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#006666]  hover:text-[#004d4d]">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage

// function signup(email: string, password: string) {
//   throw new Error("Function not implemented.")
// }
