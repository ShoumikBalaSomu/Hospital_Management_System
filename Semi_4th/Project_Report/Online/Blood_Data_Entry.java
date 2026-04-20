package Semi_4th.Project_Report.Online;

import java.util.ArrayList;
import java.util.Scanner;

public class Blood_Data_Entry {
    protected static ArrayList<String> blood_group1 = new ArrayList<>();
    protected static ArrayList<String> blood_bank_name1 = new ArrayList<>();
    protected static ArrayList<String> blood_bank_number1 = new ArrayList<>();
    protected static ArrayList<String> blood_bank_location1 = new ArrayList<>();
    protected static ArrayList<String> blood_bank_availability1 = new ArrayList<>();
    protected static ArrayList<String> blood_bank_status1 = new ArrayList<>();

    public Blood_Data_Entry() {
        System.out.println("You are seeing Blood Data Entry portal");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Blood Group: ");
        String blood_group = sc.nextLine();
        blood_group1.add(blood_group);
        System.out.println("Enter Blood Bank Name: ");
        String blood_bank_name = sc.nextLine();
        blood_bank_name1.add(blood_bank_name);
        System.out.println("Enter Blood Bank Contact Number: ");
        String blood_bank_number = sc.nextLine();
        blood_bank_number1.add(blood_bank_number);
        System.out.println("Enter Blood Bank Location: ");
        String blood_bank_location = sc.nextLine();
        blood_bank_location1.add(blood_bank_location);
        System.out.println("Enter Blood Bank Availability: ");
        String blood_bank_availability = sc.nextLine();
        blood_bank_availability1.add(blood_bank_availability);
        System.out.println("Enter Blood Bank Status: ");
        String blood_bank_status = sc.nextLine();
        blood_bank_status1.add(blood_bank_status);
    }
}