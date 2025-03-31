// Task Management Module

class Task {
    constructor(title, dueTime, priority) {
        this.title = title;
        this.dueTime = dueTime;
        this.priority = priority;
        this.id = Date.now();
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(title, dueTime, priority) {
        try {
            if (!title || !dueTime || !priority) {
                throw new Error('Missing required fields');
            }
            const task = new Task(title, dueTime, priority);
            this.tasks.push(task);
            this.scheduleReminder(task);
            return task;
        } catch (error) {
            console.error('Error adding task:', error.message);
            throw error;
        }
    }

    sortTasksByPriority() {
        return [...this.tasks].sort((a, b) => b.priority - a.priority);
    }

    getTasksDueWithin(minutes) {
        const now = Date.now();
        return this.tasks.filter(task => 
            task.dueTime <= minutes && task.dueTime > 0
        );
    }

    scheduleReminder(task) {
        setTimeout(() => {
            console.log(`REMINDER: Task "${task.title}" is due now!`);
        }, task.dueTime * 60 * 1000); // Convert minutes to milliseconds
    }
}

module.exports = TaskManager; 