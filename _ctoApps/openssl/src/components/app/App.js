import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import CardControl from '../card-control/CardControl';
import CommandLine from '../../components/command-line/CommandLine';
import Command from '../../core/command';
import { useStore } from '../../contexts/store';
import { useTranslation } from 'react-i18next';
import { commandPipe } from '../../core/commandPipe';

import './App.css';

const command = new Command();

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function CardDescription({ close }) {
  const { t } = useTranslation('translation');

  return (
    <Card className="mb-3">
      <Card.Header className="bg-transparent border-bottom-0">
        <button type="button" className="close no-after" onClick={close}>
          <span aria-hidden="true">&times;</span>
        </button>
      </Card.Header>
      <Card.Body className="mt-n5">
        <Card.Text className="mr-4">{t('cardDescription.text')}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function App() {
  const { state, dispatch } = useStore();
  const [output, setOutput] = useState({ stdout: '', stderr: '', files: null });
  const [showDescription, setShowDescription] = useState(true);
  const { t } = useTranslation('translation');

  const runCommand = async (commandInput, commandType = '') => {
    const files = state.files.map((item) => item.file);
    dispatch({ type: 'SET_LOADING', isLoading: true });
    await delay(125);

    let pipe = commandPipe(commandInput);

    if (Object.keys(pipe).length === 1 && Object.keys(pipe).includes('echo')) {
      dispatch({ type: 'SET_LOADING', isLoading: false });
      setOutput({ stdout: pipe.echo, stderr: '', files: null });
      return;
    }

    if (
      Object.keys(pipe).length === 2 &&
      Object.keys(pipe).includes('echo') &&
      !Object.keys(pipe).includes('openssl')
    ) {
      dispatch({ type: 'SET_LOADING', isLoading: false });
      setOutput({ stdout: '', stderr: t('general.unknownCommand'), files: null });
      return;
    }

    if (Object.keys(pipe).includes('openssl')) {
      if (!pipe.openssl) pipe.openssl = 'help';
      switch (commandType) {
        case 'enc':
          await command.run(pipe.openssl, files, pipe.echo ?? '');
          break;
        case 'genrsa':
          await command.run(pipe.openssl, null, null);
          break;
        case 'rsa':
          await command.run(pipe.openssl, files, null);
          break;
        case 'dgst':
          await command.run(pipe.openssl, files, pipe.echo ?? '');
          break;
        default:
          await command.run(pipe.openssl, files, pipe.echo ?? '');
          break;
      }
    } else {
      dispatch({ type: 'SET_LOADING', isLoading: false });
      setOutput({ stdout: '', stderr: t('general.unknownCommand'), files: null });
      return;
    }
  };

  const getOpenSSLVersion = useCallback(async () => {
    const version = await command.getVersion();
    dispatch({ type: 'SET_OPENSSL_VERSION', version });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getAvailableCiphers = useCallback(async () => {
    const ciphers = await command.getCiphers();
    dispatch({ type: 'SET_AVAILABLE_CIPHERS', ciphers: ciphers });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getAvailableDigests = useCallback(async () => {
    const digests = await command.getDigests();
    dispatch({ type: 'SET_AVAILABLE_DIGEST', digests: digests });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getOpenSSLVersion();
    getAvailableCiphers();
    getAvailableDigests();
    const result = command.resultAsObservable.subscribe((value) => {
      if (value) {
        dispatch({ type: 'SET_LOADING', isLoading: false });
        setOutput(value);
        if (value.files && value.files.length) {
          dispatch({
            type: 'ADD_FILES',
            items: value.files.map((x) => ({ file: x, output: true })),
          });
        }
      }
    });

    return () => {
      result.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      {showDescription && (
        <CardDescription close={() => setShowDescription(false)}></CardDescription>
      )}
      <CardControl runCommand={runCommand}></CardControl>
      <CommandLine
        runCommand={runCommand}
        result={{ stdout: output.stdout, stderr: output.stderr }}
      ></CommandLine>
    </div>
  );
}

export default App;
