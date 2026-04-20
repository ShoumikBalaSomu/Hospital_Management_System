package Semi_4th.Project_Report.Online;

import java.util.ArrayList;
import java.util.Scanner;

public class Patient_Give_Symtom {
    protected static ArrayList<String> patient_id1 = new ArrayList<>();
    protected static ArrayList<String> patient_name1 = new ArrayList<>();
    protected static ArrayList<String> patient_age1 = new ArrayList<>();
    protected static ArrayList<String> patient_symtom1 = new ArrayList<>();

    public Patient_Give_Symtom() {
        System.out.println("You are seeing Patient Give Symptom portal");
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter the Patient ID: ");
        String patient_id = sc.nextLine();
        patient_id1.add(patient_id);

        System.out.println("Enter the Patient Name: ");
        String patient_name = sc.nextLine();
        patient_name1.add(patient_name);

        System.out.println("Enter the Patient Age: ");
        String patient_age = sc.nextLine();
        patient_age1.add(patient_age);

        System.out.println("Enter the Patient Symptom: ");
        String patient_symtom = sc.nextLine();
        patient_symtom1.add(patient_symtom);
    }
}