import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Function to open the database
export async function openDb() {
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    });
}

// Function to create tables and insert static responses
async function createTables() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS responses (
            id INTEGER PRIMARY KEY,
            keyword TEXT,
            response TEXT
        )
    `);

    // Insert static responses
    const responses = [
        { keyword: 'debug', response: "To debug code, start by checking for syntax errors and ensuring all variables are properly defined. Use console.log() statements to trace the execution flow and identify where the code may be failing." },
        { keyword: 'snippet', response: "Here is a sample code snippet in JavaScript:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));\n```" },
        { keyword: 'explain', response: "Programming concepts can be complex, but breaking them down into smaller parts can help. For example, a function in JavaScript is a reusable block of code that performs a specific task. You define it once and can call it multiple times with different inputs." },
        { keyword: 'html', response: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using elements such as headings, paragraphs, and images." },
        { keyword: 'css', response: "CSS (Cascading Style Sheets) is a style sheet language used to describe the presentation of a document written in HTML or XML. It controls the layout, colors, fonts, and overall visual appearance of web pages." },
        { keyword: 'javascript', response: "JavaScript is a high-level, dynamic programming language commonly used to create interactive effects within web browsers. It is an essential technology of the web, alongside HTML and CSS." },
        { keyword: 'react', response: "React is a JavaScript library for building user interfaces. It allows developers to create large web applications that can change data without reloading the page. React is maintained by Facebook and a community of individual developers and companies." },
        { keyword: 'nodejs', response: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to use JavaScript to write server-side scripts and run server-side applications." },
        { keyword: 'express', response: "Express is a fast, unopinionated, minimalist web framework for Node.js. It provides a robust set of features to develop web and mobile applications." },
        { keyword: 'sql', response: "SQL (Structured Query Language) is a standard language for managing and manipulating databases. It is used to query, insert, update, and delete data within a relational database management system (RDBMS)." },
        { keyword: 'mongodb', response: "MongoDB is a document-oriented NoSQL database used for high-volume data storage. Instead of using tables and rows, MongoDB makes use of collections and documents." },
        { keyword: 'api', response: "API (Application Programming Interface) is a set of rules that allows one software application to interact with another. APIs define the methods and data formats that applications can use to communicate with each other." },
        // Add more responses as needed
    ];

    for (const response of responses) {
        await db.run('INSERT INTO responses (keyword, response) VALUES (?, ?)', [response.keyword, response.response]);
    }
}

// Run the function to create tables and insert responses
createTables().catch((err) => {
    console.error('Error creating tables:', err);
});
