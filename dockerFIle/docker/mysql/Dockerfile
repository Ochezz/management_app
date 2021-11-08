FROM mysql:5.7

ADD ./conf.d/my.cnf /etc/mysql/conf.d/my.cnf
# RUN chmod 644 /etc/mysql/conf.d
RUN chmod 644 /etc/mysql/conf.d/my.cnf

CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]


# 指定の場所にログを記録するファイルを作る
# RUN touch /var/log/mysql/mysqld.log