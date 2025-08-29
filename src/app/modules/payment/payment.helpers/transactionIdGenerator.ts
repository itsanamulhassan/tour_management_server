import uuid from "short-uuid";

export const transactionIdGenerator = () => {
  const prefix = "PAY";
  const timestamp = Date.now().toString(36); // Base36 timestamp
  const randomNum = Math.floor(Math.random() * 100000).toString(36); // Base36 random
  const shortUuid = uuid().new(); // ~22 chars

  // Combine all parts
  let txnId = (prefix + timestamp + randomNum + shortUuid).toUpperCase();

  // Trim or pad to exactly 32 characters
  if (txnId.length > 32) txnId = txnId.slice(0, 32);
  else txnId = txnId.padEnd(32, "0");

  return txnId;
};
