package routes

import (
	"chat_ms/controllers"

	"github.com/gin-gonic/gin"
)

func MessageRoute(router *gin.Engine) {
	router.POST("/message/:chatId", controllers.CreateMessage())
	router.POST("/messages", controllers.GetChatMessages())
	router.GET("/message/:idChat/:idMsg", controllers.GetChatMessage())
	router.GET("/message/empty/:idChat/:idMsg", controllers.EmptyMessage())
	router.GET("/message/delete/:idChat/:idMsg", controllers.DeleteMessage())
}
