import java.util.Scanner;

public class WeeklyExpense {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String[] days = {
            "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday", "Sunday"
        };

        double[] expense = new double[7];

        double total = 0;
        double highest = 0;
        int highestDay = 0;

        // Input
        for (int i = 0; i < 7; i++) {

            System.out.print("Enter expense for " + days[i] + ": ");
            expense[i] = sc.nextDouble();

            total += expense[i];

            if (expense[i] > highest) {
                highest = expense[i];
                highestDay = i;
            }
        }

        double average = total / 7;

        int aboveAverage = 0;

        for (int i = 0; i < 7; i++) {
            if (expense[i] > average) {
                aboveAverage++;
            }
        }

        System.out.printf("Total Weekly Expense: %.2f ₹%n", total);
        System.out.printf("Average Daily Expense: %.2f ₹%n", average);
        System.out.printf("Highest Expense: %.2f ₹%n", highest);
        System.out.println("Highest Expense Day: " + days[highestDay]);
        System.out.println("Days Spending Above Average: " + aboveAverage);

        sc.close();
    }
}