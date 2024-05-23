# Crypto

## Setup

1. Clone the repository
2. Unzip and go inside clone directory
3. Set up your PostgreSQL database using docker (docker-compose.yml is given) and run the SQL scripts mentioned in the Postgres database(Use pgadmin and run script there)
4. Set up your node api too in docker( The configuration is mentioned in docker-compose.yml)
   docker-compose up -d --build
5. Check after 5 min for scrapped data in the database (Select * from crypto)

## API

* The postman collection is also mentioned there. It can be imported in postman to test 4 various apis.
