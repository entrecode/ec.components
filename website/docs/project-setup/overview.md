---
id: overview
title: Overview
sidebar_label: Overview
---

The Components aim to help build data management tools quickly, preventing the you (the developer) from implementing everything from scratch. 

## Building Blocks

The most important building blocks are:

- Forms to edit and create data entries
  - Each form fields can have a certain type
  - The field type affects its looks and behaviour
- Lists to display, browse and filter multiple data entries
  - Pagination
  - Filter
- Components that give feedback to the user
  - [Notifications](../components/notifications) (success, error, info etc)
  - [Loaders](../components/loaders) that indicate change
- Components that organize content on the page
  - Modals that can stack on the z-axis
  - Tabs
  - Menus
- Utility functions that are often needed
  - Controling Keyboard Focus
  - Keyboard shortcuts
  - Localization

## Packages

The components are split into multiple packages to seperate concerns. The basic functionality is delivered by the following four packages:

### Main Packages

- [@ec.components/core](https://entrecode.github.io/ec.components/additional-documentation/readme/core-readme.html): contains core typescript classes (no angular/datamanager)
- [@ec.components/ui](https://entrecode.github.io/ec.components/additional-documentation/readme/ui-readme.html): contains core ui components (not datamanager specific)
- [@ec.components/data](https://entrecode.github.io/ec.components/additional-documentation/readme/data-readme.html): contains ui components for [datamanager](https://doc.entrecode.de).
- [@ec.components/style](https://entrecode.github.io/ec.components/additional-documentation/readme/style-readme.html): contains styles for all components, built on [x.ui](https://entrecode.github.io/x.ui/).

### Optional Packages


- [@ec.components/calendar](https://entrecode.github.io/ec.components/additional-documentation/readme/calendar-readme.html): contains calendar components, uses [moment](https://github.com/moment/moment).
- [@ec.components/location](https://entrecode.github.io/ec.components/additional-documentation/readme/location-readme.html): wraps [angular-google-maps](https://github.com/SebastianM/angular-google-maps).
- [@ec.components/tinymce](https://entrecode.github.io/ec.components/additional-documentation/readme/tinymce-readme.html): wraps [tinymce wysiwyg editor](https://github.com/tinymce/tinymce).
- [@ec.components/medium-editor](https://entrecode.github.io/ec.components/additional-documentation/readme/medium-editor-readme.html): wraps [medium wysiwyg editor](https://github.com/yabwe/medium-editor).
- [@ec.components/ace](https://entrecode.github.io/ec.components/additional-documentation/readme/ace-readme.html): wraps [ace code editor](https://github.com/ajaxorg/ace).
