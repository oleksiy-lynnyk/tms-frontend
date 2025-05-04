FROM ubuntu:latest
LABEL authors="oleksii"

ENTRYPOINT ["top", "-b"]