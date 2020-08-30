'use strict'
import * as vscode from 'vscode';
import { activateArend } from './startup';
import { findArend } from './find-arend';
import { findJavaExecutable } from './find-java';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const arendLspPath = await findArend(context);
  if (!arendLspPath) return;

  const java = await findJavaExecutable("java");
  if (!java) {
    await vscode.window.showErrorMessage("Couldn't locate java in $JAVA_HOME or $PATH, please install java.");
    return;
  }

  context.subscriptions.push(vscode.commands.registerCommand("arend.repl.start", () => {
    const term = vscode.window.createTerminal({
      name: "Arend REPL",
      cwd: vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath,
      hideFromUser: false,
      shellPath: java,
      shellArgs: ["-jar", arendLspPath, "-i"],
    });
    term.show(true);
  }));

  const initTasks: PromiseLike<void>[] = [];

  initTasks.push(vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    cancellable: false,
    title: "Loading Arend library",
  }, async progress => {
    await activateArend(context, progress, arendLspPath, java);
    return new Promise(resolve => setTimeout(resolve, 5000));
  }));

  await Promise.all(initTasks);
}

export function deactivate() {
}
