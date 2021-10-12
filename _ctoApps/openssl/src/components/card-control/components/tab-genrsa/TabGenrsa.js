import { useState, useEffect } from 'react';
import { Button, ButtonGroup, Col, Dropdown, Form } from 'react-bootstrap';
import { useStore } from '../../../../contexts/store';
import { buildGenrsa, buildRsa } from '../../../../core/commandBuilder';
import { useTranslation } from 'react-i18next';
import { downloadFile } from '../../../../utils/downloadFile';

import './TabGenrsa.css';

const NUMBITS = ['1024', '2048', '4096'];
const FILENAME = 'my_rsa.pem';

function TabGenrsa({ runCommand }) {
  const { t } = useTranslation('translation');
  const { state, dispatch } = useStore();
  const [validation, setValidation] = useState({
    fileOutput: false,
  });

  const [genrsa, setGenrsa] = useState({
    outFile: FILENAME,
    numbits: NUMBITS[1],
  });

  const [privateKey, setPrivateKey] = useState(null);
  const [publicKey, setPublicKey] = useState(null);

  const [isPrivateKey, setIsPrivateKey] = useState(null);
  const [isPublicKey, setIsPublicKey] = useState(null);

  const [disableInput, setDisableInput] = useState(false);

  useEffect(() => {
    setIsPrivateKey(!!state.files?.find((item) => item.file.name === privateKey));
    setIsPublicKey(!!state.files?.find((item) => item.file.name === publicKey));
  }, [state.files]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    switch (key) {
      case 'outFile':
        setGenrsa((prev) => ({ ...prev, [key]: value.replace(/\s/g, '') }));
        setValidation((prev) => ({ ...prev, fileOutput: false }));
        break;
      default:
        setGenrsa((prev) => ({ ...prev, [key]: value }));
        break;
    }
  };

  const checkValidation = () => {
    let valid = true;
    if (!genrsa.outFile) {
      setValidation((prev) => ({ ...prev, fileOutput: true }));
      valid = false;
    }
    return valid;
  };

  const execute = () => {
    if (checkValidation()) {
      setIsPrivateKey(false);
      setIsPublicKey(false);
      setPublicKey(null);

      const command = buildGenrsa(genrsa);
      setPrivateKey(genrsa.outFile);
      dispatch({ type: 'SET_COMMAND', command: command });
      runCommand(command, 'genrsa');
    }
  };

  const generatePublicKey = () => {
    const rsaArguments = {
      pubin: false,
      in: privateKey,
      pubout: true,
      out: true,
      outFile: privateKey.replace(/\.([^.]*)$/, '').concat('.pub'),
    };

    const command = buildRsa(rsaArguments);
    setPublicKey(rsaArguments.outFile);
    dispatch({ type: 'SET_COMMAND', command: command });
    runCommand(command, 'rsa');
  };

  const showKey = (key) => {
    const rsaArguments = {
      pubin: key === publicKey,
      in: key,
      pubout: false,
      out: false,
      outFile: '',
      text: false,
      noout: false,
    };
    const command = buildRsa(rsaArguments);

    dispatch({ type: 'SET_COMMAND', command: command });
    runCommand(command, 'rsa');
  };

  const showKeyComponents = (key) => {
    const rsaArguments = {
      pubin: key === publicKey,
      in: key,
      pubout: false,
      out: false,
      outFile: '',
      text: true,
      noout: true,
    };
    const command = buildRsa(rsaArguments);

    dispatch({ type: 'SET_COMMAND', command: command });
    runCommand(command, 'rsa');
  };

  const downloadKey = (key) => {
    const item = state.files?.find((item) => item.file.name === key);
    downloadFile(item.file, item.file.name, null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md={5} controlId="genrsa-file-name">
          <Form.Label className="mb-2">{t('tabGenrsa.outputFile')}</Form.Label>
          <Form.Control
            as="input"
            placeholder={t('tabGenrsa.filenamePlaceholder')}
            value={genrsa.outFile}
            onChange={set('outFile')}
            isInvalid={validation.fileOutput}
            disabled={disableInput}
          />
          <Form.Control.Feedback type="invalid">
            {t('validation.noTextInput')}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={5} controlId="genrsa-numbits">
          <Form.Label className="mb-2">{t('tabGenrsa.keyLength')}</Form.Label>
          <Form.Control
            as="select"
            value={genrsa.numbits}
            onChange={set('numbits')}
            disabled={disableInput}
            custom
          >
            {NUMBITS.map((numbits) => (
              <option key={numbits} value={numbits}>{`${numbits}-bit`}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group className="mb-md-0" as={Col} xs={'auto'}>
          <Button type="button" onClick={execute} disabled={state.isLoading}>
            {t('general.execute')}
          </Button>
        </Form.Group>
        {isPrivateKey && (
          <>
            <Form.Group className="mb-md-0" as={Col} xs={'auto'}>
              <Dropdown as={ButtonGroup} onToggle={() => setDisableInput((prev) => !prev)}>
                <Button onClick={() => showKey(privateKey)}>{t('tabGenrsa.privateKey')}</Button>
                <Dropdown.Toggle split />
                <Dropdown.Menu>
                  <Dropdown.Header>{privateKey}</Dropdown.Header>
                  <Dropdown.Item onClick={() => downloadKey(privateKey)}>
                    {t('tabGenrsa.download')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => showKeyComponents(privateKey)}>
                    {t('tabGenrsa.information')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-md-0" as={Col} xs={'auto'}>
              <Dropdown as={ButtonGroup} onToggle={() => setDisableInput((prev) => !prev)}>
                <Button onClick={() => showKey(publicKey)} disabled={!publicKey}>
                  {t('tabGenrsa.publicKey')}
                </Button>
                <Dropdown.Toggle split />
                <Dropdown.Menu>
                  {!isPublicKey ? (
                    <Dropdown.Item onClick={generatePublicKey}>
                      {t('tabGenrsa.generate')}
                    </Dropdown.Item>
                  ) : (
                    <>
                      <Dropdown.Header>{publicKey}</Dropdown.Header>
                      <Dropdown.Item onClick={() => downloadKey(publicKey)}>
                        {t('tabGenrsa.download')}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => showKeyComponents(publicKey)}>
                        {t('tabGenrsa.information')}
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </>
        )}
      </Form.Row>
    </Form>
  );
}

export default TabGenrsa;
