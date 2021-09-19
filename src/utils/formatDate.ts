export default function formatDate(date: Date): string {
  return date.toLocaleDateString(window.navigator.language);
}
