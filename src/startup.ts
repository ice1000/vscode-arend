import * as child_process from "child_process";
import * as net from "net";
import * as vscode from 'vscode';
import { LanguageClientOptions, RevealOutputChannelOn } from "vscode-languageclient";
import { LanguageClient, ServerOptions, StreamInfo } from "vscode-languageclient/node";

export async function activateArend(
  context: vscode.ExtensionContext,
  progress: vscode.Progress<{ message?: string; increment?: number }>,
  arendLspPath: string,
  java: string,
) {
  const arendConfig = vscode.workspace.getConfiguration("arend");

  progress.report({ message: "Activating Arend...", increment: 500 });

  const outputChannel = vscode.window.createOutputChannel("Arend");
  context.subscriptions.push(outputChannel);
  outputChannel.appendLine(`Using java from ${java}.`);
  outputChannel.appendLine(`Selected Arend Language Server: ${arendLspPath}`);

  const transportLayer = arendConfig.get("languageServer.transport");
  let tcpPort: number = null;
  let initStatusSuffix: string = null;

  if (transportLayer == "tcp") {
    tcpPort = arendConfig.get("languageServer.port");
    outputChannel.appendLine(`Connecting via TCP, port: ${tcpPort}`);

    if (tcpPort == 0) {
      initStatusSuffix = "via TCP";
    } else {
      initStatusSuffix = `via TCP port ${tcpPort}`;
    }
  } else if (transportLayer == "stdio") {
    outputChannel.appendLine("Connecting via Stdio.");
    initStatusSuffix = "via stdio";
  } else {
    await vscode.window.showErrorMessage(`Unknown transport layer: ${transportLayer}`);
    initStatusSuffix = "via stdio";
  }

  progress.report({ message: `Initializing Arend language server ${initStatusSuffix}...`, increment: 1000 });

  const languageClient = createLanguageClient({
    outputChannel, java, arendLspPath, tcpPort
  });
  let languageClientDisposable = languageClient.start();

  context.subscriptions.push(vscode.commands.registerCommand("arend.languageServer.restart", async () => {
    await languageClient.stop();

    outputChannel.appendLine("");
    outputChannel.appendLine(" === Language Server Restart ===")
    outputChannel.appendLine("");

    languageClientDisposable = languageClient.start();
  }));

  progress.report({ message: "Waiting for typechecking...", increment: 1500 });
}

function createLanguageClient(options: {
  outputChannel: vscode.OutputChannel,
  java: string,
  arendLspPath: string,
  tcpPort?: number,
}): LanguageClient {
  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { language: 'arend', scheme: 'file' },
      // { language: 'arend', scheme: 'als' }
    ],
    synchronize: {
      configurationSection: 'arend',
      // Kotlin TODO: this should be registered from the language server side
      //  ice1000: But how?
      fileEvents: [
        vscode.workspace.createFileSystemWatcher('**/*.ard'),
        vscode.workspace.createFileSystemWatcher('**/*.class'),
        vscode.workspace.createFileSystemWatcher('arend.yaml'),
      ]
    },
    outputChannel: options.outputChannel,
    revealOutputChannelOn: RevealOutputChannelOn.Error
  }

  // Start the child Java process
  let serverOptions: ServerOptions;

  if (options.tcpPort) {
    serverOptions = () => spawnLanguageServerProcessAndConnectViaTcp(options);
  } else {
    serverOptions = {
      command: options.java,
      args: ["-jar", options.arendLspPath],
      options: {
        cwd: vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath,
      }
    }
  }

  return new LanguageClient("arend", "Arend language client", serverOptions, clientOptions);
}

export function spawnLanguageServerProcessAndConnectViaTcp(options: {
  outputChannel: vscode.OutputChannel,
  java: string,
  arendLspPath: string,
  tcpPort?: number
}): Promise<StreamInfo> {
  return new Promise((resolve, reject) => {
    const server = net.createServer(socket => {
      server.close();
      resolve({ reader: socket, writer: socket });
    });
    // Wait for the first client to connect
    server.listen(options.tcpPort, () => {
      const tcpPort = (server.address() as net.AddressInfo).port.toString();
      const proc = child_process.spawn(options.java, ["-jar", options.arendLspPath, "--client-port", tcpPort]);

      const outputCallback = (data: any) => options.outputChannel.append(`${data}`);
      proc.stdout.on("data", outputCallback);
      proc.stderr.on("data", outputCallback);
      proc.on("exit", (code, sig) => options.outputChannel.appendLine(`The language server exited with ${code} (${sig})`));
    });
    server.on("error", e => reject(e));
  });
}
