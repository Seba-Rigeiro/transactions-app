import { AppBar, Button, Toolbar } from "@mui/material";
import { FC } from "react";

interface NavbarProps {
  token: string | null;
  handleLoginClick: () => void;
  handleLogout: () => void;
}

export const Nabvar: FC<NavbarProps> = ({
  token,
  handleLoginClick,
  handleLogout,
}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {token ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLoginClick}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
