package com.prepaidgo.MobiComm.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("plans/payment")
@CrossOrigin("*")
public class PaymentController {

    @PostMapping("/create-checkout-session")
    public Map<String ,Object> createCheckoutSession() throws StripeException {

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.ALIPAY)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:8083/plans/payment/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl("http://localhost:8083/api/payment/cancel")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount(100L)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Test Product")
                                                                .build()
                                                )
                                                .build()
                                ).setQuantity(1L)
                                .build()
                )
                .build();
        Session session  =Session.create(params);
        Map<String ,Object> result = new HashMap<String ,Object>();
        result.put("sessionId", session.getId());
        return ResponseEntity.ok(result).getBody();
    }

    @GetMapping("/success")
    public ResponseEntity<Map<String, Object>> handlePaymentSuccess(@RequestParam String session_id) {
        Map<String, Object> response = new HashMap<>();
        response.put("session_id", session_id);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/cancel")
    public String cancel(){
        return "payment canceled";
    }
}