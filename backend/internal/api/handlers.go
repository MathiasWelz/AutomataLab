package api

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type HealthResponse struct {
	Status    string    `json:"status"`
	Timestamp time.Time `json:"timestamp"`
	Version   string    `json:"version"`
}

func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, HealthResponse{
		Status:    "ok",
		Timestamp: time.Now(),
		Version:   "1.0.0",
	})
}

func ListAutomata(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"automata": []interface{}{},
		"total":    0,
	})
}

func GetAutomata(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"id":   id,
		"name": "Sample Automata",
	})
}

func CreateAutomata(c *gin.Context) {
	c.JSON(http.StatusCreated, gin.H{
		"id": "new-id",
	})
}

func ListLessons(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"lessons": []interface{}{},
		"total":   0,
	})
}

func GetLesson(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"id":    id,
		"title": "Introduction to DFA",
		"body":  "Learn about Deterministic Finite Automata...",
	})
}
