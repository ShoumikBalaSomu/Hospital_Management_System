package Semi_4th.Project_Report.Online;

import java.util.Scanner;

public class Online {

   public Online() {
        Scanner sc = new Scanner(System.in);
        boolean running = true;

        System.out.println("Welcome to the Online Healthcare Management System");
        System.out.println("-------------------------------------------------");

        while (running) {
            System.out.println("Please select an option:");
            System.out.println("1. Enter Hospital Data");
            System.out.println("2. Search Hospital Data");
            System.out.println("3. Enter Ambulance Data");
            System.out.println("4. Search Ambulance Data");
            System.out.println("5. Enter Blood Data");
            System.out.println("6. Search Blood Data");
            System.out.println("7. Enter Doctor Data");
            System.out.println("8. Search Doctor Data");
            System.out.println("9. Patient Give Symptom");
            System.out.println("10. Doctor Search Patient Data");
            System.out.println("11. Doctor Give Prescription");
            System.out.println("12. Patient Search Prescription");
            System.out.println("13. Redirect to Medicine Information (Medex)");
            System.out.println("14. Exit");
            System.out.print("Enter your choice: ");
            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                Hospital_Data_Entry Hospital_Data_Entry = new Hospital_Data_Entry();
                    break;
                case 2:
                    Hospital_Data_Search hospital_Data_Search= new Hospital_Data_Search();
                    break;

                case 3:
                Ambulance_Data_Entry ambulance_Data_Entry = new Ambulance_Data_Entry();
                    break;
                case 4 :
                    Ambulance_Data_Search ambulance_Data_Search = new Ambulance_Data_Search();
                    break;
                case 5:
                    Blood_Data_Entry blood_Data_Entry = new Blood_Data_Entry();
                    break;
                case 6:
                    Blood_Data_Search blood_Data_Search = new Blood_Data_Search();
                    break;
                case 7:
                    Doctor_Data_Entry doctor_Data_Entry = new Doctor_Data_Entry();
                    break;
                case 8:
                    Doctor_Data_Search doctor_Data_Search = new Doctor_Data_Search();
                    break;
                case 9:
                    Patient_Give_Symtom patient_Give_Symtom = new Patient_Give_Symtom();
                    break;
                case 10:
                    Doctor_Search_Patient_Data doctor_Search_Patient_Data = new Doctor_Search_Patient_Data();
                    break;
                case 11:
                    Doctor_Give_Prescription doctor_Give_Prescription = new Doctor_Give_Prescription();
                    break;
                case 12:
                    Patient_Search_Prescription patient_Search_Prescription = new Patient_Search_Prescription();
                    break;
                case 13:
                    Take_Data_Medicine_Redirect_Medex take_Data_Medicine_Redirect_Medex = new Take_Data_Medicine_Redirect_Medex();
                    break;


                case 14:
                    System.out.println("Exiting the program. Goodbye!");
                    running = false;
                    break;

                default:
                    System.out.println("Invalid choice. Please try again.");
                    break;
            }

            System.out.println();
        }
        sc.close();
    }
}