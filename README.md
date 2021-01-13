# Calculadora de Ângulos de um Relógio 

## Pré-requisitos
  * [Node](https://nodejs.org/en/)
  * [PostgreSQL](https://www.postgresql.org/)
  * [pgAdmin4](https://www.pgadmin.org/download/)
## Configuração
Com o pgAdmin4 você pode criar um server com a Connection. Caso queira criar de outra forma altere o caminho em **index-controller e index-service** 
* **Host name/address:** localhost 
* **Port:** 5432 
* **Maintenance database:** postgres 
* **Username:** postgres  
* **Password:** Password Master que você escolheu no momento da instalação  

Após a criação do server, crie um banco de dados chamado **dbrest**, em seguida use o **restore** para recuperar os dados e a tabela **clock** através do arquivo **backup_database** presente no diretório **database** da aplicação.

### Lembre-se: Mude o campo password em index-controller e index-service para o seu Password Mister

## Instalação
*npm install*

## Inicialização 
npm run dev
# Funcionalidades
A calculadora recebe dois parâmetros **hora** e **minuto** retornando o **ângulo** formado por eles, caso não exista no banco de dados ela criará o registro, armazenando **hora**, **minuto**, **ângulo** e a**data atual**.
* Os valores válidos para as **hora** vão de 0 a 11, caso o usuário digite um valor diferente uma mensagem será exibida.
* Os valores válidos para os **minuto** vão de 0 a 59, caso o usuário digite um valor diferente uma mensagem será exibida.
as requisições seguem o exemplo a baixo 
* http://localhost:8080/clock/ retorna todos os valores armazenados
* http://localhost:8080/clock/1 retorna o ângulo armazenado quando a **hora é 1** e os **minutos por padrão 0** já que não foram expecificados, caso o ângulo não exista ele será criado.
* http://localhost:8080/clock/5/25 retorna o ângulo armazenado quando a **hora é 5** e os **minutos 25**, caso o ângulo não exista ele será criado.
