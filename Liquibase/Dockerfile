FROM liquibase/liquibase

WORKDIR /Liquibase

COPY liquibase.properties /Liquibase/
COPY changelogs ./changelogs/

COPY postgresql-42.7.3.jar /Liquibase/

ENV CLASSPATH="/liquibase/postgresql-42.7.3.jar"
RUN echo "Files are: "
CMD ["ls"]

CMD ["liquibase", "update"]