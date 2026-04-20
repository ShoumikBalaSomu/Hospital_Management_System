package Semi_4th.Project_Report.Online;

import java.util.ArrayList;
import java.util.Scanner;

public class Doctor_Give_Prescription {
    protected static ArrayList<String> medicine_name1 = new ArrayList<>();
    protected static ArrayList<String> medicine_time1 = new ArrayList<>();
    protected static ArrayList<String> medicine_dose1 = new ArrayList<>();
    protected static ArrayList<String> medicine_days1 = new ArrayList<>();

    public Doctor_Give_Prescription() {
        System.out.println("You are seeing Doctor Give Prescription portal");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the Patient ID: ");
        String patient_id = sc.nextLine();
        boolean found = false;

        for (int i = 0; i < Patient_Give_Symtom.patient_id1.size(); i++) {
            if (patient_id.equals(Patient_Give_Symtom.patient_id1.get(i))) {
                System.out.println("Patient Name: " + Patient_Give_Symtom.patient_name1.get(i));
                System.out.println("Patient Age: " + Patient_Give_Symtom.patient_age1.get(i));
                System.out.println("Patient Symptom: " + Patient_Give_Symtom.patient_symtom1.get(i));

                System.out.println("Enter the Medicine Name: ");
                String medicine_name = sc.nextLine();
                medicine_name1.add(medicine_name);

                System.out.println("Enter the Medicine Time: ");
                String medicine_time = sc.nextLine();
                medicine_time1.add(medicine_time);

                System.out.println("Enter the Medicine Dose: ");
                String medicine_dose = sc.nextLine();
                medicine_dose1.add(medicine_dose);

                System.out.println("Enter the Medicine Days: ");
                String medicine_days = sc.nextLine();
                medicine_days1.add(medicine_days);

                found = true;
                break;
            }
        }

        if (!found) {
            System.out.println("Patient ID not found!");
        }
    }
}