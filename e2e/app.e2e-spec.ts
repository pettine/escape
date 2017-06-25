import { Escape1Page } from './app.po';

describe('escape1 App', () => {
  let page: Escape1Page;

  beforeEach(() => {
    page = new Escape1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
