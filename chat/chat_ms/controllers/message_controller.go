package controllers

import (
	"chat_ms/models"
	"chat_ms/responses"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateMessage() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		chatId := c.Param("chatId")
		var message models.Message
		defer cancel()

		//validate the request body
		if err := c.BindJSON(&message); err != nil {
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
		if validationErr := validate.Struct(&message); validationErr != nil {
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

		newMessage := models.Message{
			Id:      primitive.NewObjectID(),
			User:    message.User,
			Content: message.Content,
			Date:    time.Now(),
			Status:  message.Status,
		}

		objId, _ := primitive.ObjectIDFromHex(chatId)

		update := bson.M{"$push": bson.M{"messages": newMessage}}

		result, err := chatCollection.UpdateByID(ctx, objId, update)
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

func GetChatMessages() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		chatId := c.Param("idChat")
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
				Message: "success", Data: map[string]interface{}{"data": chat.Messages},
			},
		)
	}
}

func GetChatMessage() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		chatId := c.Param("idChat")
		messageId := c.Param("idChat")
		var chat models.Chat
		defer cancel()

		chatOId, _ := primitive.ObjectIDFromHex(chatId)
		messOId, _ := primitive.ObjectIDFromHex(messageId)

		err := chatCollection.FindOne(ctx, bson.M{"_id": chatOId, "messages.id": messOId}).Decode(&chat)
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

		if len(chat.Messages) == 0 {
			c.JSON(
				http.StatusNotFound,
				responses.UserResponse{
					Status:  http.StatusNotFound,
					Message: "error", Data: map[string]interface{}{"data": "Not found"},
				},
			)
			return
		}

		c.JSON(
			http.StatusOK,
			responses.UserResponse{
				Status:  http.StatusOK,
				Message: "success", Data: map[string]interface{}{"data": chat.Messages[0]},
			},
		)
	}
}

func EmptyMessage() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		chatId := c.Param("idChat")
		messageId := c.Param("idChat")
		defer cancel()

		chatOId, _ := primitive.ObjectIDFromHex(chatId)
		messOId, _ := primitive.ObjectIDFromHex(messageId)

		update := bson.M{
			"$set":         bson.M{"messages.$[element].content": ""},
			"arrayFilters": bson.A{bson.M{"element._id": messOId}},
		}

		result, err := chatCollection.UpdateByID(ctx, chatOId, update)
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
				Message: "success", Data: map[string]interface{}{"data": result},
			},
		)
	}
}

func DeleteMessage() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		chatId := c.Param("idChat")
		messageId := c.Param("idChat")
		defer cancel()

		chatOId, _ := primitive.ObjectIDFromHex(chatId)
		messOId, _ := primitive.ObjectIDFromHex(messageId)

		update := bson.M{"$pull": bson.M{"messages": bson.M{"_id": messOId}}}
		result, err := chatCollection.UpdateByID(ctx, chatOId, update)
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
				Message: "success", Data: map[string]interface{}{"data": result},
			},
		)
	}
}
