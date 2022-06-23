import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import Typography from "@mui/material/Typography";
import { InputAdornment, Tooltip, IconButton, Icon } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Yup from "yup";
import { useFormik } from "formik";
import { API_URL } from "../../globalconstant.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";



export function Login() {
  const [open, setOpen] = React.useState(false);
  const [Msg, setMsg] = React.useState("");

  const history = useHistory();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: formvalidationSchema,
      onSubmit: (oldUser) => {
        // console.log(oldUser);
        getUser(oldUser);
      },
    });
  const getUser = (oldUser) => {
    fetch(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(oldUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((x) => {
        // console.log(x);
        localStorage.setItem("user", JSON.stringify(x));
        if (x.username != null) {
          setMsg({ msg: "Login Successfully", status: "success" });
          setOpen(true);
          localStorage.setItem("token", x.token);
          localStorage.setItem("Username", x.username);
          history.push("/home");
        } else {
          setMsg({ msg: x.message, status: "error" });
          setOpen(true);
        }
      })
      .catch((err) => {
        setMsg({ msg: err.message, status: "error" });
        setOpen(true);
      });
  };
  const [text, setText] = React.useState("Show");
  const [visible, setVisible] = React.useState("password");
  const icon =
    visible === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />;
  const visibility = () => {
    setVisible((visible) => (visible === "password" ? "text" : "password"));
    setText((text) => (text === "Show" ? "Hide" : "Show"));
  };
  return (
    <div className="loginpage">
      <div className="brand">
        Enjoy the <span style={{color:'rgb(193, 234, 250)'}}>Cyber Security</span> Experience
      </div>
      <div>
        <ul className="list">
          <li >Attack Surface</li>
          <li>Breach Notification</li>
          <li>Darkweb Monitoring</li>
          <li>Brand Monitoring</li>
          <li>Email Security</li>
          <li>Mobile Security</li>
        </ul>
      </div>
      <div className="formcontainer">
        <form onSubmit={handleSubmit}>
          <div style={{display:'flex', justifyContent:"center"}}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Roboto Condensed",
              fontSize: { sm: "35px", xs: "28px" },
            }}
          >
            <img  style={{objectFit:'contain', height:"100px"}} src="data:image/png;base64,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" alt="cycatz" /> &nbsp;
            
              
            
          </Typography>
         <IconButton ><a href="https://github.com/Nishanth4696/cycatz-frontend/blob/master/README.md" target="_blank"><VisibilityIcon/></a></IconButton> 
         </div>
          
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
            id="username"
            name="username"
            required
            label="User Name"
            sx={{ margin: "10px" }}
            style={{width:'300px',gap:'20px'}}
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            error={errors.username && touched.username}
            helperText={errors.username && touched.username && errors.username}
            placeholder="Enter user name"
            fullWidth
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <Tooltip title={text}>
                    <IconButton onClick={() => visibility()}>{icon}</IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            id="password"
            name="password"
            required
            label="Password"
            placeholder="Enter your password"
            sx={{ margin: "10px" }}
            style={{width:'300px',gap:'20px'}}
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            type={visible}
            value={values.password}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
          />
          <br></br>
          <Button
            sx={{ marginRight: "20px" }}
            variant="text"
            onClick={() => history.push("/forgotpassword")}
          >
            Forgot Password?
          </Button>
          <br></br>
          <Button sx={{ margin: "4px", maxWidth:'60%' }} variant="contained" type="submit">
            Login
          </Button>
        </form>
        <Typography variant="p">Don't have an account</Typography>
        <Button variant="text" onClick={() => history.push("/signup")}>
          signup
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={Msg.status}
          sx={{ width: "100%" }}
        >
          {Msg.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

const formvalidationSchema = Yup.object({
  username: Yup.string().required("Please fill your user name"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(5, "Too short password")
    .required("Please fill the password field"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
