
start: npm_init
	npm start

npm_init:
	npm install

prod:
	NODE_ENV=production npm run-script prod
