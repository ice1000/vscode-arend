# Change Log

## [Unreleased]

- Upgraded client dependencies
- Upgraded Arend to 1.5 release

## 0.3.2

Note: this will be the last update to support VSCode 1.49.0.

- Upgraded client dependencies
- Upgraded Arend to latest dev (API changed, fixed many many problems)

## 0.3.1

- Fixed another problem on hovering range
- Fixed an NPE reported by user
- Properly handled `NotInScopeError`
- Properly handled `Concrete.ReferenceExpression` as error cause
- Improved inline error length (previously all 1-sized) for many
  error types like `LocalError` and `NotInScopeError`
- Upgraded client dependencies

## 0.3.0

- Upgraded client dependencies
- Upgraded Arend to latest dev (API changed)
- Added command `arend.repl.start`, so you start the Arend repl

## 0.2.9

- Upgraded client dependencies
- Upgraded Arend to latest dev (API changed)
- Report LibraryIOError
- Auto-close and surround with \" in Arend strings
- Handle references in \import commands

## 0.2.8

- Upgraded client dependencies
- Upgraded Arend to latest dev (bug fixes)
- Upgraded Kotlin to 1.4
- Report ParserErrors
- Report unhandled error's javaClass

## 0.2.7

- Upgraded client dependencies
- Upgraded Arend to latest dev (implemented definable metas)

## 0.2.6

- Supported termination error report
- Show ranges of fully-qualified name properly
- Upgraded Arend to latest dev (better definable metas)
- Upgraded client dependencies

## 0.2.5

- Upgraded Arend to latest dev
  (implemented experimental support for definable metas)
- Upgraded client dependencies

## 0.2.4

- Upgraded client dependencies

## 0.2.3

- Upgraded Arend to latest dev

## 0.2.2

- Upgraded Arend to latest dev
- Upgraded client dependencies
- Fixed range of definitions containing fixities

## 0.2.1

- Upgraded Arend to latest dev
- Upgraded client dependencies
- Improved onClick-range for goto-definition
- Added display for local errors (like type errors)

## 0.2.0

- Upgraded Arend to latest dev
- Upgraded client dependencies
- Improved package description
- Bundled the language server jar to the extension

## 0.1.3

- Upgraded Arend to latest dev
- Fixed position of definitions

## 0.1.2

- Fixed reloading for source modules, currently doesn't work with tests
- Internal refactoring, hopefully make compilation faster
- Logging improvements

## 0.1.1

- Fixed a major range problem in goto definition
- Improved symbol searching performance by shrinking the search space drastically
- Added initial support for module reloading (on save), it doesn't work though
- Updated bundled Arend to the current latest (2020-07-15)
- Updated a bunch of extension dependencies

## 0.1.0

- Added goto definition support (not for meta and prelude)
- Improved project loading task bar
- Updated dependencies to fix vulnerability
- Added commands and configurations

## 0.0.2

- Add badges to README
- Markdown support
- Initial configuration, not taking any effect yet

## 0.0.1

- Basic syntax highlighting
