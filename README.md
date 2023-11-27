[![Build and deploy Node.js app to Azure Web App - chessence](https://github.com/LMWTT1230/Chessence/actions/workflows/main_chessence.yml/badge.svg?branch=add-ci-backend)](https://github.com/LMWTT1230/Chessence/actions/workflows/main_chessence.yml)
# Chessence

Style Guides
1. Tab Width of 4 Spaces
2. Double Quotations
3. K&R Style for Curly Braces (Same Line)
(Default Eslint and Prettier Styles)

To Install Eslint and Prettier
Run "npm install" to install all necesessary dependencies

Scripts for Eslint and Prettier
    Execute by typing "npm run {script_name}" in terminal

1. Checks code for lint and issues
    "lint": "npx eslint ./",
2. Show files that will be formatted
    "check": "npx prettier . --check",
3. Formats all files in project frontend/backend
    "format --write": "npx prettier . --write"
