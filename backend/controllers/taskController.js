// Récupérer toutes les tâches
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Ajouter une nouvelle tâche
exports.addTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);

    // Émettre un événement WebSocket après avoir ajouté la tâche
    io.emit('task:added', newTask);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Mettre à jour une tâche
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);

    // Émettre un événement WebSocket après avoir mis à jour la tâche
    io.emit('task:updated', updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Tâche supprimée" });

    // Émettre un événement WebSocket après avoir supprimé la tâche
    io.emit('task:deleted', id);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
