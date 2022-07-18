import { getPrintDescription } from '../src/app/js/utils';

describe('utils', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should set json viewer visibility and return image scale and position for unsaved print descriptions', async () => {
    const mElement = { style: { display: 'block' } };
    document.getElementById = jest.fn().mockReturnValueOnce(mElement);
    const description = getPrintDescription('testimage.jpg');
    expect(document.getElementById).toBeCalledWith('jsonViewerWrapper');
    expect(description).toEqual({ imageX: 0, scale: 0 });
  });

  it('should set json viewer visibility and return image scale and position for saved print descriptions', async () => {
    document.getElementById = jest
      .fn()
      .mockReturnValueOnce({ style: { display: 'block' } })
      .mockReturnValueOnce({ innerHTML: '' });
    const description = getPrintDescription('testimage2.jpg');
    expect(document.getElementById).toBeCalledWith('jsonViewerWrapper');
    expect(document.getElementById).toBeCalledWith('jsonViewer');
    expect(description).toEqual({ imageX: 100, scale: 1 });
  });
});
