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
- Run `yarn` just for this project, if you're already working on a project, skip this
- Run `kool start` to create and start the development environment
- Edit or change the api code or whatever you want and test **@3003**
- Run `kool stop` to stop and clean the development environment

### Logging

- `kool logs` to see the logs `-f` flag to follow the logs

### Thoughts

- You could easily end up by dropping compose file and kool.yml to any working project and run `kool start`
- The magic happen

It's always a good practice to check `.env` and compose file for any necessary changes
===
