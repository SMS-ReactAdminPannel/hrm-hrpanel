"use client"

import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      // Call API here if available
      setMessage("Password reset email sent. Please check your inbox.")
    } catch (err) {
      setError("Failed to send reset email.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center bg-[url('/loginbg.jpg')] bg-cover bg-center  justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#006666]">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-[#006666] hover:bg-[#004d4d] disabled:bg-[#99cccc] text-white py-2 rounded-md hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Remember your password?{" "}
          <Link to="/login" className="text-[#006666]  hover:text-[#004d4d]">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword