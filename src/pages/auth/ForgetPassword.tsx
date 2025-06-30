"use client"

import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { forgotPassword } from "../../features/auth/service"
import { toast } from "react-toastify"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  
const handleForgotPassword = async (email: any) => {
  console.log("email:", email);

  try {
    await toast.promise(
      forgotPassword(email),
      {
        pending: "Sending reset instructions...",
        success: {
          render({ data }: any) {
            const response = data?.data;
            const datas = JSON.stringify(response);
            localStorage.setItem("newUser", datas);

           
            setTimeout(() => {
              navigate("/reset-password", {
                state: { toastMessage: "Enter your new password" },
              });
            }, 2000); 

            return "Reset link sent successfully";
          },
        },
        error: {
          render({ data }: any) {
            return data?.response?.data?.message || "Failed to send reset email";
          },
        },
      },
      {
        autoClose: 2000,
        style: {
          background: "white", // Teal background
          color: "#065f46",      // Dark green text
        },
      }
    );

    return true;
  } catch (error) {
    console.error("Forgot password failed", error);
    return false;
  }
};


  // const handleForgotPasswords = async (email: any) => {
  //   try{
  //     const response = await forgotPassword(email)
  //     if(response){
  //         console.log("success")
  //     }
  //   }catch(error){
  //     console.log(error)
  //   }
  // }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setIsLoading(true)

    const success = await  handleForgotPassword(email)
    
    if (success) {
      setMessage("Password reset email sent. Please check your inbox.")
      // Optionally redirect to a confirmation screen after a delay:
      setTimeout(() => navigate("/reset-password"), 2000)
    } else {
      setError("Failed to send reset email. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center bg-[url('/loginbg.jpg')] bg-cover bg-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#006666]">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-[#006666] hover:border-[#006666]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-[#006666] hover:bg-[#004d4d] disabled:bg-[#99cccc] text-white py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Remember your password?{" "}
          <Link to="/login" className="text-[#006666] hover:text-[#004d4d]">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
