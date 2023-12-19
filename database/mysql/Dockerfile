# FROM mysql:latest
FROM mysql:8.0

# RUN apt-get update -y && \
#     apt-get install -y locales && \
#     echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen && \
#     locale-gen && \
#     update-locale LANG=ja_JP.UTF-8 

# ENV LANG ja_JP.UTF-8
# ENV LANGUAGE ja_JP:ja
# ENV LC_ALL=ja_JP.UTF-8

ADD ./my.cnf /etc/mysql/my.cnf
RUN chmod 644 /etc/mysql/my.cnf

# CMD ["mysqld", "--character-set-server=utf8", "--collation-server=utf8_unicode_ci"]