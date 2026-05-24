const expenses = [
    { id: 1, description: "Rent", amount: 25000, category: "Housing", date: "2026-03-01" },
    { id: 2, description: "Supermarket", amount: 6500, category: "Food", date: "2026-03-03" },
    { id: 3, description: "Electricity", amount: 3200, category: "Utilities", date: "2026-03-05" },
    { id: 4, description: "Uber rides", amount: 2100, category: "Transport", date: "2026-03-08" },
    { id: 5, description: "Restaurant", amount: 3800, category: "Food", date: "2026-03-10" },
    { id: 6, description: "Gym", amount: 3500, category: "Health", date: "2026-03-12" },
    { id: 7, description: "Online course", amount: 4000, category: "Education", date: "2026-03-15" },
    { id: 8, description: "Groceries", amount: 4200, category: "Food", date: "2026-03-18" },
    { id: 9, description: "Internet", amount: 2500, category: "Utilities", date: "2026-03-20" },
    { id: 10, description: "Bus fare", amount: 800, category: "Transport", date: "2026-03-22" }
];

// =============================================
// TASK 1 - FETCH EXCHANGE RATES
// =============================================

const fetchRates = async () => {
    try {
        const response = await fetch(
            "https://api.exchangerate-api.com/v4/latest/KES"
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        return {
            USD: data.rates.USD,
            EUR: data.rates.EUR,
            GBP: data.rates.GBP
        };

    } catch (error) {
        console.error("Failed to fetch exchange rates:", error.message);
        return null;
    }
};

// =============================================
// TASK 2 - PURE CALCULATION FUNCTIONS
// =============================================

// Total by category
const getTotalByCategory = expenses => {
    return expenses.reduce((totals, expense) => {
        totals[expense.category] =
            (totals[expense.category] || 0) + expense.amount;

        return totals;
    }, {});
};

// Largest expense
const getLargestExpense = expenses => {
    return expenses.reduce((largest, expense) => {
        return expense.amount > largest.amount
            ? expense
            : largest;
    });
};

// Total expenses
const getTotal = expenses => {
    return expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );
};

// =============================================
// TASK 3 - CURRENCY CONVERSION
// =============================================

const convertAmount = (amountKES, rates) => {
    return {
        KES: amountKES,
        USD: (amountKES * rates.USD).toFixed(2),
        EUR: (amountKES * rates.EUR).toFixed(2),
        GBP: (amountKES * rates.GBP).toFixed(2)
    };
};

// =============================================
// HELPER FUNCTIONS
// =============================================

const formatKES = amount => {
    return amount.toLocaleString();
};

const generateBar = (percentage) => {
    const barLength = Math.round(percentage / 2);
    return "█".repeat(barLength);
};

// =============================================
// TASK 4 - RUN ANALYSIS
// =============================================

const runAnalysis = async () => {
    try {

        // Fetch exchange rates
        const rates = await fetchRates();

        if (!rates) {
            console.log("Could not complete analysis.");
            return;
        }

        // Calculations
        const total = getTotal(expenses);
        const totalsByCategory = getTotalByCategory(expenses);
        const largestExpense = getLargestExpense(expenses);

        // Currency conversion
        const converted = convertAmount(total, rates);

        // Top 3 expenses (no mutation)
        const topExpenses = [...expenses]
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 3);

        // =============================================
        // REPORT OUTPUT
        // =============================================

        console.log("=============================================");
        console.log("  PERSONAL BUDGET ANALYSIS - MARCH 2026");
        console.log("=============================================");

        console.log(`  Total Expenses : KES ${formatKES(converted.KES)}`);
        console.log(`  In USD         : $${converted.USD}`);
        console.log(`  In EUR         : €${converted.EUR}`);
        console.log(`  In GBP         : £${converted.GBP}`);

        console.log(
            `  Largest        : ${largestExpense.description} - KES ${formatKES(largestExpense.amount)}`
        );

        console.log("\n  Spending by Category:");

        Object.entries(totalsByCategory).forEach(([category, amount]) => {

            const percentage = ((amount / total) * 100).toFixed(1);

            console.log(
                `  ${category.padEnd(14)} ${generateBar(percentage)}  KES ${formatKES(amount)} (${percentage}%)`
            );
        });

        console.log("\n  Top 3 Expenses:");

        topExpenses.forEach((expense, index) => {
            console.log(
                `  ${index + 1}. ${expense.description.padEnd(14)} KES ${formatKES(expense.amount)}`
            );
        });

        console.log("=============================================");

    } catch (error) {
        console.error("Analysis failed:", error.message);
    }
};

// Run program
runAnalysis();