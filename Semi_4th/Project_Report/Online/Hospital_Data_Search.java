package Semi_4th.Project_Report.Online;

import java.util.Scanner;

public class Hospital_Data_Search {
    public Hospital_Data_Search() {
        System.out.println("You are seeing Hospital Data Search portal");
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter Hospital Location from below list [only type the number]:");
        if (Hospital_Data_Entry.hospital_location1.isEmpty()) {
            System.out.println("No hospitals available in the system.");
            return;
        }

        for (int i = 0; i < Hospital_Data_Entry.hospital_location1.size(); i++) {
            System.out.println((i + 1) + ". " + Hospital_Data_Entry.hospital_location1.get(i));
        }

        try {
            System.out.println("Enter the number corresponding to the hospital location:");
            int number = sc.nextInt();

            if (number < 1 || number > Hospital_Data_Entry.hospital_location1.size()) {
                System.out.println("Invalid selection. Please enter a valid number.");
                return;
            }

            System.out.println("Hospital Name: " + Hospital_Data_Entry.hospital_name1.get(number - 1));
            System.out.println("Hospital Contact Number: " + Hospital_Data_Entry.hospital_number1.get(number - 1));
            System.out.println("Hospital Location: " + Hospital_Data_Entry.hospital_location1.get(number - 1));
            System.out.println("Hospital Availability: " + Hospital_Data_Entry.hospital_availability1.get(number - 1));
        } catch (Exception e) {
            System.out.println("Invalid input. Please enter a valid number.");
        }
    }
}