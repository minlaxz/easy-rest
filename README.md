## HOW EASY IS THAT 🤖

- to wrap a Express API in docker
- Connecting with mongodb internally
- docker-compose for Node and Mongo
- easily interacting docker-compose with [kool](https://kool.dev)

### To test this development environment you need to have

- [docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/)
- [kool](https://kool.dev/docs/getting-started/installation)
- `docker network create --driver bridge api-network` to create a external network for the api-app that is used in compose file
- nodejs and yarn

### Steps

- Clone and `cd` into repository
- Run `yarn` just for this project, _if you're already working on a project_, skip this
- Run `kool start` to create and start the _development environment_
- Edit or change the api code or whatever you want and test **@3003**
- Run `kool stop` to stop and clean the development environment
- _Runnig `kool stop` will just remove the container but not your code._

### Logging

- `kool logs` to see the logs `-f` flag to follow the logs

### Some examples
- `kool run yarn` is equal to `yarn` so you guess it
- `kool run yarn add -D nodemon` === `yarn add -D nodemon`
- `kool run node -v` === `node -v`

### Some drawbacks

- maybe you could not stop the express by CTRL+C, but you can stop and remove the conatiner completely it by `kool stop`


### Thoughts

- Your _development environment_ is completely isolated in _docker containers_ also **in-sync** with the `code`
- You could easily end up by simply dropping _compose file_ and _kool.yml_ to any working project and run `kool start`
- __The magic happen__
- Eh, you can also debug as you would do in a normal project and yup this is insane project

It's always a good practice to check `.env` and compose file for any necessary changes
===
