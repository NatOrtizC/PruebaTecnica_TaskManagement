import { Button, Table, TableBody, TableCell, TableHead, TableRow, Chip, Box } from "@mui/material";

export default function TaskList({ tasks, onEdit, onDelete, statusColor }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Tarea</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.title}</TableCell>

            {/* Estado con color */}
            <TableCell>
              <Chip
                label={task.status.replace("_", " ").toUpperCase()}
                sx={{
                  backgroundColor: statusColor[task.status],
                  color: "white",
                  fontWeight: "bold"
                }}
              />
            </TableCell>

            {/* Botones de acción */}
            <TableCell>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  onClick={() => onEdit(task)}
                  variant="outlined"
                  color="primary"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => onDelete(task.id)}
                  variant="outlined"
                  color="error"
                >
                  Eliminar
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}