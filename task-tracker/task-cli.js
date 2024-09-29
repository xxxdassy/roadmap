const fs = require('node:fs');
const crypto = require('node:crypto')

const color = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
}

function readFile(file) {
  if(!fs.existsSync(file)) {
    const data = JSON.stringify([], null, 2);
    fs.writeFileSync(file, data);
  }

  return JSON.parse(fs.readFileSync(file).toString());
}

function writeFile(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

const input = process.argv
const path = 'data.JSON'

// # Adding a new task

if(input[2] === 'add') {
  const file = readFile(path);

  if(!Array.isArray(file)) file = []

  const task = {
    id: crypto.randomUUID(),
    description: input[3],
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if(input[3]) {
    file.push(task);
    writeFile(file);
    console.log(`${color.green}Task added successfully (ID: ${task.id})${color.reset}`)
  } else {
    console.log(`${color.red}Description required, example: task-cli add "Buy groceries"${color.red}`);
  }
}

// # Updating and deleting tasks

if(input[2] === 'delete') {
  const file = readFile(path);
  if(input[3]) {
    const data = file.filter(task => task.id !== input[3]);
    writeFile(data);
  } else {
    console.log(`${color.red}Task id is required, example: task-cli delete "id"${color.red}`)
  }
}

if(input[2] === 'update') {
  const file = readFile(path);

  if(input[3] && input[4]) {
    const newTask = file.map(task => task.id === input[3] ? { ...task, description: input[4], updatedAt: new Date() } : task);
    writeFile(newTask);
  } else {
    console.log(`${color.red}Task id and Description is required, example: task-cli update "id" "Buy groceries"${color.red}`);
  }
}

// # Marking a task as in progress or done

if(input[2] === 'mark-in-progress') {
  const file = readFile(path);
  if(input[3]) {
    const newTask = file.map(task => task.id === input[3] ? { ...task, status: "in-progress", updatedAt: new Date() } : task);
    writeFile(newTask);
  } else {
    console.log(`${color.red}Task id is required, example: task-cli mark-in-progress "id"`);
  }
}

if(input[2] === 'mark-done') {
  const file = readFile(path);
  if(input[3]) {
    const newTask = file.map(task => task.id === input[3] ? { ...task, status: "done", updatedAt: new Date() } : task);
    writeFile(newTask);
  } else {
    console.log(`${color.red}Task id is required, example: task-cli mark-done "id"`);
  }
}

// # Listing all tasks and tasks by status

if(input[2] === 'list') {
  const data = readFile(path);

  if(!input[3]) {
    console.log(data);
  }

  if(input[3] === 'done') {
    const doneList = data.filter(task => task.status === input[3]);
    console.log(doneList);
  }

  if(input[3] === 'todo') {
    const doneList = data.filter(task => task.status === input[3]);
    console.log(doneList);
  }

  if(input[3] === 'in-progress') {
    const inProgressList = data.filter(task => task.status === input[3]);
    console.log(inProgressList);
  }
}
