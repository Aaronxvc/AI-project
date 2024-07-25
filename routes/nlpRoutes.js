const express = require('express');
const natural = require('natural');
const router = express.Router();

const tokenizer = new natural.WordTokenizer();

router.post('/nlp', (req, res) => {
    const input = req.body.input;
    const tokens = tokenizer.tokenize(input);
    let response = "I'm not sure what you mean.";

    // Basic greetings
    if (tokens.includes('hello')) {
        response = "Hello!";
    } else if (tokens.includes('goodbye')) {
        response = "Goodbye!";
    }

    // HTML topics
    else if (tokens.includes('html')) {
        if (tokens.includes('elements')) {
            response = "HTML elements are the building blocks of HTML pages. Examples include <div>, <p>, <a>, etc.";
        } else if (tokens.includes('attributes')) {
            response = "HTML attributes provide additional information about elements. Examples include id, class, href, etc.";
        } else if (tokens.includes('forms')) {
            response = "HTML forms are used to collect user input. Examples include <form>, <input>, <textarea>, etc.";
        } else if (tokens.includes('semantics')) {
            response = "Semantic HTML elements provide meaning to the web page. Examples include <header>, <footer>, <article>, etc.";
        } else if (tokens.includes('headings')) {
            response = "HTML headings are used to define headings in a document. Examples include <h1>, <h2>, <h3>, etc.";
        } else if (tokens.includes('links')) {
            response = "HTML links are defined with the <a> tag. Example: <a href='url'>link text</a>.";
        } else if (tokens.includes('lists')) {
            response = "HTML lists are used to group related items. Examples include <ul>, <ol>, and <li>.";
        } else {
            response = "HTML stands for HyperText Markup Language.";
        }
    } 

    // CSS topics
    else if (tokens.includes('css')) {
        if (tokens.includes('selectors')) {
            response = "CSS selectors are used to select the content you want to style. Examples include .class, #id, element, etc.";
        } else if (tokens.includes('properties')) {
            response = "CSS properties are used to style selected elements. Examples include color, font-size, margin, etc.";
        } else if (tokens.includes('flexbox')) {
            response = "Flexbox is a CSS layout module that makes it easier to design flexible responsive layout structure. Properties include display, flex-direction, justify-content, etc.";
        } else if (tokens.includes('grid')) {
            response = "CSS Grid Layout is a two-dimensional layout system for the web. Properties include display, grid-template-columns, grid-template-rows, etc.";
        } else if (tokens.includes('animations')) {
            response = "CSS animations allow you to animate the transition from one CSS style to another. Properties include @keyframes, animation-name, animation-duration, etc.";
        } else if (tokens.includes('media')) {
            response = "CSS media queries are used to apply different styles for different media types/devices. Example: @media (max-width: 600px) { /* CSS rules */ }";
        } else {
            response = "CSS stands for Cascading Style Sheets.";
        }
    } 

    // JavaScript topics
    else if (tokens.includes('javascript')) {
        if (tokens.includes('variables')) {
            response = "In JavaScript, variables are containers for storing data values. Examples include var, let, and const.";
        } else if (tokens.includes('functions')) {
            response = "Functions in JavaScript are blocks of code designed to perform a particular task. They are defined with the function keyword.";
        } else if (tokens.includes('objects')) {
            response = "Objects in JavaScript are collections of properties. Example: let obj = { key: 'value' };";
        } else if (tokens.includes('arrays')) {
            response = "Arrays in JavaScript are used to store multiple values in a single variable. Example: let arr = [1, 2, 3];";
        } else if (tokens.includes('dom')) {
            response = "DOM manipulation in JavaScript allows you to dynamically change the content and structure of a web page. Example: document.getElementById('id').innerHTML = 'new content';";
        } else if (tokens.includes('events')) {
            response = "Events in JavaScript are actions that can be detected by JavaScript. Examples include onclick, onload, onmouseover, etc.";
        } else if (tokens.includes('promises')) {
            response = "Promises in JavaScript represent the eventual completion (or failure) of an asynchronous operation and its resulting value. Example: let promise = new Promise((resolve, reject) => { /* code */ });";
        } else if (tokens.includes('async') && tokens.includes('await')) {
            response = "Async/Await in JavaScript allows you to write asynchronous code in a more synchronous fashion. Example: async function fetchData() { let response = await fetch(url); }";
        } else {
            response = "JavaScript is a programming language used for web development.";
        }
    }

    res.json({ response });
});

module.exports = router;
