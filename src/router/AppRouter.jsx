
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRotes } from "../auth/pages/layout/routes/AuthRotes"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { JournalRoutes } from "../journal/pages/routes/JournalRoutes"
import { CheckingAuth } from "../ui/components/CheckingAuth"

export const AppRouter = () => {
  
  const { status } = useCheckAuth();
  


  if (status === "checking") {
    return <CheckingAuth />
  }

  return (
    
    <Routes>

      {
        (status === "authenticated")
        ? <Route path="/*" element={<JournalRoutes /> } />
        : <Route path="auth/*" element={<AuthRotes />} />
      }

      <Route path="/*" element={ <Navigate to="/auth/login" /> } />
        {/* Login y registro */}
        {/* <Route path="auth/*" element={<AuthRotes />}/> */}
         
         {/* Journal App */}
        {/* <Route path="/*" element={<JournalRoutes /> } /> */}
    
    </Routes>
  )
}
