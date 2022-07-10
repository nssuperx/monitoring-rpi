FROM debian:latest

ARG USER_NAME
ARG USER_ID
ARG GROUP_NAME
ARG GROUP_ID

RUN apt update && apt upgrade -y
RUN apt install vim curl wget bash-completion jq sqlite3 python3 apache2 -y
RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && \
    apt install -y nodejs

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

RUN useradd -s /bin/bash -m ${USER_NAME} && \
    usermod -u ${USER_ID} ${USER_NAME} && \
    groupmod -g ${GROUP_ID} ${GROUP_NAME} && \
    usermod -g ${GROUP_NAME} ${USER_NAME}

RUN { \
    echo ''; \
    echo 'source /usr/share/bash-completion/bash_completion'; \
} >> /root/.bashrc

RUN { \
    echo ''; \
    echo 'source /usr/share/bash-completion/bash_completion'; \
} >> /home/${USER_NAME}/.bashrc

USER ${USER_NAME}
WORKDIR /mnt/work
CMD /bin/bash
