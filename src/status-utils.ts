import * as vscode from "vscode";

export async function withSpinningStatus(context: vscode.ExtensionContext, action: (status: Status) => Promise<void>): Promise<void> {
  const status = new StatusBarEntry(context, "Arend");
  status.show();
  await action(status);
  status.dispose();
}

export interface Status {
  /** Updates the message. */
  update(msg: string): void;
}

/**
 * Encapsulates a status bar item.
 */
export class StatusBarEntry implements Status {
  private barItem: vscode.StatusBarItem;
  private prefix?: string;

  constructor(context: vscode.ExtensionContext, prefix?: string) {
    this.prefix = prefix;
    this.barItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    context.subscriptions.push(this.barItem);
  }

  show(): void {
    this.barItem.show();
  }

  update(msg: string): void {
    this.barItem.text = `${this.prefix} ${msg}`;
  }

  dispose(): void {
    this.barItem.dispose();
  }
}