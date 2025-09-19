# use AWS lambda node js 20 base image
FROM public.ecr.aws/lambda/nodejs:20 as build

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# build the application
RUN npm run build

# remove dev dependencies
RUN npm prune --production

# use a second stage to prepare the production image
FROM public.ecr.aws/lambda/nodejs:20

# set working directory
WORKDIR ${LAMBDA_TASK_ROOT}

# copy buld javascript file and node_modules from the build stage
COPY --from=build /app/dist ${LAMBDA_TASK_ROOT}
COPY --from=build /app/node_modules ${LAMBDA_TASK_ROOT}/node_modules

# COPY packgage.json and package-lock.json
COPY --from=build /app/package*.json ${LAMBDA_TASK_ROOT}

# SET the environment variables
ENV NODE_ENV=production

# command to start lambda function
CMD ["index.handler"]