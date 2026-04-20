package Semi_4th.Project_Report;

import Semi_4th.Project_Report.Hospital_Internal.Hospital_Internal;
import Semi_4th.Project_Report.Online.Online;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.println("==========================================");
            System.out.println("   Welcome to Hospital Management System  ");
            System.out.println("==========================================");
            System.out.println("Choose the portal you want to enter: ");
            System.out.println("1. Hospital Internal Portal");
            System.out.println("2. Online Portal");
            System.out.println("0. Exit");
            System.out.print("\nEnter your choice: ");
            
            if (!sc.hasNextInt()) {
                System.out.println("Invalid input. Please enter a number.");
                return;
            }
            
            int choice = sc.nextInt();
            switch (choice) {
                case 1:
                    new Hospital_Internal();
                    break;
                case 2:
                    new Online();
                    break;
                case 0:
                    System.out.println("Exiting System. Goodbye!");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
    }
}