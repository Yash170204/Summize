import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://summize-ten.vercel.app/"
})