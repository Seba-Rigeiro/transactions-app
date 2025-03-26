import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTransactions } from "@/hooks/use-transactions";

export const TransactionList = () => {
  const [inputValues, setInputValues] = useState({
    from: "",
    to: "",
    sourceAccountId: "",
  });

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    sourceAccountId: undefined as number | undefined,
  });

  const { transactions, isLoading, error } = useTransactions(filters);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setFilters({
      from: inputValues.from,
      to: inputValues.to,
      sourceAccountId: inputValues.sourceAccountId
        ? Number(inputValues.sourceAccountId)
        : undefined,
    });
  };

  const clearFilters = () => {
    setInputValues({ from: "", to: "", sourceAccountId: "" });
    setFilters({ from: "", to: "", sourceAccountId: undefined });
  };

  if (isLoading) return <p>Loading...</p>;

  if (error || !transactions) return <p>Ha ocurrido un error...</p>;

  return (
    <Accordion style={{ minHeight: "70px" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Transacciones Realizadas</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box mb={2} display="flex" gap={1} alignItems="center">
          <Box display="flex" gap={1} flexGrow={1}>
            <TextField
              label="Desde"
              type="date"
              name="from"
              value={inputValues.from}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Hasta"
              type="date"
              name="to"
              value={inputValues.to}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Cuenta Origen"
              type="number"
              name="sourceAccountId"
              value={inputValues.sourceAccountId}
              onChange={handleInputChange}
            />
          </Box>

          <Box display="flex" gap={1} ml="auto">
            <Button variant="contained" color="primary" onClick={applyFilters}>
              Filtrar
            </Button>
            <Button variant="outlined" onClick={clearFilters}>
              Limpiar
            </Button>
          </Box>
        </Box>

        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <Card key={transaction.id} style={{ marginBottom: "10px" }}>
              <CardContent>
                <Typography>
                  Cuenta origen: {transaction.accountFrom.id}
                  {" " + transaction.accountFrom.currency}
                </Typography>
                <Typography>
                  Cuenta destino: {transaction.accountTo.id}
                  {" " + transaction.accountTo.currency}
                </Typography>
                <Typography>Monto: ${transaction.amount}</Typography>
                <Typography>Descripción: {transaction.description}</Typography>
                <Typography>
                  Fecha: {new Date(transaction.date).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No hay transacciones</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
