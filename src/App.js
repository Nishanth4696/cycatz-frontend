import "./App.css";
import { Login } from "./components/Authenication/Login.js";
import Typography from "@mui/material/Typography";

import { Switch, Route, Redirect } from "react-router-dom";
import { Signup } from "./components/Authenication/Signup.js";
import { Forgotpassword } from "./components/Authenication/Forgotpassword.js";
import { Resetpassword } from "./components/Authenication/Resetpassword.js";

import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { API_URL } from "./globalconstant.js";


export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/forgotpassword">
          <Forgotpassword />
        </Route>
        <Route exact path="/forgotpassword/verify/:id">
          <Changepass />
        </Route>
        <Route exact path="/resetpassword/:id">
          <Resetpassword />
        </Route>
        
      </Switch>
    </div>
  );
}

function Changepass() {
  const { id } = useParams();
  // console.log(id);
  return id ? <Updatepassword id={id} /> : "";
}
// updatpassword
function Updatepassword({ id }) {
  // const { history } = useHistory();
  // console.log(id);
  const Result = (id) => {
    fetch(`${API_URL}/users/forgotpassword/verify`, {
      method: "GET",
      headers: { "x-auth-token": id },
    })
      .then((response) => {
        const Status = response.status;
        // console.log(Status);
        return Status;
      })
      .then((Status) =>
        Status === 200
          ? window.location.replace(`/resetpassword/${id}`)
          : alert("Please enter the registered email")
      );
  };

  Result(id);

  // Loading Page
  return (
    <div
      className="loader-container"
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="success" />
      <Typography sx={{ fontFamily: "Aladin" }} variant="h6">
        Please Wait......
      </Typography>
    </div>
  );
}
