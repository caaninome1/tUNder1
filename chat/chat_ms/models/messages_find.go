package models

import (
	"time"
)

type FindMessage struct {
	Id       string    `json:"id"`
	InitDate time.Time `json:"initDate,omitempty"`
	EndDate  time.Time `json:"endDate,omitempty"`
}
