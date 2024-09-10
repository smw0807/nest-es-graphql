# NestJS GraphQL Elasticsearch 예제

이 프로젝트는 **NestJS**, **GraphQL**, 그리고 **Elasticsearch**를 사용하여 간단한 애플리케이션을 구축하는 방법을 보여줍니다. 이 애플리케이션은 사용자가 Elasticsearch 인덱스에 저장된 아이템을 생성하고, GraphQL API를 통해 검색할 수 있도록 합니다.

## 주요 기능

- **GraphQL API**: 데이터를 쿼리하고 변환하기 위해 GraphQL을 사용합니다.
- **Elasticsearch 통합**: Elasticsearch를 사용하여 데이터를 저장하고, 강력한 전체 텍스트 검색 기능을 제공합니다.
- **NestJS 프레임워크**: 확장 가능한 서버 사이드 애플리케이션을 구축하기 위해 NestJS의 유연성과 모듈성을 활용합니다.

## @codemask-labs/nestjs-elasticsearch 패키지

@nestjs/elasticsearch 패키지 말고 위 패키지를 사용함.  
인덱스 정의를 해서 TypeORM 같은 느낌의 기능을 제공해서 사용함.  
다만 아쉬운게 도큐먼트에 대한 \_id를 구할 수가 없었음.

## 시작하기

### 개발당시 환경

- Node.js (v21)
- Elasticsearch (8버전 도커 이미지 사용)

### 설치

1. 리포지토리 클론:

   ```bash
   git clone https://github.com/yourusername/nestjs-graphql-elasticsearch.git
   cd nestjs-graphql-elasticsearch
   ```

2. .env 파일 생성 후 작성 항목

   ```bash
   #APPLICATION
   APP_NAME=ES_API
   APP_PORT=

   # ElaticSearch
   ES_HOSTS=
   ES_USERNAME=elastic
   ES_PASSWORD=
   ES_MAX_RESPONSE_SIZE=100mb
   ES_REQUEST_TIMEOUT=60000
   ES_PING_TIMEOUT=60000

   #crypto solt
   CRYPTO_SECRET=
   ```

   빈 항목은 본인에 원하는 값으로 작성  
   ES_PASSWORD는 설정한 값에 맞춰줘야함

# 참고사이트

1. NestJS + ElasticSearch
   - https://www.npmjs.com/package/@codemask-labs/nestjs-elasticsearch
   - https://github.com/codemask-labs/nestjs-elasticsearch
