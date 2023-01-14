
import { Link as RouterLink } from "react-router-dom"
import { Google, Margin } from "@mui/icons-material"
import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { AuthLayout } from "../AuthLayout"
import { useForm } from "../../../../hooks/useForm"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPassword } from "../../../../store/auth/thunks"


const formData = {
  email: "fernando@google.com",
  passowrd: 123456,
  displayName: "Fernando Herrera",
}

const formValidations = {
  email: [ (value) => value.includes("@"), "el correo debe de tener una @" ],
  passowrd: [ (value) => value.length >= 6 , "el password debe de tener mas de 6 letras" ],
  displayName: [ (value) => value.length >= 1 , "el nombre es obligatorio" ],
}



export const RegisterPage = () => {
  
  const dispatch = useDispatch()
  const [formSubmitted, setformSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth )
  const isChekingAuthentication = useMemo(() => status === "checking", [status])

  const { displayName, email, password, onInputChange, isFormValid, displayNameValid, emailValid, passwordValid, } = useForm(formData, formValidations)

  const onSubmit = (event) => {
    event.preventDefault()
    
    if( !isFormValid ) {
      return;
    }

    dispatch( startCreatingUserWithEmailPassword(formState))

  }

  return (
     <AuthLayout titulo="Login">
      <h1>formValid { isFormValid ? "valido": "incorrecto "}</h1>

        <form onSubmit={onSubmit}  
        className="animate__animated animate__fadeIn animate__faster"
>
          <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
              label="Nombre completo" 
              type="text"    
              placeholder="jhon dow"
              fullWidth
              name="displayName"
              value= { displayName }
              onChange={ onInputChange }
              error= { !!displayNameValid && formSubmitted}
              helperText= { displayNameValid }
              />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
              label="Correo" 
              type="email"    
              placeholder="Nombre completo"
              fullWidth
              name="email"
              value= { email }
              onChange={ onInputChange }
              error= { !!emailValid && formSubmitted }
              helperText= { emailValid } 
              />
              </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
              label="Contraseña" 
              type="password"    
              placeholder="contraseña"
              fullWidth
              name="passowrd"
              value= { passowrd }
              onChange={ onInputChange }
              error= { !!passwordValid && formSubmitted}
              helperText= { passwordValid }  
              />
              </Grid> 

              <Grid container spacing={ 2 } sx={ { mb: 2, mt: 1 } }>
                
              <Grid 
              item xs={ 12 } 
              sm={12}
              display= { !!errorMessage ? "" : "none" }>
                  <Alert severity="error">
                  { errorMessage }
                  </Alert>
                </Grid>
                
                <Grid item xs={ 12 } sm={12}>
                  <Button 
                  disabled={isChekingAuthentication}
                  type="submit"
                  variant="contained" 
                  fullWidth>
                    Crear cuenta
                  </Button>
                </Grid>
              
              </Grid>  
          
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={ RouterLink } color="inherit" to="/auth/login">
            ingresar
            </Link>
            
          </Grid>

          </Grid>
        
        </form>

     </AuthLayout>

     
      
      
)}

