const os = require('os');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Get system information
const systemInfo = {
    osType: os.type(),
    osRelease: os.release(),
    totalMemory: `${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
    freeMemory: `${(os.freemem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
    cpuModel: os.cpus()[0].model,
    cpuCores: os.cpus().length,
    uptime: `${(os.uptime() / 3600).toFixed(2)} hours`
};

// Display system information
console.log('System Information:');
console.log('------------------');
console.log(`OS Type: ${systemInfo.osType}`);
console.log(`OS Release: ${systemInfo.osRelease}`);
console.log(`Total Memory: ${systemInfo.totalMemory}`);
console.log(`Free Memory: ${systemInfo.freeMemory}`);
console.log(`CPU Model: ${systemInfo.cpuModel}`);
console.log(`CPU Cores: ${systemInfo.cpuCores}`);
console.log(`System Uptime: ${systemInfo.uptime}`);

// Save to log file
const logFile = path.join(logsDir, 'system-info.txt');
const logContent = JSON.stringify(systemInfo, null, 2);

fs.writeFileSync(logFile, logContent, 'utf8');
console.log(`\nSystem information has been saved to: ${logFile}`); 