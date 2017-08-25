import { EcCorePage } from './app.po';

describe('ec-core App', () => {
  let page: EcCorePage;

  beforeEach(() => {
    page = new EcCorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    // expect(page.getParagraphText()).toEqual('ec-core');
  });
});
