export function validateName(name) {
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return false;
  }
  return true;
}
export const bankingAccoutType = ["current", "saving"];
