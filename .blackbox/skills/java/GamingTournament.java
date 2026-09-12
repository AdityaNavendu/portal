import java.util.Scanner;

public class GamingTournament {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of rounds: ");
        int n = sc.nextInt();

        int[] score = new int[n];

        int total = 0;
        int highest = Integer.MIN_VALUE;
        int lowest = Integer.MAX_VALUE;

        // Input
        for (int i = 0; i < n; i++) {

            System.out.print("Enter score for Round " + (i + 1) + ": ");
            score[i] = sc.nextInt();

            total += score[i];

            if (score[i] > highest) {
                highest = score[i];
            }

            if (score[i] < lowest) {
                lowest = score[i];
            }
        }

        double average = (double) total / n;

        // Count rounds above average
        int aboveAverage = 0;

        for (int i = 0; i < n; i++) {
            if (score[i] > average) {
                aboveAverage++;
            }
        }

        // Longest winning streak
        int currentStreak = 0;
        int longestStreak = 0;

        for (int i = 0; i < n; i++) {

            if (score[i] >= 50) {
                currentStreak++;

                if (currentStreak > longestStreak) {
                    longestStreak = currentStreak;
                }
            }
            else {
                currentStreak = 0;
            }
        }

        System.out.println("Total Score: " + total);
        System.out.printf("Average Score: %.2f%n", average);
        System.out.println("Highest Score: " + highest);
        System.out.println("Lowest Score: " + lowest);
        System.out.println("Rounds Above Average: " + aboveAverage);
        System.out.println("Longest Winning Streak: " + longestStreak);

        sc.close();
    }
}