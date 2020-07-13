'use strict'
import * as vscode from 'vscode';
import { activateArend } from './startup';
import { fsExists } from './os-utils';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const arendConfig = vscode.workspace.getConfiguration("arend");

  if (!arendConfig.get<boolean>("languageServer.enabled")) {
    const message = "Arend language server is disabled, only syntax highlighting will be available.";
    await vscode.window.showInformationMessage(message);
    return;
  }

  const arendLspPath = arendConfig.get<string>("languageServer.path");
  if (!arendLspPath) {
    const link = "https://github.com/ice1000/arend-language-server/releases/download/v0.1.0/arend-lsp-0.1.0-full.jar";
    const message =
      `To enable smart editing features for Arend, you need to specify arend.languageServer.path in your settings.
You can download it from: ${link}`;
    await vscode.window.showWarningMessage(message);
    return;
  }
  if (!await fsExists(arendLspPath)) {
    const message = "Specified path in arend.languageServer.path is invalid, smart editing features won't be available.";
    await vscode.window.showWarningMessage(message);
    return;
  }

  const initTasks: PromiseLike<void>[] = [];

  initTasks.push(vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    cancellable: false,
    title: "Loading Arend library",
  }, async progress => {
    await activateArend(context, progress, arendConfig);
    return new Promise(resolve => setTimeout(resolve, 5000));
  }));

  await Promise.all(initTasks);
}

export function deactivate() {
}
