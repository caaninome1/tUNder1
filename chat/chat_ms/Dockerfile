FROM golang:1.18-buster

ENV MONGOURI=mongodb://jaider:jpintop1101@localhost:27017/?authSource=admin&readPreference=primary&directConnection=true&ssl=false
ENV DB_NAME=tunder_chat
RUN go install chat_ms@lastest

CMD ["sh", "-c", "go run main.go"]
