package services

import (
	"automatalab/internal/models"
	"fmt"
	"time"
)

type AutomataService struct {
}

func NewAutomataService() *AutomataService {
	return &AutomataService{}
}

func (s *AutomataService) ValidateDFA(dfa *models.DFA) error {
	if dfa.Name == "" {
		return fmt.Errorf("DFA name cannot be empty")
	}
	if len(dfa.States) == 0 {
		return fmt.Errorf("DFA must have at least one state")
	}
	if dfa.InitialState == "" {
		return fmt.Errorf("DFA must have an initial state")
	}

	// Verify initial state exists in states
	stateExists := false
	for _, state := range dfa.States {
		if state == dfa.InitialState {
			stateExists = true
			break
		}
	}
	if !stateExists {
		return fmt.Errorf("initial state must be in states list")
	}

	// Verify accept states exist in states
	for _, acceptState := range dfa.AcceptStates {
		exists := false
		for _, state := range dfa.States {
			if state == acceptState {
				exists = true
				break
			}
		}
		if !exists {
			return fmt.Errorf("accept state %s not in states list", acceptState)
		}
	}

	return nil
}

func (s *AutomataService) ValidateNFA(nfa *models.NFA) error {
	if nfa.Name == "" {
		return fmt.Errorf("NFA name cannot be empty")
	}
	if len(nfa.States) == 0 {
		return fmt.Errorf("NFA must have at least one state")
	}
	if nfa.InitialState == "" {
		return fmt.Errorf("NFA must have an initial state")
	}

	return nil
}

func (s *AutomataService) CreateDFA(name, description string, states, alphabet []string, initialState string, acceptStates []string) (*models.DFA, error) {
	dfa := &models.DFA{
		ID:           generateID(),
		Name:         name,
		Description:  description,
		States:       states,
		Alphabet:     alphabet,
		InitialState: initialState,
		AcceptStates: acceptStates,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}

	if err := s.ValidateDFA(dfa); err != nil {
		return nil, err
	}

	return dfa, nil
}

func generateID() string {
	return fmt.Sprintf("auto_%d", time.Now().UnixNano())
}
