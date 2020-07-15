import { Tests } from 'test/lib/tests';

describe('Welcome modal', () => {
  const tests = new Tests('welcome-modal', true);
  tests.runHooks(false, false);
  tests.waitForWindowReady();

  it('Open window with Mockoon title', async () => {
    await tests.app.webContents.getTitle().should.eventually.equal('Mockoon');
  });

  it('Show welcome modal', async () => {
    await tests.app.client.waitUntilTextExists(
      '.modal-title',
      'Welcome new Mockoon user!'
    );

    // wait for settings save
    await tests.app.client.pause(2000);
  });

  it('Close welcome modal, check for persistence', async () => {
    await tests.helpers.closeModal();
    await tests.helpers.verifyObjectPropertyInFile(
      './tmp/storage/settings.json',
      'welcomeShown',
      true
    );
  });
});
