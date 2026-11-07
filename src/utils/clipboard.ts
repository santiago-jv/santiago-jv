/**
 * Copies plain text to the user's clipboard using the modern Async Clipboard API,
 * with a graceful fallback for older browser contexts.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    const legacyDoc = document as unknown as { execCommand?: (commandId: string) => boolean };
    legacyDoc.execCommand?.('copy');
    document.body.removeChild(temp);
    return true;
  } catch {
    return false;
  }
}
