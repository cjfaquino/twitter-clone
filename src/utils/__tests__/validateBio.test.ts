import validateProfile from '../validateProfile';

const mockImg = new File([''], 'test.png', { type: 'image/webp' });
const mockName = 'test';

let testObj = {
  bio: '',
  displayName: mockName,
  backdropImg: mockImg,
  profileImg: mockImg,
  website: '',
  location: '',
};

afterEach(() => {
  testObj = {
    bio: '',
    displayName: mockName,
    backdropImg: mockImg,
    profileImg: mockImg,
    website: '',
    location: '',
  };
});

describe('validateBio tests', () => {
  it('should throw an error when bio is too long', () => {
    testObj.bio =
      'asdfjadsf a;sldfkjasdl ;fkajsdf ;laskdjf a;sldkja;dslfkjasd ;flakdsjf;alsdkfja sdl;kfjasd  asd;lfkjasd ;flkasdjf ;ladskfja ;dlskfjads;l fkjads;flkasdjf al;sdkf sal;dkfj asd;lfkajsd fl;kasdjf a;dsklfj a;sdlkfjas;dlfk as;dlfk asdlj;flkads f;as dlkfaj;sdflk asjdf;laksdf ;adslkf as;dlkfjasd;lkfjasd;lfkasd f;alsdkfjads; lfkads;asdl fsadfj;ads lkfja;lsdkf a;dslkfj';
    expect(() => validateProfile(testObj)).toThrow(/long/);
  });

  it('should throw an error when location is too long', () => {
    testObj.location = 'd;af;dslkja;dsflkja;lsdkf asl;dfkj a;lsd';
    expect(() => validateProfile(testObj)).toThrow(/long/);
  });

  it('should throw an error when website is too long', () => {
    testObj.website =
      'jasd;flkjasdlfk asdf;lkas df;alskdfja;lsdfkja sd;flkasjdf;alsdfj a;lsdf ja;sldkf ;jasdf adsfas;dlfjalsdkfja;sdflkj';
    expect(() => validateProfile(testObj)).toThrow(/long/);
  });

  it('should return true if everything clears', () => {
    expect(validateProfile(testObj)).toBeTruthy();
  });
});
