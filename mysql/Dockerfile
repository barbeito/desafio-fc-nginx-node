FROM mysql:5.7

COPY ./db/ /docker-entrypoint-initdb.d/

CMD [ "--innodb-use-native-aio=0" ]

# comando para buildar a imagem:
# docker build -t node-db ./mysql

# comando para executar o container:
# docker run -d --name db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=nodedb node-db