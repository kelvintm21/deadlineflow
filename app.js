const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tasks = [];

app.get('/', (req, res) => {
    res.send(`
        <h1>DeadlineFlow</h1>
        <form method="POST" action="/add">
            <input name="title" placeholder="Task title" required />
            <button type="submit">Add Task</button>
        </form>
        <ul>
            ${tasks.map((t, i) => `<li>${t} <a href="/delete/${i}">Delete</a></li>`).join("")}
        </ul>
    `);
});

app.post('/add', (req, res) => {
    tasks.push(req.body.title);
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    tasks.splice(req.params.id, 1);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
