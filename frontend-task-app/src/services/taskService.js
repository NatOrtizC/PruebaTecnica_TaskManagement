import axios from "axios";

const API_URL = "http://localhost:3000/tasks"; //URL de mi backend

// Obtener las tareas con filtros opcionales
export const getTasks = async (status = "", page = 1, limit = 10) => {
    try{
        const params = {};
        if (status) params.status = status;
        if (page) params._page = page;
        if (limit) params._limit = limit;

        const response = await axios.get( API_URL, { params } );

        // Para paginación real necesitamos el total de tareas el backend envía 'X-Total-Count' en headers
        const total = response.headers['x-total-count']
        ? parseInt(response.headers['x-total-count'], 10)
        : response.data.length;

        return {
        data: response.data,
        total
        };
    } catch(error){
        console.error(" Error obteniendo tareas: ", error);
        throw error;
    }
};

// Obtener una tarea por ID
export const getTaskById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(" Error obteniendo tarea por ID: ", error)
        throw error;
    }
}

// Crear nueva tarea
export const createTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task);
        return response.data;
    } catch (error) {
        console.error( " Error creando tarea: ", error );
        throw error;
    }
};

// actualizar una tarea existente
export const updateTask = async (id, task) => {
    if (!id) throw new Error("ID de tarea no definido");
    try {
        const response = await axios.put(`${API_URL}/${id}`, task);
        return response.data;
    } catch (error) {
        console.error( " Error actualizando tarea: ", error );
        throw error;
    }
};

// Eliminar una tarea
export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error( " Error eliminando tarea: ", error );
        throw error;
    }
};

