### ${self:custom.bugsnagEnv.${self:provider.stage}}
custom:
  bugsnagEnv:
    dev: dev
    stg: staging
    prd: production

### ${opt:stage}
cli 參數, serverless deploy --stage staging
也可以加上預設值，沒有的話為 'dev' => ${opt:stage, 'dev'}


### ${self:provider.stage}
provider
  stage:
    dev: develop
    stg: staging

### ${sls:stage}
= ${opt:stage, self:provider.stage, "dev"}
= opt:stage 沒有的話 => self:provider.stage 再沒有就 => 'dev'

### AWS Parameter Store
${ssm:/${opt:stage, 'stg'}/canvas/TWITTER_CONSUMER_KEY}

### ${file(./environments.yml)}
provider:
  environment:
    ${file(./environments.yml)}

### ${cf:another-service-dev.functionPrefix}
functions:
  hello:
    name: ${cf:another-service-dev.functionPrefix}-hello
    handler: handler.hello
custom:
  functionPrefix: 'my-prefix-'
resources:
  Outputs:
    functionPrefix:
      Value: ${self:custom.functionPrefix}
      Export:
        Name: functionPrefix


- [官方文件看更多用法](https://www.serverless.com/framework/docs/providers/aws/guide/variables)
- [鐵人賽 -> Serverless Framework](https://ithelp.ithome.com.tw/articles/10304188?sc=iThelpR)