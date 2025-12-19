const fs = require('fs');

const readline = require('readline');

const tasksData = __dirname +'/Task_management_and_lab' +'tasksFile.json';


// ----------------TaskStructure Class----------------
class TaskStructure {
  constructor(title, description, priority, due_date) {
    this.id = Date.now().toString();
    this.title = title;
    this.description = description;
    this.priority = priority; 
    this.due_date = due_date;
    this.status = false;
    this.creationDate = new Date().toISOString();
  }

  editTask(title, description, priority, due_date) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.due_date = due_date;
  }

  markAsComplete() {
    this.status = true;
  }
}

// ----------------TaskOperations Class----------------
class TaskOperations {
  constructor() {
    this.tasks = [];
    this.loadFromFile();
  }

  addTask(title, description, priority, due_date) {
    const task = new TaskStructure(title, description, priority, due_date);
    this.tasks.push(task);
    console.log('Task added successfully');
  }

  viewTask() {
    if (this.tasks.length === 0) {
      console.log('No tasks found');
      return;
    }

    this.tasks.forEach(task => {
      console.log(`\nID: ${task.id}\nTitle: ${task.title}\nDescription: ${task.description}\nPriority: ${task.priority}\nDue Date: ${task.due_date}\nCompleted: ${task.status}\nCreated At: ${task.creationDate}`);
    });
  }

  editTask(id, title, description, priority, due_date) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      console.log('Task not found');
      return;
    }
    task.editTask(title, description, priority, due_date);
    console.log('Task updated');
  }

  deleteTask(id) {
    const before = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    if (this.tasks.length < before) console.log('🗑️ Task deleted');
    else console.log('Task not found');
  }

  markAsComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      console.log('Task not found');
      return;
    }
    task.markAsComplete();
    console.log('Task marked as completed');
  }

  sortTask(type) {
    if (type === 'priority') {
      const order = { high: 1, medium: 2, low: 3 };
      this.tasks.sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (type === 'date') {
      this.tasks.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
    } else if (type === 'status') {
      this.tasks.sort((a, b) => a.status - b.status);
    }
    console.log('🔃 Tasks sorted');
  }

  loadFromFile() {
  if (fs.existsSync(tasksData)) {
    const data = fs.readFileSync(tasksData, 'utf-8');
    const parsed = JSON.parse(data);

    this.tasks = parsed.map(t => {
      const task = new TaskStructure(
        t.title,
        t.description,
        t.priority,
        t.due_date
      );
      task.id = t.id;
      task.status = t.status;
      task.creationDate = t.creationDate;
      return task;
    });

    console.log('Tasks loaded from file');
  }
}

saveToFile() {
  fs.writeFileSync(tasksData, JSON.stringify(this.tasks, null, 2));
  console.log('Tasks saved in file');
}

}


const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const manager = new TaskOperations();

function addTaskFromCLI() {
  rl.question('Enter title: ', title => {
    rl.question('Enter description: ', description => {
      rl.question('Enter priority (low/medium/high): ', priority => {
        rl.question('Enter due date (YYYY-MM-DD): ', due_date => {
          manager.addTask(title, description, priority, due_date);
          options();
        });
      });
    });
  });
}

function editTaskFromCLI() {
  rl.question('Enter task ID to edit: ', id => {
    rl.question('New title: ', title => {
      rl.question('New description: ', description => {
        rl.question('New priority: ', priority => {
          rl.question('New due date: ', due_date => {
            manager.editTask(id, title, description, priority, due_date);
            options();
          });
        });
      });
    });
  });
}

function deleteTaskFromCLI() {
  rl.question('Enter task ID to delete: ', id => {
    manager.deleteTask(id);
    options();
  });
}

function completeTaskFromCLI() {
  rl.question('Enter task ID to mark completed: ', id => {
    manager.markAsComplete(id);
    options();
  });
}

function sortTaskFromCLI() {
  rl.question('Sort by (priority/date/status): ', type => {
    manager.sortTask(type);
    manager.viewTask();
    options();
  });
}

function options() {
  console.log('\n1. Add Task');
  console.log('2. View Tasks');
  console.log('3. Edit Task');
  console.log('4. Delete Task');
  console.log('5. Mark Task as Completed');
  console.log('6. Sort Tasks');
  console.log('7. Exit');

  rl.question('Choose option: ', choice => {
    if (choice === '1') addTaskFromCLI();
    else if (choice === '2') { manager.viewTask(); options(); }
    else if (choice === '3') editTaskFromCLI();
    else if (choice === '4') deleteTaskFromCLI();
    else if (choice === '5') completeTaskFromCLI();
    else if (choice === '6') sortTaskFromCLI();
    else { 
        manager.saveToFile();
        rl.close();
        console.log('Exit from CLI');    
    }
  });
}

options();
