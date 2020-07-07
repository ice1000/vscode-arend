/*
 * See https://github.com/fwcd/vscode-kotlin/blob/master/src/util/osUtils.ts
 */

import * as fs from 'fs';

export function isWindows(): boolean {
  return process.platform === "win32";
}

export function isUnixoid(): boolean {
  let platform = process.platform;
  return platform === "linux"
    || platform === "darwin"
    || platform === "freebsd"
    || platform === "openbsd";
}

export function correctBinName(binName: string): string {
  return binName + ((process.platform === 'win32') ? '.exe' : '');
}

export function correctScriptName(binName: string): string {
  return binName + ((process.platform === 'win32') ? '.bat' : '');
}

export async function fsExists(path: fs.PathLike): Promise<boolean> {
  try {
    await fs.promises.access(path);
    return true;
  } catch {
    return false;
  }
}
