import { FirstAppPage } from './app.po';

describe('first-app App', () => {
  let page: FirstAppPage;

  beforeEach(() => {
    page = new FirstAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
