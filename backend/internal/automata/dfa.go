package automata

import "fmt"

type State struct {
	Name     string
	IsAccept bool
}

type Transition struct {
	FromState string
	ToState   string
	Symbol    string
}

type DFA struct {
	States       map[string]*State
	Alphabet     []string
	Transitions  []Transition
	InitialState string
}

func NewDFA(initialState string, alphabet []string) *DFA {
	return &DFA{
		States:       make(map[string]*State),
		Alphabet:     alphabet,
		Transitions:  []Transition{},
		InitialState: initialState,
	}
}

func (d *DFA) AddState(name string, isAccept bool) error {
	if _, exists := d.States[name]; exists {
		return fmt.Errorf("state %s already exists", name)
	}
	d.States[name] = &State{Name: name, IsAccept: isAccept}
	return nil
}

func (d *DFA) AddTransition(fromState, toState, symbol string) error {
	if _, exists := d.States[fromState]; !exists {
		return fmt.Errorf("from state %s does not exist", fromState)
	}
	if _, exists := d.States[toState]; !exists {
		return fmt.Errorf("to state %s does not exist", toState)
	}

	// Check if symbol is in alphabet
	found := false
	for _, s := range d.Alphabet {
		if s == symbol {
			found = true
			break
		}
	}
	if !found {
		return fmt.Errorf("symbol %s not in alphabet", symbol)
	}

	d.Transitions = append(d.Transitions, Transition{
		FromState: fromState,
		ToState:   toState,
		Symbol:    symbol,
	})
	return nil
}

func (d *DFA) ProcessString(input string) (bool, error) {
	if d.InitialState == "" {
		return false, fmt.Errorf("no initial state set")
	}

	currentState := d.InitialState
	for _, symbol := range input {
		symbolStr := string(symbol)
		nextState := ""
		for _, t := range d.Transitions {
			if t.FromState == currentState && t.Symbol == symbolStr {
				nextState = t.ToState
				break
			}
		}
		if nextState == "" {
			return false, nil
		}
		currentState = nextState
	}

	return d.States[currentState].IsAccept, nil
}
