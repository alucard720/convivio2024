import React, { useState } from 'react'
import { Eye, EyeOff, UserCircle2 } from 'lucide-react'

export default function Component() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('authToken', data.token)
        window.location.href = '/dashboard'
      } else {
        setError('Invalid username or password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-br from-orange-100 to-brown-100">
      <div className="max-w-md w-full">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jpdlogo-ibGxnX9uISaA9Y9RF1G8XvGm5QASK8.jpg"
          alt="Corriente Magisterial Juan Pablo Duarte Logo"
          className="w-full mb-8 rounded-lg shadow-md"
        />

        <div className="p-8 rounded-2xl bg-white shadow-lg">
          <h2 className="text-brown-800 text-center text-2xl font-bold mb-6">Administracion</h2>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="text-brown-800 text-sm mb-2 block">
                Usuario Administrador
              </label>
              <div className="relative flex items-center">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full text-brown-800 text-sm border border-brown-300 px-4 py-3 rounded-md outline-orange-600"
                  placeholder="Introducir Nombre"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <UserCircle2 className="w-4 h-4 absolute right-4 text-brown-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-brown-800 text-sm mb-2 block">
                Contrasena
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full text-brown-800 text-sm border border-brown-300 px-4 py-3 rounded-md outline-orange-600"
                  placeholder="Entrar Contrasena"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-brown-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-brown-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-orange-600 focus:ring-orange-500 border-brown-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-brown-800">
                  Recordarme
                </label>
              </div>
              {/* <div className="text-sm">
                <a href="#" className="text-orange-600 hover:underline font-semibold">
                  Forgot your password?
                </a>
              </div> */}
            </div>

            <div className="!mt-8">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none transition duration-300"
              >
                Sign in
              </button>
            </div>
            {/* <p className="text-brown-800 text-sm !mt-8 text-center">
              {"Don't have an account? "}
              <a href="#" className="text-orange-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                Register here
              </a>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  )
}