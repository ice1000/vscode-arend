'use strict'
import * as vscode from 'vscode';
import { fsExists } from './os-utils';

export async function findArend(context: vscode.ExtensionContext): Promise<string | null> {
  const arendConfig = vscode.workspace.getConfiguration("arend");

  if (!arendConfig.get<boolean>("languageServer.enabled")) {
    const message = "Arend language server is disabled, only syntax highlighting will be available.";
    await vscode.window.showInformationMessage(message);
    return null;
  }

  let arendLspPath = arendConfig.get<string>("languageServer.path");
  if (!arendLspPath) {
    if (!await fsExists(arendLspPath)) {
      const message = `Specified path ${arendLspPath} is invalid, using default language server.`;
      arendLspPath = context.asAbsolutePath("lsp.jar");
      vscode.window.showInformationMessage(message);
    } else {
      const message = `Using custom arend language server ${arendLspPath}.`;
      vscode.window.showInformationMessage(message);
    }
  }
  if (!await fsExists(arendLspPath)) {
    const message = `Specified path in ${arendLspPath} is invalid, smart editing features won't be available.`;
    await vscode.window.showWarningMessage(message);
    return null;
  } else return arendLspPath;
}