package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Chat struct {
	Id       primitive.ObjectID `json:"id,omitempty"`
	User1    string             `json:"user1,omitempty" validate:"required"`
	User2    string             `json:"user2,omitempty" validate:"required"`
	Messages []*Message         `json:"messages,omitempty"`
}
