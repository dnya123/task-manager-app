
const getHome = (req, res) => {
  res.json({ message: "Welcome to API 🚀" });
};

const getTasks = (req, res) => {
  const tasks = [
    { id: 1, title: "Learn React" },
    { id: 2, title: "Build Project" },
  ];

  res.json(tasks);
};

module.exports = { getHome, getTasks };