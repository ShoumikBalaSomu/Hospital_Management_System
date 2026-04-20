package Semi_4th.Project_Report.Online;

import java.util.Scanner;

public class Patient_Search_Prescription {
    public Patient_Search_Prescription() {
        System.out.println("You are seeing Patient Search Prescription portal");
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter the Patient ID: ");
        String patient_id = sc.nextLine();

        boolean found = false;

        for (int i = 0; i < Patient_Give_Symtom.patient_id1.size(); i++) {
            if (patient_id.equals(Patient_Give_Symtom.patient_id1.get(i))) {
                System.out.println("Patient Name: " + Patient_Give_Symtom.patient_name1.get(i));
                System.out.println("Patient Age: " + Patient_Give_Symtom.patient_age1.get(i));

                if (i < Doctor_Give_Prescription.medicine_name1.size()) {
                    System.out.println("Medicine Name: " + Doctor_Give_Prescription.medicine_name1.get(i));
                    System.out.println("Medicine Time: " + Doctor_Give_Prescription.medicine_time1.get(i));
                    System.out.println("Medicine Dose: " + Doctor_Give_Prescription.medicine_dose1.get(i));
                    System.out.println("Medicine Days: " + Doctor_Give_Prescription.medicine_days1.get(i));
                } else {
                    System.out.println("No prescription found for this patient.");
                }

                found = true;
                break;
            }
        }

        if (!found) {
            System.out.println("Patient ID not found!");
        }
    }
}