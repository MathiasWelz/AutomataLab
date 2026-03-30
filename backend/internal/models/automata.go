package models

import "time"

type DFA struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Description  string    `json:"description"`
	States       []string  `json:"states"`
	Alphabet     []string  `json:"alphabet"`
	InitialState string    `json:"initial_state"`
	AcceptStates []string  `json:"accept_states"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type NFA struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Description  string    `json:"description"`
	States       []string  `json:"states"`
	Alphabet     []string  `json:"alphabet"`
	InitialState string    `json:"initial_state"`
	AcceptStates []string  `json:"accept_states"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type Lesson struct {
	ID             string    `json:"id"`
	Title          string    `json:"title"`
	Content        string    `json:"content"`
	Order          int       `json:"order"`
	ReferencesLinz string    `json:"references_linz"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

type User struct {
	ID        string    `json:"id"`
	Email     string    `json:"email"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
