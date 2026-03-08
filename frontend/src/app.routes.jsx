import { createBrowserRouter } from "react-router"

import { Login } from "./features/auth/pages/Login"
import { Register } from "./features/auth/pages/Register"
import { ForgotPassword } from "./features/auth/pages/ForgotPassword"
import { ResetPassword } from "./features/auth/pages/ResetPassword"

import { Protected, PublicRoute } from "./features/auth/components/Protected"

import { Home } from "./features/interview/pages/Home"
import Interview from "./features/interview/pages/Interview"


export const router = createBrowserRouter([
 {
  path: "/login",
  element: (
   <PublicRoute>
    <Login />
   </PublicRoute>
  )
 },

 {
  path: "/register",
  element: (
   <PublicRoute>
    <Register />
   </PublicRoute>
  )
 },

 {
  path: "/forgot-password",
  element: (
   <PublicRoute>
    <ForgotPassword />
   </PublicRoute>
  )
 },

 {
  path: "/reset-password/:token",
  element: (
   <PublicRoute>
    <ResetPassword />
   </PublicRoute>
  )
 },

 {
  path: "/",
  element: (
   <Protected>
    <Home />
   </Protected>
  )
 },
 {
    path:'/interview/report/:interviewId',
    element:(
      <Protected>
        <Interview/>
      </Protected>
    )
 }
])