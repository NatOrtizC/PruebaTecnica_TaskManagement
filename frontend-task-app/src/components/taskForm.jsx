import { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/taskService";
import { TextField, Button, MenuItem, Box } from "@mui/material";

export default function TaskForm({ task, reloadTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendiente");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "pendiente");
    } else {
      setTitle("");
      setDescription("");
      setStatus("pendiente");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (task && task.id) {
        console.log("Actualizando tarea:", task.id, { title, description, status });
        await updateTask(task.id, { title, description, status });
      } else {
        console.log("Creando tarea:", { title, description, status });
        await createTask({ title, description, status });
      }
      reloadTasks();
      // Limpiar formulario
      setTitle("");
      setDescription("");
      setStatus("pendiente");
    } catch (error) {
      console.error("Error al guardar la tarea:", error.response?.data || error);
      alert("Error al guardar la tarea. Revisa la consola.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}
    >
      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <TextField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
      />

      <TextField
        select
        label="Estado"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ width: "200px" }}
      >
        <MenuItem value="pendiente">Pendiente</MenuItem>
        <MenuItem value="en_progreso">En Progreso</MenuItem>
        <MenuItem value="completada">Completada</MenuItem>
      </TextField>

      <Button type="submit" variant="contained" color="primary">
        {task ? "Actualizar" : "Crear"}
      </Button>
    </Box>
  );
}