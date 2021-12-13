import { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  InputGroup,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { useStore } from '../../../../contexts/store';
import { buildEnc } from '../../../../core/commandBuilder';
import { useTranslation } from 'react-i18next';

import './TabEncryption.css';

function TabEncryption({ runCommand }) {
  const { t } = useTranslation('translation');
  const { state, dispatch } = useStore();
  const [validation, setValidation] = useState({
    fileInput: false,
    fileOutput: false,
    passphrase: false,
    initVector: false,
    textInput: false,
  });
  const [enc, setEnc] = useState({
    e: true,
    d: false,
    cipher: '',
    in: false,
    inFile: '',
    out: false,
    outFile: '',
    k: true,
    kVal: 'my_passphrase',
    kfile: false,
    kValFile: '',
    pbkdf2: true,
    nosalt: false,
    iv: false,
    ivVal: '',
    a: false,
    text: true,
    textVal: t('tabEncryption.inputExampleText'),
  });

  useEffect(() => {
    setEnc((prev) => {
      const hasInFile = state.files.find((item) => item.file.name === prev.inFile);
      const hasKValFile = state.files.find((item) => item.file.name === prev.kValFile);

      return {
        ...prev,
        inFile: hasInFile ? prev.inFile : '',
        kValFile: hasKValFile ? prev.kValFile : '',
      };
    });
  }, [state.files]);

  useEffect(() => {
    setEnc((prev) => {
      return {
        ...prev,
        cipher: state.availableCiphers[0],
      };
    });
  }, [state.availableCiphers]);

  const set = (key) => (event) => {
    const value =
      event.target.type === 'checkbox' || event.target.type === 'radio'
        ? event.target.checked
        : event.target.value;
    switch (key) {
      case 'e':
        setEnc((prev) => ({ ...prev, [key]: value, d: !value }));
        break;
      case 'd':
        setEnc((prev) => ({ ...prev, [key]: value, e: !value }));
        break;
      case 'in':
        setEnc((prev) => ({ ...prev, [key]: value, text: !value }));
        setValidation((prev) => ({
          ...prev,
          textInput: false,
          fileInput: false,
          fileOutput: false,
        }));
        break;
      case 'inFile':
        setEnc((prev) => ({ ...prev, [key]: value }));
        setValidation((prev) => ({ ...prev, fileInput: false }));
        break;
      case 'out':
        setEnc((prev) => ({ ...prev, [key]: value }));
        setValidation((prev) => ({ ...prev, fileOutput: false }));
        break;
      case 'outFile':
        setEnc((prev) => ({ ...prev, [key]: value.replace(/\s/g, '') }));
        setValidation((prev) => ({ ...prev, fileOutput: false }));
        break;
      case 'k':
        setEnc((prev) => ({ ...prev, [key]: value, kfile: !value, kValFile: '' }));
        setValidation((prev) => ({ ...prev, passphrase: false }));
        break;
      case 'kVal':
        setEnc((prev) => ({ ...prev, [key]: value.replace(/\s/g, '') }));
        setValidation((prev) => ({ ...prev, passphrase: false }));
        break;
      case 'kfile':
        setEnc((prev) => ({ ...prev, [key]: value, k: !value }));
        setValidation((prev) => ({ ...prev, passphrase: false }));
        break;
      case 'kValFile':
        setEnc((prev) => ({ ...prev, [key]: value }));
        setValidation((prev) => ({ ...prev, passphrase: false }));
        break;
      case 'iv':
        setEnc((prev) => ({ ...prev, [key]: value }));
        setValidation((prev) => ({ ...prev, initVector: false }));
        break;
      case 'ivVal':
        setEnc((prev) => ({ ...prev, [key]: value.replace(/\s/g, '') }));
        setValidation((prev) => ({ ...prev, initVector: false }));
        break;
      case 'text':
        setEnc((prev) => ({ ...prev, [key]: value, in: !value }));
        setValidation((prev) => ({
          ...prev,
          textInput: false,
          fileInput: false,
          fileOutput: false,
        }));
        break;
      case 'textVal':
        setEnc((prev) => ({ ...prev, [key]: value }));
        setValidation((prev) => ({ ...prev, textInput: false }));
        break;
      case 'pbkdf2':
        setEnc((prev) => ({ ...prev, [key]: !enc.pbkdf2 }));
        break;
      case 'nosalt':
        setEnc((prev) => ({ ...prev, [key]: value }));
        break;
      default:
        setEnc((prev) => ({ ...prev, [key]: value }));
        break;
    }
  };

  const checkValidation = () => {
    let valid = true;
    if (enc.in && !enc.inFile) {
      setValidation((prev) => ({ ...prev, fileInput: true }));
      valid = false;
    }
    if (enc.out && !enc.outFile) {
      setValidation((prev) => ({ ...prev, fileOutput: true }));
      valid = false;
    }
    if (enc.k && !enc.kVal) {
      setValidation((prev) => ({ ...prev, passphrase: true }));
      valid = false;
    }
    if (enc.kfile && !enc.kValFile) {
      setValidation((prev) => ({ ...prev, passphrase: true }));
      valid = false;
    }
    if (enc.iv && !enc.ivVal) {
      setValidation((prev) => ({ ...prev, initVector: true }));
      valid = false;
    }
    if (enc.text && !enc.textVal) {
      setValidation((prev) => ({ ...prev, textInput: true }));
      valid = false;
    }
    return valid;
  };

  const execute = () => {
    if (checkValidation()) {
      const command = buildEnc(enc);
      dispatch({ type: 'SET_COMMAND', command: command });
      runCommand(command, 'enc');
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
              {t('tabEncryption.mode')}:
            </Form.Label>
            <Form.Group as={Col} xs={6} sm={4} md={4} lg={4} xl={4}>
              <Form.Check
                id="enc-encrypt"
                type="radio"
                label={t('tabEncryption.encrypt')}
                className="text-nowrap"
                checked={enc.e}
                onChange={set('e')}
                inline
                custom
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} sm={3}>
              <Form.Check
                id="enc-decrypt"
                type="radio"
                label={t('tabEncryption.decrypt')}
                className="text-nowrap"
                checked={!enc.e}
                onChange={set('d')}
                inline
                custom
              />
            </Form.Group>
          </Row>
        </Col>
      </Form.Row>
      <hr className="mt-0 mb-3" />
      <Form.Row>
        <Col xs={12} sm={12} md={8} lg={6} xl={5}>
          <Row>
            <Form.Label as={Col} xs={12} sm={3} className="mb-3">
              {t('tabEncryption.input')}:
            </Form.Label>
            <Form.Group as={Col} xs={6} sm={4} md={4} lg={4} xl={4}>
              <Form.Check
                id="enc-text"
                type="radio"
                label="Text"
                className="text-nowrap"
                checked={enc.text}
                onChange={set('text')}
                inline
                custom
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} sm={3}>
              <Form.Check
                id="enc-file-in"
                type="radio"
                label={t('tabEncryption.file')}
                className="text-nowrap"
                checked={!enc.text}
                onChange={set('in')}
                inline
                custom
              />
            </Form.Group>
          </Row>
        </Col>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md={10}>
          {enc.text ? (
            <>
              <Form.Control
                id="enc-text-in"
                as="textarea"
                placeholder={t('tabEncryption.enterTextPlaceholder')}
                value={enc.textVal}
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
                value={enc.inFile ? enc.inFile : '1'}
                onChange={set('inFile')}
                isInvalid={validation.fileInput}
                disabled={enc.text}
                custom
              >
                <option value="1" disabled hidden>
                  {t('tabEncryption.selectPlaceholder')}
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
        <Form.Group as={Col} md={5} controlId="enc-cipher">
          <Form.Label className="mb-2">{t('tabEncryption.cipher')}</Form.Label>
          <Form.Control as="select" value={enc.cipher} onChange={set('cipher')} custom>
            {state.availableCiphers.map((cipher) => (
              <option key={cipher}>{cipher}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md={5}>
          <Form.Check
            id="enc-file-out"
            type="checkbox"
            className="mb-2"
            label={t('tabEncryption.outputFile')}
            checked={enc.out}
            onChange={set('out')}
            custom
          />
          <InputGroup>
            <Form.Control
              id="enc-file-out-name"
              as="input"
              placeholder={t('tabEncryption.filenamePlaceholder')}
              value={enc.outFile}
              onChange={set('outFile')}
              isInvalid={validation.fileOutput}
              disabled={!enc.out}
            />
            <InputGroup.Append>
              <ButtonGroup toggle>
                <ToggleButton
                  type="checkbox"
                  variant="secondary"
                  value="1"
                  checked={enc.a}
                  onChange={set('a')}
                  disabled={!enc.out}
                >
                  Base64
                </ToggleButton>
              </ButtonGroup>
            </InputGroup.Append>
            <Form.Control.Feedback type="invalid">
              {t('validation.noFileNameSpecified')}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md={5} lg={5} controlId="enc-passphrase">
          <Form.Label className="mb-2">
            {enc.k ? 'Passphrase' : t('tabEncryption.passphraseOrigin')}
          </Form.Label>
          <InputGroup>
            {enc.k ? (
              <Form.Control
                as="input"
                placeholder={t('tabEncryption.inputPlaceHolder')}
                value={enc.kVal}
                onChange={set('kVal')}
                isInvalid={validation.passphrase}
              />
            ) : (
              <>
                <Form.Control
                  as="select"
                  value={enc.kValFile ? enc.kValFile : '1'}
                  onChange={set('kValFile')}
                  isInvalid={validation.passphrase}
                  custom
                >
                  <option value="1" disabled hidden>
                    {t('tabEncryption.selectPlaceholder')}
                  </option>
                  {state.files.map((item) => (
                    <option key={item.file.name}>{item.file.name}</option>
                  ))}
                </Form.Control>
              </>
            )}
            <InputGroup.Append>
              <ToggleButtonGroup type="radio" name="passphrase-options" defaultValue="1">
                <ToggleButton variant="secondary" value="1" onChange={set('k')}>
                  Text
                </ToggleButton>
                <ToggleButton variant="secondary" value="2" onChange={set('kfile')}>
                  {t('tabEncryption.file')}
                </ToggleButton>
              </ToggleButtonGroup>
            </InputGroup.Append>
            <Form.Control.Feedback type="invalid">
              {t('validation.noPassphraseSpecified')}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md={5} lg={5}>
          <Form.Check
            id="enc-initvector"
            type="checkbox"
            className="mb-2"
            label={t('tabEncryption.initializationVector')}
            checked={enc.iv}
            onChange={set('iv')}
            custom
          />
          <Form.Control
            id="enc-initvector-in"
            as="input"
            placeholder={t('tabEncryption.hexValue')}
            value={enc.ivVal}
            onChange={set('ivVal')}
            disabled={!enc.iv}
            isInvalid={validation.initVector}
          />
          <Form.Control.Feedback type="invalid">
            {t('validation.noValueSpecified')}
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs={'auto'} className="mr-4 mb-0">
          <Form.Label>{t('tabEncryption.keyDerivationFunction')}:</Form.Label>
        </Form.Group>
        <Form.Group as={Col} xs={'auto'}>
          <Form.Check
            id="enc-kdf-default"
            type="radio"
            label={t('tabEncryption.default')}
            className="text-nowrap mr-5"
            checked={!enc.pbkdf2}
            onChange={set('pbkdf2')}
            inline
            custom
          />

          <Form.Check
            id="enc-pbkdf"
            type="radio"
            label="PBKDF2"
            className="text-nowrap mr-5"
            checked={enc.pbkdf2}
            onChange={set('pbkdf2')}
            inline
            custom
          />

          <Form.Check
            id="enc-salt"
            type="checkbox"
            label={t('tabEncryption.noSalt')}
            className="text-nowrap mr-0"
            checked={enc.nosalt}
            onChange={set('nosalt')}
            inline
            custom
          />
        </Form.Group>
      </Form.Row>
      <Button type="button" onClick={execute} disabled={state.isLoading}>
        {t('general.execute')}
      </Button>
    </Form>
  );
}

export default TabEncryption;
