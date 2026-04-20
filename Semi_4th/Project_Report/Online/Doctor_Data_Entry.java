package Semi_4th.Project_Report.Online;

import java.util.ArrayList;
import java.util.Scanner;

public class Doctor_Data_Entry {
    protected static ArrayList<String> doctor_name1 = new ArrayList<>();
    protected static ArrayList<String> doctor_specialization1 = new ArrayList<>();
    protected static ArrayList<String> doctor_number1 = new ArrayList<>();
    protected static ArrayList<String> doctor_location1 = new ArrayList<>();
    protected static ArrayList<String> doctor_availability1 = new ArrayList<>();
    protected static ArrayList<Double> doctor_fees1 = new ArrayList<>();
    protected static ArrayList<String> doctor_status1 = new ArrayList<>();

    public Doctor_Data_Entry() {
        System.out.println("You are seeing Doctor Data Entry portal");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Doctor Name: ");
        String doctor_name = sc.nextLine();
        doctor_name1.add(doctor_name);
        System.out.println("Enter Doctor Specialization: ");
        String doctor_specialization = sc.nextLine();
        doctor_specialization1.add(doctor_specialization);
        System.out.println("Enter Doctor Contact Number: ");
        String doctor_number = sc.nextLine();
        doctor_number1.add(doctor_number);
        System.out.println("Enter Doctor Location: ");
        String doctor_location = sc.nextLine();
        doctor_location1.add(doctor_location);
        System.out.println("Enter Doctor Availability: ");
        String doctor_availability = sc.nextLine();
        doctor_availability1.add(doctor_availability);
        System.out.println("Doctor fees (or enter '0' if free): ");
        double doctor_fees = sc.nextDouble();
        doctor_fees1.add(doctor_fees);
        System.out.println("Enter Doctor Status: ");
        String doctor_status = sc.nextLine();
        doctor_status1.add(doctor_status);
    }
}