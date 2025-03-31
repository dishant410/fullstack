const TaskManager = require('./taskManager');

// Create a new task manager instance
const taskManager = new TaskManager();

// Example usage
try {
    // Add some tasks
    taskManager.addTask('Complete project', 5, 1); // Due in 5 minutes, highest priority
    taskManager.addTask('Review code', 15, 2);     // Due in 15 minutes, medium priority
    taskManager.addTask('Write documentation', 30, 3); // Due in 30 minutes, lowest priority

    // Sort tasks by priority
    console.log('Tasks sorted by priority:', taskManager.sortTasksByPriority());

    // Get tasks due within 10 minutes
    console.log('Tasks due within 10 minutes:', taskManager.getTasksDueWithin(10));

    // Keep the program running to see the reminders
    console.log('Waiting for reminders...');
} catch (error) {
    console.error('Error in main program:', error.message);
} 