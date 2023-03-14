# Dockerfile 
FROM public.ecr.aws/lambda/nodejs:16
 
COPY handlers ./
 
# You can overwrite command in `serverless.yml` template
CMD ["app.handler"]