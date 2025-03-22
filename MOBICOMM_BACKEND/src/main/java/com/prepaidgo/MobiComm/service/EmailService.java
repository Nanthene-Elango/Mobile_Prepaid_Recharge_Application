package com.prepaidgo.MobiComm.service;

import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prepaidgo.MobiComm.DTO.RechargesDTO;
import com.prepaidgo.MobiComm.DTO.SubscriberDTO;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	public void sendEmail(SubscriberDTO user, RechargesDTO recharge, MultipartFile file) throws MessagingException {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);

		helper.setTo(user.getEmail());

		helper.setSubject("Recharge Successful-MobiComm");

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy");
		String expiryDateFormatted = recharge.getExpiryDate().format(formatter);

		helper.setText("Hello " + user.getFullName() + "!\n\n" + "Your recharge for Rs. "
				+ recharge.getPlan().getPrice() + " has been successfully completed!\n\n" + "Your plan is valid until "
				+ expiryDateFormatted + ".\n\n" + "Please find the invoice attached below.\n\n"
				+ "Thank you for choosing MobiComm!\n\n" + "Best regards,\nMobiComm Team");

		helper.setText("<html><body>" + "<p>Hello " + user.getFullName() + "!</p>" + "<p>Your recharge for <strong>Rs. "
				+ recharge.getPlan().getPrice() + "</strong> has been successfully completed!</p>"
				+ "<p>Your plan is valid until <strong>" + expiryDateFormatted + "</strong>.</p>"
				+ "<p>Please find the invoice attached below.</p>"
				+ "<p>Thank you for choosing <strong>MobiComm</strong>!</p>"
				+ "<p>Best regards,<br><strong>MobiComm Team</strong></p>" + "</body></html>", true); 
		
		helper.setFrom("nantheneelango@gmail.com");

		helper.addAttachment(file.getOriginalFilename(), file);

		mailSender.send(message);
		
		System.out.println("Mail Sent Successfully!");
	}
}
