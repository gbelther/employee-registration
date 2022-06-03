export class Checkers {
  public static cpf(value: string) {
    const validCpfRegex = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
    return validCpfRegex.test(value);
  }
}
