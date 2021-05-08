# Multi-step wizard

A multi-step wizard component powered by React **[(vite.js)](https://vitejs.dev/)**.

## Getting Started

You will find information detailed here on how to get a copy of this project up and running on your local machine for development and testing purposes.

### Prerequisites

The following prerequisites detail what is required for this project and how to install them.

**[Node.js](https://nodejs.org/en/)**

To check if you have Node.js installed, run the following command in your terminal:

```
node -v
```

**[Node Package Manager](https://www.npmjs.com/get-npm)**

To confirm that you have Node Package Manager installed, you can run the following command in your terminal:

```
npm -v
```

### Installing

The following steps detail how to get a development environment for this project running on your machine:

**Step 1. Clone the repository using SSH/https**

```
git clone <repository-url>
```

**Step 2. Install the dependencies**

```
npm install
```

**Step 3. Start the app**

```
npm start
```

## Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Vite next generation frontend tooling


## Updating configuration

**Adding additional input field:**

To add additional input field to a step. Simple insert a new input field object to the corresponding step inside `formFields (~/config/appConfig.js)`. An input field object must contain the following properties:

```
{ id: string, label: string, type: string, required: boolean, validationSchema: [[regex: object, errMsg: string]] }
```
**Adding additional step:**

To add additional steps to the form. Simple insert a new key and a corresponding page object to `pages (~/config/appConfig.js)`. A page object must contain the following properties:

```
key: { step: number, id: string, label: string }
```
__note:__ make sure the `key` and `id` prop match. 