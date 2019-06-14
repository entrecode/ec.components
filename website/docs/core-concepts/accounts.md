---
id: accounts
title: Accounts & Rights
sidebar_label: Accounts & Rights
---

This document is a quick and simplified introduction to the entrecode account systems. For a full description, refer to the entrecode API docs [about the account server](https://doc.entrecode.de/account_server/) and the [user management](https://doc.entrecode.de/data_manager/#user-management).

## Account Systems

The access entrecode API is governed by two types of account systems: Public Users and EC Users.

### Public Users

[Public Users](https://doc.entrecode.de/data_manager/#user-management) only have access to the Public APIs, meaning just model entries and assets. The access is controlled by [Roles](https://doc.entrecode.de/resources/dm-role/) and [Policies](https://doc.entrecode.de/data_manager/#permission-policies).

### EC Users

[EC Users](https://doc.entrecode.de/resources/account/) have access to the Public APIs and all other entrecode "private" APIs like models, datamanagers, apps and more. The access is controlled by [Groups](https://doc.entrecode.de/resources/group/) and Permissions.

## In the Components

The components will decide to hide or show specific UI elements such as delete buttons, based on the current users access rights.

### Methods

The components abstraction of the two account systems is management via methods:

- get: user can read the data entries
- post: user can create new data entries
- put: user can modify existing data entries
- delete: user can delete existing data entries

The available methods for the current user are determined by [AuthService#getAllowedModelMethods](https://github.com/entrecode/ec.components/blob/master/packages/data/src/lib/auth/auth.service.ts#L128) and [AuthService#getAllowedResourceMethods](https://github.com/entrecode/ec.components/blob/master/packages/data/src/lib/auth/auth.service.ts#L89).