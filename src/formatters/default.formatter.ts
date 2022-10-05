import {Param} from '../expander';
import {Formatter} from '../formatter';

/**
 * Only supports string values!
 */
export class DefaultFormatter implements Formatter {
  public supports(param: Readonly<Param<unknown, unknown>>): boolean {
    return typeof param.value === 'string';
  }

  public formatSimple(param: Readonly<Param<unknown, unknown>>): string {
    return String(param.value);
  }

  public formatNested(param: Readonly<Param<unknown, unknown>>, name: string, value: unknown): string {
    return String(value);
  }
}
