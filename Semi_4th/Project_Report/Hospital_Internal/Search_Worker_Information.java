package Semi_4th.Project_Report.Hospital_Internal;

import java.util.Scanner;

class Search_Worker_Information {
    public Search_Worker_Information() {
        System.out.println("You are seeing Worker Information Search portal");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Worker ID: ");
        String worker_id = sc.nextLine();
        
        for (int i = 0; i < Worker_Information.worker_id1.size(); i++) {
            if (worker_id.equals(Worker_Information.worker_id1.get(i))) {
                System.out.println("Worker Name: " + Worker_Information.worker_name1.get(i));
                System.out.println("Worker Job Title: " + Worker_Information.worker_job_title1.get(i));
                System.out.println("Worker Working Hours: " + Worker_Information.worker_working_hours1.get(i));
                if (!Worker_Information.doctor_specialization1.get(i).equals("0")) {
                    System.out.println("Doctor Specialization: " + Worker_Information.doctor_specialization1.get(i));
                }
                System.out.println("Worker Contact Number: " + Worker_Information.worker_contact_number1.get(i));
                return;
            }
        }
        System.out.println("Worker ID not found!");
    }
}