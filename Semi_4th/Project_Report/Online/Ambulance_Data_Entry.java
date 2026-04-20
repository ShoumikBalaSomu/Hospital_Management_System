package Semi_4th.Project_Report.Online;

import java.util.ArrayList;
import java.util.Scanner;

public class Ambulance_Data_Entry {
    protected static ArrayList<String> ambulance_name1 = new ArrayList<>();
    protected static ArrayList<String> ambulance_driver1 = new ArrayList<>();
    protected static ArrayList<String> ambulance_number1 = new ArrayList<>();
    protected static ArrayList<String> ambulance_location1 = new ArrayList<>();
    protected static ArrayList<String> ambulance_availability1 = new ArrayList<>();
    protected static ArrayList<String> ambulance_status1 = new ArrayList<>();

    public Ambulance_Data_Entry() {
        System.out.println("You are seeing Ambulance Data Entry portal");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the Ambulance Name: ");
        String ambulance_name = sc.nextLine();
        ambulance_name1.add(ambulance_name);
        System.out.println("Enter the Ambulance Driver Name: ");
        String ambulance_driver = sc.nextLine();
        ambulance_driver1.add(ambulance_driver);
        System.out.println("Enter the Ambulance Contact Number: ");
        String ambulance_number = sc.nextLine();
        ambulance_number1.add(ambulance_number);
        System.out.println("Enter the Ambulance Location: ");
        String ambulance_location = sc.nextLine();
        ambulance_location1.add(ambulance_location);
        System.out.println("Enter the Ambulance Availability: ");
        String ambulance_availability = sc.nextLine();
        ambulance_availability1.add(ambulance_availability);
        System.out.println("Enter the Ambulance Status: ");
        String ambulance_status = sc.nextLine();
        ambulance_status1.add(ambulance_status);
    }
}