import React, { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useStore } from '../../contexts/store';

import './CommandLine.css';

function CommandLine({ runCommand, result }) {
  const { t } = useTranslation('translation');
  const { state, dispatch } = useStore();
  const [command, setCommand] = useState('');
  const input = useRef();
  const commandHistory = useRef({
    selectedIndex: -1,
    commands: [],
  });

  useEffect(() => {
    if (state.command) {
      addToCommandHistory(state.command);
    }
  }, [state.command]);

  const addToCommandHistory = (command) => {
    const position = commandHistory.current.commands.findIndex((x) => x === command);

    if (position === -1) {
      commandHistory.current.commands.unshift(command.trim());
    } else {
      commandHistory.current.commands.splice(position, 1);
      commandHistory.current.commands.unshift(command.trim());
    }

    if (commandHistory.current.length > 10) commandHistory.current.commands.pop();
  };

  const isBeforeExeceution = () => {
    return !state.command && !commandHistory.current.commands.length;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input.current.value) {
      dispatch({ type: 'SET_COMMAND', command: input.current.value });
      runCommand(input.current.value);
      setCommand('');
      commandHistory.current.selectedIndex = -1;
    }
  };

  const handleOnChange = (event) => {
    setCommand(event.target.value);
    commandHistory.current.selectedIndex = -1;
  };

  const handleOnKeyDown = (event) => {
    let selectedIndex = commandHistory.current.selectedIndex;
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        selectedIndex += 1;
        if (selectedIndex < 10 && commandHistory.current.commands[selectedIndex]) {
          input.current.value = commandHistory.current.commands[selectedIndex];
          commandHistory.current.selectedIndex = selectedIndex;
        }
        return;
      case 'ArrowDown':
        event.preventDefault();
        selectedIndex -= 1;
        if (selectedIndex >= 0 && commandHistory.current.commands[selectedIndex]) {
          input.current.value = commandHistory.current.commands[selectedIndex];
          commandHistory.current.selectedIndex = selectedIndex;
        }

        if (selectedIndex === -1) {
          input.current.value = command;
          commandHistory.current.selectedIndex = selectedIndex;
        }
        return;
      default:
        return;
    }
  };

  return (
    <div className="CommandLine">
      <div className="CommandLine-output">
        {state.command && <p className="CommandLine-command">{`$ ${state.command}`}</p>}
        {state.isLoading ? (
          <div className="CommandLine-loader">
            <div className="spinner-border text-light" role="status"></div>
          </div>
        ) : (
          <>
            {isBeforeExeceution() && (
              <>
                <span className="mb-3">
                  <Trans
                    i18nKey="commandLine.infoText"
                    components={{ bold: <strong /> }}
                    values={{ version: process.env.REACT_APP_OPENSSL_VERSION }}
                  ></Trans>
                </span>
                <span className="mb-3">
                  <Trans i18nKey="commandLine.usage" components={{ bold: <strong /> }}></Trans>
                </span>
                <span>{t('commandLine.moreInfo')}</span>
                <ul>
                  <li>{t('commandLine.availableCommands')}</li>
                  <li>{t('commandLine.versionInfo')}</li>
                </ul>
              </>
            )}
            {result.stderr && <p>{`${result.stderr}\n`}</p>}
            {result.stdout && <p>{result.stdout}</p>}
          </>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="CommandLine-input">
          <label>$</label>
          <input
            ref={input}
            type="text"
            spellCheck="false"
            value={command}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default CommandLine;
