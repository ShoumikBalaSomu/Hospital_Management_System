package Semi_4th.Project_Report.Online;

import java.util.Scanner;

public class Take_Data_Medicine_Redirect_Medex {

    public Take_Data_Medicine_Redirect_Medex() {
        Scanner sc = new Scanner(System.in);
        System.out.println("You are seeing Medicine Data Entry portal");
        System.out.println("Enter Genetic Name of the Medicine:");
        String medicine_name = sc.nextLine();

        System.out.println("Redirecting to: https://medex.com.bd/search?search=" + medicine_name);
    }
}
