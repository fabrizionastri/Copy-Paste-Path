// extension.js

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const fs = require('fs')
const path = require('path')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "Copy Paste Path" is now active!')

  let copyPath = vscode.commands.registerCommand('extension.copyPath', function () {
    const editor = vscode.window.activeTextEditor
    if (editor) {
      const filePath = editor.document.fileName
      const unixPath = filePath.replace(/\\/g, '/')
      vscode.env.clipboard.writeText(unixPath)
      vscode.window.showInformationMessage('Path copied to clipboard: ' + unixPath)
    }
  })

  let copyPastePath = vscode.commands.registerCommand('extension.copyPastePath', async function () {
    const editor = vscode.window.activeTextEditor
    if (editor) {
      const filePath = editor.document.fileName
      const unixPath = filePath.replace(/\\/g, '/')
      const position = editor.selection.active
      editor.edit(editBuilder => {
        editBuilder.insert(position, unixPath)
      })
    }
  })

  let copyRelativePath = vscode.commands.registerCommand('extension.copyRelativePath', function () {
    const editor = vscode.window.activeTextEditor
    if (editor) {
      const filePath = editor.document.fileName
      const relativePath = vscode.workspace.asRelativePath(filePath)
      const unixPath = relativePath.replace(/\\/g, '/')
      vscode.env.clipboard.writeText(unixPath)
      vscode.window.showInformationMessage('Path copied to clipboard: ' + unixPath)
    }
  })

  let copyPasteRelativePath = vscode.commands.registerCommand('extension.copyPasteRelativePath', async function () {
    const editor = vscode.window.activeTextEditor
    if (editor) {
      const filePath = editor.document.fileName
      const relativePath = vscode.workspace.asRelativePath(filePath)
      const unixPath = relativePath.replace(/\\/g, '/')
      const position = editor.selection.active
      editor.edit(editBuilder => {
        editBuilder.insert(position, unixPath)
      })
    }
  })

  context.subscriptions.push(copyPath, copyPastePath, copyRelativePath, copyPasteRelativePath)
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
}
