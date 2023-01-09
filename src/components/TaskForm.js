import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, editTask } from "../features/tasks/tasksSlice";
import { v4 as uuid } from "uuid";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    code:"",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(editTask({ ...task, id: params.id }));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }

    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params, tasks]);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">

      {/* prueba */}
      <label className="block text-sm font-bold">Codigo Cups:</label>
      <input
        type="text"
        name="code"
        onChange={handleChange}
        value={task.code}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        placeholder="Codigo del Cups"
        autoFocus
      />
      {/* fin prueba */}

      <label className="block text-sm font-bold">Cups:</label>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        placeholder="Nombre del Cups"
        autoFocus
      />

      <label>
        Descripcion del Cups:
        <textarea
          type="text"
          name="description"
          onChange={handleChange}
          value={task.description}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          placeholder="Escriba una descripción"
        />
      </label>
      <button type="submit" className="bg-indigo-600 px-2 py-1">Enviar</button>
    </form>
  );
}

export default TaskForm;
