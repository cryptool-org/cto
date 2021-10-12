import { Card, Nav, Tab } from 'react-bootstrap';
import TabGenrsa from './components/tab-genrsa/TabGenrsa';
import TabEncryption from './components/tab-encryption/TabEncryption';
import TabDigest from './components/tab-digest/TabDigest';
import TabFiles from './components/tab-files/TabFiles';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../contexts/store';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import './CardControl.css';

function CardControl({ runCommand }) {
  const { t } = useTranslation('translation');
  const { state } = useStore();
  const [tabKey, setTabKey] = useState('');
  const [newFileAdded, setNewFileAdded] = useState(false);
  const lastIndex = useRef(0);

  const isMedium = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    const lastItem = state.files[state.files.length - 1];
    if (lastItem?.output && state.files.length >= lastIndex.current && tabKey !== 'files') {
      setNewFileAdded(true);
    }
    lastIndex.current = state.files.length;
  }, [state.files]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (tabKey === 'files') setNewFileAdded(false);
  }, [tabKey]);

  return (
    <Tab.Container defaultActiveKey="encryption" onSelect={(k) => setTabKey(k)}>
      <Card className="mb-3">
        <Card.Header>
          <Nav className="flex-column flex-md-row" variant={isMedium ? 'pills' : 'tabs'}>
            <Nav.Item>
              <Nav.Link eventKey="encryption">{t('tabEncryption.name')}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="digest">Hashes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="genrsa">{t('tabGenrsa.name')}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="files">
                {t('tabFiles.name')}
                {newFileAdded && '*'}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Tab.Content>
            <Tab.Pane eventKey="encryption">
              <TabEncryption runCommand={runCommand}></TabEncryption>
            </Tab.Pane>
            <Tab.Pane eventKey="genrsa">
              <TabGenrsa runCommand={runCommand}></TabGenrsa>
            </Tab.Pane>
            <Tab.Pane eventKey="digest">
              <TabDigest runCommand={runCommand}></TabDigest>
            </Tab.Pane>
            <Tab.Pane eventKey="files">
              <TabFiles></TabFiles>
            </Tab.Pane>
          </Tab.Content>
        </Card.Body>
      </Card>
    </Tab.Container>
  );
}

export default CardControl;
