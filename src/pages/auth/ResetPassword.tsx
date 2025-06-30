"use client"

import { useState, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { resetPassword } from "../../features/auth/service"
import { toast } from "react-toastify"
import { Eye, EyeOff } from "lucide-react" // Import eye icons

const ResetPassword = () => {
  const { token } = useParams()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleResetPassword = async (newPassword: string) => {
    const user = JSON.parse(localStorage.getItem("newUser") || "{}")
    const email = user.email
    const token = user.token

    try {
      await toast.promise(
        resetPassword({ email, token, newPassword }),
        {
          pending: "Resetting your password...",
          success: {
            render({ data }: any) {
              const res = data?.data

              if (res?.status === "Success") {
                setTimeout(() => {
                  navigate("/login", {
                    state: { toastMessage: "Password reset successfully" },
                  })
                }, 2000)
              }

              return "Password reset successfully"
            },
          },
          error: {
            render({ data }: any) {
              const msg =
                data?.response?.data?.message || "Failed to reset password"
              return msg
            },
          },
        },
        {
          autoClose: 2000,
          style: {
            background: "white",
            color: "#065f46",
          },
        }
      )
    } catch (error: any) {
      console.error("Reset error:", error?.message || error)
    }
  }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setIsLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setIsLoading(false)
      return
    }

    if (password === confirmPassword) {
      await handleResetPassword(password)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundImage: `url('/loginbg.jpg')` }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-[#006666] font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-[#006666] hover:border-[#006666] pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-[#006666] hover:border-[#006666] pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
  
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-[#006666] hover:bg-[#004d4d] text-white py-2 rounded-md hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <div className="text-center text-sm mt-4">
          Go Back?{" "}
          <Link to="/login" className="text-[#006666] hover:text-[#004d4d]">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword