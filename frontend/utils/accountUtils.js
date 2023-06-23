export const mergeAccounts = (linkedAccounts, manualAccountsData) => {
    const mergedAccounts = {};

    linkedAccounts.forEach(institution => {
        const key = institution.name.toLowerCase();

        mergedAccounts[key] = mergedAccounts[key] || {
            name: institution.name,
            accounts: [],
            id: institution.id
        };

        institution.accounts.forEach(account => {
            mergedAccounts[key].accounts.push({
                key: 'linked' + account.id,
                id: account.id,
                name: account.name,
                balance: account.balances.current || account.balances.available,
                type: account.type,
                accountType: "linked",
            });
        });
    });

    manualAccountsData.forEach(institution => {
        const key = institution.name.toLowerCase();

        mergedAccounts[key] = mergedAccounts[key] || {
            name: institution.name,
            accounts: []
        };

        mergedAccounts[key].id = institution.name;

        institution.accounts.forEach(account => {
            mergedAccounts[key].accounts.push({
                key: 'manual' + account.id,
                id: account.id,
                name: account.name,
                balance: account.balance,
                type: account.type,
                accountType: "manual"
            });
        });
    });

    return Object.values(mergedAccounts);
}
