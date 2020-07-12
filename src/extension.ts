'use strict'
import * as vscode from 'vscode';
import { withSpinningStatus } from './status-utils';
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
    const message = "To enable smart editing features for Arend, you need to specify arend.languageServer.path in your settings.";
    await vscode.window.showWarningMessage(message);
    // TODO: provide a link to download?
    return;
  }
  if (!await fsExists(arendLspPath)) {
    const message = "Specified path in arend.languageServer.path is invalid, smart editing features won't be available.";
    await vscode.window.showWarningMessage(message);
    return;
  }

  const initTasks: Promise<void>[] = [];

  initTasks.push(withSpinningStatus(context, async status => {
    activateArend(context, status, arendConfig);
  }));

  await Promise.all(initTasks);
}

export function deactivate() {
}
