'use strict'
import * as vscode from 'vscode';
import { activateArend } from './startup';
import { findArend } from './find-arend';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const arendLspPath = await findArend(context);
  if (!arendLspPath) return;

  const initTasks: PromiseLike<void>[] = [];

  initTasks.push(vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    cancellable: false,
    title: "Loading Arend library",
  }, async progress => {
    await activateArend(context, progress, arendLspPath);
    return new Promise(resolve => setTimeout(resolve, 5000));
  }));

  await Promise.all(initTasks);
}

export function deactivate() {
}
