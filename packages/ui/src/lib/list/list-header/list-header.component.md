# List Header

This document conceptualizes the ec-list-header.

## Idea

The list-header displays the field labels in columns. If a fields are sortable or filterable, a clickeable icons will be shown.

### Filtering

If a field has the option "filterable" set to true, a search icon will be shown. When clicking the icon, an input field will appear above the list header which can be used to filter the list by the field property.

- The input field will be autofocused
- No validation errors should be shown
- When the input value changes, the list will load after a short debounce.
- When the input is closed, the filter will be cleared.
- When another field's search icon is clicked, all previous filters will be cleared.
