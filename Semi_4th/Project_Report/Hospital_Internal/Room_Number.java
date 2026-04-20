package Semi_4th.Project_Report.Hospital_Internal;

import java.util.ArrayList;
import java.util.Scanner;

public class Room_Number {
    protected static ArrayList<String> room_number1 = new ArrayList<>();
    protected static ArrayList<String> room_type1 = new ArrayList<>();
    protected static ArrayList<String> room_availability1 = new ArrayList<>();
    protected static ArrayList<String> room_for1 = new ArrayList<>();
    protected static ArrayList<Integer> room_capacity_patient1 = new ArrayList<>();

    public Room_Number() {
        System.out.println("You are seeing Room Number portal");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the Room Number: ");
        String room_number = sc.nextLine();
        room_number1.add(room_number);
        System.out.println("Enter the Room Type (AC/Non-AC): ");
        String room_type = sc.nextLine();
        room_type1.add(room_type);
        System.out.println("Enter the Room Availability: ");
        String room_availability = sc.nextLine();
        room_availability1.add(room_availability);
        System.out.println("Enter the Room for: ");
        String room_for = sc.nextLine();
        room_for1.add(room_for);
        System.out.println("Enter the amount of people that can stay in the room for each patient: ");
        int room_capacity_patient = sc.nextInt();
        room_capacity_patient1.add(room_capacity_patient);
    }
}