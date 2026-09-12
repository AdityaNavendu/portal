import java.util.Scanner;

public class MovieTicket {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        System.out.print("Enter day: ");
        String day = sc.next();

        System.out.print("Enter number of tickets: ");
        int tickets = sc.nextInt();

        double baseAmount = tickets * 200;

        System.out.printf("Base Amount: %.2f ₹%n", baseAmount);

        // Weekend charge
        double amount = baseAmount;

        if (day.equalsIgnoreCase("Saturday") ||
            day.equalsIgnoreCase("Sunday")) {

            amount = amount * 1.25;
            System.out.printf("After Weekend Charge: %.2f ₹%n", amount);
        }

        // Age discount
        if (age < 25) {
            amount = amount * 0.80;
        }
        else if (age >= 60) {
            amount = amount * 0.70;
        }

        System.out.printf("After Age Discount: %.2f ₹%n", amount);

        // Group discount
        if (tickets >= 5) {
            amount = amount * 0.90;
            System.out.printf("After Group Discount: %.2f ₹%n", amount);
        }

        System.out.printf("Final Amount: %.2f ₹%n", amount);

        sc.close();
    }
}