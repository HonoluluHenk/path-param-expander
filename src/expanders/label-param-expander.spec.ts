import {DefaultEncoder} from '../encoders';
import {LabelParamExpander} from './label-param-expander';

describe('LabelParamExpander', () => {
  const encoder = new DefaultEncoder();
  const expander = new LabelParamExpander(encoder);

  const paramName = 'color';

  const string = 'blue';
  const array = ['blue', 'black', 'brown'];
  const object = {'R': 100, 'G': 200, 'B': 150};
  const unsupported: any = Symbol('unsupported');

  describe('not exploded', () => {
    const explode = false;

    it.each([
      null,
      undefined,
    ])('returns nothing for nullish: %s', (param) => {
      const actual = expander.expandParameter(paramName, param, explode);

      expect(actual)
        .toEqual('');
    });

    it.each([
      '',
      [],
      {},
    ])('expands to just the parameter name on empty value: %s', (param) => {
      const actual = expander.expandParameter(paramName, param, explode);

      expect(actual)
        .toEqual('.');
    });

    it('expands a simple value', () => {
      const actual = expander.expandParameter(paramName, string, explode);

      expect(actual)
        .toEqual('.blue');
    });

    it('expands an array', () => {
      const actual = expander.expandParameter(paramName, array, explode);

      expect(actual)
        .toEqual('.blue.black.brown');
    });

    it('expands an object', () => {
      const actual = expander.expandParameter(paramName, object, explode);

      expect(actual)
        .toEqual('.R.100.G.200.B.150');
    });

    it('expands unsupported', () => {
      const actual = expander.expandParameter(paramName, unsupported, explode);

      expect(actual)
        .toEqual('.Symbol%28unsupported%29');

    });

  });

  describe('exploded', () => {
    const explode = true;

    it.each([
      null,
      undefined,
    ])('returns nothing for nullish: %s', (param) => {
      const actual = expander.expandParameter(paramName, param, explode);

      expect(actual)
        .toEqual('');
    });

    it.each([
      '',
      [],
      {},
    ])('expands to just the parameter name on empty value: %s', (param) => {
      const actual = expander.expandParameter(paramName, param, explode);

      expect(actual)
        .toEqual('.');
    });

    it('expands a simple value', () => {
      const actual = expander.expandParameter(paramName, string, explode);

      expect(actual)
        .toEqual('.blue');
    });

    it('expands an array', () => {
      const actual = expander.expandParameter(paramName, array, explode);

      expect(actual)
        .toEqual('.blue.black.brown');
    });

    it('expands an object', () => {
      const actual = expander.expandParameter(paramName, object, explode);

      expect(actual)
        .toEqual('.R=100.G=200.B=150');
    });

    it('expands unsupported', () => {
      const actual = expander.expandParameter(paramName, unsupported, explode);

      expect(actual)
        .toEqual('.Symbol%28unsupported%29');

    });

  });
});
