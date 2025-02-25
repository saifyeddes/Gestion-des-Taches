import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5001"); // Assurez-vous que l'URL correspond à votre serveur

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");

    // Récupérer toutes les tâches
    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/tasks');
            setTasks(res.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches:', error);
        }
    };

    useEffect(() => {
        fetchTasks();

        // Écouter les événements WebSocket
        socket.on('task:added', (newTask) => {
            setTasks((prevTasks) => [...prevTasks, newTask]);
        });

        socket.on('task:updated', (updatedTask) => {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === updatedTask._id ? updatedTask : task
                )
            );
        });

        socket.on('task:deleted', (taskId) => {
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        });

        return () => {
            socket.off('task:added');
            socket.off('task:updated');
            socket.off('task:deleted');
        };
    }, []);

    // Ajouter une nouvelle tâche
    const addTask = async () => {
        if (taskTitle) {
            try {
                const res = await axios.post('http://localhost:5001/api/tasks', { title: taskTitle });
                setTaskTitle(""); // Réinitialiser le champ de titre
            } catch (error) {
                console.error('Erreur lors de l\'ajout de la tâche:', error);
            }
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Nouvelle tâche</h2>
            <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Titre de la tâche"
            />
            <button onClick={addTask}>Ajouter tâche</button>

            <h2>Tâches</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title} - {task.status}
                        {/* Ajoutez des boutons pour mettre à jour et supprimer ici */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
