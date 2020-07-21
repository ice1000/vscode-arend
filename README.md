# Arend for VSCode

[![Version](https://img.shields.io/visual-studio-marketplace/v/ice1000.arend)][url]
[![Rating](https://img.shields.io/visual-studio-marketplace/stars/ice1000.arend)][url]
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/ice1000.arend)][url]
[![Installs](https://img.shields.io/visual-studio-marketplace/i/ice1000.arend)][url]

 [url]: https://marketplace.visualstudio.com/items?itemName=ice1000.arend
 [arend-language-server]: https://github.com/ice1000/arend-language-server

This is a non-official VSCode extension for the [Arend] proof assistant,
powered by [arend-language-server].
As the only official editor is IntelliJ IDEA, it's difficult when we want to
enjoy the sweet startup speed of VSCode.

So, I made this for fun.
Syntax highlighting files are taken from [arend-tmbundle].

## Setup

You need a java (version >= 11) installation,
which the plugin will try to find in `PATH`
(lower priority) and `JAVA_HOME` (higher priority).

If something doesn't work, try removing the configuration
`arend.languageServer.path` in your settings.
By doing this, you're enabling the bundled language server.

## Features

+ Goto definition

## Help wanted

This project needs your help!
It needs *an icon*! If you have some idea please don't hesitate to file an issue.

Also, if you've found some features missing in the extension,
feel free to file an issue too.
If you'd like to create a pull request that implements what you wanted,
that's even better!

 [Arend]: https://arend-lang.github.io
 [arend-tmbundle]: https://github.com/arend-lang/arend-tmbundle
