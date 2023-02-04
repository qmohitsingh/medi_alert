import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    return (
        <div>
            <p>Something went wrong</p>
        </div>
    );
}


export default Error;