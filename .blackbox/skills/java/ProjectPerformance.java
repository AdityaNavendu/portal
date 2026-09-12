import java.util.Scanner;

public class ProjectPerformance {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter project marks: ");
        double project = sc.nextDouble();

        System.out.print("Enter attendance percentage: ");
        double attendance = sc.nextDouble();

        System.out.print("Enter viva marks: ");
        double viva = sc.nextDouble();

        boolean approved = true;

        if (project < 50) {
            System.out.println("Rejected: Project marks are less than 50");
            approved = false;
        }

        if (attendance < 75) {
            System.out.println("Rejected: Attendance is less than 75%");
            approved = false;
        }

        if (viva < 40) {
            System.out.println("Rejected: Viva marks are less than 40");
            approved = false;
        }

        if (approved) {

            double finalScore = (0.60 * project) + (0.40 * viva);

            System.out.println("Project Status: Approved");
            System.out.printf("Final Score: %.1f%n", finalScore);

            if (finalScore >= 80) {
                System.out.println("Grade: A");
            }
            else if (finalScore >= 65) {
                System.out.println("Grade: B");
            }
            else if (finalScore >= 50) {
                System.out.println("Grade: C");
            }
            else {
                System.out.println("Grade: D");
            }
        }

        sc.close();
    }
}