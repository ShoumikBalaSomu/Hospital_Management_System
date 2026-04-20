package Semi_4th.Project_Report.Online;

import java.util.ArrayList;
import java.util.Scanner;

public class Hospital_Data_Entry {
    protected static ArrayList<String> hospital_name1 = new ArrayList<>();
    protected static ArrayList<String> hospital_location1 = new ArrayList<>();
    protected static ArrayList<String> hospital_number1 = new ArrayList<>();
    protected static ArrayList<String> hospital_availability1 = new ArrayList<>();

    public Hospital_Data_Entry() {
        System.out.println("You are seeing Hospital Data Entry portal");
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter the Hospital Name: ");
        String hospital_name = sc.nextLine();
        hospital_name1.add(hospital_name);

        System.out.println("Enter the Hospital Location: ");
        String hospital_location = sc.nextLine();
        hospital_location1.add(hospital_location);

        System.out.println("Enter the Hospital Contact Number: ");
        String hospital_number = sc.nextLine();
        hospital_number1.add(hospital_number);

        System.out.println("Enter the Hospital Availability: ");
        String hospital_availability = sc.nextLine();
        hospital_availability1.add(hospital_availability);
    }
}