import { AmazonoPage } from './app.po';

describe('amazono App', () => {
  let page: AmazonoPage;

  beforeEach(() => {
    page = new AmazonoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
