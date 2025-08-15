import { useEffect, useState } from "react";
import { getTasks, getTaskById, deleteTask } from "../services/taskService";
import TaskList from "../components/taskList";
import TaskForm from "../components/taskForm";
import TaskFilter from "../components/taskFilter";
import { Pagination, Box, Typography, Paper } from "@mui/material";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [page, setPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(10);
  const [totalTasks, setTotalTasks] = useState(0);
  const [filterStatus, setFilterStatus] = useState("");

  const statusColor = {
    pendiente: "gray",
    en_progreso: "orange",
    completada: "green"
  };

  useEffect(() => {
    loadTasks(filterStatus, page);
  }, []);

  const loadTasks = async (status = "", pageNumber = page) => {
    const { data, total } = await getTasks(status, pageNumber, tasksPerPage);
    setTasks(data);
    setTotalTasks(total);
  };

  const handleFilter = async (status) => {
    setFilterStatus(status);
    setPage(1);
    await loadTasks(status, 1);
  };

  const handleEdit = async (task) => {
    setSelectedTask(task);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    await loadTasks(filterStatus, page);
  };

  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const startTask = (page - 1) * tasksPerPage + 1;
  const endTask = Math.min(page * tasksPerPage, totalTasks);

  return (
    <Box sx={{ maxWidth: 700, margin: "auto", padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Mis Tareas
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 2, width: "100%" }}>
        <TaskFilter onFilter={handleFilter} />
      </Paper>

      <Paper sx={{ padding: 2, marginBottom: 2, width: "100%" }}>
        <TaskForm task={selectedTask} reloadTasks={() => loadTasks(filterStatus, page)} />
      </Paper>

      {totalTasks > tasksPerPage && (
        <Typography variant="body2" sx={{ mb: 1, textAlign: "center" }}>
        Mostrando {startTask}–{endTask} de {totalTasks} tareas
        </Typography>
        )}

      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        statusColor={statusColor}
      />

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={async (e, value) => {
              setPage(value);
              await loadTasks(filterStatus, value);
            }}
          />
        </Box>
      )}
    </Box>
  );
}