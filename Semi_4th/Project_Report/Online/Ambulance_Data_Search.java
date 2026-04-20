package Semi_4th.Project_Report.Online;

import java.util.Scanner;

class Ambulance_Data_Search {
    public Ambulance_Data_Search() {
        System.out.println("You are seeing Ambulance Data Search portal");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Your Location: ");
        String location = sc.nextLine();
        boolean found = false;
        
        for (int i = 0; i < Ambulance_Data_Entry.ambulance_location1.size(); i++) {
            if (location.equalsIgnoreCase(Ambulance_Data_Entry.ambulance_location1.get(i))) {
                System.out.println("Ambulance Name: " + Ambulance_Data_Entry.ambulance_name1.get(i));
                System.out.println("Ambulance Driver Name: " + Ambulance_Data_Entry.ambulance_driver1.get(i));
                System.out.println("Ambulance Contact Number: " + Ambulance_Data_Entry.ambulance_number1.get(i));
                System.out.println("Ambulance Location: " + Ambulance_Data_Entry.ambulance_location1.get(i));
                System.out.println("Ambulance Availability: " + Ambulance_Data_Entry.ambulance_availability1.get(i));
                System.out.println("Ambulance Status: " + Ambulance_Data_Entry.ambulance_status1.get(i));
                found = true;
            }
        }
        if (!found) {
            System.out.println("No ambulance available at the given location.");
        }
    }
}