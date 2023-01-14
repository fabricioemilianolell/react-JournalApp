import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import Provider, { useDispatch } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { LoginPage } from "../../../src/auth/pages/layout/routes/LoginPage"
import authSlice from "../../../src/store/auth/authSlice"
import { startGoogleSignIn } from "../../../src/store/auth/thunks"


const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  mockStartLoginWithEmailPassword: ({email,password}) => {
    return () => mockStartLoginWithEmailPassword({email,password})
  }

}))

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => {
    return (fn) => fn()
  } 
  
}))


const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
  
})


describe('Pruebas en el <LoginPage />', () => {

  beforeEach(() => jest.clearAllMocks() )

   test('Debe de mostrar el componente correctamente', () => {

      render(
        <Provider store={ store }>
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </Provider>
      )
        // screen.debug()
        expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1)
    });

    test('boton de google debe de llamar startGoogleSignIn', () => {

      render(
        <Provider store={ store }>
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </Provider>
      )
      
         const googleBtn = screen.getByLabelText("google-btn");
         fireEvent.click(googleBtn)
         expect(mockStartGoogleSignIn).toHaveBeenNthCalledWith()
     
      });

      test('submit debe de llamar startLoginWithEmailPassword', () => {

        const email = "hola@google.com"
        const password = "1234"
        
        render(
          <Provider store={ store }>
            <MemoryRouter>
              <LoginPage />
            </MemoryRouter>
          </Provider>
        )

        const emailField = screen.getByRole("textbox", {name: "Correo"})
        fireEvent.change( emailField, { target: { name: "email", value: email}})
       
        const passwordFiled = screen.getByTestId("password", { name: "contraseña"})
        fireEvent.change( passwordFiled, { target: { name: "passowrd", value: password}})
        
        const loginForm = screen.getByLabelText("submit-form")
        fireEvent.submit(loginForm)

        expect(mockStartLoginWithEmailPassword).toHaveBeenNthCalledWith({
          email: email,
          password: password
        })

      });
      
 });