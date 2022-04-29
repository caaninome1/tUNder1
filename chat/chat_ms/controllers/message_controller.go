package controllers

import (
	"chat_ms/models"
	"chat_ms/responses"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
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
			http.StatusOK,
			responses.UserResponse{
				Status:  http.StatusOK,
				Message: "success",
				Data:    map[string]interface{}{"data": result},
			},
		)
	}
}

func GetChatMessages() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var search models.FindMessage
		var chat models.Chat
		defer cancel()

		//validate the request body
		if err := c.BindJSON(&search); err != nil {
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
		if validationErr := validate.Struct(&search); validationErr != nil {
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

		newSearch := models.FindMessage{
			Id:       search.Id,
			InitDate: search.InitDate,
			EndDate:  search.EndDate,
		}

		objId, _ := primitive.ObjectIDFromHex(newSearch.Id)

		var dateSearch bson.A
		if !newSearch.InitDate.IsZero() && !newSearch.EndDate.IsZero() {
			dateSearch = bson.A{
				bson.M{"$gte": bson.A{"$$message.date", newSearch.InitDate}},
				bson.M{"$lte": bson.A{"$$message.date", newSearch.EndDate}},
			}
		} else if !newSearch.InitDate.IsZero() {
			dateSearch = bson.A{
				bson.M{"$gte": bson.A{"$$message.date", newSearch.InitDate}},
			}
		} else if !newSearch.EndDate.IsZero() {
			dateSearch = bson.A{
				bson.M{"$lte": bson.A{"$$message.date", newSearch.EndDate}},
			}
		}

		fmt.Printf("%+v\n", dateSearch)

		opts := options.FindOne()
		opts.SetProjection(bson.M{
			"_id":   1,
			"user1": 1,
			"user2": 1,
			"messages": bson.M{
				"$filter": bson.M{
					"input": "$messages",
					"as":    "message",
					"cond": bson.M{
						"$and": dateSearch,
					},
				},
			},
		})

		err := chatCollection.FindOne(
			ctx,
			bson.M{"_id": objId},
			opts,
		).Decode(&chat)

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
		messageId := c.Param("idMsg")
		var chat models.Chat
		defer cancel()

		fmt.Println(chatId + " " + messageId)

		chatOId, _ := primitive.ObjectIDFromHex(chatId)
		messOId, _ := primitive.ObjectIDFromHex(messageId)

		opts := options.FindOne()
		opts.SetProjection(bson.M{
			"_id":   1,
			"user1": 1,
			"user2": 1,
			"messages": bson.M{
				"$filter": bson.M{
					"input": "$messages",
					"as":    "message",
					"cond": bson.M{
						"$and": bson.M{"$eq": bson.A{"$$message._id", messOId}},
					},
				},
			},
		})

		err := chatCollection.FindOne(ctx, bson.M{"_id": chatOId}, opts).Decode(&chat)
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
		messageId := c.Param("idMsg")
		defer cancel()

		chatOId, _ := primitive.ObjectIDFromHex(chatId)
		messOId, _ := primitive.ObjectIDFromHex(messageId)

		opts := options.Update()
		opts.SetArrayFilters(
			options.ArrayFilters{
				Filters: []interface{}{bson.M{"msg._id": messOId}},
			},
		)

		update := bson.M{
			"$set": bson.M{"messages.$[msg].content": "", "messages.$[msg].status": "eliminado"},
		}

		result, err := chatCollection.UpdateOne(ctx, bson.M{"_id": chatOId}, update, opts)
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
		messageId := c.Param("idMsg")
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
