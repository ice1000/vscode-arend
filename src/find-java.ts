import * as fs from "fs";
import * as path from "path";
import * as vscode from 'vscode';
import { correctBinName, fsExists } from './os-utils';

export async function findJavaExecutable(rawBinName: string): Promise<string> {
  const binName = correctBinName(rawBinName);

  // First search java.home setting
  const userJavaHome = vscode.workspace.getConfiguration('java').get('home') as string;

  if (userJavaHome) {
    let candidate = await findJavaExecutableInJavaHome(userJavaHome, binName);
    if (candidate)
      return candidate;
  }

  // Then search each JAVA_HOME
  const envJavaHome = process.env['JAVA_HOME'];

  if (envJavaHome) {
    const candidate = await findJavaExecutableInJavaHome(envJavaHome, binName);
    if (candidate)
      return candidate;
  }

  const sysPath = process.env['PATH'];
  // Then search PATH parts
  if (sysPath) {
    const pathParts = sysPath.split(path.delimiter);
    for (const pathPart of pathParts) {
      const binPath = path.join(pathPart, binName);
      if (fs.existsSync(binPath)) {
        return binPath;
      }
    }
  }

  return binName;
}

async function findJavaExecutableInJavaHome(javaHome: string, binName: string): Promise<string> {
  const workspaces = javaHome.split(path.delimiter);

  for (const workspace of workspaces) {
    const binPath = path.join(workspace, 'bin', binName);

    if (await fsExists(binPath))
      return binPath;
  }
  return null;
}
