# Task Tracker by [Roadmap](https://roadmap.sh/projects/task-tracker)

Build a CLI app to track your tasks and manage your to-do list.

## Usage

### Adding a new task
```bash
  node task-cli add "Buy groceries"
```

### Updating and deleting tasks
```bash
  node task-cli update "task-id" "Buy groceries"
  node task-cli delete "task-id"
```

### Marking a task as in progress or done
```bash
  node task-cli mark-in-progress "task-id"
  node task-cli mark-done "task-id"
```

### Listing all tasks
```bash
  node task-cli list
```

### Listing tasks by status
```bash
  node task-cli list done
  node task-cli list todo
  node task-cli list in-progress
```
