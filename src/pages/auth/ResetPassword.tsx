"use client"

import { useState, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const ResetPassword = () => {
  const { token } = useParams()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

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

    try {
      // Replace with API call using `token`
      setMessage("Password reset successful.")
      setTimeout(() => navigate("/login"), 2000)
    } catch {
      setError("Failed to reset password.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundImage: `url('/loginbg.jpg')` }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-[#006666] font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
         <input
            type="password"
            placeholder="New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-[#006666] hover:border-[#006666]"
            required
          />

         <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-[#006666] hover:border-[#006666]"
            required
          />
  
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-[#006666] hover:bg-[#004d4d] text-white py-2 rounded-md hover:bg-green-700"
            disabled={isLoading}
          >
            <Link to="/login">
            {isLoading ? "Resetting..." : "Reset Password"}
              </Link>
          </button>
        </form>
        <div className="text-center text-sm mt-4">
          Go Back?{" "}
          <Link to="/login" className="text-[#006666]  hover:text-[#004d4d]">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword