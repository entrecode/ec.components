# Changelog

<a name="1.0.0">

BREAKING CHANGES:

* list.component (and all extending components): renamed select output to columnClicked. (Global replace "(select)" to "(columnClicked)").
* month.component: renamed select output to dayClicked (similar to list.component)

<a name="0.9.0"></a>

## 0.9.0

* added use method to selection.component to write the model from outside
  BREAKING CHANGES:
* ecPublicAsset has been renamed to ecAsset and now supports direct id binding to directive.

<a name="0.8.2"></a>

## 0.8.2

* added ec-toggle to default inputs (use view: 'toggle' in field config)
* added ec-calendar
* system fields (id, created, modified etc) are now readOnly by default

<a name="0.8.1"></a>

## 0.8.1

* added ec-entry-pop

<a name="0.8.0"></a>

## 0.8.0

BREAKING CHANGES:

* removed PublicService and AdminService, you should use sdk methods instead.
* login/signup + more auth methods have been moved from SdkService to new AuthService
* former ec-login has been renamed to ec-login-form, the new ec-login handles login automatically.
* crud methods have been renamend to 'get', 'put', 'post', 'delete'
* ec-entry and ec-entries are now directives ecEntry and ecEntries

<a name="0.7.0"></a>

## 0.7.0

BREAKING CHANGES:

* pop classes have been completely changed to:
  * .ec-pop_fullscreen
  * .ec-pop_dialog
  * .ec-pop_drawer-left
  * .ec-pop_drawer-top
  * .ec-pop_drawer-right
  * .ec-pop_drawer-bottom
  * .ec-pop_toast-top
  * .ec-pop_toast-bottom
* added @ec.components/style package

<a name="0.6.0"></a>

## 0.6.0

* EntryFormComponent.deleteEntry now returns the deletion promise.
* fix: SdkService.ready promise was not renewed after login
* LoginComponent now accepts a loader as input
  BREAKING CHANGES:
* FormComponent.submitted now emits the instance of Form and not the group

<a name="0.5.3"></a>

## 0.5.3

* feature: asset-select is now capable of using ngModel with two way binding

<a name="0.5.2"></a>

## 0.5.2

* removed DataRoutingModule from DataModule
* feature: asset-select can now resolve assetID's.
* feature: added filterPopClass config option to field-property-config.
* further styling

<a name="0.5.1"></a>

## 0.5.1

* further styling
* fix: could not set custom inputs/outputs for entry fields
* now using ec.sdk 0.8.6

<a name="0.5.0"></a>

## 0.5.0

* further styling
  BREAKING CHANGES:
* view: 'label' must now be view: 'tag'
* view: 'labels' must now be view: 'tags'
* selection is now a direct input of ec-crud instead of a config property

<a name="0.4.1"></a>

## 0.4.1

* fixed tests after refactoring
* wrote project setup tutorial
* further styling

<a name="0.4.0"></a>

## 0.4.0

* now using ec.sdk 0.8.5

BREAKING CHANGES:

* all imports from '@ec.components/_/_' must now lead to '@ec.components/_/src/_'
* imports from '@ec.components/\*' can stay the same and should generally be preferred.

<a name="0.3.1"></a>

## 0.3.1

* refactored typings to be aot compatible
* refactored imports
* began styling

<a name="0.3.0"></a>

## 0.3.0

* now using ec.sdk 0.8.1
* now supporting default routes for filtering and more
* AssetInput is now default for asset/assets fields

<a name="0.2.0"></a>

## 0.2.0

* now using ec.sdk 0.7.1
* entry-form now supports lvl1 entries even with nested resources
* ec-datetime now supports iso dates

<a name="0.1.1"></a>

## 0.1.1

* changed src folder and module structure
* ec-model-list
* ec-asset-select
* ec-upload
* ec-datetime input

<a name="0.1.0"></a>

## 0.1.0 (2017-08-23)

* the most important basic components are now implemented
* dynamic input/output templates
* ec-entry, ec-entries
* added demo with multiple routes
* ec-form
* much more

<a name="0.0.2"></a>

## 0.0.2 (2017-05-11)

* improved list
* improved imports

<a name="0.0.1"></a>

## 0.0.1 (2017-05-10)

* initial release
