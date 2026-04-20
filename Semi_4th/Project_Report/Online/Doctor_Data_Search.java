package Semi_4th.Project_Report.Online;

import java.util.Scanner;

class Doctor_Data_Search {
    public Doctor_Data_Search() {
        System.out.println("You are seeing Doctor Data Search portal");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Doctor Location: ");
        String location = sc.nextLine();
        boolean found = false;
        
        for (int i = 0; i < Doctor_Data_Entry.doctor_location1.size(); i++) {
            if (location.equalsIgnoreCase(Doctor_Data_Entry.doctor_location1.get(i))) {
                System.out.println("Doctor Name: " + Doctor_Data_Entry.doctor_name1.get(i));
                System.out.println("Doctor Specialization: " + Doctor_Data_Entry.doctor_specialization1.get(i));
                System.out.println("Doctor Contact Number: " + Doctor_Data_Entry.doctor_number1.get(i));
                System.out.println("Doctor Location: " + Doctor_Data_Entry.doctor_location1.get(i));
                System.out.println("Doctor Availability: " + Doctor_Data_Entry.doctor_availability1.get(i));
                System.out.println("Doctor Fees: " + Doctor_Data_Entry.doctor_fees1.get(i));
                System.out.println("Doctor Status: " + Doctor_Data_Entry.doctor_status1.get(i));
                found = true;
            }
        }
        if (!found) {
            System.out.println("No doctor available at the given location.");
        }
    }
}