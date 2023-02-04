import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/Error";
import Container from "./components/Container";
import LoginPage from "./components/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Container />,
        errorElement: <Error />,
        children: [

        ],
    },

    {
        path: "/login",
        element: <LoginPage />,
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
