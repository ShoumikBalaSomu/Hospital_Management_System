package Semi_4th.Project_Report.Online;

import java.util.Scanner;

class Blood_Data_Search {
    public Blood_Data_Search() {
        System.out.println("You are seeing Blood Data Search portal");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Blood Bank Location: ");
        String location = sc.nextLine();
        boolean found = false;
        
        for (int i = 0; i < Blood_Data_Entry.blood_bank_location1.size(); i++) {
            if (location.equalsIgnoreCase(Blood_Data_Entry.blood_bank_location1.get(i))) {
                System.out.println("Blood Group: " + Blood_Data_Entry.blood_group1.get(i));
                System.out.println("Blood Bank Name: " + Blood_Data_Entry.blood_bank_name1.get(i));
                System.out.println("Blood Bank Contact Number: " + Blood_Data_Entry.blood_bank_number1.get(i));
                System.out.println("Blood Bank Location: " + Blood_Data_Entry.blood_bank_location1.get(i));
                System.out.println("Blood Bank Availability: " + Blood_Data_Entry.blood_bank_availability1.get(i));
                System.out.println("Blood Bank Status: " + Blood_Data_Entry.blood_bank_status1.get(i));
                found = true;
            }
        }
        if (!found) {
            System.out.println("No blood bank available at the given location.");
        }
    }
}