export function safeParse(value: string):
  | {
      success: true;
      data: Object;
    }
  | {
      success: false;
      data: null;
    } {
  try {
    const parsedValue = JSON.parse(value);

    return {
      success: true,
      data: parsedValue,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
}
