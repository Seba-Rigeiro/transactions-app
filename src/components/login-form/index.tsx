import { User } from "@/models/user";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface LoginFormProps {
  openLogin: boolean;
  handleLoginClose: () => void;
  onLoginSubmit: (user: User) => Promise<void>;
}

export const LoginForm: FC<LoginFormProps> = ({
  openLogin,
  handleLoginClose,
  onLoginSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  return (
    <Dialog open={openLogin} onClose={handleLoginClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onLoginSubmit)}>
          <TextField
            label="Username"
            fullWidth
            margin="dense"
            {...register("username", {
              required: "El usuario es obligatorio",
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <DialogActions>
            <Button onClick={handleLoginClose}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              Ingresar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
