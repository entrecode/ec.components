# Interaction 

## Basic Problem

I want C from the machine, but the machine needs A and B first, to then reach C.

Example: I want the entry with id HkQVvpavsZ (C). The system can only resolve entries if it knows from which datamanager (A) and which model (B).

User Interaction Problem: The user does not necessarily know how the system is structured. He has to learn basic rules about the structure of the system to know what to want first, e.g. A+B, to reach his original goal C.

## Goal

The optimal system would be the one that lets the user directly input his goal (C). The system then finds a way to the goal, based on the things that need to be resolved first.

- The user does not have to understand the system to use it!

## Example: actionbar

The actionbar is basically a text input field + a dropdown with options (see vscode command palette for example). At startup, it presents a list of commands with the recently used first. When entering text, the command list is filtered with the query. When a command is selected, it either ends the interaction (goal reached) or starts a new cycle of interactions.

### ec.editor

Now transfering the actionbar to the needs of the ec.editor, the following commands could be shown at start:

- List of Datamanagers
- List of Apps

Thats it? But wait, those commands are only the first level (A) meaning they follow the structure of the system (No prequisite data required). But a goal of the user could be much deeper:

- Edit Model
- Delete Datamanager
- Deploy App
- Create Entry
- List Entries
- List Models

All of the commands above require one or more infos before they can be called. But this should be handled by the system and not the user! It is much more user friendly to let the user define the order of interactions, while the system takes care that it runs correctly. 

Now what happens if the user selects Edit Model for example? The system needs to know the datamanager and the model first. So the system could then prompt the user to select the datamanager first and then the model. When the collection of the required data is complete, the original task (Edit Model) can be called.

## Structuring Interactions

Now, a way of structuring the above ideas must be found. How to determine, if an interaction is ready to be called? In the end, it does NOT directly rely on the interactions that ran before, but just on the data that has been collected. So each interaction needs a validation step that looks at the current data state, to then find a way to resolve missing infos or to edit malformed infos.

Pseudo API: (Goal oriented)

```js

const api = new DataManager();

// finish: returns promise with finished state (=> goal infos are present)
// prepare: return promise with prepared state (before interaction ist started)
// should resolve all infos that are needed when the interaction needs to be started
// interaction.wait will call prepare and then wait for state changes (e.g. user input)
// when the state changes (e.g. user input), the resolve method is called again.

selectDatamanager = new Interaction({
    prepare: (state) => { // must return Promise or Observable with state ready for interaction
        if(!state.datamanagerList) { // no dm nor id nor list given => resolve
            return api.datamanagerList() // always use object assign!
            .then(datamanagerList => Object.assign(state, {datamanagerList}))
        }
    },
    finish: (state) => { // must return Promise or Obversable with correct goal state 
        if(state.datamanagerID) { // id given => resolve
            return api.datamanager(state.datamanagerID)
            .then(datamanager => Object.assign(state, { datamanager }))
        }
        return this.change.filter(state => !!state.datamanager); // change is a obversable
    },
});

selectModel = new Interaction({
    prepare: (state) => {
        if(!state.datamanager) {
            return selectDatamanager.finish(state);            
        }
        if(!state.modelList) {}
    },
    finish: (state) => { // must return Promise or Obversable with correct goal state 
        if(state.modelID) { // only id given => resolve
            return state.datamanager.model(state.modelID)
            .then(model => Object.assign(state, { model }))
        }
        return this.change.filter(state => !!state.model); // change is a obversable
    }
})

// example 
datamanagerList.finish(state).subscribe((state) => {
    const datamanager = state.datamanagerList.getAllItems()[0];
    selectDatamanager.finish(Object.assign(state, { datamanager }))
    .subscribe((state) => {
        // state will now contain datamanager too
    });
})

editModel = new Interaction({
    enter: (state) => {
        if(state.model!) {
            return
        }
    }
})

selectDatamanager(datamanager) {
}



```