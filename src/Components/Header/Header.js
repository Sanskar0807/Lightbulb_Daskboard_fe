import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { Pathname } from "../../Pathname";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

export default function Header() {
    const navigate = useNavigate()
    const handleLogout=()=>{
        // localStorage.getItem("t_id","");
        // navigate(Pathname.LOGIN)

    }
return (
	<AppBar position="static" style={{ background: '#282828' }}>
		<Toolbar>
		{/*Inside the IconButton, we
		can render various icons*/}
		<IconButton
			size="large"
			edge="start"
			color="inherit"
			aria-label="menu"
			sx={{ mr: 2 }}
		>
			{/*This is a simple Menu
			Icon wrapped in Icon */}
		</IconButton>
		{/* The Typography component applies
		default font weights and sizes */}

		<Typography variant="h6"
			component="div" sx={{ flexGrow: 1 }}>
			Lightbulb
		</Typography>
		<Button color="inherit" onClick={handleLogout}> 
		<ProfileDropdown/>
		</Button>
		</Toolbar>
	</AppBar>
);
}
