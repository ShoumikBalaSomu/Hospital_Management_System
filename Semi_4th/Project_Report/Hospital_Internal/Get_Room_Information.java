package Semi_4th.Project_Report.Hospital_Internal;

import java.util.Scanner;

class Get_Room_Information {
    public Get_Room_Information() {
        System.out.println("You are seeing Get Room Information portal");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the Room Number: ");
        String room_number = sc.nextLine();
        
        for (int i = 0; i < Room_Number.room_number1.size(); i++) {
            if (room_number.equals(Room_Number.room_number1.get(i))) {
                System.out.println("Room Type: " + Room_Number.room_type1.get(i));
                System.out.println("Room Availability: " + Room_Number.room_availability1.get(i));
                System.out.println("Room for: " + Room_Number.room_for1.get(i));
                System.out.println("Room Capacity for each patient: " + Room_Number.room_capacity_patient1.get(i));
                return;
            }
        }
        System.out.println("Room Number not found!");
    }
}