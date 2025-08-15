import Task from "../models/task.model.js";

// Método que crea una tarea a la base de datos
export async function createTask(request, response) {
    try {
        const {title, description, status} = request.body
        const task = await Task.create({
        title: title,
        description: description,
        status: status,
        priority: 1,
        dueDate: new Date()
    })
    response.status(200).json({message: "Tarea Creada"})
    }
    catch(error){
        console.error(error); // muestra el error completo
        response.status(500).json({ message: error.message, details: error });
    }
}

// Método Listar todas las tareas (paginación y filtro por estado)
export async function taskList(request, response) {
    try{
        const { status, page = 1, limit = 10 } = request.query;

        const where = {};
        if (status) {
            where.status = status;
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const { count, rows } = await Task.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset,
            order: [["createdAt", "DESC"]]
        });

        // Enviar total en el header
        response.setHeader('X-Total-Count', count);

        // Enviar solo las tareas como array
        response.status(200).json(rows);
    }
    catch{
        console.error(error); // muestra el error completo
        response.status(500).json({message: error.message, details: error});
    }
}

// Método obtener una tarea por ID
export async function taskId(request, response) {

    try{
        const { id } = request.params
        
        const task = await Task.findByPk(id)

        if(!task){
            return response.status(404).json({ message: "Tarea no encontrada" })
        }

        response.status(200).json(task) 
    }
    catch(error){
        console.error(error); // muestra el error completo
        response.status(500).json({message: error.message, details: error});
    }
}

// Método actualizar datos de una tarea por ID
export async function updateTask(request, response) {
    try{
        const { id } = request.params
        const { title, description, status } = request.body

        const [task] = await Task.update({
            title,
            description,
            status,
            priority: 1,
            dueDate: new Date()
        },
        {
            where: { id: id }
        }
    )
        if(task){
            const taskUpdate = await Task.findByPk(id)
            response.status(200).json({ message: "Datos de la Tarea Actualizados", task: taskUpdate })
        }else{
            response.status(404).json({ message: "No se encontró la tarea" })
        }
    }
    catch(error){
        console.error(error); // muestra el error completo
        response.status(500).json({ message: error.message, details: error });
    }
}

// Método elimitar tarea
export async function deleteTask(request, response) {
    try {
        const { id } = request.params

        const task = await Task.findByPk(id)
        if(task){
            await Task.destroy({
            where: { id: id }
            })
            return response.status(200).json({ message: "¡Tarea Eliminada!" })
        }else{
            response.status(404).json({ message: "No se encontró la tarea" })
        }
        
    } catch (error) {
        console.error(error); // muestra el error completo
        response.status(500).json({message: error.message, details: error})
    }
}