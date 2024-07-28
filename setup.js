import { openDb } from './database.js';

async function setup() {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS responses (id INTEGER PRIMARY KEY, keyword TEXT, response TEXT)');
    const insertStmt = 'INSERT INTO responses (keyword, response) VALUES (?, ?)';

    await db.run(insertStmt, ['debug', 'To debug code, start by checking for syntax errors and ensuring all variables are properly defined.']);
    await db.run(insertStmt, ['snippet', 'Here is a sample code snippet in JavaScript:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));\n```']);
    await db.run(insertStmt, ['explain', 'Programming concepts can be complex, but breaking them down into smaller parts can help. For example, a function in JavaScript is a reusable block of code that performs a specific task.']);
}

setup().then(() => {
    console.log('Database setup complete');
}).catch((err) => {
    console.error('Error setting up the database:', err);
});
