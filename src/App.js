import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoute from "./route/appRoutes";
import logo from "./img/61020.jpg";
function App() {
    return (
        <>
            <head>
                <title>Movie Review</title>
                <link rel="icon" type="image/jpg" href={logo}/>
            </head>
            <AppRoute />
        </>
    );
}

export default App;
