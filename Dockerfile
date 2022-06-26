FROM debian

RUN apt update && apt upgrade -y
RUN apt install vim curl wget bash-completion jq sqlite3 python3 -y
RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - \
    && apt install -y nodejs

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
RUN { \
    echo ''; \
    echo 'source /usr/share/bash-completion/bash_completion'; \
} >> /root/.bashrc

CMD /bin/bash
WORKDIR /root/work
