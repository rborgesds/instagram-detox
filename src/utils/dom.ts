export function querySelectorSafe<T extends Element = Element>(
  selector: string,
  parent: ParentNode = document
): T | null {
  try {
    return parent.querySelector<T>(selector);
  } catch {
    return null;
  }
}

export function querySelectorAllSafe<T extends Element = Element>(
  selector: string,
  parent: ParentNode = document
): T[] {
  try {
    return Array.from(parent.querySelectorAll<T>(selector));
  } catch {
    return [];
  }
}

export function observeMutations(
  callback: (mutations: MutationRecord[]) => void,
  options: MutationObserverInit = {
    childList: true,
    subtree: true,
  }
): MutationObserver {
  const observer = new MutationObserver(callback);
  observer.observe(document.body, options);
  return observer;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
