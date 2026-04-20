package Semi_4th.Project_Report.Hospital_Internal;

import java.util.ArrayList;
import java.util.Scanner;

public class Worker_Information {
    protected static ArrayList<String> worker_id1 = new ArrayList<>();
    protected static ArrayList<String> worker_name1 = new ArrayList<>();
    protected static ArrayList<String> worker_job_title1 = new ArrayList<>();
    protected static ArrayList<String> worker_working_hours1 = new ArrayList<>();
    protected static ArrayList<String> doctor_specialization1 = new ArrayList<>();
    protected static ArrayList<String> worker_contact_number1 = new ArrayList<>();

    public Worker_Information() {
        System.out.println("You are seeing Worker Information portal");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the Worker ID: ");
        String worker_id = sc.nextLine();
        worker_id1.add(worker_id);
        System.out.println("Enter the Worker Name: ");
        String worker_name = sc.nextLine();
        worker_name1.add(worker_name);
        System.out.println("Enter the Worker Job Title: ");
        String worker_job_title = sc.nextLine();
        worker_job_title1.add(worker_job_title);
        System.out.println("Enter the Working Hours: ");
        String worker_working_hours = sc.nextLine();
        worker_working_hours1.add(worker_working_hours);
        System.out.println("If the worker job title is 'Doctor', enter the Doctor Specialization; otherwise, enter '0': ");
        String doctor_specialization = sc.nextLine();
        doctor_specialization1.add(doctor_specialization);
        System.out.println("Enter the Worker Contact Number: ");
        String worker_contact_number = sc.nextLine();
        worker_contact_number1.add(worker_contact_number);
    }
}