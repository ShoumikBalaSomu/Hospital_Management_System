package Semi_4th.Project_Report.Hospital_Internal;

import java.util.Scanner;

public class Hospital_Internal {
    public Hospital_Internal() {
        Scanner sc = new Scanner(System.in);
        boolean running = true;
        System.out.println("Welcome to the Inter Hospital Information System");
        System.out.println("-------------------------------------------------");
        while (running) {
            System.out.println("Please select an option:");
            System.out.println("1. Give Room Number Information");
            System.out.println("2. Get Room Information");
            System.out.println("3. Give Worker Information");
            System.out.println("4. Get Worker Information");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");
            int choice = sc.nextInt();
            switch (choice) {
                case 1:
                    Room_Number room_Number = new Room_Number();
                    break;
                case 2:
                    Get_Room_Information get_Room_Information = new Get_Room_Information();
                    break;
                case 3:
                Worker_Information worker_Information = new Worker_Information();
                    break;
                case 4:
                Search_Worker_Information search_Worker_Information = new Search_Worker_Information();
                    break;
                case 5:
                    running = false;
                    break;
                default:
                    System.out.println("Invalid choice! Please enter a valid choice.");
            }

}}}
