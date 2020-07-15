# Arend for VSCode

[![Version](https://img.shields.io/visual-studio-marketplace/v/ice1000.arend)][url]
[![Rating](https://img.shields.io/visual-studio-marketplace/stars/ice1000.arend)][url]
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/ice1000.arend)][url]
[![Installs](https://img.shields.io/visual-studio-marketplace/i/ice1000.arend)][url]

 [url]: https://marketplace.visualstudio.com/items?itemName=ice1000.arend

This is a non-official VSCode extension for the [Arend] proof assistant.
As the only official editor is IntelliJ IDEA, it's difficult when we want to
enjoy the sweet startup speed of VSCode.

So, I made this for fun.
Syntax highlighting files are taken from [arend-tmbundle].

## Setup

You need the [arend-language-server] to make this extension work.

 [arend-language-server]: https://github.com/ice1000/arend-language-server

I'm sorry that currently you need to download it yourself,
from [here](https://github.com/ice1000/arend-language-server/releases/download/v0.1.2/arend-lsp-0.1.2-full.jar),
and put the path to the jar into `arend.languageServer.path`.

This will be improved in the future versions.

Apart from that, you also need a java (version >= 11) installation,
which the plugin will try to find in `PATH` and `JAVA_HOME` (higher priority).

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
