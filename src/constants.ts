const date = new Date();

export const today = new Date(Date.now());

export let oneMonthPriorToToday = new Date();
oneMonthPriorToToday.setDate(today.getDate() - 30);
