# Redmine Hours by Week
Aplicação web que retorna horas acumuladas do usuário durante uma semana

`docker run -d
	--publish 8007:8080
	--environment DB_PASSOWORD=secret
    --link some-mysql:mysql-redmine
	victorhundo/redmine-hours`
