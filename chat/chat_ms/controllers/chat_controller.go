package controllers

import (
	"chat_ms/configs"
	"chat_ms/models"
	"chat_ms/responses"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var chatCollection *mongo.Collection = configs.GetCollection(configs.DB, "chat")
var validate = validator.New()

func CreateChat() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var chat models.Chat
		defer cancel()

		//validate the request body
		if err := c.BindJSON(&chat); err != nil {
			c.JSON(
				http.StatusBadRequest,
				responses.UserResponse{
					Status:  http.StatusBadRequest,
					Message: "error",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&chat); validationErr != nil {
			c.JSON(
				http.StatusBadRequest,
				responses.UserResponse{
					Status:  http.StatusBadRequest,
					Message: "error",
					Data:    map[string]interface{}{"data": validationErr.Error()},
				},
			)
			return
		}

		newChat := models.Chat{
			Id:       primitive.NewObjectID(),
			User1:    chat.User1,
			User2:    chat.User2,
			Messages: chat.Messages,
		}

		result, err := chatCollection.InsertOne(ctx, newChat)
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Status:  http.StatusInternalServerError,
					Message: "error",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		c.JSON(
			http.StatusCreated,
			responses.UserResponse{
				Status:  http.StatusCreated,
				Message: "success",
				Data:    map[string]interface{}{"data": result},
			},
		)
	}
}
