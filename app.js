
const express = require('express');
const api = express();
api.use(express.json());
api.use(express.urlencoded({
    extended: true
}));
const Sequelize = require('sequelize');
const fs = require("fs")
const {QueryTypes} = require('sequelize');

var sequelize = new Sequelize('eduard72_consultagoogle', 'eduard72_felipe', 'oQnD~rzZWG&9', {
    host: 'sh-pro20.hostgator.com.br',
    dialect: "mysql",
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    logging: false
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

sequelize.authenticate().then(() => { }).catch(err => {
    console.error('Erro ao conectar a banco de dados: ', err);
});

async function app() {
    try {
        api.get('/', async(req, res) => {

            
        var getEmails = await sequelize.query("SELECT id FROM `emails`", {
            type: QueryTypes.SELECT
        });

        var totalConsultas = await sequelize.query("SELECT * FROM `consultas`", {
            type: QueryTypes.SELECT
        });

        var consultas = await sequelize.query("SELECT * FROM `consultas` WHERE status = 1", {
            type: QueryTypes.SELECT
        });       

            res.send({
                "total-emails":getEmails.length,
                "total-consultas":totalConsultas.length,
                "consultas-feitas":consultas.length, 
                "consultas-restantes": totalConsultas.length - consultas.length             
            })
          
        })

    }
    catch (err) {
        console.log(err);
    }
}

app()
api.listen(process.env.PORT || 3000, () => {
    console.log('API RUN!');
});
