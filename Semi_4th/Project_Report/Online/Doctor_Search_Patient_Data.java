package Semi_4th.Project_Report.Online;

import java.util.Scanner;

public class Doctor_Search_Patient_Data {
    public Doctor_Search_Patient_Data() {
        System.out.println("You are seeing Doctor Search Patient Data portal");
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter the Patient ID: ");
        String patient_id = sc.nextLine();

        boolean found = false;

        for (int i = 0; i < Patient_Give_Symtom.patient_id1.size(); i++) {
            if (patient_id.equals(Patient_Give_Symtom.patient_id1.get(i))) {
                System.out.println("Patient Name: " + Patient_Give_Symtom.patient_name1.get(i));
                System.out.println("Patient Age: " + Patient_Give_Symtom.patient_age1.get(i));
                System.out.println("Patient Symptom: " + Patient_Give_Symtom.patient_symtom1.get(i));
                found = true;
                break;
            }
        }

        if (!found) {
            System.out.println("Patient ID not found!");
        }
    }
}