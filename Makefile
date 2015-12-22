
start: npm_init
	NODE_ENV='development' npm start

npm_init:
	npm install

prod:
	NODE_ENV=production npm run-script build

test:
	NODE_ENV=development npm run-script build
