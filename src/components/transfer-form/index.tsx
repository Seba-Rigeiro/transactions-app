import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Button,
  Alert,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTransfer } from "@/hooks/use-transfer";
import { Transfer } from "@/models/transfer";

export const TransferForm = () => {
  const { register, handleSubmit, reset } = useForm<Transfer>();
  const { transfer, loading, error } = useTransfer();

  const onSubmit = async (data: Transfer) => {
    const transferPayload = {
      ...data,
      date: new Date(),
    };

    const result = await transfer(transferPayload);
    if (result) {
      reset();
      alert("Transacción realizada con éxito");
    }
  };

  return (
    <Accordion style={{ minHeight: "70px" }} defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Nueva Transacción</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2} mb={2}>
            <TextField
              label="Cuenta Origen"
              {...register("accountFrom")}
              fullWidth
            />
            <TextField
              label="Cuenta Destino"
              {...register("accountTo")}
              fullWidth
            />
            <TextField
              label="Monto"
              placeholder="Monto"
              type="number"
              {...register("amount")}
              fullWidth
              inputProps={{ step: "0.01" }}
            />
            <TextField
              label="Descripción"
              {...register("description")}
              fullWidth
            />
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};
