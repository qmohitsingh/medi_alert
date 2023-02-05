import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/Error";
import Container from "./components/Container";
import LoginPage from "./components/LoginPage";
import Homepage from "./components/Homepage";
import SignUpPage from "./components/SignupPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Container />,
        errorElement: <Error />,
        children: [
            { path: "", element: <Homepage /> },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
        errorElement: <Error />,
    },
    {
        path: "/forgotpassword",
        element: <ForgotPasswordPage />,
        errorElement: <Error />,
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;