export default function eventProvider(providerName: string) {
  const event = new Event(`${providerName} link changed`);
  document.dispatchEvent(event);
}
