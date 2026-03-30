package api

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	// Health check
	router.GET("/api/health", HealthCheck)

	// Automata routes (placeholder for future expansion)
	automataGroup := router.Group("/api/automata")
	{
		automataGroup.GET("", ListAutomata)
		automataGroup.GET("/:id", GetAutomata)
		automataGroup.POST("", CreateAutomata)
	}

	// Lessons routes
	lessonsGroup := router.Group("/api/lessons")
	{
		lessonsGroup.GET("", ListLessons)
		lessonsGroup.GET("/:id", GetLesson)
	}
}
