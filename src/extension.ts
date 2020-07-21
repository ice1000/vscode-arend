'use strict'
import * as vscode from 'vscode';
import { activateArend } from './startup';
import { fsExists } from './os-utils';
import { join } from 'path';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const arendConfig = vscode.workspace.getConfiguration("arend");

  if (!arendConfig.get<boolean>("languageServer.enabled")) {
    const message = "Arend language server is disabled, only syntax highlighting will be available.";
    await vscode.window.showInformationMessage(message);
    return;
  }

  let arendLspPath = arendConfig.get<string>("languageServer.path");
  if (!arendLspPath || !await fsExists(arendLspPath)) {
    arendLspPath = context.asAbsolutePath("lsp.jar");
  }
  if (!await fsExists(arendLspPath)) {
    const message = `Specified path in ${arendLspPath} is invalid, smart editing features won't be available.`;
    await vscode.window.showWarningMessage(message);
    return;
  }

  const initTasks: PromiseLike<void>[] = [];

  initTasks.push(vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    cancellable: false,
    title: "Loading Arend library",
  }, async progress => {
    await activateArend(context, progress, arendConfig, arendLspPath);
    return new Promise(resolve => setTimeout(resolve, 5000));
  }));

  await Promise.all(initTasks);
}

export function deactivate() {
}
