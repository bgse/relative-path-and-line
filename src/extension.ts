'use strict';
import * as vscode from 'vscode';
import copypaste = require('copy-paste');

export function activate(context: vscode.ExtensionContext) {

    console.log('Extension "relative-path-and-line" is now active!');

    // command to copy workspace relative path of active file
    let relPathCopy = vscode.commands.registerCommand('relative-path-and-line.copyRelativePath', () => {

        if(!vscode.workspace.rootPath) {
            // notify the user nothing can be done without open folder
            vscode.window.showErrorMessage('No folder opened, cannot do anything.');
            return;            
        }
        // Get the current text editor
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            // notify the user nothing can be done without active editor
            vscode.window.showErrorMessage('No active editor found, cannot do anything.');
            return;
        }

        let doc = editor.document;

        if(doc.isUntitled) {
            // notify the user nothing can be done when file isn't saved yet
            vscode.window.showErrorMessage('Active file not saved yet, cannot do anything.');
            return;
        }

        // get workspace relative path
        let relPath = vscode.workspace.asRelativePath(doc.fileName);

        copypaste.copy(relPath, res => {
            if(res != null) {
                // something went wrong...
                vscode.window.showErrorMessage('Could not copy: '+res);
            }
        });
    });

    // command to copy workspace relative path and line number of active file
    let relPathAndLineCopy = vscode.commands.registerCommand('relative-path-and-line.copyRelativePathAndLine', () => {

        if(!vscode.workspace.rootPath) {
            // notify the user nothing can be done without open folder
            vscode.window.showErrorMessage('No folder opened, cannot do anything.');
            return;            
        }

        // Get the current text editor
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            // notify the user nothing can be done without active editor
            vscode.window.showErrorMessage('No active editor found, cannot do anything.');
            return;
        }

        let doc = editor.document;

        if(doc.isUntitled) {
            // notify the user nothing can be done when file isn't saved yet
            vscode.window.showErrorMessage('Active file not saved yet, cannot do anything.');
            return;
        }

        // get workspace relative path
        let relPath = vscode.workspace.asRelativePath(doc.fileName);

        // get cursor line number, zero index so add 1
        let cursorLinePos = editor.selection.active.line + 1;

        let copyPathLine = relPath + ':' + cursorLinePos;

        copypaste.copy(copyPathLine, res => {
            if(res != null) {
                // something went wrong...
                vscode.window.showErrorMessage('Could not copy: '+res);
            }
        });
    });

    context.subscriptions.push(relPathCopy);
    context.subscriptions.push(relPathAndLineCopy);
}

export function deactivate() {
}