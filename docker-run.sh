# Building docker image
docker build --network host -t api-image .

# Create a docker network
docker network create --driver bridge api-network

# Running docker container
docker run --name node-api --net api-network -p 3003:3001 -d api-image