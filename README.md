# Calculadora de Ângulo

## Pré-requisitos
  * [Node](https://nodejs.org/en/)
  * [PostgreSQL](https://www.postgresql.org/)
  * [pgAdmin4](https://www.pgadmin.org/download/)
  
Com o pgAdmin4 você pode criar um server com a Connection 
* **Host name/address:** localhost 
* **Port:** 5432 
* **Maintenance database:** postgres 
* **Username:** postgres  
* **Password:** Password Master que você escolheu no momento da instalação  

Após a criação do server, crie um banco de dados chamado **dbrest**, em seguida use o **restore** para recuperar os dados e a tabela **clock** através do arquivo **backup_database** presente no diretório **database** da aplicação.

#### Lembre-se mude password em index-controller e index-service para o seu Password Mister

## Instalação
*npm install*

## Inicialização 
npm run dev
