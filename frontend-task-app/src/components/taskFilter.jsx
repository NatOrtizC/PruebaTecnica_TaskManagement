import { Button } from "@mui/material";

export default function TaskFilter({ onFilter }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Button onClick={() => onFilter("")} variant="outlined" sx={{ ml: 1 }}>Todas</Button>
      <Button onClick={() => onFilter("pendiente")} variant="outlined" sx={{ ml: 1 }}>Pendiente</Button>
      <Button onClick={() => onFilter("en_progreso")} variant="outlined" sx={{ ml: 1 }}>En Progreso</Button>
      <Button onClick={() => onFilter("completada")} variant="outlined" sx={{ ml: 1 }}>Completada</Button>
    </div>
  );
}