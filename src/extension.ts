'use strict'
import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const arendConfig = vscode.workspace.getConfiguration("arend");

  if (!arendConfig.get<boolean>("languageServer.enabled")) {
    const message = "Arend language server is disabled, only syntax highlighting will be available.";
    await vscode.window.showInformationMessage(message);
    return;
  }

  const arendLspPath = arendConfig.get<string>("languageServer.path");
  if (!arendLspPath) {
    const message = "To enable smart editing features for Arend, you need to specify arend.languageServer.path in your settings.";
    await vscode.window.showWarningMessage(message);
    // TODO: provide a link to download?
    return;
  }

  // TODO
}

export function deactivate() {
}
