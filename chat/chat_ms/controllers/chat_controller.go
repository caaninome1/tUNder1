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
	"go.mongodb.org/mongo-driver/bson"
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

		if chat.Messages == nil {
			chat.Messages = []models.Message{}
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
			http.StatusOK,
			responses.UserResponse{
				Status:  http.StatusOK,
				Message: "success",
				Data:    map[string]interface{}{"data": result},
			},
		)
	}
}

func GetChat() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		chatId := c.Param("id")
		var chat models.Chat
		defer cancel()

		objId, _ := primitive.ObjectIDFromHex(chatId)

		err := chatCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&chat)
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Status:  http.StatusInternalServerError,
					Message: "error", Data: map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		c.JSON(
			http.StatusOK,
			responses.UserResponse{
				Status:  http.StatusOK,
				Message: "success", Data: map[string]interface{}{"data": chat},
			},
		)
	}

}

func GetChatsUsuario() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		userId := c.Param("idUser")
		var chats []models.Chat
		defer cancel()

		cur, err := chatCollection.Find(ctx, bson.M{"$or": bson.A{
			bson.M{"user1": userId},
			bson.M{"user2": userId},
		}})
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Status:  http.StatusInternalServerError,
					Message: "error", Data: map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}
		if err = cur.All(ctx, &chats); err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Status:  http.StatusInternalServerError,
					Message: "error", Data: map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		ans := make([]string, 0)
		for _, chat := range chats {
			ans = append(ans, chat.Id.Hex())
		}

		c.JSON(
			http.StatusOK,
			responses.UserResponse{
				Status:  http.StatusOK,
				Message: "success", Data: map[string]interface{}{"data": ans},
			},
		)
	}
}
