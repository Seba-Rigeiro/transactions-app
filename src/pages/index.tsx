import { Typography, Container, Box } from "@mui/material";
import { TransferForm } from "@/components/transfer-form";
import { TransactionList } from "@/components/transaction-list";
import { useLogin } from "@/hooks/use-login";
import { LoginForm } from "@/components/login-form";
import { Nabvar } from "@/components/navbar";

export default function Home() {
  const {
    openLogin,
    token,
    handleLoginClick,
    handleLogout,
    handleLoginClose,
    onLoginSubmit,
  } = useLogin();

  return (
    <Container>
      <Nabvar
        token={token}
        handleLoginClick={handleLoginClick}
        handleLogout={handleLogout}
      />
      <LoginForm
        openLogin={openLogin}
        handleLoginClose={handleLoginClose}
        onLoginSubmit={onLoginSubmit}
      />

      {token ? (
        <Box display="flex" flexDirection="column" gap={4} mt={4}>
          <TransferForm />
          <TransactionList />
        </Box>
      ) : (
        <Typography variant="h6" align="center" marginTop={4}>
          Debe iniciar sesión para ver y realizar transferencias.
        </Typography>
      )}
    </Container>
  );
}
