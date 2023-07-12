export const filterLinkedAccounts = (accounts, type) => accounts.map(({ accounts: instAccounts, ...institution }) => ({
    ...institution,
    accounts: instAccounts.filter(account => account.type === type),
}));

export const filterManualAccounts = (accounts, type) => accounts.map(({ manualAccounts: instAccounts, ...institution }) => ({
    ...institution,
    accounts: instAccounts.filter(account => account.type === type),
}));

export const formatCategory = (category) => {
    return category
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/ and /g, ' & ')
        .split(' ')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}
