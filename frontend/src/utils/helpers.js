export const filterLinkedAccounts = (accounts, type) => accounts.map(({ accounts: instAccounts, ...institution }) => ({
    ...institution,
    accounts: instAccounts.filter(account => account.type === type),
}));

export const filterManualAccounts = (accounts, type) => accounts.map(({ manualAccounts: instAccounts, ...institution }) => ({
    ...institution,
    accounts: instAccounts.filter(account => account.type === type),
}));
