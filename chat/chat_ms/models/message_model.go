package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Message struct {
	Id      primitive.ObjectID `json:"id,omitempty"`
	User    string             `json:"user,omitempty" validate:"required"`
	Date    time.Time          `json:"date,omitempty" validate:"required"`
	Content string             `json:"content,omitempty" validate:"required"`
	Status  string             `json:"status,omitempty" validate:"required"`
}
