import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useStore } from '../../../../contexts/store';
import { buildDgst } from '../../../../core/commandBuilder';
import { useTranslation } from 'react-i18next';

import './TabDigest.css';

const ALGORITHMS = [
  'blake2s256',
  'blake2b512',
  'md5',
  'sha1',
  'sha3-224',
  'sha3-256',
  'sha3-384',
  'sha3-512',
  'sha224',
  'sha384',
  'sha256',
  'sha512',
  'sha512-224',
  'sha512-256',
  'shake128',
  'shake256',
  'sm3',
];

function TabDigest({ runCommand }) {
  const { t } = useTranslation('translation');
  const { state, dispatch } = useStore();
  const [validation, setValidation] = useState({
    fileInput: false,
    textInput: false,
    fileOutput: false,
  });
  const [dgst, setDgst] = useState({
    algorithm: ALGORITHMS[0],
    out: false,
    outFile: '',
    text: true,
    textVal: t('tabDigest.inputExampleText'),
    file: false,
    fileVal: '',
  });

  useEffect(() => {
    setDgst((prev) => {
      const hasFile = state.files.find((item) => item.file.name === prev.fileVal);

      return {
        ...prev,
        fileVal: hasFile ? prev.fileVal : '',
      };
    });
  }, [state.files]);

  const set = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    switch (key) {
      case 'file':
        setDgst((prev) => ({ ...prev, [key]: value, text: !value }));
        break;
      case 'fileVal':
        setDgst((prev) => ({ ...prev, [key]: value }));
        setValidation((prev) => ({ ...prev, fileInput: false }));
        break;
      case 'text':
        setDgst((prev) => ({ ...prev, [key]: value, file: !value }));
        break;
      case 'textVal':
        setDgst((prev) => ({ ...prev, [key]: value }));
        setValidation((prev) => ({ ...prev, textInput: false }));
        break;
      case 'out':
        setDgst((prev) => ({ ...prev, [key]: value }));
        setValidation((prev) => ({ ...prev, fileOutput: false }));
        break;
      case 'outFile':
        setDgst((prev) => ({ ...prev, [key]: value.replace(/\s/g, '') }));
        setValidation((prev) => ({ ...prev, fileOutput: false }));
        break;
      default:
        setDgst((prev) => ({ ...prev, [key]: value }));
        break;
    }
  };

  const checkValidation = () => {
    let valid = true;
    if (dgst.file && !dgst.fileVal) {
      setValidation((prev) => ({ ...prev, fileInput: true }));
      valid = false;
    }
    if (dgst.text && !dgst.textVal) {
      setValidation((prev) => ({ ...prev, textInput: true }));
      valid = false;
    }
    if (dgst.out && !dgst.outFile) {
      setValidation((prev) => ({ ...prev, fileOutput: true }));
      valid = false;
    }
    return valid;
  };

  const execute = () => {
    if (checkValidation()) {
      const command = buildDgst(dgst);
      dispatch({ type: 'SET_COMMAND', command: command });
      runCommand(command, 'dgst');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col xs={12} sm={12} md={8} lg={6} xl={5}>
          <Row>
            <Form.Label as={Col} xs={12} sm={3} className="mb-3">
              {t('tabDigest.input')}:
            </Form.Label>
            <Form.Group as={Col} xs={'auto'}>
              <Form.Check
                id="dgst-text"
                type="radio"
                label="Text"
                className="text-nowrap"
                checked={dgst.text}
                onChange={set('text')}
                inline
                custom
              />
            </Form.Group>
            <Form.Group as={Col} xs={'auto'}>
              <Form.Check
                id="dgst-file-in"
                type="radio"
                label={t('tabDigest.file')}
                className="text-nowrap"
                checked={!dgst.text}
                onChange={set('file')}
                inline
                custom
              />
            </Form.Group>
          </Row>
        </Col>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md={10}>
          {dgst.text ? (
            <>
              <Form.Control
                id="dgst-text-in"
                as="textarea"
                placeholder={t('tabDigest.enterTextPlaceholder')}
                value={dgst.textVal}
                rows={2}
                onChange={set('textVal')}
                isInvalid={validation.textInput}
              />
              <Form.Control.Feedback type="invalid">
                {t('validation.noTextInput')}
              </Form.Control.Feedback>
            </>
          ) : (
            <>
              <Form.Control
                as="select"
                value={dgst.fileVal ? dgst.fileVal : '1'}
                onChange={set('fileVal')}
                isInvalid={validation.fileInput}
                custom
              >
                <option value="1" disabled hidden>
                  {t('tabDigest.selectPlaceholder')}
                </option>
                {state.files.map((item) => (
                  <option key={item.file.name}>{item.file.name}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {t('validation.noFileSelected')}
              </Form.Control.Feedback>
            </>
          )}
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md={5} controlId="dgst-algorithm">
          <Form.Label className="mb-2">{t('tabDigest.hashFunction')}</Form.Label>
          <Form.Control as="select" value={dgst.algorithm} onChange={set('algorithm')} custom>
            {ALGORITHMS.map((algorithm) => (
              <option key={algorithm}>{algorithm}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md={5}>
          <Form.Check
            id="dgst-file-out"
            type="checkbox"
            className="mb-2"
            label={t('tabDigest.outputFile')}
            checked={dgst.out}
            onChange={set('out')}
            custom
          />
          <Form.Control
            id="dgst-file-out-name"
            as="input"
            placeholder={t('tabDigest.filenamePlaceholder')}
            value={dgst.outFile}
            onChange={set('outFile')}
            isInvalid={validation.fileOutput}
            disabled={!dgst.out}
          />
          <Form.Control.Feedback type="invalid">
            {t('validation.noFileNameSpecified')}
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Button type="button" onClick={execute} disabled={state.isLoading}>
        {t('general.execute')}
      </Button>
    </Form>
  );
}

export default TabDigest;
