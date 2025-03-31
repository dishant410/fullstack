const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

// File type categories
const FILE_TYPES = {
    images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp'],
    documents: ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.ppt', '.pptx']
};

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create category folders
async function createCategoryFolders(baseDir) {
    for (const category of Object.keys(FILE_TYPES)) {
        const folderPath = path.join(baseDir, category);
        try {
            await fs.mkdir(folderPath, { recursive: true });
        } catch (err) {
            console.error(`Error creating ${category} folder:`, err);
        }
    }
}

// Get file category based on extension
function getFileCategory(ext) {
    for (const [category, extensions] of Object.entries(FILE_TYPES)) {
        if (extensions.includes(ext.toLowerCase())) {
            return category;
        }
    }
    return 'others';
}

// Move file to appropriate category folder
async function moveFile(filePath, category, baseDir) {
    const fileName = path.basename(filePath);
    const targetPath = path.join(baseDir, category, fileName);
    
    try {
        await fs.rename(filePath, targetPath);
        return `Moved: ${fileName} to ${category}`;
    } catch (err) {
        return `Error moving ${fileName}: ${err.message}`;
    }
}

// Main function to organize files
async function organizeFiles(directoryPath) {
    const summary = [];
    
    try {
        // Create category folders
        await createCategoryFolders(directoryPath);
        
        // Read all files in directory
        const files = await fs.readdir(directoryPath);
        
        // Process each file
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.stat(filePath);
            
            if (stats.isFile()) {
                const ext = path.extname(file);
                const category = getFileCategory(ext);
                const result = await moveFile(filePath, category, directoryPath);
                summary.push(result);
            }
        }
        
        // Write summary to file
        await fs.writeFile(
            path.join(directoryPath, 'summary.txt'),
            summary.join('\n')
        );
        
        console.log('File organization completed!');
        console.log('Check summary.txt for details.');
        
    } catch (err) {
        console.error('Error organizing files:', err);
    }
}

// Get directory path from user
rl.question('Enter the directory path to organize: ', (dirPath) => {
    organizeFiles(dirPath).finally(() => rl.close());
}); 