import { Note } from '@geist-ui/core';
import Head from 'next/head';

const Page404 = () => {
  return (
    <>
      <Head>
        <title>Page not found</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div style={{ marginLeft: '70px', marginTop: '50px', paddingRight: '30px' }}>
        <h1>404.</h1>
        <h4>This page does not exist.</h4>
        <Note style={{ display: 'inline-block' }} type="warning" label="Tip">
          Join in and <a href="https://github.com/avdan-os">help us</a> out developing an{' '}
          <strong>open-source operating system</strong>.
        </Note>
      </div>
    </>
  );
};
export default Page404;
