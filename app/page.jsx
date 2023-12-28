"use client";
import { useState, useContext, useEffect } from "react";
import { Context } from "@components/clients";
import TodoItem from "@components/TodoItem";
import "@styles/register.css";
import "@styles/todo.css";
import axios from "axios";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { task, setTask, auth, setIsAuth, setUser } = useContext(Context);

  const todoHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/task/new",
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response.data.success
        ? (toast.success(response.data.message),
          setRefresh(!refresh),
          setTitle(""),
          setDescription(""))
        : (toast.error(response.data.message), setRefresh(!refresh));
    } catch (error) {
      toast.error(error.message);
    }
  };
  const updateTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/task/action/${id}`
      );
      response.data.success
        ? (toast.success(response.data.message), setRefresh(!refresh))
        : (toast.error(response.data.message), setRefresh(!refresh));
    } catch (error) {
      toast.error(error.message);
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/task/action/${id}`
      );
      response.data.success
        ? (toast.success(response.data.message), setRefresh(!refresh))
        : (toast.error(response.data.message), setRefresh(!refresh));
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/task/all");
        response.data.success
          ? (setTask(response.data.userTasks), setIsAuth(true))
          : setTask([]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [refresh]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/profile"
        );
        response.data.success ? setUser(response.data.user) : setUser([]);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchProfile();
  }, [auth]);
  useEffect(() => {
    if (!auth) return redirect("/login");
  }, [auth]);

  return (
    <div className="form-container">
      <form className="form" onSubmit={todoHandler}>
        <h1>Create Task</h1>
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="buttons">
          <button className="button login">Create</button>
        </div>
      </form>

      <div className="task-wrapper">
        {task.map((e) => (
          <TodoItem
            title={e.title}
            description={e.description}
            isCompleted={e.isCompleted}
            updateHandler={updateTask}
            deleteHandler={deleteTask}
            id={e._id}
            key={e._id}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
