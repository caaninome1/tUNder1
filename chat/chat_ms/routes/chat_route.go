package routes

import (
	"chat_ms/controllers"

	"github.com/gin-gonic/gin"
)

func ChatRoute(router *gin.Engine) {
	router.POST("/chat", controllers.CreateChat())
	router.GET("/chat/:id", controllers.GetChat())
	router.GET("/chats/:idUser", controllers.GetChatsUsuario())
}
