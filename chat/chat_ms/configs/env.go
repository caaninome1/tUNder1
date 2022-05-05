package configs

import (
	"os"
)

func EnvMongoURI() string {
	URI := os.Getenv("MONGOURI")
	return URI
}

func EnvDBName() string {
	return os.Getenv("DB_NAME")
}

func EnvPort() string {
	return os.Getenv("PORT")
}
