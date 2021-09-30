import { NavigationOption } from './../model/navigation-option';
export abstract class NavigationService {
  abstract navigate(
    key: string,
    options?: NavigationOption,
    data?: { [key: string]: any }
  ): Promise<any>;
}
