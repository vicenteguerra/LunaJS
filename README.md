#LunaJS

Express Js Base App ready to use on AWS Lambda

Include: 
- Mongoose
- Sequelize
- JWT middleware authentication

###Create new resource structure
```
npm run luna:new-domain -- --name=RESOURCE_NAME
```

Get started: 
```
npm install
```

```
npm start
```

##App Folder Structure

```
app/
└── Resource/
    ├── Controllers
    │   └── NAMEController.js
    ├── Models
    │   └── NAMEModel.js
    ├── Services
    │   └── NAMEService.js
    └── routes.js
```
