import * as fs from "fs";
import * as path from "path";
import * as vscode from 'vscode';
import { correctBinName, fsExists } from './os-utils';

export async function findJavaExecutable(rawBinName: string): Promise<string> {
  let binName = correctBinName(rawBinName);

  // First search java.home setting
  let userJavaHome = vscode.workspace.getConfiguration('java').get('home') as string;

  if (userJavaHome != null) {
    let candidate = await findJavaExecutableInJavaHome(userJavaHome, binName);
    if (candidate != null)
      return candidate;
  }

  // Then search each JAVA_HOME
  let envJavaHome = process.env['JAVA_HOME'];

  if (envJavaHome) {
    let candidate = await findJavaExecutableInJavaHome(envJavaHome, binName);
    if (candidate != null)
      return candidate;
  }

  // Then search PATH parts
  if (process.env['PATH']) {
    let pathParts = process.env['PATH'].split(path.delimiter);
    for (let i = 0; i < pathParts.length; i++) {
      let binPath = path.join(pathParts[i], binName);
      if (fs.existsSync(binPath)) {
        return binPath;
      }
    }
  }

  // TODO: warn
  return binName;
}

async function findJavaExecutableInJavaHome(javaHome: string, binName: string): Promise<string> {
  let workspaces = javaHome.split(path.delimiter);

  for (let i = 0; i < workspaces.length; i++) {
    let binPath = path.join(workspaces[i], 'bin', binName);

    if (await fsExists(binPath))
      return binPath;
  }
  return null;
}
