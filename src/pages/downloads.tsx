// prettier-ignore
import { Button, Card, Text, Image, Grid, useToasts, Spacer, useTheme, useModal, Link, Modal, Snippet, Tag } from '@geist-ui/core';
import dynamicWidth from '@/lib/dynamic-width';
import { useState } from 'react';
import NextLink from 'next/link';

const Download = () => {
  const theme = useTheme();
  const { setToast } = useToasts();
  const integrityModal = useModal();
  const webviewModal = useModal();

  const download = (type: 'x64' | 'arm' | 'web') => {
    switch (type) {
      case 'x64':
        setShasum('testing-x64-shasum');
        integrityModal.setVisible(true);
        setToast({ text: 'This download is not available yet.', delay: 5000, type: 'error' });
        break;
      case 'arm':
        setShasum('testing-arm-shasum');
        integrityModal.setVisible(true);
        setToast({ text: 'This download is not available yet.', delay: 5000, type: 'error' });
        break;
      case 'web':
        webviewModal.setVisible(true);
        break;
    }
  };

  const [gridDirection, setGridDirection] = useState<'row' | 'column' | 'row-reverse' | 'column-reverse'>('row');
  const [gridWidth, setGridWidth] = useState(6);
  const [shasum, setShasum] = useState('');
  const [useMobileMode, setMobileMode] = useState(false);

  dynamicWidth((width) => {
    width < 1200 ? setMobileMode(true) : setMobileMode(false);
    if (width < 950) {
      setGridDirection('column');
      setGridWidth(14);
    } else {
      setGridDirection('row');
      setGridWidth(6);
    }
  });

  return (
    <>
      <div className="text-center" id="overview">
        <Spacer h={3} />
        <Text className="header" h1>
          Give your PC an Upgrade.
        </Text>
        <Spacer />
        <Grid.Container gap={3} direction={gridDirection} alignItems="center" justify="center">
          {useMobileMode ? null : (
            <Grid xs={gridWidth}>
              <Card
                style={{ background: theme.palette.background }}
                hoverable
                paddingTop="40px"
                paddingBottom="10px"
                width="100%"
              >
                <Tag type='success'>Try in your Browser</Tag>
                <Image
                  draggable="false"
                  src="/assets/icons/WEB.png"
                  height="100%"
                  width="170px"
                  alt="Test The OS in Website"
                />
                <Spacer h={.4} />
                <Button
                  type="success"
                  shadow
                  onClick={() => {
                    download('web');
                  }}
                  margin="10px"
                >
                  Open Demo
                </Button>
                <Spacer h={0} />
              </Card>
            </Grid>
          )}
          <Grid xs={gridWidth}>
            <Card
              style={{ background: theme.palette.background }}
              hoverable
              paddingTop="40px"
              paddingBottom="10px"
              width="100%"
            >
              <Tag type="success">For most people</Tag>
              <Spacer h={.4} />
              <Image draggable="false" src="/assets/icons/x64.png" height="100%" width="170px" alt="Download for x64" />
              <Button
                type="success"
                shadow
                onClick={() => {
                  download('x64');
                }}
                margin="10px"
              >
                Download
              </Button>
              <Spacer h={0} />
            </Card>
          </Grid>
          <Grid xs={gridWidth}>
            <Card
              style={{ background: theme.palette.background }}
              hoverable
              paddingTop="40px"
              paddingBottom="10px"
              width="100%"
            >
              <Tag type="success">For small devices</Tag>
              <Spacer h={.4} />
              <Image draggable="false" src="/assets/icons/ARM.png" height="100%" width="170px" alt="Download for arm" />
              <Button
                type="success"
                shadow
                onClick={() => {
                  download('arm');
                }}
                margin="10px"
              >
                Download
              </Button>
              <Spacer h={0} />
            </Card>
          </Grid>
        </Grid.Container>
        <div className="mx-auto" style={{ width: '40%', margin: '40px' }}>
          <Card hoverable className="text-center trouble" style={{ background: theme.palette.accents_1 }}>
            Having trouble? Click{' '}
            <NextLink href="/support">
              <>
                <Link block>here</Link> to get help!
              </>
            </NextLink>
          </Card>
        </div>
      </div>
      <Modal {...integrityModal.bindings}>
        <Modal.Title>Integrity check</Modal.Title>
        <Modal.Subtitle>Check your download's shasum</Modal.Subtitle>
        <Modal.Content>
          <p>This is optional. You can check your download's integrity by comparing with our shasum:</p>
          <Snippet symbol="" text={shasum}></Snippet>
        </Modal.Content>
        <Modal.Action onClick={() => integrityModal.setVisible(false)}>Close</Modal.Action>
      </Modal>
      <Modal {...webviewModal.bindings}>
        <Modal.Title>Web preview</Modal.Title>
        <Modal.Content>
          <p>
            You're about to visit the web demo version of AvdanOS, which is only a proof of concept. Trying the live
            system (no installation required) is strongly recommended to getting the full experience from the operating
            system.
            <br />
            *Live system is currently not available because the system is still under development
          </p>
        </Modal.Content>
        <span>
          <Button mr={1} onClick={() => webviewModal.setVisible(false)}>
            Cancel
          </Button>
          <Button onClick={() => window.location.replace('/demo')} type="success">
            Yes, take me there
          </Button>
        </span>
      </Modal>
      <style jsx>{`
        .trouble {
          background: ${theme.palette.background} !important;
        }
        .trouble:hover {
          background: ${theme.palette.accents_2} !important;
        }
      `}</style>
    </>
  );
};
export default Download;
