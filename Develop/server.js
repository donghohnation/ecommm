const express = require('express');
const seedAll = require('./seeds/index');
const inquirer = require('inquirer');
const routes = require('./routes');
const sequelize = require('./config/connection');
const { init } = require('./models/Category');
const { config } = require('dotenv');


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


async function menu() {
	await 1
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'mainMenuChoice',
				choices: ['\x1b[32mSeed Data\x1b[0m', '\x1b[33mTest Data Connection\x1b[0m', '\x1b[34mStart App\x1b[0m', '\x1b[35mView Settings\x1b[0m\n', '\x1b[41m    exit    \x1b[0m'],
				message: "select from these options",
			},
		])
		.then(answers => {
			switch (answers.menuChoice) {
				case '\x1b[32mSeed Data\x1b[0m':
					seedServer();
					break;
				case '\x1b[33mTest Connection\x1b[0m':
					connectionTest();
					menu()
					break;
				case '\x1b[34mStart App\x1b[0m':
					startLocalServer();
					break;
				case '\x1b[35mView Settings\x1b[0m\n':
					settings(PORT);
					break;
				case '\x1b[41m   exit   \x1b[0m':
					process.exit(1);
					break;
			}
		})

}

async function connectionTest() {
	try {
		await sequelize.authenticate();
		console.log(`\n\x1b[42m   Remote DB Connection Valid   \x1b[0m\n`);
	} catch (error) {
		console.error('\n\n\x1b[41mNot able to connect\x1b[0m\n\x1b[43mERROR:', error + "\x1b[0m\n\n");
	}
};

async function seedServer() {
	try {
		await seedAll();
		console.log('\n\x1b[42mseed complete\x1b[0m\n');
		menu();
	} catch (error) {
		console.log('\n\x1b[41mseed failed\x1b[0m\n');
		menu();
	}
};

async function startLocalServer() {
	sequelize.sync({ force: false }).then(() => {
		app.listen(PORT, () => {
			console.log(`\n\x1b[42m  local started  \x1b[0m`);
			console.log(`\x1b[45m    http://localhost:${PORT}/api/   \x1b[0m`);
		});
	});
}

function settings(port) {

	console.log(`\n\x1b[42m   server configuration  \x1b[0m`);
	console.log(`\n\x1b[43m   Database Config  \x1b[0m`);
	console.log('http://localhost:');
	menu();
}





menu();


