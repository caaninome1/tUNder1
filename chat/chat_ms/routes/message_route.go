package routes

import (
	"chat_ms/controllers"

	"github.com/gin-gonic/gin"
)

func MessageRoute(router *gin.Engine) {
	router.POST("/message/:chatId", controllers.CreateMessage())
}
