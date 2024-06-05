develop:
	npx webpack serve

install:
	npm ci

build:
	echo "build"
	NODE_ENV=production npx webpack

lint:
	npx eslint .