export function formatString(str: string, ...replacements: string[]) {
  const args = arguments;
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[+number + 1] !== 'undefined' ? args[+number + 1] : match;
  });
}

export function replaceString(
  str: string,
  data: any,
  prefixStr = '',
  stratContainerStr = '',
  endContainerStr = ''
) {
  if (str && data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        str = str.replace(
          new RegExp(
            prepareForRegx(
              stratContainerStr + prefixStr + key + endContainerStr
            ),
            'g'
          ),
          data[key]
        );
      }
    }
  }
  return str;
}

function prepareForRegx(str: string) {
  if (str) {
    const escapeItems = ['?'];
    for (const st of escapeItems) {
      str = str.replace(new RegExp('\\' + st, 'g'), '\\' + st);
    }
  }
  return str;
}

export function interpolate(
  expr: string,
  templateMatcher: RegExp,
  params?: { [key: string]: any }
): string {
  if (!params) {
    return expr;
  }
  return expr.replace(templateMatcher, (substring: string, b: string) => {
    let r = getValue(params, b);
    return isDefined(r) ? r : substring;
  });
}

export function getValue(target: any, key: string): any {
  let keys = typeof key === 'string' ? key.split('.') : [key];
  key = '';
  do {
    key += keys.shift();
    if (
      isDefined(target) &&
      isDefined(target[key]) &&
      (typeof target[key] === 'object' || !keys.length)
    ) {
      target = target[key];
      key = '';
    } else if (!keys.length) {
      target = undefined;
    } else {
      key += '.';
    }
  } while (keys.length);

  return target;
}

export function isString(obj: any): obj is string {
  return typeof obj === 'string';
}

export function isDefined(value: any): boolean {
  return typeof value !== 'undefined' && value !== null;
}
