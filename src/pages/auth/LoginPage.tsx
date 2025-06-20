import { useState, type FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom"
import { EyeSlashIcon } from "@heroicons/react/24/outline"
import { EyeIcon } from "lucide-react"
import { useAuth } from "./AuthContext"
import { postLogin } from "../../features/auth/service"



  const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login } = useAuth()
  

  type LoginData = {
	email: string;
	password: string;
};

//  const onSubmit = async (data: LoginData) => {
//   try {
//     const User: any = await postLogin(data);
//     await login(data.email, data.password);
//     console.log(User);

//     navigate("/dashboard");
//   } catch (error) {
//     console.log("error", error);
//   }
// };

    const onSubmit = async (data: LoginData) => {
      try {
        const User: any = await postLogin(data);
        console.log(User)

        if (!User) {
          console.log("Login failed: No user data received.");
          return;
        }

        await login(data.email, data.password); // assuming this sets auth state
        console.log("User:", User);
        navigate("/");

      } catch (error) {
        console.log("ERRROR OUTPUT", error);
      }
    };




  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!email || !password) {
      setError("Please enter both email and password.")
      setIsLoading(false)
      return
    }

    try {
      const User: any = await postLogin({ email, password })
      console.log("Backend response:", User)
      if (User && (User.success === true || User.status === 200 || !User.success === undefined)) {
        await login(email, password)
        console.log("Login successful:", User)
        navigate("/")
      } else {
        const errorMessage = User?.message || "Invalid credentials. Please check your email and password."
        setError(errorMessage)
      }
    } catch (err: any) {
      console.log("Login error:", err)
      
  
      if (err.message?.includes("EmailId is not valid") || err.message?.includes("not registered")) {
        setError("This email is not registered. Please sign up first.")
      } else if (err.message?.includes("Password is incorrect")) {
        setError("Incorrect password. Please try again.")
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Login failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen ">
      {/* Left side: Video or iframe */}
      <div className="w-1/2 hidden lg:flex items-center justify-center bg-black">
        <iframe
          src="https://assets.pinterest.com/ext/embed.html?id=3307399717921345"
          height="445"
          width="345"
          frameBorder="0"
          scrolling="no"
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>

      {/* Right side: Login form */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/loginbg.jpg')` }}
      >
        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#006666]">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Email"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </span>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#006666] hover:bg-[#004d4d] disabled:bg-[#99cccc] disabled:cursor-not-allowed text-white py-2 rounded-md transition flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-700 mt-4">
            Forgot password?{" "}
            <Link to="/forgot-password" className="text-[#006666] hover:text-[#004d4d]">
              Reset here
            </Link>
          </p>

          <p className="text-center text-sm text-gray-700 mt-2">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[#006666] hover:text-[#004d4d]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default LoginPage;