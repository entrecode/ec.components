---
title: Consistency Update
author: felixroos
authorURL: https://github.com/felixroos
authorImageURL: https://avatars2.githubusercontent.com/u/12023032?s=460&v=4
---

This post analyzes properties/inputs/outputs of the most used components ec-crud, ec-entry-form, ec-entry-list and ec-entry-list-pop.

## Legend

- not of interest
- **of interest** > will be described in the demo-doc
- _needs deprecation > kill soon_
- _**N new > new property**_
  
<!--truncate-->

## ec-crud

### Properties

- entryPop
- list
- **loader**
- notifications
- Public route
- Public router 

### Methods
- Public hasMethod
- Private loadEntry
- Public mustReload
- ngOnInit
- Public selectEntry
 
### Inputs

- **config**
- **model**
- selection

### Outputs

- **columnClicked**
- **selected**


## ec-entry-form

### Properties

- Public formService
- notifications
- Public config
- _defaultLoader D > should be called loader everywhere_
- _**loader**_
- Public form
- Public formService
- Public group
- inputs
- notifications

### Methods

- addField
- deleteEntry
- init
- **isEditing**
- Public addField
- **clear**
- **create**
- **edit**
- editValue
- getErrors
- **getValue**
- Protected init
- Protected initGroup
- ngOnChanges
- patchValue
- showLabel
- showSubmitButton
- **submit**

### Inputs

- entry
- model
- _**config**_ > add disableSubmitButton
- debounceTime
- **empty**
- **item**
- lazy
- **loader**
- **silent**
- _submitButton > use config: disableSubmitButton_
- value

### Outputs

- **deleted**
- **changed**
- **ready**
- **submitted**

## ec-entry-list

### Properties

- Public cdr
- **config**
- Public listConfig
- Public route
- Public cdr
- **list**
- Public listConfig
- resourceConfig
- **route**
  
### Methods

- createList
- initFilter
- Protected createList
- **filter**
- initFilterQuery
- ngOnChanges
- update

### Inputs

- **model**
- api
- listResource
- **loader**
- loadWhen
- relation

## entry-list-pop

Most of interest is inherited from pop/modal.

### Properties

- Public cdr
- Public elementRef
- lightModel
- Public modelConfig
- Public popService
- searchbar
- activated
- clickEvent
- Public elementRef

### Methods

- getHeader
- ngOnChanges
- select
- **hide**
- isOutside
- **show**
- **toggle**

### Inputs

- **config**
- **model**
- selection
- active
- **hideOnClickOutside**
- **hideOnEscape**
- type

### Outputs

- **columnClicked**
- **toggle**

## Problem

Most properties/inputs are an implementation detail and do not serve the purpose of documenting the usage of the component. They obfuscate the properties that are actually interesting for the dev.