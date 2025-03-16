package com.prepaidgo.MobiComm.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UtilController {

	@GetMapping("/auth/admin")
    public String showLoginPage() {
        return "index.html"; 
    }
}
